import express from 'express'
import lowdb from 'lowdb'
import { Server as WebSocket } from 'ws'

// Constants -------------------------------------------------------------------
const PORT = process.env.PORT || 3000

// Express Server --------------------------------------------------------------
const server = express()
  .listen(PORT, () => {
    
  })

// Web Socket ------------------------------------------------------------------
const socket = new WebSocket({ server })
const clients = {}

socket.on('connection', ws => {
  ws.on('message', payload => {
    console.log(payload)
  })

  ws.on('close', () => {

  })
})

import ECS from './ECS'
const man = new ECS.Manager()
man
  .addEntity([
    ECS.Component.Name('andy'),
    ECS.Component.Attributes(),
    ECS.Component.Level(),
  ])
  .addEntity([
    ECS.Component.Name('alex'),
    ECS.Component.Attributes(),
    ECS.Component.Level(),
    ECS.Component.Attacking(
      man.getEntities()
        .find(e => e.getComponents('name')[0] === 'andy')
        .id
    )
  ])
  .addSystem(ECS.System.attack)
  .runSystems()

console.dir(man, { depth: null })
