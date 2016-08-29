var KINDS = ['Raw', 'Mechanics']

Square = function(game, filled, kinds, component, x, y) {
  var self = this;
  self.filled = filled;
  self.kinds = kinds;
  self.x = x;
  self.y = y;
  self.game = game;
  self.component = null;
  if (component) {
    self.component = component;
  }

  self.setInfo = function(game) {
    self.game = game;
    graphics = self.game.add.graphics(self.x + 53, self.y + 63);
    graphics.beginFill(0xffffff, 0.3);
    // It works!
    // graphics.blendMode = PIXI.blendModes.ADD;
    graphics.drawRect(0, 0, 40, 40);
    self.info = graphics;
    self.info.visible = false;
    graphics.endFill();
  }

  self.show = function() {
    // if (self.info) {
      self.info.visible = true;
    // }
  }
  self.hide = function() {
    // if (self.info) {
      self.info.visible = false;
    // }
  }
}
