/*jshint browser: true*/
/*jshint esnext: true*/

import BaseGameEntity from "../../../../Classes/GameEntity/BaseGameEntity";
import StateMachine from "../../../../Classes/FSM/StateMachine";
import EnterMineAndDigForNugget from "./EnterMineAndDigForNugget";

class Miner extends BaseGameEntity{
    constructor(){
        super();
        this.name = "Miner Bob";
        this.location = undefined;
        this.goldCarried = 0;
        this.moneyAtBank= 0;
        this.thirst = 0;
        this.fatigue = 0;
        
        this.stateMachine = new StateMachine(this);
        this.stateMachine.setCurrentState(new EnterMineAndDigForNugget());
        //Miner has no global states.
    }
    
    getName(){
        return `${this.name} id:(${this.id})`;
    }
    
    getFSM(){
        return this.stateMachine;
    }
    
    changeLocation(location){
        this.location = location;
    }
    
    increaseFatigue(){
        this.fatigue++;
    }
    
    isTired(){
        return this.fatigue >= Miner.maxFatigue;
    }
    
    addToGoldCarried(){
        this.goldCarried++;
    }
    
    getCashInHand(){
        return this.goldCarried;
    }
    
    isPocketFull(){
        return this.goldCarried >= Miner.maxNuggets;
    }
    
    depositGold(){
        this.moneyAtBank += this.goldCarried;
        this.goldCarried = 0;
    }
    
    getBankBalance(){
        return this.moneyAtBank;
    }
    
    buyItem(gold, item){
        this.moneyAtBank -= gold;
        console.log(this.getName(), ": bought ", item, " for $", gold);
    }
    
    takeRest(){
        this.fatigue--;
    }
    
    isWellRested(){
        return this.fatigue <= 0;
    }
    
    quenchThirst(quenchValue){
        this.thirst -= quenchValue;
    }
    
    isThirstQuenched(){
        return this.thirst <= 0;
    }
    
    isThirsty(){
        return this.thirst >= Miner.maxThirst;
    }
    
    handleMessage(message){
        this.getFSM().handleMessage(message);
    }

    update(){
        this.thirst++;
        this.stateMachine.update();
    }
    
    render(){
        
    }
}

Miner.maxNuggets = 3;
Miner.maxFatigue = 5;
Miner.maxThirst = 5;

export default Miner;