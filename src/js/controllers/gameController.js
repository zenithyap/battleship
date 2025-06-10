const gameController = (function () {
    const playerOne = new Player('player1');
    const playerTwo = new Player('player2', 'computer');

    let activePlayer = playerOne;

    function switchActivePlayer() {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    }
})();