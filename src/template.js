Square = function(filled, kind, component) {
  var self = this;
  self.filled = filled;
  self.kind = kind;
  self.component = null;
  if (component) {
    self.component = component;
  }
}

Template = function(game, name, grid) {
  var self = this;
  self.id = 1;
  self.game = game;
  self.name = name;

  var createDefaultGrid = function () {
    out = []
    for (i = 0; i < 12; i++) {
      out[i] = []
      for (j = 0; j < 12; j++) {
        out[i][j] = new Square(false, 'default');
      }
    }
    return out;
  }

  var createGraphicGrid = function () {
    graphics = self.game.add.graphics(50, 50);
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
    console.log(position.x % 40);
    return ({x: position.x % 40, y: position.y % 40});
  }

  self.respectComponents = function(sprite) {
    var gridPosition = getGridPosition(sprite.position);
    var square = self.grid[gridPosition.x][gridPosition.y];
    if (square.component) {
      sprite.position.x = sprite.position.x - 40;
      sprite.position.y = sprite.position.y - 40;
    }
  }

  // self.setComponent = function(component) {
  //   self.grid[x][y].square.component = component;
  // }
}
