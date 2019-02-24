export class Entity {
  constructor() {
    this.id = null;
    this.components = [];
  }

  setID(id = "") {
    this.id = id;

    return this;
  }

  addComponent(component) {
    if (!component.unique) this.components.push(component);
    else if (!this.components.some(c => c.name === component.name))
      this.components.push(component);
    else
      console.warn(
        `Attempting to add non-unique component "${component.name}" to "${
          this.id
        }" when that component already exists!`
      );

    return this;
  }

  removeComponents(componentName, predicate) {
    this.components = this.components.filter(
      c => !(c.name === componentName && predicate(c.state))
    );

    return this;
  }

  hasComponent(componentName) {
    return this.components.some(c => c.name === componentName);
  }

  getComponents(componentName) {
    return this.components
      .filter(c => c.name === componentName)
      .map(c => c.state);
  }
}
