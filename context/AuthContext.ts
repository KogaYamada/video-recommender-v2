import { Dispatch } from 'react';
import CreateDataContext from './createDataContext';

import { auth, createUserProfileDocument } from '../apis/firebase/config';
import authErrorCodeToMessage, { AuthError } from '../apis/firebase/auth-error';

enum AuthActionTypes {
  SIGN_IN_AND_SIGN_UP,
  SIGN_OUT,
  ERROR,
}

interface UserData {
  displayName: string;
  email: string;
  uid: string;
  photoURL: string | null;
}

interface SigninAndSignupAction {
  type: AuthActionTypes.SIGN_IN_AND_SIGN_UP;
  payload: UserData;
}
interface SignoutAction {
  type: AuthActionTypes.SIGN_OUT;
}
interface AuthErrorAction {
  type: AuthActionTypes.ERROR;
  payload: AuthError;
}

interface AuthState {
  currentUser: UserData;
  error: AuthError;
}

type Action = SigninAndSignupAction | SignoutAction | AuthErrorAction;
const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case AuthActionTypes.SIGN_IN_AND_SIGN_UP:
      return { ...state, currentUser: action.payload, error: null };
    case AuthActionTypes.SIGN_OUT:
      return { ...state, currentUser: null };
    case AuthActionTypes.ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const signup = (
  dispatch: Dispatch<SigninAndSignupAction | AuthErrorAction>
) => async (username: string, email: string, passpord: string) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, passpord);
    user.updateProfile({
      displayName: username,
    });
    createUserProfileDocument(user);
    dispatch({
      type: AuthActionTypes.SIGN_IN_AND_SIGN_UP,
      payload: {
        email: user.email,
        displayName: user.displayName,
        uid: user.uid,
        photoURL: user.photoURL,
      },
    });
  } catch (error) {
    const e = authErrorCodeToMessage(error.code);
    dispatch({ type: AuthActionTypes.ERROR, payload: e });
    console.log('error', e.message);
  }
};

const signin = (
  dispatch: Dispatch<SigninAndSignupAction | AuthErrorAction>
) => async (email: string, passpord: string) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, passpord);
    createUserProfileDocument(user);
    dispatch({
      type: AuthActionTypes.SIGN_IN_AND_SIGN_UP,
      payload: {
        email: user.email,
        displayName: user.displayName,
        uid: user.uid,
        photoURL: user.photoURL,
      },
    });
  } catch (error) {
    const e = authErrorCodeToMessage(error.code);
    dispatch({ type: AuthActionTypes.ERROR, payload: e });
    console.log('error', e.message);
  }
};

const signout = (dispatch: Dispatch<SignoutAction>) => () => {
  dispatch({ type: AuthActionTypes.SIGN_OUT });
};

export const { Context, Provider } = CreateDataContext(
  authReducer,
  { signup, signin, signout },
  { currentUser: null, error: null }
);
