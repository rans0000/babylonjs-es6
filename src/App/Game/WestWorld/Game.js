/*jshint browser: true*/
/*jshint esnext: true*/

import Miner from "../../Classes/Miner/Miner";
import Wife from "../../Classes/Wife/Wife";

let instance = null;
class Game{
    constructor(options){
        if(!instance){
            instance = this;
            this._type = 'Game';
            
            this.dt = 0;
            this.ticks = 0;
            this.last = window.performance.now();
            this.slow = options.slow || 1;
            this.step = 1/options.fps;
            this.slowStep = this.slow * this.step;
            this.gameEntityList = [];

            this.gameLoop = this.gameLoop.bind(this);
        }

        return instance;
    }

    start(){
        console.log("initializing game...");

        //@DESC: create initial entities in the game.
        const miner = new Miner();
        const wife = new Wife();

        //@DESC: add entities to the game.
        this.addGameObjects([miner, wife]);

        //@DESC: start game looop.
        this.gameLoop();
    }

    addGameObject(gameEntity){
        this.gameEntityList.push(gameEntity);
    }

    addGameObjects(gameEntityList){
        this.gameEntityList = [...this.gameEntityList, ...gameEntityList];
    }

    update(){
        //console.log("game is updating...");
        this.gameEntityList.forEach(gameEntity => {
            gameEntity.update();
        });
    }

    render(){
        //console.log("game is rendering...");
        this.gameEntityList.forEach(gameEntity => {
            gameEntity.render();
        });
    }

    gameLoop(){
        const now = window.performance.now();
        this.dt = this.dt + Math.min(1, (now - this.last) / 1000);
        while(this.dt > this.slowStep){
            this.dt = this.dt - this.slowStep;
            this.update(this.step);
            ++this.ticks;
        }

        this.render(this.dt/this.slow);

        this.last = now;
        window.requestAnimationFrame(this.gameLoop);
    }
}

export default Game;