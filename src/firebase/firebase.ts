import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import 'firebase/compat/storage';
import { getStorage } from 'firebase/storage';

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
const storage = firebase.storage()
const getAUTH = getAuth(firebase.initializeApp(credentials));
const getDB = getFirestore(firebase.initializeApp(credentials))
const getStrge = getStorage(firebase.initializeApp(credentials));
export { auth, db, getStrge,storage, getDB, getAUTH };
export default firebase;
