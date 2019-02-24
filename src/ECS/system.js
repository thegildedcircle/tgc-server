export const System = {
  greet: (entities) => {
    entities.filter(e => e.hasComponent('name'))
      .forEach(e => console.log(`Hello ${e.getComponent('name')[0]}!`))

    return entities
  }
}