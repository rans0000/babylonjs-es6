/*jshint browser: true*/
/*jshint esnext: true*/

import State from "./State.js";
import SerialModuler from "./SerialModuler.js";
import {LOCATION} from "./Constants.js";

class EnterMineAndDigForNugget extends State{
    constructor(){
        super();
    }
    
    enter(Miner){
        //@DESC: if miner is not already located at gold mine, he must change location to gold mine.
        if(Miner.location !== LOCATION.GOLD_MINE){
            console.log(Miner.getName(), ": walking to gold mine.");
            Miner.changeLocation(LOCATION.GOLD_MINE);
        }
    }
    
    execute(Miner){
        //@DESC: The miner digs for gold until he is caryin in excess of Maxnuggets
        //If he gets thirsty during digging, stops work and
        //changes stte to go to saloon
        
        Miner.addToGoldCarried();
        
        //@DESC: digging in hard work
        Miner.increaseFatigue();
        
        console.log(Miner.getName() , ": pickin' up gold.");
        
        //@DESC: if enough gold mined, go put in the bank
        let newState;
        if(Miner.isPocketFull()){
            newState = SerialModuler.VisitBankAndDepositGold;
            Miner.changeState(newState);
        }
        
        //@DESC: if thirsty go get a drink!
        if(Miner.isThirsty()){
            newState = SerialModuler.QuenchThirst;
            Miner.changeState(newState);
        }
    }
    
    exit(Miner){
        console.log(Miner.getName(), ": Am leaving mine.");
    }
}

export default EnterMineAndDigForNugget;