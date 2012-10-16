function ClassList() {

	this.init = function() {
		var characters = [];
		characters[0] = new Class({
            name:"TRON",
            skins: ["tron", "fireTron", "iceTron", "greenTron"],
            skinsCost:[0, 2, 2, 2],
            skillModifier: function(skillList) {
                skillList["Block"].sequenceLength = 4;
                skillList["Attack"].sequenceLength = 4;
                skillList["Heal"].sequenceLength = 4;
                skillList["DoT"].sequenceLength = 6;
                skillList["HoT"].sequenceLength = 6;
                skillList["QuickAttack"].sequenceLength = 2;
            },
            price:50,
		});

		characters[1] = new Class({
            name:"LEGO",
            skins: ["lego"],
            skinsCost:[0],
            skillModifier: function(skillList) {
                skillList["Block"].sequenceLength = 6;
                skillList["Attack"].sequenceLength = 4;
                skillList["Heal"].sequenceLength = 4;
                skillList["DoT"].sequenceLength = 6;
                skillList["HoT"].sequenceLength = 6;
                skillList["QuickAttack"].sequenceLength = 2;
            },
            price:50,
		});

		characters[2] = new Class({
            name:"BRICK MAN",
            skins: ["brickman"],
            skinsCost:[0],
            skillModifier: function(skillList) {
                skillList["Block"].sequenceLength = 6;
                skillList["Attack"].sequenceLength = 4;
                skillList["Heal"].sequenceLength = 4;
                skillList["DoT"].sequenceLength = 6;
                skillList["HoT"].sequenceLength = 6;
                skillList["QuickAttack"].sequenceLength = 2;
            },
            price:50,
		});

		characters[3] = new Class({
            name:"MINECRAFT",
            skins: ["minecraft"],
            skinsCost:[0],
            skillModifier: function(skillList) {
                skillList["Block"].sequenceLength = 6;
                skillList["Attack"].sequenceLength = 4;
                skillList["Heal"].sequenceLength = 4;
                skillList["DoT"].sequenceLength = 6;
                skillList["HoT"].sequenceLength = 6;
                skillList["QuickAttack"].sequenceLength = 2;
            },
            price:50,
		});

		characters[4] = new Class({
            name:"REDDIT ALIEN",
            skins: ["redditAlien"],
            skinsCost:[0],
            skillModifier: function(skillList) {
                skillList["Block"].sequenceLength = 4;
                skillList["Attack"].sequenceLength = 6;
                skillList["Attack"].activate =  function(caster) {
                    players[caster.opponentId].damage(8);
                },
                skillList["Heal"].sequenceLength = 6;
                skillList["DoT"].sequenceLength = 3;
                skillList["DoT"].activate = function(caster) {
                    players[caster.opponentId].dot(25, 2500, 5);
                },
                skillList["HoT"].sequenceLength = 3;
                skillList["HoT"].activate = function(caster) {
                    caster.hot(25, 2500, 5);
                },
                skillList["QuickAttack"].sequenceLength = 3;
            },
            price:50,
		});

		characters[5] = new Class({
            name:"SAMUS",
            skins: ["samus"],
            skinsCost:[0],
            skillModifier: function(skillList) {
                skillList["Block"].sequenceLength = 6;
                skillList["Attack"].sequenceLength = 3;
                skillList["Attack"].cooldown /= 2;
                skillList["Heal"].sequenceLength = 6;
                skillList["DoT"].sequenceLength = 4;
                skillList["HoT"].sequenceLength = 6;
                skillList["QuickAttack"].sequenceLength = 2;
                skillList["QuickAttack"].cooldown /= 2;
            },
            price:50,
		});
		this.characters = characters;
	}

	this.init();

}

// pirate
function Class(config) {
	this.init = function() {
		this.skillList = new getSkillList().globalSkills;
		this.skins = config.skins;
		this.config = config;
        this.skinsCost = config.skinsCost;
        this.price = config.price;
        this.name = config.name;

		if (config.skillModifier)
			config.skillModifier(this.skillList);
	}

	this.init();
}

