import express from "express";
import lowdb from "lowdb";
import { Server as WebSocket } from "ws";

// Constants -------------------------------------------------------------------
const PORT = process.env.PORT || 3000;

// Express Server --------------------------------------------------------------
const server = express().listen(PORT, () => {});

// Web Socket ------------------------------------------------------------------
const socket = new WebSocket({ server });
const clients = {};

socket.on("connection", ws => {
  ws.on("message", payload => {
    console.log(payload);
  });

  ws.on("close", () => {});
});

import ECS from "./ECS";
const man = new ECS.Manager();
const swordID = man.addEntity([
  ECS.Component.Name("sword"),
  ECS.Component.Value(10),
  ECS.Component.Equippable(["mainhand"], ["offhand"]),
  ECS.Component.DamageModifier(5),
]);
const battleaxeID = man.addEntity([
  ECS.Component.Name("battleaxe"),
  ECS.Component.Value(10),
  ECS.Component.Equippable(["mainhand", "offhand"]),
  ECS.Component.DamageModifier(8),
]);
const hoodedCloakID = man.addEntity([
  ECS.Component.Name("hoodedCloak"),
  ECS.Component.Value(8),
  ECS.Component.Equippable(["head", "back"]),
]);
const andyID = man.addEntity([
  ECS.Component.Name("andy"),
  ECS.Component.Attributes(),
  ECS.Component.Level(),
  ECS.Component.Inventory(),
  // ECS.Component.Inventory([man.getEntities().find(e => e.getComponents("name")[0] === "sword").id]),
  ECS.Component.Equipped({ mainhand: swordID }),
]);
const alexID = man.addEntity([
  ECS.Component.Name("alex"),
  ECS.Component.Attributes(150),
  ECS.Component.Level(),
  ECS.Component.Attacking(man.getEntities().find(e => e.getComponents("name")[0] === "andy").id, 3),
  ECS.Component.Inventory(),
  // ECS.Component.Inventory([
  // man.getEntities().find(e => e.getComponents("name")[0] === "battleaxe").id,
  // ]),
  ECS.Component.Equipped({ mainhand: battleaxeID, offhand: battleaxeID }),
]);
man
  .updateEntities(
    e => e.hasComponent("name") && e.getComponents("name")[0] === "andy",
    e =>
      e.addComponent(
        ECS.Component.Attacking(
          man.getEntities().find(e => e.getComponents("name")[0] === "alex").id,
          5
        )
      )
  )
  .addSystem(ECS.System.attack)
  .addSystem(ECS.System.checkDead);

for (let i = 0; i <= 200; i++) {
  man.runSystems();
}

console.dir(man, { depth: null });
