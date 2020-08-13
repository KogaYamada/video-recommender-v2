import React, { FC } from 'react';
import SignIn from '../../molecules/sign-in/sign-in.components';
import SignUp from '../../molecules/sign-up/sign-up.component';
import './signin-signup-box.styles.scss';

interface SigninAndSignupBoxProps {}

const SigninAndSignupBox: FC<SigninAndSignupBoxProps> = (): JSX.Element => {
  return (
    <div className="box-wrap">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SigninAndSignupBox;
