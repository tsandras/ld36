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
    
	var graphics = self.game.add.graphics(self.x + 53, self.y + 63);
    graphics.beginFill(0xffffff, 0.2);
    graphics.drawRect(0, 0, 40, 40);
    self.info = graphics;
    self.info.visible = false;
    graphics.endFill();
	graphics.blendMode = PIXI.blendModes.ADD;
	
    var graphicsError = self.game.add.graphics(self.x + 53, self.y + 63);
    graphicsError.beginFill(0x2f2320, 0.3);
    graphicsError.drawRect(0, 0, 40, 40);
    self.infoError = graphicsError;
    self.infoError.visible = false;
    graphicsError.endFill();
	graphicsError.lineStyle(1, 0xa81d1a, 0.5);
	graphicsError.moveTo(0,0);
    graphicsError.lineTo(40, 40);
	graphicsError.moveTo(0,40);
    graphicsError.lineTo(40, 0);
	graphicsError.blendMode = PIXI.blendModes.COLOR_BURN;
  }

  self.show = function() {
    self.info.visible = true;
  }
  self.hide = function() {
    self.info.visible = false;
    self.infoError.visible = false;
  }
  self.showError = function() {
    self.infoError.visible = true;
  }
}
