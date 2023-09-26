import { signInWithGoogle, signOut } from '../firebase.js';
import useUser from '../hooks/useUser.js';
import Navbar from './Navbar.js';

export default function Header() {
	const user = useUser(),
			isUserSignedIn = user !== null;
	return (
		<header>
			{isUserSignedIn ?
				<>
					<div className="user">
						<img src={user.photoURL} alt="User" />
						<strong>{user.displayName}</strong>
						<small>{user.email}</small>
					</div>

					<Navbar signOut={signOut} />
				</>
				:
				<button onClick={signInWithGoogle}>Sign In</button>
			}
		</header>
	);
}