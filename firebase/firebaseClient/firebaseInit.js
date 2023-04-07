import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { firebaseConfig } from './firebaseConfig.js'; // firebase account config - replace with own

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);