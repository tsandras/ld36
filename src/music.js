function Music() {
  var self = this;

  self.music = game.add.audio('ld36_audio_001', 1, true);
  self.music.play();
  self.onButton = game.add.sprite(50, 10, 'ld36_audio_on_001');
  self.onButton.blendMode = PIXI.blendModes.COLOR_BURN;
  self.onButton.inputEnabled = true;
  self.isOn = true;

  self.offButton = game.add.sprite(50, 11, 'ld36_audio_off_001');
  self.offButton.blendMode = PIXI.blendModes.COLOR_BURN;
  self.offButton.inputEnabled = true;
  self.offButton.visible = false;

  var switchMusic = function () {
    if (self.isOn) {
      self.music.pause();
      self.onButton.visible = false;
      self.offButton.visible = true;
      self.isOn = false;
    } else {
      self.music.resume();
      self.onButton.visible = true;
      self.offButton.visible = false;
      self.isOn = true;
    }
  }

  self.onButton.events.onInputDown.add(switchMusic);
  self.offButton.events.onInputDown.add(switchMusic);
}

Music.run = function() {
  music = new Music();
}
