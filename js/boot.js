var text1, text2;

var Boot = {
  preload: function() {
    //call to the fonts, for loading
    text1 = game.add.text(-64, -64, '0', {font: 'normal 10px "Passion One"'});
    text2 = game.add.text(-64, -64, '0', {font: 'normal 10px "Share Tech Mono"'})

  },

  create: function() {
    game.stage.backgroundColor = '#fff';
    //Our game space takes the whole screen
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //Rounding pixels
    game.renderer.renderSession.roundPixels = true;

    //Center the game
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    //Initiate the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Launching the preloading state
    game.state.start('Menu');
  }
}
