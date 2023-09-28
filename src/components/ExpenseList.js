import { useState, useEffect } from 'react';
import { ref, onValue, remove, update } from 'firebase/database';
import { db, auth } from '../firebase';

export default function ExpenseList({ type, yearActive, monthActive, btn=true }) {
	const [data, setData] = useState([]),
			[totExpense, setTotExpense] = useState(null);

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
		const expenseId = e.target.id,
				expensePath = `/users/${auth.currentUser.uid}/${type}/${yearActive}/${monthActive}/${expenseId}`;

		const updateExpense = {};

		update(ref(db, expensePath), updateExpense)
			.then(() => console.log('Successfully updated!'))
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
						<li key={expense.id}>
							<span>{expense.name}</span>
							<strong>€ {parseInt(expense.price).toLocaleString()}</strong>
							<time>{expense.date}</time>

							{btn &&
								<>
									<button
										className="delete"
										id={expense.id}
										value={expense.date.slice(5,7)}
										onClick={handleDelete}
									/>
									{/*
									<button
										className="edit"
										id={expense.id}
										onClick={handleUpdate}
									/>
									*/}
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