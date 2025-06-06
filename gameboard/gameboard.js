class Gameboard {
    static ROWS = 10;
    static COLS = 10;

    constructor() {
        this._grid = [];
        this._missed = [];
        this._ships = [];

        for (let i = 0; i < Gameboard.ROWS; i++) {
            const row = [];
            for (let j = 0; j < Gameboard.COLS; j++) {
                row.push({shipRef: null, isHit: false});
            }
            this._grid.push(row);
        }
    }

    get grid() {
        return this._grid;
    }

    get missed() {
        return this._missed;
    }

    #isWithinGrid(shipLength, row, col, orientation) {
        if (orientation === 'vertical') {
            return row >= 0 && row + shipLength - 1 < Gameboard.ROWS && col >= 0 && col < Gameboard.COLS;
        } else {
            return col >= 0 && col + shipLength - 1 < Gameboard.COLS && row >= 0 && row < Gameboard.ROWS;
        }
    }

    #hasOverlapShips(shipLength, row, col, rowOffset, colOffset) {
        for (let i = 0; i < shipLength; i++) {
            const curRow = row + rowOffset * i;
            const curCol = col + colOffset * i;
            if (this._grid[curRow][curCol].shipRef) return true;
        }

        return false;
    }

    placeShip(ship, row, col, orientation) {
        const shipLength = ship.length;

        if (!this.#isWithinGrid(shipLength, row, col, orientation)) {
            throw new RangeError('Ship placement is out of the grid.');
        }

        const rowOffset = orientation === 'vertical' ? 1 : 0;
        const colOffset = orientation === 'horizontal' ? 1 : 0;

        if (this.#hasOverlapShips(shipLength, row, col ,rowOffset, colOffset)) {
            throw new Error('Ship placement overlaps with another ship.');
        }

        for (let i = 0; i < shipLength; i++) {
            const curRow = row + rowOffset * i;
            const curCol = col + colOffset * i;
            this._grid[curRow][curCol].shipRef = ship;
        }

        this._ships.push(ship);
    }

    receiveAttack(row, col) {
        const cell = this._grid[row][col];
        const ship = cell.shipRef;
        if (ship && !cell.isHit) {
            ship.hit();
            cell.isHit = true;
        } else if (!ship && !cell.isHit) {
            this._missed.push([row, col]);
        }
    }

    isWin() {
        return this._ships.every(ship => ship.isSunk());
    }
}

export default Gameboard;