import { useState, useEffect } from 'react';
import { ref, onValue, remove } from 'firebase/database';
import { db, auth } from '../firebase';

function ExpenseList({ type }) {
	const [data, setData] = useState([]);

	useEffect(() => {
		onValue(
			ref(db, `/users/${auth.currentUser.uid}/${type}/`),
			snapshot => {
				setData([]);
				const snapval = snapshot.val();
				if(snapval !== null) {
					Object.values(snapval)
						.map(dbData => setData(oldData => [ ...oldData, dbData ]));
				}
			}
		);
	}, [type]);

	const handleDelete = e => remove(ref(db, `/users/${auth.currentUser.uid}/${type}/${e.target.value}`));
		
	return (
		<ul className="expense-list">
			{data.length !== 0 ?
				data.map(expense => 
					<li key={expense.id}>
						<span>{expense.name}</span>
						<strong>€ {expense.price}</strong>
						<time>{expense.date}</time>
						<button
							className="delete"
							value={expense.id}
							onClick={handleDelete}
						/>
					</li>
				) : 
				<li className="no-expense">
					<span>No Expenses</span>
					<strong>€ -</strong>
					<time>gg/mm/aaaa</time>
				</li>
			}
		</ul>
	);
}

export default ExpenseList;