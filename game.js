function Game() {
    // Left Player
    players[0] = new Player(0, 1, [87, 83, 65, 68, 32]);
    // Right Player
    players[1] = new Player(1, -1, [38, 40, 37, 39, 13]);
    this.onKeyDown = function(player, key) {
        players[player.id].onKeyDown(key);
    };
    this.reset = function() {
        players[0].reset();
        players[1].reset();
        battle.healthBars[0].drawHealth();
        battle.healthBars[1].drawHealth();
        battle.skillQueueBoxes[0].update();
        battle.skillQueueBoxes[1].update();
        battle.overlay.hide();
    };
}

/** Players are on a layer where 0 is the center of screen 

    player.skillQueue - the skills available on screen for the player to activate
    player.activeSkills - the skills the player is trying to activate
*/
function Player(id, dir, udlre) {
    var curPlayer = this;
    this.opponentId = 1 - id;
    //================== PLAYER FUNCTIONS ======================
    /** Resets players so they are ready for battle */
    this.reset = function() {
        this.hp = 100;

        this.resetSkillQueue();
        this.keyLock = false;
        
    };

    this.damage = function(damage) {
        // damage the player
        this.hp -= 100;

        // check if the player is still alive
        if (this.hp <= 0) {
            // PWNED
            battle.gameOver(this.opponentId);
        }
    }

    this.heal = function(healed) {
        this.hp = this.hp + healed;
        if (this.hp > 100) {
            this.hp = 100;
        }
    }



    /** Returns KEY_X for the given event keycode, -1 on no match */
    this.getUdlre = function(evt) {
        var keyCode = evt.keyCode;
        var key = -1;
        if (udlre[0] == keyCode) {
            key = KEY_U;
        } else if (udlre[1] == keyCode) {
            key = KEY_D;
        } else if (udlre[2] == keyCode) {
            key = KEY_L;
        } else if (udlre[3] == keyCode) {
            key = KEY_R;
        } else if (udlre[4] == keyCode) {
            key = KEY_E;
        }
        return key;
    }

    /** Takes player keystroke, matches against skill lists */
    this.onKeyDown = function(key) {
        if (this.keyLock) return;
        var activated = false;
        // Remove skills that don't match
        for (var i = 0; i < this.activeSkills.length; i++) {
            var currentSkill = this.skillQueue[this.activeSkills[i]];
            if (currentSkill.get(this.skillStep) != key) {
                this.activeSkills.splice(i--, 1);
            } else if (currentSkill.length == this.skillStep + 1) {
                currentSkill.skill.activate(this);
                activated = true;
                break;
            } 
        }
        
        if (activated) {
            this.resetSkillQueueAnimate();
        } else {
            this.skillStep++;
        }

        // Player fucked up
        if (this.activeSkills.length == 0) {
            // TODO Punish
            // Refresh matching skill list
            this.resetSkillQueueAnimate(this.failSkillAnimate);
        }
        battle.skillQueueBoxes[id].update();
    }

    this.failSkillAnimate = function() {
        var recoveryTime = 1500;
        battle.skillQueueBoxes[id].queueGroup.setOpacity(0.5);
        hudLayer.draw();
        curPlayer.keyLock = true;
        var bar = battle.skillQueueBoxes[id].recoveryBar;
        bar.show();
        var anim = new Kinetic.Animation({
            func: function(f) {
                bar.setWidth(f.time/recoveryTime * bar.width);
            },
            node: hudLayer,
        });
        anim.start();
        setTimeout(function() {
            anim.stop();
            curPlayer.keyLock = false;
            battle.skillQueueBoxes[id].queueGroup.setOpacity(1);
            bar.hide();
            hudLayer.draw();
        }, recoveryTime);
    }

    this.resetSkillQueueAnimate = function(cb) {
        if (!cb) cb = function() {};
        var bgShape = battle.skillQueueBoxes[id].background;
        var qgShape = battle.skillQueueBoxes[id].queueGroup;
        var ox = qgShape.getX();
        var oy = qgShape.getY();
        curPlayer.keyLock = true;
        var count = 10;
        var t = 100;
        var flashTime = 50;
        var anim = new Kinetic.Animation({
            func: function(f) {
                t += f.timeDiff;
                if (t > flashTime) {
                    if (count == 0) {
                        anim.stop();
                        curPlayer.resetSkillQueue();
                        battle.skillQueueBoxes[id].update();
                        curPlayer.keyLock = false;
                        qgShape.setX(ox);
                        qgShape.setY(oy);

                        cb();
                        return;
                    }
                    if (bgShape.getFill() != null) {
                        bgShape.setFill(null);
                    } else {
                        bgShape.setFill("#EEE");
                    }
                    count--;
                    t -= flashTime;
                }
                qgShape.setX(ox - 5 + 10 * Math.random());
                qgShape.setY(oy - 5 + 10 * Math.random());
            },
            node: hudLayer,
        });
        curPlayer.keyLock = true;
        anim.start();
    }

    this.resetSkillQueue = function() {
        this.skillStep = 0;

        // Skills that are on screen
        this.skillQueue = [];
        for (var i = 0; i < SKILL_QUEUE_SIZE; i++) {
            this.skillQueue.push(this.nextSkill());
        }

        // Skills that the player is in the middle of activating
        this.activeSkills = range(0, SKILL_QUEUE_SIZE);
    }

    /** Get the next skill object that is placed in the skill list */
    this.nextSkill = function() {
        var skill = SkillList.getRandom();
        var sequence = skill.generateSequence(this);
        return {
            sequence: sequence,
            length: sequence.length,
            get: function(i) { return sequence[i]; },
            skill: skill,
        };
    }

    this.setMoney = function(value) {
        this.money = value;
        menu.money[this.id].setText("$" + value);
    }

    //================== PLAYER SETUP ======================
    this.id = id;
    this.dir = dir;
    this.selectedChar = 0;
    this.money = 0;

    this.shape = new Kinetic.Rect({
            x: 100 * dir,
            y: 50,
            fill: "black",
            width: 50,
            height: 100,
    });
    centerOffset(this.shape);

    //================== PLAYER BATTLE SETUP ======================
    this.initForBattle = function() {
        this.reset();     
    }
   
    //playerLayer.add(this.shape);
}
