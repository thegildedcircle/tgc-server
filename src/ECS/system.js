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

    // return entities.map(e =>
    //    e.hasComponent('attacking')
    //     ? (e.getComponents('attacking').forEach(target => {
    //         entities.map(t => t.id === target
    //           ? (t.getComponents('attributes')[0].health -= e.getComponents('level')[0].level, t)
    //           : t)
    //       }), e)
    //     : e
    // )
  },

  // checkDead: (entites) => {
  //   // CHeck health = 0
  //   // Stop things attacking it
  //   // Stop attacking things
  //   return entites.map(e => {
  //     if (e.hasComponent('attributes') && e.getComponents('attributes')[0].health <= 0) {
  //       const id = e.id

  //       entites.map()
  //     }
  //   })
  // }
}