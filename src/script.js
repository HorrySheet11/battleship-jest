import { Player, Ship } from "./battleship.js";

const playerBoard = document.getElementById("player-board");
const computerBoard = document.getElementById("computer-board");
const turn = document.querySelector(".turn");

class generateGame {
	constructor() {
		this.player1 = new Player("Player 1");
		this.player2 = new Player("Player 2");
		this.currentTurn = this.player1;
	}

	startGame() {
		this.player1.gameBoard.placeShip(new Ship(2), 1, 1, true);
		this.player1.gameBoard.placeShip(new Ship(3), 3, 3, false);
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
				cell.onclick = () => {
					this.attackPlayer(
						this.currentTurn === this.player1 ? this.player2 : this.player1,
						i,
						j,
					);
				};
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
				} else if (
					gameBoard.missedAttacks.some(
						(attack) => attack[0] === i && attack[1] === j,
					)
				) {
					cell.classList.add("miss");
				} else if (gameBoard.hits.some((hit) => hit[0] === i && hit[1] === j)) {
					cell.classList.add("hit");
				}
			}
		}
	}

	changeTurn() {
		this.currentTurn =
			this.currentTurn === this.player1 ? this.player2 : this.player1;
    turn.textContent = `Turn: ${this.currentTurn.name}`;
	}

	createUpdateGrid(boardElement, player) {
		this.createGrid(boardElement);
		this.updateGrid(boardElement, player.gameBoard);
	}

	attackPlayer(player, x, y) {
		player.gameBoard.receiveAttack(x, y);
    this.updateGrid(player === this.player1 ? playerBoard : computerBoard, player.gameBoard);
	}

	computerAction() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    this.attackPlayer(this.player1, x, y);
	}
}

const game = new generateGame();
game.startGame();
game.createUpdateGrid(playerBoard, game.player1);
game.createUpdateGrid(computerBoard, game.player2);
