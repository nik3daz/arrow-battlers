function Battle() {
	this.initBattle = function(players) {
		players[0].initForBattle();
		players[1].initForBattle();

		this.initBattleUI();
	}

	this.initBattleUI = function(playerId) {
		// make a skill boxes for each player
		this.skillQueueBoxes = [];
		this.healthBars = [];

		this.initBattleUIForPlayer(players[0], -HUD_CENTER_DISTANCE);
		this.initBattleUIForPlayer(players[1], HUD_CENTER_DISTANCE);	
	}

	this.initBattleUIForPlayer = function(player, centerX) {
		this.skillQueueBoxes[player.id] = new SkillQueueBox(player.id, centerX);
		this.skillQueueBoxes[player.id].init();
		this.healthBars[player.id] = new HealthBar(player.id, centerX);
		this.healthBars[player.id].init();
	}

	this.gameOver = function(winnerId) {
		winnerOverlay = new GameResultsOverlay(winnerId);
	}
}

function HealthBar(playerId, centerX) {
	this.init = function() {
		var queueGroup = new Kinetic.Group();

		var barHeight = 42;
		barWidth = stage.getWidth()/2 - 100;
		
		this.health = new Kinetic.Rect({
			height:barHeight,
			width:barWidth,
			fill: {
		        image: images.health_bar,
		        offset: [0, 0],
		    },
			x:0,
			y:0,
		});
		queueGroup.add(this.health);

		var background = new Kinetic.Rect({
			height:barHeight,
			width:barWidth,
			stroke:"white",
		    strokeWidth:5,
			x:0,
			y:0,
		});
		queueGroup.add(background);

		queueGroup.setPosition(centerX - players[playerId].dir * (background.getWidth() / 2 + 10), 20);
		queueGroup.setScale([players[playerId].dir, 1])
		hudLayer.add(queueGroup);

		this.update();
	}

	this.update = function() {
		// get players hp
		var hp = players[playerId].hp;
		this.health.setWidth((barWidth * hp / 100));
		hudLayer.draw();
	}
}

function SkillQueueBox(playerId, centerX) {
	this.init = function() {
		var queueGroup = new Kinetic.Group();

		// background
        queueGroup.add(new Kinetic.Rect({
			height:stage.getHeight()/2,
			width:stage.getWidth()/2 - 50,
			fill:"black",
			opacity:0.6,
			x:0,
			y:22,
		}));

		var background = new Kinetic.Rect({
			height:stage.getHeight()/2,
			width:stage.getWidth()/2 - 50,
			stroke:"#444",
            strokeWidth: 5,
			x:0,
			y:22,
		});

		// skills. build up from bottom of screen
		var skillIconSize = 50;
		var paddingTopBot = 30 + skillIconSize / 2;
		var skillIconGap = ((stage.getHeight() / 2) - (paddingTopBot*2) - (skillIconSize * (SKILL_QUEUE_SIZE - 1))) / (SKILL_QUEUE_SIZE-1)
		this.icons = [];
		this.arrows = [];

		var marginLeft = 10;
		var skillArrowSize = 36;
		var skillArrowGap = (background.getWidth() - (marginLeft + skillIconSize + marginLeft + marginLeft) - (skillArrowSize * SKILL_MAX_LENGTH)) / (SKILL_MAX_LENGTH-1);

		for (var i = 0 ; i < SKILL_QUEUE_SIZE; i++) {
			// make rect for each skill icon
			this.icons[i] = new Kinetic.Rect({
				width:skillIconSize,
				height:skillIconSize,
				stroke:"black",
				fill:"black",
				x: marginLeft + skillIconSize / 2,
				y: paddingTopBot + i * (skillIconSize + skillIconGap),
			})
            centerOffset(this.icons[i]);
	

			queueGroup.add(this.icons[i]);
			// list of rect spaces for arrow keys

			// make the lisssttt
			this.arrows[i] = [];
			for (var j = 0; j < SKILL_MAX_LENGTH; j++) {
				this.arrows[i][j] = new Kinetic.Rect({
					width:skillArrowSize,
					height:skillArrowSize,
					
					x:(marginLeft + skillIconSize + marginLeft) + skillArrowSize * (1/2 + j) + skillArrowGap * j,
					y:this.icons[i].getY(),
				});
                centerOffset(this.arrows[i][j]);

				queueGroup.add(this.arrows[i][j]);
			}

		}

        //================= Recovery Bar ===================
		var recoveryGroup = new Kinetic.Group();

		var barHeight = 20;
		var barWidth = background.getWidth() / 2;
		
	    var bar = new Kinetic.Rect({
			height:barHeight,
			width:barWidth,
			fill: "cyan",
			x:0,
			y:0,
		});
        centerOffset(bar);
		recoveryGroup.add(bar);

		var barBackground = new Kinetic.Rect({
			height:barHeight,
			width:barWidth,
			stroke:"white",
		    strokeWidth:5,
			x:0,
			y:0,
		});
        centerOffset(barBackground);
		recoveryGroup.add(barBackground);
		recoveryGroup.hide();
        recoveryGroup.setPosition(centerX, stage.getHeight() / 2 + 150);



		queueGroup.setOffset([background.getWidth() / 2, 0]);
		queueGroup.setPosition([centerX, stage.getHeight() / 2 + 20]);
		queueGroup.add(background);
		hudLayer.add(queueGroup);
        hudLayer.add(recoveryGroup);

        this.background = background;
        this.queueGroup = queueGroup;
        this.recoveryBar = {
            show: function() { recoveryGroup.show(); },
            hide: function() { recoveryGroup.hide(); },
            setWidth: function(x) { bar.setWidth(x); },
            width: barBackground.getWidth(),
        };
		this.update(players[playerId]);
	}

	this.update = function(player) {
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
						setArrowImage(this.arrows[i][j], skill.sequence[j]);
					} else {
						setArrowImage(this.arrows[i][j], skill.sequence[j]);
					}
					
				} else {
					// blank out the spot becuase the skill doesn't go this long l-OL!
					if (isActive) {
						setArrowImage(this.arrows[i][j],null);
					} else {
						setArrowImage(this.arrows[i][j],null);
					}
				}
			}
		}
        hudLayer.draw();
	}
}

function GameResultsOverlay(winnerId) {

}
