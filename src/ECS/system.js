export const System = {
  greet: (entities) => {
    entities.filter(e => e.hasComponent('name'))
      .forEach(e => console.log(`Hello ${e.getComponent('name')[0]}!`))

    return entities
  },

  greet2: (entities) => {
    entities.filter(e => e.hasComponent('name'))
    .forEach(e => console.log(`Yo ${e.getComponent('name')[0]}!`))

  return entities
  }
}