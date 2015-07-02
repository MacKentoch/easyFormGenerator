/**
 * nya-bootstrap-select v2.0.10
 * Copyright 2014 Nyasoft
 * Licensed under MIT license
 */
(function(){
  'use strict';


var uid = 0;

function nextUid() {
  return ++uid;
}

/**
 * Checks if `obj` is a window object.
 *
 * @private
 * @param {*} obj Object to check
 * @returns {boolean} True if `obj` is a window obj.
 */
function isWindow(obj) {
  return obj && obj.window === obj;
}

/**
 * @ngdoc function
 * @name angular.isString
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a reference is a `String`.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `String`.
 */
function isString(value){return typeof value === 'string';}

/**
 * @param {*} obj
 * @return {boolean} Returns true if `obj` is an array or array-like object (NodeList, Arguments,
 *                   String ...)
 */
function isArrayLike(obj) {
  if (obj == null || isWindow(obj)) {
    return false;
  }

  var length = obj.length;

  if (obj.nodeType === 1 && length) {
    return true;
  }

  return isString(obj) || Array.isArray(obj) || length === 0 ||
    typeof length === 'number' && length > 0 && (length - 1) in obj;
}

/**
 * Creates a new object without a prototype. This object is useful for lookup without having to
 * guard against prototypically inherited properties via hasOwnProperty.
 *
 * Related micro-benchmarks:
 * - http://jsperf.com/object-create2
 * - http://jsperf.com/proto-map-lookup/2
 * - http://jsperf.com/for-in-vs-object-keys2
 *
 * @returns {Object}
 */
function createMap() {
  return Object.create(null);
}

/**
 * Computes a hash of an 'obj'.
 * Hash of a:
 *  string is string
 *  number is number as string
 *  object is either result of calling $$hashKey function on the object or uniquely generated id,
 *         that is also assigned to the $$hashKey property of the object.
 *
 * @param obj
 * @returns {string} hash string such that the same input will have the same hash string.
 *         The resulting string key is in 'type:hashKey' format.
 */
function hashKey(obj, nextUidFn) {
  var objType = typeof obj,
    key;

  if (objType == 'function' || (objType == 'object' && obj !== null)) {
    if (typeof (key = obj.$$hashKey) == 'function') {
      // must invoke on object to keep the right this
      key = obj.$$hashKey();
    } else if (key === undefined) {
      key = obj.$$hashKey = (nextUidFn || nextUid)();
    }
  } else {
    key = obj;
  }

  return objType + ':' + key;
}

//TODO: use with caution. if an property of element in array doesn't exist in group, the resultArray may lose some element.
function sortByGroup(array ,group, property) {
  var unknownGroup = [],
    i, j,
    resultArray = [];
  for(i = 0; i < group.length; i++) {
    for(j = 0; j < array.length;j ++) {
      if(!array[j][property]) {
        unknownGroup.push(array[j]);
      } else if(array[j][property] === group[i]) {
        resultArray.push(array[j]);
      }
    }
  }

  resultArray = resultArray.concat(unknownGroup);

  return resultArray;
}

/**
 * Return the DOM siblings between the first and last node in the given array.
 * @param {Array} array like object
 * @returns {jqLite} jqLite collection containing the nodes
 */
function getBlockNodes(nodes) {
  // TODO(perf): just check if all items in `nodes` are siblings and if they are return the original
  //             collection, otherwise update the original collection.
  var node = nodes[0];
  var endNode = nodes[nodes.length - 1];
  var blockNodes = [node];

  do {
    node = node.nextSibling;
    if (!node) break;
    blockNodes.push(node);
  } while (node !== endNode);

  return angular.element(blockNodes);
}

var getBlockStart = function(block) {
  return block.clone[0];
};

var getBlockEnd = function(block) {
  return block.clone[block.clone.length - 1];
};

var updateScope = function(scope, index, valueIdentifier, value, keyIdentifier, key, arrayLength, group) {
  // TODO(perf): generate setters to shave off ~40ms or 1-1.5%
  scope[valueIdentifier] = value;
  if (keyIdentifier) scope[keyIdentifier] = key;
  scope.$index = index;
  scope.$first = (index === 0);
  scope.$last = (index === (arrayLength - 1));
  scope.$middle = !(scope.$first || scope.$last);
  // jshint bitwise: false
  scope.$odd = !(scope.$even = (index&1) === 0);
  // jshint bitwise: true

  if(group) {
    scope.$group = group;
  }
};

var contains = function(array, element) {
  var length = array.length,
    i;
  if(length === 0) {
    return false;
  }
  for(i = 0;i < length; i++) {
    if(deepEquals(element, array[i])) {
      return true;
    }
  }
  return false;
};

var indexOf = function(array, element) {
  var length = array.length,
    i;
  if(length === 0) {
    return -1;
  }
  for(i = 0; i < length; i++) {
    if(deepEquals(element, array[i])) {
      return i;
    }
  }
  return -1;
};

/**
 * filter the event target for the nya-bs-option element.
 * Use this method with event delegate. (attach a event handler on an parent element and listen the special children elements)
 * @param target event.target node
 * @param parent {object} the parent, where the event handler attached.
 * @param selector {string}|{object} a class or DOM element
 * @return the filtered target or null if no element satisfied the selector.
 */
var filterTarget = function(target, parent, selector) {
  var elem = target,
    className, type = typeof selector;

  if(target == parent) {
    return null;
  } else {
    do {
      if(type === 'string') {
        className = ' ' + elem.className + ' ';
        if(elem.nodeType === 1 && className.replace(/[\t\r\n\f]/g, ' ').indexOf(selector) >= 0) {
          return elem;
        }
      } else {
        if(elem == selector) {
          return elem;
        }
      }

    } while((elem = elem.parentNode) && elem != parent && elem.nodeType !== 9);

    return null;
  }

};

var getClassList = function(element) {
  var classList,
    className = element.className.replace(/[\t\r\n\f]/g, ' ').trim();
  classList = className.split(' ');
  for(var i = 0; i < classList.length; i++) {
    if(/\s+/.test(classList[i])) {
      classList.splice(i, 1);
      i--;
    }
  }
  return classList;

};

// work with node element
var hasClass = function(element, className) {
  var classList = getClassList(element);
  return classList.indexOf(className) !== -1;
};

// query children by class(one or more)
var queryChildren = function(element, classList) {
  var children = element.children(),
    length = children.length,
    child,
    valid,
    classes;
  if(length > 0) {
    for(var i = 0; i < length; i++) {
      child = children.eq(i);
      valid = true;
      classes = getClassList(child[0]);
      if(classes.length > 0) {
        for(var j = 0; j < classList.length; j++) {
          if(classes.indexOf(classList[j]) === -1) {
            valid = false;
            break;
          }
        }
      }
      if(valid) {
        return child;
      }
    }
  }
  return [];
};

/**
 * Current support only drill down one level.
 * case insensitive
 * @param element
 * @param keyword
 */
var hasKeyword = function(element, keyword) {
  var childElements,
    index, length;
  if(element.text().toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
    return true;
  } else {
    childElements = element.children();
    length = childElements.length;
    for(index = 0; index < length; index++) {
      if(childElements.eq(index).text().toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
        return true;
      }
    }
    return false;
  }
};

function sibling( cur, dir ) {
  while ( (cur = cur[dir]) && cur.nodeType !== 1) {}
  return cur;
}


// map global property to local variable.
var jqLite = angular.element;

var deepEquals = angular.equals;

var deepCopy = angular.copy;

var extend = angular.extend;

var nyaBsSelect = angular.module('nya.bootstrap.select', []);

/**
 * A service for configuration. the configuration is shared globally.
 */
nyaBsSelect.provider('nyaBsConfig', function() {

  var locale = null;

  // default localized text. cannot be modified.
  var defaultText = {
    'en-us': {
      defaultNoneSelection: 'Nothing selected',
      noSearchResult: 'NO SEARCH RESULT',
      numberItemSelected: '%d item selected'
    }
  };

  // localized text which actually being used.
  var interfaceText = deepCopy(defaultText);

  /**
   * Merge with default localized text.
   * @param localeId a string formatted as languageId-countryId
   * @param obj localized text object.
   */
  this.setLocalizedText = function(localeId, obj) {
    if(!localeId) {
      throw new Error('localeId must be a string formatted as languageId-countryId');
    }
    if(!interfaceText[localeId]) {
      interfaceText[localeId] = {};
    }
    interfaceText[localeId] = extend(interfaceText[localeId], obj);
  };

  /**
   * Force to use a special locale id. if localeId is null. reset to user-agent locale.
   * @param localeId a string formatted as languageId-countryId
   */
  this.useLocale = function(localeId) {
    locale = localeId;
  };

  /**
   * get the localized text according current locale or forced locale
   * @returns localizedText
   */
  this.$get = ['$locale', function($locale){
    var localizedText;
    if(locale) {
      localizedText = interfaceText[locale];
    } else {
      localizedText = interfaceText[$locale.id];
    }
    if(!localizedText) {
      localizedText = defaultText['en-us'];
    }
    return localizedText;
  }];

});


nyaBsSelect.controller('nyaBsSelectCtrl', function(){

  var self = this;

  // keyIdentifier and valueIdentifier are set by nyaBsOption directive
  // used by nyaBsSelect directive to retrieve key and value from each nyaBsOption's child scope.
  self.keyIdentifier = null;
  self.valueIdentifier = null;

  self.isMultiple = false;

  // Should be override by nyaBsSelect directive and called by nyaBsOption directive when collection is changed.
  self.onCollectionChange = function(){};

  // for debug
  self.setId = function(id) {
    self.id = id || 'id#' + Math.floor(Math.random() * 10000);
  };

});
nyaBsSelect.directive('nyaBsSelect', ['$parse', '$document', '$timeout', 'nyaBsConfig', function ($parse, $document, $timeout, nyaBsConfig) {

  var DEFAULT_NONE_SELECTION = 'Nothing selected';

  var DROPDOWN_TOGGLE = '<button class="btn btn-default dropdown-toggle" type="button">' +
    '<span class="pull-left filter-option"></span>' +
    '&nbsp;' +
    '<span class="caret"></span>' +
    '</button>';

  var DROPDOWN_CONTAINER = '<div class="dropdown-menu open"></div>';

  var SEARCH_BOX = '<div class="bs-searchbox">' +
    '<input type="text" class="form-control">' +
    '</div>';

  var DROPDOWN_MENU = '<ul class="dropdown-menu inner"></ul>';

  var NO_SEARCH_RESULT = '<li class="no-search-result"><span>NO SEARCH RESULT</span></li>';

  return {
    restrict: 'ECA',
    require: ['ngModel', 'nyaBsSelect'],
    controller: 'nyaBsSelectCtrl',
    compile: function nyaBsSelectCompile (tElement, tAttrs){
      

      tElement.addClass('btn-group');

      var getDefaultNoneSelectionContent = function() {
        // text node or jqLite element.
        var content;

        if(tAttrs.titleTpl) {
          // use title-tpl attribute value.
          content = jqLite(tAttrs.titleTpl);
        } else if(tAttrs.title) {
          // use title attribute value.
          content = document.createTextNode(tAttrs.title);
        } else if(localizedText.defaultNoneSelectionTpl){
          // use localized text template.
          content = jqLite(localizedText.defaultNoneSelectionTpl);
        } else if(localizedText.defaultNoneSelection) {
          // use localized text.
          content = document.createTextNode(localizedText.defaultNoneSelection);
        } else {
          // use default.
          content = document.createTextNode(DEFAULT_NONE_SELECTION);
        }
        return content;
      };

      var options = tElement.children(),
        dropdownToggle = jqLite(DROPDOWN_TOGGLE),
        dropdownContainer = jqLite(DROPDOWN_CONTAINER),
        dropdownMenu = jqLite(DROPDOWN_MENU),
        searchBox,
        noSearchResult,
        classList,
        length,
        index,
        liElement,
        localizedText = nyaBsConfig;

      classList = getClassList(tElement[0]);
      classList.forEach(function(className) {
        if(/btn-(?:primary|info|success|warning|danger|inverse)/.test(className)) {
          tElement.removeClass(className);
          dropdownToggle.removeClass('btn-default');
          dropdownToggle.addClass(className);
        }

        //if(/btn-(?:lg|sm|xs)/.test(className)) {
        //  tElement.removeClass(className);
        //  dropdownToggle.addClass(className);
        //}

        if(className === 'form-control') {
          dropdownToggle.addClass(className);
        }
      });

      dropdownMenu.append(options);

      // add tabindex to children anchor elements if not present.
      // tabindex attribute will give an anchor element ability to be get focused.
      length = options.length;
      for(index = 0; index < length; index++) {
        liElement = options.eq(index);
        if(liElement.hasClass('nya-bs-option') || liElement.attr('nya-bs-option')) {
          liElement.find('a').attr('tabindex', '0');
        }
      }

      if(tAttrs.liveSearch === 'true') {
        searchBox = jqLite(SEARCH_BOX);

        // set localized text
        if(localizedText.noSearchResultTpl) {
          NO_SEARCH_RESULT = NO_SEARCH_RESULT.replace('NO SEARCH RESULT', localizedText.noSearchResultTpl);
        } else if(localizedText.noSearchResult) {
          NO_SEARCH_RESULT = NO_SEARCH_RESULT.replace('NO SEARCH RESULT', localizedText.noSearchResult);
        }

        noSearchResult = jqLite(NO_SEARCH_RESULT);
        dropdownContainer.append(searchBox);
        dropdownMenu.append(noSearchResult);
      }

      // set default none selection text
      dropdownToggle.children().eq(0).append(getDefaultNoneSelectionContent());

      dropdownContainer.append(dropdownMenu);

      tElement.append(dropdownToggle);
      tElement.append(dropdownContainer);

      return function nyaBsSelectLink ($scope, $element, $attrs, ctrls) {
        
        var ngCtrl = ctrls[0],
          nyaBsSelectCtrl = ctrls[1],
          liHeight,
          isDisabled = false,
          previousTabIndex,
          valueExpFn,
          valueExpGetter = $parse(nyaBsSelectCtrl.valueExp),
          isMultiple = typeof $attrs.multiple !== 'undefined';

        // find element from current $element root. because the compiled element may be detached from DOM tree by ng-if or ng-switch.
        var dropdownToggle = queryChildren($element, ['dropdown-toggle']),
          dropdownContainer = dropdownToggle.next(),
          dropdownMenu = queryChildren(dropdownContainer, ['dropdown-menu', 'inner']),
          searchBox = queryChildren(dropdownContainer, ['bs-searchbox']),
          noSearchResult = queryChildren(dropdownMenu, ['no-search-result']);

        if(nyaBsSelectCtrl.valueExp) {
          valueExpFn = function(scope, locals) {
            return valueExpGetter(scope, locals);
          };
        }

        // for debug
        nyaBsSelectCtrl.setId($element.attr('id'));

        if (isMultiple) {
          nyaBsSelectCtrl.isMultiple = true;

          // required validator
          ngCtrl.$isEmpty = function(value) {
            return !value || value.length === 0;
          };
        }
        if(typeof $attrs.disabled !== 'undefined') {
          $scope.$watch($attrs.disabled, function(disabled){
            if(!!disabled) {
              dropdownToggle.addClass('disabled');
              previousTabIndex = dropdownToggle.attr('tabindex');
              dropdownToggle.attr('tabindex', '-1');
              isDisabled = true;
            } else {
              dropdownToggle.removeClass('disabled');
              if(previousTabIndex) {
                dropdownToggle.attr('tabindex', previousTabIndex);
              } else {
                dropdownToggle.removeAttr('tabindex');
              }
              isDisabled = false;
            }
          });
        }

        /**
         * Do some check on modelValue. remove no existing value
         * @param values
         */
        nyaBsSelectCtrl.onCollectionChange = function (values) {
          var valuesForSelect = [],
            index,
            length,
            modelValue = ngCtrl.$modelValue;

          if(!modelValue) {
            return;
          }

          if(!values || values.length === 0) {
            if(isMultiple) {
              modelValue = [];
            } else {
              modelValue = null;
            }
          } else {

            if(valueExpFn) {
              for(index = 0; index < values.length; index++) {
                valuesForSelect.push(valueExpFn($scope, values[index]));
              }
            } else {
              for(index = 0; index < values.length; index++) {
                if(nyaBsSelectCtrl.valueIdentifier) {
                  valuesForSelect.push(values[index][nyaBsSelectCtrl.valueIdentifier]);
                } else if(nyaBsSelectCtrl.keyIdentifier) {
                  valuesForSelect.push(values[index][nyaBsSelectCtrl.keyIdentifier]);
                }
              }

            }

            if(isMultiple) {
              length = modelValue.length;
              for(index = 0; index < modelValue.length; index++) {
                if(!contains(valuesForSelect, modelValue[index])) {
                  modelValue.splice(index, 1);
                  index--;
                }
              }

              if(length !== modelValue.length) {
                // modelValue changed.
                // Due to ngModelController compare reference with the old modelValue, we must set an new array instead of modifying the old one.
                // See: https://github.com/angular/angular.js/issues/1751
                modelValue = deepCopy(modelValue);
              }

            } else {
              if(!contains(valuesForSelect, modelValue)) {
                modelValue = valuesForSelect[0];
              }
            }

          }

          ngCtrl.$setViewValue(modelValue);

          updateButtonContent();

        };

        // view --> model

        dropdownMenu.on('click', function menuEventHandler (event) {
          if(isDisabled) {
            return;
          }

          if(jqLite(event.target).hasClass('dropdown-header')) {
            return;
          }
          var nyaBsOptionNode = filterTarget(event.target, dropdownMenu[0], 'nya-bs-option'),
            nyaBsOption;

          if(nyaBsOptionNode !== null) {
            nyaBsOption = jqLite(nyaBsOptionNode);
            if(nyaBsOption.hasClass('disabled')) {
              return;
            }
            selectOption(nyaBsOption);
          }
        });

        // if click the outside of dropdown menu, close the dropdown menu
        $document.on('click', function(event) {
          if(filterTarget(event.target, $element.parent()[0], $element[0]) === null) {
            if($element.hasClass('open')) {
              $element.triggerHandler('blur');
            }
            $element.removeClass('open');
          }
        });
        

        dropdownToggle.on('blur', function() {
          if(!$element.hasClass('open')) {
            $element.triggerHandler('blur');
          }
        });
        dropdownToggle.on('click', function() {
          var nyaBsOptionNode;
          $element.toggleClass('open');
          if($element.hasClass('open') && typeof liHeight === 'undefined') {
            calcMenuSize();
          }
          if($attrs.liveSearch === 'true' && $element.hasClass('open')) {
            searchBox.children().eq(0)[0].focus();
            nyaBsOptionNode = findFocus(true);
            if(nyaBsOptionNode) {
              dropdownMenu.children().removeClass('active');
              jqLite(nyaBsOptionNode).addClass('active');
            }
          } else if($element.hasClass('open')) {
            nyaBsOptionNode = findFocus(true);
            if(nyaBsOptionNode) {
              setFocus(nyaBsOptionNode);
            }
          }
        });

        // live search
        if($attrs.liveSearch === 'true') {
          searchBox.children().on('input', function(){

            var searchKeyword = searchBox.children().val(),
              found = 0,
              options = dropdownMenu.children(),
              length = options.length,
              index,
              option,
              nyaBsOptionNode;

            if(searchKeyword) {
              for(index = 0; index < length; index++) {
                option = options.eq(index);
                if(option.hasClass('nya-bs-option')) {
                  if(!hasKeyword(option.find('a'), searchKeyword)) {
                    option.addClass('not-match');
                  } else {
                    option.removeClass('not-match');
                    found++;
                  }
                }
              }

              if(found === 0) {
                noSearchResult.addClass('show');
              } else {
                noSearchResult.removeClass('show');
              }
            } else {
              for(index = 0; index < length; index++) {
                option = options.eq(index);
                if(option.hasClass('nya-bs-option')) {
                  option.removeClass('not-match');
                }
              }
              noSearchResult.removeClass('show');
            }

            nyaBsOptionNode = findFocus(true);

            if(nyaBsOptionNode) {
              options.removeClass('active');
              jqLite(nyaBsOptionNode).addClass('active');
            }

          });
        }


        // model --> view

        ngCtrl.$render = function() {
          var modelValue = ngCtrl.$modelValue,
            index,
            bsOptionElements = dropdownMenu.children(),
            length = bsOptionElements.length,
            value;
          if(typeof modelValue === 'undefined') {
            // if modelValue is undefined. uncheck all option
            for(index = 0; index < length; index++) {
              if(bsOptionElements.eq(index).hasClass('nya-bs-option')) {
                bsOptionElements.eq(index).removeClass('selected');
              }
            }
          } else {
            for(index = 0; index < length; index++) {
              if(bsOptionElements.eq(index).hasClass('nya-bs-option')) {

                value = getOptionValue(bsOptionElements.eq(index));
                if(isMultiple) {
                  if(contains(modelValue, value)) {
                    bsOptionElements.eq(index).addClass('selected');
                  } else {
                    bsOptionElements.eq(index).removeClass('selected');
                  }
                } else {
                  if(deepEquals(modelValue, value)) {
                    bsOptionElements.eq(index).addClass('selected');
                  } else {
                    bsOptionElements.eq(index).removeClass('selected');
                  }
                }

              }
            }
          }
          
          updateButtonContent();
        };

        // simple keyboard support
        $element.on('keydown', function(event){
          var keyCode = event.keyCode;

          if(keyCode !== 27 && keyCode !== 13 && keyCode !== 38 && keyCode !== 40) {
            // we only handle special keys. don't waste time to traverse the dom tree.
            return;
          }

          // prevent a click event to be fired.
          event.preventDefault();
          if(isDisabled) {
            event.stopPropagation();
            return;
          }
          var toggleButton = filterTarget(event.target, $element[0], dropdownToggle[0]),
            menuContainer,
            searchBoxContainer,
            liElement,
            nyaBsOptionNode;

          if($attrs.liveSearch === 'true') {
            searchBoxContainer = filterTarget(event.target, $element[0], searchBox[0]);
          } else {
            menuContainer = filterTarget(event.target, $element[0], dropdownContainer[0])
          }

          if(toggleButton) {
            

            // press enter to active dropdown
            if((keyCode === 13 || keyCode === 38 || keyCode === 40) && !$element.hasClass('open')) {

              event.stopPropagation();

              $element.addClass('open');

              // calculate menu size
              if(typeof liHeight === 'undefined') {
                calcMenuSize();
              }

              // if live search enabled. give focus to search box.
              if($attrs.liveSearch === 'true') {
                searchBox.children().eq(0)[0].focus();
                // find the focusable node but we will use active
                nyaBsOptionNode = findFocus(true);
                if(nyaBsOptionNode) {
                  // remove previous active state
                  dropdownMenu.children().removeClass('active');
                  // set active to first focusable element
                  jqLite(nyaBsOptionNode).addClass('active');
                }
              } else {
                // otherwise, give focus to first menu item.
                nyaBsOptionNode = findFocus(true);
                if(nyaBsOptionNode) {
                  setFocus(nyaBsOptionNode);
                }
              }
            }

            // press enter or escape to de-active dropdown
            //if((keyCode === 13 || keyCode === 27) && $element.hasClass('open')) {
            //  $element.removeClass('open');
            //  event.stopPropagation();
            //}
          } else if(menuContainer) {

            if(keyCode === 27) {
              // escape pressed
              dropdownToggle[0].focus();
              if($element.hasClass('open')) {
                $element.triggerHandler('blur');
              }
              $element.removeClass('open');
              event.stopPropagation();

            } else if(keyCode === 38) {
              event.stopPropagation();
              // up arrow key
              nyaBsOptionNode = findNextFocus(event.target.parentNode, 'previousSibling');
              if(nyaBsOptionNode) {
                setFocus(nyaBsOptionNode);
              } else {
                nyaBsOptionNode = findFocus(false);
                if(nyaBsOptionNode) {
                  setFocus(nyaBsOptionNode);
                }
              }
            } else if(keyCode === 40) {
              event.stopPropagation();
              // down arrow key
              nyaBsOptionNode = findNextFocus(event.target.parentNode, 'nextSibling');
              if(nyaBsOptionNode) {
                setFocus(nyaBsOptionNode);
              } else {
                nyaBsOptionNode = findFocus(true);
                if(nyaBsOptionNode) {
                  setFocus(nyaBsOptionNode);
                }
              }
            } else if(keyCode === 13) {
              event.stopPropagation();
              // enter pressed
              liElement = jqLite(event.target.parentNode);
              if(liElement.hasClass('nya-bs-option')) {
                selectOption(liElement);
                if(!isMultiple) {
                  dropdownToggle[0].focus();
                }
              }
            }
          } else if(searchBoxContainer) {
            if(keyCode === 27) {
              dropdownToggle[0].focus();
              $element.removeClass('open');
              event.stopPropagation();
            } else if(keyCode === 38) {
              // up
              event.stopPropagation();

              liElement = findActive();
              if(liElement) {
                nyaBsOptionNode = findNextFocus(liElement[0], 'previousSibling');
                if(nyaBsOptionNode) {
                  liElement.removeClass('active');
                  jqLite(nyaBsOptionNode).addClass('active');
                } else {
                  nyaBsOptionNode = findFocus(false);
                  if(nyaBsOptionNode) {
                    liElement.removeClass('active');
                    jqLite(nyaBsOptionNode).addClass('active');
                  }
                }
              }

            } else if(keyCode === 40) {
              // down
              event.stopPropagation();

              liElement = findActive();
              if(liElement) {
                nyaBsOptionNode = findNextFocus(liElement[0], 'nextSibling');
                if(nyaBsOptionNode) {
                  liElement.removeClass('active');
                  jqLite(nyaBsOptionNode).addClass('active');
                } else {
                  nyaBsOptionNode = findFocus(true);
                  if(nyaBsOptionNode) {
                    liElement.removeClass('active');
                    jqLite(nyaBsOptionNode).addClass('active');
                  }
                }
              }
            } else if(keyCode === 13) {
              // select an option.
              liElement = findActive();
              if(liElement) {
                selectOption(liElement);
                if(!isMultiple) {
                  dropdownToggle[0].focus();
                }
              }
            }
          }
        });

        function findActive() {
          var list = dropdownMenu.children(),
            i, liElement,
            length = list.length;
          for(i = 0; i < length; i++) {
            liElement = list.eq(i);
            if(liElement.hasClass('active') && liElement.hasClass('nya-bs-option')) {
              return liElement;
            }
          }
          return null;
        }

        /**
         * setFocus on a nya-bs-option element. it actually set focus on its child anchor element.
         * @param elem a nya-bs-option element.
         */
        function setFocus(elem) {
          var childList = elem.childNodes,
            length = childList.length,
            child;
          for(var i = 0; i < length; i++) {
            child = childList[i];
            if(child.nodeType === 1 && child.tagName.toLowerCase() === 'a') {
              child.focus();
              break;
            }
          }
        }

        function findFocus(fromFirst) {
          var firstLiElement;
          if(fromFirst) {
            firstLiElement = dropdownMenu.children().eq(0);
          } else {
            firstLiElement = dropdownMenu.children().eq(dropdownMenu.children().length - 1);
          }

          // focus on selected element
          for(var i = 0; i < dropdownMenu.children().length; i++) {
            if(dropdownMenu.children().eq(i).hasClass('selected')) {
              return dropdownMenu.children().eq(i)[0];
            }
          }

          if(firstLiElement.hasClass('nya-bs-option') && !firstLiElement.hasClass('disabled') && !firstLiElement.hasClass('not-match')) {
            return firstLiElement[0];
          } else {
            if(fromFirst) {
              return findNextFocus(firstLiElement[0], 'nextSibling');
            } else {
              return findNextFocus(firstLiElement[0], 'previousSibling');
            }
          }
        }

        /**
         * find next focusable element on direction
         * @param from the element traversed from
         * @param direction can be 'nextSibling' or 'previousSibling'
         * @returns the element if found, otherwise return null.
         */
        function findNextFocus(from, direction) {
          if(from && !hasClass(from, 'nya-bs-option')) {
            return;
          }
          var next = from;
          while ((next = sibling(next, direction)) && next.nodeType) {
            if(hasClass(next,'nya-bs-option') && !hasClass(next, 'disabled') && !hasClass(next, 'not-match')) {
              return next
            }
          }
          return null;
        }

        /**
         * select an option represented by nyaBsOption argument. Get the option's value and update model.
         * if isMultiple = true, doesn't close dropdown menu. otherwise close the menu.
         * @param nyaBsOption the jqLite wrapped `nya-bs-option` element.
         */
        function selectOption(nyaBsOption) {
          var value,
            viewValue,
            modelValue = ngCtrl.$modelValue,
            index;
          // if user specify the value attribute. we should use the value attribute
          // otherwise, use the valueIdentifier specified field in target scope

          value = getOptionValue(nyaBsOption);

          if(typeof value !== 'undefined') {
            if(isMultiple) {
              // make a deep copy enforce ngModelController to call its $render method.
              // See: https://github.com/angular/angular.js/issues/1751
              viewValue = Array.isArray(modelValue) ? deepCopy(modelValue) : [];
              index = indexOf(viewValue, value);
              if(index === -1) {
                // check element
                viewValue.push(value);
                nyaBsOption.addClass('selected');

              } else {
                // uncheck element
                viewValue.splice(index, 1);
                nyaBsOption.removeClass('selected');

              }

            } else {
              dropdownMenu.children().removeClass('selected');
              viewValue = value;
              nyaBsOption.addClass('selected');

            }
          }
          // update view value regardless
          ngCtrl.$setViewValue(viewValue);
          $scope.$digest();

          if(!isMultiple) {
            // in single selection mode. close the dropdown menu
            if($element.hasClass('open')) {
              $element.triggerHandler('blur');
            }
            $element.removeClass('open');
          }
          updateButtonContent();
        }

        /**
         * get a value of current nyaBsOption. according to different setting.
         * - if `nya-bs-option` directive is used to populate options and a `value` attribute is specified. use expression of the attribute value.
         * - if `nya-bs-option` directive is used to populate options and no other settings, use the valueIdentifier or keyIdentifier to retrieve value from scope of current nyaBsOption.
         * - if `nya-bs-option` class is used on static options. use literal value of the `value` attribute.
         * @param nyaBsOption a jqLite wrapped `nya-bs-option` element
         */
        function getOptionValue(nyaBsOption) {
          var scopeOfOption;
          if(valueExpFn) {
            scopeOfOption = nyaBsOption.scope();
            return valueExpFn(scopeOfOption);
          } else {
            if(nyaBsSelectCtrl.valueIdentifier || nyaBsSelectCtrl.keyIdentifier) {
              scopeOfOption = nyaBsOption.scope();
              return scopeOfOption[nyaBsSelectCtrl.valueIdentifier] || scopeOfOption[nyaBsSelectCtrl.keyIdentifier];
            } else {
              return nyaBsOption.attr('value');
            }
          }

        }

        function getOptionText(nyaBsOption) {
          var item = nyaBsOption.find('a');
          if(item.children().length === 0 || item.children().eq(0).hasClass('check-mark')) {
            // if the first child is check-mark or has no children, means the option text is text node
            return item[0].firstChild.cloneNode(false);
          } else {
            // otherwise we clone the first element of the item
            return item.children().eq(0)[0].cloneNode(true);
          }
        }

        function updateButtonContent() {
          var modelValue = ngCtrl.$modelValue;
          $element.triggerHandler('change');

          var filterOption = dropdownToggle.children().eq(0);
          if(typeof modelValue === 'undefined') {
            /**
             * Select empty option when model is undefined.
             */
            filterOption.empty();
            filterOption.append(getDefaultNoneSelectionContent());
            return;
          }
          if(isMultiple && modelValue.length === 0) {
            filterOption.empty();
            filterOption.append(getDefaultNoneSelectionContent());
          } else {
            $timeout(function() {

              var bsOptionElements = dropdownMenu.children(),
                value,
                nyaBsOption,
                index,
                length = bsOptionElements.length,
                optionTitle,
                selection = [],
                match,
                count;

              if(isMultiple && $attrs.selectedTextFormat === 'count') {
                count = 1;
              } else if(isMultiple && $attrs.selectedTextFormat && (match = $attrs.selectedTextFormat.match(/\s*count\s*>\s*(\d+)\s*/))) {
                count = parseInt(match[1], 10);
              }

              // data-selected-text-format="count" or data-selected-text-format="count>x"
              if((typeof count !== 'undefined') && modelValue.length > count) {
                filterOption.empty();
                if(localizedText.numberItemSelectedTpl) {
                  filterOption.append(jqLite(localizedText.numberItemSelectedTpl.replace('%d', modelValue.length)));
                } else if(localizedText.numberItemSelected) {
                  filterOption.append(document.createTextNode(localizedText.numberItemSelected.replace('%d', modelValue.length)));
                } else {
                  filterOption.append(document.createTextNode(modelValue.length + ' items selected'));
                }
                return;
              }

              // data-selected-text-format="values" or the number of selected items is less than count
              for(index = 0; index < length; index++) {
                nyaBsOption = bsOptionElements.eq(index);
                if(nyaBsOption.hasClass('nya-bs-option')) {

                  value = getOptionValue(nyaBsOption);

                  if(isMultiple) {
                    if(Array.isArray(modelValue) && contains(modelValue, value)) {
                      // if option has an title attribute. use the title value as content show in button.
                      // otherwise get very first child element.
                      optionTitle = nyaBsOption.attr('title');
                      if(optionTitle) {
                        selection.push(document.createTextNode(optionTitle));
                      } else {
                        selection.push(getOptionText(nyaBsOption));
                      }

                    }
                  } else {
                    if(deepEquals(modelValue, value)) {
                      optionTitle = nyaBsOption.attr('title');
                      if(optionTitle) {
                        selection.push(document.createTextNode(optionTitle));
                      } else {
                        selection.push(getOptionText(nyaBsOption));
                      }
                    }
                  }

                }
              }

              if(selection.length === 0) {
                filterOption.empty();
                filterOption.append(getDefaultNoneSelectionContent());
              } else if(selection.length === 1) {
                // either single or multiple selection will show the only selected content.
                filterOption.empty();
                filterOption.append(selection[0]);
              } else {
                filterOption.empty();
                for(index = 0; index < selection.length; index++) {
                  filterOption.append(selection[index]);
                  if(index < selection.length -1) {
                    filterOption.append(document.createTextNode(', '));
                  }
                }
              }

            });
          }

        }

        // will called only once.
        function calcMenuSize(){

          var liElements = dropdownMenu.find('li'),
            length = liElements.length,
            liElement,
            i;
          for(i = 0; i < length; i++) {
            liElement = liElements.eq(i);
            if(liElement.hasClass('nya-bs-option') || liElement.attr('nya-bs-option')) {
              liHeight = liElement[0].clientHeight;
              break;
            }
          }

          if(/\d+/.test($attrs.size)) {
            var dropdownSize = parseInt($attrs.size, 10);
            dropdownMenu.css('max-height', (dropdownSize * liHeight) + 'px');
            dropdownMenu.css('overflow-y', 'auto');
          }

        }

      };
    }
  };
}]);

nyaBsSelect.directive('nyaBsOption', ['$parse', function($parse){

                        //00000011111111111111100000000022222222222222200000003333333333333330000000000000004444444444000000000000000000055555555550000000000000000000006666666666000000
  var BS_OPTION_REGEX = /^\s*(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/;

  return {
    restrict: 'A',
    transclude: 'element',
    priority: 1000,
    terminal: true,
    require: ['^nyaBsSelect', '^ngModel'],
    compile: function nyaBsOptionCompile (tElement, tAttrs) {

      var expression = tAttrs.nyaBsOption;
      var nyaBsOptionEndComment = document.createComment(' end nyaBsOption: ' + expression + ' ');
      var match = expression.match(BS_OPTION_REGEX);

      if(!match) {
        throw new Error('invalid expression');
      }

      // we want to keep our expression comprehensible so we don't use 'select as label for value in collection' expression.
      var valueExp = tAttrs.value,
        valueExpGetter = valueExp ? $parse(valueExp) : null;

      var valueIdentifier = match[3] || match[1],
        keyIdentifier = match[2],
        collectionExp = match[4],
        groupByExpGetter = match[5] ? $parse(match[5]) : null,
        trackByExp = match[6];

      var trackByIdArrayFn,
        trackByIdObjFn,
        trackByIdExpFn,
        trackByExpGetter;
      var hashFnLocals = {$id: hashKey};
      var groupByFn, locals = {};

      if(trackByExp) {
        trackByExpGetter = $parse(trackByExp);
      } else {
        trackByIdArrayFn = function(key, value) {
          return hashKey(value);
        };
        trackByIdObjFn = function(key) {
          return key;
        };
      }
      return function nyaBsOptionLink($scope, $element, $attr, ctrls, $transclude) {

        var nyaBsSelectCtrl = ctrls[0],
          ngCtrl = ctrls[1],
          valueExpFn,
          valueExpLocals = {};

        if(trackByExpGetter) {
          trackByIdExpFn = function(key, value, index) {
            // assign key, value, and $index to the locals so that they can be used in hash functions
            if (keyIdentifier) {
              hashFnLocals[keyIdentifier] = key;
            }
            hashFnLocals[valueIdentifier] = value;
            hashFnLocals.$index = index;
            return trackByExpGetter($scope, hashFnLocals);
          };
        }

        if(groupByExpGetter) {
          groupByFn = function(key, value) {
            if(keyIdentifier) {
              locals[keyIdentifier] = key;
            }
            locals[valueIdentifier] = value;
            return groupByExpGetter($scope, locals);
          }
        }

        // set keyIdentifier and valueIdentifier property of nyaBsSelectCtrl
        if(keyIdentifier) {
          nyaBsSelectCtrl.keyIdentifier = keyIdentifier;
        }
        if(valueIdentifier) {
          nyaBsSelectCtrl.valueIdentifier = valueIdentifier;
        }

        if(valueExpGetter) {
          nyaBsSelectCtrl.valueExp = valueExp;
          valueExpFn = function(key, value) {
            if(keyIdentifier) {
              valueExpLocals[keyIdentifier] = key;
            }
            valueExpLocals[valueIdentifier] = value;
            return valueExpGetter($scope, valueExpLocals);
          }

        }


        // Store a list of elements from previous run. This is a hash where key is the item from the
        // iterator, and the value is objects with following properties.
        //   - scope: bound scope
        //   - element: previous element.
        //   - index: position
        //
        // We are using no-proto object so that we don't need to guard against inherited props via
        // hasOwnProperty.
        var lastBlockMap = createMap();

        // deepWatch will impact performance. use with caution.
        if($attr.deepWatch === 'true') {
          $scope.$watch(collectionExp, nyaBsOptionAction, true);
        } else {
          $scope.$watchCollection(collectionExp, nyaBsOptionAction);
        }

        function nyaBsOptionAction(collection) {
          var index,

            previousNode = $element[0],     // node that cloned nodes should be inserted after
          // initialized to the comment node anchor

            key, value,
            trackById,
            trackByIdFn,
            collectionKeys,
            collectionLength,
          // Same as lastBlockMap but it has the current state. It will become the
          // lastBlockMap on the next iteration.
            nextBlockMap = createMap(),
            nextBlockOrder,
            block,
            groupName,
            nextNode,
            group,
            lastGroup,

            values = [],
            valueObj; // the collection value

          if(groupByFn) {
            group = [];
          }

          if(isArrayLike(collection)) {
            collectionKeys = collection;
            trackByIdFn = trackByIdExpFn || trackByIdArrayFn;
          } else {
            trackByIdFn = trackByIdExpFn || trackByIdObjFn;
            // if object, extract keys, sort them and use to determine order of iteration over obj props
            collectionKeys = [];
            for (var itemKey in collection) {
              if (collection.hasOwnProperty(itemKey) && itemKey.charAt(0) != '$') {
                collectionKeys.push(itemKey);
              }
            }
            collectionKeys.sort();
          }
          collectionLength = collectionKeys.length;
          nextBlockOrder = new Array(collectionLength);

          for(index = 0; index < collectionLength; index++) {
            key = (collection === collectionKeys) ? index : collectionKeys[index];
            value = collection[key];
            trackById = trackByIdFn(key, value, index);

            // copy the value with scope like structure to notify the select directive.
            valueObj = {};
            if(keyIdentifier) {
              valueObj[keyIdentifier] = key;
            }

            valueObj[valueIdentifier] = value;
            values.push(valueObj);

            if(groupByFn) {
              groupName = groupByFn(key, value);
              if(group.indexOf(groupName) === -1 && groupName) {
                group.push(groupName);
              }
            }

            if(lastBlockMap[trackById]) {
              // found previously seen block
              block = lastBlockMap[trackById];
              delete lastBlockMap[trackById];

              // must update block here because some data we stored may change.
              if(groupByFn) {
                block.group = groupName;
              }
              block.key = key;
              block.value = value;

              nextBlockMap[trackById] = block;
              nextBlockOrder[index] = block;
            } else if(nextBlockMap[trackById]) {
              //if collision detected. restore lastBlockMap and throw an error
              nextBlockOrder.forEach(function(block) {
                if(block && block.scope) {
                  lastBlockMap[block.id] = block;
                }
              });
              throw new Error("Duplicates in a select are not allowed. Use 'track by' expression to specify unique keys.");
            } else {
              // new never before seen block
              nextBlockOrder[index] = {id: trackById, scope: undefined, clone: undefined, key: key, value: value};
              nextBlockMap[trackById] = true;
              if(groupName) {
                nextBlockOrder[index].group = groupName;
              }
            }
          }

          // only resort nextBlockOrder when group found
          if(group && group.length > 0) {

            nextBlockOrder = sortByGroup(nextBlockOrder, group, 'group');
          }

          // remove DOM nodes
          for( var blockKey in lastBlockMap) {
            block = lastBlockMap[blockKey];
            getBlockNodes(block.clone).remove();
            block.scope.$destroy();
          }

          for(index = 0; index < collectionLength; index++) {
            block = nextBlockOrder[index];
            if(block.scope) {
              // if we have already seen this object, then we need to reuse the
              // associated scope/element

              nextNode = previousNode;
              if(getBlockStart(block) != nextNode) {
                jqLite(previousNode).after(block.clone);
              }
              previousNode = getBlockEnd(block);

              updateScope(block.scope, index, valueIdentifier, block.value, keyIdentifier, block.key, collectionLength, block.group);
            } else {
              $transclude(function nyaBsOptionTransclude(clone, scope) {
                block.scope = scope;

                var endNode = nyaBsOptionEndComment.cloneNode(false);
                clone[clone.length++] = endNode;

                jqLite(previousNode).after(clone);

                // add nya-bs-option class

                clone.addClass('nya-bs-option');

                // for newly created item we need to ensure its selected status from the model value.
                if(valueExpFn) {
                  value = valueExpFn(block.key, block.value);
                } else {
                  value = block.value || block.key;
                }

                if(nyaBsSelectCtrl.isMultiple) {
                  if(Array.isArray(ngCtrl.$modelValue) && contains(ngCtrl.$modelValue, value)) {
                    clone.addClass('selected');
                  }
                } else {
                  if(deepEquals(value, ngCtrl.$modelValue)) {
                    clone.addClass('selected');
                  }
                }

                previousNode = endNode;
                // Note: We only need the first/last node of the cloned nodes.
                // However, we need to keep the reference to the jqlite wrapper as it might be changed later
                // by a directive with templateUrl when its template arrives.
                block.clone = clone;
                nextBlockMap[block.id] = block;
                updateScope(block.scope, index, valueIdentifier, block.value, keyIdentifier, block.key, collectionLength, block.group);
              });

            }

            // we need to mark the first item of a group
            if(group) {
              if(!lastGroup || lastGroup !== block.group) {
                block.clone.addClass('first-in-group');
              } else {
                block.clone.removeClass('first-in-group');
              }

              lastGroup = block.group;

              // add special class for indent
              block.clone.addClass('group-item');
            }
          }

          lastBlockMap = nextBlockMap;

          nyaBsSelectCtrl.onCollectionChange(values);
        }
      };
    }
  }
}]);


})();