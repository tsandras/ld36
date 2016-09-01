function Level(game) {
  var self = this;

  self.data = null;
  self.game = game;
  self.grid = null;

  self.start = function() {
    self.data = LEVELS.findById(id);
    if (self.grid && self.grid.sprite) {
      self.grid.sprite.destroy();
    }
    chainedTextsWithFinalTrigger(0,0, self.data.textsBefore, self.startLevel);
  }

  self.startLevel = function() {
    var template = new Template(
      game,
      self.data.levelName,
      self.data.blueprintImage,
      self.data.levelText,
      self.data.components,
      self.data.loseByShape
    );
    self.grid = new Grid(game);
    self.grid.setTemplate(template, LEVELS.generateGridLevelById(id));
    self.grid.spawnsComponents();
  }

  self.endLevel = function(isWin) {
    if (id + 1 < LEVELS.data.length && isWin) {
      id = id + 1;
    } else if (isWin) {
      id = 0;
    }
    if (isWin) {
      chainedTextsWithFinalTrigger(0, -150, self.data.textsAfterWin, self.start);
    } else {
      chainedTextsWithFinalTrigger(0, -150, self.data.textsAfterLose, self.start);
    }
  }

  var chainedTextsWithFinalTrigger = function(x, y, texts, triggerMethod) {
    var current = 0;
    lastText = game.add.text(x, y, texts[current], { font: "24px Georgia", fill: TEXT_COLOR, align: "center", boundsAlignH: "center", boundsAlignV: "middle", wordWrap: true, wordWrapWidth: 460});
    lastText.setTextBounds(GRID_X, GRID_Y, 460, GRID_WIDTH);
    lastText.blendMode = PIXI.blendModes.COLOR_BURN;
    current = current + 1;
    game.input.onDown.addOnce(showNext, {x: x, y: y, lastText: lastText, texts: texts, current: current, method: triggerMethod}, this);
  }

  var showNext = function() {
    this.lastText.destroy()
    this.lastText = game.add.text(this.x, this.y, this.texts[this.current], { font: "30px Georgia", fill: TEXT_COLOR, align: "center", boundsAlignH: "center", boundsAlignV: "middle", wordWrap: true, wordWrapWidth: 200});
    this.lastText.setTextBounds(590, 20, 200, 115);
    this.lastText.blendMode = PIXI.blendModes.COLOR_BURN;
    this.current = this.current + 1;
    if (this.current <= this.texts.length) {
      game.input.onDown.addOnce(showNext, {x: this.x, y: this.y, lastText: this.lastText, texts: this.texts, current: this.current, method: this.method}, this);
    } else {
      this.method();
    }
  }
}

Level.run = function() {
  level = new Level(game);
  level.start();
}
