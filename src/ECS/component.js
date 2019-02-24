export const Component = {
  /** Simple name component, this allows things to be identified in the game
   *  world. Most things should have a name.
   */
  Name: (name = '') => ({
    name: 'name',
    unique: true,
    state: name
  }),
  /** Entities have the Value component when they can be sold to a vendor or
   *  traded between players. The component describes how much gold the entity
   *  is worth, before taking into account any modifiers.
   */
  Value: (value = 0) => ({
    name: 'value',
    unique: true,
    state: value
  }),
  /** The Level component is for entities such as players and enemies that can
   *  earn experience, or otherwise have their functionality affected by their
   *  level. 
   */
  Level: (level = 1, exp = 0) => ({
    name: 'level',
    unique: true,
    state: {
      level,
      exp
    }
  }),
  /** 
   * 
   */
  Equippable: (slot) => ({
    name: 'equippable',
    unique: true,
    state: {
      slot
    }
  }),
  /**
   * 
   */
  Attributes: (health = 100) => ({
    name: 'attributes',
    unique: true,
    state: {
      health
    }
  }),
  /**
   * 
   */
  Attacking: (target) => ({
    name: 'attacking',
    unique: false,
    state: target
  })
}