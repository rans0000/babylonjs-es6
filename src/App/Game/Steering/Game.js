/*jshint browser: true*/
/*jshint esnext: true*/

import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { GridMaterial } from "@babylonjs/materials/grid";
import "@babylonjs/core/Meshes/meshBuilder";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "pepjs";

import EntityManager from "../../Classes/GameEntity/EntityManager";
import MessageDispatcher from "../../Classes/Message/MessageDispatcher";
import Utils from "../../Utils/Utils";
import Vehicle from "./Data/Vehicle/Vehicle";
import SeekTarget from "./Data/SeekTarget/SeekTarget";

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
            const canvas = document.getElementById(options.canvasId);
            this.engine = new Engine(canvas);
            this.scene = new Scene(this.engine);
            let camera = new ArcRotateCamera("camera1", 1.5, 1.7, 11, new Vector3.Zero(), this.scene);
            camera.setPosition(new Vector3(0, 4, 10));
            camera.attachControl(canvas, true);
            let light = new HemisphericLight("light1", new Vector3(0, 1, 0), this.scene);
            light.intensity = 0.7;

            //@DESC: create basic ground
            let material = new GridMaterial("grid", this.scene);
            let ground = Mesh.CreateGround("ground1", 40, 40, 2, this.scene);
            ground.material = material;

            this.gameLoop = this.gameLoop.bind(this);
        }

        return instance;
    }

    start(){
        console.log("initializing game...");
        this.scene.debugLayer.show();

        //@DESC: create initial entities in the game.
        //@DESC: create seekingtarget
        //create a common vector to pass as seektarget position
        const seekVector = new Vector3(10, 2, 10);

        const seekTarget = new SeekTarget({
            position: seekVector.clone(),
            boundigRadius: 1,
            scene: this.scene
        });

        //@DESC: create vehicle
        const vehicle = new Vehicle({
            scale: 16,
            boundigRadius: 16,
            mass: 6,
            maxSpeed: 10,
            maxForce: 10,
            scene: this.scene
        });
        
        //@DESC: add entities to the game.
        EntityManager.registerEntity(vehicle, this.scene);
        EntityManager.registerEntity(seekTarget, this.scene);

        //@DESC: start game looop.
        this.gameLoop();
    }

    update(timeInterval){
        EntityManager.getGameEntityList().forEach(gameEntity => {
            gameEntity.update(timeInterval);
        });
    }

    gameLoop(){
        window.requestAnimationFrame(this.gameLoop);

        const now = window.performance.now();
        this.dt = this.dt + Math.min(1, (now - this.last) / 1000);
        while(this.dt > this.slowStep){
            this.dt = this.dt - this.slowStep;
            MessageDispatcher.dispatchQueuedMessages();

            this.update(this.step);
            ++this.ticks;
        }

        this.scene.render();
        this.last = now;
    }
}

export default Game;