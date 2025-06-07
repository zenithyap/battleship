import Player from "../models/player/player";

const gameController = (function() {
    const players = [
        new Player(),
        new Player()
    ];

    let activePlayer = players[0];

    function getActivePlayer() {
        return activePlayer;
    }
})();

export default gameController;