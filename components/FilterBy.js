const months = [
	{
		id: 1,
		name: 'January'
	},
	{
		id: 2,
		name: 'February'
	},
	{
		id: 3,
		name: 'March'
	},
	{
		id: 4,
		name: 'April'
	},
	{
		id: 5,
		name: 'May'
	},
	{
		id: 6,
		name: 'June'
	},
	{
		id: 7,
		name: 'July'
	},
	{
		id: 8,
		name: 'August'
	},
	{
		id: 9,
		name: 'September'
	},
	{
		id: 10,
		name: 'October'
	},
	{
		id: 11,
		name: 'November'
	},
	{
		id: 12,
		name: 'December'
	},
];

function FilterBy({ monthActive, yearActive, handleChangeDate }) {
	return (
		<>
			<select
				id="month"
				defaultValue={monthActive}
				onChange={handleChangeDate}
			>
				{months.map(month =>
					<option key={month.id} value={month.id}>{month.name}</option>
				)}
			</select>

			<select
				id="year"
				defaultValue={yearActive}
				onChange={handleChangeDate}
			>
				<option value="2022">2022</option>
				<option value="2023">2023</option>
				<option value="2024">2024</option>
			</select>
		</>
	);
}

export default FilterBy;