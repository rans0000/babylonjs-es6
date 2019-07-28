/*jshint browser: true*/
/*jshint esnext: true*/

import Game from './Game';

const game = new Game({fps: 60, slow: 0, canvasId: "canvasElement"});
game.start();