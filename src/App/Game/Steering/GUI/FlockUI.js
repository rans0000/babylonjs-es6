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

        //@DESC: Create seek button
        const seekButton = GUI.createButton({
            name: "btnSeek",
            text: "Seek",
            left: "10px",
            onClick: function () {
                const buttonId = this.id;
                const seekTargetId = EntityManager.getEntityByName("seekTarget").id;
                const vehicleId = EntityManager.getEntityByName("vehicle").id;
                MessageDispatcher.dispatchMessage(0, buttonId, [seekTargetId, vehicleId], MSG_TYPE.SEEK_MODE);
            }
        });

        //@DESC: Create flee button
        const fleeButton = GUI.createButton({
            name: "btnFlee",
            text: "Flee",
            left: "80px",
            onClick: function () {
                const buttonId = this.id;
                const seekTargetId = EntityManager.getEntityByName("seekTarget").id;
                const vehicleId = EntityManager.getEntityByName("vehicle").id;
                MessageDispatcher.dispatchMessage(0, buttonId, [seekTargetId, vehicleId], MSG_TYPE.FLEE_MODE);
            }
        });

        //@DESC: Create arrive button
        const arriveButton = GUI.createButton({
            name: "btnArrive",
            text: "Arrive",
            left: "150px",
            onClick: function () {
                const buttonId = this.id;
                const seekTargetId = EntityManager.getEntityByName("seekTarget").id;
                const vehicleId = EntityManager.getEntityByName("vehicle").id;
                MessageDispatcher.dispatchMessage(0, buttonId, [seekTargetId, vehicleId], MSG_TYPE.ARRIVE_MODE);
            }
        });
        
        //@DESC: Create pursue button
        const pursuitButton = GUI.createButton({
            name: "btnPursuit",
            text: "Pursuit",
            left: "220px",
            onClick: function () {
                const buttonId = this.id;
                const seekTargetId = EntityManager.getEntityByName("seekTarget").id;
                const vehicleId = EntityManager.getEntityByName("vehicle").id;
                MessageDispatcher.dispatchMessage(0, buttonId, [seekTargetId, vehicleId], MSG_TYPE.PURSUIT_MODE);
            }
        });
        
        //@DESC: Create pursue button
        const evadeButton = GUI.createButton({
            name: "btnEvade",
            text: "Evade",
            left: "290px",
            onClick: function () {
                const buttonId = this.id;
                const seekTargetId = EntityManager.getEntityByName("seekTarget").id;
                const vehicleId = EntityManager.getEntityByName("vehicle").id;
                MessageDispatcher.dispatchMessage(0, buttonId, [seekTargetId, vehicleId], MSG_TYPE.EVADE_MODE);
            }
        });

    }
}

export default FlockUI;