const stringify = require('json-stringify-safe');
const {
  typeOf, each, copy, getCheckerDisplay, isError,
  arrayify, list, getError, nAtL, t, checkerHelpers,
  undef
  } = require('./apiCheckUtil');
const {setupChecker} = checkerHelpers;

let checkers = module.exports = getCheckers();
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

    shape: getShapeCheckGetter(),
    args: argumentsCheckerGetter(),

    any: anyCheckGetter(),
    null: nullCheckGetter()

  };

  function typeOfCheckGetter(type) {
    const lType = type.toLowerCase();
    return setupChecker(function typeOfCheckerDefinition(val, name, location) {
      if (typeOf(val) !== lType) {
        return getError(name, location, type);
      }
    }, {type}, disabled);
  }

  function funcCheckGetter() {
    const type = 'Function';
    let functionChecker = setupChecker(function functionCheckerDefinition(val, name, location) {
      if (typeOf(val) !== 'function') {
        return getError(name, location, type);
      }
    }, {type}, disabled);

    functionChecker.withProperties = function getWithPropertiesChecker(properties) {
      const apiError = checkers.objectOf(checkers.func)(properties, 'properties', 'apiCheck.func.withProperties');
      if (isError(apiError)) {
        throw apiError;
      }
      let shapeChecker = checkers.shape(properties, true);
      shapeChecker.type.__apiCheckData.type = 'func.withProperties';

      return setupChecker(function functionWithPropertiesChecker(val, name, location) {
        const notFunction = checkers.func(val, name, location);
        if (isError(notFunction)) {
          return notFunction;
        }
        return shapeChecker(val, name, location);
      }, {type: shapeChecker.type, shortType: 'func.withProperties'}, disabled);
    };
    return functionChecker;
  }

  function objectCheckGetter() {
    const type = 'Object';
    const nullType = 'Object (null ok)';
    let objectNullOkChecker = setupChecker(function objectNullOkCheckerDefinition(val, name, location) {
      if (typeOf(val) !== 'object') {
        return getError(name, location, nullType);
      }
    }, {type: nullType}, disabled);

    let objectChecker = setupChecker(function objectCheckerDefinition(val, name, location) {
      if (val === null || isError(objectNullOkChecker(val, name, location))) {
        return getError(name, location, objectChecker.type);
      }
    }, {type, nullOk: objectNullOkChecker}, disabled);

    return objectChecker;
  }


  function instanceCheckGetter(classToCheck) {
    return setupChecker(function instanceCheckerDefinition(val, name, location) {
      if (!(val instanceof classToCheck)) {
        return getError(name, location, classToCheck.name);
      }
    }, {type: classToCheck.name}, disabled);
  }

  function oneOfCheckGetter(enums) {
    const type = {
      __apiCheckData: {optional: false, type: 'enum'},
      enum: enums
    };
    const shortType = `oneOf[${enums.map(enm => stringify(enm)).join(', ')}]`;
    return setupChecker(function oneOfCheckerDefinition(val, name, location) {
      if (!enums.some(enm => enm === val)) {
        return getError(name, location, shortType);
      }
    }, {type, shortType}, disabled);
  }

  function oneOfTypeCheckGetter(checkers) {
    const checkersDisplay = checkers.map((checker) => getCheckerDisplay(checker, {short: true}));
    const shortType = `oneOfType[${checkersDisplay.join(', ')}]`;
    function type(options) {
      if (options && options.short) {
        return shortType;
      }
      return checkers.map((checker) => getCheckerDisplay(checker, options));
    }
    type.__apiCheckData = {optional: false, type: 'oneOfType'};
    return setupChecker(function oneOfTypeCheckerDefinition(val, name, location) {
      if (!checkers.some(checker => !isError(checker(val, name, location)))) {
        return getError(name, location, shortType);
      }
    }, {type, shortType}, disabled);
  }

  function arrayOfCheckGetter(checker) {
    const shortCheckerDisplay = getCheckerDisplay(checker, {short: true});
    const shortType = `arrayOf[${shortCheckerDisplay}]`;

    function type(options) {
      if (options && options.short) {
        return shortType;
      }
      return getCheckerDisplay(checker, options);
    }
    type.__apiCheckData = {optional: false, type: 'arrayOf'};

    return setupChecker(function arrayOfCheckerDefinition(val, name, location) {
      if (isError(checkers.array(val)) || !val.every((item) => !isError(checker(item)))) {
        return getError(name, location, shortType);
      }
    }, {type, shortType}, disabled);
  }

  function objectOfCheckGetter(checker) {
    const checkerDisplay = getCheckerDisplay(checker, {short: true});
    const shortType = `objectOf[${checkerDisplay}]`;

    function type(options) {
      if (options && options.short) {
        return shortType;
      }
      return getCheckerDisplay(checker, options);
    }
    type.__apiCheckData = {optional: false, type: 'objectOf'};

    return setupChecker(function objectOfCheckerDefinition(val, name, location) {
      const notObject = checkers.object(val, name, location);
      if (isError(notObject)) {
        return notObject;
      }
      const allTypesSuccess = each(val, (item, key) => {
        if (isError(checker(item, key, name))) {
          return false;
        }
      });
      if (!allTypesSuccess) {
        return getError(name, location, shortType);
      }
    }, {type, shortType}, disabled);
  }

  function typeOrArrayOfCheckGetter(checker) {
    const checkerDisplay = getCheckerDisplay(checker, {short: true});
    const shortType = `typeOrArrayOf[${checkerDisplay}]`;

    function type(options) {
      if (options && options.short) {
        return shortType;
      }
      return getCheckerDisplay(checker, options);
    }

    type.__apiCheckData = {optional: false, type: 'typeOrArrayOf'};
    return setupChecker(function typeOrArrayOfDefinition(val, name, location, obj) {
      if (isError(checkers.oneOfType([checker, checkers.arrayOf(checker)])(val, name, location, obj))) {
        return getError(name, location, shortType);
      }
    }, {type, shortType}, disabled);
  }

  function getShapeCheckGetter() {
    function shapeCheckGetter(shape, nonObject) {
      let shapeTypes = {};
      each(shape, (checker, prop) => {
        shapeTypes[prop] = getCheckerDisplay(checker);
      });
      function type(options = {}) {
        let ret = {};
        const {terse, obj, addHelpers} = options;
        const parentRequired = options.required;
        each(shape, (checker, prop) => {
          /* jshint maxcomplexity:6 */
          const specified = obj && obj.hasOwnProperty(prop);
          const required = undef(parentRequired) ? !checker.isOptional : parentRequired;
          if (!terse || (specified || !checker.isOptional)) {
            ret[prop] = getCheckerDisplay(checker, {terse, obj: obj && obj[prop], required, addHelpers});
          }
          if (addHelpers) {
            modifyTypeDisplayToHelpOut(ret, prop, specified, checker, required);
          }
        });
        return ret;

        function modifyTypeDisplayToHelpOut(ret, prop, specified, checker, required) {
          if (!specified && required && !checker.isOptional) {
            let item = 'ITEM';
            if (checker.type && checker.type.__apiCheckData) {
              item = checker.type.__apiCheckData.type.toUpperCase();
            }
            addHelper('missing', `MISSING THIS ${item}`, ' <-- YOU ARE MISSING THIS');
          } else if (specified) {
            let error = checker(obj[prop], prop, null, obj);
            if (isError(error)) {
              addHelper('error', `THIS IS THE PROBLEM: ${error.message}`, ` <-- THIS IS THE PROBLEM: ${error.message}`);
            }
          }

          function addHelper(property, objectMessage, stringMessage) {
            if (typeof ret[prop] === 'string') {
              ret[prop] += stringMessage;
            } else {
              ret[prop].__apiCheckData[property] = objectMessage;
            }
          }
        }
      }

      type.__apiCheckData = {strict: false, optional: false, type: 'shape'};
      let shapeChecker = setupChecker(function shapeCheckerDefinition(val, name, location) {
        /* jshint maxcomplexity:6 */
        let isObject = !nonObject && checkers.object(val, name, location);
        if (isError(isObject)) {
          return isObject;
        }
        let shapePropError;
        location = location ? location + (name ? '/' : '') : '';
        name = name || '';
        each(shape, (checker, prop) => {
          if (val.hasOwnProperty(prop) || !checker.isOptional) {
            shapePropError = checker(val[prop], prop, `${location}${name}`, val);
            return !isError(shapePropError);
          }
        });
        if (isError(shapePropError)) {
          return shapePropError;
        }
      }, {type, shortType: 'shape'}, disabled);

      function strictType() {
        return type(...arguments);
      }

      strictType.__apiCheckData = copy(shapeChecker.type.__apiCheckData);
      strictType.__apiCheckData.strict = true;
      shapeChecker.strict = setupChecker(function strictShapeCheckerDefinition(val, name, location) {
        const shapeError = shapeChecker(val, name, location);
        if (isError(shapeError)) {
          return shapeError;
        }
        const allowedProperties = Object.keys(shape);
        const extraProps = Object.keys(val).filter(prop => allowedProperties.indexOf(prop) === -1);
        if (extraProps.length) {
          return new Error(
            `${nAtL(name, location)} cannot have extra properties: ${t(extraProps.join('`, `'))}.` +
            `It is limited to ${t(allowedProperties.join('`, `'))}`
          );
        }
      }, {type: strictType, shortType: 'strict shape'}, disabled);

      return shapeChecker;
    }

    shapeCheckGetter.ifNot = function ifNot(otherProps, propChecker) {
      if (!Array.isArray(otherProps)) {
        otherProps = [otherProps];
      }
      let description;
      if (otherProps.length === 1) {
        description = `specified only if ${otherProps[0]} is not specified`;
      } else {
        description = `specified only if none of the following are specified: [${list(otherProps, ', ', 'and ')}]`;
      }
      const shortType = `ifNot[${otherProps.join(', ')}]`;
      const type = getTypeForShapeChild(propChecker, description, shortType);
      return setupChecker(function ifNotChecker(prop, propName, location, obj) {
        let propExists = obj && obj.hasOwnProperty(propName);
        let otherPropsExist = otherProps.some(otherProp => obj && obj.hasOwnProperty(otherProp));
        if (propExists === otherPropsExist) {
          return getError(propName, location, type);
        } else if (propExists) {
          return propChecker(prop, propName, location, obj);
        }
      }, {notRequired: true, type, shortType}, disabled);
    };

    shapeCheckGetter.onlyIf = function onlyIf(otherProps, propChecker) {
      otherProps = arrayify(otherProps);
      let description;
      if (otherProps.length === 1) {
        description = `specified only if ${otherProps[0]} is also specified`;
      } else {
        description = `specified only if all of the following are specified: [${list(otherProps, ', ', 'and ')}]`;
      }
      const shortType = `onlyIf[${otherProps.join(', ')}]`;
      const type = getTypeForShapeChild(propChecker, description, shortType);
      return setupChecker(function onlyIfCheckerDefinition(prop, propName, location, obj) {
        const othersPresent = otherProps.every(prop => obj.hasOwnProperty(prop));
        if (!othersPresent) {
          return getError(propName, location, type);
        } else {
          return propChecker(prop, propName, location, obj);
        }
      }, {type, shortType}, disabled);
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
      const props = t(otherProps.join(', '));
      const ifProps = `if ${all ? 'all of' : 'at least one of'}`;
      const description = `specified ${ifProps} these are not specified: ${props} (otherwise it's optional)`;
      const shortType = `requiredIfNot${all ? '.all' : ''}[${otherProps.join(', ')}}]`;
      const type = getTypeForShapeChild(propChecker, description, shortType);
      return setupChecker(function shapeRequiredIfNotDefinition(prop, propName, location, obj) {
        const propExists = obj && obj.hasOwnProperty(propName);
        const iteration = all ? 'every' : 'some';
        const otherPropsExist = otherProps[iteration](function (otherProp) {
          return obj && obj.hasOwnProperty(otherProp);
        });
        if (!otherPropsExist && !propExists) {
          return getError(propName, location, type);
        } else if (propExists) {
          return propChecker(prop, propName, location, obj);
        }
      }, {type, notRequired: true}, disabled);
    }

    return shapeCheckGetter;

    function getTypeForShapeChild(propChecker, description, shortType) {
      function type(options) {
        if (options && options.short) {
          return shortType;
        }
        return getCheckerDisplay(propChecker);
      }
      type.__apiCheckData = {optional: false, type: 'ifNot', description};
      return type;
    }
  }

  function argumentsCheckerGetter() {
    const type = 'function arguments';
    return setupChecker(function argsCheckerDefinition(val, name, location) {
      if (Array.isArray(val) || isError(checkers.object(val)) || isError(checkers.number(val.length))) {
        return getError(name, location, type);
      }
    }, {type}, disabled);
  }

  function anyCheckGetter() {
    return setupChecker(function anyCheckerDefinition() {
      // don't do anything
    }, {type: 'any'}, disabled);
  }

  function nullCheckGetter() {
    const type = 'null';
    return setupChecker(function nullChecker(val, name, location) {
      if (val !== null) {
        return getError(name, location, type);
      }
    }, {type}, disabled);
  }

  function rangeCheckGetter(min, max) {
    const type = `Range (${min} - ${max})`;
    return setupChecker(function rangeChecker(val, name, location) {
      if (typeof val !== 'number' || val < min || val > max) {
        return getError(name, location, type);
      }
    }, {type}, disabled);
  }

  function emptyObjectCheckGetter() {
    const type = 'empty object';
    return setupChecker(function emptyObjectChecker(val, name, location) {
      if (typeOf(val) !== 'object' || val === null || Object.keys(val).length) {
        return getError(name, location, type);
      }
    }, {type}, disabled);
  }

}
