/*jshint browser: true*/
/*jshint esnext: true*/

import Launcher from './Launcher';

const game = new Launcher({fps: 60, slow: 0, canvasId: "canvasElement"});
game.start();