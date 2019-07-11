/*jshint browser: true*/
/*jshint esnext: true*/

import Game from './Game';

const canvas = document.getElementById('canvasElement').getContext('2d');
const game = new Game({fps: 60, slow: 10, canvas});
game.start();