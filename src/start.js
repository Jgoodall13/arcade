import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import {Form, Login as LoginComp,Registration as RegistrationComp,Welcome} from "../components/welcome"
import { Home } from "../components/home";
import { Pong } from '../components/pong';
import { Breakout } from '../components/breakout';
import { First } from '../components/first';
import { Scores } from '../components/scores';

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
        <Route path='/breakout' component={ Breakout }/>
        <Route path='/scores' component={ Scores }/>
        <IndexRoute component={ First } />
  	    </Route>
    </Router>
);

let toRender = welcomeRouter;
if(window.location.pathname != "/welcome"){
        toRender = appRouter
    }

ReactDOM.render(toRender, document.querySelector('main'));
