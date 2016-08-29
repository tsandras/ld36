Square = function(game, filled, kind, component, x, y) {
  var self = this;
  self.filled = filled;
  self.kind = kind;
  self.x = x;
  self.y = y;
  self.game = game;
  self.component = null;
  if (component) {
    self.component = component;
  }
  graphics = self.game.add.graphics(self.x + 53, self.y + 63);
  graphics.lineStyle(1, 0x0000ff, 1);
  graphics.moveTo(0, 0);
  graphics.lineTo(0, 40);
  graphics.moveTo(0, 0);
  graphics.lineTo(40, 0);
  graphics.moveTo(40, 0);
  graphics.lineTo(40, 40);
  graphics.moveTo(0, 40);
  graphics.lineTo(40, 40);
  self.info = graphics;
  self.info.visible = false;

  self.show = function() {
    self.info.visible = true;
  }
  self.hide = function() {
    self.info.visible = false;
  }
}
