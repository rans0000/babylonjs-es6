/*jshint browser: true*/
/*jshint esnext: true*/

import State from "../../../../Classes/FSM/State";
import EnterMineAndDigForNugget from "./EnterMineAndDigForNugget";
import GoHomeAndSleepTillRested from "./GoHomeAndSleepTillRested";
import {LOCATION} from "../../../../Utils/Constants";

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
        Miner.depositGold();
        const balance = Miner.getBankBalance();
        console.log(`${miner} : deposited ${cashInHand}/- gold. My Account Balance is ${balance}`); 

        //@DESC: decide to continue mining or go home depending on tiredness.
        const isTired = Miner.isTired();
        const newState = isTired ? new GoHomeAndSleepTillRested() : new EnterMineAndDigForNugget();
        Miner.getFSM().changeState(newState);
    }

    exit(Miner){
        console.log(Miner.getName(), ": Am leaving bank.");
    }
}

export default VisitBankAndDepositGold;