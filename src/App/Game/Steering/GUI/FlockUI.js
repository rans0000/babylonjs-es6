/*jshint browser: true*/
/*jshint esnext: true*/

import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import { Button } from "@babylonjs/gui/2D/controls/button";
import { Control } from "@babylonjs/gui/2D/controls/control";

class FlockUI{
    constructor(){
        let advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
        this.createSeekButton(advancedTexture);
        this.createFleeButton(advancedTexture);
    }

    createSeekButton(advancedTexture){
        let button = Button.CreateSimpleButton("but1", "Flock");
        button.width = "150px"
        button.height = "40px";
        button.top = "10px";
        button.left = "10px";
        button.color = "white";
        button.cornerRadius = 5;
        button.background = "green";
        button.onPointerUpObservable.add(function() {
            alert("you did it!");
        });
        button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        button.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        advancedTexture.addControl(button);
    }

    createFleeButton(advancedTexture){
        let button = Button.CreateSimpleButton("but1", "Flee");
        button.width = "150px"
        button.height = "40px";
        button.top = "10px";
        button.left = "170px";
        button.color = "white";
        button.cornerRadius = 5;
        button.background = "green";
        button.onPointerUpObservable.add(function() {
            alert("you did it!");
        });
        button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        button.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        advancedTexture.addControl(button);
    }
}

export default FlockUI;