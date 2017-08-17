//boiler
var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;
//ball cordinates
var ballX = 75;
var ballSpeedX = 5;
var ballY = 75
var ballSpeedY = 5;
//Padddle stuff
var paddleWidth = 100;
const paddleThick = 10;
const paddleEdge = 60;
var paddleX = 350;
//mouse cordinates
var mouseX = 0;
var mouseY = 0;
//keyboardmovement
var keyLeft = false;
var keyRight = false;
//bricks
const brickW = 80;
const brickH = 20;
const brickGap = 2;
const brickCols = 10;
const brickRows = 14;
var brickGrid = new Array(brickCols * brickRows);
var numberOfBricks = 0;
//life and death
var lives = 3;
var playerScore = 0;
var winScreen = false;
var looseScreen = false;
var startScreen = true;
//extras for fun
var boostsLeft = 3;
var level = 1; // Level change var

//audio
var snd = new Audio('bleep.wav');
var gameOver = new Audio('gameover.wav');
var looseLife = new Audio('looselife.wav')
var startGame = new Audio('bstart.wav');
var paddle = new Audio('paddle.wav');
var powerUp = new Audio('powerup.wav');


window.onload = function(){
    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);

    canvas.addEventListener('mousemove', mousemove);
    // canvas.addEventListener('click', boosterFun);
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false)
    canvas.addEventListener('click', function(){
        startGame.play();
        startScreen = false;
    })
    document.addEventListener('keypress',function(e) {
        var key = e.which || e.keycode;
        if (key === 13) {
            if(boostsLeft >0){
            powerUp.play();
            boostBall();
            boostsLeft--;
            console.log('boosts left = ' + boostsLeft);
        }
        }
    })
    ballReset();
    brickReset();
}

function updateAll(){
    moveAll();
    drawAll();
}

function moveAll(){
    if(startScreen) {
        return true;
    }
    ballMove();
    ballBrickHandler();
    ballPaddleHandler();
}
function drawAll(){
    create(0,0,w,h,'black'); // black screen
    // if win screen, loose screen or start screen doing different functions
    if(startScreen){
        drawStartScreen();
    }
    if(level == 2) {
        levelChange();
    }
    create(paddleX,h-paddleEdge,paddleWidth,paddleThick,'white');
    ball(); // clearly the ball
    drawBricks();
    movePaddleKeys();
    playerScoreFun();
    playerLivesFun();
    boostBallFun();
}

function mousemove(e) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = e.clientX - rect.left - root.scrollLeft;
    mouseY = e.clientY - rect.top - root.scrollTop;
    paddleX = mouseX - (paddleWidth/2);

}

function ballReset(){
    ballX = w/2;
    ballY = h/2;
    ballSpeedX = 5;
}

function create(left, top, width, height, color){
    ctx.fillStyle = color;
    ctx.fillRect(left, top, width, height)
}

function ball(){
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(ballX,ballY,10,0,Math.PI*2,true);
    ctx.fill();
}

function colorText(showWords, textX, textY, fillColor){
    ctx.fillStyle = fillColor;
    ctx.fillText(showWords, textX, textY);
}

function drawBricks(){
    for(var eachRow = 0; eachRow < brickRows; eachRow++){
        for (var eachCol = 0; eachCol < brickGrid.length; eachCol++) {

            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
            if (brickGrid[arrayIndex]) {
                create(brickW*[eachCol],brickH*[eachRow],brickW-brickGap,brickH-brickGap,'blue');
            }
        }
    }
}

function brickReset() {
    numberOfBricks = 0;
    var i;
    for(i = 0; i < brickCols * 3; i++) {
        brickGrid[i] = false;
    }
    for(; i < brickCols * brickRows; i++){
        brickGrid[i] = true;
        numberOfBricks++;
    }
}

function rowColToArrayIndex(col,row) {
    return col + brickCols * row;
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        keyRight = true;
    }
    else if(e.keyCode == 37) {
        keyLeft = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        keyRight = false;
    }
    else if(e.keyCode == 37) {
        keyLeft = false;
    }
}

function movePaddleKeys(){
    if(keyRight && paddleX < canvas.width-paddleWidth) {
        paddleX += 12;
}   else if(keyLeft && paddleX > 0) {
        paddleX -= 12;
    }
}

function ballMove(){
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballX > w) {
        ballSpeedX = -ballSpeedX
    }
    if(ballX < 0) {
        ballSpeedX = -ballSpeedX
    }
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY
    }
    if (ballY > h) {
        ballReset();
        lives--;
        looseLife.play();
        if(lives <= 0){ //This will reset the game board once lives are less than 1.
            gameOver.play();
            brickReset();
            lives = 3; //reset lives after death.
            playerScore = 0; //reset score after death.
            boostsLeft = 3; //reset boosts
            startScreen = true;
        }
        console.log('player lives ' + lives);
    }
}

function ballBrickHandler(){
    var ballBrickCol = Math.floor(ballX / brickW);
    var ballBrickRow = Math.floor(ballY / brickH);
    var brickIndexUnderball = rowColToArrayIndex(ballBrickCol, ballBrickRow)

    if(ballBrickCol >= 0 && ballBrickCol < brickCols && ballBrickRow >= 0 && ballBrickRow < brickRows){
        if (isBrickAtColRow(ballBrickCol, ballBrickRow)) {
            brickGrid[brickIndexUnderball] = false;
            numberOfBricks--;
            playerScore++;
            snd.play();
            console.log('Playerscore = ' + playerScore);
            console.log(numberOfBricks);

            var prevBallX = ballX - ballSpeedX;
            var prevBallY = ballY - ballSpeedY;
            var prevBrickCol = Math.floor(prevBallX / brickW);
            var prevBrickRow = Math.floor(prevBallY / brickH);
            var bothTastFail = true;

            if(prevBrickCol != ballBrickCol){
                if(isBrickAtColRow(prevBrickCol, ballBrickRow) == false){
                    ballSpeedX *= -1;
                    bothTastFail = false;
                }
            }
            if(prevBrickRow != ballBrickRow) {
                if(isBrickAtColRow(ballBrickCol, prevBrickRow) == false){
                    ballSpeedY *= -1;
                    bothTastFail = false;
                }
            }
            if(bothTastFail){
                ballSpeedY *= -1;
                ballSpeedX *= -1;
            }
        }
    }
}

function ballPaddleHandler(){
    var paddleTopEdgeY = h-paddleEdge;
    var paddleBottomEdgeY = paddleTopEdgeY + paddleThick;
    var paddleLeftEdgeX = paddleX;
    var paddleRightEdgeX = paddleX + paddleWidth;

    if (ballY > paddleTopEdgeY &&
        ballY < paddleBottomEdgeY &&
        ballX > paddleLeftEdgeX &&
        ballX < paddleRightEdgeX) {
            ballSpeedY *= -1;
            paddle.play();

            var paddleCenter = paddleX + (paddleWidth/2);
            var ballDistFromCenter = ballX - paddleCenter;
            ballSpeedX = ballDistFromCenter *.35;
        }
}

function isBrickAtColRow(col, row){
    if(col >= 0 && col < brickCols && row >= 0 && row < brickRows) {
        var brickIndexUnderCoord = rowColToArrayIndex(col,row);
        return brickGrid[brickIndexUnderCoord];
    } else {
        return false;
    }
}

function playerScoreFun(){
    ctx.fillStyle = 'red';
    ctx.font = '15px Copperplate'
    ctx.fillText('Player Score',100,20);
    ctx.fillText(playerScore, 135,35);
}

function playerLivesFun(){
    ctx.fillStyle = 'red';
    ctx.font='15px Copperplate';
    ctx.fillText('Lives', 380, 20);
    ctx.fillText(lives, 395, 35);
}

function boostBallFun(){
    ctx.fillStyle = 'red'
    ctx.font='15px Copperplate';
    ctx.fillText('Enter Key Boosts',600,20);
    ctx.fillText(boostsLeft, 660,35)
}

function boostBall(){
    ballSpeedX *= 5;
}

function drawStartScreen(){
    ctx.fillStyle = 'blue';
    ctx.font = 'bold 50px Copperplate';
    ctx.fillText('Start Game?',240, 500);
}

function levelChange(){
    paddleWidth = 60;
    brickReset();
}
