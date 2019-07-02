/*jshint browser: true*/
/*jshint esnext: true*/

import Engine from '../../App/Engine/Engine.js';

class Main{
    constructor(canvasId){
        this.GEngine = new Engine(canvasId);
    }

    start(){
        console.log('starting...');
    }
}

export default Main;