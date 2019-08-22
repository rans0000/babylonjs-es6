/*jshint browser: true*/
/*jshint esnext: true*/

import { Vector3 } from "@babylonjs/core/Maths/math";

class SteeringBehaviours{
    constructor(entity){
        this.entity = entity;
        this.isSeeking = false;
        this.seekTargetPosition = null;
    }

    calculate(){
        let totalForce = new Vector3.Zero();
        const seekForce = this.seek();
        totalForce = totalForce.add(seekForce);

        return totalForce;
    }

    toggleSeek(seekTargetPosition){
        //@DESC: toggle seeks if valid seektarget is passed.
        if(seekTargetPosition){
            this.isSeeking = true;
            this.seekTargetPosition = seekTargetPosition;
        }
        else{
            this.isSeeking = false;
            this.seekTargetPosition = null;
        }
    }

    seek(){
        const entity = this.entity;
        const seekTargetPosition = this.seekTargetPosition;
        let steeringVelocity = new Vector3.Zero();

        if(this.isSeeking){
            //@DESC: Calculate desired velocity.
            //@DESC: Desired Velocity = Position(target) - Position(agent).
            //@DESC: Normalize DesiredVelocity.
            //@DESC: Scale desired velocity to maximum speed.
            let desiredVelocity = seekTargetPosition.subtract(entity.position);
            desiredVelocity.normalize();
            desiredVelocity = desiredVelocity.scale(entity.maxSpeed);

            //@DESC: Calculate steering force.
            //@DESC: Steering force = Desired Velocity - Current Velocity.
            //@DESC: Limit the steering force to the maximum force.
            steeringVelocity = desiredVelocity.subtract(entity.velocity);
        }

        return steeringVelocity;
    }
}

export default SteeringBehaviours;