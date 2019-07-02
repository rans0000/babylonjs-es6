/*jshint browser: true*/
/*jshint esnext: true*/

import EnterMineAndDigForNugget from "./EnterMineAndDigForNugget.js";
import VisitBankAndDepositGold from "./VisitBankAndDepositGold.js";
import GoHomeAndSleepTillRested from "./GoHomeAndSleepTillRested.js";
import QuenchThirst from "./QuenchThirst.js";

/*class SerialModuler{
    constructor(){
        super();
    }
    
    EnterMineAndDigForNugget(){
        return new EnterMineAndDigForNugget();
    }
    
    VisitBankAndDepositGold(){
        return new VisitBankAndDepositGold();
    }
    
    GoHomeAndSleepTillRested(){
        return new GoHomeAndSleepTillRested();
    }
    
    QuenchThirst(){
        return new QuenchThirst();
    }
}*/

class SerialModuler{
    constructor(){
        this.id = 3;
    }
}

SerialModuler.EnterMineAndDigForNugget = new EnterMineAndDigForNugget();
SerialModuler.VisitBankAndDepositGold = new VisitBankAndDepositGold();
SerialModuler.GoHomeAndSleepTillRested = new GoHomeAndSleepTillRested();
SerialModuler.QuenchThirst = new QuenchThirst();

export default SerialModuler;