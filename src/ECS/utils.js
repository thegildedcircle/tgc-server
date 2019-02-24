import shortid from "shortid";

export class EntityList extends Array {
  mapIf(predicate, fn) {
    return this.map(entity => (predicate(entity) ? fn(entity) : entity));
  }

  push(entity) {
    super.push(entity.setID(shortid.generate()));

    return entity;
  }
}
