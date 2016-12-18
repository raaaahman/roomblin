//variable we'll be using
var player, dot, squareSize, score, speed, updateDelay, direction, new_direction, addNew, cursors, scoreTextValue, speedTextValue, textStyle_key, textStyle_Value, gridWidth, gridHeight, firstCell, lastCell, oldLastCellX, oldLastCellY, map, groundLayer, wallLayer;

//Our game state, different from the game object
var Game = {

  preload: function() {
    //Loading the ressources of the level
    game.load.image('player', './assets/images/blue_square.png');
    game.load.image('dot', './assets/images/red_square.png');
    //Tilemap
    game.load.tilemap('map', './assets/rooms/room1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset', './assets/images/tileset.png');
  },

  create: function() {
    //Setting global variables

    player = [];
    dot = [];
    squareSize = 16;
    gridWidth = game.world.width / squareSize;
    gridHeight = game.world.height / squareSize;
    score = 0;
    speed = 0;
    updateDelay = -1;
    direction = 'right';
    new_direction = null;
    addNew = false;

    //Start the physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Creating the level
    map = game.add.tilemap('map');
    map.addTilesetImage('ld37', 'tileset');
    groundLayer = map.createLayer('ground');
    wallLayer = map.createLayer('walls');
    //Setting colliding tiles
    map.setCollisionBetween(1, 20, true, 'walls');

    //setting a controller
    cursors = game.input.keyboard.createCursorKeys();

    //a temporary background color
    game.stage.backgroundColor = '#061f27';

    //Generate a snake stack
    for (var i = 0; i < 3; i++) {
      player[i] = game.add.sprite(160 + i*squareSize, 160, 'player');
    }

    //Generate the first dot
    this.generateDot();


    //this text will appear top and will be our score
    textStyle_Key = {font: "bold 14px sans-serif", fill: "#46c0f9", align: "center"};
    textStyle_Value = {font: "bold 18px sans-serif", fill: "#fff", align: "center"};
    game.add.text(30, 20, "SCORE", textStyle_Key);
    scoreTextValue = game.add.text(90, 18, score.toString(), textStyle_Value);
    game.add.text(180, 20, "SPEED", textStyle_Key);
    speedTextValue = game.add.text(240, 18, speed.toString(), textStyle_Value);
  },

  update: function() {

    //Setting controls for the player
    if (cursors.right.isDown && direction != 'left') {
      new_direction = 'right';
    } else if (cursors.left.isDown && direction != 'right') {
      new_direction = 'left';
    } else if (cursors.up.isDown && direction != 'down') {
      new_direction = 'up';
    } else if (cursors.down.isDown && direction != 'up') {
      new_direction = 'down';
    }

    //This formula will calculate the speed of the game based on the player's score, to a maximum of ten
    speed = Math.min(10, Math.floor(score/5));
    speedTextValue.text = speed.toString();

    //The counter check each time we need to update the player position
    updateDelay++;
    if (updateDelay % (10 - speed) == 0) {
      //moving
      firstCell = player[player.length - 1];
      lastCell = player.shift();
      oldLastCellX = lastCell.position.x;
      oldLastCellY = lastCell.position.y;

      //change the direction here
      if(new_direction) {
        direction = new_direction;
        new_direction = null;
      }

      //Then change the coordinates
      if (direction == 'right') {
        lastCell.position.x = firstCell.position.x + squareSize;
        lastCell.position.y = firstCell.position.y;
      } else if (direction == 'left') {
        lastCell.position.x = firstCell.position.x - squareSize;
        lastCell.position.y = firstCell.position.y;
      } else if (direction == 'up') {
        lastCell.position.x = firstCell.position.x;
        lastCell.position.y = firstCell.position.y - squareSize;
      } else if (direction == 'down') {
        lastCell.position.x = firstCell.position.x;
        lastCell.position.y = firstCell.position.y + squareSize;
      }

      //Bring the last cell to the checkPos
      player.push(lastCell);
      firstCell = lastCell;
    }

    //If a dot has been taken, player increase in size
    if (addNew) {
      player.unshift(game.add.sprite(oldLastCellX, oldLastCellY, 'player'));
      addNew = false;
    }

    //Check collisions with the layer
    game.physics.arcade.collide(player, wallLayer);

    //Check for collisions
    this.dotCollision();

    //Check for auto collision
    //this.selfCollision(firstCell);

    //Check collision with a wall
    //this.wallCollision(firstCell);
  },

  dotCollision: function() {
    //Check overlapping
    for (var i = 0; i < player.length; i++) {
      if (player[i].position.x == dot.position.x && player[i].position.y == dot.position.y) {
        addNew = true;
        dot.destroy();
        this.generateDot();
        score++;
        scoreTextValue.text = score.toString();
      }
    }
  },

  selfCollision: function(checkPos) {
    //check overlapping
    for (var i = 0; i < player.length - 1; i++) {
      if (checkPos.position.x == player[i].position.x && checkPos.position.y == player[i].position.y) {
        //Launch the game again
        game.state.start('Game');
      }
    }
  },

  wallCollision: function(checkPos) {
    if (checkPos.position.x >= game.world.width || checkPos.position.x < 0 || checkPos.position.y >= game.world.height || checkPos.position.y < 0) {
      game.state.start('Game');
    }
  },

  //Custom function
  generateDot: function() {
    //Generate a new dot randomly
    var randomX = Math.floor(Math.random() * gridWidth) * squareSize,
    randomY = Math.floor(Math.random() * gridHeight) * squareSize;
    dot = game.add.sprite(randomX, randomY, 'dot');
  }
}
