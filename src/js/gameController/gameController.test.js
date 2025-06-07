import Player from "../models/player/player";
import gameController from "./gameController";

jest.mock('../models/player/player');

describe('gameController', () => {
    test('player constructor should have been called twice', () => {
        expect(Player).toHaveBeenCalledTimes(2);
    });
});