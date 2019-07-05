/*jshint browser: true*/
/*jshint esnext: true*/

import State from "../../../../Classes/FSM/State";
import EnterMineAndDigForNugget from "./EnterMineAndDigForNugget";
import {LOCATION} from "../../../../Utils/Constants";

class QuenchThirst extends State{
    constructor(){
        super();
    }

    enter(Miner){
        //@DESC: if miner is not already located at saloon, he must change location to the saloon.
        if(Miner.location !== LOCATION.SALOON){
            console.log(Miner.getName(), ": goin' to get myself a drink.");
            Miner.changeLocation(LOCATION.SALOON);
        }
    }

    execute(Miner){

        //@DESC: buy some drink and quench that thirst.
        Miner.buyItem(1, "drink");
        Miner.quenchThirst(100);

        //@DESC: get up and go mining if miner is well rested.
        if(Miner.isThirstQuenched()){
            console.log(Miner.getName(), ": ahhh... refreshing drinks.");
            const newState = new EnterMineAndDigForNugget();
            Miner.getFSM().changeState(newState);
        }
    }

    exit(Miner){
        console.log(Miner.getName(), ": Am leaving saloon.");
    }
}

export default QuenchThirst;