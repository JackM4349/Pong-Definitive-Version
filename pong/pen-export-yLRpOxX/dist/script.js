// Game Constants and Variables
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const container = document.getElementById("container");
const scoreContainer = document.getElementById("score");
const player1Score = document.getElementById("player1-score");
const player2Score = document.getElementById("player2-score");
const musicControls = document.getElementById("music-controls");
const playMusicButton = document.getElementById("play-music");
const stopMusicButton = document.getElementById("stop-music");
const ballRadius = 10;
const paddleHeight = 80;
const paddleWidth = 10;
const paddleMargin = 50;
const player1 = {
  x: paddleMargin,
  y: canvas.height / 2 - paddleHeight / 2,
  score: 0,
  speed: 0,
};
const player2 = {
  x: canvas.width - paddleMargin - paddleWidth,
  y: canvas.height / 2 - paddleHeight / 2,
  score: 0,
  speed: 0,
};
let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  dx: 5,
  dy: -5,
};
let gameStarted = false;
let gameOver = false;
let musicPlaying = false;
const music = new Audio("music.mp3");
music.loop = true;

// Functions
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(x, y) {
  ctx.beginPath();
  ctx.rect(x, y, paddleWidth, paddleHeight);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

function drawNet() {
  ctx.beginPath();
  ctx.setLineDash([7, 15]);
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.strokeStyle = "#fff";
  ctx.stroke();
  ctx.closePath();
}

function drawScores() {
  player1Score.textContent = player1.score;
  player2Score.textContent = player2.score;
}

function movePlayer1() {
  player1.y += player1.speed;
  if (player1.y < 0) {
    player1.y = 0;
  } else if (player1.y > canvas.height - paddleHeight) {
    player1.y = canvas.height - paddleHeight;
  }
}

function movePlayer2() {
  player2.y += player2.speed;
  if (player2.y < 0) {
    player2.y = 0;
  } else if (player2.y > canvas.height - paddleHeight) {
    player2.y = canvas.height - paddleHeight;
  }
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
  if (ball.y + ball.dy < ballRadius || ball.y + ball.dy > canvas.height - ballRadius) {
    ball.dy = -ball.dy;
  }
  if (ball.x + ball.dx > canvas.width - ballRadius - paddleMargin - paddleWidth && ball.y + ball.dy > player2.y && ball.y + ball.dy < player2.y + paddleHeight) {
    ball.dx = -ball.dx;
    ball.dy = (ball.y - (player2.y + paddleHeight / 2)) * 0.2;
  } else if (ball.x + ball.dx < ballRadius + paddleMargin + paddleWidth && ball.y + ball.dy > player1.y && ball.y + ball.dy
