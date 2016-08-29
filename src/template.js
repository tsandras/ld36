Template = function(game, name, grid) {
  var self = this;
  self.id = 1;
  self.game = game;
  self.name = name;
  self.components = {};

  var createDefaultGrid = function () {
    out = []
    for (i = 0; i < 12; i++) {
      out[i] = []
      for (j = 0; j < 12; j++) {
        out[i][j] = new Square(game, false, 'default', null, 40 * i, j * 40);
      }
    }
    return out;
  }

  var createGraphicGrid = function () {
    graphics = self.game.add.graphics(53, 63);
    graphics.lineStyle(1, 0x000000, 1);
    for (i = 0; i < 12; i++) {
      graphics.moveTo(40 * i, 0);
      graphics.lineTo(40 * i, 480);
      for (j = 0; j < 12; j++) {
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

  self.graphicGrid = createGraphicGrid();

  if (grid) {
    self.grid = grid;
  } else {
    self.grid = createDefaultGrid();
  }

  var getGridPosition = function(position) {
    // console.log(Math.floor((position.x - 53)/40));
    // console.log(Math.floor((position.y - 63)/40));
    // console.log((position.x - 53)/40);
    // console.log((position.y - 63)/40);
    return ({x: Math.floor((position.x - 53)/40), y: Math.floor((position.y - 63)/40)});
  }

  var collision = function(sprite1, sprite2) {
    if (sprite1.position.x >= sprite2.position.x - 40) {
      sprite1.position.x = sprite2.position.x - 40;
    }
    if (sprite1.position.y >= sprite2.position.y - 40) {
      sprite1.position.y = sprite2.position.y - 40;
    }
    return false;
  }

  self.respectComponents = function(component) {
    var sprite = component.sprite;
    var gridPosition = getGridPosition(sprite.position);
    // console.log(self.grid[gridPosition.x][gridPosition.y]);
    // var square = self.grid[gridPosition.x + 1][gridPosition.y];
    // if (square && square.component && collision(sprite, square.component.sprite)) {
    //   console.log('collision');
    // }
    // var square = self.grid[gridPosition.x][gridPosition.y + 1];
    // if (square && square.component && collision(sprite, square.component.sprite)) {
    //   console.log('collision');
    // }
    // if (square && square.component) {
    //   console.log('ici !');
    //   sprite.position.x = sprite.position.x - 40;
    //   sprite.position.y = sprite.position.y - 40;
    // }
  }

  var getSlots = function(component, position) {
    var squares = [];
    // console.log(position);
    var gridPosition = getGridPosition(position);
    // console.log(gridPosition);
    squares.push(self.grid[gridPosition.x][gridPosition.y]);
    if (component.width > 1) {
      squares.push(self.grid[gridPosition.x + 1][gridPosition.y]);
    }
    if (component.height > 1) {
      squares.push(self.grid[gridPosition.x][gridPosition.y + 1]);
    }
    if (component.height > 1 && component.width > 1) {
      squares.push(self.grid[gridPosition.x + 1][gridPosition.y + 1]);
    }
    return squares;
  }

  var getSlotsSize = function(component) {
    return getSlots(component, component.sprite.position);
  }

  var getPossibleSlotsSize = function(component, newPosition) {
    // console.log(newPosition);
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
    if (withoutComponent(squares)) {
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
          if (tmpPosX <= 11 && tmpPosY <= 11) {
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
    if (withoutComponent(squares)) {
      sprite.position.x = squares[0].x + 53;
      sprite.position.y = squares[0].y + 63;
    } else {
      var possibilities = snailSlots(component);
      var chosen = minPossibility(possibilities, sprite);
      sprite.position.x = chosen.x;
      sprite.position.y = chosen.y;
    }
  }

  self.hideAllSlots = function() {
    for (i = 0; i < 12; i++) {
      for (j = 0; j < 12; j++) {
        self.grid[i][j].hide();
      }
    }
  }

  self.setComponent = function(component, x, y) {
    // console.log(self.grid[x][y]);
    if (!self.components[component.id]) {
      self.components[component.id] = component;
    }
    self.grid[x][y].component = component;
  }

  self.loadComponentsEvents = function() {
    for (var i in self.components) {
      self.components[i].loadEvents(self);
    }
  }
}
