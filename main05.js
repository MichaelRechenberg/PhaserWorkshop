/*
    Author: Michael Rechenberg
    
    A good reference for Phaser things: https://leanpub.com/html5shootemupinanafternoon/read
    Phaser website (API information): http://phaser.io/
    The execution of Phaser functions is as follows:
        preload()
        create()
        update()
        render()
    preload() and create() only run once, while update() and render()
    run every frame
    render() is usually not needed, but is good for debugging
    
    x ----->
    y 
    |
    |
    V
    ----/MAP----
*/

//Constants to define Phaser's width and height

//Width of the game, where sprites will be drawn
var GAME_WIDTH = 800;
//Height of the game
var GAME_HEIGHT = 600;


//Reference to the core game object
//If you want to use game.debug in the render() function, you need to set
//  Phaser.AUTO to Phaser.CANVAS (the renderer)
//The width is GAME_WIDTH pixels and the height is GAME_HEIGHT pixels
var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO,
 'phaser-game', { preload: preload, create: create, update: update});

//load our assets
function preload(){
    console.log("preload");
    game.load.image('sail', 'assets/images/CS_Sail.png');
    game.load.image('background', 'assets/images/background.png');
    //the 32 represents the width of each frame, the 48 refers to the height
    game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
    game.load.image('ground', 'assets/images/platform.png');
    game.load.image('projectile', 'assets/images/projectile.png');
    
}

// handle to the player
var player;
//handle to our movement controls (left, right, up, down)
var movementControls;
//handle to our ground 
var ground;

//handle for the space bar
var spaceBar;


//handle for playerProjectiles
var playerProjectiles;

//create our Text, Sprite, and Group Objects
function create(){
    console.log("create");
    //enable physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    game.add.sprite(0,0,'background');
    
    //add our ground
    ground = game.add.sprite(0,game.world.height-32, 'ground');
    game.physics.arcade.enable(ground);
    ground.scale.setTo(2,1);
    ground.enableBody = true;
    //comment this line out and see what happens :P
    ground.body.immovable = true;

    //all playerProjectiles will be part of this group and have physics
    playerProjectiles = game.add.group();
    playerProjectiles.enableBody = true;
    //have playerProjectiles call their kill() method when they are offscreen
    playerProjectiles.setAll('outOfBoundsKill', true);
    playerProjectiles.setAll('checkWorldBounds', true);
    
    player = game.add.sprite(game.world.centerX,0, 'dude');
    player.anchor.setTo(0.5, 0.5);
    //enable physics on the player
    game.physics.arcade.enable(player);
    //give dude a bounce
    player.body.bounce.y = 0.1;
    //acceleration (pixels per second^2)
    player.body.gravity.y = 1000;
    //have it so the dude doesn't fall infinitely 
    player.body.collideWorldBounds = true;
    //animations
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    
    //set up our input
    movementControls = game.input.keyboard.createCursorKeys();
    spaceBar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    game.input.keyboard.addKeyCapture(Phaser.KeyCode.SPACEBAR);
    //call the shoot function whenever the spacebar is pressed
    spaceBar.onDown.add(shoot, this);
    
}

//how many frames that have to elapse before the player can shoot again
//  (roughly 60fps)
var TIME_TO_SHOOT = 15;
var timeElapsed = 0;
//called every frame
function update(){
    game.physics.arcade.collide(player, ground);
    if (movementControls.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -250;
        player.animations.play('left');
    }
    else if (movementControls.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 250;
        player.animations.play('right');
    }
    else{
        player.body.velocity.x = 0;
        player.animations.stop();
        player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (movementControls.up.isDown && player.body.touching.down)
    {
        console.log("jump!");
        player.body.velocity.y = -500;
    }
    if(timeElapsed < TIME_TO_SHOOT)
        timeElapsed++;
}

//called once the spacebar is pressed once
function shoot(){
    if(timeElapsed == TIME_TO_SHOOT){
        console.log("BANG!");
        var bullet = playerProjectiles.create(player.x -5, player.y, 'projectile');
        bullet.body.velocity.y = -200;
        timeElapsed = 0;
    }

}
