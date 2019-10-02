/*jshint browser: true*/
/*jshint esnext: true*/

const LOCATION = {
    GOLD_MINE: "GOLD_MINE",
    BANK: "BANK",
    SALOON: "SALOON",
    HOME: "HOME",
    KITCHEN: "KITCHEN",
    RESTROOM: "RESTROOM"
};

Object.freeze(LOCATION);
//-----------------------------------------------

const MSG_TYPE = {
    ARRIVED_HOME: "ARRIVED_HOME",
    ARRIVED_SALOON: "ARRIVED_SALOON",
    STEW_READY: "STEW_READY",
    FIGHTING: "FIGHTING",
    
    TARGET_MOVED: "TARGET_MOVED",
    SEEK_MODE: "SEEK_MODE",
    FLEE_MODE: "FLEE_MODE",
    ARRIVE_MODE: "ARRIVE_MODE"
};

Object.freeze(MSG_TYPE);
//-----------------------------------------------

const ENTITY_TYPE = {
    GEOMETRY: "GEOMETRY",
    BUTTON: "BUTTON",
};

Object.freeze(ENTITY_TYPE);
//-----------------------------------------------

export {LOCATION, MSG_TYPE, ENTITY_TYPE};