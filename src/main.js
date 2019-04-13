import express from "express";
import lowdb from "lowdb";
import { Server as WebSocket } from "ws";

import { Component, Entity, Manager, System } from "../../ecs/index.js";

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

const man = new Manager();

const baseDamageComponent = Component("baseDamage", true, { value: 0 });
const baseArmourComponent = Component("baseArmour", true, { value: 0 });
const weightComponent = Component("weight", false, { value: 0 });
const criticalChanceComponent = Component("critical", false, { value: 0 });

const healthComponent = Component("health", true, { value: 0 });

// Equipment components -- equippedItem will be the ID of the item entity
const mainHandComponent = Component("mainHand", true, { equippedItem: "" });
const offHandComponent = Component("offHand", true, { equippedItem: "" });
const headComponent = Component("head", true, { equippedItem: "" });

const playerSword = man.addEntity("", [
  baseDamageComponent({ value: 5 }),
  weightComponent({ value: 2 }),
]);
const playerHelmet = man.addEntity("", [
  baseArmourComponent({ value: 2 }),
  weightComponent({ value: 1 }),
]);
const goblinSword = man.addEntity("", [
  baseDamageComponent({ value: 2 }),
  weightComponent({ value: 2 }),
  criticalChanceComponent({ value: 0.1 }),
]);
const goblinShield = man.addEntity("", [
  baseArmourComponent({ value: 4 }),
  weightComponent({ value: 2 }),
]);

man.registerEntityTemplate("humanoid", [
  healthComponent({ value: 100 }),
  mainHandComponent(),
  offHandComponent(),
  headComponent(),
]);
const player = man.addEntity("humanoid", [
  mainHandComponent({ equippedItem: playerSword }),
  headComponent({ equippedItem: playerHelmet }),
]);
const goblin = man.addEntity("humanoid", [
  healthComponent({ value: 65 }),
  mainHandComponent({ equippedItem: goblinSword }),
  offHandComponent({ equippedItem: goblinShield }),
]);

man.runSystem(
  System(
    (entities, state) => {
      const player = entities.findIndex(e => e.id === state.attacker);
      const goblin = entities.findIndex(e => e.id === state.defender);
      const weapon = entities.findIndex(
        e => e.id === entities[player].getComponent("mainHand").state.equippedItem
      );

      const damage = entities[weapon].getComponent("baseDamage").state.value;

      entities[goblin].getComponent("health").state.value -= damage;
    },
    { attacker: player, defender: goblin }
  )
);

console.dir(man.entities.filter(e => e.id === player || e.id === goblin), { depth: null });
