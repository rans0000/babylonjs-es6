/*jshint browser: true*/
/*jshint esnext: true*/

import { Vector3 } from "@babylonjs/core/Maths/math";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { GridMaterial } from "@babylonjs/materials/grid";
import "@babylonjs/core/Meshes/meshBuilder";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "pepjs";


import Game from "../../Classes/Engine/Game";
import EntityManager from "../../Classes/GameEntity/EntityManager";
import MessageDispatcher from "../../Classes/Message/MessageDispatcher";
import Vehicle from "./Data/Vehicle/Vehicle";
import SeekTarget from "./Data/SeekTarget/SeekTarget";
import FlockUI from "./GUI/FlockUI";

let instance = null;
class Launcher{
    constructor(options){
        if(!instance && options){
            instance = this;
            this._type = "Launcher";

            this.game = new Game(options);
            const scene = this.game.scene;

            let camera = new ArcRotateCamera("camera1", 1.5, 1.7, 11, new Vector3.Zero(), scene);
            camera.setPosition(new Vector3(0, 4, 10));
            camera.attachControl(this.game.canvas, true);
            let light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
            light.intensity = 0.7;

            //@DESC: create basic ground
            let material = new GridMaterial("grid", scene);
            let ground = Mesh.CreateGround("ground1", 40, 40, 2, scene);
            ground.material = material;

            //@DESC: create gui for switching flock types.
            new FlockUI();

            this.gameLoop = this.gameLoop.bind(this);
        }

        return instance;
    }

    start(){
        console.log("initializing game...");
        const scene = this.game.scene;
        scene.debugLayer.show();

        //@DESC: create initial entities in the game.
        //@DESC: create seekingtarget
        //create a common vector to pass as seektarget position
        const seekVector = new Vector3(20, 2, 0);

        const seekTarget = new SeekTarget({
            position: seekVector.clone(),
            boundigRadius: 1,
            scene: scene
        });

        //@DESC: create vehicle
        const vehicle = new Vehicle({
            position: new Vector3(0, 2, 0),
            stoppingDistance: 10,
            scale: 16,
            boundigRadius: 16,
            mass: 6,
            maxSpeed: 10,
            maxForce: 60,
            scene: scene
        });

        //@DESC: add entities to the game.
        EntityManager.registerEntity(vehicle, scene);
        EntityManager.registerEntity(seekTarget, scene);

        //@DESC: start game looop.
        this.gameLoop();
    }

    update(timeInterval){
        EntityManager.getGameEntityList().forEach(gameEntity => {
            gameEntity.update(timeInterval);
        });
    }

    gameLoop(){
        const game = this.game;
        window.requestAnimationFrame(this.gameLoop);

        const now = window.performance.now();
        game.dt = game.dt + Math.min(1, (now - game.last) / 1000);
        while(game.dt > game.slowStep){
            game.dt = game.dt - game.slowStep;
            MessageDispatcher.dispatchQueuedMessages();

            this.update(game.step);
            ++game.ticks;
        }

        game.scene.render();
        game.last = now;
    }
}

export default Launcher;