import admin from 'firebase-admin';
import serviceAccount from './firebaseServiceAccount.js'; // service account config - replace with own

export const appAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

export default appAdmin