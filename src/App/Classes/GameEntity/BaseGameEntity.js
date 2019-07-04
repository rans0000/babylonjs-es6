/*jshint browser: true*/
/*jshint esnext: true*/

class BaseGameEntity{
    constructor(){
        this.id = BaseGameEntity.nextId++;
    }

    update(){
        throw({error_mssg: "Update method is virtual. Impliment class specific definition."});
    }

    render(){
        throw({error_mssg: "render method is virtual. Impliment class specific definition."});
    }

    getId(){
        return this.id;
    }
}

BaseGameEntity.nextId = 0;

export default BaseGameEntity;