var Grid = function(game) {




};

Grid.prototype.init = function(game) {

    // this.balls = game.add.group();
    // this.throwing_balls = game.add.group();
    // this.pocketHit = game.add.audio('pocketHit');


};

Grid.prototype.ball = function(game, x, y, r, c, movable, spriteName, angularVelocity) {

    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
    this.movable = movable;
    this.spriteName = spriteName || 'ball';

    var ball_sprite = game.add.sprite(this.x, this.y, this.spriteName);
    ball_sprite.anchor.setTo(0.5, 0.5);
    ball_sprite.tint = this.c;

    game.physics.p2.enable(ball_sprite, false);

    if (this.movable) {

        ball_sprite.body.collideWorldBounds = true;
        ball_sprite.body.static = false;
        ball_sprite.body.angularVelocity = angularVelocity || 0;
        //ball_sprite.anchor.setTo(0.5, 1);
        ball_sprite.scale.setTo(1.5, 1.5);

    } else {

        ball_sprite.body.static = true;
        if (this.spriteName == 'ball') {
            ball_sprite.scale.setTo(0.5, 0.5);


        }
        //ball_sprite.body.bounce.y = 1;
        //ball_sprite.body.bounce.x = 1;
    }

    ball_sprite.body.setCircle(r);

    return ball_sprite;



};

Grid.prototype.flash = function(ball1,ball) {
//            ball.sprite.tint = Math.random() * 0xFFFFFF;

god.ball_emitter.x = ball.x;
god.ball_emitter.y = ball.y;

god.ball_emitter.start(true, 2000,null, 5);
    god.bing.play();




	};

Grid.prototype.create_grid = function(game, rows, cols) {
this.game = game;
    this.balls = game.add.group();
    this.throwing_balls = game.add.group();
    this.pocketHit = game.add.audio('pocketHit');
    var bulb_size = 8;
    //cols is the number of balls/pegs in the first row which should match the number of pockets
    var offsetX = (game.width) / (cols + 1);
    var offsetY = (game.height - (bulb_size * rows)) / (rows + 2)
    var x = 0;
    var y = offsetY;
    for (var r = 0; r < rows; r++) {
        y += offsetY;
        x = (r % 2) == 0 ? 0 : offsetX / 2;
        for (var c = 0; c < cols; c++) {
            if (r % 2 == 1 && c == cols - 1) {
                continue;
            }
            x += offsetX;
            var ball = new this.ball(game, x, y, bulb_size / 2, 0xFFFFFF, false);
            this.balls.add(ball);
            god.gridBalls.add(ball);
        }

        if (r % 2 == 1) {
            //make two extra balls as 'bouncers' on the sides
            let ball1 = new this.ball(game, 0, y, bulb_size * 4, 0xFFFFFF, false, 'ball_large');
            let ball2 = new this.ball(game, game.width, y, bulb_size * 4, 0xFFFFFF, false, 'ball_large');
            this.balls.add(ball1);
            this.balls.add(ball2);
            god.gridBalls.add(ball1);
            god.gridBalls.add(ball2);
        }
    }


};


var grid = new Grid();