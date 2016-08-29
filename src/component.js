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

  var dragUpdate = function(sprite, pointer, dragX, dragY, snapPoint) {
    template.hideAllSlots();
    template.showSlots(self);
  }

  var onDragStop = function(sprite, pointeur) {
    template.putOnSlots(self);
  }

  self.loadEvents = function(template) {
    self.sprite.events.onDragUpdate.add(dragUpdate, {template: template});
    self.sprite.events.onDragStop.add(onDragStop, {template: template});
  }
}
