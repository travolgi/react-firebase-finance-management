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
			[allMonthsYears, setAllMonthsYears] = useState(currentDate),
			[userData, setUserData] = useState(),
			[typesTotal, setTypesTotal] = useState(),
			[summaryTotal, setSummaryTotal] = useState(0),
			[types, setTypes] = useState([]),
			[typesSelected, setTypesSelected] = useState([]);

	const handleChangeDate = (id, value) => setDate({ ...date, [id]: value });

	const handleClick = e => {
		const type = e.target.value;
		if (typesSelected.includes(type)) {
			setTypesSelected(typesSelected.filter(typeSelected => typeSelected !== type));
		} else {
			let newTypeSelected = [...typesSelected, type ];
			setTypesSelected(newTypeSelected);
		}
	}

	useEffect(() => {
		const query =  `/users/${auth.currentUser.uid}`;
		onValue(
			ref(db, query),
			snapshot => {
				setUserData();
				setTypes([]);
				const snapval = snapshot.val();
				if(snapval !== null) {
					setUserData(snapval);
					setTypes(Object.keys(snapval));
				}
			}
		);
	}, [date]);

	useEffect(() => {
		setTypesSelected();
		setTypesSelected(types);
	}, [types]);

	useEffect(() => {
		const allYears = [];
		const allMonths = [];
		for (const type in userData) {
			for (const year in userData[type]) {
				if (!allYears.includes(parseInt(year))) {
					allYears.push(parseInt(year));
				}
				for (const month in userData[type][year]) {
					if (!allMonths.includes(parseInt(month))) {
						allMonths.push(parseInt(month));
					}
				}
			}
		}
		const allDates = {
			years: allYears.sort(),
			months: allMonths.sort()
		};

		const totalsByTypes = {};
		for (const type of types) {
			let totalType = 0;
			if (userData[type] && userData[type][date.year] && userData[type][date.year][date.month]) {
				for (const expence in userData[type][date.year][date.month]) {
					totalType += parseInt(userData[type][date.year][date.month][expence].price);
				}
			}
			totalsByTypes[type] = totalType;
		}

		setAllMonthsYears(allDates);
		setTypesTotal(totalsByTypes);
	}, [userData, types]);
	
	useEffect(() => {
		let totalEarnings = 0;
		let totalExpence = 0;
		
		totalEarnings = typesSelected.reduce((acc, type) => {
			if (['earnings', 'job', 'roi'].includes(type)) {
				acc += typesTotal[type];
			}
			return acc;
		}, 0);
	
		totalExpence = typesSelected.reduce((acc, type) => {
			if (['bank', 'fun', 'investments', 'life', 'rent'].includes(type)) {
				acc += typesTotal[type];
			}
			return acc;
		}, 0);
	
		const totalSummary = totalEarnings - totalExpence;
	
		setSummaryTotal(totalSummary);
	}, [typesTotal, typesSelected]);
	
	return (
		<section className="summary-grid">
			<aside>
				<h2>Balance:</h2>
				
				<div className="summary-filter">
					<h3>Filter by:</h3>
					<FilterBy
						currentDate={currentDate}
						monthActive={date.month}
						yearActive={date.year}
						allMonths={allMonthsYears.months}
						allYears={allMonthsYears.years}
						handleChangeDate={handleChangeDate}
					/>

					{types.map(type =>
						<label key={type} htmlFor={type}>
						   	{type === 'rent' ? 'Rent & Taxes' : type.charAt(0).toUpperCase() + type.slice(1)}

							<input
								type="checkbox"
								id={type} 
								name={type}
								value={type}
								checked={typesSelected.includes(type)}
								onClick={handleClick}
							/>

							€ {typesTotal[type]}
						</label>
					)}
				</div>

				<ul className="expense-list list-summary">
					<li className={summaryTotal < 0 ? 'tot-expense' : 'tot-earn'}>
						<span>TOTAL:</span>
						<strong>€ {summaryTotal}</strong>
					</li>
				</ul>
			</aside>

			<ul>
				<h2>Summary:</h2>
				{typesSelected.map(type =>
					<li key={type}>
						<h2>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>

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
