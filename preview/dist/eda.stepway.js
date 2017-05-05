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
	
	__webpack_require__(7);
	
	__webpack_require__(89);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	__webpack_require__(3);
	
	__webpack_require__(5);
	
	__webpack_require__(6);

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

	/**
	 * Easy to use Wizard library for Angular JS
	 * @version v0.10.0 - 2016-12-22 * @link https://github.com/mgonto/angular-wizard
	 * @author Martin Gontovnikas <martin@gon.to>
	 * @license MIT License, http://www.opensource.org/licenses/MIT
	 */
	angular.module('templates-angularwizard', ['step.html', 'wizard.html']);
	
	angular.module("step.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("step.html",
	    "<section ng-show=\"selected\" ng-class=\"{current: selected, done: completed}\" class=\"step\" ng-transclude>\n" +
	    "</section>");
	}]);
	
	angular.module("wizard.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("wizard.html",
	    "<div>\n" +
	    "    <div class=\"steps\" ng-if=\"indicatorsPosition === 'bottom'\" ng-transclude></div>\n" +
	    "    <ul class=\"steps-indicator steps-{{getEnabledSteps().length}}\" ng-if=\"!hideIndicators\">\n" +
	    "      <li ng-class=\"{default: !step.completed && !step.selected, current: step.selected && !step.completed, done: step.completed && !step.selected, editing: step.selected && step.completed}\" ng-repeat=\"step in getEnabledSteps()\">\n" +
	    "        <a ng-click=\"goTo(step)\">{{step.title || step.wzTitle}}</a>\n" +
	    "      </li>\n" +
	    "    </ul>\n" +
	    "    <div class=\"steps\" ng-if=\"indicatorsPosition === 'top'\" ng-transclude></div>\n" +
	    "</div>\n" +
	    "");
	}]);
	
	angular.module('mgo-angular-wizard', ['templates-angularwizard']);
	
	angular.module('mgo-angular-wizard').directive('wzStep', function() {
	    return {
	        restrict: 'EA',
	        replace: true,
	        transclude: true,
	        scope: {
	            wzTitle: '@',
	            canenter : '=',
	            canexit : '=',
	            disabled: '@?wzDisabled',
	            description: '@',
	            wzData: '=',
	            wzOrder: '@?'
	        },
	        require: '^wizard',
	        templateUrl: function(element, attributes) {
	          return attributes.template || "step.html";
	        },
	        link: function ($scope, $element, $attrs, wizard) {
	            $attrs.$observe('wzTitle', function (value) {
	                $scope.title = $scope.wzTitle;
	            });
	            $scope.title = $scope.wzTitle;
	            wizard.addStep($scope);
	            $scope.$on('$destroy', function(){
	                wizard.removeStep($scope);
	            });
	        }
	    };
	});
	
	//wizard directive
	angular.module('mgo-angular-wizard').directive('wizard', function() {
	    return {
	        restrict: 'EA',
	        replace: true,
	        transclude: true,
	        scope: {
	            currentStep: '=',
	            onFinish: '&',
	            hideIndicators: '=',
	            editMode: '=',
	            name: '@',
	            indicatorsPosition: '@?'
	        },
	        templateUrl: function(element, attributes) {
	            return attributes.template || "wizard.html";
	        },
	
	        //controller for wizard directive, treat this just like an angular controller
	        controller: ['$scope', '$element', '$log', 'WizardHandler', '$q', '$timeout', function ($scope, $element, $log, WizardHandler, $q, $timeout) {
	            //setting default step position if none declared.
	            if ($scope.indicatorsPosition == undefined) {
	                $scope.indicatorsPosition = 'bottom';
	            }
	            //this variable allows directive to load without having to pass any step validation
	            var firstRun = true;
	            //creating instance of wizard, passing this as second argument allows access to functions attached to this via Service
	            WizardHandler.addWizard($scope.name || WizardHandler.defaultName, this);
	
	            $scope.$on('$destroy', function() {
	                WizardHandler.removeWizard($scope.name || WizardHandler.defaultName);
	            });
	
	            //steps array where all the scopes of each step are added
	            $scope.steps = [];
	
	            var stepIdx = function(step) {
	                var idx = 0;
	                var res = -1;
	                angular.forEach($scope.getEnabledSteps(), function(currStep) {
	                  if (currStep === step) {
	                    res = idx;
	                  }
	                  idx++;
	                });
	                return res;
	            };
	
	            var stepByTitle = function(titleToFind) {
	              var foundStep = null;
	              angular.forEach($scope.getEnabledSteps(), function(step) {
	                if (step.wzTitle === titleToFind) {
	                  foundStep = step;
	                }
	              });
	              return foundStep;
	            };
	
	            //access to context object for step validation
	            $scope.context = {};
	
	            //watching changes to currentStep
	            $scope.$watch('currentStep', function(step) {
	                //checking to make sure currentStep is truthy value
	                if (!step) return;
	                //setting stepTitle equal to current step title or default title
	                var stepTitle = $scope.selectedStep.wzTitle;
	                if ($scope.selectedStep && stepTitle !== $scope.currentStep) {
	                    //invoking goTo() with step title as argument
	                    $scope.goTo(stepByTitle($scope.currentStep));
	                }
	            });
	
	            //watching steps array length and editMode value, if edit module is undefined or null the nothing is done
	            //if edit mode is truthy, then all steps are marked as completed
	            $scope.$watch('[editMode, steps.length]', function() {
	                var editMode = $scope.editMode;
	                if (angular.isUndefined(editMode) || (editMode === null)) return;
	
	                //Set completed for all steps to the value of editMode
	                angular.forEach($scope.steps, function (step) {
	                    step.completed = editMode;
	                });
	
	                //If editMode is false, set ONLY ENABLED steps with index lower then completedIndex to completed
	                if (!editMode) {
	                   var completedStepsIndex = $scope.currentStepNumber() - 1;
	                    angular.forEach($scope.getEnabledSteps(), function(step, stepIndex) {
	                        if(stepIndex < completedStepsIndex) {
	                            step.completed = true;
	                        }
	                    });
	                }
	            }, true);
	
	            //called each time step directive is loaded
	            this.addStep = function(step) {
	                var wzOrder = (step.wzOrder >= 0 && !$scope.steps[step.wzOrder]) ? step.wzOrder : $scope.steps.length;
	                //adding the scope of directive onto step array
	                $scope.steps[wzOrder] = step;
	                //if this step is the new first then goTo it
	                if ($scope.getEnabledSteps()[0] === step) {
	                    //goTo first step
	                    $scope.goTo($scope.getEnabledSteps()[0]);
	                }
	            };
	            
	            //called each time step directive is destroyed
	            this.removeStep = function (step) {
	                var index = $scope.steps.indexOf(step);
	                if (index > 0) {
	                    $scope.steps.splice(index, 1);
	                }
	            };
	
	            this.context = $scope.context;
	
	            $scope.getStepNumber = function(step) {
	                return stepIdx(step) + 1;
	            };
	
	            $scope.goTo = function(step) {
	                //if this is the first time the wizard is loading it bi-passes step validation
	                if(firstRun){
	                    //deselect all steps so you can set fresh below
	                    unselectAll();
	                    $scope.selectedStep = step;
	                    //making sure current step is not undefined
	                    if (!angular.isUndefined($scope.currentStep)) {
	                        $scope.currentStep = step.wzTitle;
	                    }
	                    //setting selected step to argument passed into goTo()
	                    step.selected = true;
	                    //emit event upwards with data on goTo() invoktion
	                    $scope.$emit('wizard:stepChanged', {step: step, index: stepIdx(step)});
	                    //setting variable to false so all other step changes must pass validation
	                    firstRun = false;
	                } else {
	                    //createing variables to capture current state that goTo() was invoked from and allow booleans
	                    var thisStep;
	                    //getting data for step you are transitioning out of
	                    if($scope.currentStepNumber() > 0){
	                        thisStep = $scope.currentStepNumber() - 1;
	                    } else if ($scope.currentStepNumber() === 0){
	                        thisStep = 0;
	                    }
	                    //$log.log('steps[thisStep] Data: ', $scope.getEnabledSteps()[thisStep].canexit);
	                    $q.all([canExitStep($scope.getEnabledSteps()[thisStep], step), canEnterStep(step)]).then(function(data) {
	                        if(data[0] && data[1]){
	                            //deselect all steps so you can set fresh below
	                            unselectAll();
	
	                            //$log.log('value for canExit argument: ', $scope.currentStep.canexit);
	                            $scope.selectedStep = step;
	                            //making sure current step is not undefined
	                            if(!angular.isUndefined($scope.currentStep)){
	                                $scope.currentStep = step.wzTitle;
	                            }
	                            //setting selected step to argument passed into goTo()
	                            step.selected = true;
	                            //emit event upwards with data on goTo() invoktion
	                            $scope.$emit('wizard:stepChanged', {step: step, index: stepIdx(step)});
	                            //$log.log('current step number: ', $scope.currentStepNumber());
	                        }
	                    });
	                }
	            };
	
	            function canEnterStep(step) {
	                var defer,
	                    canEnter;
	                //If no validation function is provided, allow the user to enter the step
	                if(step.canenter === undefined){
	                    return true;
	                }
	                //If canenter is a boolean value instead of a function, return the value
	                if(typeof step.canenter === 'boolean'){
	                    return step.canenter;
	                }
	                //Check to see if the canenter function is a promise which needs to be returned
	                canEnter = step.canenter($scope.context);
	                if(angular.isFunction(canEnter.then)){
	                    defer = $q.defer();
	                    canEnter.then(function(response){
	                        defer.resolve(response);
	                    });
	                    return defer.promise;
	                } else {
	                    return canEnter === true;
	                }
	            }
	
	            function canExitStep(step, stepTo) {
	                var defer,
	                    canExit;
	                //Exiting the step should be allowed if no validation function was provided or if the user is moving backwards
	                if(typeof(step.canexit) === 'undefined' || $scope.getStepNumber(stepTo) < $scope.currentStepNumber()){
	                    return true;
	                }
	                //If canexit is a boolean value instead of a function, return the value
	                if(typeof step.canexit === 'boolean'){
	                    return step.canexit;
	                }
	                //Check to see if the canexit function is a promise which needs to be returned
	                canExit = step.canexit($scope.context);
	                if(angular.isFunction(canExit.then)){
	                    defer = $q.defer();
	                    canExit.then(function(response){
	                        defer.resolve(response);
	                    });
	                    return defer.promise;
	                } else {
	                    return canExit === true;
	                }
	            }
	
	            $scope.currentStepNumber = function() {
	                //retreive current step number
	                return stepIdx($scope.selectedStep) + 1;
	            };
	
	            $scope.getEnabledSteps = function() {
	                return $scope.steps.filter(function(step){
	                    return step && step.disabled !== 'true';
	                });
	            };
	
	            //unSelect All Steps
	            function unselectAll() {
	                //traverse steps array and set each "selected" property to false
	                angular.forEach($scope.getEnabledSteps(), function (step) {
	                    step.selected = false;
	                });
	                //set selectedStep variable to null
	                $scope.selectedStep = null;
	            }
	
	            //ALL METHODS ATTACHED TO this ARE ACCESSIBLE VIA WizardHandler.wizard().methodName()
	
	            this.currentStepTitle = function(){
	                return $scope.selectedStep.wzTitle;
	            };
	
	            this.currentStepDescription = function(){
	                return $scope.selectedStep.description;
	            };
	
	            this.currentStep = function(){
	                return $scope.selectedStep;
	            };
	
	            this.totalStepCount = function() {
	                return $scope.getEnabledSteps().length;
	            };
	
	            //Access to enabled steps from outside
	            this.getEnabledSteps = function(){
	                return $scope.getEnabledSteps();
	            };
	
	            //Access to current step number from outside
	            this.currentStepNumber = function(){
	                return $scope.currentStepNumber();
	            };
	            //method used for next button within step
	            this.next = function(callback) {
	                var enabledSteps = $scope.getEnabledSteps();
	                //setting variable equal to step  you were on when next() was invoked
	                var index = stepIdx($scope.selectedStep);
	                //checking to see if callback is a function
	                if(angular.isFunction(callback)){
	                   if(callback()){
	                        if (index === enabledSteps.length - 1) {
	                            this.finish();
	                        } else {
	                            //invoking goTo() with step number next in line
	                            $scope.goTo(enabledSteps[index + 1]);
	                        }
	                   } else {
	                        return;
	                   }
	                }
	                if (!callback) {
	                    //completed property set on scope which is used to add class/remove class from progress bar
	                    $scope.selectedStep.completed = true;
	                }
	                //checking to see if this is the last step.  If it is next behaves the same as finish()
	                if (index === enabledSteps.length - 1) {
	                    this.finish();
	                } else {
	                    //invoking goTo() with step number next in line
	                    $scope.goTo(enabledSteps[index + 1]);
	                }
	
	            };
	
	            //used to traverse to any step, step number placed as argument
	            this.goTo = function(step) {
	                //wrapped inside $timeout so newly enabled steps are included.
	                $timeout(function() {
	                    var enabledSteps = $scope.getEnabledSteps();
	                    var stepTo;
	                    //checking that step is a Number
	                    if (angular.isNumber(step)) {
	                        stepTo = enabledSteps[step];
	                    } else {
	                        //finding the step associated with the title entered as goTo argument
	                        stepTo = stepByTitle(step);
	                    }
	                    //going to step
	                    $scope.goTo(stepTo);
	                });
	            };
	
	            //calls finish() which calls onFinish() which is declared on an attribute and linked to controller via wizard directive.
	            this.finish = function() {
	                if ($scope.onFinish) {
	                    $scope.onFinish();
	                }
	            };
	            
	            this.previous = function() {
	                //getting index of current step
	                var index = stepIdx($scope.selectedStep);
	                //ensuring you aren't trying to go back from the first step
	                if (index === 0) {
	                    throw new Error("Can't go back. It's already in step 0");
	                } else {
	                    //go back one step from current step
	                    $scope.goTo($scope.getEnabledSteps()[index - 1]);
	                }
	            };
	
	            //cancel is alias for previous.
	            this.cancel = function() {
	                //getting index of current step
	                var index = stepIdx($scope.selectedStep);
	                //ensuring you aren't trying to go back from the first step
	                if (index === 0) {
	                    throw new Error("Can't go back. It's already in step 0");
	                } else {
	                    //go back one step from current step
	                    $scope.goTo($scope.getEnabledSteps()[0]);
	                }
	            };
	
	            //reset
	            this.reset = function(){
	                //traverse steps array and set each "completed" property to false
	                angular.forEach($scope.getEnabledSteps(), function (step) {
	                    step.completed = false;
	                });
	                //go to first step
	                this.goTo(0);
	            };
	        }]
	    };
	});
	function wizardButtonDirective(action) {
	    angular.module('mgo-angular-wizard')
	        .directive(action, function() {
	            return {
	                restrict: 'A',
	                replace: false,
	                require: '^wizard',
	                link: function($scope, $element, $attrs, wizard) {
	
	                    $element.on("click", function(e) {
	                        e.preventDefault();
	                        $scope.$apply(function() {
	                            $scope.$eval($attrs[action]);
	                            wizard[action.replace("wz", "").toLowerCase()]();
	                        });
	                    });
	                }
	            };
	        });
	}
	
	wizardButtonDirective('wzNext');
	wizardButtonDirective('wzPrevious');
	wizardButtonDirective('wzFinish');
	wizardButtonDirective('wzCancel');
	wizardButtonDirective('wzReset');
	
	angular.module('mgo-angular-wizard').factory('WizardHandler', function() {
	   var service = {};
	   
	   var wizards = {};
	   
	   service.defaultName = "defaultWizard";
	   
	   service.addWizard = function(name, wizard) {
	       wizards[name] = wizard;
	   };
	   
	   service.removeWizard = function(name) {
	       delete wizards[name];
	   };
	   
	   service.wizard = function(name) {
	       var nameToUse = name;
	       if (!name) {
	           nameToUse = service.defaultName;
	       }
	       
	       return wizards[nameToUse];
	   };
	   
	   return service;
	});


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _easyFormGenerator = __webpack_require__(8);
	
	var _easyFormGenerator2 = _interopRequireDefault(_easyFormGenerator);
	
	var _formly = __webpack_require__(10);
	
	var _formly2 = _interopRequireDefault(_formly);
	
	var _translate = __webpack_require__(12);
	
	var _translate2 = _interopRequireDefault(_translate);
	
	var _core = __webpack_require__(20);
	
	var _core2 = _interopRequireDefault(_core);
	
	var _main = __webpack_require__(21);
	
	var _main2 = _interopRequireDefault(_main);
	
	var _stepwayWizard = __webpack_require__(42);
	
	var _stepwayWizard2 = _interopRequireDefault(_stepwayWizard);
	
	var _editControlModal = __webpack_require__(52);
	
	var _editControlModal2 = _interopRequireDefault(_editControlModal);
	
	var _modalProxy = __webpack_require__(84);
	
	var _modalProxy2 = _interopRequireDefault(_modalProxy);
	
	var _formlyProxy = __webpack_require__(86);
	
	var _formlyProxy2 = _interopRequireDefault(_formlyProxy);
	
	var _selectOptionManage = __webpack_require__(88);
	
	var _selectOptionManage2 = _interopRequireDefault(_selectOptionManage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var STEP_WAY_MODULE_NAME = 'eda.easyformGen.stepway';
	var STEP_WAY_MODULES_INJECT = [_core2.default.name, _translate2.default.name, _main2.default.name, _stepwayWizard2.default.name, _editControlModal2.default.name, _modalProxy2.default.name, _formlyProxy2.default.name, _selectOptionManage2.default.name];
	
	var mainModule = angular.module(STEP_WAY_MODULE_NAME, STEP_WAY_MODULES_INJECT).value(_easyFormGenerator.EASY_FORM_VERSION_NAME, _easyFormGenerator.EASY_FORM_VERSION_VALUE).config(_formly2.default).config(_easyFormGenerator2.default);
	
	exports.default = mainModule;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EASY_FORM_VERSION_VALUE = exports.EASY_FORM_VERSION_NAME = undefined;
	
	var _package = __webpack_require__(9);
	
	var _package2 = _interopRequireDefault(_package);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var EASY_FORM_VERSION_NAME = 'easyFormGenVersion';
	var EASY_FORM_VERSION_VALUE = _package2.default.version;
	var ACTIVE_MODAL_ANIMATION = true;
	
	function easyFromConfig(easyFormSteWayConfigProvider) {
	  //enable/disable easy form modal animation
	  easyFormSteWayConfigProvider.setModalAnimation(ACTIVE_MODAL_ANIMATION);
	}
	
	easyFromConfig.$inject = ['easyFormSteWayConfigProvider'];
	
	exports.default = easyFromConfig;
	exports.EASY_FORM_VERSION_NAME = EASY_FORM_VERSION_NAME;
	exports.EASY_FORM_VERSION_VALUE = EASY_FORM_VERSION_VALUE;

/***/ },
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _formlyConfig = __webpack_require__(11);
	
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
/* 11 */
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TRANSLATE_MODULE = exports.TRANSLATE_CONFIG = undefined;
	
	var _localEn = __webpack_require__(13);
	
	var _localEn2 = _interopRequireDefault(_localEn);
	
	var _localFr = __webpack_require__(14);
	
	var _localFr2 = _interopRequireDefault(_localFr);
	
	var _localEs = __webpack_require__(15);
	
	var _localEs2 = _interopRequireDefault(_localEs);
	
	var _localDe = __webpack_require__(16);
	
	var _localDe2 = _interopRequireDefault(_localDe);
	
	var _localTr = __webpack_require__(17);
	
	var _localTr2 = _interopRequireDefault(_localTr);
	
	var _localJp = __webpack_require__(18);
	
	var _localJp2 = _interopRequireDefault(_localJp);
	
	var _localPtBr = __webpack_require__(19);
	
	var _localPtBr2 = _interopRequireDefault(_localPtBr);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var TRANSLATE_CONFIG = exports.TRANSLATE_CONFIG = 'easyFormTranslateConfig';
	
	function translateConfig($translateProvider) {
	  $translateProvider.translations('en', _localEn2.default);
	  $translateProvider.translations('fr', _localFr2.default);
	  $translateProvider.translations('es', _localEs2.default);
	  $translateProvider.translations('de', _localDe2.default);
	  $translateProvider.translations('tr', _localTr2.default);
	  $translateProvider.translations('jp', _localJp2.default);
	  $translateProvider.translations('pt-br', _localPtBr2.default);
	}
	translateConfig.$inject = ['$translateProvider'];
	
	var TRANSLATE_MODULE = exports.TRANSLATE_MODULE = 'eda.easyFormGenerator.translate';
	exports.default = angular.module(TRANSLATE_MODULE, []).config(translateConfig);

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = {
		"SAY_HI": "Hello",
		"EDIT_TAB": "Edit/Create",
		"PREVIEW_TAB": "Preview",
		"WIZARD_LINES": "Lines",
		"WIZARD_LAYOUT": "Layout",
		"WIZARD_CONTROLS": "Controls",
		"WIZARD_SAVE": "Save",
		"PAGER_PREVIOUS": "Previous",
		"PAGER_NEXT": "Next",
		"COMMAND_PANEL": "Command",
		"VISUAL_PANEL": "Visual",
		"ADD_NEW_LINE": "Add a new line",
		"ADD_NEW_STEP": "Add a new step",
		"STEP_TITLE": "Step Title",
		"SELECTED_LINE": "Selected line",
		"NUMBER_OF_COLUMN": "Number of columns",
		"APPLY_CTRL2COL": "Apply controls to columns",
		"CLIC_TAP_2_OPEN": "Click/Tap on column to open control selection",
		"SELECT_2_APPLY_COL": "Select desired control and valid to apply it to column",
		"CUSTOM_SUBMIT_BTN": "Customize Submit button Text",
		"CUSTOM_CANCEL_BTN": "Customize Cancel button Text",
		"NAME_THIS_FORM": "Name this Form",
		"SAVE_THIS_FORM": "Save this Form",
		"FINAL_STEP": "Final Step: Form Preview",
		"DATA_MODEL": "DATA MODEL",
		"FIELDS_MODEL": "FIELDS MODEL (Ready to save to database one)",
		"SELECT_A_CTRL": "Select a control",
		"SELECT_CTRL_IN_LIST": "Select a control in the list below",
		"COL_WILL_BE_BLANK": "Column will be blank",
		"EDIT_PROPERTIES": "Edit properties",
		"HEADER_TEXT": "Header text",
		"ADD_EDIT_HEADER_HERE": "Add/Edit header text here",
		"SUBTITLE_TEXT": "Subtitle text",
		"ADD_EDIT_SUBTIL_HERE": "Add/Edit subtitle text here",
		"LABEL_TEXT": "Label text",
		"ADD_EDIT_LABEL_HERE": "Add/Edit control label here",
		"PLACEHOLDER": "Placeholder",
		"ADD_EDIT_PLACEHOLD": "Add/Edit placeholder text here",
		"REQUIRED": "Required",
		"DESCRIPTION": "Description",
		"ADDEDIT_DESCRIPTION": "Add/Edit description here",
		"DEFAULTVALUE": "Default Value",
		"ADD_EDIT_DEFAULTVALUE_PLACEHOLD": "Add/Edit default value here",
		"DATE_FORMAT": "Date format",
		"ADD_NEW_RADIO": "Add new radio",
		"ADD_RADIO_PLACEHOLD": "Add new radio",
		"EDIT_REMOVE_RADIO": "Edit/Remove radio",
		"NO_RADIO_ADD_NEW": "No radio: Add new radio values",
		"SEARCH_4_OPTION": "Search for option",
		"ADD": "Add",
		"ORDER": "Order",
		"OPTION": "Option",
		"GROUP": "Group",
		"ADD_NEW_OPTIONS": "Add new options",
		"ADD_A_NEW_OPTION": "Add new option",
		"EDIT_REMOVE_OPTIONS": "Edit/Remove options",
		"NO_OPTION_ADD_NEW": "No option: Add new options",
		"ADD_NEW_GROUPS": "Add new groups",
		"ADD_A_NEW_GROUP": "Add new group",
		"EDIT_GROUPS_OPTIONS": "Edit/Remove options/groups",
		"NO_GROUP_ADD_NEW": "Add new groups",
		"OK": "OK",
		"CANCEL": "Cancel"
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = {
		"SAY_HI": "Bonjour",
		"EDIT_TAB": "Edition / Creation",
		"PREVIEW_TAB": "Aperçu",
		"WIZARD_LINES": "lignes",
		"WIZARD_LAYOUT": "disposition",
		"WIZARD_CONTROLS": "contrôles",
		"WIZARD_SAVE": "sauvegarder",
		"PAGER_PREVIOUS": "Précédent",
		"PAGER_NEXT": "Suivant",
		"COMMAND_PANEL": "Commandes",
		"VISUAL_PANEL": "Visuel",
		"ADD_NEW_LINE": "Ajouter une nouvelle ligne",
		"SELECTED_LINE": "Ligne sélectionnée",
		"NUMBER_OF_COLUMN": "nombre de colonnes",
		"APPLY_CTRL2COL": "Appliquer les contrôles aux colonnes",
		"CLIC_TAP_2_OPEN": "Cliquer sur une colonne pour ouvrir le menu d'édition",
		"SELECT_2_APPLY_COL": "Sélectionner un contrôle puis valider pour l'appliquer à la colonne",
		"CUSTOM_SUBMIT_BTN": "Personnaliser le texte du bouton envoie",
		"CUSTOM_CANCEL_BTN": "Personnaliser le texte du bouton annuler",
		"NAME_THIS_FORM": "Nommer le formulaire",
		"SAVE_THIS_FORM": "sauvegarder le formulaire",
		"FINAL_STEP": "Dernière étape : aperçu du formulaire",
		"DATA_MODEL": "MODELE DE DONNEES",
		"FIELDS_MODEL": "MODELE DES CHAMPS (modèle compatible base de données)",
		"SELECT_A_CTRL": "Sélectionner un contrôle",
		"SELECT_CTRL_IN_LIST": "Sélectionner un contrôle dans la liste ci-dessous",
		"COL_WILL_BE_BLANK": "La colonne sera vide",
		"EDIT_PROPERTIES": "Editer les propriétés",
		"HEADER_TEXT": "Texte du titre principal",
		"ADD_EDIT_HEADER_HERE": "Editer le textes du titre principal",
		"SUBTITLE_TEXT": "Texte du sous-titre",
		"ADD_EDIT_SUBTIL_HERE": "Editer le textes du sous-titre",
		"LABEL_TEXT": "Texte de l'étiquette",
		"ADD_EDIT_LABEL_HERE": "Editer le texte de l'étiquette",
		"PLACEHOLDER": "placeholder",
		"ADD_EDIT_PLACEHOLD": "Editer le placeholder",
		"REQUIRED": "Requis",
		"DESCRIPTION": "Description",
		"ADDEDIT_DESCRIPTION": "Ajouter / editer la description",
		"DEFAULTVALUE": "Valeur par défaut",
		"ADD_EDIT_DEFAULTVALUE_PLACEHOLD": "Ajouter / modifier la valeur par défaut ici",
		"DATE_FORMAT": "Format de la date",
		"ADD_NEW_RADIO": "Ajouter un nouveau choix à cocher",
		"ADD_RADIO_PLACEHOLD": "Ajouter un nouveau choix à cocher",
		"EDIT_REMOVE_RADIO": "Editer / supprimer un choix à cocher",
		"NO_RADIO_ADD_NEW": "aucun choix à cocher : en ajouter un",
		"SEARCH_4_OPTION": "rechercher une option",
		"ADD": "ajouter",
		"ORDER": "ordre",
		"OPTION": "option",
		"GROUP": "groupe",
		"ADD_NEW_OPTIONS": "Ajouter de nouvelles options",
		"ADD_A_NEW_OPTION": "ajoutre une option",
		"EDIT_REMOVE_OPTIONS": "Editer / supprimer des options",
		"NO_OPTION_ADD_NEW": "aucune option : en ajouter",
		"ADD_NEW_GROUPS": "Ajouter de nouveaux groupes",
		"ADD_A_NEW_GROUP": "Ajouter un nouveau groupe",
		"EDIT_GROUPS_OPTIONS": "Editer / supprimer les groupes et options",
		"NO_GROUP_ADD_NEW": "ajouter de nouveaux groupes",
		"OK": "Valider",
		"CANCEL": "Annuler"
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = {
		"SAY_HI": "Hola",
		"EDIT_TAB": "Editar / Crear",
		"PREVIEW_TAB": "Previsualizar",
		"WIZARD_LINES": "lineas",
		"WIZARD_LAYOUT": "diseño",
		"WIZARD_CONTROLS": "controles",
		"WIZARD_SAVE": "guardar",
		"PAGER_PREVIOUS": "Anterior",
		"PAGER_NEXT": "Siguiente",
		"COMMAND_PANEL": "Comando",
		"VISUAL_PANEL": "Visual",
		"ADD_NEW_LINE": "Agregar nueva linea",
		"SELECTED_LINE": "Linea seleccionada",
		"NUMBER_OF_COLUMN": "numero de columnas",
		"APPLY_CTRL2COL": "Aplicar controles a columnas",
		"CLIC_TAP_2_OPEN": "Click / Toque en la columna para seleccionar controles",
		"SELECT_2_APPLY_COL": "Selecciona el control deseado para aplicarlo a la columna",
		"CUSTOM_SUBMIT_BTN": "Personalizar texto de boton Enviar",
		"CUSTOM_CANCEL_BTN": "Personalizar texto de boton Cancelar",
		"NAME_THIS_FORM": "Nombrar formulario",
		"SAVE_THIS_FORM": "guardar formulario",
		"FINAL_STEP": "Ultimo paso : previsualizar formulario",
		"DATA_MODEL": "MODELO DE DATOS",
		"FIELDS_MODEL": "MODELO DE CAMPOS (listo para guardar en base de datos uno)",
		"SELECT_A_CTRL": "Selecciona un control",
		"SELECT_CTRL_IN_LIST": "Selecciona un control de la lista",
		"COL_WILL_BE_BLANK": "Columna sera vacia",
		"EDIT_PROPERTIES": "Editar propiedades",
		"HEADER_TEXT": "Texto de encabezado",
		"ADD_EDIT_HEADER_HERE": "Agregar / editar texto de encabezado aqui",
		"SUBTITLE_TEXT": "Texto de subtitulo",
		"ADD_EDIT_SUBTIL_HERE": "Agregar / editar texto de subtitulo aqui",
		"LABEL_TEXT": "Texto de etiqueta",
		"ADD_EDIT_LABEL_HERE": "Agregar / editar texto de etiqueta aqui",
		"PLACEHOLDER": "Marcador",
		"ADD_EDIT_PLACEHOLD": "Agregar / editar texto de marcador aqui",
		"REQUIRED": "Requerido",
		"DESCRIPTION": "Descripcion",
		"ADDEDIT_DESCRIPTION": "Agregar / editar descripcion aqui",
		"DEFAULTVALUE": "Valor por defecto",
		"ADD_EDIT_DEFAULTVALUE_PLACEHOLD": "Añadir / editar valor predeterminado aquí",
		"DATE_FORMAT": "Formato de fecha",
		"ADD_NEW_RADIO": "Agregar nuevo radio",
		"ADD_RADIO_PLACEHOLD": "agregar nuevo radio",
		"EDIT_REMOVE_RADIO": "Editar/Eliminar radio",
		"NO_RADIO_ADD_NEW": "sin radio : agregar nuevos valores de radio",
		"SEARCH_4_OPTION": "buscar opcion",
		"ADD": "agregar",
		"ORDER": "orden",
		"OPTION": "opcion",
		"GROUP": "grupo",
		"ADD_NEW_OPTIONS": "agregar nuevas opciones",
		"ADD_A_NEW_OPTION": "agregar nueva opcione",
		"EDIT_REMOVE_OPTIONS": "Editar/Eliminar opciones",
		"NO_OPTION_ADD_NEW": "sin opcion : agregar nuevas opciones",
		"ADD_NEW_GROUPS": "Agregar nuevos grupos",
		"ADD_A_NEW_GROUP": "Agregar nuevo grupo",
		"EDIT_GROUPS_OPTIONS": "Editar/Eliminar opciones/grupos",
		"NO_GROUP_ADD_NEW": "agregar nuevos grupos",
		"OK": "OK",
		"CANCEL": "Cancelar"
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = {
		"SAY_HI": "Hallo",
		"EDIT_TAB": "Bearbeiten / Schaffen",
		"PREVIEW_TAB": "Vorschau",
		"WIZARD_LINES": "Linien",
		"WIZARD_LAYOUT": "Layout",
		"WIZARD_CONTROLS": "Steuerung",
		"WIZARD_SAVE": "sparen",
		"PAGER_PREVIOUS": "vorher.",
		"PAGER_NEXT": "nächste",
		"COMMAND_PANEL": "Anweisung",
		"VISUAL_PANEL": "visuell",
		"ADD_NEW_LINE": "Hinzufügen neuer Leitung",
		"SELECTED_LINE": "ausgewählte Linie",
		"NUMBER_OF_COLUMN": "Anzahl von Spalten",
		"APPLY_CTRL2COL": "gelten diese Steuer Spalte",
		"CLIC_TAP_2_OPEN": "klicken Sie auf Spalte zur Steuerungsauswahl öffnen",
		"SELECT_2_APPLY_COL": "Wählen Sie die gewünschte Steuerung und gültig , um es in Spalte anwenden",
		"CUSTOM_SUBMIT_BTN": "Passen Submit-Button Text",
		"CUSTOM_CANCEL_BTN": "Passen Cancel-Button Text",
		"NAME_THIS_FORM": "Nennen dieses Formular",
		"SAVE_THIS_FORM": "Speichern dieses Formular",
		"FINAL_STEP": "Endschritt : Formular Vorschau",
		"DATA_MODEL": "DATEN MODELL",
		"FIELDS_MODEL": "FELDER MODELL (Datenbank-kompatibel)",
		"SELECT_A_CTRL": "Wählen Sie ein Steuer",
		"SELECT_CTRL_IN_LIST": "Wählen Sie ein Steuer aus der Liste unten",
		"COL_WILL_BE_BLANK": "die Spalte werde leer sein",
		"EDIT_PROPERTIES": "Anzeigen",
		"HEADER_TEXT": "Kopftext",
		"ADD_EDIT_HEADER_HERE": "Kopftext ändern",
		"SUBTITLE_TEXT": "Untertitel",
		"ADD_EDIT_SUBTIL_HERE": "Untertitel ändern",
		"LABEL_TEXT": "Etikett",
		"ADD_EDIT_LABEL_HERE": "Etikett ändern",
		"PLACEHOLDER": "placeholder",
		"ADD_EDIT_PLACEHOLD": "placeholder ändern",
		"REQUIRED": "erforderlich",
		"DESCRIPTION": "Beschreibung",
		"ADDEDIT_DESCRIPTION": "Beschreibung ändern",
		"DEFAULTVALUE": "Standardwert",
		"ADD_EDIT_DEFAULTVALUE_PLACEHOLD": "Hier können Sie den Standardwert hinzufügen / bearbeiten",
		"DATE_FORMAT": "Datumsformat",
		"ADD_NEW_RADIO": "Radiobutton hinzufügen",
		"ADD_RADIO_PLACEHOLD": "Radiobutton hinzufügen",
		"EDIT_REMOVE_RADIO": "Radiobutton ändern",
		"NO_RADIO_ADD_NEW": "kein Radiobutton : Radiobutton hinzufügen",
		"SEARCH_4_OPTION": "option suchen",
		"ADD": "hinzufügen",
		"ORDER": "bestellen",
		"OPTION": "Option",
		"GROUP": "Gruppe",
		"ADD_NEW_OPTIONS": "Optionen hinzufügen",
		"ADD_A_NEW_OPTION": "Option hinzufügen",
		"EDIT_REMOVE_OPTIONS": "Optionen ändern",
		"NO_OPTION_ADD_NEW": "kein option : Option hinzufügen",
		"ADD_NEW_GROUPS": "Gruppen hinzufügen",
		"ADD_A_NEW_GROUP": "Gruppe hinzufügen",
		"EDIT_GROUPS_OPTIONS": "Gruppen ändern",
		"NO_GROUP_ADD_NEW": "keine Gruppe : Gruppe hinzufügen",
		"OK": "bestätigen",
		"CANCEL": "stornieren"
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = {
		"SAY_HI": "Merhaba",
		"EDIT_TAB": "Düzenle / Oluştur",
		"PREVIEW_TAB": "Önizleme",
		"WIZARD_LINES": "satırlar",
		"WIZARD_LAYOUT": "düzen",
		"WIZARD_CONTROLS": "kontroller",
		"WIZARD_SAVE": "kaydet",
		"PAGER_PREVIOUS": "Geri",
		"PAGER_NEXT": "İleri",
		"COMMAND_PANEL": "Komut",
		"VISUAL_PANEL": "Görsel",
		"ADD_NEW_LINE": "Yeni satır ekle",
		"SELECTED_LINE": "Seçili satır",
		"NUMBER_OF_COLUMN": "sütun sayısı",
		"APPLY_CTRL2COL": "Sütunlara form ögesi ekle",
		"CLIC_TAP_2_OPEN": "Form ögesi eklemek için sütunlara tıkla",
		"SELECT_2_APPLY_COL": "İstediğin ögeyi seçtikten sonra gerekli yerleri doldur ve kaydet",
		"CUSTOM_SUBMIT_BTN": "Gönder butonu yazısını düzenle",
		"CUSTOM_CANCEL_BTN": "İptal butonu yazısını düzenle",
		"NAME_THIS_FORM": "Forma isim ver",
		"SAVE_THIS_FORM": "formu kaydet",
		"FINAL_STEP": "Son aşama : form önizlemesi",
		"DATA_MODEL": "VERİ MODELİ",
		"FIELDS_MODEL": "ALAN MODELİ (veritabanına kaydetmeye hazır)",
		"SELECT_A_CTRL": "Form ögesi seç",
		"SELECT_CTRL_IN_LIST": "Verilen listeden bir form ögesi seç",
		"COL_WILL_BE_BLANK": "Sütun boş kalacak",
		"EDIT_PROPERTIES": "Özellikleri düzenle",
		"HEADER_TEXT": "Başlık yazısı",
		"ADD_EDIT_HEADER_HERE": "Başlık yazısını ekle / düzenle",
		"SUBTITLE_TEXT": "Altyazı",
		"ADD_EDIT_SUBTIL_HERE": "Altyazı ekle / düzenle",
		"LABEL_TEXT": "Form ögesinin adı",
		"ADD_EDIT_LABEL_HERE": "Ad ekle / düzenle",
		"PLACEHOLDER": "Form ögesinin içine geçici yazı ekle",
		"ADD_EDIT_PLACEHOLD": "Geçici yazı ekle / düzenle",
		"REQUIRED": "Gerekli",
		"DESCRIPTION": "Açıklama",
		"ADDEDIT_DESCRIPTION": "Açıklama ekle / düzenle",
		"DEFAULTVALUE": "Varsayılan değer",
		"ADD_EDIT_DEFAULTVALUE_PLACEHOLD": "Varsayılan değeri buraya ekleyin / düzenle",
		"DATE_FORMAT": "Tarih formatı",
		"ADD_NEW_RADIO": "Radio butonu ekle",
		"ADD_RADIO_PLACEHOLD": "radio butonu ekle",
		"EDIT_REMOVE_RADIO": "Radio butonunu ekle / düzenle",
		"NO_RADIO_ADD_NEW": "radio butonu yok : yeni buton ekle",
		"SEARCH_4_OPTION": "seçenek ara",
		"ADD": "ekle",
		"ORDER": "sıra",
		"OPTION": "seçenek",
		"GROUP": "grup",
		"ADD_NEW_OPTIONS": "Yeni seçenek ekle",
		"ADD_A_NEW_OPTION": "yeni seçenek ekle",
		"EDIT_REMOVE_OPTIONS": "Seçenekleri düzenle/sil",
		"NO_OPTION_ADD_NEW": "seçenek yok : yeni seçenek ekle",
		"ADD_NEW_GROUPS": "Yeni grup ekle",
		"ADD_A_NEW_GROUP": "Yeni grup ekle",
		"EDIT_GROUPS_OPTIONS": "Seçenek/Grup Ekle/sil",
		"NO_GROUP_ADD_NEW": "yeni grup ekle",
		"OK": "TAMAM",
		"CANCEL": "İptal"
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = {
		"SAY_HI": "こんにちわ",
		"EDIT_TAB": "編集 / 作成",
		"PREVIEW_TAB": "プレビュー",
		"WIZARD_LINES": "ライン",
		"WIZARD_LAYOUT": "レイアウト",
		"WIZARD_CONTROLS": "コントロール",
		"WIZARD_SAVE": "サーブ",
		"PAGER_PREVIOUS": "前",
		"PAGER_NEXT": "次",
		"COMMAND_PANEL": "コマンド",
		"VISUAL_PANEL": "ビジュアル",
		"ADD_NEW_LINE": "新しいライン追加",
		"SELECTED_LINE": "選択されたライン",
		"NUMBER_OF_COLUMN": "カラムの数",
		"APPLY_CTRL2COL": "カラムにコントロール適用",
		"CLIC_TAP_2_OPEN": "コントロール選択を広げるには列をクリック",
		"SELECT_2_APPLY_COL": "好きなコントロールを選び適用",
		"CUSTOM_SUBMIT_BTN": "適用ボタンの文字変更する場合",
		"CUSTOM_CANCEL_BTN": "キャンセルボタンの文字変更する場合",
		"NAME_THIS_FORM": "形式に名前を付ける",
		"SAVE_THIS_FORM": "形式をサーブ",
		"FINAL_STEP": "ファイナルステップ : プレビュー形式",
		"DATA_MODEL": "データーモデル",
		"FIELDS_MODEL": "モデルフィールド",
		"SELECT_A_CTRL": "コントロールを選び選択",
		"SELECT_CTRL_IN_LIST": "以下のリストからコントロールを選び選択",
		"COL_WILL_BE_BLANK": "空になる列",
		"EDIT_PROPERTIES": "プロパティの変更",
		"HEADER_TEXT": "ヘッダーテキスト",
		"ADD_EDIT_HEADER_HERE": "ヘッダーテキスト文字変更",
		"SUBTITLE_TEXT": "サブタイトル　テキスト",
		"ADD_EDIT_SUBTIL_HERE": "サブタイトルテキスト文字変更",
		"LABEL_TEXT": "ラベルテキスト",
		"ADD_EDIT_LABEL_HERE": "ラベルテキスト文字変更",
		"PLACEHOLDER": "プレースホルダー",
		"ADD_EDIT_PLACEHOLD": "プレースホルダー文字変更",
		"REQUIRED": "必須",
		"DESCRIPTION": "説明",
		"ADDEDIT_DESCRIPTION": "説明の変更",
		"DEFAULTVALUE": "デフォルト値",
		"ADD_EDIT_DEFAULTVALUE_PLACEHOLD": "ここにデフォルト値を追加/編集する",
		"DATE_FORMAT": "日付の形式",
		"ADD_NEW_RADIO": "新ラジオボタンを追加",
		"ADD_RADIO_PLACEHOLD": "新ラジオボタンを追加",
		"EDIT_REMOVE_RADIO": "ラジオボタン変更",
		"NO_RADIO_ADD_NEW": "ラジオ無し : 新ラジオボタン追加",
		"SEARCH_4_OPTION": "オプション検索",
		"ADD": "追加",
		"ORDER": "順番",
		"OPTION": "オプション",
		"GROUP": "グループ",
		"ADD_NEW_OPTIONS": "新しいオプション追加",
		"ADD_A_NEW_OPTION": "新しいオプション追加",
		"EDIT_REMOVE_OPTIONS": "オプションの変更",
		"NO_OPTION_ADD_NEW": "オプション無し : 新しいオプション追加",
		"ADD_NEW_GROUPS": "新しいグループ追加",
		"ADD_A_NEW_GROUP": "新しいグループ追加",
		"EDIT_GROUPS_OPTIONS": "グループを変更",
		"NO_GROUP_ADD_NEW": "グループを追加",
		"OK": "オッケー",
		"CANCEL": "キャンセル"
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = {
		"SAY_HI": "Olá",
		"EDIT_TAB": "Editar / Criar",
		"PREVIEW_TAB": "Pré-visualizar",
		"WIZARD_LINES": "linhas",
		"WIZARD_LAYOUT": "layout",
		"WIZARD_CONTROLS": "controles",
		"WIZARD_SAVE": "salvar",
		"PAGER_PREVIOUS": "Anterior",
		"PAGER_NEXT": "Próximo",
		"COMMAND_PANEL": "Comando",
		"VISUAL_PANEL": "Visual",
		"ADD_NEW_LINE": "Adicionar uma nova linha",
		"SELECTED_LINE": "Linha selecionada",
		"NUMBER_OF_COLUMN": "número de colunas",
		"APPLY_CTRL2COL": "Aplicar controles às colunas",
		"CLIC_TAP_2_OPEN": "Click / Toque em uma coluna para abrir controle de seleção",
		"SELECT_2_APPLY_COL": "Selecione o controle desejado para aplicar a esta coluna",
		"CUSTOM_SUBMIT_BTN": "Customizar texto do botão Enviar",
		"CUSTOM_CANCEL_BTN": "Customizar texto do botão Cancelar",
		"NAME_THIS_FORM": "Nome deste formulário",
		"SAVE_THIS_FORM": "Salvar este formulário",
		"FINAL_STEP": "Passo final : Visualizar formulário",
		"DATA_MODEL": "Modelo de dados",
		"FIELDS_MODEL": "Modelo de campos (pronto para salvar na base de dados)",
		"SELECT_A_CTRL": "Selecionar um controle",
		"SELECT_CTRL_IN_LIST": "Selecionar um controle na lista a seguir",
		"COL_WILL_BE_BLANK": "Coluna ficará em branco",
		"EDIT_PROPERTIES": "Editar propriedades",
		"HEADER_TEXT": "Texto do cabeçalho",
		"ADD_EDIT_HEADER_HERE": "Adicionar / editar o texto do cabeçalho aqui",
		"SUBTITLE_TEXT": "Texto da legenda",
		"ADD_EDIT_SUBTIL_HERE": "Adicionar /Editar o texto da legenda aqui",
		"LABEL_TEXT": "Texto do label",
		"ADD_EDIT_LABEL_HERE": "Adicionar / Editar texto do controle label aqui",
		"PLACEHOLDER": "placeholder",
		"ADD_EDIT_PLACEHOLD": "Adicionar / editar texto do placeholder aqui",
		"REQUIRED": "Obrigatório",
		"DESCRIPTION": "Descrição",
		"ADDEDIT_DESCRIPTION": "Adicionar / editar descrição aqui",
		"DEFAULTVALUE": "Valor padrão",
		"ADD_EDIT_DEFAULTVALUE_PLACEHOLD": "Adicionar / editar valor padrão aqui",
		"DATE_FORMAT": "Formato da data",
		"ADD_NEW_RADIO": "Adicionar novo radio",
		"ADD_RADIO_PLACEHOLD": "Adicionar novo radio",
		"EDIT_REMOVE_RADIO": "Editar/Remover radio",
		"NO_RADIO_ADD_NEW": "nenhum radio : Adicionar novo valor ao radio ",
		"SEARCH_4_OPTION": "procurar por opções",
		"ADD": "adicionar",
		"ORDER": "ordem",
		"OPTION": "opção",
		"GROUP": "grupo",
		"Add_NEW_OPTIONS": "Adicionar nova opção",
		"ADD_A_NEW_OPTION": "Adicionar nova opção",
		"EDIT_REMOVE_OPTIONS": "Editar/Remover opções",
		"NO_OPTION_ADD_NEW": "nenhuma opção : adicionar nova opções",
		"ADD_NEW_GROUPS": "Adicionar novos grupos",
		"ADD_A_NEW_GROUP": "adicionar novo grupo",
		"EDIT_GROUPS_OPTIONS": "Editar/Remover opções/grupos",
		"NO_GROUP_ADD_NEW": "adicionar novo grupo",
		"OK": "OK",
		"CANCEL": "Cancelar"
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* global angular */
	var CORE_MODULES = ['textAngular', 'textAngularSetup', 'ngAnimate', 'toaster', 'formly', 'formlyBootstrap', 'ui.bootstrap', 'nya.bootstrap.select', 'pascalprecht.translate'];
	
	exports.default = angular.module('edaStepWayEasyFormGen.core', CORE_MODULES);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _main = __webpack_require__(22);
	
	var _main2 = _interopRequireDefault(_main);
	
	var _main3 = __webpack_require__(26);
	
	var _main4 = _interopRequireDefault(_main3);
	
	var _main5 = __webpack_require__(27);
	
	var _main6 = _interopRequireDefault(_main5);
	
	var _mainPager = __webpack_require__(28);
	
	var _mainPager2 = _interopRequireDefault(_mainPager);
	
	var _mainStepIndicator = __webpack_require__(29);
	
	var _mainStepIndicator2 = _interopRequireDefault(_mainStepIndicator);
	
	var _mainStepZeroContent = __webpack_require__(30);
	
	var _mainStepZeroContent2 = _interopRequireDefault(_mainStepZeroContent);
	
	var _mainStepOneContent = __webpack_require__(33);
	
	var _mainStepOneContent2 = _interopRequireDefault(_mainStepOneContent);
	
	var _mainStepTwoContent = __webpack_require__(36);
	
	var _mainStepTwoContent2 = _interopRequireDefault(_mainStepTwoContent);
	
	var _mainStepThreeContent = __webpack_require__(39);
	
	var _mainStepThreeContent2 = _interopRequireDefault(_mainStepThreeContent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var STEP_WAY_MAIN_MODULE = 'easyFormStepwayMainModule';
	
	var TO_INJECT = [_mainPager2.default.name, _mainStepIndicator2.default.name, _mainStepZeroContent2.default.name, _mainStepOneContent2.default.name, _mainStepTwoContent2.default.name, _mainStepThreeContent2.default.name];
	
	exports.default = angular.module(STEP_WAY_MAIN_MODULE, TO_INJECT).controller(_main.STEP_WAY_MAIN_CONTROLLER_NAME, _main2.default).directive(_main3.STEP_WAY_DIRECTIVE_NAME, _main4.default).provider(_main5.EASY_FORM_STEP_WAY_CONFIG_NAME, _main6.default);

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.STEP_WAY_MAIN_CONTROLLERAS_NAME = exports.STEP_WAY_MAIN_CONTROLLER_NAME = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _mainController = __webpack_require__(23);
	
	var _editControlModalTemplate = __webpack_require__(24);
	
	var _editControlModalTemplate2 = _interopRequireDefault(_editControlModalTemplate);
	
	var _editControlModal = __webpack_require__(25);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var STEP_WAY_MAIN_CONTROLLER_NAME = 'edaStepWayEasyFormGenController';
	var STEP_WAY_MAIN_CONTROLLERAS_NAME = 'vm';
	
	var edaStepWayEasyFormGenController = function () {
	  function edaStepWayEasyFormGenController(easyFormGenVersion, $filter, toaster, $timeout, $uibModal, $log, $formlyProxy, $modalProxy, easyFormSteWayConfig) {
	    _classCallCheck(this, edaStepWayEasyFormGenController);
	
	    this.easyFormGenVersion = easyFormGenVersion;
	    this.$filter = $filter;
	    this.toaster = toaster;
	    this.$timeout = $timeout;
	    this.$modal = $uibModal;
	    this.$log = $log;
	    this.$formlyProxy = $formlyProxy;
	    this.$modalProxy = $modalProxy;
	    this.easyFormSteWayConfig = easyFormSteWayConfig;
	
	    this.init();
	  }
	
	  _createClass(edaStepWayEasyFormGenController, [{
	    key: 'init',
	    value: function init() {
	
	      this.dataModel = {};
	      this.wfFormFields = [];
	      this.wfFormFieldsOnlyNeededProperties = [];
	      this.easyFormGeneratorVERSION = this.easyFormGenVersion;
	      this.debug = (0, _mainController.initDebugModel)();
	      this.tab = (0, _mainController.initTabModel)(this.easyFormSteWayConfig.isPreviewPanelVisible(), this.easyFormSteWayConfig.arePreviewModelsVisible());
	      this.configuration = {}; //configuration model (contains array of lines which contains array of columns)
	      this.numberOfColumns = 1;
	      this.MaxNumberOfColumns = 3;
	      this.MinNumberOfColumns = 1;
	      this.columnTemplate = (0, _mainController.initColumnTemplate)(); //TODO : check is really needed
	      this.lineTemplate = (0, _mainController.initLineTemplate)(); //TODO : check if really needed
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
	      var JSONedModel = this.$filter('json')(this.dataModel, 4);
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
	      this.$formlyProxy.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
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
	      this.$formlyProxy.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
	      this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
	    }
	  }, {
	    key: 'addNewline',
	    value: function addNewline() {
	      this.configuration.lines.push((0, _mainController.initLineTemplate)());
	      //re-render formfield
	      this.$formlyProxy.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
	      this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
	    }
	  }, {
	    key: 'removeThisLine',
	    value: function removeThisLine(index) {
	      if (index > -1) {
	        if (this.configuration.lines.length > 1) {
	          //manage selected aciveLine
	          if (this.configuration.activeLine === index + 1) this.configuration.activeLine = 1;
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
	        this.$formlyProxy.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
	        this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
	      }
	    }
	  }, {
	    key: 'increaseNumberOfColumns',
	    value: function increaseNumberOfColumns() {
	      var lineIndex = this.configuration.activeLine - 1;
	      if (this.configuration.lines[lineIndex].columns.length < this.MaxNumberOfColumns) {
	
	        var newNumberOfColumns = this.configuration.lines[lineIndex].columns.push(angular.copy((0, _mainController.initColumnTemplate)()));
	        this.configuration.lines[lineIndex].columns[newNumberOfColumns - 1].numColumn = newNumberOfColumns;
	      }
	      //re-render formfield
	      this.$formlyProxy.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
	      this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
	    }
	  }, {
	    key: 'decreaseNumberOfColumns',
	    value: function decreaseNumberOfColumns() {
	      if (this.configuration.lines[this.configuration.activeLine - 1].columns.length > 1) {
	        this.configuration.lines[this.configuration.activeLine - 1].columns.splice(this.configuration.lines[this.configuration.activeLine - 1].columns.length - 1, 1);
	      }
	      this.$formlyProxy.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
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
	    key: 'goToStep',
	    value: function goToStep(index) {
	      this.configuration.configStepCounter = index;
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
	      var _this = this;
	
	      var editControlModal = {};
	      angular.extend(editControlModal, {
	        animation: this.animationsEnabled,
	        template: _editControlModalTemplate2.default,
	        controller: _editControlModal.EDIT_MODAL_CONTROLLER_NAME,
	        controllerAs: _editControlModal.EDIT_MODAL_CONTROLLERAS_NAME,
	        size: this.editControlModalSize,
	        resolve: {
	          nyaSelect: function nyaSelect() {
	            return _this.$modalProxy.getNyASelectFromSelectedLineColumn(_this.nyaSelect, _this.configuration, indexLine, numcolumn);
	          }
	        }
	      });
	
	      var modalInstance = this.$modal.open(editControlModal);
	      modalInstance.result.then(function (modalAddCtrlModel) {
	        _this.$modalProxy.bindConfigurationModelFromModalReturn(indexLine, numcolumn, modalAddCtrlModel, _this.configuration);
	        _this.$formlyProxy.applyConfigurationToformlyModel(_this.configuration, _this.wfFormFields, _this.dataModel);
	        _this.wfFormFieldsOnlyNeededProperties = angular.copy(_this.wfFormFields);
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
	      this.$formlyProxy.applyConfigurationToformlyModel(this.configurationLoaded, this.previewLoadedForm.fieldsModel, this.dataModel);
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
	        timeout: 3000,
	        title: ': Form is being saved',
	        body: '',
	        showCloseButton: true
	      });
	      // this.toaster.clear();
	      this.returnSaveEvent = true;
	
	      return true;
	    }
	  }]);
	
	  return edaStepWayEasyFormGenController;
	}();
	
	var toInject = ['easyFormGenVersion', '$filter', 'toaster', '$timeout', '$uibModal', '$log', '$formlyProxy', '$modalProxy', 'easyFormSteWayConfig'];
	
	edaStepWayEasyFormGenController.$inject = toInject;
	exports.default = edaStepWayEasyFormGenController;
	exports.STEP_WAY_MAIN_CONTROLLER_NAME = STEP_WAY_MAIN_CONTROLLER_NAME;
	exports.STEP_WAY_MAIN_CONTROLLERAS_NAME = STEP_WAY_MAIN_CONTROLLERAS_NAME;

/***/ },
/* 23 */
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
	    //   label: 'none',
	    //   placeholder: 'none',
	    //   required: false,
	    //   description: 'Descriptive text'
	    // }
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
	
	exports.initDebugModel = initDebugModel;
	exports.initTabModel = initTabModel;
	exports.initColumnTemplate = initColumnTemplate;
	exports.initLineTemplate = initLineTemplate;

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = "<div class=\"modal-header\">\n  <h3 class=\"modal-title greyText\">\n    {{'SELECT_A_CTRL' | translate}}\n  </h3>\n</div>\n<div class=\"modal-body\">\n  <hr/>\n  <div class=\"row\">\n    <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\">\n      <h5 class=\"greyText\">\n        <i class=\"fa fa-filter\"></i>\n        &nbsp;\n        {{'SELECT_CTRL_IN_LIST' | translate}} :\n      </h5>\n    </div>\n    <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\">\n      <edit-choose-control\n        model-nya-select=\"editControlModCtrl.modelNyaSelect\"\n        nya-select-filtered=\"editControlModCtrl.nyaSelectFiltered\"\n        select-this-control=\"editControlModCtrl.selectThisControl(optionId)\">\n      </edit-choose-control>\n    </div>\n  </div>\n  <hr/>\n  <div ng-switch on=\"editControlModCtrl.nyaSelect.selectedControl\">\n\n    <div ng-switch-when=\"none\">\n      <div class=\"row\">\n        <div class=\"col-sm-12\">\n          <h5 class=\"text-center texteRouge\">\n            <i class=\"fa fa-arrow-up\"></i>\n            &nbsp; {{'SELECT_A_CTRL' | translate}}\n          </h5>\n        </div>\n      </div>\n    </div>\n\n    <div ng-switch-when=\"empty\">\n      <edit-blank-control></edit-blank-control>\n    </div>\n\n    <div ng-switch-when=\"Header\">\n      <edit-header-control\n        nya-select=\"editControlModCtrl.nyaSelect\">\n      </edit-header-control>\n    </div>\n\n    <div ng-switch-when=\"Subtitle\">\n      <edit-sub-title-control\n        nya-select=\"editControlModCtrl.nyaSelect\">\n      </edit-sub-title-control>\n    </div>\n\n    <div ng-switch-when=\"TextInput\">\n      <edit-text-input-control\n        nya-select=\"editControlModCtrl.nyaSelect\">\n      </edit-text-input-control>\n    </div>\n\n    <div ng-switch-when=\"Password\">\n      <edit-password-control\n        nya-select=\"editControlModCtrl.nyaSelect\">\n      </edit-password-control>\n    </div>\n\n    <div ng-switch-when=\"Email\">\n      <edit-email-control\n        nya-select=\"editControlModCtrl.nyaSelect\">\n      </edit-email-control>\n    </div>\n\n    <div ng-switch-when=\"IpAdress\">\n      <edit-ip-adress-control\n        nya-select=\"editControlModCtrl.nyaSelect\">\n      </edit-ip-adress-control>\n    </div>\n\n    <div ng-switch-when=\"Date\">\n      <edit-date-control\n        nya-select=\"editControlModCtrl.nyaSelect\"\n        demodt=\"editControlModCtrl.demodt\"\n        date-options=\"editControlModCtrl.dateOptions\"\n        open=\"editControlModCtrl.open(event)\">\n      <edit-date-control>\n    </div>\n\n    <div ng-switch-when=\"Texarea\">\n      <edit-textarea-control\n        nya-select=\"editControlModCtrl.nyaSelect\">\n      </edit-textarea-control>\n    </div>\n\n    <div ng-switch-when=\"RichTextEditor\">\n      <edit-rich-text-editor-control\n        nya-select=\"editControlModCtrl.nyaSelect\">\n      </edit-rich-text-editor-control>\n    </div>\n\n    <div ng-switch-when=\"Radio\">\n      <edit-radio-control\n        nya-select=\"editControlModCtrl.nyaSelect\"\n        radio-row-collection=\"editControlModCtrl.radioRowCollection\"\n        new-option-radio=\"editControlModCtrl.newOptionRadio\"\n        add-new-option-radio=\"editControlModCtrl.addNewOptionRadio()\"\n        up-this-radio-row=\"editControlModCtrl.upThisRadioRow(index)\"\n        down-this-radio-row=\"editControlModCtrl.downThisRadioRow(index)\"\n        remove-radio-row=\"editControlModCtrl.removeRadioRow(index)\">\n      </edit-radio-control>\n    </div>\n\n    <div ng-switch-when=\"Checkbox\">\n      <edit-check-box-control\n        nya-select=\"editControlModCtrl.nyaSelect\">\n      </edit-check-box-control>\n    </div>\n\n    <div ng-switch-when=\"BasicSelect\">\n      <edit-basic-select-control\n        nya-select=\"editControlModCtrl.nyaSelect\"\n        basic-select-row-collection=\"editControlModCtrl.basicSelectRowCollection\"\n        new-option-basic-select=\"editControlModCtrl.newOptionBasicSelect\"\n        add-new-option-basic-select=\"editControlModCtrl.addNewOptionBasicSelect()\"\n        up-this-row=\"editControlModCtrl.upThisRow(index)\"\n        down-this-row=\"editControlModCtrl.downThisRow(index)\"\n        remove-row=\"editControlModCtrl.removeRow(index)\">\n      </edit-basic-select-control>\n    </div>\n\n    <div ng-switch-when=\"GroupedSelect\">\n      <edit-grouped-select-control\n        nya-select=\"editControlModCtrl.nyaSelect\"\n        grouped-select-row-collection=\"editControlModCtrl.groupedSelectRowCollection\"\n        new-option-grouped-select=\"editControlModCtrl.newOptionGroupedSelect\"\n        new-group-grouped-select=\"editControlModCtrl.newGroupGroupedSelect\"\n        group-select-group-click=\"editControlModCtrl.groupSelectGroupClick\"\n        grouped-select-groups=\"editControlModCtrl.GroupedSelectGroups\"\n        add-new-option-grouped-select=\"editControlModCtrl.addNewOptionGroupedSelect()\"\n        add-new-group-to-grouped-select=\"editControlModCtrl.addNewGroupToGroupedSelect()\"\n        up-this-grouped-select-row=\"editControlModCtrl.upThisGroupedSelectRow(index)\"\n        down-this-grouped-select-row=\"editControlModCtrl.downThisGroupedSelectRow(index)\"\n        show-group-list-to-choose=\"editControlModCtrl.showGroupListToChoose()\"\n        remove-grouped-select-row=\"editControlModCtrl.removeGroupedSelectRow(index)\"\n        >\n      </edit-grouped-select-control>\n    </div>\n\n  </div>\n</div>\n\n<edit-valid-edit-footer\n  nya-select=\"editControlModCtrl.nyaSelect\"\n  ok=\"editControlModCtrl.ok()\"\n  cancel=\"editControlModCtrl.cancel()\" >\n</edit-valid-edit-footer>\n"

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EDIT_MODAL_CONTROLLER_NAME = 'editControlModalController';
	var EDIT_MODAL_CONTROLLERAS_NAME = 'editControlModCtrl';
	
	var editControlModalController = function () {
	  function editControlModalController($uibModalInstance, nyaSelect, toaster, selectOptionManage, $modalProxy) {
	    _classCallCheck(this, editControlModalController);
	
	    this.$modalInstance = $uibModalInstance;
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
	      this.showGroupList = false;
	      this.demodt = {};
	      this.dateOptions = this.dateOptionsInit();
	      this.demodt.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	      this.nyaSelect.selectedControl = this.nyaSelect.temporyConfig.selectedControl;
	      this.nyaSelectFiltered = {};
	      this.modelNyaSelect = {};
	
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
	          if (this.nyaSelect.controls[i].id === this.nyaSelect.selectedControl) this.modelNyaSelect = this.nyaSelect.controls[i];
	        }
	        if (this.nyaSelect.selectedControl === 'BasicSelect') this.bindBasicSelectFromNYA();
	        if (this.nyaSelect.selectedControl === 'GroupedSelect') this.bindGroupedSelectFromNYA();
	        if (this.nyaSelect.selectedControl === 'Radio') this.bindRadioFromNYA();
	      }
	      this.initNyaSelectFiltered();
	    }
	  }, {
	    key: 'initNyaSelectFiltered',
	    value: function initNyaSelectFiltered() {
	      var listCtrl = [].concat(this.$modalProxy.getFilteredNyaSelectObject());
	      angular.extend(this.nyaSelectFiltered, {
	        'controls': listCtrl,
	        'selectedControl': this.nyaSelect.selectedControl,
	        'temporyConfig': this.nyaSelect.temporyConfig
	      });
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
	        var filteredgroup = _.uniq(_.pluck(this.groupedSelectRowCollection.rows, 'group'));
	        angular.copy(filteredgroup, this.GroupedSelectGroups.list);
	      }
	    }
	  }, {
	    key: 'addNewOptionRadio',
	    value: function addNewOptionRadio() {
	      var result = this.selectOptionManage.addNewOptionRadio(this.radioRowCollection, this.newOptionRadio.saisie);
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
	      var result = this.selectOptionManage.addNewOptionBasicSelect(this.basicSelectRowCollection, this.newOptionBasicSelect.saisie);
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
	      var result = this.selectOptionManage.addNewOptionGroupedSelect(this.groupedSelectRowCollection, this.newOptionGroupedSelect.saisie, '');
	      if (result.resultFlag === false) {
	        this.toaster.pop({
	          type: 'warning',
	          timeout: 2000,
	          title: result.details,
	          body: '\'' + this.newOptionGroupedSelect.saisie + '\' cannot be added.',
	          showCloseButton: true
	        });
	      }
	      // bind nya : dont bind here $apply is not done fast enough
	      // bindGroupedSelectToNya();
	      // reset input
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
	    key: 'open',
	    value: function open($event) {
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
	        if (this.nyaSelect.controls[i].id === controlName) this.nyaSelect.selectedControl = this.nyaSelect.controls[i].id;
	      }
	      if (this.nyaSelect.selectedControl === 'Date') this.initDatePicker();
	    }
	  }, {
	    key: 'ok',
	    value: function ok() {
	      if (this.nyaSelect.selectedControl === 'BasicSelect') this.bindBasicSelectToNya();
	      if (this.nyaSelect.selectedControl === 'GroupedSelect') this.bindGroupedSelectToNya();
	      if (this.nyaSelect.selectedControl === 'Radio') this.bindRadioToNya();
	      //save config to control
	      this.$modalProxy.applyConfigToSelectedControl(this.nyaSelect);
	      //return current model to parent controller :
	      this.$modalInstance.close(this.nyaSelect);
	    }
	  }, {
	    key: 'cancel',
	    value: function cancel() {
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
	      this.nyaSelect.temporyConfig.datepickerOptions = {
	        format: this.demodt.formats[0]
	      };
	    }
	  }, {
	    key: 'resetTemporyConfig',
	    value: function resetTemporyConfig() {
	      this.nyaSelectFiltered.temporyConfig = {
	        formlyLabel: '',
	        formlyRequired: false,
	        formlyPlaceholder: '',
	        formlyDescription: '',
	        formlyOptions: []
	      };
	    }
	  }]);
	
	  return editControlModalController;
	}();
	
	var toInject = ['$uibModalInstance', 'nyaSelect', 'toaster', 'selectOptionManage', '$modalProxy'];
	
	editControlModalController.$inject = toInject;
	
	exports.default = editControlModalController;
	exports.EDIT_MODAL_CONTROLLER_NAME = EDIT_MODAL_CONTROLLER_NAME;
	exports.EDIT_MODAL_CONTROLLERAS_NAME = EDIT_MODAL_CONTROLLERAS_NAME;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.STEP_WAY_DIRECTIVE_NAME = undefined;
	
	var _main = __webpack_require__(22);
	
	var STEP_WAY_DIRECTIVE_NAME = 'edaStepWayEasyFormGen';
	
	function edaStepWayEasyFormGenDirective($templateCache, $timeout, $formlyProxy, $modalProxy) {
	
	  var directive = {
	    restrict: 'E',
	    replace: false,
	    template: '\n      <section id="pageWfEdit">\n        <div ng-init="">\n          <div class="container">\n            <section id="preview">\n              <div id="preview-content">\n                <div class="content-container">\n                  <!-- taoster alert -->\n                  <toaster-container\n                    toaster-options="{\n                      \'position-class\': \'toast-top-full-width\',\n                      \'extendedTimeout\':500,\n                      \'timeOut\':500\n                    }">\n                  </toaster-container>\n                  <uib-tabset justified="true">\n                    <uib-tab\n                      active="vm.tab.editTab.active"\n                      heading="{{\'EDIT_TAB\' | translate}}">\n                      <div class="row">\n                        <step-indicator\n                          configuration="vm.configuration"\n                          go-to-step="vm.goToStep(index)">\n                        </step-indicator>\n                      </div>\n                      <div class="row">\n                        <pager\n                          configuration="vm.configuration"\n                          step-indicators="vm.stepIndicators"\n                          next-config-step="vm.nextConfigStep()"\n                          previous-config-step="vm.previousConfigStep()">\n                        </pager>\n                        <div\n                          class="animate-switch-container"\n                          ng-switch on="vm.configuration.listConfigStep[vm.configuration.configStepCounter]">\n                          <step-zero-content\n                            configuration="vm.configuration"\n                            add-newline="vm.addNewline()"\n                            down-this-line="vm.downThisLine(index)"\n                            up-this-line="vm.upThisLine(index)"\n                            remove-this-line="vm.removeThisLine(index)">\n                          </step-zero-content>\n                          <step-one-content\n                            configuration="vm.configuration"\n                            increase-number-of-columns="vm.increaseNumberOfColumns()"\n                            decrease-number-of-columns="vm.decreaseNumberOfColumns()"\n                            set-active-line-number="vm.setActiveLineNumber(index)">\n                          </step-one-content>\n                          <step-two-content\n                            configuration="vm.configuration"\n                            set-active-line-number="vm.setActiveLineNumber(index)"\n                            show-modal-add-ctrl-to-column="vm.showModalAddCtrlToColumn(size, indexLine, numcolumn)">\n                          </step-two-content>\n                          <step-three-content\n                            configuration="vm.configuration"\n                            eda-data-model="vm.dataModel"\n                            wf-form-fields="vm.wfFormFields"\n                            on-submit="vm.onSubmit()"\n                            save-this-form="vm.saveThisForm()">\n                          </step-three-content>\n                        </div>\n                      </div>\n                    </uib-tab>\n                    <uib-tab\n                      active="vm.tab.previewTab.active"\n                      ng-if="vm.tab.previewTab.tabVisible && !vm.configuration.isWizard"\n                      heading="{{\'PREVIEW_TAB\' | translate}}">\n                      <div class="panel panel-default">\n                        <div class="panel-body">\n                          <!-- formly here -->\n                          <form ng-submit="vm.onSubmit()">\n                            <formly-form\n                              id="previewFormlyForm"\n                              model="vm.dataModel"\n                              fields="vm.wfFormFields">\n                              <span class="pull-right">\n                                <button\n                                  class="btn btn-primary"\n                                  type="submit">\n                                  {{vm.configuration.submitButtonText}}\n                                </button>\n                                <button\n                                  class="btn btn-primary"\n                                  type="cancel">\n                                  {{vm.configuration.cancelButtonText}}\n                                </button>\n                              </span>\n                            </formly-form>\n                          </form>\n                        </div>\n                      </div>\n                      <div\n                        ng-if="vm.tab.previewTab.modelsVisible"\n                        class="panel panel-default">\n                        <div class="panel-body">\n                          <p>{{\'DATA_MODEL\' | translate}}</p>\n                          <pre>\n                            {{vm.dataModel | json}}\n                          </pre>\n                        </div>\n                      </div>\n                      <div\n                        ng-if="vm.tab.previewTab.modelsVisible"\n                        class="panel panel-default">\n                        <div class="panel-body">\n                          <p>{{\'FIELDS_MODEL\' | translate}}</p>\n                          <pre>\n                            {{vm.wfFormFieldsOnlyNeededProperties | json}}\n                          </pre>\n                        </div>\n                      </div>\n                    </uib-tab>\n                  </uib-tabset>\n                </div>\n              </div>\n            </section>\n            <hr/>\n          </div>\n        </div>\n      </section>\n    ',
	    scope: {
	      edaEasyFormGeneratorModel: '=',
	      wizardStepGeneratorModel: '=',
	      edaSaveFormEvent: '&edaSaveFormEvent'
	    },
	    controller: _main.STEP_WAY_MAIN_CONTROLLER_NAME,
	    controllerAs: _main.STEP_WAY_MAIN_CONTROLLERAS_NAME,
	    link: linkFct
	  };
	  return directive;
	
	  function linkFct(scope) {
	    //watch "scope.easyFormGeneratorModel"
	    scope.$watch(function () {
	      return scope.edaEasyFormGeneratorModel;
	    }, function () {
	      return loadExistingConfigurationModel();
	    }, true);
	
	    if (scope.wizardStepGeneratorModel) {
	      loadExistingConfigurationModel();
	      scope.wizardStepGeneratorModel.configuration = scope.vm.configuration;
	      scope.wizardStepGeneratorModel.edaFieldsModel = scope.vm.configuration.lines;
	      scope.wizardStepGeneratorModel.formlyFieldsModel = scope.vm.wfFormFields;
	      scope.wizardStepGeneratorModel.dataModel = scope.vm.dataModel;
	      scope.vm.configuration.isWizard = true;
	      if (scope.wizardStepGeneratorModel.loaded) {
	        angular.copy(scope.wizardStepGeneratorModel.loaded.edaFieldsModel, scope.wizardStepGeneratorModel.edaFieldsModel);
	        angular.copy(scope.wizardStepGeneratorModel.loaded.dataModel, scope.wizardStepGeneratorModel.dataModel);
	        scope.wizardStepGeneratorModel.formlyFieldsModel.length = 0;
	        angular.copy(scope.wizardStepGeneratorModel.loaded.formlyFieldsModel, scope.wizardStepGeneratorModel.formlyFieldsModel);
	      }
	    }
	
	    //watch "scope.vm.returnSaveEvent"" = catch saving form event
	    scope.$watch(function () {
	      return scope.vm.returnSaveEvent;
	    }, function (newValue) {
	      if (newValue === true) {
	        var _easyFormGeneratorModel = {
	          formName: scope.vm.configuration.formName,
	          btnSubmitText: scope.vm.configuration.submitButtonText,
	          btnCancelText: scope.vm.configuration.cancelButtonText,
	          edaFieldsModel: scope.vm.configuration.lines,
	          edaFieldsModelStringified: angular.toJson(scope.vm.configuration.lines),
	          formlyFieldsModel: scope.vm.wfFormFieldsOnlyNeededProperties,
	          dataModel: scope.vm.dataModel
	        };
	        scope.edaSaveFormEvent({ edaEasyFormGeneratorModel: _easyFormGeneratorModel });
	        //back to false, waiting next save event
	        scope.vm.returnSaveEvent = false;
	      }
	    });
	
	    function loadExistingConfigurationModel() {
	      if (angular.isDefined(scope.edaEasyFormGeneratorModel)) {
	        var configlines = [].concat(returnAttributeConfigurationLinesIfNotEmpty());
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
	        scope.vm.configuration = angular.copy(scope.configurationLoaded);
	        //apply formly model
	        $formlyProxy.applyConfigurationToformlyModel(scope.configurationLoaded, scope.vm.wfFormFields, scope.vm.model);
	        scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy(scope.vm.wfFormFields);
	        scope.vm.dataModel = returnAttributeDataModelIfNotEmpty();
	        scope.vm.configuration.formName = angular.isString(scope.edaEasyFormGeneratorModel.formName) ? scope.edaEasyFormGeneratorModel.formName : '';
	        scope.vm.configuration.submitButtonText = angular.isString(scope.edaEasyFormGeneratorModel.btnSubmitText) ? scope.edaEasyFormGeneratorModel.btnSubmitText : 'Submit';
	        scope.vm.configuration.cancelButtonText = angular.isString(scope.edaEasyFormGeneratorModel.btnCancelText) ? scope.edaEasyFormGeneratorModel.btnCancelText : 'Cancel';
	      }
	    }
	
	    function returnAttributeConfigurationLinesIfNotEmpty() {
	      var edaEasyFormGeneratorModelToReturn = angular.isArray(scope.edaEasyFormGeneratorModel.edaFieldsModel) ? scope.edaEasyFormGeneratorModel.edaFieldsModel.length > 0 ? scope.edaEasyFormGeneratorModel.edaFieldsModel : emptyEdaFieldsModel() : emptyEdaFieldsModel();
	      return edaEasyFormGeneratorModelToReturn;
	    }
	
	    function returnAttributeDataModelIfNotEmpty() {
	      var dataModelToReturn = angular.isArray(scope.edaEasyFormGeneratorModel.dataModel) ? scope.edaEasyFormGeneratorModel.dataModel.length > 0 ? scope.edaEasyFormGeneratorModel.dataModel : {} : {};
	      return dataModelToReturn;
	    }
	
	    /**
	      * empty fields model : to display at least an empty line
	      * otherwise would look like ugly empty line like it were a bug
	      */
	    function emptyEdaFieldsModel() {
	      var emptyModel = [{
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
	      }];
	      return emptyModel;
	    }
	  }
	}
	
	edaStepWayEasyFormGenDirective.$inject = ['$templateCache', '$timeout', '$formlyProxy', '$modalProxy'];
	
	exports.default = edaStepWayEasyFormGenDirective;
	exports.STEP_WAY_DIRECTIVE_NAME = STEP_WAY_DIRECTIVE_NAME;

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var EASY_FORM_STEP_WAY_CONFIG_NAME = 'easyFormSteWayConfig';
	
	function easyFormSteWayConfig($translateProvider) {
	  var _configuration = defaultConfig();
	  var _controlsList = controlsList();
	  var _defaultLanguage = getDefaultLanguage();
	  var _currentLanguage = initDefaultLanguage();
	  var _showPreviewPanel = getDefaultshowPreviewPanel();
	  var _showPreviewModels = getDefaultShowPreviewModel();
	
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
	    var controls = [{ name: 'empty', enabled: true }, { name: 'Header', enabled: true }, { name: 'Subtitle', enabled: true }, { name: 'TextInput', enabled: true }, { name: 'Password', enabled: true }, { name: 'Email', enabled: true }, { name: 'IpAdress', enabled: true }, { name: 'Date', enabled: true }, { name: 'Texarea', enabled: true }, { name: 'RichTextEditor', enabled: true }, { name: 'Radio', enabled: true }, { name: 'Checkbox', enabled: true }, { name: 'BasicSelect', enabled: true }, { name: 'GroupedSelect', enabled: true }];
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
	
	  function disableControl(control) {
	    if (angular.isString(control)) {
	      angular.forEach(_controlsList, function (aControl) {
	        if (aControl.name === control) aControl.enabled = false;
	      });
	    } else if (angular.isArray(control)) {
	      angular.forEach(control, function (controlName) {
	        angular.forEach(_controlsList, function (aControl) {
	          if (aControl.name === controlName) aControl.enabled = false;
	        });
	      });
	    }
	  }
	
	  function enableControl(control) {
	    if (angular.isString(control)) {
	      angular.forEach(_controlsList, function (aControl) {
	        if (aControl.name === control) aControl.enabled = true;
	      });
	    } else if (angular.isArray(control)) {
	      angular.forEach(control, function (controlName) {
	        angular.forEach(_controlsList, function (aControl) {
	          if (aControl.name === controlName) aControl.enabled = true;
	        });
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
	
	easyFormSteWayConfig.$inject = ['$translateProvider'];
	exports.default = easyFormSteWayConfig;
	exports.EASY_FORM_STEP_WAY_CONFIG_NAME = EASY_FORM_STEP_WAY_CONFIG_NAME;

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _class, _temp;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PAGER_COMPONENT_NAME = exports.PAGER_COMPONENT_NAME = 'pager';
	
	var pagerComponent = exports.pagerComponent = {
	  template: '\n  <ul class="pager">\n    <li ng-class="{\'disabled\':$ctrl.stepIndicators[0]}" ng-if="$ctrl.configuration.configStepCounter > 0">\n      <button\n          class="btn btn-primary customPagerButton"\n          ng-click="$ctrl.previousConfigStep()" >\n        <i class="fa fa-arrow-left fa-2x pull-left"></i>\n        <span class="pull-right">\n          {{\'PAGER_PREVIOUS\' | translate}}\n        </span>\n      </button>\n    </li>\n    <li\n      ng-class="{\'disabled\':$ctrl.stepIndicators[3]}"\n      ng-if="($ctrl.configuration.configStepCounter < 3 && !$ctrl.configuration.isWizard) || ($ctrl.configuration.configStepCounter < 2 && $ctrl.configuration.isWizard) ">\n      <button\n        class="btn btn-primary customPagerButton"\n        ng-click="$ctrl.nextConfigStep()">\n        <span class="pull-left">\n          {{\'PAGER_NEXT\' | translate}}\n        </span>\n        <i class="fa fa-arrow-right fa-2x pull-right"></i>\n      </button>\n    </li>\n  </ul>\n  ',
	  bindings: {
	    stepIndicators: '<',
	    nextConfigStep: '&',
	    previousConfigStep: '&',
	    configuration: '='
	  },
	  controller: (_temp = _class = function pagerComponent() {
	    _classCallCheck(this, pagerComponent);
	  }, _class.$inject = [], _temp)
	};
	
	var PAGER_COMPONENT_MODULE = 'stepway.pager.module';
	
	exports.default = angular.module(PAGER_COMPONENT_MODULE, []).component(PAGER_COMPONENT_NAME, pagerComponent);

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _class, _temp;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var STEP_INDICATOR_COMPONENT_NAME = exports.STEP_INDICATOR_COMPONENT_NAME = 'stepIndicator';
	
	var stepIndicatorComponent = exports.stepIndicatorComponent = {
	  template: '\n  <div class="row stepwizardTopmargin">\n    <div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2">\n      <div class="stepwizard">\n        <div class="row stepwizard-row">\n          <div class="stepwizard-step col-md-3">\n            <button\n              type="button"\n              class="btn btn-circle"\n              ng-click="$ctrl.goToStep({index:0})"\n              ng-class="{\'btn-primary\': $ctrl.configuration.stepIndicators[0], \'btn-default\': !$ctrl.configuration.stepIndicators[0]}" >\n              0\n            </button>\n            <p>\n              {{\'WIZARD_LINES\' | translate}}\n            </p>\n          </div>\n          <div class="stepwizard-step col-md-3">\n            <button\n              type="button"\n              class="btn btn-circle"\n              ng-click="$ctrl.goToStep({index:1})"\n              ng-class="{\'btn-primary\': $ctrl.configuration.stepIndicators[1], \'btn-default\': !$ctrl.configuration.stepIndicators[1], \'disabled\': ($ctrl.configuration.configStepCounter < 1)}"  >\n              1\n            </button>\n            <p>\n              {{\'WIZARD_LAYOUT\' | translate}}\n            </p>\n          </div>\n          <div class="stepwizard-step col-md-3">\n            <button\n              type="button"\n              class="btn btn-default btn-circle"\n              ng-click="$ctrl.goToStep({index:2})"\n              ng-class="{\'btn-primary\': $ctrl.configuration.stepIndicators[2], \'btn-default\': !$ctrl.configuration.stepIndicators[2], \'disabled\': ($ctrl.configuration.configStepCounter < 2)}" >\n              2\n            </button>\n            <p>\n              {{\'WIZARD_CONTROLS\' | translate}}\n            </p>\n          </div>\n          <div class="stepwizard-step col-md-3" ng-if="!$ctrl.configuration.isWizard">\n            <button\n              type="button"\n              class="btn btn-default btn-circle"\n              ng-click="$ctrl.goToStep({index:3})"\n              ng-class="{\'btn-primary\': $ctrl.configuration.stepIndicators[3], \'btn-default\': !$ctrl.configuration.stepIndicators[3], \'disabled\': ($ctrl.configuration.configStepCounter < 3)}" >\n              3\n            </button>\n            <p>\n              {{\'WIZARD_SAVE\' | translate}}\n            </p>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  ',
	  bindings: {
	    configuration: '<',
	    goToStep: '&'
	  },
	  controller: (_temp = _class = function stepIndicatorComponent() {
	    _classCallCheck(this, stepIndicatorComponent);
	  }, _class.$inject = [], _temp)
	};
	
	var STEP_INDICATOR_COMPONENT_MODULE = 'stepway.stepIndicator.module';
	
	exports.default = angular.module(STEP_INDICATOR_COMPONENT_MODULE, []).component(STEP_INDICATOR_COMPONENT_NAME, stepIndicatorComponent);

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.stepZeroContentComponent = exports.LINE_STEP_ZERO_CONTENT_COMPONENT = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class, _temp;
	
	var _mainStepZeroCommandPanel = __webpack_require__(31);
	
	var _mainStepZeroVisualPanel = __webpack_require__(32);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LINE_STEP_ZERO_CONTENT_COMPONENT = exports.LINE_STEP_ZERO_CONTENT_COMPONENT = 'stepZeroContent';
	
	var stepZeroContentComponent = exports.stepZeroContentComponent = {
	  template: '\n  <div\n    class="animate-switch"\n    ng-switch-when="init">\n    <div class="col-md-4">\n      <step-zero-command-panel\n        add-newline="$ctrl.addNewline()">\n      </step-zero-command-panel>\n    </div>\n    <div class="col-md-8">\n      <step-zero-visual-panel\n        configuration="$ctrl.configuration"\n        down-this-line="$ctrl.downThisLineParent(index)"\n        up-this-line="$ctrl.upThisLineParent(index)"\n        remove-this-line="$ctrl.removeThisLineParent(index)"\n        set-active-line-number="$ctrl.setActiveLineNumberParent(index)">\n      </step-zero-visual-panel>\n    </div>\n  </div>\n  ',
	  bindings: {
	    configuration: '=',
	    addNewline: '&',
	    downThisLine: '&',
	    upThisLine: '&',
	    removeThisLine: '&'
	  },
	  controller: (_temp = _class = function () {
	    function stepZeroContentController() {
	      _classCallCheck(this, stepZeroContentController);
	    }
	
	    ///////////////////////////////////
	    // WHY this function is needed :
	    ///////////////////////////////////
	    // CASE OF :  function with parameter passing from parent to caller through another level component
	    //            parent -> intermediate component (here) -> caller
	    // NOTE : intermediate should call parent function to be sure to pass function parameter upward to parent
	
	
	    _createClass(stepZeroContentController, [{
	      key: 'setActiveLineNumberParent',
	      value: function setActiveLineNumberParent(index) {
	        this.setActiveLineNumber({ index: index });
	      }
	    }, {
	      key: 'removeThisLineParent',
	      value: function removeThisLineParent(index) {
	        this.removeThisLine({ index: index });
	      }
	    }, {
	      key: 'upThisLineParent',
	      value: function upThisLineParent(index) {
	        this.upThisLine({ index: index });
	      }
	    }, {
	      key: 'downThisLineParent',
	      value: function downThisLineParent(index) {
	        this.downThisLine({ index: index });
	      }
	    }]);
	
	    return stepZeroContentController;
	  }(), _class.$inject = [], _temp)
	};
	
	var STEP_ZERO_CONTENT_COMPONENT_MODULE = 'stepway.stepZeroContent.module';
	
	exports.default = angular.module(STEP_ZERO_CONTENT_COMPONENT_MODULE, []).component(LINE_STEP_ZERO_CONTENT_COMPONENT, stepZeroContentComponent).component(_mainStepZeroCommandPanel.STEP_ZERO_COMMAND_PANEL_COMPONENT_NAME, _mainStepZeroCommandPanel.StepZeroCommandPanelComponent).component(_mainStepZeroVisualPanel.STEP_ZERO_VISUAL_PANEL_COMPONENT_NAME, _mainStepZeroVisualPanel.StepZeroVisualPanelComponent);

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _class, _temp;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var STEP_ZERO_COMMAND_PANEL_COMPONENT_NAME = exports.STEP_ZERO_COMMAND_PANEL_COMPONENT_NAME = 'stepZeroCommandPanel';
	
	var StepZeroCommandPanelComponent = exports.StepZeroCommandPanelComponent = {
	  template: '\n  <div id="commandPanel">\n    <div  class="panel panel-default">\n      <div class="panel-heading">\n        <h3 class="panel-title">\n          <i class="fa fa-keyboard-o"></i>\n          &nbsp;\n          {{\'COMMAND_PANEL\' | translate}}\n        </h3>\n      </div>\n      <div class="panel-body">\n        <div class="row">\n          <div class="col-md-12">\n            <span class="addNewLine">\n              {{\'ADD_NEW_LINE\' | translate}} :\n            </span>\n            &nbsp;\n            <button\n              class="btn btn-primary"\n              ng-click="$ctrl.addNewline()">\n              <i class="fa fa-plus fa-1x"></i>\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  ',
	  bindings: {
	    addNewline: '&'
	  },
	  controller: (_temp = _class = function StepZeroCommandPanelController() {
	    //
	
	    _classCallCheck(this, StepZeroCommandPanelController);
	  }, _class.$inject = [], _temp)
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
	
	var STEP_ZERO_VISUAL_PANEL_COMPONENT_NAME = exports.STEP_ZERO_VISUAL_PANEL_COMPONENT_NAME = 'stepZeroVisualPanel';
	
	var StepZeroVisualPanelComponent = exports.StepZeroVisualPanelComponent = {
	  template: '\n  <div id="visualPanel">\n    <div  class="panel panel-default">\n      <div class="panel-heading">\n        <h3 class="panel-title">\n          <i class="fa fa-eye"></i>\n          &nbsp;\n          {{\'VISUAL_PANEL\' | translate}}\n        </h3>\n      </div>\n      <div class="panel-body">\n        <!-- lines -->\n        <ul class="list-group">\n          <li\n            class="list-group-item"\n            ng-repeat="line in $ctrl.configuration.lines track by $index">\n            <!-- columns -->\n            <div ng-switch on="line.columns.length">\n              <div\n                class="row linesList"\n                ng-switch-when="1">\n                <div\n                  class="col-md-12 lineCommandButtons"\n                  ng-show="$ctrl.configuration.lines.length > 1">\n                  <button\n                    class="btn btn-warning"\n                    ng-hide="$index==0"\n                    ng-click="$ctrl.upThisLine({index: $index})">\n                    <i class="fa fa-arrow-up"></i>\n                  </button>\n                  <button\n                    class="btn btn-warning"\n                    ng-hide="$index==($ctrl.configuration.lines.length-1)"\n                    ng-click="$ctrl.downThisLine({index: $index})">\n                    <i class="fa fa-arrow-down"></i>\n                  </button>\n                  <button\n                    class="btn btn-danger pull-right"\n                    ng-click="$ctrl.removeThisLine({index: $index})">\n                    <i class="fa fa-trash-o"></i>\n                  </button>\n                </div>\n                <div class="col-md-12">\n                  <div class="col-md-12 well">\n                    <button\n                      class="btn btn-lg btn-block  btn-default disabled">\n                      {{line.columns[0].control.type !== \'none\'  ? line.columns[0].control.type + \' \' + line.columns[0].control.subtype || \'\' : \'column 1\'}}\n                    </button>\n                  </div>\n                </div>\n              </div>\n              <div\n                class="row linesList"\n                ng-switch-when="2">\n                <div\n                  class="col-md-12 lineCommandButtons"\n                  ng-show="$ctrl.configuration.lines.length > 1">\n                  <button\n                    class="btn btn-warning"\n                    ng-hide="$index==0"\n                    ng-click="$ctrl.upThisLine({index: $index})">\n                    <i class="fa fa-arrow-up"></i>\n                  </button>\n                  <button\n                    class="btn btn-warning"\n                    ng-hide="$index==($ctrl.configuration.lines.length-1)"\n                    ng-click="$ctrl.downThisLine({index: $index})">\n                    <i class="fa fa-arrow-down"></i>\n                  </button>\n                  <button\n                    class="btn btn-danger pull-right"\n                    ng-click="$ctrl.removeThisLine({index: $index})">\n                    <i class="fa fa-trash-o"></i>\n                  </button>\n                </div>\n                <div class="col-md-12">\n                  <div class="col-md-6 well">\n                    <button class="btn btn-lg btn-block  btn-default disabled">\n                        {{line.columns[0].control.type !== \'none\'  ? line.columns[0].control.type + \' \' + line.columns[0].control.subtype || \'\' : \'column 1\'}}\n                    </button>\n                  </div>\n                  <div class="col-md-6 well">\n                    <button class="btn btn-lg btn-block  btn-default disabled">\n                        {{line.columns[1].control.type !== \'none\'  ? line.columns[1].control.type + \' \' + line.columns[1].control.subtype || \'\' : \'column 2\'}}\n                    </button>\n                  </div>\n                </div>\n              </div>\n              <div\n                class="row linesList"\n                ng-switch-when="3">\n                <div\n                  class="col-md-12 lineCommandButtons"\n                  ng-show="$ctrl.configuration.lines.length > 1">\n                  <button\n                    class="btn btn-warning"\n                    ng-hide="$index==0"\n                    ng-click="$ctrl.upThisLine({index: $index})">\n                    <i class="fa fa-arrow-up"></i>\n                  </button>\n                  <button\n                    class="btn btn-warning"\n                    ng-hide="$index==($ctrl.configuration.lines.length-1)"\n                    ng-click="$ctrl.downThisLine({index: $index})">\n                    <i class="fa fa-arrow-down"></i>\n                  </button>\n                  <button\n                    class="btn btn-danger\n                    pull-right"\n                    ng-click="$ctrl.removeThisLine({index: $index})">\n                    <i class="fa fa-trash-o"></i>\n                  </button>\n                </div>\n                <div class="col-md-12">\n                  <div class="col-md-4 well">\n                    <button class="btn btn-lg btn-block  btn-default disabled">\n                      {{line.columns[0].control.type !== \'none\'  ? line.columns[0].control.type + \' \' + line.columns[0].control.subtype || \'\' : \'column 1\'}}\n                    </button>\n                  </div>\n                  <div class="col-md-4 well">\n                    <button\n                      class="btn btn-lg btn-block  btn-default disabled">\n                      {{line.columns[1].control.type !== \'none\'  ? line.columns[1].control.type + \' \' + line.columns[1].control.subtype || \'\' : \'column 2\'}}\n                    </button>\n                </div>\n                <div class="col-md-4 well">\n                  <button\n                    class="btn btn-lg btn-block  btn-default disabled">\n                    {{line.columns[2].control.type !== \'none\'  ? line.columns[2].control.type + \' \' + line.columns[2].control.subtype || \'\' : \'column 3\'}}\n                  </button>\n                </div>\n              </div>\n            </div>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n  ',
	  bindings: {
	    configuration: '=',
	    downThisLine: '&',
	    upThisLine: '&',
	    removeThisLine: '&'
	  },
	  controller: (_temp = _class = function StepZeroVisualPanelController() {
	    //
	
	    _classCallCheck(this, StepZeroVisualPanelController);
	  }, _class.$inject = [], _temp)
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.stepOneContentComponent = exports.LINE_STEP_CONTENT_COMPONENT = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class, _temp;
	
	var _mainStepOneCommandPanel = __webpack_require__(34);
	
	var _mainStepOneVisualPanel = __webpack_require__(35);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LINE_STEP_CONTENT_COMPONENT = exports.LINE_STEP_CONTENT_COMPONENT = 'stepOneContent';
	
	var stepOneContentComponent = exports.stepOneContentComponent = {
	  template: '\n  <div\n    class="animate-switch"\n    ng-switch-when="first">\n    <div class="col-md-4">\n      <step-one-command-panel\n        configuration="$ctrl.configuration"\n        increase-number-of-columns="$ctrl.increaseNumberOfColumns()"\n        decrease-number-of-columns="$ctrl.decreaseNumberOfColumns()">\n      </step-one-command-panel>\n    </div>\n    <div class="col-md-8">\n      <step-one-visual-panel\n        configuration="$ctrl.configuration"\n        set-active-line-number="$ctrl.setActiveLineNumberParent(index)">\n      </step-one-visual-panel>\n    </div>\n  </div>\n  ',
	  bindings: {
	    configuration: '=',
	    increaseNumberOfColumns: '&',
	    decreaseNumberOfColumns: '&',
	    setActiveLineNumber: '&'
	  },
	  controller: (_temp = _class = function () {
	    function stepOneContentController() {
	      _classCallCheck(this, stepOneContentController);
	    }
	    //
	
	    ///////////////////////////////////
	    // WHY this function is needed :
	    ///////////////////////////////////
	    // CASE OF :  function with parameter passing from parent to caller through another level component
	    //            parent -> intermediate component (here) -> caller
	    // NOTE : intermediate should call parent function to be sure to pass function parameter upward to parent
	
	
	    _createClass(stepOneContentController, [{
	      key: 'setActiveLineNumberParent',
	      value: function setActiveLineNumberParent(index) {
	        this.setActiveLineNumber({ index: index });
	      }
	    }]);
	
	    return stepOneContentController;
	  }(), _class.$inject = [], _temp)
	};
	
	var STEP_ONE_CONTENT_COMPONENT_MODULE = 'stepway.stepOneContent.module';
	exports.default = angular.module(STEP_ONE_CONTENT_COMPONENT_MODULE, []).component(LINE_STEP_CONTENT_COMPONENT, stepOneContentComponent).component(_mainStepOneCommandPanel.STEP_ONE_COMMAND_PANEL_COMPONENT_NAME, _mainStepOneCommandPanel.StepOneCommandPanelComponent).component(_mainStepOneVisualPanel.STEP_ONE_VISUAL_PANEL_COMPONENT_NAME, _mainStepOneVisualPanel.StepOneVisualPanelComponent);

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _class, _temp;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var STEP_ONE_COMMAND_PANEL_COMPONENT_NAME = exports.STEP_ONE_COMMAND_PANEL_COMPONENT_NAME = 'stepOneCommandPanel';
	
	var StepOneCommandPanelComponent = exports.StepOneCommandPanelComponent = {
	  template: '\n  <div id="commandPanel">\n    <div class="panel panel-default">\n      <div class="panel-heading">\n        <h3 class="panel-title">\n          <i class="fa fa-keyboard-o"></i>\n          &nbsp;\n          {{\'COMMAND_PANEL\' | translate}}\n        </h3>\n      </div>\n      <div class="panel-body">\n        <div class="row">\n          <div class="col-md-12">\n            <h4 class="numberOfcolumsText text-center">\n              <i>\n                - {{\'SELECTED_LINE\' | translate}} -\n              </i>\n            </h4>\n            <h4 class="numberOfcolumsText text-center">\n              {{\'NUMBER_OF_COLUMN\' | translate}} :\n            </h4>\n          </div>\n        </div>\n        <div class="row">\n          <div class="col-xs-2 col-xs-offset-3 col-sm-2 col-sm-offset-3 col-md-2 col-md-offset-3">\n            <button\n              class="btn btn-primary pull-right btnMinusColumns"\n              ng-click="$ctrl.decreaseNumberOfColumns()">\n              <i class="fa fa-minus fa-1x"></i>\n            </button>\n          </div>\n          <div class="col-xs-2 col-sm-2 col-md-2 text-center">\n            <span class="numberOfColumnsLabel ">\n              {{$ctrl.configuration.lines[$ctrl.configuration.activeLine -1].columns.length}}\n            </span>\n          </div>\n          <div class="col-xs-2 col-sm-2 col-md-2">\n            <button\n              class="btn btn-primary pull-left btnAddColumns"\n              ng-click="$ctrl.increaseNumberOfColumns()">\n              <i class="fa fa-plus fa-1x"></i>\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  ',
	  bindings: {
	    configuration: '=',
	    increaseNumberOfColumns: '&',
	    decreaseNumberOfColumns: '&'
	  },
	  controller: (_temp = _class = function StepOneCommandPanelController() {
	    _classCallCheck(this, StepOneCommandPanelController);
	  }, _class.$inject = [], _temp)
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _class, _temp;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var STEP_ONE_VISUAL_PANEL_COMPONENT_NAME = exports.STEP_ONE_VISUAL_PANEL_COMPONENT_NAME = 'stepOneVisualPanel';
	
	var StepOneVisualPanelComponent = exports.StepOneVisualPanelComponent = {
	  template: '\n  <div id="visualPanel">\n    <div  class="panel panel-default">\n      <div class="panel-heading">\n        <h3 class="panel-title">\n          <i class="fa fa-eye"></i>\n          &nbsp;\n          {{\'VISUAL_PANEL\' | translate}}\n        </h3>\n      </div>\n      <div class="panel-body">\n        <!-- lines / columns -->\n        <ul class="list-group">\n          <li\n            class="list-group-item"\n            ng-repeat="line in $ctrl.configuration.lines track by $index">\n            <!-- columns -->\n            <div ng-switch on="line.columns.length">\n              <div\n                class="row linesList"\n                ng-switch-when="1">\n                <div\n                  class="col-md-12 lineCommandButtons"\n                  ng-show="$ctrl.configuration.lines.length > 1">\n                  <button\n                    class="btn"\n                    ng-class="{\'btn-warning\':($index + 1) !== $ctrl.configuration.activeLine, \'btn-success\': ($index + 1) === $ctrl.configuration.activeLine}"\n                    ng-click="$ctrl.setActiveLineNumber({index: $index + 1})">\n                    <i\n                      class="fa"\n                      ng-class="{\'fa-square-o\': ($index + 1) !== $ctrl.configuration.activeLine, \'fa-check-square-o\': ($index + 1) === $ctrl.configuration.activeLine}">\n                    </i>\n                  </button>\n                </div>\n                <div class="col-md-12">\n                  <div class="col-md-12 well">\n                    <button class="btn btn-lg btn-block  btn-default disabled">\n                      {{line.columns[0].control.type !== \'none\'  ? line.columns[0].control.type + \' \' + line.columns[0].control.subtype || \'\' : \'column 1\'}}\n                    </button>\n                  </div>\n                </div>\n              </div>\n              <div\n                class="row linesList"\n                ng-switch-when="2">\n                <div\n                  class="col-md-12 lineCommandButtons"\n                  ng-show="$ctrl.configuration.lines.length > 1">\n                  <button\n                    class="btn"\n                    ng-class="{\'btn-warning\':($index + 1) !== $ctrl.configuration.activeLine, \'btn-success\': ($index + 1) === $ctrl.configuration.activeLine}"\n                    ng-click="$ctrl.setActiveLineNumber({index: $index + 1})">\n                    <i\n                      class="fa"\n                      ng-class="{\'fa-square-o\': ($index + 1) !== $ctrl.configuration.activeLine, \'fa-check-square-o\': ($index + 1) === $ctrl.configuration.activeLine}">\n                    </i>\n                  </button>\n                </div>\n                <div class="col-md-12">\n                  <div class="col-md-6 well">\n                    <button class="btn btn-lg btn-block  btn-default disabled">\n                      {{line.columns[0].control.type !== \'none\'  ? line.columns[0].control.type + \' \' + line.columns[0].control.subtype || \'\' : \'column 1\'}}\n                    </button>\n                  </div>\n                  <div class="col-md-6 well">\n                    <button class="btn btn-lg btn-block  btn-default disabled">\n                      {{line.columns[1].control.type !== \'none\'  ? line.columns[1].control.type + \' \' + line.columns[1].control.subtype || \'\' : \'column 2\'}}\n                    </button>\n                  </div>\n                </div>\n              </div>\n              <div\n                class="row linesList"\n                ng-switch-when="3">\n                <div\n                  class="col-md-12 lineCommandButtons"\n                  ng-show="$ctrl.configuration.lines.length > 1">\n                  <button\n                    class="btn"\n                    ng-class="{\'btn-warning\':($index + 1) !== $ctrl.configuration.activeLine, \'btn-success\': ($index + 1) === $ctrl.configuration.activeLine}"\n                    ng-click="$ctrl.setActiveLineNumber({index: $index + 1})">\n                    <i\n                      class="fa"\n                      ng-class="{\'fa-square-o\': ($index + 1) !== $ctrl.configuration.activeLine, \'fa-check-square-o\': ($index + 1) === $ctrl.configuration.activeLine}">\n                    </i>\n                  </button>\n                </div>\n                <div class="col-md-12">\n                  <div class="col-md-4 well">\n                    <button class="btn btn-lg btn-block  btn-default disabled">\n                      {{line.columns[0].control.type !== \'none\'  ? line.columns[0].control.type + \' \' + line.columns[0].control.subtype || \'\' : \'column 1\'}}\n                    </button>\n                  </div>\n                  <div class="col-md-4 well">\n                    <button class="btn btn-lg btn-block  btn-default disabled">\n                      {{line.columns[1].control.type !== \'none\'  ? line.columns[1].control.type + \' \' + line.columns[1].control.subtype || \'\' : \'column 2\'}}\n                    </button>\n                  </div>\n                  <div class="col-md-4 well">\n                    <button class="btn btn-lg btn-block  btn-default disabled">\n                      {{line.columns[2].control.type !== \'none\'  ? line.columns[2].control.type + \' \' + line.columns[2].control.subtype || \'\' : \'column 3\'}}\n                    </button>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n  ',
	  bindings: {
	    configuration: '=',
	    setActiveLineNumber: '&'
	  },
	  controller: (_temp = _class = function StepOneVisualPanelController() {
	    _classCallCheck(this, StepOneVisualPanelController);
	  }, _class.$inject = [], _temp)
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.stepTwoContentComponent = exports.LINE_STEP_TWO_CONTENT_COMPONENT = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class, _temp;
	
	var _mainStepTwoCommandPanel = __webpack_require__(37);
	
	var _mainStepTwoVisualPanel = __webpack_require__(38);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LINE_STEP_TWO_CONTENT_COMPONENT = exports.LINE_STEP_TWO_CONTENT_COMPONENT = 'stepTwoContent';
	
	var stepTwoContentComponent = exports.stepTwoContentComponent = {
	  template: '\n  <div\n    class="animate-switch"\n    ng-switch-when="second">\n    <div class="col-md-4">\n      <step-two-command-panel></step-two-command-panel>\n    </div>\n    <div class="col-md-8">\n      <step-two-visual-panel\n        configuration="$ctrl.configuration"\n        set-active-line-number="$ctrl.setActiveLineNumberParent(index)"\n        show-modal-add-ctrl-to-column="$ctrl.showModalAddCtrlToColumnParent(size, indexLine, numcolumn)">\n      </step-two-visual-panel>\n    </div>\n  </div>\n  ',
	  bindings: {
	    configuration: '=',
	    setActiveLineNumber: '&',
	    showModalAddCtrlToColumn: '&'
	  },
	  controller: (_temp = _class = function () {
	    function stepTwoContentController() {
	      _classCallCheck(this, stepTwoContentController);
	    }
	    //
	
	    ///////////////////////////////////
	    // WHY this function is needed :
	    ///////////////////////////////////
	    // CASE OF :  function with parameter passing from parent to caller through another level component
	    //            parent -> intermediate component (here) -> caller
	    // NOTE : intermediate should call parent function to be sure to pass function parameter upward to parent
	
	
	    _createClass(stepTwoContentController, [{
	      key: 'setActiveLineNumberParent',
	      value: function setActiveLineNumberParent(index) {
	        this.setActiveLineNumber({ index: index });
	      }
	
	      // Needed for same reason as setActiveLineNumberParent
	
	    }, {
	      key: 'showModalAddCtrlToColumnParent',
	      value: function showModalAddCtrlToColumnParent(size, indexLine, numcolumn) {
	        this.showModalAddCtrlToColumn({
	          size: size,
	          indexLine: indexLine,
	          numcolumn: numcolumn
	        });
	      }
	    }]);
	
	    return stepTwoContentController;
	  }(), _class.$inject = [], _temp)
	};
	
	var STEP_TWO_CONTENT_COMPONENT_MODULE = 'stepway.stepTwoContent.module';
	
	exports.default = angular.module(STEP_TWO_CONTENT_COMPONENT_MODULE, []).component(LINE_STEP_TWO_CONTENT_COMPONENT, stepTwoContentComponent).component(_mainStepTwoCommandPanel.STEP_TWO_COMMAND_PANEL_COMPONENT_NAME, _mainStepTwoCommandPanel.StepTwoCommandPanelComponent).component(_mainStepTwoVisualPanel.STEP_TWO_VISUAL_PANEL_COMPONENT_NAME, _mainStepTwoVisualPanel.StepTwoVisualPanelComponent);

/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _class, _temp;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var STEP_TWO_COMMAND_PANEL_COMPONENT_NAME = exports.STEP_TWO_COMMAND_PANEL_COMPONENT_NAME = 'stepTwoCommandPanel';
	
	var StepTwoCommandPanelComponent = exports.StepTwoCommandPanelComponent = {
	  template: '\n  <div id="commandPanel">\n    <div  class="panel panel-default">\n      <div class="panel-heading">\n        <h3 class="panel-title">\n          <i class="fa fa-keyboard-o"></i>\n          &nbsp;\n          {{\'COMMAND_PANEL\' | translate}}\n        </h3>\n      </div>\n      <div class="panel-body">\n        <div class="row">\n          <div class="col-md-12">\n            <h4 class="numberOfcolumsText text-center">\n              - {{\'APPLY_CTRL2COL\' | translate}} -\n            </h4>\n          </div>\n        </div>\n        <div class="row">\n          <div class="col-lg-12" >\n            <hr/>\n            <blockquote>\n              <p class="numberOfcolumsText">\n                <i class="fa fa-minus"></i>\n                &nbsp;\n                {{\'CLIC_TAP_2_OPEN\' | translate}}.\n              </p>\n              <p class="numberOfcolumsText">\n                <i class="fa fa-minus"></i>\n                &nbsp;\n                {{\'SELECT_2_APPLY_COL\' | translate}}.\n              </p>\n          </blockquote>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  ',
	  bindings: {},
	  controller: (_temp = _class = function StepTwoCommandPanelController() {
	    //
	
	    _classCallCheck(this, StepTwoCommandPanelController);
	  }, _class.$inject = [], _temp)
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
	
	var STEP_TWO_VISUAL_PANEL_COMPONENT_NAME = exports.STEP_TWO_VISUAL_PANEL_COMPONENT_NAME = 'stepTwoVisualPanel';
	
	var StepTwoVisualPanelComponent = exports.StepTwoVisualPanelComponent = {
	  template: '\n  <div id="visualPanel">\n    <div class="panel panel-default">\n    <div class="panel-heading">\n      <h3 class="panel-title">\n        <i class="fa fa-eye"></i>\n        &nbsp;\n        {{\'VISUAL_PANEL\' | translate}}\n      </h3>\n    </h3>\n    </div>\n    <div class="panel-body">\n      <!-- lines / columns -->\n      <ul class="list-group">\n        <li\n          class="list-group-item"\n          ng-repeat="line in $ctrl.configuration.lines track by $index">\n            <!-- columns -->\n            <div ng-switch on="line.columns.length">\n              <div\n                class="row linesList"\n                ng-switch-when="1">\n                <div\n                  class="col-md-12 lineCommandButtons"\n                  ng-show="$ctrl.configuration.lines.length > 1">\n                  <button\n                    class="btn"\n                    ng-class="{\'btn-warning\':($index + 1) !== $ctrl.configuration.activeLine, \'btn-success\': ($index + 1) === $ctrl.configuration.activeLine}"\n                    ng-click="$ctrl.setActiveLineNumber({index: $index + 1})">\n                    <i\n                      class="fa"\n                      ng-class="{\'fa-square-o\': ($index + 1) !== $ctrl.configuration.activeLine, \'fa-check-square-o\': ($index + 1) === $ctrl.configuration.activeLine}">\n                    </i>\n                  </button>\n                </div>\n                <div class="col-md-12">\n                  <div class="col-md-12 well">\n                    <button\n                      class="btn btn-lg btn-block"\n                      ng-class="{\'btn-primary\': !line.columns[0].control.edited, \'btn-success\': line.columns[0].control.edited}"\n                      ng-click="$ctrl.showModalAddCtrlToColumn({size: \'\', indexLine: $index, numcolumn: 0})">\n                      {{line.columns[0].control.type !== \'none\'  ? line.columns[0].control.type + \' \' + line.columns[0].control.subtype || \'\' : \'column 1\'}}\n                    </button>\n                  </div>\n                </div>\n              </div>\n              <div\n                class="row linesList"\n                ng-switch-when="2">\n                <div\n                  class="col-md-12 lineCommandButtons"\n                  ng-show="$ctrl.configuration.lines.length > 1">\n                  <button\n                    class="btn"\n                    ng-class="{\'btn-warning\':($index + 1) !== $ctrl.configuration.activeLine, \'btn-success\': ($index + 1) === $ctrl.configuration.activeLine}"\n                    ng-click="$ctrl.setActiveLineNumber({index: $index + 1})">\n                    <i\n                      class="fa"\n                      ng-class="{\'fa-square-o\': ($index + 1) !== $ctrl.configuration.activeLine, \'fa-check-square-o\': ($index + 1) === $ctrl.configuration.activeLine}">\n                    </i>\n                  </button>\n                </div>\n                <div class="col-md-12">\n                  <div class="col-md-6 well">\n                    <button\n                      class="btn btn-lg btn-block"\n                      ng-class="{\'btn-primary\': !line.columns[0].control.edited, \'btn-success\': line.columns[0].control.edited}"\n                      ng-click="$ctrl.showModalAddCtrlToColumn({size: \'\', indexLine: $index, numcolumn: 0})">\n                      {{line.columns[0].control.type !== \'none\'  ? line.columns[0].control.type + \' \' + line.columns[0].control.subtype || \'\' : \'column 1\'}}\n                    </button>\n                  </div>\n                  <div class="col-md-6 well">\n                    <button\n                      class="btn btn-lg btn-block"\n                      ng-class="{\'btn-primary\': !line.columns[1].control.edited, \'btn-success\': line.columns[1].control.edited}"\n                      ng-click="$ctrl.showModalAddCtrlToColumn({size: \'\', indexLine: $index, numcolumn: 1})">\n                      {{line.columns[1].control.type !== \'none\'  ? line.columns[1].control.type + \' \' + line.columns[1].control.subtype || \'\' : \'column 2\'}}\n                    </button>\n                  </div>\n                </div>\n              </div>\n              <div\n                class="row linesList"\n                ng-switch-when="3">\n                <div\n                  class="col-md-12 lineCommandButtons"\n                  ng-show="$ctrl.configuration.lines.length > 1">\n                  <button\n                    class="btn"\n                    ng-class="{\'btn-warning\':($index + 1) !== $ctrl.configuration.activeLine, \'btn-success\': ($index + 1) === $ctrl.configuration.activeLine}"\n                    ng-click="$ctrl.setActiveLineNumber({index: $index + 1})">\n                    <i\n                      class="fa"\n                      ng-class="{\'fa-square-o\': ($index + 1) !== $ctrl.configuration.activeLine, \'fa-check-square-o\': ($index + 1) === $ctrl.configuration.activeLine}">\n                    </i>\n                  </button>\n                </div>\n                <div class="col-md-12">\n                  <div class="col-md-4 well">\n                    <button\n                      class="btn btn-lg btn-block"\n                      ng-class="{\'btn-primary\': !line.columns[0].control.edited, \'btn-success\': line.columns[0].control.edited}"\n                      ng-click="$ctrl.showModalAddCtrlToColumn({size: \'\', indexLine: $index, numcolumn: 0})">\n                      {{line.columns[0].control.type !== \'none\'  ? line.columns[0].control.type + \' \' + line.columns[0].control.subtype || \'\' : \'column 1\'}}\n                    </button>\n                  </div>\n                  <div class="col-md-4 well">\n                    <button\n                      class="btn btn-lg btn-block"\n                      ng-class="{\'btn-primary\': !line.columns[1].control.edited, \'btn-success\': line.columns[1].control.edited}"\n                      ng-click="$ctrl.showModalAddCtrlToColumn({size: \'\', indexLine: $index, numcolumn: 1})">\n                      {{line.columns[1].control.type !== \'none\'  ? line.columns[1].control.type + \' \' + line.columns[1].control.subtype || \'\' : \'column 2\'}}\n                    </button>\n                  </div>\n                  <div class="col-md-4 well">\n                    <button\n                      class="btn btn-lg btn-block"\n                      ng-class="{\'btn-primary\': !line.columns[2].control.edited, \'btn-success\': line.columns[2].control.edited}"\n                      ng-click="$ctrl.showModalAddCtrlToColumn({size: \'\', indexLine: $index, numcolumn: 2})">\n                      {{line.columns[2].control.type !== \'none\'  ? line.columns[2].control.type + \' \' + line.columns[2].control.subtype || \'\' : \'column 3\'}}\n                    </button>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n  ',
	  bindings: {
	    configuration: '=',
	    setActiveLineNumber: '&',
	    showModalAddCtrlToColumn: '&'
	  },
	  controller: (_temp = _class = function StepTwoVisualPanelController() {
	    //
	
	    _classCallCheck(this, StepTwoVisualPanelController);
	  }, _class.$inject = [], _temp)
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.stepThreeContentComponent = exports.LINE_STEP_THREE_CONTENT_COMPONENT = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class, _temp;
	
	var _mainStepThreeCommandPanel = __webpack_require__(40);
	
	var _mainStepThreeVisualPanel = __webpack_require__(41);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LINE_STEP_THREE_CONTENT_COMPONENT = exports.LINE_STEP_THREE_CONTENT_COMPONENT = 'stepThreeContent';
	
	var stepThreeContentComponent = exports.stepThreeContentComponent = {
	  template: '\n  <div\n    class="animate-switch"\n    ng-switch-when="third">\n    <div class="col-md-4">\n      <step-three-command-panel\n        configuration="$ctrl.configuration"\n        save-this-form="$ctrl.saveThisForm()">\n      </step-three-command-panel>\n    </div>\n    <div class="col-md-8">\n      <step-three-visual-panel\n        configuration="$ctrl.configuration"\n        eda-data-model="$ctrl.edaDataModel"\n        wf-form-fields="$ctrl.wfFormFields"\n        on-submit="$ctrl.onSubmit()">\n      </step-three-visual-panel>\n    </div>\n  </div>\n  ',
	  bindings: {
	    configuration: '=',
	    edaDataModel: '=',
	    wfFormFields: '=',
	    onSubmit: '&',
	    saveThisForm: '&'
	  },
	  controller: (_temp = _class = function () {
	    function stepThreeContentController() {
	      //
	
	      _classCallCheck(this, stepThreeContentController);
	    }
	
	    _createClass(stepThreeContentController, [{
	      key: '$onInit',
	      value: function $onInit() {
	        // console.log('stepThreeContentComponent init, edaDataModel: ', this.edaDataModel);
	      }
	    }, {
	      key: '$onChange',
	      value: function $onChange(changesObj) {
	        // console.log('stepThreeContentComponent onChange, changesObj: ', changesObj);
	      }
	    }]);
	
	    return stepThreeContentController;
	  }(), _class.$inject = [], _temp)
	};
	
	var STEP_THREE_CONTENT_COMPONENT_MODULE = 'stepway.stepThreeContent.module';
	
	exports.default = angular.module(STEP_THREE_CONTENT_COMPONENT_MODULE, []).component(LINE_STEP_THREE_CONTENT_COMPONENT, stepThreeContentComponent).component(_mainStepThreeCommandPanel.STEP_THREE_COMMAND_PANEL_COMPONENT_NAME, _mainStepThreeCommandPanel.StepThreeCommandPanelComponent).component(_mainStepThreeVisualPanel.STEP_THREE_VISUAL_PANEL_COMPONENT_NAME, _mainStepThreeVisualPanel.StepThreeVisualPanelComponent);

/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _class, _temp;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var STEP_THREE_COMMAND_PANEL_COMPONENT_NAME = exports.STEP_THREE_COMMAND_PANEL_COMPONENT_NAME = 'stepThreeCommandPanel';
	
	var StepThreeCommandPanelComponent = exports.StepThreeCommandPanelComponent = {
	  template: '\n  <div id="commandPanel" ng-if="!$ctrl.configuration.isWizard">\n    <div  class="panel panel-default">\n      <div class="panel-heading">\n        <h3 class="panel-title">\n          <i class="fa fa-keyboard-o"></i>\n          &nbsp;\n          {{\'COMMAND_PANEL\' | translate}}\n        </h3>\n      </div>\n      <div class="panel-body">\n        <div class="row">\n          <div class="col-xs-12">\n            <div class="form-group">\n              <label\n                for="inputSubmitButtontext"\n                class=" greyText control-label">\n                {{\'CUSTOM_SUBMIT_BTN\' | translate}} :\n              </label>\n              <div class="">\n                <input\n                  type="text"\n                  class="form-control"\n                  id="inputSubmitButtontext"\n                  placeholder=""\n                  ng-model="$ctrl.configuration.submitButtonText">\n              </div>\n            </div>\n          </div>\n        </div>\n        <hr/>\n        <div class="row">\n          <div class="col-xs-12">\n            <div class="form-group">\n              <label\n                for="inputCancelButtontext"\n                class=" greyText control-label">\n                {{\'CUSTOM_CANCEL_BTN\' | translate}} :\n              </label>\n              <div class="">\n                <input\n                  type="text"\n                  class="form-control"\n                  id="inputCancelButtontext"\n                  placeholder=""\n                  ng-model="$ctrl.configuration.cancelButtonText">\n              </div>\n            </div>\n          </div>\n        </div>\n        <hr/>\n        <div class="row">\n          <div class="col-xs-12">\n            <div class="form-group">\n              <label\n                for="inputNameFormtext"\n                class=" greyText control-label">\n                {{\'NAME_THIS_FORM\' | translate}} :\n              </label>\n              <div class="">\n                <input\n                  type="text"\n                  class="form-control"\n                  id="inputNameFormtext"\n                  placeholder=""\n                  ng-model="$ctrl.configuration.formName">\n              </div>\n            </div>\n          </div>\n        </div>\n        <button\n          class="btn btn-primary btn-block btn-lg"\n          ng-click="$ctrl.saveThisForm()">\n          {{\'SAVE_THIS_FORM\' | translate}}\n        </button>\n      </div>\n    </div>\n  </div>\n  ',
	  bindings: {
	    configuration: '=',
	    saveThisForm: '&'
	  },
	  controller: (_temp = _class = function StepThreeCommandPanelController() {
	    //
	
	    _classCallCheck(this, StepThreeCommandPanelController);
	  }, _class.$inject = [], _temp)
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class, _temp;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var STEP_THREE_VISUAL_PANEL_COMPONENT_NAME = exports.STEP_THREE_VISUAL_PANEL_COMPONENT_NAME = 'stepThreeVisualPanel';
	
	var StepThreeVisualPanelComponent = exports.StepThreeVisualPanelComponent = {
	  template: '\n  <div id="visualPanel">\n    <div class="panel panel-default">\n      <div class="panel-heading">\n        <h3 class="panel-title">\n          <i class="fa fa-thumbs-o-up"></i>\n          &nbsp;\n          {{\'FINAL_STEP\' | translate}}\n        </h3>\n      </div>\n      <div class="panel-body">\n        <form ng-submit="vizPanel.onSubmit()">\n          <formly-form\n            id="saveFormlyFom"\n            model="vizPanel.edaDataModel"\n            fields="vizPanel.wfFormFields">\n            <span class="pull-right">\n            <button\n              class="btn btn-primary"\n              type="submit">\n              {{vizPanel.configuration.submitButtonText}}\n            </button>\n            <button\n              class="btn btn-primary"\n              type="cancel">\n              {{vizPanel.configuration.cancelButtonText}}\n            </button>\n            </span>\n          </formly-form>\n        </form>\n      </div>\n    </div>\n  </div>\n  ',
	  controllerAs: 'vizPanel',
	  bindings: {
	    configuration: '=',
	    edaDataModel: '=',
	    wfFormFields: '=',
	    onSubmit: '&'
	  },
	  controller: (_temp = _class = function () {
	    function StepThreeVisualPanelController() {
	      //
	
	      _classCallCheck(this, StepThreeVisualPanelController);
	    }
	
	    _createClass(StepThreeVisualPanelController, [{
	      key: '$onInit',
	      value: function $onInit() {
	        // console.log('stepThreeVisualPanel init, edaDataModel: ', this.edaDataModel);
	      }
	    }]);
	
	    return StepThreeVisualPanelController;
	  }(), _class.$inject = [], _temp)
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stepwayWizard = __webpack_require__(43);
	
	var _stepwayWizard2 = _interopRequireDefault(_stepwayWizard);
	
	var _stepwayWizard3 = __webpack_require__(45);
	
	var _stepwayWizard4 = _interopRequireDefault(_stepwayWizard3);
	
	var _stepwayWizard5 = __webpack_require__(47);
	
	var _stepwayWizard6 = _interopRequireDefault(_stepwayWizard5);
	
	var _stepwayWizardAddStepContent = __webpack_require__(48);
	
	var _stepwayWizardAddStepContent2 = _interopRequireDefault(_stepwayWizardAddStepContent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var STEP_WAY_WIZARD_MODULE = 'easyWizardFormStepwayModule';
	
	var TO_INJECT = [_stepwayWizardAddStepContent2.default.name, 'mgo-angular-wizard'];
	
	exports.default = angular.module(STEP_WAY_WIZARD_MODULE, TO_INJECT).controller(_stepwayWizard.STEP_WAY_WIZARD_CONTROLLER_NAME, _stepwayWizard2.default).directive(_stepwayWizard3.STEP_WAY_WIZARD_DIRECTIVE_NAME, _stepwayWizard4.default).provider(_stepwayWizard5.EASY_WIZARD_FORM_STEP_WAY_CONFIG_NAME, _stepwayWizard6.default);

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.STEP_WAY_WIZARD_CONTROLLERAS_NAME = exports.STEP_WAY_WIZARD_CONTROLLER_NAME = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _stepwayWizardController = __webpack_require__(44);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var STEP_WAY_WIZARD_CONTROLLER_NAME = 'edaStepWayEasyWizardFormGenController';
	var STEP_WAY_WIZARD_CONTROLLERAS_NAME = 'vm';
	
	var edaStepWayEasyWizardFormGenController = function () {
	  function edaStepWayEasyWizardFormGenController(WizardHandler, easyFormGenVersion, $filter, toaster, $timeout, $uibModal, $log, easyWizardFormStepWayConfig) {
	    _classCallCheck(this, edaStepWayEasyWizardFormGenController);
	
	    this.easyFormGenVersion = easyFormGenVersion;
	    this.$filter = $filter;
	    this.toaster = toaster;
	    this.$timeout = $timeout;
	    this.$modal = $uibModal;
	    this.$log = $log;
	    this.easyWizardFormStepWayConfig = easyWizardFormStepWayConfig;
	    this.wizardHandler = WizardHandler;
	
	    this.init();
	  }
	
	  _createClass(edaStepWayEasyWizardFormGenController, [{
	    key: 'init',
	    value: function init() {
	      this.dataModel = {};
	      this.easyFormGeneratorVERSION = this.easyFormGenVersion;
	      this.debug = (0, _stepwayWizardController.initDebugModel)();
	      this.tab = (0, _stepwayWizardController.initTabModel)(this.easyWizardFormStepWayConfig.isPreviewPanelVisible(), this.easyWizardFormStepWayConfig.arePreviewModelsVisible());
	      this.configuration = {}; //configuration model (contains array of lines which contains array of columns)
	      this.nyaSelect = {};
	      this.editControlModalSize = 'lg';
	      this.previewLoadedForm = {
	        fieldsModel: []
	      };
	      this.configurationLoaded = {};
	      this.returnSaveEvent = false;
	      this.configuration.steps = this.configuration.steps || [];
	      this.configuration.steps.push({
	        easyFormGeneratorModel: {}
	      });
	    }
	  }, {
	    key: 'onSubmit',
	    value: function onSubmit() {
	      this.toaster.pop({
	        type: 'info',
	        timeout: 2000,
	        title: 'it should save data model if it were not in editor',
	        showCloseButton: true
	      });
	      return true;
	    }
	  }, {
	    key: 'leftThisStep',
	    value: function leftThisStep(indexStep) {
	      if (indexStep > -1) {
	        if (this.configuration.steps[indexStep - 1]) {
	          var currentStepObj = this.configuration.steps[indexStep];
	          this.configuration.steps.splice(indexStep, 1);
	          this.configuration.steps.splice(indexStep - 1, 0, currentStepObj);
	          this.wizard.goTo(indexStep - 1);
	        }
	      }
	    }
	  }, {
	    key: 'rightThisStep',
	    value: function rightThisStep(indexStep) {
	      if (indexStep > -1) {
	        if (this.configuration.steps[indexStep + 1]) {
	          var currentStepObj = this.configuration.steps[indexStep];
	          this.configuration.steps.splice(indexStep, 1);
	          this.configuration.steps.splice(indexStep + 1, 0, currentStepObj);
	          this.wizard.goTo(indexStep + 1);
	        }
	      }
	    }
	  }, {
	    key: 'addNewstep',
	    value: function addNewstep() {
	      this.configuration.steps = this.configuration.steps || [];
	      this.configuration.steps.push({
	        easyFormGeneratorModel: {}
	      });
	      this.wizard.goTo(this.configuration.steps.length - 1);
	    }
	  }, {
	    key: 'removeThisStep',
	    value: function removeThisStep(index) {
	      if (index > -1) {
	        if (this.configuration.steps.length > 1) {
	          this.configuration.steps.splice(index, 1);
	          this.wizard.goTo(Math.max(index - 1, 0));
	        } else {
	          this.$timeout(function () {
	            this.toaster.pop({
	              type: 'warning',
	              title: 'Last step',
	              body: 'Can\'t delete the last step',
	              showCloseButton: true
	            });
	          }, 100);
	        }
	      }
	    }
	
	    // previewExistingform(formlyform) {
	    //   const configlines = JSON.parse(formlyform.formlyField);
	    //   //here to replace with $scope.configuration : initialise configuration with lines
	    //   this.configurationLoaded = {};
	    //   this.$formlyProxy.bindConfigurationLines(this.configurationLoaded,configlines);
	    //   this.$formlyProxy.applyConfigurationToformlyModel(this.configurationLoaded, this.previewLoadedForm.fieldsModel, this.dataModel);
	    //   this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
	    //   this.previewLoadedForm.cancelButtonText = formlyform.cancelButtonText;
	    //   this.previewLoadedForm.submitButtonText = formlyform.submitButtonText;
	    // }
	
	
	  }, {
	    key: 'saveThisForm',
	    value: function saveThisForm() {
	      this.toaster.pop({
	        type: 'wait',
	        timeout: 3000,
	        title: ': Form is being saved',
	        body: 'Fake for demo: Wait.',
	        showCloseButton: true
	      });
	      this.returnSaveEvent = true;
	      return true;
	    }
	  }, {
	    key: 'wizard',
	    get: function get() {
	      this.wizardInstance = this.wizardInstance || this.wizardHandler.wizard();
	      return this.wizardInstance;
	    }
	  }]);
	
	  return edaStepWayEasyWizardFormGenController;
	}();
	
	var toInject = ['WizardHandler', 'easyFormGenVersion', '$filter', 'toaster', '$timeout', '$uibModal', '$log', 'easyWizardFormStepWayConfig'];
	
	edaStepWayEasyWizardFormGenController.$inject = toInject;
	exports.default = edaStepWayEasyWizardFormGenController;
	exports.STEP_WAY_WIZARD_CONTROLLER_NAME = STEP_WAY_WIZARD_CONTROLLER_NAME;
	exports.STEP_WAY_WIZARD_CONTROLLERAS_NAME = STEP_WAY_WIZARD_CONTROLLERAS_NAME;

/***/ },
/* 44 */
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
	    }
	  }]
	};
	var initLineTemplate = function initLineTemplate() {
	  return angular.copy(LINE_TEMPLATE);
	};
	
	exports.initDebugModel = initDebugModel;
	exports.initTabModel = initTabModel;
	exports.initColumnTemplate = initColumnTemplate;
	exports.initLineTemplate = initLineTemplate;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.STEP_WAY_WIZARD_DIRECTIVE_NAME = undefined;
	
	var _stepwayWizardTemplate = __webpack_require__(46);
	
	var _stepwayWizardTemplate2 = _interopRequireDefault(_stepwayWizardTemplate);
	
	var _stepwayWizard = __webpack_require__(43);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var STEP_WAY_WIZARD_DIRECTIVE_NAME = 'edaStepWayEasyWizardFormGen';
	
	function edaStepWayEasyWizardFormGenDirective() {
	
	  var directive = {
	    restrict: 'E',
	    scope: {
	      edaEasyFormGeneratorModel: '=',
	      edaSaveFormEvent: '&edaSaveFormEvent'
	    },
	    controller: _stepwayWizard.STEP_WAY_WIZARD_CONTROLLER_NAME,
	    controllerAs: _stepwayWizard.STEP_WAY_WIZARD_CONTROLLERAS_NAME,
	    replace: false,
	    template: _stepwayWizardTemplate2.default,
	    link: linkFct
	  };
	  return directive;
	
	  function linkFct(scope) {
	
	    scope.$watch(function () {
	      return scope.edaEasyFormGeneratorModel;
	    }, function () {
	      return loadExistingConfigurationModel();
	    }, true);
	
	    //watch "scope.vm.returnSaveEvent"" = catch saving form eventscope.vm.wfFormFieldsOnlyNeededProperties = angular.copy(scope.vm.wfFormFields);
	    scope.$watch(function () {
	      return scope.vm.returnSaveEvent;
	    }, function (newValue) {
	      if (newValue === true) {
	
	        var _easyFormGeneratorModel = scope.vm.configuration.steps.map(function (step) {
	          var easyFormGeneratorModel = step.easyFormGeneratorModel;
	          easyFormGeneratorModel.formlyFieldsModel.forEach(function (model) {
	            delete model.formControl;
	          });
	          return {
	            formName: step.title,
	            // btnSubmitText: easyFormGeneratorModel.configuration.submitButtonText,
	            // btnCancelText: easyFormGeneratorModel.configuration.cancelButtonText,
	            edaFieldsModel: easyFormGeneratorModel.edaFieldsModel,
	            edaFieldsModelStringified: easyFormGeneratorModel.edaFieldsModelStringified,
	            formlyFieldsModel: easyFormGeneratorModel.formlyFieldsModel,
	            dataModel: easyFormGeneratorModel.dataModel
	          };
	        });
	
	        scope.edaSaveFormEvent({
	          edaEasyFormGeneratorModel: _easyFormGeneratorModel
	        });
	        //back to false, waiting next save event
	        scope.vm.returnSaveEvent = false;
	      }
	    });
	
	    function loadExistingConfigurationModel() {
	      var steps = scope.edaEasyFormGeneratorModel.map(function (step) {
	        var item = {
	          title: step.formName,
	          easyFormGeneratorModel: {
	            configuration: step.configuration,
	            edaFieldsModel: step.edaFieldsModel,
	            edaFieldsModelStringified: step.edaFieldsModelStringified,
	            formlyFieldsModel: step.formlyFieldsModel,
	            dataModel: step.dataModel,
	            loaded: {
	              configuration: step.configuration,
	              edaFieldsModel: step.edaFieldsModel,
	              edaFieldsModelStringified: step.edaFieldsModelStringified,
	              formlyFieldsModel: step.formlyFieldsModel,
	              dataModel: step.dataModel
	            }
	          }
	        };
	        return item;
	      });
	      scope.vm.configuration.steps = steps;
	    }
	  }
	}
	
	edaStepWayEasyWizardFormGenDirective.$inject = [];
	
	exports.default = edaStepWayEasyWizardFormGenDirective;
	exports.STEP_WAY_WIZARD_DIRECTIVE_NAME = STEP_WAY_WIZARD_DIRECTIVE_NAME;

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = "<section id=\"pageWfEdit\">\n  <div ng-init=\"\">\n    <div class=\"container\">\n      <section id=\"preview\">\n        <div id=\"preview-content\">\n          <div class=\"content-container\">\n            <!-- taoster alert -->\n            <toaster-container\n              toaster-options=\"{\n                'position-class': 'toast-top-full-width',\n                'extendedTimeout':500,\n                'timeOut':500\n              }\">\n            </toaster-container>\n            <uib-tabset justified=\"true\">\n              <uib-tab active=\"vm.tab.editTab.active\" heading=\"{{'EDIT_TAB' | translate}}\">\n                <div class=\"row\">\n                  <add-step-content configuration=\"vm.configuration\" \n                    add-newstep=\"vm.addNewstep()\" \n                    save-this-form=\"vm.saveThisForm()\"\n                    remove-this-step=\"vm.removeThisStep(index)\"\n                    right-this-step=\"vm.rightThisStep(index)\" \n                    left-this-step=\"vm.leftThisStep(index)\">\n                  </add-step-content>\n                </div>\n              </uib-tab>\n              <uib-tab active=\"vm.tab.previewTab.active\" ng-if=\"vm.tab.previewTab.tabVisible\" heading=\"{{'PREVIEW_TAB' | translate}}\">\n                <div class=\"panel panel-default\">\n                  <div class=\"panel-body\">\n                    <!-- formly here -->\n                    \n                      <wizard edit-mode=\"true\" indicators-position=\"top\" on-finish=\"finishedWizard()\">\n                        <wz-step wz-title=\"{{vm.configuration.steps[$index].title}}\" ng-repeat=\"step in vm.configuration.steps track by $index\">\n                          <formly-form model=\"vm.dataModel\" fields=\"vm.configuration.steps[$index].easyFormGeneratorModel.formlyFieldsModel\">\n                            <span class=\"pull-right\">\n                            <button class=\"btn btn-primary\" ng-if=\"$index > 0\" wz-previous>\n                                <i class=\"fa fa-arrow-left fa-2x pull-left\"></i>\n                                <span class=\"pull-right ng-binding\">\n                                  Previous\n                                </span>\n                            </button>\n                            <button class=\"btn btn-primary\" ng-if=\"$index < vm.configuration.steps.length - 1\" wz-next>\n                                <i class=\"fa fa-arrow-right fa-2x pull-left\"></i>\n                                <span class=\"pull-right ng-binding\">\n                                  Next\n                                </span>\n                              </button>\n                              <button class=\"btn btn-primary\" ng-if=\"$index == vm.configuration.steps.length - 1\" \n                              type=\"Submit\">            \n                              <i class=\"fa fa-save fa-2x pull-left\"></i>                    \n                                <span class=\"pull-right ng-binding\">\n                                  Submit\n                                </span>\n                              </button>\n                            </span>\n                          </formly-form>\n                        </wz-step>\n                      </wizard>\n                    \n                  </div>\n                </div>\n                <div ng-if=\"vm.tab.previewTab.modelsVisible\" class=\"panel panel-default\">\n                  <div class=\"panel-body\">\n                    <p>{{'DATA_MODEL' | translate}}</p>\n                    <pre>\n                      {{vm.dataModel | json}}\n                    </pre>\n                  </div>\n                </div>\n                <div ng-if=\"vm.tab.previewTab.modelsVisible\" class=\"panel panel-default\">\n                  <div class=\"panel-body\">\n                    <p>{{'FIELDS_MODEL' | translate}}</p>\n                    <pre>\n                      {{vm | json}}                      \n                    </pre>\n                  </div>\n                </div>\n              </uib-tab>\n            </uib-tabset>\n          </div>\n        </div>\n      </section>\n      <hr/>\n    </div>\n  </div>\n</section>"

/***/ },
/* 47 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var EASY_WIZARD_FORM_STEP_WAY_CONFIG_NAME = 'easyWizardFormStepWayConfig';
	
	function easyWizardFormStepWayConfig($translateProvider) {
	  var _configuration = defaultConfig();
	  var _defaultLanguage = getDefaultLanguage();
	  var _currentLanguage = initDefaultLanguage();
	  var _showPreviewPanel = getDefaultshowPreviewPanel();
	  var _showPreviewModels = getDefaultShowPreviewModel();
	
	  this.$get = easyFormStepWayConfigGET;
	  this.configuration = _configuration;
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
	  // function controlsList() {
	  //   const controls = [
	  //     {name: 'empty',           enabled: true},
	  //     {name: 'Header',           enabled: true},
	  //     {name: 'Subtitle',         enabled: true},
	  //     {name: 'TextInput',       enabled: true},
	  //     {name: 'Password',         enabled: true},
	  //     {name: 'Email',           enabled: true},
	  //     {name: 'IpAdress',         enabled: true},
	  //     {name: 'Date',             enabled: true},
	  //     {name: 'Texarea',           enabled: true},
	  //     {name: 'RichTextEditor',   enabled: true},
	  //     {name: 'Radio',           enabled: true},
	  //     {name: 'Checkbox',         enabled: true},
	  //     {name: 'BasicSelect',     enabled: true},
	  //     {name: 'GroupedSelect',   enabled: true}
	  //   ];
	  //   return controls;
	  // }
	
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
	
	  //$get implementation :
	  easyFormStepWayConfigGET.$inject = ['$translate'];
	  function easyFormStepWayConfigGET($translate) {
	
	    var service = {
	      setLanguage: switchLanguage,
	      getCurrentLanguage: getCurrentLanguage,
	      isPreviewPanelVisible: isPreviewPanelVisible,
	      arePreviewModelsVisible: arePreviewModelsVisible
	    };
	    return service;
	
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
	
	easyWizardFormStepWayConfig.$inject = ['$translateProvider'];
	exports.default = easyWizardFormStepWayConfig;
	exports.EASY_WIZARD_FORM_STEP_WAY_CONFIG_NAME = EASY_WIZARD_FORM_STEP_WAY_CONFIG_NAME;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stepwayWizardAddStepContent = __webpack_require__(49);
	
	var _stepwayWizardAddStepCommandPanel = __webpack_require__(50);
	
	var _stepwayWizardAddStepVisualPanel = __webpack_require__(51);
	
	var ADD_STEP_CONTENT_COMPONENT_MODULE = 'stepway.addStepContent.module';
	
	exports.default = angular.module(ADD_STEP_CONTENT_COMPONENT_MODULE, []).component(_stepwayWizardAddStepContent.ADD_STEP_CONTENT_COMPONENT, _stepwayWizardAddStepContent.addStepContentComponent).component(_stepwayWizardAddStepCommandPanel.ADD_STEP_COMMAND_PANEL_COMPONENT_NAME, _stepwayWizardAddStepCommandPanel.AddStepCommandPanelComponent).component(_stepwayWizardAddStepVisualPanel.ADD_STEP_VISUAL_PANEL_COMPONENT_NAME, _stepwayWizardAddStepVisualPanel.AddStepVisualPanelComponent);

/***/ },
/* 49 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ADD_STEP_CONTENT_COMPONENT = 'addStepContent';
	
	var addStepContentComponent = exports.addStepContentComponent = {
	  template: '\n  <div>\n    <div class="col-md-4">\n      <add-step-command-panel\n        configuration="$ctrl.configuration"\n        add-newstep="$ctrl.addNewstep()"\n        save-this-form="$ctrl.saveThisFormParent(event)">\n      </add-step-command-panel>\n    </div>\n    <div class="col-md-8">\n      <add-step-visual-panel\n        configuration="$ctrl.configuration"\n        set-active-step-number="$ctrl.setActiveStepNumberParent(index)"\n        remove-this-step="$ctrl.removeThisStepParent(index)"\n        right-this-step="$ctrl.rightThisStepParent(index)"\n        left-this-step="$ctrl.leftThisStepParent(index)">\n      </add-step-visual-panel>\n    </div>\n  </div>\n  ',
	  bindings: {
	    configuration: '=',
	    addNewstep: '&',
	    setActiveStepNumber: '&',
	    removeThisStep: '&',
	    rightThisStep: '&',
	    leftThisStep: '&',
	    saveThisForm: '&'
	  },
	  controller: function () {
	    function addStepContentController() {
	      _classCallCheck(this, addStepContentController);
	    }
	
	    _createClass(addStepContentController, [{
	      key: 'removeThisStepParent',
	      value: function removeThisStepParent(index) {
	        this.removeThisStep({
	          index: index
	        });
	      }
	    }, {
	      key: 'rightThisStepParent',
	      value: function rightThisStepParent(index) {
	        this.rightThisStep({
	          index: index
	        });
	      }
	    }, {
	      key: 'leftThisStepParent',
	      value: function leftThisStepParent(index) {
	        this.leftThisStep({
	          index: index
	        });
	      }
	    }, {
	      key: 'saveThisFormParent',
	      value: function saveThisFormParent(event) {
	        event.preventDefault();
	        this.saveThisForm(event);
	      }
	
	      ///////////////////////////////////
	      // WHY this function is needed :
	      ///////////////////////////////////
	      // CASE OF :  function with parameter passing from parent to caller through another level component
	      //            parent -> intermediate component (here) -> caller
	      // NOTE : intermediate should call parent function to be sure to pass function parameter upward to parent
	
	    }, {
	      key: 'setActiveStepNumberParent',
	      value: function setActiveStepNumberParent(index) {
	        this.setActiveStepNumber({
	          index: index
	        });
	      }
	    }], [{
	      key: '$inject',
	      get: function get() {
	        return [];
	      }
	    }]);
	
	    return addStepContentController;
	  }()
	};
	
	exports.default = addStepContentComponent;
	exports.ADD_STEP_CONTENT_COMPONENT = ADD_STEP_CONTENT_COMPONENT;

/***/ },
/* 50 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ADD_STEP_COMMAND_PANEL_COMPONENT_NAME = exports.ADD_STEP_COMMAND_PANEL_COMPONENT_NAME = 'addStepCommandPanel';
	
	var AddStepCommandPanelComponent = exports.AddStepCommandPanelComponent = {
	  template: '\n  <div id="commandPanel">\n    <div  class="panel panel-default">\n      <div class="panel-heading">\n        <h3 class="panel-title">\n          <i class="fa fa-keyboard-o"></i>\n          &nbsp;\n          {{\'COMMAND_PANEL\' | translate}}\n        </h3>\n      </div>\n      <div class="panel-body">\n        <div class="row">\n          <div class="col-md-12">\n            <span class="addNewLine">\n              {{\'ADD_NEW_STEP\' | translate}} :\n            </span>\n            &nbsp;\n            <button\n              class="btn btn-primary"\n              ng-click="$ctrl.addNewstep()">\n              <i class="fa fa-plus fa-1x"></i>\n            </button>\n          </div>          \n        </div>\n        <button\n          class="btn btn-primary btn-block btn-lg"\n          ng-click="$ctrl.saveThisForm({event: $event})">\n          {{\'SAVE_THIS_FORM\' | translate}}\n        </button>\n      </div>\n    </div>\n  </div>\n  ',
	  bindings: {
	    addNewstep: '&',
	    saveThisForm: '&'
	  },
	  controller: function () {
	    function AddStepCommandPanelController() {
	      _classCallCheck(this, AddStepCommandPanelController);
	    }
	
	    _createClass(AddStepCommandPanelController, null, [{
	      key: '$inject',
	      get: function get() {
	        return [];
	      }
	    }]);
	
	    return AddStepCommandPanelController;
	  }()
	};

/***/ },
/* 51 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ADD_STEP_VISUAL_PANEL_COMPONENT_NAME = exports.ADD_STEP_VISUAL_PANEL_COMPONENT_NAME = 'addStepVisualPanel';
	
	var AddStepVisualPanelComponent = exports.AddStepVisualPanelComponent = {
	  template: '\n  <div id="visualPanel">\n    <div  class="panel panel-default">\n      <div class="panel-heading">\n        <h3 class="panel-title">\n          <i class="fa fa-eye"></i>\n          &nbsp;\n          {{\'VISUAL_PANEL\' | translate}}\n        </h3>\n      </div>\n      <div class="panel-body">\n        \n        <wizard edit-mode="true" indicators-position="top" on-finish="finishedWizard()">\n          <wz-step wz-title="{{$ctrl.configuration.steps[$index].title}}" ng-repeat="step in $ctrl.configuration.steps track by $index"  >\n            <div class="row">\n              <div class="col-md-12 lineCommandButton">\n                <div class="col-md-3 pull-left">\n                  <button\n                    class="btn btn-warning"\n                    title="{{\'MOVE_STEP_LEFT\' | translate}}"\n                    ng-hide="$index==0"\n                    ng-click="$ctrl.leftThisStep({index: $index})">\n                    <i class="fa fa-arrow-left"></i>\n                  </button>\n                  <button\n                    class="btn btn-warning"\n                    title="{{\'MOVE_STEP_RIGHT\' | translate}}"\n                    ng-hide="$index==($ctrl.configuration.steps.length-1)"\n                    ng-click="$ctrl.rightThisStep({index: $index})">\n                    <i class="fa fa-arrow-right"></i>\n                  </button>\n                </div>\n                <div class="col-md-6 text-center"> \n                  <span class="addNewLine">\n                    {{\'STEP_TITLE\' | translate}}:\n                  </span>\n                  <input class="addNewLine" \n                  title="{{\'STEP_TITLE\' | translate}}"\n                  placeholder="{{\'STEP_TITLE\' | translate}}"\n                  ng-model="$ctrl.configuration.steps[$index].title" \n                  type="text" />\n                </div>\n                <div class="col-md-3 pull-left">\n                  <button\n                    class="btn btn-danger pull-right"   \n                    title="{{\'DELETE_STEP\' | translate}}"\n                    ng-hide="$ctrl.configuration.steps.length <= 1"     \n                    ng-click="$ctrl.removeThisStep({index: $index})">\n                    <i class="fa fa-trash-o"></i>\n                  </button>\n                </div>\n              </div>              \n            </div>\n            <eda-step-way-easy-form-gen\n              wizard-step-generator-model="$ctrl.configuration.steps[$index].easyFormGeneratorModel"\n              eda-save-form-event="$ctrl.saveForm(edaEasyFormGeneratorModel)">\n            </eda-step-way-easy-form-gen>\n            {{$ctrl.configuration.steps[$index] | json}}   \n          </wz-step>                \n        </wizard>\n      </div>\n    </div>\n  </div>\n  ',
	  bindings: {
	    configuration: '=',
	    removeThisStep: '&',
	    rightThisStep: '&',
	    leftThisStep: '&'
	  },
	  controller: function () {
	    function AddStepVisualPanelController() {
	      _classCallCheck(this, AddStepVisualPanelController);
	    }
	
	    _createClass(AddStepVisualPanelController, null, [{
	      key: '$inject',
	      get: function get() {
	        return [];
	      }
	    }]);
	
	    return AddStepVisualPanelController;
	  }()
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _editControlModal = __webpack_require__(25);
	
	var _editControlModal2 = _interopRequireDefault(_editControlModal);
	
	var _editValidEditFooter = __webpack_require__(53);
	
	var _editChooseControl = __webpack_require__(54);
	
	var _index = __webpack_require__(55);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var EDIT_CONTROLE_MODAL_NAME = 'editControlModal.module';
	
	var EDIT_CONTROL_INJECT = _index.controls.map(function (control) {
	  return control.moduleName;
	});
	
	exports.default = angular.module(EDIT_CONTROLE_MODAL_NAME, EDIT_CONTROL_INJECT).controller(_editControlModal.EDIT_MODAL_CONTROLLER_NAME, _editControlModal2.default).component(_editChooseControl.EDIT_CHOOSE_CONTROL_COMPONENT, _editChooseControl.editChooseControlComponent).component(_editValidEditFooter.EDIT_EDIT_VALID_FOOTER_COMPONENT, _editValidEditFooter.editValidEditFooterComponent);

/***/ },
/* 53 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _class, _temp;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EDIT_EDIT_VALID_FOOTER_COMPONENT = exports.EDIT_EDIT_VALID_FOOTER_COMPONENT = 'editValidEditFooter';
	
	var editValidEditFooterComponent = exports.editValidEditFooterComponent = {
	  template: '\n  <div class="modal-footer">\n    <button\n      class="btn btn-primary"\n      ng-class="{\'disabled\': $ctrl.nyaSelect.selectedControl === \'none\'}"\n      ng-click="$ctrl.ok()">\n      {{\'OK\' | translate}}\n    </button>\n    <button\n      class="btn btn-warning"\n      ng-click="$ctrl.cancel()">\n      {{\'CANCEL\' | translate}}\n    </button>\n  </div>\n  ',
	  bindings: {
	    nyaSelect: '=',
	    ok: '&',
	    cancel: '&'
	  },
	  controller: (_temp = _class = function editValidEditFooterController() {
	    //
	
	    _classCallCheck(this, editValidEditFooterController);
	  }, _class.$inject = [], _temp)
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _class, _temp;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EDIT_CHOOSE_CONTROL_COMPONENT = exports.EDIT_CHOOSE_CONTROL_COMPONENT = 'editChooseControl';
	
	var editChooseControlComponent = exports.editChooseControlComponent = {
	  template: '\n  <ol\n    class="nya-bs-select col-xs-12 col-sm-12 col-md-12 col-lg-12"\n    ng-model="$ctrl.modelNyaSelect"\n    data-live-search="false">\n    <li nya-bs-option="option in $ctrl.nyaSelectFiltered.controls group by option.group">\n      <span class="dropdown-header greyText">\n        {{ $group }}\n      </span> <!-- group header cannot be searched -->\n      <a ng-click="$ctrl.selectThisControl({optionId: option.id})">\n        <span>\n          {{ option.name }}\n        </span>\n        <span class="glyphicon glyphicon-ok check-mark"></span>\n      </a>\n    </li>\n  </ol>\n  ',
	  bindings: {
	    modelNyaSelect: '=',
	    nyaSelectFiltered: '=',
	    selectThisControl: '&'
	  },
	  controller: (_temp = _class = function editChooseControlController() {
	    //
	
	    _classCallCheck(this, editChooseControlController);
	  }, _class.$inject = [], _temp)
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.controls = exports.configs = undefined;
	
	var _blank = __webpack_require__(56);
	
	var _editBlankControl = __webpack_require__(57);
	
	var _editBlankControl2 = _interopRequireDefault(_editBlankControl);
	
	var _IpAdress = __webpack_require__(58);
	
	var _editIpAdress = __webpack_require__(59);
	
	var _editIpAdress2 = _interopRequireDefault(_editIpAdress);
	
	var _date = __webpack_require__(60);
	
	var _editDate = __webpack_require__(61);
	
	var _editDate2 = _interopRequireDefault(_editDate);
	
	var _checkbox = __webpack_require__(62);
	
	var _editCheckBox = __webpack_require__(63);
	
	var _editCheckBox2 = _interopRequireDefault(_editCheckBox);
	
	var _email = __webpack_require__(64);
	
	var _editEmail = __webpack_require__(65);
	
	var _editEmail2 = _interopRequireDefault(_editEmail);
	
	var _basicSelect = __webpack_require__(66);
	
	var _editBasicSelect = __webpack_require__(67);
	
	var _editBasicSelect2 = _interopRequireDefault(_editBasicSelect);
	
	var _groupedSelect = __webpack_require__(68);
	
	var _editGroupedSelect = __webpack_require__(69);
	
	var _editGroupedSelect2 = _interopRequireDefault(_editGroupedSelect);
	
	var _header = __webpack_require__(70);
	
	var _editHeaderControl = __webpack_require__(71);
	
	var _editHeaderControl2 = _interopRequireDefault(_editHeaderControl);
	
	var _password = __webpack_require__(72);
	
	var _editPassword = __webpack_require__(73);
	
	var _editPassword2 = _interopRequireDefault(_editPassword);
	
	var _radio = __webpack_require__(74);
	
	var _editRadio = __webpack_require__(75);
	
	var _editRadio2 = _interopRequireDefault(_editRadio);
	
	var _richTextEditor = __webpack_require__(76);
	
	var _editRichTextEditor = __webpack_require__(77);
	
	var _editRichTextEditor2 = _interopRequireDefault(_editRichTextEditor);
	
	var _subTitle = __webpack_require__(78);
	
	var _editSubTitle = __webpack_require__(79);
	
	var _editSubTitle2 = _interopRequireDefault(_editSubTitle);
	
	var _textArea = __webpack_require__(80);
	
	var _editTextArea = __webpack_require__(81);
	
	var _editTextArea2 = _interopRequireDefault(_editTextArea);
	
	var _textInput = __webpack_require__(82);
	
	var _editTextInput = __webpack_require__(83);
	
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
/* 56 */
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
/* 57 */
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
/* 58 */
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
/* 59 */
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
/* 60 */
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
/* 61 */
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
/* 62 */
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
/* 63 */
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
/* 64 */
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
/* 65 */
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
/* 66 */
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
/* 67 */
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
/* 68 */
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
/* 69 */
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
/* 70 */
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
/* 71 */
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
	    _classCallCheck(this, editHeaderControlController);
	
	    console.log('debug test');
	  }, _class.$inject = [], _temp)
	};
	
	var editHeaderControlModuleName = 'stepway.editHeaderControl.module';
	
	exports.default = angular.module(editHeaderControlModuleName, []).component(EDIT_HEADER_CONTROL_COMPONENT, editHeaderControlComponent);

/***/ },
/* 72 */
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
/* 73 */
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
/* 74 */
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
/* 75 */
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
/* 76 */
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
/* 77 */
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
/* 78 */
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
/* 79 */
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
/* 80 */
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
/* 81 */
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
/* 82 */
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
/* 83 */
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
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MODAL_PROXY_MODULE_NAME = exports.CONTROLLER_MODAL_PROXY_SERVICE = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _modalProxyServiceHelpers = __webpack_require__(85);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CONTROLLER_MODAL_PROXY_SERVICE = exports.CONTROLLER_MODAL_PROXY_SERVICE = '$modalProxy';
	
	var $modalProxy = function () {
	  function $modalProxy(easyFormSteWayConfig) {
	    _classCallCheck(this, $modalProxy);
	
	    this.easyFormSteWayConfig = easyFormSteWayConfig;
	  }
	
	  _createClass($modalProxy, [{
	    key: 'initNyaSelect',
	    value: function initNyaSelect(nyaSelectObj) {
	      return (0, _modalProxyServiceHelpers.resetNyaSelect)(nyaSelectObj);
	    }
	  }, {
	    key: 'getControlsDefinition',
	    value: function getControlsDefinition() {
	      var controls = {};
	      (0, _modalProxyServiceHelpers.resetNyaSelect)(controls);
	      return controls;
	    }
	  }, {
	    key: 'getNyASelectFromSelectedLineColumn',
	    value: function getNyASelectFromSelectedLineColumn(nyaSelectObj, configurationObj, indexLine, numcolumn) {
	      (0, _modalProxyServiceHelpers.resetNyaSelect)(nyaSelectObj);
	      /**
	        * data send to modal controller
	        */
	      var controlAtThisLineThisCol = configurationObj.lines[indexLine].columns[numcolumn].control;
	
	      if (controlAtThisLineThisCol && controlAtThisLineThisCol.templateOptions) {
	        nyaSelectObj.temporyConfig = {
	          selectedControl: controlAtThisLineThisCol.selectedControl ? controlAtThisLineThisCol.selectedControl : 'none',
	          formlyLabel: controlAtThisLineThisCol.templateOptions.label ? controlAtThisLineThisCol.templateOptions.label : '',
	          formlyRequired: controlAtThisLineThisCol.templateOptions.required ? controlAtThisLineThisCol.templateOptions.required : '',
	          formlyDescription: controlAtThisLineThisCol.templateOptions.description ? controlAtThisLineThisCol.templateOptions.description : '',
	          formlyDefaultValue: controlAtThisLineThisCol.defaultValue ? controlAtThisLineThisCol.defaultValue : '',
	          formlyPlaceholder: controlAtThisLineThisCol.templateOptions.placeholder ? controlAtThisLineThisCol.templateOptions.placeholder : '',
	          formlyOptions: controlAtThisLineThisCol.templateOptions.options ? controlAtThisLineThisCol.templateOptions.options : '',
	          formlyExpressionProperties: controlAtThisLineThisCol.formlyExpressionProperties ? angular.copy(controlAtThisLineThisCol.formlyExpressionProperties) : {},
	          formlyValidators: controlAtThisLineThisCol.formlyValidators ? angular.copy(controlAtThisLineThisCol.formlyValidators) : {},
	          formlyValidation: controlAtThisLineThisCol.formlyValidation ? angular.copy(controlAtThisLineThisCol.formlyValidation) : {}
	        };
	        // particular case : datepicker needs an additionnal property:
	        if (nyaSelectObj.temporyConfig.selectedControl === 'Date') {
	          nyaSelectObj.temporyConfig.datepickerOptions = controlAtThisLineThisCol.templateOptions.datepickerOptions ? angular.copy(controlAtThisLineThisCol.templateOptions.datepickerOptions) : { format: '' };
	        }
	      }
	      return nyaSelectObj;
	    }
	  }, {
	    key: 'bindConfigurationModelFromModalReturn',
	    value: function bindConfigurationModelFromModalReturn(indexLine, numcolumn, modalAddCtrlModel, configurationObj) {
	      var extractedProps = (0, _modalProxyServiceHelpers.returnControlFromAddCtrlModalModel)(modalAddCtrlModel);
	
	      var updatedControl = {
	        selectedControl: extractedProps.selectedControl,
	        type: extractedProps.formlyType,
	        subtype: extractedProps.formlySubtype,
	        defaultValue: extractedProps.defaultValue,
	        templateOptions: {
	          label: extractedProps.formlyLabel,
	          required: extractedProps.formlyRequired,
	          description: extractedProps.formlyDescription,
	          placeholder: extractedProps.formlyPlaceholder,
	          options: [].concat(_toConsumableArray(extractedProps.formlyOptions))
	        },
	        formlyExpressionProperties: angular.copy(extractedProps.formlyExpressionProperties),
	        formlyValidators: angular.copy(extractedProps.formlyValidators),
	        formlyValidation: angular.copy(extractedProps.formlyValidation)
	      };
	      // particular case: datepicker : additionnal prop datepickerOptions
	      if (updatedControl.type === 'datepicker') {
	        updatedControl.templateOptions.datepickerOptions = angular.copy(extractedProps.datepickerOptions);
	      }
	      /**
	        * unique key (set only first time) in this model is formly control type + Date.now();
	        */
	      // 1st attempt
	      var newKey = updatedControl.type + '-' + Date.now();
	      if ((0, _modalProxyServiceHelpers.validKeyUniqueness)(newKey, configurationObj) === true) {
	        updatedControl.key = newKey;
	      } else {
	        // 2nd attempt
	        newKey = updatedControl.type + '-' + Date.now();
	        if ((0, _modalProxyServiceHelpers.validKeyUniqueness)(newKey, configurationObj) === true) {
	          updatedControl.key = newKey;
	        } else {
	          // 3rd attempt
	          updatedControl.type + '-' + Date.now();
	        }
	      }
	      updatedControl.edited = true;
	      // ///////////////////////
	      // finally bind it:
	      // ///////////////////////
	      configurationObj.lines[indexLine].columns[numcolumn].control = angular.copy(updatedControl);
	    }
	  }, {
	    key: 'applyConfigToSelectedControl',
	    value: function applyConfigToSelectedControl(nyaSelectObj) {
	      /**
	        * used in modal (edit control)
	        */
	      var selectedControl = nyaSelectObj.selectedControl;
	
	      nyaSelectObj.controls.forEach(function (control) {
	        if (control.id === selectedControl) {
	          control.formlyLabel = nyaSelectObj.temporyConfig.formlyLabel, control.formlyRequired = nyaSelectObj.temporyConfig.formlyRequired;
	          control.formlyDescription = nyaSelectObj.temporyConfig.formlyDescription;
	          control.formlyDefaultValue = nyaSelectObj.temporyConfig.formlyDefaultValue;
	          control.formlyPlaceholder = nyaSelectObj.temporyConfig.formlyPlaceholder;
	          control.formlyOptions = nyaSelectObj.temporyConfig.formlyOptions;
	        }
	
	        if (control.id === 'Date') {
	          control.datepickerOptions = angular.copy(nyaSelectObj.temporyConfig.datepickerOptions);
	        }
	      });
	    }
	  }, {
	    key: 'resetTemporyConfig',
	    value: function resetTemporyConfig() {
	      return (0, _modalProxyServiceHelpers.getResetConfig)();
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
	    key: 'filterDisabledControl',
	    value: function filterDisabledControl(nyaSelectObj) {
	      var listAllEnabledControl = this.easyFormSteWayConfig.getListEnabledControl();
	      var filteredNyaList = [];
	      angular.forEach(listAllEnabledControl, function (enabledControl) {
	        angular.forEach(nyaSelectObj.controls, function (nyaControl) {
	          if (nyaControl.id === enabledControl.name && enabledControl.enabled === true) {
	            filteredNyaList = filteredNyaList.concat(nyaControl);
	          }
	        });
	      });
	      return filteredNyaList;
	    }
	  }, {
	    key: 'getFilteredNyaSelectObject',
	    value: function getFilteredNyaSelectObject() {
	      var newNyaSelectObj = {};
	      (0, _modalProxyServiceHelpers.resetNyaSelect)(newNyaSelectObj);
	      return angular.copy(this.filterDisabledControl(angular.copy(newNyaSelectObj)));
	      //return angular.copy(angular.copy(newNyaSelectObj));
	    }
	  }]);
	
	  return $modalProxy;
	}();
	
	$modalProxy.$inject = ['easyFormSteWayConfig'];
	var MODAL_PROXY_MODULE_NAME = exports.MODAL_PROXY_MODULE_NAME = 'modalProxyModule';
	exports.default = angular.module(MODAL_PROXY_MODULE_NAME, []).service(CONTROLLER_MODAL_PROXY_SERVICE, $modalProxy);

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getResetConfig = exports.validKeyUniqueness = exports.returnControlFromAddCtrlModalModel = exports.resetNyaSelect = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _controls = __webpack_require__(55);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var resetNyaSelect = function resetNyaSelect(nyaSelectObj) {
	  //reset
	  angular.copy({
	    controls: [].concat(_toConsumableArray(_controls.configs)),
	    selectedControl: 'none',
	    temporyConfig: {
	      selectedControl: 'none',
	      formlyLabel: 'label',
	      formlyRequired: false,
	      formlyDescription: '',
	      formlyPlaceholder: '',
	      formlyDefaultValue: '',
	      formlyOptions: [],
	      //expressions/validation fields
	      formlyExpressionProperties: {},
	      formlyValidators: {},
	      formlyValidation: {}
	    }
	  }, nyaSelectObj);
	  return true;
	};
	
	var getResetConfig = function getResetConfig() {
	  return {
	    formlyLabel: '',
	    formlyRequired: false,
	    formlyPlaceholder: '',
	    formlyDescription: '',
	    formlyDefaultValue: '',
	    formlyOptions: []
	  };
	};
	
	/**
	  * data passed back to parent controller
	  * after control being finsihed editing in modal
	  */
	var returnControlFromAddCtrlModalModel = function returnControlFromAddCtrlModalModel(CtrlModalModel) {
	  if (CtrlModalModel && CtrlModalModel.selectedControl && Array.isArray(CtrlModalModel.controls)) {
	    var _ret = function () {
	      var selectedControl = CtrlModalModel.selectedControl;
	      var controlRef = CtrlModalModel.controls.find(function (control) {
	        return control.id === selectedControl;
	      });
	      // return a deep copy of selected control:
	      if (controlRef) {
	        var returnCtrl = {
	          selectedControl: selectedControl,
	          formlyType: controlRef.formlyType,
	          formlySubtype: controlRef.formlySubtype,
	          formlyLabel: controlRef.formlyLabel,
	          formlyRequired: controlRef.formlyRequired,
	          formlyDescription: controlRef.formlyDescription,
	          formlyPlaceholder: controlRef.formlyPlaceholder,
	          formlyOptions: [].concat(_toConsumableArray(controlRef.formlyOptions)),
	          //validation fields
	          formlyExpressionProperties: angular.copy(controlRef.formlyExpressionProperties),
	          formlyValidators: angular.copy(controlRef.formlyValidators),
	          formlyValidation: angular.copy(controlRef.formlyValidation)
	        };
	        // particular case: date picker needs an additional property
	        if (controlRef.formlyType === 'datepicker') {
	          returnCtrl.datepickerOptions = controlRef.datepickerOptions;
	        }
	        return {
	          v: returnCtrl
	        };
	      }
	    }();
	
	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }
	  // by default: returns an empty control object:
	  return {
	    selectedControl: 'none',
	    formlyType: 'none',
	    formlySubtype: 'none',
	    formlyLabel: '',
	    formlyRequired: false,
	    formlyDescription: '',
	    formlyPlaceholder: '',
	    formlyOptions: [],
	    //validation fields
	    formlyExpressionProperties: {},
	    formlyValidators: {},
	    formlyValidation: {}
	  };
	};
	
	/**
	  * validKeyUniqueness
	  * to be sure the "keys" are unique (in same formly field model)
	  */
	var validKeyUniqueness = function validKeyUniqueness(thisKey, configurationObj) {
	  var lines = configurationObj.lines;
	  return !lines.map(function (line) {
	    return line.columns.some(function (column) {
	      return column.control.key === thisKey;
	    });
	  }).reduce(function (prev, next) {
	    return prev || next;
	  }, false);
	};
	
	exports.resetNyaSelect = resetNyaSelect;
	exports.returnControlFromAddCtrlModalModel = returnControlFromAddCtrlModalModel;
	exports.validKeyUniqueness = validKeyUniqueness;
	exports.getResetConfig = getResetConfig;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.FORMLY_PROXY_MODULE_NAME = exports.FORMLY_PROXY_SERVICE = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _formlyProxyService = __webpack_require__(87);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var FORMLY_PROXY_SERVICE = exports.FORMLY_PROXY_SERVICE = '$formlyProxy';
	
	var $formlyProxy = function () {
	  function $formlyProxy() {
	    _classCallCheck(this, $formlyProxy);
	  }
	
	  _createClass($formlyProxy, [{
	    key: 'initConfigurationEditFromScratch',
	    value: function initConfigurationEditFromScratch(configurationModel) {
	      angular.copy(_formlyProxyService.configurationModelInit, configurationModel);
	    }
	  }, {
	    key: 'bindConfigurationLines',
	    value: function bindConfigurationLines(configurationModel, lines) {
	      if (angular.isArray(lines)) {
	        var configModelResult = _formlyProxyService.configurationModelResult;
	        configModelResult.lines = [].concat(_toConsumableArray(lines));
	        angular.copy(configModelResult, configurationModel);
	        return this.getMessageObject('configuration model is bound', 'lines are bound to configuration model.');
	      } else {
	        return this.getErrorObject('lines is not an array', 'Checks lines type, it is not an array.');
	      }
	    }
	  }, {
	    key: 'applyConfigurationToformlyModel',
	    value: function applyConfigurationToformlyModel(configurationModel, formlyModel, formlyDataModel) {
	      (0, _formlyProxyService.resetFormlyModel)(formlyModel);
	      (0, _formlyProxyService.resetDataModel)(formlyDataModel);
	
	      configurationModel.lines.forEach(function (line, lineIndex) {
	        if (line.columns.length === 1) {
	          (0, _formlyProxyService.addOneColumnControl)(formlyModel, configurationModel, lineIndex);
	        }
	        if (line.columns.length === 2) {
	          (0, _formlyProxyService.addTwoColumnControl)(formlyModel, configurationModel, lineIndex);
	        }
	        if (line.columns.length === 3) {
	          (0, _formlyProxyService.addThreeColumnControl)(formlyModel, configurationModel, lineIndex);
	        }
	      });
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
	}();
	
	$formlyProxy.$inject = [];
	var FORMLY_PROXY_MODULE_NAME = exports.FORMLY_PROXY_MODULE_NAME = 'formlyProxyModule';
	exports.default = angular.module(FORMLY_PROXY_MODULE_NAME, []).service(FORMLY_PROXY_SERVICE, $formlyProxy);

/***/ },
/* 87 */
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
/* 88 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SELECT_OPTION_MANAGE_NAME = exports.SELECT_OPTION_MANAGE_NAME = 'selectOptionManage';
	
	var selectOptionManage = function () {
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
	      return !selectObj.rows.some(function (row) {
	        return row.option === textValue;
	      });
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
	            fullResponse.details = 'Can\'t retrieve option from option index';
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
	}();
	
	selectOptionManage.$inject = [];
	
	
	var SELECT_OPTION_MANAGE_MODULE_NAME = 'stepway.selectOpionManage.module';
	exports.default = angular.module(SELECT_OPTION_MANAGE_MODULE_NAME, []).service(SELECT_OPTION_MANAGE_NAME, selectOptionManage);

/***/ },
/* 89 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=eda.stepway.js.map