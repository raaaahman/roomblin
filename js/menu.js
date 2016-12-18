var titleText;

var Menu = {
  preload: function() {
    //Load the menu button
    game.load.spritesheet('start', 'assets/images/start_button.png', 90, 32);
  },

  create: function() {
    //Background
    game.stage.backgroundColor = '#98a2ad';

    //Button that'll start the game
    this.add.button(24, 80, 'start', this.startGame, this);

    //The title
    titleText = game.add.text(22, 18, "Roomblin'", {font: 'normal 26px "Passion One"', fill: '#fff'});
  },

  startGame: function() {
    //Then the game will load the game
    this.state.start('Preload');
  },

  update: function() {

  }
}
