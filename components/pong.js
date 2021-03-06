import React from 'react';

export class Pong extends React.Component {

    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const script = document.createElement("script");

        script.src = "/pongscript.js";
        script.async = true;

        document.body.appendChild(script);
    }
    render(props) {
        return (
            <div className='pong-div'>
            <h1 style={{color: 'blue'}}>Pong</h1>
            <canvas id="game-canvas" width="800" height="600"></canvas>
            </div>
        )
    }
}
