function Game() {
    // Left Player
    players[0] = new Player(0, 1, [87, 83, 65, 68, 32, 90, 88]);
    // Right Player
    players[1] = new Player(1, -1, [38, 40, 37, 39, 13, 191, 190]);
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
            battle.gameOver = false;
            menuLayer.moveToBottom();
            players[0].initForBattle();
            players[1].initForBattle();
            game.reset();
            fadeOut(function() {
                keyFocus = game;
            });

        });
    };

}

/** Players are on a layer where 0 is the center of screen 

    player.skillQueue - the skillSequences available on screen for the player to activate
    player.activeSkills - the skillSequences the player is trying to activate
*/
function Player(id, dir, udlre) {
    var curPlayer = this;
    this.opponentId = 1 - id;
    this.unlockedChars = [0];
    this.unlockedSkins = [];
    // unlock the skins that are unlocked for the character
    for (var i = 0; i < this.unlockedChars.length; i++) {
        // for all the skins the character has
        this.unlockedSkins[i] = [];
        for (var j = 0; j < ClassList.characters[i].skins.length; j++) {
            // check if the skin is free
            this.unlockedSkins[i][j] = [];
            if (ClassList.characters[this.unlockedChars[i]].skinsCost[j] == 0) {
                this.unlockedSkins[i][j].push(0);
                this.unlockedSkins[i][j].push(1);
                this.unlockedSkins[i][j].push(2);
            }
        }
    }
    
    //================== PLAYER FUNCTIONS ======================
    /** Resets players so they are ready for battle */
    this.reset = function() {
        this.hp = 100;

        this.resetSkillQueue();
        this.keyLock = false;
        this.blockHp = 0;
        this.teleported = false;
        this.dotCurrent = false;
        this.hotCurrent = false;
        
    };

    /** Unlocks a character, pays the money and all that shiiiiiit */
    this.unlockCharacter = function(characterId, fcb, scb) {
        var price = ClassList.characters[characterId].price;
        if (this.money >= price) {
            this.money -= price;
            this.unlockedChars.push(characterId);

            // claim all the free skins for this character
            this.unlockedSkins[characterId] = [];
            for (var j = 0; j < ClassList.characters[characterId].skins.length; j++) {
                // check if the skin is free
                this.unlockedSkins[characterId][j] = [];
                if (ClassList.characters[characterId].skinsCost[j] == 0) {
                    this.unlockedSkins[characterId][j].push(0);
                    this.unlockedSkins[characterId][j].push(1);
                    this.unlockedSkins[characterId][j].push(2);
                }
            }

            scb();
        } else {
            fcb();
        }
    }

    this.damage = function(damage) {
        if (curPlayer.blockHp > 0) {
            curPlayer.blockHp -= 1;
            console.log(curPlayer.blockHp);
            // deanimate wall
            if (curPlayer.blockHp <= 0) clearTimeout(curPlayer.blockTimer);
            damage *= 0.5;
        }
        if (curPlayer.teleported) return;
        curPlayer.setPlayerAnimation("hurt");
        // damage the player
        curPlayer.changeHealth(-damage);
    }

    this.heal = function(healed) {
        this.changeHealth(healed);
    }

    this.changeHealth = function(amount) {
        console.log(battle.gameOver);
        if (battle.gameOver) return;
        this.hp += amount;
        if (this.hp > 100) this.hp = 100;
        if (this.hp <= 0) { 
            battle.doGameOver(this.opponentId);
            this.hp = 0;
        }
    }

    this.dot = function(totalDamageAmount, time, numTicks) {
        if (!this.dotCurrent && this.blockHp <= 0 && !this.teleported) {
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
        if (curPlayer.blockHp > 0) {
            curPlayer.blockHp--;
            console.log(curPlayer.blockHp);
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

    this.block = function(time, hp) {
        if (curPlayer.blockHp > 0) return;
        curPlayer.blockHp = hp;
        curPlayer.blockTimer = setTimeout(function() {
            curPlayer.blockHp = 0;
        }, time);
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
        } else if (udlre[5] == keyCode) {
            key = KEY_HELP;
        } else if (udlre[6] == keyCode) {
            key = KEY_CLASS_HELP;
        }
        return key;
    }

    /** Takes player keystroke, matches against skill lists */
    this.onKeyDown = function(key) {
        if (this.keyLock) return;
        var activated = null;
        // Remove skills that don't match
        for (var i = 0; i < this.activeSkills.length; i++) {
            var skillSequence = this.skillQueue[this.activeSkills[i]];
            if (skillSequence.get(this.skillStep) != key) {
                this.activeSkills.splice(i--, 1);
            } else if (skillSequence.length == this.skillStep + 1) {
                setTimeout(function() {
                    skillSequence.skill.activate(curPlayer);
                }, skillSequence.skill.hitDelay);
                activated = skillSequence;
            } 
        }
        
        this.skillStep++;
        if (activated) {
            this.resetSkillQueueAnimate(function() {
                curPlayer.cooldownAnimate(2*activated.skill.cooldown);
            });
            this.setPlayerAnimation("attack");
            activated.skill.animate(curPlayer);
        }

        // Player fucked up
        if (this.activeSkills.length == 0) {
            // TODO Punish
            // Refresh matching skill list
            this.resetSkillQueueAnimate(function() { curPlayer.cooldownAnimate(1.8*SkillList.failCooldown); });
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
        this.skillQueue = this.nextSkills();

        // Skills that the player is in the middle of activating
        this.activeSkills = range(0, SKILL_QUEUE_SIZE);
    }

    /** Get the next skill object that is placed in the skill list */
    this.nextSkills = function() {
        var a = [];
        for (var i = 0; i < SKILL_QUEUE_SIZE; i++) {
            var skill = SkillList.getRandom(ClassList.characters[curPlayer.selectedChar]);
            var sequence = skill.generateSequence(curPlayer);
            a.push({
                sequence: sequence,
                length: sequence.length,
                get: function(i) { return this.sequence[i]; },
                skill: skill,
            });
        }
        for (var i = 0; i < SKILL_QUEUE_SIZE; i++) {
            var targetLength = a[i].sequence.length;
            var collide = true;
            while (collide) {
                collide = false;
                for (j = 0; j < SKILL_QUEUE_SIZE; j++) {
                    if (i == j) continue;
                    if (targetLength > a[j].sequence.length) continue;
                    if (a[j].sequence[targetLength - 1] == a[i].sequence[targetLength - 1]) {
                        collide = true;
                        break;
                    }
                }
                if (collide) a[i].sequence[targetLength - 1] = Math.floor(Math.random() * 4);
            }
        }
        return a;
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

        // check if the player owns the character
        if (contains(curPlayer.unlockedChars, curPlayer.selectedChar)) {
            curPlayer.head.attrs.image = images[ClassList.characters[curPlayer.selectedChar].skins[skins[0]] + "_head"];
            curPlayer.body.attrs.image = images[ClassList.characters[curPlayer.selectedChar].skins[skins[1]] + "_body"];
            curPlayer.feet.attrs.image = images[ClassList.characters[curPlayer.selectedChar].skins[skins[2]] + "_feet"];
        } else {
            curPlayer.head.attrs.image = images["unknown_head"];
            curPlayer.body.attrs.image = images["unknown_body"];
            curPlayer.feet.attrs.image = images["unknown_feet"];
        }
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

    this.toOpponentsFace = function() {
        shape.setPosition((stage.getWidth() / 2 - 300) * dir, 
            stage.getHeight() / 2 - 160);
    }
    //================== PLAYER SETUP ======================
    this.id = id;
    this.dir = dir;
    this.selectedChar = 0;
    this.money = 500;
    this.skinIndex = [0,0,0];


    this.selectChar = function(characterId) {
        this.selectedChar = characterId;
        this.skinIndex = [0,0,0];
        this.updateSprite();
        for (var i = 0; i < 6; i++) {
            menu.skillBoxes[id][i].setOpacity(ClassList.characters[characterId].skillShow[i]);
        }
        menuLayer.draw();
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
    this.headSprite = "tronGood";
    this.bodySprite = "tronGood";
    this.feetSprite = "tronGood";
    playerLayer.add(shape);
    this.head.start();
    this.body.start();
    this.feet.start();
    this.shape = shape;
    this.help = makeHelpShape(-dir * 180);
    helpLayer.add(this.help);
    this.classHelp = makeClassHelpShape(-dir * 180);
    helpLayer.add(this.classHelp);

    //================== PLAYER BATTLE SETUP ======================
    this.initForBattle = function() {
        this.toGamePosition();
        this.reset();     
    }
   
    //playerLayer.add(this.shape);
}
