//Defining some global variables
var map, groundLayer, wallLayer, cursors, levelGoal, playerScore, playerMoves, playerCenter, tileUnder;

//tracking the total moves of the player
var totalMoves = totalMoves || 0;

//Speed at wich entites are moving
var movingSpeed = 128;

//The player object
Player = function(posX, posY) {

}

var Game = {

  create: function() {

    //Create the map
    map = this.add.tilemap('level' + currentLevel);
    map.addTilesetImage('tileset', 'tileset');
    //Creating the layers
    groundLayer = map.createLayer('ground', 'tileset');
    wallLayer = map.createLayer('walls', 'tileset');

    //Setting the collision with the tiles in the wall layer
    map.setCollisionBetween(1, 20, true, 'walls');

    //Spawning the players
    players = [];
    var objects = map.getObjectLayer('startingPos').objects;
    for (var i = 0; i < objects.length; i++) {
      var newPlayer = this.physics.add.sprite(objects[i].x, objects[i].y, 'player' + i)
      .setOrigin(0);
      players.push(newPlayer);
    }

    //Getting the goal to finish the level
    levelGoal = objects[0].properties.goal;
    playerScore = 0;
    playerMoves = 0;

    //setting keyboard controls
    cursors = this.input.keyboard.createCursorKeys();
    controls = this.input.keyboard.addKeys({
      "r": Phaser.Input.Keyboard.KeyCodes.R
    });

    //SCREEN TEXT//
    moveText = this.add.text(72, 2, 'Moves: 0', {fontSize: '12px', fill: '#000'});
  },

  update: function() {
    //Check if the game is won
    if (playerScore >= levelGoal) {
      //stop moving
      players[0].body.stop();

      //display a sound
      this.sound.play('win');

      //Go the screen between levels
      this.scene.start('EndScreen');
    }

    //Check for reset
    if (controls.r.isDown) {
      //alert with a sound
      this.sound.play('reset');

      this.create();
    }

    //Collision rules
    this.physics.collide(players[0], wallLayer);

    //Get the tile under the player's body center
    playerCenter = players[0].body.center;
    tileUnder = map.getTileAtWorldXY(playerCenter.x, playerCenter.y, false, this.cameras.main, 'ground');

    //Player movement
    //If player is not moving, set a new velocity
    if (players[0].body.velocity.x == 0 && players[0].body.velocity.y == 0) {

      //Keyboard inputs
      if (cursors.up.isDown && map.getTileAt(tileUnder.x, tileUnder.y - 1, false, 'walls') == null) {

        Game.countMove.call(this);
        players[0].body.velocity.y = -movingSpeed;

      } else if(cursors.down.isDown && map.getTileAt(tileUnder.x, tileUnder.y + 1, false, 'walls') == null) {

        Game.countMove.call(this);
        players[0].body.velocity.y = movingSpeed;

      } else if(cursors.left.isDown && map.getTileAt(tileUnder.x - 1, tileUnder.y, false, 'walls') == null) {

        Game.countMove.call(this);
        players[0].body.velocity.x = -movingSpeed;

      } else if(cursors.right.isDown && map.getTileAt(tileUnder.x + 1, tileUnder.y, false, 'walls') == null) {

        Game.countMove.call(this);
        players[0].body.velocity.x = movingSpeed;

      }

    //If moving, replace the tiles with the player's color
  } else {

    //Check the tile the player is over
    if (map.getTileAt(tileUnder.x, tileUnder.y, false, 'ground').index == 18) {
      map.putTileAt(16, tileUnder.x, tileUnder.y, false, 'ground');
      playerScore++;
    }
  }

  },

  countMove: function() {
    //Add a sound effect
    this.sound.play('move');
    //Count one move
    playerMoves++;
    moveText.text = 'Moves: ' + playerMoves;
  }
}
