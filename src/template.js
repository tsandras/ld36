Template = function(game, name, spriteName, text) {
  var self = this;
  self.id = 1;
  self.game = game;
  self.name = name;
  self.index = 1;
  self.components = {};
  self.sprite = self.game.add.image(GRID_X, GRID_Y, spriteName);
  self.text = self.game.add.text(0, 0, text, { font: "24px Georgia", fill: TEXT_COLOR, align: "center", boundsAlignH: "center", boundsAlignV: "middle", wordWrap: true, wordWrapWidth: 200});
  self.text.setTextBounds(590, 20, 200, 115);
  self.text.blendMode = PIXI.blendModes.COLOR_BURN;
  self.components = [
    ['square+raw_1x2', 1, 2, 'Raw'],
    ['square+raw_1x2', 1, 2, 'Raw'],
    ['square+raw_2x1', 2, 1, 'Raw'],
    ['square+raw_2x1', 2, 1, 'Raw'],
    ['square+raw_1x1', 1, 1, 'Raw'],
    ['square+raw_1x1', 1, 1, 'Raw'],
    ['square+raw_2x2', 2, 2, 'Raw']
  ];

  self.spawnsThreeComponents = function(grid) {
    var tmpX = 655;
    var tmpY = 200;
    var rand = 0;
    var tmpComponent = null;
    for (i = 0; i < 3; i++) {
      rand = Math.floor(Math.random() * self.components.length);
      tmpX = 655;
      tmpComponent = self.components[rand];
      // case of 1x2
      if (tmpComponent[1] == 1 && tmpComponent[2] == 2) {
        tmpX = tmpX + 20;
      }
      // case of 2x1
      if (tmpComponent[1] == 2 && tmpComponent[2] == 1) {
        tmpY = tmpY + 20;
      }
      // case of 1x1
      if (tmpComponent[1] == 1 && tmpComponent[2] == 1) {
        tmpY = tmpY + 20;
        tmpX = tmpX + 20;
      }
      var c = new Component(game, self.index, tmpComponent[0], tmpX, tmpY, tmpComponent[1], tmpComponent[2], tmpComponent[3], tmpComponent[4]);
      self.index = self.index + 1;
      c.loadEvents(grid);
      grid.setComponent(c, 12, 3 + 2*i);

      if (tmpComponent[1] == 1 && tmpComponent[2] == 1) {
        tmpY = tmpY + 80;
      } else if (tmpComponent[1] == 2 && tmpComponent[2] == 1) {
        tmpY = tmpY + 80;
      } else {
        tmpY = tmpY + 100;
      }
    }
  }

  self.isBasicWin = function(grid) {
    var win = true;
    var tmpSquare = null;
    for (i = 0; i < GRID_SQUARES_Y; i++) {
      for (j = 0; j < GRID_SQUARES_Y; j++) {
        tmpSquare = grid.squares[i][j];
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

  // // non used method, but maybe soon..
  // self.isInTemplate = function(component) {
  //   var gridPosition = getGridPosition({x: component.sprite.position.x, y: component.sprite.position.y});
  //   if (self.grid[gridPosition.x][gridPosition.x].filled) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}
