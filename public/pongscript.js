var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var paddle1Y = 250;
var paddle2Y = 250;
const paddleHeight = 100;
const paddleWidth = 10;

var player1Score = 0;
var player2Score = 0;
const winningScore = 3;

var winScreen = false;
var startScreen = true;

var img = new Image();
img.src = 'grass.png'

//audio
var start = new Audio('pongstart.wav');
var paddle = new Audio('paddle.wav');
var score = new Audio('score.wav');

//This is basically our engine to start the game
window.onload = function(){
    canvas = document.getElementById('game-canvas');
    canvasContext = canvas.getContext('2d');

    //The speed at which things are happening
    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);

    canvas.addEventListener('hover', function(e) {

    })

    //Click to start new game
    canvas.addEventListener('click',handleMouseClick);
    document.addEventListener('click', function() {
        start.play();
        startScreen = false;
    })

    //obvoius, but a event listner for mouse and paddle
    canvas.addEventListener('mousemove', function(e){
        var mousePos = calculateMousePos(e)
        paddle1Y = mousePos.y -(paddleHeight/2);
    })
}
//This is where are movement will take place
function moveEverything(){
    if(winScreen || startScreen) {
        return;
    }
    computerMovement();
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX > canvas.width) {
        if (ballY > paddle2Y && ballY <paddle1Y+paddleHeight) {
            paddle.play();
            ballSpeedX = -ballSpeedX;
            var deltaY = ballY - (paddle2Y+paddleHeight/2);
            ballSpeedY = deltaY * 0.35;
        } else {
            score.play();
            player1Score++;
            ballReset();
        }
    }
    if (ballX < 0) {
        if (ballY > paddle1Y && ballY <paddle1Y+paddleHeight) {
            paddle.play();
            ballSpeedX = -ballSpeedX;
            var deltaY = ballY - (paddle1Y+paddleHeight/2);
            ballSpeedY = deltaY * 0.35;
        } else {
            score.play();
            player2Score++;
            ballReset();
        }
    }
    if(ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if(ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
}
//Drawing any canvas element will take place here.
function drawEverything () {
    //Green Background
    colorRect(0, 0, canvas.width, canvas.height, 'black');

    if(startScreen) {
        canvasContext.fillStyle = 'red';
        canvasContext.font = '30px Copperplate';
        canvasContext.fillText('Click to Start',300,300);
    }
    //Win Screen
    if(winScreen) {
        canvasContext.fillStyle = 'white';
        canvasContext.font = '30px Copperplate';
        if(player1Score >= winningScore){
            console.log('user won');
            canvasContext.fillText('User Won!',330,300);
        }
        else if(player2Score >= winningScore){
            canvasContext.fillText('Computer Won!',300,300);
        }
        canvasContext.fillText('Click to Continue',280,350);
        return;

    }
    //left paddle
    colorRect(0, paddle1Y, paddleWidth, paddleHeight, 'white');
    //right computer paddle
    colorRect(canvas.width-paddleWidth, paddle2Y, paddleWidth, paddleHeight, 'white');
    //ball
    colorCircle(ballX, ballY, 10, 'white')
    //
    //the net
    drawNet();
    canvasContext.fillStyle = 'white';
    canvasContext.font = '15px Copperplate';
    canvasContext.fillText('Player Score',100,85)
    canvasContext.fillText(player1Score, 140,100);
    canvasContext.fillText('Computer Score', canvas.width-200,85)
    canvasContext.fillText(player2Score, canvas.width-135, 100)
}

function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

function ballReset(){
    if (player1Score >= winningScore || player2Score >= winningScore){
        winScreen = true;
    }
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2
    ballY = canvas.height/2
}

function computerMovement(){
    var paddle2YCenter = paddle2Y + (paddleHeight/2);
    if(paddle2YCenter < ballY -35) {
        paddle2Y += 6;
    } else if (paddle2YCenter > ballY +35){
        paddle2Y -= 6;
    }
}

function calculateMousePos(e) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = e.clientX - rect.left - root.scrollLeft;
    var mouseY = e.clientY - rect.top - root.scrollTop;
    return{
        x: mouseX,
        y: mouseY
    };
}

function handleMouseClick(e) {
    if(winScreen) {
        start.play();
        player1Score = 0;
        player2Score = 0;
        winScreen = false;
    }
}

function drawNet(){
    for (var i = 0; i < canvas.height; i+=40) {
        colorRect(canvas.width/2-1,i,5,20,'white');
    }
}
