class Gameboard {
    static ROWS = 10;
    static COLS = 10;

    constructor() {
        this._grid = [];

        for (let i = 0; i < Gameboard.ROWS; i++) {
            const row = [];
            for (let j = 0; j < Gameboard.COLS; j++) {
                row.push({hasShip: false, isHit: false});
            }
            this._grid.push(row);
        }
    }

    get grid() {
        return this._grid;
    }

    #isWithinGrid(shipLength, row, col, orientation) {
        if (orientation === 'vertical') {
            return row >= 0 && row + shipLength < Gameboard.ROWS && col >= 0 && col < Gameboard.COLS;
        } else {
            return col >= 0 && col + shipLength < Gameboard.COLS && row >= 0 && row < Gameboard.ROWS;
        }
    }

    placeShip(ship, row, col, orientation) {
        const shipLength = ship.length;

        if (!this.#isWithinGrid(shipLength, row, col, orientation)) {
            throw new RangeError('Ship placement is out of the grid.');
        }

        for (let i = 0; i < shipLength; i++) {
            if (orientation === 'vertical') {
                this._grid[row + i][col].hasShip = true;
            } else {
                this._grid[row][col + i].hasShip = true;
            }
        }
    }
}

export default Gameboard;