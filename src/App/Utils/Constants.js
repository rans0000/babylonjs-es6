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
    FIGHTING: "FIGHTING"
};

Object.freeze(MSG_TYPE);
//-----------------------------------------------

export {LOCATION, MSG_TYPE};