export const System = {
  greet: (entities) => {
    entities.filter(e => e.hasComponent('name'))
      .forEach(e => console.log(`Hello ${e.getComponents('name')[0]}!`))

    return entities
  },

  attack: (entities) => {
    // - For every entity that has an attacking component
    // - apply some damage to the target entities health attribute
    return entities.filterMap(e => e.hasComponent('attacking'), e => {
      e.getComponents('attacking').forEach(target =>
        entities.filterMap(t => t.id === target, t => {
          t.getComponents('attributes')[0].health -= e.getComponents('level')[0].level

          return t
        })
      )

      return e
    })
  },

  checkDead: (entities) => {
    // CHeck health = 0
    // Stop things attacking it
    // Stop attacking things
    return entities.filterMap(e => {
      return e.hasComponent('attributes') && e.getComponents('attributes')[0].health <= 0
    }, e => {
      const id = e.id
      entities.filterMap(
        e => {
          return e.hasComponent('attacking')
        },
        e => e.removeComponents('attacking', c => c === id)
      )
      return e
    })
  }
}
