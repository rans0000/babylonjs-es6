/*jshint browser: true*/
/*jshint esnext: true*/

import { Vector3 } from "@babylonjs/core/Maths/math";

class SteeringBehaviours{
    constructor(entity){
        this.entity = entity;
        this.targetPosition = null;
    }
    
    calculate(){
        let totalForce = new Vector3.Zero;
        const seekForce = this.seek(this.targetPosition);
        totalForce = totalForce.add(seekForce);
        
        return totalForce;
    }
    
    toggleSeek(targetPosition){
        this.targetPosition = targetPosition || null;
    }
    
    seek(targetPosition){
        const entity = this.entity;
        let steeringVelocity = new Vector3.Zero();
        
        if(targetPosition){
            //@DESC: Calculate desired velocity.
            //@DESC: Desired Velocity = Position(target) - Position(agent).
            //@DESC: Normalize DesiredVelocity.
            //@DESC: Scale desired velocity to maximum speed.
            let desiredVelocity = targetPosition.subtract(entity.position);
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