import Player from '../../js/models/player/player';

const gameController = (function () {
    let state = 'shipPlacement';
    const placementState = {
        currentShipLength: 5,
        currentShipOrientation: 'horizontal'
    }
    const playerOne = new Player('player1');
    const playerTwo = new Player('player2', 'computer');

    let activePlayer = playerOne;

    function switchActivePlayer() {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    }

    function placementIsAvailable(row, col) {
        const board = activePlayer.gameboard;
        return board.isValidPosition(placementState.currentShipLength, 
                                    row, 
                                    col, 
                                    placementState.currentShipOrientation);
    }

    function previewCells(startRow, startCol) {
        const length = placementState.currentShipLength;
        const orientation = placementState.currentShipOrientation;
        const cells = [];

        for (let offset = 0; offset < length; offset++) {
            const row = orientation === 'vertical' ? startRow + offset : startRow;
            const col = orientation === 'vertical' ? startCol : startCol + offset;

            if (row < 10 && col < 10) {
                cells.push([row, col]);
            }
        }

        return cells;
    }

    return { state, placementState, placementIsAvailable, previewCells };
})();

export default gameController;