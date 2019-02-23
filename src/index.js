import { Elm } from './Engine.elm'
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
    payload = JSON.parse(payload)

    switch (payload.command) {
      case 'login':
        if (clients[payload.data.username]) {
          ws.send(JSON.stringify({
            message: `${payload.data.username} is already logged in.`
          }), err => console.log(err))
        } else {
          clients[payload.data.username] = ws
          ws.send(JSON.stringify({
            message: `Logged in as ${payload.data.username}`
          }), err => console.log(err))
        }
    }
  })

  ws.on('close', () => {
    console.log('Client disconnected')
  })
})



// Elm Game Engine -------------------------------------------------------------
const app = Elm.Engine.init({

})

// Elm -> Js port subscriptions ------------------------------------------------
app.ports.debugLog.subscribe(msg => {
  console.dir(msg, { depth: null })
})

