BasicGame.Preloader = function(game) {
};

BasicGame.Preloader.prototype = {

    preload: function(game) {

        game.time.advancedTiming = true;


        //L0AD

        game.load.image('ball','assets/ball.png');
        game.load.image('ball_large','assets/ball_large.png');
        game.load.image('title','assets/title.png');
        game.load.image('star','assets/star.png');
        game.load.image('star1','assets/star1.png');
        game.load.image('star2','assets/star2.png');
        game.load.image('star3','assets/star3.png');
        game.load.image('star4','assets/star4.png');

        game.load.image('peg','assets/peg.png');
        game.load.image('score','assets/score.png');
        game.load.image('please','assets/please.png');


        game.load.spritesheet('confetti','assets/confetti.png',8,8);
        game.load.spritesheet('jpparticles','assets/jpparticles.png',16,16);
        game.load.bitmapFont('font','assets/font.png','assets/font.xml');
        game.load.bitmapFont('textfnt','assets/text.png','assets/text.xml');
        game.load.bitmapFont('fontjp','assets/fontjp.png','assets/fontjp.xml');

       game.load.spritesheet('mute','assets/mute.png',128,128);

        game.load.audio('siren', ['assets/siren.mp3', 'assets/siren.ogg']);
       game.load.audio('pocketHit', ['assets/pockethit.mp3', 'assets/pockethit.ogg']);
       game.load.audio('bing', ['assets/bing.mp3', 'assets/bing.ogg']);


    },

    create: function(game) {

        game.state.start('PlayState');




    }

};
