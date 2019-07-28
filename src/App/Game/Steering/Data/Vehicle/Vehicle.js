/*jshint browser: true*/
/*jshint esnext: true*/

import BaseGameEntity from "../../../../Classes/GameEntity/BaseGameEntity";
import MovingEntity from "../../../../Classes/GameEntity/MovingEntity";
import SteeringBehaviours from "../../../../Classes/SteeringBehaviours/SteeringBehaviours";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Vector3 } from "@babylonjs/core/Maths/math";

class Vehicle extends MovingEntity{
    constructor(config){
        super(config);
        this.position = this.position || new Vector3.Zero();
        this.mesh = null;
        //@DESC: A pointer to the world data enabling Vehicle to access walls, obstacles and other agents etc.
        this.gameWorld = config.gameWorld;
        //@DESC: steering behaviour class.
        this.steering = new SteeringBehaviours(this);
    }

    addToScene(scene){
        let sphere = Mesh.CreateSphere("sphere1", 16, 2, scene);
        sphere.position.y = 2;
        this.mesh = sphere;
    }

    update(timeInterval){

        //@DESC: Calculate the combined force from each steering behaviour the vehicle's list.
        
        const steeringForce = this.steering.calculate();
        //@DESC: Calculate acceleration (Acceleration = Force/Mass)
        const acceleration = steeringForce.scale(1 / this.mass);
        //@DESC: update velocity Velocity += Accelaration * Time;
        const velocity = acceleration.scale(timeInterval);
        this.velocity.addInPlace(velocity);
        //@DESC: Make sure the vehicle doesnot exceed the maximum speed.
        const length = this.velocity.length();
        let tempVelocity = this.velocity.clone();
        this.velocity = length < this.maxSpeed ? this.velocity : tempVelocity.normalizeFromLength();
        //@DESC: Update the position Position += Velocity * timeInterval.
        const updatedVelocity = this.velocity.scale(timeInterval);
        this.position = this.position.add(updatedVelocity);
        //@DESC: Update the heading of Vehicle if velocity is greater than a small number
        if(this.velocity.lengthSquared() > 0.00000001){
            this.heading = (this.velocity.clone()).normalize();
            this.side = new Vector3(this.heading);
            this.side.z = this.side.z * -1;
        }
        
        //update the rendering mesh
        const mesh = this.mesh;
        if(mesh){
            mesh.position = this.position.clone();
        }
    }
}

export default Vehicle;