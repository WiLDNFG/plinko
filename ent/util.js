function makeParticleRain(game, x, y, amt) {
  const particules = 3;
  const _pArray = Array.apply(null, {length: particules}).map(Number.call, Number);

  emitter = game.add.emitter(x, y, amt);
  emitter.width = game.width;
  emitter.height = 1;
  emitter.makeParticles('confetti', _pArray);
  emitter.minParticleSpeed.set(0, 5);
  emitter.maxParticleSpeed.set(0, 5);

  emitter.gravity = 200;

  emitter.start(false, 2500, 0);
  return emitter;
}

function formatTime(s){

var min = "0" + Math.floor(s/60);
var seconds = "0" + (s-min * 60);
return min.substr(-1) + " m " + seconds.substr(-2) + " s";

}

function isNumberKey(evt) {
  god.calculateProfit(document.getElementById('range').value);
  const charCode = (evt.which) ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode != 46 && (charCode < 48 || charCode > 57))) { return false; }
  return true;
}

function isNumberKeyPayout(evt) {
  const charCode = (evt.which) ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode != 46 && (charCode < 48 || charCode > 57))) { return false; }


  // if enter is pressed
  if (charCode == 13) {
    god.calculateProfit(document.getElementById('payout').value);
    document.getElementById('range').value = document.getElementById('payout').value;
  }

  return true;
}

function payoutFocus() {
  const oldVal = document.getElementById('payout').value;
}
function payoutBlur() {
  god.calculateProfit(document.getElementById('payout').value);
  document.getElementById('range').value = document.getElementById('payout').value;
}


function makeJPEmitter(game, x, y, amt, width) {
  const particules = 2;
  const _pArray = Array.apply(null, {length: particules}).map(Number.call, Number)

  const emitter = game.add.emitter(x, y, amt);
  emitter.width = width;
  emitter.height = 1;
  emitter.makeParticles('jpparticles', _pArray);
  emitter.gravity = -500;
  emitter.setAlpha(0.2, 1, 50, Phaser.Easing.Linear.None, false);
  emitter.autoAlpha = true;
  emitter.start(true, 2000, null, 50);
  return emitter;
}

function makeText(game, x, y, string, bubbling) {
  const text = game.add.bitmapText(x, y, 'textfnt', string, 59);
  text.anchor.setTo(0.5, 0.5);

  if (bubbling) {
    const particules = 2;
    const _pArray = Array.apply(null, {length: particules}).map(Number.call, Number);

    text.emitter = game.add.emitter(x - 10, y + 90, 150);
    text.emitter.width = 300;
    text.emitter.height = 1;
    text.emitter.makeParticles('jpparticles', _pArray);
    text.emitter.gravity = 500;
    text.emitter.setAlpha(0.2, 1, 50, Phaser.Easing.Linear.None, false);
    text.emitter.autoAlpha = true;
    text.emitter.start(false, 1000, 0);
  }

  return text;
}
