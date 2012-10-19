function ClassList() {

	this.init = function() {
		var characters = [];
		characters[0] = new Class({
            name:"TRON",
            description: "",
            greyImage: images["greyTron"],
            skins: ["tron", "tronGood", "tronEvil", "fireTron", "iceTron", "greenTron"],
            skinsCost:[0, 0, 0, 2, 2, 2],
            skillShow: [0, 0, 0, 0, 0, 0],
            skillModifier: function(skillList) {
                skillList["Block"].sequenceLength = 6;
                skillList["Attack"].sequenceLength = 4;
                skillList["Heal"].sequenceLength = 4;
                skillList["DoT"].sequenceLength = 6;
                skillList["HoT"].sequenceLength = 6;
                skillList["QuickAttack"].sequenceLength = 2;
                skillList["Block"].value *= 1.5;
                skillList["Attack"].value *= 1.3;
                skillList["Heal"].value *= 1.3;
                skillList["DoT"].value *= 1.3;
                skillList["HoT"].value *= 1.3;
                skillList["QuickAttack"].value *= 1.3;
                skillList["Block"].cooldown *= 1.5;
                skillList["Attack"].cooldown *= 1.5;
                skillList["Heal"].cooldown *= 1.5;
                skillList["DoT"].cooldown *= 1.5;
                skillList["HoT"].cooldown *= 1.5;
                skillList["QuickAttack"].cooldown *= 1.5;
            },
            price:50,
		});

		characters[1] = new Class({
            name:"LEGO",
            description: "",
            greyImage: images["greyLego"],
            skins: ["lego", "legoMan", "legoMo", "legoSuit"],
            skinsCost:[0, 2, 2, 5],
            skillShow: [0, 0.5, 0.5, 0, 0.5, 0],
            skillModifier: function(skillList) {
                skillList["Block"].sequenceLength = 6;
                skillList["Attack"].sequenceLength = 3;
                skillList["Heal"].sequenceLength = 6;
                skillList["DoT"].sequenceLength = 4;
                skillList["HoT"].sequenceLength = 6;
                skillList["QuickAttack"].sequenceLength = 2;
                skillList["Attack"].cooldown *= 0.8;
                skillList["Attack"].value *= 0.8;
                skillList["QuickAttack"].cooldown *= 0.8;
                skillList["QuickAttack"].value *= 0.8;
            },
            price:50,
		});

		characters[2] = new Class({
            name:"BRICK MAN",
            description: "",
            greyImage: images["greyBrickman"],
            skins: ["brickman", "brickmanGreen", "brickmanRed", "brickmanBW"],
            skinsCost:[0, 2, 2, 1],
            skillShow: [0.5, 0, 0, 0.5, 0, 0.5],
            skillModifier: function(skillList) {
                skillList["Block"].sequenceLength = 4;
                skillList["Attack"].sequenceLength = 5;
                skillList["Heal"].sequenceLength = 5;
                skillList["DoT"].sequenceLength = 5;
                skillList["HoT"].sequenceLength = 5;
                skillList["QuickAttack"].sequenceLength = 3;
                skillList["Block"].value *= 1.5;
                skillList["Block"].tickets *= 2;
            },
            price:50,
		});

		characters[3] = new Class({
            name:"MINECRAFT",
            description: "",
            greyImage: images["greyMinecraft"],
            skins: ["minecraft", "minecraftGreen", "minecraftOrange", "minecraftZombie",],
            skinsCost:[0, 0, 0, 0, 0, 0, 0],
            skillShow: [0, 0, 0, 0, 0, 0],
            skillModifier: function(skillList) {
                skillList["Block"].sequenceLength = 4;
                skillList["Attack"].sequenceLength = 4;
                skillList["Heal"].sequenceLength = 4;
                skillList["DoT"].sequenceLength = 6;
                skillList["HoT"].sequenceLength = 6;
                skillList["QuickAttack"].sequenceLength = 2;
            },
            price:150,
		});

		characters[4] = new Class({
            name:"REDDIT ALIEN",
            description: "",
            greyImage: images["greyReddit"],
            skins: ["redditAlien", "redditAlienG", "redditAlienP", "redditAlienR", "redditAlienY"],
            skinsCost:[0, 0, 0, 0, 0],
            skillShow: [0.5, 0, 0.5, 0, 0, 0.5],
            skillModifier: function(skillList) {
                skillList["Block"].sequenceLength = 4;
                skillList["Attack"].sequenceLength = 6;
                skillList["Heal"].sequenceLength = 6;
                skillList["DoT"].sequenceLength = 3;
                skillList["HoT"].sequenceLength = 3;
                skillList["QuickAttack"].sequenceLength = 3;
                skillList["Attack"].value *= 2/3;
                skillList["DoT"].value *= 4/5;
                skillList["DoT"].time *= 3/5;
                skillList["DoT"].tickets *= 1.5;
                skillList["HoT"].value *= 4/5;
                skillList["HoT"].tickets = 10;
                skillList["HoT"].time *= 3/5;
            },
            price:200,
		});

		characters[5] = new Class({
            name:"SAMUS",
            description: "Please don't sue, Please don't sue, Please don't sue, Please don't sue, Please don't sue, Please don't sue, Please don't sue, Please don't sue, Please don't sue, Please don't sue, Please don't sue, Please don't sue, Please don't sue,",
            greyImage: images["greySamus"],
            skins: ["samus", "samusRed", "samusPurp", "samusDark"],
            skinsCost:[0, 5, 5, 10],
            skillShow: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
            skillModifier: function(skillList) {
                skillList["Block"].sequenceLength = 3;
                skillList["Attack"].sequenceLength = 2;
                skillList["Heal"].sequenceLength = 3;
                skillList["DoT"].sequenceLength = 4;
                skillList["HoT"].sequenceLength = 4;
                skillList["QuickAttack"].sequenceLength = 1;
                skillList["Block"].value *= 0.5;
                skillList["Attack"].value *= 0.7;
                skillList["Heal"].value *= 0.7;
                skillList["DoT"].value *= 0.7;
                skillList["HoT"].value *= 0.7;
                skillList["QuickAttack"].value *= 0.7;
                skillList["Block"].cooldown *= 0.5;
                skillList["Attack"].cooldown *= 0.5;
                skillList["Heal"].cooldown *= 0.5;
                skillList["DoT"].cooldown *= 0.5;
                skillList["HoT"].cooldown *= 0.5;
                skillList["QuickAttack"].cooldown *= 0.8;
            },
            price:250,
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
        this.skillShow = config.skillShow;

		if (config.skillModifier)
			config.skillModifier(this.skillList);

        this.tickets = 0;
        for (var x in this.skillList) {
            this.tickets += this.skillList[x].tickets;
            this.skillList[x].value = Math.floor(this.skillList[x].value);
        }
	}

	this.init();
}

