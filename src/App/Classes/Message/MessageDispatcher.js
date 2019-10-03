/*jshint browser: true*/
/*jshint esnext: true*/

import Telegram from "../Message/Telegram";
import Utils from "../../Utils/Utils";
import Game from "../../Classes/Engine/Game";
import EntityManager from "../GameEntity/EntityManager";

let instance = null;

class MessageDispatcher {
    constructor() {
        if (!instance) {
            instance = this;
            this._type = "MessageDispatcher";

            //@PARAM(priorityQ): Used as a container for delayed messages.
            //This array is sorted with immediate executing messages towards the front ([0]).
            this.priorityQ = [];
        }

        return instance;
    }

    dispatchMessage(delay = 0, sender, reciever, messageType, extraInfo) {
        //@DESC: Send message to itself/another agent.

        //@DESC: calculate the dispathch time based on current game time.
        //@TODO: need to calculate game-in-time instead of ticks once timing calculations are sorted out.
        const gameInstance = new Game();
        const dispatchTime = gameInstance.ticks + delay;

        //@DESC: Create the telegram
        const telegram = new Telegram({ sender, reciever, dispatchTime, messageType, extraInfo });

        //@DESC: Insert the msg into the sorted queue.
        //@TODO: merging similar msgs within short intervals need to be combined into a single msg
        //this will prevent flooding of the queue with similar messages 
        Utils.inserIntoSortedObjectArray(telegram, this.priorityQ, "dispatchTime");
    }

    dispatchQueuedMessages() {
        //@DESC: this method runs every update cycle and checks any message has expired timestamps.
        //if yes, then they are dispatched to the recipient along the message.
        //once done, the message is removed from the queue.

        const gameInstance = new Game();
        const currentTime = gameInstance.ticks;
        let removedMessages = [];
        for (let i = 0; i < this.priorityQ.length; ++i) {
            if (this.priorityQ[i].dispatchTime <= currentTime) {
                removedMessages.push(this.priorityQ[i]);
            }
            else {
                break;
            }
        }
        if (removedMessages.length) {
            this.priorityQ.splice(0, removedMessages.length);
            removedMessages.forEach(message => {
                let reciver = message.getReciever();
                reciver = [].concat(reciver);
                reciver.forEach(target => {
                    this.discharge(target, {...message});
                });
            });
        }
        removedMessages = [];
    }

    discharge(reciverId, message) {
        const reciver = EntityManager.getEntityById(reciverId);
        reciver.handleMessage(message);
    }

    insertIntoPriorityQ(message) {
        //@DESC: insert message into the queue after sorting in ascending order of delay time.
        const time = message.getDispatchTime();
    }
}

export default new MessageDispatcher();