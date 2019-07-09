/*jshint browser: true*/
/*jshint esnext: true*/

import State from "../../../../Classes/FSM/State";
import MessageDispatcher from "../../../../Classes/Message/MessageDispatcher";
import {LOCATION, MSG_TYPE} from "../../../../Utils/Constants";

class CookStew extends State{
    constructor(){
        super();
    }
    
    enter(Wife){
        //@DESC: move to kitchen if not already there.
        if(Wife.location !== LOCATION.KITCHEN){
            Wife.changeLocation(LOCATION.KITCHEN);
            console.log(Wife.getName(), ": Cooking... cooking..mm.");
        }
    }
    
    execute(Wife){
        //@DESC: if not already cooking, put the stew in the oven
        const isCooking = Wife.isCooking();
        if(!isCooking){
            console.log(Wife.getName(), ": Puttin' the stew in the owen.");
            const wifeId = Wife.getId();
            MessageDispatcher.dispatchMessage(2, wifeId, wifeId, MSG_TYPE.STEW_READY);
            Wife.setCooking(true);
        }
    }
    
    exit(Wife){
        console.log("Im done cooking.");
    }
}

export default CookStew;