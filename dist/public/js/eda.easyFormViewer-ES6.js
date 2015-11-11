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

	function edaFormViewerDirective($modelsTranslator) {
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
			template: easyFormViewerTemplate,
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

					$modelsTranslator.bindConfigurationLines(scope.configurationLoaded, configlines);
					/**
     	* rebind special control properties :
     	* 
     	* formly expression properties
     	* Validators
     	* Validation
     	*/
					$modelsTranslator.refreshControlFormlyExpressionProperties(scope.configurationLoaded);
					$modelsTranslator.refreshControlFormlyValidators(scope.configurationLoaded);
					$modelsTranslator.refreshControlFormlyValidation(scope.configurationLoaded);

					//apply configuration model
					scope.configuration = angular.copy(scope.configurationLoaded);

					//apply formly model
					$modelsTranslator.applyConfigurationToformlyModel(scope.configurationLoaded, formlyFieldsModel, scope.vm.model);

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
			edaFormViewerDirective.$inject = ['$modelsTranslator'];

			_export('default', edaFormViewerDirective);

			_export('EASY_FORM_VIEWER_DIRECTIVE_NAME', EASY_FORM_VIEWER_DIRECTIVE_NAME);
		}
	};
});
$__System.register('c', ['b', 'a'], function (_export) {
	/* global angular */
	'use strict';

	var edaFormViewerDirective, EASY_FORM_VIEWER_DIRECTIVE_NAME, edaEasyFormViewerController, EASY_FORM_VIEWER_CONTROLLER, FORM_VIEWER_MAIN_MODULE_NAME;
	return {
		setters: [function (_b) {
			edaFormViewerDirective = _b['default'];
			EASY_FORM_VIEWER_DIRECTIVE_NAME = _b.EASY_FORM_VIEWER_DIRECTIVE_NAME;
		}, function (_a) {
			edaEasyFormViewerController = _a['default'];
			EASY_FORM_VIEWER_CONTROLLER = _a.EASY_FORM_VIEWER_CONTROLLER;
		}],
		execute: function () {
			FORM_VIEWER_MAIN_MODULE_NAME = 'edaFormViewerMainModule';

			_export('default', angular.module(FORM_VIEWER_MAIN_MODULE_NAME, []).directive(EASY_FORM_VIEWER_DIRECTIVE_NAME, edaFormViewerDirective).controller());
		}
	};
});
$__System.register('d', [], function (_export) {
	/* global angular */
	'use strict';

	var CORE_MODULES, FORMVIEWER_CORE_MODULE_NAME;
	return {
		setters: [],
		execute: function () {
			CORE_MODULES = ['textAngular', 'formly', 'ngAnimate', 'formlyBootstrap', 'ui.bootstrap', 'nya.bootstrap.select'];
			FORMVIEWER_CORE_MODULE_NAME = 'edaEasyFormViewerCoreModule';

			_export('default', angular.module('edaEasyFormViewerCoreModule.core', CORE_MODULES));
		}
	};
});
$__System.register('e', [], function (_export) {
	/* global angular */

	'use strict';

	var resetNyaSelect, getConfigurationModelInit, getEmptyConfigModelResult, resetDataModel, getErrorObject, getMessageObject, resetFormlyModel, extractTemplateOptionDescription, extractTemplateOptionPlaceholder, extractTemplateOptionType, isTemplateOptionDefined, extractTemplateOptionLabel, extractTemplateOptionDatepickerPopup, extractFormlyExpressionProperties, extractFormlyValidators, extractFormlyValidation, extractTemplateOptionRequired, extractTemplateOptionOptions, addDatepickerPopupProperty, addOneColumnHeader, addOneColumnControl, addTwoColumnControl, addThreeColumnControl;
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
   	* equivalent to formFielManage service in easy form generator
   	*/

			getConfigurationModelInit = function getConfigurationModelInit() {
				var configurationModelInit = {
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
				return configurationModelInit;
			};

			getEmptyConfigModelResult = function getEmptyConfigModelResult() {
				var configurationModelResult = {
					activeLine: 1,
					listConfigStep: ['init', 'first', 'second', 'third'],
					stepIndicators: [true, false, false, false],
					configStepCounter: 0,
					submitButtonText: 'submit',
					cancelButtonText: 'cancel',
					lines: []
				};
				return angular.copy(configurationModelResult);
			};

			resetDataModel = function resetDataModel(obj) {
				var emptyDataModel = {};
				angular.copy(emptyDataModel, obj);
				return true;
			};

			getErrorObject = function getErrorObject(errorTitle, errorMessage) {
				var messageObj = {
					noError: false,
					title: '',
					Message: ''
				};
				messageObj.noError = false;
				messageObj.title = errorTitle;
				messageObj.Message = errorMessage;
				return messageObj;
			};

			getMessageObject = function getMessageObject(messageTitle, messageBody) {
				var messageObj = {
					noError: false,
					title: '',
					Message: ''
				};
				messageObj.noError = true;
				messageObj.title = messageTitle;
				messageObj.Message = messageBody;
				return messageObj;
			};

			resetFormlyModel = function resetFormlyModel(formlyModel) {
				var resetformly = [];
				angular.copy(resetformly, formlyModel);
			};

			extractTemplateOptionDescription = function extractTemplateOptionDescription(obj) {
				return typeof obj.templateOptions !== 'undefined' ? typeof obj.templateOptions.description !== 'undefined' ? obj.templateOptions.description : '' : '';
			};

			extractTemplateOptionPlaceholder = function extractTemplateOptionPlaceholder(obj) {
				return typeof obj.templateOptions !== 'undefined' ? typeof obj.templateOptions.placeholder !== 'undefined' ? obj.templateOptions.placeholder : '' : '';
			};

			extractTemplateOptionType = function extractTemplateOptionType(obj) {
				return typeof obj.subtype !== 'undefined' ? obj.subtype : '';
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

			addDatepickerPopupProperty = function addDatepickerPopupProperty(fieldToPush, configurationModel, lineIndex) {
				return fieldToPush.templateOptions.datepickerPopup = extractTemplateOptionDatepickerPopup(configurationModel.lines[lineIndex].columns[0].control);
			};

			addOneColumnHeader = function addOneColumnHeader(formlyModel, configurationModel, lineIndex) {
				/**
    	* text header is stored in "description" in templateOtion model 
    	*/
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
				if (configurationModel.lines[lineIndex].columns[0].control.type === 'datepicker') addDatepickerPopupProperty(fieldToPush, configurationModel, lineIndex);

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
				if (configurationModel.lines[lineIndex].columns[0].control.type === 'datepicker') addDatepickerPopupProperty(controlCol0, configurationModel, lineIndex);

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
				if (configurationModel.lines[lineIndex].columns[1].control.type === 'datepicker') addDatepickerPopupProperty(controlCol1, configurationModel, lineIndex);

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
				if (configurationModel.lines[lineIndex].columns[0].control.type === 'datepicker') addDatepickerPopupProperty(controlCol0, configurationModel, lineIndex);

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
				if (configurationModel.lines[lineIndex].columns[1].control.type === 'datepicker') addDatepickerPopupProperty(controlCol1, configurationModel, lineIndex);

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
				if (configurationModel.lines[lineIndex].columns[2].control.type === 'datepicker') addDatepickerPopupProperty(controlCol2, configurationModel, lineIndex);

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

			_export('resetNyaSelect', resetNyaSelect);

			_export('getConfigurationModelInit', getConfigurationModelInit);

			_export('getEmptyConfigModelResult', getEmptyConfigModelResult);

			_export('resetDataModel', resetDataModel);

			_export('getErrorObject', getErrorObject);

			_export('getMessageObject', getMessageObject);

			_export('resetFormlyModel', resetFormlyModel);

			_export('addOneColumnHeader', addOneColumnHeader);

			_export('addOneColumnControl', addOneColumnControl);

			_export('addTwoColumnControl', addTwoColumnControl);

			_export('addThreeColumnControl', addThreeColumnControl);
		}
	};
});
$__System.register('f', ['8', '9', 'e'], function (_export) {
	var _createClass, _classCallCheck, resetNyaSelect, getConfigurationModelInit, getEmptyConfigModelResult, resetDataModel, getErrorObject, getMessageObject, resetFormlyModel, addOneColumnHeader, addOneColumnControl, addTwoColumnControl, addThreeColumnControl, MODEL_TRANSLATOR_SERVICE, $modelsTranslator;

	return {
		setters: [function (_) {
			_createClass = _['default'];
		}, function (_2) {
			_classCallCheck = _2['default'];
		}, function (_e) {
			resetNyaSelect = _e.resetNyaSelect;
			getConfigurationModelInit = _e.getConfigurationModelInit;
			getEmptyConfigModelResult = _e.getEmptyConfigModelResult;
			resetDataModel = _e.resetDataModel;
			getErrorObject = _e.getErrorObject;
			getMessageObject = _e.getMessageObject;
			resetFormlyModel = _e.resetFormlyModel;
			addOneColumnHeader = _e.addOneColumnHeader;
			addOneColumnControl = _e.addOneColumnControl;
			addTwoColumnControl = _e.addTwoColumnControl;
			addThreeColumnControl = _e.addThreeColumnControl;
		}],
		execute: function () {
			/* global angular */
			'use strict';

			MODEL_TRANSLATOR_SERVICE = '$modelsTranslator';

			$modelsTranslator = (function () {
				function $modelsTranslator() {
					_classCallCheck(this, $modelsTranslator);
				}

				_createClass($modelsTranslator, [{
					key: 'initNyaSelect',
					value: function initNyaSelect(nyaSelectObj) {
						return resetNyaSelect(nyaSelectObj);
					}

					/**
     	* get all controls definition (nyaSelectObj)
     	* 
     	* needed to bind these properties :
     	* 
     	* formlyExpressionProperties: {}, 
     	* formlyValidators: {},
     	* formlyValidation                       		
     	*/
				}, {
					key: 'getControlsDefinition',
					value: function getControlsDefinition() {
						var controls = {};
						resetNyaSelect(controls);
						return controls;
					}

					/**
     	* loading forms will not be able to retrieve formlyExpressionProperties
     	* -> here does the job
     	*/
				}, {
					key: 'refreshControlFormlyExpressionProperties',
					value: function refreshControlFormlyExpressionProperties(configurationModel) {
						var _this = this;

						if (angular.isObject(configurationModel)) {
							//iterates lines
							angular.forEach(configurationModel.lines, function (line, indexLine) {
								angular.forEach(line.columns, function (column, controlIndex) {
									var _controlsDefinition = _this.getControlsDefinition();
									angular.forEach(_controlsDefinition.controls, function (aControl, aControlIndex) {
										if (column.control.type === aControl.formlyType && column.control.subtype === aControl.formlySubtype) {
											//----> update control formlyExpressionProperties property											
											column.control.formlyExpressionProperties = aControl.formlyExpressionProperties;
										}
									});
								});
							});
						}
					}

					/**
     	* loading forms will not be able to retrieve formlyValidators
     	* -> here does the job
     	*/
				}, {
					key: 'refreshControlFormlyValidators',
					value: function refreshControlFormlyValidators(configurationModel) {
						var _this2 = this;

						if (angular.isObject(configurationModel)) {
							//iterates lines
							angular.forEach(configurationModel.lines, function (line, indexLine) {
								angular.forEach(line.columns, function (column, controlIndex) {
									var _controlsDefinition = _this2.getControlsDefinition();
									angular.forEach(_controlsDefinition.controls, function (aControl, aControlIndex) {
										if (column.control.type === aControl.formlyType && column.control.subtype === aControl.formlySubtype) {
											//----> update control formlyValidators property											
											column.control.formlyValidators = aControl.formlyValidators;
										}
									});
								});
							});
						}
					}

					/**
     	* loading forms will not be able to retrieve formlyValidation
     	* -> here does the job
     	*/
				}, {
					key: 'refreshControlFormlyValidation',
					value: function refreshControlFormlyValidation(configurationModel) {
						var _this3 = this;

						if (angular.isObject(configurationModel)) {
							//iterates lines
							angular.forEach(configurationModel.lines, function (line, indexLine) {
								angular.forEach(line.columns, function (column, controlIndex) {
									var _controlsDefinition = _this3.getControlsDefinition();
									angular.forEach(_controlsDefinition.controls, function (aControl, aControlIndex) {
										if (column.control.type === aControl.formlyType && column.control.subtype === aControl.formlySubtype) {
											//----> update control formlyValidation property											
											column.control.formlyValidation = aControl.formlyValidation;
										}
									});
								});
							});
						}
					}
				}, {
					key: 'initConfigurationEditFromScratch',
					value: function initConfigurationEditFromScratch(configurationModel) {
						configurationModel = angular.copy(getConfigurationModelInit());
					}
				}, {
					key: 'bindConfigurationLines',
					value: function bindConfigurationLines(configurationModel, lines) {
						if (angular.isArray(lines)) {
							var configurationModelResult = getEmptyConfigModelResult();
							configurationModelResult.lines = [].concat(lines);
							angular.copy(configurationModelResult, configurationModel);
							return getMessageObject('configuration model is bound', 'lines are bound to configuration model.');
						} else {
							return getErrorObject('lines is not an array', 'Checks lines type, it is not an array.');
						}
					}
				}, {
					key: 'applyConfigurationToformlyModel',
					value: function applyConfigurationToformlyModel(configurationModel, formlyModel, formlyDataModel) {
						resetFormlyModel(formlyModel);
						resetDataModel(formlyDataModel);
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
				}]);

				return $modelsTranslator;
			})();

			$modelsTranslator.$inject = [];

			_export('default', $modelsTranslator);

			_export('MODEL_TRANSLATOR_SERVICE', MODEL_TRANSLATOR_SERVICE);
		}
	};
});
$__System.register('10', ['f'], function (_export) {
	/* global angular */
	'use strict';

	var $modelsTranslator, MODEL_TRANSLATOR_SERVICE, FORM_VIEWER_MODEL_TRANSLATOR_MODULE_NAME;
	return {
		setters: [function (_f) {
			$modelsTranslator = _f['default'];
			MODEL_TRANSLATOR_SERVICE = _f.MODEL_TRANSLATOR_SERVICE;
		}],
		execute: function () {
			FORM_VIEWER_MODEL_TRANSLATOR_MODULE_NAME = 'edaFormViewerModelTranslatorModule';

			_export('default', angular.module(FORM_VIEWER_MODEL_TRANSLATOR_MODULE_NAME, []).service(MODEL_TRANSLATOR_SERVICE, $modelsTranslator));
		}
	};
});
$__System.register('1', ['2', '10', 'c', 'd'], function (_export) {
	/* global angular */
	'use strict';

	var edaFormViewerModelTranslatorModule, edaFormViewerMainModule, edaFormViewerCoreModule, DEP_TO_INJECT_IN_MAIN, MAIN_MODULE_NAME, mainModule;
	return {
		setters: [function (_) {}, function (_2) {
			edaFormViewerModelTranslatorModule = _2['default'];
		}, function (_c) {
			edaFormViewerMainModule = _c['default'];
		}, function (_d) {
			edaFormViewerCoreModule = _d['default'];
		}],
		execute: function () {
			DEP_TO_INJECT_IN_MAIN = [edaFormViewerMainModule.name, edaFormViewerCoreModule.name, edaFormViewerModelTranslatorModule.name];
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