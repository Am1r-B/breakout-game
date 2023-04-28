const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");

const board = {
  width: 560,
  height: 300,
};

const block = {
  width: 100,
  height: 20,
};

const userStart = { x: 230, y: 10 };
const user = {
  position: userStart,
};

const ball = {
  diameter: 20,
  speed: {
    x: 2,
    y: 2,
  },
};
const ballStart = {
  x: userStart.x + (block.width - ball.diameter) / 2,
  y: userStart.y + block.height,
};
ball.position = ballStart;

let timerIntervalId;
let score = 0;

// Create Block
class Block {
  constructor(xAxis, yAxis) {
    this.position = { x: xAxis, y: yAxis };
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
    const newBlock = document.createElement("div");
    newBlock.classList.add("block");
    newBlock.style.left = blocks[i].position.x + "px";
    newBlock.style.bottom = blocks[i].position.y + "px";
    blocks[i].element = newBlock;
    grid.appendChild(newBlock);
  }
}
addBlocks();

// Add user
const userDisplay = document.createElement("div");
userDisplay.classList.add("user");
drawUser();
grid.appendChild(userDisplay);

// Draw the user
function drawUser() {
  userDisplay.style.left = user.position.x + "px";
  userDisplay.style.bottom = user.position.y + "px";
}

// Draw the ball
function drawBall() {
  ballDisplay.style.left = ball.position.x + "px";
  ballDisplay.style.bottom = ball.position.y + "px";
}

// Move user
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (user.position.x > 0) {
        user.position.x -= 10;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (user.position.x + block.width < board.width) {
        user.position.x += 10;
        drawUser();
      }
  }
}

document.addEventListener("keydown", moveUser);

// Add ball
const ballDisplay = document.createElement("div");
ballDisplay.classList.add("ball");
drawBall();
grid.appendChild(ballDisplay);

// Move ball
function moveBall() {
  ball.position.x += ball.speed.x;
  ball.position.y += ball.speed.y;
  drawBall();
  checkForCollisions();
}

timerIntervalId = setInterval(moveBall, 30);

// Check for collisions
function checkForCollisions() {
  // Check for block collisions
  for (let i = 0; i < blocks.length; i++) {
    if (
      ball.position.x < blocks[i].position.x + block.width &&
      ball.position.x + ball.diameter > blocks[i].position.x &&
      ball.position.y < blocks[i].position.y + block.height &&
      ball.position.y + ball.diameter > blocks[i].position.y
    ) {
      blocks[i].element.classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = score;

      // Check for win
      if (blocks.length <= 0) {
        scoreDisplay.innerHTML = "YOU WIN";
        clearInterval(timerIntervalId);
        document.removeEventListener("keydown", moveUser);
      }
    }
  }

  // Check for wall collisions
  if (
    // Check collision between right side of ball and right wall
    ball.position.x + ball.diameter >= board.width ||
    // Check collision between topside of ball and ceiling
    ball.position.y + ball.diameter >= board.height ||
    // Check collision between left side of ball and left wall
    ball.position.x <= 0
  ) {
    changeDirection();
  }

  // Check for user collisions
  if (
    ball.position.x < user.position.x + block.width &&
    ball.position.x + ball.diameter > user.position.x &&
    ball.position.y < user.position.y + block.height &&
    ball.position.y + ball.diameter > user.position.y
  ) {
    ball.speed.y = Math.abs(ball.speed.y);
  }

  // Check for game over
  if (ball.position.y <= 0) {
    clearInterval(timerIntervalId);
    scoreDisplay.innerHTML = "You lose";
    document.removeEventListener("keydown", moveUser);
  }
}

function changeDirection() {
  if (ball.speed.x * ball.speed.y >= 0) {
    ball.speed.y = -ball.speed.y;
  } else {
    ball.speed.x = -ball.speed.x;
  }
}
