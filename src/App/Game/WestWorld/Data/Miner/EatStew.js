/*jshint browser: true*/
/*jshint esnext: true*/

import State from "../../../../Classes/FSM/State";
import {LOCATION, MSG_TYPE} from "../../../../Utils/Constants";

class EatStew extends State{
    enter(Miner){
        //@DESC: if miner is not already located at home, he must change location to the home.
        if(Miner.location !== LOCATION.HOME){
            console.log(Miner.getName(), ": walking to the home.");
            Miner.changeLocation(LOCATION.HOME);
        }
        console.log(Miner.getName(), ": Wow, ready to eat.");
    }
    
    execute(Miner){
        console.log(Miner.getName(), ": Mmmmm.. yummy stew.");
        Miner.getFSM().revertToPreviousState();
    }
    
    exit(Miner){
        console.log(Miner.getName(), ": Tummy fullll.");
    }
}

export default EatStew;