/*jshint browser: true*/
/*jshint esnext: true*/

import State from "./State.js";
import EnterMineAndDigForNugget from "./EnterMineAndDigForNugget.js";
import GoHomeAndSleepTillRested from "./GoHomeAndSleepTillRested.js";
import {LOCATION} from "./Constants.js";

class VisitBankAndDepositGold extends State{
    constructor(){
        super();
    }

    enter(Miner){
        //@DESC: if miner is not already located at bank, he must change location to the bank.
        if(Miner.location !== LOCATION.BANK){
            console.log(Miner.getName(), ": visiting my bank.");
            Miner.changeLocation(LOCATION.BANK);
        }
    }

    execute(Miner){
        //@DESC: deposit gold while at the bank.

        const miner = Miner.getName();
        const cashInHand = Miner.getCashInHand();
        const balance = Miner.getBankBalance();
        Miner.depositGold();
        console.log(`${miner} : deposited ${cashInHand}/- gold. My Account Balance is ${balance}`); 

        //@DESC: decide randomly if continue mining or go home.
        const continueMining = Math.random() > .5;
        const newState = continueMining ? new EnterMineAndDigForNugget() : new GoHomeAndSleepTillRested();
        Miner.changeState(newState);
    }

    exit(Miner){
        console.log(Miner.getName(), ": Am leaving bank.");
    }
}

export default VisitBankAndDepositGold;