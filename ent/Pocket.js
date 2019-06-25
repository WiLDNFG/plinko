var Pocket = function () {
  this.score_bins;
  this.bin_sprites;
};


Pocket.prototype.create_pockets = function (game) {
  const bin_graphics = game.add.graphics(0, 0);

  this.bin_sprites = game.add.group();

  // lowscore,mediumnscore,highscore,width,colour, font
  const width = game.world.width / 11;
  const color = 0x000000;
  this.score_bins = [
    new ScoreBin(0, 500, 150, 9900, width, color, 'font', false),
    new ScoreBin(1, 100, 0, 0, width, color, 'font', false),
    new ScoreBin(2, 50, 50, 99, width, color, 'font', false),
    new ScoreBin(3, 5, 0, 0, width, color, 'font', false),
    new ScoreBin(4, 0, 10, 9, width, color, 'font', false),
    new ScoreBin(5, '\n\n\n\n\nJ P', '\n\n\n\n\nJ P', '\n\n\n\n\nJ P', width, 0xFF0000, 'fontjp', true),
    new ScoreBin(6, 0, 10, 9, width, color, 'font', false),
    new ScoreBin(7, 5, 0, 0, width, color, 'font', false),
    new ScoreBin(8, 50, 50, 99, width, color, 'font', false),
    new ScoreBin(9, 100, 0, 0, width, color, 'font', false),
    new ScoreBin(10, 500, 150, 9900, width, color, 'font', false),
  ];


  let curX = 0;
  for (let a = 0; a < this.score_bins.length; a++) {
    if (a != 0) {
      const pegs = game.add.sprite(curX, game.world.height - 24, 'peg');
      pegs.anchor.setTo(0.5, 0.5);

      // make the top of the peg enabled for physics too
      const ball = new god.ball(game, curX, game.world.height - 40, 4, 0x000000, false);
    }

    const bin = this.score_bins[a];
    // bin_graphics.lineStyle(0);
    // bin_graphics.beginFill(bin[4], 1);

    const bin_sprite = game.add.sprite(curX + bin.width / 2, game.world.height - 16, 'score');
    bin_sprite.width = bin.width;
    bin_sprite.tint = bin.color;
    bin_sprite.data = bin;
    // bin_graphics.endFill();
    if (a == 5) {
      // jp
      var text = game.add.bitmapText(curX + bin.width / 2, game.world.height - 62, bin.font, bin.low.toString(), 18);
    } else {
      var text = game.add.bitmapText(curX + bin.width / 2, game.world.height - 50, bin.font, bin.low.toString(), 24);
    }
    //god.bin_score_text.push(text);

    text.anchor.setTo(0.5, 0.5);


    // bitmap fonts are more efficient, and doesnt have problems with firefox ^
    // game.add.text(curX+bin[3]/2,game.world.height-64,bin[0],{font:'16px Arial',fill:'#fff'});

    // var bin_sprite = game.add.sprite(curX,0);


    game.physics.p2.enable(bin_sprite, false);
    bin_sprite.body.static = true;

    // bin_sprite.addChild(bin_graphics);
    this.bin_sprites.add(bin_sprite);
    curX += bin.width;
  }


  // this.pockets = game.add.group();
  // for (var i = 0; i < 10; i++) {
  //     var peg = game.add.sprite(i * game.world.width / 10, game.world.height - 32, 'peg');
  //     peg.anchor.setTo(0.5);
  //     // peg.scale.setTo(1,5);
  // }
};


const p = new Pocket();
