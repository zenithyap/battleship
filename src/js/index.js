import domController from '../js/controllers/domController';
import Player from './models/player/player';

const playerOne = new Player();
const playerTwo = new Player();

domController.renderBoard(playerOne);