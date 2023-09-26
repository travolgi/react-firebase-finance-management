export default function FilterBy({ type, currentDate, monthActive, yearActive, allMonths, allYears, handleChangeDate }) {
	function getMonthName(monthNumber) {
		const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
		return monthNames[monthNumber - 1];
	}

	return (
		<>
			<select
				id="month"
				value={monthActive}
				onChange={(e) => handleChangeDate('month', e.target.value)}
			>

				{allMonths.length > 0 ?
					allMonths.map((month) =>
						<option key={month} value={month}>
							{getMonthName(month)}
						</option>
					) :
					<option value={currentDate.month}>{getMonthName(currentDate.month)}</option>
				}
				<option value="all">See all</option>
			</select>


			<select
				id="year"
				value={yearActive}
				onChange={(e) => handleChangeDate('year', e.target.value)}
			>
				{allYears.length > 0 ?
					allYears.map(year =>
						<option key={year} value={year}>
							{year}
						</option>
					) :
					<option value={currentDate.year}>{currentDate.year}</option>
				}
			</select>
		</>
	);
}