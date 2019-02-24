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

const andy = new ECS.Entity('E+Andy', [])
  .addComponent(ECS.Component.Attributes())
  .addComponent(ECS.Component.Level(10, 100))
  .addComponent(ECS.Component.Name('andy'))

const alex = new ECS.Entity('E+Alex', [])
  .addComponent(ECS.Component.Attributes())
  .addComponent(ECS.Component.Level(10, 100))
  .addComponent(ECS.Component.Name('alex'))

const noGreet = new ECS.Entity('E+NoGreet', [])
  .addComponent(ECS.Component.Attributes())
  .addComponent(ECS.Component.Level(10, 100))

const entites = [ andy, noGreet, alex ]

ECS.System.greet(entites)