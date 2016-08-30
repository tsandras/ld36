function Grid(game, squares) {
  var self = this;

  self.game = game;
  self.template = null;

  var createDefaultGrid = function () {
    out = []
    for (i = 0; i < 12; i++) {
      out[i] = []
      for (j = 0; j < 18; j++) {
        out[i][j] = new Square(game, false, ['default'], null, 40 * i, j * 40);
      }
    }
    return out;
  }

  self.createGraphicGrid = function () {
    graphics = self.game.add.graphics(GRID_X, GRID_Y);
    graphics.lineStyle(1, 0x000000, 1);
    for (i = 0; i < self.squares[0].length; i++) {
      graphics.moveTo(SQUARE_WIDTH * i, 0);
      graphics.lineTo(SQUARE_WIDTH * i, 480);
      for (j = 0; j < self.squares.length; j++) {
        graphics.moveTo(0, j * SQUARE_WIDTH);
        graphics.lineTo(480, j * SQUARE_WIDTH);
      }
    }
    graphics.moveTo(480, 0);
    graphics.lineTo(480, 480);
    graphics.moveTo(0, 480);
    graphics.lineTo(480, 480);
    return graphics;
  }

  if (squares) {
    self.squares = squares;
  } else {
    self.squares = createDefaultGrid();
  }

  self.graphicSquares = self.createGraphicGrid();
  self.graphicSquares.visible = false;

  for (i = 0; i < GRID_SQUARES_Y; i ++) {
    for (j = 0; j < GRID_SQUARES_X; j ++) {
      self.squares[i][j].setInfo(self.game);
    }
  }

  self.setTemplate = function(template, squares) {
    self.template = template;
    self.squares = squares;
    for (i = 0; i < GRID_SQUARES_Y; i ++) {
      for (j = 0; j < GRID_SQUARES_X; j ++) {
        self.squares[i][j].setInfo(self.game);
      }
    }
  }

  self.showSlots = function(component) {
    var sprite = component.sprite;
    var gridPosition = Helper.getGridPosition(sprite.position);
    var squares = Helper.getSlotsSize(self, component);
    if (Helper.withoutComponent(squares) && gridPosition.x < 12 && gridPosition.x >= 0) {
      var ok = false;
      for (var i in squares) {
        if (squares[i].filled) {
          ok = true;
        }
      }
      for (var i in squares) {
        if (ok) {
          squares[i].show();
        } else {
          squares[i].showError();
        }
      }
    }
  }

  self.putOnSlots = function(component) {
    var sprite = component.sprite;
    var squares = Helper.getSlotsSize(self, component);
    var gridPosition = Helper.getGridPosition(component.sprite.position);
    if (Helper.withoutComponent(squares) && gridPosition.x >= 0) {
      sprite.position.x = squares[0].x + GRID_X;
      sprite.position.y = squares[0].y + GRID_Y;
      var gridPosition = Helper.getGridPosition({x: sprite.position.x, y: sprite.position.y});
      component.xGrid = gridPosition.x;
      component.yGrid = gridPosition.y;
    } else {
      var possibilities = Helper.snailSlots(self, component);
      if (possibilities.length == 0) {
        sprite.position.x = component.xOld;
        sprite.position.y = component.yOld;
        return false;
      } else {
        var chosen = Helper.minPossibility(possibilities, sprite);
        sprite.position.x = chosen.x;
        sprite.position.y = chosen.y;
        var gridPosition = Helper.getGridPosition({x: chosen.x, y: chosen.y});
        component.xGrid = gridPosition.x;
        component.yGrid = gridPosition.y;
      }
    }
    component.sprite.input.enableDrag(false);
    component.sprite.inputEnabled = false;
    return true;
  }

  self.hideAllInfos = function() {
    for (i = 0; i < GRID_SQUARES_Y; i++) {
      for (j = 0; j < GRID_SQUARES_X; j++) {
        if (self.squares[i][j]) {
          self.squares[i][j].hide();
        }
      }
    }
  }

  self.setComponent = function(component, x, y) {
    self.squares[y][x].component = component;
    if (component.width > 1) {
      self.squares[y][x + 1].component = component;
    }
    if (component.height > 1) {
      self.squares[y + 1][x].component = component;
    }
    if (component.height > 1 && component.width > 1) {
      self.squares[y + 1][x + 1].component = component;
    }
  }

  self.nonUsedComponents = function(chosen) {
    for (i = 0; i < GRID_SQUARES_Y; i++) {
      for (j = GRID_SQUARES_Y; j < GRID_SQUARES_X; j++) {
        if (self.squares[i][j] && self.squares[i][j].component) {
          if (chosen.id != self.squares[i][j].component.id) {
            self.squares[i][j].component.destroy();
          }
          self.squares[i][j].component = null;
        }
      }
    }
  }

  self.toString = function() {
    console.log('New toString');
    var ligne = "";
    for (i = 0; i < GRID_SQUARES_Y; i++) {
      ligne = "";
      for (j = 0; j < GRID_SQUARES_X; j++) {
        if (self.squares[i][j].component) {
          ligne = ligne + "|" + self.squares[i][j].component.id;
        } else {
          ligne = ligne + "|";
        }
      }
      console.log(ligne);
    }
  }

  self.cleanUp = function() {
    for (i = 0; i < GRID_SQUARES_Y; i++) {
      for (j = 0; j < GRID_SQUARES_X; j++) {
        if (self.squares[i][j].component) {
          self.squares[i][j].component.destroy();
          self.squares[i][j].component = null;
        }
      }
    }
    self.template.text.destroy();
    self.template.sprite.destroy();
  }

  self.isInGrid = function(component) {
    var gridPosition = Helper.getGridPosition({x: component.sprite.position.x, y: component.sprite.position.y});
    if (gridPosition.x < 0) {
      return false;
    }
    if (component.width > 1 && gridPosition.x + 1 >= GRID_SQUARES_Y) {
      return false;
    }
    if (component.height > 1 && gridPosition.y + 1 >= GRID_SQUARES_Y) {
      return false;
    }
    if (gridPosition.y < 0) {
      return false;
    }
    if (gridPosition.x < GRID_SQUARES_Y && gridPosition.y < GRID_SQUARES_Y) {
      return true;
    } else {
      return false;
    }
  }

  self.spawnsComponents = function() {
    self.template.spawnsThreeComponents(self);
  }

  self.isBasicWin = function() {
    return self.template.isBasicWin(self);
  }
}
