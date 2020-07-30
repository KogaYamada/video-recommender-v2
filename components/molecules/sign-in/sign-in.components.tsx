import React, { FC, useState } from 'react';
import FormInput from '../../atoms/form-input/form-input.component';
import Button from '../../atoms/button/button.component';

import './sign-in.module.scss';

interface SigninProps {}

const SignIn: FC<SigninProps> = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div className="sign-in">
      <h2>Sign In</h2>
      <span>アカウントをお持ちの方</span>
      <form onSubmit={handleSubmit}>
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
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
};

export default SignIn;
