/*jshint browser: true*/
/*jshint esnext: true*/

import { CylinderBuilder } from "@babylonjs/core/Meshes/Builders/cylinderBuilder";
import { Vector3 } from "@babylonjs/core/Maths/math";

import MovingEntity from "../../../../Classes/GameEntity/MovingEntity";
import EntityManager from "../../../../Classes/GameEntity/EntityManager";
import SteeringBehaviours from "../../../../Classes/SteeringBehaviours/SteeringBehaviours";
import { MSG_TYPE } from "../../../../Utils/Constants";

class Vehicle extends MovingEntity {
    constructor(config) {
        super(config);
        this.position = config.position || new Vector3.Zero();
        this.mesh = null;
        //@DESC: A pointer to the world data enabling Vehicle to access walls, obstacles and other agents etc.
        this.gameWorld = config.gameWorld;
        //@DESC: steering behaviour class.
        this.steering = new SteeringBehaviours(this);
    }

    addToScene(scene) {
        let box = CylinderBuilder.CreateCylinder("cone1", { diameterTop: 0, diameterBottom: 2, tessellation: 4 }, scene);
        box.position.y = 2;
        box.rotation.x = Math.PI / 2;
        box.rotation.z = Math.PI / 2;
        this.mesh = box;
        this.mesh.convertToFlatShadedMesh();
    }

    update(timeInterval) {

        //@DESC: Calculate the combined force from each steering behaviour the vehicle's list.
        const steeringForce = this.steering.calculate();
        //@DESC: Calculate acceleration (Acceleration = Force/Mass)
        const acceleration = steeringForce.scale(1 / this.mass);
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
        this.position = this.position.add(updatedVelocity);
        //@DESC: Update the heading of Vehicle if velocity is greater than a small number
        if (this.velocity.lengthSquared() > 0.00000001) {
            this.heading = (this.velocity.clone()).normalize();
            this.side = this.heading.clone();
            this.side.z = this.side.z * -1;
        }

        //update the rendering mesh
        const mesh = this.mesh;
        if (mesh) {
            mesh.position = this.position.clone();
            mesh.rotation.y = Math.atan2(this.heading.z, -this.heading.x);
        }
    }

    handleMessage(message) {

        switch (message.messageType) {
            case MSG_TYPE.SEEK_MODE:
                const seekTarget = EntityManager.getEntityByName("seekTarget");
                this.steering.toggleSeek(seekTarget);
                this.steering.toggleFlee(false);
                break;
            case MSG_TYPE.FLEE_MODE:
                const fleeTarget = EntityManager.getEntityByName("seekTarget");
                this.steering.toggleSeek(false);
                this.steering.toggleFlee(fleeTarget);
                this.steering.toggleArrive(false);
                break;
            case MSG_TYPE.TARGET_MOVED:
                const target = EntityManager.getEntityByName("seekTarget");
                if (this.steering.isSeeking) {
                    this.steering.toggleSeek(target);
                    this.steering.toggleFlee(false);
                    this.steering.toggleArrive(false);
                }
                else if (this.steering.isFleeing) {
                    this.steering.toggleSeek(false);
                    this.steering.toggleFlee(target);
                    this.steering.toggleArrive(false);
                }
                else if (this.steering.isArriving) {
                    this.steering.toggleSeek(false);
                    this.steering.toggleFlee(false);
                    this.steering.toggleArrive(target);
                }
                break;
            case MSG_TYPE.ARRIVE_MODE:
                const arriveTarget = EntityManager.getEntityByName("seekTarget");
                this.steering.toggleFlee(false);
                this.steering.toggleArrive(arriveTarget);
                break;
            default:
                break;
        }
    }
}

export default Vehicle;