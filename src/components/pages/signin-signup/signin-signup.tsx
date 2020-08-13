import React, { FC } from 'react';

import SigninAndSignupBox from '../../organisms/signin-signup-box/signin-signup-box.component';
import './signin-signup.styles.scss';

interface SigninAndSignupProps {}

const SigninAndSignup: FC<SigninAndSignupProps> = (): JSX.Element => {
  return (
    <>
      <SigninAndSignupBox />
    </>
  );
};

export default SigninAndSignup;
