//Creating a new phaser's game
var game = new Phaser.Game(160, 160, Phaser.AUTO, '');

//States for the game
game.state.add('Boot', Boot); //configuration for the game
game.state.add('Preload', Preload); //Loading our assets
game.state.add('Menu', Menu); //The menu
game.state.add('EndScreen', EndScreen); //Screen between games
game.state.add('Game', Game); // Our actual game

game.state.start('Boot');
