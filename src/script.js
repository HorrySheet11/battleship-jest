import { Player, Ship } from "./battleship.js";

const playerBoard = document.getElementById("player-board");
const computerBoard = document.getElementById("computer-board");
const turn = document.querySelector(".turn");
const playerNameInput = document.getElementById("player-input");
const playerName2Input = document.getElementById("player2-input");
const player1nameDisplay = document.getElementById("player1name");
const player2nameDisplay = document.getElementById("player2name");
const actionText = document.getElementById("action-text");

document.querySelector(".restart").addEventListener("click", () => {
  location.reload();
});

playerNameInput.addEventListener("change", () => {
	game.player1.name = playerNameInput.value || "Player 1";
	player1nameDisplay.textContent = game.player1.name;
	playerNameInput.hidden = true;
	playerName2Input.hidden = false;
});

playerName2Input.addEventListener("change", () => {
	game.player2.name = playerName2Input.value || "Computer";
	if (game.player2.name.toLowerCase() === "computer") {
		game.player2.name = "Computer";
	}
	player2nameDisplay.textContent = game.player2.name;
	playerName2Input.hidden = true;
	computerBoard.style.pointerEvents = "auto";
	turn.textContent = `Turn: ${game.currentTurn.name}`;
});

class generateGame {
	constructor() {
		this.player1 = new Player("");
		this.player2 = new Player("");
		this.currentTurn = this.player1;
	}

	startGame() {
		this.player1.gameBoard.placeShip(new Ship(2), 1, 1, true);
		this.player1.gameBoard.placeShip(new Ship(3), 3, 3, false);
		this.player2.gameBoard.placeShip(new Ship(2), 0, 0, true);
		this.player2.gameBoard.placeShip(new Ship(3), 2, 2, false);
		playerBoard.style.pointerEvents = "none";
		computerBoard.style.pointerEvents = "none";
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
					if (ship.isSunk()) {
						cell.classList.add("hit");
						cell.classList.add("sunk");
						continue;
					}
					if (
						cell.classList.contains("ship") &&
						gameBoard.hits.some((attack) => attack[0] === i && attack[1] === j)
					) {
						cell.classList.add("hit");
					} else {
						cell.classList.add("ship");
					}
				} else if (
					gameBoard.missedAttacks.some(
						(attack) => attack[0] === i && attack[1] === j,
					)
				) {
					cell.classList.add("miss");
				}
			}
		}
	}

	changeTurn() {
		this.currentTurn =
			this.currentTurn === this.player1 ? this.player2 : this.player1;
		turn.textContent = `Turn: ${this.currentTurn.name}`;
		if (this.currentTurn === this.player1) {
			playerBoard.style.pointerEvents = "none";
			computerBoard.style.pointerEvents = "auto";
		} else {
			playerBoard.style.pointerEvents = "auto";
			computerBoard.style.pointerEvents = "none";
		}
	}

	createUpdateGrid(boardElement, player) {
		this.createGrid(boardElement);
		this.updateGrid(boardElement, player.gameBoard);
	}

	attackPlayer(player, x, y) {
		const action = player.gameBoard.receiveAttack(x, y);
		actionText.textContent = action
			? `Hit at ${x}, ${y}!`
			: `Miss at ${x}, ${y}`;
		this.updateGrid(
			player === this.player1 ? playerBoard : computerBoard,
			player.gameBoard,
		);
		if (player.gameBoard.hasLost()) {
			turn.textContent = "Game Over";
	    playerBoard.style.pointerEvents = "none";
			computerBoard.style.pointerEvents = "none";
      document.querySelector(".restart").hidden = false;
			alert(`${this.currentTurn.name} wins!`);
			return;
		}
		if (action === false) {
			this.changeTurn();
		}
		if (this.currentTurn === this.player2 && this.player2.name === "Computer") {
			setTimeout(() => this.computerAction(), 2000);
		}
	}

	computerAction() {
		console.log("Computer Action:");
		const x = Math.floor(Math.random() * 10);
		const y = Math.floor(Math.random() * 10);
		this.attackPlayer(this.player1, x, y);
	}
}

const game = new generateGame();
game.startGame();
game.createUpdateGrid(playerBoard, game.player1);
game.createUpdateGrid(computerBoard, game.player2);
game.player2.name = "Computer";
