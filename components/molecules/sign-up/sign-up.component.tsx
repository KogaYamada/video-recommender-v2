import { FC, useState } from 'react';

import FormInput from '../../atoms/form-input/form-input.component';

interface SignupProps {}

const SignUp: FC<SignupProps> = (): JSX.Element => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <div className="sign-up">
      <h2 className="title">I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form">
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDisplayName(e.target.value);
          }}
          label="Display Name"
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
      </form>
    </div>
  );
};

export default SignUp;
