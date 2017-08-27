import React from 'react';
import Axios from 'axios';

export class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render(props) {
        return (
            <div>
            <div className='log-out-div'>
                <a href='/logout' ><img className="logo-small" src="/images/joystick.svg"/><h5 className='log-out' style={{fontSize: '8px'}}>Logout</h5></a>
            </div>
                <div className='home-nav'>
                    <a className='jacob-home' href='/'><h1 className='jacobs-first'>Jacob's Arcade</h1></a>
                </div>
                {this.props.children}
            </div>
        )
    }
}
