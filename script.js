const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart-btn');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

function handleCellClick(e) {
    const index = e.target.dataset.index;

    if (board[index] !== '' || isGameOver) return;

    makeMove(index, currentPlayer);
    checkWinner();
    
    if (!isGameOver) {
        currentPlayer = 'O';
        aiMove();
        checkWinner();
        currentPlayer = 'X';
    }
}

function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
}

function aiMove() {
    let availableCells = board.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);

    if (availableCells.length === 0) return;

    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    makeMove(randomIndex, currentPlayer);
}

function checkWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.textContent = `${board[a]} wins!`;
            isGameOver = true;
            return;
        }
    }

    if (!board.includes('')) {
        statusText.textContent = "It's a draw!";
        isGameOver = true;
    }
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    statusText.textContent = '';
    isGameOver = false;
    currentPlayer = 'X';
}
