/*jshint browser: true*/
/*jshint esnext: true*/

import EntityManager from "../../../Classes/GameEntity/EntityManager";
import MessageDispatcher from "../../../Classes/Message/MessageDispatcher";
import GUI from "../../../Classes/GUI/GUI";
import { MSG_TYPE } from "../../../Utils/Constants";

class FlockUI {
    constructor() {
        this.createUIButons();
    }

    createUIButons() {
        const seekButton = GUI.createButton({
            name: "btnSeek",
            text: "Seek",
            left: "10px",
            onClick: function () {
                const seekButtonId = this.id;
                const vehicleId = EntityManager.getEntityByName("vehicle").id;
                MessageDispatcher.dispatchMessage(0, seekButtonId, vehicleId, MSG_TYPE.SEEK_MODE);
            }
        });

        const fleeButton = GUI.createButton({
            name: "btnFlee",
            text: "Flee",
            left: "80px",
            onClick: function () {
                const seekButtonId = this.id;
                const vehicleId = EntityManager.getEntityByName("vehicle").id;
                MessageDispatcher.dispatchMessage(0, seekButtonId, vehicleId, MSG_TYPE.FLEE_MODE);
            }
        });

        const arriveButton = GUI.createButton({
            name: "btnArrive",
            text: "Arrive",
            left: "150px",
            onClick: function () {
                const seekButtonId = this.id;
                const vehicleId = EntityManager.getEntityByName("vehicle").id;
                MessageDispatcher.dispatchMessage(0, seekButtonId, vehicleId, MSG_TYPE.ARRIVE_MODE);
            }
        });

    }
}

export default FlockUI;