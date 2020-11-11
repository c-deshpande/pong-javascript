/* Declaring reference variables and initializing with default values*/
var court;
var paddle;
var ball;
var maxScoreBoard;
var strikeBoard;
var game;
var vX;
var vY;
var gameStarted;
var strikes = 0;
var maxScore = 0;
var velocity = [1, -1];

/* Initialize function which will run when the page loads for the first time */
function initialize() {

    /* Binding views to variables */
    court = document.getElementById("court");
    ball = document.getElementById("ball");
    paddle = document.getElementById("paddle");
    strikeBoard = document.getElementById("strikes");
    maxScoreBoard = document.getElementById("score");

    /* Giving the ball initial position to start from */
    ball.style.left = 0.01 + "px";
    ball.style.top = ((Math.random() * 100) + 1) + "px";

    /* Starting the ball either from 45 degree or -45 degree angle at random */
    var v = velocity[Math.floor(Math.random() * velocity.length)];

    /* Assigning the vX and vY value according to the angle we start from */
    vX = v;
    vY = v;

    gameSpeed = 10;
}

/* startGame function which starts the game according to the gameSpeed we gave selected (default is 10) */
function startGame(e) {
    /* If the game isn't started already, start the game according to the gameSpeed value */
    if (!gameStarted) {
        /* Start the game, using an interval to execute fun() every gameSpeed milliseconds (this is our dt value) */
        game = setInterval(fun, gameSpeed);
        /* Set gameStarted to true */
        gameStarted = true;
    }
}

/* Set the gameSpeed according to the selections of the radioButtons (default is 10) */
function setSpeed(n) {
    switch (n) {
        case 0:
            gameSpeed = 10;
            break;
        case 1:
            gameSpeed = 6;
            break;
        case 2:
            gameSpeed = 1;
            break;
        default:
            gameSpeed = 10;
            break;
    }
}

/* Reset the game to start from scratch */
function resetGame() {
    window.location.reload();
}

/* This is where the magic happens */
function fun() {

    /* Getting the ballTop, ballLeft, paddleTop and paddleLeft values i.e. pixels */
    /* Slicing the value and typecasting to number because we'll get it in the format for instance, '123px', hence slicing to remove the 'px' and then converting to number */
    ballTop = Number(ball.style.top.slice(0, ball.style.top.length - 2));
    ballLeft = Number(ball.style.left.slice(0, ball.style.left.length - 2));
    paddleTop = Number(paddle.style.top.slice(0, paddle.style.top.length - 2));
    paddleLeft = Number(paddle.style.left.slice(0, paddle.style.left.length - 2));

    /* Checking if the ball is touching either the top or the bottom boundary of the court, if yes then invert the vY value to bounce it to other direction */
    /* Provided an offset of -90 to bypass the problem of court shifting downwards */
    if (ballTop <= -90 || ballTop >= (court.getBoundingClientRect().height - ball.height) - 90) {
        vY = -vY;
    }

    /* Checking if the ball is touching either the left or right border, if yes then invert the vX value to bounce it to other direction */
    if (ballLeft <= 0 || ballLeft >= (court.getBoundingClientRect().width - ball.width)) {
        vX = -vX;
    }

    /* Assigning the new ballTop and ballLeft value after bouncing off the walls */
    ballTop += vY;
    ballLeft += vX;

    /* Appending 'px' to the values as we use px values and JavaScript won't accept just numbers */
    ball.style.top = ballTop + "px";
    ball.style.left = ballLeft + "px";

    /* This piece of code checks if the ball is making contact with the paddle */
    /* If ballLeft is equal to the paddleLeft, that means that the ball is touching the paddle */
    if (ballLeft >= paddleLeft) {
        /* Now we are checking the ball's dimensions lie inside the range of the paddle's height we are adding the 90 offset as we've added it before */
        if ((ballTop + 90) + (ball.width / 2.0) > paddleTop && (ballTop + 90) < paddleTop + paddle.height - (ball.width / 2.0)) {
            /* As the ball made contact with the paddle, we invert the vX value to get it to bounce back to the opposite direction */
            vX = -vX;
            /* We increment our strikes and update the scoreboard */
            strikes++;
            strikeBoard.innerHTML = strikes;
            /* Update the maxScoreBoard if the new strikes are greater than the current maxScore */
            if (maxScore < strikes) {
                maxScore = strikes;
                maxScoreBoard.innerHTML = maxScore;
            }
        } else if (ballLeft + ball.width >= paddle.width) {
            /* If the ball goes out of the court on the right hand side we simple reset the game and update the max score and reset strikes */
            window.clearInterval(game);
            /* Update the maxScoreBoard if the new strikes are greater than the current maxScore */
            if (maxScore < strikes) {
                maxScore = strikes;
                maxScoreBoard.innerHTML = maxScore;
            }
            strikeBoard.innerHTML = 0;
            strikes = 0;
            /* We reinitialize the game and set the gameStarted to false */
            initialize();
            /* Game has ended */
            gameStarted = false;
        }
    }
}

/* This piece of code deals with the movement of the paddle using the mouse (onmousemove method) */
function movePaddle(e) {
    /* We check if the paddle lies in between the court's top and bottom boundaries */
    if (e.clientY < court.getBoundingClientRect().bottom - paddle.offsetHeight) {
        if (e.clientY > court.getBoundingClientRect().top) {
            /* If we are inside the court boundaries we update the paddle's top margin */
            paddle.style.top = e.clientY - court.offsetTop + 'px';
        }
    }
}