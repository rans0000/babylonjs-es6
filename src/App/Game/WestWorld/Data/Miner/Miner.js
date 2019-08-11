/*jshint browser: true*/
/*jshint esnext: true*/

import BaseGameEntity from "../../../../Classes/GameEntity/BaseGameEntity";
import StateMachine from "../../../../Classes/FSM/StateMachine";
import EnterMineAndDigForNugget from "./EnterMineAndDigForNugget";

class Miner extends BaseGameEntity{
    constructor(config){
        super(config);
        this.name = "Miner Bob";
        this.location = undefined;
        this.goldCarried = 0;
        this.moneyAtBank= 0;
        this.thirst = 0;
        this.fatigue = 0;
        this.fighting = false;
        
        this.stateMachine = new StateMachine(this);
        this.stateMachine.setCurrentState(new EnterMineAndDigForNugget());
        //Miner has no global states.
    }
    
    addToScene(){
        //not applicable as there is nothing to render.
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
    
    isFighting(){
        return this.fighting;
    }
    
    setFighting(fighting){
        this.fighting = fighting;
    }
    
    increaseFatigue(fatigue = 1){
        this.fatigue = Math.min(this.fatigue + fatigue, Miner.maxFatigue);
    }
    
    decreaseFatigue(fatigue = 1){
        this.fatigue = Math.max(this.fatigue - fatigue, 0);
    }
    
    getFatigue(){
        return this.fatigue;
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
        this.decreaseFatigue();
    }
    
    isWellRested(){
        return this.fatigue <= 0;
    }
    
    quenchThirst(quenchValue = 1){
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
Miner.minFatigue = 5;
Miner.maxFatigue = 100;
Miner.maxThirst = 70;

export default Miner;