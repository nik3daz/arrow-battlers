function Battle() {
	this.initBattle = function(players) {
		players[0].initForBattle();
		players[1].initForBattle();

		this.initBattleUI();
	}

	this.initBattleUI = function(playerId) {
		// make a skill boxes for each player
		this.skillQueueBoxes = [];


		this.initBattleUIForPlayer(players[0], -MENU_CENTER_DISTANCE);
		this.initBattleUIForPlayer(players[1], MENU_CENTER_DISTANCE);	
	}

	this.initBattleUIForPlayer = function(player, centerX) {
		this.skillQueueBoxes[player.id] = new SkillQueueBox(player.id, centerX);
		this.skillQueueBoxes[player.id].init();

	}
}


function SkillQueueBox(playerId, centerX) {
	this.init = function() {
		var queueGroup = new Kinetic.Group();

		// background
		var background = new Kinetic.Rect({
			height:stage.getHeight()/2,
			width:stage.getWidth()/2 - 50,
			fill:"#555",
			x:0,
			y:stage.getHeight()/2,
		});

		queueGroup.add(background);

		// skills. build up from bottom of screen
		var paddingTopBot = 20;
		var skillIconSize = 30;
		var skillIconGap = ((stage.getHeight() / 2) - (paddingTopBot*2) - (skillIconSize * SKILL_QUEUE_SIZE)) / (SKILL_QUEUE_SIZE-1)
		icons = [];
		arrows = [];

		var marginLeft = 10;
		var skillArrowSize = 50;
		for (var i = 0 ; i < SKILL_QUEUE_SIZE; i++) {
			// make rect for each skill icon
			icons[i] = new Kinetic.Rect({
				width:skillIconSize,
				height:skillIconSize,
				stroke:"black",
				x: marginLeft,
				y: stage.getHeight()/2 + paddingTopBot + (i*skillIconSize) + (i*skillIconGap),
			})
	

			queueGroup.add(icons[i]);
			// list of rect spaces for arrow keys

			// make the lisssttt

			for (var j = 0; j < SKILL_MAX_LENGTH; j++) {

			}

		}
		queueGroup.setX(centerX - background.getWidth() / 2);
		hudLayer.add(queueGroup);
	}

	this.update = function() {

	}
}