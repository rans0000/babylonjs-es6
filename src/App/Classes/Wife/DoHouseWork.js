/*jshint browser: true*/
/*jshint esnext: true*/

import State from "../FSM/State.js";
import {LOCATION} from "../../Utils/Constants.js";
import {VisitRestRoom} from "./GlobalStates.js";

class DoHouseWork extends State{
    constructor(){
        super();
    }
    
    enter(Wife){
        //@DESC: move to kitchen if not already there.
        if(Wife.location !== LOCATION.KITCHEN){
            Wife.changeLocation(LOCATION.KITCHEN);
            console.log(Wife.getName(), ": Lot of things to do!!.");
        }
    }
    
    execute(Wife){
        //@DESC: mop up the floor.
        console.log(Wife.getName(), ": Cleaning the room.");
        
        //@DESC: go to restroom 1/10th of the time.
        if(Math.random() < .1){
            const newState = new VisitRestRoom();
            Wife.changeState(newState);
        }
    }
    
    exit(Wife){
        console.log(Wife.getName(), ": Leaving the kitchen.");
    }
}

export default DoHouseWork;