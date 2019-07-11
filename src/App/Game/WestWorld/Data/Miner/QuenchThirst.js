/*jshint browser: true*/
/*jshint esnext: true*/

import State from "../../../../Classes/FSM/State";
import MessageDispatcher from "../../../../Classes/Message/MessageDispatcher";
import EnterMineAndDigForNugget from "./EnterMineAndDigForNugget";
import Fight from "./Fight";
import {LOCATION, MSG_TYPE} from "../../../../Utils/Constants";

class QuenchThirst extends State{
    constructor(){
        super();
    }

    enter(Miner){
        //@DESC: if miner is not already located at saloon, he must change location to the saloon.
        if(Miner.location !== LOCATION.SALOON){
            console.log(Miner.getName(), ": goin' to get myself a drink.");
            Miner.changeLocation(LOCATION.SALOON);

            const JoeId = 2;
            const MinerId = Miner.getId();
            MessageDispatcher.dispatchMessage(0, MinerId, JoeId, MSG_TYPE.ARRIVED_SALOON);
        }
    }

    execute(Miner){

        //@DESC: buy some drink and quench that thirst.
        Miner.buyItem(1, "drink");
        Miner.quenchThirst(5);

        //@DESC: get up and go mining if miner is well rested.
        if(Miner.isThirstQuenched()){
            console.log(Miner.getName(), ": ahhh... refreshing drinks.");
            const newState = new EnterMineAndDigForNugget();
            Miner.getFSM().changeState(newState);
        }
    }

    exit(Miner){
        if(Miner.isThirstQuenched()){
            console.log(Miner.getName(), ": Drinked up to the brim.");
        }
        else{
            console.log(Miner.getName(), ": Drinks can wait.");
        }
    }

    onMessage(Miner, message){
        let isMessageHandled = false;

        switch(message.messageType) {
            case MSG_TYPE.FIGHTING:
                const newState = new Fight();
                Miner.getFSM().changeState(newState);
                isMessageHandled = true;
                break;
            default:
                break;
        }

        return isMessageHandled;
    }
}

export default QuenchThirst;