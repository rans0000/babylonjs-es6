/*jshint browser: true*/
/*jshint esnext: true*/

import State from "../../../../Classes/FSM/State";
import MessageDispatcher from "../../../../Classes/Message/MessageDispatcher";
import DrinkingBeer from "./DrinkingBeer";
import {LOCATION, MSG_TYPE} from "../../../../Utils/Constants";

const STOP_FIGHTING = false;
const CONTINUE_FIGHTING = true;
const MAXIMUM_DAMAGE = 25;

class Fight extends State{
    constructor(){
        super();
    }

    enter(Joe){
        console.log(Joe.getName(), ": Let's have some fight.");
        Joe.setFighting(true);
    }

    execute(Joe){
        if(Joe.isFighting()){
            const MinerId = 0;
            const JoeId = Joe.getId();
            if(Joe.isTired()){
                console.log(Joe.getName(), ": I've had enough for today.");
                MessageDispatcher.dispatchMessage(0, JoeId, MinerId, MSG_TYPE.FIGHTING, STOP_FIGHTING);
                const newState = new DrinkingBeer();
                Joe.setFighting(false);
                Joe.getFSM().changeState(newState);
            }
            else{
                console.log(Joe.getName(), ": Take that you scoundrel!!!.");
                Joe.increaseFatigue();
                MessageDispatcher.dispatchMessage(0, JoeId, MinerId, MSG_TYPE.FIGHTING, CONTINUE_FIGHTING);
            }
        }
    }

    exit(Joe){
        console.log(Joe.getName(), ": That was a good fight...");
    }

    onMessage(Joe, message){
        let isMessageHandled = false;
        const isOpponentFighting = message.extraInfo;
        switch(message.messageType) {
            case MSG_TYPE.ARRIVED_SALOON:
                console.log(Joe.getName(), ": Let's have some fight.");
                const newState = new Fight();
                Joe.getFSM().changeState(newState);
                isMessageHandled = true;
                break;
            case MSG_TYPE.FIGHTING:
                if(isOpponentFighting){
                    const damage = Math.round(Math.random() * MAXIMUM_DAMAGE);
                    Joe.increaseFatigue(damage);
                    console.log(Joe.getName(), ": Ouch!! that hurts.", `Damage:${damage} --- Fatigue:${Joe.getFatigue()}`);
                }
                else{
                    Joe.setFighting(false);
                    const newState = new DrinkingBeer();
                    Joe.getFSM().changeState(newState);
                }
                isMessageHandled = true;
                break;
            default:
                break;
        }

        return isMessageHandled;
    }
}

export default Fight;