/*jshint browser: true*/
/*jshint esnext: true*/

import State from "./State.js";

class StateMachine{
    constructor(_owner){
        this.owner = _owner;
        this.currentState = null;
        this.previousState = null;
        this.globalState = null;
    }

    //@DESC: use these to initialize the fsm.
    setCurrentState(_newState){ this.currentState = _newState; }
    setPreviousState(_newState){ this.previousState = _newState; }
    setGlobalState(_newState){ this.globalState = _newState; }

    //@DESC: accessors
    getCurrentState(){ return this.currentState; }
    getPreviousState(){ return this.previousState; }
    getGlobalState(){ return this.globalState; }

    update(){
        //@DESC: if global state exists, call its execute method.
        if(this.globalState){
            this.globalState.execute(this.owner);
        }

        //@DESC: if current state exists, call its execute method.
        if(this.currentState){
            this.currentState.execute(this.owner);
        }
    }

    changeState(_newState){
        if(!_newState){
            throw {error_mssg: "Trying to change to a null state."};
            return;
        }

        //@DESC: keep track of previous state.
        this.previousState = this.currentState;

        //@DESC: call exit method of existing state.
        this.currentState.exit(this.owner);

        //@DESC: change state to new state.
        this.currentState = _newState;

        //@DESC: call the entry method of current state.
        this.currentState.enter(this.owner);
    }

    revertToPreviousState(){
        this.changeState(this.previousState);
    }

    //@DESC: returns true if the current state's type is same as the passed parameter.
    isInState(_state){
        return this.currentState.constructor === _state.constructor;
    }
}

export default StateMachine;