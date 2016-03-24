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
}

var sail;
var player;
//create our Text, Sprite, and Group Objects
function create(){
    console.log("create");
    //enable physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    game.add.sprite(0,0,'background');
    
    player = game.add.sprite(game.world.centerX,0, 'dude');
    //enable physics on the player
    game.physics.arcade.enable(player);
    //give dude a bounce
    player.body.bounce.y = 0.1;
    //acceleration (pixels per second^2)
    player.body.gravity.y = 1000;
    //have it so the dude doesn't fall infinitely 
    player.body.collideWorldBounds = true;
}

//called every frame
function update(){

}