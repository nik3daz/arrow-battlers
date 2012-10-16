function getSkillList() {

    this.failCooldown = 1000;

    var globalSkills = [];
    
    globalSkills["Attack"] = new Skill({
        name: "Attack",
        helpText: "basic attack - basically, it's an attack",
        /** Difficulty of the sequence, (0-5) inclusive */
        sequenceDifficulty:1, 
        sequenceLength:4,
        /** Animation for the skill when it's activated */
        animate: function(caster) {
            for (var i = 0; i < 10; i++) {
                setTimeout(function() {
                shootSprite({
                    dir: caster.dir,
                    image: images["projectile"],
                    animations: {
                        idle: makeSpriteAnimation(0, 160, 80, 1),
                    },
                    animation: "idle",
                    frameRate: 1,
                    y: Math.random() * (stage.getHeight() / 2 - 10) + 5,
                    extraX: 100 + Math.random() * stage.getWidth() / 8,
                });}, i * 50);
            }
        },

        /** Does something when it's activated to a player */
        activate: function(caster) {
            players[caster.opponentId].damage(13);
        },
        arrowColor: "red",
        iconFill: {image: images["attack"]},
        extraHitDelay: 100,
        cooldown: 500,
    });

    globalSkills["Block"] = new Skill({
        name: "Block",
        helpText: "block - summons a shield that blocks a couple of hits",
        /** Difficulty of the sequence, (0-5) inclusive */
        sequenceDifficulty:1, 
        sequenceLength:6,
        /** Animation for the skill when it's activated */
        animate: function(caster) {
           var r = new Kinetic.Rect({
                width: 40, 
                height: 170,
                fill: "blue",
                x: caster.shape.getX() + caster.dir * 140,
                y: caster.shape.getY() + 115,
            });
            var f = function() {
                if (caster.blockHp > 0) {
                    setTimeout(f, 100);
                } else {
                    playerLayer.remove(r);
                }
            };
            setTimeout(function() {
                centerOffset(r);
                playerLayer.add(r); 
                playerLayer.draw();
                f();
            }, 10);
            
            // Actual activation
            caster.block(10000, 3);
        },

        /** Does something when it's activated to a player */
        activate: function(caster) {
        },
        extraHitDelay: 0,
        arrowColor: "yellow",
        iconFill: {image: images["defend"]},
        cooldown: 1000,
    });

    globalSkills["Heal"] = new Skill({
        name: "Heal",
        helpText: "heal - instantly adds health",
        /** Difficulty of the sequence, (0-5) inclusive */
        sequenceDifficulty:1, 
        sequenceLength:4,
        /** Animation for the skill when it's activated */
        animate: function(caster) {
            setTimeout(function() {
                var r = new Kinetic.Rect({
                    width: 50, 
                    height: 50,
                    fill: "green",
                    x: caster.shape.getX() + caster.dir * 65,
                    y: caster.shape.getY() + 180,
                    opacity: 0.8,
                });
                centerOffset(r);
                playerLayer.add(r);
                r.transitionTo({
                    y: r.getY() - 200,
                    opacity: 0,
                    duration: 1,
                    callback: function() { playerLayer.remove(r); }
                });
            }, 10);

            // Actual activation
            players[caster.id].heal(13);
        },

        /** Does something when it's activated to a player */
        activate: function(caster) {
        },
        arrowColor: "white",
        iconFill: {image: images["heal"]},
        extraHitDelay: 0,
        cooldown: 500,
    });

    globalSkills["DoT"] = new Skill({
        name: "DoT",
        helpText: "poison - do damage over time",
        /** Difficulty of the sequence, (0-5) inclusive */
        sequenceDifficulty:1, 
        sequenceLength:6,
        /** Animation for the skill when it's activated */
        animate: function(caster) {
            var f = function() {
                var opponent = players[caster.opponentId];
                var r = new Kinetic.Rect({
                    width: 20, 
                    height: 20,
                    fill: "purple",
                    x: opponent.shape.getX() + opponent.dir * 40 + opponent.dir * 80 * Math.random(),
                    y: opponent.shape.getY() + 180,
                    opacity: 0.8,
                });
                centerOffset(r);
                playerLayer.add(r);
                if (Math.floor(Math.random() * 2) == 0)
                    r.moveToBottom();
                r.transitionTo({
                    y: r.getY() - 200,
                    opacity: 0,
                    duration: 1,
                    callback: function() { playerLayer.remove(r); }
                });
                if (opponent.dotCurrent) {
                    setTimeout(f, 100 + 200 * Math.random());
                }
            };
            setTimeout(f, 1000 / PLAYER_SPRITE_FPS * PlayerSpriteAnimations["attack"].length + 1);
        },

        /** Does something when it's activated to a player */
        activate: function(caster) {
            players[caster.opponentId].dot(25, 5000, 5);
        },
        arrowColor: "green",
        iconFill: {image: images["dot"]},
        extraHitDelay: 0,
        cooldown: 1200,
    });

    globalSkills["HoT"] = new Skill({
        name: "HoT",
        helpText: "renew - regain health slowly",
        /** Difficulty of the sequence, (0-5) inclusive */
        sequenceDifficulty:1, 
        sequenceLength:6,
        /** Animation for the skill when it's activated */
        animate: function(caster) {
            var f = function() {
                var r = new Kinetic.Rect({
                    width: 20, 
                    height: 20,
                    fill: "green",
                    x: caster.shape.getX() + caster.dir * 40 + caster.dir * 80 * Math.random(),
                    y: caster.shape.getY() + 180,
                    opacity: 0.8,
                });
                centerOffset(r);
                playerLayer.add(r);
                if (Math.floor(Math.random() * 2) == 0)
                    r.moveToBottom();
                r.transitionTo({
                    y: r.getY() - 200,
                    opacity: 0,
                    duration: 1,
                    callback: function() { playerLayer.remove(r); }
                });
                if (caster.hotCurrent) {
                    setTimeout(f, 100 + 200 * Math.random());
                }
            };
            setTimeout(f, 1000 / PLAYER_SPRITE_FPS * PlayerSpriteAnimations["attack"].length + 1);
        },

        /** Does something when it's activated to a player */
        activate: function(caster) {
            players[caster.id].hot(25, 5000, 5);
        },
        arrowColor: "magenta",
        iconFill: "white", //{image: images["hot"]},
        extraHitDelay: 0,
        cooldown: 1000,
    });

    globalSkills["QuickAttack"] = new Skill({
        name: "QuickAttack",
        helpText: "flash strike - dodge an attack and weakly damage opponent",
        /** Difficulty of the sequence, (0-5) inclusive */
        sequenceDifficulty:1, 
        sequenceLength:2,
        /** Animation for the skill when it's activated */
        animate: function(caster) {
            caster.shape.transitionTo({
                opacity: 0,
                duration: 0.05,
                callback: function() {
                    console.log("tp");
                    caster.teleported = true;
                    caster.toOpponentsFace();
                    caster.shape.transitionTo({
                        opacity: 1,
                        duration: 0.6,
                        callback: function() {
                            caster.shape.transitionTo({
                                opacity: 0,
                                duration: 0.2,
                                callback: function() {
                                    console.log("tpoff");
                                    caster.teleported = false;
                                    caster.toGamePosition();
                                    caster.shape.transitionTo({
                                        opacity: 1,
                                        duration: 0.05,
                                    });
                                },
                            });
                        },
                    });
                }
            });
        },

        /** Does something when it's activated to a player */
        activate: function(caster) {
            players[caster.opponentId].damage(6);
        },
        arrowColor: "blue",
        iconFill: "blue", //{image: images["attack"]},
        extraHitDelay: 0,
        cooldown: 300,
    });
    
    this.globalSkills = globalSkills;

    this.keys = []
    for (var x in globalSkills) {
        this.keys.push(x);
    }

    this.getRandom = function(skillList) {
        var rand = Math.floor(Math.random() * SkillList.keys.length);
        return skillList[SkillList.keys[rand]];
    }
}




function Skill(config) {
    var suffix = range(0,4);
    

    this.generateSequence = function(player) {

        var seq = [];
        for (var i = 0; i < this.sequenceLength; i++) {
            seq[i] = suffix.splice(Math.floor(Math.random()*suffix.length), 1);
            if (suffix.length == 0) {
                suffix = range(0, 4);
            }
        }

        // generates a sequence
        return seq;
    }

    this.hitDelay = 1000 / PLAYER_SPRITE_FPS * PlayerSpriteAnimations["attack"].length +
            config.extraHitDelay;
    this.arrowColor = config.arrowColor;
    this.iconFill = config.iconFill;
    this.activate = config.activate;
    this.animate = config.animate;
    this.cooldown = config.cooldown;
    this.helpText = config.helpText;
    this.sequenceLength = config.sequenceLength;
    this.sequenceDifficulty = config.sequenceDifficulty;
        
}
