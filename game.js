function initGame() {
    players[0] = new Player(1);
    players[1] = new Player(-1);
}

function Player(dir) {
    this.shape = new Kinetic.Rect({
            x: 100 * dir,
            y: 50,
            fill: "black",
            width: 50,
            height: 100,
    });
    centerOffset(this.shape);
    
    this.money = 0;

    playerLayer.add(this.shape);
}
