import React from 'react';
import Axios from 'axios';

export class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render(props) {
        return (
            <div>
            <div className='home-nav'>
                <a className='jacob-home' href='/'><h1>Jacobs Arcade!</h1></a>
                <a href='/logout' ><img className="logo-small" src="/images/joystick.svg"/><h5 className='log-out'>Logout</h5></a>
            </div>
            <div className='games'>
            <a href='/pong'>Pong</a>
            </div>
            </div>
        )
    }
}
