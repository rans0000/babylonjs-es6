/*jshint browser: true*/
/*jshint esnext: true*/

import State from "../../../../Classes/FSM/State";
import MessageDispatcher from "../../../../Classes/Message/MessageDispatcher";
import GoHomeAndSleepTillRested from "./GoHomeAndSleepTillRested";
import QuenchThirst from "./QuenchThirst";
import {LOCATION, MSG_TYPE} from "../../../../Utils/Constants";

const STOP_FIGHTING = false;
const CONTINUE_FIGHTING = true;
const MAXIMUM_DAMAGE = 25;

class Fight extends State{
    constructor(){
        super();
    }

    enter(Miner){
        console.log(Miner.getName(), ": OK, I like a fight.");
        Miner.setFighting(true);
    }

    execute(Miner){
        if(Miner.isFighting()){
            const MinerId = Miner.getId();
            const JoeId = 2;
            if(Miner.isTired()){
                console.log(Miner.getName(), ": I've had enough for today.");
                MessageDispatcher.dispatchMessage(0, MinerId, JoeId, MSG_TYPE.FIGHTING, STOP_FIGHTING);
                Miner.setFighting(false);
                const newState = Miner.isThirstQuenched()? new GoHomeAndSleepTillRested() : new QuenchThirst();
                Miner.getFSM().changeState(newState);
            }
            else{
                console.log(Miner.getName(), ": Take that you scoundrel!!!.");
                Miner.increaseFatigue();
                MessageDispatcher.dispatchMessage(0, MinerId, JoeId, MSG_TYPE.FIGHTING, CONTINUE_FIGHTING);
            }
        }
    }

    exit(Miner){
        console.log(Miner.getName(), ": No more fightin'");
    }

    onMessage(Miner, message){
        let isMessageHandled = false;
        const isOpponentFighting = message.extraInfo;
        switch(message.messageType) {
            case MSG_TYPE.FIGHTING:
                if(isOpponentFighting){
                    const damage = Math.round(Math.random() * MAXIMUM_DAMAGE);
                    Miner.increaseFatigue(damage);
                    console.log(Miner.getName(), ": Ouch!! that hurts.", `Damage:${damage} --- Fatigue:${Miner.getFatigue()}`);
                }
                else{
                    Miner.setFighting(false);
                    const newState = Miner.isThirstQuenched()? new GoHomeAndSleepTillRested() : new QuenchThirst();
                    Miner.getFSM().changeState(newState);
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