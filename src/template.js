Template = function(game, name, spriteName, text, components) {
  var self = this;
  self.id = 1;
  self.game = game;
  self.name = name;
  self.index = 1;
  self.sprite = self.game.add.image(GRID_X, GRID_Y, spriteName);
  self.text = self.game.add.text(0, 0, text, { font: "24px Georgia", fill: TEXT_COLOR, align: "center", boundsAlignH: "center", boundsAlignV: "middle", wordWrap: true, wordWrapWidth: 200});
  self.text.setTextBounds(590, 20, 200, 115);
  self.text.blendMode = PIXI.blendModes.COLOR_BURN;
  self.components = [];
  for (i = 0; i < components.length; i++) {
    for (j = 0; j < components[i].cardinality; j++) {
      self.components.push(components[i]);
    }
  }

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
      if (tmpComponent.width == 1 && tmpComponent.height == 2) {
        tmpX = tmpX + 20;
      }
      // case of 2x1
      if (tmpComponent.width == 2 && tmpComponent.height == 1) {
        tmpY = tmpY + 20;
      }
      // case of 1x1
      if (tmpComponent.width == 1 && tmpComponent.height == 1) {
        tmpY = tmpY + 20;
        tmpX = tmpX + 20;
      }
      var c = new Component(game, self.index, tmpComponent.name, tmpX, tmpY, tmpComponent.width, tmpComponent.height, tmpComponent.type);
      self.index = self.index + 1;
      c.loadEvents(grid);
      grid.setComponent(c, 12, 3 + 2*i);

      if (tmpComponent.width == 1 && tmpComponent.height == 1) {
        tmpY = tmpY + 80;
      } else if (tmpComponent.width == 2 && tmpComponent.height == 1) {
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
