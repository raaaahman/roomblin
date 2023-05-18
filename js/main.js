//Creating a new phaser's game
var game = new Phaser.Game({
    width: 160, 
    height: 160, 
    renderType: Phaser.AUTO,
    scaleMode: Phaser.Scale.ScaleModes.FIT,
    pixelArt: true,
    physics: {
        default: 'arcade'
    },
});

//States for the game
game.scene.add('Boot', Boot); //configuration for the game
game.scene.add('Preload', Preload); //Loading our assets
game.scene.add('Menu', Menu); //The menu
game.scene.add('EndScreen', EndScreen); //Screen between games
game.scene.add('Game', Game); // Our actual game

game.scene.start('Boot');
