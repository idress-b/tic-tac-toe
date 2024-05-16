const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
const board = Array(9).fill(null);


cells.forEach(cell => {
    cell.addEventListener('click', () => {
        cell.classList.toggle('active');
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === 'O' ? 'X' : 'O'
        board[cell.dataset.index] = cell.textContent;

        let winner = checkWinner();
        if (winner) {
            setTimeout(() => {
                alert(`Player ${winner} wins!`);
                reset();
            }, 0);
        }
        if (checkDraw() && !winner) {
            setTimeout(() => {
                alert('Draw!');
                reset();
            }, 0);
        }
        console.log("winner", winner);
    });
});

const reset = () => {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('active');
    });

    currentPlayer = 'X';
    board.fill(null);
}

function checkDraw() {
    return board.every(cell => cell !== null);
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            console.log('winner');
            return board[a];
        }
    }

    return null;
}