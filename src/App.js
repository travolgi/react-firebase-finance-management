import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useUser from './hooks/useUser.js';
import Header from './components/Header.js';
import SectionType from './components/SectionType.js';

function App() {
	const user = useUser();

	return (
		<BrowserRouter>
			<Header />

			{user === null ?
				<div className="txt-center">
					<h1>Finance Management</h1>
					<p>Sign in with Google to use the app.</p>
				</div>
				:
				<>
					<h1 className="txt-center">Finance Management</h1>
					<Routes>
						<Route path='/' element={<> <SectionType type='fun' /> <SectionType type='life' /> </>} />
						<Route path='/investments' element={<SectionType type='investments' />} />
						<Route path='/earnings' element={<SectionType type='earnings' />} />
						<Route path='/bank' element={<SectionType type='bank' />} />
					</Routes>
				</>
			}

			<div className="copyright">
				<small>&copy; developed by</small>
				<a href="https://travolgi.com" target="_blank" rel="noopener noreferrer">
					<img src="https://sled.travolgi.com/assets/travolgi-logo.png" alt="Travolgi logo" />
				</a>
			</div>
		</BrowserRouter>
	);
}

export default App;