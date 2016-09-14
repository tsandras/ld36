function Levels(levels) {
  var self = this;
  self.levelsIcon = [];
  self.levelsText = [];
  self.hidden = true;

  self.data = game.cache.getJSON('levels');

  var emptySquare = function(x, y) {
    return new Square(null, false, [], null, x, y);
  }

  var fullSquare = function(x, y, types) {
    return new Square(null, true, types, null, x, y);
  }

  self.getGridById = function(id) {
    return self.generateGridLevel(id);
  }

  self.findById = function(id) {
    return self.data[id];
  }

  self.generateGridLevelById = function(id) {
    var level = self.data[id];
    var out = [];
    for (i = 0; i < GRID_SQUARES_Y; i++) {
      out[i] = [];
      for (j = 0; j < GRID_SQUARES_X; j++) {
        if (level.grid[i][j].length == 0) {
          out[i][j] = emptySquare(SQUARE_WIDTH * j, i * SQUARE_WIDTH);
        } else {
          out[i][j] = fullSquare(SQUARE_WIDTH * j, i * SQUARE_WIDTH, level.grid[i][j]);
        }
      }
    }
    return out;
  }

  var addLevelIcon = function(tmpX, tmpY, name, image, id) {
    self.levelsText.push(game.add.text(tmpX, tmpY, name, { font: "16px Georgia", fill: TEXT_COLOR, align: "center", boundsAlignH: "center", boundsAlignV: "middle", wordWrap: true, wordWrapWidth: 200}));
    var img = game.add.image(tmpX, tmpY, image);
    img.scale.set(0.25 , 0.25);
    img.id = id;
    loadEvents(img);
    self.levelsIcon.push(img);
  }

  self.displayLevelsMenu = function() {
    self.hidden = false;
    var titleScreen = game.add.image(0, 0, 'ld36_bg_001');
    var tmpX = 90;
    var tmpY = 90;
    for(i = 0; i < self.data.length; i++) {
      var level = self.data[i];
      addLevelIcon(tmpX, tmpY, level.levelName, level.winImage, i);
      if ((i + 1) % 3 == 0) { tmpX = 90; tmpY += 150; } else { tmpX += 150; }
    }
  }

  self.hideLevelsMenu = function() {
    self.hidden = true;
    if (self.levelsText.length < 1 || self.levelsIcon.length < 1) {
      return;
    }
    for(i = 0; i < self.data.length; i++) {
      self.levelsText[i].destroy();
      self.levelsIcon[i].destroy();
    }
    self.levelsIcon = [];
    self.levelsText = [];
  }

  self.manageLevelsMenu = function() {
    if (self.hidden) {
      self.displayLevelsMenu();
    } else {
      self.hideLevelsMenu();
    }
  }

  var over = function(sprite, pointeur) {
    var htmlGame = document.getElementById('ld36');
    htmlGame.style.cursor = "url('assets/ld36_cursor_002.png'), auto";
  }

  var out = function(sprite, pointeur) {
    var htmlGame = document.getElementById('ld36');
    htmlGame.style.cursor = "url('assets/ld36_cursor_001.png'), auto";
  }

  var listener = function(sprite, pointeur) {
    id = sprite.id;
    self.hideLevelsMenu();
    // index.html function
    initGame();
  }

  var loadEvents = function(img) {
    img.inputEnabled = true;
    img.events.onInputOver.add(over, this);
    img.events.onInputOut.add(out, this);
    img.events.onInputDown.add(listener, this);
  }

  // Why doesn't it work?
  // self.count = function() {
  //   return self.levels.length;
  // }
}
