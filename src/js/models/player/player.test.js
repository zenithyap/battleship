import Player from "./player";
import Gameboard from "../gameboard/gameboard";

describe('Player', () => {
    let player;

    beforeEach(() => {
        player = new Player();
    });

    test('player should be initialised with a gameboard', () => {
        expect(player.gameboard).toBeInstanceOf(Gameboard);
    });

    test('player should have default type of real', () => {
        expect(player.type).toBe('real');
    });
});