
//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.


/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner, tie;


/*------------------------ Cached Element References ------------------------*/
const bodyElement = document.querySelector('body');
const buttonElement = document.createElement('button');
buttonElement.textContent = 'Reset Button';
bodyElement.appendChild(buttonElement);
document.querySelector('button').setAttribute('id', 'reset')

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const resetEl = document.getElementById('reset');

/*-------------------------------- Functions --------------------------------*/
const init = () => {
  board = ['','','','','','','','',''];
  turn = 'X';
  winner = false;
  tie = false;
  render();
};

const render = () => {
updateBoard();
updateMessage();
};

const updateBoard = () => {
  board.forEach((square, idx) => {
    squareEls[idx].textContent = square;
  });
};

const updateMessage = () => {
  if(winner === false && tie === false) {
    messageEl.textContent = `It is ${turn}'s turn.`
  ;} else if (winner === false && tie === true) {
    messageEl.textContent = 'This game is a tie';
  } else {
    messageEl.textContent = `Congratulations, you win!`;
  }
}
const  handleClick = (evt) => {
  const squareIndex = parseInt(evt.target.id);
  if (board[squareIndex] !== '' || winner) return;
  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
}

const placePiece = (i) => {
  board[i] = turn;
}
const checkForWinner = () => {
  winningCombos.forEach(match => {
    const [a, b, c] = match;
    if(board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = true;
    }
  })
};

const checkForTie = () => {
  if (winner) return;
  tie = board.every(cell => cell !== '');
  console.log(tie);
}

const switchPlayerTurn = () => {
  if (winner) return;
  turn = turn === 'X' ? 'O' : 'X';
  console.log(turn);
}

const resetGame = () => {
  init();
}



/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => {
  square.addEventListener('click', handleClick);
});

resetEl.addEventListener('click', resetGame);

document.addEventListener('DOMContentLoaded', init);