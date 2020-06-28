
import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import HomePage from '../views/HomePage';
import loginPage from '../views/LoginPage';
import PrivateRoute from './PrivateRoute';
// import { HomePage, UserDetailsPage, SignInPage } from 'pages';

// function Admin(props) {
//   return <div>Admin Page</div>;
// }

const Router = () => (
  <Switch>
    {/* <Route path="/" component={Admin} /> */}
    <Route path="/login" component={loginPage} />
    <PrivateRoute path="*" component={HomePage} />
    {/* <Route path="/" component={HomePage} /> */}
  </Switch>
);

export default Router;
