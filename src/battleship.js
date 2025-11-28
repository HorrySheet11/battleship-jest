class Ship {
	constructor(length) {
		this.length = length;
		this.health = length;
	}
	hit() {
		if (this.health > 0) {
			this.health -= 1;
		}
	}
	isSunk() {
		return this.health === 0;
	}
}

class Gameboard {
	constructor() {
		this.board = [];
		for (let i = 0; i < 10; i++) {
			this.board[i] = [];
			for (let j = 0; j < 10; j++) {
				this.board[i][j] = null;
			}
		}
		this.ships = [];
		this.missedAttacks = [];
		this.hits = [];
	}
	placeShip(ship, x, y, isVertical) {
		if (isVertical) {
			for (let i = 0; i < ship.length; i++) {
				this.board[x + i][y] = ship;
			}
		} else {
			for (let i = 0; i < ship.length; i++) {
				this.board[x][y + i] = ship;
			}
		}
	}
	receiveAttack(x, y) {
		if ([...this.missedAttacks, ...this.hits].some(coord => coord[0] === x && coord[1] === y)) {
			console.log('Attack already made at: ', x, y);
			return null; // Attack already made here
		}
		const target = this.board[x][y];
		if (target instanceof Ship) {
			target.hit();
			this.hits.push([x, y]);
			console.log("Hit registered on ship at:", x, y);
			console.log(this.hits);
			return true; // Hit
		}
		this.missedAttacks.push([x, y]);
		console.log('Missed attack: ', x, y);
		console.log(this.missedAttacks);
		
		return false; // Miss
	}
	hasLost() {
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				const ship = this.board[i][j];
				if (ship instanceof Ship && !ship.isSunk()) {
					return false;
				}
			}
		}
		return true;
	}
}

class Player {
    constructor(name) {
        this.name = name;
        this.gameBoard = new Gameboard();
    }

    getGameBoard() {
        return this.gameBoard;
    }
}

export {Player, Ship};
