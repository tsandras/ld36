Component = function(game, id, name, x, y, w, h, kind) {
  var self = this;
  self.id = id;
  self.name = name;
  self.game = game;
  self.sprite = self.game.add.sprite(x, y, name);
  self.width = w;
  self.height = h;
  self.sprite.inputEnabled = true;
  self.sprite.input.enableDrag(true);
  self.xGrid = null;
  self.yGrid = null;
  self.xOld = null;
  self.yOld = null;
  self.kind = kind;

  var dragUpdate = function(sprite, pointer, dragX, dragY, snapPoint) {
    grid.hideAllInfos();
    grid.showSlots(self);
  }

  var onDragStop = function(sprite, pointeur) {
    if (grid.isInGrid(self)) {
      var changed = grid.putOnSlots(self);
      if (changed) {
        grid.setComponent(self, self.xGrid, self.yGrid);
        grid.nonUsedComponents(self);
        grid.spawnsComponents();
      }
      if (grid.isBasicWin()) {
        grid.cleanUp();
        grid.sprite = game.add.image(GRID_X, GRID_Y, 'ld36_win_001');
        chainedTextsWithFinalTrigger(0, -150, ["Impressive... Most impressive. \n\n(click to restart)"], firstLevel);
      }
    } else {
      self.sprite.position.x = self.xOld;
      self.sprite.position.y = self.yOld;
    }
    grid.hideAllInfos();
  }

  var onDragStart = function(sprite, pointeur) {
    self.xOld = self.sprite.position.x;
    self.yOld = self.sprite.position.y;
  }

  var over = function(sprite, pointeur) {
    var htmlGame = document.getElementById('ld36');
    htmlGame.style.cursor = "url('assets/ld36_cursor_002.png'), auto";
  }

  var out = function(sprite, pointeur) {
    var htmlGame = document.getElementById('ld36');
    htmlGame.style.cursor = "url('assets/ld36_cursor_001.png'), auto";
  }

  self.loadEvents = function(grid) {
    self.sprite.events.onInputDown.add(onDragStart, {grid: grid});
    self.sprite.events.onDragStop.add(onDragStop, {grid: grid});
    self.sprite.events.onDragUpdate.add(dragUpdate, {grid: grid});
    self.sprite.events.onInputOver.add(over, {grid: grid});
    self.sprite.events.onInputOut.add(out, {grid: grid});
  }

  self.destroy = function() {
    self.sprite.kill();
  }
}
