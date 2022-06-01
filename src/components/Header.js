import useUser from '../hooks/useUser.js';
import { signInWithGoogle, signOut } from '../firebase.js';

function Header() {
	const user = useUser();
	return (
		<header>
			{user === null ?
				<button onClick={signInWithGoogle}>Sign In</button>
				:
				<>
					<button onClick={signOut}>Sign Out</button>
					
					<div className="user">
						<img src={user.photoURL} alt="User" />
						<strong>{user.displayName}</strong>
						<small>{user.email}</small>
					</div>
				</>
			}
		</header>
	);
}

export default Header;