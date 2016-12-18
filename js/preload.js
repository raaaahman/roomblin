//A global variable to store the current level number
var currentLevel = currentLevel | 1;

var Preload = {
  preload: function() {
    //can add a loading screen

    //assets for the game
    game.load.tilemap('level','assets/levels/level' + currentLevel + '.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset', 'assets/images/tileset.png');
    game.load.image('player0', 'assets/images/blue_cube.png');

    //audio
    game.load.audio('move', 'assets/sounds/move.wav');
    game.load.audio('win', 'assets/sounds/win.wav');
    game.load.audio('reset', 'assets/sounds/reset.wav')
  },

  create: function() {
    //Bind the sounds to variables, so they can be controlled
    soundMove = game.add.audio('move');
    soundWin = game.add.audio('win');
    soundReset = game.add.audio('reset');
    
    //Then launch the game
    game.state.start('Game');
  },
}
