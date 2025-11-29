
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 448;
canvas.height = 480;

// variables de nuestro juego
let counter = 0;
let score = 0;
let difficulty = null;
let gameStarted = false;

// variables de la bolita
let ballRadius = 10; // tamaño
let x = canvas.width / 2; // posicion x
let y = canvas.height - 30; // posicion y
let dx = 0; // velocidad en x (se setea al seleccionar dificultad)
let dy = 0; // velocidad en y (se setea al seleccionar dificultad)

// variables de la paleta
let paddleWidth = 50;
let paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight - 10;

let rightPressed = false;
let leftPressed = false;

// variables de los ladrillos
const brickRowCount = 6;
const brickColumnCount = 11;

let brickWidth = 30;
let brickHeight = 15;
let brickPadding = 5;
let brickOffsetTop = 80;
let brickOffsetLeft = 35;
let bricks = [];

const brickStatus = {
    destroyed: 0,
    exists: 1
}

// creacion de los ladrillos
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop
        // asignamos colores aleatorios
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
        bricks[c][r] = { x: brickX, y: brickY, status: brickStatus.exists, color: randomColor }
    }
}

// dibujamos la bolita

function drawBall() {
    ctx.beginPath(); // inicio de trazo
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#581291ff";
    ctx.fill();
    ctx.closePath(); // fin de trazo
};

// sensibilidad de la paleta
const paddleSensitivity = 9;


// dibujar la paleta
function drawPaddle() {
    ctx.fillStyle = "#b6d859ff";
    ctx.rect(
        paddleX,
        paddleY,
        paddleWidth,
        paddleHeight
    );
    ctx.fill();
};

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const brick = bricks[c][r];
            if (brick.status === brickStatus.exists) {
                ctx.beginPath();
                ctx.rect(brick.x, brick.y, brickWidth, brickHeight);
                ctx.fillStyle = brick.color;
                ctx.strokeStyle = "#ca2121ff";
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
            }
        }
    }
};

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const currentBrick = bricks[c][r];
            const isBallSameAsBrick =
                x > currentBrick.x &&
                x < currentBrick.x + brickWidth;

            const isBallSameAsBrickTop =
                y > currentBrick.y &&
                y < currentBrick.y + brickHeight;

            if (currentBrick.status === brickStatus.exists) {
                if (isBallSameAsBrick && isBallSameAsBrickTop) {
                    dy = -dy;
                    currentBrick.status = brickStatus.destroyed;
                    score += 5; // puntos por ladrillo roto
                    updateScoreDisplay();
                }
            }
        }
    }
};


function ballMovement() {
    x += dx;
    y += dy;

    // rebotes laterales
    if (
        x + dx > canvas.width - ballRadius ||
        x + dx < ballRadius
    ) {
        dx = -dx;
    }

    // rebote superior 
    if (y + dy < ballRadius) {
        dy = -dy;
    }

    // rebote en la paleta
    const isBallinPaddle =
        x > paddleX &&
        x < paddleX + paddleWidth;

    const isBallinPaddleTop =
        y + dy > paddleY;

    if (isBallinPaddle && isBallinPaddleTop) {
        dy = -dy;
    }

    // game over
    else if (y + dy > canvas.height - ballRadius) {
        console.log("GAME OVER");
        document.location.reload();
    }
};

function paddleMovement() {
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += paddleSensitivity;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= paddleSensitivity;
    }
};

function initEvents() {
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    function keyDownHandler(event) {
        const { key } = event
        if (key === "Right" || key === "ArrowRight") {
            rightPressed = true
        } else if (key === "Left" || key === "ArrowLeft") {
            leftPressed = true
        }
    }

    function keyUpHandler(event) {
        const { key } = event
        if (key === "Right" || key === "ArrowRight") {
            rightPressed = false
        } else if (key === "Left" || key === "ArrowLeft") {
            leftPressed = false
        }
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

function draw() {
    if (!gameStarted) return;
    clearCanvas();
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    ballMovement();
    paddleMovement();
    window.requestAnimationFrame(draw);
};

function updateScoreDisplay() {
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
        scoreElement.textContent = score;
    }
}

function startGame(selectedDifficulty) {
    difficulty = selectedDifficulty;
    gameStarted = true;

    // Set ball speed based on difficulty
    if (difficulty === 'easy') {
        dx = 1.5;
        dy = -1.5;
    } if (difficulty === 'normal') { // normal
        dx = 2;
        dy = -2;
    } if (difficulty === 'hard') {
        // hard
        dx = 4;
        dy = -4;
    } else if (difficulty === 'expert') {
        // expert
        dx = 6;
        dy = -6;
    }

    document.getElementById('difficulty-screen').style.display = 'none';
    canvas.style.display = 'block';
    document.getElementById('score-display').style.display = 'block';

    draw();
}

function setupDifficultyButtons() {
    document.getElementById('easy-btn').addEventListener('click', () => {
        startGame('easy');
    });

    document.getElementById('normal-btn').addEventListener('click', () => {
        startGame('normal');
    });

    document.getElementById('hard-btn').addEventListener('click', () => {
        startGame('hard');
    });

    document.getElementById('expert-btn').addEventListener('click', () => {
        startGame('expert');
    });
}


initEvents();
setupDifficultyButtons();
// el juego comienza cuando el usuario selecciona la dificultad 
