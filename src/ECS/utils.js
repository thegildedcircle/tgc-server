import shortid from 'shortid'

export class EntityList extends Array {
  filterMap (predicate, fn) {
    return this.map(entity => predicate(entity) ? fn(entity) : entitycl)
  }

  push (entity) {
    super.push({ id: shortid.generate(), entity })
  }
}