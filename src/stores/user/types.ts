import { Dispatch, SetStateAction } from 'react';

/**
 * ログインページ、サインインページの各入力欄の情報
 */
interface InputState {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onChangeText: (newValue: string) => void;
  errorMessage: string;
  addErrorMessage: (errorMessage: string) => void;
}
interface SignupArguments {
  username: InputState;
  email: InputState;
  password: InputState;
}

interface SigninArguments {
  email: InputState;
  password: InputState;
}
/*----------------------------------------*/
/*---- 非同期アクションクリエーターのタイプ ----*/
/*----------------------------------------*/
export type TryLocalSignin = () => (dispatch: any) => void;
export type Signup = (
  username: InputState,
  email: InputState,
  password: InputState
) => (dispatch: any) => void;
export type Signin = (
  email: InputState,
  password: InputState
) => (dispatch: any) => void;
export type Signout = () => (dispatch: any) => void;

/**
 * ストアで管理するユーザーのstate.
 */
export interface UserState {
  id: string | null;
  displayName: string | null;
  email: string | null;
  createdAt: firebase.firestore.Timestamp | null;
  description: string | null;
  photoURL: string | null;
}
