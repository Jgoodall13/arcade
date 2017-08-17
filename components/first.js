import React from 'react';

export class First extends React.Component {

    constructor(props) {
        super(props);
    }

    render(props) {
        return (
            <div className='games'>
                <div className='first-pong'>
                    <a href='/pong'><h2>Pong</h2></a>
                    <img className='pong-gif' src='images/ponggif.gif'/>
                </div>
                <div className='first-breakout'>
                    <a href='/breakout'><h2>Breakout</h2></a>
                    <img className='breakout-gif' src='images/breakoutgif.gif'/>
                </div>
            </div>
        )
    }
}
