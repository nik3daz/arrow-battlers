function Game() {
    // Left Player
    players[0] = new Player(0, 1, [87, 83, 65, 68, 32]);
    // Right Player
    players[1] = new Player(1, -1, [38, 40, 37, 39, 13]);
    this.onKeyDown = function(player, key) {
        players[player.id].onKeyDown(key);
    };
    this.reset = function() {
        battle.healthBars[0].drawHealth();
        battle.healthBars[1].drawHealth();
        battle.skillQueueBoxes[0].update();
        battle.skillQueueBoxes[1].update();
        battle.overlay.hide();
    };
    this.show = function() {
        fadeIn(function() {
            menuLayer.moveToBottom();
            players[0].initForBattle();
            players[1].initForBattle();
            game.reset();
            fadeOut(function() {
                keyFocus = game;
            });

        });
    }
}

/** Players are on a layer where 0 is the center of screen 

    player.skillQueue - the skillSequences available on screen for the player to activate
    player.activeSkills - the skillSequences the player is trying to activate
*/
function Player(id, dir, udlre) {
    var curPlayer = this;
    this.opponentId = 1 - id;
    
    this.dotCurrent = false;
    this.hotCurrent = false;
    //================== PLAYER FUNCTIONS ======================
    /** Resets players so they are ready for battle */
    this.reset = function() {
        this.hp = 100;

        this.resetSkillQueue();
        this.keyLock = false;
        this.blockHp = 0;
        
    };

    this.damage = function(damage) {
        if (this.blockHp > 0) {
            this.blockHp -= damage;
            // deanimate wall
            return;
        }
        this.setPlayerAnimation("hurt");
        // damage the player
        this.changeHealth(-damage);
    }

    this.heal = function(healed) {
        this.changeHealth(healed);
    }

    this.changeHealth = function(amount) {
        this.hp += amount;
        if (this.hp > 100) this.hp = 100;
        if (this.hp <= 0) battle.gameOver(this.opponentId);
    }

    this.dot = function(totalDamageAmount, time, numTicks) {
        if (!this.dotCurrent && this.blockHp <= 0) {
            this.dotCurrent = true;
            curPlayer.updateSprite();
            this.ot({
                func: function(v) { 
                    curPlayer.setPlayerAnimation("hurt");
                    curPlayer.changeHealth(-v);
                },
                amount: totalDamageAmount,
                time: time,
                numTicks: numTicks,
                cb: function() {
                    curPlayer.dotCurrent = false;
                    curPlayer.updateSprite();
                },
            });
        }
    }

    this.hot = function(totalHealAmount, time, numTicks) {
        if (!this.hotCurrent) {
            this.hotCurrent = true;
            this.ot({
                func: function(v) { curPlayer.heal(v); },
                amount: totalHealAmount,
                time: time,
                numTicks: numTicks,
                cb: function() { curPlayer.hotCurrent = false; },
            });
        }
    }

    this.ot = function(config) {
        var animTime = 0;
        var count = config.numTicks;
        var tickTime = config.time / config.numTicks;
        var step = config.amount / config.numTicks;

        var anim = new Kinetic.Animation({
            func: function(f) {
                animTime += f.timeDiff;
                if (animTime > tickTime) {
                    if (count == 0) {
                        anim.stop();
                        if (config.cb) config.cb();
                        return;
                    }

                    config.func(step);

                    count--;
                    animTime -= tickTime;
                }
            },
            node: hudLayer,
        });
        anim.start();
    }

    this.block = function(time) {
        this.blockHp = 15;
        setTimeout(function() {
            this.blockHp = 0;
        }, 10000);
        // Animate wall
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
        if (key == KEY_E) {
            this.block();
        } else {
            var activated = false;
            // Remove skills that don't match
            for (var i = 0; i < this.activeSkills.length; i++) {
                var skillSequence = this.skillQueue[this.activeSkills[i]];
                if (skillSequence.get(this.skillStep) != key) {
                    this.activeSkills.splice(i--, 1);
                } else if (skillSequence.length == this.skillStep + 1) {
                    setTimeout(function() {
                        skillSequence.skill.activate(curPlayer);
                    }, skillSequence.skill.hitDelay);
                    activated = true;
                    break;
                } 
            }
            
            if (activated) {
                this.resetSkillQueueAnimate(function() {
                    curPlayer.cooldownAnimate(skillSequence.skill.cooldown);
                });
                this.setPlayerAnimation("attack");
                skillSequence.skill.animate();
            } else {
                this.skillStep++;
            }

            // Player fucked up
            if (this.activeSkills.length == 0) {
                // TODO Punish
                // Refresh matching skill list
                this.resetSkillQueueAnimate(function() { curPlayer.cooldownAnimate(1500); });
            }
        }
        battle.skillQueueBoxes[id].update();
    }

    this.cooldownAnimate = function(recoveryTime) {
        battle.skillQueueBoxes[id].queueGroup.setOpacity(0.5);
        curPlayer.keyLock = true;
        var bar = battle.skillQueueBoxes[id].recoveryBar;
        bar.setWidth(0);
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

    //============== SPRITE FUNCTIONS =================

    this.updateSprite = function() {
        var dotSuffix = "_dot";
        if (!curPlayer.dotCurrent) dotSuffix = "";
        var skins = curPlayer.skinIndex;
        console.log(ClassList.characters[curPlayer.selectedChar].skins[skins[0]]);
                console.log(ClassList.characters[curPlayer.selectedChar].skins[skins[1]]);
                        console.log(ClassList.characters[curPlayer.selectedChar].skins[skins[2]]);
        curPlayer.head.attrs.image = images[ClassList.characters[curPlayer.selectedChar].skins[skins[0]] + "_head" + dotSuffix];
        curPlayer.body.attrs.image = images[ClassList.characters[curPlayer.selectedChar].skins[skins[1]] + "_body" + dotSuffix];
        curPlayer.feet.attrs.image = images[ClassList.characters[curPlayer.selectedChar].skins[skins[2]] + "_feet" + dotSuffix];
    }

    var setSpriteAnimation = function(sprite, animName) {
        sprite.setAnimation(animName);
        sprite.afterFrame(PlayerSpriteAnimations[animName].length - 1,
            function () {
                sprite.setAnimation("idle");
            });
    };

    this.setPlayerAnimation = function(animName) {
        setSpriteAnimation(this.head, animName);
        setSpriteAnimation(this.body, animName);
        setSpriteAnimation(this.feet, animName);
    }

    this.toMenuPosition = function() {
        shape.setPosition(-dir * 250, 290);
    }

    this.toGamePosition = function() {
        shape.setPosition((stage.getWidth() / 2 - 40) * -dir, 
            stage.getHeight() / 2 - 160);
    }
    //================== PLAYER SETUP ======================
    this.id = id;
    this.dir = dir;
    this.selectedChar = 0;
    this.money = 0;
    this.skinIndex = [0,0,0];


    this.selectChar = function(characterId) {
        this.selectedChar = characterId;
        this.skinIndex = [0,0,0];
        this.updateSprite();
    }


    var shape = new Kinetic.Group({
        scale: [dir, 1],
    });
    this.head = new Kinetic.Sprite({
        image: images["tron_head"],
        animations: PlayerSpriteAnimations,
        animation: "idle",
        frameRate: PLAYER_SPRITE_FPS,
    });
    this.body = new Kinetic.Sprite({
        image: images["tron_body"],
        animations: PlayerSpriteAnimations,
        animation: "idle",
        frameRate: PLAYER_SPRITE_FPS,
    });
    this.feet = new Kinetic.Sprite({
        image: images["tron_feet"],
        animations: PlayerSpriteAnimations,
        animation: "idle",
        frameRate: PLAYER_SPRITE_FPS,
    });
    shape.add(this.head);
    shape.add(this.body);
    shape.add(this.feet);
    this.headSprite = "tron";
    this.bodySprite = "tron";
    this.feetSprite = "tron";
    playerLayer.add(shape);
    this.head.start();
    this.body.start();
    this.feet.start();
    this.shape = shape;

    //================== PLAYER BATTLE SETUP ======================
    this.initForBattle = function() {
        this.toGamePosition();
        this.reset();     
    }
   
    //playerLayer.add(this.shape);
}
