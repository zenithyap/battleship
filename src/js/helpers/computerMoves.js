const computerMoves = (function() {
    let moves = [];

    function generate() {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                moves.push([i, j]);
            };
        };

        for (let i = moves.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let k = moves[i];
            moves[i] = moves[j];
            moves[j] = k;
        }
    };

    function get() {
        return moves.pop();
    }

    return { generate, get };
})();

export default computerMoves;