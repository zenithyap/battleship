import domController from './domController';
import Player from '../../js/models/player/player';
import Ship from '../../js/models/ship/ship';
import computerMoves from '../helpers/computerMoves';

const gameController = (function () {
    const NUM_SHIPS = 5;
    let state = 'shipPlacement';
    const shipLengths = [5, 4, 3, 3, 2];
    let curShip = 0;
    let curShipLength = shipLengths[curShip];
    let curShipOrientation = 'horizontal';

    let playerOne;
    let playerTwo;
    let activePlayer;

    function initGame() {
        state = 'shipPlacement';

        playerOne = new Player('player1');
        playerTwo = new Player('player2', 'computer');
        activePlayer = playerOne;
        curShip = 0;
        curShipLength = shipLengths[curShip];

        if (playerTwo.type === 'computer') computerMoves.generate();
        initComputerShips();

        domController.renderOrientationButton(curShipOrientation);
        domController.renderBoard(playerOne);
        domController.renderBoard(playerTwo);
        domController.renderMessage(`Place your ships (${activePlayer.id})`);
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function getRandomOrientation() {
        return Math.random() < 0.5 ? 'horizontal' : 'vertical';
    }

    function initComputerShips() {
        for (let i = 0; i < NUM_SHIPS; i++) {
            const shipLength = shipLengths[i];
            const ship = new Ship(shipLength);
            const board = playerTwo.gameboard;

            let placed = false;

            while (!placed) {
                const orientation = getRandomOrientation();
                const rowOffset = orientation === 'vertical' ? 10 - shipLength : 10;
                const colOffset = orientation === 'vertical' ? 10 : 10 - shipLength;
                const row = getRandomInt(rowOffset);
                const col = getRandomInt(colOffset);
                try {
                    board.placeShip(ship, row, col, orientation);
                    placed = true;
                } catch (error) {
                }
            }
        }
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
                domController.removeOrientationButton();
                playRound();
            }
        } catch (error) {
            domController.renderErrorMessage(error);
        }
    }

    function playRound() {
        if (getOppPlayer().gameboard.isWin()) {
            state = 'gameEnd';
            domController.renderMessage(`Game ended! ${activePlayer.id} wins!`);
            domController.renderResetButton();
            return;
        }

        domController.renderMessage(activePlayer === playerOne ? "Its player one's turn!" : "Its player two's turn");
        domController.renderBoard(getOppPlayer());
        domController.renderBoard(activePlayer);

        if (playerTwo.type === 'computer' && activePlayer === playerTwo) {
            let [row, col] = computerMoves.get();
            playerOne.gameboard.receiveAttack(row, col);
            domController.renderBoard(getOppPlayer());

            switchActivePlayer();
            playRound();
            return;
        }

        switchActivePlayer();
    }

    return { initGame, getActivePlayer, getGameState,
            placementIsAvailable, hasShipOnGameboardAt, previewCells, 
            placeShipOnGameBoard, switchOrientation, attackOnGameboardAt,
            playRound };
})();

export default gameController;