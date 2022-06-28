import { signInWithGoogle, signOut } from '../firebase.js';
import useUser from '../hooks/useUser.js';
import Navbar from './Navbar.js';

function Header() {
	const user = useUser();
	return (
		<header>
			{user === null ?
				<button onClick={signInWithGoogle}>Sign In</button>
				:
				<>
					<div className="user">
						<img src={user.photoURL} alt="User" />
						<strong>{user.displayName}</strong>
						<small>{user.email}</small>
					</div>

					<Navbar signOut={signOut} />
				</>
			}
		</header>
	);
}

export default Header;