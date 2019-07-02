/*jshint browser: true*/
/*jshint esnext: true*/

//import Engine from "../../App/Engine/Engine.js";
import SerialModuler from "./SerialModuler.js";
import Miner from "./Miner.js";

class Game{
    constructor(options){
        this.dt = 0;
        this.last = window.performance.now();
        this.slow = options.slow || 1;
        this.step = 1/options.fps;
        this.slowStep = this.slow * this.step;
        this.gameEntityList = [];
        
        this.gameLoop = this.gameLoop.bind(this);
    }

    start(){
        console.log("initializing game...");

        //@DESC: create initial entities in the game.
        let config = {initState: SerialModuler.EnterMineAndDigForNugget}
        const miner = new Miner(config);

        //@DESC: add entities to the game.
        this.addGameObjects([miner]);
        
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
        }
        
        this.render(this.dt/this.slow);
        
        this.last = now;
        window.requestAnimationFrame(this.gameLoop);
    }
}

export default Game;