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
			stroke:"black",
			fill:"black",
			opacity:0.4,
			x:0,
			y:stage.getHeight()/2,
		});

		queueGroup.add(background);

		// skills. build up from bottom of screen
		var paddingTopBot = 20;
		var skillIconSize = 50;
		var skillIconGap = ((stage.getHeight() / 2) - (paddingTopBot*2) - (skillIconSize * SKILL_QUEUE_SIZE)) / (SKILL_QUEUE_SIZE-1)
		this.icons = [];
		this.arrows = [];

		var marginLeft = 10;
		var skillArrowSize = 40;
		var skillArrowGap = (background.getWidth() - (marginLeft + skillIconSize + marginLeft + marginLeft) - (skillArrowSize * SKILL_MAX_LENGTH)) / (SKILL_MAX_LENGTH-1);

		for (var i = 0 ; i < SKILL_QUEUE_SIZE; i++) {
			// make rect for each skill icon
			this.icons[i] = new Kinetic.Rect({
				width:skillIconSize,
				height:skillIconSize,
				stroke:"black",
				fill:"black",
				x: marginLeft,
				y: stage.getHeight()/2 + paddingTopBot + (i*skillIconSize) + (i*skillIconGap),
			})
	

			queueGroup.add(this.icons[i]);
			// list of rect spaces for arrow keys

			// make the lisssttt
			this.arrows[i] = [];
			for (var j = 0; j < SKILL_MAX_LENGTH; j++) {
				this.arrows[i][j] = new Kinetic.Rect({
					width:skillArrowSize,
					height:skillArrowSize,
					stroke:"red",
					x:(marginLeft + skillIconSize + marginLeft) + skillArrowSize * j + skillArrowGap * j,
					y:this.icons[i].getY() + this.icons[i].getHeight()/2 - skillArrowSize/2,
				});

				queueGroup.add(this.arrows[i][j]);
			}

		}
		queueGroup.setX(centerX - background.getWidth() / 2);
		hudLayer.add(queueGroup);
	}

	this.update = function() {
		// update icons
		for (var i = 0; i < this.icons.length; i++) {
			var skill = player.skillQueue[i];

			var isActive = false;
			if (contains(player.activeSkills, i)) {
				isActive = true;
			}

			for (var j = 0; j < this.arrows[i].length; j++) {
				if (j < skill.length) {
					if (isActive) {
						//draw arrow of skill sequence
					}
					
				} else {
					// blank out the spot becuase the skill doesn't go this long l-OL!

				}
			}
		}

	}
}