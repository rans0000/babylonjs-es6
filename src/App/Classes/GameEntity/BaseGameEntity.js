/*jshint browser: true*/
/*jshint esnext: true*/

import { Vector3 } from "@babylonjs/core/Maths/math";
import { ENTITY_TYPE } from "../../Utils/Constants";

class BaseGameEntity {
    constructor(config) {
        if (!config.name) {
            throw "Error: Unable to find mandatory field 'name' in created game entity.";
        }
        this.id = `${BaseGameEntity.nextId}`;
        this.name = `${config.name}`;
        this.type = config.type || ENTITY_TYPE.GEOMETRY;
        this.scale = config.scale || 1;
        this.boundigRadius = config.boundigRadius;
        this.tagged = config.tagged || false;
        this.scene = config.scene;
        BaseGameEntity.nextId++;
    }

    update(_timeInterval) {
        throw "Error: 'update' method is virtual. Impliment class specific definition.";
    }

    addToScene(_scene) {
        throw "Error: 'addToScene' method is virtual. Impliment class specific definition.";
    }

    getId() {
        return this.id;
    }

    handleMessage(message) {
        //@DESC: All subclasses can communicate using messages.
        throw "Error: 'render' method is virtual. Impliment class specific definition.";
    }
}

BaseGameEntity.nextId = 0;

export default BaseGameEntity;