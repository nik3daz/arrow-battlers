function ClassBuilder() {
	this.characters = [];

	this.init = function() {
		characters[0] = new Class({
            name:"Pirate",
            skillModifier: function(skillList) {
                skillList["Block"].sequenceLength = 6;
                skillList["Attack"].sequenceLength = 4;
                skillList["Heal"].sequenceLength = 4;
                skillList["DoT"].sequenceLength = 6;
                skillList["HoT"].sequenceLength = 6;
                skillList["QuickAttack"].sequenceLength = 2;
            },
		});
	}

}

// pirate
function Class(config) {
	this.init = function() {
		var skillList = globalSkillList.slice();
		skillModifier(skillList);
	}

	this.getSkillList = function() {

	}
}

