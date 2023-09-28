import { BrowserRouter, Routes, Route } from 'react-router-dom'
import useUser from './hooks/useUser'
import Header from './components/Header'
import Footer from './components/Footer'
import SectionType from './components/SectionType'
import SectionSummary from './components/SectionSummary'

export default function App() {
	const user = useUser(),
			isUserSignedIn = user !== null;
	return (
		<BrowserRouter>
			<Header />

			<main>
				<h1 className="txt-center">Finance Management</h1>

				{isUserSignedIn ?
					<Routes>
						<Route
							path='/'
							element={[
								<SectionType type='fun' />,
								<SectionType type='life'/>,
								<SectionType type='rent'/>
							]}
						/>
						<Route
							path='/investments'
							element={<SectionType type='investments' />}
						/>
						<Route
							path='/earnings'
							element={[
								<SectionType type='earnings' />,
								<SectionType type='job' />
							]}
						/>
						<Route
							path='/bank'
							element={<SectionType type='bank' />}
						/>
						<Route
							path='/summary'
							element={<h2 className="txt-center">- Under construction -</h2>}
						/>
						<Route
							path='/*'
							element={<h1 className="txt-center">404 Error - Page Not Found</h1>}
						/>
					</Routes>
					:
					<p className="txt-center">Sign in with Google to use the app.</p>
				}
			</main>

			<Footer />
		</BrowserRouter>
	);
}