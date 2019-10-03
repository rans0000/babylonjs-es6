/*jshint browser: true*/
/*jshint esnext: true*/

let instance = null;

class EntityManager {
    constructor() {
        if (!instance) {
            instance = this;
            this._type = "EntityManager";

            //@DESC: holds a key-value pair list of all game objects in the game,
            //with basic info and reference to the object itself.
            //key: is the name of the entity.
            //vaue: is an object with the structure {id, inWorld, ref}.
            //entityIdMap: used for backward compatibility with westworld project.
            //@PARAM(inWorld): an entity can be in the list without present in the scene/game-loop.
            this.entityMap = {};
            this.entityIdMap = {};

            //@DESC: the list of game objects parsed in the game loop.
            this.gameEntityList = [];
        }

        return instance;
    }

    registerEntity(_entity, _scene, _inWorld = true) {
        //@DESC: Registers an entity to the game.

        if (this.entityMap.hasOwnProperty(_entity.name)) {
            throw `Error: An entity with name: '${_entity.name}' already exists.`;
        }

        this.entityMap[_entity.name] = {
            id: _entity.id,
            name: _entity.name,
            inWorld: _inWorld,
            ref: _entity
        };

        this.entityIdMap[_entity.id] = this.entityMap[_entity.name];


        if (_inWorld) {
            //@DESC: Add entity to the game loop and connect its 3dmesh if inWorld is true
            _entity.addToScene(_scene);
            this.gameEntityList.push(_entity);
        }

        return _entity;
    }

    removeEntityById(_id) {
        let entity = this.entityMap[_id];
        if (!entity) {
            throw `Error: Entity removal failed for id:${_id}.\nNo such id exists.`;
        }
        if (entity.inWorld) {
            const index = this.gameEntityList.findIndex(entity => entity.id === _id);
            if (index > -1) {
                this.gameEntityList.splice(index, 1);
                //@TODO: Remove entity's 3dmesh from the scene
            }
            else {
                throw `Error: Entity removal failed for id:${_id}.\nNo such entity found in gameEntityList.`;
            }
        }

        delete this.entityIdMap[_id];
        delete this.entityMap[entity.name];
        entity = null;
    }

    removeEntityByName(_name) {
        let entity = this.entityMap[_name];
        if (!entity) {
            throw `Error: Entity removal failed for name:${_name}.\nNo such name exists.`;
        }
        if (entity.inWorld) {
            const index = this.gameEntityList.findIndex(entity => entity.name === _name);
            if (index > -1) {
                this.gameEntityList.splice(index, 1);
                //@TODO: Remove entity's 3dmesh from the scene
            }
            else {
                throw `Error: Entity removal failed for name:${_name}.\nNo such entity found in gameEntityList.`;
            }
        }

        delete this.entityIdMap[`${entity.id}`];
        delete this.entityMap[_name];
        entity = null;
    }

    getGameEntityList() {
        return this.gameEntityList;
    }

    getEntityById(_id) {
        //@DESC: returns an entity by id
        let entity;
        try {
            entity = this.entityIdMap[_id].ref;
        }
        catch (error) {
            if (error instanceof TypeError) {
                throw `Error: No entity with id:${_id} exists`;
            }
            else {
                throw error
            }
        }

        return entity;
    }

    getEntityByName(_name) {
        //@DESC: returns an entity by name
        let entity;
        try {
            entity = this.entityMap[_name].ref;
        }
        catch (error) {
            if (error instanceof TypeError) {
                throw `Error: No entity with name:${_name} exists`;
            }
            else {
                throw error
            }
        }

        return entity;
    }

    getEntityInWorldById(_id) {
        //@DESC: returns if the entity is in the game world.
        return this.entityIdMap[_id].ref;
    }

    getEntityInWorld(_name) {
        //@DESC: returns if the entity is in the game world.
        return this.entityMap[_name].ref;
    }
}

export default new EntityManager();