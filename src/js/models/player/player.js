import Gameboard from "../gameboard/gameboard";

class Player {
    constructor(type='real') {
        this._type = type;
        this._gameboard = new Gameboard();
    };

    get gameboard() {
        return this._gameboard;
    };
    
    get type() {
        return this._type;
    }
}

export default Player;