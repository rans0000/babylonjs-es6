/*jshint browser: true*/
/*jshint esnext: true*/

import { Vector3 } from "@babylonjs/core/Maths/math";

class SteeringBehaviours {
    constructor(entity) {
        this.entity = entity;
        this.isSeeking = false;
        this.seekTarget = null;
        this.isFleeing = false;
        this.fleeTargetPosition = null;
        this.isArriving = false;
        this.arriveTarge = null;
    }

    calculate() {
        let totalForce = new Vector3.Zero();
        const seekForce = this.seek();
        const fleeForce = this.flee();
        const arriveForce = this.arrive();

        totalForce.addInPlace(seekForce);
        totalForce.addInPlace(fleeForce);
        totalForce.addInPlace(arriveForce);

        return totalForce;
    }

    toggleSeek(seekTarget) {
        //@DESC: toggle seeks if valid seektarget is passed.
        if (seekTarget) {
            this.isSeeking = true;
            this.seekTarget = seekTarget;
            this.isArriving = false;
            this.arriveTarge = null;
        }
        else {
            this.isSeeking = false;
            this.seekTarget = null;
        }
    }

    seek() {
        const entity = this.entity;
        let steeringVelocity = new Vector3.Zero();

        if (this.isSeeking) {
            const seekTargetPosition = this.seekTarget.position.clone();
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

    toggleFlee(fleeTarget) {
        //@DESC: toggle flee if valid seektarget is passed.
        if (fleeTarget) {
            this.isFleeing = true;
            this.fleeTarget = fleeTarget;
        }
        else {
            this.isFleeing = false;
            this.fleeTarget = null;
        }
    }

    flee() {
        const entity = this.entity;
        let steeringVelocity = new Vector3.Zero();
        const panicDistance = 5 * 5; //panic distance is 4. hardcoded for now.

        if (this.isFleeing) {
            const fleeTargetPosition = this.fleeTarget.position.clone();
            if (entity.position.subtract(fleeTargetPosition).lengthSquared() < panicDistance) {
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
        }

        return steeringVelocity;
    }

    toggleArrive(arriveTarget) {
        //@DESC: Toggle arrive if valid target is passed and seek is disabled.
        if (arriveTarget) {
            this.isArriving = true;
            this.arriveTarge = arriveTarget;
            this.isSeeking = false;
            this.seekTarget = null;
        }
        else {
            this.isArriving = false;
            this.arriveTarge = false;
        }
    }

    arrive() {
        const entity = this.entity;
        let steeringVelocity = new Vector3.Zero();
        if (this.isArriving) {
            const arriveTragetPosition = this.arriveTarge.position.clone();
            const toTarget = arriveTragetPosition.subtract(entity.position);
            const distanceToTarget = toTarget.length();
            //@TODO: deceleration should be enumerated to fast, normal and slow.

            if (distanceToTarget > 0.00000001) {
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