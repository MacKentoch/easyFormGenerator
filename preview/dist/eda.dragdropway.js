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
	
	__webpack_require__(10);

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
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _edaDragDropWayFormlyConfig = __webpack_require__(11);
	
	var _edaDragDropWayFormlyConfig2 = _interopRequireDefault(_edaDragDropWayFormlyConfig);
	
	var _edaDragDropWayDragDropConfig = __webpack_require__(12);
	
	var _edaDragDropWayDragDropConfig2 = _interopRequireDefault(_edaDragDropWayDragDropConfig);
	
	var _edaDragDropWayCore = __webpack_require__(14);
	
	var _edaDragDropWayCore2 = _interopRequireDefault(_edaDragDropWayCore);
	
	var _edaDragDropWayLeftPanel = __webpack_require__(15);
	
	var _edaDragDropWayLeftPanel2 = _interopRequireDefault(_edaDragDropWayLeftPanel);
	
	var _edaDragDropWayFormlyProxyFormFieldManage = __webpack_require__(49);
	
	var _edaDragDropWayFormlyProxyFormFieldManage2 = _interopRequireDefault(_edaDragDropWayFormlyProxyFormFieldManage);
	
	var _edaDragDropWayDragdrop = __webpack_require__(53);
	
	var _edaDragDropWayDragdrop2 = _interopRequireDefault(_edaDragDropWayDragdrop);
	
	var _edaDragDropWayRightClick = __webpack_require__(67);
	
	var _edaDragDropWayRightClick2 = _interopRequireDefault(_edaDragDropWayRightClick);
	
	var _edaDragDropWayConfigurationModelProxy = __webpack_require__(70);
	
	var _edaDragDropWayConfigurationModelProxy2 = _interopRequireDefault(_edaDragDropWayConfigurationModelProxy);
	
	var _dragAndDropList = __webpack_require__(72);
	
	var _dragAndDropList2 = _interopRequireDefault(_dragAndDropList);
	
	var _pageslide = __webpack_require__(75);
	
	var _pageslide2 = _interopRequireDefault(_pageslide);
	
	var _edaDragDropWayEdaDragdropWayEasyFormGen = __webpack_require__(77);
	
	var _edaDragDropWayEdaDragdropWayEasyFormGen2 = _interopRequireDefault(_edaDragDropWayEdaDragdropWayEasyFormGen);
	
	var _edaDragDropWayTrustThis = __webpack_require__(84);
	
	var _edaDragDropWayTrustThis2 = _interopRequireDefault(_edaDragDropWayTrustThis);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DRAG_DROP_WAY_MODULE_NAME = 'eda.easyformGen.dragDropWay';
	
	var DRAG_DROP_MODULES_INJECT = [_edaDragDropWayCore2.default.name, _edaDragDropWayConfigurationModelProxy2.default.name, _edaDragDropWayTrustThis2.default.name, _edaDragDropWayLeftPanel2.default.name, _edaDragDropWayFormlyProxyFormFieldManage2.default.name, _edaDragDropWayDragdrop2.default.name, _edaDragDropWayEdaDragdropWayEasyFormGen2.default.name, _edaDragDropWayRightClick2.default.name, _dragAndDropList2.default.name, _pageslide2.default.name];
	
	var mainModule = angular.module(DRAG_DROP_WAY_MODULE_NAME, DRAG_DROP_MODULES_INJECT).config(_edaDragDropWayDragDropConfig2.default).config(_edaDragDropWayFormlyConfig2.default).value(_edaDragDropWayDragDropConfig.EASY_FORM_DD_VERSION_NAME, _edaDragDropWayDragDropConfig.EASY_FORM_DD_VERSION_VALUE);
	
	exports.default = mainModule;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function formlyConfig(formlyConfigProvider, EasyFormGenFormlyBindingModelsProvider, easyFormDragWayConfigProvider) {
	
	  formlyConfigProvider.setType({
	    name: 'blank',
	    template: '<div></div>'
	  });
	
	  EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList({
	    id: 'empty',
	    name: 'no control',
	    subtitle: 'no control',
	    group: 'Blank',
	    formlyType: 'blank',
	    formlySubtype: '',
	    formlyLabel: '',
	    formlyRequired: false,
	    formlyDescription: '',
	    formlyOptions: []
	  });
	
	  easyFormDragWayConfigProvider.addControlToDragDropPresentationModel({
	    label: '<div class="col-md-12">\n          <div class="form-group">\n            <div class="">\n            </div>\n          </div>\n      </div>',
	    control: 'empty',
	    cssClass: 'col-xs-12'
	  }, {
	    addToGroupCtrl: 'blank'
	  });
	
	  EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList({
	    id: 'Header',
	    name: 'Header',
	    subtitle: 'no control',
	    group: 'Decoration',
	    formlyType: 'header',
	    formlySubtype: '',
	    formlyLabel: '',
	    formlyRequired: false,
	    formlyDescription: '',
	    formlyOptions: []
	  });
	
	  easyFormDragWayConfigProvider.addControlToDragDropPresentationModel({
	    label: ['<div class="col-md-12">\n          <div class="form-group">\n            <div class="">\n              <h2 class="text-center">Header</h2>\n              <hr/>\n            </div>\n          </div>\n      </div>'].join(''),
	    control: 'Header',
	    cssClass: 'col-xs-12'
	  }, {
	    addToGroupCtrl: 'headers'
	  });
	
	  var subTitleTemplate = '\n    <div class="row">\n      <div class="">\n        <h4 class="text-center">{{options.templateOptions.placeholder}}<h4>\n        <hr/>\n      </div>\n    </div>';
	
	  formlyConfigProvider.setType({
	    name: 'subTitle',
	    template: subTitleTemplate
	  });
	
	  EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList({
	    id: 'Subtitle',
	    name: 'Subtitle',
	    subtitle: 'no control',
	    group: 'Decoration',
	    formlyType: 'subTitle',
	    formlySubtype: '',
	    formlyLabel: '',
	    formlyRequired: false,
	    formlyDescription: '',
	    formlyOptions: []
	  });
	
	  easyFormDragWayConfigProvider.addControlToDragDropPresentationModel({
	    'label': '<div class="col-md-12">\n          <div class="form-group">\n            <div class="">\n              <h4 class="text-center">SubTitle</h4>\n              <hr/>\n            </div>\n          </div>\n      </div>',
	    'control': 'Subtitle',
	    'cssClass': 'col-xs-12'
	  }, {
	    addToGroupCtrl: 'headers'
	  });
	
	  EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList({
	    id: 'TextInput',
	    name: 'Text input',
	    subtitle: 'Text input',
	    group: 'input',
	    formlyType: 'input',
	    formlySubtype: '',
	    formlyLabel: '',
	    formlyRequired: false,
	    formlyDescription: '',
	    formlyOptions: []
	  });
	
	  /**
	   * drag and drop text input (basic) control template
	   *
	    *
	    * @PARAM 1 : control template object (drag an drop)
	    * @PARAM 2 : object to indicates in which group of control it will be inserted
	    *  					(related to _dragDropConfigModel.containerConfig.decoration in dragDropConfig provider)
	    */
	  easyFormDragWayConfigProvider.addControlToDragDropPresentationModel({
	    'label': '<div class="col-md-12">\n          <div class="form-group">\n            <label for="inputText" class="control-label textControlLabel pull-left">\n              title for text input<span class="textControlLabel ng-scope">*</span>\n            </label>\n            <div class="">\n              <input type="text" disabled class="form-control fakeControl" id="inputText" placeholder="basic input">\n              <p class="help-block pull-left">Description</p>\n            </div>\n          </div>\n        </div>',
	    'control': 'TextInput',
	    'cssClass': 'col-xs-12'
	  }, {
	    addToGroupCtrl: 'inputs'
	  });
	
	  /**
	   * Add text input (Password)
	   *
	    * note : formly template already exists
	    * no need to create a custom one
	    *
	    * just declare in EasyFormGenFormlyBindingModelsProvider
	    */
	  EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList({
	    id: 'Password',
	    name: 'Password',
	    subtitle: 'Password',
	    group: 'input',
	    formlyType: 'input',
	    formlySubtype: 'password',
	    formlyLabel: '',
	    formlyRequired: false,
	    formlyDescription: '',
	    formlyOptions: []
	  });
	  /**
	   * drag and drop text input — password —control template
	   *
	    *
	    * @PARAM 1 : control template object (drag an drop)
	    * @PARAM 2 : object to indicates in which group of control it will be inserted
	    *  					(related to _dragDropConfigModel.containerConfig.decoration in dragDropConfig provider)
	    */
	  easyFormDragWayConfigProvider.addControlToDragDropPresentationModel({
	    'label': '<div class="col-md-12">\n          <div class="form-group">\n            <label for="inputPass" class="control-label textControlLabel ng-binding pull-left">\n            title for password input<span class="textControlLabel ng-scope">*</span>\n            </label>\n            <div class="">\n              <input type="password" disabled class="form-control fakeControl" id="inputPass" placeholder="password input">\n              <p class="help-block ng-binding pull-left">Description</p>\n            </div>\n          </div>\n        </div>',
	    'control': 'Password',
	    'cssClass': 'col-xs-12'
	  }, {
	    addToGroupCtrl: 'inputs'
	  });
	
	  /**
	   * Add angular UI date picker
	   *
	    * thx Kent C. Dodds for formly config template (since it was a huge config)
	    */
	  var attributes = ['date-disabled', 'custom-class', 'show-weeks', 'starting-day', 'init-date', 'min-mode', 'max-mode', 'format-day', 'format-month', 'format-year', 'format-day-header', 'format-day-title', 'format-month-title', 'year-range', 'shortcut-propagation', 'uib-datepicker-popup', 'show-button-bar', 'current-text', 'clear-text', 'close-text', 'close-on-date-selection', 'datepicker-append-to-body'];
	
	  var bindings = ['datepicker-mode', 'min-date', 'max-date'];
	
	  var ngModelAttrs = {};
	
	  angular.forEach(attributes, function (attr) {
	    return ngModelAttrs[camelize(attr)] = { attribute: attr };
	  });
	  angular.forEach(bindings, function (binding) {
	    return ngModelAttrs[camelize(binding)] = { bound: binding };
	  });
	
	  function camelize(string) {
	    string = string.replace(/[\-_\s]+(.)?/g, function (match, chr) {
	      return chr ? chr.toUpperCase() : '';
	    });
	    // Ensure 1st char is always lowercase
	    return string.replace(/^([A-Z])/, function (match, chr) {
	      return chr ? chr.toLowerCase() : '';
	    });
	  }
	
	  var angularUIDatePickerTemplate = '\n    <input\n      id="{{id}}"\n      class="form-control"\n      ng-click="open($event)"\n      uib-datepicker-popup\n      ng-model="model[options.key || index]" is-open="to.isOpen"\n      ng-click="to.isOpen = true"\n      datepicker-options="to.datepickerOptions"/>';
	
	  formlyConfigProvider.setType({
	    name: 'datepicker',
	    template: angularUIDatePickerTemplate,
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
	          class: 'glyphicon glyphicon-calendar',
	          onClick: function onClick(options) {
	            return options.templateOptions.isOpen = !options.templateOptions.isOpen;
	          }
	        },
	        onFocus: function onFocus($viewValue, $modelValue, scope) {
	          return scope.to.isOpen = !scope.to.isOpen;
	        },
	        datepickerOptions: {}
	      }
	    }
	  });
	
	  EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList({
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
	    datepickerPopup: 'dd-MMMM-yyyy'
	  });
	  /**
	   * drag and drop text input — date — control template (using angular UI datepicker)
	   *
	    *
	    * @PARAM 1 : control template object (drag an drop)
	    * @PARAM 2 : object to indicates in which group of control it will be inserted
	    *  					(related to _dragDropConfigModel.containerConfig.decoration in dragDropConfig provider)
	    */
	  easyFormDragWayConfigProvider.addControlToDragDropPresentationModel({
	    label: '\n    <div class="col-md-12">\n      <div class="form-group">\n        <label for="inputDate" class="control-label textControlLabel ng-binding pull-left">\n         title for date input<span class="textControlLabel ng-scope">*</span>\n        </label>\n        <div class="col-xs-12 col-sm-12 col-md-12 demoddDatepicker">\n\t\t\t\t\t<div class="input-group">\n  \t\t\t\t\t<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>\n  \t\t\t\t\t<input type="text" disabled class="form-control fakeControl">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n        <p class="help-block pull-left">description</p>\n      </div>\n     </div>',
	    control: 'Date',
	    cssClass: 'col-xs-12'
	  }, {
	    addToGroupCtrl: 'inputs'
	  });
	
	  /**
	   * Add textarea
	   *
	    * note : formly template already exists
	    * no need to create a custom one
	    *
	    * just declare in EasyFormGenFormlyBindingModelsProvider
	    */
	  EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList({
	    id: 'Texarea',
	    name: 'Textarea',
	    subtitle: 'Textarea',
	    group: 'Textarea',
	    formlyType: 'textarea',
	    formlySubtype: '',
	    formlyLabel: '',
	    formlyRequired: false,
	    formlyDescription: '',
	    formlyOptions: []
	  });
	  /**
	   * drag and drop textarea control template
	   *
	    *
	    * @PARAM 1 : control template object (drag an drop)
	    * @PARAM 2 : object to indicates in which group of control it will be inserted
	    *  					(related to _dragDropConfigModel.containerConfig.decoration in dragDropConfig provider)
	    */
	  easyFormDragWayConfigProvider.addControlToDragDropPresentationModel({
	    'label': '\n      <div class="col-md-12">\n          <div class="form-group">\n            <label for="textArea" class="control-label\n      \t\t\t\t\t\t\ttextControlLabel pull-left">title for textarea <span class="textControlLabel">*</span></label>\n            <div class="">\n              <textarea disabled class="form-control dragItemtextarea fakeControl" ng-model="model[options.key]" rows="1" id="textArea"></textarea>\n              <p class="help-block pull-left">description</p>\n            </div>\n          </div>\n      </div>',
	    'control': 'Texarea',
	    'cssClass': 'col-xs-12'
	  }, {
	    addToGroupCtrl: 'textareas'
	  });
	
	  /**
	   * Add rich text editor control (using textAngular)
	   *
	   */
	  var richTexEditorTemplate = '\n    <text-angular name="{{id}}"\n                  class="richTextAngular"\n                  ng-model="model[options.key || index]">\n    </text-angular>';
	
	  formlyConfigProvider.setType({
	    name: 'richEditor',
	    template: richTexEditorTemplate
	  });
	
	  EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList({
	    id: 'RichTextEditor',
	    name: 'RichTextEditor',
	    subtitle: 'RichTextEditor',
	    group: 'Textarea',
	    formlyType: 'richEditor',
	    formlySubtype: '',
	    formlyLabel: '',
	    formlyRequired: false,
	    formlyDescription: '',
	    formlyOptions: []
	  });
	  /**
	   * drag and drop rich text editor control template (using textAngular)
	   *
	    *
	    * @PARAM 1 : control template object (drag an drop)
	    * @PARAM 2 : object to indicates in which group of control it will be inserted
	    *  					(related to _dragDropConfigModel.containerConfig.decoration in dragDropConfig provider)
	    */
	  easyFormDragWayConfigProvider.addControlToDragDropPresentationModel({
	    label: '\n      <div class="col-md-12">\n          <div class="form-group">\n            <label for="textArea" class="control-label\n      \t\t\t\t\t\t\ttextControlLabel pull-left">title for rich text editor <span class="textControlLabel">*</span></label>\n            <div class="">\n              <textarea disabled class="form-control dragItemtextarea fakeControl" ng-model="model[options.key]" rows="1" id="textArea"></textarea>\n              <p class="help-block">description</p>\n            </div>\n          </div>\n      </div>',
	    control: 'RichTextEditor',
	    cssClass: 'col-xs-12'
	  }, {
	    addToGroupCtrl: 'textareas'
	  });
	
	  /**
	   * Add radio
	   *
	    * note : formly template already exists
	    * no need to create a custom one
	    *
	    * just declare in EasyFormGenFormlyBindingModelsProvider
	    */
	  EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList({
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
	    formlyOptions: []
	  });
	  /**
	   * drag and drop radio control template (using textAngular)
	   *
	    *
	    * @PARAM 1 : control template object (drag an drop)
	    * @PARAM 2 : object to indicates in which group of control it will be inserted
	    *  					(related to _dragDropConfigModel.containerConfig.decoration in dragDropConfig provider)
	    */
	  easyFormDragWayConfigProvider.addControlToDragDropPresentationModel({
	    'label': '\n      <div class="col-md-12">\n        <div class="form-group">\n          <label for="vertRadio" class="control-label textControlLabel pull-left">title for radio <span class="textControlLabel">*</span></label>\n          <div class="interligne"></div>\n          <div class="pull-left">\n            <div class="radio">\n              <label class="fakeCheck">\n                <input type="radio" disabled name="optionsRadios" class="fakeCheck" id="optionsRadio-0" value="verticalRadio0" checked="">\n                option1\n              </label>\n            </div>\n            <div class="radio">\n              <label class="fakeCheck">\n                <input type="radio" disabled name="optionsRadios" class="fakeCheck"  id="optionsRadio-1" value="verticalRadio1" checked="">\n                option2\n              </label>\n            </div>\n            <p class="help-block pull-left">description</p>\n          </div>\n        </div>\n      </div>',
	    'control': 'Radio',
	    'cssClass': 'col-xs-12'
	  }, {
	    addToGroupCtrl: 'radios'
	  });
	
	  /**
	   * Add checkbox
	   *
	    * note : formly template already exists
	    * no need to create a custom one
	    *
	    * just declare in EasyFormGenFormlyBindingModelsProvider
	    */
	  EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList({
	    id: 'Checkbox',
	    name: 'Checkbox',
	    subtitle: 'Checkbox',
	    group: 'Checkbox',
	    formlyType: 'checkbox',
	    formlySubtype: '',
	    formlyLabel: '',
	    formlyRequired: false,
	    formlyDescription: '',
	    formlyOptions: []
	  });
	  /**
	   * drag and drop checkbox control template (using textAngular)
	   *
	    *
	    * @PARAM 1 : control template object (drag an drop)
	    * @PARAM 2 : object to indicates in which group of control it will be inserted
	    *  					(related to _dragDropConfigModel.containerConfig.decoration in dragDropConfig provider)
	    */
	  easyFormDragWayConfigProvider.addControlToDragDropPresentationModel({
	    label: '\n    <div class="col-md-12">\n      <div class="checkbox">\n        <label class="fakeCheck">\n          <input type="checkbox" disabled class="fakeCheck" id="checkBox">\n      \t\t<span class="blackText ng-binding">label for checkbox </span>\n      \t\t<span class="textControlLabel ng-scope">*</span>\n        </label>\n      </div>\n      <p class="help-block ng-binding">description</p>\n    </div>',
	    control: 'Checkbox',
	    cssClass: 'col-xs-12'
	  }, {
	    addToGroupCtrl: 'checkboxes'
	  });
	
	  /**
	   * Add basic Select control
	   *
	    * using nya-bs-select
	    */
	  var basicSelectTemplate = '\n   <ol class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12"\n  \t\tng-model="model[options.key || index]"\n  \t\tid="{{id}}"\n  \t\tdisabled="options.templateOptions.options.length === 0">\n     <li class="nya-bs-option" nya-bs-option="option in options.templateOptions.options">\n       <a>{{option.name}}</a>\n     </li>\n   </ol> ';
	
	  formlyConfigProvider.setType({
	    name: 'basicSelect',
	    template: basicSelectTemplate
	  });
	
	  EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList({
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
	    formlyOptions: []
	  });
	
	  /**
	   * drag and drop basic select control template (using textAngular)
	   *
	    *
	    * @PARAM 1 : control template object (drag an drop)
	    * @PARAM 2 : object to indicates in which group of control it will be inserted
	    *  					(related to _dragDropConfigModel.containerConfig.decoration in dragDropConfig provider)
	    */
	  easyFormDragWayConfigProvider.addControlToDragDropPresentationModel({
	    label: '\n      <div class="col-md-12">\n        <div class="form-group">\n      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 selectfordemo">\n\n      <ol class="nya-bs-select col-xs-12 col-sm-12 col-md-12 col-lg-12 ng-valid btn-group ng-dirty ng-valid-parse ng-touched"\n      \tng-model="fakeModelNyaSelectBasic"\n      \tdata-live-search="false">\n\n         <button class="btn btn-default dropdown-toggle" disabled type="button">\n      \t\t <span class="pull-left filter-option">\n      \t\t\t <span class="ng-binding">Basic select</span>\n      \t\t</span>\n      \t\t&nbsp;<span class="caret"></span>\n        </button>\n\n      </div>\n      </div>',
	    control: 'BasicSelect',
	    cssClass: 'col-xs-12'
	  }, {
	    addToGroupCtrl: 'selects'
	  });
	
	  /**
	   * Add Grouped Select control
	   *
	    * using nya-bs-select
	    */
	  var groupedSelectTemplate = '\n  <ol class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12"\n\t\t   ng-model="model[options.key || index]"\n      data-live-search="true"\n      disabled="options.templateOptions.options.length === 0">\n      <li nya-bs-option="option in  options.templateOptions.options group by option.group">\n        <span class="dropdown-header">{{$group}}</span>\n        <a>\n          <span>{{option.name}}</span>\n          <span class="glyphicon glyphicon-ok check-mark"></span>\n        </a>\n      </li>\n  </ol>';
	
	  formlyConfigProvider.setType({
	    name: 'groupedSelect',
	    template: groupedSelectTemplate
	  });
	
	  EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList({
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
	    formlyOptions: []
	  });
	  /**
	   * drag and drop grouped select control template (using textAngular)
	   *
	    *
	    * @PARAM 1 : control template object (drag an drop)
	    * @PARAM 2 : object to indicates in which group of control it will be inserted
	    *  					(related to _dragDropConfigModel.containerConfig.decoration in dragDropConfig provider)
	    */
	  easyFormDragWayConfigProvider.addControlToDragDropPresentationModel({
	    label: '\n      <div class="col-md-12">\n          <div class="form-group">\n      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 selectfordemo">\n      <ol class="nya-bs-select col-xs-12 col-sm-12 col-md-12 col-lg-12 ng-valid btn-group ng-dirty ng-valid-parse ng-touched"\n      \tng-model="fakeModelNyaSelectBasic"\n      \tdata-live-search="false">\n         <button class="btn btn-default dropdown-toggle" disabled type="button">\n      \t\t <span class="pull-left filter-option">\n      \t\t\t <span class="ng-binding">Grouped select</span>\n      \t\t</span>\n      \t\t&nbsp;<span class="caret"></span>\n      </button>\n      </div>\n      </div>',
	    control: 'GroupedSelect',
	    cssClass: 'col-xs-12'
	  }, {
	    addToGroupCtrl: 'selects'
	  });
	}
	
	formlyConfig.$inject = ['formlyConfigProvider', 'EasyFormGenFormlyBindingModelsProvider', 'easyFormDragWayConfigProvider'];
	
	exports.default = formlyConfig;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EASY_FORM_DD_VERSION_VALUE = exports.EASY_FORM_DD_VERSION_NAME = undefined;
	
	var _package = __webpack_require__(13);
	
	var _package2 = _interopRequireDefault(_package);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var EASY_FORM_DD_VERSION_NAME = 'easyFormGenVersion';
	var EASY_FORM_DD_VERSION_VALUE = _package2.default.version;
	
	function dragDropConfigFunct(easyFormDragWayConfigProvider) {
	  easyFormDragWayConfigProvider.setItemsNotTocount({
	    //placeholder :         '',
	    itemBeingDragged: 'dndDraggingSource'
	  });
	}
	
	dragDropConfigFunct.$inject = ['easyFormDragWayConfigProvider'];
	
	exports.default = dragDropConfigFunct;
	exports.EASY_FORM_DD_VERSION_NAME = EASY_FORM_DD_VERSION_NAME;
	exports.EASY_FORM_DD_VERSION_VALUE = EASY_FORM_DD_VERSION_VALUE;

/***/ },
/* 13 */
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
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var CORE_MODULES = ['textAngular', 'textAngularSetup', 'ngAnimate', 'toaster', 'formly', 'formlyBootstrap', 'ui.bootstrap', 'nya.bootstrap.select', 'mgcrea.ngStrap.affix'
	// 'pascalprecht.translate'	
	];
	
	exports.default = angular.module('easyFormGen.dragDropWay.core', CORE_MODULES);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _edaDragDropWayLeftPanel = __webpack_require__(16);
	
	var _edaDragDropWayLeftPanel2 = _interopRequireDefault(_edaDragDropWayLeftPanel);
	
	var _edaDragDropWayLeftPanel3 = __webpack_require__(18);
	
	var _edaDragDropWayLeftPanel4 = _interopRequireDefault(_edaDragDropWayLeftPanel3);
	
	var _edaDragDropWayLeftPanelSelectOptionManage = __webpack_require__(20);
	
	var _edaDragDropWayLeftPanelSelectOptionManage2 = _interopRequireDefault(_edaDragDropWayLeftPanelSelectOptionManage);
	
	var _edaDragDropWayLeftPanelControllerModalProxy = __webpack_require__(22);
	
	var _edaDragDropWayLeftPanelControllerModalProxy2 = _interopRequireDefault(_edaDragDropWayLeftPanelControllerModalProxy);
	
	var _edaDragDropWayLeftpanelValidEditFooter = __webpack_require__(23);
	
	var _edaDragDropWayLeftpanelValidEditFooter2 = _interopRequireDefault(_edaDragDropWayLeftpanelValidEditFooter);
	
	var _edaDragDropWayLeftpanelTextInputControl = __webpack_require__(25);
	
	var _edaDragDropWayLeftpanelTextInputControl2 = _interopRequireDefault(_edaDragDropWayLeftpanelTextInputControl);
	
	var _edaDragDropWayLeftpanelTextareaControl = __webpack_require__(27);
	
	var _edaDragDropWayLeftpanelTextareaControl2 = _interopRequireDefault(_edaDragDropWayLeftpanelTextareaControl);
	
	var _edaDragDropWayLeftpanelSubtitleControl = __webpack_require__(29);
	
	var _edaDragDropWayLeftpanelSubtitleControl2 = _interopRequireDefault(_edaDragDropWayLeftpanelSubtitleControl);
	
	var _edaDragDropWayLeftpanelRichTextEditorControl = __webpack_require__(31);
	
	var _edaDragDropWayLeftpanelRichTextEditorControl2 = _interopRequireDefault(_edaDragDropWayLeftpanelRichTextEditorControl);
	
	var _edaDragDropWayLeftpanelRadioControl = __webpack_require__(33);
	
	var _edaDragDropWayLeftpanelRadioControl2 = _interopRequireDefault(_edaDragDropWayLeftpanelRadioControl);
	
	var _edaDragDropWayLeftpanelPasswordControl = __webpack_require__(35);
	
	var _edaDragDropWayLeftpanelPasswordControl2 = _interopRequireDefault(_edaDragDropWayLeftpanelPasswordControl);
	
	var _edaDragDropWayLeftpanelHeaderControl = __webpack_require__(37);
	
	var _edaDragDropWayLeftpanelHeaderControl2 = _interopRequireDefault(_edaDragDropWayLeftpanelHeaderControl);
	
	var _edaDragDropWayLeftpanelGroupedSelectControl = __webpack_require__(39);
	
	var _edaDragDropWayLeftpanelGroupedSelectControl2 = _interopRequireDefault(_edaDragDropWayLeftpanelGroupedSelectControl);
	
	var _edaDragDropWayLeftpanelDateControl = __webpack_require__(41);
	
	var _edaDragDropWayLeftpanelDateControl2 = _interopRequireDefault(_edaDragDropWayLeftpanelDateControl);
	
	var _edaDragDropWayLeftpanelCheckBoxControl = __webpack_require__(43);
	
	var _edaDragDropWayLeftpanelCheckBoxControl2 = _interopRequireDefault(_edaDragDropWayLeftpanelCheckBoxControl);
	
	var _edaDragDropWayLeftpanelBlankControl = __webpack_require__(45);
	
	var _edaDragDropWayLeftpanelBlankControl2 = _interopRequireDefault(_edaDragDropWayLeftpanelBlankControl);
	
	var _edaDragDropWayLeftpanelBasicSelectControl = __webpack_require__(47);
	
	var _edaDragDropWayLeftpanelBasicSelectControl2 = _interopRequireDefault(_edaDragDropWayLeftpanelBasicSelectControl);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LEFT_PANEL_MODULE = 'edaDragDropWay.leftPanel.module'; /* global angular */
	exports.default = angular.module(LEFT_PANEL_MODULE, []).directive(_edaDragDropWayLeftPanel3.LEFT_PANEL_DIRECTIVE, _edaDragDropWayLeftPanel4.default).controller(_edaDragDropWayLeftPanel.LEFT_PANEL_CONTROLLER, _edaDragDropWayLeftPanel2.default).service(_edaDragDropWayLeftPanelSelectOptionManage.LEFT_PANEL_SELECT_OPTION_MANAGE_SERVICE, _edaDragDropWayLeftPanelSelectOptionManage2.default).service(_edaDragDropWayLeftPanelControllerModalProxy.CONTROLLER_MODAL_PROXY, _edaDragDropWayLeftPanelControllerModalProxy2.default).directive(_edaDragDropWayLeftpanelValidEditFooter.LEFT_PANEL_VALID_EDIT_FOOTER_DIRECTIVE, _edaDragDropWayLeftpanelValidEditFooter2.default).directive(_edaDragDropWayLeftpanelTextInputControl.LEFT_PANEL_TEXT_INPUT_CONTROL_DIRECTIVE, _edaDragDropWayLeftpanelTextInputControl2.default).directive(_edaDragDropWayLeftpanelTextareaControl.LEFT_PANEL_TEXTAREA_CONTROL_DIRECTIVE, _edaDragDropWayLeftpanelTextareaControl2.default).directive(_edaDragDropWayLeftpanelSubtitleControl.LEFT_PANEL_SUBTITLE_CONTROL_DIRECTIVE, _edaDragDropWayLeftpanelSubtitleControl2.default).directive(_edaDragDropWayLeftpanelRichTextEditorControl.LEFT_PANEL_RICH_TEXT_EDITOR_CONTROL_DIRECTIVE, _edaDragDropWayLeftpanelRichTextEditorControl2.default).directive(_edaDragDropWayLeftpanelRadioControl.LEFT_PANEL_RADIO_CONTROL_DIRECTIVE, _edaDragDropWayLeftpanelRadioControl2.default).directive(_edaDragDropWayLeftpanelPasswordControl.LEFT_PANEL_PASSWORD_CONTROL_DIRECTIVE, _edaDragDropWayLeftpanelPasswordControl2.default).directive(_edaDragDropWayLeftpanelHeaderControl.LEFT_PANEL_HEADER_CONTROL_DIRECTIVE, _edaDragDropWayLeftpanelHeaderControl2.default).directive(_edaDragDropWayLeftpanelGroupedSelectControl.LEFT_PANEL_GROUPED_SELECT_CONTROL_DIRECTIVE, _edaDragDropWayLeftpanelGroupedSelectControl2.default).directive(_edaDragDropWayLeftpanelDateControl.LEFT_PANEL_DATE_CONTROL_DIRECTIVE, _edaDragDropWayLeftpanelDateControl2.default).directive(_edaDragDropWayLeftpanelCheckBoxControl.LEFT_PANEL_CHECKBOX_CONTROL_DIRECTIVE, _edaDragDropWayLeftpanelCheckBoxControl2.default).directive(_edaDragDropWayLeftpanelBlankControl.LEFT_PANEL_BLANK_CONTROL_DIRECTIVE, _edaDragDropWayLeftpanelBlankControl2.default).directive(_edaDragDropWayLeftpanelBasicSelectControl.LEFT_PANEL_BASIC_SELECT_CONTROL_DIRECTIVE, _edaDragDropWayLeftpanelBasicSelectControl2.default);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.LEFT_PANEL_CONTROLLERAS = exports.LEFT_PANEL_CONTROLLER = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _edaDragDropWayLeftPanelController = __webpack_require__(17);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LEFT_PANEL_CONTROLLER = 'leftPanelController';
	var LEFT_PANEL_CONTROLLERAS = 'leftPanelCtrl';
	
	var leftPanelController = function () {
		function leftPanelController(toaster, $timeout, $selectOptionMange, controllerModalProxy) {
			_classCallCheck(this, leftPanelController);
	
			this.toaster = toaster;
			this.$timeout = $timeout;
			this.$selectOptionMange = $selectOptionMange;
			this.controllerModalProxy = controllerModalProxy;
	
			this.init();
		}
	
		_createClass(leftPanelController, [{
			key: 'init',
			value: function init() {
				this.proxyModel = this.controllerModalProxy.proxyModel;
				this.proxyModel.selectedControl = this.proxyModel.temporyConfig.selectedControl;
				this.basicSelectRowCollection = this.controllerModalProxy.basicSelectRowCollection;
				this.newOptionBasicSelect = this.controllerModalProxy.newOptionBasicSelect;
	
				this.groupedSelectRowCollection = this.controllerModalProxy.groupedSelectRowCollection;
				this.newOptionGroupedSelect = this.controllerModalProxy.newOptionGroupedSelect;
				this.GroupedSelectGroups = this.controllerModalProxy.GroupedSelectGroups;
				this.newGroupGroupedSelect = this.controllerModalProxy.newGroupGroupedSelect;
				this.groupSelectGroupClick = this.controllerModalProxy.groupSelectGroupClick;
	
				this.radioRowCollection = this.controllerModalProxy.radioRowCollection;
				this.newOptionRadio = this.controllerModalProxy.newOptionRadio;
	
				this.demodt = {};
				this.demodt.formats = _edaDragDropWayLeftPanelController.dateFormats;
				this.dateOptions = this.getDateOptions();
	
				// this.controllerModalProxy.resetAllTemporyModels();
				this.initNyaSelectConformingSelectedControl();
			}
		}, {
			key: 'getDateOptions',
			value: function getDateOptions() {
				var dateOptions = {
					formatYear: 'yy',
					startingDay: 1,
					showWeeks: true,
					initDate: null
				};
				return dateOptions;
			}
		}, {
			key: 'initNyaSelectConformingSelectedControl',
			value: function initNyaSelectConformingSelectedControl() {
				//place proxyModel to selection if not none :
				if (this.proxyModel.temporyConfig.selectedControl !== 'none') {
					for (var i = this.proxyModel.controls.length - 1; i >= 0; i--) {
						if (this.proxyModel.controls[i].id === this.proxyModel.temporyConfig.selectedControl) this.modelproxyModel = this.proxyModel.controls[i];
					}
					if (this.proxyModel.temporyConfig.selectedControl === 'BasicSelect') this.controllerModalProxy.bindBasicSelectFromProxyModel(self.basicSelectRowCollection);
					if (this.proxyModel.temporyConfig.selectedControl === 'GroupedSelect') this.controllerModalProxy.bindGroupedSelectFromProxyModel(this.groupedSelectRowCollection, this.GroupedSelectGroups);
					if (this.proxyModel.temporyConfig.selectedControl === 'Radio') this.controllerModalProxy.bindRadioFromProxyModel(this.radioRowCollection);
				}
			}
		}, {
			key: 'updateSpecialControl',
			value: function updateSpecialControl() {
				//refresh service data for particular controls as selects and radio
				this.proxyModel.basicSelectRowCollection = this.basicSelectRowCollection;
				this.proxyModel.newOptionBasicSelect = this.newOptionBasicSelect;
				this.proxyModel.groupedSelectRowCollection = this.groupedSelectRowCollection;
				this.proxyModel.newOptionGroupedSelect = this.newOptionGroupedSelect;
				this.proxyModel.GroupedSelectGroups = this.GroupedSelectGroups;
				this.proxyModel.newGroupGroupedSelect = this.newGroupGroupedSelect;
				this.proxyModel.groupSelectGroupClick = this.groupSelectGroupClick;
				this.proxyModel.radioRowCollection = this.radioRowCollection;
				this.proxyModel.newOptionRadio = this.newOptionRadio;
				//force apply update proxyModel
				this.controllerModalProxy.bindSpecialCtrlTemporyModelsToProxyModel();
				return true;
			}
		}, {
			key: 'resetTemporyConfig',
			value: function resetTemporyConfig() {
				this.proxyModel.temporyConfig = {
					formlyLabel: '',
					formlyRequired: false,
					formlyPlaceholder: '',
					formlyDescription: '',
					formlyOptions: []
				};
			}
		}, {
			key: 'resetControl',
			value: function resetControl() {
				this.proxyModel.temporyConfig.formlyLabel = '';
				this.proxyModel.temporyConfig.formlyRequired = false;
				this.proxyModel.temporyConfig.formlyPlaceholder = '';
				this.proxyModel.temporyConfig.formlyDescription = '';
				this.proxyModel.temporyConfig.formlyOptions = [];
				this.proxyModel.temporyConfig.datepickerPopup = this.initDatePicker();
			}
		}, {
			key: 'initDatePicker',
			value: function initDatePicker() {
				this.proxyModel.temporyConfig.datepickerPopup = this.demodt.formats[0];
			}
		}, {
			key: 'selectThisControl',
			value: function selectThisControl(controlName) {
				this.proxyModel.selectedControl = 'none';
				this.resetTemporyConfig();
				for (var i = this.proxyModel.controls.length - 1; i >= 0; i--) {
					if (this.proxyModel.controls[i].id === controlName) {
						this.proxyModel.selectedControl = this.proxyModel.controls[i].id;
					}
				}
				if (this.proxyModel.selectedControl === 'Date') this.initDatePicker();
			}
	
			/**
	  	* ==============================================================
	  	* specific controls management
	  	* (display, properties.... : ex : grouped Select)
	  	* ==============================================================
	  	*/
	
		}, {
			key: 'addNewOptionRadio',
			value: function addNewOptionRadio() {
				var result = this.$selectOptionMange.addNewOptionRadio(this.radioRowCollection, this.newOptionRadio.saisie);
				if (result.resultFlag === false) {
					this.toaster.pop({
						type: 'warning',
						timeout: 2000,
						title: result.details,
						body: '\'' + this.newOptionRadio.saisie + '\' cannot be added.',
						showCloseButton: true
					});
				}
				//reset input
				this.newOptionRadio = { saisie: '' };
			}
		}, {
			key: 'removeRadioRow',
			value: function removeRadioRow(index) {
				var result = this.$selectOptionMange.removeOption(this.radioRowCollection, index);
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
				var result = this.$selectOptionMange.upthisOption(this.radioRowCollection, index);
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
				var result = this.$selectOptionMange.downthisOption(this.radioRowCollection, index);
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
				var result = this.$selectOptionMange.addNewOptionBasicSelect(this.basicSelectRowCollection, this.newOptionBasicSelect.saisie);
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
				var result = this.$selectOptionMange.removeOption(this.basicSelectRowCollection, index);
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
				var result = this.$selectOptionMange.upthisOption(this.basicSelectRowCollection, index);
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
				var result = this.$selectOptionMange.downthisOption(this.basicSelectRowCollection, index);
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
				var result = this.$selectOptionMange.addNewOptionGroupedSelect(this.groupedSelectRowCollection, this.newOptionGroupedSelect.saisie, '');
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
				var result = this.$selectOptionMange.removeOption(this.groupedSelectRowCollection, index);
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
				var result = this.$selectOptionMange.upthisOption(this.groupedSelectRowCollection, index);
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
				var result = this.$selectOptionMange.downthisOption(this.groupedSelectRowCollection, index);
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
				(0, _edaDragDropWayLeftPanelController.setToday)(this.demodt);
			}
		}, {
			key: 'clear',
			value: function clear() {
				(0, _edaDragDropWayLeftPanelController.clearDateTime)(this.demodt);
			}
		}, {
			key: 'open',
			value: function open($event) {
				$event.preventDefault();
				$event.stopPropagation();
				this.demodt.opened = true;
			}
		}]);
	
		return leftPanelController;
	}();
	
	leftPanelController.$inject = ['toaster', '$timeout', '$selectOptionMange', 'controllerModalProxy'];
	
	exports.default = leftPanelController;
	exports.LEFT_PANEL_CONTROLLER = LEFT_PANEL_CONTROLLER;
	exports.LEFT_PANEL_CONTROLLERAS = LEFT_PANEL_CONTROLLERAS;

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var dateFormats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	
	var setToday = function setToday(datetimePickerModel) {
		datetimePickerModel.dt = new Date();
	};
	
	var clearDateTime = function clearDateTime(datetimePickerModel) {
		datetimePickerModel.dt = new Date();
	};
	
	exports.dateFormats = dateFormats;
	exports.setToday = setToday;
	exports.clearDateTime = clearDateTime;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.LEFT_PANEL_DIRECTIVE = undefined;
	
	var _edaDragDropWayLeftPanel = __webpack_require__(16);
	
	var _edaDragDropWayLeftPanelTemplate = __webpack_require__(19);
	
	var _edaDragDropWayLeftPanelTemplate2 = _interopRequireDefault(_edaDragDropWayLeftPanelTemplate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LEFT_PANEL_DIRECTIVE = 'leftPanel';
	
	function leftPanel() {
		var directive = {
			restrict: 'E',
			template: _edaDragDropWayLeftPanelTemplate2.default,
			scope: {},
			controller: _edaDragDropWayLeftPanel.LEFT_PANEL_CONTROLLER,
			controllerAs: _edaDragDropWayLeftPanel.LEFT_PANEL_CONTROLLERAS,
			bindToController: {
				closeEditPanel: '&',
				selectedControl: '&',
				saveFromEditPanel: '&'
			}
		};
		return directive;
	}
	
	leftPanel.$inject = [];
	
	exports.default = leftPanel;
	exports.LEFT_PANEL_DIRECTIVE = LEFT_PANEL_DIRECTIVE;

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "<div id=\"controlEditLeftPanel\">\n\t<div class=\"pull-right\">\n\t\t<button\n      type=\"button\"\n      class=\"close\"\n      ng-click=\"leftPanelCtrl.closeEditPanel()\"\n      aria-label=\"Close\">\n\t\t\t<span\n        aria-hidden=\"true\">\n        &times;\n      </span>\n\t\t</button>\n\t</div>\n\t<div class=\"separator10pixel\"></div>\n\t<div ng-switch on=\"leftPanelCtrl.proxyModel.temporyConfig.selectedControl\">\n\t\t<div ng-switch-when=\"none\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t<h5 class=\"text-center texteRouge\">\n            <i class=\"fa fa-arrow-up\"></i>\n            &nbsp;\n            Select a control\n          </h5>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div ng-switch-when=\"empty\">\n\t\t\t<left-panel-blank-control />\n\t\t</div>\n\t\t<div ng-switch-when=\"Header\">\n\t\t\t<left-panel-header-control />\n\t\t</div>\n\t\t<div ng-switch-when=\"Subtitle\">\n\t\t\t<left-panel-subtitle-control />\n\t\t</div>\n\t\t<div ng-switch-when=\"TextInput\">\n\t\t\t<left-panel-text-input-control />\n\t\t</div>\n\t\t<div ng-switch-when=\"Password\">\n\t\t\t<left-panel-password-control />\n\t\t</div>\n\t\t<div ng-switch-when=\"Date\">\n\t\t\t<left-panel-date-control />\n\t\t</div>\n\t\t<div ng-switch-when=\"Texarea\">\n\t\t\t<left-panel-textarea-control />\n\t\t</div>\n\t\t<div ng-switch-when=\"RichTextEditor\">\n\t\t\t<left-panel-rich-text-editor-control />\n\t\t</div>\n\t\t<div ng-switch-when=\"Radio\">\n\t\t\t<left-panel-radio-control />\n\t\t</div>\n\t\t<div ng-switch-when=\"Checkbox\">\n\t\t\t<left-panel-check-box-control />\n\t\t</div>\n\t\t<div ng-switch-when=\"BasicSelect\">\n\t\t\t<left-panel-basic-select-control />\n\t\t</div>\n\t\t<div ng-switch-when=\"GroupedSelect\">\n\t\t\t<left-panel-grouped-select-control />\n\t\t</div>\n\t</div>\n\t<button\n    class=\"btn btn-primary btn-block pull-right\"\n    ng-click=\"leftPanelCtrl.closeEditPanel()\">\n    Close\n  </button>\n</div>\n"

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LEFT_PANEL_SELECT_OPTION_MANAGE_SERVICE = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global angular */
	
	
	var _edaDragDropWayLeftPanelSelectOptionManageService = __webpack_require__(21);
	
	var helpers = _interopRequireWildcard(_edaDragDropWayLeftPanelSelectOptionManageService);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LEFT_PANEL_SELECT_OPTION_MANAGE_SERVICE = '$selectOptionMange';
	
	var selectOptionMange = function () {
	  function selectOptionMange() {
	    _classCallCheck(this, selectOptionMange);
	
	    this.init();
	  }
	
	  _createClass(selectOptionMange, [{
	    key: 'init',
	    value: function init() {}
	  }, {
	    key: 'initModel',
	    value: function initModel(selectObj) {
	      helpers.resetModel(selectObj);
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
	      var checkResult = helpers.validOption(selectObj, newOptionText);
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
	      var checkResult = helpers.validOption(selectObj, newOptionText);
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
	      var checkResult = helpers.validOption(selectObj, newOptionText);
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
	  }]);
	
	  return selectOptionMange;
	}();
	
	selectOptionMange.$inject = [];
	
	exports.default = selectOptionMange;
	exports.LEFT_PANEL_SELECT_OPTION_MANAGE_SERVICE = LEFT_PANEL_SELECT_OPTION_MANAGE_SERVICE;

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* global angular */
	var resetModel = function resetModel(selectObj) {
	  var zeroModel = { rows: [] };
	  angular.copy(zeroModel, selectObj);
	};
	
	var validOption = function validOption(selectObj, newOptionText) {
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
	};
	
	exports.resetModel = resetModel;
	exports.validOption = validOption;

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/// <reference path="../../../../../typings/angularjs/angular.d.ts" />
	/// <reference path="../../../../../typings/lodash/lodash.d.ts" />
	
	/**
	 * TODO :
	 * - clean deprecated functions
	 * - method 'resetAllTemporyModels' -> remove no use angular.copy to optimize
	 */
	
	var CONTROLLER_MODAL_PROXY = 'controllerModalProxy';
	var INIT_OPTION_MODEL = { rows: [] };
	
	var controllerModalProxy = function () {
	  function controllerModalProxy(EasyFormGenFormlyBindingModels) {
	    _classCallCheck(this, controllerModalProxy);
	
	    this.EasyFormGenFormlyBindingModels = EasyFormGenFormlyBindingModels;
	    this.init();
	  }
	
	  _createClass(controllerModalProxy, [{
	    key: 'init',
	    value: function init() {
	      this.proxyModel = {};
	      this.resetProxyModel();
	      this.editPanelModel = {
	        toggle: false,
	        lineIndex: -1,
	        columnIndex: -1,
	        control: {}
	      };
	      this.basicSelectRowCollection = angular.copy(INIT_OPTION_MODEL);
	      this.newOptionBasicSelect = angular.copy({ saisie: '' });
	
	      this.groupedSelectRowCollection = angular.copy(INIT_OPTION_MODEL);
	      this.newOptionGroupedSelect = angular.copy({ saisie: '' });
	      this.GroupedSelectGroups = angular.copy({ list: [] });
	      this.newGroupGroupedSelect = angular.copy({ saisie: '' });
	      this.groupSelectGroupClick = angular.copy({ showList: false });
	
	      this.radioRowCollection = angular.copy(INIT_OPTION_MODEL);
	      this.newOptionRadio = angular.copy({ saisie: '' });
	    }
	
	    // deprecated in drag and drop version, use initProxyModel insead
	
	  }, {
	    key: 'initNyaSelect',
	    value: function initNyaSelect(nyaSelectObj) {
	      return this.resetNyaSelect(nyaSelectObj);
	    }
	  }, {
	    key: 'initProxyModel',
	    value: function initProxyModel(thisProxyModelToInit) {
	      return this.resetProxyModel(thisProxyModelToInit);
	    }
	
	    // deprecated : in drag and drop version, use "resetProxyModel()""
	
	  }, {
	    key: 'resetNyaSelect',
	    value: function resetNyaSelect(nyaSelectObj) {
	      var newNyaSelectObj = this.EasyFormGenFormlyBindingModels.getEasyFormListControls();
	      angular.copy(newNyaSelectObj, nyaSelectObj);
	      return true;
	    }
	  }, {
	    key: 'resetProxyModel',
	    value: function resetProxyModel() {
	      var newProxyModel = this.EasyFormGenFormlyBindingModels.getEasyFormListControls();
	      this.proxyModel = angular.copy(newProxyModel);
	      return true;
	    }
	  }, {
	    key: 'returnControlFromAddCtrlModalModel',
	    value: function returnControlFromAddCtrlModalModel(CtrlModalModel) {
	      var modelToReturn = {
	        selectedControl: 'none',
	        formlyType: 'none',
	        formlySubtype: 'none',
	        formlyLabel: '',
	        formlyRequired: false,
	        formlyDescription: '',
	        formlyPlaceholder: '',
	        formlyOptions: []
	      };
	      for (var i = CtrlModalModel.controls.length - 1; i >= 0; i--) {
	        if (CtrlModalModel.selectedControl === CtrlModalModel.controls[i].id) {
	
	          modelToReturn.selectedControl = CtrlModalModel.selectedControl;
	          modelToReturn.formlyType = CtrlModalModel.controls[i].formlyType;
	          modelToReturn.formlySubtype = CtrlModalModel.controls[i].formlySubtype;
	          modelToReturn.formlyLabel = CtrlModalModel.controls[i].formlyLabel;
	          modelToReturn.formlyRequired = CtrlModalModel.controls[i].formlyRequired;
	          modelToReturn.formlyDescription = CtrlModalModel.controls[i].formlyDescription;
	          modelToReturn.formlyPlaceholder = CtrlModalModel.controls[i].formlyPlaceholder;
	          modelToReturn.formlyOptions = CtrlModalModel.controls[i].formlyOptions;
	          // particular properties, here ; datetpicker format
	          if (CtrlModalModel.controls[i].formlyType === 'datepicker') modelToReturn.datepickerPopup = CtrlModalModel.controls[i].datepickerPopup;
	        }
	      }
	      return modelToReturn;
	    }
	  }, {
	    key: 'validKeyUniqueness',
	    value: function validKeyUniqueness(thisKey, configurationObj) {
	      var isUnique = true;
	      for (var i = configurationObj.lines.length - 1; i >= 0; i--) {
	        for (var j = configurationObj.lines[i].columns.length - 1; j >= 0; j--) {
	          if (configurationObj.lines[i].columns[j].control.key === thisKey) {
	            isUnique = false;
	          }
	        }
	      }
	      return isUnique;
	    }
	  }, {
	    key: 'getSelectedProxyModel',
	    value: function getSelectedProxyModel(configurationSelectedCtrl) {
	      var selectedProxyModelControl = 'none';
	      var listProxyModelCTRL = angular.copy(this.EasyFormGenFormlyBindingModels.getEasyFormListControls().controls);
	
	      listProxyModelCTRL.forEach(function (control) {
	        if (control.formlyType === configurationSelectedCtrl.type && control.formlySubtype === configurationSelectedCtrl.subtype) {
	          selectedProxyModelControl = control.id;
	          return selectedProxyModelControl;
	        }
	      });
	      return selectedProxyModelControl;
	    }
	
	    // to refresh configuration model from edit panel
	
	  }, {
	    key: 'bindConfigurationModelFromProxyModel',
	    value: function bindConfigurationModelFromProxyModel(indexLine, numcolumn, configurationObj) {
	      var extractedProps = angular.copy(this.proxyModel.temporyConfig);
	
	      configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl = extractedProps.selectedControl;
	      configurationObj.lines[indexLine].columns[numcolumn].control.type = extractedProps.formlyType;
	      configurationObj.lines[indexLine].columns[numcolumn].control.subtype = extractedProps.formlySubtype;
	      // templateOptions
	      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions = {
	        label: '',
	        required: false,
	        description: '',
	        placeholder: '',
	        options: []
	      };
	      // then bind template option
	      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label = extractedProps.formlyLabel;
	      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required = extractedProps.formlyRequired;
	      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description = extractedProps.formlyDescription;
	      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder = extractedProps.formlyPlaceholder;
	      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options = extractedProps.formlyOptions;
	      // add additionnal — particular — properties : -> datepicker : datepickerPopup
	      if (configurationObj.lines[indexLine].columns[numcolumn].control.type === 'datepicker') {
	        configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup = extractedProps.datepickerPopup;
	      }
	      // unique key (set only first time) in this model is formly control type + Date.now();
	      var newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();
	
	      if (this.validKeyUniqueness(newKey, configurationObj) === true) {
	        configurationObj.lines[indexLine].columns[numcolumn].control.key = newKey;
	      } else {
	        newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();
	        if (this.validKeyUniqueness(newKey, configurationObj) === true) {
	          configurationObj.lines[indexLine].columns[numcolumn].control.key = newKey;
	        } else {
	          newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();
	        }
	      }
	      configurationObj.lines[indexLine].columns[numcolumn].control.edited = true;
	    }
	
	    /**
	     * set local proxyModel from Selected control in configuration model
	     *
	     * replace deprecated "getNyASelectFromSelectedLineColumn"
	     * -model is now named "proxyModel"
	     * -model is stored in this service
	     *
	     * -> it has just more sence!
	     */
	
	  }, {
	    key: 'setProxyModelFromConfigurationSelection',
	    value: function setProxyModelFromConfigurationSelection(configurationObj, indexLine, numcolumn) {
	      // data send to modal controller
	      if (typeof configurationObj.lines[indexLine].columns[numcolumn].control != 'undefined') {
	        // determine selected control from indexes and control.type and control.subtype in configuration model
	        this.proxyModel.selectedControl = typeof configurationObj.lines[indexLine].columns[numcolumn].control.type != 'undefined' ? this.getSelectedProxyModel(configurationObj.lines[indexLine].columns[numcolumn].control) : 'none';
	        this.proxyModel.temporyConfig.selectedControl = typeof configurationObj.lines[indexLine].columns[numcolumn].control.type != 'undefined' ? this.getSelectedProxyModel(configurationObj.lines[indexLine].columns[numcolumn].control) : 'none';
	        this.proxyModel.temporyConfig.formlyType = typeof configurationObj.lines[indexLine].columns[numcolumn].control.type != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.type : 'none';
	        this.proxyModel.temporyConfig.formlySubtype = typeof configurationObj.lines[indexLine].columns[numcolumn].control.subtype != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.subtype : 'none';
	        this.proxyModel.temporyConfig.formlyLabel = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label : '';
	        this.proxyModel.temporyConfig.formlyRequired = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required : '';
	        this.proxyModel.temporyConfig.formlyDescription = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description : '';
	        this.proxyModel.temporyConfig.formlyPlaceholder = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder : '';
	        this.proxyModel.temporyConfig.formlyOptions = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options : '';
	        // particular case : datepicker
	        if (this.proxyModel.temporyConfig.selectedControl === 'Date') {
	          this.proxyModel.temporyConfig.datepickerPopup = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup : '';
	        }
	        // console.info('debug setProxyModelFromConfigurationSelection');
	        // console.dir({
	        //   selectedControl : angular.copy(this.proxyModel.selectedControl ),
	        //   temporyConfig   : angular.copy(this.proxyModel.temporyConfig)
	        // });
	      }
	      return this.proxyModel;
	    }
	  }, {
	    key: 'getProxyModel',
	    value: function getProxyModel() {
	      return this.proxyModel;
	    }
	
	    /**
	     * ============================================================
	     * following methods for "editPanelModel"
	     *
	     * Note this model :
	     * - to manage side edit control panel
	     * ============================================================
	     */
	
	    // getter : editPanelModel (whole model => type = object)
	
	  }, {
	    key: 'getEditPanelModelAllModel',
	    value: function getEditPanelModelAllModel() {
	      return this.editPanelModel;
	    }
	
	    // setter : editPanelModel (whole model => type = object)
	
	  }, {
	    key: 'setEditPanelModelControl',
	    value: function setEditPanelModelControl(newEditPanelModel) {
	      var successfullDone = false;
	      if (typeof newEditPanelModel !== 'undefined') {
	        angular.merge(this.editPanelModel, newEditPanelModel);
	        successfullDone = true;
	      }
	      return successfullDone;
	    }
	
	    // getter : editPanelModel.columnIndex
	
	  }, {
	    key: 'getEditPanelModelColumnIndex',
	    value: function getEditPanelModelColumnIndex() {
	      return this.editPanelModel.columnIndex;
	    }
	
	    // setter : editPanelModel.columnIndex
	
	  }, {
	    key: 'setEditPanelModelColumnIndex',
	    value: function setEditPanelModelColumnIndex(newColumnIndex) {
	      var successfullDone = false;
	      if (typeof newColumnIndex !== 'undefined') {
	        this.editPanelModel.columnIndex = newColumnIndex;
	        successfullDone = true;
	      }
	      return successfullDone;
	    }
	
	    // getter : editPanelModel.lineIndex
	
	  }, {
	    key: 'getEditPanelModelLineIndex',
	    value: function getEditPanelModelLineIndex() {
	      return this.editPanelModel.lineIndex;
	    }
	
	    // setter : editPanelModel.lineIndex
	
	  }, {
	    key: 'setEditPanelModelLineIndex',
	    value: function setEditPanelModelLineIndex(newLineIndex) {
	      var successfullDone = false;
	      if (typeof newLineIndex !== 'undefined') {
	        this.editPanelModel.lineIndex = newLineIndex;
	        successfullDone = true;
	      }
	      return successfullDone;
	    }
	
	    // getter : editPanelModel.control
	
	  }, {
	    key: 'getEditPanelModelControl',
	    value: function getEditPanelModelControl() {
	      return this.editPanelModel.control;
	    }
	
	    // getter : editPanelModel.toggle
	
	  }, {
	    key: 'getEditPanelModelToggle',
	    value: function getEditPanelModelToggle() {
	      return this.editPanelModel.toggle;
	    }
	
	    // setter : editPanelModel.toggle
	
	  }, {
	    key: 'setEditPanelModelToggle',
	    value: function setEditPanelModelToggle(newToggleValue) {
	      var successfullDone = false;
	      if (typeof newToggleValue !== 'undefined') {
	        this.editPanelModel.toggle = newToggleValue;
	        successfullDone = true;
	      }
	      return successfullDone;
	    }
	  }, {
	    key: 'resetAllTemporyModels',
	    value: function resetAllTemporyModels() {
	      this.basicSelectRowCollection = angular.copy(INIT_OPTION_MODEL);
	      this.newOptionBasicSelect = angular.copy({ saisie: '' });
	
	      this.groupedSelectRowCollection = angular.copy(INIT_OPTION_MODEL);
	      this.newOptionGroupedSelect = angular.copy({ saisie: '' });
	      this.GroupedSelectGroups = angular.copy({ list: [] });
	      this.newGroupGroupedSelect = angular.copy({ saisie: '' });
	      this.groupSelectGroupClick = angular.copy({ showList: false });
	
	      this.radioRowCollection = angular.copy(INIT_OPTION_MODEL);
	      this.newOptionRadio = angular.copy({ saisie: '' });
	      return true;
	    }
	
	    /**
	     * bindSpecialCtrlTemporyModelsToProxyModel: needed when validating after editing a control
	     * tempory models applied to proxyModel if control is one of these
	     *
	     * example : if selected control is a basic select options
	     * -> so its tempory models are bound to proxyModel
	     */
	
	  }, {
	    key: 'bindSpecialCtrlTemporyModelsToProxyModel',
	    value: function bindSpecialCtrlTemporyModelsToProxyModel() {
	      if (this.proxyModel.selectedControl === 'BasicSelect') {
	        this.bindBasicSelectToProxyModel(this.basicSelectRowCollection);
	      }
	      if (this.proxyModel.selectedControl === 'GroupedSelect') {
	        this.bindGroupedSelectToProxyModel(this.groupedSelectRowCollection);
	      }
	      if (this.proxyModel.selectedControl === 'Radio') {
	        this.bindRadioToProxyModel(this.radioRowCollection);
	      }
	    }
	
	    // basic select
	
	  }, {
	    key: 'bindBasicSelectFromProxyModel',
	    value: function bindBasicSelectFromProxyModel(basicSelectRowCollection) {
	      if (this.proxyModel.temporyConfig.formlyOptions.length > 0) {
	        for (var i = 0; i <= this.proxyModel.temporyConfig.formlyOptions.length - 1; i++) {
	          var newOption = {
	            'option': this.proxyModel.temporyConfig.formlyOptions[i].name,
	            'order': i,
	            'group': ''
	          };
	          basicSelectRowCollection.rows.push(newOption);
	        }
	      }
	    }
	  }, {
	    key: 'bindBasicSelectToProxyModel',
	    value: function bindBasicSelectToProxyModel(basicSelectRowCollection) {
	      var resetNyASelectOptions = [];
	      this.proxyModel.temporyConfig.formlyOptions = resetNyASelectOptions;
	      if (basicSelectRowCollection.rows.length > 0) {
	        for (var i = 0; i <= basicSelectRowCollection.rows.length - 1; i++) {
	          var newOption = {
	            'name': basicSelectRowCollection.rows[i].option,
	            'value': i,
	            'group': ''
	          };
	          this.proxyModel.temporyConfig.formlyOptions.push(newOption);
	        }
	      }
	    }
	
	    //* grouped select
	
	  }, {
	    key: 'bindGroupedSelectFromProxyModel',
	    value: function bindGroupedSelectFromProxyModel(groupedSelectRowCollection, GroupedSelectGroups) {
	      if (this.proxyModel.temporyConfig.formlyOptions.length > 0) {
	        for (var i = 0; i <= this.proxyModel.temporyConfig.formlyOptions.length - 1; i++) {
	          var newOption = {
	            'option': this.proxyModel.temporyConfig.formlyOptions[i].name,
	            'order': i,
	            'group': this.proxyModel.temporyConfig.formlyOptions[i].group
	          };
	          groupedSelectRowCollection.rows.push(newOption);
	        }
	        //grouplist : thx to lodash it is easy
	        var filteredgroup = _.uniq(_.pluck(groupedSelectRowCollection.rows, 'group'));
	        angular.copy(filteredgroup, GroupedSelectGroups.list);
	      }
	    }
	  }, {
	    key: 'bindGroupedSelectToProxyModel',
	    value: function bindGroupedSelectToProxyModel(groupedSelectRowCollection) {
	      this.proxyModel.temporyConfig.formlyOptions = [];
	      for (var i = 0; i <= groupedSelectRowCollection.rows.length - 1; i++) {
	        var newOption = {
	          'name': groupedSelectRowCollection.rows[i].option,
	          'value': i,
	          'group': groupedSelectRowCollection.rows[i].group
	        };
	        this.proxyModel.temporyConfig.formlyOptions.push(newOption);
	      }
	    }
	
	    // radio
	
	  }, {
	    key: 'bindRadioFromProxyModel',
	    value: function bindRadioFromProxyModel(radioRowCollection) {
	      if (this.proxyModel.temporyConfig.formlyOptions.length > 0) {
	        for (var i = 0; i <= this.proxyModel.temporyConfig.formlyOptions.length - 1; i++) {
	          var newOption = {
	            'option': this.proxyModel.temporyConfig.formlyOptions[i].name,
	            'order': i,
	            'group': ''
	          };
	          radioRowCollection.rows.push(newOption);
	        }
	      }
	    }
	  }, {
	    key: 'bindRadioToProxyModel',
	    value: function bindRadioToProxyModel(radioRowCollection) {
	      var resetproxyModelOptions = [];
	      this.proxyModel.temporyConfig.formlyOptions = resetproxyModelOptions;
	      if (radioRowCollection.rows.length > 0) {
	        for (var i = 0; i <= radioRowCollection.rows.length - 1; i++) {
	          var newOption = {
	            'name': radioRowCollection.rows[i].option,
	            'value': i,
	            'group': ''
	          };
	          this.proxyModel.temporyConfig.formlyOptions.push(newOption);
	        }
	      }
	    }
	  }]);
	
	  return controllerModalProxy;
	}();
	
	controllerModalProxy.$inject = ['EasyFormGenFormlyBindingModels'];
	
	exports.default = controllerModalProxy;
	exports.CONTROLLER_MODAL_PROXY = CONTROLLER_MODAL_PROXY;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LEFT_PANEL_VALID_EDIT_FOOTER_DIRECTIVE = undefined;
	
	var _edaDragDropWayLeftpanelValidEditFooterTemplate = __webpack_require__(24);
	
	var _edaDragDropWayLeftpanelValidEditFooterTemplate2 = _interopRequireDefault(_edaDragDropWayLeftpanelValidEditFooterTemplate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LEFT_PANEL_VALID_EDIT_FOOTER_DIRECTIVE = 'leftPanelValidEditFooter';
	
	function leftPanelValidEditFooter() {
	  var directive = {
	    restrict: 'E',
	    template: _edaDragDropWayLeftpanelValidEditFooterTemplate2.default
	  };
	  return directive;
	}
	
	leftPanelValidEditFooter.$inject = [];
	
	exports.default = leftPanelValidEditFooter;
	exports.LEFT_PANEL_VALID_EDIT_FOOTER_DIRECTIVE = LEFT_PANEL_VALID_EDIT_FOOTER_DIRECTIVE;

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = "<div class=\"modal-footer\">\n  <button\n    class=\"btn btn-danger pull-left\"\n    ng-click=\"leftPanelCtrl.resetControl()\">\n    <i class=\"fa fa-refresh\"></i>\n    &nbsp;\n    Reset\n  </button>\n  <button\n    class=\"btn btn-success pull-right\"\n    ng-click=\"leftPanelCtrl.updateSpecialControl(); leftPanelCtrl.saveFromEditPanel();\">\n    <i class=\"fa fa-floppy-o\"></i>\n    &nbsp;\n    Save\n  </button>\n</div>\n"

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LEFT_PANEL_TEXT_INPUT_CONTROL_DIRECTIVE = undefined;
	
	var _edaDragDropWayLeftpanelTextInputControlTemplate = __webpack_require__(26);
	
	var _edaDragDropWayLeftpanelTextInputControlTemplate2 = _interopRequireDefault(_edaDragDropWayLeftpanelTextInputControlTemplate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LEFT_PANEL_TEXT_INPUT_CONTROL_DIRECTIVE = 'leftPanelTextInputControl';
	
	function leftPanelTextInputControl() {
	  var directive = {
	    restrict: 'E',
	    template: _edaDragDropWayLeftpanelTextInputControlTemplate2.default
	  };
	  return directive;
	}
	
	leftPanelTextInputControl.$inject = [];
	
	exports.default = leftPanelTextInputControl;
	exports.LEFT_PANEL_TEXT_INPUT_CONTROL_DIRECTIVE = LEFT_PANEL_TEXT_INPUT_CONTROL_DIRECTIVE;

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "<div class=\"panel panel-default\">\n  <div class=\"panel-body\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h5 class=\"greyText\">\n          <i class=\"fa fa-pencil-square-o\"></i>\n          &nbsp;\n          Edit properties :\n        </h5>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"col-md-12\">\n        <label\n          for=\"inputTextLabelUpdate\"\n          class=\" control-label greyText editPropertiesLabel\">\n          Label text :\n          </label>\n        <div class=\"\">\n          <input\n            type=\"text\"\n            class=\"form-control\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyLabel\"\n            id=\"inputTextLabelUpdate\"\n            placeholder=\"Add / edit control label here\">\n        </div>\n       </div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"col-md-12\">\n        <label\n          for=\"inputTextplaceholderUpdate\"\n          class=\"control-label greyText editPropertiesLabel\">\n          placeholder :\n        </label>\n        <div class=\"\">\n          <input\n            type=\"text\"\n            class=\"form-control\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyPlaceholder\"\n            id=\"inputTextplaceholderUpdate\"\n            placeholder=\"Add / edit placeholder text here\">\n        </div>\n       </div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"\">\n        <label\n          for=\"inputTextRequiredUpdate\"\n          class=\"col-md-4 control-label greyText editPropertiesLabel\">\n          Required :\n        </label>\n        <div class=\"col-md-8\">\n          <div class=\"checkboxCssCorrection\">&nbsp;</div>\n          <input\n            type=\"checkbox\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyRequired\"\n            id=\"inputTextRequiredUpdate\">\n        </div>\n       </div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"col-md-12\">\n        <label\n          for=\"inputTextDescriptionUpdate\"\n          class=\"control-label greyText editPropertiesLabel\">\n          Description :\n        </label>\n        <div class=\"\">\n          <input\n            type=\"text\" \n            class=\"form-control\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyDescription\"\n            id=\"inputTextDescriptionUpdate\"\n            placeholder=\"Add / edit description here\">\n        </div>\n       </div>\n      </div>\n    </div>\n  </div>\n  <left-panel-valid-edit-footer />\n</div>\n"

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LEFT_PANEL_TEXTAREA_CONTROL_DIRECTIVE = undefined;
	
	var _edaDragDropWayLeftpanelTextareaControlTemplate = __webpack_require__(28);
	
	var _edaDragDropWayLeftpanelTextareaControlTemplate2 = _interopRequireDefault(_edaDragDropWayLeftpanelTextareaControlTemplate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LEFT_PANEL_TEXTAREA_CONTROL_DIRECTIVE = 'leftPanelTextareaControl';
	
	function leftPanelTextareaControl() {
	  var directive = {
	    restrict: 'E',
	    template: _edaDragDropWayLeftpanelTextareaControlTemplate2.default
	  };
	  return directive;
	}
	
	leftPanelTextareaControl.$inject = [];
	
	exports.default = leftPanelTextareaControl;
	exports.LEFT_PANEL_TEXTAREA_CONTROL_DIRECTIVE = LEFT_PANEL_TEXTAREA_CONTROL_DIRECTIVE;

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = "<div class=\"panel panel-default\">\n  <div class=\"panel-body\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h5 class=\"greyText\">\n          <i class=\"fa fa-pencil-square-o\"></i>\n          &nbsp;\n          Edit properties :\n        </h5>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"col-md-12\">\n        <label\n          for=\"inputTextLabelUpdate\"\n          class=\" control-label greyText editPropertiesLabel\">\n          Label text :\n        </label>\n        <div class=\"\">\n          <input\n            type=\"text\"\n            class=\"form-control\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyLabel\" \n            id=\"inputTextLabelUpdate\"\n            placeholder=\"Add / edit control label here\">\n        </div>\n       </div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"\">\n        <label\n          for=\"RequiredUpdate\"\n          class=\"col-md-4 control-label greyText editPropertiesLabel\">\n          Required :\n        </label>\n        <div class=\"col-md-8\">\n          <div class=\"checkboxCssCorrection\">\n            &nbsp;\n          </div>\n          <input\n            type=\"checkbox\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyRequired\"\n            id=\"RequiredUpdate\">\n        </div>\n       </div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"col-md-12\">\n        <label\n          for=\"DescriptionUpdate\"\n          class=\"control-label greyText editPropertiesLabel\">\n          Description :\n        </label>\n        <div class=\"\">\n          <input\n            type=\"text\"\n            class=\"form-control\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyDescription\"\n            id=\"DescriptionUpdate\"\n            placeholder=\"Add / edit description here\">\n        </div>\n       </div>\n      </div>\n    </div>\n  </div>\n  <left-panel-valid-edit-footer />\n</div>\n"

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LEFT_PANEL_SUBTITLE_CONTROL_DIRECTIVE = undefined;
	
	var _edaDragDropWayLeftpanelSubtitleControlTemplate = __webpack_require__(30);
	
	var _edaDragDropWayLeftpanelSubtitleControlTemplate2 = _interopRequireDefault(_edaDragDropWayLeftpanelSubtitleControlTemplate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LEFT_PANEL_SUBTITLE_CONTROL_DIRECTIVE = 'leftPanelSubtitleControl';
	
	function leftPanelSubtitleControl() {
	  var directive = {
	    restrict: 'E',
	    template: _edaDragDropWayLeftpanelSubtitleControlTemplate2.default
	  };
	  return directive;
	}
	
	leftPanelSubtitleControl.$inject = [];
	
	exports.default = leftPanelSubtitleControl;
	exports.LEFT_PANEL_SUBTITLE_CONTROL_DIRECTIVE = LEFT_PANEL_SUBTITLE_CONTROL_DIRECTIVE;

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = "<div class=\"panel panel-default\">\n  <div class=\"panel-body\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h5 class=\"greyText\">\n          <i class=\"fa fa-pencil-square-o\"></i>\n          &nbsp;\n          Edit properties :\n        </h5>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n        <div class=\"col-md-12\">\n          <label\n            for=\"inputTextDescriptionUpdate\"\n            class=\"control-label greyText editPropertiesLabel\">\n            Subtitle text :\n          </label>\n          <div class=\"\">\n            <input\n              type=\"text\"\n              class=\"form-control\" \n              ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyDescription\"\n              id=\"inputSubtitleTextUpdate\"\n              placeholder=\"Add / edit subtitle text here\" >\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <left-panel-valid-edit-footer />\n</div>\n"

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LEFT_PANEL_RICH_TEXT_EDITOR_CONTROL_DIRECTIVE = undefined;
	
	var _edaDragDropWayLeftpanelRichTextEditorControlTemplate = __webpack_require__(32);
	
	var _edaDragDropWayLeftpanelRichTextEditorControlTemplate2 = _interopRequireDefault(_edaDragDropWayLeftpanelRichTextEditorControlTemplate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LEFT_PANEL_RICH_TEXT_EDITOR_CONTROL_DIRECTIVE = 'leftPanelRichTextEditorControl';
	
	function leftPanelRichTextEditorControl() {
	  var directive = {
	    restrict: 'E',
	    template: _edaDragDropWayLeftpanelRichTextEditorControlTemplate2.default
	  };
	  return directive;
	}
	
	leftPanelRichTextEditorControl.$inject = [];
	
	exports.default = leftPanelRichTextEditorControl;
	exports.LEFT_PANEL_RICH_TEXT_EDITOR_CONTROL_DIRECTIVE = LEFT_PANEL_RICH_TEXT_EDITOR_CONTROL_DIRECTIVE;

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = "<div class=\"panel panel-default\">\n  <div class=\"panel-body\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h5 class=\"greyText\">\n          <i class=\"fa fa-pencil-square-o\"></i>\n          &nbsp; Edit properties :\n        </h5>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"col-md-12\">\n        <label\n          for=\"DescriptionUpdate\"\n          class=\"control-label greyText editPropertiesLabel\">\n          Description :\n        </label>\n        <div class=\"\">\n          <input\n            type=\"text\"\n            class=\"form-control\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyDescription\"\n            id=\"DescriptionUpdate\"\n            placeholder=\"Add / edit description here\">\n        </div>\n       </div>\n      </div>\n    </div>\n  </div>\n  <left-panel-valid-edit-footer />\n</div>\n"

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LEFT_PANEL_RADIO_CONTROL_DIRECTIVE = undefined;
	
	var _edaDragDropWayLeftpanelRadioControlTemplate = __webpack_require__(34);
	
	var _edaDragDropWayLeftpanelRadioControlTemplate2 = _interopRequireDefault(_edaDragDropWayLeftpanelRadioControlTemplate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LEFT_PANEL_RADIO_CONTROL_DIRECTIVE = 'leftPanelRadioControl';
	
	function leftPanelRadioControl() {
	  var directive = {
	    restrict: 'E',
	    template: _edaDragDropWayLeftpanelRadioControlTemplate2.default
	  };
	  return directive;
	}
	
	leftPanelRadioControl.$inject = [];
	
	exports.default = leftPanelRadioControl;
	exports.LEFT_PANEL_RADIO_CONTROL_DIRECTIVE = LEFT_PANEL_RADIO_CONTROL_DIRECTIVE;

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = "<div class=\"panel panel-default\">\n  <div class=\"panel-body\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h5 class=\"greyText\">\n          <i class=\"fa fa-pencil-square-o\"></i>\n          &nbsp;\n          Edit properties :\n        </h5>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"col-lg-12 col-md-12\">\n        <label\n          for=\"radioRowCollection\"\n          class=\" control-label greyText editPropertiesLabel\">\n          Add new radio :\n        </label>\n      </div>\n    </div>\n  <div class=\"row\">\n    <div>\n      <div class=\"form-group\">\n        <div class=\"col-sm-9 col-xs-9 col-md-9 col-lg-9\">\n        <input\n          type=\"text\"\n          class=\"form-control\"\n          id=\"inputAddNewRadioOption\"\n          placeholder=\"add new radio\"\n          ng-model=\"leftPanelCtrl.newOptionRadio.saisie\">\n        </div>\n        <div class=\"col-sm-3 col-xs-3 col-md-3 col-lg-3\">\n          <button\n            class=\"btn btn-primary\"\n            ng-click=\"leftPanelCtrl.addNewOptionRadio()\">\n            add\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-lg-12 col-md-12\">\n      <label\n        for=\"radioRowCollection\"\n        class=\" control-label greyText editPropertiesLabel\">\n        Edit/Remove radio :\n      </label>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"form-group\">\n      <div class-\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">\n        <div class=\"container\">\n          <div ng-show=\"leftPanelCtrl.radioRowCollection.rows.length === 0\">\n            <h5 class=\"text-center greyText\">\n              <em>\n                - no radio : add new radio values -\n              </em>\n            </h5>\n          </div>\n          <table\n            ng-if=\"leftPanelCtrl.radioRowCollection.rows.length > 0\"\n            class=\"table table-striped\">\n            <thead>\n            <tr>\n              <th st-ratio=\"20\">\n                order\n              </th>\n              <th st-ratio=\"55\">\n                option\n              </th>\n              <th st-ratio=\"25\">\n              </th>\n            </tr>\n            <tr>\n              <th st-ratio=\"20\">\n              </th>\n              <th st-ratio=\"55\">\n                <input\n                  ng-model=\"radioFilter\"\n                  placeholder=\"search for option\"\n                  class=\"input-sm form-control\"\n                  type=\"search\" />\n              </th>\n              <th st-ratio=\"25\"></th>\n            </tr>\n            </thead>\n            <tbody>\n              <tr ng-repeat=\"radioRow in leftPanelCtrl.radioRowCollection.rows | filter:radioFilter as radioRow\">\n                <td st-ratio=\"20\">\n                  {{$index}}\n                </td>\n                <td st-ratio=\"55\">\n                  {{radioRow.option}}\n                </td>\n                <td st-ratio=\"25\">\n                  <div class=\"pull-right\">\n                    <button\n                      class=\"btn btn-primary\"\n                      ng-click=\"leftPanelCtrl.upThisRadioRow($index)\">\n                      <i class=\"fa fa-arrow-up\"></i>\n                    </button>\n                    <button\n                      class=\"btn btn-primary\"\n                      ng-click=\"leftPanelCtrl.downThisRadioRow($index)\">\n                      <i class=\"fa fa-arrow-down\"></i>\n                    </button>\n                    <button\n                      class=\"btn btn-danger\"\n                      ng-click=\"leftPanelCtrl.removeRadioRow($index)\">\n                      <i class=\"fa fa-trash-o\"></i>\n                    </button>\n                   </div>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n  \t\t\t<div class=\"col-md-12\">\n          <label\n            for=\"inputTextLabelUpdate\"\n            class=\" control-label greyText editPropertiesLabel\">\n            Label text :\n          </label>\n          <div class=\"\">\n            <input\n              type=\"text\"\n              class=\"form-control\"\n              ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyLabel\"\n              id=\"inputTextLabelUpdate\"\n              placeholder=\"Add / edit control label here\">\n          </div>\n  \t\t\t</div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n  \t\t\t<div class=\"\">\n          <label\n            for=\"RequiredUpdate\"\n            class=\"col-md-4 control-label greyText editPropertiesLabel\">\n            Required :\n          </label>\n          <div class=\"col-md-8\">\n            <div class=\"checkboxCssCorrection\">&nbsp;</div>\n            <input\n              type=\"checkbox\"\n              ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyRequired\"\n              id=\"RequiredUpdate\">\n          </div>\n  \t\t\t</div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n  \t\t\t<div class=\"col-md-12\">\n          <label\n            for=\"DescriptionUpdate\"\n            class=\"control-label greyText editPropertiesLabel\">\n            Description :\n          </label>\n          <div class=\"\">\n            <input\n              type=\"text\"\n              class=\"form-control\"\n              ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyDescription\"\n              id=\"DescriptionUpdate\"\n              placeholder=\"Add / edit description here\">\n          </div>\n  \t\t\t</div>\n      </div>\n   </div>\n  </div>\n  <left-panel-valid-edit-footer />\n</div>\n"

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LEFT_PANEL_PASSWORD_CONTROL_DIRECTIVE = undefined;
	
	var _edaDragDropWayLeftpanelPasswordControlTemplate = __webpack_require__(36);
	
	var _edaDragDropWayLeftpanelPasswordControlTemplate2 = _interopRequireDefault(_edaDragDropWayLeftpanelPasswordControlTemplate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LEFT_PANEL_PASSWORD_CONTROL_DIRECTIVE = 'leftPanelPasswordControl';
	
	function leftPanelPasswordControl() {
	  var directive = {
	    restrict: 'E',
	    template: _edaDragDropWayLeftpanelPasswordControlTemplate2.default
	  };
	  return directive;
	}
	
	leftPanelPasswordControl.$inject = [];
	
	exports.default = leftPanelPasswordControl;
	exports.LEFT_PANEL_PASSWORD_CONTROL_DIRECTIVE = LEFT_PANEL_PASSWORD_CONTROL_DIRECTIVE;

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = "<div class=\"panel panel-default\">\n  <div class=\"panel-body\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h5 class=\"greyText\">\n          <i class=\"fa fa-pencil-square-o\"></i>\n          &nbsp;\n          Edit properties :\n        </h5>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"col-md-12\">\n        <label\n          for=\"inputTextLabelUpdate\"\n          class=\" control-label greyText editPropertiesLabel\">\n          Label text :\n        </label>\n        <div class=\"\">\n          <input\n            type=\"text\" \n            class=\"form-control\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyLabel\"\n            id=\"inputTextLabelUpdate\"\n            placeholder=\"Add / edit control label here\" >\n        </div>\n       </div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"col-md-12\">\n        <label\n          for=\"placeholderUpdate\"\n          class=\"control-label greyText editPropertiesLabel\">\n          placeholder :\n        </label>\n        <div class=\"\">\n          <input\n            type=\"text\"\n            class=\"form-control\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyPlaceholder\"\n            id=\"inputTextplaceholderUpdate\"\n            placeholder=\"Add / edit placeholder text here\" >\n        </div>\n       </div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"\">\n        <label\n          for=\"RequiredUpdate\"\n          class=\"col-md-4 control-label greyText editPropertiesLabel\">\n          Required :\n        </label>\n        <div class=\"col-md-8\">\n          <div class=\"checkboxCssCorrection\">&nbsp;</div>\n            <input\n              type=\"checkbox\"\n              ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyRequired\"\n              id=\"RequiredUpdate\">\n        </div>\n       </div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"col-md-12\">\n        <label\n          for=\"DescriptionUpdate\"\n          class=\"control-label greyText editPropertiesLabel\">\n          Description :\n        </label>\n        <div class=\"\">\n          <input\n            type=\"text\"\n            class=\"form-control\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyDescription\"\n            id=\"DescriptionUpdate\"\n            placeholder=\"Add / edit description here\" >\n        </div>\n       </div>\n      </div>\n    </div>\n  </div>\n  <left-panel-valid-edit-footer />\n</div>\n"

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LEFT_PANEL_HEADER_CONTROL_DIRECTIVE = undefined;
	
	var _edaDragDropWayLeftpanelHeaderControlTemplate = __webpack_require__(38);
	
	var _edaDragDropWayLeftpanelHeaderControlTemplate2 = _interopRequireDefault(_edaDragDropWayLeftpanelHeaderControlTemplate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LEFT_PANEL_HEADER_CONTROL_DIRECTIVE = 'leftPanelHeaderControl';
	
	function leftPanelHeaderControl() {
	  var directive = {
	    restrict: 'E',
	    template: _edaDragDropWayLeftpanelHeaderControlTemplate2.default
	  };
	  return directive;
	}
	
	leftPanelHeaderControl.$inject = [];
	
	exports.default = leftPanelHeaderControl;
	exports.LEFT_PANEL_HEADER_CONTROL_DIRECTIVE = LEFT_PANEL_HEADER_CONTROL_DIRECTIVE;

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = "<div class=\"panel panel-default\">\n  <div class=\"panel-body\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h5 class=\"greyText\">\n          <i class=\"fa fa-pencil-square-o\"></i>\n          &nbsp;\n          Edit properties :\n        </h5>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"col-md-12\">\n        <label\n          for=\"inputTextDescriptionUpdate\"\n          class=\"control-label greyText editPropertiesLabel\">\n          Header text :\n        </label>\n        <div class=\"\">\n          <input\n            type=\"text\"\n            class=\"form-control\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyDescription\"\n            id=\"inputHeaderTextUpdate\"\n            placeholder=\"Add / edit header text here\" >\n        </div>\n       </div>\n      </div>\n    </div>\n  </div>\n  <left-panel-valid-edit-footer />\n</div>\n"

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LEFT_PANEL_GROUPED_SELECT_CONTROL_DIRECTIVE = undefined;
	
	var _edaDragDropWayLeftpanelGroupedSelectControlTemplate = __webpack_require__(40);
	
	var _edaDragDropWayLeftpanelGroupedSelectControlTemplate2 = _interopRequireDefault(_edaDragDropWayLeftpanelGroupedSelectControlTemplate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LEFT_PANEL_GROUPED_SELECT_CONTROL_DIRECTIVE = 'leftPanelGroupedSelectControl';
	
	function leftPanelGroupedSelectControl() {
	  var directive = {
	    restrict: 'E',
	    template: _edaDragDropWayLeftpanelGroupedSelectControlTemplate2.default
	  };
	  return directive;
	}
	
	leftPanelGroupedSelectControl.$inject = [];
	
	exports.default = leftPanelGroupedSelectControl;
	exports.LEFT_PANEL_GROUPED_SELECT_CONTROL_DIRECTIVE = LEFT_PANEL_GROUPED_SELECT_CONTROL_DIRECTIVE;

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = "<div class=\"panel panel-default\">\n  <div class=\"panel-body\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h5 class=\"greyText\">\n          <i class=\"fa fa-pencil-square-o\"></i>\n          &nbsp;\n          Edit properties :\n        </h5>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"col-lg-12 col-md-12\">\n        <label\n          for=\"groupedSelectRowCollection\"\n          class=\"control-label greyText editPropertiesLabel\">\n          Add new options :\n        </label>\n     </div>\n    </div>\n    <div class=\"row\">\n      <div>\n        <div class=\"form-group\">\n          <div class=\"col-sm-9 col-xs-9 col-md-9 col-lg-9\">\n            <input\n              type=\"text\"\n              class=\"form-control\"\n              id=\"inputAddNewGroupedOption\"\n              placeholder=\"add new option\"\n              ng-model=\"leftPanelCtrl.newOptionGroupedSelect.saisie\">\n          </div>\n          <div class=\"col-sm-3 col-xs-3 col-md-3 col-lg-3\">\n            <button\n              class=\"btn btn-primary\"\n              ng-click=\"leftPanelCtrl.addNewOptionGroupedSelect()\">\n              add\n            </button>\n          </div>\n       </div>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-lg-12 col-md-12\">\n        <label\n          for=\"groupedSelectRowCollection\"\n          class=\" control-label greyText editPropertiesLabel\">\n          Add new groups :\n        </label>\n     </div>\n    </div>\n    <div class=\"row\">\n      <div>\n        <div class=\"form-group\">\n          <div class=\"col-sm-9 col-xs-9 col-md-9 col-lg-9\">\n            <input\n              id=\"inputAddNewGroupGroupedOption\"\n              type=\"text\"\n              class=\"form-control\"\n              ng-model=\"leftPanelCtrl.newGroupGroupedSelect.saisie\"\n              placeholder=\"Add new group\">\n          </div>\n          <div class=\"col-sm-3 col-xs-3 col-md-3 col-lg-3\">\n            <button\n              class=\"btn btn-primary\"\n              ng-click=\"leftPanelCtrl.addNewGroupToGroupedSelect()\">\n              add\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-lg-12 col-md-12\">\n        <label\n          class=\" control-label greyText editPropertiesLabel\">\n          Edit/Remove options/groups:\n        </label>\n     </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n        <div class-\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">\n          <div class=\"container\">\n            <div ng-if=\"leftPanelCtrl.groupedSelectRowCollection.rows.length === 0\">\n              <h5 class=\"text-center greyText\">\n                <em>\n                  - no option : add new options -\n                </em>\n              </h5>\n            </div>\n            <table\n              ng-if=\"leftPanelCtrl.groupedSelectRowCollection.rows.length > 0\"\n              class=\"table table-striped\">\n              <thead>\n                <tr>\n                  <th st-ratio=\"20\">\n                    order\n                  </th>\n                  <th st-ratio=\"25\">\n                    group\n                  </th>\n                  <th st-ratio=\"30\">\n                    option\n                  </th>\n                  <th st-ratio=\"25\"></th>\n                </tr>\n                <tr>\n                  <th st-ratio=\"20\"></th>\n                  <th st-ratio=\"25\"></th>\n                  <th st-ratio=\"30\">\n                    <input\n                      ng-model=\"groupedSelectFilter\"\n                      placeholder=\"search for option\"\n                      class=\"input-sm form-control\"\n                      type=\"search\" />\n                  </th>\n                  <th st-ratio=\"25\"></th>\n                </tr>\n              </thead>\n              <tbody>\n              <tr\n                ng-repeat=\"groupedSelectRow in leftPanelCtrl.groupedSelectRowCollection.rows | filter:groupedSelectFilter as groupedSelectRow\">\n                <td st-ratio=\"20\">\n                  {{$index}}\n                </td>\n                <td st-ratio=\"25\">\n                  <div ng-if=\"leftPanelCtrl.groupSelectGroupClick.showList === true\">\n                    <div ng-if=\"leftPanelCtrl.GroupedSelectGroups.list.length === 0\">\n                      <p class=\"text-left noGroupText\">\n                        - add new groups -\n                      </p>\n                    </div>\n                    <div ng-if=\"leftPanelCtrl.GroupedSelectGroups.list.length > 0\">\n                      <ol\n                        class=\"nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12 editGroupedSelectnyaSelect\"\n                        ng-model=\"groupedSelectRow.group\"\n                        id=\"modelGroupedOptionGroupedChoose\"\n                        disabled=\"leftPanelCtrl.GroupedSelectGroups.list.length === 0\">\n                        <li\n                          class=\"nya-bs-option\"\n                          nya-bs-option=\"GroupedSelectGroup in leftPanelCtrl.GroupedSelectGroups.list\"\n                          value=\"GroupedSelectGroup\">\n                          <a>\n                            {{GroupedSelectGroup}}\n                          </a>\n                        </li>\n                      </ol>\n                    </div>\n                  </div>\n                  <div ng-if=\"leftPanelCtrl.groupSelectGroupClick.showList === false\">\n                    {{groupedSelectRow.group}}\n                  </div>\n                </td>\n                <td st-ratio=\"30\">\n                  {{groupedSelectRow.option}}\n                </td>\n                <td st-ratio=\"25\">\n                  <div class=\"pull-right\">\n                    <button\n                      class=\"btn btn-primary\"\n                      ng-click=\"leftPanelCtrl.upThisGroupedSelectRow($index)\">\n                      <i class=\"fa fa-arrow-up\"></i>\n                    </button>\n                    <button\n                      class=\"btn btn-primary\"\n                      ng-click=\"leftPanelCtrl.downThisGroupedSelectRow($index)\">\n                      <i class=\"fa fa-arrow-down\"></i>\n                    </button>\n                    <button\n                      class=\"btn btn-warning\"\n                      ng-click=\"leftPanelCtrl.showGroupListToChoose()\">\n                      <i class=\"fa fa-pencil-square-o\"></i>\n                    </button>\n                    <button\n                      class=\"btn btn-danger\"\n                      ng-click=\"leftPanelCtrl.removeGroupedSelectRow($index)\">\n                      <i class=\"fa fa-trash-o\"></i>\n                    </button>\n                   </div>\n                </td>\n              </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n\t\t\t\t<div class=\"col-md-12\">\n          <label\n            for=\"DescriptionUpdate\"\n            class=\"control-label greyText editPropertiesLabel\">\n            Description :\n          </label>\n          <div class=\"\">\n            <input\n              type=\"text\"\n              class=\"form-control\"\n              ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyDescription\"\n              id=\"DescriptionUpdate\"\n              placeholder=\"Add / edit description here\">\n          </div>\n\t\t\t\t</div>\n      </div>\n    </div>\n  </div>\n  <left-panel-valid-edit-footer />\n</div>\n"

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LEFT_PANEL_DATE_CONTROL_DIRECTIVE = undefined;
	
	var _edaDragDropWayLeftpanelDateControlTemplate = __webpack_require__(42);
	
	var _edaDragDropWayLeftpanelDateControlTemplate2 = _interopRequireDefault(_edaDragDropWayLeftpanelDateControlTemplate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LEFT_PANEL_DATE_CONTROL_DIRECTIVE = 'leftPanelDateControl';
	
	function leftPanelDateControl() {
	  var directive = {
	    restrict: 'E',
	    template: _edaDragDropWayLeftpanelDateControlTemplate2.default
	  };
	  return directive;
	}
	
	leftPanelDateControl.$inject = [];
	
	exports.default = leftPanelDateControl;
	exports.LEFT_PANEL_DATE_CONTROL_DIRECTIVE = LEFT_PANEL_DATE_CONTROL_DIRECTIVE;

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = "<div class=\"panel panel-default\">\n  <div class=\"panel-body\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h5 class=\"greyText\">\n          <i class=\"fa fa-pencil-square-o\"></i>\n          &nbsp;\n          Edit properties :\n        </h5>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n   <label class=\"control-label greyText editPropertiesLabel\">\n      Date format :\n    </label>\n    <div class=\"\">\n      <ol\n        class=\"nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12\"\n        ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.datepickerPopup\"\n        id=\"dateformatSelect\">\n        <li\n          class=\"nya-bs-option\"\n          nya-bs-option=\"dateformat in leftPanelCtrl.demodt.formats\"\n          value=\"dateformat\">\n          <a>\n            {{dateformat}}\n          </a>\n        </li>\n      </ol>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"col-md-12\">\n        <label\n          for=\"inputTextLabelUpdate\"\n          class=\" control-label greyText editPropertiesLabel\">\n          Label text :\n        </label>\n        <div class=\"\">\n          <input\n            type=\"text\"\n            class=\"form-control\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyLabel\"\n            id=\"inputTextLabelUpdate\"\n            placeholder=\"Add / edit control label here\">\n        </div>\n       </div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"\">\n        <label\n          for=\"RequiredUpdate\"\n          class=\"col-md-4 control-label greyText editPropertiesLabel\">\n          Required :\n        </label>\n        <div class=\"col-md-8\">\n          <div class=\"checkboxCssCorrection\">&nbsp;</div>\n          <input\n            type=\"checkbox\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyRequired\"\n            id=\"RequiredUpdate\">\n        </div>\n       </div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"col-md-12\">\n        <label\n          for=\"DescriptionUpdate\"\n          class=\"control-label greyText editPropertiesLabel\">\n          Description :\n        </label>\n        <div class=\"\">\n          <input\n            type=\"text\"\n            class=\"form-control\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyDescription\"\n            id=\"DescriptionUpdate\"\n            placeholder=\"Add / edit description here\">\n        </div>\n       </div>\n      </div>\n    </div>\n  </div>\n  <left-panel-valid-edit-footer />\n</div>\n"

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LEFT_PANEL_CHECKBOX_CONTROL_DIRECTIVE = undefined;
	
	var _edaDragDropWayLeftpanelCheckBoxControlTemplate = __webpack_require__(44);
	
	var _edaDragDropWayLeftpanelCheckBoxControlTemplate2 = _interopRequireDefault(_edaDragDropWayLeftpanelCheckBoxControlTemplate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LEFT_PANEL_CHECKBOX_CONTROL_DIRECTIVE = 'leftPanelCheckBoxControl';
	
	function leftPanelCheckBoxControl() {
	  var directive = {
	    restrict: 'E',
	    template: _edaDragDropWayLeftpanelCheckBoxControlTemplate2.default
	  };
	  return directive;
	}
	
	leftPanelCheckBoxControl.$inject = [];
	
	exports.default = leftPanelCheckBoxControl;
	exports.LEFT_PANEL_CHECKBOX_CONTROL_DIRECTIVE = LEFT_PANEL_CHECKBOX_CONTROL_DIRECTIVE;

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = "<div class=\"panel panel-default\">\n  <div class=\"panel-body\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h5 class=\"greyText\">\n          <i class=\"fa fa-pencil-square-o\"></i>\n          &nbsp;\n          Edit properties :\n        </h5>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n  \t\t\t<div class=\"col-md-12\">\n          <label\n            for=\"inputTextLabelUpdate\"\n            class=\" control-label greyText editPropertiesLabel\">\n            Label text :\n          </label>\n          <div class=\"\">\n            <input\n              type=\"text\"\n              class=\"form-control\"\n              ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyLabel\"\n              id=\"inputTextLabelUpdate\"\n              placeholder=\"Add / edit control label here\">\n          </div>\n  \t\t\t</div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n  \t\t\t<div class=\"\">\n          <label\n            for=\"RequiredUpdate\"\n            class=\"col-md-4 control-label greyText editPropertiesLabel\">\n            Required :\n          </label>\n          <div class=\"col-md-8\">\n            <div class=\"checkboxCssCorrection\">&nbsp;</div>\n            <input\n              type=\"checkbox\"\n              ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyRequired\"\n              id=\"RequiredUpdate\">\n          </div>\n  \t\t\t</div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n  \t\t\t<div class=\"col-md-12\">\n          <label\n            for=\"DescriptionUpdate\"\n            class=\"control-label greyText editPropertiesLabel\">\n            Description :\n          </label>\n          <div class=\"\">\n            <input\n              type=\"text\"\n              class=\"form-control\"\n              ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyDescription\"\n              id=\"DescriptionUpdate\"\n              placeholder=\"Add / edit description here\">\n          </div>\n  \t\t\t</div>\n      </div>\n    </div>\n  </div>\n  <left-panel-valid-edit-footer />\n</div>\n"

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LEFT_PANEL_BLANK_CONTROL_DIRECTIVE = undefined;
	
	var _edaDragDropWayLeftpanelBlankControlTemplate = __webpack_require__(46);
	
	var _edaDragDropWayLeftpanelBlankControlTemplate2 = _interopRequireDefault(_edaDragDropWayLeftpanelBlankControlTemplate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LEFT_PANEL_BLANK_CONTROL_DIRECTIVE = 'leftPanelBlankControl';
	
	function leftPanelBlankControl() {
	  var directive = {
	    restrict: 'E',
	    template: _edaDragDropWayLeftpanelBlankControlTemplate2.default
	  };
	  return directive;
	}
	
	leftPanelBlankControl.$inject = [];
	
	exports.default = leftPanelBlankControl;
	exports.LEFT_PANEL_BLANK_CONTROL_DIRECTIVE = LEFT_PANEL_BLANK_CONTROL_DIRECTIVE;

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = "<div class=\"panel panel-default\">\n  <div class=\"panel-body\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h5 class=\"greyText\">\n          <i class=\"fa fa-pencil-square-o\"></i>\n          &nbsp; \n          Edit :\n        </h5>\n      </div>\n    </div> \n    <div class=\"row\">\n      <div class=\"col-sm-12\">\n        <h5 class=\"text-center greyText\">\n          Column will be blank\n        </h5>\n      </div>\n    </div>\n  </div>\n  <left-panel-valid-edit-footer />\n</div>\n"

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LEFT_PANEL_BASIC_SELECT_CONTROL_DIRECTIVE = undefined;
	
	var _edaDragDropWayLeftpanelBasicSelectControlTemplate = __webpack_require__(48);
	
	var _edaDragDropWayLeftpanelBasicSelectControlTemplate2 = _interopRequireDefault(_edaDragDropWayLeftpanelBasicSelectControlTemplate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LEFT_PANEL_BASIC_SELECT_CONTROL_DIRECTIVE = 'leftPanelBasicSelectControl';
	
	function leftPanelBasicSelectControl() {
	  var directive = {
	    restrict: 'E',
	    template: _edaDragDropWayLeftpanelBasicSelectControlTemplate2.default
	  };
	  return directive;
	}
	
	leftPanelBasicSelectControl.$inject = [];
	
	exports.default = leftPanelBasicSelectControl;
	exports.LEFT_PANEL_BASIC_SELECT_CONTROL_DIRECTIVE = LEFT_PANEL_BASIC_SELECT_CONTROL_DIRECTIVE;

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = "<div class=\"panel panel-default\">\n  <div class=\"panel-body\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h5 class=\"greyText\">\n          <i class=\"fa fa-pencil-square-o\"></i>\n          &nbsp;\n          Edit properties :\n        </h5>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"col-lg-12 col-md-12\">\n        <label\n          for=\"basicSelectRowCollection\"\n          class=\" control-label greyText editPropertiesLabel\">\n          Add new options :\n        </label>\n     </div>\n    </div>\n    <div class=\"row\">\n      <div>\n        <div class=\"form-group\">\n          <div class=\"col-sm-9 col-xs-9 col-md-9 col-lg-9\">\n            <input\n              type=\"text\"\n              class=\"form-control\"\n              id=\"inputAddNewBasicOption\"\n              placeholder=\"add new option\"\n              ng-model=\"leftPanelCtrl.newOptionBasicSelect.saisie\">\n            </div>\n            <div class=\"col-sm-3 col-xs-3 col-md-3 col-lg-3\">\n              <button\n                class=\"btn btn-primary\"\n                ng-click=\"leftPanelCtrl.addNewOptionBasicSelect()\">\n                add\n              </button>\n            </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"row\">\n     <div class=\"col-lg-12 col-md-12\">\n       <label class=\" control-label greyText editPropertiesLabel\">\n         Edit/Remove options :\n       </label>\n     </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n        <div class-\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">\n          <div class=\"container\">\n            <div ng-if=\"leftPanelCtrl.basicSelectRowCollection.rows.length === 0\">\n              <h5 class=\"text-center greyText\">\n                <em>\n                  - no option : add new options -\n                </em>\n              </h5>\n            </div>\n            <table\n              ng-if=\"leftPanelCtrl.basicSelectRowCollection.rows.length > 0\"\n              class=\"table table-striped\">\n              <thead>\n              <tr>\n                <th st-ratio=\"20\">\n                  order\n                </th>\n                <th st-ratio=\"55\">\n                  option\n                </th>\n                <th st-ratio=\"25\"></th>\n              </tr>\n              <tr>\n                <th st-ratio=\"20\"></th>\n                <th st-ratio=\"55\">\n                  <input\n                    ng-model=\"leftPanelCtrl.basicSelectFilter\"\n                    placeholder=\"search for option\"\n                    class=\"input-sm form-control\"\n                    type=\"search\" />\n                </th>\n                <th st-ratio=\"25\"></th>\n              </tr>\n              </thead>\n              <tbody>\n                <tr ng-repeat=\"basicSelectRow in leftPanelCtrl.basicSelectRowCollection.rows | filter:basicSelectFilter as basicSelectRow\">\n                  <td st-ratio=\"20\">\n                    {{$index}}\n                  </td>\n                  <td st-ratio=\"55\">\n                    {{basicSelectRow.option}}\n                  </td>\n                  <td st-ratio=\"25\">\n                    <div class=\"pull-right\">\n                      <button\n                        class=\"btn btn-primary\"\n                        ng-click=\"leftPanelCtrl.upThisRow($index)\">\n                        <i class=\"fa fa-arrow-up\"></i>\n                      </button>\n                      <button\n                        class=\"btn btn-primary\"\n                        ng-click=\"leftPanelCtrl.downThisRow($index)\">\n                        <i class=\"fa fa-arrow-down\"></i>\n                      </button>\n                      <button\n                        class=\"btn btn-danger\"\n                        ng-click=\"leftPanelCtrl.removeRow($index)\">\n                        <i class=\"fa fa-trash-o\"></i>\n                      </button>\n                     </div>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n      <div class=\"row\">\n        <div class=\"form-group\">\n        \t<div class=\"col-md-12\">\n            <label\n              for=\"DescriptionUpdate\"\n              class=\"control-label greyText editPropertiesLabel\">\n              Description :\n            </label>\n            <div class=\"\">\n              <input\n                type=\"text\"\n                class=\"form-control\"\n                ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyDescription\"\n                id=\"DescriptionUpdate\"\n                placeholder=\"Add / edit description here\">\n            </div>\n        \t</div>\n        </div>\n      </div>\n    </div>\n  <left-panel-valid-edit-footer />\n</div>\n"

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _edaDragDropWayFormlyProxyFormFieldManage = __webpack_require__(50);
	
	var _edaDragDropWayFormlyProxyFormFieldManage2 = _interopRequireDefault(_edaDragDropWayFormlyProxyFormFieldManage);
	
	var _edaDragDropWayFormlyProxyFormFieldManage3 = __webpack_require__(51);
	
	var _edaDragDropWayFormlyProxyFormFieldManage4 = _interopRequireDefault(_edaDragDropWayFormlyProxyFormFieldManage3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var FORMLY_PROXY_MODULE = '';
	
	exports.default = angular.module(FORMLY_PROXY_MODULE, []).service(_edaDragDropWayFormlyProxyFormFieldManage.FORM_FIELD_MANAGE_SERVICE, _edaDragDropWayFormlyProxyFormFieldManage2.default).provider(_edaDragDropWayFormlyProxyFormFieldManage3.EASY_FORM_FORMLY_BINDING_MODEL_PROVIDER, _edaDragDropWayFormlyProxyFormFieldManage4.default);

/***/ },
/* 50 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var FORM_FIELD_MANAGE_SERVICE = 'formFieldManage';
	
	var formFieldManage = function () {
	  function formFieldManage(EasyFormGenFormlyBindingModels) {
	    _classCallCheck(this, formFieldManage);
	
	    this.EasyFormGenFormlyBindingModels = EasyFormGenFormlyBindingModels;
	    this.init();
	  }
	
	  _createClass(formFieldManage, [{
	    key: 'init',
	    value: function init() {}
	
	    /**
	     * At initial state : configuration model will contain 1 line, since :
	     *    -> it is non sense to create a form without a single line (no line = no form at all)
	     *    -> so it is non sense to force user to add a first line
	     *
	     *  PLEASE NOTE columns array contains objects that look like formly fields one
	     */
	
	  }, {
	    key: 'initConfigurationEditFromScratch',
	    value: function initConfigurationEditFromScratch(configurationModel, addStepWayProperties) {
	      var configurationModelInit = this.EasyFormGenFormlyBindingModels.getEasyFormInitialStateConfigurationModel(addStepWayProperties);
	      angular.copy(configurationModelInit, configurationModel);
	    }
	
	    /**
	     * Get an configuration empty (no init line) then empty it with lines array provided in param
	     * @param   object - configurationModel   [configuration model]
	     * @param   array -  lines                [an array : lines to apply to an empty configuration model]
	     * @param   bool -   addStepWayProperties [description]
	     * @return {object message}               [give details on how it happened to caller]
	     */
	
	  }, {
	    key: 'bindConfigurationLines',
	    value: function bindConfigurationLines(configurationModel, lines, addStepWayProperties) {
	      if (Object.prototype.toString.call(lines) === '[object Array]') {
	        var configurationModelResult = this.EasyFormGenFormlyBindingModels.getEasyFormReloadConfigurationModel(addStepWayProperties);
	        configurationModelResult.lines = [].concat(lines);
	        angular.copy(configurationModelResult, configurationModel);
	        return this.getMessageObject('configuration model is bound', 'lines are bound to configuration model.');
	      } else {
	        return this.getErrorObject('lines is not an array', 'Checks lines type, it is not an array.');
	      }
	    }
	
	    /**
	     * applyConfigurationToformlyModel :
	     *  - bind configuration model into formly field model
	     *  - reset dataModel (formlyfield may have changed so previous dataModel would be false)
	     * @param  configurationModel
	     * @param  formlyModel
	     * @param  formlyDataModel
	     */
	
	  }, {
	    key: 'applyConfigurationToformlyModel',
	    value: function applyConfigurationToformlyModel(configurationModel, formlyModel, formlyDataModel) {
	      this.resetFormlyModel(formlyModel);
	      this.resetDataModel(formlyDataModel);
	      var lineNumber = configurationModel.lines.length;
	      for (var i = 0; i < lineNumber; i++) {
	        this.AddNColumnControl(formlyModel, configurationModel, i);
	      }
	    }
	  }, {
	    key: 'resetFormlyModel',
	    value: function resetFormlyModel(formlyModel) {
	      var resetformly = [];
	      angular.copy(resetformly, formlyModel);
	    }
	  }, {
	    key: 'AddNColumnControl',
	    value: function AddNColumnControl(formlyModel, configurationModel, lineIndex) {
	      var _this = this;
	
	      var numberOfColumns = configurationModel.lines[lineIndex].columns.length;
	      /**
	       * push formly model
	       * here : only className and empty fieldGroup (controls != header)
	       * if header will be reset to set a template (at least we have now indexFormlyModel)
	       */
	      var rawFormlyModel = {
	        className: 'row',
	        fieldGroup: []
	      };
	      //get index formlyModel for this line :
	      var indexFormlyModel = formlyModel.push(rawFormlyModel) - 1;
	
	      // iterates through controls in the line
	      configurationModel.lines[lineIndex].columns.forEach(function (column) {
	        var controlTemplate = {};
	        if (typeof controlTemplate !== 'undefined' &&
	        // column.control.type     !== 'header'    &&
	        // column.control.type     !== 'subTitle'  &&
	        column.control.type !== 'none') {
	          /**
	           * controls : getFormlyControlTemplateForNcolumnLine()
	           *
	            * @PARAM numberOfColumns       : integer to deduce cssClss to apply
	            * @PARAM column.control.type   : to add if needed specific properties (example : datepicker)
	            */
	          if (column.control.type === 'header' || column.control.type === 'subTitle') {
	            var headerTextContent = column.control.templateOptions.description;
	            controlTemplate.template = _this.EasyFormGenFormlyBindingModels.getHeaderTemplateForNcolumnLine(numberOfColumns, headerTextContent).template;
	            controlTemplate.className = _this.EasyFormGenFormlyBindingModels.getRawHeaderTemplates().selectedClass;
	          } else {
	            controlTemplate = _this.EasyFormGenFormlyBindingModels.getFormlyControlTemplateForNcolumnLine(numberOfColumns, column.control.type);
	            /**
	            * NEED REFACTOR HERE
	            * should bind properties dynamically
	            *
	            * TODO need to validate all controls (datepicker may not work)
	            * need to refactor
	            */
	            controlTemplate.className = column.control.className;
	            controlTemplate.type = column.control.type;
	            controlTemplate.key = column.control.key;
	            controlTemplate.templateOptions.type = column.control.templateOptions.type;
	            controlTemplate.templateOptions.label = column.control.templateOptions.label;
	            controlTemplate.templateOptions.required = column.control.templateOptions.required;
	            controlTemplate.templateOptions.placeholder = column.control.templateOptions.placeholder;
	            controlTemplate.templateOptions.description = column.control.templateOptions.description;
	            controlTemplate.templateOptions.options = [].concat(column.control.templateOptions.options);
	
	            if (typeof controlTemplate.templateOptions.datepickerPopup !== 'undefined') column.control.templateOptions.datepickerPopup = controlTemplate.templateOptions.datepickerPopup;
	          }
	          /**
	           * popuplate properties
	           */
	
	          /**
	           * push control into formly model in its group
	           */
	
	          /**
	          * need to catch this random error
	          */
	          formlyModel[indexFormlyModel].fieldGroup.push(controlTemplate);
	        }
	      });
	    }
	  }, {
	    key: 'isTemplateOptionDefined',
	    value: function isTemplateOptionDefined(obj) {
	      return typeof obj.templateOptions !== 'undefined' ? true : false;
	    }
	  }, {
	    key: 'extractTemplateOptionLabel',
	    value: function extractTemplateOptionLabel(obj) {
	      return typeof obj.templateOptions !== 'undefined' ? typeof obj.templateOptions.label !== 'undefined' ? obj.templateOptions.label : '' : '';
	    }
	  }, {
	    key: 'extractTemplateOptionDatepickerPopup',
	    value: function extractTemplateOptionDatepickerPopup(obj) {
	      return typeof obj.templateOptions !== 'undefined' ? typeof obj.templateOptions.datepickerPopup !== 'undefined' ? obj.templateOptions.datepickerPopup : '' : '';
	    }
	  }, {
	    key: 'extractTemplateOptionRequired',
	    value: function extractTemplateOptionRequired(obj) {
	      return typeof obj.templateOptions !== 'undefined' ? typeof obj.templateOptions.required !== 'undefined' ? obj.templateOptions.required : '' : '';
	    }
	    //radio and select
	
	  }, {
	    key: 'extractTemplateOptionOptions',
	    value: function extractTemplateOptionOptions(obj) {
	      return typeof obj.templateOptions !== 'undefined' ? typeof obj.templateOptions.options !== 'undefined' ? obj.templateOptions.options : '' : '';
	    }
	  }, {
	    key: 'extractTemplateOptionType',
	    value: function extractTemplateOptionType(obj) {
	      return typeof obj.subtype !== 'undefined' ? obj.subtype : '';
	    }
	  }, {
	    key: 'extractTemplateOptionPlaceholder',
	    value: function extractTemplateOptionPlaceholder(obj) {
	      return typeof obj.templateOptions !== 'undefined' ? typeof obj.templateOptions.placeholder !== 'undefined' ? obj.templateOptions.placeholder : '' : '';
	    }
	  }, {
	    key: 'extractTemplateOptionDescription',
	    value: function extractTemplateOptionDescription(obj) {
	      return typeof obj.templateOptions !== 'undefined' ? typeof obj.templateOptions.description !== 'undefined' ? obj.templateOptions.description : '' : '';
	    }
	
	    // formly model functions
	
	  }, {
	    key: 'resetDataModel',
	    value: function resetDataModel(obj) {
	      var emptyDataModel = {};
	      angular.copy(emptyDataModel, obj);
	      return true;
	    }
	
	    // custom errors
	
	  }, {
	    key: 'getErrorObject',
	    value: function getErrorObject(errorTitle, errorMessage) {
	      var messageObj = {
	        noError: false,
	        title: '',
	        Message: ''
	      };
	      messageObj.noError = false;
	      messageObj.title = errorTitle;
	      messageObj.Message = errorMessage;
	      return messageObj;
	    }
	  }, {
	    key: 'getMessageObject',
	    value: function getMessageObject(messageTitle, messageBody) {
	      var messageObj = {
	        noError: false,
	        title: '',
	        Message: ''
	      };
	      messageObj.noError = true;
	      messageObj.title = messageTitle;
	      messageObj.Message = messageBody;
	      return messageObj;
	    }
	  }]);
	
	  return formFieldManage;
	}();
	
	formFieldManage.$inject = ['EasyFormGenFormlyBindingModels'];
	
	exports.default = formFieldManage;
	exports.FORM_FIELD_MANAGE_SERVICE = FORM_FIELD_MANAGE_SERVICE;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EASY_FORM_FORMLY_BINDING_MODEL_PROVIDER = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _edaDragDropWayFormlyProxyFormFieldManageProvider = __webpack_require__(52);
	
	var helpers = _interopRequireWildcard(_edaDragDropWayFormlyProxyFormFieldManageProvider);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var EASY_FORM_FORMLY_BINDING_MODEL_PROVIDER = 'EasyFormGenFormlyBindingModels';
	
	function EasyFormGenFormlyBindingModels() {
	
	  var _easyFormListControls = helpers.initEasyFormListControls();
	  var _easyFormEmptyConfigurationLineModel = helpers.initEasyFormEmptyConfigurationLineModel();
	  var _emptyControlFieldModel = helpers.initEmptyControlFieldModel();
	  var _easyFormInitialStateConfigurationModel = helpers.initEasyFormInitialStateConfigurationModel(_easyFormEmptyConfigurationLineModel);
	  var _easyFormInitialStateConfigurationModelAddOnForStepWay = helpers.initEasyFormInitialStateConfigurationModelAddOnForStepWay();
	  var _easyFormReloadConfigurationModel = helpers.initEasyFormReloadConfigurationModel();
	  var _headerTemplates = helpers.initHeaderTemplates();
	  var _formlyControlTemplates = helpers.initFormlyControlTemplates();
	  var _particularControlProperties = helpers.initParticularControlProperties();
	
	  this.getAllParticularControlProperties = getAllParticularControlProperties;
	  this.addParticularControlProperties = addParticularControlProperties;
	  this.getEasyFormListControls = getEasyFormListControls;
	  this.addEasyFormControlToList = addEasyFormControlToList;
	  this.getHeaderTemplates = getHeaderTemplates;
	  this.addHeaderTemplateCssClass = addHeaderTemplateCssClass;
	  this.getFormlyControlTemplate = getFormlyControlTemplate;
	  this.addformlyControlTemplatesCssClass = addformlyControlTemplatesCssClass;
	  this.setFormlyControlTemplate = setFormlyControlTemplate;
	  this.$get = getFct;
	
	  function getAllParticularControlProperties() {
	    return _particularControlProperties;
	  }
	
	  function addParticularControlProperties(newParticularControlProperty) {
	    // test object param has waited properties
	    if ('controlType' in newParticularControlProperty && 'properties' in newParticularControlProperty) {
	      var isAnUpdate = false;
	      if (_particularControlProperties.length > 0) {
	        _particularControlProperties.forEach(function (controlProp) {
	          if (controlProp.controlType === newParticularControlProperty.controlType) {
	            controlProp.properties = [].concat(newParticularControlProperty.properties);
	            isAnUpdate = true;
	          }
	        });
	      }
	      if (!isAnUpdate) {
	        _particularControlProperties.push(newParticularControlProperty);
	      }
	    }
	    return _particularControlProperties;
	  }
	
	  function getEasyFormListControls() {
	    return _easyFormListControls;
	  }
	
	  function addEasyFormControlToList(controlDeclaration) {
	    if (typeof controlDeclaration !== 'undefined') {
	      _easyFormListControls.controls.push(controlDeclaration);
	    }
	  }
	
	  function getHeaderTemplates() {
	    return _headerTemplates;
	  }
	
	  function addHeaderTemplateCssClass(cssClassToAdd) {
	    if (typeof cssClassToAdd !== 'undefined') {
	      _headerTemplates.cssClass.push(cssClassToAdd);
	    }
	  }
	
	  function getFormlyControlTemplate() {
	    return _formlyControlTemplates;
	  }
	
	  function addformlyControlTemplatesCssClass(cssClassToAdd) {
	    if (typeof cssClassToAdd !== 'undefined') {
	      _formlyControlTemplates.className.push(cssClassToAdd);
	    }
	  }
	
	  function setFormlyControlTemplate(newFormlyControlTemplate) {
	    if ('className' in newFormlyControlTemplate && 'type' in newFormlyControlTemplate && 'key' in newFormlyControlTemplate && 'templateOptions' in newFormlyControlTemplate) {
	      _formlyControlTemplates = angular.copy(newFormlyControlTemplate);
	    }
	    return true;
	  }
	
	  getFct.$inject = [];
	  function getFct() {
	    var service = {
	      getEasyFormListControls: getEasyFormListControlsFct,
	      getEasyFormInitialStateConfigurationModel: getEasyFormInitialStateConfigurationModel,
	      getEasyFormReloadConfigurationModel: getEasyFormReloadConfigurationModel,
	      getEasyFormEmptyConfigurationLineModel: getEasyFormEmptyConfigurationLineModel,
	      getEasyFormConfigurationEmptyControlModel: getEasyFormConfigurationEmptyControlModel,
	      getRawHeaderTemplates: getRawHeaderTemplates,
	      getHeaderTemplateForNcolumnLine: getHeaderTemplateForNcolumnLine,
	      getRawFormlyControlTemplates: getRawFormlyControlTemplates,
	      getFormlyControlTemplateForNcolumnLine: getFormlyControlTemplateForNcolumnLine
	    };
	    return service;
	
	    function getEasyFormListControlsFct() {
	      return _easyFormListControls;
	    }
	
	    function getEasyFormInitialStateConfigurationModel(addStepWayProperties) {
	      var initialConfigurationModel = angular.copy(_easyFormInitialStateConfigurationModel);
	      if (typeof addStepWayProperties !== 'undefined') {
	        if (addStepWayProperties) {
	          // add properties specific to step way
	          angular.extend(initialConfigurationModel, _easyFormInitialStateConfigurationModelAddOnForStepWay);
	        }
	      }
	      return initialConfigurationModel;
	    }
	
	    function getEasyFormReloadConfigurationModel(addStepWayProperties) {
	      var initialConfigurationModel = angular.copy(_easyFormReloadConfigurationModel);
	      if (typeof addStepWayProperties !== 'undefined') {
	        if (addStepWayProperties) {
	          // add properties specific to step way
	          angular.extend(initialConfigurationModel, _easyFormInitialStateConfigurationModelAddOnForStepWay);
	        }
	      }
	      return initialConfigurationModel;
	    }
	
	    function getEasyFormEmptyConfigurationLineModel() {
	      return _easyFormEmptyConfigurationLineModel;
	    }
	
	    function getEasyFormConfigurationEmptyControlModel() {
	      return _emptyControlFieldModel;
	    }
	
	    function getRawHeaderTemplates() {
	      return _headerTemplates;
	    }
	
	    function getHeaderTemplateForNcolumnLine(nbColInLines, textContent) {
	      if (typeof nbColInLines !== 'undefined' && typeof textContent !== 'undefined') {
	        if (nbColInLines === parseInt(nbColInLines, 10)) {
	          if (nbColInLines <= _headerTemplates.cssClass.length) {
	            var headerToReturn = {};
	            headerToReturn.className = _headerTemplates.cssClass[nbColInLines - 1];
	            // header html property depends this property dont forget to set it before reading html property
	            _headerTemplates.textContent = textContent;
	            _headerTemplates.selectedClass = headerToReturn.className;
	            headerToReturn.template = [_headerTemplates.simpleHtml1, textContent, _headerTemplates.simpleHtml2].join('');
	            return headerToReturn;
	          }
	        }
	      }
	    }
	
	    function getRawFormlyControlTemplates() {
	      return _formlyControlTemplates;
	    }
	
	    function getFormlyControlTemplateForNcolumnLine(nbColInLines, controlType) {
	      if (typeof nbColInLines !== 'undefined') {
	        if (nbColInLines === parseInt(nbColInLines, 10)) {
	          if (nbColInLines <= _formlyControlTemplates.className.length) {
	            var _ret = function () {
	              var controlToReturn = angular.copy(_formlyControlTemplates);
	              controlToReturn.className = _formlyControlTemplates.className[nbColInLines - 1];
	              // throw `it should have a bug upper line`;
	              /* eslint no-console:0 */
	              console.warn('it should have a bug upper line');
	              /**
	               * check controlType: it may require another particular property
	               */
	              if (typeof controlType !== 'undefined') {
	                _particularControlProperties.forEach(function (controlProp) {
	                  if (controlProp.controlType === controlType) {
	                    /**
	                     * add all properties this controlType has
	                     * 
	                     * NOTE : dot expression and bracket expression to access object property
	                     * http://www.ecma-international.org/ecma-262/5.1/#sec-11.2.1
	                     */
	                    controlProp.properties.forEach(function (aPropToAdd) {
	                      if (aPropToAdd.isRoot) controlToReturn[aPropToAdd.value] = '';
	                      if (aPropToAdd.isTemplateOptions) controlToReturn.templateOptions[aPropToAdd.value] = '';
	                    });
	                  }
	                });
	              }
	              return {
	                v: controlToReturn
	              };
	            }();
	
	            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	          }
	        }
	      }
	    }
	  }
	}
	
	EasyFormGenFormlyBindingModels.$inject = [];
	
	exports.default = EasyFormGenFormlyBindingModels;
	exports.EASY_FORM_FORMLY_BINDING_MODEL_PROVIDER = EASY_FORM_FORMLY_BINDING_MODEL_PROVIDER;

/***/ },
/* 52 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var initEasyFormListControls = exports.initEasyFormListControls = function initEasyFormListControls() {
	  return {
	    controls: [],
	    selectedControl: 'none',
	    temporyConfig: {
	      selectedControl: 'none',
	      formlyLabel: 'label',
	      formlyRequired: false,
	      formlyDescription: '',
	      formlyPlaceholder: '',
	      formlyOptions: []
	    }
	  };
	};
	
	var initEasyFormEmptyConfigurationLineModel = exports.initEasyFormEmptyConfigurationLineModel = function initEasyFormEmptyConfigurationLineModel() {
	  return {
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
	  };
	};
	
	var initEmptyControlFieldModel = exports.initEmptyControlFieldModel = function initEmptyControlFieldModel() {
	  return {
	    'control': {
	      'type': 'none',
	      'key': 'none'
	    }
	  };
	};
	
	var initEasyFormInitialStateConfigurationModel = exports.initEasyFormInitialStateConfigurationModel = function initEasyFormInitialStateConfigurationModel(_easyFormEmptyConfigurationLineModel) {
	  // commun all easy form generator ways
	  return {
	    submitButtonText: 'submit',
	    cancelButtonText: 'cancel',
	    lines: [].concat(_easyFormEmptyConfigurationLineModel)
	  };
	};
	
	var initEasyFormInitialStateConfigurationModelAddOnForStepWay = exports.initEasyFormInitialStateConfigurationModelAddOnForStepWay = function initEasyFormInitialStateConfigurationModelAddOnForStepWay() {
	  // specific easy form generator — step way — (not drag and drop way), needed for wizard management
	  return {
	    activeLine: 1,
	    listConfigStep: ['init', 'first', 'second', 'third'],
	    stepIndicators: [true, false, false, false],
	    configStepCounter: 0
	  };
	};
	
	var initEasyFormReloadConfigurationModel = exports.initEasyFormReloadConfigurationModel = function initEasyFormReloadConfigurationModel() {
	  var reloadConfigModel = initEasyFormInitialStateConfigurationModel();
	  reloadConfigModel.lines = [];
	  return reloadConfigModel;
	};
	
	// can't use arrow function here -> 'this' would be bound to caller rather than expected current returned object...  
	var initHeaderTemplates = exports.initHeaderTemplates = function initHeaderTemplates() {
	  var headerTemplate = {
	    cssClass: ['col-xs-12', 'col-xs-6', 'col-xs-4'],
	    textContent: '',
	    html_part1: ['  <div class="'].join(''),
	    selectedClass: '',
	    html_part2: ['">', '    <h2 class="text-center">'].join(''),
	    html_part3: this.textContent,
	    html_part4: ['    <h2>', '    <hr/>', '  </div>'].join(''),
	    simpleHtml1: ['<h2 class="text-center">'].join(''),
	    simpleHtml2: ['    <h2>', '    <hr/>'].join('')
	  };
	  return headerTemplate;
	};
	
	var initFormlyControlTemplates = exports.initFormlyControlTemplates = function initFormlyControlTemplates() {
	  return {
	    className: ['col-xs-12', 'col-xs-6', 'col-xs-4'],
	    type: '',
	    key: '',
	    templateOptions: {
	      type: '',
	      label: '',
	      required: '',
	      placeholder: '',
	      description: '',
	      options: ''
	    }
	  };
	};
	
	var initParticularControlProperties = exports.initParticularControlProperties = function initParticularControlProperties() {
	  return [{
	    controlType: 'datepicker',
	    properties: [{
	      isRoot: false,
	      isTemplateOptions: true,
	      value: 'datepickerPopup'
	    }]
	  }];
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _edaDragDropWayDragdropDdContentCounter = __webpack_require__(54);
	
	var _edaDragDropWayDragdropDdContentCounter2 = _interopRequireDefault(_edaDragDropWayDragdropDdContentCounter);
	
	var _edaDragDropWayDragdropDdContentCounter3 = __webpack_require__(55);
	
	var _edaDragDropWayDragdropDdContentCounter4 = _interopRequireDefault(_edaDragDropWayDragdropDdContentCounter3);
	
	var _edaDragDropWayDragdropDdDecorContainer = __webpack_require__(56);
	
	var _edaDragDropWayDragdropDdDecorContainer2 = _interopRequireDefault(_edaDragDropWayDragdropDdDecorContainer);
	
	var _edaDragDropWayDragdropDdDecorContainer3 = __webpack_require__(58);
	
	var _edaDragDropWayDragdropDdDecorContainer4 = _interopRequireDefault(_edaDragDropWayDragdropDdDecorContainer3);
	
	var _edaDragDropWayDragdropDdDecorDropZone = __webpack_require__(59);
	
	var _edaDragDropWayDragdropDdDecorDropZone2 = _interopRequireDefault(_edaDragDropWayDragdropDdDecorDropZone);
	
	var _edaDragDropWayDragdropDdDecorItem = __webpack_require__(61);
	
	var _edaDragDropWayDragdropDdDecorItem2 = _interopRequireDefault(_edaDragDropWayDragdropDdDecorItem);
	
	var _edaDragDropWayDragdropDdDecorItem3 = __webpack_require__(63);
	
	var _edaDragDropWayDragdropDdDecorItem4 = _interopRequireDefault(_edaDragDropWayDragdropDdDecorItem3);
	
	var _edaDragDropWayDragdropDdDecorLine = __webpack_require__(64);
	
	var _edaDragDropWayDragdropDdDecorLine2 = _interopRequireDefault(_edaDragDropWayDragdropDdDecorLine);
	
	var _edaDragDropWayDragdropDdNoEditableControl = __webpack_require__(66);
	
	var _edaDragDropWayDragdropDdNoEditableControl2 = _interopRequireDefault(_edaDragDropWayDragdropDdNoEditableControl);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DRAGDROP_MODULE = 'edaDragDropWay.dragdrop.module'; /* global angular */
	exports.default = angular.module(DRAGDROP_MODULE, []).directive(_edaDragDropWayDragdropDdContentCounter.DD_CONTENT_COUNTER_DIRECTIVE, _edaDragDropWayDragdropDdContentCounter2.default).controller(_edaDragDropWayDragdropDdDecorContainer3.DD_DECOR_CONTAINER_CONTROLLER_NAME, _edaDragDropWayDragdropDdDecorContainer4.default).directive(_edaDragDropWayDragdropDdDecorContainer.DD_DECOR_CONTAINER_DIRECTIVE, _edaDragDropWayDragdropDdDecorContainer2.default).directive(_edaDragDropWayDragdropDdDecorDropZone.DD_DECOR_DROPZONE_DIRECTIVE, _edaDragDropWayDragdropDdDecorDropZone2.default).directive(_edaDragDropWayDragdropDdDecorItem.DRAG_DROP_DECOR_ITEM, _edaDragDropWayDragdropDdDecorItem2.default).service(_edaDragDropWayDragdropDdDecorItem3.DRAG_DROP_ITEM_DECOR_SERVICE, _edaDragDropWayDragdropDdDecorItem4.default).directive(_edaDragDropWayDragdropDdNoEditableControl.DRAG_DROP_NO_EDITABLE_CONTROL, _edaDragDropWayDragdropDdNoEditableControl2.default).service(_edaDragDropWayDragdropDdContentCounter3.DRAG_DROP_ITEM_COUNTER_SERVICE, _edaDragDropWayDragdropDdContentCounter4.default).directive(_edaDragDropWayDragdropDdDecorLine.DRAG_DROP_DECOR_LINE, _edaDragDropWayDragdropDdDecorLine2.default);

/***/ },
/* 54 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var DD_CONTENT_COUNTER_DIRECTIVE = 'ddContentCounter';
	
	function ddContentCounter(dragDropItemCounterService, $timeout) {
		var directive = {
			restrict: 'A',
			scope: {
				valueWhenPlaceholder: '@ddValueWhenPlaceholder',
				valueWhendragging: '@ddValueWhenDragging',
				fullModel: '=ddFullModel',
				currentIndex: '@ddContentCounterCurrentIndex',
				parentIndex: '@ddContentCounterParentIndex',
				forceRefresh: '=ddContentCounterForceCssRefresh'
			},
			link: linkfct
		};
		return directive;
	
		function linkfct($scope, element) {
			var timer = void 0;
			// watch children length change : to update css item class
			$scope.$watch(function () {
				return element[0].children.length;
			}, function (newValue, oldValue) {
				if (newValue !== oldValue) {
					(function () {
						var newRealCount = 0;
						var listClassForThisRow = [];
						for (var i = element[0].children.length - 1; i >= 0; i--) {
							if (dragDropItemCounterService.isHtmlElementToCount(element[0].children[i].classList)) {
								newRealCount++;
								listClassForThisRow.push({ item: i, isReal: true });
							} else {
								listClassForThisRow.push({ item: i, isReal: false });
							}
						}
						$scope.contentRealCount = newRealCount;
						// a timer otherwise won't refresh everytime
						timer = $timeout(function () {
							dragDropItemCounterService.updateLineItemCss($scope.fullModel, listClassForThisRow, $scope.parentIndex, $scope.currentIndex, newRealCount);
						}, 20);
					})();
				}
			});
	
			$scope.$on('$destroy', function () {
				$timeout.cancel(timer);
			});
		}
	}
	
	ddContentCounter.$inject = ['dragDropItemCounterService', '$timeout'];
	
	exports.default = ddContentCounter;
	exports.DD_CONTENT_COUNTER_DIRECTIVE = DD_CONTENT_COUNTER_DIRECTIVE;

/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DRAG_DROP_ITEM_COUNTER_SERVICE = 'dragDropItemCounterService';
	
	var dragDropItemCounterService = function () {
		function dragDropItemCounterService(easyFormDragWayConfig) {
			_classCallCheck(this, dragDropItemCounterService);
	
			this.easyFormDragWayConfig = easyFormDragWayConfig;
			this.init();
		}
	
		_createClass(dragDropItemCounterService, [{
			key: 'init',
			value: function init() {
				this._modelItemRealCounter = [];
				this._itemsNotToCount = angular.copy(this.easyFormDragWayConfig.getItemsNotToCount());
			}
		}, {
			key: 'getItemsNotToCount',
			value: function getItemsNotToCount() {
				return this._itemsNotToCount;
			}
		}, {
			key: 'getModelItemsRealCounter',
			value: function getModelItemsRealCounter() {
				return this._modelItemRealCounter;
			}
		}, {
			key: 'isHtmlElementToCount',
			value: function isHtmlElementToCount(htmlvalue) {
				var isToCount = true;
				if (htmlvalue.length > 0) {
					angular.forEach(this._itemsNotToCount, function (value) {
						for (var classes = htmlvalue.length - 1; classes >= 0; classes--) {
							if (htmlvalue[classes] === value) isToCount = isToCount && false;
						}
					});
				}
				return isToCount;
			}
		}, {
			key: 'updateLineItemCss',
			value: function updateLineItemCss(fullModel, listCssToApply, columIndex, lineIndex, realCount) {
				if (typeof fullModel !== 'undefined' && typeof listCssToApply !== 'undefined' && typeof columIndex !== 'undefined' && typeof lineIndex !== 'undefined' && typeof realCount !== 'undefined') {
					for (var i = fullModel[columIndex][lineIndex].length - 1; i >= 0; i--) {
						for (var j = 0; j < listCssToApply.length; j++) {
							if (listCssToApply[j].item === i && listCssToApply[j].isReal === true) {
								fullModel[columIndex][lineIndex][i].cssClass = this.easyFormDragWayConfig.getItemCssDependingNumberItemsInRow(realCount);
							}
						}
					}
					return true;
				}
			}
		}]);
	
		return dragDropItemCounterService;
	}();
	
	dragDropItemCounterService.$inject = ['easyFormDragWayConfig'];
	
	exports.default = dragDropItemCounterService;
	exports.DRAG_DROP_ITEM_COUNTER_SERVICE = DRAG_DROP_ITEM_COUNTER_SERVICE;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DD_DECOR_CONTAINER_DIRECTIVE = undefined;
	
	var _edaDragDropWayDragdropDdDecorContainerTemplate = __webpack_require__(57);
	
	var _edaDragDropWayDragdropDdDecorContainerTemplate2 = _interopRequireDefault(_edaDragDropWayDragdropDdDecorContainerTemplate);
	
	var _edaDragDropWayDragdropDdDecorContainer = __webpack_require__(58);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* global angular */
	var DD_DECOR_CONTAINER_DIRECTIVE = 'ddDecorContainer';
	
	function ddDecorContainer() {
		var directive = {
			restrict: 'A',
			template: _edaDragDropWayDragdropDdDecorContainerTemplate2.default,
			scope: {},
			controller: _edaDragDropWayDragdropDdDecorContainer.DD_DECOR_CONTAINER_CONTROLLER_NAME,
			controllerAs: _edaDragDropWayDragdropDdDecorContainer.DD_DECOR_CONTAINER_CONTROLLERAS_NAME,
			bindToController: {
				'styleParam': '=ddContainerProperties',
				'isStillCollapsed': '=ddContainerIsCollpased',
				'verboseMode': '@ddContainerVerboseMode',
				'currentIndex': '@ddContainerCurrentIndex',
				'collpaseAll': '&ddCollapseAll'
			},
			transclude: true,
			link: linkFct
		};
		return directive;
	
		function linkFct($scope, element, attrs, ctrl, transclude) {
			var verboseModeActive = $scope.ddDecorContainerCtrl.verboseMode;
			var currentIndex = $scope.ddDecorContainerCtrl.currentIndex;
			$scope.ddDecorContainerCtrl.isCollapsed = false;
			$scope.ddDecorContainerCtrl.config.isEnabled = false;
			/**
	  	* forceCollapse when :
	  	*  dragDropConfigModel.containerConfig.decoration.isCollapsed changed (here bound to $scope.isStillCollapsed)
	  	*/
			$scope.$watch(function () {
				return $scope.ddDecorContainerCtrl.isStillCollapsed;
			}, function (newVal, oldVal) {
				if (newVal !== oldVal) {
					if ($scope.$parent.$parent.$index === 0) $scope.ddDecorContainerCtrl.isCollapsed = newVal;
				}
			});
	
			/**
	  	* verbose mode for developments only
	  	*/
			if (verboseModeActive !== '') {
				var verbose = angular.lowercase(verboseModeActive);
				if (verbose === 'true' || verbose === '1') {
					/* eslint no-console:0 */
					console.dir({
						whoAmI: 'I am verbose from ddDecorContainer link',
						verbodeMode: verbose,
						ParentParentIndex: $scope.$parent.$parent.$index,
						ParentIndex: $scope.$parent.$index,
						currentIndex: currentIndex,
						styleParam: $scope.ddDecorContainerCtrl.styleParam,
						columnindex: $scope.$parent.$parent.$parent.$parent.$index
					});
				}
			}
	
			/**
	  	* no header (no title, no collapse....)
	  	*/
			//$scope.ddDecorContainerCtrl.config.isEnabled
			if (typeof currentIndex !== 'undefined') {
				if (currentIndex !== '') {
					/**
	    	* specific 1st column
	    	*/
					if (currentIndex === '0') {
						/**
	     	* apply title
	     	*/
						if (typeof $scope.ddDecorContainerCtrl.styleParam.title !== 'undefined') {
							$scope.ddDecorContainerCtrl.currentTitle = $scope.ddDecorContainerCtrl.styleParam.title;
							$scope.ddDecorContainerCtrl.config.isEnabled = true;
							$scope.ddDecorContainerCtrl.isCollapsed = true;
						}
					}
				}
			}
	
			/**
	  	* prevent transclusion creating child scope
	  	* want to know more about what I'm talking about : check this nice tip on the subject :
	  	* http://angular-tips.com/blog/2014/03/transclusion-and-scopes/
	  	*/
			transclude($scope.$parent, function (contentClone) {
				/**
	   	* transclusion will append content to '<div id="ddDecorContainerWillTranscludeHere"></div>'
	   	*/
				var childDiv = angular.element(element.children()[1]);
				childDiv.append(contentClone);
			});
		}
	}
	
	exports.default = ddDecorContainer;
	exports.DD_DECOR_CONTAINER_DIRECTIVE = DD_DECOR_CONTAINER_DIRECTIVE;

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = "<div ng-click=\"ddDecorContainerCtrl.collapseFct()\">\n   <h6\n    ng-show=\"ddDecorContainerCtrl.config.isEnabled\"\n    class=\"ddDecorContainerCtrl.isCollapsableZone\"\n    style=\"cursor:pointer\">\n    <button class=\"btn btn-primary btn-xs\">\n      <span class=\"{{ddDecorContainerCtrl.currentIconClass()}}\"></span>\n    </button>\n    &nbsp;\n    {{ddDecorContainerCtrl.currentTitle}}\n  </h6>\n</div>\n<div uib-collapse=\"ddDecorContainerCtrl.isCollapsed\">\n   <div id=\"ddDecorContainerWillTranscludeHere\"></div>\n</div>\n"

/***/ },
/* 58 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/* global angular */
	var DD_DECOR_CONTAINER_CONTROLLER_NAME = 'ddDecorContainerController';
	var DD_DECOR_CONTAINER_CONTROLLERAS_NAME = 'ddDecorContainerCtrl';
	
	var ddDecorContainerController = function () {
		function ddDecorContainerController() {
			_classCallCheck(this, ddDecorContainerController);
	
			this.init();
		}
	
		_createClass(ddDecorContainerController, [{
			key: 'init',
			value: function init() {
				this.config = angular.extend({}, { isEnabled: false });
				/**
	   	*  TODO (low priority) : make icon css configurable (provider)
	   	*/
				this.icons = angular.extend({}, {
					closedClass: 'glyphicon glyphicon-eye-open',
					opened: 'glyphicon glyphicon-eye-close'
				});
			}
		}, {
			key: 'collapseFct',
			value: function collapseFct() {
				this.collpaseAll({ exceptThisOne: this.styleParam.WhenIndex }); //note : collpaseAll function is boundToController from directive attribute : 'collpaseAll' : '&ddCollapseAll'
				this.isCollapsed = !this.isCollapsed;
				this.isStillCollapsed = this.isCollapsed; //note : isStillCollapsed is boundToController from directive attribute : 'isStillCollapsed' : '=ddContainerIsCollpased',
			}
		}, {
			key: 'currentIconClass',
			value: function currentIconClass() {
				if (this.isCollapsed) {
					return this.icons.closedClass;
				} else {
					return this.icons.opened;
				}
			}
		}]);
	
		return ddDecorContainerController;
	}();
	
	exports.default = ddDecorContainerController;
	exports.DD_DECOR_CONTAINER_CONTROLLER_NAME = DD_DECOR_CONTAINER_CONTROLLER_NAME;
	exports.DD_DECOR_CONTAINER_CONTROLLERAS_NAME = DD_DECOR_CONTAINER_CONTROLLERAS_NAME;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DD_DECOR_DROPZONE_DIRECTIVE = undefined;
	
	var _edaDragDropWayDragdropDdDecorDropZoneTemplate = __webpack_require__(60);
	
	var _edaDragDropWayDragdropDdDecorDropZoneTemplate2 = _interopRequireDefault(_edaDragDropWayDragdropDdDecorDropZoneTemplate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DD_DECOR_DROPZONE_DIRECTIVE = 'ddDecorDropZone'; /* global angular */
	
	
	function ddDecorDropZone() {
		var directive = {
			restrict: 'A',
			template: _edaDragDropWayDragdropDdDecorDropZoneTemplate2.default,
			scope: {
				'styleParam': '=ddDropZoneProperties',
				'verboseMode': '@ddDropZoneVerboseMode',
				'currentIndex': '@ddDropZoneCurrentIndex',
				'addNewLineFct': '&ddDropZoneAddNewLine'
			},
			transclude: true,
			link: linkfct
		};
		return directive;
	
		function linkfct($scope) {
	
			var verboseModeActive = $scope.verboseMode;
			var currentIndex = $scope.currentIndex;
	
			$scope.headerConfig = {
				HeaderButtonVisible: false,
				affixAttr: 'bs-affix',
				affixEnabled: false
			};
			/**
	  	* verbose mode : just for dev
	  	*/
			if (verboseModeActive !== '') {
				var verbose = angular.lowercase(verboseModeActive);
				if (verbose === 'true' || verbose === '1') {
					/* eslint no-console:0 */
					console.dir({
						whoAmI: 'I am verbose from ddDecorDropZone link',
						verbodeMode: verbose,
						ParentParentIndex: $scope.$parent.$parent.$index,
						ParentIndex: $scope.$parent.$index,
						currentIndex: currentIndex,
						styleParam: $scope.styleParam
					});
				}
			}
	
			if (typeof currentIndex !== 'undefined') {
				if (currentIndex !== '') {
					// apply title
					if (typeof $scope.styleParam.title !== 'undefined') $scope.currentTitle = $scope.styleParam.title;
					//apply font-awesome
					if (typeof $scope.styleParam.fontAwesomeIcon !== 'undefined') $scope.currentFontAwesome = $scope.styleParam.fontAwesomeIcon;
					//show add new line button
					if (currentIndex === '1') $scope.headerConfig.HeaderButtonVisible = true;
				}
			}
		}
	}
	
	ddDecorDropZone.$inject = [];
	
	exports.default = ddDecorDropZone;
	exports.DD_DECOR_DROPZONE_DIRECTIVE = DD_DECOR_DROPZONE_DIRECTIVE;

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = "<div class=\"{{styleParam.ApplycssClass}}\">\n  <div id=\"visualPanel\">\n    <div  class=\"panel panel-default\">\n      <div class=\"panel-heading\">\n        <h3 class=\"panel-title\">\n          <i class=\"{{currentFontAwesome}}\"></i>&nbsp;\n          {{currentTitle}}\n           <div ng-show=\"headerConfig.HeaderButtonVisible\">\n             <button\n              class=\"btn btn-primary btn-xs buttonHeaderAddNewLine center-block\"\n              ng-click=\"addNewLineFct();\">\n               <span class=\"glyphicon glyphicon-plus\"></span>\n               &nbsp;\n               add new line\n             </button>\n           </div>\n        </h3>\n      </div>\n      <div class=\"panel-body\">\n         <div class=\"row\">\n            <div class=\"col-md-12\" ng-transclude>\n            </div>\n         </div>\n      </div>\n    </div>\n   </div>\n</div>\n"

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DRAG_DROP_DECOR_ITEM = undefined;
	
	var _edaDragDropWayDragdropDdDecorItemTemplate = __webpack_require__(62);
	
	var _edaDragDropWayDragdropDdDecorItemTemplate2 = _interopRequireDefault(_edaDragDropWayDragdropDdDecorItemTemplate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DRAG_DROP_DECOR_ITEM = 'ddDecorItem';
	
	function ddDecorItem(easyFormDragWayConfig) {
		var directive = {
			restrict: 'A',
			scope: {
				'verboseMode': '@ddItemVerboseMode',
				'currentIndex': '@ddItemCurrentIndex',
				'parentIndex': '@ddItemParentIndex',
				'parentParentIndex': '@ddItemParentParentIndex',
				'lineItemsCount': '@ddItemsCount',
				'cssClass': '@ddItemCssClass'
			},
			template: _edaDragDropWayDragdropDdDecorItemTemplate2.default,
			transclude: true,
			link: linkfct
		};
		return directive;
	
		function linkfct($scope, element, attrs, ctrl, transclude) {
			var verboseModeActive = $scope.verboseMode;
			var currentIndex = $scope.currentIndex;
			var parentIndex = $scope.parentIndex;
			var listClass = easyFormDragWayConfig.getDistinctItemCssClass();
	
			/**
	  	* init css class
	  	*/
			angular.forEach(listClass, function (css) {
				return element.removeClass(css);
			});
			element.addClass($scope.cssClass);
			/**
	  	* update css class
	  	*/
			$scope.$watch('cssClass', function (newValue, oldValue) {
				if (newValue !== oldValue) {
					/**
	    	* update css class
	    	*/
					angular.forEach(listClass, function (css) {
						return element.removeClass(css);
					});
					element.addClass(newValue);
				}
			});
	
			/**
	  	* verbose mode : just for dev 
	  	*/
			if (verboseModeActive !== '') {
				var verbose = angular.lowercase(verboseModeActive);
				if (verbose === 'true' || verbose === '1') {
					/* eslint no-console:0 */
					console.dir({
						whoAmI: 'I am verbose from ddDecorItem directive link',
						verbodeMode: verbose,
						ParentParentIndex: $scope.$parent.$parent.$index,
						ParentIndex: parentIndex,
						parentParentIndex: $scope.parentParentIndex,
						currentIndex: currentIndex,
						lineItemsCount: $scope.lineItemsCount
					});
				}
			}
			/**
	  	* control column : apply css class to item
	  	*/
			if ($scope.parentParentIndex === '0') element.addClass(listClass[0]);
			/**
	  	* prevent transclusion creating child scope  
	  	*
	  	*
	  	* NOTE :if you want to know more about what I'm saying : check this nice tip on the subject : 
	  	* http://angular-tips.com/blog/2014/03/transclusion-and-scopes/        
	  	*/
			transclude($scope.$parent, function (contentClone) {
				/**
	   	* transclusion will append content to '<div id="itemDirectiveTranscludeHere"></div>' 
	   	*/
				var childDiv = angular.element(element.children()[0]);
				childDiv.append(contentClone);
			});
		}
	}
	
	ddDecorItem.$inject = ['easyFormDragWayConfig'];
	
	exports.default = ddDecorItem;
	exports.DRAG_DROP_DECOR_ITEM = DRAG_DROP_DECOR_ITEM;

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = "<div>\n  <div id=\"itemDirectiveTranscludeHere\"></div>\n</div>\n"

/***/ },
/* 63 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DRAG_DROP_ITEM_DECOR_SERVICE = 'dragDropItemDecorationService';
	
	var dragDropItemDecorationService = function () {
		function dragDropItemDecorationService(easyFormDragWayConfig) {
			_classCallCheck(this, dragDropItemDecorationService);
	
			this.easyFormDragWayConfig = easyFormDragWayConfig;
			this.init();
		}
	
		_createClass(dragDropItemDecorationService, [{
			key: 'init',
			value: function init() {
				this._listItemClass = [].concat(this.easyFormDragWayConfig.getListItemCssClass());
			}
		}, {
			key: 'getListClass',
			value: function getListClass() {
				return this._listItemClass;
			}
		}, {
			key: 'getCssClassWhenNumberItemsInRowIs',
			value: function getCssClassWhenNumberItemsInRowIs(thisNumber) {
				return this.easyFormDragWayConfig.getItemCssDependingNumberItemsInRow(thisNumber);
			}
		}, {
			key: 'applyCssClassWholeLine',
			value: function applyCssClassWholeLine(model, indexColumn, indexLine, numberItems, restrictToThisIndexColumn) {
				if (typeof numberItems !== 'undefined' && typeof indexLine !== 'undefined' && typeof indexColumn !== 'undefined' && typeof model !== 'undefined' && typeof restrictToThisIndexColumn !== 'undefined') {
					if (indexColumn === restrictToThisIndexColumn) {
						for (var i = model[indexColumn][indexLine].length - 1; i >= 0; i--) {
							model[indexColumn][indexLine][i].cssClass = this.easyFormDragWayConfig.getItemCssDependingNumberItemsInRow(numberItems);
						}
					}
					return true;
				} else {
					return false;
				}
			}
		}, {
			key: 'updateCssClassWholeColumn',
			value: function updateCssClassWholeColumn(model, indexColumn) {
				if (typeof indexColumn !== 'undefined' && typeof model !== 'undefined') {
					for (var cpt = model[indexColumn].length - 1; cpt >= 0; cpt--) {
						for (var i = model[indexColumn][cpt].length - 1; i >= 0; i--) {
							model[indexColumn][cpt][i].cssClass = this.easyFormDragWayConfig.getItemCssDependingNumberItemsInRow(model[indexColumn][cpt].length);
						}
					}
					return true;
				} else {
					return false;
				}
			}
		}]);
	
		return dragDropItemDecorationService;
	}();
	
	dragDropItemDecorationService.$inject = ['easyFormDragWayConfig'];
	
	exports.default = dragDropItemDecorationService;
	exports.DRAG_DROP_ITEM_DECOR_SERVICE = DRAG_DROP_ITEM_DECOR_SERVICE;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DRAG_DROP_DECOR_LINE = undefined;
	
	var _edaDragDropWayDragdropDdDecorLineTemplate = __webpack_require__(65);
	
	var _edaDragDropWayDragdropDdDecorLineTemplate2 = _interopRequireDefault(_edaDragDropWayDragdropDdDecorLineTemplate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DRAG_DROP_DECOR_LINE = 'ddDecorLine'; /* global angular */
	
	
	function ddDecorLine($timeout) {
		var directive = {
			restrict: 'A',
			scope: {
				'verboseMode': '@ddLineVerboseMode',
				'currentIndex': '@ddLineCurrentIndex',
				'parentIndex': '@ddLineParentIndex',
				'removeLine': '&ddRemoveLine'
			},
			template: _edaDragDropWayDragdropDdDecorLineTemplate2.default,
			transclude: true,
			link: linkfct
		};
		return directive;
	
		function linkfct($scope, element, attrs, ctrl, transclude) {
			var verboseModeActive = $scope.verboseMode;
			var currentIndex = $scope.currentIndex;
			var parentIndex = $scope.parentIndex;
			$scope.deleteLine = {};
			$scope.deleteLine.readyToDelete = false;
			$scope.deleteLine.dblClickCount = 0;
			$scope.isCollapsed = false;
			var timer = void 0;
	
			// verbose mode : just for dev 
			if (verboseModeActive !== '') {
				var verbose = angular.lowercase(verboseModeActive);
				if (verbose === 'true' || verbose === '1') {
					/* eslint no-console:0 */
					console.dir({
						whoAmI: 'I am verbose from ddDecorLine directive link',
						verbodeMode: verbose,
						ParentParentIndex: $scope.$parent.$parent.$index,
						ParentIndex: parentIndex,
						currentIndex: currentIndex
					});
				}
			}
	
			/**
	  	* removeMe is function related to twice double click sequence to delete a line
	  	*
	  	*  - addClass / remove/class ; will make line in a shake movement
	  	*  - call "removeLine function to delete the line (if it was rwice double clicked)
	  	*/
			$scope.removeMe = function (event) {
				event.preventDefault();
				event.stopPropagation();
	
				if ($scope.parentIndex === '1') {
					//2nd dbl click : if is shaking so it is confirmation to delete
					if ($scope.deleteLine.dblClickCount === 1) {
						$scope.deleteLine.dblClickCount = 0;
						$scope.deleteLine.readyToDelete = false;
						/**
	     	* NOTE : trick in calling parent controller function with input param when directive with isolate scope
	     	* see : https://thinkster.io/egghead/isolate-scope-am
	     	*
	     	* Here should be:
	     	* 
	     	*-> in html :                     dd-remove-line="removeThisLine(indexToDelete)
	     	*-> in controller :               $scope.removeThisLine = function(lineIndex){
	     	*-> so in directive call it  :    $scope.removeLine({indexToDelete: currentIndex});
	     	*
	     	*
	     	* BUT in this case (repeats, ul> li.... complicated) 
	     	*  => works better (if shaking a lot of line in a row it won't mess up)
	     	*
	     	*-> in html :                     dd-remove-line="removeThisLine($index)
	     	*-> in controller :               $scope.removeThisLine = function(lineIndex){
	     	*-> so in directive call it  :    $scope.removeLine();
	     	*/
						//$scope.removeLine({indexToDelete: currentIndex});
						$scope.removeLine();
						//console.warn('force timer destruction after delete!');
						$timeout.cancel(timer);
					}
	
					//1st dbl click : make it shake so ready to delete
					if ($scope.deleteLine.dblClickCount === 0) {
						$scope.deleteLine.dblClickCount = $scope.deleteLine.dblClickCount + 1;
						$scope.deleteLine.readyToDelete = true;
					}
				}
			};
	
			/**
	  	* signle event will ever occur
	  	*
	  	* to prevent it to interfere with double click sequence 
	  	* -> set a time out (shaking line to delete will automaticallly end shaking after timeout : 2 seconds)
	  	*/
			$scope.cancelDelete = function () {
				//event.preventDefault();
				//event.stopPropagation();
				timer = $timeout(function () {
					$scope.deleteLine.dblClickCount = 0;
					$scope.deleteLine.readyToDelete = false;
				}, 500);
	
				/**
	   	* debug
	   	*/
				// timer.then(
				//     () =>{
				//         console.log( 'Timer resolved!', Date.now() );
				//     },
				//     () =>{
				//         console.log( 'Timer rejected!', Date.now() );
				//     }
				// );
			};
	
			/**
	  	* timer destruction to prevent from bad UI experience
	  	*/
			$scope.$on('$destroy', function () {
				return $timeout.cancel(timer);
			});
	
			/**
	  	* prevent transclusion creating child scope  
	  	*
	  	*
	  	* NOTE :if you want to know more about what I'm saying : check this nice tip on the subject : 
	  	* http://angular-tips.com/blog/2014/03/transclusion-and-scopes/        
	  	*/
			transclude($scope.$parent, function (contentClone) {
				//transclusion will append content to '<div id="lineDirectiveTranscludeHere"></div>'
				var childDiv = angular.element(element.children()[0]);
				childDiv.append(contentClone);
			});
		}
	}
	
	ddDecorLine.$inject = ['$timeout'];
	
	exports.default = ddDecorLine;
	exports.DRAG_DROP_DECOR_LINE = DRAG_DROP_DECOR_LINE;

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = "<div\n  ng-class=\"{confirmLineDelete : deleteLine.readyToDelete}\"\n  ng-dblclick=\"removeMe($event);\"\n  ng-click=\"cancelDelete($event);\">\n  <button\n    ng-show=\"deleteLine.readyToDelete === true\"\n    type=\"button\"\n    class=\"btn btn-danger pull-right buttonCloseLine\" >\n     <span\n      class=\"glyphicon glyphicon-trash\"\n      aria-hidden=\"true\">\n    </span>\n  </button>\n</div>\n<div id=\"lineDirectiveTranscludeHere\"></div>\n"

/***/ },
/* 66 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var DRAG_DROP_NO_EDITABLE_CONTROL = 'ddNoEditableControl';
	
	function ddNoEditableControl() {
		var directive = {
			restrict: 'A',
			link: linkfct
		};
		return directive;
	
		function linkfct($scope, element) {
			element.on('click', function (event) {
				return event.preventDefault();
			});
		}
	}
	
	ddNoEditableControl.$inject = [];
	
	exports.default = ddNoEditableControl;
	exports.DRAG_DROP_NO_EDITABLE_CONTROL = DRAG_DROP_NO_EDITABLE_CONTROL;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _edaDragDropWayRightClick = __webpack_require__(68);
	
	var _edaDragDropWayRightClick2 = _interopRequireDefault(_edaDragDropWayRightClick);
	
	var _edaDragDropWayRightClick3 = __webpack_require__(69);
	
	var _edaDragDropWayRightClick4 = _interopRequireDefault(_edaDragDropWayRightClick3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var EDA_RIGHT_CLICK_MODULE = 'eda.right.click.module';
	
	exports.default = angular.module(EDA_RIGHT_CLICK_MODULE, []).directive(_edaDragDropWayRightClick.EDA_RIGHT_CLICK_DIRECTIVE, _edaDragDropWayRightClick2.default).service(_edaDragDropWayRightClick3.EDA_RIGHT_CLICKED_MANAGER_SERVICE, _edaDragDropWayRightClick4.default);

/***/ },
/* 68 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var EDA_RIGHT_CLICK_DIRECTIVE = 'edaRightClick';
	
	function edaRightClick($parse) {
	
	  var directive = {
	    restrict: 'A',
	    link: linkFct
	  };
	  return directive;
	
	  function linkFct(scope, element, attrs) {
	    var fn = $parse(attrs.edaRightClick);
	    var columnIndex = $parse(attrs.edaRightClickColIndex);
	    var fctSetRightclicked = $parse(attrs.edaSetRightClicked);
	    /**
	      * on right click event manage
	      * - open edit panel through attrs.edaRightClick function
	      * - set rightCliked attribute (to true) to control (in dragDropModel)
	      */
	    element.on('contextmenu', function (event) {
	      scope.$apply(function () {
	        event.preventDefault();
	        if (columnIndex(scope) === 1) fctSetRightclicked(scope, {}); //right click limited to template column (index = 1)
	        if (columnIndex(scope) === 1) fn(scope, { $event: event }); //right click limited to template column (index = 1)
	      });
	    });
	  }
	}
	
	edaRightClick.$inject = ['$parse'];
	
	exports.default = edaRightClick;
	exports.EDA_RIGHT_CLICK_DIRECTIVE = EDA_RIGHT_CLICK_DIRECTIVE;

/***/ },
/* 69 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EDA_RIGHT_CLICKED_MANAGER_SERVICE = 'ddItemRightClickedManager';
	
	var ddItemRightClickedManager = function () {
		function ddItemRightClickedManager() {
			_classCallCheck(this, ddItemRightClickedManager);
	
			this.init();
		}
	
		_createClass(ddItemRightClickedManager, [{
			key: 'init',
			value: function init() {}
	
			/**
	  	* setUnRightClicked 
	  	* set unSelected (see edaRightClick directive)
	  	*
	  	* used in edaEditcontroller when droping control
	  	*/
	
		}, {
			key: 'setUnRightClicked',
			value: function setUnRightClicked(dragDropModelItem) {
				dragDropModelItem.rightCliked = false;
			}
	
			/**
	  	* resetAllDragDropItemSelectedState
	  	*
	  	* simply reset (=set to false) all item.rightCliked 
	  	* in edit column (dragable column)
	  	*
	  	* used in edaEditPanel when closeEditPanel() called
	  	*/
	
		}, {
			key: 'resetAllDragDropItemSelectedState',
			value: function resetAllDragDropItemSelectedState(dragDropModel) {
				angular.forEach(dragDropModel[1], function (line) {
					angular.forEach(line, function (item) {
						return item.rightCliked = false;
					});
				});
			}
		}]);
	
		return ddItemRightClickedManager;
	}();
	
	ddItemRightClickedManager.$inject = [];
	
	exports.default = ddItemRightClickedManager;
	exports.EDA_RIGHT_CLICKED_MANAGER_SERVICE = EDA_RIGHT_CLICKED_MANAGER_SERVICE;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _edaDragDropWayConfigurationModelProxy = __webpack_require__(71);
	
	var _edaDragDropWayConfigurationModelProxy2 = _interopRequireDefault(_edaDragDropWayConfigurationModelProxy);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var EDA_CONFIG_PROXY_MODULE = 'eda.config.proxy.module';
	
	exports.default = angular.module(EDA_CONFIG_PROXY_MODULE, []).service(_edaDragDropWayConfigurationModelProxy.DRAG_DROP_CONFIG_PROXY_SERVICE, _edaDragDropWayConfigurationModelProxy2.default);

/***/ },
/* 71 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DRAG_DROP_CONFIG_PROXY_SERVICE = 'ddModelConfModelProxyService';
	
	var ddModelConfModelProxyService = function () {
	  function ddModelConfModelProxyService(EasyFormGenFormlyBindingModels,
	  // controllerModalProxy, 
	  // dragDropConfig, 
	  easyFormDragWayConfig, $parse) {
	    _classCallCheck(this, ddModelConfModelProxyService);
	
	    this.EasyFormGenFormlyBindingModels = EasyFormGenFormlyBindingModels;
	    // this.controllerModalProxy           = controllerModalProxy;
	    // this.dragDropConfig                 = dragDropConfig;
	    this.easyFormDragWayConfig = easyFormDragWayConfig;
	    this.$parse = $parse;
	    this.init();
	  }
	
	  _createClass(ddModelConfModelProxyService, [{
	    key: 'init',
	    value: function init() {}
	  }, {
	    key: 'refreshAllConfigurationFromDragAndDropModel',
	    value: function refreshAllConfigurationFromDragAndDropModel(configModel, ddModel) {
	      var _this = this;
	
	      /**
	       * TODO : prevent reset already set props
	       * 
	       * previousConfigurationModel = a backup of configuration model 'configModel 'before resetting it
	       * -> dragDrop model contains unique keys of already existing controls : these controls must not be reset / overwritten  
	       */
	      // let previousConfigurationModel = angular.copy(configModel); 
	      configModel.lines = [];
	      // iterates line config model
	      angular.forEach(ddModel[1], function (lineValue, keyValue) {
	        // add empty line 1st - if line is empty -> it will be enough 
	        configModel.lines.push(angular.copy(_this.EasyFormGenFormlyBindingModels.getEasyFormEmptyConfigurationLineModel()));
	        // update line value field
	        _this.applyThisLine(keyValue + 1, keyValue, configModel);
	        // iterate through columns and add them if control exists	
	        angular.forEach(lineValue, function (colValue, colIndex) {
	          // push an empty control model but relative to dradrop : model control type - (if datepicker so additionnal properties are added) 	
	          var controlToBind = {
	            control: angular.copy(_this.EasyFormGenFormlyBindingModels.getFormlyControlTemplateForNcolumnLine(lineValue.length, _this.getFormlyDetailedControlModelFromDragDropObject(lineValue[colIndex]).formlyType))
	          };
	          var formlyDetailedControlModel = _this.getFormlyDetailedControlModelFromDragDropObject(lineValue[colIndex]);
	          // controls alreadys existed so do not reset it - control to bind is the previous one		
	          if (typeof colValue.key !== 'undefined') {
	            //console.warn('debug dragdropModel show this control key : ' + colValue.key);
	            controlToBind.control = angular.copy(colValue.configModelControl);
	            //update cssClass depending new position:
	            var newClassName = _this.EasyFormGenFormlyBindingModels.getFormlyControlTemplateForNcolumnLine(lineValue.length, _this.getFormlyDetailedControlModelFromDragDropObject(lineValue[colIndex]).formlyType);
	            controlToBind.control.className = newClassName.className;
	            //test if header nee this one
	            controlToBind.control.cssClass = newClassName.className;
	            // get control details for this key in backup : previousConfigurationModel
	          } else {
	            // controls did not exists before : control to bind is a new one
	            // bind dragdrop control properties to configuration model through controlToBind var
	            _this.bindConfigCtrlModelFromFormlyDetailedCtrlModel(formlyDetailedControlModel, controlToBind, configModel);
	          }
	          // apply controlToBind var to configuration model control
	          if (typeof configModel.lines[keyValue].columns[colIndex] === 'undefined') configModel.lines[keyValue].columns.push(angular.copy(_this.EasyFormGenFormlyBindingModels.getEasyFormConfigurationEmptyControlModel()));
	          configModel.lines[keyValue].columns[colIndex].control = angular.copy(controlToBind.control);
	          configModel.lines[keyValue].columns[colIndex].numColumn = colIndex + 1;
	          configModel.lines[keyValue].columns[colIndex].exist = true;
	        });
	      });
	      return configModel;
	    }
	  }, {
	    key: 'refreshControlsKeys',
	    value: function refreshControlsKeys(configModel, dragDropModel) {
	      angular.forEach(configModel.lines, function (aConfigLine, aConfigLineIndex) {
	        angular.forEach(aConfigLine.columns, function (aConfigControl, aConfigControlIndex) {
	          //if last control removed from line - and dragDrop model did not already removed this line
	          if (typeof dragDropModel[1][aConfigLineIndex] !== 'undefined') {
	            if (dragDropModel[1][aConfigLineIndex].length > 0) {
	              dragDropModel[1][aConfigLineIndex][aConfigControlIndex].key = aConfigControl.control.key;
	              //need to save all in dragdropModel as it is a reference
	              //configModel still needed 
	              // -> to keep coherence (same back model) between all version of easyForm Generator
	              // -> is the back model (can be saved to dataBase)
	              dragDropModel[1][aConfigLineIndex][aConfigControlIndex].configModelControl = angular.copy(aConfigControl.control);
	            }
	          }
	        });
	      });
	    }
	
	    /**
	     * drag drop model
	     * -> will be used to bind configuration model
	     * 	of no key saved, configuration model controls would be reset each drop events
	     * 
	     * -> matching key : will prevent to reset existing control
	     */
	
	  }, {
	    key: 'loadDragDropModelFromConfigurationModel',
	    value: function loadDragDropModelFromConfigurationModel(configModel, dragDropModel) {
	      var _this2 = this;
	
	      //reset dragdrop fields model NOT all dragDropModel!
	      dragDropModel[1] = [];
	      angular.forEach(configModel.lines, function (aConfigLine, aConfigLineIndex) {
	        //add new line
	        dragDropModel[1].push([]);
	        angular.forEach(aConfigLine.columns, function (aConfigControl) {
	          // get control type from configuration.control.selectedControl
	          var dragdropControlRef = {
	            control: 'empty',
	            cssClass: 'col-xs-12',
	            label: '<div class="col-md-12"> <div class="form-group"> <div class=""> </div> </div></div>'
	          };
	          angular.forEach(dragDropModel[0], function (groupOfCtrlRef) {
	            angular.forEach(groupOfCtrlRef, function (aCtrlref) {
	              if (aCtrlref.control === aConfigControl.control.selectedControl) dragdropControlRef = angular.copy(aCtrlref);
	            });
	          });
	          dragDropModel[1][aConfigLineIndex].push(dragdropControlRef);
	          //update class depending number of control per line
	          var cssClassToApply = _this2.easyFormDragWayConfig.getItemCssDependingNumberItemsInRow(dragDropModel[1][aConfigLineIndex].length);
	          angular.forEach(dragDropModel[1][aConfigLineIndex], function (ddControlToUpdate) {
	            return ddControlToUpdate.cssClass = cssClassToApply;
	          });
	        });
	      });
	      // console.info('bindDragDropModelFromConfigurationModel');
	      // console.dir(	
	      // 							{
	      // 									'when' 							: 'starting',
	      // 									'configModel is ' 	: angular.copy(configModel),
	      // 									'dragDropModel is ' : angular.copy(dragDropModel)
	      // 							}
	      // 						);     
	    }
	
	    /**
	     * returns a control model that is more formly detailed
	     * (more formly detailed : see controls property in EasyFormGenFormlyBindingModels._easyFormListControls)
	     */
	
	  }, {
	    key: 'getFormlyDetailedControlModelFromDragDropObject',
	    value: function getFormlyDetailedControlModelFromDragDropObject(dragDrapCtrlModel) {
	      var controlModel = {};
	      var listControl = this.EasyFormGenFormlyBindingModels.getEasyFormListControls();
	      var controlsListGetter = this.$parse('controls');
	
	      angular.forEach(controlsListGetter(listControl), function (ctrlListValue) {
	        if (ctrlListValue.id === dragDrapCtrlModel.control) controlModel = ctrlListValue;
	      });
	      return controlModel;
	    }
	
	    /**
	     * valid a control key is unique
	     *
	      * yes... function name already told us that, 
	      * -> it's just confirmation and to see if
	      *    you keep focus while reading it ^^
	      */
	
	  }, {
	    key: 'validKeyUniqueness',
	    value: function validKeyUniqueness(thisKey, configurationObj) {
	      var isUnique = true;
	      for (var i = configurationObj.lines.length - 1; i >= 0; i--) {
	        for (var j = configurationObj.lines[i].columns.length - 1; j >= 0; j--) {
	          if (typeof configurationObj.lines[i].columns[j].control !== 'undefined') {
	            if (configurationObj.lines[i].columns[j].control.key === thisKey) {
	              isUnique = false;
	            }
	          }
	        }
	      }
	      return isUnique;
	    }
	  }, {
	    key: 'createUniqueKey',
	    value: function createUniqueKey(baseKeyValue, configurationObj) {
	      // unique key (set only first time) in this model is formly control type + Date.now(); 
	      var newKey = baseKeyValue + '-' + Date.now();
	      if (this.validKeyUniqueness(newKey, configurationObj) === true) {
	        return newKey;
	      } else {
	        newKey = baseKeyValue + '-' + Date.now();
	        if (this.validKeyUniqueness(newKey, configurationObj) === true) {
	          return newKey;
	        } else {
	          newKey = baseKeyValue + '-' + Date.now();
	          return newKey;
	        }
	      }
	    }
	  }, {
	    key: 'applyThisLine',
	    value: function applyThisLine(linevalue, lineIndex, configModel) {
	      angular.forEach(configModel.lines, function (aLineValue, aLineKey) {
	        if (aLineKey === lineIndex) aLineValue.line = linevalue;
	      });
	    }
	
	    /**
	     * bind formly detailed model to configuration control model
	     */
	
	  }, {
	    key: 'bindConfigCtrlModelFromFormlyDetailedCtrlModel',
	    value: function bindConfigCtrlModelFromFormlyDetailedCtrlModel(formlyDetailCtrlModel, configurationCtrlModel, configModel) {
	      /**
	        * TODO :properties should be served by provider 
	        * more configurable without pain
	        */
	      //set selected control :
	      this.$parse('control.selectedControl').assign(configurationCtrlModel, this.$parse('selectedControl')(formlyDetailCtrlModel));
	      //set type :	
	      this.$parse('control.type').assign(configurationCtrlModel, this.$parse('formlyType')(formlyDetailCtrlModel));
	      //set key :	
	      this.$parse('control.key').assign(configurationCtrlModel, this.createUniqueKey(this.$parse('control.type')(configurationCtrlModel), configModel));
	      //set subtype :	
	      this.$parse('control.subtype').assign(configurationCtrlModel, this.$parse('formlySubtype')(formlyDetailCtrlModel));
	      //set templateOptions.label :	
	      this.$parse('control.templateOptions.label').assign(configurationCtrlModel, this.$parse('formlyLabel')(formlyDetailCtrlModel));
	      //set templateOptions.required :	
	      this.$parse('control.templateOptions.required').assign(configurationCtrlModel, this.$parse('formlyRequired')(formlyDetailCtrlModel));
	      //set templateOptions.required :	
	      this.$parse('control.templateOptions.description').assign(configurationCtrlModel, this.$parse('formlyDescription')(formlyDetailCtrlModel));
	      //set templateOptions.required :	
	      this.$parse('control.templateOptions.placeholder').assign(configurationCtrlModel, this.$parse('formlyPlaceholder')(formlyDetailCtrlModel));
	      //set templateOptions.required :	
	      this.$parse('control.templateOptions.options').assign(configurationCtrlModel, this.$parse('formlyOptions')(formlyDetailCtrlModel));
	
	      if (this.$parse('control.type')(configurationCtrlModel) === 'datepicker') {
	        this.$parse('control.templateOptions.datepickerPopup').assign(configurationCtrlModel, this.$parse('datepickerPopup')(formlyDetailCtrlModel));
	      }
	    }
	  }]);
	
	  return ddModelConfModelProxyService;
	}();
	
	ddModelConfModelProxyService.$inject = ['EasyFormGenFormlyBindingModels',
	// 'controllerModalProxy',
	// 'dragDropConfig',
	'easyFormDragWayConfig', '$parse'];
	
	exports.default = ddModelConfModelProxyService;
	exports.DRAG_DROP_CONFIG_PROXY_SERVICE = DRAG_DROP_CONFIG_PROXY_SERVICE;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _dragAndDropListDndlist = __webpack_require__(73);
	
	var _dragAndDropListDndlist2 = _interopRequireDefault(_dragAndDropListDndlist);
	
	var _dragAndDropListDndDraggable = __webpack_require__(74);
	
	var _dragAndDropListDndDraggable2 = _interopRequireDefault(_dragAndDropListDndDraggable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DRAG_DROP_LIST_MODULE = 'dndLists.module';
	
	exports.default = angular.module(DRAG_DROP_LIST_MODULE, []).directive(_dragAndDropListDndlist.DNDLIST_DIRECTIVE, _dragAndDropListDndlist2.default).directive(_dragAndDropListDndDraggable.DNDDRAGGABLE_DIRECTIVE, _dragAndDropListDndDraggable2.default).factory('dndDragTypeWorkaround', function () {
	  return {};
	}).factory('dndDropEffectWorkaround', function () {
	  return {};
	});

/***/ },
/* 73 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var DNDLIST_DIRECTIVE = 'dndList';
	
	function dndList($parse, $timeout, dndDropEffectWorkaround, dndDragTypeWorkaround) {
	  var directive = {
	    link: linkFct
	  };
	  return directive;
	
	  function linkFct(scope, element, attr) {
	    // While an element is dragged over the list, this placeholder element is inserted
	    // at the location where the element would be inserted after dropping
	    var placeholder = angular.element('<li class="dndPlaceholder"></li>');
	    var placeholderNode = placeholder[0];
	    var listNode = element[0];
	    var horizontal = attr.dndHorizontalList && scope.$eval(attr.dndHorizontalList);
	    var externalSources = attr.dndExternalSources && scope.$eval(attr.dndExternalSources);
	
	    /**
	     * The dragover event is triggered "every few hundred milliseconds" while an element
	     * is being dragged over our list, or over an child element.
	     */
	    element.on('dragover', function (event) {
	      event = event.originalEvent || event;
	      if (!isDropAllowed(event)) return true;
	      // First of all, make sure that the placeholder is shown
	      // This is especially important if the list is empty
	      if (placeholderNode.parentNode != listNode) {
	        element.append(placeholder);
	      }
	      if (event.target !== listNode) {
	        // Try to find the node direct directly below the list node.
	        var listItemNode = event.target;
	        while (listItemNode.parentNode !== listNode && listItemNode.parentNode) {
	          listItemNode = listItemNode.parentNode;
	        }
	        if (listItemNode.parentNode === listNode && listItemNode !== placeholderNode) {
	          // If the mouse pointer is in the upper half of the child element,
	          // we place it before the child element, otherwise below it.
	          if (isMouseInFirstHalf(event, listItemNode)) {
	            listNode.insertBefore(placeholderNode, listItemNode);
	          } else {
	            listNode.insertBefore(placeholderNode, listItemNode.nextSibling);
	          }
	        }
	      } else {
	        // This branch is reached when we are dragging directly over the list element.
	        // Usually we wouldn't need to do anything here, but the IE does not fire it's
	        // events for the child element, only for the list directly. Therefore we repeat
	        // the positioning algorithm for IE here.
	        if (isMouseInFirstHalf(event, placeholderNode, true)) {
	          // Check if we should move the placeholder element one spot towards the top.
	          // Note that display none elements will have offsetTop and offsetHeight set to
	          // zero, therefore we need a special check for them.
	          while (placeholderNode.previousElementSibling && (isMouseInFirstHalf(event, placeholderNode.previousElementSibling, true) || placeholderNode.previousElementSibling.offsetHeight === 0)) {
	            listNode.insertBefore(placeholderNode, placeholderNode.previousElementSibling);
	          }
	        } else {
	          // Check if we should move the placeholder element one spot towards the bottom
	          while (placeholderNode.nextElementSibling && !isMouseInFirstHalf(event, placeholderNode.nextElementSibling, true)) {
	            listNode.insertBefore(placeholderNode, placeholderNode.nextElementSibling.nextElementSibling);
	          }
	        }
	      }
	
	      // At this point we invoke the callback, which still can disallow the drop.
	      // We can't do this earlier because we want to pass the index of the placeholder.
	      if (attr.dndDragover && !invokeCallback(attr.dndDragover, event)) {
	        return stopDragover();
	      }
	      element.addClass('dndDragover');
	      event.preventDefault();
	      event.stopPropagation();
	      return false;
	    });
	
	    /**
	     * When the element is dropped, we use the position of the placeholder element as the
	     * position where we insert the transferred data. This assumes that the list has exactly
	     * one child element per array element.
	     */
	    element.on('drop', function (event) {
	      event = event.originalEvent || event;
	      if (!isDropAllowed(event)) return true;
	      // The default behavior in Firefox is to interpret the dropped element as URL and
	      // forward to it. We want to prevent that even if our drop is aborted.
	      event.preventDefault();
	      // Unserialize the data that was serialized in dragstart. According to the HTML5 specs,
	      // the "Text" drag type will be converted to text/plain, but IE does not do that.
	      var data = event.dataTransfer.getData('Text') || event.dataTransfer.getData('text/plain');
	      var transferredObject;
	      try {
	        transferredObject = JSON.parse(data);
	      } catch (e) {
	        return stopDragover();
	      }
	      // Invoke the callback, which can transform the transferredObject and even abort the drop.
	      if (attr.dndDrop) {
	        transferredObject = invokeCallback(attr.dndDrop, event, transferredObject);
	        if (!transferredObject) {
	          return stopDragover();
	        }
	      }
	      // Retrieve the JSON array and insert the transferred object into it.
	      var targetArray = scope.$eval(attr.dndList);
	      scope.$apply(function () {
	        targetArray.splice(getPlaceholderIndex(), 0, transferredObject);
	      });
	      // In Chrome on Windows the dropEffect will always be none...
	      // We have to determine the actual effect manually from the allowed effects
	      if (event.dataTransfer.dropEffect === 'none') {
	        if (event.dataTransfer.effectAllowed === 'copy' || event.dataTransfer.effectAllowed === 'move') {
	          dndDropEffectWorkaround.dropEffect = event.dataTransfer.effectAllowed;
	        } else {
	          dndDropEffectWorkaround.dropEffect = event.ctrlKey ? 'copy' : 'move';
	        }
	      } else {
	        dndDropEffectWorkaround.dropEffect = event.dataTransfer.dropEffect;
	      }
	      // Clean up
	      stopDragover();
	      event.stopPropagation();
	      return false;
	    });
	
	    /**
	     * We have to remove the placeholder when the element is no longer dragged over our list. The
	     * problem is that the dragleave event is not only fired when the element leaves our list,
	     * but also when it leaves a child element -- so practically it's fired all the time. As a
	     * workaround we wait a few milliseconds and then check if the dndDragover class was added
	     * again. If it is there, dragover must have been called in the meantime, i.e. the element
	     * is still dragging over the list. If you know a better way of doing this, please tell me!
	     */
	    element.on('dragleave', function (event) {
	      event = event.originalEvent || event;
	
	      element.removeClass('dndDragover');
	      $timeout(function () {
	        if (!element.hasClass('dndDragover')) {
	          placeholder.remove();
	        }
	      }, 100);
	    });
	
	    /**
	     * Checks whether the mouse pointer is in the first half of the given target element.
	     *
	     * In Chrome we can just use offsetY, but in Firefox we have to use layerY, which only
	     * works if the child element has position relative. In IE the events are only triggered
	     * on the listNode instead of the listNodeItem, therefore the mouse positions are
	     * relative to the parent element of targetNode.
	     */
	    function isMouseInFirstHalf(event, targetNode, relativeToParent) {
	      var mousePointer = horizontal ? event.offsetX || event.layerX : event.offsetY || event.layerY;
	      var targetSize = horizontal ? targetNode.offsetWidth : targetNode.offsetHeight;
	      var targetPosition = horizontal ? targetNode.offsetLeft : targetNode.offsetTop;
	      targetPosition = relativeToParent ? targetPosition : 0;
	      return mousePointer < targetPosition + targetSize / 2;
	    }
	
	    /**
	     * We use the position of the placeholder node to determine at which position of the array the
	     * object needs to be inserted
	     */
	    function getPlaceholderIndex() {
	      return Array.prototype.indexOf.call(listNode.children, placeholderNode);
	    }
	
	    /**
	     * Checks various conditions that must be fulfilled for a drop to be allowed
	     */
	    function isDropAllowed(event) {
	      // Disallow drop from external source unless it's allowed explicitly.
	      if (!dndDragTypeWorkaround.isDragging && !externalSources) return false;
	      // Check mimetype. Usually we would use a custom drag type instead of Text, but IE doesn't
	      // support that.
	      if (!hasTextMimetype(event.dataTransfer.types)) return false;
	      // Now check the dnd-allowed-types against the type of the incoming element. For drops from
	      // external sources we don't know the type, so it will need to be checked via dnd-drop.
	      if (attr.dndAllowedTypes && dndDragTypeWorkaround.isDragging) {
	        var allowed = scope.$eval(attr.dndAllowedTypes);
	        if (angular.isArray(allowed) && allowed.indexOf(dndDragTypeWorkaround.dragType) === -1) {
	          return false;
	        }
	      }
	      // Check whether droping is disabled completely
	      if (attr.dndDisableIf && scope.$eval(attr.dndDisableIf)) return false;
	      return true;
	    }
	
	    /**
	     * Small helper function that cleans up if we aborted a drop.
	     */
	    function stopDragover() {
	      placeholder.remove();
	      element.removeClass('dndDragover');
	      return true;
	    }
	
	    /**
	     * Invokes a callback with some interesting parameters and returns the callbacks return value.
	     */
	    function invokeCallback(expression, event, item) {
	      return $parse(expression)(scope, {
	        event: event,
	        index: getPlaceholderIndex(),
	        item: item || undefined,
	        external: !dndDragTypeWorkaround.isDragging,
	        type: dndDragTypeWorkaround.isDragging ? dndDragTypeWorkaround.dragType : undefined
	      });
	    }
	
	    /**
	     * Check if the dataTransfer object contains a drag type that we can handle. In old versions
	     * of IE the types collection will not even be there, so we just assume a drop is possible.
	     */
	    function hasTextMimetype(types) {
	      if (!types) return true;
	      for (var i = 0; i < types.length; i++) {
	        if (types[i] === 'Text' || types[i] === 'text/plain') return true;
	      }
	      return false;
	    }
	  }
	}
	
	var TO_INJECT = ['$parse', '$timeout', 'dndDropEffectWorkaround', 'dndDragTypeWorkaround'];
	
	dndList.$inject = TO_INJECT;
	
	exports.default = dndList;
	exports.DNDLIST_DIRECTIVE = DNDLIST_DIRECTIVE;

/***/ },
/* 74 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var DNDDRAGGABLE_DIRECTIVE = 'dndDraggable';
	
	function dndDraggable($parse, $timeout, dndDropEffectWorkaround, dndDragTypeWorkaround) {
	  var directive = {
	    link: linkFct
	  };
	  return directive;
	
	  function linkFct(scope, element, attr) {
	    var _this = this;
	
	    // Set the HTML5 draggable attribute on the element
	    element.attr('draggable', 'true');
	
	    // If the dnd-disable-if attribute is set, we have to watch that
	    if (attr.dndDisableIf) {
	      scope.$watch(attr.dndDisableIf, function (disabled) {
	        return element.attr('draggable', !disabled);
	      });
	    }
	
	    /**
	     * When the drag operation is started we have to prepare the dataTransfer object,
	     * which is the primary way we communicate with the target element
	     */
	    element.on('dragstart', function (event) {
	      event = event.originalEvent || event;
	      // Serialize the data associated with this element. IE only supports the Text drag type
	      event.dataTransfer.setData('Text', angular.toJson(scope.$eval(attr.dndDraggable)));
	      // Only allow actions specified in dnd-effect-allowed attribute
	      event.dataTransfer.effectAllowed = attr.dndEffectAllowed || 'move';
	      // Add CSS classes. See documentation above
	      element.addClass('dndDragging');
	      $timeout(function () {
	        element.addClass('dndDraggingSource');
	      }, 0);
	      // Workarounds for stupid browsers, see description below
	      dndDropEffectWorkaround.dropEffect = 'none';
	      dndDragTypeWorkaround.isDragging = true;
	      // Save type of item in global state. Usually, this would go into the dataTransfer
	      // typename, but we have to use "Text" there to support IE
	      dndDragTypeWorkaround.dragType = attr.dndType ? scope.$eval(attr.dndType) : undefined;
	      // Invoke callback
	      $parse(attr.dndDragstart)(scope, { event: event });
	      event.stopPropagation();
	    });
	
	    /**
	     * The dragend event is triggered when the element was dropped or when the drag
	     * operation was aborted (e.g. hit escape button). Depending on the executed action
	     * we will invoke the callbacks specified with the dnd-moved or dnd-copied attribute.
	     */
	    element.on('dragend', function (event) {
	      event = event.originalEvent || event;
	
	      // Invoke callbacks. Usually we would use event.dataTransfer.dropEffect to determine
	      // the used effect, but Chrome has not implemented that field correctly. On Windows
	      // it always sets it to 'none', while Chrome on Linux sometimes sets it to something
	      // else when it's supposed to send 'none' (drag operation aborted).
	      var dropEffect = dndDropEffectWorkaround.dropEffect;
	      scope.$apply(function () {
	        switch (dropEffect) {
	          case 'move':
	            $parse(attr.dndMoved)(scope, { event: event });
	            break;
	
	          case 'copy':
	            $parse(attr.dndCopied)(scope, { event: event });
	            break;
	        }
	      });
	
	      // Clean up
	      element.removeClass('dndDragging');
	      element.removeClass('dndDraggingSource');
	      dndDragTypeWorkaround.isDragging = false;
	      event.stopPropagation();
	    });
	
	    /**
	     * When the element is clicked we invoke the callback function
	     * specified with the dnd-selected attribute.
	     */
	    element.on('click', function (event) {
	      event = event.originalEvent || event;
	      scope.$apply(function () {
	        return $parse(attr.dndSelected)(scope, { event: event });
	      });
	      event.stopPropagation();
	    });
	
	    /**
	     * Workaround to make element draggable in IE9
	     */
	    element.on('selectstart', function () {
	      if (_this.dragDrop) _this.dragDrop();
	      return false;
	    });
	  }
	}
	
	var TO_INJECT = ['$parse', '$timeout', 'dndDropEffectWorkaround', 'dndDragTypeWorkaround'];
	
	dndDraggable.$inject = TO_INJECT;
	
	exports.default = dndDraggable;
	exports.DNDDRAGGABLE_DIRECTIVE = DNDDRAGGABLE_DIRECTIVE;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _pageslide = __webpack_require__(76);
	
	var _pageslide2 = _interopRequireDefault(_pageslide);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PAGE_SLIDE_MODULE = 'pageslide.module';
	
	exports.default = angular.module(PAGE_SLIDE_MODULE, []).directive(_pageslide.PAGE_SLIDE_DIRECTIVE, _pageslide2.default);

/***/ },
/* 76 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PAGE_SLIDE_DIRECTIVE = 'pageslide';
	
	function pageslide() {
	  var directive = {
	    restrict: 'EAC',
	    transclude: false,
	    scope: {
	      psOpen: '=?',
	      psAutoClose: '=?',
	      psSide: '@',
	      psSpeed: '@',
	      psClass: '@',
	      psSize: '@',
	      psSqueeze: '@',
	      psCloak: '@',
	      psPush: '@',
	      psContainer: '@'
	    },
	    link: linkFct
	  };
	  return directive;
	
	  function linkFct($scope, el, attrs) {
	    /* Inspect */
	    //console.log($scope);
	    //console.log(el);
	    //console.log(attrs);
	
	    /* Parameters */
	    var param = {};
	
	    param.side = $scope.psSide || 'right';
	    param.speed = $scope.psSpeed || '0.5';
	    param.size = $scope.psSize || '300px';
	    param.zindex = 1000; // Override with custom CSS
	    param.className = $scope.psClass || 'ng-pageslide';
	    param.cloak = $scope.psCloak && $scope.psCloak.toLowerCase() == 'false' ? false : true;
	    param.squeeze = Boolean($scope.psSqueeze) || false;
	    param.push = Boolean($scope.psPush) || false;
	    param.container = $scope.psContainer || false;
	
	    // Apply Class
	    el.addClass(param.className);
	
	    /* DOM manipulation */
	    var content = null;
	    var slider = null;
	    var body = param.container ? document.getElementById(param.container) : document.body;
	
	    slider = el[0];
	
	    // Check for div tag
	    if (slider.tagName.toLowerCase() !== 'div' && slider.tagName.toLowerCase() !== 'pageslide') throw new Error('Pageslide can only be applied to <div> or <pageslide> elements');
	
	    // Check for content
	    if (slider.children.length === 0) throw new Error('You have to content inside the <pageslide>');
	
	    content = angular.element(slider.children);
	
	    /* Append */
	    body.appendChild(slider);
	
	    /* Style setup */
	    slider.style.zIndex = param.zindex;
	    slider.style.position = param.container !== false ? 'absolute' : 'fixed';
	    slider.style.width = 0;
	    slider.style.height = 0;
	    slider.style.overflow = 'hidden';
	    slider.style.transitionDuration = param.speed + 's';
	    slider.style.webkitTransitionDuration = param.speed + 's';
	    slider.style.transitionProperty = 'width, height';
	    if (param.squeeze) {
	      body.style.position = 'absolute';
	      body.style.transitionDuration = param.speed + 's';
	      body.style.webkitTransitionDuration = param.speed + 's';
	      body.style.transitionProperty = 'top, bottom, left, right';
	    }
	
	    switch (param.side) {
	      case 'right':
	        slider.style.height = attrs.psCustomHeight || '100%';
	        slider.style.top = attrs.psCustomTop || '0px';
	        slider.style.bottom = attrs.psCustomBottom || '0px';
	        slider.style.right = attrs.psCustomRight || '0px';
	        break;
	      case 'left':
	        slider.style.height = attrs.psCustomHeight || '100%';
	        slider.style.top = attrs.psCustomTop || '0px';
	        slider.style.bottom = attrs.psCustomBottom || '0px';
	        slider.style.left = attrs.psCustomLeft || '0px';
	        break;
	      case 'top':
	        slider.style.width = attrs.psCustomWidth || '100%';
	        slider.style.left = attrs.psCustomLeft || '0px';
	        slider.style.top = attrs.psCustomTop || '0px';
	        slider.style.right = attrs.psCustomRight || '0px';
	        break;
	      case 'bottom':
	        slider.style.width = attrs.psCustomWidth || '100%';
	        slider.style.bottom = attrs.psCustomBottom || '0px';
	        slider.style.left = attrs.psCustomLeft || '0px';
	        slider.style.right = attrs.psCustomRight || '0px';
	        break;
	    }
	
	    /* Closed */
	    function psClose(slider, param) {
	      if (slider && slider.style.width !== 0 && slider.style.width !== 0) {
	        if (param.cloak) content.css('display', 'none');
	        switch (param.side) {
	          case 'right':
	            slider.style.width = '0px';
	            if (param.squeeze) body.style.right = '0px';
	            if (param.push) {
	              body.style.right = '0px';
	              body.style.left = '0px';
	            }
	            break;
	          case 'left':
	            slider.style.width = '0px';
	            if (param.squeeze) body.style.left = '0px';
	            if (param.push) {
	              body.style.left = '0px';
	              body.style.right = '0px';
	            }
	            break;
	          case 'top':
	            slider.style.height = '0px';
	            if (param.squeeze) body.style.top = '0px';
	            if (param.push) {
	              body.style.top = '0px';
	              body.style.bottom = '0px';
	            }
	            break;
	          case 'bottom':
	            slider.style.height = '0px';
	            if (param.squeeze) body.style.bottom = '0px';
	            if (param.push) {
	              body.style.bottom = '0px';
	              body.style.top = '0px';
	            }
	            break;
	        }
	      }
	      $scope.psOpen = false;
	    }
	
	    /* Open */
	    function psOpen(slider, param) {
	      if (slider.style.width !== 0 && slider.style.width !== 0) {
	        switch (param.side) {
	          case 'right':
	            slider.style.width = param.size;
	            if (param.squeeze) body.style.right = param.size;
	            if (param.push) {
	              body.style.right = param.size;
	              body.style.left = '-' + param.size;
	            }
	            break;
	          case 'left':
	            slider.style.width = param.size;
	            if (param.squeeze) body.style.left = param.size;
	            if (param.push) {
	              body.style.left = param.size;
	              body.style.right = '-' + param.size;
	            }
	            break;
	          case 'top':
	            slider.style.height = param.size;
	            if (param.squeeze) body.style.top = param.size;
	            if (param.push) {
	              body.style.top = param.size;
	              body.style.bottom = '-' + param.size;
	            }
	            break;
	          case 'bottom':
	            slider.style.height = param.size;
	            if (param.squeeze) body.style.bottom = param.size;
	            if (param.push) {
	              body.style.bottom = param.size;
	              body.style.top = '-' + param.size;
	            }
	            break;
	        }
	        setTimeout(function () {
	          if (param.cloak) content.css('display', 'block');
	        }, param.speed * 1000);
	      }
	    }
	
	    // function isFunction(functionToCheck) {
	    //   var getType = {};
	    //   return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	    // }
	
	    /*
	    * Watchers
	    * */
	
	    $scope.$watch('psOpen', function (value) {
	      /* eslint no-extra-boolean-cast:0 */
	      if (!!value) {
	        // Open
	        psOpen(slider, param);
	      } else {
	        // Close
	        psClose(slider, param);
	      }
	    });
	
	    /*
	    * Events
	    * */
	
	    $scope.$on('$destroy', function () {
	      return body.removeChild(slider);
	    });
	
	    if ($scope.psAutoClose) {
	      $scope.$on('$locationChangeStart', function () {
	        return psClose(slider, param);
	      });
	      $scope.$on('$stateChangeStart', function () {
	        return psClose(slider, param);
	      });
	    }
	  }
	}
	
	pageslide.$inject = [];
	
	exports.default = pageslide;
	exports.PAGE_SLIDE_DIRECTIVE = PAGE_SLIDE_DIRECTIVE;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _edaDragDropWayEdaDragdropWayEasyFormGen = __webpack_require__(78);
	
	var _edaDragDropWayEdaDragdropWayEasyFormGen2 = _interopRequireDefault(_edaDragDropWayEdaDragdropWayEasyFormGen);
	
	var _edaDragDropWayEdaDragdropWayEasyFormGen3 = __webpack_require__(80);
	
	var _edaDragDropWayEdaDragdropWayEasyFormGen4 = _interopRequireDefault(_edaDragDropWayEdaDragdropWayEasyFormGen3);
	
	var _edaDragDropWayEdaDragdropWayEasyFormGen5 = __webpack_require__(82);
	
	var _edaDragDropWayEdaDragdropWayEasyFormGen6 = _interopRequireDefault(_edaDragDropWayEdaDragdropWayEasyFormGen5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DRAGDROP_MODULE = 'edaDragDropWay.main.module'; /* global angular */
	
	exports.default = angular.module(DRAGDROP_MODULE, []).provider(_edaDragDropWayEdaDragdropWayEasyFormGen.EASY_FORM_DRAG_DROP_WAY_CONFIG_NAME, _edaDragDropWayEdaDragdropWayEasyFormGen2.default).controller(_edaDragDropWayEdaDragdropWayEasyFormGen3.DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER, _edaDragDropWayEdaDragdropWayEasyFormGen4.default).directive(_edaDragDropWayEdaDragdropWayEasyFormGen5.EDA_DRAGDROP_WAY_EASY_FORM_GEN_DIRECTIVE, _edaDragDropWayEdaDragdropWayEasyFormGen6.default);

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.EASY_FORM_DRAG_DROP_WAY_CONFIG_NAME = undefined;
	
	var _edaDragDropWayEdaDragdropWayEasyFormGenProvider = __webpack_require__(79);
	
	var EASY_FORM_DRAG_DROP_WAY_CONFIG_NAME = 'easyFormDragWayConfig'; // TODO : Add here configs from ES5 dragDropConfigProvider
	
	function easyFormDragWayConfig() {
	
		var _listDragDropItemCssClasses = [].concat(_edaDragDropWayEdaDragdropWayEasyFormGenProvider.LIST_DRAG_DROP_ITEM_CSS_CLASSES);
		var _dragDropConfigModel = angular.copy(_edaDragDropWayEdaDragdropWayEasyFormGenProvider.DRAG_DROP_CONFIG_MODEL);
		var _dragDropPresentationModel = [].concat(_edaDragDropWayEdaDragdropWayEasyFormGenProvider.DRAG_DROP_PRESENTATION_MODEL);
		var _itemsNotToCountFoReal = angular.copy(_edaDragDropWayEdaDragdropWayEasyFormGenProvider.ITEMS_NOT_TO_COUNT_FOR_REAL);
	
		var _configuration = defaultConfig();
		var _controlsList = controlsList();
		// let _defaultLanguage		= getDefaultLanguage();
		// let _currentLanguage		= initDefaultLanguage();
		var _showPreviewPanel = getDefaultshowPreviewPanel();
		var _showPreviewModels = getDefaultShowPreviewModel();
		/* jshint validthis:true */
		this.$get = easyFormDragDropWayConfigGET;
		this.setModalAnimation = setModalAnimation;
		this.getModalAnimation = getModalAnimation;
		this.configuration = _configuration;
		this.getEnabledControls = getEnabledControls;
		this.disableControl = disableControl;
		this.enableControl = enableControl;
		// this.setLanguage				= setLanguage;
		// this.getCurrentLanguage	= getCurrentLanguage;
		this.showPreviewPanel = showPreviewPanel;
		this.showPreviewModels = showPreviewModels;
	
		this.setListItemCssClass = setListItemCssClass;
		this.getItemsNotTocount = getItemsNotTocount;
		this.setItemsNotTocount = setItemsNotTocount;
		this.addControlToDragDropPresentationModel = addControlToDragDropPresentationModel;
		this.getDragDropPresentationModel = getDragDropPresentationModel;
	
		function setListItemCssClass(fromConfig) {
			_listDragDropItemCssClasses = [].concat(fromConfig);
		}
	
		function getItemsNotTocount() {
			return _itemsNotToCountFoReal;
		}
	
		function setItemsNotTocount(fromConfig) {
			_itemsNotToCountFoReal = angular.copy(fromConfig);
		}
	
		//set default config
		function defaultConfig() {
			var _defaultConfiguration = {
				modalAnimated: false
			};
			return _defaultConfiguration;
		}
	
		function addControlToDragDropPresentationModel(controlToAdd, groupToAdd) {
			if (typeof controlToAdd !== 'undefined' && typeof groupToAdd !== 'undefined') {
				addToGroupControl(controlToAdd, groupToAdd);
			}
		}
	
		function getDragDropPresentationModel() {
			return _dragDropPresentationModel;
		}
	
		//show preview panel by default
		function getDefaultshowPreviewPanel() {
			return true;
		}
	
		//show preview data, fields models in preview panel
		function getDefaultShowPreviewModel() {
			return true;
		}
	
		// function getCurrentLanguage(){
		// 		return _currentLanguage;
		// }	
	
		//list of controls
		function controlsList() {
			var controls = [{ name: 'empty', enabled: true }, { name: 'Header', enabled: true }, { name: 'Subtitle', enabled: true }, { name: 'TextInput', enabled: true }, { name: 'Password', enabled: true }, { name: 'Email', enabled: true }, { name: 'Date', enabled: true }, { name: 'Texarea', enabled: true }, { name: 'RichTextEditor', enabled: true }, { name: 'Radio', enabled: true }, { name: 'Checkbox', enabled: true }, { name: 'BasicSelect', enabled: true }, { name: 'GroupedSelect', enabled: true }];
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
	
		// //language : set default to english
		// function getDefaultLanguage(){
		// 	let lang = 'en';
		// 	return lang;
		// }
	
		// function setDefaultLanguage(){
		// 	_currentLanguage = _defaultLanguage;
		// 	$translateProvider.preferredLanguage(_currentLanguage);
		// 	return _currentLanguage;
		// }	
	
		// function setLanguage(language){				
		// 	if (angular.isString(language)) {
		// 		_currentLanguage = language;
		// 		$translateProvider.preferredLanguage(language);
		// 	}else{
		// 		setDefaultLanguage();
		// 	}
		// }
	
		// function initDefaultLanguage(){
		// 	$translateProvider.useSanitizeValueStrategy('escape'); 	//security : Enable escaping of HTML
		// 	$translateProvider.fallbackLanguage(_defaultLanguage);	//fallback language to default language
		// 	$translateProvider.preferredLanguage(_defaultLanguage);
		// 	return _defaultLanguage;
		// }
	
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
		// easyFormDragDropWayConfigGET.$inject = ['$translate'];
		// function easyFormDragDropWayConfigGET($translate){
		easyFormDragDropWayConfigGET.$inject = [];
		function easyFormDragDropWayConfigGET() {
	
			var service = {
				setModalAnimation: setModalAnimationFct,
				getModalAnimationValue: getModalAnimationValue,
				getListEnabledControl: getListEnabledControl,
				// setLanguage 											: switchLanguage,
				// getCurrentLanguage								: getCurrentLanguage,
				isPreviewPanelVisible: isPreviewPanelVisible,
				arePreviewModelsVisible: arePreviewModelsVisible,
	
				getListItemCssClass: getListItemCssClass,
				getItemsNotToCount: getItemsNotToCount,
				getItemCssDependingNumberItemsInRow: getItemCssDependingNumberItemsInRow,
				getDistinctItemCssClass: getDistinctItemCssClass,
				getDragDropConfigModel: getDragDropConfigModel,
				getDragDropPresentationModel: getDragDropPresentationModel,
				setDragDropConfigContainerDecorationCollapse: setDragDropConfigContainerDecorationCollapse
			};
			return service;
	
			function getDragDropPresentationModel() {
				return _dragDropPresentationModel;
			}
	
			function setDragDropConfigContainerDecorationCollapse(dragDropConfigModel, indexValue, isCollapsedBool) {
				if (typeof indexValue !== 'undefined' && typeof isCollapsedBool !== 'undefined') {
					if (indexValue === parseInt(indexValue, 10)) {
						dragDropConfigModel.containerConfig.decoration[indexValue].isCollapsed = isCollapsedBool;
					}
				}
				return true;
			}
	
			function getDragDropConfigModel() {
				return _dragDropConfigModel;
			}
	
			function getDistinctItemCssClass() {
				var distinctCssClass = [];
				angular.forEach(_listDragDropItemCssClasses, function (valueRef) {
	
					var cssClassRef = valueRef.cssClass;
	
					if (distinctCssClass.length === 0) {
						distinctCssClass.push(cssClassRef);
					} else {
						var canAdd = true;
						angular.forEach(distinctCssClass, function (valueProc) {
							var cssClassProc = valueProc;
							if (cssClassRef === cssClassProc) {
								canAdd = false;
							}
						});
						if (canAdd) distinctCssClass.push(cssClassRef);
					}
				});
				return distinctCssClass;
			}
	
			function getItemCssDependingNumberItemsInRow(numberOfItems) {
				if (typeof numberOfItems !== 'undefined') {
					var classToReturn = '';
					for (var i = _listDragDropItemCssClasses.length - 1; i >= 0; i--) {
						if (_listDragDropItemCssClasses[i].numberItemPerRow === numberOfItems) {
							classToReturn = _listDragDropItemCssClasses[i].cssClass;
						}
					}
					return classToReturn;
				} else {
					return '';
				}
			}
	
			function getListItemCssClass() {
				return _listDragDropItemCssClasses;
			}
	
			function getItemsNotToCount() {
				return _itemsNotToCountFoReal;
			}
	
			function getModalAnimationValue() {
				return _configuration.modalAnimated;
			}
	
			function setModalAnimationFct(value) {
				setModalAnimation(value);
			}
	
			function getListEnabledControl() {
				return angular.copy(_controlsList);
			}
	
			// function switchLanguage(language){
			// 	if (angular.isString(language)) {
			// 		_currentLanguage = language;
			// 		$translate.use(language);
			// 	}else{
			// 		setDefaultLanguage();
			// 	}
			// }					
	
			function isPreviewPanelVisible() {
				return _showPreviewPanel;
			}
	
			function arePreviewModelsVisible() {
				return _showPreviewModels;
			}
		}
	
		/**
	  * addToGroupControl : add control to _dragDropPresentationModel
	  * @param {[type]} thisControl : control to add
	  * @param {[type]} thisGroup   : groupId wher this control should be added
	  *
	  * NOTE : if _dragDropPresentationModel wrong initialized it will create list of group conforming to 
	  * configModel
	  */
		function addToGroupControl(thisControl, thisGroup) {
			/**
	   * search group if already exists
	   */
			if (_dragDropPresentationModel[0].length > 0) {
				/**
	    * case when _dragDropConfigModel.containerConfig.decoration.length is > to _dragDropPresentationModel[0].length
	    *
	    * for instance : initialization _dragDropPresentationModel[0] in between
	    */
				if (_dragDropPresentationModel[0].length < _dragDropConfigModel.containerConfig.decoration.length) {
					var missingGroupNumber = _dragDropConfigModel.containerConfig.decoration.length - _dragDropPresentationModel[0].length;
	
					for (var i = 0; i < missingGroupNumber; i++) {
						_dragDropPresentationModel[0].push([]);
					}
				}
				/**
	    * push control to right index 
	    * (deduced by _dragDropConfigModel.containerConfig.decoration.WhenIndex value for groupId === thisGroup)
	    */
				_dragDropConfigModel.containerConfig.decoration.forEach(function (groupConfig) {
					if (thisGroup.addToGroupCtrl === groupConfig.groupId) {
						_dragDropPresentationModel[0][groupConfig.WhenIndex].push(thisControl);
					}
				});
			} else {
				/**
	    * no group no control
	    *
	    * initialize _dragDropConfigModel.containerConfig.decoration list
	    */
				_dragDropConfigModel.containerConfig.decoration.forEach(function () {
					return _dragDropPresentationModel[0].push([]);
				});
				/**
	    * push control to right index 
	    * (deduced by _dragDropConfigModel.containerConfig.decoration.WhenIndex value for groupId === thisGroup)
	    */
				_dragDropConfigModel.containerConfig.decoration.forEach(function (groupConfig) {
					if (thisGroup.addToGroupCtrl === groupConfig.groupId) {
						_dragDropPresentationModel[0][groupConfig.WhenIndex].push(thisControl);
					}
				});
			}
		}
	}
	
	// easyFormDragWayConfig.$inject = ['$translateProvider'];
	
	easyFormDragWayConfig.$inject = [];
	
	exports.default = easyFormDragWayConfig;
	exports.EASY_FORM_DRAG_DROP_WAY_CONFIG_NAME = EASY_FORM_DRAG_DROP_WAY_CONFIG_NAME;

/***/ },
/* 79 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var LIST_DRAG_DROP_ITEM_CSS_CLASSES = [{
	  cssClass: 'col-md-12',
	  numberItemPerRow: 0
	}, {
	  cssClass: 'col-md-12',
	  numberItemPerRow: 1
	}, {
	  cssClass: 'col-md-6',
	  numberItemPerRow: 2
	}, {
	  cssClass: 'col-md-4',
	  numberItemPerRow: 3
	}];
	
	var DRAG_DROP_CONFIG_MODEL = {
	  dropZoneConfig: {
	    decoration: [{
	      WhenIndex: 0,
	      ApplycssClass: 'col-md-4',
	      fontAwesomeIcon: 'fa fa-level-up',
	      title: 'Drag control from here : '
	    }, {
	      WhenIndex: 1,
	      ApplycssClass: 'col-md-8',
	      fontAwesomeIcon: 'fa fa-level-down',
	      title: 'Drop control into here : '
	    }],
	    verboseMode: false
	  },
	  containerConfig: {
	    decoration: [{
	      WhenIndex: 0,
	      ApplycssClass: 'col-md-12',
	      title: 'Blank : ',
	      groupId: 'blank',
	      isCollapsed: true
	    }, {
	      WhenIndex: 1,
	      ApplycssClass: 'col-md-12',
	      title: 'Headers : ',
	      groupId: 'headers',
	      isCollapsed: true
	    }, {
	      WhenIndex: 2,
	      ApplycssClass: 'col-md-12',
	      title: 'Text inputs : ',
	      groupId: 'inputs',
	      isCollapsed: true
	    }, {
	      WhenIndex: 3,
	      ApplycssClass: 'col-md-12',
	      title: 'Textareas : ',
	      groupId: 'textareas',
	      isCollapsed: true
	    }, {
	      WhenIndex: 4,
	      ApplycssClass: 'col-md-12',
	      title: 'Radios : ',
	      groupId: 'radios',
	      isCollapsed: true
	    }, {
	      WhenIndex: 5,
	      ApplycssClass: 'col-md-12',
	      title: 'Checkboxes : ',
	      groupId: 'checkboxes',
	      isCollapsed: true
	    }, {
	      WhenIndex: 6,
	      ApplycssClass: 'col-md-12',
	      title: 'Selects : ',
	      groupId: 'selects',
	      isCollapsed: true
	    }],
	    verboseMode: false,
	    collapseEnabled: true,
	    collapseCtrl: [{
	      atIndex: 0,
	      collapse: true
	    }, {
	      atIndex: 1,
	      collapse: true
	    }]
	  },
	  itemConfig: {
	    verboseMode: false
	  }
	};
	
	var DRAG_DROP_PRESENTATION_MODEL = [
	//1 column here is control selection column
	[], [
	//empty 1st line at initialisation
	[]]];
	
	var ITEMS_NOT_TO_COUNT_FOR_REAL = {
	  //placeholder :         '',
	  itemBeingDragged: ''
	};
	
	exports.LIST_DRAG_DROP_ITEM_CSS_CLASSES = LIST_DRAG_DROP_ITEM_CSS_CLASSES;
	exports.DRAG_DROP_CONFIG_MODEL = DRAG_DROP_CONFIG_MODEL;
	exports.DRAG_DROP_PRESENTATION_MODEL = DRAG_DROP_PRESENTATION_MODEL;
	exports.ITEMS_NOT_TO_COUNT_FOR_REAL = ITEMS_NOT_TO_COUNT_FOR_REAL;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLERAS = exports.DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global angular */
	
	///////////////////////////////////////////////////////////////////////
	// TODO :
	// - check no use methods that come from step way and delete if not needed
	// - check other TODO (a lot of fixes are needed)
	///////////////////////////////////////////////////////////////////////
	
	var _edaDragDropWayEdaDragdropWayEasyFormGenControllerHelpers = __webpack_require__(81);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER = 'edaDragDropWayEasyFormGenCtrl';
	var DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLERAS = 'vm';
	
	var edaDragDropWayEasyFormGenCtrl = function () {
	  function edaDragDropWayEasyFormGenCtrl($scope, easyFormGenVersion, $filter, $anchorScroll, toaster, $timeout, $log, formFieldManage, controllerModalProxy, dragDropItemDecorationService, ddModelConfModelProxyService, ddItemRightClickedManager, easyFormDragWayConfig) {
	    _classCallCheck(this, edaDragDropWayEasyFormGenCtrl);
	
	    this.$scope = $scope;
	    this.easyFormGenVersion = easyFormGenVersion;
	    this.$filter = $filter;
	    this.$anchorScroll = $anchorScroll;
	    this.toaster = toaster;
	    this.$timeout = $timeout;
	    this.$log = $log;
	    this.formFieldManage = formFieldManage;
	    this.controllerModalProxy = controllerModalProxy;
	    this.dragDropItemDecorationService = dragDropItemDecorationService;
	    // this.dragDropConfig                   = dragDropConfig;
	    this.ddModelConfModelProxyService = ddModelConfModelProxyService;
	    this.ddItemRightClickedManager = ddItemRightClickedManager;
	    this.easyFormDragWayConfig = easyFormDragWayConfig;
	
	    this.init();
	  }
	
	  _createClass(edaDragDropWayEasyFormGenCtrl, [{
	    key: 'init',
	    value: function init() {
	      this.easyFormGeneratorVERSION = this.easyFormGenVersion;
	      this.tab = (0, _edaDragDropWayEdaDragdropWayEasyFormGenControllerHelpers.initTabModel)(this.easyFormDragWayConfig.isPreviewPanelVisible(), this.easyFormDragWayConfig.arePreviewModelsVisible());
	      this.returnSaveEvent = false;
	      this.dataModel = {}; //was vm.model in ES5 version
	      this.wfFormFields = [];
	      this.wfFormFieldsOnlyNeededProperties = [];
	      this.ihm = (0, _edaDragDropWayEdaDragdropWayEasyFormGenControllerHelpers.initIhmModel)();
	      this.easyFormDragDropProperties = this.easyFormDragWayConfig.getDragDropConfigModel();
	      this.dragDropModel = [].concat(this.easyFormDragWayConfig.getDragDropPresentationModel());
	      this.numberOfColumns = 1;
	      this.MaxNumberOfColumns = 3;
	      this.MinNumberOfColumns = 1;
	      this.configuration = {};
	      this.animationsEnabled = this.easyFormDragWayConfig.getModalAnimationValue();
	      this.editPanelModel = { toggle: false };
	      this.debugProxyModel = this.controllerModalProxy.ProxyModel;
	      this.model = [];
	
	      this.formFieldManage.initConfigurationEditFromScratch(this.configuration, false);
	      this.controllerModalProxy.initProxyModel();
	    }
	  }, {
	    key: 'collapseAllGroupControl',
	    value: function collapseAllGroupControl(allExceptThisGroupIndex) {
	      var _this = this;
	
	      angular.forEach(this.easyFormDragDropProperties.containerConfig.decoration, function (value) {
	        if (value.WhenIndex !== allExceptThisGroupIndex) _this.easyFormDragWayConfig.setDragDropConfigContainerDecorationCollapse(_this.easyFormDragDropProperties, value.WhenIndex, true);
	      });
	    }
	  }, {
	    key: 'onSubmit',
	    value: function onSubmit() {
	      this.toaster.pop({
	        type: 'info',
	        timeout: 2000,
	        title: 'should save data model if it were not a static example',
	        body: 'data :' + this.$filter('json')(this.dataModel, 4),
	        showCloseButton: true
	      });
	    }
	  }, {
	    key: 'resetToZeroModel',
	    value: function resetToZeroModel() {
	      this.configuration.activeLine = 1;
	      if (this.configuration.lines.length > 1) this.configuration.lines.splice(1, this.configuration.lines.length - 2);
	      return this.countConfigurationModelLines();
	    }
	
	    //TO CHECK if does not come from step way :
	
	  }, {
	    key: 'countConfigurationModelLines',
	    value: function countConfigurationModelLines() {
	      return this.configuration.lines.length;
	    }
	
	    //  //TO CHECK THEN TO DELETE : should come from step way...
	    // setActiveLineNumber(lineNumber){
	    //  if (lineNumber <= this.countConfigurationModelLines()) this.configuration.activeLine = lineNumber;
	    // }
	
	    //  //TO CHECK THEN TO DELETE : should come from step way...
	    //  upThisLine(indexLine){
	    //    if (indexLine > -1) {
	    //      if (this.configuration.lines[indexLine - 1]) {
	    //        let currentLineObj = this.configuration.lines[indexLine];
	    //        this.configuration.lines.splice(indexLine , 1);
	    //        this.configuration.lines.splice((indexLine - 1), 0, currentLineObj);
	    //        this.configuration.activeLine = 1;
	    //      }
	    //    }
	    //
	    //    this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
	    //    this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
	    //  }
	
	    //  //TO CHECK THEN TO DELETE : should come from step way...
	    // downThisLine(indexLine){
	    //  if (indexLine > -1) {
	    //    if (this.configuration.lines[indexLine + 1]) {
	    //      let currentLineObj = this.configuration.lines[indexLine];
	    //      this.configuration.lines.splice(indexLine , 1);
	    //      this.configuration.lines.splice((indexLine + 1), 0, currentLineObj);
	    //      this.configuration.activeLine = 1;
	    //    }
	    //  }
	    //  this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
	    //  this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
	    // }
	
	    //  //TO CHECK THEN TO DELETE : should come from step way...
	    //  removeThisLine(index){
	    //    if (index > -1) {
	    //      if (this.configuration.lines.length > 1) {
	    //        if (this.configuration.activeLine === index + 1) this.configuration.activeLine = 1;
	    //        this.configuration.lines.splice(index, 1);
	    //      }else{
	    //        this.$timeout(()=>{
	    //          this.toaster.pop({
	    //            type            : 'warning',
	    //            title           : 'Last line' ,
	    //            body            : 'Can\'t delete the last line',
	    //            showCloseButton : true
	    //          });
	    //        }, 100);
	    //      }
	    //      this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
	    //      this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
	    //    }
	    //  }
	
	    //  //TO CHECK THEN TO DELETE : should come from step way...
	    // increaseNumberOfColumns(){
	    //  if (this.configuration.lines[this.configuration.activeLine -1].columns.length < this.MaxNumberOfColumns) {
	    //    let newNumberOfColumns = this.configuration.lines[this.configuration.activeLine -1].columns.push(initColumnTemplate());
	    //    this.configuration.lines[this.configuration.activeLine -1].columns[newNumberOfColumns - 1].numColumn = newNumberOfColumns;
	    //  }
	    //  this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
	    //  this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
	    // }
	
	    //  //TO CHECK THEN TO DELETE : should come from step way...
	    // decreaseNumberOfColumns(indexLine, indexColumn){
	    //  if (this.configuration.lines[this.configuration.activeLine -1].columns.length > 1) {
	    //    this.configuration.lines[this.configuration.activeLine -1].columns.splice(this.configuration.lines[this.configuration.activeLine -1].columns.length -1, 1);
	    //  }
	    //  this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
	    //  this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
	    // }
	
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
	  }, {
	    key: 'dragoverCallbackContainer',
	    value: function dragoverCallbackContainer(parentparentIndex, parentIndex, index) {
	      //prevent container in layout column to be drag to control select contianer
	      if (index === 0) return false;
	      return true;
	    }
	  }, {
	    key: 'dropCallback',
	    value: function dropCallback(event, index, item, external, type, allowedType) {
	      var _this2 = this;
	
	      if (external) {
	        if (allowedType === 'itemType' && !item.label) return false;
	        if (allowedType === 'containerType' && !angular.isArray(item)) return false;
	      }
	      //set a timeout befire binding since ddModel may not be called when already full updated
	      var timerRefreshDDToConfig = this.$timeout(function () {
	        _this2.configuration = angular.copy(_this2.ddModelConfModelProxyService.refreshAllConfigurationFromDragAndDropModel(_this2.configuration, _this2.dragDropModel));
	        _this2.formFieldManage.applyConfigurationToformlyModel(_this2.configuration, _this2.wfFormFields, _this2.dataModel);
	        _this2.wfFormFieldsOnlyNeededProperties = angular.copy(_this2.wfFormFields);
	        _this2.ddModelConfModelProxyService.refreshControlsKeys(_this2.configuration, _this2.dragDropModel);
	      }, 200);
	      this.$scope.$on('$destroy', function () {
	        return _this2.$timeout.cancel(timerRefreshDDToConfig);
	      });
	      return item;
	    }
	  }, {
	    key: 'dndItemMoved',
	    value: function dndItemMoved(parentParentIndex, parentIndex, itemIndex) {
	      //prevent item from first container to disapear when dropped on other container
	      if (parentParentIndex > 0) this.dragDropModel[parentParentIndex][parentIndex].splice(itemIndex, 1);
	    }
	  }, {
	    key: 'dragoverCallbackItems',
	    value: function dragoverCallbackItems(ParentParentIndex, parentIndex) {
	      //prevent items in layout column to be drag to control select
	      if (parentIndex === 0) return false;
	      return true;
	    }
	
	    //TODO : will replace in html : dnd-disable-if="items.length > 2"
	
	  }, {
	    key: 'disableItemDropIf',
	    value: function disableItemDropIf() {}
	  }, {
	    key: 'dropCallbackItems',
	    value: function dropCallbackItems(event, index, realIndex, parentIndex, parentParentIndex, parentParentParentIndex, item, external, type, allowedType) {
	      var _this3 = this;
	
	      if (external) {
	        if (allowedType === 'itemType' && !item.label) return false;
	        if (allowedType === 'containerType' && !angular.isArray(item)) return false;
	      }
	      //set a timeout before binding since ddModel may not be called when already full updated
	      var timerRefreshDDToConfig = this.$timeout(function () {
	        _this3.configuration = angular.copy(_this3.ddModelConfModelProxyService.refreshAllConfigurationFromDragAndDropModel(_this3.configuration, _this3.dragDropModel));
	        _this3.formFieldManage.applyConfigurationToformlyModel(_this3.configuration, _this3.wfFormFields, _this3.dataModel);
	        _this3.wfFormFieldsOnlyNeededProperties = angular.copy(_this3.wfFormFields);
	        // refresh controls key in dragDrop Model to persist already exists controls between refreshes when item drop events
	        _this3.ddModelConfModelProxyService.refreshControlsKeys(_this3.configuration, _this3.dragDropModel);
	      }, 200);
	      // add/set rightCliked property to false (will help edaRightClick directive)
	      this.ddItemRightClickedManager.setUnRightClicked(item);
	      // timerRefreshDDToConfig timer destruction
	      this.$scope.$on('$destroy', function () {
	        return _this3.$timeout.cancel(timerRefreshDDToConfig);
	      });
	      return item;
	    }
	  }, {
	    key: 'saveFromEditPanel',
	    value: function saveFromEditPanel() {
	      /**
	      * TODO :
	      * should be called from edit panel
	      *
	      * AND
	      *
	      * should call all these methods
	      *
	      * need to get  :
	      *
	      * - line index
	      * - column index
	      * - basicSelectRowCollection (from edpitpanelcontroller)   --> maybe in controllerModalProxy service
	      * - groupedSelectRowCollection (from edpitpanelcontroller) --> maybe in controllerModalProxy service
	      * - radioRowCollection (from edpitpanelcontroller)         --> maybe in controllerModalProxy service
	      */
	      this.controllerModalProxy.bindSpecialCtrlTemporyModelsToProxyModel();
	      //save config to control
	      //controllerModalProxy.applyConfigToSelectedControl(self.proxyModel);
	      //return current model to parent controller :
	
	      //update configuration model and formly model
	      this.controllerModalProxy.bindConfigurationModelFromProxyModel(this.controllerModalProxy.getEditPanelModelLineIndex(), this.controllerModalProxy.getEditPanelModelColumnIndex(), this.configuration);
	      this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
	      this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
	      this.ddModelConfModelProxyService.refreshControlsKeys(this.configuration, this.dragDropModel);
	      this.controllerModalProxy.setEditPanelModelToggle(false);
	      this.editPanelModel.toggle = this.controllerModalProxy.getEditPanelModelToggle();
	      this.ddItemRightClickedManager.resetAllDragDropItemSelectedState(this.dragDropModel);
	    }
	  }, {
	    key: 'closeEditPanel',
	    value: function closeEditPanel() {
	      // reset all rightClicked control properties to false
	      this.ddItemRightClickedManager.resetAllDragDropItemSelectedState(this.dragDropModel);
	
	      /**
	      * TODO : refresh configuration model
	      * uncomment after update these next 3 lines
	      *
	      * NOTE : indexLine AND  numcolumn should be stored in service and
	      * updated when togle sidepanel
	      */
	      //this.controllerModalProxy.bindConfigurationModelFromProxyModel(indexLine, numcolumn, modalAddCtrlModel, this.configuration);
	      //this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
	      //this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
	
	      this.controllerModalProxy.setEditPanelModelToggle(false);
	      this.editPanelModel.toggle = this.controllerModalProxy.getEditPanelModelToggle();
	    }
	  }, {
	    key: 'setRightClicked',
	    value: function setRightClicked(previousState, item) {
	      item.rightCliked = true;
	    }
	  }, {
	    key: 'toggleEditPanel',
	    value: function toggleEditPanel(event, lineIndex, colIndex, item) {
	      var _this4 = this;
	
	      this.ddItemRightClickedManager.resetAllDragDropItemSelectedState(this.dragDropModel);
	      // already opened (could be another control edit)
	      if (this.controllerModalProxy.getEditPanelModelToggle()) {
	        // -> immediate close and refresh configuration model + formly model
	        this.controllerModalProxy.setEditPanelModelToggle(false);
	        this.editPanelModel.toggle = this.controllerModalProxy.getEditPanelModelToggle();
	
	        //TODO : for refreshing
	        //this.controllerModalProxy.bindConfigurationModelFromProxyModel(indexLine, numcolumn, modalAddCtrlModel, this.configuration);
	        //this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
	        //this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
	
	        // check if new control right clicked otherwise just toggle side panel
	        if (typeof this.controllerModalProxy.getEditPanelModelLineIndex() !== 'undefined' && typeof this.controllerModalProxy.getEditPanelModelColumnIndex() !== 'undefined' && typeof this.controllerModalProxy.getEditPanelModelControl() !== 'undefined') {
	          if (this.controllerModalProxy.getEditPanelModelLineIndex() === lineIndex && this.controllerModalProxy.getEditPanelModelColumnIndex() === colIndex && angular.equals(this.controllerModalProxy.getEditPanelModelControl(), item)) {
	            //console.info('already opened for SAME ctrl : so close - no re-open');
	          } else {
	            (function () {
	              //console.info('already opened for DIFFERENT ctrl : so re-open');
	              item.rightCliked = true;
	              // set a timeout before re-opening, 500ms is ok for a ps-size="400px"
	              var timerCloseOpenedEditPanel = _this4.$timeout(function () {
	                _this4.controllerModalProxy.setEditPanelModelLineIndex(lineIndex);
	                _this4.controllerModalProxy.setEditPanelModelColumnIndex(colIndex);
	                _this4.controllerModalProxy.setEditPanelModelControl(item);
	                // control model passed to Service : controllerModalProxy
	                _this4.controllerModalProxy.setProxyModelFromConfigurationSelection(_this4.configuration, lineIndex, colIndex);
	                _this4.controllerModalProxy.setEditPanelModelToggle(true);
	                _this4.$scope.editPanelModel.toggle = _this4.controllerModalProxy.getEditPanelModelToggle();
	              }, 200);
	              _this4.$scope.$on('$destroy', function () {
	                return _this4.$timeout.cancel(timerCloseOpenedEditPanel);
	              });
	            })();
	          }
	        }
	      } else {
	        // previous state = closed = immediate open
	        // console.info('NOT already opened : so open');
	        item.rightCliked = true;
	
	        this.controllerModalProxy.setEditPanelModelLineIndex(lineIndex);
	        this.controllerModalProxy.setEditPanelModelColumnIndex(colIndex);
	        this.controllerModalProxy.setEditPanelModelControl(item);
	        // control model passed to Service : controllerModalProxy
	        this.controllerModalProxy.setProxyModelFromConfigurationSelection(this.configuration, lineIndex, colIndex);
	        this.controllerModalProxy.setEditPanelModelToggle(true);
	        this.editPanelModel.toggle = this.controllerModalProxy.getEditPanelModelToggle();
	      }
	
	      // console.info('after toggleLeftPanel check :');
	      // console.dir({
	      //   'this.editPanelModel'                 : angular.copy(this.editPanelModel),
	      //   'controllerModalProxy.editPanelModel' : angular.copy(this.controllerModalProxy.editPanelModel)
	      // });
	    }
	
	    // // refreshModels : to call after drag and drop events
	    // refreshModels(){
	    //   this.$timeout(()=>{
	    //    console.info('refreshing models');
	    //    formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
	    //    this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
	    //   }, 10);
	    // }
	
	
	  }, {
	    key: 'removeThisLine',
	    value: function removeThisLine(lineIndex) {
	      this.dragDropModel[1].splice(lineIndex, 1);
	    }
	
	    //TODO : to fix
	
	  }, {
	    key: 'addNewline',
	    value: function addNewline() {
	      // re-render formfield
	      // TODO : to fix
	      this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
	      this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
	    }
	  }, {
	    key: 'insertNewLine',
	    value: function insertNewLine() {
	      this.addNewline();
	      this.dragDropModel[1].push([]);
	    }
	  }]);
	
	  return edaDragDropWayEasyFormGenCtrl;
	}();
	
	edaDragDropWayEasyFormGenCtrl.$inject = ['$scope', 'easyFormGenVersion', '$filter', '$anchorScroll', 'toaster', '$timeout', '$log', 'formFieldManage', 'controllerModalProxy', 'dragDropItemDecorationService', 'ddModelConfModelProxyService', 'ddItemRightClickedManager', 'easyFormDragWayConfig'];
	
	exports.default = edaDragDropWayEasyFormGenCtrl;
	exports.DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER = DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER;
	exports.DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLERAS = DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLERAS;

/***/ },
/* 81 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/* global angular */
	var DEBUG_MODEL = {
		showDebug: false,
		configurationModelNumberofLines: 1
	};
	var initDebugModel = function initDebugModel() {
		return angular.copy(DEBUG_MODEL);
	};
	
	var DEFAULT_TAB_MODEL = {
		editTab: {
			active: true
		},
		previewTab: {
			active: false,
			tabVisible: true,
			modelsVisible: true
		}
	};
	
	var initTabModel = function initTabModel(isPreviewPanelVisible, arePreviewModelsVisible) {
		var _tabModel = angular.copy(DEFAULT_TAB_MODEL);
		angular.extend(_tabModel.previewTab, {
			tabVisible: isPreviewPanelVisible,
			modelsVisible: arePreviewModelsVisible
		});
		return _tabModel;
	};
	
	var COLUMN_TEMPLATE = {
		numColumn: -1,
		exist: true,
		control: {
			type: 'none',
			key: 'none',
			subtype: 'none'
			// templateOptions: {
			//                     label: 'none',
			//                     placeholder: 'none',
			//                     required: false,
			//                     description: 'Descriptive text'
			//                   }
		}
	};
	var initColumnTemplate = function initColumnTemplate() {
		return angular.copy(COLUMN_TEMPLATE);
	};
	
	var LINE_TEMPLATE = {
		line: -1,
		activeColumn: 1,
		columns: [{
			numColumn: 1,
			exist: true,
			control: {
				type: 'none',
				key: 'none'
				// templateOptions: {
				//                     label: 'none',
				//                     placeholder: 'none',
				//                     required: false,
				//                     description: 'Descriptive text'
				//                   }
			}
		}]
	};
	var initLineTemplate = function initLineTemplate() {
		return angular.copy(LINE_TEMPLATE);
	};
	
	var DEFAULT_IHM_MODEL = {
		preview: {
			formlyModelViewExpanded: true,
			formlyFieldsViewExpanded: true,
			customizeFormButtonsExpanded: true,
			saveThisFormExpanded: true
		}
	};
	
	var initIhmModel = function initIhmModel() {
		return angular.copy(DEFAULT_IHM_MODEL);
	};
	
	exports.initDebugModel = initDebugModel;
	exports.initTabModel = initTabModel;
	exports.initColumnTemplate = initColumnTemplate;
	exports.initLineTemplate = initLineTemplate;
	exports.initIhmModel = initIhmModel;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.EDA_DRAGDROP_WAY_EASY_FORM_GEN_DIRECTIVE = undefined;
	
	var _edaDragDropWayEdaDragdropWayEasyFormGenTemplate = __webpack_require__(83);
	
	var _edaDragDropWayEdaDragdropWayEasyFormGenTemplate2 = _interopRequireDefault(_edaDragDropWayEdaDragdropWayEasyFormGenTemplate);
	
	var _edaDragDropWayEdaDragdropWayEasyFormGen = __webpack_require__(80);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* global angular */
	
	//TODO : to bindToController
	//-> then angular 1.4+ will be required...
	//-> check methot to refactor inside rag drop way then common step way and drag drop way
	
	var EDA_DRAGDROP_WAY_EASY_FORM_GEN_DIRECTIVE = 'edaDragdropWayEasyFormGen';
	
	function edaDragdropWayEasyFormGen($timeout, formFieldManage, ddModelConfModelProxyService,
	// dragDropConfig,
	easyFormDragWayConfig) {
	
		var directive = {
			restrict: 'E',
			template: _edaDragDropWayEdaDragdropWayEasyFormGenTemplate2.default,
			scope: {
				edaEasyFormGeneratorModel: '=',
				edaSaveFormEvent: '&edaSaveFormEvent'
			},
			controller: _edaDragDropWayEdaDragdropWayEasyFormGen.DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER,
			controllerAs: _edaDragDropWayEdaDragdropWayEasyFormGen.DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLERAS,
			replace: false,
			link: linkFct
		};
		return directive;
	
		function linkFct(scope) {
			// watch "scope.easyFormGeneratorModel"
			scope.$watch(function () {
				return scope.edaEasyFormGeneratorModel;
			}, function () {
				return loadExistingConfigurationModel();
			}, true);
	
			// watch "scope.returnSaveEvent"" = catch saving form event  
			scope.$watch(function () {
				return scope.returnSaveEvent;
			}, function (newValue) {
				if (newValue === true) {
					var _easyFormGeneratorModel = {
						formName: scope.vm.configuration.formName,
						btnSubmitText: scope.vm.configuration.submitButtonText,
						btnCancelText: scope.vm.configuration.cancelButtonText,
						edaFieldsModel: scope.vm.configuration.lines,
						//just as test
						edaFieldsModelStringified: angular.toJson(scope.vm.configuration.lines),
						formlyFieldsModel: scope.vm.wfFormFieldsOnlyNeededProperties,
						dataModel: scope.vm.dataModel
					};
					scope.edaSaveFormEvent({
						edaEasyFormGeneratorModel: _easyFormGeneratorModel
					});
					//back to false, waiting next save event
					scope.returnSaveEvent = false;
				}
			});
	
			function returnAttributeConfigurationLinesIfNotEmpty() {
				var edaEasyFormGeneratorModelToReturn = angular.isArray(scope.edaEasyFormGeneratorModel.edaFieldsModel) ? scope.edaEasyFormGeneratorModel.edaFieldsModel.length > 0 ? scope.edaEasyFormGeneratorModel.edaFieldsModel : emptyEdaFieldsModel() : emptyEdaFieldsModel();
				return edaEasyFormGeneratorModelToReturn;
			}
	
			/**
	  	* empty fields model : to display at least an empty line
	  	* otherwise would look like ugly empty line like it were a bug
	  	*/
			function emptyEdaFieldsModel() {
				var emptyModel = [{
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
				return emptyModel;
			}
	
			function returnAttributeDataModelIfNotEmpty() {
				var dataModelToReturn = angular.isArray(scope.edaEasyFormGeneratorModel.dataModel) ? scope.edaEasyFormGeneratorModel.dataModel.length > 0 ? scope.edaEasyFormGeneratorModel.dataModel : [] : [];
				return dataModelToReturn;
			}
	
			function loadExistingConfigurationModel() {
				if (angular.isDefined(scope.edaEasyFormGeneratorModel)) {
					var configlines = returnAttributeConfigurationLinesIfNotEmpty();
					scope.vm.configurationLoaded = {};
					formFieldManage.bindConfigurationLines(scope.vm.configurationLoaded, configlines, false);
					//apply configuration model
					scope.vm.configuration = angular.copy(scope.vm.configurationLoaded);
					//apply ddModel
					ddModelConfModelProxyService.loadDragDropModelFromConfigurationModel(scope.vm.configuration, scope.vm.dragDropModel);
					updateConfigurationClassName(scope.vm.configuration);
					ddModelConfModelProxyService.refreshControlsKeys(scope.vm.configuration, scope.vm.dragDropModel);
					//apply formly model
					formFieldManage.applyConfigurationToformlyModel(scope.vm.configuration, scope.vm.wfFormFields, scope.vm.dataModel);
					scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy(scope.vm.wfFormFields);
					scope.vm.dataModel = returnAttributeDataModelIfNotEmpty();
					scope.vm.configuration.formName = angular.isString(scope.edaEasyFormGeneratorModel.formName) ? scope.edaEasyFormGeneratorModel.formName : '';
					scope.vm.configuration.submitButtonText = angular.isString(scope.edaEasyFormGeneratorModel.btnSubmitText) ? scope.edaEasyFormGeneratorModel.btnSubmitText : 'Submit';
					scope.vm.configuration.cancelButtonText = angular.isString(scope.edaEasyFormGeneratorModel.btnCancelText) ? scope.edaEasyFormGeneratorModel.btnCancelText : 'Cancel';
				}
			}
	
			function updateConfigurationClassName(configModel) {
				angular.forEach(configModel.lines, function (aline) {
					var cssClassToApply = easyFormDragWayConfig.getItemCssDependingNumberItemsInRow(aline.columns.length);
					angular.forEach(aline.columns, function (aControl) {
						return aControl.control.className = cssClassToApply;
					});
				});
			}
		}
	}
	
	edaDragdropWayEasyFormGen.$inject = ['$timeout', 'formFieldManage', 'ddModelConfModelProxyService',
	// 'dragDropConfig',
	'easyFormDragWayConfig'];
	
	exports.default = edaDragdropWayEasyFormGen;
	exports.EDA_DRAGDROP_WAY_EASY_FORM_GEN_DIRECTIVE = EDA_DRAGDROP_WAY_EASY_FORM_GEN_DIRECTIVE;

/***/ },
/* 83 */
/***/ function(module, exports) {

	module.exports = "<section id=\"pageWfEdit\">\n  <div>\n    <div class=\"container\">\n      <section id=\"preview\">\n        <div id=\"preview-content\">\n\t\t\t\t\t<div class=\"content-container\">\n\t\t\t\t\t\t<toaster-container\n              toaster-options=\"{ 'position-class': 'toast-top-full-width', 'extendedTimeout' : 500,'timeOut': 500 }\">\n\t\t\t\t\t\t</toaster-container>\n\t\t\t\t\t\t<uib-tabset justified=\"true\">\n\t\t\t\t\t\t\t<uib-tab\n                select=\"vm.tabJustSelected(2)\"\n                active=\"vm.tab.editTab.active\"\n                heading=\"Edit /Create\">\n                <div class=\"row\">\n\t\t\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\t\t\tpageslide\n\t\t\t\t\t\t\t\t\t\tps-open=\"vm.editPanelModel.toggle\"\n\t\t\t\t\t\t\t\t\t\tps-side=\"left\"\n\t\t\t\t\t\t\t\t\t\tps-cloak=\"true\"\n\t\t\t\t\t\t\t\t\t\tps-size=\"400px\">\n\t\t\t\t\t\t\t\t\t\t<left-panel\n                      close-edit-panel=\"vm.closeEditPanel()\"\n                      save-from-edit-panel=vm.saveFromEditPanel()>\n                    </left-panel>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"row advancedDemo\">\n\t\t\t\t\t\t\t\t\t\t\t<div ng-repeat=\"containers in vm.dragDropModel\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\t\t\t\t\t\tdd-decor-drop-zone\n\t\t\t\t\t\t\t\t\t\t\t\t\tdd-drop-zone-properties=\"vm.easyFormDragDropProperties.dropZoneConfig.decoration[$index]\"\n\t\t\t\t\t\t\t\t\t\t\t\t\tdd-drop-zone-verbose-mode=\"{{vm.easyFormDragDropProperties.dropZoneConfig.verboseMode}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\tdd-drop-zone-current-index=\"{{$index}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\tdd-drop-zone-add-new-line=\"vm.insertNewLine()\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div \tclass=\"dropzone box box-yellow\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ul\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-list=\"containers\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-allowed-types=\"['containerType']\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-external-sources=\"true\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-dragover=\"vm.dragoverCallbackContainer($parent.$parent.$index, $parent.$index, $index);\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-drop=\"vm.dropCallback(event, index, item, external, type, 'containerType');\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tng-repeat=\"items in containers\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-draggable=\"items\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-type=\"'containerType'\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-effect-allowed=\"copyMove\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-dragstart=\"\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-moved=\"containers.splice($index, 1);\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-disable-if=\"$parent.$index == 0\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-copied=\"\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"container-element box box-blue\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-decor-container\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-container-properties=\"vm.easyFormDragDropProperties.containerConfig.decoration[$index]\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-container-is-collpased=\"vm.easyFormDragDropProperties.containerConfig.decoration[$index].isCollapsed\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-container-verbose-mode=\"{{vm.easyFormDragDropProperties.containerConfig.verboseMode}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-container-current-index=\"{{$parent.$index}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-collapse-all=\"vm.collapseAllGroupControl(exceptThisOne)\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div dd-decor-include-container-here>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-decor-line\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-line-verbose-mode=\"{{vm.easyFormDragDropProperties.containerConfig.verboseMode}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-line-current-index=\"{{$index}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-line-parent-index=\"{{$parent.$index}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-remove-line=\"vm.removeThisLine($index)\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ul\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-list=\"items\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-allowed-types=\"['itemType']\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-horizontal-list=\"true\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-external-sources=\"true\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-disable-if=\"items.length > 2\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-dragover=\"vm.dragoverCallbackItems($parent.$parent.$index, $parent.$index, $index, external);\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-drop=\"vm.dropCallbackItems(event, index, $index,$parent.$index, $parent.$parent.$index, $parent.$parent.$parent.$index, item, external, type, 'itemType');\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"itemlist\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-content-counter\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-value-when-placeholder=\"dndPlaceholder\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-value-when-dragging=\"dndDraggingSource\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-full-model = \"vm.dragDropModel\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-content-counter-current-index=\"{{$index}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-content-counter-parent-index=\"{{$parent.$index}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-content-counter-force-css-refresh = \"command.forceRefresh\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tng-repeat=\"item in items\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-draggable=\"item\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-type=\"'itemType'\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-effect-allowed=\"copyMove\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-dragstart=\"\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-moved=\"vm.dndItemMoved($parent.$parent.$index, $parent.$index, $index);\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-copied=\"\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-decor-item\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-item-verbose-mode=\"{{vm.easyFormDragDropProperties.itemConfig.verboseMode}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-item-current-index=\"{{$index}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-item-parent-index=\"{{$parent.$index}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-item-parent-parent-index = \"{{$parent.$parent.$index}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-items-count=\"items.length\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-item-css-class=\"{{item.cssClass}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div id=\"itemContent\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-no-editable-control\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"rightClickCtrl\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tng-class=\"{rightClickCtrlSelected : item.rightCliked === true}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\teda-set-right-clicked=\"vm.setRightClicked(previousState, item)\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\teda-right-click=\"vm.toggleEditPanel($event, $parent.$index, $index, item)\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\teda-selected-class=\"rightClickCtrlSelected\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\teda-is-selected=\"{{item.rightCliked}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\teda-right-click-col-index = \"{{$parent.$parent.$index}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span ng-bind-html=\"item.label | trustThis\"></span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"clearfix\"></div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</uib-tab>\n\t\t\t\t\t\t\t<uib-tab\n\t\t\t\t\t\t\t\tselect=\"vm.tabJustSelected(1)\"\n\t\t\t\t\t\t\t\tactive=\"vm.tab.previewTab.active\"\n\t\t\t\t\t\t\t\theading=\"Preview\">\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\t\t\t\t\t\t\t\t\t\t<form ng-submit=\"vm.onSubmit()\">\n\t\t\t\t\t\t\t\t\t\t\t<formly-form\n\t\t\t\t\t\t\t\t\t\t\t\tid=\"previewFormlyForm\"\n\t\t\t\t\t\t\t\t\t\t\t\tmodel=\"vm.model\"\n\t\t\t\t\t\t\t\t\t\t\t\tfields=\"vm.wfFormFields\">\n\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"pull-right\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<button\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"btn btn-primary\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype=\"submit\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{vm.configuration.submitButtonText}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<button\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"btn btn-primary\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype=\"cancel\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{vm.configuration.cancelButtonText}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t\t</formly-form>\n\t\t\t\t\t\t\t\t\t\t</form>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div  class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\t\t\tclass=\"panel-heading heading-preview\"\n\t\t\t\t\t\t\t\t\t\tng-click=\"vm.ihm.preview.customizeFormButtonsExpanded =!vm.ihm.preview.customizeFormButtonsExpanded\">\n\t\t\t\t\t\t\t\t\t\t<h3 class=\"panel-title\">\n\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary btn-xs\" >\n\t\t\t\t\t\t\t\t\t\t\t\t<i\n\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"fa\"\n\t\t\t\t\t\t\t\t\t\t\t\t\tng-class=\"{'fa-angle-down':!vm.ihm.preview.customizeFormButtonsExpanded, 'fa-angle-up' : vm.ihm.preview.customizeFormButtonsExpanded}\">\n\t\t\t\t\t\t\t\t\t\t\t\t</i>\n\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t\t&nbsp;\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-wrench\"></i>\n\t\t\t\t\t\t\t\t\t\t\t&nbsp;\n\t\t\t\t\t\t\t\t\t\t\tCustomize form buttons\n\t\t\t\t\t\t\t\t\t\t</h3>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\t\t\t\t\t\t\t\t\t\t<div uib-collapse=\"vm.ihm.preview.customizeFormButtonsExpanded\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-6\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfor=\"inputSubmitButtontext\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\" greyText control-label\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tCustomize Submit button Text :\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype=\"text\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"form-control\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid=\"inputSubmitButtontext\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder=\"Submit button text\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tng-model=\"vm.configuration.submitButtonText\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-6\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfor=\"inputCancelButtontext\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\" greyText control-label\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tCustomize Cancel button Text :\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype=\"text\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"form-control\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid=\"inputCancelButtontext\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder=\"Cancel button text\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tng-model=\"vm.configuration.cancelButtonText\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\t\t\tclass=\"panel-heading heading-preview\"\n\t\t\t\t\t\t\t\t\t\tng-click=\"vm.ihm.preview.formlyModelViewExpanded =!vm.ihm.preview.formlyModelViewExpanded\">\n\t\t\t\t\t\t\t\t\t\t<h3 class=\"panel-title\">\n\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary btn-xs\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<i\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"fa\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tng-class=\"{'fa-angle-down':!vm.ihm.preview.formlyModelViewExpanded, 'fa-angle-up' : vm.ihm.preview.formlyModelViewExpanded}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t</i>\n\t\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t\t\t&nbsp;\n\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-eye\"></i>\n\t\t\t\t\t\t\t\t\t\t\t\t&nbsp;\n\t\t\t\t\t\t\t\t\t\t\t\tDATA MODEL\n\t\t\t\t\t\t\t\t\t\t</h3>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\t\t\t\t\t\t\t\t\t\t<div uib-collapse=\"vm.ihm.preview.formlyModelViewExpanded\">\n\t\t\t\t\t\t\t\t\t\t\t<pre>\n\t\t\t\t\t\t\t\t\t\t\t\t{{vm.model | json}}\n\t\t\t\t\t\t\t\t\t\t\t</pre>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\t\t\tclass=\"panel-heading heading-preview\"\n\t\t\t\t\t\t\t\t\t\tng-click=\"vm.ihm.preview.formlyFieldsViewExpanded =!vm.ihm.preview.formlyFieldsViewExpanded\">\n\t\t\t\t\t\t\t\t\t\t<h3 class=\"panel-title\">\n\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary btn-xs\">\n\t\t\t\t\t\t\t\t\t\t\t\t<i\n\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"fa\"\n\t\t\t\t\t\t\t\t\t\t\t\t\tng-class=\"{'fa-angle-down':!vm.ihm.preview.formlyFieldsViewExpanded, 'fa-angle-up' : vm.ihm.preview.formlyFieldsViewExpanded}\"></i>\n\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t\t&nbsp;\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-eye\"></i>\n\t\t\t\t\t\t\t\t\t\t\t&nbsp;\n\t\t\t\t\t\t\t\t\t\t\tFIELDS MODEL (ready to save to database one)\n\t\t\t\t\t\t\t\t\t\t</h3>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\t\t\t\t\t\t\t\t\t\t<div uib-collapse=\"vm.ihm.preview.formlyFieldsViewExpanded\">\n\t\t\t\t\t\t\t\t\t\t\t<pre>\n\t\t\t\t\t\t\t\t\t\t\t\t{{vm.wfFormFieldsOnlyNeededProperties | json}}\n\t\t\t\t\t\t\t\t\t\t\t</pre>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\t\t\tclass=\"panel-heading heading-preview\"\n\t\t\t\t\t\t\t\t\t\tng-click=\"vm.ihm.preview.saveThisFormExpanded =!vm.ihm.preview.saveThisFormExpanded\">\n\t\t\t\t\t\t\t\t\t\t<h3 class=\"panel-title\">\n\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary btn-xs\" >\n\t\t\t\t\t\t\t\t\t\t\t\t<i\n\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"fa\"\n\t\t\t\t\t\t\t\t\t\t\t\t\tng-class=\"{'fa-angle-down':!vm.ihm.preview.saveThisFormExpanded, 'fa-angle-up' : vm.ihm.preview.saveThisFormExpanded}\"></i>\n\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t\t&nbsp;\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-camera-retro\"></i>\n\t\t\t\t\t\t\t\t\t\t\t&nbsp;\n\t\t\t\t\t\t\t\t\t\t\tSave this form\n\t\t\t\t\t\t\t\t\t\t</h3>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\t\t\t\t\t\t\t\t\t\t<div uib-collapse=\"vm.ihm.preview.saveThisFormExpanded\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfor=\"inputNameFormtext\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\" greyText control-label\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tName to this form :\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype=\"text\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"form-control\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid=\"inputNameFormtext\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder=\"Enter formName\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tng-model=\"vm.configuration.formName\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t<button\n\t\t\t\t\t\t\t\t\t\t\t\tclass=\"btn btn-primary btn-block btn-lg\"\n\t\t\t\t\t\t\t\t\t\t\t\tng-click=\"vm.saveThisForm()\">\n\t\t\t\t\t\t\t\t\t\t\t\tsave this form\n\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</uib-tab>\n\t\t\t\t\t\t</uib-tabset>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</section>\n\t\t\t<hr/>\n\t\t\t<section>\n        <h6 class=\"text-right\">\n          Easy form generator : {{vm.easyFormGeneratorVERSION}} — Erwan DATIN (MacKentoch)\n        </h6>\n\t\t\t</section>\n    </div>\n  </div>\n</section>\n"

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _edaDragDropWayTrustThis = __webpack_require__(85);
	
	var _edaDragDropWayTrustThis2 = _interopRequireDefault(_edaDragDropWayTrustThis);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var TRUST_THIS_FILTER_MODULE = 'edaDragDropWay.trustThis.filter';
	
	exports.default = angular.module(TRUST_THIS_FILTER_MODULE, []).filter(_edaDragDropWayTrustThis.TRUST_THIS_FILTER_NAME, _edaDragDropWayTrustThis2.default);

/***/ },
/* 85 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var TRUST_THIS_FILTER_NAME = 'trustThis';
	
	function trustThis($sce) {
	  return function (value, type) {
	    return $sce.trustAs(type || 'html', value);
	  };
	}
	
	trustThis.$inject = ['$sce'];
	
	exports.default = trustThis;
	exports.TRUST_THIS_FILTER_NAME = TRUST_THIS_FILTER_NAME;

/***/ }
/******/ ]);
//# sourceMappingURL=eda.dragdropway.js.map