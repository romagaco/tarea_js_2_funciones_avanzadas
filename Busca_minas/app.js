document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid");
    const difficultySelect = document.getElementById("difficulty");
    const resetButton = document.getElementById("reset-button");
    const flagsCountDisplay = document.getElementById("flags-count");
    const totalBombsDisplay = document.getElementById("total-bombs");
    const gameStatusDisplay = document.getElementById("game-status");

    let width = 10;
    let bombAmount = 20;
    let squares = [];
    let isGameOver = false;
    let flags = 0;

    // Configuraciones de dificultad
    const difficulties = {
        easy: { width: 8, bombs: 5 },
        medium: { width: 10, bombs: 10 },
        hard: { width: 10, bombs: 20 }
    };

    // Cargar configuración guardada o usar la actual
    function loadDifficulty() {
        const savedDifficulty = localStorage.getItem('minesweeper_difficulty') || 'hard';
        difficultySelect.value = savedDifficulty;
        const config = difficulties[savedDifficulty];
        width = config.width;
        bombAmount = config.bombs;
    }

    // Guardar estado del juego en localStorage
    function saveGameState() {
        if (isGameOver) return;

        const gameState = {
            difficulty: difficultySelect.value,
            squares: squares.map(sq => ({
                id: sq.id,
                classes: Array.from(sq.classList),
                innerHTML: sq.innerHTML,
                data: sq.getAttribute('data')
            })),
            flags: flags,
            isGameOver: isGameOver
        };
        localStorage.setItem('minesweeper_state', JSON.stringify(gameState));
    }

    // Cargar estado del juego desde localStorage
    function loadGameState() {
        const savedState = localStorage.getItem('minesweeper_state');
        if (!savedState) return false;

        try {
            const gameState = JSON.parse(savedState);

            // Verificar que la dificultad coincida
            if (gameState.difficulty !== difficultySelect.value) {
                localStorage.removeItem('minesweeper_state');
                return false;
            }

            flags = gameState.flags;
            isGameOver = gameState.isGameOver;

            // Restaurar el tablero
            grid.innerHTML = '';
            squares = [];

            gameState.squares.forEach(sqData => {
                let square = document.createElement("div");
                square.setAttribute("id", sqData.id);
                sqData.classes.forEach(cls => square.classList.add(cls));
                square.innerHTML = sqData.innerHTML;
                if (sqData.data) {
                    square.setAttribute("data", sqData.data);
                }
                grid.appendChild(square);
                squares.push(square);

                // Reattach event listeners
                square.addEventListener("click", function (e) {
                    click(square);
                });

                square.oncontextmenu = function (e) {
                    e.preventDefault();
                    addFlag(square);
                };
            });

            updateDisplay();
            if (isGameOver) {
                gameStatusDisplay.textContent = gameState.flags === bombAmount ? "¡Ganaste! 🎉" : "Game Over 💥";
            }
            return true;
        } catch (e) {
            localStorage.removeItem('minesweeper_state');
            return false;
        }
    }

    // Actualizar displays de información
    function updateDisplay() {
        flagsCountDisplay.textContent = flags;
        totalBombsDisplay.textContent = bombAmount;

        // Actualizar grid con CSS Grid
        const cellSize = width === 8 ? 50 : 40;
        grid.style.gridTemplateColumns = `repeat(${width}, ${cellSize}px)`;
        grid.style.gridTemplateRows = `repeat(${width}, ${cellSize}px)`;
    }

    // Crear tablero
    function createBoard() {
        // Limpiar tablero previo
        grid.innerHTML = '';
        squares = [];
        isGameOver = false;
        flags = 0;

        // Crear bombas aleatorias
        const bombsArray = Array(bombAmount).fill("bomb");
        const emptyArray = Array(width * width - bombAmount).fill("valid");
        const gameArray = emptyArray.concat(bombsArray);
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

        // Crear tablero
        for (let i = 0; i < width * width; i++) {
            let square = document.createElement("div");
            square.setAttribute("id", i);
            square.classList.add(shuffledArray[i]);
            grid.appendChild(square);
            squares.push(square);

            // Normal click
            square.addEventListener("click", function (e) {
                click(square);
            });

            // Ctrl y click derecho
            square.oncontextmenu = function (e) {
                e.preventDefault();
                addFlag(square);
            };
        }

        // Agregar números
        for (let i = 0; i < squares.length; i++) {
            let total = 0;
            const isLeftEdge = (i % width === 0);
            const isRightEdge = (i % width === width - 1);

            if (squares[i].classList.contains("valid")) {
                // Izquierda
                if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains("bomb")) total++;
                // Arriba derecha
                if (i > (width - 1) && !isRightEdge && squares[i + 1 - width].classList.contains("bomb")) total++;
                // Arriba
                if (i >= width && squares[i - width].classList.contains("bomb")) total++;
                // Arriba izquierda
                if (i >= width && !isLeftEdge && squares[i - 1 - width].classList.contains("bomb")) total++;
                // Derecha
                if (i < width * width - 1 && !isRightEdge && squares[i + 1].classList.contains("bomb")) total++;
                // Abajo izquierda
                if (i < width * (width - 1) && !isLeftEdge && squares[i - 1 + width].classList.contains("bomb")) total++;
                // Abajo derecha
                if (i < width * (width - 1) - 1 && !isRightEdge && squares[i + 1 + width].classList.contains("bomb")) total++;
                // Abajo
                if (i < width * (width - 1) && squares[i + width].classList.contains("bomb")) total++;

                squares[i].setAttribute("data", total);
            }
        }

        updateDisplay();
        gameStatusDisplay.textContent = "";
        saveGameState();
    }

    // Agregar banderas a las bombas
    function addFlag(square) {
        if (isGameOver) return;
        if (!square.classList.contains("checked") && (flags < bombAmount)) {
            if (!square.classList.contains("flag")) {
                square.classList.add("flag");
                square.innerHTML = "🚩";
                flags++;
                checkForWin();
            } else {
                square.classList.remove("flag");
                square.innerHTML = "";
                flags--;
            }
            updateDisplay();
            saveGameState();
        }
    }

    // Click actions
    function click(square) {
        let currentId = square.id;
        if (isGameOver) return;
        if (square.classList.contains("checked") || square.classList.contains("flag")) return;

        if (square.classList.contains("bomb")) {
            gameOver(square);
        } else {
            let total = square.getAttribute("data");
            if (total != 0) {
                square.classList.add("checked");
                square.innerHTML = total;
                saveGameState();
                return;
            }
            checkSquare(square, currentId);
        }
        square.classList.add("checked");
        saveGameState();
    }

    // Función recursiva para revisar cuadros adyacentes
    function checkSquare(square, currentId) {
        const isLeftEdge = (currentId % width === 0);
        const isRightEdge = (currentId % width === width - 1);

        setTimeout(() => {
            // Izquierda
            if (currentId > 0 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) - 1].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            // Arriba derecha
            if (currentId > (width - 1) && !isRightEdge) {
                const newId = squares[parseInt(currentId) + 1 - width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            // Arriba
            if (currentId >= width) {
                const newId = squares[parseInt(currentId) - width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            // Arriba izquierda
            if (currentId >= width && !isLeftEdge) {
                const newId = squares[parseInt(currentId) - 1 - width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            // Derecha
            if (currentId < width * width - 1 && !isRightEdge) {
                const newId = squares[parseInt(currentId) + 1].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            // Abajo izquierda
            if (currentId < width * (width - 1) && !isLeftEdge) {
                const newId = squares[parseInt(currentId) - 1 + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            // Abajo derecha
            if (currentId < width * (width - 1) - 1 && !isRightEdge) {
                const newId = squares[parseInt(currentId) + 1 + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            // Abajo
            if (currentId < width * (width - 1)) {
                const newId = squares[parseInt(currentId) + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
        }, 10);
    }

    // Función de juego terminado
    function gameOver(square) {
        console.log("game over");
        isGameOver = true;
        gameStatusDisplay.textContent = "Game Over 💥";
        gameStatusDisplay.style.color = "#ff4444";

        // Mostrar todas las bombas
        squares.forEach(square => {
            if (square.classList.contains("bomb")) {
                square.innerHTML = "💣";
                square.classList.add("revealed");
            }
        });

        // Limpiar estado guardado
        localStorage.removeItem('minesweeper_state');
    }

    // Verificar si ganamos
    function checkForWin() {
        let matches = 0;

        for (let i = 0; i < squares.length; i++) {
            if (squares[i].classList.contains("flag") && squares[i].classList.contains("bomb")) {
                matches++;
            }
        }

        if (matches === bombAmount) {
            console.log("You win!");
            isGameOver = true;
            gameStatusDisplay.textContent = "¡Ganaste! 🎉";
            gameStatusDisplay.style.color = "#44ff44";

            // Limpiar estado guardado
            localStorage.removeItem('minesweeper_state');
        }
    }

    // Event listener para cambio de dificultad
    difficultySelect.addEventListener('change', () => {
        const config = difficulties[difficultySelect.value];
        width = config.width;
        bombAmount = config.bombs;
        localStorage.setItem('minesweeper_difficulty', difficultySelect.value);
        localStorage.removeItem('minesweeper_state');
        createBoard();
    });

    // Event listener para botón reset
    resetButton.addEventListener('click', () => {
        localStorage.removeItem('minesweeper_state');
        createBoard();
    });

    // Inicializar juego
    loadDifficulty();
    if (!loadGameState()) {
        createBoard();
    }
});
