import { Dispatch } from 'react';
import CreateDataContext from './createDataContext';

import { auth, createUserProfileDocument } from '../apis/firebase/config';
import authErrorCodeToMessage, { AuthError } from '../apis/firebase/auth-error';

// action types
enum AuthActionTypes {
  SIGN_IN_AND_SIGN_UP,
  SIGN_OUT,
  ADD_ERROR,
  REFRESH_ERROR,
}

// user state
interface UserData {
  displayName: string | null;
  email: string | null;
  uid: string;
  photoURL: string | null;
}

// action interfacies
interface SigninAndSignupAction {
  type: AuthActionTypes.SIGN_IN_AND_SIGN_UP;
  payload: UserData;
}
interface SignoutAction {
  type: AuthActionTypes.SIGN_OUT;
}
interface AddAuthErrorAction {
  type: AuthActionTypes.ADD_ERROR;
  payload: AuthError;
}
interface RefreshAuthErrorAction {
  type: AuthActionTypes.REFRESH_ERROR;
}

// auth context status
interface AuthState {
  currentUser: UserData | null;
  errors: AuthError[];
}

// actions type
type Action =
  | SigninAndSignupAction
  | SignoutAction
  | AddAuthErrorAction
  | RefreshAuthErrorAction;
const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case AuthActionTypes.SIGN_IN_AND_SIGN_UP:
      return { ...state, currentUser: action.payload, errors: [] };
    case AuthActionTypes.SIGN_OUT:
      return { ...state, currentUser: null };
    case AuthActionTypes.ADD_ERROR:
      return { ...state, errors: state.errors.concat(action.payload) };
    case AuthActionTypes.REFRESH_ERROR:
      return { ...state, errors: [] };
    default:
      return state;
  }
};

const signup = (
  dispatch: Dispatch<SigninAndSignupAction | AddAuthErrorAction>
) => async (username: string, email: string, passpord: string) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, passpord);
    if (!user) return;
    await user.updateProfile({
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
    dispatch({ type: AuthActionTypes.ADD_ERROR, payload: e });
    console.log('error', e.message);
  }
};

const signin = (
  dispatch: Dispatch<SigninAndSignupAction | AddAuthErrorAction>
) => async (email: string, passpord: string) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, passpord);
    if (!user) return;
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
    dispatch({ type: AuthActionTypes.ADD_ERROR, payload: e });
    console.log('error', e.message);
  }
};

const signout = (dispatch: Dispatch<SignoutAction>) => () => {
  auth.signOut().then(() => console.log('sign out!'));
  dispatch({ type: AuthActionTypes.SIGN_OUT });
};

const addAuthError = (dispatch: Dispatch<AddAuthErrorAction>) => (
  error: AuthError
) => {
  dispatch({ type: AuthActionTypes.ADD_ERROR, payload: error });
};

const refreshAuthError = (dispatch: Dispatch<RefreshAuthErrorAction>) => () => {
  dispatch({ type: AuthActionTypes.REFRESH_ERROR });
};

export const { Context, Provider } = CreateDataContext(
  authReducer,
  { signup, signin, signout, addAuthError, refreshAuthError },
  { currentUser: null, errors: [] }
);
