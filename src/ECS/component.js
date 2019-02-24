export const Component = {
  /** Simple name component, this allows things to be identified in the game
   *  world. Most things should have a name.
   */
  Name: (name = "") => ({
    name: "name",
    unique: true,
    state: name,
  }),
  /** Entities have the Value component when they can be sold to a vendor or
   *  traded between players. The component describes how much gold the entity
   *  is worth, before taking into account any modifiers.
   */
  Value: (value = 0) => ({
    name: "value",
    unique: true,
    state: value,
  }),
  /** The Level component is for entities such as players and enemies that can
   *  earn experience, or otherwise have their functionality affected by their
   *  level.
   */
  Level: (level = 1, exp = 0) => ({
    name: "level",
    unique: true,
    state: {
      level,
      exp,
    },
  }),
  /**
   *
   */
  Equippable: (...slotOptions) => ({
    name: "equippable",
    unique: true,
    state: {
      slotOptions,
    },
  }),
  /**
   *
   */
  Inventory: (itemIDs = []) => ({
    name: "inventory",
    unique: true,
    state: itemIDs,
  }),
  /**
   *
   */
  Equipped: ({
    head = null,
    back = null,
    torso = null,
    legs = null,
    hands = null,
    feet = null,
    mainhand = null,
    offhand = null,
    ring1 = null,
    ring2 = null,
  } = {}) => ({
    name: "equipped",
    unique: true,
    state: {
      head,
      back,
      torso,
      legs,
      hands,
      feet,
      mainhand,
      offhand,
      ring1,
      ring2,
    },
  }),
  /**
   *
   */
  Damage: (value = 0) => ({
    name: "damage",
    unique: false,
    state: value,
  }),
  /**
   *
   */
  DamageModifier: (value = 0) => ({
    name: "damageModifier",
    unique: false,
    state: value,
  }),
  /**
   *
   */
  Attributes: (health = 100) => ({
    name: "attributes",
    unique: true,
    state: {
      health,
    },
  }),
  /**
   *
   */
  Attacking: (targetID, damage = 0) => ({
    name: "attacking",
    unique: false,
    state: {
      id: targetID,
      damage,
    },
  }),
};
