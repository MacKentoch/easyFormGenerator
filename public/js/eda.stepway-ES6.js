"format global";
(function(global) {

  var defined = {};

  // indexOf polyfill for IE8
  var indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++)
      if (this[i] === item)
        return i;
    return -1;
  }

  var getOwnPropertyDescriptor = true;
  try {
    Object.getOwnPropertyDescriptor({ a: 0 }, 'a');
  }
  catch(e) {
    getOwnPropertyDescriptor = false;
  }

  var defineProperty;
  (function () {
    try {
      if (!!Object.defineProperty({}, 'a', {}))
        defineProperty = Object.defineProperty;
    }
    catch (e) {
      defineProperty = function(obj, prop, opt) {
        try {
          obj[prop] = opt.value || opt.get.call(obj);
        }
        catch(e) {}
      }
    }
  })();

  function register(name, deps, declare) {
    if (arguments.length === 4)
      return registerDynamic.apply(this, arguments);
    doRegister(name, {
      declarative: true,
      deps: deps,
      declare: declare
    });
  }

  function registerDynamic(name, deps, executingRequire, execute) {
    doRegister(name, {
      declarative: false,
      deps: deps,
      executingRequire: executingRequire,
      execute: execute
    });
  }

  function doRegister(name, entry) {
    entry.name = name;

    // we never overwrite an existing define
    if (!(name in defined))
      defined[name] = entry;

    // we have to normalize dependencies
    // (assume dependencies are normalized for now)
    // entry.normalizedDeps = entry.deps.map(normalize);
    entry.normalizedDeps = entry.deps;
  }


  function buildGroups(entry, groups) {
    groups[entry.groupIndex] = groups[entry.groupIndex] || [];

    if (indexOf.call(groups[entry.groupIndex], entry) != -1)
      return;

    groups[entry.groupIndex].push(entry);

    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      var depEntry = defined[depName];

      // not in the registry means already linked / ES6
      if (!depEntry || depEntry.evaluated)
        continue;

      // now we know the entry is in our unlinked linkage group
      var depGroupIndex = entry.groupIndex + (depEntry.declarative != entry.declarative);

      // the group index of an entry is always the maximum
      if (depEntry.groupIndex === undefined || depEntry.groupIndex < depGroupIndex) {

        // if already in a group, remove from the old group
        if (depEntry.groupIndex !== undefined) {
          groups[depEntry.groupIndex].splice(indexOf.call(groups[depEntry.groupIndex], depEntry), 1);

          // if the old group is empty, then we have a mixed depndency cycle
          if (groups[depEntry.groupIndex].length == 0)
            throw new TypeError("Mixed dependency cycle detected");
        }

        depEntry.groupIndex = depGroupIndex;
      }

      buildGroups(depEntry, groups);
    }
  }

  function link(name) {
    var startEntry = defined[name];

    startEntry.groupIndex = 0;

    var groups = [];

    buildGroups(startEntry, groups);

    var curGroupDeclarative = !!startEntry.declarative == groups.length % 2;
    for (var i = groups.length - 1; i >= 0; i--) {
      var group = groups[i];
      for (var j = 0; j < group.length; j++) {
        var entry = group[j];

        // link each group
        if (curGroupDeclarative)
          linkDeclarativeModule(entry);
        else
          linkDynamicModule(entry);
      }
      curGroupDeclarative = !curGroupDeclarative; 
    }
  }

  // module binding records
  var moduleRecords = {};
  function getOrCreateModuleRecord(name) {
    return moduleRecords[name] || (moduleRecords[name] = {
      name: name,
      dependencies: [],
      exports: {}, // start from an empty module and extend
      importers: []
    })
  }

  function linkDeclarativeModule(entry) {
    // only link if already not already started linking (stops at circular)
    if (entry.module)
      return;

    var module = entry.module = getOrCreateModuleRecord(entry.name);
    var exports = entry.module.exports;

    var declaration = entry.declare.call(global, function(name, value) {
      module.locked = true;

      if (typeof name == 'object') {
        for (var p in name)
          exports[p] = name[p];
      }
      else {
        exports[name] = value;
      }

      for (var i = 0, l = module.importers.length; i < l; i++) {
        var importerModule = module.importers[i];
        if (!importerModule.locked) {
          for (var j = 0; j < importerModule.dependencies.length; ++j) {
            if (importerModule.dependencies[j] === module) {
              importerModule.setters[j](exports);
            }
          }
        }
      }

      module.locked = false;
      return value;
    });

    module.setters = declaration.setters;
    module.execute = declaration.execute;

    // now link all the module dependencies
    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      var depEntry = defined[depName];
      var depModule = moduleRecords[depName];

      // work out how to set depExports based on scenarios...
      var depExports;

      if (depModule) {
        depExports = depModule.exports;
      }
      else if (depEntry && !depEntry.declarative) {
        depExports = depEntry.esModule;
      }
      // in the module registry
      else if (!depEntry) {
        depExports = load(depName);
      }
      // we have an entry -> link
      else {
        linkDeclarativeModule(depEntry);
        depModule = depEntry.module;
        depExports = depModule.exports;
      }

      // only declarative modules have dynamic bindings
      if (depModule && depModule.importers) {
        depModule.importers.push(module);
        module.dependencies.push(depModule);
      }
      else
        module.dependencies.push(null);

      // run the setter for this dependency
      if (module.setters[i])
        module.setters[i](depExports);
    }
  }

  // An analog to loader.get covering execution of all three layers (real declarative, simulated declarative, simulated dynamic)
  function getModule(name) {
    var exports;
    var entry = defined[name];

    if (!entry) {
      exports = load(name);
      if (!exports)
        throw new Error("Unable to load dependency " + name + ".");
    }

    else {
      if (entry.declarative)
        ensureEvaluated(name, []);

      else if (!entry.evaluated)
        linkDynamicModule(entry);

      exports = entry.module.exports;
    }

    if ((!entry || entry.declarative) && exports && exports.__useDefault)
      return exports['default'];

    return exports;
  }

  function linkDynamicModule(entry) {
    if (entry.module)
      return;

    var exports = {};

    var module = entry.module = { exports: exports, id: entry.name };

    // AMD requires execute the tree first
    if (!entry.executingRequire) {
      for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
        var depName = entry.normalizedDeps[i];
        var depEntry = defined[depName];
        if (depEntry)
          linkDynamicModule(depEntry);
      }
    }

    // now execute
    entry.evaluated = true;
    var output = entry.execute.call(global, function(name) {
      for (var i = 0, l = entry.deps.length; i < l; i++) {
        if (entry.deps[i] != name)
          continue;
        return getModule(entry.normalizedDeps[i]);
      }
      throw new TypeError('Module ' + name + ' not declared as a dependency.');
    }, exports, module);

    if (output)
      module.exports = output;

    // create the esModule object, which allows ES6 named imports of dynamics
    exports = module.exports;
 
    if (exports && exports.__esModule) {
      entry.esModule = exports;
    }
    else {
      entry.esModule = {};
      
      // don't trigger getters/setters in environments that support them
      if (typeof exports == 'object' || typeof exports == 'function') {
        if (getOwnPropertyDescriptor) {
          var d;
          for (var p in exports)
            if (d = Object.getOwnPropertyDescriptor(exports, p))
              defineProperty(entry.esModule, p, d);
        }
        else {
          var hasOwnProperty = exports && exports.hasOwnProperty;
          for (var p in exports) {
            if (!hasOwnProperty || exports.hasOwnProperty(p))
              entry.esModule[p] = exports[p];
          }
         }
       }
      entry.esModule['default'] = exports;
      defineProperty(entry.esModule, '__useDefault', {
        value: true
      });
    }
  }

  /*
   * Given a module, and the list of modules for this current branch,
   *  ensure that each of the dependencies of this module is evaluated
   *  (unless one is a circular dependency already in the list of seen
   *  modules, in which case we execute it)
   *
   * Then we evaluate the module itself depth-first left to right 
   * execution to match ES6 modules
   */
  function ensureEvaluated(moduleName, seen) {
    var entry = defined[moduleName];

    // if already seen, that means it's an already-evaluated non circular dependency
    if (!entry || entry.evaluated || !entry.declarative)
      return;

    // this only applies to declarative modules which late-execute

    seen.push(moduleName);

    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      if (indexOf.call(seen, depName) == -1) {
        if (!defined[depName])
          load(depName);
        else
          ensureEvaluated(depName, seen);
      }
    }

    if (entry.evaluated)
      return;

    entry.evaluated = true;
    entry.module.execute.call(global);
  }

  // magical execution function
  var modules = {};
  function load(name) {
    if (modules[name])
      return modules[name];

    // node core modules
    if (name.substr(0, 6) == '@node/')
      return require(name.substr(6));

    var entry = defined[name];

    // first we check if this module has already been defined in the registry
    if (!entry)
      throw "Module " + name + " not present.";

    // recursively ensure that the module and all its 
    // dependencies are linked (with dependency group handling)
    link(name);

    // now handle dependency execution in correct order
    ensureEvaluated(name, []);

    // remove from the registry
    defined[name] = undefined;

    // exported modules get __esModule defined for interop
    if (entry.declarative)
      defineProperty(entry.module.exports, '__esModule', { value: true });

    // return the defined module object
    return modules[name] = entry.declarative ? entry.module.exports : entry.esModule;
  };

  return function(mains, depNames, declare) {
    return function(formatDetect) {
      formatDetect(function(deps) {
        var System = {
          _nodeRequire: typeof require != 'undefined' && require.resolve && typeof process != 'undefined' && require,
          register: register,
          registerDynamic: registerDynamic,
          get: load, 
          set: function(name, module) {
            modules[name] = module; 
          },
          newModule: function(module) {
            return module;
          }
        };
        System.set('@empty', {});

        // register external dependencies
        for (var i = 0; i < depNames.length; i++) (function(depName, dep) {
          if (dep && dep.__esModule)
            System.register(depName, [], function(_export) {
              return {
                setters: [],
                execute: function() {
                  for (var p in dep)
                    if (p != '__esModule' && !(typeof p == 'object' && p + '' == 'Module'))
                      _export(p, dep[p]);
                }
              };
            });
          else
            System.registerDynamic(depName, [], false, function() {
              return dep;
            });
        })(depNames[i], arguments[i]);

        // register modules in this bundle
        declare(System);

        // load mains
        var firstLoad = load(mains[0]);
        if (mains.length > 1)
          for (var i = 1; i < mains.length; i++)
            load(mains[i]);

        if (firstLoad.__useDefault)
          return firstLoad['default'];
        else
          return firstLoad;
      });
    };
  };

})(typeof self != 'undefined' ? self : global)
/* (['mainModule'], ['external-dep'], function($__System) {
  System.register(...);
})
(function(factory) {
  if (typeof define && define.amd)
    define(['external-dep'], factory);
  // etc UMD / module pattern
})*/

(['1'], [], function($__System) {

$__System.registerDynamic("6", [], true, function(require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $Object = Object;
  module.exports = {
    create: $Object.create,
    getProto: $Object.getPrototypeOf,
    isEnum: {}.propertyIsEnumerable,
    getDesc: $Object.getOwnPropertyDescriptor,
    setDesc: $Object.defineProperty,
    setDescs: $Object.defineProperties,
    getKeys: $Object.keys,
    getNames: $Object.getOwnPropertyNames,
    getSymbols: $Object.getOwnPropertySymbols,
    each: [].forEach
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("7", ["6"], true, function(require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = require("6");
  module.exports = function defineProperty(it, key, desc) {
    return $.setDesc(it, key, desc);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("8", ["7"], true, function(require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": require("7"),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("9", ["8"], true, function(require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var _Object$defineProperty = require("8")["default"];
  exports["default"] = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        _Object$defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("a", [], true, function(require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  "use strict";
  exports["default"] = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("c", [], true, function(require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = "\n<div class=\"modal-header\">\n\t\t<h3 class=\"modal-title greyText\">{{'SELECT_A_CTRL' | translate}}</h3>\n</div>\n<div class=\"modal-body\">\n\n\t\t<hr/>\n\n\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\">\n\t\t\t\t\t\t<h5 class=\"greyText\"><i class=\"fa fa-filter\"></i>&nbsp; {{'SELECT_CTRL_IN_LIST' | translate}} :</h5>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\">\n\t\t\t\t\n\t\t\t\t\t\t<ol class=\"nya-bs-select col-xs-12 col-sm-12 col-md-12 col-lg-12\" ng-model=\"modelNyaSelect\" data-live-search=\"false\">\n\t\t\t\t\t\t\t\t<li nya-bs-option=\"option in nyaSelectFiltered.controls group by option.group\">\n\t\t\t\t\t\t\t\t\t<span class=\"dropdown-header greyText\">{{$group}}</span> <!-- group header cannot be searched -->\n\t\t\t\t\t\t\t\t\t<a ng-click=\"selectThisControl(option.id)\">\n\t\t\t\t\t\t\t\t\t\t<span>{{ option.name }}</span> \n\t\t\t\t\t\t\t\t\t\t<span class=\"glyphicon glyphicon-ok check-mark\"></span>\n\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ol>\n\n\t\t\t\t</div>\n\t\t</div>\n\n\t\t<hr/>\n\n\n\n\t\t<div ng-switch on=\"nyaSelect.selectedControl\">\n\t\t\t\t\n\t\t\t\t<div ng-switch-when=\"none\">\n\n\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"text-center texteRouge\"> <i class=\"fa fa-arrow-up\"></i>&nbsp; {{'SELECT_A_CTRL' | translate}}</h5>\n\t\t\t\t\t\t\t\t\t\t</div>                \n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\n\t\t\t\t<div ng-switch-when=\"empty\">\n\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"greyText\"><i class=\"fa fa-eye\"></i>&nbsp; {{'PREVIEW_TAB' | translate}} :</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"text-center greyText\">{{'COL_WILL_BE_BLANK' | translate}}</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>                \n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t</div>                \n\n\t\t\t\t<div ng-switch-when=\"Header\">\n\t\t\t\t\t\t\t\t<!-- TextInput -->\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"greyText\"><i class=\"fa fa-eye\"></i>&nbsp; {{'PREVIEW_TAB' | translate}} :</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h2 class=\"text-center\">{{nyaSelect.temporyConfig.formlyDesciption}}</h2>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t</div>                    \n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"greyText\"><i class=\"fa fa-pencil-square-o\"></i>&nbsp; {{'EDIT_PROPERTIES' | translate}} :</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"marginTopFivepixels\"></div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextDescriptionUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'HEADER_TEXT' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"nyaSelect.temporyConfig.formlyDesciption\" id=\"inputHeaderTextUpdate\" placeholder=\"{{'ADD_EDIT_HEADER_HERE' | translate}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div> \n\t\t\t\t</div>\n\n\t\t\t\t<div ng-switch-when=\"Subtitle\">\n\t\t\t\t\t\t\t\t<!-- TextInput -->\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"greyText\"><i class=\"fa fa-eye\"></i>&nbsp; {{'PREVIEW_TAB' | translate}} :</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h4 class=\"text-center\">{{nyaSelect.temporyConfig.formlyPlaceholder}}</h4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t</div>                    \n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"greyText\"><i class=\"fa fa-pencil-square-o\"></i>&nbsp; {{'EDIT_PROPERTIES' | translate}} :</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"marginTopFivepixels\"></div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputSubTitleTextUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'SUBTITLE_TEXT' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"nyaSelect.temporyConfig.formlyPlaceholder\" id=\"inputSubTitleTextUpdate\" placeholder=\"{{'ADD_EDIT_SUBTIL_HERE' | translate}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div> \n\t\t\t\t</div>                \n\n\t\t\t\t<div ng-switch-when=\"TextInput\">\n\t\t\t\t\t\t\t\t<!-- TextInput -->\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"greyText\"><i class=\"fa fa-eye\"></i>&nbsp; {{'PREVIEW_TAB' | translate}} :</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputText\" class=\"control-label textControlLabel\">{{nyaSelect.temporyConfig.formlyLabel}}<span ng-if=\"nyaSelect.temporyConfig.formlyRequired\" class=\"textControlLabel\">*</span></label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"inputText\" placeholder=\"{{nyaSelect.temporyConfig.formlyPlaceholder}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"help-block\">{{nyaSelect.temporyConfig.formlyDesciption}}</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t</div>                    \n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"greyText\"><i class=\"fa fa-pencil-square-o\"></i>&nbsp; {{'EDIT_PROPERTIES' | translate}} :</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextLabelUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'LABEL_TEXT' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"nyaSelect.temporyConfig.formlyLabel\" id=\"inputTextLabelUpdate\" placeholder=\"{{'ADD_EDIT_LABEL_HERE' | translate}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"marginTopFivepixels\"></div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextplaceholderUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'PLACEHOLDER' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"nyaSelect.temporyConfig.formlyPlaceholder\" id=\"inputTextplaceholderUpdate\" placeholder=\"{{'ADD_EDIT_PLACEHOLD' | translate}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"marginTopFivepixels\"></div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextRequiredUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'REQUIRED' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"checkboxCssCorrection\">&nbsp;</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" ng-model=\"nyaSelect.temporyConfig.formlyRequired\" id=\"inputTextRequiredUpdate\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"marginTopFivepixels\"></div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextDescriptionUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'DESCRIPTION' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"nyaSelect.temporyConfig.formlyDesciption\" id=\"inputTextDescriptionUpdate\" placeholder=\"{{'ADDEDIT_DESCRIPTION' | translate}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div> \n\t\t\t\t</div>\n\n\t\t\t\t<div ng-switch-when=\"Password\">\n\t\t\t\t\t\t\t\t<!-- password -->\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"greyText\"><i class=\"fa fa-eye\"></i>&nbsp; {{'PREVIEW_TAB' | translate}} :</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">    \n\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputPassword\" class=\"control-label textControlLabel\">{{nyaSelect.temporyConfig.formlyLabel}}<span ng-if=\"nyaSelect.temporyConfig.formlyRequired\" class=\"textControlLabel\">*</span></label>\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"password\" class=\"form-control\" id=\"inputPassword\" placeholder=\"{{nyaSelect.temporyConfig.formlyPlaceholder}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"help-block\">{{nyaSelect.temporyConfig.formlyDesciption}}</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t</div>                    \n\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>  \n\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"greyText\"><i class=\"fa fa-pencil-square-o\"></i>&nbsp; {{'EDIT_PROPERTIES' | translate}} :</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextLabelUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'LABEL_TEXT' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"nyaSelect.temporyConfig.formlyLabel\" id=\"inputTextLabelUpdate\" placeholder=\"{{'ADD_EDIT_LABEL_HERE' | translate}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"marginTopFivepixels\"></div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextplaceholderUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'PLACEHOLDER' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"nyaSelect.temporyConfig.formlyPlaceholder\" id=\"inputTextplaceholderUpdate\" placeholder=\"{{'ADD_EDIT_PLACEHOLD' | translate}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"marginTopFivepixels\"></div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextRequiredUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'REQUIRED' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"checkboxCssCorrection\">&nbsp;</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" ng-model=\"nyaSelect.temporyConfig.formlyRequired\" id=\"inputTextRequiredUpdate\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"marginTopFivepixels\"></div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextDescriptionUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'DESCRIPTION' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"nyaSelect.temporyConfig.formlyDesciption\" id=\"inputTextDescriptionUpdate\" placeholder=\"{{'ADDEDIT_DESCRIPTION' | translate}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div> \n\t\t\t\t</div>   \n\n\t\t\t\t<div ng-switch-when=\"Email\">\n\t\t\t\t\t\t\t\t<!-- password -->\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"greyText\"><i class=\"fa fa-eye\"></i>&nbsp; {{'PREVIEW_TAB' | translate}} :</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">    \n\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputEmail\" class=\"control-label textControlLabel\">{{nyaSelect.temporyConfig.formlyLabel}}<span ng-if=\"nyaSelect.temporyConfig.formlyRequired\" class=\"textControlLabel\">*</span></label>\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"inputEmail\" placeholder=\"{{nyaSelect.temporyConfig.formlyPlaceholder}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"help-block\">{{nyaSelect.temporyConfig.formlyDesciption}}</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t</div>                    \n\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>  \n\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"greyText\"><i class=\"fa fa-pencil-square-o\"></i>&nbsp; {{'EDIT_PROPERTIES' | translate}} :</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextLabelUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'LABEL_TEXT' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"nyaSelect.temporyConfig.formlyLabel\" id=\"inputTextLabelUpdate\" placeholder=\"{{'ADD_EDIT_LABEL_HERE' | translate}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"marginTopFivepixels\"></div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextplaceholderUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'PLACEHOLDER' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"nyaSelect.temporyConfig.formlyPlaceholder\" id=\"inputTextplaceholderUpdate\" placeholder=\"{{'ADD_EDIT_PLACEHOLD' | translate}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"marginTopFivepixels\"></div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextRequiredUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'REQUIRED' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"checkboxCssCorrection\">&nbsp;</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" ng-model=\"nyaSelect.temporyConfig.formlyRequired\" id=\"inputTextRequiredUpdate\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"marginTopFivepixels\"></div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextDescriptionUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'DESCRIPTION' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"nyaSelect.temporyConfig.formlyDesciption\" id=\"inputTextDescriptionUpdate\" placeholder=\"{{'ADDEDIT_DESCRIPTION' | translate}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div> \n\t\t\t\t</div> \n\n\t\t\t\t<div ng-switch-when=\"Date\">\n\t\t\t\t\t\t\t\t<!-- datetimepicker (input type date not ok in all browsers) -->\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"greyText\"><i class=\"fa fa-eye\"></i>&nbsp; {{'PREVIEW_TAB' | translate}} :</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputDate\" class=\"control-label textControlLabel\">{{nyaSelect.temporyConfig.formlyLabel}}<span ng-if=\"nyaSelect.temporyConfig.formlyRequired\" class=\"textControlLabel\">*</span></label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t<div class=\"input-group\" >\n\t\t\t\t\t\t\t<span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-calendar\"></i></span>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" datepicker-popup=\"{{nyaSelect.temporyConfig.datepickerPopup}}\" ng-model=\"demodt.dt\" is-open=\"demodt.opened\" min-date=\"demodt.minDate\" max-date=\"'2099-12-31'\" datepicker-options=\"dateOptions\" date-disabled=\"disabled(date, mode)\"  close-text=\"Close\" ng-click=\"open($event)\" />\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t</p>         \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"help-block\">{{nyaSelect.temporyConfig.formlyDesciption}}</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>                    \n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"greyText\"><i class=\"fa fa-pencil-square-o\"></i>&nbsp; {{'EDIT_PROPERTIES' | translate}} :</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'DATE_FORMAT' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ol class=\"nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12\" ng-model=\"nyaSelect.temporyConfig.datepickerPopup\" id=\"dateformatSelect\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class=\"nya-bs-option\" nya-bs-option=\"dateformat in demodt.formats\" value=\"dateformat\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a>{{dateformat}}</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</ol>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"marginTopFivepixels\"></div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextLabelUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'LABEL_TEXT' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"nyaSelect.temporyConfig.formlyLabel\" id=\"inputTextLabelUpdate\" placeholder=\"{{'ADD_EDIT_LABEL_HERE' | translate}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"marginTopFivepixels\"></div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextRequiredUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'REQUIRED' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"checkboxCssCorrection\">&nbsp;</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" ng-model=\"nyaSelect.temporyConfig.formlyRequired\" id=\"inputTextRequiredUpdate\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"marginTopFivepixels\"></div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextDescriptionUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'DESCRIPTION' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"nyaSelect.temporyConfig.formlyDesciption\" id=\"inputTextDescriptionUpdate\" placeholder=\"{{'ADDEDIT_DESCRIPTION' | translate}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div> \n\t\t\t\t</div>                         \n\n\t\t\t\t<div ng-switch-when=\"Texarea\">\n\t\t\t\t\t\t\t\t<!-- textarea -->\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"greyText\"><i class=\"fa fa-eye\"></i>&nbsp; {{'PREVIEW_TAB' | translate}} :</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"textArea\" class=\"control-label textControlLabel\">{{nyaSelect.temporyConfig.formlyLabel}}<span ng-if=\"nyaSelect.temporyConfig.formlyRequired\" class=\"textControlLabel\">*</span></label>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<textarea class=\"form-control\" ng-model=\"model[options.key]\" rows=\"3\" id=\"textArea\"></textarea> \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"help-block\">{{nyaSelect.temporyConfig.formlyDesciption}}</p>          \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>                    \n\n\t\t\t\t\t\t\t\t\t\t\t\t</div>                    \n\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div> \n\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"greyText\"><i class=\"fa fa-pencil-square-o\"></i>&nbsp; {{'EDIT_PROPERTIES' | translate}} :</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextLabelUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'LABEL_TEXT' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"nyaSelect.temporyConfig.formlyLabel\" id=\"inputTextLabelUpdate\" placeholder=\"{{'ADD_EDIT_LABEL_HERE' | translate}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"marginTopFivepixels\"></div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextRequiredUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'REQUIRED' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"checkboxCssCorrection\">&nbsp;</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" ng-model=\"nyaSelect.temporyConfig.formlyRequired\" id=\"inputTextRequiredUpdate\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"marginTopFivepixels\"></div>\n\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextDescriptionUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'DESCRIPTION' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"nyaSelect.temporyConfig.formlyDesciption\" id=\"inputTextDescriptionUpdate\" placeholder=\"{{'ADDEDIT_DESCRIPTION' | translate}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div> \n\t\t\t\t</div> \n\n\t\t\t\t<div ng-switch-when=\"RichTextEditor\">\n\t\t\t\t\t\t\t\t<!-- TextInput -->\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"greyText\"><i class=\"fa fa-eye\"></i>&nbsp; {{'PREVIEW_TAB' | translate}} :</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"RichTextEditor\" class=\"control-label textControlLabel\">{{nyaSelect.temporyConfig.formlyLabel}}<span ng-if=\"nyaSelect.temporyConfig.formlyRequired\" class=\"textControlLabel\">*</span></label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<text-angular ng-model=\"model[options.key]\"></text-angular>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"help-block\">{{nyaSelect.temporyConfig.formlyDesciption}}</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>                    \n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"greyText\"><i class=\"fa fa-pencil-square-o\"></i>&nbsp; {{'EDIT_PROPERTIES' | translate}} :</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\t\t\t\t\t\t\t\t\t\t<!-- required can't be applied to rich text editor (textAngular) right now -->\n\t\t\t\t\t\t\t\t\t\t<!--<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextRequiredUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">Required :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"checkboxCssCorrection\">&nbsp;</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" ng-model=\"nyaSelect.temporyConfig.formlyRequired\" id=\"inputTextRequiredUpdate\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>                            \n\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"marginTopFivepixels\"></div>-->\n\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextDescriptionUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'DESCRIPTION' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"nyaSelect.temporyConfig.formlyDesciption\" id=\"inputTextDescriptionUpdate\" placeholder=\"{{'ADDEDIT_DESCRIPTION' | translate}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div> \n\t\t\t\t</div>                \n\n\t\t\t\t<div ng-switch-when=\"Radio\">\n\t\t\t\t\t\t\t\t<!-- radios -->\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"greyText\"><i class=\"fa fa-eye\"></i>&nbsp; {{'PREVIEW_TAB' | translate}} :</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t\t<hr/>                           \n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"basicSelect\" class=\"control-label textControlLabel\">{{nyaSelect.temporyConfig.formlyLabel}}<span ng-if=\"nyaSelect.temporyConfig.formlyRequired\" class=\"textControlLabel\">*</span></label>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"radio\" ng-repeat=\"radioRow in radioRowCollection.rows\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"radio\" name=\"optionsRadios\" id=\"{{'optionsRadio-' + $index}}\" value=\"$index\" checked=\"\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{radioRow.option}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"help-block\">{{nyaSelect.temporyConfig.formlyDesciption}}</p>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>                            \n\n\t\t\t\t\t\t\t\t\t\t\t\t</div>                    \n\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"greyText\"><i class=\"fa fa-pencil-square-o\"></i>&nbsp; {{'EDIT_PROPERTIES' | translate}} :</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-3 col-md-3\">                                       \n\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"radioRowCollection\" class=\" control-label greyText editPropertiesLabel\">{{'ADD_NEW_RADIO' | translate}} :</label>  \n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-9 col-xs-9 col-md-9 col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"inputAddNewRadioOption\" placeholder=\"{{'ADD_RADIO_PLACEHOLD' | translate}}\" ng-model=\"newOptionRadio.saisie\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-3 col-xs-3 col-md-3 col-lg-3\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary\" ng-click=\"addNewOptionRadio()\">{{'ADD' | translate}}</button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-3 col-md-3\">                                       \n\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"radioRowCollection\" class=\" control-label greyText editPropertiesLabel\">{{'EDIT_REMOVE_RADIO' | translate}} :</label>  \n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class-\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"container\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div ng-show=\"radioRowCollection.rows.length === 0\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"text-center greyText\"><em>- {{'NO_RADIO_ADD_NEW' | translate}} -</em></h5>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>  \n\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table ng-if=\"radioRowCollection.rows.length > 0\" class=\"table table-striped\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th st-ratio=\"20\">{{'ORDER' | translate}}</th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th st-ratio=\"55\">{{'OPTION' | translate}}</th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th st-ratio=\"25\"></th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th st-ratio=\"20\"></th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th st-ratio=\"55\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input ng-model=\"radioFilter\" placeholder=\"{{'SEARCH_4_OPTION' | translate}}\" class=\"input-sm form-control\" type=\"search\"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th st-ratio=\"25\"></th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>  \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr ng-repeat=\"radioRow in radioRowCollection.rows | filter:radioFilter as radioRow\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td st-ratio=\"20\">{{$index}}</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td st-ratio=\"55\">{{radioRow.option}}</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td st-ratio=\"25\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"pull-right\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary\" ng-click=\"upThisRadioRow($index)\"><i class=\"fa fa-arrow-up\"></i></button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary\" ng-click=\"downThisRadioRow($index)\"><i class=\"fa fa-arrow-down\"></i></button>    \n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-danger\" ng-click=\"removeRadioRow($index)\"><i class=\"fa fa-trash-o\"></i></button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>   \n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"marginTopFivepixels\"></div>\n\t\t\t\t\t\t\t\t\t\t\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextLabelUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'LABEL_TEXT' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"nyaSelect.temporyConfig.formlyLabel\" id=\"inputTextLabelUpdate\" placeholder=\"{{'ADD_EDIT_LABEL_HERE' | translate}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"marginTopFivepixels\"></div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextRequiredUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'REQUIRED' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"checkboxCssCorrection\">&nbsp;</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" ng-model=\"nyaSelect.temporyConfig.formlyRequired\" id=\"inputTextRequiredUpdate\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"marginTopFivepixels\"></div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextDescriptionUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'DESCRIPTION' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"nyaSelect.temporyConfig.formlyDesciption\" id=\"inputTextDescriptionUpdate\" placeholder=\"{{'ADDEDIT_DESCRIPTION' | translate}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div> \n\t\t\t\t</div>\n\n\t\t\t\t<div ng-switch-when=\"Checkbox\">\n\t\t\t\t\t\t\t\t<!-- checkbox -->\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"greyText\"><i class=\"fa fa-eye\"></i>&nbsp; {{'PREVIEW_TAB' | translate}} :</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t\t<hr/> \n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">                                \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"checkbox\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" id=\"checkBox\"> <span class=\"blackText\">{{nyaSelect.temporyConfig.formlyLabel}}</span><span ng-if=\"nyaSelect.temporyConfig.formlyRequired\" class=\"textControlLabel\">*</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"help-block\">{{nyaSelect.temporyConfig.formlyDesciption}}</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>                   \n\n\t\t\t\t\t\t\t\t\t\t\t\t</div>                    \n\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div> \n\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"greyText\"><i class=\"fa fa-pencil-square-o\"></i>&nbsp; {{'EDIT_PROPERTIES' | translate}} :</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextLabelUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'LABEL_TEXT' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"nyaSelect.temporyConfig.formlyLabel\" id=\"inputTextLabelUpdate\" placeholder=\"{{'ADD_EDIT_LABEL_HERE' | translate}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"marginTopFivepixels\"></div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextRequiredUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'REQUIRED' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"checkboxCssCorrection\">&nbsp;</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" ng-model=\"nyaSelect.temporyConfig.formlyRequired\" id=\"inputTextRequiredUpdate\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"marginTopFivepixels\"></div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextDescriptionUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'DESCRIPTION' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"nyaSelect.temporyConfig.formlyDesciption\" id=\"inputTextDescriptionUpdate\" placeholder=\"{{'ADDEDIT_DESCRIPTION' | translate}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div> \n\t\t\t\t</div>\n\n\t\t\t\t<div ng-switch-when=\"BasicSelect\">\n\n\t\t\t\t\t\t\t\t<!--  basic selects -->\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"greyText\"><i class=\"fa fa-eye\"></i>&nbsp; {{'PREVIEW_TAB' | translate}} :</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"basicSelect\" class=\"control-label textControlLabel\">{{nyaSelect.temporyConfig.formlyLabel}}<span ng-if=\"nyaSelect.temporyConfig.formlyRequired\" class=\"textControlLabel\">*</span></label>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ol class=\"nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12\" ng-model=\"modelbasicSelect\" id=\"basicSelect\" disabled=\"basicSelectRowCollection.rows.length === 0\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class=\"nya-bs-option\" nya-bs-option=\"basicSelectRow in basicSelectRowCollection.rows\" value=\"$index\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a>{{basicSelectRow.option}}</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</ol>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"help-block\">{{nyaSelect.temporyConfig.formlyDesciption}}</p>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>                    \n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"greyText\"><i class=\"fa fa-pencil-square-o\"></i>&nbsp; {{'EDIT_PROPERTIES' | translate}} :</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-3 col-md-3\">                                       \n\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"basicSelectRowCollection\" class=\" control-label greyText editPropertiesLabel\">{{'ADD_NEW_OPTIONS' | translate}} :</label>  \n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-9 col-xs-9 col-md-9 col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"inputAddNewBasicOption\" placeholder=\"{{'ADD_A_NEW_OPTION' | translate}}\" ng-model=\"newOptionBasicSelect.saisie\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-3 col-xs-3 col-md-3 col-lg-3\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary\" ng-click=\"addNewOptionBasicSelect()\">{{'ADD' | translate}}</button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>                            \n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-3 col-md-3\">                                       \n\t\t\t\t\t\t\t\t\t\t\t\t\t<label  class=\" control-label greyText editPropertiesLabel\">{{'EDIT_REMOVE_OPTIONS' | translate}} :</label>  \n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class-\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"container\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div ng-if=\"basicSelectRowCollection.rows.length === 0\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"text-center greyText\"><em>- {{'NO_OPTION_ADD_NEW' | translate}} -</em></h5>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>  \n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table ng-if=\"basicSelectRowCollection.rows.length > 0\" class=\"table table-striped\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th st-ratio=\"20\">{{'ORDER' | translate}}</th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th st-ratio=\"55\">{{'OPTION' | translate}}</th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th st-ratio=\"25\"></th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th st-ratio=\"20\"></th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th st-ratio=\"55\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input ng-model=\"basicSelectFilter\" placeholder=\"{{'SEARCH_4_OPTION' | translate}}\" class=\"input-sm form-control\" type=\"search\"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th st-ratio=\"25\"></th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr ng-repeat=\"basicSelectRow in basicSelectRowCollection.rows | filter:basicSelectFilter as basicSelectRow\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td st-ratio=\"20\">{{$index}}</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td st-ratio=\"55\">{{basicSelectRow.option}}</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td st-ratio=\"25\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"pull-right\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary\" ng-click=\"upThisRow($index)\"><i class=\"fa fa-arrow-up\"></i></button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary\" ng-click=\"downThisRow($index)\"><i class=\"fa fa-arrow-down\"></i></button>    \n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-danger\" ng-click=\"removeRow($index)\"><i class=\"fa fa-trash-o\"></i></button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>   \n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\n\t\t\t\t\t\t\t\t\t\t<!--<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextRequiredUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">Required :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"checkboxCssCorrection\">&nbsp;</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" ng-model=\"nyaSelect.temporyConfig.formlyRequired\" id=\"inputTextRequiredUpdate\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div> -->                           \n\n\n\t\t\t\t\t\t\t\t\t\t\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"marginTopFivepixels\"></div>\n\t\t\t\t\t\t\t\t\t\t\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextDescriptionUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'DESCRIPTION' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"nyaSelect.temporyConfig.formlyDesciption\" id=\"inputTextDescriptionUpdate\" placeholder=\"{{'ADDEDIT_DESCRIPTION' | translate}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div> \n\t\t\t\t</div>                \n\n\n\t\t\t\t<!-- grouped selects -->\n\t\t\t\t<div ng-switch-when=\"GroupedSelect\">\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"greyText\"><i class=\"fa fa-eye\"></i>&nbsp; {{'PREVIEW_TAB' | translate}} :</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"select\" class=\"control-label textControlLabel\">{{nyaSelect.temporyConfig.formlyLabel}}<span ng-if=\"nyaSelect.temporyConfig.formlyRequired\" class=\"textControlLabel\">*</span></label>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ol class=\"nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12\" ng-model=\"modelGroupedSelect\" data-live-search=\"true\" disabled=\"groupedSelectRowCollection.rows.length === 0\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li nya-bs-option=\"groupedSelectRow in groupedSelectRowCollection.rows group by groupedSelectRow.group\" value=\"$index\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"dropdown-header\">{{groupedSelectRow.group}}</span> \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>{{groupedSelectRow.option}}</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"glyphicon glyphicon-ok check-mark\"></span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</ol>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"help-block\">{{nyaSelect.temporyConfig.formlyDesciption}}</p>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t</div>                    \n\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"greyText\"><i class=\"fa fa-pencil-square-o\"></i>&nbsp; {{'EDIT_PROPERTIES' | translate}} :</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div> \n\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-3 col-md-3\">                                       \n\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"groupedSelectRowCollection\" class=\" control-label greyText editPropertiesLabel\">{{'ADD_NEW_OPTIONS' | translate}} :</label>  \n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-9 col-xs-9 col-md-9 col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"inputAddNewGroupedOption\" placeholder=\"{{'ADD_A_NEW_OPTION' | translate}}\" ng-model=\"newOptionGroupedSelect.saisie\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-3 col-xs-3 col-md-3 col-lg-3\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary\" ng-click=\"addNewOptionGroupedSelect()\">{{'ADD' | translate}}</button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div> \n\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-3 col-md-3\">                                       \n\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"groupedSelectRowCollection\" class=\" control-label greyText editPropertiesLabel\">{{'ADD_NEW_GROUPS' | translate}} :</label>  \n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-9 col-xs-9 col-md-9 col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input  id=\"inputAddNewGroupGroupedOption\" type=\"text\" class=\"form-control\" ng-model=\"newGroupGroupedSelect.saisie\" id=\"inputTextLabelUpdateGroupedSelect\" placeholder=\"{{'ADD_A_NEW_GROUP' | translate}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-3 col-xs-3 col-md-3 col-lg-3\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary\" ng-click=\"addNewGroupToGroupedSelect()\">{{'ADD' | translate}}</button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-3 col-md-3\">                                       \n\t\t\t\t\t\t\t\t\t\t\t\t\t<label  class=\" control-label greyText editPropertiesLabel\">{{'EDIT_GROUPS_OPTIONS' | translate}} :</label>  \n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class-\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"container\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div ng-if=\"groupedSelectRowCollection.rows.length === 0\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"text-center greyText\"><em>- {{'NO_OPTION_ADD_NEW' | translate}} -</em></h5>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>  \n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table ng-if=\"groupedSelectRowCollection.rows.length > 0\" class=\"table table-striped\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th st-ratio=\"20\">{{'ORDER' | translate}}</th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th st-ratio=\"25\">{{'GROUP' | translate}}</th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th st-ratio=\"30\">{{'OPTION' | translate}}</th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th st-ratio=\"25\"></th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th st-ratio=\"20\"></th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th st-ratio=\"25\"></th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th st-ratio=\"30\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input ng-model=\"groupedSelectFilter\" placeholder=\"{{'SEARCH_4_OPTION' | translate}}\" class=\"input-sm form-control\" type=\"search\"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th st-ratio=\"25\"></th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr ng-repeat=\"groupedSelectRow in groupedSelectRowCollection.rows | filter:groupedSelectFilter as groupedSelectRow\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td st-ratio=\"20\">{{$index}}</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td st-ratio=\"25\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div ng-if=\"groupSelectGroupClick.showList === true\">          \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div ng-if=\"GroupedSelectGroups.list.length === 0\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"text-left noGroupText\">- {{'NO_GROUP_ADD_NEW' | translate}} -</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div ng-if=\"GroupedSelectGroups.list.length > 0\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ol class=\"nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12 editGroupedSelectnyaSelect\" ng-model=\"groupedSelectRow.group\" id=\"modelGroupedOptionGroupedChoose\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdisabled=\"GroupedSelectGroups.list.length === 0\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class=\"nya-bs-option\" nya-bs-option=\"GroupedSelectGroup in GroupedSelectGroups.list\" value=\"GroupedSelectGroup\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a>{{GroupedSelectGroup}}</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</ol> \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div ng-if=\"groupSelectGroupClick.showList === false\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{groupedSelectRow.group}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td st-ratio=\"30\">{{groupedSelectRow.option}}</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td st-ratio=\"25\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"pull-right\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary\" ng-click=\"upThisGroupedSelectRow($index)\"><i class=\"fa fa-arrow-up\"></i></button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary\" ng-click=\"downThisGroupedSelectRow($index)\"><i class=\"fa fa-arrow-down\"></i></button>  \n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-warning\" ng-click=\"showGroupListToChoose()\"><i class=\"fa fa-pencil-square-o\"></i> </button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-danger\" ng-click=\"removeGroupedSelectRow($index)\"><i class=\"fa fa-trash-o\"></i></button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>   \n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"marginTopFivepixels\"></div>\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputTextDescriptionUpdate\" class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{'DESCRIPTION' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-9\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"nyaSelect.temporyConfig.formlyDesciption\" id=\"inputTextDescriptionUpdate\" placeholder=\"{{'ADDEDIT_DESCRIPTION' | translate}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>                                              \n\t\t\t\t</div>   \n\n\t\t</div>\n</div>\n\n<div class=\"modal-footer\">\n\t\t<button class=\"btn btn-primary\" ng-class=\"{'disabled': nyaSelect.selectedControl === 'none'}\" ng-click=\"ok()\">{{'OK' | translate}}</button>\n\t\t<button class=\"btn btn-warning\" ng-click=\"cancel()\">{{'CANCEL' | translate}}</button>\n</div>\n\n";
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("f", [], true, function(require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = "<section id=\"pageWfEdit\">\n\t\n\t<div ng-init=\"\">\n\t\t<div class=\"container\">\n\n\t\t\t<section id=\"preview\">\n\t\t\t\t<div id=\"preview-content\">\n\t\t\t\t\t<div class=\"content-container\">\n\t\t\t\t\t\t\t<!-- taoster alert -->\n\t\t\t\t\t\t\t<toaster-container  toaster-options=\"{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'position-class': 'toast-top-full-width', \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'extendedTimeout':500,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'timeOut':500,                          \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\">\n\t\t\t\t\t\t\t</toaster-container>\n\n\t\t\t\t\t\t<tabset justified=\"true\">\n\n\t\t\t\t\t\t\n\n\t\t\t\t\t\t\t<tab active=\"tab.editTab.active\" heading=\"{{'EDIT_TAB' | translate}}\">\n\n\t\t\t\t\t\t\t\t<div class=\"row\">\t\t\t\t\t\t\t\t\t\t\t\n\n\t\t\t\t\t\t\t\t<!-- STEP INDICATOR -->\n\t\t\t\t\t\t\t\t<div class=\"row stepwizardTopmargin\">\n\t\t\t\t\t\t\t\t\t<div class=\"col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2\">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<div class=\"stepwizard\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"row stepwizard-row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"stepwizard-step col-md-3\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-circle\" ng-class=\"{'btn-primary': configuration.stepIndicators[0], 'btn-default': !configuration.stepIndicators[0]}\" >0</button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>{{'WIZARD_LINES' | translate}}</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"stepwizard-step col-md-3\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-circle\" ng-class=\"{'btn-primary': configuration.stepIndicators[1], 'btn-default': !configuration.stepIndicators[1], 'disabled': (configuration.configStepCounter < 1)}\"  >1</button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>{{'WIZARD_LAYOUT' | translate}}</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"stepwizard-step col-md-3\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-default btn-circle\" ng-class=\"{'btn-primary': configuration.stepIndicators[2], 'btn-default': !configuration.stepIndicators[2], 'disabled': (configuration.configStepCounter < 2)}\" >2</button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>{{'WIZARD_CONTROLS' | translate}}</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"stepwizard-step col-md-3\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-default btn-circle\" ng-class=\"{'btn-primary': configuration.stepIndicators[3], 'btn-default': !configuration.stepIndicators[3], 'disabled': (configuration.configStepCounter < 3)}\" >3</button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>{{'WIZARD_SAVE' | translate}}</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"row\">\n\n\t\t\t\t\t\t\t\t<ul class=\"pager\">\n\n\t\t\t\t\t\t\t\t\t<li ng-class=\"{'disabled':stepIndicators[0]}\">\n\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary customPagerButton\" ng-click=\"previousConfigStep()\" >\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-arrow-left fa-2x pull-left\"></i>\n\t\t\t\t\t\t\t\t\t\t\t<span class=\"pull-right\">{{'PAGER_PREVIOUS' | translate}}</span>\n\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t</li>\n\n\t\t\t\t\t\t\t\t\t<li ng-class=\"{'disabled':stepIndicators[3]}\">\n\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary customPagerButton\" ng-click=\"nextConfigStep()\">\n\t\t\t\t\t\t\t\t\t\t\t<span class=\"pull-left\">{{'PAGER_NEXT' | translate}}</span>\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-arrow-right fa-2x pull-right\"></i>\n\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t</ul>\n\n\n\t\t\t\t\t\t\t\t\t<div class=\"animate-switch-container\" ng-switch on=\"configuration.listConfigStep[configuration.configStepCounter]\">\n\n\t\t\t\t\t\t\t\t\t<div class=\"animate-switch\" ng-switch-when=\"init\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-4\" >\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div id=\"commandPanel\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div  class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"panel-heading\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 class=\"panel-title\"><i class=\"fa fa-keyboard-o\"></i>&nbsp;{{'COMMAND_PANEL' | translate}}</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"addNewLine\">{{'ADD_NEW_LINE' | translate}} :</span>&nbsp;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary\" ng-click=\"addNewline()\"><i class=\"fa fa-plus fa-1x\"></i></button>\t\t\t\t\t\t\t\t\t\t\t\t  \t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\t    \t\n\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-8\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div id=\"visualPanel\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div  class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"panel-heading\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 class=\"panel-title\"><i class=\"fa fa-eye\"></i>&nbsp;{{'VISUAL_PANEL' | translate}}</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- lines -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ul class=\"list-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class=\"list-group-item\" ng-repeat=\"line in configuration.lines track by $index\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- columns -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div ng-switch on=\"line.columns.length\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"row linesList\" ng-switch-when=\"1\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12 lineCommandButtons\" ng-show=\"configuration.lines.length > 1\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-warning\" ng-hide=\"$index==0\" ng-click=\"upThisLine($index)\"><i class=\"fa fa-arrow-up\"></i></button>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-warning\" ng-hide=\"$index==(configuration.lines.length-1)\" ng-click=\"downThisLine($index)\"><i class=\"fa fa-arrow-down\"></i></button>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-danger pull-right\" ng-click=\"removeThisLine($index)\"><i class=\"fa fa-trash-o\"></i></button>\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12 well\">\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-lg btn-block  btn-default disabled\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{line.columns[0].control.type !== 'none'  ? line.columns[0].control.type + ' ' + line.columns[0].control.subtype || '' : 'column 1'}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"row linesList\" ng-switch-when=\"2\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12 lineCommandButtons\" ng-show=\"configuration.lines.length > 1\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-warning\" ng-hide=\"$index==0\" ng-click=\"upThisLine($index)\"><i class=\"fa fa-arrow-up\"></i></button>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-warning\" ng-hide=\"$index==(configuration.lines.length-1)\" ng-click=\"downThisLine($index)\"><i class=\"fa fa-arrow-down\"></i></button>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-danger pull-right\" ng-click=\"removeThisLine($index)\"><i class=\"fa fa-trash-o\"></i></button>\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    \t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-6 well\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-lg btn-block  btn-default disabled\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{line.columns[0].control.type !== 'none'  ? line.columns[0].control.type + ' ' + line.columns[0].control.subtype || '' : 'column 1'}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-6 well\">\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-lg btn-block  btn-default disabled\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{line.columns[1].control.type !== 'none'  ? line.columns[1].control.type + ' ' + line.columns[1].control.subtype || '' : 'column 2'}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button> \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t    \t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"row linesList\" ng-switch-when=\"3\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12 lineCommandButtons\" ng-show=\"configuration.lines.length > 1\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-warning\" ng-hide=\"$index==0\" ng-click=\"upThisLine($index)\"><i class=\"fa fa-arrow-up\"></i></button>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-warning\" ng-hide=\"$index==(configuration.lines.length-1)\" ng-click=\"downThisLine($index)\"><i class=\"fa fa-arrow-down\"></i></button>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-danger pull-right\" ng-click=\"removeThisLine($index)\"><i class=\"fa fa-trash-o\"></i></button>\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    \t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-4 well\">\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-lg btn-block  btn-default disabled\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{line.columns[0].control.type !== 'none'  ? line.columns[0].control.type + ' ' + line.columns[0].control.subtype || '' : 'column 1'}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-4 well\">\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-lg btn-block  btn-default disabled\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{line.columns[1].control.type !== 'none'  ? line.columns[1].control.type + ' ' + line.columns[1].control.subtype || '' : 'column 2'}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-4 well\">\t   \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-lg btn-block  btn-default disabled\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{line.columns[2].control.type !== 'none'  ? line.columns[2].control.type + ' ' + line.columns[2].control.subtype || '' : 'column 3'}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button> \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t    \t\t\t\t\t\t\t\t    \t\t\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</ul>\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t<div class=\"animate-switch\" ng-switch-when=\"first\">\n\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-4\">\n\n\t\t\t\t\t\t\t\t\t\t\t<div id=\"commandPanel\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div  class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"panel-heading\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 class=\"panel-title\"><i class=\"fa fa-keyboard-o\"></i>&nbsp;{{'COMMAND_PANEL' | translate}}</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h4 class=\"numberOfcolumsText text-center\"><i>- {{'SELECTED_LINE' | translate}} -</i></h4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h4 class=\"numberOfcolumsText text-center\">{{'NUMBER_OF_COLUMN' | translate}} :</h4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-2 col-xs-offset-3 col-sm-2 col-sm-offset-3 col-md-2 col-md-offset-3\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary pull-right btnMinusColumns\" ng-click=\"decreaseNumberOfColumns()\"><i class=\"fa fa-minus fa-1x\"></i></button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-2 col-sm-2 col-md-2 text-center\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"numberOfColumnsLabel \">{{configuration.lines[configuration.activeLine -1].columns.length}}</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-2 col-sm-2 col-md-2\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary pull-left btnAddColumns\" ng-click=\"increaseNumberOfColumns()\"><i class=\"fa fa-plus fa-1x\"></i></button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t   \t\t\t\t\t\t\t\t\t\t   \t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t</div>\t    \t\n\n\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-8\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t<div id=\"visualPanel\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div  class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"panel-heading\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 class=\"panel-title\"><i class=\"fa fa-eye\"></i>&nbsp;{{'VISUAL_PANEL' | translate}}</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- lines / columns -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ul class=\"list-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class=\"list-group-item\" ng-repeat=\"line in configuration.lines track by $index\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- columns -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div ng-switch on=\"line.columns.length\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"row linesList\" ng-switch-when=\"1\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12 lineCommandButtons\" ng-show=\"configuration.lines.length > 1\">\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn\" ng-class=\"{'btn-warning':($index + 1) !== configuration.activeLine, 'btn-success': ($index + 1) === configuration.activeLine}\" ng-click=\"setActiveLineNumber($index + 1)\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa\"  ng-class=\"{'fa-square-o': ($index + 1) !== configuration.activeLine, 'fa-check-square-o': ($index + 1) === configuration.activeLine}\"></i>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12 well\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-lg btn-block  btn-default disabled\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{line.columns[0].control.type !== 'none'  ? line.columns[0].control.type + ' ' + line.columns[0].control.subtype || '' : 'column 1'}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"row linesList\" ng-switch-when=\"2\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12 lineCommandButtons\" ng-show=\"configuration.lines.length > 1\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn\" ng-class=\"{'btn-warning':($index + 1) !== configuration.activeLine, 'btn-success': ($index + 1) === configuration.activeLine}\" ng-click=\"setActiveLineNumber($index + 1)\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa\"  ng-class=\"{'fa-square-o': ($index + 1) !== configuration.activeLine, 'fa-check-square-o': ($index + 1) === configuration.activeLine}\"></i>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    \t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-6 well\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-lg btn-block  btn-default disabled\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{line.columns[0].control.type !== 'none'  ? line.columns[0].control.type + ' ' + line.columns[0].control.subtype || '' : 'column 1'}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-6 well\">\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-lg btn-block  btn-default disabled\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{line.columns[1].control.type !== 'none'  ? line.columns[1].control.type + ' ' + line.columns[1].control.subtype || '' : 'column 2'}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t    \t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"row linesList\" ng-switch-when=\"3\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12 lineCommandButtons\" ng-show=\"configuration.lines.length > 1\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn\" ng-class=\"{'btn-warning':($index + 1) !== configuration.activeLine, 'btn-success': ($index + 1) === configuration.activeLine}\" ng-click=\"setActiveLineNumber($index + 1)\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa\"  ng-class=\"{'fa-square-o': ($index + 1) !== configuration.activeLine, 'fa-check-square-o': ($index + 1) === configuration.activeLine}\"></i>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    \t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-4 well\">\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-lg btn-block  btn-default disabled\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{line.columns[0].control.type !== 'none'  ? line.columns[0].control.type + ' ' + line.columns[0].control.subtype || '' : 'column 1'}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-4 well\">\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-lg btn-block  btn-default disabled\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{line.columns[1].control.type !== 'none'  ? line.columns[1].control.type + ' ' + line.columns[1].control.subtype || '' : 'column 2'}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-4 well\">\t   \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-lg btn-block  btn-default disabled\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{line.columns[2].control.type !== 'none'  ? line.columns[2].control.type + ' ' + line.columns[2].control.subtype || '' : 'column 3'}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t    \t\t\t\t\t\t\t\t    \t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</ul>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t<div class=\"animate-switch\" ng-switch-when=\"second\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div id=\"commandPanel\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div  class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"panel-heading\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 class=\"panel-title\"><i class=\"fa fa-keyboard-o\"></i>&nbsp;{{'COMMAND_PANEL' | translate}}</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h4 class=\"numberOfcolumsText text-center\">- {{'APPLY_CTRL2COL' | translate}} -</h4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-lg-12\" >\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<blockquote>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"numberOfcolumsText\"><i class=\"fa fa-minus\"></i>&nbsp; {{'CLIC_TAP_2_OPEN' | translate}}.</p> \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"numberOfcolumsText\"><i class=\"fa fa-minus\"></i>&nbsp; {{'SELECT_2_APPLY_COL' | translate}}.</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</blockquote>\t\t\t\t\t\t\t\t\t\t\t\t   \t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t   \t\t\t\t\t\t\t\t\t\t   \t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\t    \t\n\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-8\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t<div id=\"visualPanel\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div  class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"panel-heading\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 class=\"panel-title\"><i class=\"fa fa-eye\"></i>&nbsp;{{'VISUAL_PANEL' | translate}}</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- lines / columns -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ul class=\"list-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class=\"list-group-item\" ng-repeat=\"line in configuration.lines track by $index\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- columns -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div ng-switch on=\"line.columns.length\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"row linesList\" ng-switch-when=\"1\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12 lineCommandButtons\" ng-show=\"configuration.lines.length > 1\">\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn\" ng-class=\"{'btn-warning':($index + 1) !== configuration.activeLine, 'btn-success': ($index + 1) === configuration.activeLine}\" ng-click=\"setActiveLineNumber($index + 1)\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa\"  ng-class=\"{'fa-square-o': ($index + 1) !== configuration.activeLine, 'fa-check-square-o': ($index + 1) === configuration.activeLine}\"></i>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12 well\">\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-lg btn-block\" ng-class=\"{'btn-primary': !line.columns[0].control.edited, 'btn-success': line.columns[0].control.edited}\" ng-click=\"showModalAddCtrlToColumn('', $index, 0)\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{line.columns[0].control.type !== 'none'  ? line.columns[0].control.type + ' ' + line.columns[0].control.subtype || '' : 'column 1'}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"row linesList\" ng-switch-when=\"2\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12 lineCommandButtons\" ng-show=\"configuration.lines.length > 1\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn\" ng-class=\"{'btn-warning':($index + 1) !== configuration.activeLine, 'btn-success': ($index + 1) === configuration.activeLine}\" ng-click=\"setActiveLineNumber($index + 1)\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa\"  ng-class=\"{'fa-square-o': ($index + 1) !== configuration.activeLine, 'fa-check-square-o': ($index + 1) === configuration.activeLine}\"></i>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    \t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-6 well\">\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-lg btn-block\" ng-class=\"{'btn-primary': !line.columns[0].control.edited, 'btn-success': line.columns[0].control.edited}\" ng-click=\"showModalAddCtrlToColumn('', $index, 0)\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{line.columns[0].control.type !== 'none'  ? line.columns[0].control.type + ' ' + line.columns[0].control.subtype || '' : 'column 1'}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-6 well\">\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-lg btn-block\" ng-class=\"{'btn-primary': !line.columns[1].control.edited, 'btn-success': line.columns[1].control.edited}\" ng-click=\"showModalAddCtrlToColumn('', $index, 1)\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{line.columns[1].control.type !== 'none'  ? line.columns[1].control.type + ' ' + line.columns[1].control.subtype || '' : 'column 2'}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"row linesList\" ng-switch-when=\"3\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12 lineCommandButtons\" ng-show=\"configuration.lines.length > 1\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn\" ng-class=\"{'btn-warning':($index + 1) !== configuration.activeLine, 'btn-success': ($index + 1) === configuration.activeLine}\" ng-click=\"setActiveLineNumber($index + 1)\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa\"  ng-class=\"{'fa-square-o': ($index + 1) !== configuration.activeLine, 'fa-check-square-o': ($index + 1) === configuration.activeLine}\"></i>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t    \t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-4 well\">\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-lg btn-block\" ng-class=\"{'btn-primary': !line.columns[0].control.edited, 'btn-success': line.columns[0].control.edited}\" ng-click=\"showModalAddCtrlToColumn('', $index, 0)\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{line.columns[0].control.type !== 'none'  ? line.columns[0].control.type + ' ' + line.columns[0].control.subtype || '' : 'column 1'}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-4 well\">\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-lg btn-block\" ng-class=\"{'btn-primary': !line.columns[1].control.edited, 'btn-success': line.columns[1].control.edited}\" ng-click=\"showModalAddCtrlToColumn('', $index, 1)\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{line.columns[1].control.type !== 'none'  ? line.columns[1].control.type + ' ' + line.columns[1].control.subtype || '' : 'column 2'}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-4 well\">\t   \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-lg btn-block\" ng-class=\"{'btn-primary': !line.columns[2].control.edited, 'btn-success': line.columns[2].control.edited}\" ng-click=\"showModalAddCtrlToColumn('', $index, 2)\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{line.columns[2].control.type !== 'none'  ? line.columns[2].control.type + ' ' + line.columns[2].control.subtype || '' : 'column 3'}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t    \t\t\t\t\t\t\t\t    \t\t\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</ul>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\n\n\n\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\t\n\n\n\t\t\t\t\t\t\t\t<div class=\"animate-switch\" ng-switch-when=\"third\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div id=\"commandPanel\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div  class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"panel-heading\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 class=\"panel-title\"><i class=\"fa fa-keyboard-o\"></i>&nbsp;{{'COMMAND_PANEL' | translate}}</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputSubmitButtontext\" class=\" greyText control-label\">{{'CUSTOM_SUBMIT_BTN' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"inputSubmitButtontext\" placeholder=\"\" ng-model=\"configuration.submitButtonText\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t    \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputCancelButtontext\" class=\" greyText control-label\">{{'CUSTOM_CANCEL_BTN' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"inputCancelButtontext\" placeholder=\"\" ng-model=\"configuration.cancelButtonText\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t    \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<hr/>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"inputNameFormtext\" class=\" greyText control-label\">{{'NAME_THIS_FORM' | translate}} :</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"inputNameFormtext\" placeholder=\"\" ng-model=\"configuration.formName\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t    \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary btn-block btn-lg\" ng-click=\"saveThisForm()\">{{'SAVE_THIS_FORM' | translate}}</button>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\t    \t\n\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-8\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div id=\"visualPanel\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div  class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"panel-heading\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 class=\"panel-title\"><i class=\"fa fa-thumbs-o-up\"></i>&nbsp;{{'FINAL_STEP' | translate}}</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t<form ng-submit=\"vm.onSubmit()\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<formly-form id=\"saveFormlyFom\" model=\"vm.model\" fields=\"vm.wfFormFields\">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"pull-right\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary\" type=\"submit\">{{configuration.submitButtonText}}</button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary\" type=\"cancel\">{{configuration.cancelButtonText}}</button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</span>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</formly-form>\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t</form>\t\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t</div>\n\n\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</tab>\t\n\n\t\t\t\t\t\t\t<tab active=\"tab.previewTab.active\" ng-if=\"tab.previewTab.tabVisible\" heading=\"{{'PREVIEW_TAB' | translate}}\">\n\n\n\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\t\t\t\t\t\t\t\t\t<!-- formly here -->\n\t\t\t\t\t\t\t\t\t<form ng-submit=\"vm.onSubmit()\">\n\t\t\t\t\t\t\t\t\t\t<formly-form id=\"previewFormlyForm\" model=\"vm.model\" fields=\"vm.wfFormFields\">\n\n\t\t\t\t\t\t\t\t\t\t<span class=\"pull-right\">\n\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary\" type=\"submit\">{{configuration.submitButtonText}}</button>\n\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary\" type=\"cancel\">{{configuration.cancelButtonText}}</button>\n\t\t\t\t\t\t\t\t\t\t\t</span>\n\n\t\t\t\t\t\t\t\t\t\t</formly-form>\n\t\t\t\t\t\t\t\t\t</form>\t\n\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<div ng-if=\"tab.previewTab.modelsVisible\" class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\t\t\t\t\t\t\t\t\t<p>{{'DATA_MODEL' | translate}}</p>\n\t\t\t\t\t\t\t\t\t<pre>\n\t\t\t\t\t\t\t\t\t\t{{vm.model | json}}\n\t\t\t\t\t\t\t\t\t</pre>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div ng-if=\"tab.previewTab.modelsVisible\" class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\t\t\t\t\t\t\t\t\t<p>{{'FIELDS_MODEL' | translate}}</p>\n\t\t\t\t\t\t\t\t\t<pre>\n\t\t\t\t\t\t\t\t\t\t{{vm.wfFormFieldsOnlyNeededProperties | json}}\n\t\t\t\t\t\t\t\t\t</pre>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t</tabset>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</section>\n\n\t\t\t<hr/>\n\t\t\t<!--<section>\n\t\t\t\t<h6 class=\"text-right\">Easy form generator : {{easyFormGeneratorVERSION}} — Erwan DATIN (MacKentoch)</h6>\n\t\t\t</section>-->\n\t\t</div>\n\t</div>\n</section>";
  global.define = __define;
  return module.exports;
});

$__System.register('2', [], function (_export) {
	'use strict';

	var EASY_FORM_VERSION_NAME, EASY_FORM_VERSION_VALUE, ACTIVE_MODAL_ANIMATION;

	function easyFromConfig(easyFormSteWayConfigProvider) {
		//enable/disable easy form modal animation
		//HERE : disabling animation due to angular bootstrap backdrop bug with angular >= 1.4
		easyFormSteWayConfigProvider.setModalAnimation(ACTIVE_MODAL_ANIMATION);
	}

	return {
		setters: [],
		execute: function () {
			EASY_FORM_VERSION_NAME = 'easyFormGenVersion';
			EASY_FORM_VERSION_VALUE = 'v1.1.0';
			ACTIVE_MODAL_ANIMATION = false;
			easyFromConfig.$inject = ['easyFormSteWayConfigProvider'];

			_export('default', easyFromConfig);

			_export('EASY_FORM_VERSION_NAME', EASY_FORM_VERSION_NAME);

			_export('EASY_FORM_VERSION_VALUE', EASY_FORM_VERSION_VALUE);
		}
	};
});
$__System.register("3", [], function (_export) {
	"use strict";

	var richTextTemplate, blankTemplate, subTitleTemplate, basicSelectTemplate, groupedSelectTemplate, datepickerTemplate, validationTemplate;
	return {
		setters: [],
		execute: function () {
			richTextTemplate = "<text-angular name=\"{{id}}\" \n\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"richTextAngular\" \n\t\t\t\t\t\t\t\t\t\t\t\t\t\tng-model=\"model[options.key || index]\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t</text-angular>";
			blankTemplate = "<div></div>";
			subTitleTemplate = "<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h4 class=\"text-center\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{options.templateOptions.placeholder}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h4><hr/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>";
			basicSelectTemplate = " <ol  class=\"nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12\" \n\t\t\t\t\t\t\t\t\tng-model=\"model[options.key || index]\"  \n\t\t\t\t\t\t\t\t\t\tid=\"{{id}}\"  \n\t\t\t\t\t\t\t\t\tdisabled=\"options.templateOptions.options.length === 0\">  \n\t\t\t\t\t\t\t\t\t\t<li class=\"nya-bs-option\" nya-bs-option=\"option in options.templateOptions.options\">  \n\t\t\t\t\t\t\t\t\t\t\t<a>{{option.name}}</a> \n\t\t\t\t\t\t\t\t\t\t</li>  \n\t\t\t\t\t\t\t\t\t</ol>    ";
			groupedSelectTemplate = "<ol class=\"nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12\" \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tng-model=\"model[options.key || index]\" \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdata-live-search=\"true\" \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdisabled=\"options.templateOptions.options.length === 0\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li nya-bs-option=\"option in  options.templateOptions.options group by option.group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"dropdown-header\">{{$group}}</span> \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>{{option.name}}</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"glyphicon glyphicon-ok check-mark\"></span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</ol>";
			datepickerTemplate = "\t<input  id=\"{{id}}\" \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"form-control\" \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tng-click=\"open($event)\" \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tng-model=\"model[options.key  || index]\" \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tis-open=\"to.isOpen\" \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tng-click=\"to.isOpen = true\" \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdatepicker-options=\"to.datepickerOptions\" />";
			validationTemplate = "\n\t<div class=\"formly-template-wrapper form-group\"\n\t\t\t\t\t\tng-class=\"{'has-error': options.validation.errorExistsAndShouldBeVisible}\">\n\t\t\t\t<formly-transclude></formly-transclude>\n\t\t\t\t<div class=\"validation\"\n\t\t\t\t\t\t\tng-if=\"options.validation.errorExistsAndShouldBeVisible\"\n\t\t\t\t\t\t\tng-messages=\"options.formControl.$error\">\n\t\t\t\t\t<div ng-messages-include=\"validation.html\"></div>\n\t\t\t\t\t<div ng-message=\"{{::name}}\" ng-repeat=\"(name, message) in ::options.validation.messages\">\n\t\t\t\t\t\t{{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>";

			_export("richTextTemplate", richTextTemplate);

			_export("blankTemplate", blankTemplate);

			_export("subTitleTemplate", subTitleTemplate);

			_export("basicSelectTemplate", basicSelectTemplate);

			_export("groupedSelectTemplate", groupedSelectTemplate);

			_export("datepickerTemplate", datepickerTemplate);

			_export("validationTemplate", validationTemplate);
		}
	};
});
$__System.register('4', ['3'], function (_export) {
	/* global angular */
	'use strict';

	var richTextTemplate, blankTemplate, subTitleTemplate, basicSelectTemplate, groupedSelectTemplate, datepickerTemplate, validationTemplate;

	function formlyConfig(formlyConfigProvider) {

		formlyConfigProvider.setType({
			name: 'richEditor',
			//wrapper: ['bootstrapLabel', 'bootstrapHasError'],
			template: richTextTemplate
		});

		formlyConfigProvider.setType({
			name: 'blank',
			template: blankTemplate
		});

		formlyConfigProvider.setType({
			name: 'subTitle',
			template: subTitleTemplate
		});

		formlyConfigProvider.setType({
			name: 'basicSelect',
			template: basicSelectTemplate
		});

		formlyConfigProvider.setType({
			name: 'groupedSelect',
			template: groupedSelectTemplate
		});

		////////////////////////////
		// angular UI date picker
		////////////////////////////
		// thx Kent C. Dodds

		var attributes = ['date-disabled', 'custom-class', 'show-weeks', 'starting-day', 'init-date', 'min-mode', 'max-mode', 'format-day', 'format-month', 'format-year', 'format-day-header', 'format-day-title', 'format-month-title', 'year-range', 'shortcut-propagation', 'datepicker-popup', 'show-button-bar', 'current-text', 'clear-text', 'close-text', 'close-on-date-selection', 'datepicker-append-to-body'];

		var bindings = ['datepicker-mode', 'min-date', 'max-date'];

		var ngModelAttrs = {};

		angular.forEach(attributes, function (attr) {
			ngModelAttrs[camelize(attr)] = { attribute: attr };
		});

		angular.forEach(bindings, function (binding) {
			ngModelAttrs[camelize(binding)] = { bound: binding };
		});

		formlyConfigProvider.setType({
			name: 'datepicker',
			template: datepickerTemplate,
			wrapper: ['bootstrapLabel', 'bootstrapHasError'],
			controller: ['$scope', function ($scope) {
				$scope.open = function ($event) {
					$event.preventDefault();
					$event.stopPropagation();
					$scope.opened = true;
				};
			}],
			defaultOptions: {
				ngModelAttrs: ngModelAttrs,
				templateOptions: {
					addonLeft: {
						'class': 'glyphicon glyphicon-calendar',
						onClick: function onClick(options, scope) {
							options.templateOptions.isOpen = !options.templateOptions.isOpen;
						}
					},
					onFocus: function onFocus($viewValue, $modelValue, scope) {
						scope.to.isOpen = !scope.to.isOpen;
					},
					datepickerOptions: {}
				}
			}

		});

		/**
  	* wrappers to show validation errors
  	* without having to rewrite formly types
  	*/
		formlyConfigProvider.setWrapper([{
			template: validationTemplate
		}]);

		function camelize(string) {
			string = string.replace(/[\-_\s]+(.)?/g, function (match, chr) {
				return chr ? chr.toUpperCase() : '';
			});
			// Ensure 1st char is always lowercase
			return string.replace(/^([A-Z])/, function (match, chr) {
				return chr ? chr.toLowerCase() : '';
			});
		}
	}

	return {
		setters: [function (_) {
			richTextTemplate = _.richTextTemplate;
			blankTemplate = _.blankTemplate;
			subTitleTemplate = _.subTitleTemplate;
			basicSelectTemplate = _.basicSelectTemplate;
			groupedSelectTemplate = _.groupedSelectTemplate;
			datepickerTemplate = _.datepickerTemplate;
			validationTemplate = _.validationTemplate;
		}],
		execute: function () {
			formlyConfig.$inject = ['formlyConfigProvider'];

			_export('default', formlyConfig);
		}
	};
});
$__System.register('5', [], function (_export) {
	/* global angular */
	'use strict';

	var CORE_MODULES;
	return {
		setters: [],
		execute: function () {
			CORE_MODULES = ['textAngular', 'textAngularSetup', 'ngAnimate', 'toaster', 'formly', 'formlyBootstrap', 'ui.bootstrap', 'nya.bootstrap.select', 'pascalprecht.translate'];

			_export('default', angular.module('edaStepWayEasyFormGen.core', CORE_MODULES));
		}
	};
});
$__System.register('b', [], function (_export) {
	'use strict';

	var DEBUG_MODEL, initDebugModel, TAB_MODEL, initTabModel, COLUMN_TEMPLATE, initColumnTemplate, LINE_TEMPLATE, initLineTemplate;
	return {
		setters: [],
		execute: function () {
			DEBUG_MODEL = {
				showDebug: false,
				configurationModelNumberofLines: 1
			};

			initDebugModel = function initDebugModel() {
				return DEBUG_MODEL;
			};

			TAB_MODEL = {
				editTab: { active: true },
				previewTab: { active: false }
			};

			initTabModel = function initTabModel() {
				return TAB_MODEL;
			};

			COLUMN_TEMPLATE = {
				numColumn: -1,
				exist: true,
				control: {
					type: 'none',
					key: 'none',
					subtype: 'none'
				}
			};
			// templateOptions: {
			//                     label: 'none',
			//                     placeholder: 'none',
			//                     required: false,
			//                     description: 'Descriptive text'
			//                   }

			initColumnTemplate = function initColumnTemplate() {
				return COLUMN_TEMPLATE;
			};

			LINE_TEMPLATE = {
				line: -1,
				activeColumn: 1,
				columns: [{
					numColumn: 1,
					exist: true,
					control: {
						type: 'none',
						key: 'none'
					}
				}]
			};
			// templateOptions: {
			//                     label: 'none',
			//                     placeholder: 'none',
			//                     required: false,
			//                     description: 'Descriptive text'
			//                   }

			initLineTemplate = function initLineTemplate() {
				return LINE_TEMPLATE;
			};

			_export('initDebugModel', initDebugModel);

			_export('initTabModel', initTabModel);

			_export('initColumnTemplate', initColumnTemplate);

			_export('initLineTemplate', initLineTemplate);
		}
	};
});
$__System.register('d', ['9', 'a'], function (_export) {
	var _createClass, _classCallCheck, EDIT_MODAL_CONTROLLER_NAME, EDIT_MODAL_CONTROLLERAS_NAME, editControlModalController, toInject;

	return {
		setters: [function (_2) {
			_createClass = _2['default'];
		}, function (_a) {
			_classCallCheck = _a['default'];
		}],
		execute: function () {
			/* global angular */
			/* global _ */
			'use strict';

			EDIT_MODAL_CONTROLLER_NAME = 'editControlModalController';
			EDIT_MODAL_CONTROLLERAS_NAME = 'editControlModCtrl';

			editControlModalController = (function () {
				function editControlModalController($modalInstance, nyaSelect, toaster, selectOptionManage, $modalProxy) {
					_classCallCheck(this, editControlModalController);

					this.$modalInstance = $modalInstance;
					this.nyaSelect = nyaSelect;
					this.toaster = toaster;
					this.selectOptionManage = selectOptionManage;
					this.$modalProxy = $modalProxy;

					this.init();
				}

				_createClass(editControlModalController, [{
					key: 'init',
					value: function init() {
						var initOptionModel = { rows: [] };

						this.radioRowCollection = initOptionModel;
						this.newOptionRadio = { saisie: '' };
						this.basicSelectRowCollection = initOptionModel;
						this.newOptionBasicSelect = { saisie: '' };
						this.groupedSelectRowCollection = initOptionModel;
						this.newOptionGroupedSelect = { saisie: '' };
						this.GroupedSelectGroups = { list: [] };
						this.newGroupGroupedSelect = { saisie: '' };
						this.groupSelectGroupClick = { showList: false };
						this.demodt = {};
						this.dateOptions = this.dateOptionsInit();
						this.demodt.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
						this.nyaSelect.selectedControl = this.nyaSelect.temporyConfig.selectedControl;

						//init today date
						this.today();
						//init nyaSelect model depending selected control
						this.initNyaSelectConformingSelectedControl();
					}
				}, {
					key: 'initNyaSelectConformingSelectedControl',
					value: function initNyaSelectConformingSelectedControl() {
						//place nya-select to selection if not none :
						if (this.nyaSelect.selectedControl !== 'none') {
							for (var i = this.nyaSelect.controls.length - 1; i >= 0; i--) {
								if (this.nyaSelect.controls[i].id === this.nyaSelect.selectedControl) {
									this.modelNyaSelect = this.nyaSelect.controls[i];
								}
							}
							if (this.nyaSelect.selectedControl === 'BasicSelect') {
								this.bindBasicSelectFromNYA();
							}
							if (this.nyaSelect.selectedControl === 'GroupedSelect') {
								this.bindGroupedSelectFromNYA();
							}
							if (this.nyaSelect.selectedControl === 'Radio') {
								this.bindRadioFromNYA();
							}
						}
					}
				}, {
					key: 'bindBasicSelectFromNYA',
					value: function bindBasicSelectFromNYA() {
						if (this.nyaSelect.temporyConfig.formlyOptions.length > 0) {
							for (var i = 0; i <= this.nyaSelect.temporyConfig.formlyOptions.length - 1; i++) {
								var newOption = {
									'option': this.nyaSelect.temporyConfig.formlyOptions[i].name,
									'order': i,
									'group': ''
								};
								this.basicSelectRowCollection.rows.push(newOption);
							}
						}
					}
				}, {
					key: 'bindRadioFromNYA',
					value: function bindRadioFromNYA() {
						if (this.nyaSelect.temporyConfig.formlyOptions.length > 0) {
							for (var i = 0; i <= this.nyaSelect.temporyConfig.formlyOptions.length - 1; i++) {
								var newOption = {
									'option': this.nyaSelect.temporyConfig.formlyOptions[i].name,
									'order': i,
									'group': ''
								};
								this.radioRowCollection.rows.push(newOption);
							}
						}
					}
				}, {
					key: 'bindGroupedSelectFromNYA',
					value: function bindGroupedSelectFromNYA() {
						if (this.nyaSelect.temporyConfig.formlyOptions.length > 0) {
							for (var i = 0; i <= this.nyaSelect.temporyConfig.formlyOptions.length - 1; i++) {
								var newOption = {
									'option': this.nyaSelect.temporyConfig.formlyOptions[i].name,
									'order': i,
									'group': this.nyaSelect.temporyConfig.formlyOptions[i].group
								};
								this.groupedSelectRowCollection.rows.push(newOption);
							}
							//grouplist : thx to lodash it is easy
							var filteredgroup = _.uniq(_.pluck(this.groupedSelectRowCollection.rows, 'group'));
							angular.copy(filteredgroup, this.GroupedSelectGroups.list);
						}
					}
				}, {
					key: 'addNewOptionRadio',
					value: function addNewOptionRadio() {
						var result = this.selectOptionManage.addNewOptionRadio(this.radioRowCollection, $scope.newOptionRadio.saisie);
						if (result.resultFlag === false) {
							this.toaster.pop({
								type: 'warning',
								timeout: 2000,
								title: result.details,
								body: '\'' + this.newOptionRadio.saisie + '\' cannot be added.',
								showCloseButton: true
							});
						}
						this.newOptionRadio = { saisie: '' }; //reset input
					}
				}, {
					key: 'removeRadioRow',
					value: function removeRadioRow(index) {
						var result = this.selectOptionManage.removeOption(this.radioRowCollection, index);
						if (result.resultFlag === false) {
							this.toaster.pop({
								type: 'warning',
								timeout: 2000,
								title: result.details,
								body: 'Delete was cancelled.',
								showCloseButton: true
							});
						}
					}
				}, {
					key: 'upThisRadioRow',
					value: function upThisRadioRow(index) {
						var result = this.selectOptionManage.upthisOption(this.radioRowCollection, index);
						if (result.resultFlag === false) {
							this.toaster.pop({
								type: 'warning',
								timeout: 2000,
								title: result.details,
								body: 'Operation cancelled.',
								showCloseButton: true
							});
						}
					}
				}, {
					key: 'downThisRadioRow',
					value: function downThisRadioRow(index) {
						var result = this.selectOptionManage.downthisOption(this.radioRowCollection, index);
						if (result.resultFlag === false) {
							this.toaster.pop({
								type: 'warning',
								timeout: 2000,
								title: result.details,
								body: 'Operation cancelled.',
								showCloseButton: true
							});
						}
					}
				}, {
					key: 'addNewOptionBasicSelect',
					value: function addNewOptionBasicSelect() {
						var result = this.selectOptionManage.addNewOptionBasicSelect(this.basicSelectRowCollection, $scope.newOptionBasicSelect.saisie);
						if (result.resultFlag === false) {
							this.toaster.pop({
								type: 'warning',
								timeout: 2000,
								title: result.details,
								body: '\'' + this.newOptionBasicSelect.saisie + '\' cannot be added.',
								showCloseButton: true
							});
						}
						this.newOptionBasicSelect = { saisie: '' }; //reset input
					}
				}, {
					key: 'removeRow',
					value: function removeRow(index) {
						var result = this.selectOptionManage.removeOption(this.basicSelectRowCollection, index);
						if (result.resultFlag === false) {
							this.toaster.pop({
								type: 'warning',
								timeout: 2000,
								title: result.details,
								body: 'Delete was cancelled.',
								showCloseButton: true
							});
						}
					}
				}, {
					key: 'upThisRow',
					value: function upThisRow(index) {
						var result = this.selectOptionManage.upthisOption(this.basicSelectRowCollection, index);
						if (result.resultFlag === false) {
							this.toaster.pop({
								type: 'warning',
								timeout: 2000,
								title: result.details,
								body: 'Operation cancelled.',
								showCloseButton: true
							});
						}
					}
				}, {
					key: 'downThisRow',
					value: function downThisRow(index) {
						var result = this.selectOptionManage.downthisOption(this.basicSelectRowCollection, index);
						if (result.resultFlag === false) {
							this.toaster.pop({
								type: 'warning',
								timeout: 2000,
								title: result.details,
								body: 'Operation cancelled.',
								showCloseButton: true
							});
						}
					}
				}, {
					key: 'showGroupListToChoose',
					value: function showGroupListToChoose() {
						this.groupSelectGroupClick.showList = !this.groupSelectGroupClick.showList;
					}
				}, {
					key: 'addNewGroupToGroupedSelect',
					value: function addNewGroupToGroupedSelect() {
						if (this.newGroupGroupedSelect.saisie !== '') {
							for (var i = this.GroupedSelectGroups.list.length - 1; i >= 0; i--) {
								if (this.GroupedSelectGroups.list[i] === this.newGroupGroupedSelect.saisie) {
									this.toaster.pop({
										type: 'warning',
										timeout: 2000,
										title: 'Group already exists',
										body: 'No group added.',
										showCloseButton: true
									});
								}
							}
							this.GroupedSelectGroups.list.push(this.newGroupGroupedSelect.saisie);
						} else {
							this.toaster.pop({
								type: 'warning',
								timeout: 2000,
								title: 'Not a valid group to add',
								body: 'No group added.',
								showCloseButton: true
							});
						}
						this.newGroupGroupedSelect.saisie = '';
					}
				}, {
					key: 'addNewOptionGroupedSelect',
					value: function addNewOptionGroupedSelect() {
						var result = this.selectOptionManage.addNewOptionGroupedSelect(this.groupedSelectRowCollection, $scope.newOptionGroupedSelect.saisie, '');
						if (result.resultFlag === false) {
							this.toaster.pop({
								type: 'warning',
								timeout: 2000,
								title: result.details,
								body: '\'' + this.newOptionGroupedSelect.saisie + '\' cannot be added.',
								showCloseButton: true
							});
						}
						//bind nya : dont bind here $apply is not done fast enough
						//bindGroupedSelectToNya();
						//reset input
						this.newOptionGroupedSelect = { saisie: '' };
					}
				}, {
					key: 'removeGroupedSelectRow',
					value: function removeGroupedSelectRow(index) {
						var result = this.selectOptionManage.removeOption(this.groupedSelectRowCollection, index);
						if (result.resultFlag === false) {
							this.toaster.pop({
								type: 'warning',
								timeout: 2000,
								title: result.details,
								body: 'Delete was cancelled.',
								showCloseButton: true
							});
						}
					}
				}, {
					key: 'upThisGroupedSelectRow',
					value: function upThisGroupedSelectRow(index) {
						var result = this.selectOptionManage.upthisOption(this.groupedSelectRowCollection, index);
						if (result.resultFlag === false) {
							this.toaster.pop({
								type: 'warning',
								timeout: 2000,
								title: result.details,
								body: 'Operation cancelled.',
								showCloseButton: true
							});
						}
					}
				}, {
					key: 'downThisGroupedSelectRow',
					value: function downThisGroupedSelectRow(index) {
						var result = this.selectOptionManage.downthisOption(this.groupedSelectRowCollection, index);
						if (result.resultFlag === false) {
							this.toaster.pop({
								type: 'warning',
								timeout: 2000,
								title: result.details,
								body: 'Operation cancelled.',
								showCloseButton: true
							});
						}
					}
				}, {
					key: 'today',
					value: function today() {
						this.demodt.dt = new Date();
					}
				}, {
					key: 'clear',
					value: function clear() {
						this.demodt.dt = null;
					}
				}, {
					key: 'openfct',
					value: function openfct($event) {
						$event.preventDefault();
						$event.stopPropagation();
						this.demodt.opened = true;
					}
				}, {
					key: 'dateOptionsInit',
					value: function dateOptionsInit() {
						return {
							formatYear: 'yy',
							startingDay: 1,
							showWeeks: true,
							initDate: null
						};
					}
				}, {
					key: 'selectThisControl',
					value: function selectThisControl(controlName) {
						this.nyaSelect.selectedControl = 'none';
						this.resetTemporyConfig();

						for (var i = this.nyaSelect.controls.length - 1; i >= 0; i--) {
							if (this.nyaSelect.controls[i].id === controlName) {
								this.nyaSelect.selectedControl = this.nyaSelect.controls[i].id;
							}
						}

						if (this.nyaSelect.selectedControl === 'Date') {
							this.initDatePicker();
						}
					}
				}, {
					key: 'okfct',
					value: function okfct() {
						if (this.nyaSelect.selectedControl === 'BasicSelect') {
							this.bindBasicSelectToNya();
						}
						if (this.nyaSelect.selectedControl === 'GroupedSelect') {
							this.bindGroupedSelectToNya();
						}
						if (this.nyaSelect.selectedControl === 'Radio') {
							this.bindRadioToNya();
						}
						//save config to control
						this.$modalProxy.applyConfigToSelectedControl(this.nyaSelect);
						//return current model to parent controller :
						this.$modalInstance.close(this.nyaSelect);
					}
				}, {
					key: 'cancelfct',
					value: function cancelfct() {
						this.$modalInstance.dismiss('cancel');
					}
				}, {
					key: 'bindBasicSelectToNya',
					value: function bindBasicSelectToNya() {
						var resetNyASelectOptions = [];
						this.nyaSelect.temporyConfig.formlyOptions = resetNyASelectOptions;
						if (this.basicSelectRowCollection.rows.length > 0) {
							for (var i = 0; i <= this.basicSelectRowCollection.rows.length - 1; i++) {
								var newOption = {
									'name': this.basicSelectRowCollection.rows[i].option,
									'value': i,
									'group': ''
								};
								this.nyaSelect.temporyConfig.formlyOptions.push(newOption);
							}
						}
					}
				}, {
					key: 'bindGroupedSelectToNya',
					value: function bindGroupedSelectToNya() {
						this.nyaSelect.temporyConfig.formlyOptions = [];
						for (var i = 0; i <= this.groupedSelectRowCollection.rows.length - 1; i++) {
							var newOption = {
								'name': this.groupedSelectRowCollection.rows[i].option,
								'value': i,
								'group': this.groupedSelectRowCollection.rows[i].group
							};
							this.nyaSelect.temporyConfig.formlyOptions.push(newOption);
						}
					}
				}, {
					key: 'bindRadioToNya',
					value: function bindRadioToNya() {
						var resetNyASelectOptions = [];
						this.nyaSelect.temporyConfig.formlyOptions = resetNyASelectOptions;
						if (this.radioRowCollection.rows.length > 0) {
							for (var i = 0; i <= this.radioRowCollection.rows.length - 1; i++) {
								var newOption = {
									'name': this.radioRowCollection.rows[i].option,
									'value': i,
									'group': ''
								};
								this.nyaSelect.temporyConfig.formlyOptions.push(newOption);
							}
						}
					}
				}, {
					key: 'initDatePicker',
					value: function initDatePicker() {
						this.nyaSelect.temporyConfig.datepickerPopup = this.demodt.formats[0];
					}
				}, {
					key: 'resetTemporyConfig',
					value: function resetTemporyConfig() {
						this.nyaSelect.temporyConfig = {
							formlyLabel: '',
							formlyRequired: false,
							formlyPlaceholder: '',
							formlyDesciption: '',
							formlyOptions: []
						};
					}
				}]);

				return editControlModalController;
			})();

			toInject = ['$modalInstance', 'nyaSelect', 'toaster', 'selectOptionManage', '$modalProxy'];

			editControlModalController.$inject = toInject;

			_export('default', editControlModalController);

			_export('EDIT_MODAL_CONTROLLER_NAME', EDIT_MODAL_CONTROLLER_NAME);
		}
	};
});
$__System.register('e', ['9', 'a', 'b', 'c', 'd'], function (_export) {
	var _createClass, _classCallCheck, initDebugModel, initTabModel, initColumnTemplate, initLineTemplate, editControlModalTemplate, EDIT_MODAL_CONTROLLER_NAME, STEP_WAY_MAIN_CONTROLLER_NAME, STEP_WAY_MAIN_CONTROLLERAS_NAME, edaStepWayEasyFormGenController, toInject;

	return {
		setters: [function (_) {
			_createClass = _['default'];
		}, function (_a) {
			_classCallCheck = _a['default'];
		}, function (_b) {
			initDebugModel = _b.initDebugModel;
			initTabModel = _b.initTabModel;
			initColumnTemplate = _b.initColumnTemplate;
			initLineTemplate = _b.initLineTemplate;
		}, function (_c) {
			editControlModalTemplate = _c['default'];
		}, function (_d) {
			EDIT_MODAL_CONTROLLER_NAME = _d.EDIT_MODAL_CONTROLLER_NAME;
		}],
		execute: function () {
			/* global angular */
			'use strict';

			STEP_WAY_MAIN_CONTROLLER_NAME = 'edaStepWayEasyFormGenController';
			STEP_WAY_MAIN_CONTROLLERAS_NAME = 'vm';

			edaStepWayEasyFormGenController = (function () {
				function edaStepWayEasyFormGenController(easyFormGenVersion, $filter, toaster, $timeout, $modal, $log, $formlyProxy, $modalProxy, easyFormSteWayConfig) {
					_classCallCheck(this, edaStepWayEasyFormGenController);

					this.easyFormGenVersion = easyFormGenVersion;
					this.$filter = $filter;
					this.toaster = toaster;
					this.$timeout = $timeout;
					this.$modal = $modal;
					this.$log = $log;
					this.$formlyProxy = $formlyProxy;
					this.$modalProxy = $modalProxy;
					this.easyFormSteWayConfig = easyFormSteWayConfig;

					this.init();
				}

				_createClass(edaStepWayEasyFormGenController, [{
					key: 'init',
					value: function init() {

						this.model = {};
						this.wfFormFields = [];
						this.wfFormFieldsOnlyNeededProperties = [];
						this.easyFormGeneratorVERSION = this.easyFormGenVersion;
						this.debug = initDebugModel();
						this.tab = initTabModel();
						this.configuration = {}; //configuration model (contains array of lines which contains array of columns)    											
						this.numberOfColumns = 1;
						this.MaxNumberOfColumns = 3;
						this.MinNumberOfColumns = 1;
						this.columnTemplate = initColumnTemplate(); //TODO : check is really needed
						this.lineTemplate = initLineTemplate(); //TODO : check if really needed
						this.nyaSelect = {};
						this.animationsEnabled = this.easyFormSteWayConfig.getModalAnimationValue(); //-> disabling animation untill correction in angular bootstrap
						this.editControlModalSize = 'lg';
						this.formlyList = {};
						this.previewLoadedForm = { fieldsModel: [] };
						this.configurationLoaded = {};
						this.returnSaveEvent = false;
						//this.resetToZeroModel         = resetToZeroModel; //function no more used

						this.$formlyProxy.initConfigurationEditFromScratch(this.configuration);
						this.$modalProxy.initNyaSelect(this.nyaSelect);
					}
				}, {
					key: 'onSubmit',
					value: function onSubmit() {
						var JSONedModel = this.$filter('json')(this.model, 4);
						this.toaster.pop({
							type: 'info',
							timeout: 2000,
							title: 'it should save data model if it were not in editor',
							body: 'data : ' + JSONedModel,
							showCloseButton: true
						});
					}
				}, {
					key: 'countConfigurationModelLines',
					value: function countConfigurationModelLines() {
						this.debug.configurationModelNumberofLines = this.configuration.lines.length;
						return this.configuration.lines.length;
					}
				}, {
					key: 'setActiveLineNumber',
					value: function setActiveLineNumber(lineNumber) {
						if (lineNumber <= this.countConfigurationModelLines()) {
							this.configuration.activeLine = lineNumber;
						}
					}
				}, {
					key: 'upThisLine',
					value: function upThisLine(indexLine) {
						if (indexLine > -1) {
							if (this.configuration.lines[indexLine - 1]) {
								var currentLineObj = this.configuration.lines[indexLine];
								this.configuration.lines.splice(indexLine, 1);
								this.configuration.lines.splice(indexLine - 1, 0, currentLineObj);
								//manage selected aciveLine
								this.configuration.activeLine = 1;
							}
						}
						//re-render formfield
						this.$formlyProxy.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.model);
						this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
					}
				}, {
					key: 'downThisLine',
					value: function downThisLine(indexLine) {
						if (indexLine > -1) {
							if (this.configuration.lines[indexLine + 1]) {
								var currentLineObj = this.configuration.lines[indexLine];
								this.configuration.lines.splice(indexLine, 1);
								this.configuration.lines.splice(indexLine + 1, 0, currentLineObj);
								//manage selected aciveLine
								this.configuration.activeLine = 1;
							}
						}
						//re-render formfield
						this.$formlyProxy.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.model);
						this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
					}
				}, {
					key: 'addNewline',
					value: function addNewline() {
						this.configuration.lines.push(initLineTemplate());
						//re-render formfield
						this.$formlyProxy.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.model);
						this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
					}
				}, {
					key: 'removeThisLine',
					value: function removeThisLine(index) {
						if (index > -1) {
							if (this.configuration.lines.length > 1) {
								//manage selected aciveLine
								if (this.configuration.activeLine === index + 1) {
									this.configuration.activeLine = 1;
								}
								this.configuration.lines.splice(index, 1);
							} else {
								this.$timeout(function () {
									this.toaster.pop({
										type: 'warning',
										title: 'Last line',
										body: 'Can\'t delete the last line',
										showCloseButton: true
									});
								}, 100);
							}
							//re-render formfield
							this.$formlyProxy.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.model);
							this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
						}
					}
				}, {
					key: 'increaseNumberOfColumns',
					value: function increaseNumberOfColumns() {
						if (this.configuration.lines[this.configuration.activeLine - 1].columns.length < this.MaxNumberOfColumns) {

							var newNumberOfColumns = this.configuration.lines[this.configuration.activeLine - 1].columns.push(initColumnTemplate());
							this.configuration.lines[this.configuration.activeLine - 1].columns[newNumberOfColumns - 1].numColumn = newNumberOfColumns;
						}
						//re-render formfield
						this.$formlyProxy.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.model);
						this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
					}
				}, {
					key: 'decreaseNumberOfColumns',
					value: function decreaseNumberOfColumns() {
						if (this.configuration.lines[this.configuration.activeLine - 1].columns.length > 1) {
							this.configuration.lines[this.configuration.activeLine - 1].columns.splice(this.configuration.lines[this.configuration.activeLine - 1].columns.length - 1, 1);
						}
						this.$formlyProxy.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.model);
						this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
					}
				}, {
					key: 'resetStepCounter',
					value: function resetStepCounter() {
						this.configuration.configStepCounter = 0;
					}
				}, {
					key: 'nextConfigStep',
					value: function nextConfigStep() {
						var configStepCounterMAX = this.configuration.listConfigStep.length - 1;
						if (this.configuration.configStepCounter !== configStepCounterMAX) {
							this.configuration.configStepCounter++;
						}
						this.setTrueThisStepIndicator(this.configuration.configStepCounter);
					}
				}, {
					key: 'resetAllIndicators',
					value: function resetAllIndicators() {
						for (var i = this.configuration.stepIndicators.length - 1; i >= 0; i--) {
							this.configuration.stepIndicators[i] = false;
						}
					}
				}, {
					key: 'setTrueThisStepIndicator',
					value: function setTrueThisStepIndicator(indexIndicator) {
						this.resetAllIndicators();
						this.configuration.stepIndicators[indexIndicator] = true;
					}
				}, {
					key: 'previousConfigStep',
					value: function previousConfigStep() {
						if (this.configuration.configStepCounter !== 0) {
							this.configuration.configStepCounter--;
						}
						this.setTrueThisStepIndicator(this.configuration.configStepCounter);
					}
				}, {
					key: 'stepReachable',
					value: function stepReachable(indexStep) {
						if (indexStep < this.configuration.configStepCounter) {
							return 'disabled';
						} else {
							return 'enabled';
						}
					}
				}, {
					key: 'showModalAddCtrlToColumn',
					value: function showModalAddCtrlToColumn(size, indexLine, numcolumn) {

						var modalInstance = this.$modal.open({
							animation: this.animationsEnabled,
							template: editControlModalTemplate,
							controller: EDIT_MODAL_CONTROLLER_NAME,
							size: this.editControlModalSize,
							resolve: {
								nyaSelect: function nyaSelect() {
									return this.$modalProxy.getNyASelectFromSelectedLineColumn(this.nyaSelect, this.configuration, indexLine, numcolumn);
								}
							}
						});

						modalInstance.result.then(function (modalAddCtrlModel) {
							this.$modalProxy.bindConfigurationModelFromModalReturn(indexLine, numcolumn, modalAddCtrlModel, this.configuration);
							this.$formlyProxy.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.model);
							this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
						}, function () {
							//$log.info('Modal dismissed at: ' + new Date());
						});
					}
				}, {
					key: 'previewExistingform',
					value: function previewExistingform(formlyform) {
						var configlines = JSON.parse(formlyform.formlyField);
						//here to replace with $scope.configuration : initialise configuration with lines
						this.configurationLoaded = {};
						this.$formlyProxy.bindConfigurationLines(this.configurationLoaded, configlines);
						this.$formlyProxy.applyConfigurationToformlyModel(this.configurationLoaded, this.previewLoadedForm.fieldsModel, this.model);
						this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
						this.previewLoadedForm.cancelButtonText = formlyform.cancelButtonText;
						this.previewLoadedForm.submitButtonText = formlyform.submitButtonText;
					}
				}, {
					key: 'saveThisForm',
					value: function saveThisForm() {
						if (typeof this.configuration.formName === 'undefined') {
							this.toaster.pop({
								type: 'warning',
								timeout: 2000,
								title: 'Form name is undefined',
								body: 'Form has not been saved.',
								showCloseButton: true
							});
							return false;
						}
						if (this.configuration.formName === '') {
							this.toaster.pop({
								type: 'warning',
								timeout: 2000,
								title: 'Form name is required',
								body: 'Form has not been saved.',
								showCloseButton: true
							});
							return false;
						}
						this.toaster.pop({
							type: 'wait',
							timeout: 10000,
							title: 'Form is being saved',
							body: 'Wait.',
							showCloseButton: true
						});
						this.toaster.clear();
						this.returnSaveEvent = true;
						return true;
					}
				}]);

				return edaStepWayEasyFormGenController;
			})();

			toInject = ['easyFormGenVersion', '$filter', 'toaster', '$timeout', '$modal', '$log', '$formlyProxy', '$modalProxy', 'easyFormSteWayConfig'];

			edaStepWayEasyFormGenController.$inject = toInject;

			_export('default', edaStepWayEasyFormGenController);

			_export('STEP_WAY_MAIN_CONTROLLER_NAME', STEP_WAY_MAIN_CONTROLLER_NAME);

			_export('STEP_WAY_MAIN_CONTROLLERAS_NAME', STEP_WAY_MAIN_CONTROLLERAS_NAME);
		}
	};
});
$__System.register('10', ['f', 'e'], function (_export) {
	/* global angular */
	'use strict';

	var easyformTemplate, edaStepWayEasyFormGenController, STEP_WAY_MAIN_CONTROLLER_NAME, STEP_WAY_MAIN_CONTROLLERAS_NAME, STEP_WAY_DIRECTIVE_NAME;

	function edaStepWayEasyFormGenDirective($templateCache, $timeout, $formlyProxy, $modalProxy) {

		var directive = {
			restrict: 'E',
			scope: {
				edaEasyFormGeneratorModel: '=',
				edaSaveFormEvent: '&edaSaveFormEvent'
			},
			controller: STEP_WAY_MAIN_CONTROLLER_NAME,
			controllerAs: STEP_WAY_MAIN_CONTROLLERAS_NAME,
			replace: false,
			template: easyformTemplate,
			link: linkFct
		};
		return directive;

		function linkFct(scope) {

			//watch "scope.easyFormGeneratorModel"
			scope.$watch(function () {
				return scope.edaEasyFormGeneratorModel;
			}, function (newValue, oldValue) {
				loadExistingConfigurationModel();
			}, true);

			//watch "scope.returnSaveEvent"" = catch saving form event 
			scope.$watch(function () {
				return scope.returnSaveEvent;
			}, function (newValue, oldValue) {
				if (newValue === true) {
					var _easyFormGeneratorModel = {
						formName: scope.configuration.formName,
						btnSubmitText: scope.configuration.submitButtonText,
						btnCancelText: scope.configuration.cancelButtonText,
						edaFieldsModel: scope.configuration.lines,
						edaFieldsModelStringified: angular.toJson(scope.configuration.lines),
						formlyFieldsModel: scope.vm.wfFormFieldsOnlyNeededProperties,
						dataModel: scope.vm.model
					};
					scope.edaSaveFormEvent({ edaEasyFormGeneratorModel: _easyFormGeneratorModel });
					//back to false, waiting next save event
					scope.returnSaveEvent = false;
				}
			});

			function loadExistingConfigurationModel() {
				if (angular.isDefined(scope.edaEasyFormGeneratorModel)) {
					var configlines = returnAttributeConfigurationLinesIfNotEmpty();
					scope.configurationLoaded = {};

					$formlyProxy.bindConfigurationLines(scope.configurationLoaded, configlines);
					/**
     	* rebind special control properties :
     	* 
     	* formly expression properties
     	* Validators
     	* Validation
     	*/
					$modalProxy.refreshControlFormlyExpressionProperties(scope.configurationLoaded);
					$modalProxy.refreshControlFormlyValidators(scope.configurationLoaded);
					$modalProxy.refreshControlFormlyValidation(scope.configurationLoaded);
					//apply configuration model
					scope.configuration = angular.copy(scope.configurationLoaded);
					//apply formly model
					$formlyProxy.applyConfigurationToformlyModel(scope.configurationLoaded, scope.vm.wfFormFields, scope.vm.model);
					scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy(scope.vm.wfFormFields);
					scope.vm.model = returnAttributeDataModelIfNotEmpty;
					scope.configuration.formName = angular.isString(scope.edaEasyFormGeneratorModel.formName) ? scope.edaEasyFormGeneratorModel.formName : '';
					scope.configuration.submitButtonText = angular.isString(scope.edaEasyFormGeneratorModel.btnSubmitText) ? scope.edaEasyFormGeneratorModel.btnSubmitText : 'Submit';
					scope.configuration.cancelButtonText = angular.isString(scope.edaEasyFormGeneratorModel.btnCancelText) ? scope.edaEasyFormGeneratorModel.btnCancelText : 'Cancel';
				}
			}

			function returnAttributeConfigurationLinesIfNotEmpty() {
				var edaEasyFormGeneratorModelToReturn = angular.isArray(scope.edaEasyFormGeneratorModel.edaFieldsModel) ? scope.edaEasyFormGeneratorModel.edaFieldsModel.length > 0 ? scope.edaEasyFormGeneratorModel.edaFieldsModel : emptyEdaFieldsModel() : emptyEdaFieldsModel();
				return edaEasyFormGeneratorModelToReturn;
			}

			function returnAttributeDataModelIfNotEmpty() {
				var dataModelToReturn = angular.isArray(scope.edaEasyFormGeneratorModel.dataModel) ? scope.edaEasyFormGeneratorModel.dataModel.length > 0 ? scope.edaEasyFormGeneratorModel.dataModel : [] : [];
				return dataModelToReturn;
			}

			/**
   	* empty fields model : to display at least an empty line
   	* otherwise would look like ugly empty line like it were a bug
   	*/
			function emptyEdaFieldsModel() {
				var emptyModel = [{
					"line": 1,
					"activeColumn": 1,
					"columns": [{
						"numColumn": 1,
						"exist": true,
						"control": {
							"type": "none",
							"key": "none"
						}
					}]
				}];
				return emptyModel;
			}
		}
	}

	return {
		setters: [function (_f) {
			easyformTemplate = _f['default'];
		}, function (_e) {
			edaStepWayEasyFormGenController = _e['default'];
			STEP_WAY_MAIN_CONTROLLER_NAME = _e.STEP_WAY_MAIN_CONTROLLER_NAME;
			STEP_WAY_MAIN_CONTROLLERAS_NAME = _e.STEP_WAY_MAIN_CONTROLLERAS_NAME;
		}],
		execute: function () {
			STEP_WAY_DIRECTIVE_NAME = 'edaStepWayEasyFormGen';
			edaStepWayEasyFormGenDirective.$inject = ['$templateCache', '$timeout', '$formlyProxy', '$modalProxy'];

			_export('default', edaStepWayEasyFormGenDirective);

			_export('STEP_WAY_DIRECTIVE_NAME', STEP_WAY_DIRECTIVE_NAME);
		}
	};
});
$__System.register('11', [], function (_export) {
	/* global angular */
	'use strict';

	var EASY_FORM_STEP_WAY_CONFIG_NAME;

	function easyFormSteWayConfig($translateProvider) {
		var _configuration = defaultConfig();
		var _controlsList = controlsList();
		var _defaultLanguage = getDefaultLanguage();
		var _currentLanguage = initDefaultLanguage();
		var _showPreviewPanel = getDefaultshowPreviewPanel();
		var _showPreviewModels = getDefaultShowPreviewModel();
		/* jshint validthis:true */
		this.$get = easyFormStepWayConfigGET;
		this.setModalAnimation = setModalAnimation;
		this.getModalAnimation = getModalAnimation;
		this.configuration = _configuration;
		this.getEnabledControls = getEnabledControls;
		this.disableControl = disableControl;
		this.enableControl = enableControl;
		this.setLanguage = setLanguage;
		this.getCurrentLanguage = getCurrentLanguage;
		this.showPreviewPanel = showPreviewPanel;
		this.showPreviewModels = showPreviewModels;

		//set default config
		function defaultConfig() {
			var _defaultConfiguration = {
				modalAnimated: false
			};
			return _defaultConfiguration;
		}

		//show preview panel by default
		function getDefaultshowPreviewPanel() {
			return true;
		}

		//show preview data, fields models in preview panel
		function getDefaultShowPreviewModel() {
			return true;
		}

		function getCurrentLanguage() {
			return _currentLanguage;
		}

		//list of controls
		function controlsList() {
			var controls = [{ name: 'empty', enabled: true }, { name: 'Header', enabled: true }, { name: 'TextInput', enabled: true }, { name: 'Password', enabled: true }, { name: 'Date', enabled: true }, { name: 'Texarea', enabled: true }, { name: 'RichTextEditor', enabled: true }, { name: 'Radio', enabled: true }, { name: 'Checkbox', enabled: true }, { name: 'BasicSelect', enabled: true }, { name: 'GroupedSelect', enabled: true }];
			return controls;
		}

		function showPreviewPanel(wantToShow) {
			if (angular.isDefined(wantToShow)) {
				if (wantToShow === true) _showPreviewPanel = true;
				if (wantToShow === false) _showPreviewPanel = false;
			}
		}

		function showPreviewModels(wantToShow) {
			if (angular.isDefined(wantToShow)) {
				if (wantToShow === true) _showPreviewModels = true;
				if (wantToShow === false) _showPreviewModels = false;
			}
		}

		//language : set default to english
		function getDefaultLanguage() {
			var lang = 'en';
			return lang;
		}

		function setDefaultLanguage() {
			_currentLanguage = _defaultLanguage;
			$translateProvider.preferredLanguage(_currentLanguage);
			return _currentLanguage;
		}

		function setLanguage(language) {
			if (angular.isString(language)) {
				_currentLanguage = language;
				$translateProvider.preferredLanguage(language);
			} else {
				setDefaultLanguage();
			}
		}

		function initDefaultLanguage() {
			$translateProvider.useSanitizeValueStrategy('escape'); //security : Enable escaping of HTML
			$translateProvider.fallbackLanguage(_defaultLanguage); //fallback language to default language
			$translateProvider.preferredLanguage(_defaultLanguage);
			return _defaultLanguage;
		}

		function getEnabledControls() {
			return _controlsList;
		}

		function disableControl(controlName) {
			if (angular.isString(controlName)) {
				angular.forEach(_controlsList, function (aControl) {
					if (aControl.name === controlName) aControl.enabled = false;
				});
			}
		}

		function enableControl(controlName) {
			if (angular.isString(controlName)) {
				angular.forEach(_controlsList, function (aControl) {
					if (aControl.name === controlName) aControl.enabled = true;
				});
			}
		}

		function setModalAnimation(flagConfig) {
			var valueToApply = flagConfig === true ? flagConfig : flagConfig === false ? flagConfig : _configuration.modalAnimated;

			_configuration.modalAnimated = valueToApply;
		}

		function getModalAnimation() {
			return _configuration.modalAnimated;
		}

		//$get implementation :
		easyFormStepWayConfigGET.$inject = ['$translate'];
		function easyFormStepWayConfigGET($translate) {

			var service = {
				setModalAnimation: setModalAnimationFct,
				getModalAnimationValue: getModalAnimationValue,
				getListEnabledControl: getListEnabledControl,
				setLanguage: switchLanguage,
				getCurrentLanguage: getCurrentLanguage,
				isPreviewPanelVisible: isPreviewPanelVisible,
				arePreviewModelsVisible: arePreviewModelsVisible
			};
			return service;

			function getModalAnimationValue() {
				return _configuration.modalAnimated;
			}

			function setModalAnimationFct(value) {
				setModalAnimation(value);
			}

			function getListEnabledControl() {
				return angular.copy(_controlsList);
			}

			function switchLanguage(language) {
				if (angular.isString(language)) {
					_currentLanguage = language;
					$translate.use(language);
				} else {
					setDefaultLanguage();
				}
			}

			function isPreviewPanelVisible() {
				return _showPreviewPanel;
			}

			function arePreviewModelsVisible() {
				return _showPreviewModels;
			}
		}
	}

	return {
		setters: [],
		execute: function () {
			EASY_FORM_STEP_WAY_CONFIG_NAME = 'easyFormSteWayConfig';
			easyFormSteWayConfig.$inject = ['$translateProvider'];

			_export('default', easyFormSteWayConfig);

			_export('EASY_FORM_STEP_WAY_CONFIG_NAME', EASY_FORM_STEP_WAY_CONFIG_NAME);
		}
	};
});
$__System.register('12', ['10', '11', 'e'], function (_export) {
  /* global angular */
  'use strict';

  var edaStepWayEasyFormGenDirective, STEP_WAY_DIRECTIVE_NAME, easyFormSteWayConfig, EASY_FORM_STEP_WAY_CONFIG_NAME, edaStepWayEasyFormGenController, STEP_WAY_MAIN_CONTROLLER_NAME, STEP_WAY_MAIN_MODULE;
  return {
    setters: [function (_) {
      edaStepWayEasyFormGenDirective = _['default'];
      STEP_WAY_DIRECTIVE_NAME = _.STEP_WAY_DIRECTIVE_NAME;
    }, function (_2) {
      easyFormSteWayConfig = _2['default'];
      EASY_FORM_STEP_WAY_CONFIG_NAME = _2.EASY_FORM_STEP_WAY_CONFIG_NAME;
    }, function (_e) {
      edaStepWayEasyFormGenController = _e['default'];
      STEP_WAY_MAIN_CONTROLLER_NAME = _e.STEP_WAY_MAIN_CONTROLLER_NAME;
    }],
    execute: function () {
      STEP_WAY_MAIN_MODULE = 'easyFormStepwayMainModule';

      _export('default', angular.module(STEP_WAY_MAIN_MODULE, []).controller(STEP_WAY_MAIN_CONTROLLER_NAME, edaStepWayEasyFormGenController).directive(STEP_WAY_DIRECTIVE_NAME, edaStepWayEasyFormGenDirective).provider(EASY_FORM_STEP_WAY_CONFIG_NAME, easyFormSteWayConfig));
    }
  };
});
$__System.register('13', ['d'], function (_export) {
	/* global angular */
	'use strict';

	var editModalController, EDIT_MODAL_CONTROLLER_NAME, EDIT_CONTROLE_MODAL_NAME;
	return {
		setters: [function (_d) {
			editModalController = _d['default'];
			EDIT_MODAL_CONTROLLER_NAME = _d.EDIT_MODAL_CONTROLLER_NAME;
		}],
		execute: function () {
			EDIT_CONTROLE_MODAL_NAME = 'editControlModalModule';

			_export('default', angular.module(EDIT_CONTROLE_MODAL_NAME, []).controller(EDIT_MODAL_CONTROLLER_NAME, editModalController));
		}
	};
});
$__System.register('14', [], function (_export) {
	/* global angular */

	'use strict';

	var resetNyaSelect, returnControlFromAddCtrlModalModel, validKeyUniqueness;
	return {
		setters: [],
		execute: function () {
			resetNyaSelect = function resetNyaSelect(nyaSelectObj) {

				var newNyaSelectObj = {
					controls: [{
						id: 'empty',
						name: 'no control',
						subtitle: 'no control',
						group: 'Blank',
						formlyType: 'blank',
						formlySubtype: '',
						formlyLabel: '',
						formlyRequired: false,
						formlyDesciption: '',
						formlyOptions: [],
						formlyExpressionProperties: {},
						formlyValidators: {},
						formlyValidation: {}
					}, {
						id: 'Header',
						name: 'Header',
						subtitle: 'no control',
						group: 'Decoration',
						formlyType: 'header',
						formlySubtype: '',
						formlyLabel: '',
						formlyRequired: false,
						formlyDesciption: '',
						formlyOptions: [],
						formlyExpressionProperties: {},
						formlyValidators: {},
						formlyValidation: {}
					}, {
						id: 'Subtitle',
						name: 'Subtitle',
						subtitle: 'no control',
						group: 'Decoration',
						formlyType: 'subTitle',
						formlySubtype: '',
						formlyLabel: '',
						formlyRequired: false,
						formlyDesciption: '',
						formlyOptions: [],
						formlyExpressionProperties: {},
						formlyValidators: {},
						formlyValidation: {}
					}, {
						id: 'TextInput',
						name: 'Text input',
						subtitle: 'Text input',
						group: 'input',
						formlyType: 'input',
						formlySubtype: '',
						formlyLabel: '',
						formlyRequired: false,
						formlyDesciption: '',
						formlyOptions: [],
						formlyExpressionProperties: {},
						formlyValidators: {},
						formlyValidation: {
							messages: {
								required: function required(viewValue, modelValue, scope) {
									//return a required validation message :
									//-> '<label as name> is required '
									//-> or if not exists or empty just 'this field is required'
									var defaultReturnMsg = 'this Text input field is required';
									var returnMsg = typeof scope.to.label !== 'undefined' ? scope.to.label !== '' ? scope.to.label + ' is required' : defaultReturnMsg : defaultReturnMsg;
									return returnMsg;
								}
							}
						}
					}, {
						id: 'Password',
						name: 'Password',
						subtitle: 'Password',
						group: 'input',
						formlyType: 'input',
						formlySubtype: 'password',
						formlyLabel: '',
						formlyRequired: false,
						formlyDesciption: '',
						formlyOptions: [],
						formlyExpressionProperties: {},
						formlyValidators: {},
						formlyValidation: {
							messages: {
								required: function required(viewValue, modelValue, scope) {
									//return a required validation message :
									//-> '<label as name> is required '
									//-> or if not exists or empty just 'this field is required'
									var defaultReturnMsg = 'this Password field is required';
									var returnMsg = typeof scope.to.label !== 'undefined' ? scope.to.label !== '' ? scope.to.label + ' is required' : defaultReturnMsg : defaultReturnMsg;
									return returnMsg;
								}
							}
						}
					}, {
						id: 'Email',
						name: 'Email',
						subtitle: 'Email',
						group: 'input',
						formlyType: 'input',
						formlySubtype: 'email',
						formlyLabel: '',
						formlyRequired: false,
						formlyDesciption: '',
						formlyOptions: [],
						formlyExpressionProperties: {},

						formlyValidators: {
							emailShape: {
								expression: function expression(viewValue, modelValue) {
									var value = modelValue || viewValue;
									return (/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/.test(value)
									);
								},
								message: '$viewValue + \' is not a valid email\''
							}
						},
						formlyValidation: {
							messages: {
								required: function required(viewValue, modelValue, scope) {
									//return a required validation message :
									//-> '<label as name> is required '
									//-> or if not exists or empty just 'this field is required'		
									var defaultReturnMsg = 'this Email field is required';
									var returnMsg = typeof scope.to.label !== 'undefined' ? scope.to.label !== '' ? scope.to.label + ' is required' : defaultReturnMsg : defaultReturnMsg;
									//check if validation is really dued to require validation
									//and not another validation like emailShape validator
									if (scope.to.required) return returnMsg;
								}
							}
						}
					}, {
						id: 'Date',
						name: 'Date',
						subtitle: 'Date',
						group: 'input',
						formlyType: 'datepicker',
						formlySubtype: '',
						formlyLabel: '',
						formlyRequired: false,
						formlyDesciption: '',
						formlyOptions: [],
						datepickerPopup: 'dd-MMMM-yyyy',
						formlyExpressionProperties: {},
						formlyValidators: {},
						formlyValidation: {
							messages: {
								required: function required(viewValue, modelValue, scope) {
									//return a required validation message :
									//-> '<label as name> is required '
									//-> or if not exists or empty just 'this field is required'
									var defaultReturnMsg = 'this Date field is required';
									var returnMsg = typeof scope.to.label !== 'undefined' ? scope.to.label !== '' ? scope.to.label + ' is required' : defaultReturnMsg : defaultReturnMsg;
									return returnMsg;
								}
							}
						}
					}, {
						id: 'Texarea',
						name: 'Textarea',
						subtitle: 'Textarea',
						group: 'Textarea',
						formlyType: 'textarea',
						formlySubtype: '',
						formlyLabel: '',
						formlyRequired: false,
						formlyDesciption: '',
						formlyOptions: [],
						formlyExpressionProperties: {},
						formlyValidators: {},
						formlyValidation: {
							messages: {
								required: function required(viewValue, modelValue, scope) {
									//return a required validation message :
									//-> '<label as name> is required '
									//-> or if not exists or empty just 'this field is required'
									var defaultReturnMsg = 'this Textarea field is required';
									var returnMsg = typeof scope.to.label !== 'undefined' ? scope.to.label !== '' ? scope.to.label + ' is required' : defaultReturnMsg : defaultReturnMsg;
									return returnMsg;
								}
							}
						}
					}, {
						id: 'RichTextEditor',
						name: 'RichTextEditor',
						subtitle: 'RichTextEditor',
						group: 'Textarea',
						formlyType: 'richEditor',
						formlySubtype: '',
						formlyLabel: '',
						formlyRequired: false,
						formlyDesciption: '',
						formlyOptions: [],
						formlyExpressionProperties: {},
						formlyValidators: {},
						formlyValidation: {
							messages: {
								required: function required(viewValue, modelValue, scope) {
									//return a required validation message :
									//-> '<label as name> is required '
									//-> or if not exists or empty just 'this field is required'
									var defaultReturnMsg = 'this RichTextEditor field is required';
									var returnMsg = typeof scope.to.label !== 'undefined' ? scope.to.label !== '' ? scope.to.label + ' is required' : defaultReturnMsg : defaultReturnMsg;
									return returnMsg;
								}
							}
						}
					}, {
						id: 'Radio',
						name: 'Radio',
						subtitle: 'Radio',
						options: [],
						group: 'Radio',
						formlyType: 'radio',
						formlySubtype: '',
						formlyLabel: '',
						formlyRequired: false,
						formlyDesciption: '',
						formlyOptions: [],
						formlyExpressionProperties: {},
						formlyValidators: {},
						formlyValidation: {
							messages: {
								required: function required(viewValue, modelValue, scope) {
									//return a required validation message :
									//-> '<label as name> is required '
									//-> or if not exists or empty just 'this field is required'
									var defaultReturnMsg = 'this Password field is required';
									var returnMsg = typeof scope.to.label !== 'undefined' ? scope.to.label !== '' ? scope.to.label + ' is required' : defaultReturnMsg : defaultReturnMsg;
									return returnMsg;
								}
							}
						}
					}, {
						id: 'Checkbox',
						name: 'Checkbox',
						subtitle: 'Checkbox',
						group: 'Checkbox',
						formlyType: 'checkbox',
						formlySubtype: '',
						formlyLabel: '',
						formlyRequired: false,
						formlyDesciption: '',
						formlyOptions: [],
						formlyExpressionProperties: {},
						formlyValidators: {},
						formlyValidation: {
							messages: {
								required: function required(viewValue, modelValue, scope) {
									//return a required validation message :
									//-> '<label as name> is required '
									//-> or if not exists or empty just 'this field is required'
									var defaultReturnMsg = 'this Checkbox field is required';
									var returnMsg = typeof scope.to.label !== 'undefined' ? scope.to.label !== '' ? scope.to.label + ' is required' : defaultReturnMsg : defaultReturnMsg;
									return returnMsg;
								}
							}
						}
					}, {
						id: 'BasicSelect',
						name: 'Basic select',
						subtitle: 'Basic select',
						options: [],
						group: 'Select',
						formlyType: 'basicSelect',
						formlySubtype: '',
						formlyLabel: '',
						formlyRequired: false,
						formlyDesciption: '',
						formlyOptions: [],
						formlyExpressionProperties: {},
						formlyValidators: {},
						formlyValidation: {
							messages: {
								required: function required(viewValue, modelValue, scope) {
									//return a required validation message :
									//-> '<label as name> is required '
									//-> or if not exists or empty just 'this field is required'
									var defaultReturnMsg = 'this Basic select field is required';
									var returnMsg = typeof scope.to.label !== 'undefined' ? scope.to.label !== '' ? scope.to.label + ' is required' : defaultReturnMsg : defaultReturnMsg;
									return returnMsg;
								}
							}
						}
					}, {
						id: 'GroupedSelect',
						name: 'Grouped Select',
						subtitle: 'Grouped Select',
						options: [],
						group: 'Select',
						formlyType: 'groupedSelect',
						formlySubtype: '',
						formlyLabel: '',
						formlyRequired: false,
						formlyDesciption: '',
						formlyOptions: [],
						formlyExpressionProperties: {},
						formlyValidators: {},
						formlyValidation: {
							messages: {
								required: function required(viewValue, modelValue, scope) {
									//return a required validation message :
									//-> '<label as name> is required '
									//-> or if not exists or empty just 'this field is required'
									var defaultReturnMsg = 'this Grouped Select field is required';
									var returnMsg = typeof scope.to.label !== 'undefined' ? scope.to.label !== '' ? scope.to.label + ' is required' : defaultReturnMsg : defaultReturnMsg;
									return returnMsg;
								}
							}
						}
					}],
					selectedControl: 'none',
					temporyConfig: {
						selectedControl: 'none',
						formlyLabel: 'label',
						formlyRequired: false,
						formlyDesciption: '',
						formlyPlaceholder: '',
						formlyOptions: [],
						//expressions/validation fields
						formlyExpressionProperties: {},
						formlyValidators: {},
						formlyValidation: {}
					}

				};

				//reset
				angular.copy(newNyaSelectObj, nyaSelectObj);
				return true;
			};

			/**
   	* data passed back to parent controller 
   	* after control being finsihed editing in modal
   	*/

			returnControlFromAddCtrlModalModel = function returnControlFromAddCtrlModalModel(CtrlModalModel) {

				var modelToReturn = {
					selectedControl: 'none',
					formlyType: 'none',
					formlySubtype: 'none',
					formlyLabel: '',
					formlyRequired: false,
					formlyDesciption: '',
					formlyPlaceholder: '',
					formlyOptions: [],
					//validation fields
					formlyExpressionProperties: {},
					formlyValidators: {},
					formlyValidation: {}
				};

				for (var i = CtrlModalModel.controls.length - 1; i >= 0; i--) {
					if (CtrlModalModel.selectedControl === CtrlModalModel.controls[i].id) {
						modelToReturn.selectedControl = CtrlModalModel.selectedControl;
						modelToReturn.formlyType = CtrlModalModel.controls[i].formlyType;
						modelToReturn.formlySubtype = CtrlModalModel.controls[i].formlySubtype;
						modelToReturn.formlyLabel = CtrlModalModel.controls[i].formlyLabel;
						modelToReturn.formlyRequired = CtrlModalModel.controls[i].formlyRequired;
						modelToReturn.formlyDesciption = CtrlModalModel.controls[i].formlyDesciption;
						modelToReturn.formlyPlaceholder = CtrlModalModel.controls[i].formlyPlaceholder;
						modelToReturn.formlyOptions = CtrlModalModel.controls[i].formlyOptions;

						modelToReturn.formlyExpressionProperties = angular.copy(CtrlModalModel.controls[i].formlyExpressionProperties);
						modelToReturn.formlyValidators = angular.copy(CtrlModalModel.controls[i].formlyValidators);
						modelToReturn.formlyValidation = angular.copy(CtrlModalModel.controls[i].formlyValidation);

						//particular properties
						//datetpicker format
						if (CtrlModalModel.controls[i].formlyType === 'datepicker') {
							modelToReturn.datepickerPopup = CtrlModalModel.controls[i].datepickerPopup;
						}
					}
				}
				return modelToReturn;
			};

			/**
   	* validKeyUniqueness
   	* to be sure the "keys" are unique (in same formly field model)
   	*/

			validKeyUniqueness = function validKeyUniqueness(thisKey, configurationObj) {
				var isUnique = true;
				//each lines
				for (var i = configurationObj.lines.length - 1; i >= 0; i--) {
					//each columns
					for (var j = configurationObj.lines[i].columns.length - 1; j >= 0; j--) {
						if (configurationObj.lines[i].columns[j].control.key === thisKey) {
							isUnique = false;
						}
					}
				}
				return isUnique;
			};

			_export('resetNyaSelect', resetNyaSelect);

			_export('returnControlFromAddCtrlModalModel', returnControlFromAddCtrlModalModel);

			_export('validKeyUniqueness', validKeyUniqueness);
		}
	};
});
$__System.register('15', ['9', '14', 'a'], function (_export) {
	var _createClass, resetNyaSelect, returnControlFromAddCtrlModalModel, validKeyUniqueness, _classCallCheck, CONTROLLER_MODAL_PROXY_SERVICE, $modalProxy;

	return {
		setters: [function (_) {
			_createClass = _['default'];
		}, function (_2) {
			resetNyaSelect = _2.resetNyaSelect;
			returnControlFromAddCtrlModalModel = _2.returnControlFromAddCtrlModalModel;
			validKeyUniqueness = _2.validKeyUniqueness;
		}, function (_a) {
			_classCallCheck = _a['default'];
		}],
		execute: function () {
			/* global angular */
			'use strict';

			CONTROLLER_MODAL_PROXY_SERVICE = '$modalProxy';

			$modalProxy = (function () {
				function $modalProxy() {
					_classCallCheck(this, $modalProxy);
				}

				_createClass($modalProxy, [{
					key: 'initNyaSelect',
					value: function initNyaSelect(nyaSelectObj) {
						return resetNyaSelect(nyaSelectObj);
					}
				}, {
					key: 'getControlsDefinition',
					value: function getControlsDefinition() {
						var controls = {};
						resetNyaSelect(controls);
						return controls;
					}
				}, {
					key: 'getNyASelectFromSelectedLineColumn',
					value: function getNyASelectFromSelectedLineColumn(nyaSelectObj, configurationObj, indexLine, numcolumn) {
						resetNyaSelect(nyaSelectObj);
						/**
      	* data send to modal controller                                           
      	*/
						if (typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions != 'undefined') {

							nyaSelectObj.temporyConfig.selectedControl = typeof configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl : 'none';
							nyaSelectObj.temporyConfig.formlyLabel = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label : '';
							nyaSelectObj.temporyConfig.formlyRequired = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required : '';
							nyaSelectObj.temporyConfig.formlyDesciption = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description : '';
							nyaSelectObj.temporyConfig.formlyPlaceholder = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder : '';
							nyaSelectObj.temporyConfig.formlyOptions = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options : '';

							nyaSelectObj.temporyConfig.formlyExpressionProperties = typeof configurationObj.lines[indexLine].columns[numcolumn].control.formlyExpressionProperties != 'undefined' ? angular.copy(configurationObj.lines[indexLine].columns[numcolumn].control.formlyExpressionProperties) : {};
							nyaSelectObj.temporyConfig.formlyValidators = typeof configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidators != 'undefined' ? angular.copy(configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidators) : {};
							nyaSelectObj.temporyConfig.formlyValidation = typeof configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidation != 'undefined' ? angular.copy(configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidation) : {};

							/**
       	* particular case : datepicker 
       	*/
							if (nyaSelectObj.temporyConfig.selectedControl === 'Date') {
								nyaSelectObj.temporyConfig.datepickerPopup = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup : '';
							}
						}
						return nyaSelectObj;
					}
				}, {
					key: 'bindConfigurationModelFromModalReturn',
					value: function bindConfigurationModelFromModalReturn(indexLine, numcolumn, modalAddCtrlModel, configurationObj) {

						var extractedProps = returnControlFromAddCtrlModalModel(modalAddCtrlModel);
						configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl = extractedProps.selectedControl;
						configurationObj.lines[indexLine].columns[numcolumn].control.type = extractedProps.formlyType;
						configurationObj.lines[indexLine].columns[numcolumn].control.subtype = extractedProps.formlySubtype;
						//reset templateOptions
						configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions = {
							label: '',
							required: false,
							description: '',
							placeholder: '',
							options: []
						};
						//then bind templateOptions                                                                                  
						configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label = extractedProps.formlyLabel;
						configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required = extractedProps.formlyRequired;
						configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description = extractedProps.formlyDesciption;
						configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder = extractedProps.formlyPlaceholder;
						configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options = extractedProps.formlyOptions;

						configurationObj.lines[indexLine].columns[numcolumn].control.formlyExpressionProperties = angular.copy(extractedProps.formlyExpressionProperties);
						configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidators = angular.copy(extractedProps.formlyValidators);
						configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidation = angular.copy(extractedProps.formlyValidation);

						//////////////////////////////////////////
						// add additionnal particular properties
						//////////////////////////////////////////
						//-> datepicker : datepickerPopup
						if (configurationObj.lines[indexLine].columns[numcolumn].control.type === 'datepicker') {
							configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup = extractedProps.datepickerPopup;
						}
						/**
      	* unique key (set only first time) in this model is formly control type + Date.now();  
      	*/
						var newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();

						if (validKeyUniqueness(newKey, configurationObj) === true) {
							configurationObj.lines[indexLine].columns[numcolumn].control.key = newKey;
						} else {
							/**
       	* 2nd attempt 
       	*/
							newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();

							if (validKeyUniqueness(newKey, configurationObj) === true) {
								configurationObj.lines[indexLine].columns[numcolumn].control.key = newKey;
							} else {
								/**
        	* 3rd attempt 
        	*/
								newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();
							}
						}
						configurationObj.lines[indexLine].columns[numcolumn].control.edited = true;
					}
				}, {
					key: 'applyConfigToSelectedControl',
					value: function applyConfigToSelectedControl(nyaSelectObj) {
						/**
      	* used in modal (edit control) 
      	*/
						for (var i = nyaSelectObj.controls.length - 1; i >= 0; i--) {
							if (nyaSelectObj.controls[i].id === nyaSelectObj.selectedControl) {

								nyaSelectObj.controls[i].formlyLabel = nyaSelectObj.temporyConfig.formlyLabel;
								nyaSelectObj.controls[i].formlyRequired = nyaSelectObj.temporyConfig.formlyRequired;
								nyaSelectObj.controls[i].formlyDesciption = nyaSelectObj.temporyConfig.formlyDesciption;
								nyaSelectObj.controls[i].formlyPlaceholder = nyaSelectObj.temporyConfig.formlyPlaceholder;
								nyaSelectObj.controls[i].formlyOptions = nyaSelectObj.temporyConfig.formlyOptions;

								if (nyaSelectObj.controls[i].id === 'Date') {
									nyaSelectObj.controls[i].datepickerPopup = nyaSelectObj.temporyConfig.datepickerPopup;
								}
							}
						}
					}
				}]);

				return $modalProxy;
			})();

			$modalProxy.$inject = [];

			_export('default', $modalProxy);

			_export('CONTROLLER_MODAL_PROXY_SERVICE', CONTROLLER_MODAL_PROXY_SERVICE);
		}
	};
});
$__System.register('16', ['15'], function (_export) {
									/* global angular */
									'use strict';

									var $modalProxy, CONTROLLER_MODAL_PROXY_SERVICE, MODAL_PROXY_MODULE_NAME;
									return {
																		setters: [function (_) {
																											$modalProxy = _['default'];
																											CONTROLLER_MODAL_PROXY_SERVICE = _.CONTROLLER_MODAL_PROXY_SERVICE;
																		}],
																		execute: function () {
																											MODAL_PROXY_MODULE_NAME = 'modalProxyModule';

																											_export('default', angular.module(MODAL_PROXY_MODULE_NAME, []).service(CONTROLLER_MODAL_PROXY_SERVICE, $modalProxy));
																		}
									};
});
$__System.register('17', [], function (_export) {
	'use strict';

	var configurationModelInit, configurationModelResult, isTemplateOptionDefined, extractTemplateOptionLabel, extractTemplateOptionDatepickerPopup, extractFormlyExpressionProperties, extractFormlyValidators, extractFormlyValidation, extractTemplateOptionRequired, extractTemplateOptionOptions, extractTemplateOptionType, extractTemplateOptionPlaceholder, extractTemplateOptionDescription, addDatepickerPopupProperty, addOneColumnHeader, addOneColumnControl, addTwoColumnControl, addThreeColumnControl;
	return {
		setters: [],
		execute: function () {
			configurationModelInit = {
				activeLine: 1,
				listConfigStep: ['init', 'first', 'second', 'third'],
				stepIndicators: [true, false, false, false],
				configStepCounter: 0,
				submitButtonText: 'submit',
				cancelButtonText: 'cancel',
				lines: [{
					line: 1,
					activeColumn: 1,
					columns: [{
						numColumn: 1,
						exist: true,
						control: {
							type: 'none',
							key: 'none'
						}
					}]
				}]
			};
			// templateOptions: {
			//                     label: 'none',
			//                     placeholder: 'none',
			//                     required: false,
			//                     description: 'Descriptive text'
			//                   }
			configurationModelResult = {
				activeLine: 1,
				listConfigStep: ['init', 'first', 'second', 'third'],
				stepIndicators: [true, false, false, false],
				configStepCounter: 0,
				submitButtonText: 'submit',
				cancelButtonText: 'cancel',
				lines: []
			};

			isTemplateOptionDefined = function isTemplateOptionDefined(obj) {
				return typeof obj.templateOptions !== 'undefined' ? true : false;
			};

			extractTemplateOptionLabel = function extractTemplateOptionLabel(obj) {
				return typeof obj.templateOptions !== 'undefined' ? typeof obj.templateOptions.label !== 'undefined' ? obj.templateOptions.label : '' : '';
			};

			extractTemplateOptionDatepickerPopup = function extractTemplateOptionDatepickerPopup(obj) {
				return typeof obj.templateOptions !== 'undefined' ? typeof obj.templateOptions.datepickerPopup !== 'undefined' ? obj.templateOptions.datepickerPopup : '' : '';
			};

			extractFormlyExpressionProperties = function extractFormlyExpressionProperties(obj) {
				return typeof obj.formlyExpressionProperties !== 'undefined' ? angular.copy(obj.formlyExpressionProperties) : {};
			};

			extractFormlyValidators = function extractFormlyValidators(obj) {
				return typeof obj.formlyValidators !== 'undefined' ? angular.copy(obj.formlyValidators) : {};
			};

			extractFormlyValidation = function extractFormlyValidation(obj) {
				return typeof obj.formlyValidation !== 'undefined' ? angular.copy(obj.formlyValidation) : {};
			};

			extractTemplateOptionRequired = function extractTemplateOptionRequired(obj) {
				return typeof obj.templateOptions !== 'undefined' ? typeof obj.templateOptions.required !== 'undefined' ? obj.templateOptions.required : '' : '';
			};

			extractTemplateOptionOptions = function extractTemplateOptionOptions(obj) {
				return typeof obj.templateOptions !== 'undefined' ? typeof obj.templateOptions.options !== 'undefined' ? obj.templateOptions.options : '' : '';
			};

			extractTemplateOptionType = function extractTemplateOptionType(obj) {
				return typeof obj.subtype !== 'undefined' ? obj.subtype : '';
			};

			extractTemplateOptionPlaceholder = function extractTemplateOptionPlaceholder(obj) {
				return typeof obj.templateOptions !== 'undefined' ? typeof obj.templateOptions.placeholder !== 'undefined' ? obj.templateOptions.placeholder : '' : '';
			};

			extractTemplateOptionDescription = function extractTemplateOptionDescription(obj) {
				return typeof obj.templateOptions !== 'undefined' ? typeof obj.templateOptions.description !== 'undefined' ? obj.templateOptions.description : '' : '';
			};

			addDatepickerPopupProperty = function addDatepickerPopupProperty(fieldToPush, configurationModel, lineIndex) {
				fieldToPush.templateOptions.datepickerPopup = extractTemplateOptionDatepickerPopup(configurationModel.lines[lineIndex].columns[0].control);
			};

			addOneColumnHeader = function addOneColumnHeader(formlyModel, configurationModel, lineIndex) {
				var headerTemplateCol0 = '<div class="row"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><h2 class="text-center">' + extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control) + '<h2></div></div><hr/>';
				formlyModel.push({
					template: typeof configurationModel.lines[lineIndex].columns[0].control.type !== 'undefined' ? configurationModel.lines[lineIndex].columns[0].control.type === 'header' ? headerTemplateCol0 : '<div></div>' : '<div></div>'
				});
			};

			addOneColumnControl = function addOneColumnControl(formlyModel, configurationModel, lineIndex) {
				var fieldToPush = {
					className: 'col-xs-12',
					type: typeof configurationModel.lines[lineIndex].columns[0].control.type !== 'undefined' ? configurationModel.lines[lineIndex].columns[0].control.type === 'none' ? 'blank' : configurationModel.lines[lineIndex].columns[0].control.type : 'blank',
					key: typeof configurationModel.lines[lineIndex].columns[0].control.key !== 'undefined' ? configurationModel.lines[lineIndex].columns[0].control.key : 'blank' + Date.now(),
					templateOptions: {
						type: extractTemplateOptionType(configurationModel.lines[lineIndex].columns[0].control),
						label: extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[0].control),
						required: extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[0].control),
						placeholder: extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[0].control),
						description: extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control),
						options: extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[0].control)
					},
					expressionProperties: extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[0].control),
					validators: extractFormlyValidators(configurationModel.lines[lineIndex].columns[0].control),
					validation: extractFormlyValidation(configurationModel.lines[lineIndex].columns[0].control)
				};
				//////////////////////////////////////////////                 
				//datepicker additionnal particular property 
				//////////////////////////////////////////////                 
				if (configurationModel.lines[lineIndex].columns[0].control.type === 'datepicker') {
					addDatepickerPopupProperty(fieldToPush, configurationModel, lineIndex);
				}

				formlyModel.push(fieldToPush);
			};

			addTwoColumnControl = function addTwoColumnControl(formlyModel, configurationModel, lineIndex) {

				//text header is stored in "description" in templateOtion model
				var headerTemplateCol0 = {
					className: 'col-xs-6',
					template: '<div class="row"><div class=""><h2 class="text-center">' + extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control) + '<h2><hr/></div></div>'
				};

				var headerTemplateCol1 = {
					className: 'col-xs-6',
					template: '<div class="row"><div class=""><h2 class="text-center">' + extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[1].control) + '<h2><hr/></div></div>'
				};

				var controlCol0 = {
					className: 'col-xs-6',
					type: typeof configurationModel.lines[lineIndex].columns[0].control.type !== 'undefined' ? configurationModel.lines[lineIndex].columns[0].control.type === 'none' ? 'blank' : configurationModel.lines[lineIndex].columns[0].control.type : 'blank',
					key: typeof configurationModel.lines[lineIndex].columns[0].control.key !== 'undefined' ? configurationModel.lines[lineIndex].columns[0].control.key : 'blank' + Date.now(),
					templateOptions: {
						type: extractTemplateOptionType(configurationModel.lines[lineIndex].columns[0].control),
						label: extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[0].control),
						required: extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[0].control),
						placeholder: extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[0].control),
						description: extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control),
						options: extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[0].control)
					},
					expressionProperties: extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[0].control),
					validators: extractFormlyValidators(configurationModel.lines[lineIndex].columns[0].control),
					validation: extractFormlyValidation(configurationModel.lines[lineIndex].columns[0].control)
				};
				//////////////////////////////////////////////                 
				//datepicker additionnal particular property 
				//////////////////////////////////////////////                 
				if (configurationModel.lines[lineIndex].columns[0].control.type === 'datepicker') {
					addDatepickerPopupProperty(controlCol0, configurationModel, lineIndex);
				}

				var controlCol1 = {
					className: 'col-xs-6',
					type: typeof configurationModel.lines[lineIndex].columns[1].control.type !== 'undefined' ? configurationModel.lines[lineIndex].columns[1].control.type === 'none' ? 'blank' : configurationModel.lines[lineIndex].columns[1].control.type : 'blank',
					key: typeof configurationModel.lines[lineIndex].columns[1].control.key !== 'undefined' ? configurationModel.lines[lineIndex].columns[1].control.key : 'blank' + Date.now(),
					templateOptions: {
						type: extractTemplateOptionType(configurationModel.lines[lineIndex].columns[1].control),
						label: extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[1].control),
						required: extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[1].control),
						placeholder: extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[1].control),
						description: extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[1].control),
						options: extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[1].control)
					},
					expressionProperties: extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[1].control),
					validators: extractFormlyValidators(configurationModel.lines[lineIndex].columns[1].control),
					validation: extractFormlyValidation(configurationModel.lines[lineIndex].columns[1].control)
				};

				//////////////////////////////////////////////                 
				//datepicker additionnal particular property 
				//////////////////////////////////////////////                 
				if (configurationModel.lines[lineIndex].columns[1].control.type === 'datepicker') {
					addDatepickerPopupProperty(controlCol1, configurationModel, lineIndex);
				}

				var FieldGroup = [];

				if (configurationModel.lines[lineIndex].columns[0].control.type === 'header') {
					FieldGroup.push(headerTemplateCol0);
				} else {
					FieldGroup.push(controlCol0);
				}

				if (configurationModel.lines[lineIndex].columns[1].control.type === 'header') {
					FieldGroup.push(headerTemplateCol1);
				} else {
					FieldGroup.push(controlCol1);
				}

				formlyModel.push({
					className: 'row',
					fieldGroup: FieldGroup
				});
			};

			addThreeColumnControl = function addThreeColumnControl(formlyModel, configurationModel, lineIndex) {
				//text header is stored in "description" in templateOtion model
				var headerTemplateCol0 = {
					className: 'col-xs-4',
					template: '<div class="row"><div class=""><h2 class="text-center">' + extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control) + '<h2><hr/></div></div>'
				};

				var headerTemplateCol1 = {
					className: 'col-xs-4',
					template: '<div class="row"><div class=""><h2 class="text-center">' + extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[1].control) + '<h2><hr/></div></div>'
				};

				var headerTemplateCol2 = {
					className: 'col-xs-4',
					template: '<div class="row"><div class=""><h2 class="text-center">' + extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[2].control) + '<h2><hr/></div></div>'
				};

				var controlCol0 = {
					className: 'col-xs-4',
					type: typeof configurationModel.lines[lineIndex].columns[0].control.type !== 'undefined' ? configurationModel.lines[lineIndex].columns[0].control.type === 'none' ? 'blank' : configurationModel.lines[lineIndex].columns[0].control.type : 'blank',
					key: typeof configurationModel.lines[lineIndex].columns[0].control.key !== 'undefined' ? configurationModel.lines[lineIndex].columns[0].control.key : 'blank' + Date.now(),
					templateOptions: {
						type: extractTemplateOptionType(configurationModel.lines[lineIndex].columns[0].control),
						label: extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[0].control),
						required: extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[0].control),
						placeholder: extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[0].control),
						description: extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control),
						options: extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[0].control)
					},
					expressionProperties: extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[0].control),
					validators: extractFormlyValidators(configurationModel.lines[lineIndex].columns[0].control),
					validation: extractFormlyValidation(configurationModel.lines[lineIndex].columns[0].control)
				};
				//////////////////////////////////////////////                 
				//datepicker additionnal particular property 
				//////////////////////////////////////////////                 
				if (configurationModel.lines[lineIndex].columns[0].control.type === 'datepicker') {
					addDatepickerPopupProperty(controlCol0, configurationModel, lineIndex);
				}

				var controlCol1 = {
					className: 'col-xs-4',
					type: typeof configurationModel.lines[lineIndex].columns[1].control.type !== 'undefined' ? configurationModel.lines[lineIndex].columns[1].control.type === 'none' ? 'blank' : configurationModel.lines[lineIndex].columns[1].control.type : 'blank',
					key: typeof configurationModel.lines[lineIndex].columns[1].control.key !== 'undefined' ? configurationModel.lines[lineIndex].columns[1].control.key : 'blank' + Date.now(),
					templateOptions: {
						type: extractTemplateOptionType(configurationModel.lines[lineIndex].columns[1].control),
						label: extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[1].control),
						required: extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[1].control),
						placeholder: extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[1].control),
						description: extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[1].control),
						options: extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[1].control)
					},
					expressionProperties: extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[1].control),
					validators: extractFormlyValidators(configurationModel.lines[lineIndex].columns[1].control),
					validation: extractFormlyValidation(configurationModel.lines[lineIndex].columns[1].control)
				};
				//////////////////////////////////////////////                 
				//datepicker additionnal particular property 
				//////////////////////////////////////////////                 
				if (configurationModel.lines[lineIndex].columns[1].control.type === 'datepicker') {
					addDatepickerPopupProperty(controlCol1, configurationModel, lineIndex);
				}
				var controlCol2 = {
					className: 'col-xs-4',
					type: typeof configurationModel.lines[lineIndex].columns[2].control.type !== 'undefined' ? configurationModel.lines[lineIndex].columns[2].control.type === 'none' ? 'blank' : configurationModel.lines[lineIndex].columns[2].control.type : 'blank',
					key: typeof configurationModel.lines[lineIndex].columns[2].control.key !== 'undefined' ? configurationModel.lines[lineIndex].columns[2].control.key : 'blank' + Date.now(),
					templateOptions: {
						type: extractTemplateOptionType(configurationModel.lines[lineIndex].columns[2].control),
						label: extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[2].control),
						required: extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[2].control),
						placeholder: extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[2].control),
						description: extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[2].control),
						options: extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[2].control)
					},
					expressionProperties: extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[2].control),
					validators: extractFormlyValidators(configurationModel.lines[lineIndex].columns[2].control),
					validation: extractFormlyValidation(configurationModel.lines[lineIndex].columns[2].control)
				};
				//////////////////////////////////////////////                 
				//datepicker additionnal particular property 
				//////////////////////////////////////////////                 
				if (configurationModel.lines[lineIndex].columns[2].control.type === 'datepicker') {
					addDatepickerPopupProperty(controlCol2, configurationModel, lineIndex);
				}

				var FieldGroup = [];

				if (configurationModel.lines[lineIndex].columns[0].control.type === 'header') {
					FieldGroup.push(headerTemplateCol0);
				} else {
					FieldGroup.push(controlCol0);
				}

				if (configurationModel.lines[lineIndex].columns[1].control.type === 'header') {
					FieldGroup.push(headerTemplateCol1);
				} else {
					FieldGroup.push(controlCol1);
				}

				if (configurationModel.lines[lineIndex].columns[2].control.type === 'header') {
					FieldGroup.push(headerTemplateCol2);
				} else {
					FieldGroup.push(controlCol2);
				}

				formlyModel.push({
					className: 'row',
					fieldGroup: FieldGroup
				});
			};

			_export('configurationModelInit', configurationModelInit);

			_export('configurationModelResult', configurationModelResult);

			_export('isTemplateOptionDefined', isTemplateOptionDefined);

			_export('extractTemplateOptionLabel', extractTemplateOptionLabel);

			_export('extractTemplateOptionDatepickerPopup', extractTemplateOptionDatepickerPopup);

			_export('extractFormlyExpressionProperties', extractFormlyExpressionProperties);

			_export('extractFormlyValidators', extractFormlyValidators);

			_export('extractFormlyValidation', extractFormlyValidation);

			_export('extractTemplateOptionRequired', extractTemplateOptionRequired);

			_export('extractTemplateOptionOptions', extractTemplateOptionOptions);

			_export('extractTemplateOptionType', extractTemplateOptionType);

			_export('extractTemplateOptionPlaceholder', extractTemplateOptionPlaceholder);

			_export('extractTemplateOptionDescription', extractTemplateOptionDescription);

			_export('addDatepickerPopupProperty', addDatepickerPopupProperty);

			_export('addOneColumnHeader', addOneColumnHeader);

			_export('addOneColumnControl', addOneColumnControl);

			_export('addTwoColumnControl', addTwoColumnControl);

			_export('addThreeColumnControl', addThreeColumnControl);
		}
	};
});
$__System.register('18', ['9', '17', 'a'], function (_export) {
	var _createClass, configurationModelInit, configurationModelResult, isTemplateOptionDefined, extractTemplateOptionLabel, extractTemplateOptionDatepickerPopup, extractFormlyExpressionProperties, extractFormlyValidators, extractFormlyValidation, extractTemplateOptionRequired, extractTemplateOptionOptions, extractTemplateOptionType, extractTemplateOptionPlaceholder, extractTemplateOptionDescription, addDatepickerPopupProperty, addOneColumnHeader, addOneColumnControl, addTwoColumnControl, addThreeColumnControl, _classCallCheck, FORMLY_PROXY_SERVICE, $formlyProxy;

	return {
		setters: [function (_) {
			_createClass = _['default'];
		}, function (_2) {
			configurationModelInit = _2.configurationModelInit;
			configurationModelResult = _2.configurationModelResult;
			isTemplateOptionDefined = _2.isTemplateOptionDefined;
			extractTemplateOptionLabel = _2.extractTemplateOptionLabel;
			extractTemplateOptionDatepickerPopup = _2.extractTemplateOptionDatepickerPopup;
			extractFormlyExpressionProperties = _2.extractFormlyExpressionProperties;
			extractFormlyValidators = _2.extractFormlyValidators;
			extractFormlyValidation = _2.extractFormlyValidation;
			extractTemplateOptionRequired = _2.extractTemplateOptionRequired;
			extractTemplateOptionOptions = _2.extractTemplateOptionOptions;
			extractTemplateOptionType = _2.extractTemplateOptionType;
			extractTemplateOptionPlaceholder = _2.extractTemplateOptionPlaceholder;
			extractTemplateOptionDescription = _2.extractTemplateOptionDescription;
			addDatepickerPopupProperty = _2.addDatepickerPopupProperty;
			addOneColumnHeader = _2.addOneColumnHeader;
			addOneColumnControl = _2.addOneColumnControl;
			addTwoColumnControl = _2.addTwoColumnControl;
			addThreeColumnControl = _2.addThreeColumnControl;
		}, function (_a) {
			_classCallCheck = _a['default'];
		}],
		execute: function () {
			/* global angular */
			'use strict';

			FORMLY_PROXY_SERVICE = '$formlyProxy';

			$formlyProxy = (function () {
				function $formlyProxy() {
					_classCallCheck(this, $formlyProxy);

					this.init();
				}

				_createClass($formlyProxy, [{
					key: 'init',
					value: function init() {}
				}, {
					key: 'initConfigurationEditFromScratch',
					value: function initConfigurationEditFromScratch(configurationModel) {
						angular.copy(configurationModelInit, configurationModel);
					}
				}, {
					key: 'bindConfigurationLines',
					value: function bindConfigurationLines(configurationModel, lines) {
						if (angular.isArray(lines)) {
							var configModelResult = configurationModelResult;
							configModelResult.lines = [].concat(lines);
							angular.copy(configModelResult, configurationModel);
							return this.getMessageObject('configuration model is bound', 'lines are bound to configuration model.');
						} else {
							return this.getErrorObject('lines is not an array', 'Checks lines type, it is not an array.');
						}
					}
				}, {
					key: 'applyConfigurationToformlyModel',
					value: function applyConfigurationToformlyModel(configurationModel, formlyModel, formlyDataModel) {
						this.resetFormlyModel(formlyModel);
						this.resetDataModel(formlyDataModel);
						/**
      	* manage header here line0 
      	*/
						var lineNumber = configurationModel.lines.length;
						for (var i = 0; i < lineNumber; i++) {
							//1 column line control
							if (configurationModel.lines[i].columns.length === 1) {
								//test if template control = header
								if (configurationModel.lines[i].columns[0].control.type === 'header') {
									addOneColumnHeader(formlyModel, configurationModel, i);
								} else {
									addOneColumnControl(formlyModel, configurationModel, i);
								}
							}
							if (configurationModel.lines[i].columns.length === 2) {
								addTwoColumnControl(formlyModel, configurationModel, i);
							}
							if (configurationModel.lines[i].columns.length === 3) {
								addThreeColumnControl(formlyModel, configurationModel, i);
							}
						}
					}
				}, {
					key: 'getMessageObject',
					value: function getMessageObject(messageTitle, messageBody) {
						var messageObj = {
							noError: true,
							title: messageTitle,
							Message: messageBody
						};
						return messageObj;
					}
				}]);

				return $formlyProxy;
			})();

			$formlyProxy.$inject = [];

			_export('default', $formlyProxy);

			_export('FORMLY_PROXY_SERVICE', FORMLY_PROXY_SERVICE);
		}
	};
});
$__System.register('19', ['18'], function (_export) {
									/* global angular */
									'use strict';

									var $formlyProxy, FORMLY_PROXY_SERVICE, FORMLY_PROXY_MODULE_NAME;
									return {
																		setters: [function (_) {
																											$formlyProxy = _['default'];
																											FORMLY_PROXY_SERVICE = _.FORMLY_PROXY_SERVICE;
																		}],
																		execute: function () {
																											FORMLY_PROXY_MODULE_NAME = 'formlyProxyModule';

																											_export('default', angular.module(FORMLY_PROXY_MODULE_NAME, []).service(FORMLY_PROXY_SERVICE, $formlyProxy));
																		}
									};
});
$__System.register('1a', ['9', 'a'], function (_export) {
	var _createClass, _classCallCheck, SELECT_OPTION_MANAGE_NAME, selectOptionManage;

	return {
		setters: [function (_) {
			_createClass = _['default'];
		}, function (_a) {
			_classCallCheck = _a['default'];
		}],
		execute: function () {
			/* global angular */

			'use strict';

			SELECT_OPTION_MANAGE_NAME = 'selectOptionManage';

			selectOptionManage = (function () {
				function selectOptionManage() {
					_classCallCheck(this, selectOptionManage);
				}

				_createClass(selectOptionManage, [{
					key: 'initModel',
					value: function initModel(selectObj) {
						this.resetModel(selectObj);
					}
				}, {
					key: 'resetModel',
					value: function resetModel(selectObj) {
						var zeroModel = { rows: [] };
						angular.copy(zeroModel, selectObj);
					}
				}, {
					key: 'isOptionUnique',
					value: function isOptionUnique(selectObj, textValue) {
						for (var i = selectObj.rows.length - 1; i >= 0; i--) {
							if (selectObj.rows[i].option === textValue) return false;
						}
						return true;
					}
				}, {
					key: 'isOptionValidFormat',
					value: function isOptionValidFormat(textValue) {
						if (textValue !== '') return true;
						return false;
					}
				}, {
					key: 'addNewOptionRadio',
					value: function addNewOptionRadio(selectObj, newOptionText) {
						var fullResponse = {
							resultFlag: false,
							details: ''
						};
						var checkResult = this.validOption(selectObj, newOptionText);
						if (checkResult.resultFlag === true) {

							var newOption = {
								option: newOptionText,
								order: selectObj.rows.length
							};

							selectObj.rows.push(newOption);
							fullResponse.resultFlag = true;
							fullResponse.details = '';
							return fullResponse;
						} else {
							angular.copy(checkResult, fullResponse);
							return fullResponse;
						}
					}
				}, {
					key: 'addNewOptionBasicSelect',
					value: function addNewOptionBasicSelect(selectObj, newOptionText) {
						var fullResponse = {
							resultFlag: false,
							details: ''
						};

						var checkResult = this.validOption(selectObj, newOptionText);
						if (checkResult.resultFlag === true) {

							var newOption = {
								option: newOptionText,
								order: selectObj.rows.length
							};

							selectObj.rows.push(newOption);
							fullResponse.resultFlag = true;
							fullResponse.details = '';

							return fullResponse;
						} else {
							angular.copy(checkResult, fullResponse);
							return fullResponse;
						}
					}
				}, {
					key: 'addNewOptionGroupedSelect',
					value: function addNewOptionGroupedSelect(selectObj, newOptionText, newOptionGroup) {
						var fullResponse = {
							resultFlag: false,
							details: ''
						};

						var checkResult = this.validOption(selectObj, newOptionText);

						if (checkResult.resultFlag === true) {

							var newOption = {
								option: newOptionText,
								group: newOptionGroup,
								order: selectObj.rows.length
							};

							selectObj.rows.push(newOption);
							fullResponse.resultFlag = true;
							fullResponse.details = '';
							return fullResponse;
						} else {
							angular.copy(checkResult, fullResponse);
							return fullResponse;
						}
					}
				}, {
					key: 'removeOption',
					value: function removeOption(selectObj, AtIndex) {
						var fullResponse = {
							resultFlag: false,
							details: ''
						};

						if (AtIndex !== -1) {
							selectObj.rows.splice(AtIndex, 1);
							fullResponse.resultFlag = true;
							fullResponse.details = '';
							return fullResponse;
						} else {
							fullResponse.resultFlag = false;
							fullResponse.details = 'Option index not valid';
							return fullResponse;
						}
					}
				}, {
					key: 'upthisOption',
					value: function upthisOption(selectObj, indexOption) {
						var fullResponse = {
							resultFlag: false,
							details: ''
						};

						if (indexOption > -1) {
							if (indexOption > 0) {
								if (selectObj.rows[indexOption - 1]) {
									var currentOption = selectObj.rows[indexOption];
									selectObj.rows.splice(indexOption, 1);
									selectObj.rows.splice(indexOption - 1, 0, currentOption);
									fullResponse.resultFlag = true;
									fullResponse.details = '';
									return fullResponse;
								} else {
									fullResponse.resultFlag = false;
									fullResponse.details = 'Can\'t retreive option from option index';
									return fullResponse;
								}
							} else {
								fullResponse.resultFlag = true;
								fullResponse.details = '';
								return fullResponse;
							}
						} else {
							fullResponse.resultFlag = false;
							fullResponse.details = 'Option index not valid';
							return fullResponse;
						}
					}
				}, {
					key: 'downthisOption',
					value: function downthisOption(selectObj, indexOption) {
						var fullResponse = {
							resultFlag: false,
							details: ''
						};

						if (indexOption > -1) {
							if (indexOption < selectObj.rows.length - 1) {
								if (selectObj.rows[indexOption + 1]) {
									var currentOption = selectObj.rows[indexOption];
									selectObj.rows.splice(indexOption, 1);
									selectObj.rows.splice(indexOption + 1, 0, currentOption);
									fullResponse.resultFlag = true;
									fullResponse.details = '';
									return fullResponse;
								} else {
									fullResponse.resultFlag = false;
									fullResponse.details = 'Can\'t retreive option from option index';
									return fullResponse;
								}
							} else {
								fullResponse.resultFlag = true;
								fullResponse.details = '';
								return fullResponse;
							}
						} else {
							fullResponse.resultFlag = false;
							fullResponse.details = 'Option index not valid';
							return fullResponse;
						}
					}
				}, {
					key: 'validOption',
					value: function validOption(selectObj, newOptionText) {
						var fullResponse = {
							resultFlag: false,
							details: ''
						};

						if (typeof newOptionText === 'undefined') {
							fullResponse.resultFlag = false;
							fullResponse.details = 'Entered option is empty';
							return fullResponse;
						}

						if (newOptionText !== '') {
							for (var i = selectObj.rows.length - 1; i >= 0; i--) {
								if (selectObj.rows[i].option === newOptionText) {
									fullResponse.resultFlag = false;
									fullResponse.details = 'Entered option is not unique';
									return fullResponse;
								}
							}
							fullResponse.resultFlag = true;
							fullResponse.details = '';
							return fullResponse;
						}
						fullResponse.resultFlag = false;
						fullResponse.details = 'Entered option is empty';
						return fullResponse;
					}
				}]);

				return selectOptionManage;
			})();

			selectOptionManage.$inject = [];

			_export('default', selectOptionManage);

			_export('SELECT_OPTION_MANAGE_NAME', SELECT_OPTION_MANAGE_NAME);
		}
	};
});
$__System.register('1b', ['1a'], function (_export) {
									/* global angular */
									'use strict';

									var selectOptionManage, SELECT_OPTION_MANAGE_NAME, COMMON_MODULE_NAME;
									return {
																		setters: [function (_a) {
																											selectOptionManage = _a['default'];
																											SELECT_OPTION_MANAGE_NAME = _a.SELECT_OPTION_MANAGE_NAME;
																		}],
																		execute: function () {
																											COMMON_MODULE_NAME = 'commonModule';

																											_export('default', angular.module(COMMON_MODULE_NAME, []).service(SELECT_OPTION_MANAGE_NAME, selectOptionManage));
																		}
									};
});
$__System.register('1c', ['2', '4', '5', '12', '13', '16', '19', '1b'], function (_export) {
	/* global angular */
	'use strict';

	var easyFormStepWayConfig, EASY_FORM_VERSION_NAME, EASY_FORM_VERSION_VALUE, formlyConfig, easyFormStepWayCoreModule, easyFormStepwayMainModule, easyFormStepwayModalModule, easyFormStepwayModalProxyModule, easyFormStepwayFormlyProxyModule, easyFormStepwayCommonModules, STEP_WAY_MODULE_NAME, STEP_WAY_MODULES_INJECT, mainModule;
	return {
		setters: [function (_) {
			easyFormStepWayConfig = _['default'];
			EASY_FORM_VERSION_NAME = _.EASY_FORM_VERSION_NAME;
			EASY_FORM_VERSION_VALUE = _.EASY_FORM_VERSION_VALUE;
		}, function (_2) {
			formlyConfig = _2['default'];
		}, function (_3) {
			easyFormStepWayCoreModule = _3['default'];
		}, function (_4) {
			easyFormStepwayMainModule = _4['default'];
		}, function (_5) {
			easyFormStepwayModalModule = _5['default'];
		}, function (_6) {
			easyFormStepwayModalProxyModule = _6['default'];
		}, function (_7) {
			easyFormStepwayFormlyProxyModule = _7['default'];
		}, function (_b) {
			easyFormStepwayCommonModules = _b['default'];
		}],
		execute: function () {
			STEP_WAY_MODULE_NAME = 'eda.easyformGen.stepway';
			STEP_WAY_MODULES_INJECT = [easyFormStepWayCoreModule.name, easyFormStepwayMainModule.name, easyFormStepwayModalModule.name, easyFormStepwayModalProxyModule.name, easyFormStepwayFormlyProxyModule.name, easyFormStepwayCommonModules.name];
			mainModule = angular.module(STEP_WAY_MODULE_NAME, STEP_WAY_MODULES_INJECT).value(EASY_FORM_VERSION_NAME, EASY_FORM_VERSION_VALUE).config(formlyConfig).config(easyFormStepWayConfig);

			_export('default', mainModule);
		}
	};
});
$__System.register('1', ['1c'], function (_export) {
  /* global angular */
  'use strict';

  var mainModule;
  return {
    setters: [function (_c) {
      mainModule = _c['default'];
    }],
    execute: function () {

      angular.element(document).ready(function () {
        angular.bootstrap(document, [mainModule.name], { strictDi: true });
      });
    }
  };
});
})
(function(factory) {
  factory();
});
//# sourceMappingURL=eda.stepway-ES6.js.map