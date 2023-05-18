var textStyle, endText, countText, controlsText1, controlsText2;

var EndScreen = {
  preload: function() {

  },

  create: function() {

    //Text
    textStyle = {font: 'normal 8px "Share Tech Mono"', fill: '#fff'};
    if (currentLevel == 5) {
      endText = this.add.text(12, 12, 'Congratulations, you completed', textStyle);
      countText = this.add.text(12, 34, 'the game in ' + totalMoves + ' moves!', textStyle);
      controlsText1 = this.add.text(12, 56, 'Press "space" to go back \nto the mains screen', textStyle);
    } else {
      endText = this.add.text(12, 12, 'Congratulations, you made it', textStyle);
      countText = this.add.text(12, 34, 'in ' + playerMoves + ' moves!', textStyle);
      controlsText1 = this.add.text(12, 56, 'Press "space" to continue', textStyle);
    }
    controlsText2 = this.add.text(12, 78, 'Press "r" anytime to restart \nthe level', textStyle);

    //Setting the controls
    controls = this.input.keyboard.addKeys({
      "r": Phaser.Input.Keyboard.KeyCodes.R,
      "space": Phaser.Input.Keyboard.KeyCodes.SPACE
    });
  },

  update: function() {
    //Reload the current level
    if (controls.r.isDown) {
      this.scene.start('Game');

    //Go to the next level
    } else if (controls.space.isDown && currentLevel < 5) {
      totalMoves += playerMoves;
      currentLevel++;
      this.scene.start('Game');
    //Reset the game
    } else if (controls.space.isDown) {
      totalMoves = 0;
      currentLevel = 1;
      this.scene.start('Game');
    }
  }
}
