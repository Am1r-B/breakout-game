const grid = document.querySelector(".grid");
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
let timerIntervalId;

const userStart = { x: 230, y: 10 };
let currentPosition = userStart;

const ballStart = {
  x: userStart.x + blockWidth / 2 - 10,
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
const ball = document.createElement("dvi");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

// Move ball
function moveBall() {
  ballCurrentPosition.x += 2;
  ballCurrentPosition.y += 2;
  drawBall();
}

timerIntervalId = setInterval(moveBall, 30);
