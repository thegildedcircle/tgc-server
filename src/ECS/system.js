export const System = {
  attack: entities => {
    return entities.mapIf(
      e => e.hasComponent("attacking"),
      e => {
        e.getComponents("attacking").forEach(target =>
          entities.mapIf(
            t => t.id === target,
            t => {
              t.getComponents("attributes")[0].health -= e.getComponents(
                "level"
              )[0].level;

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
      e =>
        e.hasComponent("attributes") &&
        e.getComponents("attributes")[0].health <= 0,
      entity => {
        entity.removeComponents("attacking", c => true);
        entities.mapIf(
          e => e.hasComponent("attacking"),
          e => e.removeComponents("attacking", c => c === entity.id)
        );

        return entity;
      }
    );
  }
};
