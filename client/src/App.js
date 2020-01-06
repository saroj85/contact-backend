import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './component/layout/Navbar';
import Home from './component/pages/Home';
import About from './component/pages/About';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/authState';
import AlertState  from './context/alert/alertState';
import Register from './component/auth/Register';
import Login from './component/auth/Login';
import Alert from './component/layout/Alert';


const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
        <Router>
          <React.Fragment>
            <Navbar title="contact Keeper" icon="fas fa-id-card-alt" />
            <div className="container">
              <Alert />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </React.Fragment>
        </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
