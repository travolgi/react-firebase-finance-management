import { useState, useEffect } from 'react';
import { ref, onValue, remove, update } from 'firebase/database';
import { db, auth } from '../firebase';
import useIsOpen from '../hooks/useIsOpen'

export default function ExpenseList({ type, yearActive, monthActive, btn=true }) {
	const initVals = { id: '', name: '', price: '', date: '' };
	
	const [data, setData] = useState([]),
			[totExpense, setTotExpense] = useState(null);

	const [editing, handleEditing] = useIsOpen(),
			[editData, setEditData] = useState(initVals);
	const handleOpenEditing = expence => {
		setEditData(expence);
		handleEditing();
	}
	const handleCloseEditing = () => {
		setEditData(initVals);
		handleEditing();
	}

	const handleChangeEdit = e => {
		const { id, value } = e.target;
		setEditData({ ...editData, [id]: value.trim() });
	}

	useEffect(() => {
		const query = monthActive === 'all' ?
			`/users/${auth.currentUser.uid}/${type}/${yearActive}` :
			`/users/${auth.currentUser.uid}/${type}/${yearActive}/${monthActive}`;

		onValue(
			ref(db, query),
			snapshot => {
				setData([]);
				const snapval = snapshot.val();
				if(snapval !== null) {
					let dbData = monthActive === 'all'
					? Object.values(snapval).flatMap(dbMonth => Object.values(dbMonth))
					: Object.values(snapval);

					setData(dbData);

					let total = dbData.reduce((tot, current) => tot + parseInt(current.price), 0);
					setTotExpense(total);
				}
			}
		);
	}, [type, yearActive, monthActive]);

	const handleUpdate = e => {
		e.preventDefault();

		const expenseId = editData.id,
				expensePath = `/users/${auth.currentUser.uid}/${type}/${yearActive}/${monthActive}/${expenseId}`;

		const updateExpense = {
			name: editData.name.trim(),
			price: editData.price.trim(),
			date: editData.date
		};

		update(ref(db, expensePath), updateExpense)
			.then(() => {
				console.log('Successfully updated!');
				setEditData(initVals);
				handleEditing();
			})
			.catch(err => console.log(err));
	}

	const handleDelete = e => {
		const expenseId = e.target.id,
				expenseMonth = parseInt(e.target.value),
				queryMonth = monthActive === 'all' ? expenseMonth : monthActive,
				expensePath = `/users/${auth.currentUser.uid}/${type}/${yearActive}/${queryMonth}/${expenseId}`

		if(window.confirm('You want to delete this expense?')) {
			remove(ref(db, expensePath))
				.then(() => console.log('Successfully deleted!'))
				.catch(err => console.log(err));
		}
	};

	return (
		<ul className={`expense-list ${!btn ? 'nobtn' : ''}`}>
			{data.length !== 0 ?
				<>
					{data.map(expense => 
						<li key={expense.id} className={editing && expense.id === editData.id ? 'visible' : ''}>
							{editing && expense.id === editData.id ?
								<>
									<form onSubmit={handleUpdate}>
										<input
											type="text"
											minLength="3"
											placeholder={type !== 'earnings' ? 'Expense name' : 'Earning name'}
											id="name"
											value={editData.name}
											onChange={handleChangeEdit}
											required
										/>

										<input
											type="number"
											step="any"
											placeholder="€ price"
											id="price"
											value={editData.price}
											onChange={handleChangeEdit}
											required
										/>


										<input
											type="date"
											id="date"
											value={editData.date}
											onChange={handleChangeEdit}
											required
										/>

										<div>
											<button type="submit">
												<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"></path></svg>
											</button>

											<button className="delete" onClick={handleCloseEditing}> Cancel</button>
										</div>
									</form>
								</>
								:
								<>
									<span>{expense.name}</span>
									<strong>€ {parseInt(expense.price).toLocaleString()}</strong>
									<time>{expense.date}</time>

									{btn &&
										<div>
											<button
												className="delete"
												id={expense.id}
												value={expense.date.slice(5,7)}
												onClick={handleDelete}
											/>
											
											<button
												className="edit"
												id={expense.id}
												onClick={() => handleOpenEditing(expense)}
											/>
										</div>
									}
								</>
							}
						</li>
					)}

					<li className={type !== 'earnings' && type !== 'job' ? 'tot-expense' : 'tot-earn'}>
						<span>TOTAL:</span>
						<strong>€ {totExpense}</strong>
					</li>
				</>
			:
				<li className="no-expense">
					<span>No Expenses</span>
					<strong>€ -</strong>
					<time>gg/mm/aaaa</time>
				</li>
			}
		</ul>
	);
}