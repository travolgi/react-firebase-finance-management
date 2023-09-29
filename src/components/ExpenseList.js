import { useState, useEffect } from 'react';
import { ref, onValue, remove, update } from 'firebase/database';
import { db, auth } from '../firebase';
import useIsOpen from '../hooks/useIsOpen'
import FormUI from './FormUI';

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

		if(window.confirm(`You want to delete this expense?`)) {
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
								<FormUI
									handleSubmit={handleUpdate}
									type={type}
									valueData={editData}
									handleChange={handleChangeEdit}
									handleReset={handleCloseEditing}
								/>
								:
								<>
									<span>{expense.name}</span>
									<strong>€ {parseInt(expense.price).toLocaleString()}</strong>
									<time>{expense.date}</time>

									{btn &&
										<div className="commands">
											<button
												className="delete"
												id={expense.id}
												value={expense.date.slice(5,7)}
												onClick={handleDelete}
											>
												<span id={expense.id}>Delete</span>
											</button>
											
											<button
												className="edit"
												id={expense.id}
												onClick={() => handleOpenEditing(expense)}
											>
												<span id={expense.id}>Edit</span>
											</button>
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
					<span>No {type !== 'earnings' && type !== 'job' ? 'Expenses' : 'Earnings'}</span>
					<strong>€ -</strong>
					<time>gg/mm/aaaa</time>
				</li>
			}
		</ul>
	);
}