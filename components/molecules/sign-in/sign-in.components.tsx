import React, { FC, useState, useContext } from 'react';

import { Context as AuthContext } from '../../../context/AuthContext';
import FormInput from '../../atoms/form-input/form-input.component';
import Button from '../../atoms/button/button.component';
import Card from '../../atoms/card/card.component';

import {
  signinValidation,
  makeFormError,
} from '../../../modules/auth-validation';

import './sign-in.styles.scss';

interface SigninProps {}

const SignIn: FC<SigninProps> = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, signin, addAuthError, refreshAuthError } = useContext(
    AuthContext
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    refreshAuthError();
    if (signinValidation({ email, password }, addAuthError)) {
      signin(email, password);
    }
  };

  return (
    <div className="sign-in">
      <Card>
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
            {...makeFormError('email', state.errors)}
          />
          <FormInput
            name="password"
            type="password"
            value={password}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
            label="password"
            {...makeFormError('password', state.errors)}
          />
          <Button type="submit">Sign In</Button>
          <Button type="button" color="blue">
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;
