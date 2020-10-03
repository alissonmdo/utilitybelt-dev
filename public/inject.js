var UtilityBeltFunctions = {
  storage: {
    /**
     * Get all items from the selected storage
     * @param {Storage} storage
     */
    getAll(storage) {
      const storageItems = {};
      const specialKeys = [
        "length",
        "key",
        "getItem",
        "setItem",
        "removeItem",
        "clear",
      ];
      for (const i in storage) {
        if (Object.prototype.hasOwnProperty.call(storage, i)) {
          storageItems[i] = storage.getItem(i);
        }
      }
      let item;
      for (var i in specialKeys) {
        item = storage.getItem(specialKeys[i]);
        if (item !== null) {
          storageItems[specialKeys[i]] = item;
        }
      }
      return storageItems;
    },
    // TODO
    removeItem(item) {
      storage.removeItem(item);
    },
    // TODO
    setItem(key, value, oldKey) {
      if (oldKey !== undefined) {
        storage.removeItem(oldKey);
      }
      storage.setItem(key, value);
    },
    // TODO
    clear() {
      storage.clear();
    },
    // TODO
    exportJson() {
      return JSON.stringify(UtilityBeltFunctions.storage.getAll(), null, 4);
    },
    // TODO
    importJson(json) {
      try {
        var obj = JSON.parse(json);
        for (var i in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, i)) {
            storage.setItem(i, obj[i]);
          }
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
};

var UtilityBeltModules = {
  /**
   *
   * @param {string} module - Module which will be used
   * @param {string} action - Action to be executed on the module
   * @param {Object} variables - Variables to help the action execution
   */
  storage(module, action, variables) {
    let result = null;
    const storage = module === "SESSIONSTORAGE" ? sessionStorage : localStorage;
    switch (action) {
      case "GET":
        result = UtilityBeltFunctions.storage.getAll(storage);
        break;
      case "REMOVE":
        UtilityBeltFunctions.storage.removeItem();
        break;
      case "SET":
        UtilityBeltFunctions.storage.setItem(key, value);
        break;
      case "CLEAR":
        UtilityBeltFunctions.storage.clear();
        break;
      case "EXPORT":
        result = UtilityBeltFunctions.storage.exportJson();
        break;
      case "IMPORT":
        UtilityBeltFunctions.storage.importJson(json);
        break;
    }
    return result;
  },
};
/**
 * Function that handles the injection commands from the extension
 * @param {Object} UtilityBeltEvent - Parameters of the utility belt event handler
 * @param {string} UtilityBeltEvent.module - Module which will be used
 * @param {string} UtilityBeltEvent.action - Action to be executed on the module
 * @param {Object} UtilityBeltEvent.variables - Variables to help the action execution
 */
function utilityBeltEventHandler({ module, action, variables }) {
  let result = null;
  switch (module.module) {
    case "SESSIONSTORAGE" || "LOCALSTORAGE":
      result = UtilityBeltModules.storage(module, action, variables);
  }

  return result;
}

// eslint-disable-next-line no-undef
var result = utilityBeltEventHandler(utilityBeltEvent);
result;
