import React, { useContext } from 'react';
import Header from './components/Header/Header';
import SignUpForm from './components/Register/SignUpForm';
import SignInForm from './components/Register/SignInForm';
import AdminPage from './components/admin/AdminPage';
import AllRequestUser from './components/Requests/MainRequest';
import { UserContext } from './Context/Context';
import {
  BrowserRouter as Router, Switch, Route, Redirect
} from "react-router-dom";


function App() {
  const context = useContext(UserContext);
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          {!context.loggedIn && <SignInForm />}
          {context.loggedIn && (context.userData.role === "admin") && (<Redirect to="/admin" />)}
          {context.loggedIn && (context.userData.role === "user") && (<Redirect to="/request" />)}
        </Route>
        <Route exact path="/signup">
          {!context.loggedIn && <SignUpForm />}
        </Route>
        <Route exact path="/admin">
          {context.loggedIn && (context.userData.role === 'admin') && (
            <AdminPage />)}
        </Route>
        <Route exact path="/request">
          {context.loggedIn && (context.userData.role === 'user') && (
            <AllRequestUser />)}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;




