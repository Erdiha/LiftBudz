import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const credentials = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

if ((firebase as any).apps && !(firebase as any).apps.length) {
	firebase.initializeApp(credentials);
}

const auth = firebase.auth();
const db = firebase.firestore();
const getAUTH = getAuth();
const getDB = getFirestore();

function useAuthState(firebaseAuth: firebase.auth.Auth) {
	const [user, setUser] = useState<firebase.User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	React.useEffect(() => {
		const unsubscribe = firebaseAuth.onAuthStateChanged(
			(user: any) => {
				setUser(user);
				setLoading(false);
			},
			(error: any) => {
				setError(error);
				setLoading(false);
			},
		);
		return () => unsubscribe();
	}, [firebaseAuth]);

	return [user, loading, error];
}

export default firebase;
export { auth, db, useAuthState, getDB, getAUTH };
