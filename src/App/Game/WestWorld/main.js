/*jshint browser: true*/
/*jshint esnext: true*/

import Game from './Game.js';

const canvas = document.getElementById('canvasElement').getContext('2d');
const game = new Game({fps: 60, slow: 100, canvas});
game.start();