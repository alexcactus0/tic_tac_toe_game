const modal = document.querySelector("[data-modal]");
const startBtn = document.querySelector("[data-open-modal]");
const startGameBtn = document.querySelector("[data-create-modal]");
const closeBtn = document.querySelector("[data-cancel-modal]");

const body = document.body;

const game = function () {
    const player1 = document.getElementById("name_1").value;
    const player2 = document.getElementById("name_2").value;

    if(!player1 || !player2) {
        alert("Please enter names for both players before starting the game!");
        return;
    }
    
    const container = document.querySelector('.all');
    const gameBoard = document.createElement('div');
    gameBoard.classList.add('gameBoard');
    gameBoard.innerHTML = 
    `
    <div class="main">
        <div class="player1">
        <img src="./icns/user-svgrepo-com.svg"> 
            <p>${player1}</p>
        </div>
        
        <div class="board">
            <div class="first_row" id="box"></div>
            <div class="first_row" id="box"></div>
            <div class="first_row" id="box"></div>

            <div class="second_row" id="box"></div>
            <div class="second_row" id="box"></div>
            <div class="second_row" id="box"></div>

            <div class="third_row" id="box"></div>
            <div class="third_row" id="box"></div>
            <div class="third_row" id="box"></div>
        </div>
        <div class="player2">
        <img src="./icns/user-svgrepo-com.svg">   
            <p>${player2}</p>
        </div>
    </div>`;

    container.appendChild(gameBoard);
    return { player1, player2, gameBoard }
};


startBtn.addEventListener('click', () => {
    modal.showModal()
}) 

startGameBtn.addEventListener('click', () => {
    const currentGame = game();
    startBtn.remove();
})
closeBtn.addEventListener('click', () => {
    modal.close()
    form.reset()
    startBtn.show()
})