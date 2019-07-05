/*jshint browser: true*/
/*jshint esnext: true*/

import State from "../FSM/State";
import EnterMineAndDigForNugget from "./EnterMineAndDigForNugget";
import {LOCATION} from "../../Utils/Constants";

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
            const newState = new EnterMineAndDigForNugget();
            Miner.getFSM().changeState(newState);
        }
    }

    exit(Miner){
        console.log(Miner.getName(), ": Bye bye home.");
    }
}

export default GoHomeAndSleepTillRested;