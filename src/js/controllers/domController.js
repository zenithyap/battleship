import gameController from "./gameController";

const domController = (function () {
    const playerOneBoard = document.querySelector('.player-one-board');
    const playerTwoBoard = document.querySelector('.player-two-board');
    const message = document.querySelector('.message');

    function displayPlaceShipMessage(player, shipName) {
        message.textContent = 'Choose ships coordinates' + player.id === 'player1' ? '(Player 1)' : ('Player 2');
    }

    function renderErrorMessage(message) {
        const errorMessage = document.querySelector('.error-message');
        errorMessage.textContent = message;
    }

    function initialiseEventListeners() {
        const button = document.querySelector('.orientation-btn');

        button.addEventListener('click', () => {
            gameController.switchOrientation();
        })
    }

    function renderOrientationButton(orientation) {
        const button = document.querySelector('.orientation-btn');
        button.textContent = orientation;
    }

    function renderMessage(message) {
        const mes = document.querySelector('.message');
        mes.textContent = message;
    }

    function addPlacementListeners(cell, i, j, board) {
        cell.addEventListener('mouseenter', () => {
            const preview = gameController.previewCells(i, j);

            if (gameController.placementIsAvailable(i, j)) {
                preview.forEach(([row, col]) => {
                    const cell = board.querySelector(`.row:nth-child(${row + 1}) .cell:nth-child(${col + 1})`);
                    cell.classList.add('available');
                });
            } else {
                preview.forEach(([row, col]) => {
                    const cell = board.querySelector(`.row:nth-child(${row + 1}) .cell:nth-child(${col + 1})`);
                    cell.classList.add('unavailable');
                });
            }
        })

        cell.addEventListener('mouseleave', () => {
            const preview = gameController.previewCells(i, j);

            preview.forEach(([row, col]) => {
                const cell = board.querySelector(`.row:nth-child(${row + 1}) .cell:nth-child(${col + 1})`);
                cell.classList.remove('available', 'unavailable');
            });
        })

        cell.addEventListener('click', () => {
            gameController.placeShipOnGameBoard(i, j);
        });
    }

    function renderBoard(player) {
        const board = player.id === 'player1' ? playerOneBoard : playerTwoBoard;
        board.textContent = '';
        const playerBoard = player.gameboard;

        const isActivePlayerTurn = player.id === gameController.getActivePlayer().id;

        for (let i = 0; i < 10; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < 10; j++) {
                const cell = document.createElement('button');
                cell.classList.add('cell');
                const cellHasShip = gameController.hasShipOnGameboardAt(i, j);
                const cellIsHit = playerBoard.isHitAt(i, j);

                if (gameController.state === 'shipPlacement' && isActivePlayerTurn) {
                    addPlacementListeners(cell, i, j, board);
                }

                if (cellHasShip && cellIsHit) {
                    cell.classList.add('ship-hit');
                } else if (!cellHasShip && cellIsHit) {
                    cell.classList.add('missed');
                } else if (cellHasShip) {
                    cell.classList.add('ship');
                } else {
                    cell.classList.add('empty');
                }

                row.appendChild(cell);
            }
            board.appendChild(row);
        };
    };

    return { renderMessage, renderErrorMessage, renderOrientationButton, 
            renderBoard, initialiseEventListeners };
})();

export default domController;