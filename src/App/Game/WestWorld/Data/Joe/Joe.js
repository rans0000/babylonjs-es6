/*jshint browser: true*/
/*jshint esnext: true*/

import BaseGameEntity from "../../../../Classes/GameEntity/BaseGameEntity";
import StateMachine from "../../../../Classes/FSM/StateMachine";
import DrinkingBeer from "./DrinkingBeer";

class Joe extends BaseGameEntity{
    constructor(config){
        super(config);
        
        this.name = "Thug Joe";
        this.location = undefined;
        this.fighting = false;
        this.fatigue = 10;
        
        this.stateMachine = new StateMachine(this);
        this.stateMachine.setCurrentState(new DrinkingBeer());
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
    
    getFatigue(){
        return this.fatigue;
    }
    
    increaseFatigue(fatigue = 1){
        this.fatigue = Math.min(this.fatigue + fatigue, Joe.maxFatigue);
    }
    
    decreaseFatigue(fatigue = 1){
        this.fatigue = Math.max(this.fatigue - fatigue, 0);
    }
    
    isTired(){
        return this.fatigue >= Joe.maxFatigue;
    }
    
    isFighting(){
        return this.fighting;
    }
    
    setFighting(fighting){
        this.fighting = fighting;
    }
    
    handleMessage(message){
        this.getFSM().handleMessage(message);
    }
    
    update(){
        this.stateMachine.update();
    }
    
    render(){
        
    }
}

Joe.minFatigue = 5;
Joe.maxFatigue = 100;

export default Joe;