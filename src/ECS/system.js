export const System = {
  attack: entities => {
    return entities.mapIf(
      e => e.hasComponent("attacking"),
      e => {
        e.getComponents("attacking").forEach(target =>
          entities.mapIf(
            t => t.id === target.id,
            t => {
              t.getComponents("attributes")[0].health -= target.damage;

              return t;
            }
          )
        );

        return e;
      }
    );
  },

  checkDead: entities => {
    return entities.mapIf(
      e => e.hasComponent("attributes") && e.getComponents("attributes")[0].health <= 0,
      entity => {
        entity.removeComponents("attacking", c => true);
        entities.mapIf(
          e => e.hasComponent("attacking"),
          e => e.removeComponents("attacking", c => c === entity.id)
        );

        return entity;
      }
    );
  },

  calculateDamage: entities => {
    const attackingEntities = entities.filter(e => e.hasComponent("attacking"));
    const entitiesWithDamageModifiers = entities.filter(e => e.hasComponent("damageModifier"));
    // Loop through all attacking entities, if they have damage modifiers directly applied then
    // add this damage to their attacking components' damage state.
    //
    // Loop through all attackingEntities and work out which ones have equippedItems, loop through
    // equipped items and add any damage modifier amounts to the attacking entities' attacking
    // components' damage state
  },
};
