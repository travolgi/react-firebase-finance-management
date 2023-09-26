import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useIsOpen from '../hooks/useIsOpen'
import useOutsideClick from '../hooks/useOutsideClick'

function ActiveLink({ href, children, handleToggle }) {
	const location = useLocation().pathname,
			isActive = location === href;
	return (
		<Link to={href} className={isActive ? 'active' : ''} onClick={handleToggle}>
			{children}
		</Link>
	)
}

export default function Navbar({ signOut }) {
	const refNavBar = useRef(),
			[isOpen, handleToggle] = useIsOpen();
	useOutsideClick({ val: isOpen, ref: refNavBar, handler: handleToggle });
	return (
		<>
			<button
				className="nav-toggle"
				aria-controls={refNavBar}
				aria-expanded={isOpen}
				onClick={handleToggle}
			>
				<span className="sr-only">Menu</span>
				<div className="bar1" />
				<div className="bar2" />
				<div className="bar3" />
			</button>

			<nav id="navbar" ref={refNavBar} data-visible={isOpen}>
				<ul>
					<li>
						<ActiveLink href="/" handleToggle={handleToggle}>Expense</ActiveLink>
					</li>
					<li>
						<ActiveLink href="/investments" handleToggle={handleToggle}>Investments</ActiveLink>
					</li>
					<li>
						<ActiveLink href="/earnings" handleToggle={handleToggle}>Earnings</ActiveLink>
					</li>
					<li>
						<ActiveLink href="/bank" handleToggle={handleToggle}>Bank</ActiveLink>
					</li>
					<li>
						<ActiveLink href="/summary" handleToggle={handleToggle}>Summary</ActiveLink>
					</li>
					<li>
						<button onClick={signOut}>Sign Out</button>
					</li>
				</ul>
			</nav>
		</>
	);
}