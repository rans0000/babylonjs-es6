/*jshint browser: true*/
/*jshint esnext: true*/

import State from "../../../../Classes/FSM/State";
import Fight from "./Fight";
import {LOCATION, MSG_TYPE} from "../../../../Utils/Constants";

class DrinkingBeer extends State{
    constructor(){
        super();
    }
    
    enter(Joe){
        console.log(Joe.getName(), ": I'll have some drinks now.");
    }
    
    execute(Joe){
        console.log(Joe.getName(), ": Gulp...gulp");
        Joe.decreaseFatigue();
    }
    
    exit(Joe){
        console.log(Joe.getName(), ": Enough with the drinks.");
    }
    
    onMessage(Joe, message){
        let isMessageHandled = false;
        switch(message.messageType) {
            case MSG_TYPE.ARRIVED_SALOON:
                const newState = new Fight();
                Joe.getFSM().changeState(newState);
                isMessageHandled = true;
                break;
            default:
                break;
        }
        
        return isMessageHandled;
    }
}

export default DrinkingBeer;