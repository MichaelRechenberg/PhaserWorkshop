/**
 *  Resets the game to its original state:
 *      resets text
 *      clears all groups
 *      resets timer
 */
var loseState = {
    
create: function(){
    var enter = game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
    console.log(enter);
    var gameOver = game.add.text(game.world.centerX, game.world.centerY, "GAME OVER", 
        {font: "5em Arial", fill: "#ff0000"});
    gameOver.anchor.setTo(0.5, 0.5);
    var finalScore = game.add.text(game.world.centerX, gameOver.y + gameOver.height + 20, 
        "Final Score: " + score, {fill:'#ffffff'});
    finalScore.anchor.setTo(0.5, 0.5);
    var prompt = game.add.text(game.world.centerX, finalScore.y + finalScore.height + 20,
        "Hit Enter to Restart", {fill:'#ffffff'});
    prompt.anchor.setTo(0.5, 0.5);
    
    score = 0;
    lives = 3;
    //reset the text
    livesText.setText("Lives: 3");
    scoreText.setText("Score: 0");
    //clear the projectiles and enemies groups
    playerProjectiles.removeAll(true);
    enemies.removeAll(true);
    player.x = game.world.centerX;
    player.y = 0;
    //reset the timer
    
    enter.onDown.add(function(){
        console.log("Trying to switch back to state Play");
        game.state.start("Play");}, this);
}

};