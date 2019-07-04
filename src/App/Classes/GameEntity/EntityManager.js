/*jshint browser: true*/
/*jshint esnext: true*/

let instance = null;

class EntityManager{
    constructor(){
        if(!instance){
            instance = this;
            this._type = "EntityManager";

            //@DESC: holds a key-value pair list of all game objects in the game,
            //with basic info and reference to the object itself.
            //key: is the id of the entity.
            //vaue: is an object with the structure {id, inWorld, ref}.
            //@PARAM(inWorld): an entity can be in the list without present in the scene/game-loop.
            this.entityMap = {};

            //@DESC: the list of game objects parsed in the game loop.
            this.gameEntityList = [];
        }

        return instance;
    }

    registerEntity(_entity, _inWorld = true){
        //@DESC: Registers an entity to the game.
        this.entityMap[`${_entity.id}`] = {
            id: _entity.id,
            inWorld: _inWorld,
            ref: _entity
        };
        //@DESC: Add it to the game loop if inWorld is true
        if(_inWorld){
            this.gameEntityList.push(_entity);
        }
        
        return _entity;
    }

    removeEntity(_id){
        let entityMap = this.entityMap[`${_id}`];
        if(!entityMap){
            throw {error_mssg: `Error: Entity removal failed for id:${_id}.\nNo such id  exists.`};
        }
        if(entityMap.inWorld){
            const index = this.gameEntityList.findIndex(entity => entity.id === _id);
            if(index > -1){
                this.gameEntityList.splice(index, 1);
            }
            else{
                throw {error_mssg: `Error: Entity removal failed for id:${_id}.\nNo such entity found in gameEntityList.`};
            }
        }
        
        entityMap = null;
        delete this.entityMap[`${_id}`];
    }
    
    getGameEntityList(){
        return this.gameEntityList;
    }

    getEntityById(_id){
        //@DESC: returns an entity by id
        return this.entityMap[`${_id}`].ref;
    }

    getEntityInWorld(_id){
        //@DESC: returns if the entity is in the game world.
        return this.entityMap[`${_id}`].ref;
    }
}

export default new EntityManager();