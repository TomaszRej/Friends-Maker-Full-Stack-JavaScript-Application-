import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ForgotPassword from './components/ForgotPassword';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={withRouter(App)} />
            <Route path='/forgot-password' component={ForgotPassword} />
        </Switch>
    </BrowserRouter>


    , document.getElementById('root'));

