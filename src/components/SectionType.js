import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db, auth } from '../firebase';
import FilterBy from './FilterBy.js';
import Form from './Form.js';
import ExpenseList from './ExpenseList.js';

export default function SectionType({ type }) {
	const typeTitle = type.charAt(0).toUpperCase() + type.slice(1);
	const currentDate = {
		year: new Date().getFullYear(),
		month: new Date().getMonth() + 1
	};
	const [date, setDate] = useState(currentDate),
			[allMonths, setAllMonths] = useState([]),
			[allYears, setAllYears] = useState([]);
	const handleChangeDate = (id, value) => setDate({ ...date, [id]: value });

	useEffect(() => {
		const query =  `/users/${auth.currentUser.uid}/${type}`;
		onValue(
			ref(db, query),
			snapshot => {
				setAllYears([]);
				setAllMonths([]);
				const snapval = snapshot.val();
				if(snapval !== null) {
					const availableYears = Object.keys(snapval);
					const allMonthsByYear = Object.entries(snapval).map(([key, dbMonth]) => ({ [key]: Object.keys(dbMonth) }));
					const availableMonths = allMonthsByYear.find(year => Object.keys(year).toString() === date.year.toString())[date.year];

					setAllYears(availableYears);
					setAllMonths(availableMonths);
				}
			}
		);
	}, [date, type]);

	return (
		<section>
			<nav>
				<h2>{typeTitle}</h2>
				<FilterBy
					type={type}
					currentDate={currentDate}
					monthActive={date.month}
					yearActive={date.year}
					allMonths={allMonths}
					allYears={allYears}
					handleChangeDate={handleChangeDate}
				/>
			</nav>
			
			<Form
				type={type}
				handleChangeDate={handleChangeDate}
			/>
			
			<ExpenseList
				type={type}
				yearActive={date.year}
				monthActive={date.month}
			/>
		</section>
	);
}