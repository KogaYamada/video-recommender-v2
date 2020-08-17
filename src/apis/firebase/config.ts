import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (
  userAuth: firebase.User | null,
  addtionaldata?: any
) => {
  if (!userAuth) return;

  const userRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> = firestore.doc(
    `version/2/users/${userAuth.uid}`
  );

  const snapshot: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, uid, photoURL } = userAuth;
    const createdAt: Date = new Date();

    try {
      userRef.set({
        displayName,
        email,
        uid,
        photoURL,
        createdAt,
        ...addtionaldata,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return userRef;
};

export default firebase;
