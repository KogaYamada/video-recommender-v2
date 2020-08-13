import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDDyF0NO4t8m6JWRVpJboimZT8i7_uPe-w',
  authDomain: 'videorecommender-43c5b.firebaseapp.com',
  databaseURL: 'https://videorecommender-43c5b.firebaseio.com',
  projectId: 'videorecommender-43c5b',
  storageBucket: 'videorecommender-43c5b.appspot.com',
  messagingSenderId: '373392465529',
  appId: '1:373392465529:web:baede9cc96eae8a7bbbea8',
  measurementId: 'G-9H3BBD8DDT',
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

// export default firebase;
