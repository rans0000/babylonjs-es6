/*jshint browser: true*/
/*jshint esnext: true*/

import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { PointerEventTypes } from "@babylonjs/core/Events/pointerEvents";
import { KeyboardEventTypes } from "@babylonjs/core/Events/keyboardEvents";

import BaseGameEntity from "../../../../Classes/GameEntity/BaseGameEntity";
import MessageDispatcher from "../../../../Classes/Message/MessageDispatcher";
import EntityManager from "../../../../Classes/GameEntity/EntityManager";
import ControlledMovement from "../../../../Classes/SteeringBehaviours/ControlledMovement";
import { MSG_TYPE, ENTITY_MODES, ENTITY_TYPE } from "../../../../Utils/Constants";

const INNER_BOUND = new Vector3(-20, 2, -20);
const OUTER_BOUND = new Vector3(20, 2, 20);

class SeekTarget extends BaseGameEntity {
    constructor(config) {
        super(config);
        this.position = config.position || new Vector3.Zero();
        this.mesh = null;
        this.mass = config.mass || 6;
        this.velocity = config.velocity || new Vector3.Zero();
        //@DESC: Maximum speed at which this entity may travel.
        this.maxSpeed = config.maxSpeed || 1;
        //@DESC: Maximum force this entity can produce to power itself (ex: rocket thrust).
        this.maxForce = config.maxForce || 1;
        //@DESC: The maximum rate (radians per second) at which this entity can rotate.
        this.maxTurnRate = config.maxTurnRate || (Math.PI / 2);
        //@DESC: A pointer to the world data enabling Vehicle to access walls, obstacles and other agents etc.
        this.gameWorld = config.gameWorld;
        this.controlledMovement = new ControlledMovement(this);
        this.scene = config.scene;
        this.moveMode = config.moveMode || ENTITY_MODES.SEEKER_JUMP_MODE;
        this.scene.onPointerObservable.add(this.pointerHandler.bind(this));
        this.scene.onKeyboardObservable.add(this.keyboardObservable.bind(this));
    }

    update(timeInterval) {
        if (this.moveMode === ENTITY_MODES.SEEKER_RUN_MODE) {
            //@DESC: Calculate the force from driving.
            const moveForce = this.controlledMovement.move();
            //@DESC: Calculate acceleration (Acceleration = Force/Mass)
            const acceleration = moveForce.scale(1 / this.mass);
            //@DESC: update velocity Velocity += Accelaration * Time;
            const velocity = acceleration.scale(1);
            this.velocity.addInPlace(velocity);
            //@DESC: Make sure the vehicle doesnot exceed the maximum speed.
            const length = this.velocity.length();
            let tempVelocity = this.velocity.clone();
            const scaledVector = tempVelocity.normalizeToNew().scale(this.maxSpeed);
            this.velocity = length < this.maxSpeed ? this.velocity : scaledVector;
            //@DESC: Update the position Position += Velocity * timeInterval.
            const updatedVelocity = this.velocity.scale(timeInterval);
            //@DESC: Clamping to grid
            this.position = this.position.add(updatedVelocity);
            //this.position = Vector3.Clamp(this.position, INNER_BOUND, OUTER_BOUND);
        }
        if (this.mesh) {
            this.mesh.position = this.position.clone();
        }
    }

    addToScene() {
        let sphere = Mesh.CreateSphere("targetSphere1", 1, 1, this.scene);
        sphere.position.y = 2;
        this.mesh = sphere;
        this.mesh.convertToFlatShadedMesh();
    }

    handleMessage(message) {
        const messageType = message.messageType;
        if (messageType === MSG_TYPE.PURSUIT_MODE || messageType === MSG_TYPE.EVADE_MODE) {
            //@DESC: reset velocity if seeker is not already in pursuit mode.
            if (this.moveMode !== ENTITY_MODES.SEEKER_RUN_MODE) {
                this.velocity = new Vector3.Zero();
                this.moveMode = ENTITY_MODES.SEEKER_RUN_MODE;
                this.controlledMovement.idle();
            }
        }
        else {
            this.moveMode = ENTITY_MODES.SEEKER_JUMP_MODE;
            this.velocity = new Vector3.Zero();
            this.controlledMovement.idle();
        }
    }

    pointerHandler(pointerInfo) {
        const pointerType = pointerInfo.type;
        if (this.moveMode !== ENTITY_MODES.SEEKER_JUMP_MODE) {
            return;
        }

        switch (pointerType) {
            case PointerEventTypes.POINTERPICK:
                if (pointerInfo.pickInfo.pickedMesh.id === "ground1") {
                    let posVector = pointerInfo.pickInfo.pickedPoint.clone();
                    posVector.y = 2;
                    this.position = posVector;
                    const seekTargetId = EntityManager.getEntityByName("seekTarget").id;
                    const movingObjectId = EntityManager.getEntityByName("vehicle").id;
                    MessageDispatcher.dispatchMessage(0, seekTargetId, movingObjectId, MSG_TYPE.TARGET_MOVED, posVector.clone());
                }
                break;
            default:
                break;
        }
    }

    keyboardObservable(keyboardInfo) {
        const key = keyboardInfo.event.key.toUpperCase();

        switch (keyboardInfo.type) {
            case KeyboardEventTypes.KEYDOWN:
                this.moveEntity(key);
                break;
            default:
                break;
        }
    }

    moveEntity(key) {
        switch (key) {
            case "W":
                this.controlledMovement.moveForward();
                break;
            case "A":
                this.controlledMovement.moveLeft();
                break;
            case "D":
                this.controlledMovement.moveRight();
                break;
            case "S":
                this.controlledMovement.moveReverse();
                break;
            default: break;
        }
    }
}

export default SeekTarget;