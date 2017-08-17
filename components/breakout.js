import React from 'react';

export class Breakout extends React.Component {

    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const script = document.createElement("script");

        script.src = "/breakoutscript.js";
        script.async = true;

        document.body.appendChild(script);
    }
    render(props) {
        return (
            <div className='breakout-div'>
            <h1 style={{color: 'blue'}}>Breakout</h1>
            <canvas id="game-canvas" width="800" height="600"></canvas>
            </div>
        )
    }
}
