var textStyle, endText, countText, controlsText1, controlsText2;

var EndScreen = {
  preload: function() {

  },

  create: function() {

    //Text
    textStyle = {font: 'normal 8px "Share Tech Mono"', fill: '#fff'};
    if (currentLevel == 5) {
      endText = game.add.text(12, 12, 'Congratulations, you completed', textStyle);
      countText = game.add.text(12, 34, 'the game in ' + totalMoves + ' moves!', textStyle);
      controlsText1 = game.add.text(12, 56, 'Press "space" to go back \nto the mains screen', textStyle);
    } else {
      endText = game.add.text(12, 12, 'Congratulations, you made it', textStyle);
      countText = game.add.text(12, 34, 'in ' + playerMoves + ' moves!', textStyle);
      controlsText1 = game.add.text(12, 56, 'Press "space" to continue', textStyle);
    }
    controlsText2 = game.add.text(12, 78, 'Press "r" anytime to restart \nthe level', textStyle);

    //Setting the controls
    controls = game.input.keyboard.addKeys({
      "r": Phaser.KeyCode.R,
      "space": Phaser.KeyCode.SPACEBAR
    });
  },

  update: function() {
    //Reload the current level
    if (controls.r.isDown) {
      game.state.start('Preload');

    //Go to the next level
    } else if (controls.space.isDown && currentLevel < 5) {
      totalMoves += playerMoves;
      currentLevel++;
      game.state.start('Preload');
    //Reset the game
    } else if (controls.space.isDown) {
      totalMoves = 0;
      currentLevel = 1;
      game.state.start('Preload');
    }
  }
}
