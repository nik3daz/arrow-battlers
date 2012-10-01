function getSkillList() {
    var globalSkills = [];
    
    globalSkills["Attack"] = new Skill({
        name: "Attack",
        /** Difficulty of the sequence, (0-5) inclusive */
        sequenceDifficulty:1, 
        sequenceLength:3,
        /** Animation for the skill when it's activated */
        animate: function(caster) {
        },

        /** Does something when it's activated to a player */
        activate: function(caster) {
        },
    });

    globalSkills["Block"] = new Skill({
        name: "Block",
        /** Difficulty of the sequence, (0-5) inclusive */
        sequenceDifficulty:1, 
        sequenceLength:2,
        /** Animation for the skill when it's activated */
        animate: function(caster) {
        },

        /** Does something when it's activated to a player */
        activate: function(caster) {
        },
    });

    globalSkills["Heal"] = new Skill({
        name: "Heal",
        /** Difficulty of the sequence, (0-5) inclusive */
        sequenceDifficulty:1, 
        sequenceLength:3,
        /** Animation for the skill when it's activated */
        animate: function(caster) {
        },

        /** Does something when it's activated to a player */
        activate: function(caster) {
        },
    });

    globalSkills["DoT"] = new Skill({
        name: "DoT",
        /** Difficulty of the sequence, (0-5) inclusive */
        sequenceDifficulty:1, 
        sequenceLength:4,
        /** Animation for the skill when it's activated */
        animate: function(caster) {
        },

        /** Does something when it's activated to a player */
        activate: function(caster) {
        },
    });

    globalSkills["HoT"] = new Skill({
        name: "HoT",
        /** Difficulty of the sequence, (0-5) inclusive */
        sequenceDifficulty:1, 
        sequenceLength:5,
        /** Animation for the skill when it's activated */
        animate: function(caster) {
        },

        /** Does something when it's activated to a player */
        activate: function(caster) {
        },
    });

    globalSkills["MagicAttack"] = new Skill({
        name: "MagicAttack",
        /** Difficulty of the sequence, (0-5) inclusive */
        sequenceDifficulty:1, 
        sequenceLength:6,
        /** Animation for the skill when it's activated */
        animate: function(caster) {
        },

        /** Does something when it's activated to a player */
        activate: function(caster) {
        },
    });
    
    this.globalSkills = globalSkills;

    this.keys = []
    for (var x in globalSkills) {
        this.keys.push(x);
    }

    this.getRandom = function() {
        var rand = Math.floor(Math.random() * this.keys.length);
        return this.globalSkills[this.keys[rand]];
    }
}




function Skill(config) {
    this.generateSequence = function(player, seqLength, difficulty) {
        if (!seqLength) seqLength = config.sequenceLength;
        if (!difficulty) difficulty = config.sequenceDifficulty;
        
        var seq = [];
        for (var i = 0; i < seqLength; i++) {
            seq[i] = Math.floor(Math.random() * 4);
        }

        // generates a sequence
        return seq;
    }

    this.activate = config.activate;
    this.animate = config.animate;
}
