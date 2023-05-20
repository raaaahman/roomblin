//A global variable to store the current level number
var currentLevel = currentLevel | 1;

var Preload = {
  preload: function() {
    //can add a loading screen

    //assets for the game
    this.load.tilemapTiledJSON('level1','assets/levels/level1.json');
    this.load.tilemapTiledJSON('level2','assets/levels/level2.json');
    this.load.tilemapTiledJSON('level3','assets/levels/level3.json');
    this.load.tilemapTiledJSON('level4','assets/levels/level4.json');
    this.load.tilemapTiledJSON('level5','assets/levels/level5.json');
    this.load.image('tileset', 'assets/images/tileset.png');
    this.load.image('player0', 'assets/images/blue_cube.png');

    //audio
    this.load.audio('move', 'assets/sounds/move.wav');
    this.load.audio('win', 'assets/sounds/win.wav');
    this.load.audio('reset', 'assets/sounds/reset.wav')
  },

  create: function() {
    //Then launch the game
    this.scene.start('Game');
  },
}
