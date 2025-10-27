const modal = document.querySelector("[data-modal]");
const startBtn = document.querySelector("[data-open-modal]");
const startGameBtn = document.querySelector("[data-create-modal]");
const closeBtn = document.querySelector("[data-cancel-modal]");

const body = document.body;

const game = function (player1, player2) {

    const container = document.querySelector('.all');
    const gameBoard = document.createElement('div');
    gameBoard.classList.add('gameBoard');
    gameBoard.innerHTML = 
    `
    <div class="main">
        <div class="player1">
            <img src="./icns/user-svgrepo-com.svg"> 
            <p>${player1.name} </p>
            <div class="symbol">
                <p>${player1.symbol}</p>
            </div>
        </div>
        
        <div class="board">
            <div class="cell" data-index="0"></div>
            <div class="cell" data-index="1"></div>
            <div class="cell" data-index="2"></div>

            <div class="cell" data-index="3"></div>
            <div class="cell" data-index="4"></div>
            <div class="cell" data-index="5"></div>

            <div class="cell" data-index="6"></div>
            <div class="cell" data-index="7"></div>
            <div class="cell" data-index="8"></div>
        </div>
        <div class="player2">
            <img src="./icns/user-svgrepo-com.svg">   
            <p>${player2.name}</p>
            <div class="symbol">
                <p>${player2.symbol}</p>
            </div>
        </div>
    </div>`;

    container.appendChild(gameBoard);

    const boardState = Array(9).fill(null);
    let currentSymbol = "X";
    let active = true;
    const cells = gameBoard.querySelectorAll('.cell');

    // Win condition if true
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  function checkWin(board, symbol) {
    for (const combo of winCombos) {
      if (combo.every(i => board[i] === symbol)) return combo;
    }
    return null;
  }

  function checkDraw(board) {
    return board.every(cell => cell !== null);
  }

  function renderSymbolInCell(cellEl, symbol) {
    if (symbol === "X") cellEl.innerHTML = '<img src="./icns/x.svg" alt="X">';
    else cellEl.innerHTML = '<img src="./icns/o.svg" alt="O">';
    cellEl.classList.add('occupied');
  }

  function getPlayerBySymbol(sym) {
    return (player1.symbol === sym) ? player1 : player2;
  }

  function handleCellClick(e) {
    if (!active) return;
    const cell = e.currentTarget;
    const idx = Number(cell.dataset.index);
    if (boardState[idx] !== null) return;

    boardState[idx] = currentSymbol;
    renderSymbolInCell(cell, currentSymbol);

    const win = checkWin(boardState, currentSymbol);

    const createGameButton = (label, onclick) => {
        const container = document.querySelector('.refresh');
        const btn = document.createElement('button');
        btn.classList.add('refresh_buttons');
        btn.textContent = label;
        container.appendChild(btn);

        btn.addEventListener('click', () => {
            onclick();
            btn.remove();
        });

        return btn;
    };

    if (win) {
      active = false;
      const winner = getPlayerBySymbol(currentSymbol);
      win.forEach(i => gameBoard.querySelector(`.cell[data-index="${i}"]`).classList.add('winner'));
      setTimeout(() => alert(`${winner.name} (${winner.symbol}) wins!`), 50);
        
      createGameButton('Restart', () => {
            game(player1, player2);
        });

        createGameButton('New Game', () => {
            form.reset();
            modal.showModal();
        });
      return;
    }

    if (checkDraw(boardState)) {
      active = false;
      setTimeout(() => alert("It's a draw!"), 50);
      return;
    }

    currentSymbol = (currentSymbol === "X") ? "O" : "X";
  }

  cells.forEach(c => c.addEventListener('click', handleCellClick));
  // End Game

  return { player1, player2, gameBoard };
};

const Player = (name, symbol) => ({name, symbol});

startBtn.addEventListener('click', () => {
    modal.showModal()
})

startGameBtn.addEventListener('click', () => {
    // Get names
    const player1Name = document.getElementById("name_1").value;
    const player2Name = document.getElementById("name_2").value;
    
    // Get selected symbol
    const player1Symbol = document.querySelector('input[name="option"]:checked')
    const player2Symbol = document.querySelector('input[name="option1"]:checked')

    // Validate all inputs
    if(!player1Name || !player2Name || !player1Symbol || !player2Symbol) {
        alert("Please enter both names and choose X or O for both players!");
        return;
    } if (player1Symbol.value == player2Symbol.value) {
        alert("please choose a different option!");
        return;
    }

    const player1 = Player(player1Name, player1Symbol.value);
    const player2 = Player(player2Name, player2Symbol.value);

    // Pass player object into factory
    const currentGame = game(player1, player2);

    startBtn.remove();
})
closeBtn.addEventListener('click', () => {
    modal.close()
    form.reset()
    startBtn.show()
})