import React, { FC, useState } from 'react';
import FormInput from '../../atoms/form-input/form-input.component';

import './sign-in.styles.scss';

interface SigninProps {}

const SignIn: FC<SigninProps> = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="sign-in">
      <h2>I aleady have an account</h2>
      <span>Sign in with your email and password</span>
      <form>
        <FormInput
          name="email"
          type="email"
          value={email}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
          label="password"
          required
        />
        <div className="buttons"></div>
      </form>
    </div>
  );
};

export default SignIn;
