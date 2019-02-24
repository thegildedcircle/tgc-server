import { Entity } from './entity'
import { Component } from './component'
import { System } from './system'

import { EntityList } from './utils'

export default {
  Entity,
  Component,
  System,
  Manager: class Manager {
    constructor () {
      this.entityCount = 0
      this.entities = new EntityList()
      this.systems = []

      return this
    }

    addEntity (components = []) {
      this.entities.push(components.reduce((e, c) => e.addComponent(c), new Entity()))

      return this
    }

    removeEntity (id) {
      this.entities = this.entities.filter(e => e.id !== id)

      return this
    }

    getEntities () {
      return this.entities
    }

    addSystem (system) {
      this.systems.push(system)
      
      return this
    }

    runSystems () {
      this.entities = this.systems.reduce((e, s) => (e = s(e)), this.entities)

      return this
    }
  }
}