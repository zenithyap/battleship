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
        initPlayerTwoShips();
        domController.renderBoard(playerOne);
        domController.renderBoard(playerTwo);
        domController.initialiseEventListeners();
        domController.renderOrientationButton(curShipOrientation);
        domController.renderMessage(`Place your ships (${activePlayer.id})`);
    }

    function initPlayerTwoShips() {
        const ship = new Ship(5);
        playerTwo.gameboard.placeShip(ship, 0, 0, 'horizontal');
    }

    function getActivePlayer() {
        return activePlayer;
    }

    function getOppPlayer() {
        return activePlayer === playerOne ? playerTwo : playerOne;
    }

    function getGameState() {
        return state;
    }

    function switchActivePlayer() {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    }

    function switchOrientation() {
        curShipOrientation = curShipOrientation === 'vertical' ? 'horizontal' : 'vertical';
        domController.renderOrientationButton(curShipOrientation);
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

    function attackOnGameboardAt(row, col) {
        const board = activePlayer.gameboard;

        board.receiveAttack(row, col);
        domController.renderBoard(activePlayer);
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
            domController.renderBoard(activePlayer);
            domController.renderErrorMessage('');
            prepareNextShip();

            if (curShip === 5) {
                state = 'play';
                playRound();
            }
        } catch (error) {
            domController.renderErrorMessage(error);
        }
    }

    function playRound() {
        domController.renderMessage(activePlayer === playerOne ? "Its player one's turn!" : "Its player two's turn");
        domController.renderBoard(getOppPlayer());
        domController.renderBoard(activePlayer);

        if (activePlayer.gameboard.isWin()) {
            domController.renderMessage('Game ended!');
        }
        switchActivePlayer();
    }

    return { initGame, getActivePlayer, getGameState,
            placementIsAvailable, hasShipOnGameboardAt, previewCells, 
            placeShipOnGameBoard, switchOrientation, attackOnGameboardAt,
            playRound };
})();

export default gameController;