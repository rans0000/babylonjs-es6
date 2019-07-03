/*jshint browser: true*/
/*jshint esnext: true*/

import BaseGameEntity from "../BaseGameEntity/BaseGameEntity";
import StateMachine from "../FSM/StateMachine";
import DoHouseWork from "./DoHouseWork";
import {VisitRestRoom} from "./GlobalStates";

class Wife extends BaseGameEntity{
    constructor(){
        super();
        this.name = "Elsa";
        this.location = undefined;
        
        this.stateMachine = new StateMachine(this);
        this.stateMachine.setCurrentState(new DoHouseWork());
        this.stateMachine.setGlobalState(new VisitRestRoom());
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
    
    changeState(_newState){
        this.stateMachine.changeState(_newState);
    }
    
    update(){
        this.stateMachine.update();
    }
    
    revertToPreviousState(){
        this.stateMachine.revertToPreviousState();
    }
    
    render(){
        
    }
}

export default Wife;