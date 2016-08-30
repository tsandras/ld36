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
    template.hideAllSlots();
    template.showSlots(self);
  }

  var onDragStop = function(sprite, pointeur) {
    if (template.isInGrid(self)) {
      var changed = template.putOnSlots(self);
      if (changed) {
        template.setComponent(self, self.xGrid, self.yGrid);
        template.nonUsedComponents(self);
        template.spawnsThreeComponents();
      }
      if (template.isBasicWin()) {
        template.cleanUp();
        template.sprite = game.add.image(53, 63, 'ld36_win_001');
        chainedTextsWithFinalTrigger(0, -150, ["Impressive... Most impressive. \n\n(click to restart)"], firstLevel);
      }
    } else {
      self.sprite.position.x = self.xOld;
      self.sprite.position.y = self.yOld;
    }
    template.hideAllSlots();
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

  self.loadEvents = function(template) {
    self.sprite.events.onInputDown.add(onDragStart, {template: template});
    self.sprite.events.onDragStop.add(onDragStop, {template: template});
    self.sprite.events.onDragUpdate.add(dragUpdate, {template: template});
    self.sprite.events.onInputOver.add(over, {template: template});
    self.sprite.events.onInputOut.add(out, {template: template});
  }

  self.destroy = function() {
    self.sprite.kill();
  }
}
