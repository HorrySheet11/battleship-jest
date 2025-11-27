const {Ship, Player} = require('./battleship.js');

// Example usage:
test ("ship health is reduced by 1 when hit", () => {
    const samplePlayer = new Player("Alice");
    const ship = new Ship(3);
    samplePlayer.gameBoard.placeShip(ship, 0, 0, true); // Place ship vertically at (0,0)

    samplePlayer.gameBoard.receiveAttack(0, 0); // Attack the ship
    expect(ship.health).toBe(2); // Health should be reduced to 2


    samplePlayer.gameBoard.receiveAttack(1, 0); // Attack the ship again
    expect(ship.health).toBe(1); // Health should be reduced to 1
});

test ("gameboard registers missed attacks", () => {
    const samplePlayer = new Player("Bob");
    const ship = new Ship(2);
    samplePlayer.gameBoard.placeShip(ship, 5, 5, false); // Place ship horizontally at (5,5)

    const attackResult = samplePlayer.gameBoard.receiveAttack(0, 0); // Attack an empty spot
    expect(attackResult).toBe(false); // Should be a miss
    expect(samplePlayer.gameBoard.missedAttacks).toContainEqual([0, 0]); // Missed attacks should include (0,0)
});

test ("player loses when all ships are sunk", () => {
    const samplePlayer = new Player("Charlie");
    const ship1 = new Ship(2);
    const ship2 = new Ship(3);
    samplePlayer.gameBoard.placeShip(ship1, 0, 0, true); // Place ship1 vertically at (0,0)
    samplePlayer.gameBoard.placeShip(ship2, 2, 2, false); // Place ship2 horizontally at (2,2)

    // Sink ship1
    samplePlayer.gameBoard.receiveAttack(0, 0);
    samplePlayer.gameBoard.receiveAttack(1, 0);

    // Sink ship2
    samplePlayer.gameBoard.receiveAttack(2, 2);
    samplePlayer.gameBoard.receiveAttack(2, 3);
    samplePlayer.gameBoard.receiveAttack(2, 4);

    expect(samplePlayer.gameBoard.hasLost()).toBe(true); // Player should have lost
});

test ("player has not lost if at least one ship is afloat", () => {
    const samplePlayer = new Player("Dana");
    const ship1 = new Ship(2);
    const ship2 = new Ship(3);
    samplePlayer.gameBoard.placeShip(ship1, 0, 0, true); // Place ship1 vertically at (0,0)
    samplePlayer.gameBoard.placeShip(ship2, 2, 2, false); // Place ship2 horizontally at (2,2)

    // Sink ship1
    samplePlayer.gameBoard.receiveAttack(0, 0);
    samplePlayer.gameBoard.receiveAttack(1, 0);

    // Attack ship2 but do not sink it
    samplePlayer.gameBoard.receiveAttack(2, 2);
    samplePlayer.gameBoard.receiveAttack(2, 3);

    expect(samplePlayer.gameBoard.hasLost()).toBe(false); // Player should not have lost
});
