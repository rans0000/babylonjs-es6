/*jshint browser: true*/
/*jshint esnext: true*/

import BaseGameEntity from "../../../../Classes/GameEntity/BaseGameEntity";
import StateMachine from "../../../../Classes/FSM/StateMachine";
import DoHouseWork from "./DoHouseWork";
import GlobalStates from "./GlobalStates";

class Wife extends BaseGameEntity{
    constructor(config){
        super(config);
        this.name = "Elsa";
        this.location = undefined;
        this.cooking = false;
        
        this.stateMachine = new StateMachine(this);
        this.stateMachine.setCurrentState(new DoHouseWork());
        this.stateMachine.setGlobalState(new GlobalStates());
    }
    
    addToScene(){
        //not applicable as there is nothing to render.
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
    
    setCooking(status){
        this.cooking = status;
    }
    
    isCooking(){
        return this.cooking;
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

export default Wife;