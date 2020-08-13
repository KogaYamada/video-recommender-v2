type AuthErrorCodeTypes =
  | 'displayName'
  | 'email'
  | 'password'
  | 'confirm'
  | 'other';

export interface AuthError {
  type: AuthErrorCodeTypes;
  message: string;
}

/**
 * firebase authへアカウント作成リクエストを送ってエラーが返ってきた場合にエラーコードを元にエラーメッセージを作成する。
 *
 * 必要があればエラーコードの処理の種類を増やしていく。
 * @param errorCode firebaseのauthメソッドのエラーコード
 */
const AuthErrorCodeToMessage = (errorCode: string): AuthError => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return {
        type: 'email',
        message: 'このメールアドレスは既に登録されています。',
      };
    case 'auth/invalid-email':
      return {
        type: 'email',
        message: '入力されたメールアドレスの形式が不正です。',
      };
    case 'auth/user-not-found':
      return {
        type: 'email',
        message: 'このメールアドレスは登録されていません。',
      };
    case 'auth/wrong-password':
      return {
        type: 'password',
        message: 'パスワードが間違っています。',
      };
    default:
      return {
        type: 'other',
        message:
          'エラーが発生しました。入力内容をご確認のうえ、もう一度お試しください。',
      };
  }
};

export default AuthErrorCodeToMessage;
