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
        this.isPursuing = false;
        this.pursuitTarget = null;
        this.isEvading = false;
        this.evadeTarget = null;
    }

    calculate() {
        let totalForce = new Vector3.Zero();
        const seekForce = this.seek();
        const fleeForce = this.flee();
        const arriveForce = this.arrive();
        const pursuitForce = this.pursuit();
        const evadeForce = this.evade();

        totalForce.addInPlace(seekForce);
        totalForce.addInPlace(fleeForce);
        totalForce.addInPlace(arriveForce);
        totalForce.addInPlace(pursuitForce);
        totalForce.addInPlace(evadeForce);

        return totalForce;
    }

    toggleSeek(seekTarget) {
        //@DESC: toggle seeks if valid seektarget is passed.
        if (seekTarget) {
            this.isSeeking = true;
            this.seekTarget = seekTarget;
        }
        else {
            this.isSeeking = false;
            this.seekTarget = null;
        }
    }

    seek(seekPosition) {
        const entity = this.entity;
        let steeringVelocity = new Vector3.Zero();

        if (this.isSeeking || seekPosition) {
            const seekTargetPosition = seekPosition || this.seekTarget.position.clone();
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

    flee(fleePosition) {
        const entity = this.entity;
        let steeringVelocity = new Vector3.Zero();
        const panicDistance = 5 * 5; //panic distance is 4. hardcoded for now.

        if (this.isFleeing || fleePosition) {
            const fleeTargetPosition = fleePosition || this.fleeTarget.position.clone();
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
            this.arriveTarget = arriveTarget;
        }
        else {
            this.isArriving = false;
            this.arriveTarget = false;
        }
    }

    arrive(arrivePosition) {
        const entity = this.entity;
        let steeringVelocity = new Vector3.Zero();
        if (this.isArriving || arrivePosition) {
            const arriveTragetPosition = arrivePosition || this.arriveTarget.position.clone();
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

    togglePursuit(pursuitTarget) {
        //@DESC: Toggle arrive if valid target is passed and seek is disabled.
        if (pursuitTarget) {
            this.isPursuing = true;
            this.pursuitTarget = pursuitTarget;
        }
        else {
            this.isPursuing = false;
            this.pursuitTarget = null;
        }
    }

    pursuit() {
        const entity = this.entity;
        //@DESC: acos 0.95 = 18degs.
        const DEGREE_18 = -0.95;
        //@DESC: If the target is ahead of the agent, then we can just seek for the target's current position.
        let steeringVelocity = new Vector3.Zero();

        if (this.isPursuing) {
            const toEvader = this.pursuitTarget.position.subtract(this.entity.position);
            const evaderHeading = this.pursuitTarget.velocity.normalizeToNew();
            const relativeHeading = Vector3.Dot(entity.heading, evaderHeading);

            if (Vector3.Dot(toEvader, entity.heading) > 0 && relativeHeading < DEGREE_18) {
                entity.steering.toggleSeek(this.pursuitTarget);
                steeringVelocity = entity.steering.seek(this.pursuitTarget.position.clone());
            }
            else {
                //@DESC: If target not ahead, we predict where the target will be.

                //@DESC: The look ahed time is proportional to the distance between the target and pursuer
                //and is inversely proportional to the sum of the agent's velocities.
                const lookAheadTime = toEvader.length() / (entity.maxSpeed + this.pursuitTarget.velocity.length());

                //@DESC: seek to the predicted position of the target
                const targetPosition = this.pursuitTarget.velocity.scale(lookAheadTime).add(this.pursuitTarget.position);
                steeringVelocity = entity.steering.seek(targetPosition);
            }
        }


        return steeringVelocity;
    }

    toggleEvade(evadeTarget) {
        //@DESC: Toggle evade if valid target is passed.
        if (evadeTarget) {
            this.isEvading = true;
            this.evadeTarget = evadeTarget;
        }
        else {
            this.isEvading = false;
            this.evadeTarget = null;
        }
    }

    evade(evadePosition) {
        const entity = this.entity;
        let steeringVelocity = new Vector3.Zero();

        if (this.isEvading) {
            const toTarget = this.evadeTarget.position.subtract(entity.position);

            //@DESC: The look ahed time is proportional to the distance between the target and evader
            //and is inversely proportional to the sum of the agent's velocities.
            const lookAheadTime = toTarget.length() / (entity.maxSpeed + this.evadeTarget.velocity.length());

            //@DESC: flee from the predicted position of the target
            const targetPosition = this.evadeTarget.velocity.scale(lookAheadTime).add(this.evadeTarget.position);
            steeringVelocity = entity.steering.flee(targetPosition);
        }

        return steeringVelocity;
    }
}

export default SteeringBehaviours;