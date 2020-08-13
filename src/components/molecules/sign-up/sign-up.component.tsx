import React, { FC, useState, useContext } from 'react';
import { Context as AuthContext } from '../../../context/AuthContext';

import { signupValidation } from '../../../modules/auth-validation';

import FormInput from '../../atoms/form-input/form-input.component';
import Button from '../../atoms/button/button.component';

import './sign-up.styles.scss';

interface SignupProps {}

const SignUp: FC<SignupProps> = (): JSX.Element => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { state, signup, signout, addAuthError, refreshAuthError } = useContext(
    AuthContext
  );
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    refreshAuthError();
    if (
      signupValidation(
        { displayName, email, password, confirmPassword },
        addAuthError
      )
    ) {
      signup(displayName, email, password);
      setDisplayName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="sign-up">
      <h2 className="title">Sign Up</h2>
      <span>アカウントをお持ちでない方</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDisplayName(e.target.value);
          }}
          label="User Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setConfirmPassword(e.target.value);
          }}
          label="Confirm Password"
          required
        />
        <Button type="submit">Sign Up</Button>
        <Button type="button" onClick={signout}>
          Sign Out
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
