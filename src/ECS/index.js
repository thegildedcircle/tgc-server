import { Entity } from './entity'
import { Component } from './component'
import { System } from './system'


export default {
  Entity,
  Component,
  System,
  Manager: class Manager {
    constructor () {
      this.entityCount = 0
      this.entities = []
      this.systems = []
    }

    addEntity (base = '') {
      const id = 
        (+new Date()).toString(16) + 
        (Math.random() * 100000000 | 0).toString(16) +
        this.entityCount++
      const entity = new Entity(id).addComponent(Component.Name('andy'))

      switch (base) {
        default:
          this.entities.push(entity)
      }

      return entity
    }

    removeEntity (id) {
      this.entities = this.entities.filter(e => e.id !== id)
    }

    getEntities () {
      return this.entities
    }

    addSystem (system) {
      this.systems.push(system)
    }

    runSystems () {
      this.entities = this.systems.reduce((e, s) => (e = s(e)), this.entities)
    }
  }
}