import React from 'react';

export class First extends React.Component {

    constructor(props) {
        super(props);
    }

    render(props) {
        return (
            <div>
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
            <div className='high-scores'>
                <a href='/scores'><h2>High Scores</h2></a>
                    <div className='high-score-box'>
                        <ol>
                            <li>Olof .............999999</li>
                            <li>Jacob ............888888</li>
                            <li>Ina ..............777777</li>
                            <li>Alex .............666666</li>
                            <li>Miranda ..........555555</li>
                            <li>Nic ..............444444</li>
                            <li>Matt .............333333</li>
                            <li>David ............222222</li>
                        </ol>
                    </div>
            </div>
            </div>
        )
    }
}
