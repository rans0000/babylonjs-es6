import { Vector3 } from "@babylonjs/core/Maths/math";

const MOVE_DIR_FORWARD = "MOVE_DIR_FORWARD";
const MOVE_DIR_LEFT = "MOVE_DIR_LEFT";
const MOVE_DIR_RIGHT = "MOVE_DIR_RIGHT";
const MOVE_DIR_REVERSE = "MOVE_DIR_REVERSE";
const MOVE_DIR_BRAKE = "MOVE_DIR_BRAKE";
const MOVE_DIR_IDLE = "MOVE_DIR_IDLE";

class ControlledMovement {
    constructor(entity) {
        this.entity = entity;
        this.moveDirection = undefined;
    }

    move = () => {
        const entity = this.entity;
        const entityVelocity = entity.velocity.clone();
        const direction = this.getDirectionVector().scale(entity.maxSpeed);

        //@DESC: Add agent's velocity to drive velocity.
        let driveForce = entityVelocity.subtract(direction);
        return driveForce;
    };

    getDirectionVector = () => {
        let direction = new Vector3.Zero();
        switch (this.moveDirection) {
            case MOVE_DIR_FORWARD:
                direction = new Vector3(0, 0, 1);
                break;
            case MOVE_DIR_LEFT:
                direction = new Vector3(-1, 0, 0);
                break;
            case MOVE_DIR_RIGHT:
                direction = new Vector3(1, 0, 0);
                break;
            case MOVE_DIR_REVERSE:
                direction = new Vector3(0, 0, -1);
                break;
            default:
                break;
        }

        return direction;
    };

    moveForward = () => {
        this.moveDirection = MOVE_DIR_FORWARD;
    };

    moveLeft = () => {
        this.moveDirection = MOVE_DIR_LEFT;
    };

    moveRight = () => {
        this.moveDirection = MOVE_DIR_RIGHT;
    };

    moveReverse = () => {
        this.moveDirection = MOVE_DIR_REVERSE;
    };

    brake = () => {
        this.moveDirection = MOVE_DIR_BRAKE;
    };
    
    idle = () => {
        this.moveDirection = MOVE_DIR_IDLE;
    };
}

export default ControlledMovement;