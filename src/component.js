Component = function(game, id, name, x, y, w, h) {
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

  var dragUpdate = function(sprite, pointer, dragX, dragY, snapPoint) {
    template.hideAllSlots();
    template.showSlots(self);
  }

  var onDragStop = function(sprite, pointeur) {
    template.putOnSlots(self);
    template.setComponent(self, self.xGrid, self.yGrid);
    template.nonUsedComponents(self);
    template.spawnsThreeComponents();
    template.hideAllSlots();
    template.toString();
  }

  var onDragStart = function(sprite, pointeur) {
    self.xOld = Math.floor((self.sprite.position.x - 53)/40);
    self.yOld = Math.floor((self.sprite.position.y - 63)/40);
  }

  self.loadEvents = function(template) {
    self.sprite.events.onDragStart.add(onDragStart, {template: template});
    self.sprite.events.onDragStop.add(onDragStop, {template: template});
    self.sprite.events.onDragUpdate.add(dragUpdate, {template: template});
  }

  self.destroy = function() {
    self.sprite.kill();
  }
}
