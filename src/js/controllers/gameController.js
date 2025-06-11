import domController from './domController';
import Player from '../../js/models/player/player';
import Ship from '../../js/models/ship/ship';

const gameController = (function () {
    const NUM_SHIPS = 5;
    let state = 'shipPlacement';
    const shipLengths = [5, 4, 3, 3, 2];
    let curShip = 0;
    let curShipLength = shipLengths[curShip];
    let curShipOrientation = 'horizontal';

    const playerOne = new Player('player1');
    const playerTwo = new Player('player2', 'computer');

    let activePlayer = playerOne;

    function initGame() {
        domController.renderBoard(playerOne);
        domController.renderBoard(playerTwo);
        domController.renderMessage(`Place your ships (${activePlayer.id})`)
    }

    function getActivePlayer() {
        return activePlayer;
    }

    function switchActivePlayer() {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    }

    function placementIsAvailable(row, col) {
        const board = activePlayer.gameboard;
        return board.isValidPosition(curShipLength, 
                                    row, 
                                    col, 
                                    curShipOrientation);
    }

    function previewCells(startRow, startCol) {
        const cells = [];

        for (let offset = 0; offset < curShipLength; offset++) {
            const row = curShipOrientation === 'vertical' ? startRow + offset : startRow;
            const col = curShipOrientation === 'vertical' ? startCol : startCol + offset;

            if (row < 10 && col < 10) {
                cells.push([row, col]);
            }
        }

        return cells;
    }

    function hasShipOnGameboardAt(row, col) {
        const board = activePlayer.gameboard;
        return board.hasShipAt(row, col);
    }

    function prepareNextShip() {
        curShip += 1;
        curShipLength = shipLengths[curShip];
    }

    function placeShipOnGameBoard(row, col) {
        try {
            const ship = new Ship(curShipLength);
            const board = activePlayer.gameboard;
            board.placeShip(ship, row, col, curShipOrientation);
            prepareNextShip();
            domController.renderBoard(activePlayer);
            domController.renderErrorMessage('');
        } catch (error) {
            domController.renderErrorMessage(error);
        }
    }

    return { initGame, getActivePlayer, state, 
            placementIsAvailable, hasShipOnGameboardAt, previewCells, 
            placeShipOnGameBoard };
})();

export default gameController;