import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";

import GUIButton from "./GUIButton";
import { ENTITY_TYPE } from "../../Utils/Constants";

let instance = null;

class GUI {
    constructor() {
        if (!instance) {
            instance = this;
        }

        return instance;
    }

    createButton(config) {
        this.advancedTexture = !this.advancedTexture ? AdvancedDynamicTexture.CreateFullscreenUI("UI") : this.advancedTexture;
        config.type = ENTITY_TYPE.BUTTON;
        const button = new GUIButton(config, this.advancedTexture);
        return button;
    }


}

export default new GUI();