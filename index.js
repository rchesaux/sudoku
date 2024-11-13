

//fill random boxes with numbers

// listen to event

// check 

const cells = document.querySelectorAll('#board input');
const xScoreDisplay = document.getElementById('xScore');
const oScoreDisplay = document.getElementById('oScore');
const restartButton = document.getElementById('restart');

let xScore = 0;
let oScore = 0;
let currentPlayer = 'X';

// Add click event listeners to each cell
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (cell.value === '') {
            cell.value = currentPlayer;
            if (checkWinner()) {
                updateScore();
                alert(`${currentPlayer} wins!`);
                resetBoard();
            } else if (Array.from(cells).every(cell => cell.value !== '')) {
                alert('It\'s a draw!');
                resetBoard();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });
});

// Check for a winning combination
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return cells[a].value === currentPlayer &&
               cells[a].value === cells[b].value &&
               cells[a].value === cells[c].value;
    });
}

// Update the score for the winner
function updateScore() {
    if (currentPlayer === 'X') {
        xScore++;
        xScoreDisplay.textContent = xScore;
    } else {
        oScore++;
        oScoreDisplay.textContent = oScore;
    }
}

// Reset the board for a new game
function resetBoard() {
    cells.forEach(cell => cell.value = '');
    currentPlayer = 'X';
}

// Restart button functionality
restartButton.addEventListener('click', () => {
    xScore = 0;
    oScore = 0;
    xScoreDisplay.textContent = xScore;
    oScoreDisplay.textContent = oScore;
    resetBoard();
});