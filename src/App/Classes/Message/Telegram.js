/*jshint browser: true*/
/*jshint esnext: true*/

class Telegram{
    constructor(_msg){
        this.sender = _msg.sender;
        this.reciever = _msg.reciever;
        this.messageType = _msg.messageType;
        this.dispatchTime = _msg.dispatchTime;
        this.extraInfo = _msg.extraInfo;
    }
    
    getDispatchTime(){
        return this.dispatchTime;
    }
    
    getReciever(){
        return this.reciever;
    }
}

export default Telegram;