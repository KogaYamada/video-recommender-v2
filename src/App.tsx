import React from 'react';
import { Route } from 'react-router-dom';
// pages
import HomePage from './pages/HomePage';
import SigninAndSignupPage from './pages/Signin-and-Signup';
import NewRecommend from './pages/NewRecommend';

const App = (): JSX.Element => {
  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/signin" component={SigninAndSignupPage} />
      <Route exact path="/new-recommend" component={NewRecommend} />
    </>
  );
};

export default App;
