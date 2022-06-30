import { useState } from 'react';
import FilterBy from './FilterBy.js';
import Form from './Form.js';
import ExpenseList from './ExpenseList.js';

function SectionType({ type }) {
	const currentDate = {
		year: new Date().getFullYear(),
		month: new Date().getMonth() + 1
	},
	[date, setDate] = useState(currentDate),
	handleChangeDate = e => {
		const { id, value } = e.target;
		setDate({ ...date, [id]: value });
	};

	return (
		<section>
			<nav>
				<h2>{type[0].toUpperCase() + type.slice(1)}</h2>
				<FilterBy
					type={type}
					monthActive={date.month}
					yearActive={date.year}
					handleChangeDate={handleChangeDate}
				/>
			</nav>
			
			<Form type={type} />
			
			<ExpenseList
				type={type}
				yearActive={date.year}
				monthActive={date.month}
			/>
		</section>
	);
}

export default SectionType;