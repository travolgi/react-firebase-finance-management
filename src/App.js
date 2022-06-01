import { useState } from 'react';
import useUser from './hooks/useUser.js';
import Header from './components/Header.js';
// import FilterBy from './components/FilterBy.js';
import Form from './components/Form.js';
import ExpenseList from './components/ExpenseList.js';

function App() {
	const user = useUser();

	/*
	const currentMonth = new Date().getMonth() + 1,
			[monthInvestment, setMonthInvestment] = useState(currentMonth),
			[monthFun, setMonthFun] = useState(currentMonth);
	*/

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
							{/*
							<FilterBy
								monthActive={monthInvestment}
							/>
							*/}
						</nav>
						
						<Form type='investment' />
						<ExpenseList type='investment' />
					</section>

					<section>
						<nav>
							<h2>Fun</h2>
						</nav>

						<Form type='fun' />
						<ExpenseList type='fun' />
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