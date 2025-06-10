import '../../src/styles.css';
import domController from '../js/controllers/domController';
import Player from './models/player/player';
import Ship from './models/ship/ship';

const playerOne = new Player('player1');
const playerTwo = new Player('player2', 'computer');

const playerOneBoard = playerOne.gameboard;

const carrier = new Ship(5);
const battleship = new Ship(4);
const cruiser = new Ship(3);
const submarine = new Ship(3);
const destroyer = new Ship(2);

playerOneBoard.placeShip(carrier, 0, 0, 'horizontal');
playerOneBoard.placeShip(battleship, 1, 0, 'horizontal');
playerOneBoard.placeShip(cruiser, 2, 0, 'horizontal');
playerOneBoard.placeShip(submarine, 3, 0, 'horizontal');
playerOneBoard.placeShip(destroyer, 4, 0, 'horizontal');

domController.renderBoard(playerOne);
domController.renderBoard(playerTwo);