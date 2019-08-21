/*jshint browser: true*/
/*jshint esnext: true*/

import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import { Button } from "@babylonjs/gui/2D/controls/button";
import { Control } from "@babylonjs/gui/2D/controls/control";

import BaseGameEntity from "../../../Classes/GameEntity/BaseGameEntity";
import EntityManager from "../../../Classes/GameEntity/EntityManager";
import MessageDispatcher from "../../../Classes/Message/MessageDispatcher";
import { MSG_TYPE } from "../../../Utils/Constants";

class FlockUI{
    constructor(){
        let advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
        this.createSeekButton(advancedTexture);
        this.createFleeButton(advancedTexture);
    }

    createSeekButton(advancedTexture){
        //@DESC: create fake entity to get entity id
        const tempEntity = new BaseGameEntity({});
        let button = Button.CreateSimpleButton("seekButton", "Seek");

        button.id = tempEntity.id;
        button.width = "60px";
        button.height = "40px";
        button.top = "10px";
        button.left = "10px";
        button.color = "white";
        button.cornerRadius = 5;
        button.background = "green";
        button.onPointerUpObservable.add(function() {
            const seekButtonId = 0;
            const movingObjectId = 3;
            MessageDispatcher.dispatchMessage(0, seekButtonId, movingObjectId, MSG_TYPE.SEEK_MODE);
        });
        button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        button.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        advancedTexture.addControl(button);
        EntityManager.registerEntity(button, null, false);
    }

    createFleeButton(advancedTexture){
        const tempEntity = new BaseGameEntity({});
        let button = Button.CreateSimpleButton("fleeButton", "Flee");
        
        button.id = tempEntity.id;
        button.width = "60px";
        button.height = "40px";
        button.top = "10px";
        button.left = "80px";
        button.color = "white";
        button.cornerRadius = 5;
        button.background = "green";
        button.onPointerUpObservable.add(function() {
            const seekButtonId = 1;
            const movingObjectId = 3;
            MessageDispatcher.dispatchMessage(0, seekButtonId, movingObjectId, MSG_TYPE.FLEE_MODE);
        });
        button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        button.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        advancedTexture.addControl(button);
        EntityManager.registerEntity(button, null, false);
    }
}

export default FlockUI;