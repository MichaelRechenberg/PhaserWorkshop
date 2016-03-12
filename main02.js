/*
    Author: Michael Rechenberg
    
    A good reference for Phaser things: https://leanpub.com/html5shootemupinanafternoon/read
    Phaser website: http://phaser.io/
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
}

var sail;
//create our Text, Sprite, and Group Objects
//Keep in mind that the order of adding sprites matters: 
// any sprites later in the code will be superimposed on top of
// any previously added sprites that share the same space
function create(){
    console.log("create");
    sail = game.add.sprite(game.world.centerX, game.world.centerY, 'sail');
    sail.anchor.setTo(0.5, 0.5);
}

//called every frame
function update(){
}