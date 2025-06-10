const domController = (function() {
    const playerOneBoard  = document.querySelector('.player-one-board');
    const playerTwoBoard  = document.querySelector('.player-two-board');
    const message = document.querySelector('.message');

    function displayPlaceShipMessage(player) {
        message.textContent = 'Choose ships coordinates' + player.id === 'player1' ? '(Player 1)' : ('Player 2');
    }

    function clearMessage() {
        message.textContent = '';
    }

    function renderBoard(player) {
        const board = player.id === 'player1' ? playerOneBoard : playerTwoBoard;
        board.textContent = '';
        const playerBoard = player.gameboard;

        for (let i = 0; i < 10; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < 10; j++) {
                const cell = document.createElement('button');
                const cellHasShip = playerBoard.hasShipAt(i, j);
                const cellIsHit = playerBoard.isHitAt(i, j);
                cell.addEventListener('click', () => {
                    playerBoard.receiveAttack(i, j);
                    renderBoard(player);
                })

                if (cellHasShip && cellIsHit) {
                    cell.classList.add('cell', 'ship-hit');
                } else if (!cellHasShip && cellIsHit) {
                    cell.classList.add('cell', 'missed');
                } else if (cellHasShip) {
                    cell.classList.add('cell', 'ship');
                } else {
                    cell.classList.add('cell', 'empty');
                }

                row.appendChild(cell);
            }
            board.appendChild(row);
        };
    };

    return { renderBoard };
})();

export default domController;