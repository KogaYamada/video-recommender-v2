import { createSlice } from '@reduxjs/toolkit';
import {} from 'react-redux';
import firebase, {
  auth,
  createUserProfileDocument,
} from '../../apis/firebase/config';

import { authValidation } from '../../apis/firebase/auth-error';

import { UserState, TryLocalSignin, Signup, Signin, Signout } from './types';

const initialState: UserState = {
  id: null,
  displayName: null,
  email: null,
  createdAt: null,
  description: null,
  photoURL: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserState, action): UserState => {
      return { ...action.payload };
    },
  },
});
/*-------------------------------------------------------*/
/*------------------   async actions   ------------------*/
/*-------------------------------------------------------*/
const { setUser } = slice.actions;
/**
 * ローカルログインを試みる関数。
 * 以前にアプリにログインした形跡があればログインしてホームへ遷移する。
 * なければサインインページへ遷移する。
 */
export const tryLocalSignin: TryLocalSignin = () => async (dispatch: any) => {
  auth.onAuthStateChanged(async (user: firebase.User | null) => {
    if (user) {
      const userRef = await createUserProfileDocument(user);
      userRef?.onSnapshot((snapshot) => {
        dispatch(setUser({ id: snapshot.id, ...snapshot.data() }));
      });
      // TODO routing home
    }
    dispatch(setUser(initialState));
    // TODO routing signin
  });
};
/**
 * サインアップ時に実行される関数。firebase authenticationと通信して入力情報に問題がなければユーザーを作成。
 * 何か問題があればエラーメッセージをセットする。
 */
export const signup: Signup = (username, email, password) => async (
  dispatch: any
) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(
      email.value,
      password.value
    );
    user?.updateProfile({ displayName: username.value });

    const userRef = await createUserProfileDocument(user, {
      displayName: username.value,
    });

    userRef?.onSnapshot((snapshot) => {
      dispatch(setUser({ id: snapshot.id, ...snapshot.data() }));
    });
    // TODO routing home
  } catch (error) {
    const { type, message } = authValidation(error.code);
    switch (type) {
      case 'email':
        email.addErrorMessage(message);
        break;
      case 'password':
        password.addErrorMessage(message);
        break;
      case 'other':
        alert(message);
        break;
    }
    console.log(error);
  }
};
/**
 * サインイン時に実行される関数firebase authenticationと通信して入力情報に問題がなければログイン。
 * 何か問題があればエラーメッセージをセットする。
 */
export const signin: Signin = (email, password) => async (dispatch: any) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(
      email.value,
      password.value
    );
    const userRef = await createUserProfileDocument(user);
    userRef?.onSnapshot((snapshot) => {
      dispatch(setUser({ id: snapshot.id, ...snapshot.data() }));
    });
    // TODO routing home
  } catch (error) {
    const { type, message } = authValidation(error.code);
    switch (type) {
      case 'email':
        email.addErrorMessage(message);
        break;
      case 'password':
        password.addErrorMessage(message);
        break;
      case 'other':
        alert(message);
        break;
    }
    console.log(error);
  }
};

export const signout: Signout = () => async (dispatch: any) => {
  auth.signOut();
  dispatch(setUser(initialState));
};

export default slice.reducer;
