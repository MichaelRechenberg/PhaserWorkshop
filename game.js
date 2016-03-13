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
 'phaser-game');
game.state.add("Boot", bootState);
game.state.add("Play", playState);
game.state.add("Lose", loseState);
console.log(game);
console.log('calling boot');
game.state.start("Boot");



    





