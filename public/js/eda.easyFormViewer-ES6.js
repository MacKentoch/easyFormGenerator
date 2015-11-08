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

(function(__global) {
  var loader = $__System;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++)
      if (this[i] === item)
        return i;
    return -1;
  }

  function readMemberExpression(p, value) {
    var pParts = p.split('.');
    while (pParts.length)
      value = value[pParts.shift()];
    return value;
  }

  // bare minimum ignores for IE8
  var ignoredGlobalProps = ['_g', 'sessionStorage', 'localStorage', 'clipboardData', 'frames', 'external', 'mozAnimationStartTime', 'webkitStorageInfo', 'webkitIndexedDB'];

  var globalSnapshot;

  function forEachGlobal(callback) {
    if (Object.keys)
      Object.keys(__global).forEach(callback);
    else
      for (var g in __global) {
        if (!hasOwnProperty.call(__global, g))
          continue;
        callback(g);
      }
  }

  function forEachGlobalValue(callback) {
    forEachGlobal(function(globalName) {
      if (indexOf.call(ignoredGlobalProps, globalName) != -1)
        return;
      try {
        var value = __global[globalName];
      }
      catch (e) {
        ignoredGlobalProps.push(globalName);
      }
      callback(globalName, value);
    });
  }

  loader.set('@@global-helpers', loader.newModule({
    prepareGlobal: function(moduleName, exportName, globals) {
      // disable module detection
      var curDefine = __global.define;
       
      __global.define = undefined;
      __global.exports = undefined;
      if (__global.module && __global.module.exports)
        __global.module = undefined;

      // set globals
      var oldGlobals;
      if (globals) {
        oldGlobals = {};
        for (var g in globals) {
          oldGlobals[g] = globals[g];
          __global[g] = globals[g];
        }
      }

      // store a complete copy of the global object in order to detect changes
      if (!exportName) {
        globalSnapshot = {};

        forEachGlobalValue(function(name, value) {
          globalSnapshot[name] = value;
        });
      }

      // return function to retrieve global
      return function() {
        var globalValue;

        if (exportName) {
          globalValue = readMemberExpression(exportName, __global);
        }
        else {
          var singleGlobal;
          var multipleExports;
          var exports = {};

          forEachGlobalValue(function(name, value) {
            if (globalSnapshot[name] === value)
              return;
            if (typeof value == 'undefined')
              return;
            exports[name] = value;

            if (typeof singleGlobal != 'undefined') {
              if (!multipleExports && singleGlobal !== value)
                multipleExports = true;
            }
            else {
              singleGlobal = value;
            }
          });
          globalValue = multipleExports ? exports : singleGlobal;
        }

        // revert globals
        if (oldGlobals) {
          for (var g in oldGlobals)
            __global[g] = oldGlobals[g];
        }
        __global.define = curDefine;

        return globalValue;
      };
    }
  }));

})(typeof self != 'undefined' ? self : global);

$__System.registerDynamic("3", [], true, function(require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = "<div class=\"easyFormViewer\">\n\t\n\t<form \tng-submit=\"vm.onSubmit()\"\n\t\t\t\t\tname=\"vm.form\"> \n\t\t<formly-form \tmodel=\"vm.model\" \n\t\t\t\t\t\t\t\t\tfields=\"vm.fields\" \n\t\t\t\t\t\t\t\t\tform=\"vm.form\"> \n\t\t\t\n\t\t\t<div class=\"pull-right\">\n\t\t\t\t<button type=\"submit\" class=\"btn btn-primary\" \n\t\t\t\t\t\t\t\tng-disabled=\"vm.form.$invalid\"\n\t\t\t\t\t\t\t\tng-click=\"vm.edaSubmitThisDataModel();\">{{vm.submitText}}</button>\n\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" \n\t\t\t\t\t\t\t\tng-click=\"vm.edaCancelEvent();\">{{vm.cancelText}}</button>\t\t\t\t\n\t\t\t</div>\t\t\t\t\t\t\n\n\t\t</formly-form> \n\t</form>\n\n</div>";
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("5", [], true, function(require, exports, module) {
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

$__System.registerDynamic("6", ["5"], true, function(require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = require("5");
  module.exports = function defineProperty(it, key, desc) {
    return $.setDesc(it, key, desc);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("7", ["6"], true, function(require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": require("6"),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("8", ["7"], true, function(require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var _Object$defineProperty = require("7")["default"];
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

$__System.registerDynamic("9", [], true, function(require, exports, module) {
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

$__System.registerDynamic("d", [], false, function(__require, __exports, __module) {
  var _retrieveGlobal = $__System.get("@@global-helpers").prepareGlobal(__module.id, null, null);
  (function() {})();
  return _retrieveGlobal();
});

$__System.register("2", [], function (_export) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export("default", window.angular);
    }
  };
});
$__System.register("4", [], function (_export) {
	/* global angular */

	"use strict";

	var EMPTY_FIELD_MODEL, emptyEdaFieldsModel, returnAttributeDataModelIfNotEmpty, returnAttributeConfigurationLinesIfNotEmpty;
	return {
		setters: [],
		execute: function () {
			EMPTY_FIELD_MODEL = [{
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

			/**
   	* empty fields model : to display at least an empty line
   	* otherwise would look like ugly empty line like it were a bug
   	*/

			emptyEdaFieldsModel = function emptyEdaFieldsModel() {
				return angular.copy(EMPTY_FIELD_MODEL);
			};

			returnAttributeDataModelIfNotEmpty = function returnAttributeDataModelIfNotEmpty(edaEasyFormGeneratorModel) {
				var dataModelToReturn = angular.isArray(edaEasyFormGeneratorModel.dataModel) ? edaEasyFormGeneratorModel.dataModel.length > 0 ? edaEasyFormGeneratorModel.dataModel : [] : [];
				return dataModelToReturn;
			};

			returnAttributeConfigurationLinesIfNotEmpty = function returnAttributeConfigurationLinesIfNotEmpty(loadedFieldModel) {
				var edaEasyFormGeneratorModelToReturn = angular.isArray(loadedFieldModel) ? loadedFieldModel.length > 0 ? loadedFieldModel : emptyEdaFieldsModel() : emptyEdaFieldsModel();
				return edaEasyFormGeneratorModelToReturn;
			};

			_export("emptyEdaFieldsModel", emptyEdaFieldsModel);

			_export("returnAttributeDataModelIfNotEmpty", returnAttributeDataModelIfNotEmpty);

			_export("returnAttributeConfigurationLinesIfNotEmpty", returnAttributeConfigurationLinesIfNotEmpty);
		}
	};
});
$__System.register('a', ['8', '9'], function (_export) {
	var _createClass, _classCallCheck, EASY_FORM_VIEWER_CONTROLLER, EASY_FORM_VIEWER_CONTROLLERAS, edaEasyFormViewerController;

	return {
		setters: [function (_) {
			_createClass = _['default'];
		}, function (_2) {
			_classCallCheck = _2['default'];
		}],
		execute: function () {
			'use strict';

			EASY_FORM_VIEWER_CONTROLLER = 'edaEasyFormViewerCtrl';
			EASY_FORM_VIEWER_CONTROLLERAS = 'vm';

			edaEasyFormViewerController = (function () {
				function edaEasyFormViewerController() {
					_classCallCheck(this, edaEasyFormViewerController);

					this.init();
				}

				_createClass(edaEasyFormViewerController, [{
					key: 'init',
					value: function init() {
						this.model = {};
						this.fields = {};
						this.hasJustSumitted = false;
						this.hasJustCancelled = false;
					}
				}, {
					key: 'edaSubmitThisDataModel',
					value: function edaSubmitThisDataModel() {
						this.hasJustSumitted = true;
					}
				}, {
					key: 'edaCancelEvent',
					value: function edaCancelEvent() {
						this.hasJustCancelled = true;
					}
				}]);

				return edaEasyFormViewerController;
			})();

			edaEasyFormViewerController.$inject = [];

			_export('default', edaEasyFormViewerController);

			_export('EASY_FORM_VIEWER_CONTROLLER', EASY_FORM_VIEWER_CONTROLLER);

			_export('EASY_FORM_VIEWER_CONTROLLERAS', EASY_FORM_VIEWER_CONTROLLERAS);
		}
	};
});
$__System.register('b', ['3', '4', 'a'], function (_export) {
	/* global angular */
	'use strict';

	var easyFormViewerTemplate, emptyEdaFieldsModel, returnAttributeDataModelIfNotEmpty, returnAttributeConfigurationLinesIfNotEmpty, edaEasyFormViewerController, EASY_FORM_VIEWER_CONTROLLER, EASY_FORM_VIEWER_CONTROLLERAS, EASY_FORM_VIEWER_DIRECTIVE_NAME;

	function edaFormViewerDirective(modelsTranslator) {
		var directive = {
			restrict: 'E',
			scope: {
				edaEasyFormViewerDataModel: '=?',
				edaEasyFormViewerEasyFormGeneratorFieldsModel: '=?',
				edaEasyFormViewerSubmitButtonText: '@?',
				edaEasyFormViewerCancelButtonText: '@?',
				edaEasyFormViewerSubmitFormEvent: '&?',
				edaEasyFormViewerCancelFormEvent: '&?'
			},
			replace: false,
			controller: EASY_FORM_VIEWER_CONTROLLER,
			controllerAs: EASY_FORM_VIEWER_CONTROLLERAS,
			templateUrl: easyFormViewerTemplate,
			link: linkFct
		};
		return directive;

		function linkFct(scope, element, attrs) {

			scope.vm.model = {};
			scope.vm.fields = loadFieldsModel();
			scope.vm.submitText = scope.edaEasyFormViewerSubmitButtonText || 'Submit';
			scope.vm.cancelText = scope.edaEasyFormViewerCancelButtonText || 'Cancel';

			scope.$watch(fieldsModelToWatch, fieldsModelWatcher, true);
			scope.$watch(dataModelToWatch, dataModelWatcher, true);
			scope.$watch(submitBtnTextToWatch, submitBtnTextWatcher);
			scope.$watch(cancelBtnTextToWatch, cancelBtnTextWatcher);
			scope.$watch(submitEventToWatch, submitEventWatcher);
			scope.$watch(cancelEventToWatch, cancelEventWatcher);

			function dataModelToWatch() {
				return scope.vm.model;
			}

			function fieldsModelToWatch() {
				return scope.edaEasyFormViewerEasyFormGeneratorFieldsModel;
			}

			function submitBtnTextToWatch() {
				return scope.edaEasyFormViewerSubmitButtonText;
			}

			function cancelBtnTextToWatch() {
				return scope.edaEasyFormViewerCancelButtonText;
			}

			function submitEventToWatch() {
				return scope.vm.hasJustSumitted;
			}

			function cancelEventToWatch() {
				return scope.vm.hasJustCancelled;
			}

			function fieldsModelWatcher(newFieldsModel, oldFieldsModel) {
				scope.vm.fields = loadExistingConfigurationModel(newFieldsModel);
			}

			function submitBtnTextWatcher(newSubmitBtntext, oldSubmitBtntext) {
				if (newSubmitBtntext !== oldSubmitBtntext) {
					scope.vm.submitText = newSubmitBtntext || 'Submit';
				}
			}

			function cancelBtnTextWatcher(newCancelBtntext, oldCancelBtntext) {
				if (newCancelBtntext !== oldCancelBtntext) {
					scope.vm.cancelText = newCancelBtntext || 'Submit';
				}
			}

			function dataModelWatcher(newDataModel, PreiousDataModel) {
				scope.edaEasyFormViewerDataModel = newDataModel;
			}

			function submitEventWatcher(newSubmitEvent, oldSubmitEvent) {
				if (newSubmitEvent === true) {
					if (angular.isFunction(scope.edaEasyFormViewerSubmitFormEvent)) {
						var _dataModelSubmitted = scope.vm.model;
						scope.edaEasyFormViewerSubmitFormEvent({ dataModelSubmitted: _dataModelSubmitted });
					}
				}
				scope.vm.hasJustSumitted = false;
			}

			function cancelEventWatcher(newCancelEvent, oldCancelEvent) {
				if (newCancelEvent === true) {
					if (angular.isFunction(scope.edaEasyFormViewerCancelFormEvent)) {
						scope.edaEasyFormViewerCancelFormEvent();
					}
				}
				scope.vm.hasJustCancelled = false;
			}

			/**
   	* TODO : check if formly or easy form generato fields model
   	* 
   	* by default or if both -> easy for generator is chosen
   	*/
			function loadFieldsModel() {

				var initialFieldsModel = angular.isArray(scope.edaEasyFormViewerEasyFormGeneratorFieldsModel) ?
				//translate easy form generator to formly fields model
				loadExistingConfigurationModel(scope.edaEasyFormViewerEasyFormGeneratorFieldsModel) : {};

				return initialFieldsModel;
			}

			function loadExistingConfigurationModel(loadedFieldModel) {

				if (angular.isArray(loadedFieldModel)) {
					var configlines = returnAttributeConfigurationLinesIfNotEmpty(loadedFieldModel);
					var formlyFieldsModel = [];

					scope.configurationLoaded = {};

					modelsTranslator.bindConfigurationLines(scope.configurationLoaded, configlines);
					/**
     	* rebind special control properties :
     	* 
     	* formly expression properties
     	* Validators
     	* Validation
     	*/
					modelsTranslator.refreshControlFormlyExpressionProperties(scope.configurationLoaded);
					modelsTranslator.refreshControlFormlyValidators(scope.configurationLoaded);
					modelsTranslator.refreshControlFormlyValidation(scope.configurationLoaded);

					//apply configuration model
					scope.configuration = angular.copy(scope.configurationLoaded);

					//apply formly model
					modelsTranslator.applyConfigurationToformlyModel(scope.configurationLoaded, formlyFieldsModel, scope.vm.model);

					return formlyFieldsModel;
				}
			}
		}
	}

	return {
		setters: [function (_) {
			easyFormViewerTemplate = _['default'];
		}, function (_2) {
			emptyEdaFieldsModel = _2.emptyEdaFieldsModel;
			returnAttributeDataModelIfNotEmpty = _2.returnAttributeDataModelIfNotEmpty;
			returnAttributeConfigurationLinesIfNotEmpty = _2.returnAttributeConfigurationLinesIfNotEmpty;
		}, function (_a) {
			edaEasyFormViewerController = _a['default'];
			EASY_FORM_VIEWER_CONTROLLER = _a.EASY_FORM_VIEWER_CONTROLLER;
			EASY_FORM_VIEWER_CONTROLLERAS = _a.EASY_FORM_VIEWER_CONTROLLERAS;
		}],
		execute: function () {
			EASY_FORM_VIEWER_DIRECTIVE_NAME = 'edaEasyFormViewer';
			edaFormViewerDirective.$inject = ['modelsTranslator'];

			_export('default', edaFormViewerDirective);

			_export('EASY_FORM_VIEWER_DIRECTIVE_NAME', EASY_FORM_VIEWER_DIRECTIVE_NAME);
		}
	};
});
$__System.register('c', ['b'], function (_export) {
	/* global angular */
	'use strict';

	var edaFormViewerDirective, EASY_FORM_VIEWER_DIRECTIVE_NAME, FORM_VIEWER_MAIN_MODULE_NAME;
	return {
		setters: [function (_b) {
			edaFormViewerDirective = _b['default'];
			EASY_FORM_VIEWER_DIRECTIVE_NAME = _b.EASY_FORM_VIEWER_DIRECTIVE_NAME;
		}],
		execute: function () {
			FORM_VIEWER_MAIN_MODULE_NAME = 'edaFormViewerMainModule';

			_export('default', angular.module(FORM_VIEWER_MAIN_MODULE_NAME, []).directive(EASY_FORM_VIEWER_DIRECTIVE_NAME, edaFormViewerDirective));
		}
	};
});
$__System.register('1', ['2', 'c', 'd'], function (_export) {
	/* global angular */
	'use strict';

	var edaFormViewerMainModule, edaFormViewerModelTranslatorModule, DEP_TO_INJECT_IN_MAIN, MAIN_MODULE_NAME, mainModule;
	return {
		setters: [function (_) {}, function (_c) {
			edaFormViewerMainModule = _c['default'];
		}, function (_d) {
			edaFormViewerModelTranslatorModule = _d['default'];
		}],
		execute: function () {
			DEP_TO_INJECT_IN_MAIN = [edaFormViewerMainModule.name, edaFormViewerModelTranslatorModule.name];
			MAIN_MODULE_NAME = 'eda.easyFormViewer';
			mainModule = angular.module(MAIN_MODULE_NAME, DEP_TO_INJECT_IN_MAIN);

			_export('default', mainModule);
		}
	};
});
})
(function(factory) {
  factory();
});
//# sourceMappingURL=eda.easyFormViewer-ES6.js.map