/*jshint browser: true*/
/*jshint esnext: true*/

import BaseGameEntity from "";

class Miner extends BaseGameEntity{
    constructor(){
        super();
        this.name = "Miner Bob";
        this.currentState = null;
        this.location = undefined;
        this.goldCarried = 0;
        this.moneyAtBank= 0;
        this.thirst = 0;
        this.fatigue = 0;
    }
    
    getName(){
        return `${this.name} id:(${this.id})`;
    }
    
    changeLocation(location){
        this.location = location;
    }
    
    increaseFatigue(){
        this.fatigue++;
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
        return this.fatigue >= Miner.maxFatigue;
    }

    changeState(newState){
        
        //@DESC: make sure both states are valid before calling them
        if(!this.currentState || !newState){
            return;
        }
        
        //@DESC: call exit method of current existing state 
        this.currentState.exit(this);
        
        //@DESC: change state to new state
        this.currentState = newState;
        
        //@DESC: call entry menthod of new State
        this.currentState.enter(this);
    }

    update(){
        this.thirst++;
        if(this.currentState){
            this.currentState.execute(this);
        }
    }
}

Miner.maxNuggets = 3;
Miner.maxFatigue = 80;

export default Miner;