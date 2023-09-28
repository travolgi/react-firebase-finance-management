import { useState, useEffect } from	 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

export default function useUser() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		onAuthStateChanged(auth, user => user ? setUser(user) : setUser(null));
	}, []);

	return user;
}