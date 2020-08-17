interface AuthValidationError {
  type: 'email' | 'password' | 'other';
  message: string;
}

/**
 * firebase authへアカウント作成リクエストを送ってエラーが返ってきた場合にエラーコードを元にエラーメッセージを作成する。
 *
 * 必要があればエラーコードの処理の種類を増やしていく。
 * @param errorCode createUserWithEmailAndPasswordメソッドのエラーコード
 */
export const authValidation = (errorCode: any): AuthValidationError => {
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
    case 'auth/user-disabled':
      return {
        type: 'email',
        message: '指定されたメールに対応するユーザーが無効になっています。',
      };
    case 'auth/wrong-password':
      return {
        type: 'password',
        message: 'パスワードが間違っています。',
      };
    case 'auth/weak-password':
      return {
        type: 'password',
        message: 'パスワードが脆弱です',
      };
    default:
      return {
        type: 'other',
        message:
          'エラーが発生しました。入力内容をご確認のうえ、もう一度お試しください。',
      };
  }
};
