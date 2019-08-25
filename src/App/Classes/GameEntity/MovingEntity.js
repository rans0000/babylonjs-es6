/*jshint browser: true*/
/*jshint esnext: true*/

import BaseGameEntity from "../../Classes/GameEntity/BaseGameEntity";
import { Vector3 } from "@babylonjs/core/Maths/math";

class MovingEntity extends BaseGameEntity{
    constructor(config){
        super(config);
        const zero = new Vector3.Zero();
        this.velocity = config.velocity || zero;
        this.stoppingDistance = config.stoppingDistance || 10;
        //@DESC: A normalized vector pointing to the direction the entity is facing.
        this.heading = config.heading || new Vector3(1, 0, 0);
        //@DESC: A vector perpendicular to the heading vector.
        this.side = this.heading.clone();
        this.side.z = this.side.z * -1;
        this.mass = config.mass || 1;
        //@DESC: Maximum speed at which this entity may travel.
        this.maxSpeed = config.maxSpeed || 1;
        //@DESC: Maximum force this entity can produce to power itself (ex: rocket thrust).
        this.maxForce = config.maxForce || 1;
        //@DESC: The maximum rate (radians per second) at which this entity can rotate.
        this.maxTurnRate = config.maxTurnRate || (Math.PI / 2);
    }
}

export default MovingEntity;