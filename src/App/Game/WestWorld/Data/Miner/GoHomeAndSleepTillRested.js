/*jshint browser: true*/
/*jshint esnext: true*/

import State from "../../../../Classes/FSM/State";
import MessageDispatcher from "../../../../Classes/Message/MessageDispatcher";
import EnterMineAndDigForNugget from "./EnterMineAndDigForNugget";
import EatStew from "./EatStew";
import {LOCATION, MSG_TYPE} from "../../../../Utils/Constants";

class GoHomeAndSleepTillRested extends State{
    constructor(){
        super();
    }

    enter(Miner){
        //@DESC: if miner is not already located at home, he must change location to the home.
        if(Miner.location !== LOCATION.HOME){
            console.log(Miner.getName(), ": walking to the home.");
            Miner.changeLocation(LOCATION.HOME);
            const elsaId = 1;
            MessageDispatcher.dispatchMessage(0, Miner.getId(), elsaId, MSG_TYPE.ARRIVED_HOME);
        }
    }

    execute(Miner){

        //@DESC: let him sleep of his fatigue
        Miner.takeRest();
        console.log(Miner.getName(), "ZZZ");

        //@DESC: get up and go mining if miner is well rested.
        if(Miner.isWellRested()){
            console.log(Miner.getName(), ": ooooh... good morning.");
            const newState = new EnterMineAndDigForNugget();
            Miner.getFSM().changeState(newState);
        }
    }

    exit(Miner){
    }

    onMessage(Miner, message){
        let isMessageHandled = false;
        const minerName = Miner.getName();
        switch(message.messageType) {
            case MSG_TYPE.STEW_READY:
                console.log(minerName, "Okay, I'm cominn'");
                const newState = new EatStew();
                Miner.getFSM().changeState(newState);
                isMessageHandled = true;
                break;
            default:
                break;
        }

        return isMessageHandled;
    }
}

export default GoHomeAndSleepTillRested;