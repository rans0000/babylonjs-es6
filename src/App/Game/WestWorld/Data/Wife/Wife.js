/*jshint browser: true*/
/*jshint esnext: true*/

import BaseGameEntity from "../../../../Classes/GameEntity/BaseGameEntity";
import StateMachine from "../../../../Classes/FSM/StateMachine";
import DoHouseWork from "./DoHouseWork";
import GlobalStates from "./GlobalStates";

class Wife extends BaseGameEntity{
    constructor(){
        super();
        this.name = "Elsa";
        this.location = undefined;
        
        this.stateMachine = new StateMachine(this);
        this.stateMachine.setCurrentState(new DoHouseWork());
        this.stateMachine.setGlobalState(new GlobalStates());
    }
    
    getName(){
        return `${this.name} (${this.id})`;
    }
    
    getFSM(){
        return this.stateMachine;
    }
    
    changeLocation(_location){
        this.location = _location;
    }
    
    update(){
        this.stateMachine.update();
    }
    
    render(){
        
    }
}

export default Wife;