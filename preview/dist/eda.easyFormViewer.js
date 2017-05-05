/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:8080/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	__webpack_require__(6);
	
	__webpack_require__(49);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	__webpack_require__(3);
	
	__webpack_require__(5);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	//! api-check version 7.5.5 built with ♥ by Kent C. Dodds <kent@doddsfamily.us> (http://kent.doddsfamily.us) (ó ì_í)=óò=(ì_í ò)
	
	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define(factory);
		else if(typeof exports === 'object')
			exports["apiCheck"] = factory();
		else
			root["apiCheck"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	
	
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		var _apiCheck = __webpack_require__(1);
	
		var _apiCheck2 = _interopRequireDefault(_apiCheck);
	
		exports['default'] = _apiCheck2['default'];
		module.exports = exports['default'];
	
	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var stringify = __webpack_require__(2);
		var apiCheckUtil = __webpack_require__(3);
		var each = apiCheckUtil.each;
		var isError = apiCheckUtil.isError;
		var t = apiCheckUtil.t;
		var arrayify = apiCheckUtil.arrayify;
		var getCheckerDisplay = apiCheckUtil.getCheckerDisplay;
		var typeOf = apiCheckUtil.typeOf;
		var getError = apiCheckUtil.getError;
	
		var checkers = __webpack_require__(4);
		var apiCheckApis = getApiCheckApis();
	
		module.exports = getApiCheckInstance;
		module.exports.VERSION = ("7.5.5");
		module.exports.utils = apiCheckUtil;
		module.exports.globalConfig = {
		  verbose: false,
		  disabled: false
		};
	
		var apiCheckApiCheck = getApiCheckInstance({
		  output: { prefix: 'apiCheck' }
		});
		module.exports.internalChecker = apiCheckApiCheck;
	
		each(checkers, function (checker, name) {
		  return module.exports[name] = checker;
		});
	
		function getApiCheckInstance() {
		  var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
		  var extraCheckers = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
		  /* eslint complexity:[2, 6] */
		  if (apiCheckApiCheck && arguments.length) {
		    apiCheckApiCheck['throw'](apiCheckApis.getApiCheckInstanceCheckers, arguments, {
		      prefix: 'creating an apiCheck instance'
		    });
		  }
	
		  var additionalProperties = {
		    'throw': getApiCheck(true),
		    warn: getApiCheck(false),
		    getErrorMessage: getErrorMessage,
		    handleErrorMessage: handleErrorMessage,
		    config: {
		      output: config.output || {
		        prefix: '',
		        suffix: '',
		        docsBaseUrl: ''
		      },
		      verbose: config.verbose || false,
		      disabled: config.disabled || false
		    },
		    utils: apiCheckUtil
		  };
	
		  each(additionalProperties, function (wrapper, name) {
		    return apiCheck[name] = wrapper;
		  });
	
		  var disabled = apiCheck.disabled || module.exports.globalConfig.disabled;
		  each(checkers.getCheckers(disabled), function (checker, name) {
		    return apiCheck[name] = checker;
		  });
		  each(extraCheckers, function (checker, name) {
		    return apiCheck[name] = checker;
		  });
	
		  return apiCheck;
	
		  /**
		   * This is the instance function. Other things are attached to this see additional properties above.
		   * @param {Array} api - the checkers to check with
		   * @param {Array} args - the args to check
		   * @param {Object} output - output options
		   * @returns {Object} - if this has a failed = true property, then it failed
		   */
		  function apiCheck(api, args, output) {
		    /* eslint complexity:[2, 8] */
		    if (apiCheck.config.disabled || module.exports.globalConfig.disabled) {
		      return {
		        apiTypes: {}, argTypes: {},
		        passed: true, message: '',
		        failed: false
		      }; // empty version of what is normally returned
		    }
		    checkApiCheckApi(arguments);
		    if (!Array.isArray(api)) {
		      api = [api];
		      args = [args];
		    } else {
		      // turn arguments into an array
		      args = Array.prototype.slice.call(args);
		    }
		    var messages = checkEnoughArgs(api, args);
		    if (!messages.length) {
		      // this is where we actually go perform the checks.
		      messages = checkApiWithArgs(api, args);
		    }
	
		    var returnObject = getTypes(api, args);
		    returnObject.args = args;
		    if (messages.length) {
		      returnObject.message = apiCheck.getErrorMessage(api, args, messages, output);
		      returnObject.failed = true;
		      returnObject.passed = false;
		    } else {
		      returnObject.message = '';
		      returnObject.failed = false;
		      returnObject.passed = true;
		    }
		    return returnObject;
		  }
	
		  /**
		   * checkApiCheckApi, should be read like: check apiCheck api. As in, check the api for apiCheck :-)
		   * @param {Array} checkApiArgs - args provided to apiCheck function
		   */
		  function checkApiCheckApi(checkApiArgs) {
		    var api = checkApiArgs[0];
		    var args = checkApiArgs[1];
		    var isArrayOrArgs = Array.isArray(args) || args && typeof args === 'object' && typeof args.length === 'number';
	
		    if (Array.isArray(api) && !isArrayOrArgs) {
		      throw new Error(getErrorMessage(api, [args], ['If an array is provided for the api, an array must be provided for the args as well.'], { prefix: 'apiCheck' }));
		    }
		    // dog fooding here
		    var errors = checkApiWithArgs(apiCheckApis.checkApiCheckApi, checkApiArgs);
		    if (errors.length) {
		      var message = apiCheck.getErrorMessage(apiCheckApis.checkApiCheckApi, checkApiArgs, errors, {
		        prefix: 'apiCheck'
		      });
		      apiCheck.handleErrorMessage(message, true);
		    }
		  }
	
		  function getApiCheck(shouldThrow) {
		    return function apiCheckWrapper(api, args, output) {
		      var result = apiCheck(api, args, output);
		      apiCheck.handleErrorMessage(result.message, shouldThrow);
		      return result; // wont get here if an error is thrown
		    };
		  }
	
		  function handleErrorMessage(message, shouldThrow) {
		    if (shouldThrow && message) {
		      throw new Error(message);
		    } else if (message) {
		      /* eslint no-console:0 */
		      console.warn(message);
		    }
		  }
	
		  function getErrorMessage(api, args) {
		    var messages = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
		    var output = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
		    var gOut = apiCheck.config.output || {};
		    var prefix = getPrefix();
		    var suffix = getSuffix();
		    var url = getUrl();
		    var message = 'apiCheck failed! ' + messages.join(', ');
		    var passedAndShouldHavePassed = '\n\n' + buildMessageFromApiAndArgs(api, args);
		    return (prefix + ' ' + message + ' ' + suffix + ' ' + (url || '') + passedAndShouldHavePassed).trim();
	
		    function getPrefix() {
		      var p = output.onlyPrefix;
		      if (!p) {
		        p = ((gOut.prefix || '') + ' ' + (output.prefix || '')).trim();
		      }
		      return p;
		    }
	
		    function getSuffix() {
		      var s = output.onlySuffix;
		      if (!s) {
		        s = ((output.suffix || '') + ' ' + (gOut.suffix || '')).trim();
		      }
		      return s;
		    }
	
		    function getUrl() {
		      var u = output.url;
		      if (!u) {
		        u = gOut.docsBaseUrl && output.urlSuffix && ('' + gOut.docsBaseUrl + output.urlSuffix).trim();
		      }
		      return u;
		    }
		  }
	
		  function buildMessageFromApiAndArgs(api, args) {
		    var _getTypes = getTypes(api, args);
	
		    var apiTypes = _getTypes.apiTypes;
		    var argTypes = _getTypes.argTypes;
	
		    var copy = Array.prototype.slice.call(args || []);
		    var replacedItems = [];
		    replaceFunctionWithName(copy);
		    var passedArgs = getObjectString(copy);
		    argTypes = getObjectString(argTypes);
		    apiTypes = getObjectString(apiTypes);
	
		    return generateMessage();
	
		    // functions
	
		    function replaceFunctionWithName(obj) {
		      each(obj, function (val, name) {
		        /* eslint complexity:[2, 6] */
		        if (replacedItems.indexOf(val) === -1) {
		          // avoid recursive problems
		          replacedItems.push(val);
		          if (typeof val === 'object') {
		            replaceFunctionWithName(obj);
		          } else if (typeof val === 'function') {
		            obj[name] = val.displayName || val.name || 'anonymous function';
		          }
		        }
		      });
		    }
	
		    function getObjectString(types) {
		      if (!types || !types.length) {
		        return 'nothing';
		      } else if (types && types.length === 1) {
		        types = types[0];
		      }
		      return stringify(types, null, 2);
		    }
	
		    function generateMessage() {
		      var n = '\n';
		      var useS = true;
		      if (args && args.length === 1) {
		        if (typeof args[0] === 'object' && args[0] !== null) {
		          useS = !!Object.keys(args[0]).length;
		        } else {
		          useS = false;
		        }
		      }
		      var types = 'type' + (useS ? 's' : '');
		      var newLine = n + n;
		      return 'You passed:' + n + passedArgs + newLine + ('With the ' + types + ':' + n + argTypes + newLine) + ('The API calls for:' + n + apiTypes);
		    }
		  }
	
		  function getTypes(api, args) {
		    api = arrayify(api);
		    args = arrayify(args);
		    var apiTypes = api.map(function (checker, index) {
		      var specified = module.exports.globalConfig.hasOwnProperty('verbose');
		      return getCheckerDisplay(checker, {
		        terse: specified ? !module.exports.globalConfig.verbose : !apiCheck.config.verbose,
		        obj: args[index],
		        addHelpers: true
		      });
		    });
		    var argTypes = args.map(function (arg) {
		      return getArgDisplay(arg, []);
		    });
		    return { argTypes: argTypes, apiTypes: apiTypes };
		  }
		}
	
		// STATELESS FUNCTIONS
	
		/**
		 * This is where the magic happens for actually checking the arguments with the api.
		 * @param {Array} api - checkers
		 * @param  {Array} args - and arguments object
		 * @returns {Array} - the error messages
		 */
		function checkApiWithArgs(api, args) {
		  /* eslint complexity:[2, 7] */
		  var messages = [];
		  var failed = false;
		  var checkerIndex = 0;
		  var argIndex = 0;
		  var arg = undefined,
		      checker = undefined,
		      res = undefined,
		      lastChecker = undefined,
		      argName = undefined,
		      argFailed = undefined,
		      skipPreviousChecker = undefined;
		  /* jshint -W084 */
		  while ((checker = api[checkerIndex++]) && argIndex < args.length) {
		    arg = args[argIndex++];
		    argName = 'Argument ' + argIndex + (checker.isOptional ? ' (optional)' : '');
		    res = checker(arg, 'value', argName);
		    argFailed = isError(res);
		    lastChecker = checkerIndex >= api.length;
		    skipPreviousChecker = checkerIndex > 1 && api[checkerIndex - 1].isOptional;
		    if (argFailed && lastChecker || argFailed && !lastChecker && !checker.isOptional && !skipPreviousChecker) {
		      failed = true;
		      messages.push(getCheckerErrorMessage(res, checker, arg));
		    } else if (argFailed && checker.isOptional) {
		      argIndex--;
		    } else {
		      messages.push(t(argName) + ' passed');
		    }
		  }
		  return failed ? messages : [];
		}
	
		checkerTypeType.type = 'function with __apiCheckData property and `${function.type}` property';
		function checkerTypeType(checkerType, name, location) {
		  var apiCheckDataChecker = checkers.shape({
		    type: checkers.string,
		    optional: checkers.bool
		  });
		  var asFunc = checkers.func.withProperties({ __apiCheckData: apiCheckDataChecker });
		  var asShape = checkers.shape({ __apiCheckData: apiCheckDataChecker });
		  var wrongShape = checkers.oneOfType([asFunc, asShape])(checkerType, name, location);
		  if (isError(wrongShape)) {
		    return wrongShape;
		  }
		  if (typeof checkerType !== 'function' && !checkerType.hasOwnProperty(checkerType.__apiCheckData.type)) {
		    return getError(name, location, checkerTypeType.type);
		  }
		}
	
		function getCheckerErrorMessage(res, checker, val) {
		  var checkerHelp = getCheckerHelp(checker, val);
		  checkerHelp = checkerHelp ? ' - ' + checkerHelp : '';
		  return res.message + checkerHelp;
		}
	
		function getCheckerHelp(_ref, val) {
		  var help = _ref.help;
	
		  if (!help) {
		    return '';
		  }
		  if (typeof help === 'function') {
		    help = help(val);
		  }
		  return help;
		}
	
		function checkEnoughArgs(api, args) {
		  var requiredArgs = api.filter(function (a) {
		    return !a.isOptional;
		  });
		  if (args.length < requiredArgs.length) {
		    return ['Not enough arguments specified. Requires `' + requiredArgs.length + '`, you passed `' + args.length + '`'];
		  } else {
		    return [];
		  }
		}
	
		function getArgDisplay(arg, gottenArgs) {
		  /* eslint complexity:[2, 7] */
		  var cName = arg && arg.constructor && arg.constructor.name;
		  var type = typeOf(arg);
		  if (type === 'function') {
		    if (hasKeys()) {
		      var properties = stringify(getDisplayIfNotGotten());
		      return cName + ' (with properties: ' + properties + ')';
		    }
		    return cName;
		  }
	
		  if (arg === null) {
		    return 'null';
		  }
	
		  if (type !== 'array' && type !== 'object') {
		    return type;
		  }
	
		  if (hasKeys()) {
		    return getDisplayIfNotGotten();
		  }
	
		  return cName;
	
		  // utility functions
		  function hasKeys() {
		    return arg && Object.keys(arg).length;
		  }
	
		  function getDisplayIfNotGotten() {
		    if (gottenArgs.indexOf(arg) !== -1) {
		      return '[Circular]';
		    }
		    gottenArgs.push(arg);
		    return getDisplay(arg, gottenArgs);
		  }
		}
	
		function getDisplay(obj, gottenArgs) {
		  var argDisplay = {};
		  each(obj, function (v, k) {
		    return argDisplay[k] = getArgDisplay(v, gottenArgs);
		  });
		  return argDisplay;
		}
	
		function getApiCheckApis() {
		  var os = checkers.string.optional;
	
		  var checkerFnChecker = checkers.func.withProperties({
		    type: checkers.oneOfType([checkers.string, checkerTypeType]).optional,
		    displayName: checkers.string.optional,
		    shortType: checkers.string.optional,
		    notOptional: checkers.bool.optional,
		    notRequired: checkers.bool.optional
		  });
	
		  var getApiCheckInstanceCheckers = [checkers.shape({
		    output: checkers.shape({
		      prefix: checkers.string.optional,
		      suffix: checkers.string.optional,
		      docsBaseUrl: checkers.string.optional
		    }).strict.optional,
		    verbose: checkers.bool.optional,
		    disabled: checkers.bool.optional
		  }).strict.optional, checkers.objectOf(checkerFnChecker).optional];
	
		  var checkApiCheckApi = [checkers.typeOrArrayOf(checkerFnChecker), checkers.any.optional, checkers.shape({
		    prefix: os, suffix: os, urlSuffix: os, // appended case
		    onlyPrefix: os, onlySuffix: os, url: os // override case
		  }).strict.optional];
	
		  return {
		    checkerFnChecker: checkerFnChecker,
		    getApiCheckInstanceCheckers: getApiCheckInstanceCheckers,
		    checkApiCheckApi: checkApiCheckApi
		  };
		}
	
	/***/ },
	/* 2 */
	/***/ function(module, exports) {
	
		module.exports = stringify;
	
		function getSerialize (fn, decycle) {
		  var seen = [], keys = [];
		  decycle = decycle || function(key, value) {
		    return '[Circular ' + getPath(value, seen, keys) + ']'
		  };
		  return function(key, value) {
		    var ret = value;
		    if (typeof value === 'object' && value) {
		      if (seen.indexOf(value) !== -1)
		        ret = decycle(key, value);
		      else {
		        seen.push(value);
		        keys.push(key);
		      }
		    }
		    if (fn) ret = fn(key, ret);
		    return ret;
		  }
		}
	
		function getPath (value, seen, keys) {
		  var index = seen.indexOf(value);
		  var path = [ keys[index] ];
		  for (index--; index >= 0; index--) {
		    if (seen[index][ path[0] ] === value) {
		      value = seen[index];
		      path.unshift(keys[index]);
		    }
		  }
		  return '~' + path.join('.');
		}
	
		function stringify(obj, fn, spaces, decycle) {
		  return JSON.stringify(obj, getSerialize(fn, decycle), spaces);
		}
	
		stringify.getSerialize = getSerialize;
	
	
	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
		var stringify = __webpack_require__(2);
		var checkerHelpers = {
		  addOptional: addOptional, getRequiredVersion: getRequiredVersion, setupChecker: setupChecker, addNullable: addNullable
		};
	
		module.exports = {
		  each: each, copy: copy, typeOf: typeOf, arrayify: arrayify, getCheckerDisplay: getCheckerDisplay,
		  isError: isError, list: list, getError: getError, nAtL: nAtL, t: t, undef: undef, checkerHelpers: checkerHelpers,
		  noop: noop
		};
	
		function copy(obj) {
		  var type = typeOf(obj);
		  var daCopy = undefined;
		  if (type === 'array') {
		    daCopy = [];
		  } else if (type === 'object') {
		    daCopy = {};
		  } else {
		    return obj;
		  }
		  each(obj, function (val, key) {
		    daCopy[key] = val; // cannot single-line this because we don't want to abort the each
		  });
		  return daCopy;
		}
	
		function typeOf(obj) {
		  if (Array.isArray(obj)) {
		    return 'array';
		  } else if (obj instanceof RegExp) {
		    return 'object';
		  } else {
		    return typeof obj;
		  }
		}
	
		function getCheckerDisplay(checker, options) {
		  /* eslint complexity:[2, 7] */
		  var display = undefined;
		  var short = options && options.short;
		  if (short && checker.shortType) {
		    display = checker.shortType;
		  } else if (!short && typeof checker.type === 'object' || checker.type === 'function') {
		    display = getCheckerType(checker, options);
		  } else {
		    display = getCheckerType(checker, options) || checker.displayName || checker.name;
		  }
		  return display;
		}
	
		function getCheckerType(_ref, options) {
		  var type = _ref.type;
	
		  if (typeof type === 'function') {
		    var __apiCheckData = type.__apiCheckData;
		    var typeTypes = type(options);
		    type = _defineProperty({
		      __apiCheckData: __apiCheckData
		    }, __apiCheckData.type, typeTypes);
		  }
		  return type;
		}
	
		function arrayify(obj) {
		  if (!obj) {
		    return [];
		  } else if (Array.isArray(obj)) {
		    return obj;
		  } else {
		    return [obj];
		  }
		}
	
		function each(obj, iterator, context) {
		  if (Array.isArray(obj)) {
		    return eachArry(obj, iterator, context);
		  } else {
		    return eachObj(obj, iterator, context);
		  }
		}
	
		function eachObj(obj, iterator, context) {
		  var ret = undefined;
		  var hasOwn = Object.prototype.hasOwnProperty;
		  /* eslint prefer-const:0 */ // some weird eslint bug?
		  for (var key in obj) {
		    if (hasOwn.call(obj, key)) {
		      ret = iterator.call(context, obj[key], key, obj);
		      if (ret === false) {
		        return ret;
		      }
		    }
		  }
		  return true;
		}
	
		function eachArry(obj, iterator, context) {
		  var ret = undefined;
		  var length = obj.length;
		  for (var i = 0; i < length; i++) {
		    ret = iterator.call(context, obj[i], i, obj);
		    if (ret === false) {
		      return ret;
		    }
		  }
		  return true;
		}
	
		function isError(obj) {
		  return obj instanceof Error;
		}
	
		function list(arry, join, finalJoin) {
		  arry = arrayify(arry);
		  var copy = arry.slice();
		  var last = copy.pop();
		  if (copy.length === 1) {
		    join = ' ';
		  }
		  return copy.join(join) + ('' + (copy.length ? join + finalJoin : '') + last);
		}
	
		function getError(name, location, checkerType) {
		  if (typeof checkerType === 'function') {
		    checkerType = checkerType({ short: true });
		  }
		  var stringType = typeof checkerType !== 'object' ? checkerType : stringify(checkerType);
		  return new Error(nAtL(name, location) + ' must be ' + t(stringType));
		}
	
		function nAtL(name, location) {
		  var tName = t(name || 'value');
		  var tLocation = !location ? '' : ' at ' + t(location);
		  return '' + tName + tLocation;
		}
	
		function t(thing) {
		  return '`' + thing + '`';
		}
	
		function undef(thing) {
		  return typeof thing === 'undefined';
		}
	
		/**
		 * This will set up the checker with all of the defaults that most checkers want like required by default and an
		 * optional version
		 *
		 * @param {Function} checker - the checker to setup with properties
		 * @param {Object} properties - properties to add to the checker
		 * @param {boolean} disabled - when set to true, this will set the checker to a no-op function
		 * @returns {Function} checker - the setup checker
		 */
		function setupChecker(checker, properties, disabled) {
		  /* eslint complexity:[2, 9] */
		  if (disabled) {
		    // swap out the checker for its own copy of noop
		    checker = getNoop();
		    checker.isNoop = true;
		  }
	
		  if (typeof checker.type === 'string') {
		    checker.shortType = checker.type;
		  }
	
		  // assign all properties given
		  each(properties, function (prop, name) {
		    return checker[name] = prop;
		  });
	
		  if (!checker.displayName) {
		    checker.displayName = 'apiCheck ' + t(checker.shortType || checker.type || checker.name) + ' type checker';
		  }
	
		  if (!checker.notRequired) {
		    checker = getRequiredVersion(checker, disabled);
		  }
	
		  if (!checker.notNullable) {
		    addNullable(checker, disabled);
		  }
	
		  if (!checker.notOptional) {
		    addOptional(checker, disabled);
		  }
	
		  return checker;
		}
	
		function getRequiredVersion(checker, disabled) {
		  var requiredChecker = disabled ? getNoop() : function requiredChecker(val, name, location, obj) {
		    if (undef(val) && !checker.isOptional) {
		      var tLocation = location ? ' in ' + t(location) : '';
		      var type = getCheckerDisplay(checker, { short: true });
		      var stringType = typeof type !== 'object' ? type : stringify(type);
		      return new Error('Required ' + t(name) + ' not specified' + tLocation + '. Must be ' + t(stringType));
		    } else {
		      return checker(val, name, location, obj);
		    }
		  };
		  copyProps(checker, requiredChecker);
		  requiredChecker.originalChecker = checker;
		  return requiredChecker;
		}
	
		function addOptional(checker, disabled) {
		  var optionalCheck = disabled ? getNoop() : function optionalCheck(val, name, location, obj) {
		    if (!undef(val)) {
		      return checker(val, name, location, obj);
		    }
		  };
		  // inherit all properties on the original checker
		  copyProps(checker, optionalCheck);
	
		  optionalCheck.isOptional = true;
		  optionalCheck.displayName = checker.displayName + ' (optional)';
		  optionalCheck.originalChecker = checker;
	
		  // the magic line that allows you to add .optional to the end of the checkers
		  checker.optional = optionalCheck;
	
		  fixType(checker, checker.optional);
		}
	
		function addNullable(checker, disabled) {
		  var nullableCheck = disabled ? getNoop() : function nullableCheck(val, name, location, obj) {
		    if (val !== null) {
		      return checker(val, name, location, obj);
		    }
		  };
		  // inherit all properties on the original checker
		  copyProps(checker, nullableCheck);
	
		  nullableCheck.isNullable = true;
		  nullableCheck.displayName = checker.displayName + ' (nullable)';
		  nullableCheck.originalChecker = checker;
	
		  // the magic line that allows you to add .nullable to the end of the checkers
		  checker.nullable = nullableCheck;
	
		  fixType(checker, checker.nullable);
		  if (!checker.notOptional) {
		    addOptional(checker.nullable, disabled);
		  }
		}
	
		function fixType(checker, checkerCopy) {
		  // fix type, because it's not a straight copy...
		  // the reason is we need to specify type.__apiCheckData.optional as true for the terse/verbose option.
		  // we also want to add "(optional)" to the types with a string
		  if (typeof checkerCopy.type === 'object') {
		    checkerCopy.type = copy(checkerCopy.type); // make our own copy of this
		  } else if (typeof checkerCopy.type === 'function') {
		      checkerCopy.type = function () {
		        return checker.type.apply(checker, arguments);
		      };
		    } else {
		      checkerCopy.type += ' (optional)';
		      return;
		    }
		  checkerCopy.type.__apiCheckData = copy(checker.type.__apiCheckData) || {}; // and this
		  checkerCopy.type.__apiCheckData.optional = true;
		}
	
		// UTILS
	
		function copyProps(src, dest) {
		  each(Object.keys(src), function (key) {
		    return dest[key] = src[key];
		  });
		}
	
		function noop() {}
	
		function getNoop() {
		  /* eslint no-shadow:0 */
		  /* istanbul ignore next */
		  return function noop() {};
		}
	
	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var stringify = __webpack_require__(2);
	
		var _require = __webpack_require__(3);
	
		var typeOf = _require.typeOf;
		var each = _require.each;
		var copy = _require.copy;
		var getCheckerDisplay = _require.getCheckerDisplay;
		var isError = _require.isError;
		var arrayify = _require.arrayify;
		var list = _require.list;
		var getError = _require.getError;
		var nAtL = _require.nAtL;
		var t = _require.t;
		var checkerHelpers = _require.checkerHelpers;
		var undef = _require.undef;
		var setupChecker = checkerHelpers.setupChecker;
	
		var checkers = module.exports = getCheckers();
		module.exports.getCheckers = getCheckers;
	
		function getCheckers(disabled) {
		  return {
		    array: typeOfCheckGetter('Array'),
		    bool: typeOfCheckGetter('Boolean'),
		    number: typeOfCheckGetter('Number'),
		    string: typeOfCheckGetter('String'),
		    func: funcCheckGetter(),
		    object: objectCheckGetter(),
	
		    emptyObject: emptyObjectCheckGetter(),
	
		    instanceOf: instanceCheckGetter,
		    oneOf: oneOfCheckGetter,
		    oneOfType: oneOfTypeCheckGetter,
	
		    arrayOf: arrayOfCheckGetter,
		    objectOf: objectOfCheckGetter,
		    typeOrArrayOf: typeOrArrayOfCheckGetter,
	
		    range: rangeCheckGetter,
		    lessThan: lessThanCheckGetter,
		    greaterThan: greaterThanCheckGetter,
	
		    shape: getShapeCheckGetter(),
		    args: argumentsCheckerGetter(),
	
		    any: anyCheckGetter(),
		    'null': nullCheckGetter()
	
		  };
	
		  function typeOfCheckGetter(type) {
		    var lType = type.toLowerCase();
		    return setupChecker(function typeOfCheckerDefinition(val, name, location) {
		      if (typeOf(val) !== lType) {
		        return getError(name, location, type);
		      }
		    }, { type: type }, disabled);
		  }
	
		  function funcCheckGetter() {
		    var type = 'Function';
		    var functionChecker = setupChecker(function functionCheckerDefinition(val, name, location) {
		      if (typeOf(val) !== 'function') {
		        return getError(name, location, type);
		      }
		    }, { type: type }, disabled);
	
		    functionChecker.withProperties = function getWithPropertiesChecker(properties) {
		      var apiError = checkers.objectOf(checkers.func)(properties, 'properties', 'apiCheck.func.withProperties');
		      if (isError(apiError)) {
		        throw apiError;
		      }
		      var shapeChecker = checkers.shape(properties, true);
		      shapeChecker.type.__apiCheckData.type = 'func.withProperties';
	
		      return setupChecker(function functionWithPropertiesChecker(val, name, location) {
		        var notFunction = checkers.func(val, name, location);
		        if (isError(notFunction)) {
		          return notFunction;
		        }
		        return shapeChecker(val, name, location);
		      }, { type: shapeChecker.type, shortType: 'func.withProperties' }, disabled);
		    };
		    return functionChecker;
		  }
	
		  function objectCheckGetter() {
		    var type = 'Object';
		    var nullType = 'Object (null ok)';
		    var objectNullOkChecker = setupChecker(function objectNullOkCheckerDefinition(val, name, location) {
		      if (typeOf(val) !== 'object') {
		        return getError(name, location, nullType);
		      }
		    }, { type: nullType }, disabled);
	
		    var objectChecker = setupChecker(function objectCheckerDefinition(val, name, location) {
		      if (val === null || isError(objectNullOkChecker(val, name, location))) {
		        return getError(name, location, objectChecker.type);
		      }
		    }, { type: type, nullOk: objectNullOkChecker }, disabled);
	
		    return objectChecker;
		  }
	
		  function instanceCheckGetter(classToCheck) {
		    return setupChecker(function instanceCheckerDefinition(val, name, location) {
		      if (!(val instanceof classToCheck)) {
		        return getError(name, location, classToCheck.name);
		      }
		    }, { type: classToCheck.name }, disabled);
		  }
	
		  function oneOfCheckGetter(enums) {
		    var type = {
		      __apiCheckData: { optional: false, type: 'enum' },
		      'enum': enums
		    };
		    var shortType = 'oneOf[' + enums.map(function (enm) {
		      return stringify(enm);
		    }).join(', ') + ']';
		    return setupChecker(function oneOfCheckerDefinition(val, name, location) {
		      if (!enums.some(function (enm) {
		        return enm === val;
		      })) {
		        return getError(name, location, shortType);
		      }
		    }, { type: type, shortType: shortType }, disabled);
		  }
	
		  function oneOfTypeCheckGetter(typeCheckers) {
		    var checkersDisplay = typeCheckers.map(function (checker) {
		      return getCheckerDisplay(checker, { short: true });
		    });
		    var shortType = 'oneOfType[' + checkersDisplay.join(', ') + ']';
		    function type(options) {
		      if (options && options.short) {
		        return shortType;
		      }
		      return typeCheckers.map(function (checker) {
		        return getCheckerDisplay(checker, options);
		      });
		    }
		    type.__apiCheckData = { optional: false, type: 'oneOfType' };
		    return setupChecker(function oneOfTypeCheckerDefinition(val, name, location) {
		      if (!typeCheckers.some(function (checker) {
		        return !isError(checker(val, name, location));
		      })) {
		        return getError(name, location, shortType);
		      }
		    }, { type: type, shortType: shortType }, disabled);
		  }
	
		  function arrayOfCheckGetter(checker) {
		    var shortCheckerDisplay = getCheckerDisplay(checker, { short: true });
		    var shortType = 'arrayOf[' + shortCheckerDisplay + ']';
	
		    function type(options) {
		      if (options && options.short) {
		        return shortType;
		      }
		      return getCheckerDisplay(checker, options);
		    }
		    type.__apiCheckData = { optional: false, type: 'arrayOf' };
	
		    return setupChecker(function arrayOfCheckerDefinition(val, name, location) {
		      if (isError(checkers.array(val)) || !val.every(function (item) {
		        return !isError(checker(item));
		      })) {
		        return getError(name, location, shortType);
		      }
		    }, { type: type, shortType: shortType }, disabled);
		  }
	
		  function objectOfCheckGetter(checker) {
		    var checkerDisplay = getCheckerDisplay(checker, { short: true });
		    var shortType = 'objectOf[' + checkerDisplay + ']';
	
		    function type(options) {
		      if (options && options.short) {
		        return shortType;
		      }
		      return getCheckerDisplay(checker, options);
		    }
		    type.__apiCheckData = { optional: false, type: 'objectOf' };
	
		    return setupChecker(function objectOfCheckerDefinition(val, name, location) {
		      var notObject = checkers.object(val, name, location);
		      if (isError(notObject)) {
		        return notObject;
		      }
		      var allTypesSuccess = each(val, function (item, key) {
		        if (isError(checker(item, key, name))) {
		          return false;
		        }
		      });
		      if (!allTypesSuccess) {
		        return getError(name, location, shortType);
		      }
		    }, { type: type, shortType: shortType }, disabled);
		  }
	
		  function typeOrArrayOfCheckGetter(checker) {
		    var checkerDisplay = getCheckerDisplay(checker, { short: true });
		    var shortType = 'typeOrArrayOf[' + checkerDisplay + ']';
	
		    function type(options) {
		      if (options && options.short) {
		        return shortType;
		      }
		      return getCheckerDisplay(checker, options);
		    }
	
		    type.__apiCheckData = { optional: false, type: 'typeOrArrayOf' };
		    return setupChecker(function typeOrArrayOfDefinition(val, name, location, obj) {
		      if (isError(checkers.oneOfType([checker, checkers.arrayOf(checker)])(val, name, location, obj))) {
		        return getError(name, location, shortType);
		      }
		    }, { type: type, shortType: shortType }, disabled);
		  }
	
		  function getShapeCheckGetter() {
		    function shapeCheckGetter(shape, nonObject) {
		      var shapeTypes = {};
		      each(shape, function (checker, prop) {
		        shapeTypes[prop] = getCheckerDisplay(checker);
		      });
		      function type() {
		        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
		        var ret = {};
		        var terse = options.terse;
		        var obj = options.obj;
		        var addHelpers = options.addHelpers;
	
		        var parentRequired = options.required;
		        each(shape, function (checker, prop) {
		          /* eslint complexity:[2, 6] */
		          var specified = obj && obj.hasOwnProperty(prop);
		          var required = undef(parentRequired) ? !checker.isOptional : parentRequired;
		          if (!terse || (specified || !checker.isOptional)) {
		            ret[prop] = getCheckerDisplay(checker, { terse: terse, obj: obj && obj[prop], required: required, addHelpers: addHelpers });
		          }
		          if (addHelpers) {
		            modifyTypeDisplayToHelpOut(ret, prop, specified, checker, required);
		          }
		        });
		        return ret;
	
		        function modifyTypeDisplayToHelpOut(theRet, prop, specified, checker, required) {
		          if (!specified && required && !checker.isOptional) {
		            var item = 'ITEM';
		            if (checker.type && checker.type.__apiCheckData) {
		              item = checker.type.__apiCheckData.type.toUpperCase();
		            }
		            addHelper('missing', 'MISSING THIS ' + item, ' <-- YOU ARE MISSING THIS');
		          } else if (specified) {
		            var error = checker(obj[prop], prop, null, obj);
		            if (isError(error)) {
		              addHelper('error', 'THIS IS THE PROBLEM: ' + error.message, ' <-- THIS IS THE PROBLEM: ' + error.message);
		            }
		          }
	
		          function addHelper(property, objectMessage, stringMessage) {
		            if (typeof theRet[prop] === 'string') {
		              theRet[prop] += stringMessage;
		            } else {
		              theRet[prop].__apiCheckData[property] = objectMessage;
		            }
		          }
		        }
		      }
	
		      type.__apiCheckData = { strict: false, optional: false, type: 'shape' };
		      var shapeChecker = setupChecker(function shapeCheckerDefinition(val, name, location) {
		        /* eslint complexity:[2, 6] */
		        var isObject = !nonObject && checkers.object(val, name, location);
		        if (isError(isObject)) {
		          return isObject;
		        }
		        var shapePropError = undefined;
		        location = location ? location + (name ? '/' : '') : '';
		        name = name || '';
		        each(shape, function (checker, prop) {
		          if (val.hasOwnProperty(prop) || !checker.isOptional) {
		            shapePropError = checker(val[prop], prop, '' + location + name, val);
		            return !isError(shapePropError);
		          }
		        });
		        if (isError(shapePropError)) {
		          return shapePropError;
		        }
		      }, { type: type, shortType: 'shape' }, disabled);
	
		      function strictType() {
		        return type.apply(undefined, arguments);
		      }
	
		      strictType.__apiCheckData = copy(shapeChecker.type.__apiCheckData);
		      strictType.__apiCheckData.strict = true;
		      shapeChecker.strict = setupChecker(function strictShapeCheckerDefinition(val, name, location) {
		        var shapeError = shapeChecker(val, name, location);
		        if (isError(shapeError)) {
		          return shapeError;
		        }
		        var allowedProperties = Object.keys(shape);
		        var extraProps = Object.keys(val).filter(function (prop) {
		          return allowedProperties.indexOf(prop) === -1;
		        });
		        if (extraProps.length) {
		          return new Error(nAtL(name, location) + ' cannot have extra properties: ' + t(extraProps.join('`, `')) + '.' + ('It is limited to ' + t(allowedProperties.join('`, `'))));
		        }
		      }, { type: strictType, shortType: 'strict shape' }, disabled);
	
		      return shapeChecker;
		    }
	
		    shapeCheckGetter.ifNot = function ifNot(otherProps, propChecker) {
		      if (!Array.isArray(otherProps)) {
		        otherProps = [otherProps];
		      }
		      var description = undefined;
		      if (otherProps.length === 1) {
		        description = 'specified only if ' + otherProps[0] + ' is not specified';
		      } else {
		        description = 'specified only if none of the following are specified: [' + list(otherProps, ', ', 'and ') + ']';
		      }
		      var shortType = 'ifNot[' + otherProps.join(', ') + ']';
		      var type = getTypeForShapeChild(propChecker, description, shortType);
		      return setupChecker(function ifNotChecker(prop, propName, location, obj) {
		        var propExists = obj && obj.hasOwnProperty(propName);
		        var otherPropsExist = otherProps.some(function (otherProp) {
		          return obj && obj.hasOwnProperty(otherProp);
		        });
		        if (propExists === otherPropsExist) {
		          return getError(propName, location, type);
		        } else if (propExists) {
		          return propChecker(prop, propName, location, obj);
		        }
		      }, { notRequired: true, type: type, shortType: shortType }, disabled);
		    };
	
		    shapeCheckGetter.onlyIf = function onlyIf(otherProps, propChecker) {
		      otherProps = arrayify(otherProps);
		      var description = undefined;
		      if (otherProps.length === 1) {
		        description = 'specified only if ' + otherProps[0] + ' is also specified';
		      } else {
		        description = 'specified only if all of the following are specified: [' + list(otherProps, ', ', 'and ') + ']';
		      }
		      var shortType = 'onlyIf[' + otherProps.join(', ') + ']';
		      var type = getTypeForShapeChild(propChecker, description, shortType);
		      return setupChecker(function onlyIfCheckerDefinition(prop, propName, location, obj) {
		        var othersPresent = otherProps.every(function (property) {
		          return obj.hasOwnProperty(property);
		        });
		        if (!othersPresent) {
		          return getError(propName, location, type);
		        } else {
		          return propChecker(prop, propName, location, obj);
		        }
		      }, { type: type, shortType: shortType }, disabled);
		    };
	
		    shapeCheckGetter.requiredIfNot = function shapeRequiredIfNot(otherProps, propChecker) {
		      if (!Array.isArray(otherProps)) {
		        otherProps = [otherProps];
		      }
		      return getRequiredIfNotChecker(false, otherProps, propChecker);
		    };
	
		    shapeCheckGetter.requiredIfNot.all = function shapeRequiredIfNotAll(otherProps, propChecker) {
		      if (!Array.isArray(otherProps)) {
		        throw new Error('requiredIfNot.all must be passed an array');
		      }
		      return getRequiredIfNotChecker(true, otherProps, propChecker);
		    };
	
		    function getRequiredIfNotChecker(all, otherProps, propChecker) {
		      var props = t(otherProps.join(', '));
		      var ifProps = 'if ' + (all ? 'all of' : 'at least one of');
		      var description = 'specified ' + ifProps + ' these are not specified: ' + props + ' (otherwise it\'s optional)';
		      var shortType = 'requiredIfNot' + (all ? '.all' : '') + '[' + otherProps.join(', ') + '}]';
		      var type = getTypeForShapeChild(propChecker, description, shortType);
		      return setupChecker(function shapeRequiredIfNotDefinition(prop, propName, location, obj) {
		        var propExists = obj && obj.hasOwnProperty(propName);
		        var iteration = all ? 'every' : 'some';
		        var otherPropsExist = otherProps[iteration](function (otherProp) {
		          return obj && obj.hasOwnProperty(otherProp);
		        });
		        if (!otherPropsExist && !propExists) {
		          return getError(propName, location, type);
		        } else if (propExists) {
		          return propChecker(prop, propName, location, obj);
		        }
		      }, { type: type, notRequired: true }, disabled);
		    }
	
		    return shapeCheckGetter;
	
		    function getTypeForShapeChild(propChecker, description, shortType) {
		      function type(options) {
		        if (options && options.short) {
		          return shortType;
		        }
		        return getCheckerDisplay(propChecker);
		      }
		      type.__apiCheckData = { optional: false, type: 'ifNot', description: description };
		      return type;
		    }
		  }
	
		  function argumentsCheckerGetter() {
		    var type = 'function arguments';
		    return setupChecker(function argsCheckerDefinition(val, name, location) {
		      if (Array.isArray(val) || isError(checkers.object(val)) || isError(checkers.number(val.length))) {
		        return getError(name, location, type);
		      }
		    }, { type: type }, disabled);
		  }
	
		  function anyCheckGetter() {
		    return setupChecker(function anyCheckerDefinition() {
		      // don't do anything
		    }, { type: 'any' }, disabled);
		  }
	
		  function nullCheckGetter() {
		    var type = 'null';
		    return setupChecker(function nullChecker(val, name, location) {
		      if (val !== null) {
		        return getError(name, location, type);
		      }
		    }, { type: type }, disabled);
		  }
	
		  function rangeCheckGetter(min, max) {
		    var type = 'Range (' + min + ' - ' + max + ')';
		    return setupChecker(function rangeChecker(val, name, location) {
		      if (typeof val !== 'number' || val < min || val > max) {
		        return getError(name, location, type);
		      }
		    }, { type: type }, disabled);
		  }
	
		  function lessThanCheckGetter(min) {
		    var type = 'lessThan[' + min + ']';
		    return setupChecker(function lessThanChecker(val, name, location) {
		      if (typeof val !== 'number' || val > min) {
		        return getError(name, location, type);
		      }
		    }, { type: type }, disabled);
		  }
	
		  function greaterThanCheckGetter(max) {
		    var type = 'greaterThan[' + max + ']';
		    return setupChecker(function greaterThanChecker(val, name, location) {
		      if (typeof val !== 'number' || val < max) {
		        return getError(name, location, type);
		      }
		    }, { type: type }, disabled);
		  }
	
		  function emptyObjectCheckGetter() {
		    var type = 'empty object';
		    return setupChecker(function emptyObjectChecker(val, name, location) {
		      if (typeOf(val) !== 'object' || val === null || Object.keys(val).length) {
		        return getError(name, location, type);
		      }
		    }, { type: type }, disabled);
		  }
		}
	
	/***/ }
	/******/ ])
	});
	;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// angular-formly version 6.8.2 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)
	
	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory(__webpack_require__(2), __webpack_require__(4));
		else if(typeof define === 'function' && define.amd)
			define(["api-check", "angular"], factory);
		else if(typeof exports === 'object')
			exports["ngFormly"] = factory(require("api-check"), require("angular"));
		else
			root["ngFormly"] = factory(root["apiCheck"], root["angular"]);
	})(this, function(__WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_17__) {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	
	
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
		var index = _interopRequire(__webpack_require__(1));
	
		module.exports = index;
	
	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
		var angular = _interopRequire(__webpack_require__(15));
	
		var formlyApiCheck = _interopRequire(__webpack_require__(2));
	
		var formlyErrorAndWarningsUrlPrefix = _interopRequire(__webpack_require__(3));
	
		var formlyUsability = _interopRequire(__webpack_require__(4));
	
		var formlyConfig = _interopRequire(__webpack_require__(5));
	
		var formlyValidationMessages = _interopRequire(__webpack_require__(6));
	
		var formlyUtil = _interopRequire(__webpack_require__(7));
	
		var formlyWarn = _interopRequire(__webpack_require__(8));
	
		var formlyCustomValidation = _interopRequire(__webpack_require__(9));
	
		var formlyField = _interopRequire(__webpack_require__(10));
	
		var formlyFocus = _interopRequire(__webpack_require__(11));
	
		var formlyForm = _interopRequire(__webpack_require__(12));
	
		var formlyNgModelAttrsManipulator = _interopRequire(__webpack_require__(13));
	
		var formlyCustomTags = _interopRequire(__webpack_require__(14));
	
		var ngModuleName = "formly";
	
		module.exports = ngModuleName;
	
		var ngModule = angular.module(ngModuleName, []);
	
		ngModule.constant("formlyApiCheck", formlyApiCheck);
		ngModule.constant("formlyErrorAndWarningsUrlPrefix", formlyErrorAndWarningsUrlPrefix);
		ngModule.constant("formlyVersion", ("6.8.2")); // <-- webpack variable
	
		ngModule.provider("formlyUsability", formlyUsability);
		ngModule.provider("formlyConfig", formlyConfig);
	
		ngModule.factory("formlyValidationMessages", formlyValidationMessages);
		ngModule.factory("formlyUtil", formlyUtil);
		ngModule.factory("formlyWarn", formlyWarn);
	
		ngModule.directive("formlyCustomValidation", formlyCustomValidation);
		ngModule.directive("formlyField", formlyField);
		ngModule.directive("formlyFocus", formlyFocus);
		ngModule.directive("formlyForm", formlyForm);
	
		ngModule.run(formlyNgModelAttrsManipulator);
		ngModule.run(formlyCustomTags);
	
	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
		var apiCheckFactory = _interopRequire(__webpack_require__(16));
	
		var apiCheck = apiCheckFactory({
		  output: {
		    prefix: "angular-formly:",
		    docsBaseUrl: __webpack_require__(3)
		  }
		});
	
		function shapeRequiredIfNot(otherProps, propChecker) {
		  if (!angular.isArray(otherProps)) {
		    otherProps = [otherProps];
		  }
		  var type = "specified if these are not specified: `" + otherProps.join(", ") + "` (otherwise it's optional)";
		  function shapeRequiredIfNotDefinition(prop, propName, location, obj) {
		    var propExists = obj && obj.hasOwnProperty(propName);
		    var otherPropsExist = otherProps.some(function (otherProp) {
		      return obj && obj.hasOwnProperty(otherProp);
		    });
		    if (!otherPropsExist && !propExists) {
		      return apiCheck.utils.getError(propName, location, type);
		    } else if (propExists) {
		      return propChecker(prop, propName, location, obj);
		    }
		  }
		  shapeRequiredIfNotDefinition.type = type;
		  return apiCheck.utils.checkerHelpers.setupChecker(shapeRequiredIfNotDefinition);
		}
	
		var formlyExpression = apiCheck.oneOfType([apiCheck.string, apiCheck.func]);
		var specifyWrapperType = apiCheck.oneOfType([apiCheck.oneOf([null]), apiCheck.typeOrArrayOf(apiCheck.string)]);
	
		var apiCheckProperty = apiCheck.objectOf(apiCheck.func);
	
		var apiCheckInstanceProperty = apiCheck.shape.onlyIf("apiCheck", apiCheck.func.withProperties({
		  warn: apiCheck.func,
		  "throw": apiCheck.func,
		  shape: apiCheck.func
		}));
	
		var apiCheckFunctionProperty = apiCheck.shape.onlyIf("apiCheck", apiCheck.oneOf(["throw", "warn"]));
	
		var formlyWrapperType = apiCheck.shape({
		  name: shapeRequiredIfNot("types", apiCheck.string).optional,
		  template: apiCheck.shape.ifNot("templateUrl", apiCheck.string).optional,
		  templateUrl: apiCheck.shape.ifNot("template", apiCheck.string).optional,
		  types: apiCheck.typeOrArrayOf(apiCheck.string).optional,
		  overwriteOk: apiCheck.bool.optional,
		  validateOptions: apiCheck.func.optional,
		  apiCheck: apiCheckProperty.optional,
		  apiCheckInstance: apiCheckInstanceProperty.optional,
		  apiCheckFunction: apiCheckFunctionProperty.optional,
		  apiCheckOptions: apiCheck.object.optional
		}).strict;
	
		var expressionProperties = apiCheck.objectOf(apiCheck.oneOfType([formlyExpression, apiCheck.shape({
		  expression: formlyExpression,
		  message: formlyExpression.optional
		}).strict]));
	
		var modelChecker = apiCheck.oneOfType([apiCheck.oneOf(["formState"]), apiCheck.object]);
	
		var fieldOptionsApiShape = {
		  $$hashKey: apiCheck.any.optional,
		  type: apiCheck.shape.ifNot(["template", "templateUrl"], apiCheck.string).optional,
		  template: apiCheck.shape.ifNot(["type", "templateUrl"], apiCheck.oneOfType([apiCheck.string, apiCheck.func])).optional,
		  templateUrl: apiCheck.shape.ifNot(["type", "template"], apiCheck.oneOfType([apiCheck.string, apiCheck.func])).optional,
		  key: apiCheck.oneOfType([apiCheck.string, apiCheck.number]).optional,
		  model: modelChecker.optional,
		  className: apiCheck.string.optional,
		  id: apiCheck.string.optional,
		  expressionProperties: expressionProperties.optional,
		  data: apiCheck.object.optional,
		  templateOptions: apiCheck.object.optional,
		  wrapper: specifyWrapperType.optional,
		  modelOptions: apiCheck.shape({
		    updateOn: apiCheck.string.optional,
		    debounce: apiCheck.oneOfType([apiCheck.objectOf(apiCheck.number), apiCheck.number]).optional,
		    allowInvalid: apiCheck.bool.optional,
		    getterSetter: apiCheck.bool.optional,
		    timezone: apiCheck.string.optional
		  }).optional,
		  watcher: apiCheck.typeOrArrayOf(apiCheck.shape({
		    expression: formlyExpression.optional,
		    listener: formlyExpression
		  })).optional,
		  validators: apiCheck.objectOf(apiCheck.oneOfType([formlyExpression, apiCheck.shape({
		    expression: formlyExpression,
		    message: formlyExpression.optional
		  }).strict])).optional,
		  noFormControl: apiCheck.bool.optional,
		  hide: apiCheck.bool.optional,
		  hideExpression: formlyExpression.optional,
		  ngModelAttrs: apiCheck.objectOf(apiCheck.shape({
		    expression: apiCheck.shape.ifNot(["value", "attribute", "bound"], apiCheck.any).optional,
		    value: apiCheck.shape.ifNot("expression", apiCheck.any).optional,
		    attribute: apiCheck.shape.ifNot("expression", apiCheck.any).optional,
		    bound: apiCheck.shape.ifNot("expression", apiCheck.any).optional
		  }).strict).optional,
		  elementAttributes: apiCheck.objectOf(apiCheck.string).optional,
		  optionsTypes: apiCheck.typeOrArrayOf(apiCheck.string).optional,
		  link: apiCheck.func.optional,
		  controller: apiCheck.oneOfType([apiCheck.string, apiCheck.func, apiCheck.array]).optional,
		  validation: apiCheck.shape({
		    show: apiCheck.oneOfType([apiCheck.bool, apiCheck.oneOf([null])]).optional,
		    messages: apiCheck.objectOf(formlyExpression).optional,
		    errorExistsAndShouldBeVisible: apiCheck.bool.optional
		  }).optional,
		  formControl: apiCheck.object.optional,
		  value: apiCheck.func.optional,
		  runExpressions: apiCheck.func.optional,
		  resetModel: apiCheck.func.optional,
		  updateInitialValue: apiCheck.func.optional,
		  initialValue: apiCheck.any.optional,
		  defaultValue: apiCheck.any.optional
		};
	
		var formlyFieldOptions = apiCheck.shape(fieldOptionsApiShape).strict;
	
		var formOptionsApi = apiCheck.shape({
		  formState: apiCheck.object.optional,
		  resetModel: apiCheck.func.optional,
		  updateInitialValue: apiCheck.func.optional,
		  removeChromeAutoComplete: apiCheck.bool.optional
		}).strict;
	
		var fieldGroup = apiCheck.shape({
		  $$hashKey: apiCheck.any.optional,
		  // danger. Nested field groups wont get api-checked...
		  fieldGroup: apiCheck.arrayOf(apiCheck.oneOfType([formlyFieldOptions, apiCheck.object])),
		  className: apiCheck.string.optional,
		  options: formOptionsApi.optional,
		  hide: apiCheck.bool.optional,
		  hideExpression: formlyExpression.optional,
		  model: modelChecker.optional,
		  form: apiCheck.object.optional,
		  elementAttributes: apiCheck.objectOf(apiCheck.string).optional
		}).strict;
	
		var typeOptionsDefaultOptions = angular.copy(fieldOptionsApiShape);
		typeOptionsDefaultOptions.key = apiCheck.string.optional;
	
		var formlyTypeOptions = apiCheck.shape({
		  name: apiCheck.string,
		  template: apiCheck.shape.ifNot("templateUrl", apiCheck.oneOfType([apiCheck.string, apiCheck.func])).optional,
		  templateUrl: apiCheck.shape.ifNot("template", apiCheck.oneOfType([apiCheck.string, apiCheck.func])).optional,
		  controller: apiCheck.oneOfType([apiCheck.func, apiCheck.string, apiCheck.array]).optional,
		  link: apiCheck.func.optional,
		  defaultOptions: apiCheck.oneOfType([apiCheck.func, apiCheck.shape(typeOptionsDefaultOptions)]).optional,
		  "extends": apiCheck.string.optional,
		  wrapper: specifyWrapperType.optional,
		  data: apiCheck.object.optional,
		  validateOptions: apiCheck.func.optional,
		  apiCheck: apiCheckProperty.optional,
		  apiCheckInstance: apiCheckInstanceProperty.optional,
		  apiCheckFunction: apiCheckFunctionProperty.optional,
		  apiCheckOptions: apiCheck.object.optional,
		  overwriteOk: apiCheck.bool.optional
		}).strict;
		angular.extend(apiCheck, {
		  formlyTypeOptions: formlyTypeOptions, formlyFieldOptions: formlyFieldOptions, formlyExpression: formlyExpression, formlyWrapperType: formlyWrapperType, fieldGroup: fieldGroup, formOptionsApi: formOptionsApi
		});
	
		module.exports = apiCheck;
	
	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		module.exports = "https://github.com/formly-js/angular-formly/blob/" + ("6.8.2") + "/other/ERRORS_AND_WARNINGS.md#";
	
	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
		var angular = _interopRequire(__webpack_require__(15));
	
		module.exports = formlyUsability;
	
		// @ngInject
		function formlyUsability(formlyApiCheck, formlyErrorAndWarningsUrlPrefix) {
		  var _this = this;
	
		  angular.extend(this, {
		    getFormlyError: getFormlyError,
		    getFieldError: getFieldError,
		    checkWrapper: checkWrapper,
		    checkWrapperTemplate: checkWrapperTemplate,
		    $get: function () {
		      return _this;
		    }
		  });
	
		  function getFieldError(errorInfoSlug, message, field) {
		    if (arguments.length < 3) {
		      field = message;
		      message = errorInfoSlug;
		      errorInfoSlug = null;
		    }
		    return new Error(getErrorMessage(errorInfoSlug, message) + (" Field definition: " + angular.toJson(field)));
		  }
	
		  function getFormlyError(errorInfoSlug, message) {
		    if (!message) {
		      message = errorInfoSlug;
		      errorInfoSlug = null;
		    }
		    return new Error(getErrorMessage(errorInfoSlug, message));
		  }
	
		  function getErrorMessage(errorInfoSlug, message) {
		    var url = "";
		    if (errorInfoSlug !== null) {
		      url = "" + formlyErrorAndWarningsUrlPrefix + "" + errorInfoSlug;
		    }
		    return "Formly Error: " + message + ". " + url;
		  }
	
		  function checkWrapper(wrapper) {
		    formlyApiCheck["throw"](formlyApiCheck.formlyWrapperType, wrapper, {
		      prefix: "formlyConfig.setWrapper",
		      urlSuffix: "setwrapper-validation-failed"
		    });
		  }
	
		  function checkWrapperTemplate(template, additionalInfo) {
		    var formlyTransclude = "<formly-transclude></formly-transclude>";
		    if (template.indexOf(formlyTransclude) === -1) {
		      throw getFormlyError("Template wrapper templates must use \"" + formlyTransclude + "\" somewhere in them. " + ("This one does not have \"<formly-transclude></formly-transclude>\" in it: " + template) + "\n" + ("Additional information: " + JSON.stringify(additionalInfo)));
		    }
		  }
		}
		formlyUsability.$inject = ["formlyApiCheck", "formlyErrorAndWarningsUrlPrefix"];
	
	/***/ },
	/* 5 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
		var angular = _interopRequire(__webpack_require__(15));
	
		var utils = _interopRequire(__webpack_require__(18));
	
		module.exports = formlyConfig;
	
		// @ngInject
		function formlyConfig(formlyUsabilityProvider, formlyApiCheck) {
		  var _this2 = this;
	
		  var typeMap = {};
		  var templateWrappersMap = {};
		  var defaultWrapperName = "default";
		  var _this = this;
		  var getError = formlyUsabilityProvider.getFormlyError;
	
		  angular.extend(this, {
		    setType: setType,
		    getType: getType,
		    setWrapper: setWrapper,
		    getWrapper: getWrapper,
		    getWrapperByType: getWrapperByType,
		    removeWrapperByName: removeWrapperByName,
		    removeWrappersForType: removeWrappersForType,
		    disableWarnings: false,
		    extras: {
		      disableNgModelAttrsManipulator: false,
		      ngModelAttrsManipulatorPreferUnbound: false,
		      removeChromeAutoComplete: false,
		      defaultHideDirective: "ng-if",
		      getFieldId: null
		    },
		    templateManipulators: {
		      preWrapper: [],
		      postWrapper: []
		    },
		    $get: function () {
		      return _this2;
		    }
		  });
	
		  function setType(options) {
		    if (angular.isArray(options)) {
		      angular.forEach(options, setType);
		    } else if (angular.isObject(options)) {
		      checkType(options);
		      if (options["extends"]) {
		        extendTypeOptions(options);
		      }
		      typeMap[options.name] = options;
		    } else {
		      throw getError("You must provide an object or array for setType. You provided: " + JSON.stringify(arguments));
		    }
		  }
	
		  function checkType(options) {
		    formlyApiCheck["throw"](formlyApiCheck.formlyTypeOptions, options, {
		      prefix: "formlyConfig.setType",
		      url: "settype-validation-failed"
		    });
		    if (!options.overwriteOk) {
		      checkOverwrite(options.name, typeMap, options, "types");
		    } else {
		      options.overwriteOk = undefined;
		    }
		  }
	
		  function extendTypeOptions(options) {
		    var extendsType = getType(options["extends"], true, options);
		    extendTypeControllerFunction(options, extendsType);
		    extendTypeLinkFunction(options, extendsType);
		    extendTypeValidateOptionsFunction(options, extendsType);
		    extendTypeDefaultOptions(options, extendsType);
		    utils.reverseDeepMerge(options, extendsType);
		    extendTemplate(options, extendsType);
		  }
	
		  function extendTemplate(options, extendsType) {
		    if (options.template && extendsType.templateUrl) {
		      delete options.templateUrl;
		    } else if (options.templateUrl && extendsType.template) {
		      delete options.template;
		    }
		  }
	
		  function extendTypeControllerFunction(options, extendsType) {
		    var extendsCtrl = extendsType.controller;
		    if (!angular.isDefined(extendsCtrl)) {
		      return;
		    }
		    var optionsCtrl = options.controller;
		    if (angular.isDefined(optionsCtrl)) {
		      options.controller = function ($scope, $controller) {
		        $controller(extendsCtrl, { $scope: $scope });
		        $controller(optionsCtrl, { $scope: $scope });
		      };
		      options.controller.$inject = ["$scope", "$controller"];
		    } else {
		      options.controller = extendsCtrl;
		    }
		  }
	
		  function extendTypeLinkFunction(options, extendsType) {
		    var extendsFn = extendsType.link;
		    if (!angular.isDefined(extendsFn)) {
		      return;
		    }
		    var optionsFn = options.link;
		    if (angular.isDefined(optionsFn)) {
		      options.link = function () {
		        extendsFn.apply(undefined, arguments);
		        optionsFn.apply(undefined, arguments);
		      };
		    } else {
		      options.link = extendsFn;
		    }
		  }
	
		  function extendTypeValidateOptionsFunction(options, extendsType) {
		    var extendsFn = extendsType.validateOptions;
		    if (!angular.isDefined(extendsFn)) {
		      return;
		    }
		    var optionsFn = options.validateOptions;
		    var originalDefaultOptions = options.defaultOptions;
		    if (angular.isDefined(optionsFn)) {
		      options.validateOptions = function (options) {
		        optionsFn(options);
		        var mergedOptions = angular.copy(options);
		        var defaultOptions = originalDefaultOptions;
		        if (defaultOptions) {
		          if (angular.isFunction(defaultOptions)) {
		            defaultOptions = defaultOptions(mergedOptions);
		          }
		          utils.reverseDeepMerge(mergedOptions, defaultOptions);
		        }
		        extendsFn(mergedOptions);
		      };
		    } else {
		      options.validateOptions = extendsFn;
		    }
		  }
	
		  function extendTypeDefaultOptions(options, extendsType) {
		    var extendsDO = extendsType.defaultOptions;
		    if (!angular.isDefined(extendsDO)) {
		      return;
		    }
		    var optionsDO = options.defaultOptions;
		    var optionsDOIsFn = angular.isFunction(optionsDO);
		    var extendsDOIsFn = angular.isFunction(extendsDO);
		    if (extendsDOIsFn) {
		      options.defaultOptions = function defaultOptions(options) {
		        var extendsDefaultOptions = extendsDO(options);
		        var mergedDefaultOptions = {};
		        utils.reverseDeepMerge(mergedDefaultOptions, options, extendsDefaultOptions);
		        var extenderOptionsDefaultOptions = optionsDO;
		        if (optionsDOIsFn) {
		          extenderOptionsDefaultOptions = extenderOptionsDefaultOptions(mergedDefaultOptions);
		        }
		        utils.reverseDeepMerge(extendsDefaultOptions, extenderOptionsDefaultOptions);
		        return extendsDefaultOptions;
		      };
		    } else if (optionsDOIsFn) {
		      options.defaultOptions = function defaultOptions(options) {
		        var newDefaultOptions = {};
		        utils.reverseDeepMerge(newDefaultOptions, options, extendsDO);
		        return optionsDO(newDefaultOptions);
		      };
		    }
		  }
	
		  function getType(name, throwError, errorContext) {
		    if (!name) {
		      return undefined;
		    }
		    var type = typeMap[name];
		    if (!type && throwError === true) {
		      throw getError("There is no type by the name of \"" + name + "\": " + JSON.stringify(errorContext));
		    } else {
		      return type;
		    }
		  }
	
		  function setWrapper(_x, _x2) {
		    var _again = true;
	
		    _function: while (_again) {
		      _again = false;
		      var options = _x,
		          name = _x2;
	
		      if (angular.isArray(options)) {
		        return options.map(function (wrapperOptions) {
		          return setWrapper(wrapperOptions);
		        });
		      } else if (angular.isObject(options)) {
		        options.types = getOptionsTypes(options);
		        options.name = getOptionsName(options, name);
		        checkWrapperAPI(options);
		        templateWrappersMap[options.name] = options;
		        return options;
		      } else if (angular.isString(options)) {
		        _x = {
		          template: options,
		          name: name
		        };
		        _again = true;
		        continue _function;
		      }
		    }
		  }
	
		  function getOptionsTypes(options) {
		    if (angular.isString(options.types)) {
		      return [options.types];
		    }
		    if (!angular.isDefined(options.types)) {
		      return [];
		    } else {
		      return options.types;
		    }
		  }
	
		  function getOptionsName(options, name) {
		    return options.name || name || options.types.join(" ") || defaultWrapperName;
		  }
	
		  function checkWrapperAPI(options) {
		    formlyUsabilityProvider.checkWrapper(options);
		    if (options.template) {
		      formlyUsabilityProvider.checkWrapperTemplate(options.template, options);
		    }
		    if (!options.overwriteOk) {
		      checkOverwrite(options.name, templateWrappersMap, options, "templateWrappers");
		    } else {
		      delete options.overwriteOk;
		    }
		    checkWrapperTypes(options);
		  }
	
		  function checkWrapperTypes(options) {
		    var shouldThrow = !angular.isArray(options.types) || !options.types.every(angular.isString);
		    if (shouldThrow) {
		      throw getError("Attempted to create a template wrapper with types that is not a string or an array of strings");
		    }
		  }
	
		  function checkOverwrite(property, object, newValue, objectName) {
		    if (object.hasOwnProperty(property)) {
		      warn(["Attempting to overwrite " + property + " on " + objectName + " which is currently", "" + JSON.stringify(object[property]) + " with " + JSON.stringify(newValue), "To supress this warning, specify the property \"overwriteOk: true\""].join(" "));
		    }
		  }
	
		  function getWrapper(name) {
		    return templateWrappersMap[name || defaultWrapperName];
		  }
	
		  function getWrapperByType(type) {
		    /* jshint maxcomplexity:6 */
		    var wrappers = [];
		    for (var name in templateWrappersMap) {
		      if (templateWrappersMap.hasOwnProperty(name)) {
		        if (templateWrappersMap[name].types && templateWrappersMap[name].types.indexOf(type) !== -1) {
		          wrappers.push(templateWrappersMap[name]);
		        }
		      }
		    }
		    return wrappers;
		  }
	
		  function removeWrapperByName(name) {
		    var wrapper = templateWrappersMap[name];
		    delete templateWrappersMap[name];
		    return wrapper;
		  }
	
		  function removeWrappersForType(type) {
		    var wrappers = getWrapperByType(type);
		    if (!wrappers) {
		      return;
		    }
		    if (!angular.isArray(wrappers)) {
		      return removeWrapperByName(wrappers.name);
		    } else {
		      wrappers.forEach(function (wrapper) {
		        return removeWrapperByName(wrapper.name);
		      });
		      return wrappers;
		    }
		  }
	
		  function warn() {
		    if (!_this.disableWarnings) {
		      console.warn.apply(console, arguments);
		    }
		  }
		}
		formlyConfig.$inject = ["formlyUsabilityProvider", "formlyApiCheck"];
	
	/***/ },
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		module.exports = formlyValidationMessages;
	
		// @ngInject
		function formlyValidationMessages() {
	
		  var validationMessages = {
		    addTemplateOptionValueMessage: addTemplateOptionValueMessage,
		    addStringMessage: addStringMessage,
		    messages: {}
		  };
	
		  return validationMessages;
	
		  function addTemplateOptionValueMessage(name, prop, prefix, suffix, alternate) {
		    validationMessages.messages[name] = templateOptionValue(prop, prefix, suffix, alternate);
		  }
	
		  function addStringMessage(name, string) {
		    validationMessages.messages[name] = function () {
		      return string;
		    };
		  }
	
		  function templateOptionValue(prop, prefix, suffix, alternate) {
		    return function getValidationMessage(viewValue, modelValue, scope) {
		      if (scope.options.templateOptions[prop]) {
		        return "" + prefix + " " + scope.options.templateOptions[prop] + " " + suffix;
		      } else {
		        return alternate;
		      }
		    };
		  }
		}
	
	/***/ },
	/* 7 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
		var utils = _interopRequire(__webpack_require__(18));
	
		module.exports = formlyUtil;
	
		// @ngInject
		function formlyUtil() {
		  return utils;
		}
	
	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
		module.exports = formlyWarn;
	
		// @ngInject
		function formlyWarn(formlyConfig, formlyErrorAndWarningsUrlPrefix, $log) {
		  return function warn() {
		    if (!formlyConfig.disableWarnings) {
		      var args = Array.prototype.slice.call(arguments);
		      var warnInfoSlug = args.shift();
		      args.unshift("Formly Warning:");
		      args.push("" + formlyErrorAndWarningsUrlPrefix + "" + warnInfoSlug);
		      $log.warn.apply($log, _toConsumableArray(args));
		    }
		  };
		}
		formlyWarn.$inject = ["formlyConfig", "formlyErrorAndWarningsUrlPrefix", "$log"];
	
	/***/ },
	/* 9 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		module.exports = formlyCustomValidation;
	
		// @ngInject
		function formlyCustomValidation(formlyUtil, $q) {
		  return {
		    restrict: "A",
		    require: "ngModel",
		    link: function formlyCustomValidationLink(scope, el, attrs, ctrl) {
		      var opts = scope.options;
		      if (opts.validators) {
		        checkValidators(opts.validators);
		      }
		      opts.validation.messages = opts.validation.messages || {};
		      angular.forEach(opts.validation.messages, function (message, key) {
		        opts.validation.messages[key] = function () {
		          return formlyUtil.formlyEval(scope, message, ctrl.$modelValue, ctrl.$viewValue);
		        };
		      });
	
		      var useNewValidatorsApi = ctrl.hasOwnProperty("$validators") && !attrs.hasOwnProperty("useParsers");
		      angular.forEach(opts.validators, function addValidatorToPipeline(validator, name) {
		        var message = validator.message;
		        if (message) {
		          opts.validation.messages[name] = function () {
		            return formlyUtil.formlyEval(scope, message, ctrl.$modelValue, ctrl.$viewValue);
		          };
		        }
		        validator = angular.isObject(validator) ? validator.expression : validator;
		        var isPossiblyAsync = !angular.isString(validator);
		        if (useNewValidatorsApi) {
		          setupWithValidators();
		        } else {
		          setupWithParsers();
		        }
	
		        function setupWithValidators() {
		          var validatorCollection = isPossiblyAsync ? "$asyncValidators" : "$validators";
		          ctrl[validatorCollection][name] = function evalValidity(modelValue, viewValue) {
		            var value = formlyUtil.formlyEval(scope, validator, modelValue, viewValue);
		            if (isPossiblyAsync) {
		              return isPromiseLike(value) ? value : value ? $q.when(value) : $q.reject(value);
		            } else {
		              return value;
		            }
		          };
		        }
	
		        function setupWithParsers() {
		          var inFlightValidator = undefined;
		          ctrl.$parsers.unshift(function evalValidityOfParser(viewValue) {
		            var isValid = formlyUtil.formlyEval(scope, validator, ctrl.$modelValue, viewValue);
		            if (isPromiseLike(isValid)) {
		              ctrl.$pending = ctrl.$pending || {};
		              ctrl.$pending[name] = true;
		              inFlightValidator = isValid;
		              isValid.then(function () {
		                if (inFlightValidator === isValid) {
		                  ctrl.$setValidity(name, true);
		                }
		              })["catch"](function () {
		                if (inFlightValidator === isValid) {
		                  ctrl.$setValidity(name, false);
		                }
		              })["finally"](function () {
		                if (Object.keys(ctrl.$pending).length === 1) {
		                  delete ctrl.$pending;
		                } else {
		                  delete ctrl.$pending[name];
		                }
		              });
		            } else {
		              ctrl.$setValidity(name, isValid);
		            }
		            return viewValue;
		          });
		        }
		      });
		    }
		  };
	
		  function isPromiseLike(obj) {
		    return obj && angular.isFunction(obj.then);
		  }
	
		  function checkValidators(validators) {
		    var allowedProperties = ["expression", "message"];
		    var validatorsWithExtraProps = {};
		    angular.forEach(validators, function (validator, name) {
		      if (angular.isString(validator)) {
		        return;
		      }
		      var extraProps = [];
		      angular.forEach(validator, function (v, key) {
		        if (allowedProperties.indexOf(key) === -1) {
		          extraProps.push(key);
		        }
		      });
		      if (extraProps.length) {
		        validatorsWithExtraProps[name] = extraProps;
		      }
		    });
		    if (Object.keys(validatorsWithExtraProps).length) {
		      throw new Error(["Validators are only allowed to be functions or objects that have " + allowedProperties.join(", ") + ".", "You provided some extra properties: " + JSON.stringify(validatorsWithExtraProps)].join(" "));
		    }
		  }
		}
		formlyCustomValidation.$inject = ["formlyUtil", "$q"];
	
	/***/ },
	/* 10 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
		var angular = _interopRequire(__webpack_require__(15));
	
		module.exports = formlyField;
	
		/**
		 * @ngdoc directive
		 * @name formlyField
		 * @restrict AE
		 */
		// @ngInject
		function formlyField($http, $q, $compile, $templateCache, formlyConfig, formlyValidationMessages, formlyApiCheck, formlyUtil, formlyUsability, formlyWarn) {
		  var arrayify = formlyUtil.arrayify;
	
		  FormlyFieldController.$inject = ["$scope", "$timeout", "$parse", "$controller"];
		  return {
		    restrict: "AE",
		    transclude: true,
		    scope: {
		      options: "=",
		      model: "=",
		      formId: "@", // TODO remove formId in a breaking release
		      index: "=?",
		      fields: "=?",
		      formState: "=?",
		      form: "=?" // TODO require form in a breaking release
		    },
		    controller: FormlyFieldController,
		    link: fieldLink
		  };
	
		  // @ngInject
		  function FormlyFieldController($scope, $timeout, $parse, $controller) {
		    /* jshint maxstatements:31 */
		    if ($scope.options.fieldGroup) {
		      setupFieldGroup();
		      return;
		    }
	
		    var fieldType = getFieldType($scope.options);
		    simplifyLife($scope.options);
		    mergeFieldOptionsWithTypeDefaults($scope.options, fieldType);
		    extendOptionsWithDefaults($scope.options, $scope.index);
		    checkApi($scope.options);
		    // set field id to link labels and fields
	
		    // initalization
		    setFieldId();
		    setDefaultValue();
		    setInitialValue();
		    runExpressions();
		    addModelWatcher($scope, $scope.options);
		    addValidationMessages($scope.options);
		    invokeControllers($scope, $scope.options, fieldType);
	
		    // function definitions
		    function runExpressions() {
		      // must run on next tick to make sure that the current value is correct.
		      $timeout(function runExpressionsOnNextTick() {
		        var field = $scope.options;
		        var currentValue = valueGetterSetter();
		        angular.forEach(field.expressionProperties, function runExpression(expression, prop) {
		          var setter = $parse(prop).assign;
		          var promise = $q.when(formlyUtil.formlyEval($scope, expression, currentValue));
		          promise.then(function setFieldValue(value) {
		            setter(field, value);
		          });
		        });
		      });
		    }
	
		    function valueGetterSetter(newVal) {
		      if (!$scope.model || !$scope.options.key) {
		        return;
		      }
		      if (angular.isDefined(newVal)) {
		        $scope.model[$scope.options.key] = newVal;
		      }
		      return $scope.model[$scope.options.key];
		    }
	
		    function simplifyLife(options) {
		      // add a few empty objects (if they don't already exist) so you don't have to undefined check everywhere
		      formlyUtil.reverseDeepMerge(options, {
		        data: {},
		        templateOptions: {},
		        validation: {}
		      });
		      // create $scope.to so template authors can reference to instead of $scope.options.templateOptions
		      $scope.to = $scope.options.templateOptions;
		    }
	
		    function setFieldId() {
		      if (angular.isFunction(formlyConfig.extras.getFieldId)) {
		        $scope.id = formlyConfig.extras.getFieldId($scope.options, $scope.model, $scope);
		      } else {
		        var formName = $scope.form && $scope.form.$name || $scope.formId;
		        $scope.id = formlyUtil.getFieldId(formName, $scope.options, $scope.index);
		      }
		      $scope.options.id = $scope.id;
		    }
	
		    function setDefaultValue() {
		      if (angular.isDefined($scope.options.defaultValue) && !angular.isDefined($scope.model[$scope.options.key])) {
		        $scope.model[$scope.options.key] = $scope.options.defaultValue;
		      }
		    }
	
		    function setInitialValue() {
		      $scope.options.initialValue = $scope.model && $scope.model[$scope.options.key];
		    }
	
		    function mergeFieldOptionsWithTypeDefaults(options, type) {
		      if (type) {
		        mergeOptions(options, type.defaultOptions);
		      }
		      var properOrder = arrayify(options.optionsTypes).reverse(); // so the right things are overridden
		      angular.forEach(properOrder, function (typeName) {
		        mergeOptions(options, formlyConfig.getType(typeName, true, options).defaultOptions);
		      });
		    }
	
		    function mergeOptions(options, extraOptions) {
		      if (extraOptions) {
		        if (angular.isFunction(extraOptions)) {
		          extraOptions = extraOptions(options);
		        }
		        formlyUtil.reverseDeepMerge(options, extraOptions);
		      }
		    }
	
		    function extendOptionsWithDefaults(options, index) {
		      var key = options.key || index || 0;
		      angular.extend(options, {
		        // attach the key in case the formly-field directive is used directly
		        key: key,
		        value: valueGetterSetter,
		        runExpressions: runExpressions,
		        resetModel: resetModel,
		        updateInitialValue: updateInitialValue
		      });
		    }
	
		    // initialization functions
		    function addModelWatcher(scope, options) {
		      if (options.model) {
		        scope.$watch("options.model", runExpressions, true);
		      }
		    }
	
		    function resetModel() {
		      $scope.model[$scope.options.key] = $scope.options.initialValue;
		      if ($scope.options.formControl) {
		        $scope.options.formControl.$setViewValue($scope.model[$scope.options.key]);
		        $scope.options.formControl.$render();
		        $scope.options.formControl.$setUntouched();
		        $scope.options.formControl.$setPristine();
		      }
		    }
	
		    function updateInitialValue() {
		      $scope.options.initialValue = $scope.model[$scope.options.key];
		    }
	
		    function addValidationMessages(options) {
		      options.validation.messages = options.validation.messages || {};
		      angular.forEach(formlyValidationMessages.messages, function createFunctionForMessage(expression, name) {
		        if (!options.validation.messages[name]) {
		          options.validation.messages[name] = function evaluateMessage(viewValue, modelValue, scope) {
		            return formlyUtil.formlyEval(scope, expression, modelValue, viewValue);
		          };
		        }
		      });
		    }
	
		    function invokeControllers(scope) {
		      var options = arguments[1] === undefined ? {} : arguments[1];
		      var type = arguments[2] === undefined ? {} : arguments[2];
	
		      angular.forEach([type.controller, options.controller], function (controller) {
		        if (controller) {
		          $controller(controller, { $scope: scope });
		        }
		      });
		    }
	
		    function setupFieldGroup() {
		      $scope.options.options = $scope.options.options || {};
		      $scope.options.options.formState = $scope.formState;
		    }
		  }
	
		  // link function
		  function fieldLink(scope, el) {
		    if (scope.options.fieldGroup) {
		      setFieldGroupTemplate();
		      return;
		    }
	
		    addAttributes();
		    addClasses();
	
		    var type = getFieldType(scope.options);
		    var args = arguments;
		    var thusly = this;
		    getFieldTemplate(scope.options).then(runManipulators(formlyConfig.templateManipulators.preWrapper)).then(transcludeInWrappers(scope.options)).then(runManipulators(formlyConfig.templateManipulators.postWrapper)).then(setElementTemplate).then(watchFormControl).then(callLinkFunctions)["catch"](function (error) {
		      formlyWarn("there-was-a-problem-setting-the-template-for-this-field", "There was a problem setting the template for this field ", scope.options, error);
		    });
	
		    function setFieldGroupTemplate() {
		      checkFieldGroupApi(scope.options);
		      el.addClass("formly-field-group");
		      var extraAttributes = "";
		      if (scope.options.elementAttributes) {
		        extraAttributes = Object.keys(scope.options.elementAttributes).map(function (key) {
		          return "" + key + "=\"" + scope.options.elementAttributes[key] + "\"";
		        }).join(" ");
		      }
		      setElementTemplate("\n          <formly-form model=\"model\"\n                       fields=\"options.fieldGroup\"\n                       options=\"options.options\"\n                       form=\"options.form\"\n                       class=\"" + scope.options.className + "\"\n                       " + extraAttributes + "\n                       is-field-group>\n          </formly-form>\n        ");
		    }
	
		    function addAttributes() {
		      if (scope.options.elementAttributes) {
		        el.attr(scope.options.elementAttributes);
		      }
		    }
	
		    function addClasses() {
		      if (scope.options.className) {
		        el.addClass(scope.options.className);
		      }
		      if (scope.options.type) {
		        el.addClass("formly-field-" + scope.options.type);
		      }
		    }
	
		    function setElementTemplate(templateString) {
		      el.html(asHtml(templateString));
		      $compile(el.contents())(scope);
		      return templateString;
		    }
	
		    function watchFormControl(templateString) {
		      var stopWatchingField = angular.noop;
		      var stopWatchingShowError = angular.noop;
		      if (scope.options.noFormControl) {
		        return;
		      }
		      var templateEl = angular.element("<div>" + templateString + "</div>");
		      var ngModelNode = templateEl[0].querySelector("[ng-model],[data-ng-model]");
		      if (ngModelNode && ngModelNode.getAttribute("name")) {
		        watchFieldNameOrExistence(ngModelNode.getAttribute("name"));
		      }
	
		      function watchFieldNameOrExistence(name) {
		        var nameExpressionRegex = /\{\{(.*?)}}/;
		        var nameExpression = nameExpressionRegex.exec(name);
		        if (nameExpression) {
		          watchFieldName(nameExpression[1]);
		        } else {
		          watchFieldExistence(name);
		        }
		      }
	
		      function watchFieldName(expression) {
		        scope.$watch(expression, function oneFieldNameChange(name) {
		          if (name) {
		            stopWatchingField();
		            watchFieldExistence(name);
		          }
		        });
		      }
	
		      function watchFieldExistence(name) {
		        stopWatchingField = scope.$watch("form[\"" + name + "\"]", function formControlChange(formControl) {
		          if (formControl) {
		            scope.fc = formControl; // shortcut for template authors
		            scope.options.formControl = formControl;
		            stopWatchingShowError();
		            addShowMessagesWatcher();
		          }
		        });
		      }
	
		      function addShowMessagesWatcher() {
		        stopWatchingShowError = scope.$watch(function watchShowValidationChange() {
		          var customExpression = formlyConfig.extras.errorExistsAndShouldBeVisibleExpression;
		          var options = scope.options;
		          var fc = scope.fc;
	
		          if (!fc.$invalid) {
		            return false;
		          } else if (typeof options.validation.show === "boolean") {
		            return options.validation.show;
		          } else if (customExpression) {
		            return formlyUtil.formlyEval(scope, customExpression, fc.$modelValue, fc.$viewValue);
		          } else {
		            var noTouchedButDirty = angular.isUndefined(fc.$touched) && fc.$dirty;
		            return scope.fc.$touched || noTouchedButDirty;
		          }
		        }, function onShowValidationChange(show) {
		          scope.options.validation.errorExistsAndShouldBeVisible = show;
		          scope.showError = show; // shortcut for template authors
		        });
		      }
		    }
	
		    function callLinkFunctions() {
		      if (type && type.link) {
		        type.link.apply(thusly, args);
		      }
		      if (scope.options.link) {
		        scope.options.link.apply(thusly, args);
		      }
		    }
	
		    function runManipulators(manipulators) {
		      return function runManipulatorsOnTemplate(template) {
		        var chain = $q.when(template);
		        angular.forEach(manipulators, function (manipulator) {
		          chain = chain.then(function (template) {
		            return $q.when(manipulator(template, scope.options, scope)).then(function (newTemplate) {
		              return angular.isString(newTemplate) ? newTemplate : asHtml(newTemplate);
		            });
		          });
		        });
		        return chain;
		      };
		    }
		  }
	
		  // stateless util functions
		  function asHtml(el) {
		    var wrapper = angular.element("<a></a>");
		    return wrapper.append(el).html();
		  }
	
		  function getFieldType(options) {
		    return options.type && formlyConfig.getType(options.type);
		  }
	
		  function getFieldTemplate(options) {
		    function fromOptionsOrType(key, type) {
		      if (angular.isDefined(options[key])) {
		        return options[key];
		      } else if (type && angular.isDefined(type[key])) {
		        return type[key];
		      }
		    }
	
		    var type = formlyConfig.getType(options.type, true, options);
		    var template = fromOptionsOrType("template", type);
		    var templateUrl = fromOptionsOrType("templateUrl", type);
		    if (angular.isUndefined(template) && !templateUrl) {
		      throw formlyUsability.getFieldError("type-type-has-no-template", "Type '" + options.type + "' has not template. On element:", options);
		    }
	
		    return getTemplate(templateUrl || template, angular.isUndefined(template), options);
		  }
	
		  function getTemplate(template, isUrl, options) {
		    var templatePromise = undefined;
		    if (angular.isFunction(template)) {
		      templatePromise = $q.when(template(options));
		    } else {
		      templatePromise = $q.when(template);
		    }
	
		    if (!isUrl) {
		      return templatePromise;
		    } else {
		      var _ret = (function () {
		        var httpOptions = { cache: $templateCache };
		        return {
		          v: templatePromise.then(function (url) {
		            return $http.get(url, httpOptions);
		          }).then(function (response) {
		            return response.data;
		          })["catch"](function handleErrorGettingATemplate(error) {
		            formlyWarn("problem-loading-template-for-templateurl", "Problem loading template for " + template, error);
		          })
		        };
		      })();
	
		      if (typeof _ret === "object") {
		        return _ret.v;
		      }
		    }
		  }
	
		  function transcludeInWrappers(options) {
		    var wrapper = getWrapperOption(options);
	
		    return function transcludeTemplate(template) {
		      if (!wrapper.length) {
		        return $q.when(template);
		      }
	
		      wrapper.forEach(function (wrapper) {
		        formlyUsability.checkWrapper(wrapper, options);
		        wrapper.validateOptions && wrapper.validateOptions(options);
		        runApiCheck(wrapper, options);
		      });
		      var promises = wrapper.map(function (w) {
		        return getTemplate(w.template || w.templateUrl, !w.template);
		      });
		      return $q.all(promises).then(function (wrappersTemplates) {
		        wrappersTemplates.forEach(function (wrapperTemplate, index) {
		          formlyUsability.checkWrapperTemplate(wrapperTemplate, wrapper[index]);
		        });
		        wrappersTemplates.reverse(); // wrapper 0 is wrapped in wrapper 1 and so on...
		        var totalWrapper = wrappersTemplates.shift();
		        wrappersTemplates.forEach(function (wrapperTemplate) {
		          totalWrapper = doTransclusion(totalWrapper, wrapperTemplate);
		        });
		        return doTransclusion(totalWrapper, template);
		      });
		    };
		  }
	
		  function doTransclusion(wrapper, template) {
		    var superWrapper = angular.element("<a></a>"); // this allows people not have to have a single root in wrappers
		    superWrapper.append(wrapper);
		    var transcludeEl = superWrapper.find("formly-transclude");
		    if (!transcludeEl.length) {
		      //try it using our custom find function
		      transcludeEl = formlyUtil.findByNodeName(superWrapper, "formly-transclude");
		    }
		    transcludeEl.replaceWith(template);
		    return superWrapper.html();
		  }
	
		  function getWrapperOption(options) {
		    var wrapper = options.wrapper;
		    // explicit null means no wrapper
		    if (wrapper === null) {
		      return [];
		    }
	
		    // nothing specified means use the default wrapper for the type
		    if (!wrapper) {
		      // get all wrappers that specify they apply to this type
		      wrapper = arrayify(formlyConfig.getWrapperByType(options.type));
		    } else {
		      wrapper = arrayify(wrapper).map(formlyConfig.getWrapper);
		    }
	
		    // get all wrappers for that this type specified that it uses.
		    var type = formlyConfig.getType(options.type, true, options);
		    if (type && type.wrapper) {
		      var typeWrappers = arrayify(type.wrapper).map(formlyConfig.getWrapper);
		      wrapper = wrapper.concat(typeWrappers);
		    }
	
		    // add the default wrapper last
		    var defaultWrapper = formlyConfig.getWrapper();
		    if (defaultWrapper) {
		      wrapper.push(defaultWrapper);
		    }
		    return wrapper;
		  }
	
		  function checkApi(options) {
		    formlyApiCheck["throw"](formlyApiCheck.formlyFieldOptions, options, {
		      prefix: "formly-field directive",
		      url: "formly-field-directive-validation-failed"
		    });
		    // validate with the type
		    var type = options.type && formlyConfig.getType(options.type);
		    if (type) {
		      if (type.validateOptions) {
		        type.validateOptions(options);
		      }
		      runApiCheck(type, options);
		    }
		  }
	
		  function checkFieldGroupApi(options) {
		    formlyApiCheck["throw"](formlyApiCheck.fieldGroup, options, {
		      prefix: "formly-field directive",
		      url: "formly-field-directive-validation-failed"
		    });
		  }
	
		  function runApiCheck(_ref, options) {
		    var apiCheck = _ref.apiCheck;
		    var apiCheckInstance = _ref.apiCheckInstance;
		    var apiCheckFunction = _ref.apiCheckFunction;
		    var apiCheckOptions = _ref.apiCheckOptions;
	
		    if (!apiCheck) {
		      return;
		    }
		    var instance = apiCheckInstance || formlyApiCheck;
		    var fn = apiCheckFunction || "warn";
		    var shape = instance.shape(apiCheck);
		    instance[fn](shape, options, apiCheckOptions || {
		      prefix: "formly-field " + name,
		      url: formlyApiCheck.config.output.docsBaseUrl + "formly-field-type-apicheck-failed"
		    });
		  }
		}
		formlyField.$inject = ["$http", "$q", "$compile", "$templateCache", "formlyConfig", "formlyValidationMessages", "formlyApiCheck", "formlyUtil", "formlyUsability", "formlyWarn"];
	
	/***/ },
	/* 11 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		module.exports = formlyFocus;
	
		// @ngInject
		function formlyFocus($timeout, $document) {
		  /* jshint -W052 */
		  return {
		    restrict: "A",
		    link: function formlyFocusLink(scope, element, attrs) {
		      var previousEl = null;
		      var el = element[0];
		      var doc = $document[0];
		      attrs.$observe("formlyFocus", function respondToFocusExpressionChange(value) {
		        if (value === "true") {
		          $timeout(function setElementFocus() {
		            previousEl = doc.activeElement;
		            el.focus();
		          }, ~ ~attrs.focusWait);
		        } else if (value === "false") {
		          if (doc.activeElement === el) {
		            el.blur();
		            if (attrs.hasOwnProperty("refocus") && previousEl) {
		              previousEl.focus();
		            }
		          }
		        }
		      });
		    }
		  };
		}
		formlyFocus.$inject = ["$timeout", "$document"];
	
	/***/ },
	/* 12 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
		var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
		var _slice = Array.prototype.slice;
	
		var angular = _interopRequire(__webpack_require__(15));
	
		module.exports = formlyForm;
	
		/**
		 * @ngdoc directive
		 * @name formlyForm
		 * @restrict E
		 */
		// @ngInject
		function formlyForm(formlyUsability, $parse, formlyApiCheck, formlyConfig) {
		  var currentFormId = 1;
		  return {
		    restrict: "E",
		    template: function formlyFormGetTemplate(el, attrs) {
		      /* jshint -W033 */ // this because jshint is broken I guess...
		      var rootEl = getRootEl();
		      var fieldRootEl = getFieldRootEl();
		      var formId = "formly_" + currentFormId++;
		      var parentFormAttributes = "";
		      if (attrs.hasOwnProperty("isFieldGroup") && el.parent().parent().hasClass("formly")) {
		        parentFormAttributes = copyAttributes(el.parent().parent()[0].attributes);
		      }
		      return "\n        <" + rootEl + " class=\"formly\"\n                 name=\"" + getFormName() + "\"\n                 role=\"form\" " + parentFormAttributes + ">\n          <" + fieldRootEl + " formly-field\n               ng-repeat=\"field in fields " + getTrackBy() + "\"\n               " + getHideDirective() + "=\"!field.hide\"\n               class=\"formly-field\"\n               options=\"field\"\n               model=\"field.model || model\"\n               fields=\"fields\"\n               form=\"theFormlyForm\"\n               form-id=\"" + getFormName() + "\"\n               form-state=\"options.formState\"\n               index=\"$index\">\n          </" + fieldRootEl + ">\n          <div ng-transclude></div>\n        </" + rootEl + ">\n      ";
	
		      function getRootEl() {
		        return attrs.rootEl || "ng-form";
		      }
	
		      function getFieldRootEl() {
		        return attrs.fieldRootEl || "div";
		      }
	
		      function getHideDirective() {
		        return attrs.hideDirective || formlyConfig.extras.defaultHideDirective || "ng-if";
		      }
	
		      function getTrackBy() {
		        if (!attrs.trackBy) {
		          return "";
		        } else {
		          return "track by " + attrs.trackBy;
		        }
		      }
	
		      function getFormName() {
		        var formName = formId;
		        var bindName = attrs.bindName;
		        if (bindName) {
		          if (angular.version.minor < 3) {
		            throw formlyUsability.getFormlyError("bind-name attribute on formly-form not allowed in > angular 1.3");
		          }
		          // we can do a one-time binding here because we know we're in 1.3.x territory
		          formName = "{{::'formly_' + " + bindName + "}}";
		        }
		        return formName;
		      }
	
		      function copyAttributes(attributes) {
		        var excluded = ["model", "form", "fields", "options", "name", "role", "class"];
		        var arrayAttrs = [];
		        angular.forEach(attributes, function (_ref) {
		          var nodeName = _ref.nodeName;
		          var nodeValue = _ref.nodeValue;
	
		          if (nodeName !== "undefined" && excluded.indexOf(nodeName) === -1) {
		            arrayAttrs.push("" + toKebabCase(nodeName) + "=\"" + nodeValue + "\"");
		          }
		        });
		        return arrayAttrs.join(" ");
		      }
	
		      function toKebabCase(string) {
		        if (string) {
		          return string.replace(/([A-Z])/g, function ($1) {
		            return "-" + $1.toLowerCase();
		          });
		        } else {
		          return "";
		        }
		      }
		    },
		    replace: true,
		    transclude: true,
		    scope: {
		      fields: "=",
		      model: "=",
		      form: "=?",
		      options: "=?"
		    },
		    controller: /* @ngInject */["$scope", "formlyUtil", function FormlyFormController($scope, formlyUtil) {
		      setupOptions();
		      $scope.model = $scope.model || {};
		      $scope.fields = $scope.fields || [];
	
		      angular.forEach($scope.fields, initModel); // initializes the model property if set to 'formState'
		      angular.forEach($scope.fields, attachKey); // attaches a key based on the index if a key isn't specified
		      angular.forEach($scope.fields, setupWatchers); // setup watchers for all fields
	
		      // watch the model and evaluate watch expressions that depend on it.
		      $scope.$watch("model", onModelOrFormStateChange, true);
		      if ($scope.options.formState) {
		        $scope.$watch("options.formState", onModelOrFormStateChange, true);
		      }
	
		      function onModelOrFormStateChange() {
		        angular.forEach($scope.fields, function runFieldExpressionProperties(field, index) {
		          /*jshint -W030 */
		          var model = field.model || $scope.model;
		          field.runExpressions && field.runExpressions(model);
		          if (field.hideExpression) {
		            // can't use hide with expressionProperties reliably
		            var val = model[field.key];
		            // this makes it closer to what a regular expressionProperty would be
		            var extraLocals = {
		              options: field,
		              index: index,
		              formState: $scope.options.formState,
		              formId: $scope.formId
		            };
		            field.hide = formlyUtil.formlyEval($scope, field.hideExpression, val, val, extraLocals);
		          }
		        });
		      }
	
		      function setupOptions() {
		        formlyApiCheck["throw"]([formlyApiCheck.formOptionsApi.optional], [$scope.options], { prefix: "formly-form options check" });
		        $scope.options = $scope.options || {};
		        $scope.options.formState = $scope.options.formState || {};
	
		        angular.extend($scope.options, {
		          updateInitialValue: updateInitialValue,
		          resetModel: resetModel
		        });
		      }
	
		      function updateInitialValue() {
		        angular.forEach($scope.fields, function (field) {
		          if (isFieldGroup(field)) {
		            field.options.updateInitialValue();
		          } else {
		            field.updateInitialValue();
		          }
		        });
		      }
	
		      function resetModel() {
		        angular.forEach($scope.fields, function (field) {
		          if (isFieldGroup(field)) {
		            field.options.resetModel();
		          } else {
		            field.resetModel();
		          }
		        });
		      }
	
		      function initModel(field) {
		        if (field.model && field.model === "formState") {
		          field.model = $scope.options.formState;
		        }
		      }
	
		      function attachKey(field, index) {
		        if (!isFieldGroup(field)) {
		          field.key = field.key || index || 0;
		        }
		      }
	
		      function setupWatchers(field, index) {
		        if (isFieldGroup(field) || !angular.isDefined(field.watcher)) {
		          return;
		        }
		        var watchers = field.watcher;
		        if (!angular.isArray(watchers)) {
		          watchers = [watchers];
		        }
		        angular.forEach(watchers, function setupWatcher(watcher) {
		          if (!angular.isDefined(watcher.listener)) {
		            throw formlyUsability.getFieldError("all-field-watchers-must-have-a-listener", "All field watchers must have a listener", field);
		          }
		          var watchExpression = getWatchExpression(watcher, field, index);
		          var watchListener = getWatchListener(watcher, field, index);
	
		          var type = watcher.type || "$watch";
		          watcher.stopWatching = $scope[type](watchExpression, watchListener, watcher.watchDeep);
		        });
		      }
	
		      function getWatchExpression(watcher, field, index) {
		        var watchExpression = watcher.expression || "model['" + field.key + "']";
		        if (angular.isFunction(watchExpression)) {
		          // wrap the field's watch expression so we can call it with the field as the first arg
		          // and the stop function as the last arg as a helper
		          var originalExpression = watchExpression;
		          watchExpression = function formlyWatchExpression() {
		            var args = modifyArgs.apply(undefined, [watcher, index].concat(_slice.call(arguments)));
		            return originalExpression.apply(undefined, _toConsumableArray(args));
		          };
		          watchExpression.displayName = "Formly Watch Expression for field for " + field.key;
		        }
		        return watchExpression;
		      }
	
		      function getWatchListener(watcher, field, index) {
		        var watchListener = watcher.listener;
		        if (angular.isFunction(watchListener)) {
		          // wrap the field's watch listener so we can call it with the field as the first arg
		          // and the stop function as the last arg as a helper
		          var originalListener = watchListener;
		          watchListener = function formlyWatchListener() {
		            var args = modifyArgs.apply(undefined, [watcher, index].concat(_slice.call(arguments)));
		            return originalListener.apply(undefined, _toConsumableArray(args));
		          };
		          watchListener.displayName = "Formly Watch Listener for field for " + field.key;
		        }
		        return watchListener;
		      }
	
		      function modifyArgs(watcher, index) {
		        for (var _len = arguments.length, originalArgs = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
		          originalArgs[_key - 2] = arguments[_key];
		        }
	
		        return [$scope.fields[index]].concat(originalArgs, [watcher.stopWatching]);
		      }
	
		      function isFieldGroup(field) {
		        return field && !!field.fieldGroup;
		      }
		    }],
		    link: function link(scope, el, attrs) {
		      var formId = attrs.name;
		      scope.formId = formId;
		      scope.theFormlyForm = scope[formId];
		      if (attrs.form) {
		        $parse(attrs.form).assign(scope.$parent, scope[formId]);
		      }
	
		      // chrome autocomplete lameness
		      // see https://code.google.com/p/chromium/issues/detail?id=468153#c14
		      // ლ(ಠ益ಠლ)   (╯°□°)╯︵ ┻━┻    (◞‸◟；)
		      var global = formlyConfig.extras.removeChromeAutoComplete === true;
		      var offInstance = scope.options && scope.options.removeChromeAutoComplete === false;
		      var onInstance = scope.options && scope.options.removeChromeAutoComplete === true;
		      if (global && !offInstance || onInstance) {
		        var input = document.createElement("input");
		        input.setAttribute("autocomplete", "address-level4");
		        input.setAttribute("hidden", true);
		        el[0].appendChild(input);
		      }
		    }
		  };
		}
		formlyForm.$inject = ["formlyUsability", "$parse", "formlyApiCheck", "formlyConfig"];
	
	/***/ },
	/* 13 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
		var angular = _interopRequire(__webpack_require__(15));
	
		module.exports = addFormlyNgModelAttrsManipulator;
	
		// @ngInject
		function addFormlyNgModelAttrsManipulator(formlyConfig) {
		  if (formlyConfig.extras.disableNgModelAttrsManipulator) {
		    return;
		  }
		  formlyConfig.templateManipulators.preWrapper.push(ngModelAttrsManipulator);
	
		  function ngModelAttrsManipulator(template, options, scope) {
		    /* jshint maxcomplexity:6 */
		    var el = document.createElement("div");
		    var data = options.data;
		    if (data.skipNgModelAttrsManipulator === true) {
		      return template;
		    }
		    el.innerHTML = template;
		    var modelNodes = el.querySelectorAll("[ng-model], [data-ng-model]");
		    if (!modelNodes || !modelNodes.length) {
		      return template;
		    }
	
		    addIfNotPresent(modelNodes, "id", scope.id);
		    addIfNotPresent(modelNodes, "name", scope.id);
	
		    addValidation();
		    addModelOptions();
		    addTemplateOptionsAttrs();
	
		    return el.innerHTML;
	
		    function addValidation() {
		      if (angular.isDefined(options.validators) || angular.isDefined(options.validation.messages)) {
		        addIfNotPresent(modelNodes, "formly-custom-validation", "");
		      }
		    }
	
		    function addModelOptions() {
		      if (angular.isDefined(options.modelOptions)) {
		        addIfNotPresent(modelNodes, "ng-model-options", "options.modelOptions");
		        if (options.modelOptions.getterSetter) {
		          angular.forEach(modelNodes, function (node) {
		            node.setAttribute("ng-model", "options.value");
		          });
		        }
		      }
		    }
	
		    function addTemplateOptionsAttrs() {
		      if (!options.templateOptions && !options.expressionProperties) {
		        // no need to run these if there are no templateOptions or expressionProperties
		        return;
		      }
		      var to = options.templateOptions || {};
		      var ep = options.expressionProperties || {};
	
		      var ngModelAttributes = getBuiltInAttributes();
	
		      // extend with the user's specifications winning
		      angular.extend(ngModelAttributes, options.ngModelAttrs);
	
		      // Feel free to make this more simple :-)
		      angular.forEach(ngModelAttributes, function (val, name) {
		        /* jshint maxcomplexity:14 */
		        var attrVal = undefined;
		        var attrName = undefined;
		        var ref = "options.templateOptions['" + name + "']";
		        var toVal = to[name];
		        var epVal = getEpValue(ep, name);
	
		        var inTo = angular.isDefined(toVal);
		        var inEp = angular.isDefined(epVal);
		        if (val.value) {
		          // I realize this looks backwards, but it's right, trust me...
		          attrName = val.value;
		          attrVal = name;
		        } else if (val.expression && inTo) {
		          attrName = val.expression;
		          if (angular.isString(to[name])) {
		            attrVal = "$eval(" + ref + ")";
		          } else if (angular.isFunction(to[name])) {
		            attrVal = "" + ref + "(model[options.key], options, this, $event)";
		          } else {
		            throw new Error("options.templateOptions." + name + " must be a string or function: " + JSON.stringify(options));
		          }
		        } else if (val.bound && inEp) {
		          attrName = val.bound;
		          attrVal = ref;
		        } else if ((val.attribute || val.boolean) && inEp) {
		          attrName = val.attribute || val.boolean;
		          attrVal = "{{" + ref + "}}";
		        } else if (val.attribute && inTo) {
		          attrName = val.attribute;
		          attrVal = toVal;
		        } else if (val.boolean) {
		          if (inTo && !inEp && toVal) {
		            attrName = val.boolean;
		            attrVal = true;
		          } else {}
		        } else if (val.bound && inTo) {
		          attrName = val.bound;
		          attrVal = ref;
		        }
	
		        if (angular.isDefined(attrName) && angular.isDefined(attrVal)) {
		          addIfNotPresent(modelNodes, attrName, attrVal);
		        }
		      });
		    }
		  }
	
		  // Utility functions
		  function getBuiltInAttributes() {
		    var ngModelAttributes = {
		      focus: {
		        attribute: "formly-focus"
		      }
		    };
		    var boundOnly = [];
		    var bothBooleanAndBound = ["required", "disabled"];
		    var bothAttributeAndBound = ["pattern", "minlength"];
		    var expressionOnly = ["change", "keydown", "keyup", "keypress", "click", "focus", "blur"];
		    var attributeOnly = ["placeholder", "min", "max", "tabindex", "type"];
		    if (formlyConfig.extras.ngModelAttrsManipulatorPreferUnbound) {
		      bothAttributeAndBound.push("maxlength");
		    } else {
		      boundOnly.push("maxlength");
		    }
	
		    angular.forEach(boundOnly, function (item) {
		      ngModelAttributes[item] = { bound: "ng-" + item };
		    });
	
		    angular.forEach(bothBooleanAndBound, function (item) {
		      ngModelAttributes[item] = { boolean: item, bound: "ng-" + item };
		    });
	
		    angular.forEach(bothAttributeAndBound, function (item) {
		      ngModelAttributes[item] = { attribute: item, bound: "ng-" + item };
		    });
	
		    angular.forEach(expressionOnly, function (item) {
		      var propName = "on" + item.substr(0, 1).toUpperCase() + item.substr(1);
		      ngModelAttributes[propName] = { expression: "ng-" + item };
		    });
	
		    angular.forEach(attributeOnly, function (item) {
		      ngModelAttributes[item] = { attribute: item };
		    });
		    return ngModelAttributes;
		  }
	
		  function getEpValue(ep, name) {
		    return ep["templateOptions." + name] || ep["templateOptions['" + name + "']"] || ep["templateOptions[\"" + name + "\"]"];
		  }
	
		  function addIfNotPresent(nodes, attr, val) {
		    angular.forEach(nodes, function (node) {
		      if (!node.getAttribute(attr)) {
		        node.setAttribute(attr, val);
		      }
		    });
		  }
		}
		addFormlyNgModelAttrsManipulator.$inject = ["formlyConfig"];
	
		// jshint -W035
		// empty to illustrate that a boolean will not be added via val.bound
		// if you want it added via val.bound, then put it in expressionProperties
	
	/***/ },
	/* 14 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		module.exports = addCustomTags;
	
		// @ngInject
		function addCustomTags($document) {
		  if ($document && $document.get) {
		    (function () {
		      //IE8 check ->
		      // http://stackoverflow.com/questions/10964966/detect-ie-version-prior-to-v9-in-javascript/10965203#10965203
		      var document = $document.get(0);
		      var div = document.createElement("div");
		      div.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->";
		      var isIeLessThan9 = div.getElementsByTagName("i").length === 1;
	
		      if (isIeLessThan9) {
		        //add the custom elements that we need for formly
		        var customElements = ["formly-field", "formly-form", "formly-custom-validation", "formly-focus", "formly-transpose"];
		        angular.forEach(customElements, function (el) {
		          document.createElement(el);
		        });
		      }
		    })();
		  }
		}
		addCustomTags.$inject = ["$document"];
	
	/***/ },
	/* 15 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
		// some versions of angular don't export the angular module properly,
		// so we get it from window in this case.
	
		var angular = _interopRequire(__webpack_require__(17));
	
		if (!angular.version) {
		  angular = window.angular;
		}
		module.exports = angular;
	
	/***/ },
	/* 16 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __WEBPACK_EXTERNAL_MODULE_16__;
	
	/***/ },
	/* 17 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __WEBPACK_EXTERNAL_MODULE_17__;
	
	/***/ },
	/* 18 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
		var angular = _interopRequire(__webpack_require__(15));
	
		module.exports = { formlyEval: formlyEval, getFieldId: getFieldId, reverseDeepMerge: reverseDeepMerge, findByNodeName: findByNodeName, arrayify: arrayify, extendFunction: extendFunction };
	
		function formlyEval(scope, expression, $modelValue, $viewValue, extraLocals) {
		  if (angular.isFunction(expression)) {
		    return expression($viewValue, $modelValue, scope, extraLocals);
		  } else {
		    return scope.$eval(expression, angular.extend({ $viewValue: $viewValue, $modelValue: $modelValue }, extraLocals));
		  }
		}
	
		function getFieldId(formId, options, index) {
		  if (options.id) {
		    return options.id;
		  }
		  var type = options.type;
		  if (!type && options.template) {
		    type = "template";
		  } else if (!type && options.templateUrl) {
		    type = "templateUrl";
		  }
	
		  return [formId, type, options.key, index].join("_");
		}
	
		function reverseDeepMerge(dest) {
		  angular.forEach(arguments, function (src, index) {
		    if (!index) {
		      return;
		    }
		    angular.forEach(src, function (val, prop) {
		      if (!angular.isDefined(dest[prop])) {
		        dest[prop] = angular.copy(val);
		      } else if (objAndSameType(dest[prop], val)) {
		        reverseDeepMerge(dest[prop], val);
		      }
		    });
		  });
		}
	
		function objAndSameType(obj1, obj2) {
		  return angular.isObject(obj1) && angular.isObject(obj2) && Object.getPrototypeOf(obj1) === Object.getPrototypeOf(obj2);
		}
	
		//recurse down a node tree to find a node with matching nodeName, for custom tags jQuery.find doesn't work in IE8
		function findByNodeName(el, nodeName) {
		  if (!el.prop) {
		    // not a jQuery or jqLite object -> wrap it
		    el = angular.element(el);
		  }
	
		  if (el.prop("nodeName") === nodeName.toUpperCase()) {
		    return el;
		  }
	
		  var c = el.children();
		  for (var i = 0; c && i < c.length; i++) {
		    var node = findByNodeName(c[i], nodeName);
		    if (node) {
		      return node;
		    }
		  }
		}
	
		function arrayify(obj) {
		  if (obj && !angular.isArray(obj)) {
		    obj = [obj];
		  } else if (!obj) {
		    obj = [];
		  }
		  return obj;
		}
	
		function extendFunction() {
		  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
		    fns[_key] = arguments[_key];
		  }
	
		  return function extendedFunction() {
		    var args = arguments;
		    fns.forEach(function (fn) {
		      return fn.apply(null, args);
		    });
		  };
		}
	
	/***/ }
	/******/ ])
	});
	;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = angular;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// angular-formly-templates-bootstrap version 4.3.2 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)
	
	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory(__webpack_require__(3), __webpack_require__(2), __webpack_require__(4));
		else if(typeof define === 'function' && define.amd)
			define(["angular-formly", "api-check", "angular"], factory);
		else if(typeof exports === 'object')
			exports["ngFormlyTemplatesBootstrap"] = factory(require("angular-formly"), require("api-check"), require("angular"));
		else
			root["ngFormlyTemplatesBootstrap"] = factory(root["ngFormly"], root["apiCheck"], root["angular"]);
	})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_8__) {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		module.exports = __webpack_require__(11);
	
	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		
		exports['default'] = function (ngModule) {
		  ngModule.config(addCheckboxType);
		
		  function addCheckboxType(formlyConfigProvider, formlyBootstrapApiCheck) {
		    var c = formlyBootstrapApiCheck;
		    formlyConfigProvider.setType({
		      name: 'multiCheckbox',
		      template: __webpack_require__(21),
		      wrapper: ['bootstrapLabel', 'bootstrapHasError'],
		      apiCheck: {
		        templateOptions: c.shape({
		          options: c.arrayOf(c.object),
		          labelProp: c.string.optional,
		          valueProp: c.string.optional
		        })
		      },
		      defaultOptions: {
		        noFormControl: false,
		        ngModelAttrs: {
		          required: {
		            attribute: '',
		            bound: ''
		          }
		        }
		      },
		      apiCheckInstance: c,
		      controller: /* @ngInject */["$scope", function controller($scope) {
		        var to = $scope.to;
		        var opts = $scope.options;
		        $scope.multiCheckbox = {
		          checked: [],
		          change: setModel
		        };
		
		        // initialize the checkboxes check property
		        var modelValue = $scope.model[opts.key];
		        if (angular.isArray(modelValue)) {
		          (function () {
		            var valueProp = to.valueProp || 'value';
		            angular.forEach(to.options, function (v, index) {
		              $scope.multiCheckbox.checked[index] = modelValue.indexOf(v[valueProp]) !== -1;
		            });
		          })();
		        }
		
		        function checkValidity(expressionValue) {
		          var valid = angular.isArray($scope.model[opts.key]) && $scope.model[opts.key].length > 0 && expressionValue;
		
		          $scope.fc.$setValidity('required', valid);
		        }
		
		        function setModel() {
		          $scope.model[opts.key] = [];
		          angular.forEach($scope.multiCheckbox.checked, function (checkbox, index) {
		            if (checkbox) {
		              $scope.model[opts.key].push(to.options[index][to.valueProp || 'value']);
		            }
		          });
		
		          // Must make sure we mark as touched because only the last checkbox due to a bug in angular.
		          $scope.fc.$setTouched();
		          checkValidity(true);
		        }
		
		        if (opts.expressionProperties && opts.expressionProperties.required) {
		          $scope.$watch($scope.options.expressionProperties.required, function (newValue) {
		            checkValidity(newValue);
		          });
		        }
		
		        if ($scope.to.required) {
		          var unwatchFormControl = $scope.$watch('fc', function (newValue) {
		            if (!newValue) {
		              return;
		            }
		            checkValidity(true);
		            unwatchFormControl;
		          });
		        }
		      }]
		    });
		  }
		  addCheckboxType.$inject = ["formlyConfigProvider", "formlyBootstrapApiCheck"];
		};
	
		module.exports = exports['default'];
	
	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __WEBPACK_EXTERNAL_MODULE_2__;
	
	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __WEBPACK_EXTERNAL_MODULE_3__;
	
	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {
	
		// some versions of angular don't export the angular module properly,
		// so we get it from window in this case.
		'use strict';
		
		var angular = __webpack_require__(8);
		if (!angular.version) {
		  angular = window.angular;
		}
		module.exports = angular;
	
	/***/ },
	/* 5 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		
		exports['default'] = function (ngModule) {
		  ngModule.config(addWrappers);
		
		  function addWrappers(formlyConfigProvider, formlyBootstrapApiCheck) {
		    var c = formlyBootstrapApiCheck;
		    formlyConfigProvider.setWrapper([{
		      name: 'bootstrapLabel',
		      template: __webpack_require__(17),
		      apiCheck: {
		        templateOptions: c.shape({
		          label: c.string,
		          required: c.bool.optional
		        })
		      },
		      apiCheckInstance: c
		    }, { name: 'bootstrapHasError', template: __webpack_require__(18) }]);
		  }
		  addWrappers.$inject = ["formlyConfigProvider", "formlyBootstrapApiCheck"];
		};
	
		module.exports = exports['default'];
	
	/***/ },
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		
		exports['default'] = function (ngModule) {
		  __webpack_require__(10)(ngModule);
		  __webpack_require__(1)(ngModule);
		  __webpack_require__(12)(ngModule);
		  __webpack_require__(9)(ngModule);
		  __webpack_require__(13)(ngModule);
		  __webpack_require__(14)(ngModule);
		};
		
		module.exports = exports['default'];
	
	/***/ },
	/* 7 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
		
		var _addons = __webpack_require__(15);
		
		var _addons2 = _interopRequireDefault(_addons);
		
		var _description = __webpack_require__(16);
		
		var _description2 = _interopRequireDefault(_description);
		
		exports['default'] = function (ngModule) {
		  (0, _addons2['default'])(ngModule);
		  (0, _description2['default'])(ngModule);
		};
		
		module.exports = exports['default'];
	
	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __WEBPACK_EXTERNAL_MODULE_8__;
	
	/***/ },
	/* 9 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		
		exports['default'] = function (ngModule) {
		  ngModule.config(addRadioType);
		
		  function addRadioType(formlyConfigProvider, formlyBootstrapApiCheck) {
		    var c = formlyBootstrapApiCheck;
		    formlyConfigProvider.setType({
		      name: 'radio',
		      template: __webpack_require__(19),
		      wrapper: ['bootstrapLabel', 'bootstrapHasError'],
		      defaultOptions: {
		        noFormControl: false
		      },
		      apiCheck: {
		        templateOptions: c.shape({
		          options: c.arrayOf(c.object),
		          labelProp: c.string.optional,
		          valueProp: c.string.optional
		        })
		      },
		      apiCheckInstance: c
		    });
		  }
		  addRadioType.$inject = ["formlyConfigProvider", "formlyBootstrapApiCheck"];
		};
	
		module.exports = exports['default'];
	
	/***/ },
	/* 10 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		
		exports['default'] = function (ngModule) {
		  ngModule.config(addCheckboxType);
		
		  function addCheckboxType(formlyConfigProvider, formlyBootstrapApiCheck) {
		    var c = formlyBootstrapApiCheck;
		    formlyConfigProvider.setType({
		      name: 'checkbox',
		      template: __webpack_require__(20),
		      wrapper: ['bootstrapHasError'],
		      apiCheck: {
		        templateOptions: c.shape({
		          label: c.string
		        })
		      },
		      apiCheckInstance: c
		    });
		  }
		  addCheckboxType.$inject = ["formlyConfigProvider", "formlyBootstrapApiCheck"];
		};
	
		module.exports = exports['default'];
	
	/***/ },
	/* 11 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		var ngModuleName = 'formlyBootstrap';
		var angular = __webpack_require__(4);
		var ngModule = angular.module(ngModuleName, [__webpack_require__(2)]);
		ngModule.constant('formlyBootstrapApiCheck', __webpack_require__(3)({
		  output: {
		    prefix: 'angular-formly-bootstrap'
		  }
		}));
		ngModule.constant('formlyBootstrapVersion', ("4.3.2"));
		
		__webpack_require__(5)(ngModule);
		__webpack_require__(6)(ngModule);
		__webpack_require__(7)(ngModule);
		
		exports['default'] = ngModuleName;
		module.exports = exports['default'];
	
	/***/ },
	/* 12 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		
		exports['default'] = function (ngModule) {
		  ngModule.config(addInputType);
		
		  function addInputType(formlyConfigProvider) {
		    formlyConfigProvider.setType({
		      name: 'input',
		      template: '<input class="form-control" ng-model="model[options.key]">',
		      wrapper: ['bootstrapLabel', 'bootstrapHasError']
		    });
		  }
		  addInputType.$inject = ["formlyConfigProvider"];
		};
	
		module.exports = exports['default'];
	
	/***/ },
	/* 13 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		
		function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }
		
		exports['default'] = function (ngModule) {
		  ngModule.config(addSelectType);
		
		  var template = '<select class="form-control" ng-model="model[options.key]"></select>';
		
		  function addSelectType(formlyConfigProvider, formlyBootstrapApiCheck) {
		    var c = formlyBootstrapApiCheck;
		    formlyConfigProvider.setType({
		      name: 'select',
		      template: template,
		      wrapper: ['bootstrapLabel', 'bootstrapHasError'],
		      defaultOptions: function defaultOptions(options) {
		        /* jshint maxlen:195 */
		        var ngOptions = options.templateOptions.ngOptions || 'option[to.valueProp || \'value\'] as option[to.labelProp || \'name\'] group by option[to.groupProp || \'group\'] for option in to.options';
		        return {
		          ngModelAttrs: _defineProperty({}, ngOptions, {
		            value: 'ng-options'
		          })
		        };
		      },
		      apiCheck: {
		        templateOptions: c.shape({
		          options: c.arrayOf(c.object),
		          labelProp: c.string.optional,
		          valueProp: c.string.optional,
		          groupProp: c.string.optional
		        })
		      },
		      apiCheckInstance: c
		    });
		  }
		  addSelectType.$inject = ["formlyConfigProvider", "formlyBootstrapApiCheck"];
		};
	
		module.exports = exports['default'];
	
	/***/ },
	/* 14 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		
		exports['default'] = function (ngModule) {
		  ngModule.config(addTextareaType);
		
		  function addTextareaType(formlyConfigProvider, formlyBootstrapApiCheck) {
		    var c = formlyBootstrapApiCheck;
		    formlyConfigProvider.setType({
		      name: 'textarea',
		      template: '<textarea class="form-control" ng-model="model[options.key]"></textarea>',
		      wrapper: ['bootstrapLabel', 'bootstrapHasError'],
		      defaultOptions: {
		        ngModelAttrs: {
		          rows: { attribute: 'rows' },
		          cols: { attribute: 'cols' }
		        }
		      },
		      apiCheck: {
		        templateOptions: c.shape({
		          rows: c.number.optional,
		          cols: c.number.optional
		        })
		      },
		      apiCheckInstance: c
		    });
		  }
		  addTextareaType.$inject = ["formlyConfigProvider", "formlyBootstrapApiCheck"];
		};
	
		module.exports = exports['default'];
	
	/***/ },
	/* 15 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		
		exports['default'] = function (ngModule) {
		  ngModule.run(addAddonsManipulator);
		
		  function addAddonsManipulator(formlyConfig, formlyBootstrapApiCheck) {
		    var addonTemplate = __webpack_require__(22);
		    var addonChecker = formlyBootstrapApiCheck.shape({
		      'class': formlyBootstrapApiCheck.string.optional,
		      text: formlyBootstrapApiCheck.string.optional,
		      onClick: formlyBootstrapApiCheck.func.optional
		    }).strict.optional;
		    var api = formlyBootstrapApiCheck.shape({
		      templateOptions: formlyBootstrapApiCheck.shape({
		        addonLeft: addonChecker,
		        addonRight: addonChecker
		      })
		    });
		    formlyConfig.templateManipulators.preWrapper.push(function (template, options) {
		      if (!options.templateOptions.addonLeft && !options.templateOptions.addonRight) {
		        return template;
		      }
		      formlyBootstrapApiCheck.warn([api], [options]);
		      return addonTemplate.replace('<formly-transclude></formly-transclude>', template);
		    });
		  }
		  addAddonsManipulator.$inject = ["formlyConfig", "formlyBootstrapApiCheck"];
		};
	
		module.exports = exports['default'];
	
	/***/ },
	/* 16 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		
		exports['default'] = function (ngModule) {
		  ngModule.run(addDescriptionManipulator);
		
		  function addDescriptionManipulator(formlyConfig) {
		    formlyConfig.templateManipulators.preWrapper.push(function ariaDescribedBy(template, options, scope) {
		      if (angular.isDefined(options.templateOptions.description)) {
		        var el = document.createElement('div');
		        el.appendChild(angular.element(template)[0]);
		        el.appendChild(angular.element('<p id="' + scope.id + '_description"' + 'class="help-block"' + 'ng-if="to.description">' + '{{to.description}}' + '</p>')[0]);
		        var modelEls = angular.element(el.querySelectorAll('[ng-model]'));
		        if (modelEls) {
		          modelEls.attr('aria-describedby', scope.id + '_description');
		        }
		        return el.innerHTML;
		      } else {
		        return template;
		      }
		    });
		  }
		  addDescriptionManipulator.$inject = ["formlyConfig"];
		};
	
		module.exports = exports['default'];
	
	/***/ },
	/* 17 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = "<div>\n  <label for=\"{{id}}\" class=\"control-label\">\n    {{to.label}}\n    {{to.required ? '*' : ''}}\n  </label>\n  <formly-transclude></formly-transclude>\n</div>\n"
	
	/***/ },
	/* 18 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = "<div class=\"form-group\" ng-class=\"{'has-error': showError}\">\n  <formly-transclude></formly-transclude>\n</div>\n"
	
	/***/ },
	/* 19 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = "<div class=\"radio-group\">\n  <div ng-repeat=\"(key, option) in to.options\" class=\"radio\">\n    <label>\n      <input type=\"radio\"\n             id=\"{{id + '_'+ $index}}\"\n             tabindex=\"0\"\n             ng-value=\"option[to.valueProp || 'value']\"\n             ng-model=\"model[options.key]\">\n      {{option[to.labelProp || 'name']}}\n    </label>\n  </div>\n</div>\n"
	
	/***/ },
	/* 20 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = "<div class=\"checkbox\">\n\t<label>\n\t\t<input type=\"checkbox\"\n           class=\"formly-field-checkbox\"\n\t\t       ng-model=\"model[options.key]\">\n\t\t{{to.label}}\n\t\t{{to.required ? '*' : ''}}\n\t</label>\n</div>\n"
	
	/***/ },
	/* 21 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = "<div class=\"radio-group\">\n  <div ng-repeat=\"(key, option) in to.options\" class=\"checkbox\">\n    <label>\n      <input type=\"checkbox\"\n             id=\"{{id + '_'+ $index}}\"\n             ng-model=\"multiCheckbox.checked[$index]\"\n             ng-change=\"multiCheckbox.change()\">\n      {{option[to.labelProp || 'name']}}\n    </label>\n  </div>\n</div>\n"
	
	/***/ },
	/* 22 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = "<div ng-class=\"{'input-group': to.addonLeft || to.addonRight}\">\n    <div class=\"input-group-addon\"\n         ng-if=\"to.addonLeft\"\n         ng-style=\"{cursor: to.addonLeft.onClick ? 'pointer' : 'inherit'}\"\n         ng-click=\"to.addonLeft.onClick(options, this)\">\n        <i class=\"{{to.addonLeft.class}}\" ng-if=\"to.addonLeft.class\"></i>\n        <span ng-if=\"to.addonLeft.text\">{{to.addonLeft.text}}</span>\n    </div>\n    <formly-transclude></formly-transclude>\n    <div class=\"input-group-addon\"\n         ng-if=\"to.addonRight\"\n         ng-style=\"{cursor: to.addonRight.onClick ? 'pointer' : 'inherit'}\"\n         ng-click=\"to.addonRight.onClick(options, this)\">\n        <i class=\"{{to.addonRight.class}}\" ng-if=\"to.addonRight.class\"></i>\n        <span ng-if=\"to.addonRight.text\">{{to.addonRight.text}}</span>\n    </div>\n</div>\n"
	
	/***/ }
	/******/ ])
	});
	;
	//# sourceMappingURL=angular-formly-templates-bootstrap.js.map

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _edaEasyFormViewerMain = __webpack_require__(7);
	
	var _edaEasyFormViewerMain2 = _interopRequireDefault(_edaEasyFormViewerMain);
	
	var _edaEasyFormViewerCore = __webpack_require__(12);
	
	var _edaEasyFormViewerCore2 = _interopRequireDefault(_edaEasyFormViewerCore);
	
	var _edaEasyFormViewerModelTranslator = __webpack_require__(13);
	
	var _edaEasyFormViewerModelTranslator2 = _interopRequireDefault(_edaEasyFormViewerModelTranslator);
	
	var _formlyConfig = __webpack_require__(46);
	
	var _formlyConfig2 = _interopRequireDefault(_formlyConfig);
	
	var _package = __webpack_require__(48);
	
	var _package2 = _interopRequireDefault(_package);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DEP_TO_INJECT_IN_MAIN = [_edaEasyFormViewerMain2.default.name, _edaEasyFormViewerCore2.default.name, _edaEasyFormViewerModelTranslator2.default.name];
	
	var EASY_FORM_VIEWER_VERSION_NAME = 'easyFormViewerVersion';
	var EASY_FORM_VIEWER_VERSION_VALUE = _package2.default.version;
	var MAIN_MODULE_NAME = 'eda.easyFormViewer';
	
	var mainModule = angular.module(MAIN_MODULE_NAME, DEP_TO_INJECT_IN_MAIN).config(_formlyConfig2.default).value(EASY_FORM_VIEWER_VERSION_NAME, EASY_FORM_VIEWER_VERSION_VALUE);
	
	exports.default = mainModule;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _edaEasyFormViewerMain = __webpack_require__(8);
	
	var _edaEasyFormViewerMain2 = _interopRequireDefault(_edaEasyFormViewerMain);
	
	var _edaEasyFormViewerMain3 = __webpack_require__(11);
	
	var _edaEasyFormViewerMain4 = _interopRequireDefault(_edaEasyFormViewerMain3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* global angular */
	var FORM_VIEWER_MAIN_MODULE_NAME = 'edaFormViewerMainModule';
	
	exports.default = angular.module(FORM_VIEWER_MAIN_MODULE_NAME, []).directive(_edaEasyFormViewerMain.EASY_FORM_VIEWER_DIRECTIVE_NAME, _edaEasyFormViewerMain2.default).controller(_edaEasyFormViewerMain3.EASY_FORM_VIEWER_CONTROLLER, _edaEasyFormViewerMain4.default);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.EASY_FORM_VIEWER_DIRECTIVE_NAME = undefined;
	
	var _edaEasyFormViewerMainTemplate = __webpack_require__(9);
	
	var _edaEasyFormViewerMainTemplate2 = _interopRequireDefault(_edaEasyFormViewerMainTemplate);
	
	var _edaEasyFormViewerMainDirective = __webpack_require__(10);
	
	var _edaEasyFormViewerMain = __webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var EASY_FORM_VIEWER_DIRECTIVE_NAME = 'edaEasyFormViewer'; /* global angular */
	
	
	function edaFormViewerDirective($modelsTranslator) {
		var directive = {
			restrict: 'E',
			scope: {
				edaEasyFormViewerDataModel: '=?',
				edaEasyFormViewerEasyFormGeneratorFieldsModel: '=?',
				edaEasyFormViewerSubmitButtonText: '@?',
				edaEasyFormViewerCancelButtonText: '@?',
				edaEasyFormViewerSubmitFormEvent: '&?',
				edaEasyFormViewerCancelFormEvent: '&?',
				edaEasyFormViewerReadOnly: '=?'
			},
			replace: false,
			controller: _edaEasyFormViewerMain.EASY_FORM_VIEWER_CONTROLLER,
			controllerAs: _edaEasyFormViewerMain.EASY_FORM_VIEWER_CONTROLLERAS,
			template: _edaEasyFormViewerMainTemplate2.default,
			link: linkFct
		};
		return directive;
	
		function linkFct(scope) {
			scope.vm.fields = loadFieldsModel();
			scope.vm.submitText = scope.edaEasyFormViewerSubmitButtonText || 'Submit';
			scope.vm.cancelText = scope.edaEasyFormViewerCancelButtonText || 'Cancel';
			scope.vm.readOnly = scope.edaEasyFormViewerReadOnly || false;
	
			scope.$watch(fieldsModelToWatch, fieldsModelWatcher, true);
			scope.$watch(dataModelToWatch, dataModelWatcher, true);
			scope.$watch(submitBtnTextToWatch, submitBtnTextWatcher);
			scope.$watch(cancelBtnTextToWatch, cancelBtnTextWatcher);
			scope.$watch(readOnlyToWatch, readOnlyWatcher);
			scope.$watch(submitEventToWatch, submitEventWatcher);
			scope.$watch(cancelEventToWatch, cancelEventWatcher);
	
			function dataModelToWatch() {
				return scope.edaEasyFormViewerDataModel;
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
	
			function readOnlyToWatch() {
				return scope.edaEasyFormViewerReadOnly;
			}
	
			function submitEventToWatch() {
				return scope.vm.hasJustSumitted;
			}
	
			function cancelEventToWatch() {
				return scope.vm.hasJustCancelled;
			}
	
			function fieldsModelWatcher(newFieldsModel) {
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
	
			function readOnlyWatcher(newReadOnly, oldReadOnly) {
				scope.vm.readOnly = newReadOnly;
			}
	
			function dataModelWatcher(newDataModel) {
				scope.edaEasyFormViewerDataModel = angular.copy(newDataModel);
			}
	
			function submitEventWatcher(newSubmitEvent) {
				if (newSubmitEvent === true) {
					if (angular.isFunction(scope.edaEasyFormViewerSubmitFormEvent)) {
						var _dataModelSubmitted = scope.edaEasyFormViewerDataModel;
						scope.edaEasyFormViewerSubmitFormEvent({ dataModelSubmitted: _dataModelSubmitted });
					}
				}
				scope.vm.hasJustSumitted = false;
			}
	
			function cancelEventWatcher(newCancelEvent) {
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
				var initialFieldsModel = angular.isArray(scope.edaEasyFormViewerEasyFormGeneratorFieldsModel) ? loadExistingConfigurationModel(scope.edaEasyFormViewerEasyFormGeneratorFieldsModel) //translate easy form generator to formly fields model
				: {};
				return initialFieldsModel;
			}
	
			function loadExistingConfigurationModel(loadedFieldModel) {
	
				if (angular.isArray(loadedFieldModel)) {
					var configlines = (0, _edaEasyFormViewerMainDirective.returnAttributeConfigurationLinesIfNotEmpty)(loadedFieldModel);
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
					$modelsTranslator.applyConfigurationToformlyModel(scope.configurationLoaded, formlyFieldsModel, scope.edaEasyFormViewerDataModel);
	
					return formlyFieldsModel;
				}
			}
		}
	}
	
	edaFormViewerDirective.$inject = ['$modelsTranslator'];
	exports.default = edaFormViewerDirective;
	exports.EASY_FORM_VIEWER_DIRECTIVE_NAME = EASY_FORM_VIEWER_DIRECTIVE_NAME;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "<div class=\"easyFormViewer\">\n\t<fieldset ng-disabled=\"vm.readOnly\">\n\t\t<form ng-submit=\"vm.onSubmit()\" name=\"vm.form\">\n\t\t\t<formly-form model=\"edaEasyFormViewerDataModel\" fields=\"vm.fields\" form=\"vm.form\">\n\n\t\t\t\t<div class=\"pull-right\">\n\t\t\t\t\t<button type=\"submit\" class=\"btn btn-primary\" ng-disabled=\"vm.form.$invalid\" ng-click=\"vm.edaSubmitThisDataModel();\">{{vm.submitText}}</button>\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" ng-click=\"vm.edaCancelEvent();\">{{vm.cancelText}}</button>\n\t\t\t\t</div>\n\n\t\t\t</formly-form>\n\t\t</form>\n\t</fieldset>\n</div>\n"

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/* global angular */
	
	var EMPTY_FIELD_MODEL = [{
		'line': 1,
		'activeColumn': 1,
		'columns': [{
			'numColumn': 1,
			'exist': true,
			'control': {
				'type': 'none',
				'key': 'none'
			}
		}]
	}];
	
	/**
		* empty fields model : to display at least an empty line
		* otherwise would look like ugly empty line like it were a bug
		*/
	var emptyEdaFieldsModel = function emptyEdaFieldsModel() {
		return angular.copy(EMPTY_FIELD_MODEL);
	};
	
	var returnAttributeDataModelIfNotEmpty = function returnAttributeDataModelIfNotEmpty(edaEasyFormGeneratorModel) {
		var dataModelToReturn = angular.isArray(edaEasyFormGeneratorModel.dataModel) ? edaEasyFormGeneratorModel.dataModel.length > 0 ? edaEasyFormGeneratorModel.dataModel : [] : [];
		return dataModelToReturn;
	};
	
	var returnAttributeConfigurationLinesIfNotEmpty = function returnAttributeConfigurationLinesIfNotEmpty(loadedFieldModel) {
		var edaEasyFormGeneratorModelToReturn = angular.isArray(loadedFieldModel) ? loadedFieldModel.length > 0 ? loadedFieldModel : emptyEdaFieldsModel() : emptyEdaFieldsModel();
		return edaEasyFormGeneratorModelToReturn;
	};
	
	exports.emptyEdaFieldsModel = emptyEdaFieldsModel;
	exports.returnAttributeDataModelIfNotEmpty = returnAttributeDataModelIfNotEmpty;
	exports.returnAttributeConfigurationLinesIfNotEmpty = returnAttributeConfigurationLinesIfNotEmpty;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EASY_FORM_VIEWER_CONTROLLER = 'edaEasyFormViewerCtrl';
	var EASY_FORM_VIEWER_CONTROLLERAS = 'vm';
	
	var edaEasyFormViewerController = function () {
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
	}();
	
	edaEasyFormViewerController.$inject = [];
	
	exports.default = edaEasyFormViewerController;
	exports.EASY_FORM_VIEWER_CONTROLLER = EASY_FORM_VIEWER_CONTROLLER;
	exports.EASY_FORM_VIEWER_CONTROLLERAS = EASY_FORM_VIEWER_CONTROLLERAS;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var CORE_MODULES = ['textAngular', 'formly', 'ngAnimate', 'formlyBootstrap', 'ui.bootstrap', 'nya.bootstrap.select'];
	
	var FORMVIEWER_CORE_MODULE_NAME = 'edaEasyFormViewerCore.module';
	
	exports.default = angular.module(FORMVIEWER_CORE_MODULE_NAME, CORE_MODULES);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _edaEasyFormViewerModelTranslator = __webpack_require__(14);
	
	var _edaEasyFormViewerModelTranslator2 = _interopRequireDefault(_edaEasyFormViewerModelTranslator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var FORM_VIEWER_MODEL_TRANSLATOR_MODULE_NAME = 'edaFormViewerModelTranslatorModule'; /* global angular */
	exports.default = angular.module(FORM_VIEWER_MODEL_TRANSLATOR_MODULE_NAME, []).service(_edaEasyFormViewerModelTranslator.MODEL_TRANSLATOR_SERVICE, _edaEasyFormViewerModelTranslator2.default);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MODEL_TRANSLATOR_SERVICE = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _edaEasyFormViewerModelTranslatorService = __webpack_require__(15);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MODEL_TRANSLATOR_SERVICE = '$modelsTranslator';
	
	var $modelsTranslator = function () {
	  function $modelsTranslator() {
	    _classCallCheck(this, $modelsTranslator);
	  }
	
	  _createClass($modelsTranslator, [{
	    key: 'initNyaSelect',
	    value: function initNyaSelect(nyaSelectObj) {
	      return (0, _edaEasyFormViewerModelTranslatorService.resetNyaSelect)(nyaSelectObj);
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
	      (0, _edaEasyFormViewerModelTranslatorService.resetNyaSelect)(controls);
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
	        angular.forEach(configurationModel.lines, function (line) {
	          angular.forEach(line.columns, function (column) {
	            var _controlsDefinition = _this.getControlsDefinition();
	            angular.forEach(_controlsDefinition.controls, function (aControl) {
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
	        angular.forEach(configurationModel.lines, function (line) {
	          angular.forEach(line.columns, function (column) {
	            var _controlsDefinition = _this2.getControlsDefinition();
	            angular.forEach(_controlsDefinition.controls, function (aControl) {
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
	        angular.forEach(configurationModel.lines, function (line) {
	          angular.forEach(line.columns, function (column) {
	            var _controlsDefinition = _this3.getControlsDefinition();
	            angular.forEach(_controlsDefinition.controls, function (aControl) {
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
	    key: 'bindConfigurationLines',
	    value: function bindConfigurationLines(configurationModel, lines) {
	      if (angular.isArray(lines)) {
	        var configurationModelResult = (0, _edaEasyFormViewerModelTranslatorService.getEmptyConfigModelResult)();
	        configurationModelResult.lines = [].concat(lines);
	        angular.copy(configurationModelResult, configurationModel);
	        return (0, _edaEasyFormViewerModelTranslatorService.getMessageObject)('configuration model is bound', 'lines are bound to configuration model.');
	      } else {
	        return (0, _edaEasyFormViewerModelTranslatorService.getErrorObject)('lines is not an array', 'Checks lines type, it is not an array.');
	      }
	    }
	  }, {
	    key: 'applyConfigurationToformlyModel',
	    value: function applyConfigurationToformlyModel(configurationModel, formlyModel, formlyDataModel) {
	      (0, _edaEasyFormViewerModelTranslatorService.resetFormlyModel)(formlyModel);
	      (0, _edaEasyFormViewerModelTranslatorService.resetDataModel)(formlyDataModel);
	
	      configurationModel.lines.forEach(function (line, lineIndex) {
	        if (line.columns.length === 1) {
	          (0, _edaEasyFormViewerModelTranslatorService.addOneColumnControl)(formlyModel, configurationModel, lineIndex);
	        }
	        if (line.columns.length === 2) {
	          (0, _edaEasyFormViewerModelTranslatorService.addTwoColumnControl)(formlyModel, configurationModel, lineIndex);
	        }
	        if (line.columns.length === 3) {
	          (0, _edaEasyFormViewerModelTranslatorService.addThreeColumnControl)(formlyModel, configurationModel, lineIndex);
	        }
	      });
	    }
	  }]);
	
	  return $modelsTranslator;
	}();
	
	$modelsTranslator.$inject = [];
	exports.default = $modelsTranslator;
	exports.MODEL_TRANSLATOR_SERVICE = MODEL_TRANSLATOR_SERVICE;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.addThreeColumnControl = exports.addTwoColumnControl = exports.addOneColumnControl = exports.resetFormlyModel = exports.getMessageObject = exports.getErrorObject = exports.resetDataModel = exports.getEmptyConfigModelResult = exports.getConfigurationModelInit = exports.resetNyaSelect = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _controls = __webpack_require__(16);
	
	var _formlyProxyService = __webpack_require__(45);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var resetNyaSelect = function resetNyaSelect(nyaSelectObj) {
	  //reset
	  angular.copy({ controls: [].concat(_toConsumableArray(_controls.configs)) }, nyaSelectObj);
	  return true;
	};
	
	var getConfigurationModelInit = function getConfigurationModelInit() {
	  return _extends({}, _formlyProxyService.configurationModelInit);
	};
	
	var getEmptyConfigModelResult = function getEmptyConfigModelResult() {
	  return _extends({}, _formlyProxyService.configurationModelResult);
	};
	
	var resetDataModel = function resetDataModel(obj) {
	  var emptyDataModel = {};
	  angular.copy(emptyDataModel, obj);
	  return true;
	};
	
	var getErrorObject = function getErrorObject(errorTitle, errorMessage) {
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
	
	var getMessageObject = function getMessageObject(messageTitle, messageBody) {
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
	
	var resetFormlyModel = function resetFormlyModel(formlyModel) {
	  var resetformly = [];
	  angular.copy(resetformly, formlyModel);
	};
	
	exports.resetNyaSelect = resetNyaSelect;
	exports.getConfigurationModelInit = getConfigurationModelInit;
	exports.getEmptyConfigModelResult = getEmptyConfigModelResult;
	exports.resetDataModel = resetDataModel;
	exports.getErrorObject = getErrorObject;
	exports.getMessageObject = getMessageObject;
	exports.resetFormlyModel = resetFormlyModel;
	exports.addOneColumnControl = _formlyProxyService.addOneColumnControl;
	exports.addTwoColumnControl = _formlyProxyService.addTwoColumnControl;
	exports.addThreeColumnControl = _formlyProxyService.addThreeColumnControl;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.controls = exports.configs = undefined;
	
	var _blank = __webpack_require__(17);
	
	var _editBlankControl = __webpack_require__(18);
	
	var _editBlankControl2 = _interopRequireDefault(_editBlankControl);
	
	var _IpAdress = __webpack_require__(19);
	
	var _editIpAdress = __webpack_require__(20);
	
	var _editIpAdress2 = _interopRequireDefault(_editIpAdress);
	
	var _date = __webpack_require__(21);
	
	var _editDate = __webpack_require__(22);
	
	var _editDate2 = _interopRequireDefault(_editDate);
	
	var _checkbox = __webpack_require__(23);
	
	var _editCheckBox = __webpack_require__(24);
	
	var _editCheckBox2 = _interopRequireDefault(_editCheckBox);
	
	var _email = __webpack_require__(25);
	
	var _editEmail = __webpack_require__(26);
	
	var _editEmail2 = _interopRequireDefault(_editEmail);
	
	var _basicSelect = __webpack_require__(27);
	
	var _editBasicSelect = __webpack_require__(28);
	
	var _editBasicSelect2 = _interopRequireDefault(_editBasicSelect);
	
	var _groupedSelect = __webpack_require__(29);
	
	var _editGroupedSelect = __webpack_require__(30);
	
	var _editGroupedSelect2 = _interopRequireDefault(_editGroupedSelect);
	
	var _header = __webpack_require__(31);
	
	var _editHeaderControl = __webpack_require__(32);
	
	var _editHeaderControl2 = _interopRequireDefault(_editHeaderControl);
	
	var _password = __webpack_require__(33);
	
	var _editPassword = __webpack_require__(34);
	
	var _editPassword2 = _interopRequireDefault(_editPassword);
	
	var _radio = __webpack_require__(35);
	
	var _editRadio = __webpack_require__(36);
	
	var _editRadio2 = _interopRequireDefault(_editRadio);
	
	var _richTextEditor = __webpack_require__(37);
	
	var _editRichTextEditor = __webpack_require__(38);
	
	var _editRichTextEditor2 = _interopRequireDefault(_editRichTextEditor);
	
	var _subTitle = __webpack_require__(39);
	
	var _editSubTitle = __webpack_require__(40);
	
	var _editSubTitle2 = _interopRequireDefault(_editSubTitle);
	
	var _textArea = __webpack_require__(41);
	
	var _editTextArea = __webpack_require__(42);
	
	var _editTextArea2 = _interopRequireDefault(_editTextArea);
	
	var _textInput = __webpack_require__(43);
	
	var _editTextInput = __webpack_require__(44);
	
	var _editTextInput2 = _interopRequireDefault(_editTextInput);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// controls configs
	var configs = [_IpAdress.IpAdressConfig, _date.DateConfig, _checkbox.CheckBoxConfig, _email.EmailConfig, _basicSelect.BasicSelectConfig, _blank.BlankConfig, _groupedSelect.GroupedSelectConfig, _header.HeaderConfig, _password.PasswordConfig, _radio.RadioConfig, _richTextEditor.RichTextEditorConfig, _subTitle.SubTitleConfig, _textArea.TextAreaConfig, _textInput.TextInputConfig];
	
	// controls component (for edit control modal)
	var controls = [
	// editBlankControl:
	{
	  name: _editBlankControl.EDIT_BLANK_CONTROL_COMPONENT,
	  component: _editBlankControl.editBlankControlComponent,
	  moduleName: _editBlankControl2.default.name
	},
	// editIpAdress:
	{
	  name: _editIpAdress.EDIT_IP_ADRESS_COMPONENT,
	  component: _editIpAdress.editIpAdressControlComponent,
	  moduleName: _editIpAdress2.default.name
	},
	// editDate:
	{
	  name: _editDate.EDIT_DATE_COMPONENT,
	  component: _editDate.editDateControlComponent,
	  moduleName: _editDate2.default.name
	},
	// editBasicSelect:
	{
	  name: _editBasicSelect.EDIT_BASIC_SELECT_COMPONENT,
	  component: _editBasicSelect.editBasicSelectControlComponent,
	  moduleName: _editBasicSelect2.default.name
	},
	// editGroupedSelect:
	{
	  name: _editGroupedSelect.EDIT_GROUPED_SELECT_COMPONENT,
	  component: _editGroupedSelect.editGroupedSelectControlComponent,
	  moduleName: _editGroupedSelect2.default.name
	},
	// editCheckBox:
	{
	  name: _editCheckBox.EDIT_CHECKBOX_COMPONENT,
	  component: _editCheckBox.editCheckBoxControlComponent,
	  moduleName: _editCheckBox2.default.name
	},
	// editEmail:
	{
	  name: _editEmail.EDIT_EMAIL_COMPONENT,
	  component: _editEmail.editEmailControlComponent,
	  moduleName: _editEmail2.default.name
	},
	// editHeader:
	{
	  name: _editHeaderControl.EDIT_HEADER_CONTROL_COMPONENT,
	  component: _editHeaderControl.editHeaderControlComponent,
	  moduleName: _editHeaderControl2.default.name
	},
	// editPassword:
	{
	  name: _editPassword.EDIT_PASSWORD_CONTROL_COMPONENT,
	  component: _editPassword.editPasswordControlComponent,
	  moduleName: _editPassword2.default.name
	},
	// editRadio:
	{
	  name: _editRadio.EDIT_RADIO_CONTROL_COMPONENT,
	  component: _editRadio.editRadioControlComponent,
	  moduleName: _editRadio2.default.name
	},
	// editRichTextEditor:
	{
	  name: _editRichTextEditor.EDIT_RICH_TEXT_EDITOR_COMPONENT,
	  component: _editRichTextEditor.editRichTextEditorControlComponent,
	  moduleName: _editRichTextEditor2.default.name
	},
	// editSubTitle:
	{
	  name: _editSubTitle.EDIT_SUBTITLE_CONTROL_COMPONENT,
	  component: _editSubTitle.editSubTitleControlComponent,
	  moduleName: _editSubTitle2.default.name
	},
	// editTextArea:
	{
	  name: _editTextArea.EDIT_TEXTAREA_CONTROL_COMPONENT,
	  component: _editTextArea.editTextareaControlComponent,
	  moduleName: _editTextArea2.default.name
	},
	// editTextInput:
	{
	  name: _editTextInput.EDIT_TEXTINPUT_CONTROL_COMPONENT,
	  component: _editTextInput.editTextInputControlComponent,
	  moduleName: _editTextInput2.default.name
	}];
	
	exports.configs = configs;
	exports.controls = controls;

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var BlankConfig = exports.BlankConfig = {
	  id: 'empty',
	  name: 'no control',
	  subtitle: 'no control',
	  group: 'Blank',
	  formlyType: 'blank',
	  formlySubtype: '',
	  formlyLabel: '',
	  formlyRequired: false,
	  formlyDescription: '',
	  formlyOptions: [],
	  formlyExpressionProperties: {},
	  formlyValidators: {},
	  formlyValidation: {}
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _class, _temp;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EDIT_BLANK_CONTROL_COMPONENT = exports.EDIT_BLANK_CONTROL_COMPONENT = 'editBlankControl';
	
	var editBlankControlComponent = exports.editBlankControlComponent = {
	  template: '\n  <div ng-switch-when="empty">\n    <div class="panel panel-default">\n      <div class="panel-body">\n        <div class="row">\n          <div class="col-md-12">\n            <h5 class="greyText">\n              <i class="fa fa-eye"></i>\n              &nbsp;\n              {{\'PREVIEW_TAB\' | translate}} :\n            </h5>\n          </div>\n        </div>\n        <hr/>\n        <div class="row">\n          <div class="col-sm-12">\n            <h5 class="text-center greyText">\n              {{\'COL_WILL_BE_BLANK\' | translate}}\n            </h5>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  ',
	  bindings: {},
	  controller: (_temp = _class = function editBlankControlController() {
	    //
	
	    _classCallCheck(this, editBlankControlController);
	  }, _class.$inject = [], _temp)
	};
	
	var editBlankModuleName = 'stepway.editBlankControl.module';
	exports.default = angular.module(editBlankModuleName, []).component(EDIT_BLANK_CONTROL_COMPONENT, editBlankControlComponent);

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var IpAdressConfig = exports.IpAdressConfig = {
	  id: 'IpAdress',
	  name: 'IpAdress',
	  subtitle: 'IpAdress',
	  group: 'input',
	  formlyType: 'input',
	  formlySubtype: 'ipadress',
	  formlyLabel: '',
	  formlyRequired: false,
	  formlyDescription: '',
	  formlyOptions: [],
	  formlyExpressionProperties: {},
	  formlyValidators: {
	    ipAddressShape: {
	      expression: function expression(viewValue, modelValue) {
	        var value = modelValue || viewValue;
	        return (/(\d{1,3}\.){3}\d{1,3}/.test(value)
	        );
	      },
	      message: '$viewValue + \' is not a valid IP Address\''
	    }
	  },
	  formlyValidation: {
	    messages: {
	      required: function required(viewValue, modelValue, scope) {
	        var defaultReturnMsg = 'this IP Adress field is required';
	        var returnMsg = typeof scope.to.label !== 'undefined' ? scope.to.label !== '' ? scope.to.label + ' is required' : defaultReturnMsg : defaultReturnMsg;
	        if (scope.to.required) return returnMsg;
	      }
	    }
	  }
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _class, _temp;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EDIT_IP_ADRESS_COMPONENT = exports.EDIT_IP_ADRESS_COMPONENT = 'editIpAdressControl';
	
	var editIpAdressControlComponent = exports.editIpAdressControlComponent = {
	  template: '\n    <div class="panel panel-default">\n    <div class="panel-body">\n      <div class="row">\n        <div class="col-md-12">\n          <h5 class="greyText">\n            <i class="fa fa-eye"></i>\n            &nbsp;\n            {{\'PREVIEW_TAB\' | translate}} :\n          </h5>\n        </div>\n      </div>\n      <hr/>\n      <div class="row">\n        <div class="col-md-12">\n          <div class="form-group">\n            <label\n              for="inputIpAdress"\n              class="control-label textControlLabel">\n              {{$ctrl.nyaSelect.temporyConfig.formlyLabel}}\n              <span\n                ng-if="$ctrl.nyaSelect.temporyConfig.formlyRequired"\n                class="textControlLabel">\n                *\n              </span>\n            </label>\n            <div class="">\n              <input\n                type="text"\n                class="form-control"\n                id="inputIpAdress"\n                placeholder="{{$ctrl.nyaSelect.temporyConfig.formlyPlaceholder}}">\n              <p class="help-block">\n                {{$ctrl.nyaSelect.temporyConfig.formlyDescription}}\n              </p>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class="panel panel-default">\n    <div class="panel-body">\n      <div class="row">\n        <div class="col-md-12">\n          <h5 class="greyText">\n            <i class="fa fa-pencil-square-o"></i>\n            &nbsp;\n            {{\'EDIT_PROPERTIES\' | translate}} :\n          </h5>\n        </div>\n      </div>\n      <hr/>\n      <div class="row">\n        <div class="form-group">\n          <label\n            for="inputTextLabelUpdate"\n            class="col-lg-3 control-label greyText editPropertiesLabel">\n            {{\'LABEL_TEXT\' | translate}} :\n          </label>\n          <div class="col-lg-9">\n            <input\n              type="text"\n              class="form-control"\n              ng-model="$ctrl.nyaSelect.temporyConfig.formlyLabel"\n              id="inputTextLabelUpdate"\n              placeholder="{{\'ADD_EDIT_LABEL_HERE\' | translate}}">\n          </div>\n        </div>\n      </div>\n      <div class="marginTopFivepixels"></div>\n      <div class="row">\n        <div class="form-group">\n          <label\n            for="inputTextplaceholderUpdate"\n            class="col-lg-3 control-label greyText editPropertiesLabel">\n            {{\'PLACEHOLDER\' | translate}} :\n          </label>\n          <div class="col-lg-9">\n            <input\n              type="text"\n              class="form-control"\n              ng-model="$ctrl.nyaSelect.temporyConfig.formlyPlaceholder"\n              id="inputTextplaceholderUpdate"\n              placeholder="{{\'ADD_EDIT_PLACEHOLD\' | translate}}">\n          </div>\n        </div>\n      </div>\n      <div class="marginTopFivepixels"></div>\n      <div class="row">\n        <div class="form-group">\n          <label\n            for="inputTextRequiredUpdate"\n            class="col-lg-3 control-label greyText editPropertiesLabel">\n            {{\'REQUIRED\' | translate}} :\n          </label>\n          <div class="col-lg-9">\n            <div class="checkboxCssCorrection">\n              &nbsp;\n            </div>\n            <input\n              type="checkbox"\n              ng-model="$ctrl.nyaSelect.temporyConfig.formlyRequired"\n              id="inputTextRequiredUpdate">\n          </div>\n        </div>\n      </div>\n      <div class="marginTopFivepixels"></div>\n      <div class="row">\n        <div class="form-group">\n          <label\n            for="inputTextDescriptionUpdate"\n            class="col-lg-3 control-label greyText editPropertiesLabel">\n            {{\'DESCRIPTION\' | translate}} :\n          </label>\n          <div class="col-lg-9">\n            <input\n              type="text"\n              class="form-control"\n              ng-model="$ctrl.nyaSelect.temporyConfig.formlyDescription"\n              id="inputTextDescriptionUpdate"\n              placeholder="{{\'ADDEDIT_DESCRIPTION\' | translate}}">\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  ',
	  bindings: {
	    nyaSelect: '='
	  },
	  controller: (_temp = _class = function editIpAdressControlController() {
	    _classCallCheck(this, editIpAdressControlController);
	  }, _class.$inject = [], _temp)
	};
	
	var editIpAdressModuleName = 'stepway.editIpAdress.module';
	
	exports.default = angular.module(editIpAdressModuleName, []).component(EDIT_IP_ADRESS_COMPONENT, editIpAdressControlComponent);

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var DateConfig = exports.DateConfig = {
	  id: 'Date',
	  name: 'Date',
	  subtitle: 'Date',
	  group: 'input',
	  formlyType: 'datepicker',
	  formlySubtype: '',
	  formlyLabel: '',
	  formlyRequired: false,
	  formlyDescription: '',
	  formlyOptions: [],
	  datepickerOptions: { format: 'dd-MMMM-yyyy' },
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
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _class, _temp;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EDIT_DATE_COMPONENT = exports.EDIT_DATE_COMPONENT = 'editDateControl';
	
	var editDateControlComponent = exports.editDateControlComponent = {
	  template: '\n    <div class="panel panel-default">\n      <div class="panel-body">\n        <div class="row">\n          <div class="col-md-12">\n            <h5 class="greyText">\n              <i class="fa fa-eye"></i>\n              &nbsp;\n              {{\'PREVIEW_TAB\' | translate}} :\n            </h5>\n          </div>\n        </div>\n        <hr/>\n        <div class="row">\n          <div class="col-md-12">\n            <div class="form-group">\n              <label\n                for="inputDate"\n                class="control-label textControlLabel">\n                {{$ctrl.nyaSelect.temporyConfig.formlyLabel}}\n                <span\n                  ng-if="$ctrl.nyaSelect.temporyConfig.formlyRequired"\n                  class="textControlLabel">\n                  *\n                </span>\n              </label>\n              <div class="">\n                <div class="input-group" >\n                  <span class="input-group-addon">\n                    <i class="glyphicon glyphicon-calendar"></i>\n                  </span>\n                  <input\n                    type="text"\n                    class="form-control"\n                    uib-datepicker-popup="{{$ctrl.nyaSelect.temporyConfig.datepickerOptions.format}}"\n                    ng-model="$ctrl.demodt.dt"\n                    is-open="$ctrl.demodt.opened"\n                    datepicker-options="$ctrl.dateOptions"\n                    close-text="Close"\n                    ng-click="$ctrl.open({event : $event})"\n                  />\n                </div>\n                <p class="help-block">\n                  {{$ctrl.nyaSelect.temporyConfig.formlyDescription}}\n                </p>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class="panel panel-default">\n      <div class="panel-body">\n        <div class="row">\n          <div class="col-md-12">\n            <h5 class="greyText">\n              <i class="fa fa-pencil-square-o"></i>\n              &nbsp;\n              {{\'EDIT_PROPERTIES\' | translate}} :\n            </h5>\n          </div>\n        </div>\n        <hr/>\n        <div class="row">\n          <div class="form-group">\n          <label class="col-lg-3 control-label greyText editPropertiesLabel">\n            {{\'DATE_FORMAT\' | translate}} :\n          </label>\n          <div class="col-lg-9">\n            <ol\n              class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12"\n              ng-model="$ctrl.nyaSelect.temporyConfig.datepickerOptions.format"\n              id="dateformatSelect">\n              <li\n                class="nya-bs-option"\n                nya-bs-option="dateformat in $ctrl.demodt.formats"\n                value="dateformat">\n                <a>\n                  {{dateformat}}\n                </a>\n              </li>\n            </ol>\n          </div>\n        </div>\n      </div>\n      <div class="marginTopFivepixels"></div>\n      <div class="row">\n        <div class="form-group">\n          <label\n            for="inputTextLabelUpdate"\n            class="col-lg-3 control-label greyText editPropertiesLabel">\n            {{\'LABEL_TEXT\' | translate}} :\n          </label>\n          <div class="col-lg-9">\n            <input\n              type="text"\n              class="form-control"\n              ng-model="$ctrl.nyaSelect.temporyConfig.formlyLabel"\n              id="inputTextLabelUpdate"\n              placeholder="{{\'ADD_EDIT_LABEL_HERE\' | translate}}">\n          </div>\n        </div>\n      </div>\n      <div class="marginTopFivepixels"></div>\n        <div class="row">\n          <div class="form-group">\n            <label\n              for="inputTextRequiredUpdate"\n              class="col-lg-3 control-label greyText editPropertiesLabel">\n              {{\'REQUIRED\' | translate}} :\n            </label>\n            <div class="col-lg-9">\n              <div class="checkboxCssCorrection">\n                &nbsp;\n              </div>\n              <input\n                type="checkbox"\n                ng-model="$ctrl.nyaSelect.temporyConfig.formlyRequired"\n                id="inputTextRequiredUpdate">\n            </div>\n          </div>\n        </div>\n        <div class="marginTopFivepixels"></div>\n        <div class="row">\n          <div class="form-group">\n            <label\n              for="inputTextDescriptionUpdate"\n              class="col-lg-3 control-label greyText editPropertiesLabel">\n              {{\'DESCRIPTION\' | translate}} :\n            </label>\n            <div class="col-lg-9">\n              <input\n                type="text"\n                class="form-control"\n                ng-model="$ctrl.nyaSelect.temporyConfig.formlyDescription"\n                id="inputTextDescriptionUpdate"\n                placeholder="{{\'ADDEDIT_DESCRIPTION\' | translate}}">\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ',
	  bindings: {
	    nyaSelect: '=',
	    demodt: '=',
	    dateOptions: '=',
	    open: '&'
	  },
	  controller: (_temp = _class = function editDateControlController() {
	    _classCallCheck(this, editDateControlController);
	  }, _class.$inject = [], _temp)
	};
	
	var editDateControlModuleName = 'stepway.editDateControl.module';
	
	exports.default = angular.module(editDateControlModuleName, []).component(EDIT_DATE_COMPONENT, editDateControlComponent);

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var CheckBoxConfig = exports.CheckBoxConfig = {
	  id: 'Checkbox',
	  name: 'Checkbox',
	  subtitle: 'Checkbox',
	  group: 'Checkbox',
	  formlyType: 'checkbox',
	  formlySubtype: '',
	  formlyLabel: '',
	  formlyRequired: false,
	  formlyDescription: '',
	  formlyOptions: [],
	  formlyExpressionProperties: {},
	  formlyValidators: {},
	  formlyValidation: {
	    messages: {
	      required: function required(viewValue, modelValue, scope) {
	        var defaultReturnMsg = 'this Checkbox field is required';
	        var returnMsg = typeof scope.to.label !== 'undefined' ? scope.to.label !== '' ? scope.to.label + ' is required' : defaultReturnMsg : defaultReturnMsg;
	        return returnMsg;
	      }
	    }
	  }
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _class, _temp;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EDIT_CHECKBOX_COMPONENT = exports.EDIT_CHECKBOX_COMPONENT = 'editCheckBoxControl';
	
	var editCheckBoxControlComponent = exports.editCheckBoxControlComponent = {
	  template: '\n    <div class="panel panel-default">\n      <div class="panel-body">\n        <div class="row">\n          <div class="col-md-12">\n            <h5 class="greyText">\n              <i class="fa fa-eye"></i>\n              &nbsp;\n              {{\'PREVIEW_TAB\' | translate}} :\n            </h5>\n          </div>\n        </div>\n        <hr/>\n        <div class="row">\n          <div class="col-md-12">\n            <div class="form-group">\n              <div class="col-md-12">\n                <div class="checkbox">\n                  <label>\n                    <input\n                      type="checkbox"\n                      id="checkBox">\n                    <span class="blackText">\n                      {{$ctrl.nyaSelect.temporyConfig.formlyLabel}}\n                    </span>\n                    <span\n                      ng-if="$ctrl.nyaSelect.temporyConfig.formlyRequired"\n                      class="textControlLabel">\n                      *\n                    </span>\n                  </label>\n                </div>\n                <p class="help-block">\n                  {{$ctrl.nyaSelect.temporyConfig.formlyDescription}}\n                </p>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class="panel panel-default">\n      <div class="panel-body">\n        <div class="row">\n          <div class="col-md-12">\n            <h5 class="greyText">\n              <i class="fa fa-pencil-square-o"></i>\n              &nbsp;\n              {{\'EDIT_PROPERTIES\' | translate}} :\n            </h5>\n          </div>\n        </div>\n        <hr/>\n        <div class="row">\n          <div class="form-group">\n            <label\n              for="inputTextLabelUpdate"\n              class="col-lg-3 control-label greyText editPropertiesLabel">\n              {{\'LABEL_TEXT\' | translate}} :\n            </label>\n            <div class="col-lg-9">\n              <input\n                type="text"\n                class="form-control"\n                ng-model="$ctrl.nyaSelect.temporyConfig.formlyLabel"\n                id="inputTextLabelUpdate"\n                placeholder="{{\'ADD_EDIT_LABEL_HERE\' | translate}}">\n            </div>\n          </div>\n        </div>\n        <div class="marginTopFivepixels"></div>\n        <div class="row">\n          <div class="form-group">\n            <label\n              for="inputTextRequiredUpdate"\n              class="col-lg-3 control-label greyText editPropertiesLabel">\n              {{\'REQUIRED\' | translate}} :\n            </label>\n            <div class="col-lg-9">\n              <div class="checkboxCssCorrection">&nbsp;</div>\n              <input\n                type="checkbox"\n                ng-model="$ctrl.nyaSelect.temporyConfig.formlyRequired"\n                id="inputTextRequiredUpdate">\n            </div>\n          </div>\n        </div>\n        <div class="marginTopFivepixels"></div>\n        <div class="row">\n          <div class="form-group">\n            <label\n              for="inputTextDescriptionUpdate"\n              class="col-lg-3 control-label greyText editPropertiesLabel">\n              {{\'DESCRIPTION\' | translate}} :\n            </label>\n            <div class="col-lg-9">\n              <input\n                type="text"\n                class="form-control"\n                ng-model="$ctrl.nyaSelect.temporyConfig.formlyDescription"\n                id="inputTextDescriptionUpdate"\n                placeholder="{{\'ADDEDIT_DESCRIPTION\' | translate}}">\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ',
	  bindings: {
	    nyaSelect: '='
	  },
	  controller: (_temp = _class = function editCheckBoxControlController() {
	    _classCallCheck(this, editCheckBoxControlController);
	  }, _class.$inject = [], _temp)
	};
	
	var editCheckBoxModuleName = 'stepway.editCheckBox.module';
	
	exports.default = angular.module(editCheckBoxModuleName, []).component(EDIT_CHECKBOX_COMPONENT, editCheckBoxControlComponent);

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var EmailConfig = exports.EmailConfig = {
	  id: 'Email',
	  name: 'Email',
	  subtitle: 'Email',
	  group: 'input',
	  formlyType: 'input',
	  formlySubtype: 'email',
	  formlyLabel: '',
	  formlyRequired: false,
	  formlyDescription: '',
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
	        var defaultReturnMsg = 'this Email field is required';
	        var returnMsg = typeof scope.to.label !== 'undefined' ? scope.to.label !== '' ? scope.to.label + ' is required' : defaultReturnMsg : defaultReturnMsg;
	        if (scope.to.required) return returnMsg;
	      }
	    }
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _class, _temp;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EDIT_EMAIL_COMPONENT = exports.EDIT_EMAIL_COMPONENT = 'editEmailControl';
	
	var editEmailControlComponent = exports.editEmailControlComponent = {
	  template: '\n    <div class="panel panel-default">\n    <div class="panel-body">\n      <div class="row">\n        <div class="col-md-12">\n          <h5 class="greyText">\n            <i class="fa fa-eye"></i>\n            &nbsp;\n            {{\'PREVIEW_TAB\' | translate}} :\n          </h5>\n        </div>\n      </div>\n      <hr/>\n      <div class="row">\n        <div class="col-md-12">\n          <div class="form-group">\n            <label\n              for="inputEmail"\n              class="control-label textControlLabel">\n              {{$ctrl.nyaSelect.temporyConfig.formlyLabel}}\n              <span\n                ng-if="$ctrl.nyaSelect.temporyConfig.formlyRequired"\n                class="textControlLabel">\n                *\n              </span>\n            </label>\n            <div class="">\n              <input\n                type="text"\n                class="form-control"\n                id="inputEmail"\n                placeholder="{{$ctrl.nyaSelect.temporyConfig.formlyPlaceholder}}">\n              <p class="help-block">\n                {{$ctrl.nyaSelect.temporyConfig.formlyDescription}}\n              </p>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class="panel panel-default">\n    <div class="panel-body">\n      <div class="row">\n        <div class="col-md-12">\n          <h5 class="greyText">\n            <i class="fa fa-pencil-square-o"></i>\n            &nbsp;\n            {{\'EDIT_PROPERTIES\' | translate}} :\n          </h5>\n        </div>\n      </div>\n      <hr/>\n      <div class="row">\n        <div class="form-group">\n          <label\n            for="inputTextLabelUpdate"\n            class="col-lg-3 control-label greyText editPropertiesLabel">\n            {{\'LABEL_TEXT\' | translate}} :\n          </label>\n          <div class="col-lg-9">\n            <input\n              type="text"\n              class="form-control"\n              ng-model="$ctrl.nyaSelect.temporyConfig.formlyLabel"\n              id="inputTextLabelUpdate"\n              placeholder="{{\'ADD_EDIT_LABEL_HERE\' | translate}}">\n          </div>\n        </div>\n      </div>\n      <div class="marginTopFivepixels"></div>\n      <div class="row">\n        <div class="form-group">\n          <label\n            for="inputTextplaceholderUpdate"\n            class="col-lg-3 control-label greyText editPropertiesLabel">\n            {{\'PLACEHOLDER\' | translate}} :\n          </label>\n          <div class="col-lg-9">\n            <input\n              type="text"\n              class="form-control"\n              ng-model="$ctrl.nyaSelect.temporyConfig.formlyPlaceholder"\n              id="inputTextplaceholderUpdate"\n              placeholder="{{\'ADD_EDIT_PLACEHOLD\' | translate}}">\n          </div>\n        </div>\n      </div>\n      <div class="marginTopFivepixels"></div>\n      <div class="row">\n        <div class="form-group">\n          <label\n            for="inputTextRequiredUpdate"\n            class="col-lg-3 control-label greyText editPropertiesLabel">\n            {{\'REQUIRED\' | translate}} :\n          </label>\n          <div class="col-lg-9">\n            <div class="checkboxCssCorrection">\n              &nbsp;\n            </div>\n            <input\n              type="checkbox"\n              ng-model="$ctrl.nyaSelect.temporyConfig.formlyRequired"\n              id="inputTextRequiredUpdate">\n          </div>\n        </div>\n      </div>\n      <div class="marginTopFivepixels"></div>\n      <div class="row">\n        <div class="form-group">\n          <label\n            for="inputTextDescriptionUpdate"\n            class="col-lg-3 control-label greyText editPropertiesLabel">\n            {{\'DESCRIPTION\' | translate}} :\n          </label>\n          <div class="col-lg-9">\n            <input\n              type="text"\n              class="form-control"\n              ng-model="$ctrl.nyaSelect.temporyConfig.formlyDescription"\n              id="inputTextDescriptionUpdate"\n              placeholder="{{\'ADDEDIT_DESCRIPTION\' | translate}}">\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  ',
	  bindings: {
	    nyaSelect: '='
	  },
	  controller: (_temp = _class = function editEmailControlController() {
	    _classCallCheck(this, editEmailControlController);
	  }, _class.$inject = [], _temp)
	};
	
	var editEmailControlModuleName = 'stepway.editEmailControl.module';
	
	exports.default = angular.module(editEmailControlModuleName, []).component(EDIT_EMAIL_COMPONENT, editEmailControlComponent);

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var BasicSelectConfig = exports.BasicSelectConfig = {
	  id: 'BasicSelect',
	  name: 'Basic select',
	  subtitle: 'Basic select',
	  options: [],
	  group: 'Select',
	  formlyType: 'basicSelect',
	  formlySubtype: '',
	  formlyLabel: '',
	  formlyRequired: false,
	  formlyDescription: '',
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
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _class, _temp;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EDIT_BASIC_SELECT_COMPONENT = exports.EDIT_BASIC_SELECT_COMPONENT = 'editBasicSelectControl';
	
	var editBasicSelectControlComponent = exports.editBasicSelectControlComponent = {
	  template: '\n  <div class="panel panel-default">\n    <div class="panel-body">\n      <div class="row">\n        <div class="col-md-12">\n          <h5 class="greyText">\n            <i class="fa fa-eye"></i>\n            &nbsp;\n            {{\'PREVIEW_TAB\' | translate}} :\n          </h5>\n        </div>\n      </div>\n      <hr/>\n      <div class="row">\n        <div class="col-md-12">\n          <div class="form-group">\n            <label\n              for="basicSelect"\n              class="control-label textControlLabel">\n              {{$ctrl.nyaSelect.temporyConfig.formlyLabel}}\n              <span\n                ng-if="$ctrl.nyaSelect.temporyConfig.formlyRequired"\n                class="textControlLabel">\n                *\n              </span>\n            </label>\n            <div class="">\n              <ol\n                class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12"\n                ng-model="$ctrl.modelbasicSelect"\n                id="basicSelect"\n                disabled="$ctrl.basicSelectRowCollection.rows.length === 0">\n                <li\n                  class="nya-bs-option"\n                  nya-bs-option="basicSelectRow in $ctrl.basicSelectRowCollection.rows"\n                  value="$index">\n                  <a>\n                    {{basicSelectRow.option}}\n                  </a>\n                </li>\n              </ol>\n              <p class="help-block">\n                {{$ctrl.nyaSelect.temporyConfig.formlyDescription}}\n              </p>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class="panel panel-default">\n    <div class="panel-body">\n      <div class="row">\n        <div class="col-md-12">\n          <h5 class="greyText">\n            <i class="fa fa-pencil-square-o"></i>\n            &nbsp;\n            {{\'EDIT_PROPERTIES\' | translate}} :\n          </h5>\n        </div>\n      </div>\n      <hr/>\n      <div class="row">\n        <div class="col-lg-3 col-md-3">\n          <label\n            for="basicSelectRowCollection"\n            class=" control-label greyText editPropertiesLabel">\n            {{\'ADD_NEW_OPTIONS\' | translate}} :\n          </label>\n        </div>\n      </div>\n      <div class="row">\n        <div>\n          <div class="form-group">\n            <div class="col-sm-9 col-xs-9 col-md-9 col-lg-9">\n            <input\n              type="text"\n              class="form-control"\n              id="inputAddNewBasicOption"\n              placeholder="{{\'ADD_A_NEW_OPTION\' | translate}}"\n              ng-model="$ctrl.newOptionBasicSelect.saisie">\n            </div>\n            <div class="col-sm-3 col-xs-3 col-md-3 col-lg-3">\n              <button\n                class="btn btn-primary"\n                ng-click="$ctrl.addNewOptionBasicSelect()">\n                {{\'ADD\' | translate}}\n              </button>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class="row">\n        <div class="col-lg-3 col-md-3">\n          <label class=" control-label greyText editPropertiesLabel">\n            {{\'EDIT_REMOVE_OPTIONS\' | translate}} :\n          </label>\n        </div>\n      </div>\n      <div class="row">\n        <div class="form-group">\n          <div class-"col-lg-12 col-md-12 col-sm-12 col-xs-12">\n            <div class="container">\n              <div ng-if="$ctrl.basicSelectRowCollection.rows.length === 0">\n                <h5 class="text-center greyText">\n                  <em>\n                    - {{\'NO_OPTION_ADD_NEW\' | translate}} -\n                  </em>\n                </h5>\n              </div>\n              <table\n                ng-if="$ctrl.basicSelectRowCollection.rows.length > 0"\n                class="table table-striped">\n                <thead>\n                  <tr>\n                    <th st-ratio="20">\n                      {{\'ORDER\' | translate}}\n                    </th>\n                    <th st-ratio="55">\n                      {{\'OPTION\' | translate}}\n                    </th>\n                    <th st-ratio="25">\n                    </th>\n                  </tr>\n                  <tr>\n                    <th st-ratio="20">\n                    </th>\n                    <th st-ratio="55">\n                      <input\n                        ng-model="$ctrl.basicSelectFilter"\n                        placeholder="{{\'SEARCH_4_OPTION\' | translate}}"\n                        class="input-sm form-control"\n                        type="search"\n                      />\n                    </th>\n                    <th st-ratio="25">\n                    </th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr ng-repeat="basicSelectRow in $ctrl.basicSelectRowCollection.rows | filter:$ctrl.basicSelectFilter as basicSelectRow">\n                      <td st-ratio="20">\n                        {{$index}}\n                      </td>\n                      <td st-ratio="55">\n                        {{basicSelectRow.option}}\n                      </td>\n                      <td st-ratio="25">\n                        <div class="pull-right">\n                          <button\n                            class="btn btn-primary"\n                            ng-click="$ctrl.upThisRow({index: $index})">\n                            <i class="fa fa-arrow-up"></i>\n                          </button>\n                          <button\n                            class="btn btn-primary"\n                            ng-click="$ctrl.downThisRow({index: $index})">\n                            <i class="fa fa-arrow-down"></i>\n                          </button>\n                          <button\n                            class="btn btn-danger"\n                            ng-click="$ctrl.removeRow({index: $index})">\n                            <i class="fa fa-trash-o"></i>\n                          </button>\n                        </div>\n                      </td>\n                    </tr>\n                  </tbody>\n                </table>\n              </div>\n            </div>\n          </div>\n        </div>\n        <hr/>\n        <div class="row">\n          <div class="form-group">\n            <label\n              for="inputTextLabelUpdate"\n              class="col-lg-3 control-label greyText editPropertiesLabel">\n              {{\'LABEL_TEXT\' | translate}} :\n            </label>\n            <div class="col-lg-9">\n              <input\n                type="text"\n                class="form-control"\n                ng-model="$ctrl.nyaSelect.temporyConfig.formlyLabel"\n                id="inputTextLabelUpdate"\n                placeholder="{{\'ADD_EDIT_LABEL_HERE\' | translate}}">\n            </div>\n          </div>\n        </div>\n        <div class="marginTopFivepixels"></div>\n        <div class="row">\n          <div class="form-group">\n            <label\n              for="inputTextRequiredUpdate"\n              class="col-lg-3 control-label greyText editPropertiesLabel">\n              Required :\n            </label>\n            <div class="col-lg-9">\n              <div class="checkboxCssCorrection">\n                &nbsp;\n              </div>\n              <input\n                type="checkbox"\n                ng-model="nyaSelect.temporyConfig.formlyRequired"\n                id="inputTextRequiredUpdate">\n            </div>\n          </div>\n        </div>\n        <div class="marginTopFivepixels"></div>\n        <div class="row">\n          <div class="form-group">\n            <label\n              for="inputTextDescriptionUpdate"\n              class="col-lg-3 control-label greyText editPropertiesLabel">\n              {{\'DESCRIPTION\' | translate}} :\n            </label>\n            <div class="col-lg-9">\n              <input\n                type="text"\n                class="form-control"\n                ng-model="$ctrl.nyaSelect.temporyConfig.formlyDescription"\n                id="inputTextDescriptionUpdate"\n                placeholder="{{\'ADDEDIT_DESCRIPTION\' | translate}}">\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  ',
	  bindings: {
	    nyaSelect: '=',
	    basicSelectRowCollection: '=',
	    newOptionBasicSelect: '=',
	    addNewOptionBasicSelect: '&',
	    upThisRow: '&',
	    downThisRow: '&',
	    removeRow: '&'
	  },
	  controller: (_temp = _class = function editBasicSelectController() {
	    _classCallCheck(this, editBasicSelectController);
	  }, _class.$inject = [], _temp)
	};
	
	var editBasicSelectModuleName = 'stepway.editBasicSelect.module';
	exports.default = angular.module(editBasicSelectModuleName, []).component(EDIT_BASIC_SELECT_COMPONENT, editBasicSelectControlComponent);

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var GroupedSelectConfig = exports.GroupedSelectConfig = {
	  id: 'GroupedSelect',
	  name: 'Grouped Select',
	  subtitle: 'Grouped Select',
	  options: [],
	  group: 'Select',
	  formlyType: 'groupedSelect',
	  formlySubtype: '',
	  formlyLabel: '',
	  formlyRequired: false,
	  formlyDescription: '',
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
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _class, _temp;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EDIT_GROUPED_SELECT_COMPONENT = exports.EDIT_GROUPED_SELECT_COMPONENT = 'editGroupedSelectControl';
	
	var editGroupedSelectControlComponent = exports.editGroupedSelectControlComponent = {
	  template: '\n    <div class="panel panel-default">\n    <div class="panel-body">\n      <div class="row">\n        <div class="col-md-12">\n          <h5\n            class="greyText">\n            <i class="fa fa-eye"></i>\n            &nbsp;\n            {{\'PREVIEW_TAB\' | translate}} :\n          </h5>\n        </div>\n      </div>\n      <hr/>\n      <div class="row">\n        <div class="col-md-12">\n          <div class="form-group">\n            <label\n              for="select"\n              class="control-label textControlLabel">\n              {{$ctrl.nyaSelect.temporyConfig.formlyLabel}}\n              <span\n                ng-if="$ctrl.nyaSelect.temporyConfig.formlyRequired"\n                class="textControlLabel">\n                *\n              </span>\n            </label>\n            <div class="">\n              <ol\n                class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12"\n                ng-model="modelGroupedSelect"\n                data-live-search="true"\n                disabled="$ctrl.groupedSelectRowCollection.rows.length === 0">\n                <li\n                  nya-bs-option="groupedSelectRow in $ctrl.groupedSelectRowCollection.rows group by groupedSelectRow.group"\n                  value="$index">\n                  <span class="dropdown-header">\n                    {{groupedSelectRow.group}}\n                  </span>\n                  <a>\n                    <span>\n                      {{groupedSelectRow.option}}\n                    </span>\n                    <span class="glyphicon glyphicon-ok check-mark">\n                    </span>\n                  </a>\n                </li>\n              </ol>\n              <p class="help-block">\n                {{$ctrl.nyaSelect.temporyConfig.formlyDescription}}\n              </p>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class="panel panel-default">\n    <div class="panel-body">\n      <div class="row">\n        <div class="col-md-12">\n          <h5\n            class="greyText">\n            <i class="fa fa-pencil-square-o"></i>\n            &nbsp;\n            {{\'EDIT_PROPERTIES\' | translate}} :\n          </h5>\n        </div>\n      </div>\n      <hr/>\n      <div class="row">\n        <div class="col-lg-3 col-md-3">\n          <label\n            for="groupedSelectRowCollection"\n            class=" control-label greyText editPropertiesLabel">\n            {{\'ADD_NEW_OPTIONS\' | translate}} :\n          </label>\n        </div>\n      </div>\n      <div class="row">\n        <div>\n          <div class="form-group">\n            <div class="col-sm-9 col-xs-9 col-md-9 col-lg-9">\n              <input\n                type="text"\n                class="form-control"\n                id="inputAddNewGroupedOption"\n                placeholder="{{\'ADD_A_NEW_OPTION\' | translate}}"\n                ng-model="$ctrl.newOptionGroupedSelect.saisie">\n            </div>\n            <div class="col-sm-3 col-xs-3 col-md-3 col-lg-3">\n              <button\n                class="btn btn-primary"\n                ng-click="$ctrl.addNewOptionGroupedSelect()">\n                {{\'ADD\' | translate}}\n              </button>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class="row">\n        <div class="col-lg-3 col-md-3">\n          <label\n            for="groupedSelectRowCollection"\n            class=" control-label greyText editPropertiesLabel">\n            {{\'ADD_NEW_GROUPS\' | translate}} :\n          </label>\n        </div>\n      </div>\n      <div class="row">\n        <div>\n          <div class="form-group">\n            <div class="col-sm-9 col-xs-9 col-md-9 col-lg-9">\n              <input\n                id="inputAddNewGroupGroupedOption"\n                type="text"\n                class="form-control"\n                ng-model="$ctrl.newGroupGroupedSelect.saisie" id="inputTextLabelUpdateGroupedSelect"\n                placeholder="{{\'ADD_A_NEW_GROUP\' | translate}}">\n            </div>\n            <div class="col-sm-3 col-xs-3 col-md-3 col-lg-3">\n              <button\n                class="btn btn-primary"\n                ng-click="$ctrl.addNewGroupToGroupedSelect()">\n                {{\'ADD\' | translate}}\n              </button>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class="row">\n        <div class="col-lg-3 col-md-3">\n          <label  class=" control-label greyText editPropertiesLabel">\n            {{\'EDIT_GROUPS_OPTIONS\' | translate}} :\n          </label>\n        </div>\n      </div>\n      <div class="row">\n        <div class="form-group">\n          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\n            <div class="container">\n              <div ng-if="$ctrl.groupedSelectRowCollection.rows.length === 0">\n                <h5 class="text-center greyText">\n                  <em>\n                    - {{\'NO_OPTION_ADD_NEW\' | translate}} -\n                  </em>\n                </h5>\n              </div>\n              <table\n                ng-if="$ctrl.groupedSelectRowCollection.rows.length > 0"\n                class="table table-striped">\n                <thead>\n                  <tr>\n                    <th st-ratio="20">\n                      {{\'ORDER\' | translate}}\n                    </th>\n                    <th st-ratio="25">\n                      {{\'GROUP\' | translate}}\n                    </th>\n                    <th st-ratio="30">\n                      {{\'OPTION\' | translate}}\n                    </th>\n                    <th st-ratio="25">\n                    </th>\n                  </tr>\n                  <tr>\n                    <th st-ratio="20">\n                    </th>\n                    <th st-ratio="25">\n                    </th>\n                    <th st-ratio="30">\n                      <input\n                        ng-model="$ctrl.groupedSelectFilter"\n                        placeholder="{{\'SEARCH_4_OPTION\' | translate}}"\n                        class="input-sm form-control"\n                        type="search"\n                      />\n                    </th>\n                    <th st-ratio="25">\n                    </th>\n                  </tr>\n                  </thead>\n                  <tbody>\n                  <tr ng-repeat="groupedSelectRow in $ctrl.groupedSelectRowCollection.rows | filter:$ctrl.groupedSelectFilter as groupedSelectRow">\n                    <td st-ratio="20">\n                      {{$index}}\n                    </td>\n                    <td st-ratio="25">\n                      <div ng-if="$ctrl.groupSelectGroupClick.showList === true">\n                        <div ng-if="$ctrl.groupedSelectGroups.list.length === 0">\n                          <p class="text-left noGroupText">- {{\'NO_GROUP_ADD_NEW\' | translate}} -</p>\n                        </div>\n                        <div ng-if="$ctrl.groupedSelectGroups.list.length > 0">\n                          <ol\n                            class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12 editGroupedSelectnyaSelect"\n                            ng-model="groupedSelectRow.group"\n                            id="modelGroupedOptionGroupedChoose"\n                            disabled="$ctrl.groupedSelectGroups.list.length === 0">\n                            <li\n                              class="nya-bs-option"\n                              nya-bs-option="GroupedSelectGroup in $ctrl.groupedSelectGroups.list"\n                              value="GroupedSelectGroup">\n                              <a>{{GroupedSelectGroup}}</a>\n                            </li>\n                          </ol>\n                        </div>\n                      </div>\n                      <div ng-if="$ctrl.groupSelectGroupClick.showList === false">\n                        {{groupedSelectRow.group}}\n                      </div>\n                    </td>\n                    <td st-ratio="30">\n                      {{groupedSelectRow.option}}\n                    </td>\n                    <td st-ratio="25">\n                      <div class="pull-right">\n                        <button\n                          class="btn btn-primary"\n                          ng-click="$ctrl.upThisGroupedSelectRow({index: $index})">\n                          <i class="fa fa-arrow-up"></i>\n                        </button>\n                        <button\n                          class="btn btn-primary"\n                          ng-click="$ctrl.downThisGroupedSelectRow({index: $index})">\n                          <i class="fa fa-arrow-down"></i>\n                        </button>\n                        <button\n                          class="btn btn-warning"\n                          ng-click="$ctrl.showGroupListToChoose()">\n                          <i class="fa fa-pencil-square-o"></i>\n                        </button>\n                        <button\n                          class="btn btn-danger"\n                          ng-click="$ctrl.removeGroupedSelectRow({index: $index})">\n                          <i class="fa fa-trash-o"></i>\n                        </button>\n                      </div>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          </div>\n        </div>\n      </div>\n    <hr/>\n    <div class="row">\n      <div class="form-group">\n        <label\n          for="inputTextLabelUpdate"\n          class="col-lg-3 control-label greyText editPropertiesLabel">\n          {{\'LABEL_TEXT\' | translate}} :\n        </label>\n        <div class="col-lg-9">\n          <input\n            type="text"\n            class="form-control"\n            ng-model="$ctrl.nyaSelect.temporyConfig.formlyLabel"\n            id="inputTextLabelUpdate"\n            placeholder="{{\'ADD_EDIT_LABEL_HERE\' | translate}}">\n        </div>\n      </div>\n    </div>\n    <div class="marginTopFivepixels"></div>\n    <div class="marginTopFivepixels"></div>\n    <div class="row">\n      <div class="form-group">\n        <label\n          for="inputTextDescriptionUpdate"\n          class="col-lg-3 control-label greyText editPropertiesLabel">\n          {{\'DESCRIPTION\' | translate}} :\n        </label>\n        <div class="col-lg-9">\n          <input\n            type="text"\n            class="form-control"\n            ng-model="$ctrl.nyaSelect.temporyConfig.formlyDescription"\n            id="inputTextDescriptionUpdate"\n            placeholder="{{\'ADDEDIT_DESCRIPTION\' | translate}}">\n      </div>\n    </div>\n  </div>\n  ',
	  bindings: {
	    nyaSelect: '=',
	    groupedSelectRowCollection: '=',
	    newOptionGroupedSelect: '=',
	    newGroupGroupedSelect: '=',
	    groupSelectGroupClick: '=',
	    groupedSelectGroups: '=',
	
	    addNewOptionGroupedSelect: '&',
	    addNewGroupToGroupedSelect: '&',
	    upThisGroupedSelectRow: '&',
	    downThisGroupedSelectRow: '&',
	    showGroupListToChoose: '&',
	    removeGroupedSelectRow: '&'
	  },
	  controller: (_temp = _class = function editGroupedSelectControlController() {
	    _classCallCheck(this, editGroupedSelectControlController);
	  }, _class.$inject = [], _temp)
	};
	
	var editGroupedSelectModuleName = 'stepway.editGroupedSelect.module';
	
	exports.default = angular.module(editGroupedSelectModuleName, []).component(EDIT_GROUPED_SELECT_COMPONENT, editGroupedSelectControlComponent);

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var HeaderConfig = exports.HeaderConfig = {
	  id: 'Header',
	  name: 'Header',
	  subtitle: 'no control',
	  group: 'Decoration',
	  formlyType: 'header',
	  formlySubtype: '',
	  formlyLabel: '',
	  formlyRequired: false,
	  formlyDescription: '',
	  formlyOptions: [],
	  formlyExpressionProperties: {},
	  formlyValidators: {},
	  formlyValidation: {}
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _class, _temp;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EDIT_HEADER_CONTROL_COMPONENT = exports.EDIT_HEADER_CONTROL_COMPONENT = 'editHeaderControl';
	
	var editHeaderControlComponent = exports.editHeaderControlComponent = {
	  template: '\n  <div class="panel panel-default">\n    <div class="panel-body">\n      <div class="row">\n        <div class="col-md-12">\n          <h5 class="greyText"><i class="fa fa-eye"></i>\n            &nbsp;\n            {{\'PREVIEW_TAB\' | translate}} :\n          </h5>\n        </div>\n      </div>\n      <hr/>\n      <div class="row">\n        <div class="col-md-12">\n          <div class="form-group">\n            <div class="">\n              <h2 class="text-center">\n                {{$ctrl.nyaSelect.temporyConfig.formlyPlaceholder}}\n              </h2>\n              <hr/>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class="panel panel-default">\n    <div class="panel-body">\n      <div class="row">\n        <div class="col-md-12">\n          <h5 class="greyText">\n            <i class="fa fa-pencil-square-o"></i>\n            &nbsp;\n            {{\'EDIT_PROPERTIES\' | translate}} :\n            </h5>\n        </div>\n      </div>\n      <hr/>\n      <div class="marginTopFivepixels"></div>\n      <div class="row">\n        <div class="form-group">\n          <label\n            for="inputHeaderTextUpdate"\n            class="col-lg-3 control-label greyText editPropertiesLabel">\n            {{\'HEADER_TEXT\' | translate}} :\n          </label>\n          <div class="col-lg-9">\n            <input\n              type="text"\n              class="form-control"\n              ng-model="$ctrl.nyaSelect.temporyConfig.formlyPlaceholder"\n              id="inputHeaderTextUpdate"\n              placeholder="{{\'ADD_EDIT_HEADER_HERE\' | translate}}">\n          </div>\n        </div>\n      </div>\n      <div class="marginTopFivepixels"></div>\n      <div class="row">\n        <div class="form-group">\n          <label\n            for="inputTextDescriptionUpdate"\n            class="col-lg-3 control-label greyText editPropertiesLabel">\n            {{\'DESCRIPTION\' | translate}} :\n          </label>\n          <div class="col-lg-9">\n            <input\n              type="text"\n              class="form-control"\n              ng-model="$ctrl.nyaSelect.temporyConfig.formlyDescription"\n              id="inputTextDescriptionUpdate"\n              placeholder="{{\'ADDEDIT_DESCRIPTION\' | translate}}">\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  ',
	  bindings: {
	    nyaSelect: '='
	  },
	  controller: (_temp = _class = function editHeaderControlController() {
	    // 
	
	    _classCallCheck(this, editHeaderControlController);
	  }, _class.$inject = [], _temp)
	};
	
	var editHeaderControlModuleName = 'stepway.editHeaderControl.module';
	
	exports.default = angular.module(editHeaderControlModuleName, []).component(EDIT_HEADER_CONTROL_COMPONENT, editHeaderControlComponent);

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PasswordConfig = exports.PasswordConfig = {
	  id: 'Password',
	  name: 'Password',
	  subtitle: 'Password',
	  group: 'input',
	  formlyType: 'input',
	  formlySubtype: 'password',
	  formlyLabel: '',
	  formlyRequired: false,
	  formlyDescription: '',
	  formlyOptions: [],
	  formlyExpressionProperties: {},
	  formlyValidators: {},
	  formlyValidation: {
	    messages: {
	      required: function required(viewValue, modelValue, scope) {
	        var defaultReturnMsg = 'this Password field is required';
	        var returnMsg = typeof scope.to.label !== 'undefined' ? scope.to.label !== '' ? scope.to.label + ' is required' : defaultReturnMsg : defaultReturnMsg;
	        return returnMsg;
	      }
	    }
	  }
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _class, _temp;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EDIT_PASSWORD_CONTROL_COMPONENT = exports.EDIT_PASSWORD_CONTROL_COMPONENT = 'editPasswordControl';
	
	var editPasswordControlComponent = exports.editPasswordControlComponent = {
	  template: '\n    <div class="panel panel-default">\n    <div class="panel-body">\n      <div class="row">\n        <div class="col-md-12">\n          <h5 class="greyText">\n            <i class="fa fa-eye"></i>\n            &nbsp;\n            {{\'PREVIEW_TAB\' | translate}} :\n          </h5>\n        </div>\n      </div>\n      <hr/>\n      <div class="row">\n        <div class="col-md-12">\n          <div class="form-group">\n            <label\n              for="inputPassword"\n              class="control-label textControlLabel">\n              {{$ctrl.nyaSelect.temporyConfig.formlyLabel}}\n              <span\n                ng-if="$ctrl.nyaSelect.temporyConfig.formlyRequired"\n                class="textControlLabel">\n                *\n              </span>\n            </label>\n            <div class="">\n              <input\n                type="password"\n                class="form-control"\n                id="inputPassword"\n                placeholder="{{$ctrl.nyaSelect.temporyConfig.formlyPlaceholder}}">\n                <p class="help-block">\n                  {{$ctrl.nyaSelect.temporyConfig.formlyDescription}}\n                </p>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class="panel panel-default">\n    <div class="panel-body">\n      <div class="row">\n        <div class="col-md-12">\n            <h5 class="greyText">\n              <i class="fa fa-pencil-square-o"></i>\n              &nbsp;\n              {{\'EDIT_PROPERTIES\' | translate}} :\n            </h5>\n        </div>\n      </div>\n      <hr/>\n      <div class="row">\n        <div class="form-group">\n          <label\n            for="inputTextLabelUpdate"\n            class="col-lg-3 control-label greyText editPropertiesLabel">\n            {{\'LABEL_TEXT\' | translate}} :\n          </label>\n          <div class="col-lg-9">\n            <input\n              type="text"\n              class="form-control"\n              ng-model="$ctrl.nyaSelect.temporyConfig.formlyLabel"\n              id="inputTextLabelUpdate"\n              placeholder="{{\'ADD_EDIT_LABEL_HERE\' | translate}}">\n          </div>\n        </div>\n      </div>\n      <div class="marginTopFivepixels"></div>\n      <div class="row">\n        <div class="form-group">\n          <label\n            for="inputTextplaceholderUpdate"\n            class="col-lg-3 control-label greyText editPropertiesLabel">\n            {{\'PLACEHOLDER\' | translate}} :\n          </label>\n          <div class="col-lg-9">\n            <input\n              type="text"\n              class="form-control"\n              ng-model="$ctrl.nyaSelect.temporyConfig.formlyPlaceholder"\n              id="inputTextplaceholderUpdate"\n              placeholder="{{\'ADD_EDIT_PLACEHOLD\' | translate}}">\n          </div>\n        </div>\n      </div>\n      <div class="marginTopFivepixels"></div>\n      <div class="row">\n        <div class="form-group">\n          <label\n            for="inputTextRequiredUpdate"\n            class="col-lg-3 control-label greyText editPropertiesLabel">\n            {{\'REQUIRED\' | translate}} :\n          </label>\n          <div class="col-lg-9">\n            <div class="checkboxCssCorrection">\n              &nbsp;\n            </div>\n            <input\n              type="checkbox"\n              ng-model="$ctrl.nyaSelect.temporyConfig.formlyRequired"\n              id="inputTextRequiredUpdate">\n          </div>\n        </div>\n      </div>\n      <div class="marginTopFivepixels"></div>\n      <div class="row">\n        <div class="form-group">\n          <label\n            for="inputTextDescriptionUpdate"\n            class="col-lg-3 control-label greyText editPropertiesLabel">\n            {{\'DESCRIPTION\' | translate}} :\n          </label>\n          <div class="col-lg-9">\n            <input\n              type="text"\n              class="form-control"\n              ng-model="$ctrl.nyaSelect.temporyConfig.formlyDescription"\n              id="inputTextDescriptionUpdate"\n              placeholder="{{\'ADDEDIT_DESCRIPTION\' | translate}}">\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  ',
	  bindings: {
	    nyaSelect: '='
	  },
	  controller: (_temp = _class = function editPasswordControlController() {
	    //
	
	    _classCallCheck(this, editPasswordControlController);
	  }, _class.$inject = [], _temp)
	};
	
	var editeditPasswordModuleName = 'stepway.editPasswordControl.module';
	
	exports.default = angular.module(editeditPasswordModuleName, []).component(EDIT_PASSWORD_CONTROL_COMPONENT, editPasswordControlComponent);

/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var RadioConfig = exports.RadioConfig = {
	  id: 'Radio',
	  name: 'Radio',
	  subtitle: 'Radio',
	  options: [],
	  group: 'Radio',
	  formlyType: 'radio',
	  formlySubtype: '',
	  formlyLabel: '',
	  formlyRequired: false,
	  formlyDescription: '',
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
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _class, _temp;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EDIT_RADIO_CONTROL_COMPONENT = exports.EDIT_RADIO_CONTROL_COMPONENT = 'editRadioControl';
	
	var editRadioControlComponent = exports.editRadioControlComponent = {
	  template: '\n  <div class="panel panel-default">\n    <div class="panel-body">\n      <div class="row">\n        <div class="col-md-12">\n          <h5 class="greyText">\n            <i class="fa fa-eye"></i>\n            &nbsp;\n            {{\'PREVIEW_TAB\' | translate}} :\n          </h5>\n        </div>\n      </div>\n      <hr/>\n      <div class="row">\n        <div class="col-md-12">\n          <div class="form-group">\n            <label\n              for="basicSelect"\n              class="control-label textControlLabel">\n              {{$ctrl.nyaSelect.temporyConfig.formlyLabel}}\n              <span\n                ng-if="$ctrl.nyaSelect.temporyConfig.formlyRequired"\n                class="textControlLabel">\n                *\n              </span>\n            </label>\n            <div class="">\n              <div\n                class="radio"\n                ng-repeat="radioRow in $ctrl.radioRowCollection.rows">\n                <label>\n                  <input\n                    type="radio"\n                    name="optionsRadios"\n                    id="{{\'optionsRadio-\' + $index}}"\n                    value="$index"\n                    checked="">\n                    {{radioRow.option}}\n                </label>\n              </div>\n              <p class="help-block">\n                {{$ctrl.nyaSelect.temporyConfig.formlyDescription}}\n              </p>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class="panel panel-default">\n    <div class="panel-body">\n      <div class="row">\n        <div class="col-md-12">\n          <h5\n            class="greyText">\n            <i class="fa fa-pencil-square-o"></i>\n            &nbsp;\n            {{\'EDIT_PROPERTIES\' | translate}} :\n          </h5>\n        </div>\n      </div>\n      <hr/>\n      <div class="row">\n        <div class="col-lg-3 col-md-3">\n          <label\n            for="radioRowCollection"\n            class=" control-label greyText editPropertiesLabel">\n            {{\'ADD_NEW_RADIO\' | translate}} :\n          </label>\n        </div>\n      </div>\n      <div class="row">\n        <div>\n          <div class="form-group">\n            <div class="col-sm-9 col-xs-9 col-md-9 col-lg-9">\n              <input\n                type="text"\n                class="form-control"\n                id="inputAddNewRadioOption"\n                placeholder="{{\'ADD_RADIO_PLACEHOLD\' | translate}}"\n                ng-model="$ctrl.newOptionRadio.saisie">\n            </div>\n            <div class="col-sm-3 col-xs-3 col-md-3 col-lg-3">\n              <button\n                class="btn btn-primary"\n                ng-click="$ctrl.addNewOptionRadio()">\n                {{\'ADD\' | translate}}\n              </button>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class="row">\n        <div class="col-lg-3 col-md-3">\n          <label\n            for="radioRowCollection"\n            class=" control-label greyText editPropertiesLabel">\n            {{\'EDIT_REMOVE_RADIO\' | translate}} :\n          </label>\n        </div>\n      </div>\n        <div class="row">\n          <div class="form-group">\n            <div class-"col-lg-12 col-md-12 col-sm-12 col-xs-12">\n              <div class="container">\n                <div ng-show="$ctrl.radioRowCollection.rows.length === 0">\n                  <h5 class="text-center greyText">\n                    <em>\n                      - {{\'NO_RADIO_ADD_NEW\' | translate}} -\n                    </em>\n                  </h5>\n                </div>\n                <table\n                  ng-if="$ctrl.radioRowCollection.rows.length > 0"\n                  class="table table-striped">\n                  <thead>\n                  <tr>\n                    <th st-ratio="20">\n                      {{\'ORDER\' | translate}}\n                    </th>\n                    <th st-ratio="55">\n                      {{\'OPTION\' | translate}}\n                    </th>\n                    <th st-ratio="25">\n                    </th>\n                  </tr>\n                  <tr>\n                    <th st-ratio="20">\n                    </th>\n                    <th st-ratio="55">\n                      <input\n                        ng-model="$ctrl.radioFilter"\n                        placeholder="{{\'SEARCH_4_OPTION\' | translate}}"\n                        class="input-sm form-control"\n                        type="search"\n                      />\n                    </th>\n                    <th st-ratio="25">\n                    </th>\n                  </tr>\n                  </thead>\n                  <tbody>\n                    <tr ng-repeat="radioRow in $ctrl.radioRowCollection.rows | filter:radioFilter as radioRow">\n                      <td st-ratio="20">\n                        {{$index}}\n                      </td>\n                      <td st-ratio="55">\n                        {{radioRow.option}}\n                      </td>\n                      <td st-ratio="25">\n                        <div class="pull-right">\n                          <button\n                            class="btn btn-primary"\n                            ng-click="$ctrl.upThisRadioRow({index: $index})">\n                            <i class="fa fa-arrow-up"></i>\n                          </button>\n                          <button\n                            class="btn btn-primary"\n                            ng-click="$ctrl.downThisRadioRow({index: $index})">\n                            <i class="fa fa-arrow-down"></i>\n                          </button>\n                          <button\n                            class="btn btn-danger"\n                            ng-click="$ctrl.removeRadioRow({index: $index})">\n                            <i class="fa fa-trash-o"></i>\n                          </button>\n                        </div>\n                      </td>\n                    </tr>\n                  </tbody>\n                </table>\n              </div>\n            </div>\n          </div>\n        </div>\n        <hr/>\n        <div class="marginTopFivepixels"></div>\n        <div class="row">\n          <div class="form-group">\n            <label\n              for="inputTextLabelUpdate"\n              class="col-lg-3 control-label greyText editPropertiesLabel">{{\'LABEL_TEXT\' | translate}} :\n            </label>\n            <div class="col-lg-9">\n              <input\n                type="text"\n                class="form-control"\n                ng-model="$ctrl.nyaSelect.temporyConfig.formlyLabel"\n                id="inputTextLabelUpdate"\n                placeholder="{{\'ADD_EDIT_LABEL_HERE\' | translate}}">\n            </div>\n          </div>\n        </div>\n        <div class="marginTopFivepixels"></div>\n        <div class="row">\n          <div class="form-group">\n            <label\n              for="inputTextRequiredUpdate"\n              class="col-lg-3 control-label greyText editPropertiesLabel">{{\'REQUIRED\' | translate}} :\n            </label>\n            <div class="col-lg-9">\n              <div class="checkboxCssCorrection">\n                &nbsp;\n              </div>\n              <input\n                type="checkbox"\n                ng-model="$ctrl.nyaSelect.temporyConfig.formlyRequired"\n                id="inputTextRequiredUpdate">\n            </div>\n          </div>\n        </div>\n        <div class="marginTopFivepixels"></div>\n        <div class="row">\n          <div class="form-group">\n            <label\n              for="inputTextDescriptionUpdate"\n              class="col-lg-3 control-label greyText editPropertiesLabel">{{\'DESCRIPTION\' | translate}} :\n            </label>\n            <div class="col-lg-9">\n              <input\n                type="text"\n                class="form-control"\n                ng-model="$ctrl.nyaSelect.temporyConfig.formlyDescription"\n                id="inputTextDescriptionUpdate"\n                placeholder="{{\'ADDEDIT_DESCRIPTION\' | translate}}">\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  ',
	  bindings: {
	    nyaSelect: '=',
	    radioRowCollection: '=',
	    newOptionRadio: '=',
	    addNewOptionRadio: '&',
	    upThisRadioRow: '&',
	    downThisRadioRow: '&',
	    removeRadioRow: '&'
	  },
	  controller: (_temp = _class = function editRadioControlController() {
	    //
	
	    _classCallCheck(this, editRadioControlController);
	  }, _class.$inject = [], _temp)
	};
	
	var editRadioControlModuleName = 'stepway.editRadioControl.module';
	
	exports.default = angular.module(editRadioControlModuleName, []).component(EDIT_RADIO_CONTROL_COMPONENT, editRadioControlComponent);

/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var RichTextEditorConfig = exports.RichTextEditorConfig = {
	  id: 'RichTextEditor',
	  name: 'RichTextEditor',
	  subtitle: 'RichTextEditor',
	  group: 'Textarea',
	  formlyType: 'richEditor',
	  formlySubtype: '',
	  formlyLabel: '',
	  formlyRequired: false,
	  formlyDescription: '',
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
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _class, _temp;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EDIT_RICH_TEXT_EDITOR_COMPONENT = exports.EDIT_RICH_TEXT_EDITOR_COMPONENT = 'editRichTextEditorControl';
	
	var editRichTextEditorControlComponent = exports.editRichTextEditorControlComponent = {
	  template: '\n    <div class="panel panel-default">\n      <div class="panel-body">\n        <div class="row">\n          <div class="col-md-12">\n            <h5 class="greyText">\n              <i class="fa fa-eye"></i>\n              &nbsp;\n              {{\'PREVIEW_TAB\' | translate}} :\n            </h5>\n          </div>\n        </div>\n        <hr/>\n        <div class="row">\n          <div class="col-md-12">\n            <div class="form-group">\n              <label\n                for="RichTextEditor"\n                class="control-label textControlLabel">\n                {{$ctrl.nyaSelect.temporyConfig.formlyLabel}}\n                <span\n                  ng-if="$ctrl.nyaSelect.temporyConfig.formlyRequired"\n                  class="textControlLabel">\n                  *\n                </span>\n              </label>\n              <div class="">\n                <text-angular\n                  ng-model="$ctrl.model[options.key]">\n                </text-angular>\n                <p class="help-block">\n                  {{$ctrl.nyaSelect.temporyConfig.formlyDescription}}\n                </p>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class="panel panel-default">\n      <div class="panel-body">\n        <div class="row">\n          <div class="col-md-12">\n            <h5 class="greyText">\n              <i class="fa fa-pencil-square-o"></i>\n              &nbsp;\n              {{\'EDIT_PROPERTIES\' | translate}} :\n            </h5>\n          </div>\n        </div>\n        <hr/>\n    <!-- required can\'t be applied to rich text editor (textAngular) right now -->\n    <!--<div class="row">\n          <div class="form-group">\n            <label\n              for="inputTextRequiredUpdate"\n              class="col-lg-3 control-label greyText editPropertiesLabel">Required :\n            </label>\n            <div class="col-lg-9">\n              <div class="checkboxCssCorrection">\n                &nbsp;\n              </div>\n              <input\n                type="checkbox"\n                ng-model="nyaSelect.temporyConfig.formlyRequired" id="inputTextRequiredUpdate">\n            </div>\n          </div>\n        </div>\n        <div class="marginTopFivepixels"></div>-->\n        <div class="row">\n          <div class="form-group">\n            <label\n              for="inputTextDescriptionUpdate"\n              class="col-lg-3 control-label greyText editPropertiesLabel">\n              {{\'DESCRIPTION\' | translate}} :\n            </label>\n            <div class="col-lg-9">\n              <input\n                type="text"\n                class="form-control"\n                ng-model="$ctrl.nyaSelect.temporyConfig.formlyDescription"\n                id="inputTextDescriptionUpdate"\n                placeholder="{{\'ADDEDIT_DESCRIPTION\' | translate}}">\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ',
	  bindings: {
	    nyaSelect: '='
	  },
	  controller: (_temp = _class = function editRichTextEditorControlController() {
	    //
	
	    _classCallCheck(this, editRichTextEditorControlController);
	  }, _class.$inject = [], _temp)
	};
	
	var editRichTextEditorModuleName = 'stepway.editRichTextEditor.module';
	exports.default = angular.module(editRichTextEditorModuleName, []).component(EDIT_RICH_TEXT_EDITOR_COMPONENT, editRichTextEditorControlComponent);

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var SubTitleConfig = exports.SubTitleConfig = {
	  id: 'Subtitle',
	  name: 'Subtitle',
	  subtitle: 'no control',
	  group: 'Decoration',
	  formlyType: 'subTitle',
	  formlySubtype: '',
	  formlyLabel: '',
	  formlyRequired: false,
	  formlyDescription: '',
	  formlyOptions: [],
	  formlyExpressionProperties: {},
	  formlyValidators: {},
	  formlyValidation: {}
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _class, _temp;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EDIT_SUBTITLE_CONTROL_COMPONENT = exports.EDIT_SUBTITLE_CONTROL_COMPONENT = 'editSubTitleControl';
	
	var editSubTitleControlComponent = exports.editSubTitleControlComponent = {
	  template: '\n    <div class="panel panel-default">\n      <div class="panel-body">\n        <div class="row">\n            <div class="col-md-12">\n                <h5\n                  class="greyText">\n                  <i class="fa fa-eye"></i>\n                  &nbsp;\n                  {{\'PREVIEW_TAB\' | translate}} :\n                </h5>\n            </div>\n        </div>\n        <hr/>\n        <div class="row">\n            <div class="col-md-12">\n                <div class="form-group">\n                  <div class="">\n                    <h4 class="text-center">\n                      {{$ctrl.nyaSelect.temporyConfig.formlyPlaceholder}}\n                    </h4>\n                    <hr/>\n                  </div>\n                </div>\n            </div>\n        </div>\n      </div>\n    </div>\n    <div class="panel panel-default">\n      <div class="panel-body">\n        <div class="row">\n          <div class="col-md-12">\n            <h5\n              class="greyText">\n              <i class="fa fa-pencil-square-o"></i>\n              &nbsp;\n              {{\'EDIT_PROPERTIES\' | translate}} :\n            </h5>\n          </div>\n        </div>\n        <hr/>\n        <div class="marginTopFivepixels"></div>\n        <div class="row">\n          <div class="form-group">\n            <label\n              for="inputSubTitleTextUpdate"\n              class="col-lg-3 control-label greyText editPropertiesLabel">\n              {{\'SUBTITLE_TEXT\' | translate}} :\n            </label>\n            <div class="col-lg-9">\n              <input\n                type="text"\n                class="form-control"\n                ng-model="$ctrl.nyaSelect.temporyConfig.formlyPlaceholder"\n                id="inputSubTitleTextUpdate"\n                placeholder="{{\'ADD_EDIT_SUBTIL_HERE\' | translate}}">\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ',
	  bindings: {
	    nyaSelect: '='
	  },
	  controller: (_temp = _class = function editSubTitleControlController() {
	    //
	
	    _classCallCheck(this, editSubTitleControlController);
	  }, _class.$inject = [], _temp)
	};
	
	var editSubTitleModuleName = 'stepway.editSubTitleControl.module';
	
	exports.default = angular.module(editSubTitleModuleName, []).component(EDIT_SUBTITLE_CONTROL_COMPONENT, editSubTitleControlComponent);

/***/ },
/* 41 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var TextAreaConfig = exports.TextAreaConfig = {
	  id: 'Texarea',
	  name: 'Textarea',
	  subtitle: 'Textarea',
	  group: 'Textarea',
	  formlyType: 'textarea',
	  formlySubtype: '',
	  formlyLabel: '',
	  formlyRequired: false,
	  formlyDescription: '',
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
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _class, _temp;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EDIT_TEXTAREA_CONTROL_COMPONENT = exports.EDIT_TEXTAREA_CONTROL_COMPONENT = 'editTextareaControl';
	
	var editTextareaControlComponent = exports.editTextareaControlComponent = {
	  template: '\n    <div class="panel panel-default">\n      <div class="panel-body">\n        <div class="row">\n          <div class="col-md-12">\n            <h5 class="greyText">\n              <i class="fa fa-eye"></i>\n              &nbsp;\n              {{\'PREVIEW_TAB\' | translate}} :\n            </h5>\n          </div>\n        </div>\n        <hr/>\n        <div class="row">\n          <div class="col-md-12">\n            <div class="form-group">\n              <label\n                for="textArea"\n                class="control-label textControlLabel">\n                {{$ctrl.nyaSelect.temporyConfig.formlyLabel}}\n                <span\n                  ng-if="$ctrl.nyaSelect.temporyConfig.formlyRequired"\n                  class="textControlLabel">\n                  *\n                </span>\n              </label>\n              <div class="">\n                <textarea\n                  class="form-control"\n                  ng-model="model[options.key]"\n                  rows="3"\n                  id="textArea">\n                </textarea>\n                <p class="help-block">\n                  {{$ctrl.nyaSelect.temporyConfig.formlyDescription}}\n                </p>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class="panel panel-default">\n      <div class="panel-body">\n        <div class="row">\n          <div class="col-md-12">\n            <h5 class="greyText">\n              <i class="fa fa-pencil-square-o"></i>\n              &nbsp;\n              {{\'EDIT_PROPERTIES\' | translate}} :\n            </h5>\n          </div>\n        </div>\n        <hr/>\n        <div class="row">\n          <div class="form-group">\n            <label\n              for="inputTextLabelUpdate"\n              class="col-lg-3 control-label greyText editPropertiesLabel">\n              {{\'LABEL_TEXT\' | translate}} :\n            </label>\n            <div class="col-lg-9">\n              <input\n                type="text"\n                class="form-control"\n                ng-model="$ctrl.nyaSelect.temporyConfig.formlyLabel"\n                id="inputTextLabelUpdate"\n                placeholder="{{\'ADD_EDIT_LABEL_HERE\' | translate}}">\n            </div>\n          </div>\n        </div>\n        <div class="marginTopFivepixels"></div>\n          <div class="row">\n            <div class="form-group">\n              <label\n                for="inputTextRequiredUpdate"\n                class="col-lg-3 control-label greyText editPropertiesLabel">\n                {{\'REQUIRED\' | translate}} :\n              </label>\n              <div class="col-lg-9">\n                <div class="checkboxCssCorrection">\n                  &nbsp;\n                </div>\n                <input\n                  type="checkbox"\n                  ng-model="$ctrl.nyaSelect.temporyConfig.formlyRequired"\n                  id="inputTextRequiredUpdate">\n              </div>\n            </div>\n          </div>\n          <div class="marginTopFivepixels"></div>\n          <div class="row">\n            <div class="form-group">\n              <label\n                for="inputTextDescriptionUpdate"\n                class="col-lg-3 control-label greyText editPropertiesLabel">\n                {{\'DESCRIPTION\' | translate}} :\n              </label>\n              <div class="col-lg-9">\n                <input\n                  type="text"\n                  class="form-control"\n                  ng-model="$ctrl.nyaSelect.temporyConfig.formlyDescription"\n                  id="inputTextDescriptionUpdate"\n                  placeholder="{{\'ADDEDIT_DESCRIPTION\' | translate}}">\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n  ',
	  bindings: {
	    nyaSelect: '='
	  },
	  controller: (_temp = _class = function editTextareaControlController() {
	    //
	
	    _classCallCheck(this, editTextareaControlController);
	  }, _class.$inject = [], _temp)
	};
	
	var edittextareaControlModuleName = 'stepway.editTextAreaControl.module';
	
	exports.default = angular.module(edittextareaControlModuleName, []).component(EDIT_TEXTAREA_CONTROL_COMPONENT, editTextareaControlComponent);

/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var TextInputConfig = exports.TextInputConfig = {
	  id: 'TextInput',
	  name: 'Text input',
	  subtitle: 'Text input',
	  group: 'input',
	  formlyType: 'input',
	  formlySubtype: '',
	  formlyLabel: '',
	  formlyRequired: false,
	  formlyDescription: '',
	  formlyDefaultValue: '',
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
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _class, _temp;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EDIT_TEXTINPUT_CONTROL_COMPONENT = exports.EDIT_TEXTINPUT_CONTROL_COMPONENT = 'editTextInputControl';
	
	var editTextInputControlComponent = exports.editTextInputControlComponent = {
	  template: '\n    <div class="panel panel-default">\n      <div class="panel-body">\n        <div class="row">\n          <div class="col-md-12">\n            <h5 class="greyText">\n              <i class="fa fa-eye"></i>\n              &nbsp;\n              {{\'PREVIEW_TAB\' | translate}} :\n            </h5>\n          </div>\n        </div>\n        <hr/>\n        <div class="row">\n          <div class="col-md-12">\n            <div class="form-group">\n              <label\n                for="inputText"\n                class="control-label textControlLabel">\n                {{$ctrl.nyaSelect.temporyConfig.formlyLabel}}\n                <span\n                  ng-if="$ctrl.nyaSelect.temporyConfig.formlyRequired"\n                  class="textControlLabel">\n                  *\n                </span>\n              </label>\n              <div class="">\n                <input\n                  type="text"\n                  class="form-control"\n                  id="inputText"\n                  placeholder="{{$ctrl.nyaSelect.temporyConfig.formlyPlaceholder}}">\n                  <p class="help-block">\n                  {{$ctrl.nyaSelect.temporyConfig.formlyDescription}}\n                  </p>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class="panel panel-default">\n      <div class="panel-body">\n        <div class="row">\n          <div class="col-md-12">\n            <h5 class="greyText">\n              <i class="fa fa-pencil-square-o"></i>\n              &nbsp;\n              {{\'EDIT_PROPERTIES\' | translate}} :\n            </h5>\n          </div>\n        </div>\n        <hr/>\n        <div class="row">\n          <div class="form-group">\n            <label\n              for="inputTextLabelUpdate"\n              class="col-lg-3 control-label greyText editPropertiesLabel">\n              {{\'LABEL_TEXT\' | translate}} :\n            </label>\n            <div class="col-lg-9">\n              <input\n                type="text"\n                class="form-control"\n                ng-model="$ctrl.nyaSelect.temporyConfig.formlyLabel"\n                id="inputTextLabelUpdate"\n                placeholder="{{\'ADD_EDIT_LABEL_HERE\' | translate}}">\n            </div>\n          </div>\n        </div>\n        <div class="marginTopFivepixels"></div>\n        <div class="row">\n          <div class="form-group">\n            <label\n              for="inputTextplaceholderUpdate"\n              class="col-lg-3 control-label greyText editPropertiesLabel">\n              {{\'PLACEHOLDER\' | translate}} :\n            </label>\n            <div class="col-lg-9">\n              <input\n                type="text"\n                class="form-control"\n                ng-model="$ctrl.nyaSelect.temporyConfig.formlyPlaceholder"\n                id="inputTextplaceholderUpdate"\n                placeholder="{{\'ADD_EDIT_PLACEHOLD\' | translate}}">\n            </div>\n          </div>\n        </div>\n        <div class="marginTopFivepixels"></div>\n        <div class="row">\n          <div class="form-group">\n            <label\n              for="inputTextRequiredUpdate"\n              class="col-lg-3 control-label greyText editPropertiesLabel">\n              {{\'REQUIRED\' | translate}} :\n            </label>\n            <div class="col-lg-9">\n              <div class="checkboxCssCorrection">&nbsp;</div>\n              <input\n                type="checkbox"\n                ng-model="$ctrl.nyaSelect.temporyConfig.formlyRequired"\n                id="inputTextRequiredUpdate">\n            </div>\n          </div>\n        </div>\n        <div class="marginTopFivepixels"></div>\n        <div class="row">\n          <div class="form-group">\n            <label\n              for="inputTextDescriptionUpdate"\n              class="col-lg-3 control-label greyText editPropertiesLabel">\n              {{\'DESCRIPTION\' | translate}} :\n            </label>\n            <div class="col-lg-9">\n              <input\n                type="text"\n                class="form-control"\n                ng-model="$ctrl.nyaSelect.temporyConfig.formlyDescription"\n                id="inputTextDescriptionUpdate"\n                placeholder="{{\'ADDEDIT_DESCRIPTION\' | translate}}">\n            </div>\n          </div>\n        </div>\n        <div class="marginTopFivepixels"></div>\n        <div class="row">\n          <div class="form-group">\n            <label\n              for="inputTextDefaultValueUpdate"\n              class="col-lg-3 control-label greyText editPropertiesLabel">\n              {{\'DEFAULTVALUE\' | translate}} :\n            </label>\n            <div class="col-lg-9">\n              <input\n                type="text"\n                class="form-control"\n                ng-model="$ctrl.nyaSelect.temporyConfig.formlyDefaultValue"\n                id="inputTextDefaultValueUpdate"\n                placeholder="{{\'ADD_EDIT_DEFAULTVALUE_PLACEHOLD\' | translate}}">\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ',
	  bindings: {
	    nyaSelect: '='
	  },
	  controller: (_temp = _class = function editTextInputControlController() {
	    //
	
	    _classCallCheck(this, editTextInputControlController);
	  }, _class.$inject = [], _temp)
	};
	
	var editTextInputControlModuleName = 'stepway.editTextInputControl.module';
	
	exports.default = angular.module(editTextInputControlModuleName, []).component(EDIT_TEXTINPUT_CONTROL_COMPONENT, editTextInputControlComponent);

/***/ },
/* 45 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
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
	        key: 'none' // ,
	        // templateOptions: {
	        //   label: 'none',
	        //   placeholder: 'none',
	        //   required: false,
	        //   description: 'Descriptive text'
	        // }
	      }
	    }]
	  }]
	};
	
	var configurationModelResult = {
	  activeLine: 1,
	  listConfigStep: ['init', 'first', 'second', 'third'],
	  stepIndicators: [true, false, false, false],
	  configStepCounter: 0,
	  submitButtonText: 'submit',
	  cancelButtonTex: 'cancel',
	  lines: []
	};
	
	var isTemplateOptionDefined = function isTemplateOptionDefined(obj) {
	  var defaultValue = false;
	  if (obj && obj.templateOptions) {
	    return true;
	  }
	  return defaultValue;
	};
	
	var extractTemplateOptionLabel = function extractTemplateOptionLabel(obj) {
	  var defaultValue = '';
	  if (isTemplateOptionDefined(obj) && obj.templateOptions.label) {
	    return obj.templateOptions.label;
	  }
	  return defaultValue;
	};
	
	var extractTemplateOptionDatepickerOptions = function extractTemplateOptionDatepickerOptions(obj) {
	  var defaultValue = { format: '' };
	  if (isTemplateOptionDefined(obj) && obj.templateOptions.datepickerOptions) {
	    return _extends({}, obj.templateOptions.datepickerOptions);
	  }
	  return defaultValue;
	};
	
	var extractTemplateOptionRequired = function extractTemplateOptionRequired(obj) {
	  var defaultValue = false;
	  if (isTemplateOptionDefined(obj) && obj.templateOptions.required) {
	    return true;
	  }
	  return defaultValue;
	};
	
	var extractTemplateOptionOptions = function extractTemplateOptionOptions(obj) {
	  var defaultValue = '';
	  if (isTemplateOptionDefined(obj) && obj.templateOptions.options) {
	    return obj.templateOptions.options;
	  }
	  return defaultValue;
	};
	
	var extractTemplateOptionType = function extractTemplateOptionType(obj) {
	  var defaultValue = '';
	  if (obj && obj.subtype) {
	    return obj.subtype;
	  }
	  return defaultValue;
	};
	
	var extractTemplateOptionPlaceholder = function extractTemplateOptionPlaceholder(obj) {
	  var defaultValue = '';
	  if (isTemplateOptionDefined(obj) && obj.templateOptions.placeholder) {
	    return obj.templateOptions.placeholder;
	  }
	  return defaultValue;
	};
	
	var extractTemplateOptionDescription = function extractTemplateOptionDescription(obj) {
	  var defaultValue = '';
	  if (isTemplateOptionDefined(obj) && obj.templateOptions.description) {
	    return obj.templateOptions.description;
	  }
	  return defaultValue;
	};
	
	var extractDefaultValue = function extractDefaultValue(obj) {
	  var defaultValue = '';
	  if (obj && obj.defaultValue) {
	    return obj.defaultValue;
	  }
	  return defaultValue;
	};
	
	var extractFormlyExpressionProperties = function extractFormlyExpressionProperties(obj) {
	  var defaultValue = {};
	  if (obj && obj.formlyExpressionProperties) {
	    return angular.copy(obj.formlyExpressionProperties);
	  }
	  return defaultValue;
	};
	
	var extractFormlyValidators = function extractFormlyValidators(obj) {
	  var defaultValue = {};
	  if (obj && obj.formlyValidators) {
	    return angular.copy(obj.formlyValidators);
	  }
	  return defaultValue;
	};
	
	var extractFormlyValidation = function extractFormlyValidation(obj) {
	  var defaultValue = {};
	  if (obj && obj.formlyValidation) {
	    return angular.copy(obj.formlyValidation);
	  }
	  return defaultValue;
	};
	
	var addDatepickerOptionsProperty = function addDatepickerOptionsProperty(fieldToPush, configurationModel, lineIndex) {
	  var control = _extends({}, configurationModel.lines[lineIndex].columns[0].control);
	  fieldToPush.templateOptions.datepickerOptions = extractTemplateOptionDatepickerOptions(control);
	};
	
	// const addOneColumnHeader = (formlyModel, configurationModel, lineIndex) => {
	//   const control = { ...configurationModel.lines[lineIndex].columns[0].control };
	//   const defaultTemplate = '<div></div>';
	//   const headerTemplateCol0 =  {
	//     template : `
	//     <div class="row">
	//       <div class="">
	//         <h2 class="text-center">
	//           ${extractTemplateOptionDescription(control)}
	//         </h2>
	//         <hr/>
	//       </div>
	//     </div>
	//     `
	//   };
	//   if (control.type && control.type  === 'header') {
	//     return formlyModel.push({
	//       template: headerTemplateCol0.template
	//     });
	//   }
	//   return formlyModel.push({
	//     template : defaultTemplate
	//   });
	// };
	
	var addOneColumnControl = function addOneColumnControl(formlyModel, configurationModel, lineIndex) {
	  var control = _extends({}, configurationModel.lines[lineIndex].columns[0].control);
	  var fieldToPush = {
	    className: 'col-xs-12',
	    type: control && control.type && control.type !== 'none' ? control.type : 'blank',
	    key: control && control.key ? control.key : 'blank' + Date.now(),
	    templateOptions: {
	      type: extractTemplateOptionType(control),
	      label: extractTemplateOptionLabel(control),
	      required: extractTemplateOptionRequired(control),
	      placeholder: extractTemplateOptionPlaceholder(control),
	      description: extractTemplateOptionDescription(control),
	      options: extractTemplateOptionOptions(control)
	    },
	    defaultValue: extractDefaultValue(control),
	    expressionProperties: extractFormlyExpressionProperties(control),
	    validators: extractFormlyValidators(control),
	    validation: extractFormlyValidation(control)
	  };
	  //////////////////////////////////////////////
	  //datepicker additionnal particular property
	  //////////////////////////////////////////////
	  if (control.type === 'datepicker') {
	    addDatepickerOptionsProperty(fieldToPush, configurationModel, lineIndex);
	  }
	  formlyModel.push(fieldToPush);
	};
	
	var addTwoColumnControl = function addTwoColumnControl(formlyModel, configurationModel, lineIndex) {
	  var control0 = _extends({}, configurationModel.lines[lineIndex].columns[0].control);
	  //text header is stored in "description" in templateOtion model
	  var headerTemplateCol0 = {
	    className: 'col-xs-6',
	    template: '\n    <div class="row">\n      <div class="">\n        <h2 class="text-center">\n          ' + extractTemplateOptionDescription(control0) + '\n        </h2>\n        <hr/>\n      </div>\n    </div>\n  '
	  };
	  var controlCol0 = {
	    className: 'col-xs-6',
	    type: control0 && control0.type && control0.type !== 'none' ? control0.type : 'blank',
	    key: control0 && control0.key ? control0.key : 'blank' + Date.now(),
	    templateOptions: {
	      type: extractTemplateOptionType(control0),
	      label: extractTemplateOptionLabel(control0),
	      required: extractTemplateOptionRequired(control0),
	      placeholder: extractTemplateOptionPlaceholder(control0),
	      description: extractTemplateOptionDescription(control0),
	      options: extractTemplateOptionOptions(control0)
	    },
	    defaultValue: extractDefaultValue(control0),
	    expressionProperties: extractFormlyExpressionProperties(control0),
	    validators: extractFormlyValidators(control0),
	    validation: extractFormlyValidation(control0)
	  };
	  //////////////////////////////////////////////
	  //datepicker additionnal particular property
	  //////////////////////////////////////////////
	  if (control0.type === 'datepicker') {
	    addDatepickerOptionsProperty(controlCol0, configurationModel, lineIndex);
	  }
	
	  var control1 = _extends({}, configurationModel.lines[lineIndex].columns[1].control);
	  var headerTemplateCol1 = {
	    className: 'col-xs-6',
	    template: '\n    <div class="row">\n      <div class="">\n        <h2 class="text-center">\n          ' + extractTemplateOptionDescription(control1) + '\n        </h2>\n        <hr/>\n      </div>\n    </div>\n  '
	  };
	  var controlCol1 = {
	    className: 'col-xs-6',
	    type: control1 && control1.type && control1.type !== 'none' ? control1.type : 'none',
	    key: control1 && control1.key ? control1.key : 'blank' + Date.now(),
	    templateOptions: {
	      type: extractTemplateOptionType(control1),
	      label: extractTemplateOptionLabel(control1),
	      required: extractTemplateOptionRequired(control1),
	      placeholder: extractTemplateOptionPlaceholder(control1),
	      description: extractTemplateOptionDescription(control1),
	      options: extractTemplateOptionOptions(control1)
	    },
	    defaultValue: extractDefaultValue(control1),
	    expressionProperties: extractFormlyExpressionProperties(control1),
	    validators: extractFormlyValidators(control1),
	    validation: extractFormlyValidation(control1)
	  };
	  //////////////////////////////////////////////
	  // datepicker additionnal particular property
	  //////////////////////////////////////////////
	  if (control1.type === 'datepicker') {
	    addDatepickerOptionsProperty(controlCol1, configurationModel, lineIndex);
	  }
	
	  var FieldGroup = [];
	
	  if (control0.type === 'header') {
	    FieldGroup.push(headerTemplateCol0);
	  } else {
	    FieldGroup.push(controlCol0);
	  }
	
	  if (control1.type === 'header') {
	    FieldGroup.push(headerTemplateCol1);
	  } else {
	    FieldGroup.push(controlCol1);
	  }
	
	  formlyModel.push({
	    className: 'row',
	    fieldGroup: FieldGroup
	  });
	};
	
	var addThreeColumnControl = function addThreeColumnControl(formlyModel, configurationModel, lineIndex) {
	  var control0 = _extends({}, configurationModel.lines[lineIndex].columns[0].control);
	  //text header is stored in "description" in templateOtion model
	  var headerTemplateCol0 = {
	    className: 'col-xs-4',
	    template: '\n    <div class="row">\n      <div class="">\n        <h2 class="text-center">\n          ' + extractTemplateOptionDescription(control0) + '\n        </h2>\n        <hr/>\n      </div>\n    </div>\n    '
	  };
	  var controlCol0 = {
	    className: 'col-xs-4',
	    type: control0 && control0.type && control0.type !== 'none' ? control0.type : 'blank',
	    key: control0 && control0.key ? control0.key : 'blank' + Date.now(),
	    templateOptions: {
	      type: extractTemplateOptionType(control0),
	      label: extractTemplateOptionLabel(control0),
	      required: extractTemplateOptionRequired(control0),
	      placeholder: extractTemplateOptionPlaceholder(control0),
	      description: extractTemplateOptionDescription(control0),
	      options: extractTemplateOptionOptions(control0)
	    },
	    defaultValue: extractDefaultValue(control0),
	    expressionProperties: extractFormlyExpressionProperties(control0),
	    validators: extractFormlyValidators(control0),
	    validation: extractFormlyValidation(control0)
	  };
	  //////////////////////////////////////////////
	  //datepicker additionnal particular property
	  //////////////////////////////////////////////
	  if (control0.type === 'datepicker') {
	    addDatepickerOptionsProperty(controlCol0, configurationModel, lineIndex);
	  }
	
	  var control1 = _extends({}, configurationModel.lines[lineIndex].columns[1].control);
	  var headerTemplateCol1 = {
	    className: 'col-xs-4',
	    template: '\n    <div class="row">\n      <div class="">\n        <h2 class="text-center">\n          ' + extractTemplateOptionDescription(control1) + '\n        </h2>\n        <hr/>\n      </div>\n    </div>\n    '
	  };
	  var controlCol1 = {
	    className: 'col-xs-4',
	    type: control1 && control1.type && control1.type !== 'none' ? control1.type : 'blank',
	    key: control1 && control1.key ? control1.key : 'blank' + Date.now(),
	    templateOptions: {
	      type: extractTemplateOptionType(control1),
	      label: extractTemplateOptionLabel(control1),
	      required: extractTemplateOptionRequired(control1),
	      placeholder: extractTemplateOptionPlaceholder(control1),
	      description: extractTemplateOptionDescription(control1),
	      options: extractTemplateOptionOptions(control1)
	    },
	    defaultValue: extractDefaultValue(control1),
	    expressionProperties: extractFormlyExpressionProperties(control1),
	    validators: extractFormlyValidators(control1),
	    validation: extractFormlyValidation(control1)
	  };
	  //////////////////////////////////////////////
	  //datepicker additionnal particular property
	  //////////////////////////////////////////////
	  if (control1.type === 'datepicker') {
	    addDatepickerOptionsProperty(controlCol1, configurationModel, lineIndex);
	  }
	
	  var control2 = _extends({}, configurationModel.lines[lineIndex].columns[2].control);
	  var headerTemplateCol2 = {
	    className: 'col-xs-4',
	    template: '\n    <div class="row">\n      <div class="">\n        <h2 class="text-center">\n          ' + extractTemplateOptionDescription(control2) + '\n        </h2>\n        <hr/>\n      </div>\n    </div>\n    '
	  };
	  var controlCol2 = {
	    className: 'col-xs-4',
	    type: control2 && control2.type && control2.type !== 'none' ? control2.type : 'blank',
	    key: control2 && control2.key ? control2.key : 'blank' + Date.now(),
	    templateOptions: {
	      type: extractTemplateOptionType(control2),
	      label: extractTemplateOptionLabel(control2),
	      required: extractTemplateOptionRequired(control2),
	      placeholder: extractTemplateOptionPlaceholder(control2),
	      description: extractTemplateOptionDescription(control2),
	      options: extractTemplateOptionOptions(control2)
	    },
	    defaultValue: extractDefaultValue(control2),
	    expressionProperties: extractFormlyExpressionProperties(control2),
	    validators: extractFormlyValidators(control2),
	    validation: extractFormlyValidation(control2)
	  };
	  //////////////////////////////////////////////
	  //datepicker additionnal particular property
	  //////////////////////////////////////////////
	  if (control2.type === 'datepicker') {
	    addDatepickerOptionsProperty(controlCol2, configurationModel, lineIndex);
	  }
	
	  var FieldGroup = [];
	
	  if (control0.type === 'header') {
	    FieldGroup.push(headerTemplateCol0);
	  } else {
	    FieldGroup.push(controlCol0);
	  }
	
	  if (control1.type === 'header') {
	    FieldGroup.push(headerTemplateCol1);
	  } else {
	    FieldGroup.push(controlCol1);
	  }
	
	  if (control2.type === 'header') {
	    FieldGroup.push(headerTemplateCol2);
	  } else {
	    FieldGroup.push(controlCol2);
	  }
	
	  formlyModel.push({
	    className: 'row',
	    fieldGroup: FieldGroup
	  });
	};
	
	var resetDataModel = function resetDataModel(obj) {
	  var emptyDataModel = {};
	  angular.copy(emptyDataModel, obj);
	  return true;
	};
	
	var resetFormlyModel = function resetFormlyModel(formlyModel) {
	  var resetformly = [];
	  angular.copy(resetformly, formlyModel);
	};
	
	exports.configurationModelInit = configurationModelInit;
	exports.configurationModelResult = configurationModelResult;
	exports.resetDataModel = resetDataModel;
	exports.resetFormlyModel = resetFormlyModel;
	exports.isTemplateOptionDefined = isTemplateOptionDefined;
	exports.extractTemplateOptionLabel = extractTemplateOptionLabel;
	exports.extractTemplateOptionDatepickerOptions = extractTemplateOptionDatepickerOptions;
	exports.extractDefaultValue = extractDefaultValue;
	exports.extractFormlyExpressionProperties = extractFormlyExpressionProperties;
	exports.extractFormlyValidators = extractFormlyValidators;
	exports.extractFormlyValidation = extractFormlyValidation;
	exports.extractTemplateOptionRequired = extractTemplateOptionRequired;
	exports.extractTemplateOptionOptions = extractTemplateOptionOptions;
	exports.extractTemplateOptionType = extractTemplateOptionType;
	exports.extractTemplateOptionPlaceholder = extractTemplateOptionPlaceholder;
	exports.extractTemplateOptionDescription = extractTemplateOptionDescription;
	exports.addDatepickerOptionsProperty = addDatepickerOptionsProperty;
	exports.addOneColumnControl = addOneColumnControl;
	exports.addTwoColumnControl = addTwoColumnControl;
	exports.addThreeColumnControl = addThreeColumnControl;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _formlyConfig = __webpack_require__(47);
	
	function formlyConfig(formlyConfigProvider) {
	  formlyConfigProvider.setType({
	    name: 'richEditor',
	    template: _formlyConfig.richTextTemplate.template,
	    wrapper: ['bootstrapLabel', 'bootstrapHasError']
	  });
	
	  formlyConfigProvider.setType({
	    name: 'blank',
	    template: _formlyConfig.blankTemplate.template
	  });
	
	  formlyConfigProvider.setType({
	    name: 'header',
	    template: _formlyConfig.headerTemplate.template
	  });
	
	  formlyConfigProvider.setType({
	    name: 'subTitle',
	    template: _formlyConfig.subTitleTemplate.template
	  });
	
	  formlyConfigProvider.setType({
	    name: 'basicSelect',
	    template: _formlyConfig.basicSelectTemplate.template,
	    wrapper: ['bootstrapLabel', 'bootstrapHasError']
	  });
	
	  formlyConfigProvider.setType({
	    name: 'groupedSelect',
	    template: _formlyConfig.groupedSelectTemplate.template,
	    wrapper: ['bootstrapLabel', 'bootstrapHasError']
	  });
	
	  // implement from : http://jsbin.com/koredu/edit?js,output
	  // formlyConfigProvider.setType({
	  //     name: 'upload',
	  //     extends: 'input',
	  //     wrapper: ['bootstrapLabel', 'bootstrapHasError'],
	  //     link: function(scope, el, attrs) {
	  //       el.on("change", function(changeEvent) {
	  //         var file = changeEvent.target.files[0];
	  //         if (file) {
	  //           // console.log('scope.id', scope.id);
	  //           var fd = new FormData();
	  //           // use key on backEnd
	  //           fd.append('uploadFile', file);
	  //           scope.$emit('fileToUpload', fd);
	  //           var fileProp = {};
	  //           for (var properties in file) {
	  //             if (!angular.isFunction(file[properties])) {
	  //               fileProp[properties] = file[properties];
	  //             }
	  //           }
	  //           scope.fc.$setViewValue(fileProp);
	  //         } else {
	  //           scope.fc.$setViewValue(undefined);
	  //         }
	  //       });
	  //       el.on("focusout", (focusoutEvent) => {
	  //         // dont run validation , user still opening pop up file dialog
	  //         if ($window.document.activeElement.id === scope.id) {
	  //           // so we set it untouched
	  //           scope.$apply(function(scope) {
	  //             scope.fc.$setUntouched();
	  //           });
	  //         } else {
	  //           // element losing focus so we trigger validation
	  //           scope.fc.$validate();
	  //         }
	  //       });
	  //     },
	  //     defaultOptions: {
	  //       templateOptions: {
	  //         type: 'file',
	  //         required: true
	  //       }
	  //     }
	  //   });
	
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
	    template: _formlyConfig.datepickerTemplate.template,
	    defaultOptions: {
	      ngModelAttrs: ngModelAttrs,
	      templateOptions: {
	        datepickerOptions: {
	          format: 'dd/MM/yyyy',
	          initDate: new Date(),
	          showWeeks: false
	        }
	      }
	    },
	    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
	    controller: ['$scope', function ($scope) {
	      $scope.datepicker = {};
	      // make sure the initial value is of type DATE!
	      var currentModelVal = $scope.model[$scope.options.key];
	      if (typeof currentModelVal == 'string') {
	        $scope.model[$scope.options.key] = new Date(currentModelVal);
	      }
	      $scope.datepicker.opened = false;
	      $scope.datepicker.open = function ($event) {
	        $event.preventDefault();
	        $event.stopPropagation();
	        $scope.datepicker.opened = !$scope.datepicker.opened;
	      };
	    }]
	  });
	
	  /**
	    * wrappers to show validation errors
	    * without having to rewrite formly types
	    */
	  formlyConfigProvider.setWrapper([{
	    template: _formlyConfig.validationTemplate.template
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
	
	formlyConfig.$inject = ['formlyConfigProvider'];
	
	exports.default = formlyConfig;

/***/ },
/* 47 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// tips: use some plugin like atom-typescript to highlight html templates inside backticks
	var richTextTemplate = exports.richTextTemplate = {
	  template: "\n  <text-angular\n    name=\"{{id}}\"\n    class=\"richTextAngular\"\n    ng-model=\"model[options.key || index]\">\n  </text-angular>\n  "
	};
	
	/* eslint-disable quotes */
	var blankTemplate = exports.blankTemplate = {
	  template: "<div></div>"
	};
	/* eslint-enable quotes */
	
	var headerTemplate = exports.headerTemplate = {
	  template: "\n    <div class=\"row\">\n      <div class=\"\">\n        <h2 class=\"text-center\">\n          {{ options.templateOptions.placeholder }}\n        </h2>\n        <hr/>\n      </div>\n    </div>\n    "
	};
	
	var subTitleTemplate = exports.subTitleTemplate = {
	  template: "\n    <div class=\"row\">\n      <div class=\"\">\n        <h4 class=\"text-center\">\n          {{ options.templateOptions.placeholder }}\n        </h4>\n        <hr/>\n      </div>\n    </div>\n    "
	};
	
	var basicSelectTemplate = exports.basicSelectTemplate = {
	  template: "\n    <ol\n      class=\"nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12\"\n      ng-model=\"model[options.key || index]\"\n      id=\"{{id}}\"\n      disabled=\"options.templateOptions.options.length === 0\">\n      <li\n        class=\"nya-bs-option\"\n        nya-bs-option=\"option in options.templateOptions.options\">\n        <a>\n          {{option.name}}\n        </a>\n      </li>\n    </ol>\n  "
	};
	
	var groupedSelectTemplate = exports.groupedSelectTemplate = {
	  template: "\n    <ol\n      class=\"nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12\"\n      ng-model=\"model[options.key || index]\"\n      data-live-search=\"true\"\n      disabled=\"options.templateOptions.options.length === 0\">\n      <li nya-bs-option=\"option in  options.templateOptions.options group by option.group\">\n        <span class=\"dropdown-header\">\n          {{$group}}\n        </span>\n        <a>\n          <span>\n            {{option.name}}\n          </span>\n          <span class=\"glyphicon glyphicon-ok check-mark\"></span>\n        </a>\n      </li>\n    </ol>\n    "
	};
	
	var datepickerTemplate = exports.datepickerTemplate = {
	  template: "\n    <p class=\"input-group\">\n      <span class=\"input-group-btn\">\n        <button\n          type=\"button\"\n          class=\"btn btn-default\"\n          ng-click=\"datepicker.open($event)\">\n          <i class=\"glyphicon glyphicon-calendar\"></i>\n        </button>\n      </span>\n      <input\n        type=\"text\"\n        id=\"{{::id}}\"\n        name=\"{{::id}}\"\n        ng-model=\"model[options.key]\"\n        class=\"form-control\"\n        ng-click=\"datepicker.open($event)\"\n        uib-datepicker-popup=\"{{to.datepickerOptions.format}}\"\n        is-open=\"datepicker.opened\"\n        datepicker-options=\"to.datepickerOptions\"\n      />\n    </p>\n  "
	};
	
	var validationTemplate = exports.validationTemplate = {
	  template: "\n    <div\n      class=\"formly-template-wrapper form-group\"\n      ng-class=\"{'has-error': options.validation.errorExistsAndShouldBeVisible}\">\n      <formly-transclude></formly-transclude>\n      <div\n        class=\"validation\"\n        ng-if=\"options.validation.errorExistsAndShouldBeVisible\"\n        ng-messages=\"options.formControl.$error\">\n        <div ng-messages-include=\"validation.html\"></div>\n        <div\n          ng-message=\"{{::name}}\"\n          ng-repeat=\"(name, message) in ::options.validation.messages\">\n          {{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}\n        </div>\n      </div>\n    </div>\n  "
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = {
		"name": "easy-form-generator",
		"version": "2.1.6",
		"description": "create amazing forms without coding : form editor based on angular formly",
		"scripts": {
			"clean-dist": "rimraf dist",
			"build-dev-stepway": "webpack --bail --progress --profile --config webpack.config.stepway.js",
			"build-dev-formviewer": "webpack --bail --progress --profile --config webpack.config.formviewer.js",
			"build-dev-dragdropway": "webpack --bail --progress --profile --config webpack.config.dragdropway.js",
			"build-prod-stepway": "webpack --bail --progress --profile --config webpack.config.stepway.js",
			"build-prod-formviewer": "webpack --bail --progress --profile --config webpack.config.formviewer.js",
			"build-prod-dragdropway": "webpack --bail --progress --profile --config webpack.config.dragdropway.js",
			"server": "webpack-dev-server --history-api-fallback --inline --progress",
			"test": "karma start",
			"test-watch": "karma start --auto-watch --no-single-run",
			"start": "npm run server"
		},
		"repository": {
			"type": "git",
			"url": "git+https://github.com/MacKentoch/easyFormGenerator.git"
		},
		"keywords": [
			"angular",
			"formly",
			"form",
			"angular js",
			"angular formly",
			"bootstrap",
			"form generator"
		],
		"author": "Erwan DATIN (MacKentoch)",
		"license": "MIT",
		"bugs": {
			"url": "https://github.com/MacKentoch/easyFormGenerator/issues"
		},
		"dependencies": {
			"angular": "^1.5.0",
			"angular-formly": "6.8.2",
			"angular-formly-templates-bootstrap": "4.3.2",
			"angular-wizard": "^0.10.0",
			"api-check": "^7.5.5"
		},
		"devDependencies": {
			"angular-mocks": "^1.5.0",
			"autoprefixer": "^6.0.3",
			"babel-cli": "^6.24.1",
			"babel-core": "^6.2.1",
			"babel-eslint": "^7.1.1",
			"babel-loader": "^6.2.0",
			"babel-preset-es2015": "^6.18.0",
			"babel-preset-flow": "^6.23.0",
			"babel-preset-stage-2": "^6.18.0",
			"copy-webpack-plugin": "^4.0.1",
			"css-loader": "^0.26.1",
			"eslint": "^3.12.2",
			"eslint-config-angular": "^0.5.0",
			"eslint-plugin-angular": "^1.6.1",
			"eslint-plugin-import": "^2.2.0",
			"eslint-plugin-jasmine": "^2.2.0",
			"extract-text-webpack-plugin": "^1.0.1",
			"file-loader": "^0.9.0",
			"flow-bin": "^0.45.0",
			"html-webpack-plugin": "^2.7.1",
			"istanbul-instrumenter-loader": "^1.0.0",
			"jasmine-core": "^2.3.4",
			"json-loader": "^0.5.4",
			"karma": "^1.1.0",
			"karma-coverage": "^1.0.0",
			"karma-jasmine": "^1.0.2",
			"karma-phantomjs-launcher": "^1.0.0",
			"karma-sourcemap-loader": "^0.3.7",
			"karma-spec-reporter": "0.0.26",
			"karma-webpack": "^1.7.0",
			"node-libs-browser": "^2.0.0",
			"node-sass": "^4.1.1",
			"null-loader": "^0.1.1",
			"phantomjs-prebuilt": "^2.1.4",
			"postcss-loader": "^1.1.1",
			"raw-loader": "^0.5.1",
			"remove-flow-types-loader": "^1.0.0",
			"rimraf": "^2.5.1",
			"sass-loader": "^4.1.1",
			"style-loader": "^0.13.0",
			"webpack": "^1.12.13",
			"webpack-dev-server": "^1.14.1"
		}
	};

/***/ },
/* 49 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=eda.easyFormViewer.js.map