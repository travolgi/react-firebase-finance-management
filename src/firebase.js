import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: "AIzaSyDi9Vrqxg6xwPJKqdtsT9EQ9BMCdtiC2BY",
	authDomain: "finance-management-dd.firebaseapp.com",
	databaseURL: "https://finance-management-dd-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "finance-management-dd",
	storageBucket: "finance-management-dd.appspot.com",
	messagingSenderId: "788950494019",
	appId: "1:788950494019:web:b7613bca8dc7e991039df6"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);

export const signInWithGoogle = () => {
	signInWithPopup(auth, new GoogleAuthProvider())
		.then(res => console.log('Sign In with Google done!'))
		.catch(err => console.log(err)
	);
}

export const signOut = () => {
	auth.signOut()
		.then(res => console.log('Successfully Sign Out.'))
		.catch(err => console.log(err)
	);
}