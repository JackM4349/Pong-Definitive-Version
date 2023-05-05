// Set up canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

// Ball object
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 5,
  dx: 5,
  dy: 5
};

// Paddle object
const paddle = {
  x: 0,
  y: canvas.height / 2 - 50,
  width: 10,
  height: 100,
  speed: 10,
  dy: 0
};

// Draw ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.closePath();
}

// Draw paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.closePath();
}

// Move paddle
function movePaddle() {
  paddle.y += paddle.dy;

  // Check for boundary collision
  if (paddle.y < 0) {
    paddle.y = 0;
  } else if (paddle.y + paddle.height > canvas.height) {
    paddle.y = canvas.height - paddle.height;
  }
}

// Handle key down
function keyDown(e) {
  if (e.key === 'ArrowUp' || e.key === 'Up') {
    paddle.dy = -paddle.speed;
  } else if (e.key === 'ArrowDown' || e.key === 'Down') {
    paddle.dy = paddle.speed;
  }
}

// Handle key up
function keyUp(e) {
  if (e.key === 'ArrowUp' || e.key === 'Up' || e.key === 'ArrowDown' || e.key === 'Down') {
    paddle.dy = 0;
  }
}

// Update ball
function updateBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Check for wall collision
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy = -ball.dy;
  }

  // Check for paddle collision
  if (ball.x - ball.radius < paddle.x + paddle.width && ball.y + ball.radius > paddle.y && ball.y - ball.radius < paddle.y + paddle.height) {
    ball.dx = -ball.dx;
  }

  // Check for goal
  if (ball.x + ball.radius > canvas.width) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
  }
}

// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
}
  drawPaddle();
}

// Update everything
function update() {
  updateBall();
  movePaddle();
}

// Loop
function loop() {
  draw();
  update();
  requestAnimationFrame(loop);
}

// Start game
function startGame() {
  requestAnimationFrame(loop);
}

// Event listeners
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Start game
startGame();
const music = document.getElementById('music');
function startGame() {
  requestAnimationFrame(loop);
  music.play();
}
function stopGame() {
  cancelAnimationFrame(loop);
  music.pause();
  music.currentTime = 0;
}

window.addEventListener('beforeunload', stopGame);