import Gameboard from "../gameboard/gameboard";

class Player {
    constructor(id='player1', type='real') {
        this._id = id;
        this._type = type;
        this._gameboard = new Gameboard();
    };
    
    get id() {
        return this._id;
    }

    get gameboard() {
        return this._gameboard;
    };
    
    get type() {
        return this._type;
    }
}

export default Player;