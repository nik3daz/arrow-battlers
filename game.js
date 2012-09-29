function Game() {
    players[0] = new Player(1, [87, 83, 65, 68, 32]);
    players[1] = new Player(-1, [38, 40, 37, 39, 13]);
    this.onKeyDown = function(key) {
        players[0].onKeyDown(key);
        players[1].onKeyDown(key);
    };
}

/** Players are on a layer where 0 is the center of screen */
function Player(dir, udlre) {
    this.id = dir;
    this.selectedChar = 0;
    //================== PLAYER FUNCTIONS ======================
    /** Resets players so they are ready for battle */
    this.reset = function() {
        this.hp = 100;
        // Skills that are in the process of activation
        this.skillStep = 0;

        // Skills that the player can currently activate
        this.skillQueue = [];
        for (var i = 0; i < SKILL_QUEUE_SIZE; i++) {
            this.skillQueue.push(this.nextSkill());
        }
        // Skills that the player is in the middle of activating
        this.activeSkills = range(0, SKILL_QUEUE_SIZE);
    };

    /** Returns KEY_X for the given event keycode, -1 on no match */
    this.getUdlre = function(evt) {
        var keyCode = evt.keyCode;
        var key = -1;
        if (ukeylre[0] == keyCode) {
            key = KEY_U;
        } else if (ukeylre[1] == keyCode) {
            key = KEY_D;
        } else if (ukeylre[2] == keyCode) {
            key = KEY_L;
        } else if (ukeylre[3] == keyCode) {
            key = KEY_R;
        } else if (ukeylre[4] == keyCode) {
            key = KEY_E
        }
        return d;
    }

    /** Takes player keystroke, matches against skill lists */
    this.onKeyDown = function(key) {
        // Remove skills that don't match
        for (var i = 0; i < this.activeSkills.length; i++) {
            var currentSkill = this.skillQueue[this.activeSkills[i]];
            if (currentSkill.get(this.skillStep) != d) {
                this.activeSkills.splice(i--, 1);
            }
            if (currentSkill.length == this.skillStep + 1) {
                this.activate(currentSkill.skill);
                this.skillQueue.splice(this.activeSkills[i], 1);
                this.skillQueue.push(this.nextSkill());
            }
        }
        this.skillStep++;
        // Player fucked up
        if (this.activeSkills.length == 0) {
            // TODO Punish
            // Refresh matching skill list
            this.activeSkills = range(0, SKILL_QUEUE_SIZE); 
        }
    }

    /** Get the next skill object that is placed in the skill list */
    this.nextSkill = function() {
        var rand = Math.floor(Math.random() * NUM_SKILLS);
        var skill = SkillList[rand];
        var sequence = skill.getSequence();
        return {
            sequence: sequence,
            length: sequence.length,
            get: function(i) { return sequence[i]; },
            skill: skill,
        };
    }

    //================== PLAYER SETUP ======================
    this.money = 0;
    this.shape = new Kinetic.Rect({
            x: 100 * dir,
            y: 50,
            fill: "black",
            width: 50,
            height: 100,
    });
    centerOffset(this.shape);

    this.reset();
    playerLayer.add(this.shape);
}
