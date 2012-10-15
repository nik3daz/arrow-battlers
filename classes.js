function ClassList() {

	this.init = function() {
		var characters = [];
		characters[0] = new Class({
            name:"Pirate",
            skins: ["tron", "icetron"],
            skillModifier: function(skillList) {
                skillList["Block"].sequenceLength = 6;
                skillList["Attack"].sequenceLength = 4;
                skillList["Heal"].sequenceLength = 4;
                skillList["DoT"].sequenceLength = 6;
                skillList["HoT"].sequenceLength = 6;
                skillList["QuickAttack"].sequenceLength = 2;
            },
		});

		characters[1] = new Class({
            name:"Jedi",
            skins: ["tron", "icetron"],
            skillModifier: function(skillList) {
                skillList["Block"].sequenceLength = 6;
                skillList["Attack"].sequenceLength = 4;
                skillList["Heal"].sequenceLength = 4;
                skillList["DoT"].sequenceLength = 6;
                skillList["HoT"].sequenceLength = 6;
                skillList["QuickAttack"].sequenceLength = 2;
            },
		});

		characters[2] = new Class({
            name:"Batman",
            skins: ["tron", "icetron"],
            skillModifier: function(skillList) {
                skillList["Block"].sequenceLength = 6;
                skillList["Attack"].sequenceLength = 4;
                skillList["Heal"].sequenceLength = 4;
                skillList["DoT"].sequenceLength = 6;
                skillList["HoT"].sequenceLength = 6;
                skillList["QuickAttack"].sequenceLength = 2;
            },
		});

		characters[3] = new Class({
            name:"Spiderman",
            skins: ["tron", "icetron"],
            skillModifier: function(skillList) {
                skillList["Block"].sequenceLength = 6;
                skillList["Attack"].sequenceLength = 4;
                skillList["Heal"].sequenceLength = 4;
                skillList["DoT"].sequenceLength = 6;
                skillList["HoT"].sequenceLength = 6;
                skillList["QuickAttack"].sequenceLength = 2;
            },
		});

		characters[4] = new Class({
            name:"Tappit",
            skins: ["icetron"],
            skillModifier: function(skillList) {
                skillList["Block"].sequenceLength = 6;
                skillList["Attack"].sequenceLength = 4;
                skillList["Heal"].sequenceLength = 4;
                skillList["DoT"].sequenceLength = 6;
                skillList["HoT"].sequenceLength = 6;
                skillList["QuickAttack"].sequenceLength = 2;
            },
		});

		characters[5] = new Class({
            name:"Mr Bigglesworth",
            skins: ["tron"],
            skillModifier: function(skillList) {
                skillList["Block"].sequenceLength = 6;
                skillList["Attack"].sequenceLength = 4;
                skillList["Heal"].sequenceLength = 4;
                skillList["DoT"].sequenceLength = 6;
                skillList["HoT"].sequenceLength = 6;
                skillList["QuickAttack"].sequenceLength = 2;
            },
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

		if (config.skillModifier)
			config.skillModifier(this.skillList);
	}

	this.init();
}

