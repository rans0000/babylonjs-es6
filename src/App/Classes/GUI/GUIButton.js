import { Button } from "@babylonjs/gui/2D/controls/button";
import { Control } from "@babylonjs/gui/2D/controls/control";

import BaseGameEntity from "../GameEntity/BaseGameEntity";
import EntityManager from "../GameEntity/EntityManager";

class GUIButton extends BaseGameEntity {
    constructor(config, advancedTexture) {
        super(config);
        this.createBasicButton(config, advancedTexture);
    }

    createBasicButton(config, advancedTexture) {
        let button = Button.CreateSimpleButton(config.name, config.text);

        button.id = this.id;
        button.width = config.width || "60px";
        button.height = config.height || "40px";
        button.top = config.top || "10px";
        button.left = config.left || 0;
        button.color = config.color || "white";
        button.cornerRadius = config.cornerRadius || 5;
        button.background = config.background || "green";
        if (config.onClick) {
            button.onPointerUpObservable.add(config.onClick.bind(this));
        }
        button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        button.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        advancedTexture.addControl(button);
        EntityManager.registerEntity(button, null, false);
        ++this.index;
    }
}

export default GUIButton;