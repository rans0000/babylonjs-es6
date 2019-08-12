/*jshint browser: true*/
/*jshint esnext: true*/

import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";

let instance = null;
class Game{
    constructor(options){
        if(!instance && options){
            instance = this;
            this._type = "Game";

            this.dt = 0;
            this.ticks = 0;
            this.last = window.performance.now();
            this.slow = options.slow || 1;
            this.step = 1/options.fps;
            this.slowStep = this.slow * this.step;

            //babylon
            this.canvas = document.getElementById(options.canvasId);
            this.engine = new Engine(this.canvas);
            this.scene = new Scene(this.engine);
        }

        return instance;
    }
}

export default Game;