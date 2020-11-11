# pong-game-javascript
A simple pong game in Vanilla JavaScript

Project done as a part of CSE-5335 Web Data Management Course at UTA.

Live demo can be found <a href="https://pong-game-javascript.herokuapp.com/">here</a>.

A simple pong game implemented in Vanilla JavaScript.

The following functions have been implemented,

- initialize: initializes the game
- startGame: starts the game (when you click the mouse)
- setSpeed: sets the speed to 0 (slow), 1 (medium), 2 (fast)
- resetGame: resets the game
- movePaddle: moves the paddle up and down, by following the mouse

<p align=justify>The pong court is 800x500px, the pong ball is 20x20px, and the paddle is 102x14px. They are all specified in pong.html. When the start button is clicked or left-click on the court, the ball starts from a random place at the left border of the court at a random angle between -π/4 and π/4. The paddle can move up and down on the right border by just moving the mouse (without clicking the mouse). The ball bounces on the left, top, and bottom borders of the court. Every time the ball is hit with the paddle, one strike is added. If the ball crosses the right border (the dotted line), the game is suspended, and the strikes so far becomes the score. Would need to click on the Start button or click on the court to restart with a zero number of strikes. The goal of this game is to move the paddle to protect the right border by hitting the ball.</p>
