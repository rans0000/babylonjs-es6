/*jshint browser: true*/
/*jshint esnext: true*/

export default class Engine{
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId).getContext('2d');
        this.GObjectList = [];
    }
    
    AddGObject(obj){
        this.GObjectList.push(obj);
    }
    
    Update(){
        
    }
    
    Render(){
        
    }
    
    Start(){
        
    }
}