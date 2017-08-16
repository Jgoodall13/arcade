import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import {Form, Login as LoginComp,Registration as RegistrationComp,Welcome} from "../components/welcome"
import { Home } from "../components/home";
import { Pong } from '../components/pong'

function Login() {
    return <Form component={ LoginComp } />;
}
function Registration() {
    return <Form component={ RegistrationComp } />;
}

const welcomeRouter = (
    <Router history={ hashHistory }>
        <Route path="/" component={ Welcome }>
            <Route path="/login" component={ Login } />
            <Route path="/register" component={ Registration } />
            <IndexRoute component={ Registration } />
  	    </Route>
    </Router>
);

const appRouter = (
    <Router history={ browserHistory }>
        <Route path="/" component={ Home }>
        <Route path='/pong' component={ Pong }/>
        <IndexRoute component={ Home } />
  	    </Route>
    </Router>
);

let toRender = welcomeRouter;
if(window.location.pathname != "/welcome"){
        toRender = appRouter
    }

ReactDOM.render(toRender, document.querySelector('main'));
