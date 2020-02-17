import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import FirebaseContext from './context';
import { firebaseConfig } from '../config/config';

const secondaryApp = firebase.initializeApp(firebaseConfig, 'Secondary');

// Create user with firebase auth
export const createNewUser = (email, password) => {
  return secondaryApp
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      secondaryApp.auth().signOut();
      return user;
    });
};

// Saving new user or updating existing user in Firestore
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    // Create new user
    const { displayName, email, role } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        role,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    // Update user
    const lastLoggedIn = new Date();

    try {
      await userRef.update({
        lastLoggedIn
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return userRef;
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export Auth and Firestore services
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export { FirebaseContext };

// Google OAuth set up
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

// Export signInWithGoogle method
export const signInWithGoogle = () => auth.signInWithPopup(provider);

// Firebase default export
export default firebase;
