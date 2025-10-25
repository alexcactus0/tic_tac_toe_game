const modal = document.querySelector("[data-modal]");
const startBtn = document.querySelector("[data-open-modal]");
const startGameBtn = document.querySelector("[data-create-modal]");
const closeBtn = document.querySelector("[data-cancel-modal]");


function startGame() {
    const gameBoard = document.createElement('div');
    gameBoard.classlist.add('gameBoard');

    gameBoard.innerHTML = '';
}

startBtn.addEventListener('click', () => {
    modal.showModal()
})
startGameBtn.addEventListener('click', () => {
    startGame();
})
closeBtn.addEventListener('click', () => {
    modal.close()
    form.reset()
})