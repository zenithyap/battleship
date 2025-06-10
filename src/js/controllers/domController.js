const domController = (function() {
    const body = document.querySelector('body');

    function renderBoard(player) {
        body.textContent = '';
        const playerBoard = player.gameboard;
        const board = document.createElement('div');
        board.classList.add('board');

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

        body.appendChild(board);
    };

    return { renderBoard };
})();

export default domController;