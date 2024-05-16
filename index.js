// éléments du DOM
const h2 = document.querySelector('h2');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('restart');

// variables utiles
let currentPlayer = 'X';
const board = Array(9).fill(null);
let gameIsOver = false;

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        
// on vérifie si la case est déjà remplie
        if (cell.textContent || gameIsOver) {
            return;
        }
        cell.classList.add('active');
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === 'O' ? 'X' : 'O'
        h2.textContent = `C'est au tour de ${currentPlayer} de jouer`;
        board[cell.dataset.index] = cell.textContent;

        let winner = checkWinner();
        if (winner) {
            
               h2.textContent = `le joueur ${winner.winner} a gagné!`;
               winner.winningLine.forEach(index => {
                     cells[index].classList.add('winner');
                });
               gameIsOver = true;
            
        }
        if (checkDraw() && !winner) {
           
                alert('Draw!');
                reset();
            
        }
        console.log("winner", winner);
    });
});

resetButton.addEventListener('click', reset);

function reset(){
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('active','winner');
    });

    currentPlayer = 'X';
    h2.textContent = `C'est au tour de ${currentPlayer} de jouer`;
    board.fill(null);
    gameIsOver = false;
}

function checkDraw() {
    return board.every(cell => cell !== null);
}

function checkWinner() {
    const winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningLines.length; i++) {
        const [a, b, c] = winningLines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            console.log('winner');
            return { winner: board[a], winningLine: winningLines[i]};
        }
    }

    return null;
}