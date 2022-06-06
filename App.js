import { useState } from 'react';
import useUser from './hooks/useUser.js';
import Header from './components/Header.js';
import FilterBy from './components/FilterBy.js';
import Form from './components/Form.js';
import ExpenseList from './components/ExpenseList.js';

function App() {
	const user = useUser();

	const currentDate = {
				year: new Date().getFullYear(),
				month: new Date().getMonth() + 1
			}, 
			[dateInvestment, setDateInvestment] = useState(currentDate),
			[dateFun, setDateFun] = useState(currentDate);

	const handleChangeDateInvestiment = e => {
		const { id, value } = e.target;
      setDateInvestment({ ...dateInvestment, [id]: value });
	}
	const handleChangeDateFun = e => {
		const { id, value } = e.target;
      setDateFun({ ...dateFun, [id]: value });
	}

	return (
		<>
			<Header />

			{user === null ?
				<div className="txt-center">
					<h1>Finance Management</h1>
					<p>Sign in with Google to use the app.</p>
				</div>
				:
				<>
					<h1 className="txt-center">Finance Management</h1>
					<section>
						<nav>
							<h2>Investment</h2>
							<FilterBy
								monthActive={dateInvestment.month}
								yearActive={dateInvestment.year}
								handleChangeDate={handleChangeDateInvestiment}
							/>
						</nav>
						
						<Form type='investment' />
						<ExpenseList
							type='investment'
							yearActive={dateInvestment.year}
							monthActive={dateInvestment.month}
						/>
					</section>

					<section>
						<nav>
							<h2>Fun</h2>							
							<FilterBy
								monthActive={dateFun.month}
								yearActive={dateFun.year}
								handleChangeDate={handleChangeDateFun}
							/>
						</nav>

						<Form type='fun' />
						<ExpenseList
							type='fun'
							yearActive={dateFun.year}
							monthActive={dateFun.month}
						/>
					</section>
				</>
			}

			<div className="copyright">
				<small>&copy; developed by</small>
				<a href="https://travolgi.com" target="_blank" rel="noopener noreferrer">
					<img src="https://sled.travolgi.com/assets/travolgi-logo.png" alt="Travolgi logo" />
				</a>
			</div>
		</>
	);
}

export default App;