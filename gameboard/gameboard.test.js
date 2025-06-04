import Gameboard from "./gameboard";

describe('Gameboard', () => {
    let gameboard;

    beforeEach(() => {
        gameboard = new Gameboard();
    })

    test('gameboard should be initialised', () => {
        expect(gameboard).toBeDefined();
    });

    test('gameboard should have a 10 by 10 grid', () => {
        expect(gameboard.grid.length).toBe(10);
        for (let i = 0; i < gameboard.length ; i++) {
            expect(gameboard.grid[i].   length).toBe(10);
        }
    });

    test('gameboard cells should have default ship and hit status', () => {
        for (let i = 0; i < Gameboard.ROWS; i++) {
            for (let j = 0; j < Gameboard.COLS; j++) {
                const cell = gameboard.grid[i][j];
                expect(cell).toHaveProperty('hasShip', false);
                expect(cell).toHaveProperty('isHit', false);
            }
        }
    });
});