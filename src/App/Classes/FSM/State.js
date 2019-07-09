/*jshint browser: true*/
/*jshint esnext: true*/

class State{

    enter(){
        throw({error_mssg: "enter method is virtual. Impliment class specific  definition."});
    }

    execute(){
        throw({error_mssg: "execute method is virtual. Impliment class specific  definition."});
    }

    exit(){
        throw({error_mssg: "exit method is virtual. Impliment class specific  definition."});
    }
    
    onMessage(entity, message){
        //@DESC: This executes if the agent recieves a message from the message dispatcher.
    }
}

export default State;