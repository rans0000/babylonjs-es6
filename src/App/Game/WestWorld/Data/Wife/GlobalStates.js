/*jshint browser: true*/
/*jshint esnext: true*/

import State from "../../../../Classes/FSM/State";
import MessageDispatcher from "../../../../Classes/Message/MessageDispatcher";
import {LOCATION, MSG_TYPE} from "../../../../Utils/Constants";
import CookStew from "./CookStew";
import DoHouseWork from "./DoHouseWork";

class GlobalStates extends State{
    constructor(){
        super();
    }

    enter(Wife){
    }

    execute(Wife){
    }

    exit(Wife){
    }
    
    onMessage(Wife, message){
        let isMessageHandled = false, newState;
        const wifeName = Wife.getName();
        switch(message.messageType) {
                
            case MSG_TYPE.ARRIVED_HOME:
                console.log(wifeName, ": Honey, I'm cooking a stew for you.");
                newState = new CookStew();
                Wife.getFSM().changeState(newState);
                isMessageHandled = true;
                break;
                
            case MSG_TYPE.STEW_READY:
                console.log(wifeName, "Stew's ready!!!");
                const minerId = 0;
                MessageDispatcher.dispatchMessage(0, Wife.getId(), minerId, MSG_TYPE.STEW_READY);
                Wife.setCooking(false);
                newState = new DoHouseWork();  
                Wife.getFSM().changeState(newState);
                isMessageHandled = true;
                break;
            default:
                break;
        }
        
        return isMessageHandled;
    }
}

export default GlobalStates;