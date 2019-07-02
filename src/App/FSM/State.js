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
}

export default State;