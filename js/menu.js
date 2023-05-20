var titleText;

var Menu = {
  startGame: function() {
    //Then the game will load the game
    this.scene.start('Preload');
  },

  preload: function() {
    //Load the menu button
    this.load.spritesheet('start', 'assets/images/start_button.png', {
      frameWidth: 90, 
      frameHeight: 32
    });
  },

  create: function() {
    //Background
    this.cameras.main.setBackgroundColor(0x98a2ad);

    //Button that'll start the game
    this.add.image(24, 80, 'start')
    .setOrigin(0)
    .setInteractive() 
    .on('pointerdown', Menu.startGame, this);

    //The title
    titleText = this.add.text(22, 18, "Roomblin'", {font: 'normal 26px "Passion One"', fill: '#fff'});
  },

  update: function() {

  }
}
