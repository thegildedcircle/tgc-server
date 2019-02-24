export class Entity {
  constructor (id, components = []) {
    this.id = id
    this.components = components
  }

  addComponent (component) {
    if (!component.unique)
      this.components.push(component)
    else if (!this.components.some(c => c.name === component.name))
      this.components.push(component)
    else
      console.warn(`Attempting to add non-unique component "${component.name}" to "${this.id}" when that component already exists!`)

    return this
  }

  removeComponent (componentName) {
    this.components = this.components.filter(c => c.name !== componentName)    

    return this
  }

  hasComponent (componentName) {
    return this.components.some(c => c.name === componentName)
  }

  getComponent (componentName) {
    return this.components.filter(c => c.name === componentName)
      .map(c => c.state)
  }
}