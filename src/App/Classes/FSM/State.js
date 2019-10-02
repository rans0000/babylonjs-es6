/*jshint browser: true*/
/*jshint esnext: true*/

class State{

    enter(){
        throw "Error: 'enter' method is virtual. Impliment class specific  definition.";
    }

    execute(){
        throw "Error: 'execute' method is virtual. Impliment class specific  definition.";
    }

    exit(){
        throw "Error: 'exit' method is virtual. Impliment class specific  definition.";
    }
    
    onMessage(entity, message){
        //@DESC: This executes if the agent recieves a message from the message dispatcher.
    }
}

export default State;