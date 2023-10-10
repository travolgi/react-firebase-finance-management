export default function FilterBy({ currentDate, monthActive, yearActive, allMonths, allYears, handleChangeDate }) {
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

				{allMonths !== undefined && allMonths.length > 0 ?
					allMonths.map((month, idx) =>
						<option key={idx} value={month}>
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
				{allMonths !== undefined && allYears.length > 0 ?
					allYears.map((year, idx) =>
						<option key={idx} value={year}>
							{year}
						</option>
					) :
					<option value={currentDate.year}>{currentDate.year}</option>
				}
			</select>
		</>
	);
}