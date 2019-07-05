/*jshint browser: true*/
/*jshint esnext: true*/

import State from "../../../../Classes/FSM/State";
import {LOCATION} from "../../../../Utils/Constants";

class VisitRestRoom extends State{
    constructor(){
        super();
    }

    enter(Wife){
        //@DESC: move to restroom if not already there.
        if(Wife.location !== LOCATION.RESTROOM){
            Wife.changeLocation(LOCATION.RESTROOM);
            console.log(Wife.getName(), ": Goin' to restroom.");
        }
    }

    execute(Wife){
        console.log(Wife.getName(), ": Good grief...");

        //@DESC: get back to whatever Elsa was doing previously.
        if(Wife.getFSM().getPreviousState()){
            Wife.getFSM().revertToPreviousState();
        }
    }

    exit(Wife){
        console.log(Wife.getName(), ": leavin' restroom...");
    }
}

export {VisitRestRoom};