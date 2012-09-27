function initGame() {
    players[0] = new Player(1, [87, 83, 65, 68]);
    players[1] = new Player(-1, [38, 40, 37, 39]);
}

// Players are on a layer where 0 is the center of screen
function Player(dir, udlr) {
    this.shape = new Kinetic.Rect({
            x: 100 * dir,
            y: 50,
            fill: "black",
            width: 50,
            height: 100,
    });
    centerOffset(this.shape);

    this.udlr = udlr;
    
    this.money = 0;
    this.boughtSkills = [];

    this.reset = function() {
        this.hp = 100;
        // Skills that are in the process of activation
        this.skillStep = 0;

        // Skills that the player can currently activate
        this.skills = [];
        this.activeSkills = this.skills.slice();
    };

    this.pressKey(key) {
        var d = -1;
        if (keys[this.udlr[0]]) {
            d = 0;
        } else if (keys[this.udlr[1]]) {
            d = 2;
        } else if (keys[this.udlr[2]]) {
            d = 3;
        } else if (keys[this.udlr[3]]) {
            d = 1;
        }
        if (d != -1) {
            for (var i = 0; i < this.activeSkills.length; i++) {
                if (this.activeSkills[i] != d) {
                    this.activeSkills.splice(i--, 1);
                }
            }
            this.skillStep++;
            // Player fucked up
            if (this.activeSkills.length == 0) {
                // TODO Punish
                this.activeSkills = this.skills.slice();
            }
        }
    }

    this.reset();

    playerLayer.add(this.shape);
}

function Skill(seq, anim) {
    this.seq = seq;
    this.anim = anim;
}
