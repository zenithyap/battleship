const domController = (function() {
    const body = document.querySelector('body');

    function renderBoard(player) {
        const playerBoard = player.gameboard;
        const board = document.createElement('div');
        board.classList.add('board');

        for (let i = 0; i < 10; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < 10; j++) {
                const cell = document.createElement('div');
                const cellHasShip = playerBoard.hasShipAt(i, j);
                const cellIsHit = playerBoard.isHitAt(i, j);

                if (cellHasShip && cellIsHit) {
                    cell.classList.add('cell-ship-hit');
                } else if (!cellHasShip && cellIsHit) {
                    cell.classList.add('cell-hit');
                } else if (cellHasShip) {
                    cell.classList.add('cell-ship');
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