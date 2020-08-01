import { AuthError } from '../apis/firebase/auth-error';
interface SigninInputValue {
  email: string;
  password: string;
}

interface SignupInputValue {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
/**
 * サインインフォームの入力内容を検証する関数
 * @param inputValue サインインフォームに入力された値
 * @param addErrorAction AuthContextのエラーを追加するアクション関数
 * @returns バリデーション結果。何もエラーがなければtrue、エラーがあればfalseを返す。
 */
export const signinValidation = (
  inputValue: SigninInputValue,
  addErrorAction: (authError: AuthError) => void
): boolean => {
  const { email, password } = inputValue;
  let error: boolean = false;

  // emailの文字数チェック
  if (email.length === 0) {
    addErrorAction({
      type: 'email',
      message: 'メールアドレスを入力してください',
    });
    error = true;
  }

  // passwordの文字数チェック
  if (password.length === 0) {
    addErrorAction({
      type: 'password',
      message: 'パスワードを入力してください',
    });
    error = true;
  }

  return !error;
};

/**
 * サインアップフォームの入力内容を検証する関数
 * @param inputValue サインアップフォームに入力された値
 * @param addErrorAction AuthContextのエラーを追加するアクション関数
 * @returns バリデーション結果。何もエラーがなければtrue、エラーがあればfalseを返す。
 */
export const signupValidation = (
  inputValue: SignupInputValue,
  addErrorAction: (authError: AuthError) => void
): boolean => {
  const { displayName, email, password, confirmPassword } = inputValue;
  let error: boolean = false;

  // displayNameの文字数チェック
  if (displayName.length === 0) {
    addErrorAction({
      type: 'displayName',
      message: 'ユーザー名を入力してください',
    });
    error = true;
  }

  // emailの文字数チェック
  if (email.length === 0) {
    addErrorAction({
      type: 'email',
      message: 'メールアドレスを入力してください',
    });
    error = true;
  }

  // passwordの文字数チェック(6文字以上)
  if (password.length <= 6) {
    addErrorAction({
      type: 'password',
      message: 'パスワードは6文字以上で入力してください',
    });
    error = true;
  }

  // passwordとconfirmPasswordの入力内容が一致しているかチェック
  if (password.length !== confirmPassword.length) {
    addErrorAction({
      type: 'confirm',
      message: 'パスワードが一致しません',
    });
    error = true;
  }
  return !error;
};

export const makeFormError = (formName: string, errors: AuthError[]) => {
  const e = errors.find((error) => error.type === formName);
  if (e) {
    return { error: true, message: e.message };
  } else {
    return { error: false };
  }
};
