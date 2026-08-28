import { e as effectScope, r as reactive, w as watch, c as computed, u as unref, s as shallowReactive, a as shallowRef, d as defineComponent, i as inject, h, p as provide, b as ref, f as watchEffect, n as nextTick, g as getCurrentInstance, _ as _export_sfc, j as useI18n, k as resolveComponent, l as ssrRenderAttrs_1, m as mergeProps, o as ssrRenderClass_1, q as ssrRenderComponent_1, t as withCtx, v as ssrInterpolate_1, x as createTextVNode, y as toDisplayString, z as useSSRContext, A as ssrRenderStyle_1, B as ssrRenderAttr_1, C as ssrIncludeBooleanAttr, D as ssrLooseContain_1, E as ssrRenderList_1, F as ssrRenderSlot_1, G as openBlock, H as createBlock, I as createCommentVNode, J as createVNode, K as ssrLooseEqual_1, L as es, M as en, N as createI18n, O as createSSRApp, P as renderToString_1 } from "./chunks/es-dxbRx2cL.js";
import { setupDevtoolsPlugin } from "@vue/devtools-api";
import braintree from "braintree-web";
import qrcode from "qrcode-generator";
import "@intlify/message-compiler";
import "@vue/compiler-ssr";
import "node:stream";
/*!
 * vuex v4.1.0
 * (c) 2022 Evan You
 * @license MIT
 */
var storeKey = "store";
function forEachValue(obj, fn) {
  Object.keys(obj).forEach(function(key) {
    return fn(obj[key], key);
  });
}
function isObject(obj) {
  return obj !== null && typeof obj === "object";
}
function isPromise(val) {
  return val && typeof val.then === "function";
}
function assert(condition, msg) {
  if (!condition) {
    throw new Error("[vuex] " + msg);
  }
}
function partial(fn, arg) {
  return function() {
    return fn(arg);
  };
}
function genericSubscribe(fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend ? subs.unshift(fn) : subs.push(fn);
  }
  return function() {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  };
}
function resetStore(store, hot) {
  store._actions = /* @__PURE__ */ Object.create(null);
  store._mutations = /* @__PURE__ */ Object.create(null);
  store._wrappedGetters = /* @__PURE__ */ Object.create(null);
  store._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
  var state = store.state;
  installModule(store, state, [], store._modules.root, true);
  resetStoreState(store, state, hot);
}
function resetStoreState(store, state, hot) {
  var oldState = store._state;
  var oldScope = store._scope;
  store.getters = {};
  store._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computedObj = {};
  var computedCache = {};
  var scope = effectScope(true);
  scope.run(function() {
    forEachValue(wrappedGetters, function(fn, key) {
      computedObj[key] = partial(fn, store);
      computedCache[key] = computed(function() {
        return computedObj[key]();
      });
      Object.defineProperty(store.getters, key, {
        get: function() {
          return computedCache[key].value;
        },
        enumerable: true
        // for local getters
      });
    });
  });
  store._state = reactive({
    data: state
  });
  store._scope = scope;
  if (store.strict) {
    enableStrictMode(store);
  }
  if (oldState) {
    if (hot) {
      store._withCommit(function() {
        oldState.data = null;
      });
    }
  }
  if (oldScope) {
    oldScope.stop();
  }
}
function installModule(store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && process.env.NODE_ENV !== "production") {
      console.error("[vuex] duplicate namespace " + namespace + " for the namespaced module " + path.join("/"));
    }
    store._modulesNamespaceMap[namespace] = module;
  }
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function() {
      if (process.env.NODE_ENV !== "production") {
        if (moduleName in parentState) {
          console.warn(
            '[vuex] state field "' + moduleName + '" was overridden by a module with the same name at "' + path.join(".") + '"'
          );
        }
      }
      parentState[moduleName] = module.state;
    });
  }
  var local = module.context = makeLocalContext(store, namespace, path);
  module.forEachMutation(function(mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });
  module.forEachAction(function(action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });
  module.forEachGetter(function(getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });
  module.forEachChild(function(child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}
function makeLocalContext(store, namespace, path) {
  var noNamespace = namespace === "";
  var local = {
    dispatch: noNamespace ? store.dispatch : function(_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;
      if (!options || !options.root) {
        type = namespace + type;
        if (process.env.NODE_ENV !== "production" && !store._actions[type]) {
          console.error("[vuex] unknown local action type: " + args.type + ", global type: " + type);
          return;
        }
      }
      return store.dispatch(type, payload);
    },
    commit: noNamespace ? store.commit : function(_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;
      if (!options || !options.root) {
        type = namespace + type;
        if (process.env.NODE_ENV !== "production" && !store._mutations[type]) {
          console.error("[vuex] unknown local mutation type: " + args.type + ", global type: " + type);
          return;
        }
      }
      store.commit(type, payload, options);
    }
  };
  Object.defineProperties(local, {
    getters: {
      get: noNamespace ? function() {
        return store.getters;
      } : function() {
        return makeLocalGetters(store, namespace);
      }
    },
    state: {
      get: function() {
        return getNestedState(store.state, path);
      }
    }
  });
  return local;
}
function makeLocalGetters(store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function(type) {
      if (type.slice(0, splitPos) !== namespace) {
        return;
      }
      var localType = type.slice(splitPos);
      Object.defineProperty(gettersProxy, localType, {
        get: function() {
          return store.getters[type];
        },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }
  return store._makeLocalGettersCache[namespace];
}
function registerMutation(store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler(payload) {
    handler.call(store, local.state, payload);
  });
}
function registerAction(store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler(payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function(err) {
        store._devtoolHook.emit("vuex:error", err);
        throw err;
      });
    } else {
      return res;
    }
  });
}
function registerGetter(store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[vuex] duplicate getter key: " + type);
    }
    return;
  }
  store._wrappedGetters[type] = function wrappedGetter(store2) {
    return rawGetter(
      local.state,
      // local state
      local.getters,
      // local getters
      store2.state,
      // root state
      store2.getters
      // root getters
    );
  };
}
function enableStrictMode(store) {
  watch(function() {
    return store._state.data;
  }, function() {
    if (process.env.NODE_ENV !== "production") {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, flush: "sync" });
}
function getNestedState(state, path) {
  return path.reduce(function(state2, key) {
    return state2[key];
  }, state);
}
function unifyObjectStyle(type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }
  if (process.env.NODE_ENV !== "production") {
    assert(typeof type === "string", "expects string as the type, but found " + typeof type + ".");
  }
  return { type, payload, options };
}
var LABEL_VUEX_BINDINGS = "vuex bindings";
var MUTATIONS_LAYER_ID = "vuex:mutations";
var ACTIONS_LAYER_ID = "vuex:actions";
var INSPECTOR_ID = "vuex";
var actionId = 0;
function addDevtools$1(app, store) {
  setupDevtoolsPlugin(
    {
      id: "org.vuejs.vuex",
      app,
      label: "Vuex",
      homepage: "https://next.vuex.vuejs.org/",
      logo: "https://vuejs.org/images/icons/favicon-96x96.png",
      packageName: "vuex",
      componentStateTypes: [LABEL_VUEX_BINDINGS]
    },
    function(api) {
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: "Vuex Mutations",
        color: COLOR_LIME_500
      });
      api.addTimelineLayer({
        id: ACTIONS_LAYER_ID,
        label: "Vuex Actions",
        color: COLOR_LIME_500
      });
      api.addInspector({
        id: INSPECTOR_ID,
        label: "Vuex",
        icon: "storage",
        treeFilterPlaceholder: "Filter stores..."
      });
      api.on.getInspectorTree(function(payload) {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          if (payload.filter) {
            var nodes = [];
            flattenStoreForInspectorTree(nodes, store._modules.root, payload.filter, "");
            payload.rootNodes = nodes;
          } else {
            payload.rootNodes = [
              formatStoreForInspectorTree(store._modules.root, "")
            ];
          }
        }
      });
      api.on.getInspectorState(function(payload) {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          var modulePath = payload.nodeId;
          makeLocalGetters(store, modulePath);
          payload.state = formatStoreForInspectorState(
            getStoreModule(store._modules, modulePath),
            modulePath === "root" ? store.getters : store._makeLocalGettersCache,
            modulePath
          );
        }
      });
      api.on.editInspectorState(function(payload) {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          var modulePath = payload.nodeId;
          var path = payload.path;
          if (modulePath !== "root") {
            path = modulePath.split("/").filter(Boolean).concat(path);
          }
          store._withCommit(function() {
            payload.set(store._state.data, path, payload.state.value);
          });
        }
      });
      store.subscribe(function(mutation, state) {
        var data = {};
        if (mutation.payload) {
          data.payload = mutation.payload;
        }
        data.state = state;
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: Date.now(),
            title: mutation.type,
            data
          }
        });
      });
      store.subscribeAction({
        before: function(action, state) {
          var data = {};
          if (action.payload) {
            data.payload = action.payload;
          }
          action._id = actionId++;
          action._time = Date.now();
          data.state = state;
          api.addTimelineEvent({
            layerId: ACTIONS_LAYER_ID,
            event: {
              time: action._time,
              title: action.type,
              groupId: action._id,
              subtitle: "start",
              data
            }
          });
        },
        after: function(action, state) {
          var data = {};
          var duration = Date.now() - action._time;
          data.duration = {
            _custom: {
              type: "duration",
              display: duration + "ms",
              tooltip: "Action duration",
              value: duration
            }
          };
          if (action.payload) {
            data.payload = action.payload;
          }
          data.state = state;
          api.addTimelineEvent({
            layerId: ACTIONS_LAYER_ID,
            event: {
              time: Date.now(),
              title: action.type,
              groupId: action._id,
              subtitle: "end",
              data
            }
          });
        }
      });
    }
  );
}
var COLOR_LIME_500 = 8702998;
var COLOR_DARK = 6710886;
var COLOR_WHITE = 16777215;
var TAG_NAMESPACED = {
  label: "namespaced",
  textColor: COLOR_WHITE,
  backgroundColor: COLOR_DARK
};
function extractNameFromPath(path) {
  return path && path !== "root" ? path.split("/").slice(-2, -1)[0] : "Root";
}
function formatStoreForInspectorTree(module, path) {
  return {
    id: path || "root",
    // all modules end with a `/`, we want the last segment only
    // cart/ -> cart
    // nested/cart/ -> cart
    label: extractNameFromPath(path),
    tags: module.namespaced ? [TAG_NAMESPACED] : [],
    children: Object.keys(module._children).map(
      function(moduleName) {
        return formatStoreForInspectorTree(
          module._children[moduleName],
          path + moduleName + "/"
        );
      }
    )
  };
}
function flattenStoreForInspectorTree(result, module, filter, path) {
  if (path.includes(filter)) {
    result.push({
      id: path || "root",
      label: path.endsWith("/") ? path.slice(0, path.length - 1) : path || "Root",
      tags: module.namespaced ? [TAG_NAMESPACED] : []
    });
  }
  Object.keys(module._children).forEach(function(moduleName) {
    flattenStoreForInspectorTree(result, module._children[moduleName], filter, path + moduleName + "/");
  });
}
function formatStoreForInspectorState(module, getters, path) {
  getters = path === "root" ? getters : getters[path];
  var gettersKeys = Object.keys(getters);
  var storeState = {
    state: Object.keys(module.state).map(function(key) {
      return {
        key,
        editable: true,
        value: module.state[key]
      };
    })
  };
  if (gettersKeys.length) {
    var tree = transformPathsToObjectTree(getters);
    storeState.getters = Object.keys(tree).map(function(key) {
      return {
        key: key.endsWith("/") ? extractNameFromPath(key) : key,
        editable: false,
        value: canThrow(function() {
          return tree[key];
        })
      };
    });
  }
  return storeState;
}
function transformPathsToObjectTree(getters) {
  var result = {};
  Object.keys(getters).forEach(function(key) {
    var path = key.split("/");
    if (path.length > 1) {
      var target = result;
      var leafKey = path.pop();
      path.forEach(function(p) {
        if (!target[p]) {
          target[p] = {
            _custom: {
              value: {},
              display: p,
              tooltip: "Module",
              abstract: true
            }
          };
        }
        target = target[p]._custom.value;
      });
      target[leafKey] = canThrow(function() {
        return getters[key];
      });
    } else {
      result[key] = canThrow(function() {
        return getters[key];
      });
    }
  });
  return result;
}
function getStoreModule(moduleMap, path) {
  var names = path.split("/").filter(function(n) {
    return n;
  });
  return names.reduce(
    function(module, moduleName, i) {
      var child = module[moduleName];
      if (!child) {
        throw new Error('Missing module "' + moduleName + '" for path "' + path + '".');
      }
      return i === names.length - 1 ? child : child._children;
    },
    path === "root" ? moduleMap : moduleMap.root._children
  );
}
function canThrow(cb) {
  try {
    return cb();
  } catch (e) {
    return e;
  }
}
var Module = function Module2(rawModule, runtime) {
  this.runtime = runtime;
  this._children = /* @__PURE__ */ Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === "function" ? rawState() : rawState) || {};
};
var prototypeAccessors$1 = { namespaced: { configurable: true } };
prototypeAccessors$1.namespaced.get = function() {
  return !!this._rawModule.namespaced;
};
Module.prototype.addChild = function addChild(key, module) {
  this._children[key] = module;
};
Module.prototype.removeChild = function removeChild(key) {
  delete this._children[key];
};
Module.prototype.getChild = function getChild(key) {
  return this._children[key];
};
Module.prototype.hasChild = function hasChild(key) {
  return key in this._children;
};
Module.prototype.update = function update(rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};
Module.prototype.forEachChild = function forEachChild(fn) {
  forEachValue(this._children, fn);
};
Module.prototype.forEachGetter = function forEachGetter(fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};
Module.prototype.forEachAction = function forEachAction(fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};
Module.prototype.forEachMutation = function forEachMutation(fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};
Object.defineProperties(Module.prototype, prototypeAccessors$1);
var ModuleCollection = function ModuleCollection2(rawRootModule) {
  this.register([], rawRootModule, false);
};
ModuleCollection.prototype.get = function get(path) {
  return path.reduce(function(module, key) {
    return module.getChild(key);
  }, this.root);
};
ModuleCollection.prototype.getNamespace = function getNamespace(path) {
  var module = this.root;
  return path.reduce(function(namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + "/" : "");
  }, "");
};
ModuleCollection.prototype.update = function update$1(rawRootModule) {
  update2([], this.root, rawRootModule);
};
ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
  var this$1$1 = this;
  if (runtime === void 0) runtime = true;
  if (process.env.NODE_ENV !== "production") {
    assertRawModule(path, rawModule);
  }
  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function(rawChildModule, key) {
      this$1$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};
ModuleCollection.prototype.unregister = function unregister(path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);
  if (!child) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is not registered"
      );
    }
    return;
  }
  if (!child.runtime) {
    return;
  }
  parent.removeChild(key);
};
ModuleCollection.prototype.isRegistered = function isRegistered(path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (parent) {
    return parent.hasChild(key);
  }
  return false;
};
function update2(path, targetModule, newModule) {
  if (process.env.NODE_ENV !== "production") {
    assertRawModule(path, newModule);
  }
  targetModule.update(newModule);
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, manual reload is needed"
          );
        }
        return;
      }
      update2(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}
var functionAssert = {
  assert: function(value) {
    return typeof value === "function";
  },
  expected: "function"
};
var objectAssert = {
  assert: function(value) {
    return typeof value === "function" || typeof value === "object" && typeof value.handler === "function";
  },
  expected: 'function or object with "handler" function'
};
var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};
function assertRawModule(path, rawModule) {
  Object.keys(assertTypes).forEach(function(key) {
    if (!rawModule[key]) {
      return;
    }
    var assertOptions = assertTypes[key];
    forEachValue(rawModule[key], function(value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}
function makeAssertionMessage(path, key, type, value, expected) {
  var buf = key + " should be " + expected + ' but "' + key + "." + type + '"';
  if (path.length > 0) {
    buf += ' in module "' + path.join(".") + '"';
  }
  buf += " is " + JSON.stringify(value) + ".";
  return buf;
}
function createStore(options) {
  return new Store(options);
}
var Store = function Store2(options) {
  var this$1$1 = this;
  if (options === void 0) options = {};
  if (process.env.NODE_ENV !== "production") {
    assert(typeof Promise !== "undefined", "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store2, "store must be called with the new operator.");
  }
  var plugins = options.plugins;
  if (plugins === void 0) plugins = [];
  var strict = options.strict;
  if (strict === void 0) strict = false;
  var devtools = options.devtools;
  this._committing = false;
  this._actions = /* @__PURE__ */ Object.create(null);
  this._actionSubscribers = [];
  this._mutations = /* @__PURE__ */ Object.create(null);
  this._wrappedGetters = /* @__PURE__ */ Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
  this._subscribers = [];
  this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
  this._scope = null;
  this._devtools = devtools;
  var store = this;
  var ref2 = this;
  var dispatch2 = ref2.dispatch;
  var commit2 = ref2.commit;
  this.dispatch = function boundDispatch(type, payload) {
    return dispatch2.call(store, type, payload);
  };
  this.commit = function boundCommit(type, payload, options2) {
    return commit2.call(store, type, payload, options2);
  };
  this.strict = strict;
  var state = this._modules.root.state;
  installModule(this, state, [], this._modules.root);
  resetStoreState(this, state);
  plugins.forEach(function(plugin) {
    return plugin(this$1$1);
  });
};
var prototypeAccessors = { state: { configurable: true } };
Store.prototype.install = function install(app, injectKey) {
  app.provide(injectKey || storeKey, this);
  app.config.globalProperties.$store = this;
  var useDevtools = this._devtools !== void 0 ? this._devtools : process.env.NODE_ENV !== "production" || false;
  if (useDevtools) {
    addDevtools$1(app, this);
  }
};
prototypeAccessors.state.get = function() {
  return this._state.data;
};
prototypeAccessors.state.set = function(v) {
  if (process.env.NODE_ENV !== "production") {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};
Store.prototype.commit = function commit(_type, _payload, _options) {
  var this$1$1 = this;
  var ref2 = unifyObjectStyle(_type, _payload, _options);
  var type = ref2.type;
  var payload = ref2.payload;
  var options = ref2.options;
  var mutation = { type, payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[vuex] unknown mutation type: " + type);
    }
    return;
  }
  this._withCommit(function() {
    entry.forEach(function commitIterator(handler) {
      handler(payload);
    });
  });
  this._subscribers.slice().forEach(function(sub) {
    return sub(mutation, this$1$1.state);
  });
  if (process.env.NODE_ENV !== "production" && options && options.silent) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. Use the filter functionality in the vue-devtools"
    );
  }
};
Store.prototype.dispatch = function dispatch(_type, _payload) {
  var this$1$1 = this;
  var ref2 = unifyObjectStyle(_type, _payload);
  var type = ref2.type;
  var payload = ref2.payload;
  var action = { type, payload };
  var entry = this._actions[type];
  if (!entry) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[vuex] unknown action type: " + type);
    }
    return;
  }
  try {
    this._actionSubscribers.slice().filter(function(sub) {
      return sub.before;
    }).forEach(function(sub) {
      return sub.before(action, this$1$1.state);
    });
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }
  var result = entry.length > 1 ? Promise.all(entry.map(function(handler) {
    return handler(payload);
  })) : entry[0](payload);
  return new Promise(function(resolve, reject) {
    result.then(function(res) {
      try {
        this$1$1._actionSubscribers.filter(function(sub) {
          return sub.after;
        }).forEach(function(sub) {
          return sub.after(action, this$1$1.state);
        });
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function(error) {
      try {
        this$1$1._actionSubscribers.filter(function(sub) {
          return sub.error;
        }).forEach(function(sub) {
          return sub.error(action, this$1$1.state, error);
        });
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  });
};
Store.prototype.subscribe = function subscribe(fn, options) {
  return genericSubscribe(fn, this._subscribers, options);
};
Store.prototype.subscribeAction = function subscribeAction(fn, options) {
  var subs = typeof fn === "function" ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options);
};
Store.prototype.watch = function watch$1(getter, cb, options) {
  var this$1$1 = this;
  if (process.env.NODE_ENV !== "production") {
    assert(typeof getter === "function", "store.watch only accepts a function.");
  }
  return watch(function() {
    return getter(this$1$1.state, this$1$1.getters);
  }, cb, Object.assign({}, options));
};
Store.prototype.replaceState = function replaceState(state) {
  var this$1$1 = this;
  this._withCommit(function() {
    this$1$1._state.data = state;
  });
};
Store.prototype.registerModule = function registerModule(path, rawModule, options) {
  if (options === void 0) options = {};
  if (typeof path === "string") {
    path = [path];
  }
  if (process.env.NODE_ENV !== "production") {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, "cannot register the root module by using registerModule.");
  }
  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  resetStoreState(this, this.state);
};
Store.prototype.unregisterModule = function unregisterModule(path) {
  var this$1$1 = this;
  if (typeof path === "string") {
    path = [path];
  }
  if (process.env.NODE_ENV !== "production") {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }
  this._modules.unregister(path);
  this._withCommit(function() {
    var parentState = getNestedState(this$1$1.state, path.slice(0, -1));
    delete parentState[path[path.length - 1]];
  });
  resetStore(this);
};
Store.prototype.hasModule = function hasModule(path) {
  if (typeof path === "string") {
    path = [path];
  }
  if (process.env.NODE_ENV !== "production") {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }
  return this._modules.isRegistered(path);
};
Store.prototype.hotUpdate = function hotUpdate(newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};
Store.prototype._withCommit = function _withCommit(fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};
Object.defineProperties(Store.prototype, prototypeAccessors);
var mapState = normalizeNamespace(function(namespace, states) {
  var res = {};
  if (process.env.NODE_ENV !== "production" && !isValidMap(states)) {
    console.error("[vuex] mapState: mapper parameter must be either an Array or an Object");
  }
  normalizeMap(states).forEach(function(ref2) {
    var key = ref2.key;
    var val = ref2.val;
    res[key] = function mappedState() {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, "mapState", namespace);
        if (!module) {
          return;
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === "function" ? val.call(this, state, getters) : state[val];
    };
    res[key].vuex = true;
  });
  return res;
});
function normalizeMap(map) {
  if (!isValidMap(map)) {
    return [];
  }
  return Array.isArray(map) ? map.map(function(key) {
    return { key, val: key };
  }) : Object.keys(map).map(function(key) {
    return { key, val: map[key] };
  });
}
function isValidMap(map) {
  return Array.isArray(map) || isObject(map);
}
function normalizeNamespace(fn) {
  return function(namespace, map) {
    if (typeof namespace !== "string") {
      map = namespace;
      namespace = "";
    } else if (namespace.charAt(namespace.length - 1) !== "/") {
      namespace += "/";
    }
    return fn(namespace, map);
  };
}
function getModuleByNamespace(store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (process.env.NODE_ENV !== "production" && !module) {
    console.error("[vuex] module namespace not found in " + helper + "(): " + namespace);
  }
  return module;
}
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
const isBrowser = typeof document !== "undefined";
function isRouteComponent(component) {
  return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function isESModule(obj) {
  return obj.__esModule || obj[Symbol.toStringTag] === "Module" || obj.default && isRouteComponent(obj.default);
}
const assign = Object.assign;
function applyToParams(fn, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = isArray(value) ? value.map(fn) : fn(value);
  }
  return newParams;
}
const noop = () => {
};
const isArray = Array.isArray;
function mergeOptions(defaults, partialOptions) {
  const options = {};
  for (const key in defaults) options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
  return options;
}
function warn$1(msg) {
  const args = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + msg].concat(args));
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_BRACKET_OPEN_RE = /%5B/g;
const ENC_BRACKET_CLOSE_RE = /%5D/g;
const ENC_CARET_RE = /%5E/g;
const ENC_BACKTICK_RE = /%60/g;
const ENC_CURLY_OPEN_RE = /%7B/g;
const ENC_PIPE_RE = /%7C/g;
const ENC_CURLY_CLOSE_RE = /%7D/g;
const ENC_SPACE_RE = /%20/g;
function commonEncode(text) {
  return text == null ? "" : encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(text) {
  return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(text) {
  return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
function encodeParam(text) {
  return encodePath(text).replace(SLASH_RE, "%2F");
}
function decode(text) {
  if (text == null) return null;
  try {
    return decodeURIComponent("" + text);
  } catch (err) {
    process.env.NODE_ENV !== "production" && warn$1(`Error decoding "${text}". Using original value`);
  }
  return "" + text;
}
const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
function parseURL(parseQuery$1, location, currentLocation = "/") {
  let path, query = {}, searchString = "", hash = "";
  const hashPos = location.indexOf("#");
  let searchPos = location.indexOf("?");
  searchPos = hashPos >= 0 && searchPos > hashPos ? -1 : searchPos;
  if (searchPos >= 0) {
    path = location.slice(0, searchPos);
    searchString = location.slice(searchPos, hashPos > 0 ? hashPos : location.length);
    query = parseQuery$1(searchString.slice(1));
  }
  if (hashPos >= 0) {
    path = path || location.slice(0, hashPos);
    hash = location.slice(hashPos, location.length);
  }
  path = resolveRelativePath(path != null ? path : location, currentLocation);
  return {
    fullPath: path + searchString + hash,
    path,
    query,
    hash: decode(hash)
  };
}
function stringifyURL(stringifyQuery$1, location) {
  const query = location.query ? stringifyQuery$1(location.query) : "";
  return location.path + (query && "?") + query + (location.hash || "");
}
function isSameRouteLocation(stringifyQuery$1, a, b) {
  const aLastIndex = a.matched.length - 1;
  const bLastIndex = b.matched.length - 1;
  return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery$1(a.query) === stringifyQuery$1(b.query) && a.hash === b.hash;
}
function isSameRouteRecord(a, b) {
  return (a.aliasOf || a) === (b.aliasOf || b);
}
function isSameRouteLocationParams(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length) return false;
  for (var key in a) if (!isSameRouteLocationParamsValue(a[key], b[key])) return false;
  return true;
}
function isSameRouteLocationParamsValue(a, b) {
  return isArray(a) ? isEquivalentArray(a, b) : isArray(b) ? isEquivalentArray(b, a) : (a == null ? void 0 : a.valueOf()) === (b == null ? void 0 : b.valueOf());
}
function isEquivalentArray(a, b) {
  return isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
function resolveRelativePath(to, from) {
  if (to.startsWith("/")) return to;
  if (process.env.NODE_ENV !== "production" && !from.startsWith("/")) {
    warn$1(`Cannot resolve a relative location without an absolute path. Trying to resolve "${to}" from "${from}". It should look like "/${from}".`);
    return to;
  }
  if (!to) return from;
  const fromSegments = from.split("/");
  const toSegments = to.split("/");
  const lastToSegment = toSegments[toSegments.length - 1];
  if (lastToSegment === ".." || lastToSegment === ".") toSegments.push("");
  let position = fromSegments.length - 1;
  let toPosition;
  let segment;
  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition];
    if (segment === ".") continue;
    if (segment === "..") {
      if (position > 1) position--;
    } else break;
  }
  return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition).join("/");
}
const START_LOCATION_NORMALIZED = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
let NavigationType = /* @__PURE__ */ function(NavigationType$1) {
  NavigationType$1["pop"] = "pop";
  NavigationType$1["push"] = "push";
  return NavigationType$1;
}({});
let NavigationDirection = /* @__PURE__ */ function(NavigationDirection$1) {
  NavigationDirection$1["back"] = "back";
  NavigationDirection$1["forward"] = "forward";
  NavigationDirection$1["unknown"] = "";
  return NavigationDirection$1;
}({});
const START = "";
function normalizeBase(base) {
  if (!base) if (isBrowser) {
    const baseEl = document.querySelector("base");
    base = baseEl && baseEl.getAttribute("href") || "/";
    base = base.replace(/^\w+:\/\/[^\/]+/, "");
  } else base = "/";
  if (base[0] !== "/" && base[0] !== "#") base = "/" + base;
  return removeTrailingSlash(base);
}
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location) {
  return base.replace(BEFORE_HASH_RE, "#") + location;
}
function getElementPosition(el, offset) {
  const docRect = document.documentElement.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    behavior: offset.behavior,
    left: elRect.left - docRect.left - (offset.left || 0),
    top: elRect.top - docRect.top - (offset.top || 0)
  };
}
const computeScrollPosition = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function scrollToPosition(position) {
  let scrollToOptions;
  if ("el" in position) {
    const positionEl = position.el;
    const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
    if (process.env.NODE_ENV !== "production" && typeof position.el === "string") {
      if (!isIdSelector || !document.getElementById(position.el.slice(1))) try {
        const foundEl = document.querySelector(position.el);
        if (isIdSelector && foundEl) {
          warn$1(`The selector "${position.el}" should be passed as "el: document.querySelector('${position.el}')" because it starts with "#".`);
          return;
        }
      } catch (err) {
        warn$1(`The selector "${position.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
        return;
      }
    }
    const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
    if (!el) {
      process.env.NODE_ENV !== "production" && warn$1(`Couldn't find element using selector "${position.el}" returned by scrollBehavior.`);
      return;
    }
    scrollToOptions = getElementPosition(el, position);
  } else scrollToOptions = position;
  if ("scrollBehavior" in document.documentElement.style) window.scrollTo(scrollToOptions);
  else window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.scrollX, scrollToOptions.top != null ? scrollToOptions.top : window.scrollY);
}
function getScrollKey(path, delta) {
  return (history.state ? history.state.position - delta : -1) + path;
}
const scrollPositions = /* @__PURE__ */ new Map();
function saveScrollPosition(key, scrollPosition) {
  scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
  const scroll = scrollPositions.get(key);
  scrollPositions.delete(key);
  return scroll;
}
function isRouteLocation(route) {
  return typeof route === "string" || route && typeof route === "object";
}
function isRouteName(name) {
  return typeof name === "string" || typeof name === "symbol";
}
let ErrorTypes = /* @__PURE__ */ function(ErrorTypes$1) {
  ErrorTypes$1[ErrorTypes$1["MATCHER_NOT_FOUND"] = 1] = "MATCHER_NOT_FOUND";
  ErrorTypes$1[ErrorTypes$1["NAVIGATION_GUARD_REDIRECT"] = 2] = "NAVIGATION_GUARD_REDIRECT";
  ErrorTypes$1[ErrorTypes$1["NAVIGATION_ABORTED"] = 4] = "NAVIGATION_ABORTED";
  ErrorTypes$1[ErrorTypes$1["NAVIGATION_CANCELLED"] = 8] = "NAVIGATION_CANCELLED";
  ErrorTypes$1[ErrorTypes$1["NAVIGATION_DUPLICATED"] = 16] = "NAVIGATION_DUPLICATED";
  return ErrorTypes$1;
}({});
const NavigationFailureSymbol = Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
const ErrorTypeMessages = {
  [ErrorTypes.MATCHER_NOT_FOUND]({ location, currentLocation }) {
    return `No match for
 ${JSON.stringify(location)}${currentLocation ? "\nwhile being at\n" + JSON.stringify(currentLocation) : ""}`;
  },
  [ErrorTypes.NAVIGATION_GUARD_REDIRECT]({ from, to }) {
    return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
  },
  [ErrorTypes.NAVIGATION_ABORTED]({ from, to }) {
    return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
  },
  [ErrorTypes.NAVIGATION_CANCELLED]({ from, to }) {
    return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
  },
  [ErrorTypes.NAVIGATION_DUPLICATED]({ from, to }) {
    return `Avoided redundant navigation to current location: "${from.fullPath}".`;
  }
};
function createRouterError(type, params) {
  if (process.env.NODE_ENV !== "production" || false) return assign(new Error(ErrorTypeMessages[type](params)), {
    type,
    [NavigationFailureSymbol]: true
  }, params);
  else return assign(/* @__PURE__ */ new Error(), {
    type,
    [NavigationFailureSymbol]: true
  }, params);
}
function isNavigationFailure(error, type) {
  return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
}
const propertiesToLog = [
  "params",
  "query",
  "hash"
];
function stringifyRoute(to) {
  if (typeof to === "string") return to;
  if (to.path != null) return to.path;
  const location = {};
  for (const key of propertiesToLog) if (key in to) location[key] = to[key];
  return JSON.stringify(location, null, 2);
}
function parseQuery(search) {
  const query = {};
  if (search === "" || search === "?") return query;
  const searchParams = (search[0] === "?" ? search.slice(1) : search).split("&");
  for (let i = 0; i < searchParams.length; ++i) {
    const searchParam = searchParams[i].replace(PLUS_RE, " ");
    const eqPos = searchParam.indexOf("=");
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
    if (key in query) {
      let currentValue = query[key];
      if (!isArray(currentValue)) currentValue = query[key] = [currentValue];
      currentValue.push(value);
    } else query[key] = value;
  }
  return query;
}
function stringifyQuery(query) {
  let search = "";
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      if (value !== void 0) search += (search.length ? "&" : "") + key;
      continue;
    }
    (isArray(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)]).forEach((value$1) => {
      if (value$1 !== void 0) {
        search += (search.length ? "&" : "") + key;
        if (value$1 != null) search += "=" + value$1;
      }
    });
  }
  return search;
}
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (const key in query) {
    const value = query[key];
    if (value !== void 0) normalizedQuery[key] = isArray(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
  }
  return normalizedQuery;
}
const matchedRouteKey = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : "");
const viewDepthKey = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : "");
const routerKey = Symbol(process.env.NODE_ENV !== "production" ? "router" : "");
const routeLocationKey = Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
const routerViewLocationKey = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function useCallbacks() {
  let handlers = [];
  function add(handler) {
    handlers.push(handler);
    return () => {
      const i = handlers.indexOf(handler);
      if (i > -1) handlers.splice(i, 1);
    };
  }
  function reset() {
    handlers = [];
  }
  return {
    add,
    list: () => handlers.slice(),
    reset
  };
}
function guardToPromiseFn(guard, to, from, record, name, runWithContext = (fn) => fn()) {
  const enterCallbackArray = record && (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
  return () => new Promise((resolve, reject) => {
    const next = (valid) => {
      if (valid === false) reject(createRouterError(ErrorTypes.NAVIGATION_ABORTED, {
        from,
        to
      }));
      else if (valid instanceof Error) reject(valid);
      else if (isRouteLocation(valid)) reject(createRouterError(ErrorTypes.NAVIGATION_GUARD_REDIRECT, {
        from: to,
        to: valid
      }));
      else {
        if (enterCallbackArray && record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") enterCallbackArray.push(valid);
        resolve();
      }
    };
    const guardReturn = runWithContext(() => guard.call(record && record.instances[name], to, from, process.env.NODE_ENV !== "production" ? canOnlyBeCalledOnce(next, to, from) : next));
    let guardCall = Promise.resolve(guardReturn);
    if (guard.length < 3) guardCall = guardCall.then(next);
    if (process.env.NODE_ENV !== "production" && guard.length > 2) {
      const message = `The "next" callback was never called inside of ${guard.name ? '"' + guard.name + '"' : ""}:
${guard.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof guardReturn === "object" && "then" in guardReturn) guardCall = guardCall.then((resolvedValue) => {
        if (!next._called) {
          warn$1(message);
          return Promise.reject(/* @__PURE__ */ new Error("Invalid navigation guard"));
        }
        return resolvedValue;
      });
      else if (guardReturn !== void 0) {
        if (!next._called) {
          warn$1(message);
          reject(/* @__PURE__ */ new Error("Invalid navigation guard"));
          return;
        }
      }
    }
    guardCall.catch((err) => reject(err));
  });
}
function canOnlyBeCalledOnce(next, to, from) {
  let called = 0;
  return function() {
    if (called++ === 1) warn$1(`The "next" callback was called more than once in one navigation guard when going from "${from.fullPath}" to "${to.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`);
    next._called = true;
    if (called === 1) next.apply(null, arguments);
  };
}
function extractComponentsGuards(matched, guardType, to, from, runWithContext = (fn) => fn()) {
  const guards = [];
  for (const record of matched) {
    if (process.env.NODE_ENV !== "production" && !record.components && record.children && !record.children.length) warn$1(`Record with path "${record.path}" is either missing a "component(s)" or "children" property.`);
    for (const name in record.components) {
      let rawComponent = record.components[name];
      if (process.env.NODE_ENV !== "production") {
        if (!rawComponent || typeof rawComponent !== "object" && typeof rawComponent !== "function") {
          warn$1(`Component "${name}" in record with path "${record.path}" is not a valid component. Received "${String(rawComponent)}".`);
          throw new Error("Invalid route component");
        } else if ("then" in rawComponent) {
          warn$1(`Component "${name}" in record with path "${record.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const promise = rawComponent;
          rawComponent = () => promise;
        } else if (rawComponent.__asyncLoader && !rawComponent.__warnedDefineAsync) {
          rawComponent.__warnedDefineAsync = true;
          warn$1(`Component "${name}" in record with path "${record.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`);
        }
      }
      if (guardType !== "beforeRouteEnter" && !record.instances[name]) continue;
      if (isRouteComponent(rawComponent)) {
        const guard = (rawComponent.__vccOpts || rawComponent)[guardType];
        guard && guards.push(guardToPromiseFn(guard, to, from, record, name, runWithContext));
      } else {
        let componentPromise = rawComponent();
        if (process.env.NODE_ENV !== "production" && !("catch" in componentPromise)) {
          warn$1(`Component "${name}" in record with path "${record.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`);
          componentPromise = Promise.resolve(componentPromise);
        }
        guards.push(() => componentPromise.then((resolved) => {
          if (!resolved) throw new Error(`Couldn't resolve component "${name}" at "${record.path}"`);
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          record.mods[name] = resolved;
          record.components[name] = resolvedComponent;
          const guard = (resolvedComponent.__vccOpts || resolvedComponent)[guardType];
          return guard && guardToPromiseFn(guard, to, from, record, name, runWithContext)();
        }));
      }
    }
  }
  return guards;
}
function extractChangingRecords(to, from) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  const len = Math.max(from.matched.length, to.matched.length);
  for (let i = 0; i < len; i++) {
    const recordFrom = from.matched[i];
    if (recordFrom) if (to.matched.find((record) => isSameRouteRecord(record, recordFrom))) updatingRecords.push(recordFrom);
    else leavingRecords.push(recordFrom);
    const recordTo = to.matched[i];
    if (recordTo) {
      if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) enteringRecords.push(recordTo);
    }
  }
  return [
    leavingRecords,
    updatingRecords,
    enteringRecords
  ];
}
function formatRouteLocation(routeLocation, tooltip) {
  const copy = assign({}, routeLocation, { matched: routeLocation.matched.map((matched) => omit(matched, [
    "instances",
    "children",
    "aliasOf"
  ])) });
  return { _custom: {
    type: null,
    readOnly: true,
    display: routeLocation.fullPath,
    tooltip,
    value: copy
  } };
}
function formatDisplay(display) {
  return { _custom: { display } };
}
let routerId = 0;
function addDevtools(app, router, matcher) {
  if (router.__hasDevtools) return;
  router.__hasDevtools = true;
  const id = routerId++;
  setupDevtoolsPlugin({
    id: "org.vuejs.router" + (id ? "." + id : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app
  }, (api) => {
    if (typeof api.now !== "function") warn$1("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
    api.on.inspectComponent((payload, ctx) => {
      if (payload.instanceData) payload.instanceData.state.push({
        type: "Routing",
        key: "$route",
        editable: false,
        value: formatRouteLocation(router.currentRoute.value, "Current Route")
      });
    });
    api.on.visitComponentTree(({ treeNode: node, componentInstance }) => {
      if (componentInstance.__vrv_devtools) {
        const info = componentInstance.__vrv_devtools;
        node.tags.push({
          label: (info.name ? `${info.name.toString()}: ` : "") + info.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: PINK_500
        });
      }
      if (isArray(componentInstance.__vrl_devtools)) {
        componentInstance.__devtoolsApi = api;
        componentInstance.__vrl_devtools.forEach((devtoolsData) => {
          let label = devtoolsData.route.path;
          let backgroundColor = ORANGE_400;
          let tooltip = "";
          let textColor = 0;
          if (devtoolsData.error) {
            label = devtoolsData.error;
            backgroundColor = RED_100;
            textColor = RED_700;
          } else if (devtoolsData.isExactActive) {
            backgroundColor = LIME_500;
            tooltip = "This is exactly active";
          } else if (devtoolsData.isActive) {
            backgroundColor = BLUE_600;
            tooltip = "This link is active";
          }
          node.tags.push({
            label,
            textColor,
            tooltip,
            backgroundColor
          });
        });
      }
    });
    watch(router.currentRoute, () => {
      refreshRoutesView();
      api.notifyComponentUpdate();
      api.sendInspectorTree(routerInspectorId);
      api.sendInspectorState(routerInspectorId);
    });
    const navigationsLayerId = "router:navigations:" + id;
    api.addTimelineLayer({
      id: navigationsLayerId,
      label: `Router${id ? " " + id : ""} Navigations`,
      color: 4237508
    });
    router.onError((error, to) => {
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          title: "Error during Navigation",
          subtitle: to.fullPath,
          logType: "error",
          time: api.now(),
          data: { error },
          groupId: to.meta.__navigationId
        }
      });
    });
    let navigationId = 0;
    router.beforeEach((to, from) => {
      const data = {
        guard: formatDisplay("beforeEach"),
        from: formatRouteLocation(from, "Current Location during this navigation"),
        to: formatRouteLocation(to, "Target location")
      };
      Object.defineProperty(to.meta, "__navigationId", { value: navigationId++ });
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          time: api.now(),
          title: "Start of navigation",
          subtitle: to.fullPath,
          data,
          groupId: to.meta.__navigationId
        }
      });
    });
    router.afterEach((to, from, failure) => {
      const data = { guard: formatDisplay("afterEach") };
      if (failure) {
        data.failure = { _custom: {
          type: Error,
          readOnly: true,
          display: failure ? failure.message : "",
          tooltip: "Navigation Failure",
          value: failure
        } };
        data.status = formatDisplay("❌");
      } else data.status = formatDisplay("✅");
      data.from = formatRouteLocation(from, "Current Location during this navigation");
      data.to = formatRouteLocation(to, "Target location");
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          title: "End of navigation",
          subtitle: to.fullPath,
          time: api.now(),
          data,
          logType: failure ? "warning" : "default",
          groupId: to.meta.__navigationId
        }
      });
    });
    const routerInspectorId = "router-inspector:" + id;
    api.addInspector({
      id: routerInspectorId,
      label: "Routes" + (id ? " " + id : ""),
      icon: "book",
      treeFilterPlaceholder: "Search routes"
    });
    function refreshRoutesView() {
      if (!activeRoutesPayload) return;
      const payload = activeRoutesPayload;
      let routes = matcher.getRoutes().filter((route) => !route.parent || !route.parent.record.components);
      routes.forEach(resetMatchStateOnRouteRecord);
      if (payload.filter) routes = routes.filter((route) => isRouteMatching(route, payload.filter.toLowerCase()));
      routes.forEach((route) => markRouteRecordActive(route, router.currentRoute.value));
      payload.rootNodes = routes.map(formatRouteRecordForInspector);
    }
    let activeRoutesPayload;
    api.on.getInspectorTree((payload) => {
      activeRoutesPayload = payload;
      if (payload.app === app && payload.inspectorId === routerInspectorId) refreshRoutesView();
    });
    api.on.getInspectorState((payload) => {
      if (payload.app === app && payload.inspectorId === routerInspectorId) {
        const route = matcher.getRoutes().find((route$1) => route$1.record.__vd_id === payload.nodeId);
        if (route) payload.state = { options: formatRouteRecordMatcherForStateInspector(route) };
      }
    });
    api.sendInspectorTree(routerInspectorId);
    api.sendInspectorState(routerInspectorId);
  });
}
function modifierForKey(key) {
  if (key.optional) return key.repeatable ? "*" : "?";
  else return key.repeatable ? "+" : "";
}
function formatRouteRecordMatcherForStateInspector(route) {
  const { record } = route;
  const fields = [{
    editable: false,
    key: "path",
    value: record.path
  }];
  if (record.name != null) fields.push({
    editable: false,
    key: "name",
    value: record.name
  });
  fields.push({
    editable: false,
    key: "regexp",
    value: route.re
  });
  if (route.keys.length) fields.push({
    editable: false,
    key: "keys",
    value: { _custom: {
      type: null,
      readOnly: true,
      display: route.keys.map((key) => `${key.name}${modifierForKey(key)}`).join(" "),
      tooltip: "Param keys",
      value: route.keys
    } }
  });
  if (record.redirect != null) fields.push({
    editable: false,
    key: "redirect",
    value: record.redirect
  });
  if (route.alias.length) fields.push({
    editable: false,
    key: "aliases",
    value: route.alias.map((alias) => alias.record.path)
  });
  if (Object.keys(route.record.meta).length) fields.push({
    editable: false,
    key: "meta",
    value: route.record.meta
  });
  fields.push({
    key: "score",
    editable: false,
    value: { _custom: {
      type: null,
      readOnly: true,
      display: route.score.map((score) => score.join(", ")).join(" | "),
      tooltip: "Score used to sort routes",
      value: route.score
    } }
  });
  return fields;
}
const PINK_500 = 15485081;
const BLUE_600 = 2450411;
const LIME_500 = 8702998;
const CYAN_400 = 2282478;
const ORANGE_400 = 16486972;
const DARK = 6710886;
const RED_100 = 16704226;
const RED_700 = 12131356;
function formatRouteRecordForInspector(route) {
  const tags = [];
  const { record } = route;
  if (record.name != null) tags.push({
    label: String(record.name),
    textColor: 0,
    backgroundColor: CYAN_400
  });
  if (record.aliasOf) tags.push({
    label: "alias",
    textColor: 0,
    backgroundColor: ORANGE_400
  });
  if (route.__vd_match) tags.push({
    label: "matches",
    textColor: 0,
    backgroundColor: PINK_500
  });
  if (route.__vd_exactActive) tags.push({
    label: "exact",
    textColor: 0,
    backgroundColor: LIME_500
  });
  if (route.__vd_active) tags.push({
    label: "active",
    textColor: 0,
    backgroundColor: BLUE_600
  });
  if (record.redirect) tags.push({
    label: typeof record.redirect === "string" ? `redirect: ${record.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: DARK
  });
  let id = record.__vd_id;
  if (id == null) {
    id = String(routeRecordId++);
    record.__vd_id = id;
  }
  return {
    id,
    label: record.path,
    tags,
    children: route.children.map(formatRouteRecordForInspector)
  };
}
let routeRecordId = 0;
const EXTRACT_REGEXP_RE = /^\/(.*)\/([a-z]*)$/;
function markRouteRecordActive(route, currentRoute) {
  const isExactActive = currentRoute.matched.length && isSameRouteRecord(currentRoute.matched[currentRoute.matched.length - 1], route.record);
  route.__vd_exactActive = route.__vd_active = isExactActive;
  if (!isExactActive) route.__vd_active = currentRoute.matched.some((match) => isSameRouteRecord(match, route.record));
  route.children.forEach((childRoute) => markRouteRecordActive(childRoute, currentRoute));
}
function resetMatchStateOnRouteRecord(route) {
  route.__vd_match = false;
  route.children.forEach(resetMatchStateOnRouteRecord);
}
function isRouteMatching(route, filter) {
  const found = String(route.re).match(EXTRACT_REGEXP_RE);
  route.__vd_match = false;
  if (!found || found.length < 3) return false;
  if (new RegExp(found[1].replace(/\$$/, ""), found[2]).test(filter)) {
    route.children.forEach((child) => isRouteMatching(child, filter));
    if (route.record.path !== "/" || filter === "/") {
      route.__vd_match = route.re.test(filter);
      return true;
    }
    return false;
  }
  const path = route.record.path.toLowerCase();
  const decodedPath = decode(path);
  if (!filter.startsWith("/") && (decodedPath.includes(filter) || path.includes(filter))) return true;
  if (decodedPath.startsWith(filter) || path.startsWith(filter)) return true;
  if (route.record.name && String(route.record.name).includes(filter)) return true;
  return route.children.some((child) => isRouteMatching(child, filter));
}
function omit(obj, keys) {
  const ret = {};
  for (const key in obj) if (!keys.includes(key)) ret[key] = obj[key];
  return ret;
}
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
function createMemoryHistory(base = "") {
  let listeners = [];
  let queue = [[START, {}]];
  let position = 0;
  base = normalizeBase(base);
  function setLocation(location$1, state = {}) {
    position++;
    if (position !== queue.length) queue.splice(position);
    queue.push([location$1, state]);
  }
  function triggerListeners(to, from, { direction, delta }) {
    const info = {
      direction,
      delta,
      type: NavigationType.pop
    };
    for (const callback of listeners) callback(to, from, info);
  }
  const routerHistory = {
    location: START,
    state: {},
    base,
    createHref: createHref.bind(null, base),
    replace(to, state) {
      queue.splice(position--, 1);
      setLocation(to, state);
    },
    push(to, state) {
      setLocation(to, state);
    },
    listen(callback) {
      listeners.push(callback);
      return () => {
        const index = listeners.indexOf(callback);
        if (index > -1) listeners.splice(index, 1);
      };
    },
    destroy() {
      listeners = [];
      queue = [[START, {}]];
      position = 0;
    },
    go(delta, shouldTrigger = true) {
      const from = this.location;
      const direction = delta < 0 ? NavigationDirection.back : NavigationDirection.forward;
      position = Math.max(0, Math.min(position + delta, queue.length - 1));
      if (shouldTrigger) triggerListeners(this.location, from, {
        direction,
        delta
      });
    }
  };
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: () => queue[position][0]
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: () => queue[position][1]
  });
  return routerHistory;
}
let TokenType = /* @__PURE__ */ function(TokenType$1) {
  TokenType$1[TokenType$1["Static"] = 0] = "Static";
  TokenType$1[TokenType$1["Param"] = 1] = "Param";
  TokenType$1[TokenType$1["Group"] = 2] = "Group";
  return TokenType$1;
}({});
var TokenizerState = /* @__PURE__ */ function(TokenizerState$1) {
  TokenizerState$1[TokenizerState$1["Static"] = 0] = "Static";
  TokenizerState$1[TokenizerState$1["Param"] = 1] = "Param";
  TokenizerState$1[TokenizerState$1["ParamRegExp"] = 2] = "ParamRegExp";
  TokenizerState$1[TokenizerState$1["ParamRegExpEnd"] = 3] = "ParamRegExpEnd";
  TokenizerState$1[TokenizerState$1["EscapeNext"] = 4] = "EscapeNext";
  return TokenizerState$1;
}(TokenizerState || {});
const ROOT_TOKEN = {
  type: TokenType.Static,
  value: ""
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
  if (!path) return [[]];
  if (path === "/") return [[ROOT_TOKEN]];
  if (!path.startsWith("/")) throw new Error(process.env.NODE_ENV !== "production" ? `Route paths should start with a "/": "${path}" should be "/${path}".` : `Invalid path "${path}"`);
  function crash(message) {
    throw new Error(`ERR (${state})/"${buffer}": ${message}`);
  }
  let state = TokenizerState.Static;
  let previousState = state;
  const tokens = [];
  let segment;
  function finalizeSegment() {
    if (segment) tokens.push(segment);
    segment = [];
  }
  let i = 0;
  let char;
  let buffer = "";
  let customRe = "";
  function consumeBuffer() {
    if (!buffer) return;
    if (state === TokenizerState.Static) segment.push({
      type: TokenType.Static,
      value: buffer
    });
    else if (state === TokenizerState.Param || state === TokenizerState.ParamRegExp || state === TokenizerState.ParamRegExpEnd) {
      if (segment.length > 1 && (char === "*" || char === "+")) crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
      segment.push({
        type: TokenType.Param,
        value: buffer,
        regexp: customRe,
        repeatable: char === "*" || char === "+",
        optional: char === "*" || char === "?"
      });
    } else crash("Invalid state to consume buffer");
    buffer = "";
  }
  function addCharToBuffer() {
    buffer += char;
  }
  while (i < path.length) {
    char = path[i++];
    if (char === "\\" && state !== TokenizerState.ParamRegExp) {
      previousState = state;
      state = TokenizerState.EscapeNext;
      continue;
    }
    switch (state) {
      case TokenizerState.Static:
        if (char === "/") {
          if (buffer) consumeBuffer();
          finalizeSegment();
        } else if (char === ":") {
          consumeBuffer();
          state = TokenizerState.Param;
        } else addCharToBuffer();
        break;
      case TokenizerState.EscapeNext:
        addCharToBuffer();
        state = previousState;
        break;
      case TokenizerState.Param:
        if (char === "(") state = TokenizerState.ParamRegExp;
        else if (VALID_PARAM_RE.test(char)) addCharToBuffer();
        else {
          consumeBuffer();
          state = TokenizerState.Static;
          if (char !== "*" && char !== "?" && char !== "+") i--;
        }
        break;
      case TokenizerState.ParamRegExp:
        if (char === ")") if (customRe[customRe.length - 1] == "\\") customRe = customRe.slice(0, -1) + char;
        else state = TokenizerState.ParamRegExpEnd;
        else customRe += char;
        break;
      case TokenizerState.ParamRegExpEnd:
        consumeBuffer();
        state = TokenizerState.Static;
        if (char !== "*" && char !== "?" && char !== "+") i--;
        customRe = "";
        break;
      default:
        crash("Unknown state");
        break;
    }
  }
  if (state === TokenizerState.ParamRegExp) crash(`Unfinished custom RegExp for param "${buffer}"`);
  consumeBuffer();
  finalizeSegment();
  return tokens;
}
const BASE_PARAM_PATTERN = "[^/]+?";
const BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
var PathScore = /* @__PURE__ */ function(PathScore$1) {
  PathScore$1[PathScore$1["_multiplier"] = 10] = "_multiplier";
  PathScore$1[PathScore$1["Root"] = 90] = "Root";
  PathScore$1[PathScore$1["Segment"] = 40] = "Segment";
  PathScore$1[PathScore$1["SubSegment"] = 30] = "SubSegment";
  PathScore$1[PathScore$1["Static"] = 40] = "Static";
  PathScore$1[PathScore$1["Dynamic"] = 20] = "Dynamic";
  PathScore$1[PathScore$1["BonusCustomRegExp"] = 10] = "BonusCustomRegExp";
  PathScore$1[PathScore$1["BonusWildcard"] = -50] = "BonusWildcard";
  PathScore$1[PathScore$1["BonusRepeatable"] = -20] = "BonusRepeatable";
  PathScore$1[PathScore$1["BonusOptional"] = -8] = "BonusOptional";
  PathScore$1[PathScore$1["BonusStrict"] = 0.7000000000000001] = "BonusStrict";
  PathScore$1[PathScore$1["BonusCaseSensitive"] = 0.25] = "BonusCaseSensitive";
  return PathScore$1;
}(PathScore || {});
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(segments, extraOptions) {
  const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
  const score = [];
  let pattern = options.start ? "^" : "";
  const keys = [];
  for (const segment of segments) {
    const segmentScores = segment.length ? [] : [PathScore.Root];
    if (options.strict && !segment.length) pattern += "/";
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token = segment[tokenIndex];
      let subSegmentScore = PathScore.Segment + (options.sensitive ? PathScore.BonusCaseSensitive : 0);
      if (token.type === TokenType.Static) {
        if (!tokenIndex) pattern += "/";
        pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
        subSegmentScore += PathScore.Static;
      } else if (token.type === TokenType.Param) {
        const { value, repeatable, optional, regexp } = token;
        keys.push({
          name: value,
          repeatable,
          optional
        });
        const re$1 = regexp ? regexp : BASE_PARAM_PATTERN;
        if (re$1 !== BASE_PARAM_PATTERN) {
          subSegmentScore += PathScore.BonusCustomRegExp;
          try {
            `${re$1}`;
          } catch (err) {
            throw new Error(`Invalid custom RegExp for param "${value}" (${re$1}): ` + err.message);
          }
        }
        let subPattern = repeatable ? `((?:${re$1})(?:/(?:${re$1}))*)` : `(${re$1})`;
        if (!tokenIndex) subPattern = optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
        if (optional) subPattern += "?";
        pattern += subPattern;
        subSegmentScore += PathScore.Dynamic;
        if (optional) subSegmentScore += PathScore.BonusOptional;
        if (repeatable) subSegmentScore += PathScore.BonusRepeatable;
        if (re$1 === ".*") subSegmentScore += PathScore.BonusWildcard;
      }
      segmentScores.push(subSegmentScore);
    }
    score.push(segmentScores);
  }
  if (options.strict && options.end) {
    const i = score.length - 1;
    score[i][score[i].length - 1] += PathScore.BonusStrict;
  }
  if (!options.strict) pattern += "/?";
  if (options.end) pattern += "$";
  else if (options.strict && !pattern.endsWith("/")) pattern += "(?:/|$)";
  const re = new RegExp(pattern, options.sensitive ? "" : "i");
  function parse(path) {
    const match = path.match(re);
    const params = {};
    if (!match) return null;
    for (let i = 1; i < match.length; i++) {
      const value = match[i] || "";
      const key = keys[i - 1];
      params[key.name] = value && key.repeatable ? value.split("/") : value;
    }
    return params;
  }
  function stringify(params) {
    let path = "";
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || !path.endsWith("/")) path += "/";
      avoidDuplicatedSlash = false;
      for (const token of segment) if (token.type === TokenType.Static) path += token.value;
      else if (token.type === TokenType.Param) {
        const { value, repeatable, optional } = token;
        const param = value in params ? params[value] : "";
        if (isArray(param) && !repeatable) throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
        const text = isArray(param) ? param.join("/") : param;
        if (!text) if (optional) {
          if (segment.length < 2) if (path.endsWith("/")) path = path.slice(0, -1);
          else avoidDuplicatedSlash = true;
        } else throw new Error(`Missing required param "${value}"`);
        path += text;
      }
    }
    return path || "/";
  }
  return {
    re,
    score,
    keys,
    parse,
    stringify
  };
}
function compareScoreArray(a, b) {
  let i = 0;
  while (i < a.length && i < b.length) {
    const diff = b[i] - a[i];
    if (diff) return diff;
    i++;
  }
  if (a.length < b.length) return a.length === 1 && a[0] === PathScore.Static + PathScore.Segment ? -1 : 1;
  else if (a.length > b.length) return b.length === 1 && b[0] === PathScore.Static + PathScore.Segment ? 1 : -1;
  return 0;
}
function comparePathParserScore(a, b) {
  let i = 0;
  const aScore = a.score;
  const bScore = b.score;
  while (i < aScore.length && i < bScore.length) {
    const comp = compareScoreArray(aScore[i], bScore[i]);
    if (comp) return comp;
    i++;
  }
  if (Math.abs(bScore.length - aScore.length) === 1) {
    if (isLastScoreNegative(aScore)) return 1;
    if (isLastScoreNegative(bScore)) return -1;
  }
  return bScore.length - aScore.length;
}
function isLastScoreNegative(score) {
  const last = score[score.length - 1];
  return score.length > 0 && last[last.length - 1] < 0;
}
const PATH_PARSER_OPTIONS_DEFAULTS = {
  strict: false,
  end: true,
  sensitive: false
};
function createRouteRecordMatcher(record, parent, options) {
  const parser = tokensToParser(tokenizePath(record.path), options);
  if (process.env.NODE_ENV !== "production") {
    const existingKeys = /* @__PURE__ */ new Set();
    for (const key of parser.keys) {
      if (existingKeys.has(key.name)) warn$1(`Found duplicated params with name "${key.name}" for path "${record.path}". Only the last one will be available on "$route.params".`);
      existingKeys.add(key.name);
    }
  }
  const matcher = assign(parser, {
    record,
    parent,
    children: [],
    alias: []
  });
  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf) parent.children.push(matcher);
  }
  return matcher;
}
function createRouterMatcher(routes, globalOptions) {
  const matchers = [];
  const matcherMap = /* @__PURE__ */ new Map();
  globalOptions = mergeOptions(PATH_PARSER_OPTIONS_DEFAULTS, globalOptions);
  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  function addRoute(record, parent, originalRecord) {
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    if (process.env.NODE_ENV !== "production") checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent);
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options = mergeOptions(globalOptions, record);
    const normalizedRecords = [mainNormalizedRecord];
    if ("alias" in record) {
      const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias of aliases) normalizedRecords.push(normalizeRouteRecord(assign({}, mainNormalizedRecord, {
        components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
        path: alias,
        aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
      })));
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord;
      if (parent && path[0] !== "/") {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
      }
      if (process.env.NODE_ENV !== "production" && normalizedRecord.path === "*") throw new Error('Catch all routes ("*") must now be defined using a param with a custom regexp.\nSee more at https://router.vuejs.org/guide/migration/#Removed-star-or-catch-all-routes.');
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if (process.env.NODE_ENV !== "production" && parent && path[0] === "/") checkMissingParamsInAbsolutePath(matcher, parent);
      if (originalRecord) {
        originalRecord.alias.push(matcher);
        if (process.env.NODE_ENV !== "production") checkSameParams(originalRecord, matcher);
      } else {
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher) originalMatcher.alias.push(matcher);
        if (isRootAdd && record.name && !isAliasRecord(matcher)) {
          if (process.env.NODE_ENV !== "production") checkSameNameAsAncestor(record, parent);
          removeRoute(record.name);
        }
      }
      if (isMatchable(matcher)) insertMatcher(matcher);
      if (mainNormalizedRecord.children) {
        const children = mainNormalizedRecord.children;
        for (let i = 0; i < children.length; i++) addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
      }
      originalRecord = originalRecord || matcher;
    }
    return originalMatcher ? () => {
      removeRoute(originalMatcher);
    } : noop;
  }
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index = matchers.indexOf(matcherRef);
      if (index > -1) {
        matchers.splice(index, 1);
        if (matcherRef.record.name) matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  function getRoutes() {
    return matchers;
  }
  function insertMatcher(matcher) {
    const index = findInsertionIndex(matcher, matchers);
    matchers.splice(index, 0, matcher);
    if (matcher.record.name && !isAliasRecord(matcher)) matcherMap.set(matcher.record.name, matcher);
  }
  function resolve(location$1, currentLocation) {
    let matcher;
    let params = {};
    let path;
    let name;
    if ("name" in location$1 && location$1.name) {
      matcher = matcherMap.get(location$1.name);
      if (!matcher) throw createRouterError(ErrorTypes.MATCHER_NOT_FOUND, { location: location$1 });
      if (process.env.NODE_ENV !== "production") {
        const invalidParams = Object.keys(location$1.params || {}).filter((paramName) => !matcher.keys.find((k) => k.name === paramName));
        if (invalidParams.length) warn$1(`Discarded invalid param(s) "${invalidParams.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      name = matcher.record.name;
      params = assign(pickParams(currentLocation.params, matcher.keys.filter((k) => !k.optional).concat(matcher.parent ? matcher.parent.keys.filter((k) => k.optional) : []).map((k) => k.name)), location$1.params && pickParams(location$1.params, matcher.keys.map((k) => k.name)));
      path = matcher.stringify(params);
    } else if (location$1.path != null) {
      path = location$1.path;
      if (process.env.NODE_ENV !== "production" && !path.startsWith("/")) warn$1(`The Matcher cannot resolve relative paths but received "${path}". Unless you directly called \`matcher.resolve("${path}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`);
      matcher = matchers.find((m) => m.re.test(path));
      if (matcher) {
        params = matcher.parse(path);
        name = matcher.record.name;
      }
    } else {
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
      if (!matcher) throw createRouterError(ErrorTypes.MATCHER_NOT_FOUND, {
        location: location$1,
        currentLocation
      });
      name = matcher.record.name;
      params = assign({}, currentLocation.params, location$1.params);
      path = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path,
      params,
      matched,
      meta: mergeMetaFields(matched)
    };
  }
  routes.forEach((route) => addRoute(route));
  function clearRoutes() {
    matchers.length = 0;
    matcherMap.clear();
  }
  return {
    addRoute,
    resolve,
    removeRoute,
    clearRoutes,
    getRoutes,
    getRecordMatcher
  };
}
function pickParams(params, keys) {
  const newParams = {};
  for (const key of keys) if (key in params) newParams[key] = params[key];
  return newParams;
}
function normalizeRouteRecord(record) {
  const normalized = {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: record.aliasOf,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in record ? record.components || null : record.component && { default: record.component }
  };
  Object.defineProperty(normalized, "mods", { value: {} });
  return normalized;
}
function normalizeRecordProps(record) {
  const propsObject = {};
  const props = record.props || false;
  if ("component" in record) propsObject.default = props;
  else for (const name in record.components) propsObject[name] = typeof props === "object" ? props[name] : props;
  return propsObject;
}
function isAliasRecord(record) {
  while (record) {
    if (record.record.aliasOf) return true;
    record = record.parent;
  }
  return false;
}
function mergeMetaFields(matched) {
  return matched.reduce((meta, record) => assign(meta, record.meta), {});
}
function isSameParam(a, b) {
  return a.name === b.name && a.optional === b.optional && a.repeatable === b.repeatable;
}
function checkSameParams(a, b) {
  for (const key of a.keys) if (!key.optional && !b.keys.find(isSameParam.bind(null, key))) return warn$1(`Alias "${b.record.path}" and the original record: "${a.record.path}" must have the exact same param named "${key.name}"`);
  for (const key of b.keys) if (!key.optional && !a.keys.find(isSameParam.bind(null, key))) return warn$1(`Alias "${b.record.path}" and the original record: "${a.record.path}" must have the exact same param named "${key.name}"`);
}
function checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent) {
  if (parent && parent.record.name && !mainNormalizedRecord.name && !mainNormalizedRecord.path) warn$1(`The route named "${String(parent.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function checkSameNameAsAncestor(record, parent) {
  for (let ancestor = parent; ancestor; ancestor = ancestor.parent) if (ancestor.record.name === record.name) throw new Error(`A route named "${String(record.name)}" has been added as a ${parent === ancestor ? "child" : "descendant"} of a route with the same name. Route names must be unique and a nested route cannot use the same name as an ancestor.`);
}
function checkMissingParamsInAbsolutePath(record, parent) {
  for (const key of parent.keys) if (!record.keys.find(isSameParam.bind(null, key))) return warn$1(`Absolute path "${record.record.path}" must have the exact same param named "${key.name}" as its parent "${parent.record.path}".`);
}
function findInsertionIndex(matcher, matchers) {
  let lower = 0;
  let upper = matchers.length;
  while (lower !== upper) {
    const mid = lower + upper >> 1;
    if (comparePathParserScore(matcher, matchers[mid]) < 0) upper = mid;
    else lower = mid + 1;
  }
  const insertionAncestor = getInsertionAncestor(matcher);
  if (insertionAncestor) {
    upper = matchers.lastIndexOf(insertionAncestor, upper - 1);
    if (process.env.NODE_ENV !== "production" && upper < 0) warn$1(`Finding ancestor route "${insertionAncestor.record.path}" failed for "${matcher.record.path}"`);
  }
  return upper;
}
function getInsertionAncestor(matcher) {
  let ancestor = matcher;
  while (ancestor = ancestor.parent) if (isMatchable(ancestor) && comparePathParserScore(matcher, ancestor) === 0) return ancestor;
}
function isMatchable({ record }) {
  return !!(record.name || record.components && Object.keys(record.components).length || record.redirect);
}
function useLink(props) {
  const router = inject(routerKey);
  const currentRoute = inject(routeLocationKey);
  let hasPrevious = false;
  let previousTo = null;
  const route = computed(() => {
    const to = unref(props.to);
    if (process.env.NODE_ENV !== "production" && (!hasPrevious || to !== previousTo)) {
      if (!isRouteLocation(to)) if (hasPrevious) warn$1(`Invalid value for prop "to" in useLink()
- to:`, to, `
- previous to:`, previousTo, `
- props:`, props);
      else warn$1(`Invalid value for prop "to" in useLink()
- to:`, to, `
- props:`, props);
      previousTo = to;
      hasPrevious = true;
    }
    return router.resolve(to);
  });
  const activeRecordIndex = computed(() => {
    const { matched } = route.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length) return -1;
    const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index > -1) return index;
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index;
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e = {}) {
    if (guardEvent(e)) {
      const p = router[unref(props.replace) ? "replace" : "push"](unref(props.to)).catch(noop);
      if (props.viewTransition && typeof document !== "undefined" && "startViewTransition" in document) document.startViewTransition(() => p);
      return p;
    }
    return Promise.resolve();
  }
  if ((process.env.NODE_ENV !== "production" || false) && isBrowser) {
    const instance = getCurrentInstance();
    if (instance) {
      const linkContextDevtools = {
        route: route.value,
        isActive: isActive.value,
        isExactActive: isExactActive.value,
        error: null
      };
      instance.__vrl_devtools = instance.__vrl_devtools || [];
      instance.__vrl_devtools.push(linkContextDevtools);
      watchEffect(() => {
        linkContextDevtools.route = route.value;
        linkContextDevtools.isActive = isActive.value;
        linkContextDevtools.isExactActive = isExactActive.value;
        linkContextDevtools.error = isRouteLocation(unref(props.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
function preferSingleVNode(vnodes) {
  return vnodes.length === 1 ? vnodes[0] : vnodes;
}
const RouterLinkImpl = /* @__PURE__ */ defineComponent({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    },
    viewTransition: Boolean
  },
  useLink,
  setup(props, { slots }) {
    const link = reactive(useLink(props));
    const { options } = inject(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && preferSingleVNode(slots.default(link));
      return props.custom ? children : h("a", {
        "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
        href: link.href,
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
const RouterLink = RouterLinkImpl;
function guardEvent(e) {
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
  if (e.defaultPrevented) return;
  if (e.button !== void 0 && e.button !== 0) return;
  if (e.currentTarget && e.currentTarget.getAttribute) {
    const target = e.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target)) return;
  }
  if (e.preventDefault) e.preventDefault();
  return true;
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue) return false;
    } else if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value.valueOf() !== outerValue[i].valueOf())) return false;
  }
  return true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
const RouterViewImpl = /* @__PURE__ */ defineComponent({
  name: "RouterView",
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  compatConfig: { MODE: 3 },
  setup(props, { attrs, slots }) {
    process.env.NODE_ENV !== "production" && warnDeprecatedUsage();
    const injectedRoute = inject(routerViewLocationKey);
    const routeToDisplay = computed(() => props.route || injectedRoute.value);
    const injectedDepth = inject(viewDepthKey, 0);
    const depth = computed(() => {
      let initialDepth = unref(injectedDepth);
      const { matched } = routeToDisplay.value;
      let matchedRoute;
      while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) initialDepth++;
      return initialDepth;
    });
    const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
    provide(viewDepthKey, computed(() => depth.value + 1));
    provide(matchedRouteKey, matchedRouteRef);
    provide(routerViewLocationKey, routeToDisplay);
    const viewRef = ref();
    watch(() => [
      viewRef.value,
      matchedRouteRef.value,
      props.name
    ], ([instance, to, name], [oldInstance, from, oldName]) => {
      if (to) {
        to.instances[name] = instance;
        if (from && from !== to && instance && instance === oldInstance) {
          if (!to.leaveGuards.size) to.leaveGuards = from.leaveGuards;
          if (!to.updateGuards.size) to.updateGuards = from.updateGuards;
        }
      }
      if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
    }, { flush: "post" });
    return () => {
      const route = routeToDisplay.value;
      const currentName = props.name;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[currentName];
      if (!ViewComponent) return normalizeSlot(slots.default, {
        Component: ViewComponent,
        route
      });
      const routePropsOption = matchedRoute.props[currentName];
      const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
      const onVnodeUnmounted = (vnode) => {
        if (vnode.component.isUnmounted) matchedRoute.instances[currentName] = null;
      };
      const component = h(ViewComponent, assign({}, routeProps, attrs, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      if ((process.env.NODE_ENV !== "production" || false) && isBrowser && component.ref) {
        const info = {
          depth: depth.value,
          name: matchedRoute.name,
          path: matchedRoute.path,
          meta: matchedRoute.meta
        };
        (isArray(component.ref) ? component.ref.map((r) => r.i) : [component.ref.i]).forEach((instance) => {
          instance.__vrv_devtools = info;
        });
      }
      return normalizeSlot(slots.default, {
        Component: component,
        route
      }) || component;
    };
  }
});
function normalizeSlot(slot, data) {
  if (!slot) return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
const RouterView = RouterViewImpl;
function warnDeprecatedUsage() {
  const instance = getCurrentInstance();
  const parentName = instance.parent && instance.parent.type.name;
  const parentSubTreeType = instance.parent && instance.parent.subTree && instance.parent.subTree.type;
  if (parentName && (parentName === "KeepAlive" || parentName.includes("Transition")) && typeof parentSubTreeType === "object" && parentSubTreeType.name === "RouterView") {
    const comp = parentName === "KeepAlive" ? "keep-alive" : "transition";
    warn$1(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${comp}>
    <component :is="Component" />
  </${comp}>
</router-view>`);
  }
}
function createRouter(options) {
  const matcher = createRouterMatcher(options.routes, options);
  const parseQuery$1 = options.parseQuery || parseQuery;
  const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
  const routerHistory = options.history;
  if (process.env.NODE_ENV !== "production" && !routerHistory) throw new Error('Provide the "history" option when calling "createRouter()": https://router.vuejs.org/api/interfaces/RouterOptions.html#history');
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) history.scrollRestoration = "manual";
  const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams = applyToParams.bind(null, decode);
  function addRoute(parentOrRoute, route) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      if (process.env.NODE_ENV !== "production" && !parent) warn$1(`Parent route "${String(parentOrRoute)}" not found when adding child route`, route);
      record = route;
    } else record = parentOrRoute;
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name) {
    const recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) matcher.removeRoute(recordMatcher);
    else if (process.env.NODE_ENV !== "production") warn$1(`Cannot remove non-existent route "${String(name)}"`);
  }
  function getRoutes() {
    return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
  }
  function hasRoute(name) {
    return !!matcher.getRecordMatcher(name);
  }
  function resolve(rawLocation, currentLocation) {
    currentLocation = assign({}, currentLocation || currentRoute.value);
    if (typeof rawLocation === "string") {
      const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
      const matchedRoute$1 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
      const href$1 = routerHistory.createHref(locationNormalized.fullPath);
      if (process.env.NODE_ENV !== "production") {
        if (href$1.startsWith("//")) warn$1(`Location "${rawLocation}" resolved to "${href$1}". A resolved location cannot start with multiple slashes.`);
        else if (!matchedRoute$1.matched.length) warn$1(`No match found for location with path "${rawLocation}"`);
      }
      return assign(locationNormalized, matchedRoute$1, {
        params: decodeParams(matchedRoute$1.params),
        hash: decode(locationNormalized.hash),
        redirectedFrom: void 0,
        href: href$1
      });
    }
    if (process.env.NODE_ENV !== "production" && !isRouteLocation(rawLocation)) {
      warn$1(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, rawLocation);
      return resolve({});
    }
    let matcherLocation;
    if (rawLocation.path != null) {
      if (process.env.NODE_ENV !== "production" && "params" in rawLocation && !("name" in rawLocation) && Object.keys(rawLocation.params).length) warn$1(`Path "${rawLocation.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`);
      matcherLocation = assign({}, rawLocation, { path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path });
    } else {
      const targetParams = assign({}, rawLocation.params);
      for (const key in targetParams) if (targetParams[key] == null) delete targetParams[key];
      matcherLocation = assign({}, rawLocation, { params: encodeParams(targetParams) });
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash = rawLocation.hash || "";
    if (process.env.NODE_ENV !== "production" && hash && !hash.startsWith("#")) warn$1(`A \`hash\` should always start with the character "#". Replace "${hash}" with "#${hash}".`);
    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
      hash: encodeHash(hash),
      path: matchedRoute.path
    }));
    const href = routerHistory.createHref(fullPath);
    if (process.env.NODE_ENV !== "production") {
      if (href.startsWith("//")) warn$1(`Location "${rawLocation}" resolved to "${href}". A resolved location cannot start with multiple slashes.`);
      else if (!matchedRoute.matched.length) warn$1(`No match found for location with path "${rawLocation.path != null ? rawLocation.path : rawLocation}"`);
    }
    return assign({
      fullPath,
      hash,
      query: stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
    }, matchedRoute, {
      redirectedFrom: void 0,
      href
    });
  }
  function locationAsObject(to) {
    return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign({}, to);
  }
  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) return createRouterError(ErrorTypes.NAVIGATION_CANCELLED, {
      from,
      to
    });
  }
  function push(to) {
    return pushWithRedirect(to);
  }
  function replace(to) {
    return push(assign(locationAsObject(to), { replace: true }));
  }
  function handleRedirectRecord(to, from) {
    const lastMatched = to.matched[to.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched;
      let newTargetLocation = typeof redirect === "function" ? redirect(to, from) : redirect;
      if (typeof newTargetLocation === "string") {
        newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : { path: newTargetLocation };
        newTargetLocation.params = {};
      }
      if (process.env.NODE_ENV !== "production" && newTargetLocation.path == null && !("name" in newTargetLocation)) {
        warn$1(`Invalid redirect found:
${JSON.stringify(newTargetLocation, null, 2)}
 when navigating to "${to.fullPath}". A redirect must contain a name or path. This will break in production.`);
        throw new Error("Invalid redirect");
      }
      return assign({
        query: to.query,
        hash: to.hash,
        params: newTargetLocation.path != null ? {} : to.params
      }, newTargetLocation);
    }
  }
  function pushWithRedirect(to, redirectedFrom) {
    const targetLocation = pendingLocation = resolve(to);
    const from = currentRoute.value;
    const data = to.state;
    const force = to.force;
    const replace$1 = to.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation, from);
    if (shouldRedirect) return pushWithRedirect(assign(locationAsObject(shouldRedirect), {
      state: typeof shouldRedirect === "object" ? assign({}, data, shouldRedirect.state) : data,
      force,
      replace: replace$1
    }), redirectedFrom || targetLocation);
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
      failure = createRouterError(ErrorTypes.NAVIGATION_DUPLICATED, {
        to: toLocation,
        from
      });
      handleScroll(from, from, true, false);
    }
    return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? isNavigationFailure(error, ErrorTypes.NAVIGATION_GUARD_REDIRECT) ? error : markAsReady(error) : triggerError(error, toLocation, from)).then((failure$1) => {
      if (failure$1) {
        if (isNavigationFailure(failure$1, ErrorTypes.NAVIGATION_GUARD_REDIRECT)) {
          if (process.env.NODE_ENV !== "production" && isSameRouteLocation(stringifyQuery$1, resolve(failure$1.to), toLocation) && redirectedFrom && (redirectedFrom._count = redirectedFrom._count ? redirectedFrom._count + 1 : 1) > 30) {
            warn$1(`Detected a possibly infinite redirection in a navigation guard when going from "${from.fullPath}" to "${toLocation.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`);
            return Promise.reject(/* @__PURE__ */ new Error("Infinite redirect in navigation guard"));
          }
          return pushWithRedirect(assign({ replace: replace$1 }, locationAsObject(failure$1.to), {
            state: typeof failure$1.to === "object" ? assign({}, data, failure$1.to.state) : data,
            force
          }), redirectedFrom || toLocation);
        }
      } else failure$1 = finalizeNavigation(toLocation, from, true, replace$1, data);
      triggerAfterEach(toLocation, from, failure$1);
      return failure$1;
    });
  }
  function checkCanceledNavigationAndReject(to, from) {
    const error = checkCanceledNavigation(to, from);
    return error ? Promise.reject(error) : Promise.resolve();
  }
  function runWithContext(fn) {
    const app = installedApps.values().next().value;
    return app && typeof app.runWithContext === "function" ? app.runWithContext(fn) : fn();
  }
  function navigate(to, from) {
    let guards;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
    guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
    for (const record of leavingRecords) record.leaveGuards.forEach((guard) => {
      guards.push(guardToPromiseFn(guard, to, from));
    });
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
    guards.push(canceledNavigationCheck);
    return runGuardQueue(guards).then(() => {
      guards = [];
      for (const guard of beforeGuards.list()) guards.push(guardToPromiseFn(guard, to, from));
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
      for (const record of updatingRecords) record.updateGuards.forEach((guard) => {
        guards.push(guardToPromiseFn(guard, to, from));
      });
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const record of enteringRecords) if (record.beforeEnter) if (isArray(record.beforeEnter)) for (const beforeEnter of record.beforeEnter) guards.push(guardToPromiseFn(beforeEnter, to, from));
      else guards.push(guardToPromiseFn(record.beforeEnter, to, from));
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      to.matched.forEach((record) => record.enterCallbacks = {});
      guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from, runWithContext);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const guard of beforeResolveGuards.list()) guards.push(guardToPromiseFn(guard, to, from));
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).catch((err) => isNavigationFailure(err, ErrorTypes.NAVIGATION_CANCELLED) ? err : Promise.reject(err));
  }
  function triggerAfterEach(to, from, failure) {
    afterGuards.list().forEach((guard) => runWithContext(() => guard(to, from, failure)));
  }
  function finalizeNavigation(toLocation, from, isPush, replace$1, data) {
    const error = checkCanceledNavigation(toLocation, from);
    if (error) return error;
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    const state = !isBrowser ? {} : history.state;
    if (isPush) if (replace$1 || isFirstNavigation) routerHistory.replace(toLocation.fullPath, assign({ scroll: isFirstNavigation && state && state.scroll }, data));
    else routerHistory.push(toLocation.fullPath, data);
    currentRoute.value = toLocation;
    handleScroll(toLocation, from, isPush, isFirstNavigation);
    markAsReady();
  }
  let removeHistoryListener;
  function setupListeners() {
    if (removeHistoryListener) return;
    removeHistoryListener = routerHistory.listen((to, _from, info) => {
      if (!router.listening) return;
      const toLocation = resolve(to);
      const shouldRedirect = handleRedirectRecord(toLocation, router.currentRoute.value);
      if (shouldRedirect) {
        pushWithRedirect(assign(shouldRedirect, {
          replace: true,
          force: true
        }), toLocation).catch(noop);
        return;
      }
      pendingLocation = toLocation;
      const from = currentRoute.value;
      if (isBrowser) saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
      navigate(toLocation, from).catch((error) => {
        if (isNavigationFailure(error, ErrorTypes.NAVIGATION_ABORTED | ErrorTypes.NAVIGATION_CANCELLED)) return error;
        if (isNavigationFailure(error, ErrorTypes.NAVIGATION_GUARD_REDIRECT)) {
          pushWithRedirect(assign(locationAsObject(error.to), { force: true }), toLocation).then((failure) => {
            if (isNavigationFailure(failure, ErrorTypes.NAVIGATION_ABORTED | ErrorTypes.NAVIGATION_DUPLICATED) && !info.delta && info.type === NavigationType.pop) routerHistory.go(-1, false);
          }).catch(noop);
          return Promise.reject();
        }
        if (info.delta) routerHistory.go(-info.delta, false);
        return triggerError(error, toLocation, from);
      }).then((failure) => {
        failure = failure || finalizeNavigation(toLocation, from, false);
        if (failure) {
          if (info.delta && !isNavigationFailure(failure, ErrorTypes.NAVIGATION_CANCELLED)) routerHistory.go(-info.delta, false);
          else if (info.type === NavigationType.pop && isNavigationFailure(failure, ErrorTypes.NAVIGATION_ABORTED | ErrorTypes.NAVIGATION_DUPLICATED)) routerHistory.go(-1, false);
        }
        triggerAfterEach(toLocation, from, failure);
      }).catch(noop);
    });
  }
  let readyHandlers = useCallbacks();
  let errorListeners = useCallbacks();
  let ready;
  function triggerError(error, to, from) {
    markAsReady(error);
    const list = errorListeners.list();
    if (list.length) list.forEach((handler) => handler(error, to, from));
    else {
      if (process.env.NODE_ENV !== "production") warn$1("uncaught error during route navigation:");
      console.error(error);
    }
    return Promise.reject(error);
  }
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED) return Promise.resolve();
    return new Promise((resolve$1, reject) => {
      readyHandlers.add([resolve$1, reject]);
    });
  }
  function markAsReady(err) {
    if (!ready) {
      ready = !err;
      setupListeners();
      readyHandlers.list().forEach(([resolve$1, reject]) => err ? reject(err) : resolve$1());
      readyHandlers.reset();
    }
    return err;
  }
  function handleScroll(to, from, isPush, isFirstNavigation) {
    const { scrollBehavior } = options;
    if (!isBrowser || !scrollBehavior) return Promise.resolve();
    const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
    return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to, from));
  }
  const go = (delta) => routerHistory.go(delta);
  let started;
  const installedApps = /* @__PURE__ */ new Set();
  const router = {
    currentRoute,
    listening: true,
    addRoute,
    removeRoute,
    clearRoutes: matcher.clearRoutes,
    hasRoute,
    getRoutes,
    resolve,
    options,
    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorListeners.add,
    isReady,
    install(app) {
      app.component("RouterLink", RouterLink);
      app.component("RouterView", RouterView);
      app.config.globalProperties.$router = router;
      Object.defineProperty(app.config.globalProperties, "$route", {
        enumerable: true,
        get: () => unref(currentRoute)
      });
      if (isBrowser && !started && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true;
        push(routerHistory.location).catch((err) => {
          if (process.env.NODE_ENV !== "production") warn$1("Unexpected error when starting the router:", err);
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) Object.defineProperty(reactiveRoute, key, {
        get: () => currentRoute.value[key],
        enumerable: true
      });
      app.provide(routerKey, router);
      app.provide(routeLocationKey, shallowReactive(reactiveRoute));
      app.provide(routerViewLocationKey, currentRoute);
      const unmountApp = app.unmount;
      installedApps.add(app);
      app.unmount = function() {
        installedApps.delete(app);
        if (installedApps.size < 1) {
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          removeHistoryListener = null;
          currentRoute.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
      if ((process.env.NODE_ENV !== "production" || false) && isBrowser) addDevtools(app, router, matcher);
    }
  };
  function runGuardQueue(guards) {
    return guards.reduce((promise, guard) => promise.then(() => runWithContext(guard)), Promise.resolve());
  }
  return router;
}
const _sfc_main$q = {
  data() {
    return {
      language: "en"
    };
  },
  mounted() {
    if (window.location.href.split("/")[3] == "es") {
      useI18n().locale.value = "es";
      this.language = "es";
    }
  },
  computed: {
    ...mapState({
      account: (state) => state.auth.account
    }),
    currentRouteName() {
      return this.$route.path;
    },
    shouldDisplay() {
      return ["account", "account-en", "account-es", "wireguard-en", "wireguard-es", "wireguard-config", "wireguard-config-es", "wireguard-config-en", "device-management-en", "device-management-es", "vouchers-es", "vouchers-en", "service-email", "service-email-en", "service-email-es", "service-dns", "service-dns-en", "service-dns-es"].includes(
        this.$route.name
      );
    }
  },
  methods: {
    isAccountRoute() {
      return (this.currentRouteName.startsWith("/en/account") || this.currentRouteName.startsWith("/es/account")) && !this.isWireGuardRoute() && !this.isDeviceManagementRoute() && !this.isVouchersRoute() && !this.isServiceEmailRoute() && !this.isServiceDnsRoute();
    },
    isWireGuardRoute() {
      return this.currentRouteName.startsWith("/en/account/wireguard") || this.currentRouteName.startsWith("/es/account/wireguard");
    },
    isDeviceManagementRoute() {
      return this.currentRouteName.startsWith("/en/account/device-management") || this.currentRouteName.startsWith("/es/account/device-management");
    },
    isVouchersRoute() {
      return this.currentRouteName.startsWith("/en/account/vouchers") || this.currentRouteName.startsWith("/es/account/vouchers");
    },
    isServiceEmailRoute() {
      return this.currentRouteName.startsWith("/en/account/service/email") || this.currentRouteName.startsWith("/es/account/service/email");
    },
    isServiceDnsRoute() {
      return this.currentRouteName.startsWith("/en/account/service/dns") || this.currentRouteName.startsWith("/es/account/service/dns");
    }
  }
};
function _sfc_ssrRender$q(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  if ($options.shouldDisplay) {
    _push(`<div${ssrRenderAttrs_1(mergeProps(_attrs, { class: "tabs sub-navigation" }))}><div class="page-centered-menu"><ul><li class="${ssrRenderClass_1({ "is-active": $options.isAccountRoute() })}">`);
    _push(ssrRenderComponent_1(_component_router_link, {
      to: { name: "account-" + this.language }
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${ssrInterpolate_1(_ctx.$t("account.services"))}`);
        } else {
          return [
            createTextVNode(toDisplayString(_ctx.$t("account.services")), 1)
          ];
        }
      }, void 0, true),
      _: 1
    }, _parent));
    _push(`</li><li class="${ssrRenderClass_1({ "is-active": $options.isDeviceManagementRoute() })}">`);
    _push(ssrRenderComponent_1(_component_router_link, {
      to: { name: "device-management-" + this.language }
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${ssrInterpolate_1(_ctx.$t("account.deviceManagement"))}`);
        } else {
          return [
            createTextVNode(toDisplayString(_ctx.$t("account.deviceManagement")), 1)
          ];
        }
      }, void 0, true),
      _: 1
    }, _parent));
    _push(`</li><li>`);
    _push(ssrRenderComponent_1(_component_router_link, {
      class: "settings",
      to: { name: "settings-main-" + this.language }
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${ssrInterpolate_1(_ctx.$t("account.accountSettings"))}`);
        } else {
          return [
            createTextVNode(toDisplayString(_ctx.$t("account.accountSettings")), 1)
          ];
        }
      }, void 0, true),
      _: 1
    }, _parent));
    _push(`</li></ul></div></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/components/AccountMenu.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const AccountMenu = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["ssrRender", _sfc_ssrRender$q]]);
const _sfc_main$p = {
  props: {
    data: {
      required: true,
      type: Object
    }
  },
  mounted() {
    if (window.location.href.split("/")[3] == "es") {
      useI18n().locale.value = "es";
    }
  },
  computed: {
    ...mapState({
      error: (state) => state.wireguard.error,
      inProgress: (state) => state.wireguard.inProgress
    }),
    hasError() {
      return this.error;
    },
    errorMessage() {
      return typeof this.error === "object" && this.error !== null ? this.error.message : this.error;
    }
  },
  methods: {
    async deleteKey() {
      await this.$store.dispatch("wireguard/deleteKey", {
        "public_key": this.data.publicKey
      });
      if (!this.error) {
        this.closeDialog();
      }
    },
    closeDialog() {
      this.$store.commit("popup/close");
    }
  }
};
function _sfc_ssrRender$p(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs_1(_attrs)} data-v-218e256c><p data-v-218e256c>${ssrInterpolate_1(_ctx.$t("account.wireguardTab.deleteKeyConfirm"))}</p>`);
  if ($options.hasError) {
    _push(`<p style="${ssrRenderStyle_1({ "color": "red" })}" data-v-218e256c>${$options.errorMessage ?? ""}</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<button class="btn btn-solid" data-v-218e256c>${ssrInterpolate_1(_ctx.$t("account.wireguardTab.yes"))}</button><button class="btn btn-border" data-v-218e256c>${ssrInterpolate_1(_ctx.$t("account.wireguardTab.cancel"))}</button></div>`);
}
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/components/popups/DeleteWireguardKey.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const DeleteWireguardKey = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["ssrRender", _sfc_ssrRender$p], ["__scopeId", "data-v-218e256c"]]);
const _sfc_main$o = {
  props: {
    data: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      isInvalid: false,
      publicKey: "",
      comment: ""
    };
  },
  mounted() {
    this.$store.dispatch("wireguard/load");
    if (window.location.href.split("/")[3] == "es") {
      useI18n().locale.value = "es";
    }
  },
  computed: {
    ...mapState({
      error: (state) => state.wireguard.error,
      inProgress: (state) => state.wireguard.inProgress
    }),
    hasError() {
      return this.error;
    },
    errorMessage() {
      return typeof this.error === "object" && this.error !== null ? this.error.message : this.error;
    }
  },
  methods: {
    created() {
      this.$store.dispatch("wireguard/clear");
    },
    async add() {
      this.isInvalid = false;
      await this.$store.dispatch("wireguard/add", {
        public_key: this.publicKey,
        comment: this.comment
      });
      if (!this.error) {
        this.publicKey = "";
        this.comment = "";
        this.closeDialog();
      }
    },
    closeDialog() {
      this.$store.commit("popup/close");
    }
  }
};
function _sfc_ssrRender$o(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs_1(mergeProps(_attrs, { class: "form popup--small" }))} data-v-f36879c6><form data-v-f36879c6><h3 data-v-f36879c6>${ssrInterpolate_1(_ctx.$t("account.wireguardTab.addWireguardKey"))}</h3>`);
  if ($data.isInvalid && !_ctx.error) {
    _push(`<p class="error" data-v-f36879c6>${ssrInterpolate_1(_ctx.$t("account.wireguardTab.publicKeyRequired"))}</p>`);
  } else {
    _push(`<!---->`);
  }
  if (!$data.isInvalid && $options.hasError) {
    _push(`<p class="error" data-v-f36879c6>${$options.errorMessage ?? ""}</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<label for="inp_key" data-v-f36879c6>${ssrInterpolate_1(_ctx.$t("account.wireguardTab.publicKey"))}</label><input id="inp_key"${ssrRenderAttr_1("value", $data.publicKey)} type="text" autofocus data-v-f36879c6><label for="inp_comment" class="mt-1" data-v-f36879c6>${ssrInterpolate_1(_ctx.$t("account.wireguardTab.comment"))}</label><input id="comment"${ssrRenderAttr_1("value", $data.comment)} type="text" data-v-f36879c6><button${ssrIncludeBooleanAttr(_ctx.inProgress) ? " disabled" : ""} class="btn btn-big btn-solid mt-2" data-v-f36879c6>${ssrInterpolate_1(_ctx.$t("account.wireguardTab.add"))}</button><button class="btn btn-icon btn-icon-red mt-1" data-v-f36879c6>${ssrInterpolate_1(_ctx.$t("account.wireguardTab.cancel"))}</button></form></div>`);
}
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/components/popups/AddWireguardKey.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const AddWireguardKey = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["ssrRender", _sfc_ssrRender$o], ["__scopeId", "data-v-f36879c6"]]);
const _sfc_main$n = {
  props: ["fill", "width", "height"],
  created() {
    this.pathFill = this.fill ? this.fill : "#398fe6";
  }
};
function _sfc_ssrRender$n(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<svg${ssrRenderAttrs_1(mergeProps(_attrs, {
    version: "1.1",
    id: "L9",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    viewBox: "0 0 100 100",
    "enable-background": "new 0 0 0 0",
    "xml:space": "preserve",
    width: $props.width,
    height: $props.height,
    style: { "margin": "-10px 5px -10px 0px" }
  }))}><path${ssrRenderAttr_1("fill", _ctx.pathFill)} d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform></path></svg>`);
}
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/components/ProgressSpinner.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const Spinner = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["ssrRender", _sfc_ssrRender$n]]);
const _sfc_main$m = {
  components: {
    progressSpinner: Spinner
  },
  props: {
    data: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      userConfirmation: "",
      language: "en"
    };
  },
  computed: {
    ...mapState({
      account: (state) => state.auth.account,
      confirmation: (state) => state.deleteAccount.confirmation,
      error: (state) => state.deleteAccount.error,
      inProgress: (state) => state.deleteAccount.inProgress
    })
  },
  created() {
    this.$store.dispatch("deleteAccount/updateConfirmation");
  },
  mounted() {
    if (window.location.href.split("/")[3] == "es") {
      useI18n().locale.value = "es";
      this.language = "es";
    }
  },
  methods: {
    async deleteAccount() {
      await this.$store.dispatch("deleteAccount/delete", {
        confirmation: this.userConfirmation
      });
      if (!this.error) {
        this.closeDialog();
        window.location = "/" + this.language + "/account";
      }
    },
    closeDialog() {
      this.$store.commit("popup/close");
    }
  }
};
function _sfc_ssrRender$m(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_progress_spinner = resolveComponent("progress-spinner");
  _push(`<div${ssrRenderAttrs_1(mergeProps(_attrs, { class: "popup--content" }))} data-v-022ecd8e><h3 data-v-022ecd8e>${ssrInterpolate_1(_ctx.$t("account.accountSettingsTab.deleteAccount"))}</h3>`);
  if (_ctx.error) {
    _push(`<p style="${ssrRenderStyle_1({ "color": "red" })}" data-v-022ecd8e>${_ctx.error.message ?? ""}</p>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.confirmation) {
    _push(`<div data-v-022ecd8e>`);
    if (!_ctx.account.is_active) {
      _push(`<div class="confirm" data-v-022ecd8e><p data-v-022ecd8e>${ssrInterpolate_1(_ctx.$t("account.accountSettingsTab.deleteAccountConfirm"))}</p></div>`);
    } else {
      _push(`<div class="confirm" data-v-022ecd8e><p data-v-022ecd8e>${ssrInterpolate_1(_ctx.$t("account.accountSettingsTab.accountActive"))}</p><p data-v-022ecd8e>${ssrInterpolate_1(_ctx.$t("account.accountSettingsTab.deleteAccountConfirmDesc"))} <span style="${ssrRenderStyle_1({ "font-weight": "bold" })}" data-v-022ecd8e>${ssrInterpolate_1(_ctx.confirmation)}</span></p><input type="text"${ssrRenderAttr_1("value", $data.userConfirmation)} autofocus data-v-022ecd8e></div>`);
    }
    _push(`<button class="btn btn-solid-red"${ssrIncludeBooleanAttr(_ctx.inProgress) ? " disabled" : ""} data-v-022ecd8e>${ssrInterpolate_1(_ctx.$t("account.accountSettingsTab.deleteAccount"))}</button><a class="btn btn-icon" data-v-022ecd8e>${ssrInterpolate_1(_ctx.$t("account.accountSettingsTab.cancel"))}</a><div class="note" data-v-022ecd8e><p data-v-022ecd8e><b data-v-022ecd8e>${ssrInterpolate_1(_ctx.$t("account.accountSettingsTab.warning"))}</b> ${ssrInterpolate_1(_ctx.$t("account.accountSettingsTab.warningDesc"))}</p></div></div>`);
  } else {
    _push(`<div data-v-022ecd8e>`);
    if (_ctx.inProgress) {
      _push(`<div style="${ssrRenderStyle_1({ "display": "flex", "justify-content": "center", "margin": "4em 1em" })}" data-v-022ecd8e>`);
      _push(ssrRenderComponent_1(_component_progress_spinner, { style: { "width": "32px", "height": "32px" } }, null, _parent));
      _push(`</div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  }
  _push(`</div>`);
}
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/components/popups/DeleteAccount.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const DeleteAccount = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["ssrRender", _sfc_ssrRender$m], ["__scopeId", "data-v-022ecd8e"]]);
const _sfc_main$l = {
  components: {
    progressSpinner: Spinner
  },
  props: {
    data: {}
  },
  computed: {
    ...mapState({
      account: (state) => state.auth.account,
      error: (state) => state.payments.error,
      inProgress: (state) => state.payments.inProgress
    })
  },
  async created() {
    await this.$store.dispatch("payments/clear");
  },
  mounted() {
    if (window.location.href.split("/")[3] == "es") {
      useI18n().locale.value = "es";
    }
  },
  methods: {
    async disableRecurringPayments() {
      await this.$store.dispatch("payments/disableRecurring");
      if (this.error)
        return;
      this.closeDialog();
    },
    closeDialog() {
      this.$store.commit("popup/close");
    }
  }
};
function _sfc_ssrRender$l(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_progress_spinner = resolveComponent("progress-spinner");
  _push(`<div${ssrRenderAttrs_1(mergeProps(_attrs, { class: "message-box" }))}><h3>${ssrInterpolate_1(_ctx.$t("account.disableRecurring"))}</h3>`);
  if (_ctx.error) {
    _push(`<p style="${ssrRenderStyle_1({ "color": "red" })}">${_ctx.error.message ?? ""}</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<p>${ssrInterpolate_1(_ctx.$t("account.disableRecurringDesc"))}</p><div class="popup-buttons"><button class="btn btn-big btn-solid"${ssrIncludeBooleanAttr(_ctx.inProgress) ? " disabled" : ""}>`);
  if (_ctx.inProgress) {
    _push(ssrRenderComponent_1(_component_progress_spinner, {
      width: "32",
      height: "32",
      fill: "#FFFFFF"
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(` ${ssrInterpolate_1(_ctx.$t("account.disableRecurringPayments"))}</button><a class="btn btn-icon btn-icon-red">${ssrInterpolate_1(_ctx.$t("account.cancel"))}</a></div></div>`);
}
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/components/popups/DisableRecurring.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const DisableRecurring = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["ssrRender", _sfc_ssrRender$l]]);
const _sfc_main$k = {};
function _sfc_ssrRender$k(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs_1(mergeProps(_attrs, {
    xmlns: "http://www.w3.org/2000/svg",
    width: "36",
    height: "24",
    viewBox: "0 0 36 24"
  }))} data-v-64f8c41f><g fill="none" fill-rule="nonzero" data-v-64f8c41f><path class="back" fill="#000" d="M4.35 10.16H3v4.626h1.35c.71 0 1.24-.161 1.677-.536.548-.429.858-1.09.858-1.768 0-1.375-1.04-2.321-2.535-2.321zm1.076 3.465c-.292.25-.657.375-1.259.375h-.255v-3.054h.255c.602 0 .949.108 1.259.375.31.286.51.715.51 1.143 0 .447-.2.893-.51 1.161zM7.304 10.161h1v4.625h-1zM10.478 11.929c-.548-.197-.712-.34-.712-.59 0-.285.292-.518.693-.518.274 0 .511.108.748.375l.474-.625a2.116 2.116 0 0 0-1.386-.517c-.839 0-1.477.571-1.477 1.321 0 .643.292.964 1.167 1.268.365.125.547.214.638.268.183.125.274.285.274.482 0 .375-.31.66-.711.66-.438 0-.784-.214-1.003-.624l-.602.553c.42.607.93.875 1.641.875.949 0 1.623-.625 1.623-1.518-.018-.696-.328-1.035-1.367-1.41zM12.119 12.464c0 1.357 1.094 2.411 2.499 2.411.4 0 .73-.071 1.149-.268v-1.053c-.365.357-.693.5-1.113.5-.93 0-1.587-.661-1.587-1.59 0-.893.675-1.589 1.55-1.589.438 0 .767.16 1.15.518v-1.054c-.402-.196-.73-.285-1.131-.285-1.386 0-2.517 1.071-2.517 2.41zM23.08 13.268l-1.277-3.107H20.8l2.006 4.732h.493l2.042-4.732h-1.003zM25.76 14.786h2.609V14h-1.696v-1.25h1.641v-.786h-1.641v-1.018h1.696v-.785h-2.608zM32.017 11.518c0-.857-.602-1.357-1.678-1.357H28.97v4.625h.912v-1.857h.127l1.277 1.857h1.13l-1.476-1.947c.693-.143 1.076-.607 1.076-1.321zm-1.842.768H29.9v-1.393h.292c.565 0 .893.232.893.678-.018.465-.328.715-.911.715z" data-v-64f8c41f></path><path fill="#F58025" d="M21.074 12.464c0 1.357-1.131 2.465-2.517 2.465s-2.517-1.108-2.517-2.465c0-1.357 1.13-2.464 2.517-2.464 1.404.018 2.517 1.107 2.517 2.464z" data-v-64f8c41f></path></g></svg>`);
}
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/components/icons/cc/discover.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const DiscoverIcon = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["ssrRender", _sfc_ssrRender$k], ["__scopeId", "data-v-64f8c41f"]]);
const _sfc_main$j = {};
function _sfc_ssrRender$j(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs_1(mergeProps(_attrs, {
    xmlns: "http://www.w3.org/2000/svg",
    width: "36",
    height: "24",
    viewBox: "0 0 36 24"
  }))} data-v-1d3c45d2><g class="g" fill-rule="evenodd" data-v-1d3c45d2><path d="M13.686 15.76l2.048-6.525h1.828l-2.049 6.525zM12.869 9.237l-1.644 2.766c-.419.724-.664 1.09-.781 1.548h-.025c.029-.58-.055-1.293-.063-1.696l-.181-2.618H7.098l-.032.175c.79 0 1.26.384 1.389 1.168l.6 5.18h1.893l3.828-6.523H12.87zM27.082 15.76l-.05-.97-2.283-.002-.467.972h-1.984l3.598-6.513h2.436l.609 6.513h-1.86zm-.21-3.849c-.02-.482-.037-1.137-.003-1.533h-.027c-.111.324-.59 1.297-.8 1.775l-.68 1.43h1.603l-.093-1.672zM19.48 15.946a5.242 5.242 0 0 1-2.758-.748l.871-1.285c.549.297.98.639 1.971.639.319 0 .626-.08.8-.372.255-.425-.058-.653-.772-1.043l-.352-.222c-1.059-.699-1.517-1.362-1.018-2.52.318-.742 1.16-1.303 2.546-1.303.957 0 1.854.4 2.377.79l-1.001 1.134c-.51-.398-.933-.6-1.417-.6-.386 0-.678.144-.78.338-.19.364.062.613.618.946l.42.258c1.284.783 1.59 1.604 1.268 2.371-.554 1.322-1.638 1.617-2.773 1.617z" data-v-1d3c45d2></path></g></svg>`);
}
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/components/icons/cc/visa.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const VisaIcon = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["ssrRender", _sfc_ssrRender$j], ["__scopeId", "data-v-1d3c45d2"]]);
const _sfc_main$i = {
  components: { DiscoverIcon, VisaIcon },
  props: ["braintree", "amount", "error"],
  model: {
    prop: "hostedFields",
    event: "fieldsInitialized"
  },
  data() {
    return {
      hostedFields: void 0,
      threeDSecure: void 0,
      initialized: false,
      ccValid: false,
      formValid: false,
      is3DSParameters: false,
      email: null,
      name: null,
      surname: null,
      address: null,
      postalCode: null,
      errorMessages: {
        "authenticate_error": "An error occurred within the 3D Secure authentication system. Please try again.",
        "authenticate_failed": "Incorrect 3D Secure password or 3D Secure authentication timed out. Please try again.",
        "authenticate_signature_verification_failed": "An error occurred during the lookup and the returned authentication message is no longer secure. Please try again.",
        "authenticate_unable_to_authenticate": "A downstream error occurred with the card-issuing bank that caused the 3D Secure authentication to fail. Please try again.",
        "authentication_unavailable": "The card network is unavailable to verify the card or 3D Secure authentication timed out. Please try again.",
        "lookup_error": "An error occurred during the lookup and caused 3D Secure authentication to fail.",
        "lookup_not_enrolled": "Card is not enrolled in 3D Secure.",
        "unsupported_card": "Unsuported card type for 3D Secure authentication.",
        "unsupported_account_type": "Unsuported card type for 3D Secure authentication.",
        "unsupported_three_d_secure_version": "Required 3D Secure version is not supported.",
        "authentication_bypassed": "Card was issued by a bank where 3D Secure authentication steps are bypassed.",
        "challenge_required": "The issuer is requiring a challenge to complete the 3D Secure authentication.",
        "authenticate_rejected": "The issuer has rejected the 3D Secure authentication without issuing a challenge.",
        "authenticate_frictionless_failed": "The issuer is not allowing the customer to complete a 3D Secure challenge.",
        "lookup_failed_acs_error": "An error ocurred in the issuer's system during the 3D Secure lookup and caused the authentication to fail.",
        "authenticate_failed_acs_error": "An error ocurred in the issuer's system during the 3D Secure challenge and caused the authentication to fail.",
        "lookup_card_error": "There was an issue with validating card by mpi provider.",
        "lookup_server_error": "There was an issue with directory server."
      }
    };
  },
  created() {
    this.initFields();
    this.initThreeDSecure();
  },
  mounted() {
    if (window.location.href.split("/")[3] == "es") {
      useI18n().locale.value = "es";
    }
  },
  methods: {
    initFields() {
      let hostedFieldsStyles = {
        input: {
          color: "#222226",
          "font-size": "20px",
          "font-family": '"Roboto Mono",monospace'
        }
      };
      let scheme = { forced: false };
      if (window.getCurrentScheme) {
        scheme = window.getCurrentScheme();
      }
      if (!scheme.forced) {
        hostedFieldsStyles["@media (prefers-color-scheme: dark)"] = {
          "input": {
            "color": "rgba(255, 255, 255, 0.8)"
          }
        };
      } else if (scheme.name == "dark") {
        hostedFieldsStyles.input.color = "rgba(255, 255, 255, 0.8)";
      }
      const hostedFieldsSettings = {
        number: {
          selector: "#card-number",
          placeholder: this.$t("account.payments.creditCard.cardNumber")
        },
        cvv: {
          selector: "#cvv",
          placeholder: "CVV"
        },
        expirationDate: {
          selector: "#expiration-date",
          placeholder: this.$t("account.payments.creditCard.dateFormat")
        }
      };
      braintree.hostedFields.create(
        {
          client: this.braintree.client,
          styles: hostedFieldsStyles,
          fields: hostedFieldsSettings
        },
        (err, hostedFieldsInstance) => {
          if (err) {
            console.error(err);
            return;
          }
          this.initialized = true;
          this.hostedFields = hostedFieldsInstance;
          this.hostedFields.on("validityChange", this.fieldUpdated);
          this.$emit("fieldsInitialized", this.hostedFields);
        }
      );
    },
    initThreeDSecure() {
      braintree.threeDSecure.create(
        {
          version: 2,
          client: this.braintree.client
        },
        (err, threeDSecureInstance) => {
          if (err) {
            console.error(err);
            return;
          }
          this.threeDSecure = threeDSecureInstance;
        }
      );
    },
    fieldUpdated(event) {
      var number = event.fields.number;
      var cvv = event.fields.cvv;
      var expirationDate = event.fields.expirationDate;
      if (number.isValid && number.isPotentiallyValid) {
        this.ccValid = true;
      }
      if (!number.isPotentiallyValid) {
        this.ccValid = false;
      }
      this.formValid = number.isValid && cvv.isValid && expirationDate.isValid;
      this.$emit("valid-changed", { value: this.formValid });
    },
    tokenize() {
      return new Promise((resolutionFunc, rejectionFunc) => {
        this.hostedFields.tokenize().then((payload) => {
          var threeDSecureParameters = {
            onLookupComplete: (data, next) => {
              next();
            },
            amount: this.amount || "0.0",
            nonce: payload.nonce,
            bin: payload.details.bin
          };
          if (this.is3DSParameters) {
            threeDSecureParameters["email"] = this.email;
            threeDSecureParameters["billingAddress"] = {
              givenName: this.name,
              surname: this.surname,
              streetAddress: this.address,
              postalCode: this.postalCode
            };
          }
          return this.threeDSecure.verifyCard(threeDSecureParameters);
        }).then((payload) => {
          if (!payload.liabilityShifted) {
            if (!payload.liabilityShiftPossible && payload.threeDSecureInfo.enrolled == "B") {
              resolutionFunc(payload);
              return;
            }
            if (!payload.liabilityShiftPossible && payload.threeDSecureInfo.enrolled == "N") {
              resolutionFunc(payload);
              return;
            }
            if (!payload.liabilityShiftPossible && payload.threeDSecureInfo.enrolled === null) {
              resolutionFunc(payload);
              return;
            }
            var errorMessage = "verification failed";
            if (this.errorMessages[payload.threeDSecureInfo.status]) {
              errorMessage = "verification failed - " + this.errorMessages[payload.threeDSecureInfo.status];
            }
            const err = new Error(errorMessage);
            console.error(err);
            rejectionFunc(err);
            return;
          }
          resolutionFunc(payload);
        }).catch((err) => {
          console.error(err);
          if (err.code == "THREEDS_CARDINAL_SDK_ERROR") {
            rejectionFunc(new Error("Error on Authentication. Please attempt the transaction again."));
            return;
          }
          rejectionFunc(err);
        });
      });
    }
  }
};
function _sfc_ssrRender$i(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_discover_icon = resolveComponent("discover-icon");
  const _component_visa_icon = resolveComponent("visa-icon");
  _push(`<div${ssrRenderAttrs_1(mergeProps(_attrs, { class: "credit-card-form" }))} data-v-6a4b3a62><div class="card-logos" data-v-6a4b3a62><img width="36" height="24" src="/images/icon-payment-mastercard.svg" data-v-6a4b3a62><img width="36" height="24" src="/images/icon-payment-maestro.svg" data-v-6a4b3a62>`);
  _push(ssrRenderComponent_1(_component_discover_icon, {
    width: "36",
    height: "24"
  }, null, _parent));
  _push(ssrRenderComponent_1(_component_visa_icon, {
    width: "36",
    height: "24"
  }, null, _parent));
  _push(`</div><div class="card-line block" data-v-6a4b3a62>`);
  if ($props.error) {
    _push(`<p class="error-message" data-v-6a4b3a62><b data-v-6a4b3a62>Error:</b> ${ssrInterpolate_1($props.error.message)}</p>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.error) {
    _push(`<p class="note" data-v-6a4b3a62>${ssrInterpolate_1(_ctx.$t("account.payments.creditCard.errorAbove"))}</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="card-line" data-v-6a4b3a62><div class="cc-field cc-num" id="card-number" data-v-6a4b3a62></div>`);
  if ($data.ccValid) {
    _push(`<div id="card-valid-mark" data-v-6a4b3a62></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="card-line" data-v-6a4b3a62><div class="cc-field" id="expiration-date" data-v-6a4b3a62></div><div class="cc-field" id="cvv" data-v-6a4b3a62></div></div><div id="hosted-fields-error" data-v-6a4b3a62></div>`);
  if ($props.error || $data.is3DSParameters) {
    _push(`<div class="recurring--payments" data-v-6a4b3a62><div class="checkbox" data-v-6a4b3a62><input type="checkbox" id="cb_threed_secure_parameters" style="${ssrRenderStyle_1({ "margin-left": "24px", "margin-right": "8px" })}"${ssrIncludeBooleanAttr(Array.isArray($data.is3DSParameters) ? ssrLooseContain_1($data.is3DSParameters, null) : $data.is3DSParameters) ? " checked" : ""} data-v-6a4b3a62></div><div class="recurring--description" data-v-6a4b3a62><label for="cb_threed_secure_parameters" data-v-6a4b3a62>${ssrInterpolate_1(_ctx.$t("account.payments.creditCard.additionalCardInformation"))}</label><p data-v-6a4b3a62>${ssrInterpolate_1(_ctx.$t("account.payments.creditCard.byDesign"))}</p></div></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.is3DSParameters) {
    _push(`<div data-v-6a4b3a62><div class="card-line" data-v-6a4b3a62><input class="cc-field" id="cc-email"${ssrRenderAttr_1("value", $data.email)} placeholder="Email" data-v-6a4b3a62></div><div class="card-line" data-v-6a4b3a62><input class="cc-field" id="cc-name"${ssrRenderAttr_1("value", $data.name)}${ssrRenderAttr_1("placeholder", _ctx.$t("account.payments.creditCard.firstName"))} data-v-6a4b3a62><input class="cc-field" id="cc-surname"${ssrRenderAttr_1("value", $data.surname)}${ssrRenderAttr_1("placeholder", _ctx.$t("account.payments.creditCard.lastName"))} data-v-6a4b3a62></div><div class="card-line" data-v-6a4b3a62><input class="cc-field" id="cc-address"${ssrRenderAttr_1("value", $data.address)}${ssrRenderAttr_1("placeholder", _ctx.$t("account.payments.creditCard.streetAddress"))} data-v-6a4b3a62><input class="cc-field" id="cc-postal-code"${ssrRenderAttr_1("value", $data.postalCode)}${ssrRenderAttr_1("placeholder", _ctx.$t("account.payments.creditCard.postalCode"))} data-v-6a4b3a62></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/components/BraintreeCc.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const BraintreeCc = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["ssrRender", _sfc_ssrRender$i], ["__scopeId", "data-v-6a4b3a62"]]);
const _sfc_main$h = {
  props: ["braintree"],
  model: {
    prop: "payload",
    event: "payloadUpdated"
  },
  data() {
    return {
      email: "",
      payload: void 0
    };
  },
  created() {
    if (typeof paypal == "undefined") {
      this.loadPayPalSDK(() => {
        this.setupPayPal();
      });
    } else {
      this.setupPayPal();
    }
  },
  methods: {
    loadPayPalSDK(onReady) {
      let ppSDK = document.createElement("script");
      ppSDK.async = false;
      ppSDK.setAttribute(
        "src",
        "https://www.paypal.com/sdk/js?client-id=AVt7Bfi9H1XIU24K5PEc7XL8-Geh5i6rMlhroXueakuJE0xduzT2W0Vn8vUlAW9kG0DuP2INd48yAJ4p&vault=true&disable-funding=card"
      );
      ppSDK.addEventListener("load", onReady);
      document.head.appendChild(ppSDK);
    },
    async setupPayPal() {
      let paypalCheckoutInstance = await braintree.paypalCheckout.create({
        client: this.braintree.client
      });
      let buttons = paypal.Buttons({
        createBillingAgreement: function() {
          return paypalCheckoutInstance.createPayment({
            flow: "vault"
          });
        },
        onApprove: async (data) => {
          let payload = await paypalCheckoutInstance.tokenizePayment(
            data
          );
          this.payload = payload;
          this.$emit("payloadUpdated", this.payload);
        },
        onCancel: function() {
        },
        onError: function(err) {
          console.error("Error creating billing agreement", err);
        }
      });
      buttons.render("#paypal-button");
    }
  }
};
function _sfc_ssrRender$h(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs_1(_attrs)}><div id="paypal-button"></div></div>`);
}
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/components/BraintreePaypal.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const BraintreePaypal = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["ssrRender", _sfc_ssrRender$h]]);
const _sfc_main$g = {
  name: "Tabs",
  data() {
    return {
      tabs: []
    };
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach((tab) => {
        tab.isActive = tab.name == selectedTab.name;
      });
      this.$emit("onTabChanged", selectedTab.tabid);
    }
  },
  watch: {
    amount: function() {
      alert("amount changed: " + this.amount);
    }
  }
};
function _sfc_ssrRender$g(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs_1(_attrs)} data-v-581398ff><div class="tabs" data-v-581398ff><ul data-v-581398ff><!--[-->`);
  ssrRenderList_1($data.tabs, (tab) => {
    _push(`<li class="${ssrRenderClass_1({ "is-active": tab.isActive })}" data-v-581398ff><a${ssrRenderAttr_1("href", tab.href)} data-v-581398ff>${ssrInterpolate_1(tab.name)}</a></li>`);
  });
  _push(`<!--]--></ul></div><div data-v-581398ff>`);
  ssrRenderSlot_1(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></div>`);
}
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/components/Tabs.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const Tabs = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["ssrRender", _sfc_ssrRender$g], ["__scopeId", "data-v-581398ff"]]);
const _sfc_main$f = {
  name: "Tab",
  props: {
    name: { required: true },
    selected: { default: false },
    tabid: { required: false }
  },
  data() {
    return {
      isActive: false
    };
  },
  computed: {
    href() {
      return "#" + this.tabid.toLowerCase().replace(/ /g, "-");
    }
  },
  mounted() {
    this.isActive = this.selected;
  },
  created() {
    this.$parent.tabs.push(this);
  }
};
function _sfc_ssrRender$f(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs_1(mergeProps(_attrs, { class: "tab-content" }, {
    style: $data.isActive ? null : { display: "none" }
  }))} data-v-da43c9aa>`);
  ssrRenderSlot_1(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/components/Tab.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const Tab = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["ssrRender", _sfc_ssrRender$f], ["__scopeId", "data-v-da43c9aa"]]);
const _sfc_main$e = {
  components: {
    progressSpinner: Spinner,
    BraintreeCc,
    BraintreePaypal,
    Tabs,
    Tab
  },
  data() {
    return {
      ccValid: false,
      type: "cc",
      paypalPayload: null,
      captchaID: null,
      captchaImage: null,
      captchaPaymentMethod: null,
      captchaValue: ""
    };
  },
  props: {
    data: {}
  },
  watch: {
    type: function() {
      this.$store.dispatch("braintree/clear");
    }
  },
  computed: {
    ...mapState({
      account: (state) => state.auth.account,
      braintree: (state) => state.braintree.instance,
      error: (state) => state.braintree.error,
      inProgress: (state) => state.braintree.inProgress
    }),
    isReady: function() {
      if (this.inProgress) {
        return false;
      }
      if (this.type == "cc" && this.ccValid) {
        return true;
      }
      if (this.type == "paypal" && this.paypalPayload) {
        return true;
      }
      return false;
    }
  },
  async created() {
    this.createClientToken();
  },
  mounted() {
    if (window.location.href.split("/")[3] == "es") {
      useI18n().locale.value = "es";
    }
  },
  mounted() {
    if (window.location.href.split("/")[3] == "es") {
      useI18n().locale.value = "es";
    }
  },
  methods: {
    async setPaymentMethod() {
      let paymentMethod;
      if (this.type == "cc") {
        paymentMethod = await this.$store.dispatch(
          "braintree/tokenizeCC",
          this.$refs.braintreeCC
        );
      }
      if (this.type == "paypal") {
        paymentMethod = this.paypalPayload;
      }
      if (!paymentMethod) {
        return;
      }
      await this.$store.dispatch(
        "braintree/savePaymentMethod",
        paymentMethod.nonce
      );
      if (this.error) {
        return;
      }
      this.closeDialog();
    },
    async proceed(payload) {
      this.paypalPayload = payload;
    },
    closeDialog() {
      this.$store.commit("popup/close");
    },
    updateType(value) {
      this.type = value;
    },
    async createClientToken() {
      await this.$store.dispatch("braintree/init", {
        captchaID: this.captchaID,
        captchaValue: this.captchaValue
      });
      if (this.error) {
        if (this.error.status == 70001 || this.error.status == 70002) {
          this.captchaID = this.error.captcha_id;
          this.captchaImage = this.error.captcha_image;
          this.captchaPaymentMethod = null;
        } else {
          this.captchaID = null;
          this.captchaImage = null;
          this.captchaPaymentMethod = null;
        }
        this.captchaValue = "";
        return;
      } else {
        this.captchaID = null;
        this.captchaImage = null;
        this.captchaPaymentMethod = null;
        this.captchaValue = "";
      }
    },
    hideError(error) {
      return error.status == 70001;
    }
  }
};
function _sfc_ssrRender$e(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_progress_spinner = resolveComponent("progress-spinner");
  const _component_tabs = resolveComponent("tabs");
  const _component_tab = resolveComponent("tab");
  const _component_braintree_cc = resolveComponent("braintree-cc");
  const _component_braintree_paypal = resolveComponent("braintree-paypal");
  _push(`<div${ssrRenderAttrs_1(mergeProps(_attrs, { class: "update-pm" }))} data-v-6b6260d3><h3 data-v-6b6260d3>${ssrInterpolate_1(_ctx.$t("account.popups.paymentMethod.title"))}</h3>`);
  if (_ctx.braintree == null) {
    _push(`<div data-v-6b6260d3>`);
    if (_ctx.error) {
      _push(`<div data-v-6b6260d3>`);
      if ($data.captchaImage) {
        _push(`<div style="${ssrRenderStyle_1({ "display": "flex", "flex-direction": "column", "align-items": "center" })}" data-v-6b6260d3><p data-v-6b6260d3>Please solve the following captcha to continue.</p>`);
        if (_ctx.error && !$options.hideError(_ctx.error)) {
          _push(`<p class="error" data-v-6b6260d3>${ssrInterpolate_1(_ctx.error.message)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<form data-v-6b6260d3>`);
        if ($data.captchaImage) {
          _push(`<div class="captcha" data-v-6b6260d3><div class="image-block" data-v-6b6260d3><img${ssrRenderAttr_1("src", $data.captchaImage)} data-v-6b6260d3></div><label for="login-captch" data-v-6b6260d3>Please enter the numbers you see above:</label><input type="text" id="login-captch"${ssrRenderAttr_1("value", $data.captchaValue)} data-v-6b6260d3><div class="popup-buttons" data-v-6b6260d3><button class="btn btn-solid btn-big make-payment" data-v-6b6260d3>`);
          if (_ctx.inProgress) {
            _push(ssrRenderComponent_1(_component_progress_spinner, {
              width: "32",
              height: "32",
              fill: "#FFFFFF"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`Continue </button><a class="btn btn-icon btn-icon-red" data-v-6b6260d3>Cancel</a></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</form></div>`);
      } else {
        _push(`<div class="error-message" data-v-6b6260d3>${ssrInterpolate_1(_ctx.error.message)} <div class="popup-buttons" data-v-6b6260d3><button class="btn btn-big btn-solid"${ssrIncludeBooleanAttr(!$options.isReady) ? " disabled" : ""} data-v-6b6260d3>`);
        if (_ctx.inProgress && _ctx.braintree) {
          _push(ssrRenderComponent_1(_component_progress_spinner, {
            width: "32",
            height: "32",
            fill: "#FFFFFF"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`Set Payment Method </button><a class="btn btn-icon btn-icon-red" data-v-6b6260d3>Cancel</a></div></div>`);
      }
      _push(`</div>`);
    } else {
      _push(`<!---->`);
    }
    if (_ctx.inProgress) {
      _push(ssrRenderComponent_1(_component_progress_spinner, {
        id: "progress-spinner",
        width: "48",
        height: "48"
      }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<div data-v-6b6260d3>`);
    if (_ctx.error) {
      _push(`<p class="error-message" data-v-6b6260d3>${ssrInterpolate_1(_ctx.error.message)}</p>`);
    } else {
      _push(ssrRenderComponent_1(_component_tabs, { onOnTabChanged: $options.updateType }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(_component_tab, {
              selected: true,
              tabid: "cc",
              name: _ctx.$t("account.creditCard")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!_ctx.error) {
                    _push3(ssrRenderComponent_1(_component_braintree_cc, {
                      braintree: _ctx.braintree,
                      error: _ctx.error,
                      ref: "braintreeCC",
                      onValidChanged: ($event) => $data.ccValid = $event.value
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<p class="error-message" data-v-6b6260d3${_scopeId2}>${ssrInterpolate_1(_ctx.error.message)}</p>`);
                  }
                } else {
                  return [
                    !_ctx.error ? (openBlock(), createBlock(_component_braintree_cc, {
                      key: 0,
                      braintree: _ctx.braintree,
                      error: _ctx.error,
                      ref: "braintreeCC",
                      onValidChanged: ($event) => $data.ccValid = $event.value
                    }, null, 8, ["braintree", "error", "onValidChanged"])) : (openBlock(), createBlock("p", {
                      key: 1,
                      class: "error-message"
                    }, toDisplayString(_ctx.error.message), 1))
                  ];
                }
              }, void 0, true),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_tab, {
              tabid: "paypal",
              name: "PayPal"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (_ctx.error) {
                    _push3(`<p class="error" data-v-6b6260d3${_scopeId2}>${ssrInterpolate_1(_ctx.error.message)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if ($data.paypalPayload) {
                    _push3(`<div data-v-6b6260d3${_scopeId2}><p style="${ssrRenderStyle_1({ "margin": "1em" })}" data-v-6b6260d3${_scopeId2}><b data-v-6b6260d3${_scopeId2}>${ssrInterpolate_1(_ctx.$t("account.popups.paymentMethod.paypalAccount"))}</b><br data-v-6b6260d3${_scopeId2}> ${ssrInterpolate_1($data.paypalPayload.details.email)}</p></div>`);
                  } else {
                    _push3(`<div data-v-6b6260d3${_scopeId2}><p data-v-6b6260d3${_scopeId2}>${ssrInterpolate_1(_ctx.$t("account.popups.paymentMethod.pleaseLog"))}</p>`);
                    _push3(ssrRenderComponent_1(_component_braintree_paypal, {
                      braintree: _ctx.braintree,
                      error: _ctx.error,
                      ref: "braintreePaypal",
                      onPayloadUpdated: $options.proceed
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  }
                } else {
                  return [
                    _ctx.error ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "error"
                    }, toDisplayString(_ctx.error.message), 1)) : createCommentVNode("", true),
                    $data.paypalPayload ? (openBlock(), createBlock("div", { key: 1 }, [
                      createVNode("p", { style: { "margin": "1em" } }, [
                        createVNode("b", null, toDisplayString(_ctx.$t("account.popups.paymentMethod.paypalAccount")), 1),
                        createVNode("br"),
                        createTextVNode(" " + toDisplayString($data.paypalPayload.details.email), 1)
                      ])
                    ])) : (openBlock(), createBlock("div", { key: 2 }, [
                      createVNode("p", null, toDisplayString(_ctx.$t("account.popups.paymentMethod.pleaseLog")), 1),
                      createVNode(_component_braintree_paypal, {
                        braintree: _ctx.braintree,
                        error: _ctx.error,
                        ref: "braintreePaypal",
                        onPayloadUpdated: $options.proceed
                      }, null, 8, ["braintree", "error", "onPayloadUpdated"])
                    ]))
                  ];
                }
              }, void 0, true),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_tab, {
                selected: true,
                tabid: "cc",
                name: _ctx.$t("account.creditCard")
              }, {
                default: withCtx(() => [
                  !_ctx.error ? (openBlock(), createBlock(_component_braintree_cc, {
                    key: 0,
                    braintree: _ctx.braintree,
                    error: _ctx.error,
                    ref: "braintreeCC",
                    onValidChanged: ($event) => $data.ccValid = $event.value
                  }, null, 8, ["braintree", "error", "onValidChanged"])) : (openBlock(), createBlock("p", {
                    key: 1,
                    class: "error-message"
                  }, toDisplayString(_ctx.error.message), 1))
                ], void 0, true),
                _: 1
              }, 8, ["name"]),
              createVNode(_component_tab, {
                tabid: "paypal",
                name: "PayPal"
              }, {
                default: withCtx(() => [
                  _ctx.error ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "error"
                  }, toDisplayString(_ctx.error.message), 1)) : createCommentVNode("", true),
                  $data.paypalPayload ? (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode("p", { style: { "margin": "1em" } }, [
                      createVNode("b", null, toDisplayString(_ctx.$t("account.popups.paymentMethod.paypalAccount")), 1),
                      createVNode("br"),
                      createTextVNode(" " + toDisplayString($data.paypalPayload.details.email), 1)
                    ])
                  ])) : (openBlock(), createBlock("div", { key: 2 }, [
                    createVNode("p", null, toDisplayString(_ctx.$t("account.popups.paymentMethod.pleaseLog")), 1),
                    createVNode(_component_braintree_paypal, {
                      braintree: _ctx.braintree,
                      error: _ctx.error,
                      ref: "braintreePaypal",
                      onPayloadUpdated: $options.proceed
                    }, null, 8, ["braintree", "error", "onPayloadUpdated"])
                  ]))
                ], void 0, true),
                _: 1
              })
            ];
          }
        }, void 0, true),
        _: 1
      }, _parent));
    }
    _push(`<div class="popup-buttons" data-v-6b6260d3>`);
    if (!_ctx.error) {
      _push(`<button class="btn btn-big btn-solid"${ssrIncludeBooleanAttr(!$options.isReady) ? " disabled" : ""} data-v-6b6260d3>`);
      if (_ctx.inProgress && _ctx.braintree) {
        _push(ssrRenderComponent_1(_component_progress_spinner, {
          width: "32",
          height: "32",
          fill: "#FFFFFF"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`${ssrInterpolate_1(_ctx.$t("account.popups.paymentMethod.setPaymentMethod"))}</button>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<a class="btn btn-icon btn-icon-red" data-v-6b6260d3>${ssrInterpolate_1(_ctx.$t("account.popups.paymentMethod.cancel"))}</a></div></div>`);
  }
  _push(`</div>`);
}
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/components/popups/SetPaymentMethod.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const SetPaymentMethod = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["ssrRender", _sfc_ssrRender$e], ["__scopeId", "data-v-6b6260d3"]]);
const _sfc_main$d = {
  components: {
    progressSpinner: Spinner
  },
  props: {
    data: {}
  },
  data() {
    return {
      billingCycle: null,
      price: null
    };
  },
  computed: {
    ...mapState({
      account: (state) => state.auth.account,
      error: (state) => state.payments.error,
      inProgress: (state) => state.payments.inProgress
    })
  },
  filters: {
    per: function(value) {
      switch (value) {
        case "Weekly":
          return "/ week";
        case "Monthly":
          return "/ month";
        case "Annual":
          return "/ year";
        case "Biennial":
          return "/ 2 years";
        case "Triennial":
          return "/ 3 years";
      }
    }
  },
  created() {
    this.billingCycle = this.account.subscription.billing_cycle;
    this.$store.dispatch("payments/clear");
  },
  mounted() {
    if (window.location.href.split("/")[3] == "es") {
      useI18n().locale.value = "es";
    }
  },
  methods: {
    async updateBillingCycle() {
      if (!this.billingCycle) return;
      await this.$store.dispatch(
        "payments/setBillingCycle",
        this.billingCycle
      );
      if (this.error) return;
      this.closeDialog();
    },
    closeDialog() {
      this.$store.commit("popup/close");
    }
  }
};
function _sfc_ssrRender$d(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_progress_spinner = resolveComponent("progress-spinner");
  _push(`<div${ssrRenderAttrs_1(mergeProps(_attrs, { class: "update-billing-cycle" }))} data-v-a63124d9><h3 data-v-a63124d9>${ssrInterpolate_1(_ctx.$t("account.changeBillingCycle"))}</h3>`);
  if (_ctx.error) {
    _push(`<p style="${ssrRenderStyle_1({ "color": "red" })}" data-v-a63124d9>${_ctx.error.message ?? ""}</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<table class="options" style="${ssrRenderStyle_1({ "margin-top": "1em" })}" width="100%" border="0" data-v-a63124d9><!--[-->`);
  ssrRenderList_1(_ctx.account.product.prices, (option) => {
    _push(`<tr class="option" data-v-a63124d9><td class="description" width="100%" data-v-a63124d9><input type="radio"${ssrRenderAttr_1("id", "cycle" + option.billing_cycle)} name="billingcycle"${ssrRenderAttr_1("value", option.billing_cycle)}${ssrIncludeBooleanAttr(ssrLooseEqual_1($data.billingCycle, option.billing_cycle)) ? " checked" : ""} data-v-a63124d9><label${ssrRenderAttr_1("for", "cycle" + option.billing_cycle)} data-v-a63124d9>${ssrInterpolate_1(option.billing_cycle)}</label></td><td class="price" data-v-a63124d9>$${ssrInterpolate_1(option.price)}</td><td class="description" data-v-a63124d9>${ssrInterpolate_1(option.billing_cycle | _ctx.per)}</td></tr>`);
  });
  _push(`<!--]--></table><p style="${ssrRenderStyle_1({ "margin-top": "2em" })}" data-v-a63124d9>${ssrInterpolate_1(_ctx.$t("account.newBillingCycle"))} (${ssrInterpolate_1(_ctx.$filters.formatPaymentDate(_ctx.account.active_until))}).</p><div class="popup-buttons" data-v-a63124d9><button class="btn btn-big btn-solid"${ssrIncludeBooleanAttr(_ctx.inProgress) ? " disabled" : ""} data-v-a63124d9>`);
  if (_ctx.inProgress) {
    _push(ssrRenderComponent_1(_component_progress_spinner, {
      width: "32",
      height: "32",
      fill: "#FFFFFF"
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`${ssrInterpolate_1(_ctx.$t("account.update"))}</button><a class="btn btn-icon btn-icon-red" data-v-a63124d9>${ssrInterpolate_1(_ctx.$t("account.cancel"))}</a></div></div>`);
}
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/components/popups/ChangeBillingCycle.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const ChangeBillingCycle = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["ssrRender", _sfc_ssrRender$d], ["__scopeId", "data-v-a63124d9"]]);
const _sfc_main$c = {
  components: {
    progressSpinner: Spinner
  },
  props: {
    data: {}
  },
  data() {
    return {
      email: "",
      password: "",
      password2: ""
    };
  },
  computed: {
    ...mapState({
      account: (state) => state.auth.account,
      error: (state) => state.account.error,
      inProgress: (state) => state.account.inProgress,
      isFilled() {
        if (this.data.type == "setup") {
          return this.email != "" && this.password != "" && this.password2 != "";
        } else if (this.data.type == "change-email") {
          return this.email != "";
        } else if (this.data.type == "change-password") {
          return this.password != "" && this.password2 != "";
        }
      },
      showemail() {
        return ["setup", "change-email"].includes(this.data.type);
      },
      showpassword() {
        return ["setup", "change-password"].includes(this.data.type);
      }
    })
  },
  created() {
    this.$store.dispatch("account/clear");
    if (this.data.type == "change-email") {
      this.email = this.account.email;
    }
  },
  mounted() {
    if (window.location.href.split("/")[3] == "es") {
      useI18n().locale.value = "es";
    }
  },
  methods: {
    async submit() {
      switch (this.data.type) {
        case "setup":
          await this.$store.dispatch("account/setAuthEmail", {
            email: this.email,
            password: this.password,
            password2: this.password2
          });
          break;
        case "change-email":
          await this.$store.dispatch("account/changeEmail", {
            email: this.email
          });
          break;
        case "change-password":
          await this.$store.dispatch("account/changePassword", {
            password: this.password,
            password2: this.password2
          });
          break;
        default:
          throw { message: "Unknown type" };
      }
      if (!this.error) {
        this.closeDialog();
      }
    },
    closeDialog() {
      this.$store.commit("popup/close");
    }
  }
};
function _sfc_ssrRender$c(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_progress_spinner = resolveComponent("progress-spinner");
  _push(`<form${ssrRenderAttrs_1(_attrs)} data-v-aa3bbc31><div class="popup--content" data-v-aa3bbc31>`);
  if ($props.data.type == "setup") {
    _push(`<h3 data-v-aa3bbc31>${ssrInterpolate_1(_ctx.$t("account.popups.authenticationEmail.title"))}</h3>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.data.type == "change-email") {
    _push(`<h3 data-v-aa3bbc31>${ssrInterpolate_1(_ctx.$t("account.popups.authenticationEmail.changeYourEmail"))}</h3>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.data.type == "change-password") {
    _push(`<h3 data-v-aa3bbc31>${ssrInterpolate_1(_ctx.$t("account.popups.authenticationEmail.changePassword"))}</h3>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.data.type == "setup") {
    _push(`<p data-v-aa3bbc31>${ssrInterpolate_1(_ctx.$t("account.popups.authenticationEmail.pleaseEnter"))}</p>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.error) {
    _push(`<p class="error-message" data-v-aa3bbc31>${ssrInterpolate_1(_ctx.error.message)}</p>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.showemail) {
    _push(`<label for="inp_email" class="first" required data-v-aa3bbc31>${ssrInterpolate_1(_ctx.$t("account.popups.authenticationEmail.email"))}</label>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.showemail) {
    _push(`<input id="inp_email" type="email"${ssrRenderAttr_1("value", $data.email)} autofocus data-v-aa3bbc31>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.showpassword) {
    _push(`<label for="inp_password" data-v-aa3bbc31>${ssrInterpolate_1(_ctx.$t("account.popups.authenticationEmail.password"))}</label>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.showpassword) {
    _push(`<input id="inp_password" type="password"${ssrRenderAttr_1("value", $data.password)} data-v-aa3bbc31>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.showpassword) {
    _push(`<label for="inp_password2" data-v-aa3bbc31>${ssrInterpolate_1(_ctx.$t("account.popups.authenticationEmail.confirmPassword"))}</label>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.showpassword) {
    _push(`<input id="inp_password2" type="password"${ssrRenderAttr_1("value", $data.password2)} data-v-aa3bbc31>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="popup-buttons" data-v-aa3bbc31><button class="btn btn-big btn-solid"${ssrIncludeBooleanAttr(!_ctx.isFilled || _ctx.inProgress) ? " disabled" : ""} data-v-aa3bbc31>`);
  if (_ctx.inProgress) {
    _push(ssrRenderComponent_1(_component_progress_spinner, {
      width: "32",
      height: "32",
      fill: "#FFFFFF"
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if ($props.data.type == "setup") {
    _push(`<span data-v-aa3bbc31>${ssrInterpolate_1(_ctx.$t("account.popups.authenticationEmail.setup"))}</span>`);
  } else {
    _push(`<span data-v-aa3bbc31>${ssrInterpolate_1(_ctx.$t("account.popups.authenticationEmail.update"))}</span>`);
  }
  _push(`</button><a class="btn btn-icon btn-icon-red" data-v-aa3bbc31>${ssrInterpolate_1(_ctx.$t("account.popups.authenticationEmail.cancel"))}</a></div></div></form>`);
}
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/components/popups/SetAuthEmail.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const SetAuthEmail = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["ssrRender", _sfc_ssrRender$c], ["__scopeId", "data-v-aa3bbc31"]]);
const _sfc_main$b = {
  components: {
    progressSpinner: Spinner
  },
  props: {
    data: {}
  },
  computed: {
    ...mapState({
      account: (state) => state.auth.account,
      error: (state) => state.account.error,
      inProgress: (state) => state.account.inProgress
    })
  },
  created() {
    this.$store.dispatch("account/clear");
  },
  mounted() {
    if (window.location.href.split("/")[3] == "es") {
      useI18n().locale.value = "es";
    }
  },
  methods: {
    async setAuthAccountID() {
      await this.$store.dispatch("account/setAuthAccountID");
      if (this.error)
        return;
      this.closeDialog();
    },
    closeDialog() {
      this.$store.commit("popup/close");
    }
  }
};
function _sfc_ssrRender$b(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_progress_spinner = resolveComponent("progress-spinner");
  _push(`<div${ssrRenderAttrs_1(mergeProps(_attrs, {
    class: "popup--content",
    style: { "max-width": "550px" }
  }))} data-v-4cc04fb8><h3 data-v-4cc04fb8>${ssrInterpolate_1(_ctx.$t("account.popups.authentication.title"))}</h3>`);
  if (_ctx.error) {
    _push(`<p style="${ssrRenderStyle_1({ "color": "red" })}" data-v-4cc04fb8>${_ctx.error.message ?? ""}</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<p data-v-4cc04fb8>${ssrInterpolate_1(_ctx.$t("account.popups.authentication.desc"))}</p><p data-v-4cc04fb8><b data-v-4cc04fb8>${ssrInterpolate_1(_ctx.$t("account.popups.authentication.important"))}</b> ${ssrInterpolate_1(_ctx.$t("account.popups.authentication.makeSure"))}</p><div class="accountid" data-v-4cc04fb8>${ssrInterpolate_1(this.account.id)}</div><div class="popup-buttons" data-v-4cc04fb8><button class="btn btn-big btn-solid"${ssrIncludeBooleanAttr(_ctx.inProgress) ? " disabled" : ""} data-v-4cc04fb8>`);
  if (_ctx.inProgress) {
    _push(ssrRenderComponent_1(_component_progress_spinner, {
      width: "32",
      height: "32",
      fill: "#FFFFFF"
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(` ${ssrInterpolate_1(_ctx.$t("account.popups.authentication.changeAuthentication"))}</button><a class="btn btn-icon btn-icon-red" data-v-4cc04fb8>${ssrInterpolate_1(_ctx.$t("account.cancel"))}</a></div></div>`);
}
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/components/popups/SetAuthAccountID.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const SetAuthAccountid = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["ssrRender", _sfc_ssrRender$b], ["__scopeId", "data-v-4cc04fb8"]]);
const _sfc_main$a = {
  components: {
    progressSpinner: Spinner
  },
  props: {
    data: {}
  },
  data() {
    return {
      qrCode: "",
      secret: "",
      confirmation: "",
      backup: ""
    };
  },
  computed: {
    ...mapState({
      account: (state) => state.auth.account,
      error: (state) => state.account.error,
      inProgress: (state) => state.account.inProgress
    }),
    initialized() {
      return this.qrCode != "";
    }
  },
  async created() {
    this.$store.dispatch("account/clear");
    let resp = await this.$store.dispatch("account/totpInit");
    if (this.error) {
      return;
    }
    this.secret = resp.secret.split(/(.{4})/).filter((O) => O).join(" ");
    let qr = qrcode(0, "M");
    qr.addData(resp.uri);
    qr.make();
    this.qrCode = qr.createSvgTag(2);
  },
  mounted() {
    if (window.location.href.split("/")[3] == "es") {
      useI18n().locale.value = "es";
    }
  },
  methods: {
    async submit() {
      let backupCode = await this.$store.dispatch("account/totpEnable", {
        confirmation: this.confirmation
      });
      if (this.error) {
        return;
      }
      this.backup = backupCode;
    },
    closeDialog() {
      this.$store.commit("popup/close");
    }
  }
};
function _sfc_ssrRender$a(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_progress_spinner = resolveComponent("progress-spinner");
  _push(`<form${ssrRenderAttrs_1(_attrs)} data-v-23e9244d><div class="popup--content" data-v-23e9244d><h3 data-v-23e9244d>${ssrInterpolate_1(_ctx.$t("account.popups.totp.enable.title"))}</h3>`);
  if (!$options.initialized) {
    _push(`<div class="popup--initializing" data-v-23e9244d>`);
    if (_ctx.inProgress) {
      _push(ssrRenderComponent_1(_component_progress_spinner, {
        width: "32",
        height: "32",
        fill: "#398fe6"
      }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    if (_ctx.error) {
      _push(`<p class="error-message" data-v-23e9244d>${ssrInterpolate_1(_ctx.error.message)}</p>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  if ($options.initialized && !$data.backup) {
    _push(`<div class="popup--data" data-v-23e9244d><div class="qr-code" data-v-23e9244d><div class="code" data-v-23e9244d>${$data.qrCode ?? ""}</div><div class="instructions" data-v-23e9244d><p data-v-23e9244d>${ssrInterpolate_1(_ctx.$t("account.popups.totp.enable.instructions"))}</p><p class="secret" data-v-23e9244d>${ssrInterpolate_1(_ctx.$t("account.popups.totp.enable.scan"))} ${ssrInterpolate_1(_ctx.$t("account.popups.totp.enable.secret"))} <span class="npbr" data-v-23e9244d>${ssrInterpolate_1($data.secret)}</span>, ${ssrInterpolate_1(_ctx.$t("account.popups.totp.enable.account"))} <span class="nobr" data-v-23e9244d>${ssrInterpolate_1(_ctx.account.id)}</span></p></div></div>`);
    if (_ctx.error) {
      _push(`<p class="error-message" data-v-23e9244d>${ssrInterpolate_1(_ctx.error.message)}</p>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<input id="inp_code" type="text"${ssrRenderAttr_1("placeholder", _ctx.$t("account.popups.totp.enable.codeFrom"))}${ssrRenderAttr_1("value", $data.confirmation)} autofocus data-v-23e9244d></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($options.initialized && $data.backup) {
    _push(`<div class="popup--data" data-v-23e9244d><p data-v-23e9244d>${ssrInterpolate_1(_ctx.$t("account.popups.totp.enable.success"))}</p><p data-v-23e9244d>${ssrInterpolate_1(_ctx.$t("account.popups.totp.enable.successDesc"))}</p><p class="backup-codes" data-v-23e9244d><b data-v-23e9244d>${ssrInterpolate_1(_ctx.$t("account.popups.totp.enable.backupCodes"))}</b> ${ssrInterpolate_1($data.backup)}</p><p data-v-23e9244d>${ssrInterpolate_1(_ctx.$t("account.popups.totp.enable.eachCode"))}</p><a class="btn btn-border" style="${ssrRenderStyle_1({ "margin": "1em 0em" })}" data-v-23e9244d>${ssrInterpolate_1(_ctx.$t("account.popups.totp.enable.close"))}</a></div>`);
  } else {
    _push(`<!---->`);
  }
  if (!$data.backup) {
    _push(`<div class="popup-buttons" data-v-23e9244d><button class="btn btn-big btn-solid"${ssrIncludeBooleanAttr(!$data.confirmation || !$options.initialized || _ctx.inProgress) ? " disabled" : ""} data-v-23e9244d>`);
    if (_ctx.inProgress && $options.initialized) {
      _push(ssrRenderComponent_1(_component_progress_spinner, {
        width: "32",
        height: "32",
        fill: "#FFFFFF"
      }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    _push(`<span data-v-23e9244d>${ssrInterpolate_1(_ctx.$t("account.popups.totp.enable.enable"))}</span></button><a class="btn btn-icon btn-icon-red" data-v-23e9244d>${ssrInterpolate_1(_ctx.$t("account.popups.totp.enable.cancel"))}</a></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></form>`);
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/components/popups/TotpEnable.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const TotpEnable = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["ssrRender", _sfc_ssrRender$a], ["__scopeId", "data-v-23e9244d"]]);
const _sfc_main$9 = {
  components: {
    progressSpinner: Spinner
  },
  props: {
    data: {}
  },
  data() {
    return {
      confirmation: ""
    };
  },
  mounted() {
    if (window.location.href.split("/")[3] == "es") {
      useI18n().locale.value = "es";
    }
  },
  computed: {
    ...mapState({
      account: (state) => state.auth.account,
      error: (state) => state.account.error,
      inProgress: (state) => state.account.inProgress
    })
  },
  async created() {
    this.$store.dispatch("account/clear");
  },
  methods: {
    async submit() {
      await this.$store.dispatch("account/totpDisable", {
        confirmation: this.confirmation
      });
      if (!this.error) {
        this.closeDialog();
      }
    },
    closeDialog() {
      this.$store.commit("popup/close");
    }
  }
};
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_progress_spinner = resolveComponent("progress-spinner");
  _push(`<form${ssrRenderAttrs_1(_attrs)} data-v-91681a29><div class="popup--content" data-v-91681a29><h3 data-v-91681a29>${ssrInterpolate_1(_ctx.$t("account.popups.totp.disable.title"))}</h3><p data-v-91681a29>${ssrInterpolate_1(_ctx.$t("account.popups.totp.disable.desc"))}</p>`);
  if (_ctx.error) {
    _push(`<p class="error-message" data-v-91681a29>${ssrInterpolate_1(_ctx.error.message)}</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<input id="inp_code" type="text"${ssrRenderAttr_1("value", $data.confirmation)}${ssrRenderAttr_1("placeholder", _ctx.$t("account.popups.totp.enable.codeFrom"))} autofocus data-v-91681a29><div class="popup-buttons" data-v-91681a29><button class="btn btn-big btn-solid"${ssrIncludeBooleanAttr(!$data.confirmation || _ctx.inProgress) ? " disabled" : ""} data-v-91681a29>`);
  if (_ctx.inProgress) {
    _push(ssrRenderComponent_1(_component_progress_spinner, {
      width: "32",
      height: "32",
      fill: "#FFFFFF"
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`<span data-v-91681a29>${ssrInterpolate_1(_ctx.$t("account.popups.totp.disable.disable"))}</span></button><a class="btn btn-icon btn-icon-red" data-v-91681a29>${ssrInterpolate_1(_ctx.$t("account.popups.totp.disable.cancel"))}</a></div></div></form>`);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/components/popups/TotpDisable.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const TotpDisable = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$9], ["__scopeId", "data-v-91681a29"]]);
const _sfc_main$8 = {
  props: {
    data: {
      required: true,
      type: Object
    }
  },
  mounted() {
    if (window.location.href.split("/")[3] == "es") {
      useI18n().locale.value = "es";
    }
  },
  computed: {
    ...mapState({
      error: (state) => state.sessions.error,
      inProgress: (state) => state.sessions.inProgress
    }),
    hasError() {
      return this.error;
    },
    errorMessage() {
      return typeof this.error === "object" && this.error !== null ? this.error.message : this.error;
    }
  },
  methods: {
    async deleteDevice() {
      await this.$store.dispatch("sessions/deleteSession", {
        "token": this.data.token
      });
      if (!this.error) {
        this.closeDialog();
      }
    },
    closeDialog() {
      this.$store.commit("popup/close");
    }
  }
};
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs_1(_attrs)} data-v-ae363a3b><p data-v-ae363a3b>${ssrInterpolate_1(_ctx.$t("account.deviceManagementTab.confirmDelete"))}</p>`);
  if ($options.hasError) {
    _push(`<p style="${ssrRenderStyle_1({ "color": "red" })}" data-v-ae363a3b>${$options.errorMessage ?? ""}</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<button class="btn btn-solid" data-v-ae363a3b>${ssrInterpolate_1(_ctx.$t("account.deviceManagementTab.yes"))}</button><button class="btn btn-border" data-v-ae363a3b>${ssrInterpolate_1(_ctx.$t("account.deviceManagementTab.cancel"))}</button></div>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/components/popups/DeleteDevice.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const DeleteDevice = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$8], ["__scopeId", "data-v-ae363a3b"]]);
const _sfc_main$7 = {
  props: {
    data: {
      required: true,
      type: Object
    }
  },
  mounted() {
    if (window.location.href.split("/")[3] == "es") {
      useI18n().locale.value = "es";
    }
  },
  computed: {
    ...mapState({
      error: (state) => state.sessions.error,
      inProgress: (state) => state.sessions.inProgress
    }),
    hasError() {
      return this.error;
    },
    errorMessage() {
      return typeof this.error === "object" && this.error !== null ? this.error.message : this.error;
    }
  },
  methods: {
    async deleteDevice() {
      await this.$store.dispatch("sessions/deleteSession", {
        "token": this.data.token
      });
      if (!this.error) {
        this.closeDialog();
      }
    },
    async logoutDevices() {
      await this.$store.dispatch("sessions/deleteSessions");
      if (!this.error) {
        this.closeDialog();
      }
    },
    closeDialog() {
      this.$store.commit("popup/close");
    }
  }
};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs_1(_attrs)} data-v-44af398a><p data-v-44af398a>${ssrInterpolate_1(_ctx.$t("account.deviceManagementTab.confirmLogoutAll"))}</p>`);
  if ($options.hasError) {
    _push(`<p style="${ssrRenderStyle_1({ "color": "red" })}" data-v-44af398a>${$options.errorMessage ?? ""}</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<button class="btn btn-solid" data-v-44af398a>${ssrInterpolate_1(_ctx.$t("account.deviceManagementTab.confirm"))}</button><button class="btn btn-border" data-v-44af398a>${ssrInterpolate_1(_ctx.$t("account.deviceManagementTab.cancel"))}</button></div>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/components/popups/LogoutDevices.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const LogoutDevices = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$7], ["__scopeId", "data-v-44af398a"]]);
const _sfc_main$6 = {
  props: {
    data: {
      required: true,
      type: Object
    }
  },
  mounted() {
    if (window.location.href.split("/")[3] == "es") {
      useI18n().locale.value = "es";
    }
  },
  computed: {
    ...mapState({
      error: (state) => state.sessions.error,
      inProgress: (state) => state.sessions.inProgress
    }),
    hasError() {
      return this.error;
    },
    errorMessage() {
      return typeof this.error === "object" && this.error !== null ? this.error.message : this.error;
    }
  },
  methods: {
    async deleteDevice() {
      await this.$store.dispatch("sessions/deleteSession", {
        "token": this.data.token
      });
      if (!this.error) {
        this.closeDialog();
      }
    },
    async logoutDevices() {
      await this.$store.dispatch("sessions/deleteSessions");
      if (!this.error) {
        this.closeDialog();
      }
    },
    async disableDeviceManagement() {
      await this.$store.dispatch("account/disableDeviceManagement");
      if (!this.error) {
        this.closeDialog();
      }
    },
    closeDialog() {
      this.$store.commit("popup/close");
    }
  }
};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs_1(_attrs)} data-v-4e61d1c8><p data-v-4e61d1c8>${ssrInterpolate_1(_ctx.$t("account.deviceManagementTab.disablePopupDesc1"))}</p><p data-v-4e61d1c8>${ssrInterpolate_1(_ctx.$t("account.deviceManagementTab.disablePopupDesc2"))}</p><p data-v-4e61d1c8>${ssrInterpolate_1(_ctx.$t("account.deviceManagementTab.disablePopupDesc3"))}</p>`);
  if ($options.hasError) {
    _push(`<p style="${ssrRenderStyle_1({ "color": "red" })}" data-v-4e61d1c8>${$options.errorMessage ?? ""}</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<button class="btn btn-solid" data-v-4e61d1c8>${ssrInterpolate_1(_ctx.$t("account.deviceManagementTab.proceed"))}</button><button class="btn btn-border" data-v-4e61d1c8>${ssrInterpolate_1(_ctx.$t("account.deviceManagementTab.cancel"))}</button></div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/components/popups/DisableDeviceManagement.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const DisableDeviceManagement = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$6], ["__scopeId", "data-v-4e61d1c8"]]);
const _sfc_main$5 = {
  props: {
    data: {
      required: true,
      type: Object
    }
  },
  mounted() {
    if (window.location.href.split("/")[3] == "es") {
      useI18n().locale.value = "es";
    }
  },
  computed: {
    ...mapState({
      error: (state) => state.sessions.error,
      inProgress: (state) => state.sessions.inProgress
    }),
    hasError() {
      return this.error;
    },
    errorMessage() {
      return typeof this.error === "object" && this.error !== null ? this.error.message : this.error;
    }
  },
  methods: {
    async deleteSessions() {
      await this.$store.dispatch("product/change", this.data);
      if (!this.error) {
        this.closeDialog();
      }
    },
    closeDialog() {
      this.$store.commit("popup/close");
    }
  }
};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs_1(_attrs)} data-v-77d3e527><p data-v-77d3e527>${ssrInterpolate_1(_ctx.$t("account.confirmChangeProduct"))}</p>`);
  if ($options.hasError) {
    _push(`<p style="${ssrRenderStyle_1({ "color": "red" })}" data-v-77d3e527>${$options.errorMessage ?? ""}</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<button class="btn btn-solid" data-v-77d3e527>${ssrInterpolate_1(_ctx.$t("account.confirm"))}</button><button class="btn btn-border" data-v-77d3e527>${ssrInterpolate_1(_ctx.$t("account.cancel"))}</button></div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/components/popups/ChangeProduct.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const ChangeProduct = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$5], ["__scopeId", "data-v-77d3e527"]]);
const TIER_1_PRODUCTS = ["IVPN Tier 1", "IVPN Standard"];
const TIER_3_PRODUCTS = ["IVPN Tier 3", "IVPN Pro Suite", "IVPN Pro"];
const _sfc_main$4 = {
  props: {
    data: {
      required: false,
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      language: "en"
    };
  },
  computed: {
    ...mapState({
      account: (state) => state.auth.account,
      error: (state) => state.auth.error,
      inProgress: (state) => state.auth.inProgress
    }),
    currentProduct() {
      var _a, _b, _c;
      return ((_a = this.data) == null ? void 0 : _a.currentProduct) || ((_c = (_b = this.account) == null ? void 0 : _b.product) == null ? void 0 : _c.name);
    },
    targetTier() {
      if (TIER_1_PRODUCTS.includes(this.selectedProduct)) return "tier1";
      return "tier2";
    },
    selectedProduct() {
      var _a;
      return ((_a = this.data) == null ? void 0 : _a.selectedProduct) || "";
    },
    locale() {
      var _a, _b;
      return ((_b = (_a = this.$route) == null ? void 0 : _a.params) == null ? void 0 : _b.lang) || "en";
    }
  },
  mounted() {
    var _a, _b;
    const routeLang = (_b = (_a = this.$route) == null ? void 0 : _a.params) == null ? void 0 : _b.lang;
    if (routeLang === "es") {
      useI18n().locale.value = "es";
      this.language = "es";
    } else if (routeLang) {
      this.language = routeLang;
    }
  },
  methods: {
    isTier1Product(productName) {
      return TIER_1_PRODUCTS.includes(productName);
    },
    isTier3Product(productName) {
      return TIER_3_PRODUCTS.includes(productName);
    },
    async changeAccount() {
      if (!this.selectedProduct) {
        return;
      }
      try {
        await this.$store.dispatch("auth/createAccount", { product: this.selectedProduct });
        this.closeDialog();
        const targetRoute = `account-${this.locale}`;
        if (this.$router.hasRoute(targetRoute)) {
          await this.$router.push({ name: targetRoute });
        } else {
          await this.$router.push({ name: "account-en" });
        }
      } catch (error) {
      }
    },
    closeDialog() {
      this.$store.commit("popup/close");
    }
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs_1(mergeProps(_attrs, { class: "popup--content" }))} data-v-e5d1e0c3><h3 data-v-e5d1e0c3>${ssrInterpolate_1(_ctx.$t("account.popups.changeProduct." + $options.targetTier + ".title"))}</h3>`);
  if (_ctx.error) {
    _push(`<p class="error-message" role="alert" aria-live="polite" data-v-e5d1e0c3>${ssrInterpolate_1(_ctx.error.message)}</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div data-v-e5d1e0c3><div class="confirm" data-v-e5d1e0c3><p data-v-e5d1e0c3>${ssrInterpolate_1(_ctx.$t("account.popups.changeProduct." + $options.targetTier + ".desc1"))}<br data-v-e5d1e0c3> ${ssrInterpolate_1(_ctx.$t("account.popups.changeProduct." + $options.targetTier + ".desc2"))}<br data-v-e5d1e0c3> ${ssrInterpolate_1(_ctx.$t("account.popups.changeProduct." + $options.targetTier + ".desc3"))}<br data-v-e5d1e0c3> ${ssrInterpolate_1(_ctx.$t("account.popups.changeProduct." + $options.targetTier + ".desc4"))}</p><p data-v-e5d1e0c3>${ssrInterpolate_1(_ctx.$t("account.popups.changeProduct." + $options.targetTier + ".desc5"))}</p></div><button class="btn btn-solid-red"${ssrIncludeBooleanAttr(_ctx.inProgress) ? " disabled" : ""} data-v-e5d1e0c3>${ssrInterpolate_1(_ctx.$t("account.popups.changeProduct.downgrade"))}</button><a class="btn btn-icon" data-v-e5d1e0c3>${ssrInterpolate_1(_ctx.$t("account.popups.changeProduct.cancel"))}</a></div></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/components/popups/DowngradeAccount.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const DowngradeAccount = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-e5d1e0c3"]]);
const _sfc_main$3 = {
  computed: {
    ...mapState({
      isVisible: (state) => state.popup.isVisible,
      type: (state) => state.popup.type,
      data: (state) => state.popup.data
    })
  },
  methods: {
    close() {
      this.$store.commit("popup/close");
    }
  },
  watch: {
    isVisible: (newValue, oldValue) => {
      var body = document.body;
      if (newValue) {
        body.classList.add("noscroll");
      } else {
        body.classList.remove("noscroll");
      }
    }
  },
  components: {
    DeleteWireguardKey,
    AddWireguardKey,
    DeleteAccount,
    DisableRecurring,
    SetPaymentMethod,
    ChangeBillingCycle,
    SetAuthEmail,
    SetAuthAccountid,
    TotpEnable,
    TotpDisable,
    DeleteDevice,
    LogoutDevices,
    DisableDeviceManagement,
    ChangeProduct,
    DowngradeAccount
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_delete_wireguard_key = resolveComponent("delete-wireguard-key");
  const _component_add_wireguard_key = resolveComponent("add-wireguard-key");
  const _component_delete_account = resolveComponent("delete-account");
  const _component_disable_recurring = resolveComponent("disable-recurring");
  const _component_set_payment_method = resolveComponent("set-payment-method");
  const _component_change_billing_cycle = resolveComponent("change-billing-cycle");
  const _component_set_auth_email = resolveComponent("set-auth-email");
  const _component_set_auth_accountid = resolveComponent("set-auth-accountid");
  const _component_totp_enable = resolveComponent("totp-enable");
  const _component_totp_disable = resolveComponent("totp-disable");
  const _component_delete_device = resolveComponent("delete-device");
  const _component_logout_devices = resolveComponent("logout-devices");
  const _component_disable_device_management = resolveComponent("disable-device-management");
  const _component_downgrade_account = resolveComponent("downgrade-account");
  if (_ctx.isVisible) {
    _push(`<div${ssrRenderAttrs_1(mergeProps(_attrs, { class: "overlay" }))}><div class="scrollable"><div style="${ssrRenderStyle_1({ "flex-grow": "1" })}"></div><div class="popup">`);
    if (_ctx.type === "text") {
      _push(`<div>${_ctx.data.text ?? ""}</div>`);
    } else {
      _push(`<!---->`);
    }
    if (_ctx.type === "delete-wireguard-key") {
      _push(ssrRenderComponent_1(_component_delete_wireguard_key, { data: _ctx.data }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    if (_ctx.type === "add-wireguard-key") {
      _push(ssrRenderComponent_1(_component_add_wireguard_key, { data: _ctx.data }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    if (_ctx.type === "delete-account") {
      _push(ssrRenderComponent_1(_component_delete_account, { data: _ctx.data }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    if (_ctx.type === "disable-recurring") {
      _push(ssrRenderComponent_1(_component_disable_recurring, { data: _ctx.data }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    if (_ctx.type === "set-payment-method") {
      _push(ssrRenderComponent_1(_component_set_payment_method, { data: _ctx.data }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    if (_ctx.type === "change-billing-cycle") {
      _push(ssrRenderComponent_1(_component_change_billing_cycle, { data: _ctx.data }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    if (_ctx.type === "set-auth-email") {
      _push(ssrRenderComponent_1(_component_set_auth_email, { data: _ctx.data }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    if (_ctx.type === "set-auth-accountid") {
      _push(ssrRenderComponent_1(_component_set_auth_accountid, { data: _ctx.data }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    if (_ctx.type === "totp-enable") {
      _push(ssrRenderComponent_1(_component_totp_enable, { data: _ctx.data }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    if (_ctx.type === "totp-disable") {
      _push(ssrRenderComponent_1(_component_totp_disable, { data: _ctx.data }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    if (_ctx.type === "delete-device") {
      _push(ssrRenderComponent_1(_component_delete_device, { data: _ctx.data }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    if (_ctx.type === "logout-devices") {
      _push(ssrRenderComponent_1(_component_logout_devices, { data: _ctx.data }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    if (_ctx.type === "disable-device-management") {
      _push(ssrRenderComponent_1(_component_disable_device_management, { data: _ctx.data }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    if (_ctx.type === "downgrade-account") {
      _push(ssrRenderComponent_1(_component_downgrade_account, { data: _ctx.data }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    _push(`</div><div style="${ssrRenderStyle_1({ "flex-grow": "1" })}"></div></div></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/components/PopUp.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const PopUp = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$2 = {
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.auth.isAuthenticated,
      inProgress: (state) => state.auth.inProgress,
      isLoaded: (state) => state.auth.isLoaded,
      account: (state) => state.auth.account
    }),
    isPricingPage() {
      return this.$route.path.includes("/pricing");
    }
  },
  mounted() {
    let themeSwitcher = document.getElementById("top-theme-switch");
    if (themeSwitcher && window.addSwitcherEvent) {
      window.addSwitcherEvent(themeSwitcher);
    }
  },
  components: {
    AccountMenu,
    PopUp,
    Spinner
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_pop_up = resolveComponent("pop-up");
  const _component_account_menu = resolveComponent("account-menu");
  const _component_spinner = resolveComponent("spinner");
  const _component_router_view = resolveComponent("router-view");
  _push(`<div${ssrRenderAttrs_1(mergeProps(_attrs, { class: "app" }))}>`);
  _push(ssrRenderComponent_1(_component_pop_up, null, null, _parent));
  if (_ctx.account && !_ctx.account.is_new) {
    _push(ssrRenderComponent_1(_component_account_menu, null, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="${ssrRenderClass_1([$options.isPricingPage ? "page-centered-pricing" : "page-centered", "bottom-spacing"])}"><div id="app" class="app-content">`);
  if (_ctx.isAuthenticated && _ctx.inProgress && !_ctx.isLoaded) {
    _push(`<p class="centered--progress">`);
    _push(ssrRenderComponent_1(_component_spinner, {
      fill: "#398fe6",
      width: "32",
      height: "32"
    }, null, _parent));
    _push(`Loading... </p>`);
  } else {
    _push(ssrRenderComponent_1(_component_router_view, null, null, _parent));
  }
  _push(`</div></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/App.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const App = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$1 = {
  setup() {
    const { locale } = useI18n();
    return { locale };
  },
  props: {
    prices: { type: Object, required: true },
    disabled: { type: Boolean, default: false },
    current: { type: Boolean, default: false },
    inProgress: { type: Boolean, default: false },
    buttonText: { type: String, required: true },
    product: { type: String, required: true },
    hideButton: { type: Boolean, default: false },
    upgrade: { type: Boolean, default: false },
    selectedPlan: { type: Boolean, default: false }
  },
  components: { Spinner },
  model: {
    event: "change"
  },
  computed: {
    pricesLocale() {
      const lang = this.$route.params.lang || window.location.href.split("/")[3];
      const all = lang === "es" ? this.prices.pricesEs : this.prices.prices;
      return all.filter((p) => !p.id.includes("-2year") && !p.id.includes("-3year"));
    },
    isButtonDisabled() {
      return this.disabled || this.inProgress;
    }
  },
  methods: {
    selected() {
      this.$emit("selected");
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_spinner = resolveComponent("spinner");
  _push(`<div${ssrRenderAttrs_1(mergeProps(_attrs, {
    class: ["price-box", $props.product]
  }))}>`);
  ssrRenderSlot_1(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`<div class="price-options"><!--[-->`);
  ssrRenderList_1($options.pricesLocale, (price) => {
    _push(`<div class="price-option"><label>${ssrInterpolate_1(price.name)}</label><div class="price">${ssrInterpolate_1("$" + price.price)}</div></div>`);
  });
  _push(`<!--]--></div>`);
  ssrRenderSlot_1(_ctx.$slots, "footer", {}, null, _push, _parent);
  _push(`<div class="price-button">`);
  if ($props.current && $props.hideButton) {
    _push(`<div class="btn btn-big btn-outline btn-current-plan" style="${ssrRenderStyle_1({ "margin-top": "2em" })}">${ssrInterpolate_1(_ctx.$t("account.currentPlanBadge"))}</div>`);
  } else {
    _push(`<button class="${ssrRenderClass_1([{ "btn-outline": $props.selectedPlan }, "btn btn-big btn-generate btn-primary"])}" style="${ssrRenderStyle_1([{ "margin-top": "2em" }, !$props.current && !$props.selectedPlan && $props.hideButton ? { visibility: "hidden" } : {}])}"${ssrIncludeBooleanAttr($options.isButtonDisabled) ? " disabled" : ""}>`);
    _push(ssrRenderComponent_1(_component_spinner, {
      fill: "#FFFFFF",
      width: "32",
      height: "32",
      style: $props.inProgress && !$props.current ? null : { display: "none" }
    }, null, _parent));
    _push(`${ssrInterpolate_1($props.buttonText)}</button>`);
  }
  _push(`</div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/components/PriceBox.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const PriceBox = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const AccountCreated = 27;
const InitialPurchase = 28;
const Purchase = 29;
const matomo = {
  recordAccountCreated() {
    let _paq = window._paq = window._paq || [];
    _paq.push(["trackGoal", AccountCreated]);
  },
  recordPurchase(isNew, value) {
    let _paq = window._paq = window._paq || [];
    _paq.push(["trackGoal", isNew ? InitialPurchase : Purchase, value]);
  },
  recordSearch(query, resultsCount) {
    let _paq = window._paq = window._paq || [];
    _paq.push(["trackSiteSearch", query, false, resultsCount]);
  }
};
const _sfc_main = {
  name: "Prices",
  components: {
    PriceBox
  },
  data() {
    return {
      selectedProduct: "",
      expandedFeatures: {}
    };
  },
  computed: {
    ...mapState({
      products: (state) => state.product.all,
      inProgress: (state) => state.auth.inProgress,
      auth: (state) => state.auth,
      account: (state) => state.auth.account
    }),
    language() {
      return this.$route.params.lang || window.location.href.split("/")[3] || "en";
    },
    productHierarchy() {
      return {
        "IVPN Tier 1": 1,
        "IVPN Standard": 1,
        "IVPN Tier 2": 2,
        "IVPN Plus": 2,
        "IVPN Tier 3": 3,
        "IVPN Pro": 3,
        "IVPN Pro Suite": 3
      };
    },
    currentActiveTierLevel() {
      var _a, _b;
      if (!this.auth.isAuthenticated || !this.account) {
        return 0;
      }
      if (!this.account.is_active && !this.account.is_new) {
        return 0;
      }
      const productId = ((_a = this.account.product) == null ? void 0 : _a.id) || ((_b = this.account.product) == null ? void 0 : _b.name) || "";
      return this.productHierarchy[productId] || 0;
    },
    isUnpaidWithProduct() {
      var _a;
      return !!(this.auth.isAuthenticated && this.account && !this.account.is_new && !this.account.is_active && ((_a = this.account.product) == null ? void 0 : _a.id));
    }
  },
  async created() {
    const locale = this.language;
    useI18n().locale.value = locale;
    if (this.$store.state.auth.isAuthenticated && !this.$store.state.auth.isLegacy && !this.$store.state.auth.isLoaded) {
      try {
        await this.$store.dispatch("auth/load");
      } catch (error) {
      }
    }
  },
  methods: {
    toggleFeature(key) {
      this.expandedFeatures = { ...this.expandedFeatures, [key]: !this.expandedFeatures[key] };
    },
    async selected(product) {
      var _a, _b, _c, _d, _e, _f, _g;
      if (this.auth.isAuthenticated && this.auth.isLegacy) {
        this.$router.push({ name: "account-" + this.language });
        return;
      }
      if (this.auth.isAuthenticated && ((_a = this.account) == null ? void 0 : _a.is_new)) {
        const tierLevel = this.productHierarchy[product] || 0;
        const currentLevel = this.productHierarchy[(_c = (_b = this.account) == null ? void 0 : _b.product) == null ? void 0 : _c.id] || 0;
        if (tierLevel === currentLevel) {
          this.$router.push({ name: "account-" + this.language });
          return;
        }
      }
      if (this.isUnpaidWithProduct) {
        const tierLevel = this.productHierarchy[product] || 0;
        const currentLevel = this.productHierarchy[(_e = (_d = this.account) == null ? void 0 : _d.product) == null ? void 0 : _e.id] || 0;
        if (tierLevel === currentLevel) {
          this.$router.push({ name: "account-" + this.language });
          return;
        }
      }
      this.selectedProduct = product;
      if (this.auth.isAuthenticated) {
        if (!this.auth.isLoaded) {
          try {
            await this.$store.dispatch("auth/load");
            if (this.auth.error) {
              return;
            }
          } catch (error) {
            return;
          }
        }
        if (!this.auth.account.is_new && this.auth.account.is_active) {
          if (this.isUpgradeTier(product)) {
            this.$router.push({ name: "upgrade-" + this.language });
          } else {
            this.$router.push({ name: "account-" + this.language });
          }
          return;
        }
        if (!this.auth.account.is_new && !this.auth.account.is_active) {
          const currentProductName = ((_f = this.auth.account.product) == null ? void 0 : _f.name) || ((_g = this.auth.account.product) == null ? void 0 : _g.id);
          if (this.isDowngrade(currentProductName, product)) {
            this.$store.commit("popup/show", {
              type: "downgrade-account",
              data: { currentProduct: currentProductName, selectedProduct: product }
            });
            return;
          }
        }
      }
      const wasAuthenticated = this.auth.isAuthenticated;
      try {
        await this.$store.dispatch("auth/createAccount", { product });
        if (!wasAuthenticated) {
          matomo.recordAccountCreated();
        }
        this.$router.push({ name: "account-" + this.language });
      } catch (error) {
      }
    },
    scrollToPricing() {
      const element = document.getElementById("plan-heading");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    toggleFeature(key) {
      this.expandedFeatures[key] = !this.expandedFeatures[key];
    },
    isDowngrade(currentProduct, selectedProduct) {
      const productHierarchy = {
        "IVPN Tier 1": 1,
        "IVPN Standard": 1,
        "IVPN Tier 2": 2,
        "IVPN Plus": 2,
        "IVPN Tier 3": 3,
        "IVPN Pro": 3,
        "IVPN Pro Suite": 3
      };
      const currentLevel = productHierarchy[currentProduct] || 0;
      const selectedLevel = productHierarchy[selectedProduct] || 0;
      return currentLevel > selectedLevel;
    },
    getButtonText(tierProductId) {
      var _a, _b, _c, _d, _e;
      if (!this.auth.isAuthenticated) {
        return this.$t("pricing.selectPlan");
      }
      if (this.isUpgradeTier(tierProductId)) {
        return this.$t("pricing.upgrade");
      }
      if ((_a = this.account) == null ? void 0 : _a.is_new) {
        const tierLevel = this.productHierarchy[tierProductId] || 0;
        const currentLevel = this.productHierarchy[(_c = (_b = this.account) == null ? void 0 : _b.product) == null ? void 0 : _c.id] || 0;
        if (tierLevel === currentLevel) {
          return this.$t("account.selectedPlan");
        }
      }
      if (this.isUnpaidWithProduct) {
        const tierLevel = this.productHierarchy[tierProductId] || 0;
        const currentLevel = this.productHierarchy[(_e = (_d = this.account) == null ? void 0 : _d.product) == null ? void 0 : _e.id] || 0;
        if (tierLevel === currentLevel) {
          return this.$t("account.selectedPlan");
        }
      }
      return this.$t("pricing.selectPlan");
    },
    shouldHideButton(tierProductId) {
      if (this.currentActiveTierLevel === 0) return false;
      const tierLevel = this.productHierarchy[tierProductId] || 0;
      if (this.account && this.account.is_new) {
        return false;
      }
      return tierLevel <= this.currentActiveTierLevel;
    },
    isUpgradeTier(tierProductId) {
      if (this.account && this.account.is_new) {
        return false;
      }
      const tierLevel = this.productHierarchy[tierProductId] || 0;
      return this.currentActiveTierLevel > 0 && tierLevel > this.currentActiveTierLevel;
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const _component_price_box = resolveComponent("price-box");
  _push(`<div${ssrRenderAttrs_1(_attrs)} data-v-a32094ce><h1 id="plan-heading" class="app text-center" data-v-a32094ce>${ssrInterpolate_1(_ctx.$t("pricing.title"))}</h1><p class="text-center" style="${ssrRenderStyle_1({ "font-size": "1.2rem" })}" data-v-a32094ce>${ssrInterpolate_1(_ctx.$t("pricing.description"))}</p><div class="prices" id="pricing-section" data-v-a32094ce>`);
  _push(ssrRenderComponent_1(_component_price_box, {
    prices: _ctx.products.tier1,
    onSelected: ($event) => $options.selected("IVPN Tier 1"),
    disabled: _ctx.inProgress,
    inProgress: _ctx.inProgress && $data.selectedProduct === "tier1",
    buttonText: $options.getButtonText("IVPN Tier 1"),
    hideButton: $options.shouldHideButton("IVPN Tier 1"),
    upgrade: $options.isUpgradeTier("IVPN Tier 1"),
    selectedPlan: ($options.isUnpaidWithProduct || ((_a = _ctx.account) == null ? void 0 : _a.is_new)) && $options.productHierarchy["IVPN Tier 1"] === ($options.productHierarchy[(_c = (_b = _ctx.account) == null ? void 0 : _b.product) == null ? void 0 : _c.id] || 0),
    product: "tier1",
    current: _ctx.account && _ctx.account.product && _ctx.account.product.id === "IVPN Tier 1"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="price-head" data-v-a32094ce${_scopeId}><div class="pricebox-header" data-v-a32094ce${_scopeId}>${ssrInterpolate_1(_ctx.$t("pricing.tier1.name"))}</div><div class="price-title" data-v-a32094ce${_scopeId}>${ssrInterpolate_1(_ctx.$t("pricing.tier1.title"))}</div></div><div class="price-features" data-v-a32094ce${_scopeId}><div class="${ssrRenderClass_1([{ expanded: $data.expandedFeatures["t1f1"] }, "feature-item expandable"])}" data-v-a32094ce${_scopeId}><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce${_scopeId}><polyline points="9 18 15 12 9 6" data-v-a32094ce${_scopeId}></polyline></svg> ${ssrInterpolate_1(_ctx.$t("pricing.tier1.feature1"))} <span class="feature-toggle" data-v-a32094ce${_scopeId}>[i]</span></div>`);
        if ($data.expandedFeatures["t1f1"]) {
          _push2(`<div class="feature-description" data-v-a32094ce${_scopeId}>${ssrInterpolate_1(_ctx.$t("pricing.tier1.feature1Title"))}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<div class="${ssrRenderClass_1([{ expanded: $data.expandedFeatures["t1f3"] }, "feature-item expandable"])}" data-v-a32094ce${_scopeId}><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce${_scopeId}><polyline points="9 18 15 12 9 6" data-v-a32094ce${_scopeId}></polyline></svg> ${ssrInterpolate_1(_ctx.$t("pricing.tier1.feature3"))} <span class="feature-toggle" data-v-a32094ce${_scopeId}>[i]</span></div>`);
        if ($data.expandedFeatures["t1f3"]) {
          _push2(`<div class="feature-description" data-v-a32094ce${_scopeId}>${ssrInterpolate_1(_ctx.$t("pricing.tier1.feature3Title"))}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", { class: "price-head" }, [
            createVNode("div", { class: "pricebox-header" }, toDisplayString(_ctx.$t("pricing.tier1.name")), 1),
            createVNode("div", { class: "price-title" }, toDisplayString(_ctx.$t("pricing.tier1.title")), 1)
          ]),
          createVNode("div", { class: "price-features" }, [
            createVNode("div", {
              class: ["feature-item expandable", { expanded: $data.expandedFeatures["t1f1"] }],
              onClick: ($event) => $options.toggleFeature("t1f1")
            }, [
              (openBlock(), createBlock("svg", {
                class: "icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                createVNode("polyline", { points: "9 18 15 12 9 6" })
              ])),
              createTextVNode(" " + toDisplayString(_ctx.$t("pricing.tier1.feature1")) + " ", 1),
              createVNode("span", { class: "feature-toggle" }, "[i]")
            ], 10, ["onClick"]),
            $data.expandedFeatures["t1f1"] ? (openBlock(), createBlock("div", {
              key: 0,
              class: "feature-description"
            }, toDisplayString(_ctx.$t("pricing.tier1.feature1Title")), 1)) : createCommentVNode("", true),
            createVNode("div", {
              class: ["feature-item expandable", { expanded: $data.expandedFeatures["t1f3"] }],
              onClick: ($event) => $options.toggleFeature("t1f3")
            }, [
              (openBlock(), createBlock("svg", {
                class: "icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                createVNode("polyline", { points: "9 18 15 12 9 6" })
              ])),
              createTextVNode(" " + toDisplayString(_ctx.$t("pricing.tier1.feature3")) + " ", 1),
              createVNode("span", { class: "feature-toggle" }, "[i]")
            ], 10, ["onClick"]),
            $data.expandedFeatures["t1f3"] ? (openBlock(), createBlock("div", {
              key: 1,
              class: "feature-description"
            }, toDisplayString(_ctx.$t("pricing.tier1.feature3Title")), 1)) : createCommentVNode("", true)
          ])
        ];
      }
    }, void 0, true),
    _: 1
  }, _parent));
  _push(ssrRenderComponent_1(_component_price_box, {
    prices: _ctx.products.tier2,
    onSelected: ($event) => $options.selected("IVPN Tier 2"),
    disabled: _ctx.inProgress,
    inProgress: _ctx.inProgress && $data.selectedProduct === "tier2",
    buttonText: $options.getButtonText("IVPN Tier 2"),
    hideButton: $options.shouldHideButton("IVPN Tier 2"),
    upgrade: $options.isUpgradeTier("IVPN Tier 2"),
    selectedPlan: ($options.isUnpaidWithProduct || ((_d = _ctx.account) == null ? void 0 : _d.is_new)) && $options.productHierarchy["IVPN Tier 2"] === ($options.productHierarchy[(_f = (_e = _ctx.account) == null ? void 0 : _e.product) == null ? void 0 : _f.id] || 0),
    product: "tier2",
    current: _ctx.account && _ctx.account.product && _ctx.account.product.id === "IVPN Tier 2"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="price-head" data-v-a32094ce${_scopeId}><div class="pricebox-header" data-v-a32094ce${_scopeId}>${ssrInterpolate_1(_ctx.$t("pricing.tier2.name"))}</div><div class="price-title" data-v-a32094ce${_scopeId}>${ssrInterpolate_1(_ctx.$t("pricing.tier2.title"))}</div></div><div class="price-features" data-v-a32094ce${_scopeId}><div class="${ssrRenderClass_1([{ expanded: $data.expandedFeatures["t2f1"] }, "feature-item expandable"])}" data-v-a32094ce${_scopeId}><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce${_scopeId}><polyline points="9 18 15 12 9 6" data-v-a32094ce${_scopeId}></polyline></svg> ${ssrInterpolate_1(_ctx.$t("pricing.tier2.feature1"))} <span class="feature-toggle" data-v-a32094ce${_scopeId}>[i]</span></div>`);
        if ($data.expandedFeatures["t2f1"]) {
          _push2(`<div class="feature-description" data-v-a32094ce${_scopeId}>${ssrInterpolate_1(_ctx.$t("pricing.tier2.feature1Title"))}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<div class="${ssrRenderClass_1([{ expanded: $data.expandedFeatures["t2f3"] }, "feature-item expandable"])}" data-v-a32094ce${_scopeId}><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce${_scopeId}><polyline points="9 18 15 12 9 6" data-v-a32094ce${_scopeId}></polyline></svg> ${ssrInterpolate_1(_ctx.$t("pricing.tier2.feature3"))} <span class="feature-toggle" data-v-a32094ce${_scopeId}>[i]</span></div>`);
        if ($data.expandedFeatures["t2f3"]) {
          _push2(`<div class="feature-description" data-v-a32094ce${_scopeId}>${ssrInterpolate_1(_ctx.$t("pricing.tier2.feature3Title"))}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<div class="${ssrRenderClass_1([{ expanded: $data.expandedFeatures["t2f4"] }, "feature-item expandable"])}" data-v-a32094ce${_scopeId}><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce${_scopeId}><polyline points="9 18 15 12 9 6" data-v-a32094ce${_scopeId}></polyline></svg> ${ssrInterpolate_1(_ctx.$t("pricing.tier2.feature4"))} <span class="feature-toggle" data-v-a32094ce${_scopeId}>[i]</span></div>`);
        if ($data.expandedFeatures["t2f4"]) {
          _push2(`<div class="feature-description" data-v-a32094ce${_scopeId}>${ssrInterpolate_1(_ctx.$t("pricing.tier2.feature4Title"))}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", { class: "price-head" }, [
            createVNode("div", { class: "pricebox-header" }, toDisplayString(_ctx.$t("pricing.tier2.name")), 1),
            createVNode("div", { class: "price-title" }, toDisplayString(_ctx.$t("pricing.tier2.title")), 1)
          ]),
          createVNode("div", { class: "price-features" }, [
            createVNode("div", {
              class: ["feature-item expandable", { expanded: $data.expandedFeatures["t2f1"] }],
              onClick: ($event) => $options.toggleFeature("t2f1")
            }, [
              (openBlock(), createBlock("svg", {
                class: "icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                createVNode("polyline", { points: "9 18 15 12 9 6" })
              ])),
              createTextVNode(" " + toDisplayString(_ctx.$t("pricing.tier2.feature1")) + " ", 1),
              createVNode("span", { class: "feature-toggle" }, "[i]")
            ], 10, ["onClick"]),
            $data.expandedFeatures["t2f1"] ? (openBlock(), createBlock("div", {
              key: 0,
              class: "feature-description"
            }, toDisplayString(_ctx.$t("pricing.tier2.feature1Title")), 1)) : createCommentVNode("", true),
            createVNode("div", {
              class: ["feature-item expandable", { expanded: $data.expandedFeatures["t2f3"] }],
              onClick: ($event) => $options.toggleFeature("t2f3")
            }, [
              (openBlock(), createBlock("svg", {
                class: "icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                createVNode("polyline", { points: "9 18 15 12 9 6" })
              ])),
              createTextVNode(" " + toDisplayString(_ctx.$t("pricing.tier2.feature3")) + " ", 1),
              createVNode("span", { class: "feature-toggle" }, "[i]")
            ], 10, ["onClick"]),
            $data.expandedFeatures["t2f3"] ? (openBlock(), createBlock("div", {
              key: 1,
              class: "feature-description"
            }, toDisplayString(_ctx.$t("pricing.tier2.feature3Title")), 1)) : createCommentVNode("", true),
            createVNode("div", {
              class: ["feature-item expandable", { expanded: $data.expandedFeatures["t2f4"] }],
              onClick: ($event) => $options.toggleFeature("t2f4")
            }, [
              (openBlock(), createBlock("svg", {
                class: "icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                createVNode("polyline", { points: "9 18 15 12 9 6" })
              ])),
              createTextVNode(" " + toDisplayString(_ctx.$t("pricing.tier2.feature4")) + " ", 1),
              createVNode("span", { class: "feature-toggle" }, "[i]")
            ], 10, ["onClick"]),
            $data.expandedFeatures["t2f4"] ? (openBlock(), createBlock("div", {
              key: 2,
              class: "feature-description"
            }, toDisplayString(_ctx.$t("pricing.tier2.feature4Title")), 1)) : createCommentVNode("", true)
          ])
        ];
      }
    }, void 0, true),
    _: 1
  }, _parent));
  _push(ssrRenderComponent_1(_component_price_box, {
    prices: _ctx.products.tier3,
    onSelected: ($event) => $options.selected("IVPN Tier 3"),
    disabled: _ctx.inProgress,
    inProgress: _ctx.inProgress && $data.selectedProduct === "tier3",
    buttonText: $options.getButtonText("IVPN Tier 3"),
    hideButton: $options.shouldHideButton("IVPN Tier 3"),
    upgrade: $options.isUpgradeTier("IVPN Tier 3"),
    selectedPlan: ($options.isUnpaidWithProduct || ((_g = _ctx.account) == null ? void 0 : _g.is_new)) && $options.productHierarchy["IVPN Tier 3"] === ($options.productHierarchy[(_i = (_h = _ctx.account) == null ? void 0 : _h.product) == null ? void 0 : _i.id] || 0),
    product: "tier3",
    current: _ctx.account && _ctx.account.product && _ctx.account.product.id === "IVPN Tier 3"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="price-head" data-v-a32094ce${_scopeId}><div class="pricebox-header" data-v-a32094ce${_scopeId}>${ssrInterpolate_1(_ctx.$t("pricing.tier3.name"))}</div><div class="price-title" data-v-a32094ce${_scopeId}>${ssrInterpolate_1(_ctx.$t("pricing.tier3.title"))}</div></div><div class="price-features" data-v-a32094ce${_scopeId}><div class="${ssrRenderClass_1([{ expanded: $data.expandedFeatures["t3f1"] }, "feature-item expandable"])}" data-v-a32094ce${_scopeId}><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce${_scopeId}><polyline points="9 18 15 12 9 6" data-v-a32094ce${_scopeId}></polyline></svg> ${ssrInterpolate_1(_ctx.$t("pricing.tier3.feature1"))} <span class="feature-toggle" data-v-a32094ce${_scopeId}>[i]</span></div>`);
        if ($data.expandedFeatures["t3f1"]) {
          _push2(`<div class="feature-description" data-v-a32094ce${_scopeId}>${ssrInterpolate_1(_ctx.$t("pricing.tier3.feature1Title"))}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<div class="${ssrRenderClass_1([{ expanded: $data.expandedFeatures["t3f3"] }, "feature-item expandable"])}" data-v-a32094ce${_scopeId}><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce${_scopeId}><polyline points="9 18 15 12 9 6" data-v-a32094ce${_scopeId}></polyline></svg> ${ssrInterpolate_1(_ctx.$t("pricing.tier3.feature3"))} <span class="feature-toggle" data-v-a32094ce${_scopeId}>[i]</span></div>`);
        if ($data.expandedFeatures["t3f3"]) {
          _push2(`<div class="feature-description" data-v-a32094ce${_scopeId}>${ssrInterpolate_1(_ctx.$t("pricing.tier3.feature3Title"))}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<div class="${ssrRenderClass_1([{ expanded: $data.expandedFeatures["t3f4"] }, "feature-item expandable"])}" data-v-a32094ce${_scopeId}><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce${_scopeId}><polyline points="9 18 15 12 9 6" data-v-a32094ce${_scopeId}></polyline></svg> ${ssrInterpolate_1(_ctx.$t("pricing.tier3.feature4"))} <span class="feature-toggle" data-v-a32094ce${_scopeId}>[i]</span></div>`);
        if ($data.expandedFeatures["t3f4"]) {
          _push2(`<div class="feature-description" data-v-a32094ce${_scopeId}>${ssrInterpolate_1(_ctx.$t("pricing.tier3.feature4Title"))}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<div class="${ssrRenderClass_1([{ expanded: $data.expandedFeatures["t3f5"] }, "feature-item expandable"])}" data-v-a32094ce${_scopeId}><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce${_scopeId}><polyline points="9 18 15 12 9 6" data-v-a32094ce${_scopeId}></polyline></svg> ${ssrInterpolate_1(_ctx.$t("pricing.tier3.feature5"))} <span class="feature-toggle" data-v-a32094ce${_scopeId}>[i]</span></div>`);
        if ($data.expandedFeatures["t3f5"]) {
          _push2(`<div class="feature-description" data-v-a32094ce${_scopeId}>${ssrInterpolate_1(_ctx.$t("pricing.tier3.feature5Title"))}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", { class: "price-head" }, [
            createVNode("div", { class: "pricebox-header" }, toDisplayString(_ctx.$t("pricing.tier3.name")), 1),
            createVNode("div", { class: "price-title" }, toDisplayString(_ctx.$t("pricing.tier3.title")), 1)
          ]),
          createVNode("div", { class: "price-features" }, [
            createVNode("div", {
              class: ["feature-item expandable", { expanded: $data.expandedFeatures["t3f1"] }],
              onClick: ($event) => $options.toggleFeature("t3f1")
            }, [
              (openBlock(), createBlock("svg", {
                class: "icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                createVNode("polyline", { points: "9 18 15 12 9 6" })
              ])),
              createTextVNode(" " + toDisplayString(_ctx.$t("pricing.tier3.feature1")) + " ", 1),
              createVNode("span", { class: "feature-toggle" }, "[i]")
            ], 10, ["onClick"]),
            $data.expandedFeatures["t3f1"] ? (openBlock(), createBlock("div", {
              key: 0,
              class: "feature-description"
            }, toDisplayString(_ctx.$t("pricing.tier3.feature1Title")), 1)) : createCommentVNode("", true),
            createVNode("div", {
              class: ["feature-item expandable", { expanded: $data.expandedFeatures["t3f3"] }],
              onClick: ($event) => $options.toggleFeature("t3f3")
            }, [
              (openBlock(), createBlock("svg", {
                class: "icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                createVNode("polyline", { points: "9 18 15 12 9 6" })
              ])),
              createTextVNode(" " + toDisplayString(_ctx.$t("pricing.tier3.feature3")) + " ", 1),
              createVNode("span", { class: "feature-toggle" }, "[i]")
            ], 10, ["onClick"]),
            $data.expandedFeatures["t3f3"] ? (openBlock(), createBlock("div", {
              key: 1,
              class: "feature-description"
            }, toDisplayString(_ctx.$t("pricing.tier3.feature3Title")), 1)) : createCommentVNode("", true),
            createVNode("div", {
              class: ["feature-item expandable", { expanded: $data.expandedFeatures["t3f4"] }],
              onClick: ($event) => $options.toggleFeature("t3f4")
            }, [
              (openBlock(), createBlock("svg", {
                class: "icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                createVNode("polyline", { points: "9 18 15 12 9 6" })
              ])),
              createTextVNode(" " + toDisplayString(_ctx.$t("pricing.tier3.feature4")) + " ", 1),
              createVNode("span", { class: "feature-toggle" }, "[i]")
            ], 10, ["onClick"]),
            $data.expandedFeatures["t3f4"] ? (openBlock(), createBlock("div", {
              key: 2,
              class: "feature-description"
            }, toDisplayString(_ctx.$t("pricing.tier3.feature4Title")), 1)) : createCommentVNode("", true),
            createVNode("div", {
              class: ["feature-item expandable", { expanded: $data.expandedFeatures["t3f5"] }],
              onClick: ($event) => $options.toggleFeature("t3f5")
            }, [
              (openBlock(), createBlock("svg", {
                class: "icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                createVNode("polyline", { points: "9 18 15 12 9 6" })
              ])),
              createTextVNode(" " + toDisplayString(_ctx.$t("pricing.tier3.feature5")) + " ", 1),
              createVNode("span", { class: "feature-toggle" }, "[i]")
            ], 10, ["onClick"]),
            $data.expandedFeatures["t3f5"] ? (openBlock(), createBlock("div", {
              key: 3,
              class: "feature-description"
            }, toDisplayString(_ctx.$t("pricing.tier3.feature5Title")), 1)) : createCommentVNode("", true)
          ])
        ];
      }
    }, void 0, true),
    _: 1
  }, _parent));
  _push(`</div>`);
  if (_ctx.auth.error) {
    _push(`<div class="error" data-v-a32094ce><p data-v-a32094ce>${ssrInterpolate_1(_ctx.auth.error.message)}</p></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<section class="cta-section" data-v-a32094ce><div class="container" data-v-a32094ce><div class="cta-content" data-v-a32094ce><p class="pricing-note" data-v-a32094ce>${ssrInterpolate_1(_ctx.$t("pricing.productFooterPrice"))} ${ssrInterpolate_1(_ctx.$t("pricing.productFooterReview"))} <a${ssrRenderAttr_1("href", "/" + $options.language + "/pricing-teams/")} data-v-a32094ce>${ssrInterpolate_1(_ctx.$t("pricing.here"))}</a>. </p></div></div></section><section class="included-features" data-v-a32094ce><div class="container" data-v-a32094ce><div class="features-badges" data-v-a32094ce><div class="badge" data-v-a32094ce><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><polyline points="9 18 15 12 9 6" data-v-a32094ce></polyline></svg><span data-v-a32094ce>${ssrInterpolate_1(_ctx.$t("pricing.featuresBadges.badge1"))}</span></div><div class="badge" data-v-a32094ce><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><polyline points="9 18 15 12 9 6" data-v-a32094ce></polyline></svg><span data-v-a32094ce>${ssrInterpolate_1(_ctx.$t("pricing.featuresBadges.badge2"))}</span></div><div class="badge" data-v-a32094ce><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><polyline points="9 18 15 12 9 6" data-v-a32094ce></polyline></svg><span data-v-a32094ce>${ssrInterpolate_1(_ctx.$t("pricing.featuresBadges.badge3"))}</span></div></div><div class="content-grid content-grid--stack" data-v-a32094ce><div class="content-text" data-v-a32094ce><h3 data-v-a32094ce>${ssrInterpolate_1(_ctx.$t("pricing.stack.title"))}</h3><div class="privacy-features" data-v-a32094ce><div class="feature-item" data-v-a32094ce><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><polyline points="9 18 15 12 9 6" data-v-a32094ce></polyline></svg> ${ssrInterpolate_1(_ctx.$t("pricing.stack.feature1"))}</div><div class="feature-item" data-v-a32094ce><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><polyline points="9 18 15 12 9 6" data-v-a32094ce></polyline></svg> ${ssrInterpolate_1(_ctx.$t("pricing.stack.feature2"))}</div><div class="feature-item" data-v-a32094ce><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><polyline points="9 18 15 12 9 6" data-v-a32094ce></polyline></svg> ${ssrInterpolate_1(_ctx.$t("pricing.stack.feature3"))}</div><div class="feature-item" data-v-a32094ce><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><polyline points="9 18 15 12 9 6" data-v-a32094ce></polyline></svg><span data-v-a32094ce>${ssrInterpolate_1(_ctx.$t("pricing.stack.feature4"))} (<a${ssrRenderAttr_1("href", "/" + $options.language + "/unlinked-access")} class="feature-inline-link" data-v-a32094ce>${ssrInterpolate_1(_ctx.$t("pricing.stack.feature4LinkText"))}</a>)</span></div></div><a${ssrRenderAttr_1("href", "/" + $options.language + "/services/")} class="link" data-v-a32094ce>${ssrInterpolate_1(_ctx.$t("pricing.reviewServices"))} <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><polyline points="9 18 15 12 9 6" data-v-a32094ce></polyline></svg></a></div><div class="service-icons-wrapper" data-v-a32094ce><div class="service-icons" data-v-a32094ce><a href="https://mailx.net" target="_blank" rel="noopener" class="service-icon-link" data-v-a32094ce><img alt="Mailx" class="service-icon mailx-logo" data-v-a32094ce></a><a href="https://moddns.net" target="_blank" rel="noopener" class="service-icon-link" data-v-a32094ce><img alt="modDNS" class="service-icon moddns-logo" data-v-a32094ce></a><a href="https://safing.io" target="_blank" rel="noopener" class="service-icon-link portmaster-logo" data-v-a32094ce><img src="/images/pm_white.svg" alt="Portmaster" class="portmaster-icon" data-v-a32094ce><span data-v-a32094ce>${ssrInterpolate_1(_ctx.$t("pricing.portmasterTitle"))}</span></a><img src="/images/ivpn.png" alt="IVPN" class="service-icon" style="${ssrRenderStyle_1({ "height": "3rem" })}" data-v-a32094ce></div></div></div><div class="content-grid reverse" data-v-a32094ce><div class="product-images" data-v-a32094ce><img src="/images/product1.png" alt="IVPN CLI terminal interface" class="product-cli" data-v-a32094ce><img src="/images/product2.png" alt="IVPN app interface with map" class="product-gui" data-v-a32094ce></div><div class="content-text" data-v-a32094ce><h3 data-v-a32094ce>${ssrInterpolate_1(_ctx.$t("pricing.features.title"))}</h3><div class="privacy-features" data-v-a32094ce><div class="feature-item" data-v-a32094ce><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><polyline points="9 18 15 12 9 6" data-v-a32094ce></polyline></svg> ${ssrInterpolate_1(_ctx.$t("pricing.features.feature1"))}</div><div class="feature-item" data-v-a32094ce><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><polyline points="9 18 15 12 9 6" data-v-a32094ce></polyline></svg> ${ssrInterpolate_1(_ctx.$t("pricing.features.feature2"))}</div><div class="feature-item" data-v-a32094ce><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><polyline points="9 18 15 12 9 6" data-v-a32094ce></polyline></svg> ${ssrInterpolate_1(_ctx.$t("pricing.features.feature3"))}</div><div class="feature-item" data-v-a32094ce><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><polyline points="9 18 15 12 9 6" data-v-a32094ce></polyline></svg> ${ssrInterpolate_1(_ctx.$t("pricing.features.feature4"))}</div><div class="feature-item" data-v-a32094ce><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><polyline points="9 18 15 12 9 6" data-v-a32094ce></polyline></svg> ${ssrInterpolate_1(_ctx.$t("pricing.features.feature5"))}</div><div class="feature-item" data-v-a32094ce><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><polyline points="9 18 15 12 9 6" data-v-a32094ce></polyline></svg> ${ssrInterpolate_1(_ctx.$t("pricing.features.feature6"))}</div><div class="feature-item" data-v-a32094ce><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><polyline points="9 18 15 12 9 6" data-v-a32094ce></polyline></svg> ${ssrInterpolate_1(_ctx.$t("pricing.features.feature7"))}</div></div></div></div></div></section><section class="payment-methods" data-v-a32094ce><div class="container" data-v-a32094ce><h3 data-v-a32094ce>${ssrInterpolate_1(_ctx.$t("pricing.paymentMethods"))}</h3><div class="payment-badges" data-v-a32094ce><span class="payment-badge" data-v-a32094ce><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><rect x="1" y="4" width="22" height="16" rx="2" ry="2" data-v-a32094ce></rect><line x1="1" y1="10" x2="23" y2="10" data-v-a32094ce></line></svg> ${ssrInterpolate_1(_ctx.$t("account.creditCard"))}</span><span class="payment-badge" data-v-a32094ce><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" data-v-a32094ce></path><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" data-v-a32094ce></path></svg> ${ssrInterpolate_1(_ctx.$t("account.paypal"))}</span><span class="payment-badge" data-v-a32094ce><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" data-v-a32094ce></path></svg> ${ssrInterpolate_1(_ctx.$t("account.bitcoin"))}</span><span class="payment-badge" data-v-a32094ce><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" data-v-a32094ce></polygon></svg> ${ssrInterpolate_1(_ctx.$t("account.lightning"))}</span><span class="payment-badge" data-v-a32094ce><svg class="icon" viewBox="0 0 32 32" fill="currentColor" data-v-a32094ce><path d="M 16 3 C 8.832 3 3 8.832 3 16 C 3 23.168 8.832 29 16 29 C 23.168 29 29 23.168 29 16 C 29 8.832 23.168 3 16 3 z M 16 5 C 22.065 5 27 9.935 27 16 C 27 17.040896 26.843748 18.044906 26.572266 19 L 22 19 L 22 10.976562 L 16 17.261719 L 10 10.976562 L 10 19 L 5.4277344 19 C 5.1562523 18.044906 5 17.040896 5 16 C 5 9.935 9.935 5 16 5 z M 12 15.96875 L 16 20.15625 L 20 15.96875 L 20 21 L 25.785156 21 C 23.960333 24.555852 20.263678 27 16 27 C 11.736322 27 8.0396672 24.555852 6.2148438 21 L 12 21 L 12 15.96875 z" data-v-a32094ce></path></svg> ${ssrInterpolate_1(_ctx.$t("account.monero"))}</span><span class="payment-badge" data-v-a32094ce><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><line x1="12" y1="1" x2="12" y2="23" data-v-a32094ce></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" data-v-a32094ce></path></svg> ${ssrInterpolate_1(_ctx.$t("account.cash"))}</span></div></div></section><section class="trust-section" data-v-a32094ce><div class="container" data-v-a32094ce><div class="trust-grid" data-v-a32094ce><div class="trust-content" data-v-a32094ce><h2 data-v-a32094ce>${ssrInterpolate_1(_ctx.$t("pricing.transparency.title"))}</h2><div class="privacy-features" data-v-a32094ce><div class="feature-item" data-v-a32094ce><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><polyline points="9 18 15 12 9 6" data-v-a32094ce></polyline></svg> ${ssrInterpolate_1(_ctx.$t("pricing.transparency.feature1"))}</div><div class="feature-item" data-v-a32094ce><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><polyline points="9 18 15 12 9 6" data-v-a32094ce></polyline></svg> ${ssrInterpolate_1(_ctx.$t("pricing.transparency.feature2"))}</div><div class="feature-item" data-v-a32094ce><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><polyline points="9 18 15 12 9 6" data-v-a32094ce></polyline></svg> ${ssrInterpolate_1(_ctx.$t("pricing.transparency.feature3"))}</div><div class="feature-item" data-v-a32094ce><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><polyline points="9 18 15 12 9 6" data-v-a32094ce></polyline></svg> ${ssrInterpolate_1(_ctx.$t("pricing.transparency.feature4"))}</div><div class="feature-item" data-v-a32094ce><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><polyline points="9 18 15 12 9 6" data-v-a32094ce></polyline></svg> ${ssrInterpolate_1(_ctx.$t("pricing.transparency.feature5"))}</div><div class="feature-item" data-v-a32094ce><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><polyline points="9 18 15 12 9 6" data-v-a32094ce></polyline></svg> ${ssrInterpolate_1(_ctx.$t("pricing.transparency.feature6"))}</div></div><div class="limitations-box" data-v-a32094ce><div class="grid-pattern" data-v-a32094ce></div><div class="limitations-content" data-v-a32094ce><p class="limitations-title" data-v-a32094ce>${ssrInterpolate_1(_ctx.$t("pricing.limitations.title"))}</p><div class="privacy-features" data-v-a32094ce><div class="feature-item" data-v-a32094ce>${ssrInterpolate_1(_ctx.$t("pricing.limitations.feature1"))}</div><div class="feature-item" data-v-a32094ce>${ssrInterpolate_1(_ctx.$t("pricing.limitations.feature2"))}</div><div class="feature-item" data-v-a32094ce>${ssrInterpolate_1(_ctx.$t("pricing.limitations.feature3"))}</div></div></div></div></div><div class="server-image" data-v-a32094ce><img src="/images/02blue.png" alt="Pixel art server rack infrastructure with blue accents showing internal components" data-v-a32094ce></div></div></div></section><section class="cta-section" data-v-a32094ce><div class="container" data-v-a32094ce><div class="cta-content" style="${ssrRenderStyle_1({ "font-size": "1.1rem" })}" data-v-a32094ce><p data-v-a32094ce>${ssrInterpolate_1(_ctx.$t("pricing.footerBack.item1"))}</p><p data-v-a32094ce>${ssrInterpolate_1(_ctx.$t("pricing.footerBack.item2"))}</p><button class="btn btn-primary btn-cta" data-v-a32094ce><svg class="icon icon-up" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><polyline points="18 15 12 9 6 15" data-v-a32094ce></polyline></svg> ${ssrInterpolate_1(_ctx.$t("pricing.selectPlan"))} <svg class="icon icon-up" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a32094ce><polyline points="18 15 12 9 6 15" data-v-a32094ce></polyline></svg></button></div></div></section></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/views/Prices.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Prices = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-a32094ce"]]);
if (typeof globalThis.window === "undefined") {
  globalThis.window = {
    location: { href: "http://localhost/en/pricing/" },
    updateLoginMenu: () => {
    },
    getLanguage: () => "en",
    localStorage: { getItem: () => null, setItem: () => {
    }, removeItem: () => {
    } }
  };
  globalThis.document = {
    cookie: "",
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => []
  };
}
const products = {
  tier1: {
    name: "Tier 1",
    capabilities: { hasWireGuard: true, hasPortForwarding: false },
    prices: [
      { id: "standard-1week", name: en.pricing.oneWeek, price: 2 },
      { id: "standard-1month", name: en.pricing.oneMonth, price: 6 },
      { id: "standard-1year", name: en.pricing.oneYear, price: 60 },
      { id: "standard-2year", name: en.pricing.twoYears, price: 100 },
      { id: "standard-3year", name: en.pricing.threeYears, price: 140 }
    ],
    pricesEs: [
      { id: "standard-1week", name: es.pricing.oneWeek, price: 2 },
      { id: "standard-1month", name: es.pricing.oneMonth, price: 6 },
      { id: "standard-1year", name: es.pricing.oneYear, price: 60 },
      { id: "standard-2year", name: es.pricing.twoYears, price: 100 },
      { id: "standard-3year", name: es.pricing.threeYears, price: 140 }
    ]
  },
  tier2: {
    name: "Tier 2",
    capabilities: { hasWireGuard: true, hasPortForwarding: false },
    prices: [
      { id: "plus-1week", name: en.pricing.oneWeek, price: 3 },
      { id: "plus-1month", name: en.pricing.oneMonth, price: 8 },
      { id: "plus-1year", name: en.pricing.oneYear, price: 80 },
      { id: "plus-2year", name: en.pricing.twoYears, price: 140 },
      { id: "plus-3year", name: en.pricing.threeYears, price: 180 }
    ],
    pricesEs: [
      { id: "plus-1week", name: es.pricing.oneWeek, price: 3 },
      { id: "plus-1month", name: es.pricing.oneMonth, price: 8 },
      { id: "plus-1year", name: es.pricing.oneYear, price: 80 },
      { id: "plus-2year", name: es.pricing.twoYears, price: 140 },
      { id: "plus-3year", name: es.pricing.threeYears, price: 180 }
    ]
  },
  tier3: {
    name: "Tier 3",
    capabilities: { hasWireGuard: true, hasPortForwarding: false },
    prices: [
      { id: "pro-1week", name: en.pricing.oneWeek, price: 4 },
      { id: "pro-1month", name: en.pricing.oneMonth, price: 10 },
      { id: "pro-1year", name: en.pricing.oneYear, price: 100 },
      { id: "pro-2year", name: en.pricing.twoYears, price: 160 },
      { id: "pro-3year", name: en.pricing.threeYears, price: 220 }
    ],
    pricesEs: [
      { id: "pro-1week", name: es.pricing.oneWeek, price: 4 },
      { id: "pro-1month", name: es.pricing.oneMonth, price: 10 },
      { id: "pro-1year", name: es.pricing.oneYear, price: 100 },
      { id: "pro-2year", name: es.pricing.twoYears, price: 160 },
      { id: "pro-3year", name: es.pricing.threeYears, price: 220 }
    ]
  }
};
const authModule = {
  namespaced: true,
  state: () => ({
    isAuthenticated: false,
    isLegacy: false,
    isLoaded: false,
    inProgress: false,
    account: null,
    error: null
  }),
  mutations: {
    setState() {
    },
    setAccount() {
    },
    updateAccount() {
    },
    started() {
    },
    failed() {
    },
    done() {
    }
  },
  actions: {
    init() {
    },
    load() {
    },
    createAccount() {
    }
  },
  getters: {}
};
const productModule = {
  namespaced: true,
  state: () => ({ inProgress: false, error: null, all: [] }),
  mutations: {
    started(state) {
      state.inProgress = true;
      state.error = null;
    },
    failed(state, { error }) {
      state.inProgress = false;
      state.error = error;
    },
    done(state) {
      state.inProgress = false;
    },
    setAll(state, { products: products2 }) {
      state.all = products2;
    }
  },
  actions: {}
};
const popupModule = {
  namespaced: true,
  state: () => ({}),
  mutations: { show() {
  } },
  actions: {}
};
async function render(lang = "en", baseURL = "http://localhost") {
  globalThis.window.location.href = `${baseURL}/${lang}/pricing/`;
  const store = createStore({
    modules: { auth: authModule, product: productModule, popup: popupModule }
  });
  store.commit("product/setAll", { products });
  const i18n = createI18n({
    locale: lang,
    fallbackLocale: "en",
    messages: { en, es }
  });
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/pricing", component: Prices },
      { path: "/en/pricing", component: Prices },
      { path: "/es/pricing", component: Prices }
    ]
  });
  const app = createSSRApp({ render: () => h(App) });
  app.use(store);
  app.use(i18n);
  app.use(router);
  app.mixin({
    methods: {
      emptyObject(obj) {
        return obj == null || obj === void 0 || Object.keys(obj).length === 0;
      }
    }
  });
  await router.push(`/${lang}/pricing`);
  await router.isReady();
  return renderToString_1(app);
}
export {
  render
};
