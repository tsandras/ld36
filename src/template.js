Template = function(game, name, grid, spriteName) {
  var self = this;
  self.id = 1;
  self.game = game;
  self.name = name;
  self.index = 1;
  self.components = {};
  self.sprite = self.game.add.image(53, 63, spriteName);

  var createDefaultGrid = function () {
    out = []
    for (i = 0; i < 16; i++) {
      out[i] = []
      for (j = 0; j < 12; j++) {
        out[i][j] = new Square(game, false, 'default', null, 40 * i, j * 40);
      }
    }
    return out;
  }

  self.createGraphicGrid = function () {
    graphics = self.game.add.graphics(53, 63);
    graphics.lineStyle(1, 0x000000, 1);
    for (i = 0; i < self.grid[0].length; i++) {
      graphics.moveTo(40 * i, 0);
      graphics.lineTo(40 * i, 480);
      for (j = 0; j < self.grid.length; j++) {
        graphics.moveTo(0, j * 40);
        graphics.lineTo(480, j * 40);
      }
    }
    graphics.moveTo(480, 0);
    graphics.lineTo(480, 480);
    graphics.moveTo(0, 480);
    graphics.lineTo(480, 480);
    return graphics;
  }

  if (grid) {
    self.grid = grid;
  } else {
    self.grid = createDefaultGrid();
  }

  self.graphicGrid = self.createGraphicGrid();

  for (i = 0; i < 12; i ++) {
    for (j = 0; j < 18; j ++) {
      self.grid[i][j].setInfo(self.game);
    }
  }

  var getGridPosition = function(position) {
    return ({x: Math.floor((position.x - 53)/40), y: Math.floor((position.y - 63)/40)});
  }

  var getSlots = function(component, position) {
    var squares = [];
    var gridPosition = getGridPosition(position);
    squares.push(self.grid[gridPosition.y][gridPosition.x]);
    if (component.width > 1) {
      squares.push(self.grid[gridPosition.y][gridPosition.x + 1]);
    }
    if (component.height > 1) {
      squares.push(self.grid[gridPosition.y + 1][gridPosition.x]);
    }
    if (component.height > 1 && component.width > 1) {
      squares.push(self.grid[gridPosition.y + 1][gridPosition.x + 1]);
    }
    return squares;
  }

  var getSlotsSize = function(component) {
    return getSlots(component, component.sprite.position);
  }

  var getPossibleSlotsSize = function(component, newPosition) {
    return getSlots(component, newPosition);
  }

  var withoutComponent = function(squares) {
    var ok = true;
    for (var i in squares) {
      if (squares[i] && squares[i].component) {
        ok = false
      }
    }
    return ok;
  }

  self.showSlots = function(component) {
    var sprite = component.sprite;
    var gridPosition = getGridPosition(sprite.position);
    var squares = getSlotsSize(component);
    if (withoutComponent(squares) && gridPosition.x < 12 && gridPosition.x >= 0) {
      for (var i in squares) {
        squares[i].show();
      }
    }
  }

  var snailSlots = function(component) {
    var possibilities = [];
    var tmpPosX = 0;
    var tmpPosY = 0;
    var gridPosition = getGridPosition(component.sprite.position);
    for (l = 1; l <= 3; l++) {
      for (i = -l; i < l; i++) {
        for (j = -l; j < l; j++) {
          tmpPosX = gridPosition.x + i;
          tmpPosY = gridPosition.y + j;
          if (tmpPosX < 12 && tmpPosY < 12) {
            var squares = getPossibleSlotsSize(component, {x: tmpPosY * 40 + 53, y: tmpPosY * 40 + 63});
            if (withoutComponent(squares)) {
              possibilities.push({x: squares[0].x + 53, y: squares[0].y + 63});
            }
          }
        }
      }
    }
    return possibilities;
  }

  var minPossibility = function(possibilities, sprite) {
    var min = 2000;
    var tmp = 0;
    var index = 0;
    for (i = 0; i < possibilities.length; i++) {
      tmpPosX = possibilities[i].x;
      tmpPosY = possibilities[i].y;
      tmp = Phaser.Point.distance(new Phaser.Point(tmpPosY, tmpPosY), new Phaser.Point(sprite.position.x, sprite.position.y));
      if (tmp < min) {
        min = tmp;
        index = i;
      }
    }
    return possibilities[index];
  }

  self.putOnSlots = function(component) {
    var sprite = component.sprite;
    var squares = getSlotsSize(component);
    var gridPosition = getGridPosition(component.sprite.position);
    if (withoutComponent(squares) && gridPosition.x >= 0) {
      sprite.position.x = squares[0].x + 53;
      sprite.position.y = squares[0].y + 63;
      var gridPosition = getGridPosition({x: sprite.position.x, y: sprite.position.y});
      component.xGrid = gridPosition.x;
      component.yGrid = gridPosition.y;
    } else {
      var possibilities = snailSlots(component);
      var chosen = minPossibility(possibilities, sprite);
      sprite.position.x = chosen.x;
      sprite.position.y = chosen.y;
      var gridPosition = getGridPosition({x: chosen.x, y: chosen.y});
      component.xGrid = gridPosition.x;
      component.yGrid = gridPosition.y;
    }
    component.sprite.input.enableDrag(false);
    component.sprite.inputEnabled = false;
  }

  self.hideAllSlots = function() {
    for (i = 0; i < 12; i++) {
      for (j = 0; j < 18; j++) {
        if (self.grid[i][j]) {
          self.grid[i][j].hide();
        }
      }
    }
  }

  self.setComponent = function(component, x, y) {
    self.grid[y][x].component = component;
    if (component.width > 1) {
      self.grid[y][x + 1].component = component;
    }
    if (component.height > 1) {
      self.grid[y + 1][x].component = component;
    }
    if (component.height > 1 && component.width > 1) {
      self.grid[y + 1][x + 1].component = component;
    }
  }

  self.spawnsThreeComponents = function() {
    // Add components (assets)
    names = [
      ['square+raw_1x2', 1, 2, 'Raw'],
      ['square+raw_2x1', 2, 1, 'Raw'],
      ['square+raw_1x1', 1, 1, 'Raw']
    ];
    var tmpX = 655;
    var tmpY = 200;
    var rand = 0;
    for (i = 0; i < 3; i++) {
      // Pas oublier de changer la valeur = names.length
      rand = Math.floor(Math.random() * 3);
      tmpX = 655;
      // case of 1x2
      if (names[rand][1] == 1 && names[rand][2] == 2) {
        tmpX = tmpX + 20;
      }
      // case of 2x1
      if (names[rand][1] == 2 && names[rand][2] == 1) {
        tmpY = tmpY + 20;
      }
      // case of 1x1
      if (names[rand][1] == 1 && names[rand][2] == 1) {
        tmpY = tmpY + 20;
        tmpX = tmpX + 20;
      }
      var c = new Component(game, self.index, names[rand][0], tmpX, tmpY, names[rand][1], names[rand][2], names[rand][3]);
      self.index = self.index + 1;
      c.loadEvents();
      self.setComponent(c, 12, 3 + 2*i);

      if (names[rand][1] == 1 && names[rand][2] == 1) {
        tmpY = tmpY + 80;
      } else if (names[rand][1] == 2 && names[rand][2] == 1) {
        tmpY = tmpY + 80;
      } else {
        tmpY = tmpY + 100;
      }
    }
  }

  self.nonUsedComponents = function(chosen) {
    for (i = 0; i < 12; i++) {
      for (j = 12; j < 18; j++) {
        if (self.grid[i][j] && self.grid[i][j].component) {
          if (chosen.id != self.grid[i][j].component.id) {
            self.grid[i][j].component.destroy();
          }
          self.grid[i][j].component = null;
        }
      }
    }
  }

  self.toString = function() {
    console.log('New toString');
    var ligne = "";
    for (i = 0; i < 12; i++) {
      ligne = "";
      for (j = 0; j < 18; j++) {
        if (self.grid[i][j].component) {
          ligne = ligne + "|" + self.grid[i][j].component.id;
        } else {
          ligne = ligne + "|";
        }
      }
      console.log(ligne);
    }
  }

  self.isBasicWin = function() {
    var win = true;
    var tmpSquare = null;
    for (i = 0; i < 12; i++) {
      for (j = 0; j < 12; j++) {
        tmpSquare = self.grid[i][j];
        if (tmpSquare.filled) {
          if (tmpSquare.component && tmpSquare.kinds.includes(tmpSquare.component.kind)) {
            // todo lose conditions
          } else {
            win = false;
          }
        }
      }
    }
    return win;
  }

  self.cleanUp = function() {
    for (i = 0; i < 12; i++) {
      for (j = 0; j < 18; j++) {
        if (self.grid[i][j].component) {
          self.grid[i][j].component.destroy();
          self.grid[i][j].component = null;
        }
      }
    }
    self.sprite.destroy();
  }

  self.fillAll = function() {
    for (i = 0; i < 12; i++) {
      for (j = 0; j < 12; j++) {
        test = new Component(self.game, i + j, 'test', i * 40 + 53, j * 40 + 63, 1, 1, 'Raw') 
        self.setComponent(test, i, j);
      }
    }
  }

  self.isInGrid = function(component) {
    var gridPosition = getGridPosition({x: component.sprite.position.x, y: component.sprite.position.y});
    if (gridPosition.x < 0) {
      return false;
    }
    if (gridPosition.x < 12 && gridPosition.y < 12) {
      return true;
    } else {
      return false;
    }
  }
}
