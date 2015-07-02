const stringify = require('json-stringify-safe');
const checkerHelpers = {
  addOptional, getRequiredVersion, setupChecker, addNullable
};

module.exports = {
  each, copy, typeOf, arrayify, getCheckerDisplay,
  isError, list, getError, nAtL, t, undef, checkerHelpers,
  noop
};

function copy(obj) {
  let type = typeOf(obj);
  let daCopy;
  if (type === 'array') {
    daCopy = [];
  } else if (type === 'object') {
    daCopy = {};
  } else {
    return obj;
  }
  each(obj, (val, key) => {
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
  /* jshint maxcomplexity:7 */
  let display;
  let short = options && options.short;
  if (short && checker.shortType) {
    display = checker.shortType;
  } else if (!short && typeof checker.type === 'object' || checker.type === 'function') {
    display = getCheckerType(checker, options);
  } else {
    display = getCheckerType(checker, options) || checker.displayName || checker.name;
  }
  return display;
}

function getCheckerType({type}, options) {
  if (typeof type === 'function') {
    let __apiCheckData = type.__apiCheckData;
    let typeTypes = type(options);
    type = {
      __apiCheckData,
      [__apiCheckData.type]: typeTypes
    };
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
    return eachArry(...arguments);
  } else {
    return eachObj(...arguments);
  }
}

function eachObj(obj, iterator, context) {
  var ret;
  var hasOwn = Object.prototype.hasOwnProperty;
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
  var ret;
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
  let copy = arry.slice();
  let last = copy.pop();
  if (copy.length === 1) {
    join = ' ';
  }
  return copy.join(join) + `${copy.length ? join + finalJoin : ''}${last}`;
}


function getError(name, location, checkerType) {
  if (typeof checkerType === 'function') {
    checkerType = checkerType({short: true});
  }
  const stringType = typeof checkerType !== 'object' ? checkerType : stringify(checkerType);
  return new Error(`${nAtL(name, location)} must be ${t(stringType)}`);
}

function nAtL(name, location) {
  const tName = t(name || 'value');
  let tLocation = !location ? '' : ' at ' + t(location);
  return `${tName}${tLocation}`;
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
 * @param checker
 * @param properties properties to add to the checker
 * @param disabled - when set to true, this will set the checker to a no-op function
 */
function setupChecker(checker, properties, disabled) {
  /* jshint maxcomplexity:9 */
  if (disabled) { // swap out the checker for its own copy of noop
    checker = getNoop();
    checker.isNoop = true;
  }

  if (typeof checker.type === 'string') {
    checker.shortType = checker.type;
  }

  // assign all properties given
  each(properties, (prop, name) => checker[name] = prop);

  if (!checker.displayName) {
    checker.displayName = `apiCheck ${t(checker.shortType || checker.type || checker.name)} type checker`;
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
      let tLocation = location ? ` in ${t(location)}` : '';
      const type = getCheckerDisplay(checker, {short: true});
      const stringType = typeof type !== 'object' ? type : stringify(type);
      return new Error(`Required ${t(name)} not specified${tLocation}. Must be ${t(stringType)}`);
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
    checkerCopy.type = function() {
      return checker.type(...arguments);
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
  each(Object.keys(src), key => dest[key] = src[key]);
}

function noop() {
}

function getNoop() {
  /* istanbul ignore next */
  return function noop() {
  };
}
