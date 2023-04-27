const grid = document.querySelector(".grid");
const score = document.querySelector("#score");
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHeight = 300;
let timerIntervalId;
let xSpeed = 2;
let ySpeed = 2;

const userStart = { x: 230, y: 10 };
let currentPosition = userStart;

const ballStart = {
  x: userStart.x + (blockWidth - ballDiameter) / 2,
  y: userStart.y + blockHeight,
};
let ballCurrentPosition = ballStart;

// Create Block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = { x: xAxis, y: yAxis };
    this.bottomRight = { x: xAxis + blockWidth, y: yAxis };
    this.topLeft = { x: xAxis, y: yAxis + blockHeight };
    this.topRight = { x: xAxis + blockWidth, y: yAxis + blockHeight };
  }
}

// All my blocks
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];

// Draw all my block
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft.x + "px";
    block.style.bottom = blocks[i].bottomLeft.y + "px";
    grid.appendChild(block);
  }
}
addBlocks();

// Add user
const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);

// Draw the user
function drawUser() {
  user.style.left = currentPosition.x + "px";
  user.style.bottom = currentPosition.y + "px";
}

// Draw the ball
function drawBall() {
  ball.style.left = ballCurrentPosition.x + "px";
  ball.style.bottom = ballCurrentPosition.y + "px";
}

// Move user
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition.x > 0) {
        currentPosition.x -= 10;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentPosition.x + blockWidth < boardWidth) {
        currentPosition.x += 10;
        drawUser();
      }
      break;
  }
}

document.addEventListener("keydown", moveUser);

// Add ball
const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

// Move ball
function moveBall() {
  ballCurrentPosition.x += xSpeed;
  ballCurrentPosition.y += ySpeed;
  drawBall();
  checkForCollisions();
}

timerIntervalId = setInterval(moveBall, 30);

// Check for collisions
function checkForCollisions() {
  // Check for wall collisions
  if (
    // Check collision between right side of ball and right wall
    ballCurrentPosition.x + ballDiameter >= boardWidth ||
    // Check collision between topside of ball and ceiling
    ballCurrentPosition.y + ballDiameter >= boardHeight ||
    // Check collision between left side of ball and left wall
    ballCurrentPosition.x <= 0
  ) {
    changeSpeed();
  }

  // Check for game over
  if (ballCurrentPosition.y <= 0) {
    clearInterval(timerIntervalId);
    score.innerHTML = "You lose";
    document.removeEventListener("keydown", moveUser);
  }
}

function changeSpeed() {
  if (xSpeed === 2 && ySpeed === 2) {
    ySpeed = -2;
    return;
  }
  if (xSpeed === 2 && ySpeed === -2) {
    xSpeed = -2;
    return;
  }
  if (xSpeed === -2 && ySpeed === -2) {
    ySpeed = 2;
    return;
  }
  if (xSpeed === -2 && ySpeed === 2) {
    xSpeed = 2;
    return;
  }
}
