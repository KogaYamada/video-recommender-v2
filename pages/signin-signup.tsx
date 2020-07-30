import { FC } from 'react';
import Head from 'next/head';

import SigninAndSignupBox from '../components/organisms/signin-signup-box/signin-signup-box.component';
import '../styles/pages/signin-signup.module.scss';

interface SigninAndSignupProps {}

const SigninAndSignup: FC<SigninAndSignupProps> = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>video Recommender</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="signin-signup">
        <SigninAndSignupBox />
      </div>
    </>
  );
};

export default SigninAndSignup;
