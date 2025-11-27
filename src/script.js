import { Player, Ship } from "./battleship.js";

const playerBoard = document.getElementById("player-board");
const computerBoard = document.getElementById("computer-board");

const game = new generateGame();
game.startGame();
game.createUpdateGrid(playerBoard);
game.createUpdateGrid(computerBoard);

class generateGame {
	constructor() {
		this.player1 = new Player("Player 1");
		this.player2 = new Player("Player 2");
	}

	startGame() {
		this.player1.gameBoard.placeShip(new Ship(2), 0, 0, true);
		this.player1.gameBoard.placeShip(new Ship(3), 2, 2, false);
		this.player2.gameBoard.placeShip(new Ship(2), 0, 0, true);
		this.player2.gameBoard.placeShip(new Ship(3), 2, 2, false);
	}

	createGrid(boardElement) {
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				const cell = document.createElement("div");
				cell.classList.add("cell");
				cell.dataset.x = i;
				cell.dataset.y = j;
				boardElement.appendChild(cell);
			}
		}
	}

  updateGrid(boardElement, gameBoard) {
    const cells = boardElement.querySelectorAll(".cell");
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = cells[i * 10 + j];
        const ship = gameBoard.board[i][j];
        if (ship instanceof Ship) {
          cell.classList.add("ship");
        } else if (gameBoard.missedAttacks.some((attack) => attack[0] === i && attack[1] === j)) {
          cell.classList.add("miss");
        }
      }
    }
  }

  createUpdateGrid(boardElement) {    
    this.createGrid(boardElement);
    this.updateGrid(boardElement, this.player1.gameBoard);
    this.updateGrid(boardElement, this.player2.gameBoard);
  }

  attackPlayer(board, x, y) {
    // Placeholder for player attack logic
    
  }

  computerAction() {
    // Placeholder for computer player logic
    
  }
}
