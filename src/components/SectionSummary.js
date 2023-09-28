import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db, auth } from '../firebase';
import FilterBy from './FilterBy';
import ExpenseList from './ExpenseList';

export default function SectionSummary() {
	const currentDate = {
		year: new Date().getFullYear(),
		month: new Date().getMonth() + 1
	};
	const [date, setDate] = useState(currentDate),
			[userData, setuserData] = useState(),
			[types, setTypes] = useState([]);
			// [allMonths, setAllMonths] = useState([]),
			// [allYears, setAllYears] = useState([]);
	const handleChangeDate = (id, value) => setDate({ ...date, [id]: value });

	useEffect(() => {
		const query =  `/users/${auth.currentUser.uid}`;
		onValue(
			ref(db, query),
			snapshot => {
				setuserData();
				setTypes([]);
				const snapval = snapshot.val();
				if(snapval !== null) {
					setuserData(snapval);
					setTypes(Object.keys(snapval));
				}
			}
		);
	}, [date]);


	let totalSummary = 100;

	return (
		<section className="summary-grid">
			<aside>
				<h2>Financial Statement:</h2>
				<ul className='expense-list list-summary'>
					<li>
						<span>TOTAL:</span>
						<strong>€ {totalSummary}</strong>
					</li>
				</ul>
			</aside>

			<ul>
				<h2>Summary:</h2>
				{types.map(type =>
					<li>
						<nav>
							<h2>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
							<FilterBy
								type={userData[type]}
								currentDate={currentDate}
								monthActive={date.month}
								yearActive={date.year}
								allMonths={[]}
								allYears={[]}
								handleChangeDate={handleChangeDate}
							/>
						</nav>
						
						<ExpenseList
							type={type}
							yearActive={date.year}
							monthActive={date.month}
							btn={false}
						/>
					</li>
				)}
			</ul>
		</section>
	);
}