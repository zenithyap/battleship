import Ship from "../ship/ship";
import Gameboard from "./gameboard";

describe('Gameboard', () => {
    let gameboard;

    beforeEach(() => {
        gameboard = new Gameboard();
    })

    describe('initialisation', () => {
        test('gameboard should be initialised', () => {
            expect(gameboard).toBeDefined();
        });

        test('gameboard should have a 10 by 10 grid', () => {
            expect(gameboard.grid.length).toBe(10);
            for (let i = 0; i < gameboard.length ; i++) {
                expect(gameboard.grid[i].length).toBe(10);
            }
        });

        test('gameboard cells should have null ship ref and hit status', () => {
            for (let i = 0; i < Gameboard.ROWS; i++) {
                for (let j = 0; j < Gameboard.COLS; j++) {
                    const cell = gameboard.grid[i][j];
                    expect(cell).toHaveProperty('shipRef', null);
                    expect(cell).toHaveProperty('isHit', false);
                }
            }
        });
    });

    describe('placeShip function', () => {
        test('ship of length 2 should be placed vertically', () => {
            const SHIP_LENGTH = 2
            const ROW = 1;
            const COL = 1;
            const ship = new Ship(SHIP_LENGTH);
            gameboard.placeShip(ship, ROW, COL, 'vertical');
            expect(gameboard.grid[1][1].shipRef).toBe(ship);
            expect(gameboard.grid[2][1].shipRef).toBe(ship);
            expect(gameboard.grid[3][1].shipRef).toBe(null);
        });

        test('ship of length 4 should be place horizontally', () => {
            const SHIP_LENGTH = 4;
            const ROW = 3;
            const COL = 4;
            const ship = new Ship(SHIP_LENGTH);
            gameboard.placeShip(ship, ROW, COL, 'horizontal');
            for (let i = 0; i < SHIP_LENGTH; i++) {
                expect(gameboard.grid[ROW][COL + i].shipRef).toBe(ship);
            }
        });

        test('ship should not be allowed to be placed outside grid', () => {
            const SHIP_LENGTH = 1;
            const ROW = 11;
            const COL = 11;
            const ship = new Ship(SHIP_LENGTH);
            expect(() => gameboard.placeShip(ship, ROW, COL, 'horizontal')).toThrow();
        });

        test('should throw error if part of vertical ship is outside grid', () => {
            const SHIP_LENGTH = 2;
            const ROW = 9;
            const COL = 9;
            const ship = new Ship(SHIP_LENGTH);
            expect(() => gameboard.placeShip(ship, ROW, COL, 'vertical')).toThrow();
        });

        test('should throw error if part of horizontal ship is outside grid', () => {
            const SHIP_LENGTH = 2;
            const ROW = 0;
            const COL = 9;
            const ship = new Ship(SHIP_LENGTH);
            expect(() => gameboard.placeShip(ship, ROW, COL, 'horizontal')).toThrow();
        });

        test('ship should not be allowed to be placed overlapping each other', () => {
            const ship1 = new Ship(2);
            const ship2 = new Ship(2);
            gameboard.placeShip(ship1, 0, 0, 'vertical');
            expect(() => gameboard.placeShip(ship2, 1, 0, 'horizontal')).toThrow();
        });
    });

    describe('receiveAttack function', () => {
        let ship;

        beforeEach(() => {
            ship = new Ship(2);
            gameboard.placeShip(ship, 0, 0, 'vertical');
        });

        test('ship of length 2 should be sunk after 2 hits', () => {
            gameboard.receiveAttack(0, 0);
            gameboard.receiveAttack(1, 0);

            expect(ship.isSunk()).toBe(true);
        });

        test('ship should not sink after 2 hits at the same coordinates', () => {
            gameboard.receiveAttack(0, 0);
            gameboard.receiveAttack(0, 0);

            expect(ship.isSunk()).toBe(false);
        });

        test('should record miss attack', () => {
            gameboard.receiveAttack(1, 1);
            gameboard.receiveAttack(5, 5);

            expect(gameboard.missed).toContainEqual([1, 1]);
            expect(gameboard.missed).toContainEqual([5, 5]);
        });
    });
});