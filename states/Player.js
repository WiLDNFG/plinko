

const Player = function () {
  this.game;

  this.game_speed;
  this.gray_sprite;
  this.select_color;

  this.bin_score_text;
  this.gridBalls;


  this.fiveChance;
  this.fiftyChance;
  this.hundredChance;

  this.siren;
  this.balance;
  this.points;
  this.jackpot;
  this.ball_emitter;


  this.balls;
  this.throwing_balls;
  this.pocketHit;
};

let chosen_bin;

let lastClickedSpriteId = null;
const sectionSprites = {};
const dropSectionsById = {
  a0: {
    0: { x: 22, y: 46, a: '1.76' }, 1: { x: 5, y: 26, a: '-1.52' }, 2: { x: 4, y: 24, a: '1.68' }, 3: { x: 19, y: 52, a: '-0.55' }, 4: { x: 11, y: 34, a: 2 }, 5: { x: 33, y: 47, a: '-1.14' }, 6: { x: 5, y: 36, a: '-1.23' }, 7: { x: 23, y: 44, a: '1.55' }, 8: { x: 26, y: 50, a: '-0.61' }, 9: { x: 2, y: 22, a: '0.85' }, 10: { x: 20, y: 30, a: '1.14' },
  },
  a1: {
    0: { x: 53, y: 34, a: '-0.52' }, 1: { x: 70, y: 48, a: '-1.35' }, 2: { x: 41, y: 24, a: '-0.35' }, 3: { x: 68, y: 50, a: '-0.38' }, 4: { x: 40, y: 43, a: '-0.71' }, 5: { x: 58, y: 52, a: '0.13' }, 6: { x: 38, y: 32, a: '-0.38' }, 7: { x: 39, y: 41, a: '0.09' }, 8: { x: 61, y: 41, a: '-0.39' }, 9: { x: 55, y: 33, a: '-2.00' }, 10: { x: 45, y: 32, a: '-0.79' },
  },
  a2: {
    0: { x: 78, y: 44, a: '0.07' }, 1: { x: 95, y: 24, a: '-0.85' }, 2: { x: 98, y: 33, a: '1.30' }, 3: { x: 87, y: 30, a: 2 }, 4: { x: 102, y: 26, a: '-0.29' }, 5: { x: 70, y: 42, a: '-1.57' }, 6: { x: 98, y: 48, a: '1.43' }, 7: { x: 81, y: 21, a: '-1.59' }, 8: { x: 83, y: 49, a: '-0.05' }, 9: { x: 72, y: 40, a: '-1.36' }, 10: { x: 95, y: 49, a: '1.22' },
  },
  a3: {
    0: { x: 128, y: 55, a: '-0.28' }, 1: { x: 136, y: 56, a: '-0.33' }, 2: { x: 117, y: 32, a: '-1.51' }, 3: { x: 136, y: 33, a: '1.67' }, 4: { x: 133, y: 37, a: '0.35' }, 5: { x: 113, y: 46, a: '1.68' }, 6: { x: 140, y: 23, a: '1.80' }, 7: { x: 128, y: 50, a: '-1.63' }, 8: { x: 117, y: 24, a: '-0.71' }, 9: { x: 131, y: 24, a: '1.45' }, 10: { x: 137, y: 28, a: '-1.90' },
  },
  a4: {
    0: { x: 158, y: 34, a: '-0.07' }, 1: { x: 144, y: 34, a: '-0.11' }, 2: { x: 141, y: 41, a: '1.49' }, 3: { x: 168, y: 48, a: '-1.19' }, 4: { x: 159, y: 40, a: '1.69' }, 5: { x: 162, y: 47, a: '-0.52' }, 6: { x: 149, y: 48, a: '1.62' }, 7: { x: 154, y: 26, a: '0.57' }, 8: { x: 148, y: 34, a: '1.94' }, 9: { x: 147, y: 22, a: '1.47' }, 10: { x: 173, y: 48, a: '-0.76' },
  },
  a5: {
    0: { x: 191, y: 46, a: '-0.11' }, 1: { x: 177, y: 47, a: '1.00' }, 2: { x: 210, y: 40, a: '-0.57' }, 3: { x: 206, y: 26, a: '0.44' }, 4: { x: 197, y: 40, a: '0.26' }, 5: { x: 195, y: 53, a: '0.86' }, 6: { x: 180, y: 32, a: '-0.27' }, 7: { x: 181, y: 21, a: '0.45' }, 8: { x: 203, y: 28, a: '0.44' }, 9: { x: 197, y: 49, a: '1.85' }, 10: { x: 203, y: 33, a: '-0.43' },
  },
  a6: {
    0: { x: 214, y: 30, a: '1.43' }, 1: { x: 245, y: 35, a: '-1.63' }, 2: { x: 245, y: 45, a: '-1.31' }, 3: { x: 234, y: 40, a: '1.04' }, 4: { x: 214, y: 37, a: '1.11' }, 5: { x: 210, y: 53, a: '1.27' }, 6: { x: 215, y: 29, a: '-1.80' }, 7: { x: 211, y: 31, a: '-1.24' }, 8: { x: 240, y: 23, a: '1.64' }, 9: { x: 239, y: 21, a: '0.63' }, 10: { x: 210, y: 54, a: '1.47' },
  },
  a7: {
    0: { x: 259, y: 43, a: '0.66' }, 1: { x: 259, y: 30, a: '-1.87' }, 2: { x: 258, y: 40, a: '-1.82' }, 3: { x: 260, y: 50, a: '1.82' }, 4: { x: 251, y: 39, a: '1.74' }, 5: { x: 252, y: 46, a: '0.71' }, 6: { x: 265, y: 48, a: '1.61' }, 7: { x: 263, y: 55, a: '-1.84' }, 8: { x: 245, y: 22, a: '0.38' }, 9: { x: 249, y: 49, a: '0.23' }, 10: { x: 246, y: 21, a: '-0.77' },
  },
  a8: {
    0: { x: 302, y: 35, a: '-1.93' }, 1: { x: 304, y: 56, a: '0.04' }, 2: { x: 288, y: 54, a: '1.76' }, 3: { x: 284, y: 42, a: '-0.49' }, 4: { x: 295, y: 39, a: '0.67' }, 5: { x: 302, y: 55, a: '1.71' }, 6: { x: 280, y: 35, a: '0.17' }, 7: { x: 288, y: 27, a: '-0.74' }, 8: { x: 298, y: 35, a: '-1.66' }, 9: { x: 285, y: 53, a: '-1.26' }, 10: { x: 289, y: 48, a: '-0.34' },
  },
  a9: {
    0: { x: 322, y: 24, a: '-0.61' }, 1: { x: 342, y: 29, a: '-0.62' }, 2: { x: 321, y: 27, a: '-1.73' }, 3: { x: 324, y: 55, a: '0.56' }, 4: { x: 325, y: 45, a: '-1.31' }, 5: { x: 343, y: 37, a: '0.67' }, 6: { x: 323, y: 48, a: '-1.72' }, 7: { x: 323, y: 45, a: '0.81' }, 8: { x: 322, y: 51, a: '-1.49' }, 9: { x: 321, y: 41, a: '-0.75' }, 10: { x: 324, y: 32, a: '-1.69' },
  },
  a10: {
    0: { x: 377, y: 44, a: '-1.81' }, 1: { x: 375, y: 39, a: '1.56' }, 2: { x: 365, y: 51, a: '1.05' }, 3: { x: 381, y: 55, a: '1.85' }, 4: { x: 356, y: 49, a: '-1.50' }, 5: { x: 360, y: 27, a: '1.74' }, 6: { x: 351, y: 29, a: '-0.20' }, 7: { x: 370, y: 26, a: '-0.38' }, 8: { x: 360, y: 30, a: '0.56' }, 9: { x: 352, y: 31, a: '0.62' }, 10: { x: 353, y: 29, a: '1.27' },
  },
  a11: {
    0: { x: 394, y: 40, a: '-0.96' }, 1: { x: 391, y: 55, a: '1.52' }, 2: { x: 399, y: 47, a: '1.70' }, 3: { x: 416, y: 48, a: '-0.06' }, 4: { x: 394, y: 26, a: '-0.66' }, 5: { x: 414, y: 48, a: '-1.37' }, 6: { x: 385, y: 54, a: '-0.72' }, 7: { x: 412, y: 40, a: '0.34' }, 8: { x: 418, y: 53, a: '1.94' }, 9: { x: 399, y: 43, a: '-0.55' }, 10: { x: 386, y: 21, a: '1.46' },
  },
  a12: {
    0: { x: 444, y: 38, a: '1.69' }, 1: { x: 452, y: 36, a: '0.13' }, 2: { x: 426, y: 25, a: '-1.72' }, 3: { x: 433, y: 48, a: '0.11' }, 4: { x: 434, y: 48, a: '-0.49' }, 5: { x: 430, y: 31, a: '-1.94' }, 6: { x: 440, y: 55, a: '-1.63' }, 7: { x: 446, y: 46, a: '0.10' }, 8: { x: 429, y: 47, a: '0.08' }, 9: { x: 420, y: 41, a: '-0.16' }, 10: { x: 426, y: 41, a: '1.08' },
  },
  a13: {
    0: { x: 469, y: 26, a: '-1.85' }, 1: { x: 479, y: 55, a: '0.50' }, 2: { x: 458, y: 32, a: '-1.57' }, 3: { x: 478, y: 48, a: '1.05' }, 4: { x: 466, y: 48, a: '0.74' }, 5: { x: 488, y: 56, a: '1.21' }, 6: { x: 457, y: 36, a: '-1.61' }, 7: { x: 483, y: 53, a: '1.41' }, 8: { x: 483, y: 33, a: '0.92' }, 9: { x: 465, y: 29, a: '-1.17' }, 10: { x: 456, y: 34, a: '0.83' },
  },
  a14: {
    0: { x: 506, y: 21, a: '0.24' }, 1: { x: 523, y: 33, a: '1.69' }, 2: { x: 505, y: 44, a: '-0.56' }, 3: { x: 515, y: 32, a: '0.79' }, 4: { x: 493, y: 48, a: '0.89' }, 5: { x: 505, y: 55, a: '-0.74' }, 6: { x: 517, y: 34, a: '-0.39' }, 7: { x: 491, y: 30, a: '1.45' }, 8: { x: 519, y: 56, a: '-1.55' }, 9: { x: 491, y: 36, a: '0.73' }, 10: { x: 491, y: 52, a: '-1.95' },
  },
  a15: {
    0: { x: 535, y: 50, a: '0.53' }, 1: { x: 555, y: 37, a: '-0.87' }, 2: { x: 532, y: 42, a: '1.99' }, 3: { x: 535, y: 53, a: '0.12' }, 4: { x: 527, y: 32, a: '0.49' }, 5: { x: 555, y: 32, a: '1.33' }, 6: { x: 531, y: 37, a: '0.76' }, 7: { x: 554, y: 53, a: '-1.97' }, 8: { x: 551, y: 45, a: '0.47' }, 9: { x: 544, y: 46, a: '-1.23' }, 10: { x: 545, y: 48, a: '0.62' },
  },
  a16: {
    0: { x: 562, y: 32, a: '0.75' }, 1: { x: 595, y: 45, a: '1.26' }, 2: { x: 587, y: 49, a: '-0.66' }, 3: { x: 568, y: 40, a: '-1.98' }, 4: { x: 578, y: 35, a: '-1.17' }, 5: { x: 573, y: 44, a: '0.53' }, 6: { x: 562, y: 50, a: '0.60' }, 7: { x: 594, y: 40, a: '0.50' }, 8: { x: 595, y: 25, a: '-1.57' }, 9: { x: 583, y: 25, a: '-0.90' }, 10: { x: 569, y: 34, a: '-1.50' },
  },
  b0: {
    0: { x: 1, y: 89, a: '-1.15' }, 1: { x: 18, y: 58, a: '-0.14' }, 2: { x: 3, y: 60, a: '-1.40' }, 3: { x: 33, y: 60, a: '-0.95' }, 4: { x: 15, y: 68, a: '0.91' }, 5: { x: 32, y: 61, a: '-1.46' }, 6: { x: 3, y: 74, a: '1.16' }, 7: { x: 28, y: 56, a: '-1.27' }, 8: { x: 20, y: 75, a: '0.71' }, 9: { x: 11, y: 67, a: '1.55' }, 10: { x: 0, y: 56, a: '-0.14' },
  },
  b1: {
    0: { x: 60, y: 88, a: '1.55' }, 1: { x: 44, y: 63, a: '-0.83' }, 2: { x: 46, y: 65, a: '1.32' }, 3: { x: 44, y: 63, a: '-1.61' }, 4: { x: 55, y: 59, a: '1.55' }, 5: { x: 50, y: 73, a: '-1.34' }, 6: { x: 52, y: 68, a: '-0.92' }, 7: { x: 56, y: 73, a: '-1.85' }, 8: { x: 50, y: 67, a: '1.45' }, 9: { x: 60, y: 58, a: '-1.65' }, 10: { x: 66, y: 91, a: '1.83' },
  },
  b2: {
    0: { x: 85, y: 75, a: '-1.16' }, 1: { x: 74, y: 61, a: '0.41' }, 2: { x: 70, y: 91, a: '-1.99' }, 3: { x: 83, y: 85, a: '-0.79' }, 4: { x: 76, y: 70, a: '1.53' }, 5: { x: 94, y: 80, a: '-0.01' }, 6: { x: 96, y: 67, a: '1.37' }, 7: { x: 102, y: 86, a: '1.08' }, 8: { x: 70, y: 75, a: '-0.03' }, 9: { x: 92, y: 77, a: '0.21' }, 10: { x: 84, y: 84, a: '-1.87' },
  },
  b3: {
    0: { x: 125, y: 62, a: '0.23' }, 1: { x: 117, y: 65, a: '-0.13' }, 2: { x: 130, y: 64, a: '-1.76' }, 3: { x: 112, y: 70, a: '0.98' }, 4: { x: 129, y: 84, a: '-0.42' }, 5: { x: 136, y: 56, a: '-1.53' }, 6: { x: 105, y: 69, a: '0.01' }, 7: { x: 109, y: 70, a: '0.78' }, 8: { x: 112, y: 72, a: '1.80' }, 9: { x: 105, y: 70, a: '-0.98' }, 10: { x: 135, y: 88, a: '-0.11' },
  },
  b4: {
    0: { x: 144, y: 80, a: '-0.84' }, 1: { x: 145, y: 90, a: '-1.28' }, 2: { x: 147, y: 81, a: '1.63' }, 3: { x: 155, y: 81, a: '1.39' }, 4: { x: 164, y: 81, a: '-1.49' }, 5: { x: 163, y: 61, a: '-1.29' }, 6: { x: 158, y: 56, a: '1.14' }, 7: { x: 173, y: 61, a: '1.95' }, 8: { x: 154, y: 87, a: '0.28' }, 9: { x: 163, y: 69, a: '0.77' }, 10: { x: 163, y: 83, a: '-0.10' },
  },
  b5: {
    0: { x: 176, y: 83, a: '0.70' }, 1: { x: 182, y: 60, a: '-0.17' }, 2: { x: 182, y: 87, a: '1.04' }, 3: { x: 200, y: 63, a: '1.50' }, 4: { x: 196, y: 85, a: '-0.00' }, 5: { x: 175, y: 71, a: '0.32' }, 6: { x: 193, y: 87, a: '1.65' }, 7: { x: 175, y: 73, a: '0.04' }, 8: { x: 189, y: 86, a: '0.87' }, 9: { x: 185, y: 60, a: '-0.87' }, 10: { x: 186, y: 79, a: '-0.60' },
  },
  b6: {
    0: { x: 213, y: 56, a: '-0.26' }, 1: { x: 227, y: 87, a: '1.55' }, 2: { x: 225, y: 90, a: '-1.67' }, 3: { x: 240, y: 65, a: '-0.79' }, 4: { x: 227, y: 71, a: '-1.14' }, 5: { x: 223, y: 67, a: '1.83' }, 6: { x: 236, y: 82, a: '1.36' }, 7: { x: 219, y: 85, a: '0.57' }, 8: { x: 221, y: 81, a: '-1.57' }, 9: { x: 217, y: 91, a: '-0.17' }, 10: { x: 218, y: 89, a: '-1.46' },
  },
  b7: {
    0: { x: 264, y: 75, a: '0.64' }, 1: { x: 262, y: 80, a: '1.42' }, 2: { x: 264, y: 58, a: '-1.42' }, 3: { x: 271, y: 72, a: '0.24' }, 4: { x: 273, y: 84, a: '-1.37' }, 5: { x: 252, y: 73, a: '1.21' }, 6: { x: 253, y: 62, a: '1.73' }, 7: { x: 269, y: 66, a: '0.16' }, 8: { x: 267, y: 69, a: '1.92' }, 9: { x: 279, y: 65, a: '-0.63' }, 10: { x: 275, y: 63, a: '-0.22' },
  },
  b8: {
    0: { x: 309, y: 74, a: '0.08' }, 1: { x: 285, y: 80, a: '-1.46' }, 2: { x: 285, y: 79, a: '-1.41' }, 3: { x: 301, y: 66, a: '-0.68' }, 4: { x: 312, y: 81, a: '-0.49' }, 5: { x: 292, y: 58, a: '-1.66' }, 6: { x: 283, y: 58, a: '-1.56' }, 7: { x: 292, y: 79, a: '-1.19' }, 8: { x: 292, y: 66, a: '-1.38' }, 9: { x: 315, y: 57, a: '1.63' }, 10: { x: 303, y: 72, a: '-1.38' },
  },
  b9: {
    0: { x: 345, y: 63, a: '0.60' }, 1: { x: 337, y: 66, a: '-0.87' }, 2: { x: 320, y: 69, a: '1.63' }, 3: { x: 344, y: 60, a: '-0.25' }, 4: { x: 350, y: 77, a: '1.28' }, 5: { x: 327, y: 90, a: '1.32' }, 6: { x: 316, y: 61, a: '0.14' }, 7: { x: 315, y: 69, a: '-1.59' }, 8: { x: 321, y: 68, a: '-1.06' }, 9: { x: 317, y: 77, a: '-0.86' }, 10: { x: 333, y: 65, a: '-1.66' },
  },
  b10: {
    0: { x: 357, y: 71, a: '0.84' }, 1: { x: 364, y: 56, a: '-0.79' }, 2: { x: 357, y: 63, a: '-1.17' }, 3: { x: 355, y: 62, a: '1.31' }, 4: { x: 370, y: 59, a: '-0.40' }, 5: { x: 366, y: 70, a: '-0.33' }, 6: { x: 352, y: 67, a: '-1.33' }, 7: { x: 373, y: 76, a: '-1.17' }, 8: { x: 363, y: 87, a: '-1.25' }, 9: { x: 355, y: 57, a: '-1.67' }, 10: { x: 379, y: 65, a: '-1.58' },
  },
  b11: {
    0: { x: 392, y: 82, a: '-0.32' }, 1: { x: 389, y: 79, a: '0.05' }, 2: { x: 407, y: 70, a: '1.63' }, 3: { x: 396, y: 60, a: '-1.29' }, 4: { x: 417, y: 62, a: '0.16' }, 5: { x: 392, y: 65, a: '1.17' }, 6: { x: 386, y: 71, a: '1.80' }, 7: { x: 406, y: 57, a: '-0.54' }, 8: { x: 396, y: 73, a: '0.09' }, 9: { x: 394, y: 85, a: '-1.43' }, 10: { x: 385, y: 89, a: '0.67' },
  },
  b12: {
    0: { x: 444, y: 56, a: '-0.45' }, 1: { x: 452, y: 88, a: '-1.95' }, 2: { x: 432, y: 85, a: '0.09' }, 3: { x: 432, y: 68, a: '-0.01' }, 4: { x: 440, y: 72, a: '-1.69' }, 5: { x: 426, y: 90, a: '1.45' }, 6: { x: 453, y: 72, a: '1.50' }, 7: { x: 422, y: 65, a: '-0.15' }, 8: { x: 455, y: 72, a: '0.42' }, 9: { x: 428, y: 84, a: '1.42' }, 10: { x: 425, y: 64, a: '0.56' },
  },
  b13: {
    0: { x: 471, y: 88, a: '0.80' }, 1: { x: 473, y: 85, a: '-1.42' }, 2: { x: 460, y: 58, a: '0.80' }, 3: { x: 472, y: 62, a: '0.21' }, 4: { x: 478, y: 58, a: '0.52' }, 5: { x: 458, y: 68, a: '1.53' }, 6: { x: 466, y: 64, a: '-0.89' }, 7: { x: 483, y: 64, a: '-0.77' }, 8: { x: 486, y: 67, a: '-0.38' }, 9: { x: 488, y: 63, a: '0.20' }, 10: { x: 477, y: 79, a: '1.97' },
  },
  b14: {
    0: { x: 508, y: 82, a: '-1.95' }, 1: { x: 519, y: 81, a: '-1.90' }, 2: { x: 503, y: 90, a: '-0.93' }, 3: { x: 494, y: 91, a: '-1.17' }, 4: { x: 516, y: 65, a: '1.83' }, 5: { x: 503, y: 77, a: '0.98' }, 6: { x: 524, y: 87, a: '0.32' }, 7: { x: 511, y: 56, a: '1.79' }, 8: { x: 497, y: 70, a: '1.24' }, 9: { x: 508, y: 58, a: '0.35' }, 10: { x: 517, y: 72, a: '-0.02' },
  },
  b15: {
    0: { x: 554, y: 68, a: '-1.36' }, 1: { x: 551, y: 76, a: '0.53' }, 2: { x: 538, y: 83, a: '0.29' }, 3: { x: 536, y: 76, a: '-0.51' }, 4: { x: 552, y: 81, a: '1.38' }, 5: { x: 545, y: 86, a: '0.15' }, 6: { x: 528, y: 59, a: '0.90' }, 7: { x: 546, y: 89, a: '1.47' }, 8: { x: 539, y: 66, a: '-0.05' }, 9: { x: 552, y: 74, a: '-0.91' }, 10: { x: 533, y: 61, a: '0.76' },
  },
  b16: {
    0: { x: 594, y: 75, a: '-1.33' }, 1: { x: 566, y: 83, a: '1.81' }, 2: { x: 565, y: 89, a: '0.83' }, 3: { x: 561, y: 75, a: '-0.72' }, 4: { x: 595, y: 61, a: '-0.77' }, 5: { x: 563, y: 91, a: '1.07' }, 6: { x: 570, y: 57, a: '0.03' }, 7: { x: 585, y: 56, a: '-0.46' }, 8: { x: 560, y: 60, a: '1.28' }, 9: { x: 571, y: 72, a: '1.75' }, 10: { x: 571, y: 63, a: '-1.15' },
  },
};
const foundAllDropsForSection = {};


// grid class was giving me issues on mobile so it will be merged with player class


Player.prototype.ball = function (game, x, y, r, c, movable, spriteName, angularVelocity) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.c = c;
  this.movable = movable;
  this.spriteName = spriteName || 'ball';

  const ball_sprite = game.add.sprite(this.x, this.y, this.spriteName);
  ball_sprite.anchor.setTo(0.5, 0.5);
  ball_sprite.tint = this.c;

  game.physics.p2.enable(ball_sprite, false);

  if (this.movable) {
    ball_sprite.body.collideWorldBounds = true;
    ball_sprite.body.static = false;
    ball_sprite.body.angularVelocity = angularVelocity || 0;
    // ball_sprite.anchor.setTo(0.5, 1);
    ball_sprite.scale.setTo(1.5, 1.5);
  } else {
    ball_sprite.body.static = true;
    if (this.spriteName == 'ball') {
      ball_sprite.scale.setTo(0.5, 0.5);
    }
    // ball_sprite.body.bounce.y = 1;
    // ball_sprite.body.bounce.x = 1;
  }

  ball_sprite.body.setCircle(r);

  return ball_sprite;
};



Player.prototype.create_grid = function (game, rows, cols) {
  this.game = game;
  const bulb_size = 8;
  // cols is the number of balls/pegs in the first row which should match the number of pockets
  const offsetX = (game.width) / (cols + 1);
  const offsetY = (game.height - (bulb_size * rows)) / (rows + 2);
  let x = 0;
  let y = offsetY;
  for (let r = 0; r < rows; r++) {
    y += offsetY;
    x = (r % 2) == 0 ? 0 : offsetX / 2;
    for (let c = 0; c < cols; c++) {
      if (r % 2 == 1 && c == cols - 1) {
        continue;
      }
      x += offsetX;
      const ball = new this.ball(game, x, y, bulb_size / 2, 0xFFFFFF, false);
      this.balls.add(ball);
      this.gridBalls.add(ball);
    }

    if (r % 2 == 1) {
      // make two extra balls as 'bouncers' on the sides
      const ball1 = new this.ball(game, 0, y, bulb_size * 4, 0xFFFFFF, false, 'ball_large');
      const ball2 = new this.ball(game, game.width, y, bulb_size * 4, 0xFFFFFF, false, 'ball_large');
      this.balls.add(ball1);
      this.balls.add(ball2);
      this.gridBalls.add(ball1);
      this.gridBalls.add(ball2);
      
    }
  }
};


Player.prototype.addClickSections = function (game) {
  var size = 35;
  var x = 0;
  var y = 21;
  var rows = ['a','b'];
  const sectionIds = [];
  for(var r = 0; r < rows.length; r++){
    var row = rows[r];
    for(var col = 0; col < 17; col++){
      var id = row + col;
      var section = game.add.sprite(x, y);
      section.width = size;
      section.height = size;
      section.data = id;
      if(customConfig.dropDev) {
        section.tint = Math.random() * 0xFFFFFF;
      } else {
        section.tint = 0x6A686B;
      }
      section.inputEnabled = true;
      section.events.onInputUp.add(this.mouseClicked, this);
      //this.gray_sprite.addChild(section);
      sectionSprites[id] = section;

      this.sectionIds = sectionIds;
      sectionIds.push(section.data);
      x += size;
    }
    x = 0;
    y += size;
  }
};


// Player.prototype.addClickSections = function (game) {
//   const size = game.width / 16;
//   let x = 0;
//   let y = 21;
//   const rows = ['a', 'b'];
//   const sectionIds = [];
//   for (let r = 0; r < rows.length; r++) {
//     const row = rows[r];
//     for (let col = 0; col < 17; col++) {
//       const id = row + col;
//       const section = game.add.sprite(x, y);
//       section.width = size;
//       section.height = size;
//       section.data = id;

//       if (customConfig.dropDev) {
//         section.tint = Math.random() * 0xFFFFFF;
//       } else {
//         section.tint = 0x6A686B;
//       }
//       sectionSprites[id] = section;


//       this.sectionIds = sectionIds;
//       sectionIds.push(section.data);
//       x += size;
//     }
//     x = 0;
//     y += size;
//   }
// };



Player.prototype.mute = function (button) {
  this.game.sound.mute = this.game.sound.mute ? false : true;


  button.childNodes[1].src = this.game.sound.mute ? "assets/mutem.png" : "assets/mute.png";


//button.frame = button.frame ? 0 : 1;

};


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

/**
 * This function is used to automatically figure out which drop configurations get the ball to which slot for each section of the click area
 */
 Player.prototype.chooseRandomDrop = function () {
   for (const id in dropSectionsById) {
     for (let t = 0; t < 11; t++) {
       if (!dropSectionsById[id][t]) {
         const sprite = sectionSprites[id];
         const dropConfig = { x: getRandomIntInclusive(sprite.x, sprite.x + 35), y: getRandomIntInclusive(sprite.y, sprite.y + 35), a: getRandomArbitrary(-2, 2) };
         console.log('trying for:', `${id}:${t}`, dropConfig);
         return this.dropBall(sprite, dropConfig);
       }
     }
     if (!foundAllDropsForSection[id]) {
       console.log('Done choosing drops for:', id, JSON.stringify(dropSectionsById[id]));
       foundAllDropsForSection[id] = true;
     }
   }
   console.log('Done choosing all drops:', JSON.stringify(dropSectionsById));
 };

 Player.prototype.mouseClicked = function (sprite, pointer, isOver) {
   this.select_color = 0x03571d;
   if (!this.select_color) {
     alert('Choose a color first!');
   } else if (this.throwing_balls.countLiving() > 0) {
     alert('You cannot have more than one ball out at a time!');
   } else {
     const angularVelocity = 0;
     const dropConfig = { x: sprite.x, y: sprite.y, a: angularVelocity };
     console.log(dropConfig);
     console.log(sprite.data);

     this.chooseSlot(null, sprite, pointer);
   }
 };

 Player.prototype.chooseSlot = function (button, sprite, defaultDropConfig) {
   if (this.balance > 0) {
     if (this.throwing_balls.countLiving() > 0) {
       alert('You cannot have more than one ball out at a time!');
     } else {
       this.bet = {};


       this.bet.isJP = false;

       const nr = this.game.rnd.integerInRange(0, 100);
       var chosenSlot = null;

       if (nr < this.fiveChance) {
        // hit 5 pocket
        chosenSlot = this.fiveSlots[this.game.rnd.integerInRange(0, 1)];
        this.bet.isWin = true;
      }
      if (nr >= this.fiveChance && nr <= this.fi) {
        // hit 50 pocket

        chosenSlot = this.fiftySlots[this.game.rnd.integerInRange(0, 1)];
        this.bet.isWin = true;
      }
      if (nr >= this.fiveChance && nr >= this.fi && nr <= this.fix) {
        // hit 50 pocket
        chosenSlot = this.hundredSlots[this.game.rnd.integerInRange(0, 1)];
        this.bet.isWin = true;
      }

      if (nr >= this.fiveChance && nr >= this.fi && nr >= this.fix) {
        chosenSlot = this.loseSlots[this.game.rnd.integerInRange(0, 3)];
        this.bet.isWin = true;
      }

      if (this.bet.isJP) {
        chosenSlot = 5;
      }


      this.bet.amount = 1;
    }

    if(button){

      if (button == 'button1') {
        this.chosenSelection = this.sectionIds[this.game.rnd.integerInRange(0, 1)];
      } else
      if (button == 'button2') {
        this.chosenSelection = this.sectionIds[this.game.rnd.integerInRange(2, 3)];
      } else
      if (button == 'button3') {
        this.chosenSelection = this.sectionIds[this.game.rnd.integerInRange(3, 4)];
      } else
      if (button == 'button4') {
        this.chosenSelection = this.sectionIds[this.game.rnd.integerInRange(4, 5)];
      }else
      if (button == 'button5') {

        this.chosenSelection = this.sectionIds[this.game.rnd.integerInRange(6, 7)];
      }else
      if (button == 'button6') {

        this.chosenSelection = this.sectionIds[this.game.rnd.integerInRange(8, 11)];
      }else
      if (button == 'button7') {

        this.chosenSelection = this.sectionIds[this.game.rnd.integerInRange(12,14)];
      }else
      if (button == 'button8') {

        this.chosenSelection = this.sectionIds[this.game.rnd.integerInRange(15, 16)];
      }

      const angularVelocity = 0;
      var dropConfig = { x: 10, y: 10, a: angularVelocity };
      var dropConfig = defaultDropConfig;
      if (dropSectionsById[this.chosenSelection][chosenSlot]) {
        dropConfig = dropSectionsById[this.chosenSelection][chosenSlot];
        console.log('Slot Chosen:', chosenSlot, 'Drop Config found for section:', this.chosenSelection, dropConfig);
        this.balance -= 1;
        this.dropBall(sprite, dropConfig);
        button = null;
      }


    }
    


  }else {
    alert('Your balance is empty!');
  }

};

Player.prototype.update = function () {
// console.log(this.balance.toFixed(8));

document.getElementById('balls').innerHTML = this.balance;

document.getElementById('points').innerHTML = this.points;
//todo: optimize this
 // console.log(this.gameTimer);
if(this.gameTimer.running === true && this.gameTimer.ms >= 0){
  document.getElementById('gTimer').innerHTML = formatTime(Math.round((this.gameTimerEvent.delay - this.gameTimer.ms )/1000));

}


};


Player.prototype.flash = function (ball) {
//            ball.sprite.tint = Math.random() * 0xFFFFFF;

god.ball_emitter.x = ball.x;
god.ball_emitter.y = ball.y;

god.ball_emitter.start(true, 2000, null, 5);
god.bing.play();
};

Player.prototype.dropBall = function (sprite, dropConfig) {
  lastClickedSpriteId = this.chosenSelection;
  this.celebrating = false;
  const ballColor = 0x00ff00;
  const ball = new this.ball(this.game, dropConfig.x, dropConfig.y, 16, ballColor, true, 'ball', dropConfig.a);

  if(this.gameTimer.running === false){
//this.gameTimerEvent.delay = Phaser.Timer.MINUTE*this.TIMER_MINUTES + Phaser.Timer.SECOND*this.TIMER_SECONDS;

this.points = 0; 
this.balance = 49;  

this.gameTimerEvent = this.gameTimer.add(Phaser.Timer.MINUTE*this.TIMER_MINUTES + Phaser.Timer.SECOND*this.TIMER_SECONDS,this.endTimer,this);
this.gameTimer.start();



}

this.gridBalls.forEach(function (gr) {
  ball.body.createBodyCallback(gr, god.flash, this);
});

const me = this;
const pocketHit = function (body1, body2) {
  god.pocketHit.play(false);
    // if we are developing the pre-determined drop sections, keep automatically dropping again
    // TODO: we might want to optimize for time to slot so even if it"s already been hit it could check for the time it took to get there and overwrite if faster?
    if (customConfig.dropDev) {
      if (!dropSectionsById[lastClickedSpriteId][body2.sprite.data.id]) {
        dropSectionsById[lastClickedSpriteId][body2.sprite.data.id] = dropConfig;
      } else {
        console.log('Pocket Already Hit:', body2.sprite.data.id, dropConfig);
      }
      // go again until we find them all
      me.chooseRandomDrop();
    }
    god.kill_ball(me.game, body2, body1);


  };


  // create a Body impact specific callback.
  p.bin_sprites.forEach(function (binSprite) {
    ball.body.createBodyCallback(binSprite, pocketHit, this);
  });


  this.throwing_balls.add(ball);
};

Player.prototype.endTimer = function(){

  this.gameTimer.stop();
  this.gameTimer.running = false;
  document.getElementById('gTimer').innerHTML = formatTime(0);

//this.gameTimerEvent.delay = Phaser.Timer.MINUTE*this.TIMER_MINUTES + Phaser.Timer.SECOND*this.TIMER_SECONDS;
};

Player.prototype.create = function (game) {
  this.game = game;
  this.bin_score_text = [];
  this.game_speed = 400;
  this.select_color = 0x03571d; 
  this.TIMER_MINUTES = 2; 
  this.TIMER_SECONDS = 0;

  this.addClickSections(game);
  this.celebrating = false;

  // document.getElementById("muteImage").src = "assets/mute.png" ;
    game.time.events.loop(Phaser.Timer.SECOND, function(){
      console.log('test');
    }, this);

  this.gameTimer = game.time.create();
  this.gameTimer.autoDestroy = false;
  this.gameTimerEvent = this.gameTimer.add(Phaser.Timer.MINUTE*this.TIMER_MINUTES + Phaser.Timer.SECOND*this.TIMER_SECONDS,this.endTimer,this);
  this.gameTimerEvent.autoDestroy = false;
  document.getElementById('gTimer').innerHTML = formatTime(Math.round((this.gameTimerEvent.delay - this.gameTimer.ms)/1000));


  this.gridBalls = game.add.group();
  this.over = false;
  this.jackpot = 1400;
  this.points = 0;
  this.balance = 50;
  // this.muteSprites = ["assets/mute.png","assets/mutem.png"];
  this.fiveChance = 20;
  this.fiftyChance = 2;
  this.hundredChance = 1;
  this.fi = this.fiveChance + this.fiftyChance;
  this.fix = this.fiveChance + this.fiftyChance + this.hundredChance;


  this.fiveSlots = [4, 6];
  this.fiftySlots = [2, 8];
  this.hundredSlots = [0, 10];
  this.loseSlots = [1, 3, 7, 9];
  this.siren = game.add.audio('siren');
  this.bing = game.add.audio('bing');

  this.ball_emitter = game.add.emitter(game.world.centerX, 200, 200);
  this.ball_emitter.makeParticles(['star', 'star1', 'star2', 'star3', 'star4']);


  this.balls = game.add.group();
  this.throwing_balls = game.add.group();
  this.pocketHit = game.add.audio('pocketHit');
};


Player.prototype.create_tween_sequence = function (game, xArray, yArray, sprite) {
  const tween = game.add.tween(sprite);
  tween.to({ x: xArray, y: yArray }, this.game_speed, 'Linear');
  tween.start();
};


Player.prototype.kill_ball = function (game, binBody, ballBody) {
  const bin = binBody.sprite.data;
  ballBody.removeNextStep = true;
  this.throwing_balls.remove(ballBody.sprite, true);
  const text = game.add.bitmapText(binBody.x, binBody.y, 'font', bin.low.toString(), 28);
  text.tint = 0xFF0000;
  text.anchor.setTo(0.5, 0.5);


  // bet calc
  if (this.bet.isWin && !this.bet.isJP) {
    this.points += bin.low;
  }

  if (this.bet.isJP) {
    this.points += this.jackpot;
    this.bet.isJP = false;
    this.jackpot = 0;
    this.endTimer();
  }

  const tween = game.add.tween(text)
  .to({ x: binBody.x, y: binBody.y - 90 }, 800, 'Linear');

  tween.start();

  tween.onComplete.add(() => {
    const tween = game.add.tween(text.scale)
    .to({ y: 0, x: 2 }, 200, 'Linear');
    tween.start();

    const color_tween = game.add.tween(text)
    .to({ tint: 0xFFFFFff }, 200, 'Linear');
    color_tween.start();
  }, this);

  if (bin.isJP) {
    this.siren.fadeIn(1000);
    this.celebrating = true;
    const youjustWon = makeText(game, game.width / 2, game.height / 2, 'CONGRATULATIONS\n\t\t\t\t\t\t\t\tYou hit the \n\t\t\t\t\t\t\t\tJACKPOT', true);
    youjustWon.alpha = 0;
    youjustWon.emitter.on = false;
    const txttween = game.add.tween(youjustWon).to({ alpha: 1 }, 2000, 'Linear', true);
    txttween.onComplete.add(() => {
      youjustWon.emitter.on = true;
    });
    const particleRain = makeParticleRain(game, game.width / 2, 0, 300);
    const jpEmitter = makeJPEmitter(game, binBody.sprite.x, binBody.sprite.y + (binBody.sprite.height / 2), 50);

    game.time.events.loop(Phaser.Timer.SECOND, function () {
      if (!this.celebrating) {
        game.add.tween(youjustWon).to({ alpha: 0 }, 2000, 'Linear', true);
        particleRain.on = false;
        jpEmitter.on = false;
        this.siren.fadeOut(2000);
        youjustWon.emitter.on = false;
      }
    }, this);
  }

  if(this.gameTimer.running === false && !this.bet.isJP){

//Time is up! Pop up retry prompt
var oldPoints = this.points; //store amount of points before returning them to 0

document.getElementById('gTimer').innerHTML = formatTime(0);
// do gameover stuff here

}

};

Player.prototype.decide_text = function (texts) {
  let text_index = 0;

  for (var i = 0; i < texts.length; i++) {
    for (var i = 0; i < p.bin_sprites.length; i++) {
      text_index = i;
      texts[i].text = p.score_bins[text_index].low.toString();
    }
  }
};


var god = new Player();
