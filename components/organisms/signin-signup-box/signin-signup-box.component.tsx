import { FC } from 'react';
import SignIn from '../../molecules/sign-in/sign-in.components';
import SignUp from '../../molecules/sign-up/sign-up.component';

interface SigninAndSignupBoxProps {}

const SigninAndSignupBox: FC<SigninAndSignupBoxProps> = (): JSX.Element => {
  return (
    <div>
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SigninAndSignupBox;
