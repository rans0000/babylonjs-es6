/*jshint browser: true*/
/*jshint esnext: true*/

import { Vector3 } from "@babylonjs/core/Maths/math";

class BaseGameEntity{
    constructor(config){
        this.id = BaseGameEntity.nextId++;
        this.scale = config.scale || 1;
        this.boundigRadius = config.boundigRadius;
        this.tagged = config.tagged || false;
    }

    update(_timeInterval){
        throw({error_mssg: "Update method is virtual. Impliment class specific definition."});
    }

    addToScene(_scene){
        throw({error_mssg: "addToScene method is virtual. Impliment class specific definition."});
    }

    getId(){
        return this.id;
    }
    
    handleMessage(message){
        //@DESC: All subclasses can communicate using messages.
        throw({error_mssg: "render method is virtual. Impliment class specific definition."});
    }
}

BaseGameEntity.nextId = 0;

export default BaseGameEntity;