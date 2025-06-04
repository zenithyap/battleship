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
}

export default Gameboard;