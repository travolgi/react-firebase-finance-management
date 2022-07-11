import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ signOut }) {
	const location = useLocation().pathname,
			refNavBar = useRef(),
			[isOpen, setIsOpen] = useState(false),
         handleToggle = () => setIsOpen(!isOpen);
			
	return (
		<>
			<button
				className="nav-toggle"
				aria-controls={refNavBar}
				aria-expanded={isOpen}
				onClick={handleToggle}
			/>

			<nav id="navbar" ref={refNavBar} data-visible={isOpen} onFocus={handleToggle}>
				<ul>
					<li>
						<Link
							to="/"
							className={location === "/" ? 'active' : null}
							>Expense</Link>
					</li>
					<li>
						<Link
							to="/investments"
							className={location === "/investments" ? 'active' : null}
							>Investments</Link>
					</li>
					<li>
						<Link
							to="/earnings"
							className={location === "/earnings" ? 'active' : null}
							>Earnings</Link>
					</li>
					<li>
						<Link
							to="/bank"
							className={location === "/bank" ? 'active' : null}
							>Bank</Link>
					</li>
					<li>
						<button onClick={signOut}>Sign Out</button>
					</li>
				</ul>
			</nav>
		</>
	);
}

export default Navbar;
