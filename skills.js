function getSkillList() {
    var a = [];
    for (var i = 0; i < NUM_SKILLS; i++) {
        a.push({
            name: "",
            getSequence: function() {
                return [];
            },
            animate: function() {
            },
        });
    }
    return a;
}

function Skill(sequenceFunc, anim) {
    this.getSequence = sequenceFunc;
    this.anim = anim;
}
