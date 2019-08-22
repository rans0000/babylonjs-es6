/*jshint browser: true*/
/*jshint esnext: true*/

import { Vector3 } from "@babylonjs/core/Maths/math";

class SteeringBehaviours{
    constructor(entity){
        this.entity = entity;
        this.isSeeking = false;
        this.seekTargetPosition = null;
        this.isFleeing = false;
        this.fleeTargetPosition = null;
    }

    calculate(){
        let totalForce = new Vector3.Zero();
        const seekForce = this.seek();
        const fleeForce = this.flee();
        
        totalForce.addInPlace(seekForce);
        totalForce.addInPlace(fleeForce);

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
            steeringVelocity = desiredVelocity.subtract(entity.velocity);
            //@DESC: Limit the steering force to the maximum force.
        }

        return steeringVelocity;
    }

    toggleFlee(fleeTargetPosition){
        //@DESC: toggle flee if valid seektarget is passed.
        if(fleeTargetPosition){
            this.isFleeing = true;
            this.fleeTargetPosition = fleeTargetPosition;
        }
        else{
            this.isFleeing = false;
            this.fleeTargetPosition = null;
        }
    }

    flee(){
        const entity = this.entity;
        const fleeTargetPosition = this.fleeTargetPosition;
        let steeringVelocity = new Vector3.Zero();
        const panicDistance = 5 * 5; //panic distance is 4. hardcoded for now.

        if(this.isFleeing && entity.position.subtract(fleeTargetPosition).lengthSquared() < panicDistance){
            //@DESC: Calculate desired velocity if target position is less than panic distance.
            //@DESC: Desired Velocity = Position(agent) - Position(target).
            //@DESC: Normalize DesiredVelocity.
            //@DESC: Scale desired velocity to maximum speed.
            let desiredVelocity = entity.position.subtract(fleeTargetPosition);
            desiredVelocity.normalize();
            desiredVelocity = desiredVelocity.scale(entity.maxSpeed);

            //@DESC: Calculate steering force.
            //@DESC: Steering force = Desired Velocity - Current Velocity.
            steeringVelocity = desiredVelocity.subtract(entity.velocity);
            //@DESC: Limit the steering force to the maximum force.
        }

        return steeringVelocity;
    }
}

export default SteeringBehaviours;