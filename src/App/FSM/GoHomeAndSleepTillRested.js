/*jshint browser: true*/
/*jshint esnext: true*/

import State from "./State.js";
import SerialModuler from "./SerialModuler.js";
import {LOCATION} from "./Constants.js";

class GoHomeAndSleepTillRested extends State{
    constructor(){
        super();
    }

    enter(Miner){
        //@DESC: if miner is not already located at home, he must change location to the home.
        if(Miner.location !== LOCATION.HOME){
            console.log(Miner.getName(), ": walking to the home.");
            Miner.changeLocation(LOCATION.HOME);
        }
    }

    execute(Miner){

        //@DESC: let him sleep of his fatigue
        Miner.takeRest();

        //@DESC: get up and go mining if miner is well rested.
        if(Miner.isWellRested()){
            console.log(Miner.getName(), ": ooooh... good morning.");
            const newState = SerialModuler.EnterMineAndDigForNugget;
            Miner.changeState(newState);
        }
    }

    exit(Miner){
        console.log(Miner.getName(), ": Bye bye home.");
    }
}

export default GoHomeAndSleepTillRested;