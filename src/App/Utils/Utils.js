/*jshint browser: true*/
/*jshint esnext: true*/

let instance = null;

class Utils{
    constructor(){
        if(!instance){
            instance = this;
            this._type = "Utils";
        }

        return instance;
    }

    static inserIntoSortedNumberArray(value, array){
        //@DESC: inserts a value and sorts it out.
        let low = 0, high = array.length;

        while (low < high) {
            const mid = (low + high) >>> 1;
            if (array[mid] < value) {
                low = mid + 1;
            }
            else high = mid;
        }
        array.splice(low, 0,value);
        return array;
    }
    
    inserIntoSortedObjectArray(value, array, key){
        //@DESC: inserts a value and sorts it out.
        let low = 0, high = array.length;

        while (low < high) {
            const mid = (low + high) >>> 1;
            if (array[mid][key] < value) {
                low = mid + 1;
            }
            else high = mid;
        }
        array.splice(low, 0, value);
        return array;
    }
}

export default new Utils();