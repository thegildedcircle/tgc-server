import { Entity } from "./entity";
import { EntityList } from "./utils";

export class Manager {
  constructor() {
    this.entityCount = 0;
    this.entities = new EntityList();
    this.systems = [];

    return this;
  }

  addEntity(components = []) {
    this.entities.push(
      components.reduce((e, c) => e.addComponent(c), new Entity())
    );

    return this;
  }

  removeEntity(id) {
    this.entities = this.entities.filter(e => e.id !== id);

    return this;
  }

  getEntities() {
    return this.entities;
  }

  updateEntities(predicate, fn) {
    this.entities = this.entities.filterMap(predicate, fn);

    return this;
  }

  addSystem(system) {
    this.systems.push(system);

    return this;
  }

  runSystems() {
    this.entities = this.systems.reduce((e, s) => (e = s(e)), this.entities);

    return this;
  }
}
