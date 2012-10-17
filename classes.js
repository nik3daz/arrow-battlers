function ClassList() {

	this.init = function() {
		var characters = [];
		characters[0] = new Class({
            name:"TRON",
            description: "",
            greyImage: images["greyTron"],
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
            description: "",
            greyImage: images["greyLego"],
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
            description: "",
            greyImage: images["greyBrickman"],
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
            description: "",
            greyImage: images["greyMinecraft"],
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
            description: "",
            greyImage: images["greyReddit"],
            skins: ["redditAlien"],
            skinsCost:[0],
            skillModifier: function(skillList) {
                skillList["Block"].sequenceLength = 4;
                skillList["Attack"].sequenceLength = 6;
                skillList["Attack"].value = 10;
                skillList["Heal"].sequenceLength = 6;
                skillList["DoT"].sequenceLength = 3;
                skillList["DoT"].value = 20;
                skillList["DoT"].time = 3000;
                skillList["HoT"].sequenceLength = 3;
                skillList["HoT"].value = 20;
                skillList["HoT"].time = 3000;
                skillList["QuickAttack"].sequenceLength = 3;
            },
            price:50,
		});

		characters[5] = new Class({
            name:"SAMUS",
            description: "",
            greyImage: images["greySamus"],
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
        this.greyImage = config.greyImage;
        this.description = config.description;

		if (config.skillModifier)
			config.skillModifier(this.skillList);
	}

	this.init();
}

