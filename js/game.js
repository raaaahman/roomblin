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
    map = game.add.tilemap('level');
    map.addTilesetImage('tileset', 'tileset');
    //Creating the layers
    groundLayer = map.createLayer('ground');
    wallLayer = map.createLayer('walls');

    //Setting the collision with the tiles in the wall layer
    map.setCollisionBetween(1, 20, true, 'walls');

    //Then we resize the game world to fit the current map
    groundLayer.resizeWorld();

    //Start the physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Spawning the players
    players = [];
    for (var i = 0; i < map.objects['startingPos'].length; i++) {
      var newPlayer = game.add.sprite(map.objects['startingPos'][i].x, map.objects['startingPos'][i].y, 'player' + i);
      players.push(newPlayer);
      game.physics.arcade.enable(players[i]);
    }

    //Getting the goal to finish the level
    levelGoal = map.objects['startingPos'][0].properties.goal;
    playerScore = 0;
    playerMoves = 0;

    //setting keyboard controls
    cursors = game.input.keyboard.createCursorKeys();
    controls = game.input.keyboard.addKeys({
      "r": Phaser.KeyCode.R,
      "space": Phaser.KeyCode.SPACEBAR
    });

    //SCREEN TEXT//
    moveText = game.add.text(72, 2, 'Moves: 0', {fontSize: '12px', fill: '#000'});
  },

  update: function() {
    //Check if the game is won
    if (playerScore >= levelGoal) {
      //stop moving
      players[0].body.stopMovement(true);

      //display a sound
      soundWin.play();

      //Go the screen between levels
      game.state.start('EndScreen');
    }

    //Check for reset
    if (controls.r.isDown) {
      //alert with a sound
      soundReset.play();

      this.create();
    }

    //Collision rules
    game.physics.arcade.collide(players[0], wallLayer);

    //Get the tile under the player's body center
    playerCenter = players[0].body.center;
    tileUnder = map.getTileWorldXY(playerCenter.x, playerCenter.y);

    //Player movement
    //If player is not moving, set a new velocity
    if (players[0].body.velocity.x == 0 && players[0].body.velocity.y == 0) {

      //Keyboard inputs
      if (cursors.up.isDown && map.getTile(tileUnder.x, tileUnder.y - 1, 'walls') == null) {

        this.countMove();
        players[0].body.velocity.y = -movingSpeed;

      } else if(cursors.down.isDown && map.getTile(tileUnder.x, tileUnder.y + 1, 'walls') == null) {

        this.countMove();
        players[0].body.velocity.y = movingSpeed;

      } else if(cursors.left.isDown && map.getTile(tileUnder.x - 1, tileUnder.y, 'walls') == null) {

        this.countMove();
        players[0].body.velocity.x = -movingSpeed;

      } else if(cursors.right.isDown && map.getTile(tileUnder.x + 1, tileUnder.y, 'walls') == null) {

        this.countMove();
        players[0].body.velocity.x = movingSpeed;

      }

    //If moving, replace the tiles with the player's color
  } else {

    //Check the tile the player is over
    if (map.getTile(tileUnder.x, tileUnder.y).index == 18) {
      map.replace(18, 16, tileUnder.x, tileUnder.y, 1, 1, 'ground');
      playerScore++;
    }
  }

  },

  countMove: function() {
    //Add a sound effect
    soundMove.play();
    //Count one move
    playerMoves++;
    moveText.text = 'Moves: ' + playerMoves;
  }
}
