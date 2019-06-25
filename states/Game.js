

BasicGame.PlayState = function (game) {

};


BasicGame.PlayState.prototype = {

  create:function(game) {

    const title = game.add.sprite(game.world.centerX, game.world.centerY - 96, 'title');
    title.scale.setTo(1.3);

    title.anchor.setTo(0.5);


    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.useElapsedTime = true;
    game.physics.p2.restitution = 0.8;

    game.physics.p2.gravity.y = 3000;

    //  we need to turn on impact events for the world
    game.physics.p2.setImpactEvents(true);

    //  grid.init(game);
    god.create(game);
    god.create_grid(game, 7, 10);

    //god.create_gray_area(game);
    p.create_pockets(game);


// alert('post game');
    // var muteButton = game.add.sprite(game.world.centerX, game.world.centerY+42, 'mute');

    // muteButton.anchor.setTo(0.5,0.5);

    // muteButton.scale.setTo(0.4,0.4);
    // muteButton.alpha = 1;
    // muteButton.inputEnabled = true;

    // muteButton.events.onInputDown.add(god.mute,this);
    // console.log(muteButton.events);

  },
  update:function(game) {
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;
    const contentHeight = 885;
    const contentWidth = 674;


    const scale = Math.min(screenWidth / contentWidth, screenHeight / contentHeight);
    document.body.style.transform = (`scale(${scale})`);

    god.update();
  },

  render:function(game) {
    if (customConfig.dropDev) {
      const sprite = grid.throwing_balls.getAt(0);
      if (sprite && sprite != -1) {
        game.debug.spriteInfo(sprite, 32, 128);
        game.debug.text(`angularVelocity: ${sprite.body.angularVelocity}`, 32, 264);
      }
    }
  },


};
