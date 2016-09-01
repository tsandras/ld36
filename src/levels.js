function Levels(levels) {
  var self = this;

  self.levels = game.cache.getJSON('levels');

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
    return self.levels[id];
  }

  self.generateGridLevelById = function(id) {
    var level = self.levels[id];
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

  // Why dosn't work ?
  // self.count = function() {
  //   return self.levels.length;
  // }
}
