var text1, text2;

var Boot = {
  create: function() {
    this.cameras.main.setBackgroundColor(0x000000);

    //call to the fonts, for loading
    text1 = this.add.text(-64, -64, '0', {font: 'normal 10px "Passion One"'});
    text2 = this.add.text(-64, -64, '0', {font: 'normal 10px "Share Tech Mono"'})

    //Launching the preloading state
    this.scene.start('Menu');
  }
}
