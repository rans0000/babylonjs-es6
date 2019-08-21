/*jshint browser: true*/
/*jshint esnext: true*/

import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { PointerEventTypes } from "@babylonjs/core/Events/pointerEvents";

import BaseGameEntity from "../../../../Classes/GameEntity/BaseGameEntity";

class SeekTarget extends BaseGameEntity{
    constructor(config){
        super(config);
        this.position = config.position || new Vector3.Zero();
        this.mesh = null;
        //@DESC: A pointer to the world data enabling Vehicle to access walls, obstacles and other agents etc.
        this.gameWorld = config.gameWorld;
        this.scene = config.scene;
        this.scene.onPointerObservable.add(this.pointerHandler.bind(this));
    }

    pointerHandler(pointerInfo){
        const pointerType = pointerInfo.type;
        switch(pointerType) {
            case PointerEventTypes.POINTERPICK:
                if(pointerInfo.pickInfo.pickedMesh.id === "ground1"){
                    let posVector = pointerInfo.pickInfo.pickedPoint.clone();
                    posVector.y = 2;
                    this.position = posVector;
                }
                break;
            default:
                break;
        }
    }

    update(){
        if(this.mesh){
            this.mesh.position = this.position;
        }
    }

    addToScene(scene){
        let sphere = Mesh.CreateSphere("targetSphere1", 1, 1, this.scene);
        sphere.position.y = 2;
        this.mesh = sphere;
        this.mesh.convertToFlatShadedMesh();
    }
}

export default SeekTarget;