// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"aezc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Entity = void 0;

class Entity {
  constructor() {
    this.id = null;
    this.components = [];
  }

  setID(id = '') {
    this.id = id;
    return this;
  }

  addComponent(component) {
    if (!component.unique) this.components.push(component);else if (!this.components.some(c => c.name === component.name)) this.components.push(component);else console.warn(`Attempting to add non-unique component "${component.name}" to "${this.id}" when that component already exists!`);
    return this;
  }

  removeComponents(componentName, predicate) {
    this.components = this.components.filter(c => c.name !== componentName && !predicate(c.state));
    return this;
  }

  hasComponent(componentName) {
    return this.components.some(c => c.name === componentName);
  }

  getComponents(componentName) {
    return this.components.filter(c => c.name === componentName).map(c => c.state);
  }

}

exports.Entity = Entity;
},{}],"tIyq":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = void 0;
const Component = {
  /** Simple name component, this allows things to be identified in the game
   *  world. Most things should have a name.
   */
  Name: (name = '') => ({
    name: 'name',
    unique: true,
    state: name
  }),

  /** Entities have the Value component when they can be sold to a vendor or
   *  traded between players. The component describes how much gold the entity
   *  is worth, before taking into account any modifiers.
   */
  Value: (value = 0) => ({
    name: 'value',
    unique: true,
    state: value
  }),

  /** The Level component is for entities such as players and enemies that can
   *  earn experience, or otherwise have their functionality affected by their
   *  level. 
   */
  Level: (level = 1, exp = 0) => ({
    name: 'level',
    unique: true,
    state: {
      level,
      exp
    }
  }),

  /** 
   * 
   */
  Equippable: slot => ({
    name: 'equippable',
    unique: true,
    state: {
      slot
    }
  }),

  /**
   * 
   */
  Attributes: (health = 100) => ({
    name: 'attributes',
    unique: true,
    state: {
      health
    }
  }),

  /**
   * 
   */
  Attacking: target => ({
    name: 'attacking',
    unique: false,
    state: target
  })
};
exports.Component = Component;
},{}],"pkl2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.System = void 0;
const System = {
  greet: entities => {
    entities.filter(e => e.hasComponent('name')).forEach(e => console.log(`Hello ${e.getComponents('name')[0]}!`));
    return entities;
  },
  attack: entities => {
    // - For every entity that has an attacking component
    // - apply some damage to the target entities health attribute
    return entities.filterMap(e => e.hasComponent('attacking'), e => {
      e.getComponents('attacking').forEach(target => entities.filterMap(t => t.id === target, t => {
        t.getComponents('attributes')[0].health -= e.getComponents('level')[0].level;
        return t;
      }));
      return e;
    });
  },
  checkDead: entities => {
    // CHeck health = 0
    // Stop things attacking it
    // Stop attacking things
    return entities.filterMap(e => {
      return e.hasComponent('attributes') && e.getComponents('attributes')[0].health <= 0;
    }, e => {
      const id = e.id;
      entities.filterMap(e => {
        return e.hasComponent('attacking');
      }, e => e.removeComponents('attacking', c => c === id));
      return e;
    });
  }
};
exports.System = System;
},{}],"es35":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityList = void 0;

var _shortid = _interopRequireDefault(require("shortid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EntityList extends Array {
  filterMap(predicate, fn) {
    return this.map(entity => predicate(entity) ? fn(entity) : entity);
  }

  push(entity) {
    super.push(entity.setID(_shortid.default.generate()));
    return this;
  }

}

exports.EntityList = EntityList;
},{}],"LTnQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _entity = require("./entity");

var _component = require("./component");

var _system = require("./system");

var _utils = require("./utils");

var _default = {
  Entity: _entity.Entity,
  Component: _component.Component,
  System: _system.System,
  Manager: class Manager {
    constructor() {
      this.entityCount = 0;
      this.entities = new _utils.EntityList();
      this.systems = [];
      return this;
    }

    addEntity(components = []) {
      this.entities.push(components.reduce((e, c) => e.addComponent(c), new _entity.Entity()));
      return this;
    }

    removeEntity(id) {
      this.entities = this.entities.filter(e => e.id !== id);
      return this;
    }

    getEntities() {
      return this.entities;
    }

    updateEntities(predicate, fn) {
      this.entities = this.entities.filterMap(predicate, fn);
      return this;
    }

    addSystem(system) {
      this.systems.push(system);
      return this;
    }

    runSystems() {
      this.entities = this.systems.reduce((e, s) => e = s(e), this.entities);
      return this;
    }

  }
};
exports.default = _default;
},{"./entity":"aezc","./component":"tIyq","./system":"pkl2","./utils":"es35"}],"Focm":[function(require,module,exports) {
"use strict";

var _express = _interopRequireDefault(require("express"));

var _lowdb = _interopRequireDefault(require("lowdb"));

var _ws = require("ws");

var _ECS = _interopRequireDefault(require("./ECS"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Constants -------------------------------------------------------------------
const PORT = process.env.PORT || 3000; // Express Server --------------------------------------------------------------

const server = (0, _express.default)().listen(PORT, () => {}); // Web Socket ------------------------------------------------------------------

const socket = new _ws.Server({
  server
});
const clients = {};
socket.on('connection', ws => {
  ws.on('message', payload => {
    console.log(payload);
  });
  ws.on('close', () => {});
});
const man = new _ECS.default.Manager();
man.addEntity([_ECS.default.Component.Name('andy'), _ECS.default.Component.Attributes(), _ECS.default.Component.Level()]).addEntity([_ECS.default.Component.Name('alex'), _ECS.default.Component.Attributes(150), _ECS.default.Component.Level(), _ECS.default.Component.Attacking(man.getEntities().find(e => e.getComponents('name')[0] === 'andy').id)]).updateEntities(e => e.hasComponent('name') && e.getComponents('name')[0] === 'andy', e => e.addComponent(_ECS.default.Component.Attacking(man.getEntities().find(e => e.getComponents('name')[0] === 'alex').id))).addSystem(_ECS.default.System.attack).addSystem(_ECS.default.System.checkDead);

for (let i = 0; i <= 200; i++) {
  man.runSystems();
}

console.dir(man, {
  depth: null
});
},{"./ECS":"LTnQ"}]},{},["Focm"], null)
//# sourceMappingURL=/index.map