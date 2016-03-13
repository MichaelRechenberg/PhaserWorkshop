 var bootState = {
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        console.log('calling playState');
        game.state.start("Play");
    }
};