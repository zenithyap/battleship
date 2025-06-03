import Ship from "./ship.js";

describe('ship', () => {
    test('ship should be instace of Ship', () => {
        const ship = new Ship();
        expect(ship instanceof Ship).toBe(true);
    });

    test('ship should have length 3', () => {
        const ship = new Ship(3);
        expect(ship.length).toBe(3);
    });

    test('ship should have length 5', () => {
        const ship = new Ship(5);
        expect(ship.length).toBe(5);
    });

    test('ship should have hitCount of 1', () => {
        const ship = new Ship(2);
        ship.hit();
        expect(ship.hitCount).toBe(1);
    });

    test('ship should have hitCount of 3', () => {
        const ship = new Ship(3);
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.hitCount).toBe(3);
    });

    test('ship should not be sunk', () => {
        const ship = new Ship(3);
        expect(ship.isSunk()).toBe(false);
    })

    test('ship should be sunk', () => {
        const ship = new Ship(1);
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    })

    test('ship sunk if hit count greater than length', () => {
        const ship = new Ship(1);
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    })
});