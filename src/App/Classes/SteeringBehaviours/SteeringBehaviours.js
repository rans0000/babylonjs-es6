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
        this.isArriving = false;
        this.arriveTargetPosition = null;
    }

    calculate(){
        let totalForce = new Vector3.Zero();
        const seekForce = this.seek();
        const fleeForce = this.flee();
        const arriveForce = this.arrive();

        totalForce.addInPlace(seekForce);
        totalForce.addInPlace(fleeForce);
        totalForce.addInPlace(arriveForce);

        return totalForce;
    }

    toggleSeek(seekTargetPosition){
        //@DESC: toggle seeks if valid seektarget is passed.
        if(seekTargetPosition){
            this.isSeeking = true;
            this.seekTargetPosition = seekTargetPosition;
            this.isArriving = false;
            this.arriveTargetPosition = null;
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

    toggleArrive(arriveTargetPosition){
        //@DESC: Toggle arrive if valid target is passed and seek is disabled.
        if(arriveTargetPosition){
            this.isArriving = true;
            this.arriveTargetPosition = arriveTargetPosition;
            this.isSeeking = false;
            this.seekTargetPosition = null;
        }
        else{
            this.isArriving = false;
            this.arriveTargetPosition = false;
        }
    }

    arrive(){
        const entity = this.entity;
        const arriveTragetPosition = this.arriveTargetPosition;
        let steeringVelocity = new Vector3.Zero();
        if(this.isArriving){
            const toTarget = arriveTragetPosition.subtract(entity.position);
            const distanceToTarget = toTarget.length();
            //@TODO: deceleration should be enumerated to fast, normal and slow.
            
            if(distanceToTarget > 0.00000001){
                //@DESC: ramp down the velocity if within the threshold.
                const rampedSpeed = entity.maxSpeed * (distanceToTarget / entity.stoppingDistance);
                //@DESC: clamping the velocity to max speed.
                const clippedSpeed = Math.min(rampedSpeed, entity.maxSpeed);
                //@DESC: value goes from 0 to 1;
                const ratio = clippedSpeed / distanceToTarget;
                let desiredVelocity = toTarget.scale(ratio);
                steeringVelocity = desiredVelocity.subtract(entity.velocity);
            }
        }

        return steeringVelocity;
    }
}

export default SteeringBehaviours;