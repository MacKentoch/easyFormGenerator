!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in p||(p[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==v.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=p[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(v.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=p[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return x[e]||(x[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},r.name);t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=p[s],v=x[s];v?l=v.exports:c&&!c.declarative?l=c.esModule:c?(d(c),v=c.module,l=v.exports):l=f(s),v&&v.importers?(v.importers.push(t),t.dependencies.push(v)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=p[e];if(t)t.declarative?c(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=f(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=p[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){if(r===e)return r;var t={};if("object"==typeof r||"function"==typeof r)if(g){var n;for(var o in r)(n=Object.getOwnPropertyDescriptor(r,o))&&h(t,o,n)}else{var a=r&&r.hasOwnProperty;for(var o in r)(!a||r.hasOwnProperty(o))&&(t[o]=r[o])}return t["default"]=r,h(t,"__useDefault",{value:!0}),t}function c(r,t){var n=p[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==v.call(t,u)&&(p[u]?c(u,t):f(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function f(e){if(D[e])return D[e];if("@node/"==e.substr(0,6))return y(e.substr(6));var r=p[e];if(!r)throw"Module "+e+" not present.";return a(e),c(e,[]),p[e]=void 0,r.declarative&&h(r.module.exports,"__esModule",{value:!0}),D[e]=r.declarative?r.module.exports:r.esModule}var p={},v=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},g=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(m){g=!1}var h;!function(){try{Object.defineProperty({},"a",{})&&(h=Object.defineProperty)}catch(e){h=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var x={},y="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,D={"@empty":{}};return function(e,n,o){return function(a){a(function(a){for(var u={_nodeRequire:y,register:r,registerDynamic:t,get:f,set:function(e,r){D[e]=r},newModule:function(e){return e}},d=0;d<n.length;d++)(function(e,r){r&&r.__esModule?D[e]=r:D[e]=s(r)})(n[d],arguments[d]);o(u);var i=f(e[0]);if(e.length>1)for(var d=1;d<e.length;d++)f(e[d]);return i.__useDefault?i["default"]:i})}}}("undefined"!=typeof self?self:global)

(["1"], [], function($__System) {

!function(){var t=$__System;if("undefined"!=typeof window&&"undefined"!=typeof document&&window.location)var s=location.protocol+"//"+location.hostname+(location.port?":"+location.port:"");t.set("@@cjs-helpers",t.newModule({getPathVars:function(t){var n,o=t.lastIndexOf("!");n=-1!=o?t.substr(0,o):t;var e=n.split("/");return e.pop(),e=e.join("/"),"file:///"==n.substr(0,8)?(n=n.substr(7),e=e.substr(7),isWindows&&(n=n.substr(1),e=e.substr(1))):s&&n.substr(0,s.length)===s&&(n=n.substr(s.length),e=e.substr(s.length)),{filename:n,dirname:e}}}))}();
$__System.register("2", [], function (_export) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export("default", window.angular);
    }
  };
});
$__System.register('3', [], function (_export) {
  'use strict';

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
      formlyDesciption: '',
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
      formlyDesciption: '',
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
      formlyDesciption: '',
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
      formlyDesciption: '',
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
      formlyDesciption: '',
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
            'class': 'glyphicon glyphicon-calendar',
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
      formlyDesciption: '',
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
      formlyDesciption: '',
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
      formlyDesciption: '',
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
      formlyDesciption: '',
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
      formlyDesciption: '',
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
      formlyDesciption: '',
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
      formlyDesciption: '',
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

  return {
    setters: [],
    execute: function () {
      formlyConfig.$inject = ['formlyConfigProvider', 'EasyFormGenFormlyBindingModelsProvider', 'easyFormDragWayConfigProvider'];

      _export('default', formlyConfig);
    }
  };
});
$__System.registerDynamic("4", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "stepway": {"version": "1.2.1-beta1"},
    "dragdropway": {"version": "1.2.0"},
    "formviewer": {"version": "1.2.0"}
  };
  global.define = __define;
  return module.exports;
});

$__System.register('5', ['4'], function (_export) {
  'use strict';

  var easyFormConfig, EASY_FORM_DD_VERSION_NAME, EASY_FORM_DD_VERSION_VALUE;

  function dragDropConfigFunct(easyFormDragWayConfigProvider) {
    easyFormDragWayConfigProvider.setItemsNotTocount({
      //placeholder :         '',
      itemBeingDragged: 'dndDraggingSource'
    });
  }

  return {
    setters: [function (_) {
      easyFormConfig = _['default'];
    }],
    execute: function () {
      EASY_FORM_DD_VERSION_NAME = 'easyFormGenVersion';
      EASY_FORM_DD_VERSION_VALUE = easyFormConfig.dragdropway.version;
      dragDropConfigFunct.$inject = ['easyFormDragWayConfigProvider'];

      _export('default', dragDropConfigFunct);

      _export('EASY_FORM_DD_VERSION_NAME', EASY_FORM_DD_VERSION_NAME);

      _export('EASY_FORM_DD_VERSION_VALUE', EASY_FORM_DD_VERSION_VALUE);
    }
  };
});
$__System.register('6', [], function (_export) {
	'use strict';

	var CORE_MODULES;
	return {
		setters: [],
		execute: function () {
			CORE_MODULES = ['textAngular', 'textAngularSetup', 'ngAnimate', 'toaster', 'formly', 'formlyBootstrap', 'ui.bootstrap', 'nya.bootstrap.select', 'mgcrea.ngStrap.affix'
			// 'pascalprecht.translate'	
			];

			_export('default', angular.module('easyFormGen.dragDropWay.core', CORE_MODULES));
		}
	};
});
$__System.register('7', [], function (_export) {
	'use strict';

	var dateFormats, setToday, clearDateTime;
	return {
		setters: [],
		execute: function () {
			dateFormats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];

			setToday = function setToday(datetimePickerModel) {
				datetimePickerModel.dt = new Date();
			};

			clearDateTime = function clearDateTime(datetimePickerModel) {
				datetimePickerModel.dt = new Date();
			};

			_export('dateFormats', dateFormats);

			_export('setToday', setToday);

			_export('clearDateTime', clearDateTime);
		}
	};
});
$__System.register('8', ['7', '9', 'a'], function (_export) {
	var dateFormats, setToday, clearDateTime, _createClass, _classCallCheck, LEFT_PANEL_CONTROLLER, LEFT_PANEL_CONTROLLERAS, leftPanelController;

	return {
		setters: [function (_2) {
			dateFormats = _2.dateFormats;
			setToday = _2.setToday;
			clearDateTime = _2.clearDateTime;
		}, function (_) {
			_createClass = _['default'];
		}, function (_a) {
			_classCallCheck = _a['default'];
		}],
		execute: function () {
			'use strict';

			LEFT_PANEL_CONTROLLER = 'leftPanelController';
			LEFT_PANEL_CONTROLLERAS = 'leftPanelCtrl';

			leftPanelController = (function () {
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
						this.demodt.formats = dateFormats;
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
							formlyDesciption: '',
							formlyOptions: []
						};
					}
				}, {
					key: 'resetControl',
					value: function resetControl() {
						this.proxyModel.temporyConfig.formlyLabel = '';
						this.proxyModel.temporyConfig.formlyRequired = false;
						this.proxyModel.temporyConfig.formlyPlaceholder = '';
						this.proxyModel.temporyConfig.formlyDesciption = '';
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
						setToday(this.demodt);
					}
				}, {
					key: 'clear',
					value: function clear() {
						clearDateTime(this.demodt);
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
			})();

			leftPanelController.$inject = ['toaster', '$timeout', '$selectOptionMange', 'controllerModalProxy'];

			_export('default', leftPanelController);

			_export('LEFT_PANEL_CONTROLLER', LEFT_PANEL_CONTROLLER);

			_export('LEFT_PANEL_CONTROLLERAS', LEFT_PANEL_CONTROLLERAS);
		}
	};
});
$__System.registerDynamic("b", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = "<div id=\"controlEditLeftPanel\">\n\t<div class=\"pull-right\">\n\t\t<button\n      type=\"button\"\n      class=\"close\"\n      ng-click=\"leftPanelCtrl.closeEditPanel()\"\n      aria-label=\"Close\">\n\t\t\t<span\n        aria-hidden=\"true\">\n        &times;\n      </span>\n\t\t</button>\n\t</div>\n\t<div class=\"separator10pixel\"></div>\n\t<div ng-switch on=\"leftPanelCtrl.proxyModel.temporyConfig.selectedControl\">\n\t\t<div ng-switch-when=\"none\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t<h5 class=\"text-center texteRouge\">\n            <i class=\"fa fa-arrow-up\"></i>\n            &nbsp;\n            Select a control\n          </h5>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div ng-switch-when=\"empty\">\n\t\t\t<left-panel-blank-control />\n\t\t</div>\n\t\t<div ng-switch-when=\"Header\">\n\t\t\t<left-panel-header-control />\n\t\t</div>\n\t\t<div ng-switch-when=\"Subtitle\">\n\t\t\t<left-panel-subtitle-control />\n\t\t</div>\n\t\t<div ng-switch-when=\"TextInput\">\n\t\t\t<left-panel-text-input-control />\n\t\t</div>\n\t\t<div ng-switch-when=\"Password\">\n\t\t\t<left-panel-password-control />\n\t\t</div>\n\t\t<div ng-switch-when=\"Date\">\n\t\t\t<left-panel-date-control />\n\t\t</div>\n\t\t<div ng-switch-when=\"Texarea\">\n\t\t\t<left-panel-textarea-control />\n\t\t</div>\n\t\t<div ng-switch-when=\"RichTextEditor\">\n\t\t\t<left-panel-rich-text-editor-control />\n\t\t</div>\n\t\t<div ng-switch-when=\"Radio\">\n\t\t\t<left-panel-radio-control />\n\t\t</div>\n\t\t<div ng-switch-when=\"Checkbox\">\n\t\t\t<left-panel-check-box-control />\n\t\t</div>\n\t\t<div ng-switch-when=\"BasicSelect\">\n\t\t\t<left-panel-basic-select-control />\n\t\t</div>\n\t\t<div ng-switch-when=\"GroupedSelect\">\n\t\t\t<left-panel-grouped-select-control />\n\t\t</div>\n\t</div>\n\t<button\n    class=\"btn btn-primary btn-block pull-right\"\n    ng-click=\"leftPanelCtrl.closeEditPanel()\">\n    Close\n  </button>\n</div>\n";
  global.define = __define;
  return module.exports;
});

$__System.register('c', ['8', 'b'], function (_export) {
	'use strict';

	var LEFT_PANEL_CONTROLLER, LEFT_PANEL_CONTROLLERAS, leftPanelTemplate, LEFT_PANEL_DIRECTIVE;

	function leftPanel() {
		var directive = {
			restrict: 'E',
			template: leftPanelTemplate,
			scope: {},
			controller: LEFT_PANEL_CONTROLLER,
			controllerAs: LEFT_PANEL_CONTROLLERAS,
			bindToController: {
				closeEditPanel: '&',
				selectedControl: '&',
				saveFromEditPanel: '&'
			}
		};
		return directive;
	}

	return {
		setters: [function (_) {
			LEFT_PANEL_CONTROLLER = _.LEFT_PANEL_CONTROLLER;
			LEFT_PANEL_CONTROLLERAS = _.LEFT_PANEL_CONTROLLERAS;
		}, function (_b) {
			leftPanelTemplate = _b['default'];
		}],
		execute: function () {
			LEFT_PANEL_DIRECTIVE = 'leftPanel';
			leftPanel.$inject = [];

			_export('default', leftPanel);

			_export('LEFT_PANEL_DIRECTIVE', LEFT_PANEL_DIRECTIVE);
		}
	};
});
$__System.register('d', [], function (_export) {
  /* global angular */
  'use strict';

  var resetModel, validOption;
  return {
    setters: [],
    execute: function () {
      resetModel = function resetModel(selectObj) {
        var zeroModel = { rows: [] };
        angular.copy(zeroModel, selectObj);
      };

      validOption = function validOption(selectObj, newOptionText) {
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

      _export('resetModel', resetModel);

      _export('validOption', validOption);
    }
  };
});
$__System.register('e', ['9', 'a', 'd'], function (_export) {
  var _createClass, _classCallCheck, helpers, LEFT_PANEL_SELECT_OPTION_MANAGE_SERVICE, selectOptionMange;

  return {
    setters: [function (_) {
      _createClass = _['default'];
    }, function (_a) {
      _classCallCheck = _a['default'];
    }, function (_d) {
      helpers = _d;
    }],
    execute: function () {
      /* global angular */
      'use strict';

      LEFT_PANEL_SELECT_OPTION_MANAGE_SERVICE = '$selectOptionMange';

      selectOptionMange = (function () {
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
      })();

      selectOptionMange.$inject = [];

      _export('default', selectOptionMange);

      _export('LEFT_PANEL_SELECT_OPTION_MANAGE_SERVICE', LEFT_PANEL_SELECT_OPTION_MANAGE_SERVICE);
    }
  };
});
$__System.register('f', ['9', 'a'], function (_export) {
  var _createClass, _classCallCheck, CONTROLLER_MODAL_PROXY, INIT_OPTION_MODEL, controllerModalProxy;

  return {
    setters: [function (_2) {
      _createClass = _2['default'];
    }, function (_a) {
      _classCallCheck = _a['default'];
    }],
    execute: function () {
      /// <reference path="../../../../../typings/angularjs/angular.d.ts" />
      /// <reference path="../../../../../typings/lodash/lodash.d.ts" />

      /**
       * TODO :
       * - clean deprecated functions
       * - method 'resetAllTemporyModels' -> remove no use angular.copy to optimize
       */

      'use strict';

      CONTROLLER_MODAL_PROXY = 'controllerModalProxy';
      INIT_OPTION_MODEL = { rows: [] };

      controllerModalProxy = (function () {
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
              formlyDesciption: '',
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
                modelToReturn.formlyDesciption = CtrlModalModel.controls[i].formlyDesciption;
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
            configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description = extractedProps.formlyDesciption;
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
              this.proxyModel.temporyConfig.formlyDesciption = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description : '';
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
      })();

      controllerModalProxy.$inject = ['EasyFormGenFormlyBindingModels'];

      _export('default', controllerModalProxy);

      _export('CONTROLLER_MODAL_PROXY', CONTROLLER_MODAL_PROXY);
    }
  };
});
$__System.registerDynamic("10", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = "<div class=\"modal-footer\">\n  <button\n    class=\"btn btn-danger pull-left\"\n    ng-click=\"leftPanelCtrl.resetControl()\">\n    <i class=\"fa fa-refresh\"></i>\n    &nbsp;\n    Reset\n  </button>\n  <button\n    class=\"btn btn-success pull-right\"\n    ng-click=\"leftPanelCtrl.updateSpecialControl(); leftPanelCtrl.saveFromEditPanel();\">\n    <i class=\"fa fa-floppy-o\"></i>\n    &nbsp;\n    Save\n  </button>\n</div>\n";
  global.define = __define;
  return module.exports;
});

$__System.register('11', ['10'], function (_export) {
  'use strict';

  var leftPanelValidEditFooterTemplate, LEFT_PANEL_VALID_EDIT_FOOTER_DIRECTIVE;

  function leftPanelValidEditFooter() {
    var directive = {
      restrict: 'E',
      template: leftPanelValidEditFooterTemplate
    };
    return directive;
  }

  return {
    setters: [function (_) {
      leftPanelValidEditFooterTemplate = _['default'];
    }],
    execute: function () {
      LEFT_PANEL_VALID_EDIT_FOOTER_DIRECTIVE = 'leftPanelValidEditFooter';
      leftPanelValidEditFooter.$inject = [];

      _export('default', leftPanelValidEditFooter);

      _export('LEFT_PANEL_VALID_EDIT_FOOTER_DIRECTIVE', LEFT_PANEL_VALID_EDIT_FOOTER_DIRECTIVE);
    }
  };
});
$__System.registerDynamic("12", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = "<div class=\"panel panel-default\">\n  <div class=\"panel-body\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h5 class=\"greyText\">\n          <i class=\"fa fa-pencil-square-o\"></i>\n          &nbsp;\n          Edit properties :\n        </h5>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"col-md-12\">\n        <label\n          for=\"inputTextLabelUpdate\"\n          class=\" control-label greyText editPropertiesLabel\">\n          Label text :\n          </label>\n        <div class=\"\">\n          <input\n            type=\"text\"\n            class=\"form-control\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyLabel\"\n            id=\"inputTextLabelUpdate\"\n            placeholder=\"Add / edit control label here\">\n        </div>\n       </div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"col-md-12\">\n        <label\n          for=\"inputTextplaceholderUpdate\"\n          class=\"control-label greyText editPropertiesLabel\">\n          placeholder :\n        </label>\n        <div class=\"\">\n          <input\n            type=\"text\"\n            class=\"form-control\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyPlaceholder\"\n            id=\"inputTextplaceholderUpdate\"\n            placeholder=\"Add / edit placeholder text here\">\n        </div>\n       </div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"\">\n        <label\n          for=\"inputTextRequiredUpdate\"\n          class=\"col-md-4 control-label greyText editPropertiesLabel\">\n          Required :\n        </label>\n        <div class=\"col-md-8\">\n          <div class=\"checkboxCssCorrection\">&nbsp;</div>\n          <input\n            type=\"checkbox\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyRequired\"\n            id=\"inputTextRequiredUpdate\">\n        </div>\n       </div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"col-md-12\">\n        <label\n          for=\"inputTextDescriptionUpdate\"\n          class=\"control-label greyText editPropertiesLabel\">\n          Description :\n        </label>\n        <div class=\"\">\n          <input\n            type=\"text\" \n            class=\"form-control\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyDesciption\"\n            id=\"inputTextDescriptionUpdate\"\n            placeholder=\"Add / edit description here\">\n        </div>\n       </div>\n      </div>\n    </div>\n  </div>\n  <left-panel-valid-edit-footer />\n</div>\n";
  global.define = __define;
  return module.exports;
});

$__System.register('13', ['12'], function (_export) {
  'use strict';

  var leftPanelTextInputControlTemplate, LEFT_PANEL_TEXT_INPUT_CONTROL_DIRECTIVE;

  function leftPanelTextInputControl() {
    var directive = {
      restrict: 'E',
      template: leftPanelTextInputControlTemplate
    };
    return directive;
  }

  return {
    setters: [function (_) {
      leftPanelTextInputControlTemplate = _['default'];
    }],
    execute: function () {
      LEFT_PANEL_TEXT_INPUT_CONTROL_DIRECTIVE = 'leftPanelTextInputControl';
      leftPanelTextInputControl.$inject = [];

      _export('default', leftPanelTextInputControl);

      _export('LEFT_PANEL_TEXT_INPUT_CONTROL_DIRECTIVE', LEFT_PANEL_TEXT_INPUT_CONTROL_DIRECTIVE);
    }
  };
});
$__System.registerDynamic("14", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = "<div class=\"panel panel-default\">\n  <div class=\"panel-body\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h5 class=\"greyText\">\n          <i class=\"fa fa-pencil-square-o\"></i>\n          &nbsp;\n          Edit properties :\n        </h5>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"col-md-12\">\n        <label\n          for=\"inputTextLabelUpdate\"\n          class=\" control-label greyText editPropertiesLabel\">\n          Label text :\n        </label>\n        <div class=\"\">\n          <input\n            type=\"text\"\n            class=\"form-control\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyLabel\" \n            id=\"inputTextLabelUpdate\"\n            placeholder=\"Add / edit control label here\">\n        </div>\n       </div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"\">\n        <label\n          for=\"RequiredUpdate\"\n          class=\"col-md-4 control-label greyText editPropertiesLabel\">\n          Required :\n        </label>\n        <div class=\"col-md-8\">\n          <div class=\"checkboxCssCorrection\">\n            &nbsp;\n          </div>\n          <input\n            type=\"checkbox\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyRequired\"\n            id=\"RequiredUpdate\">\n        </div>\n       </div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"col-md-12\">\n        <label\n          for=\"DescriptionUpdate\"\n          class=\"control-label greyText editPropertiesLabel\">\n          Description :\n        </label>\n        <div class=\"\">\n          <input\n            type=\"text\"\n            class=\"form-control\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyDesciption\"\n            id=\"DescriptionUpdate\"\n            placeholder=\"Add / edit description here\">\n        </div>\n       </div>\n      </div>\n    </div>\n  </div>\n  <left-panel-valid-edit-footer />\n</div>\n";
  global.define = __define;
  return module.exports;
});

$__System.register('15', ['14'], function (_export) {
  'use strict';

  var leftPanelTextareaControlTemplate, LEFT_PANEL_TEXTAREA_CONTROL_DIRECTIVE;

  function leftPanelTextareaControl() {
    var directive = {
      restrict: 'E',
      template: leftPanelTextareaControlTemplate
    };
    return directive;
  }

  return {
    setters: [function (_) {
      leftPanelTextareaControlTemplate = _['default'];
    }],
    execute: function () {
      LEFT_PANEL_TEXTAREA_CONTROL_DIRECTIVE = 'leftPanelTextareaControl';
      leftPanelTextareaControl.$inject = [];

      _export('default', leftPanelTextareaControl);

      _export('LEFT_PANEL_TEXTAREA_CONTROL_DIRECTIVE', LEFT_PANEL_TEXTAREA_CONTROL_DIRECTIVE);
    }
  };
});
$__System.registerDynamic("16", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = "<div class=\"panel panel-default\">\n  <div class=\"panel-body\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h5 class=\"greyText\">\n          <i class=\"fa fa-pencil-square-o\"></i>\n          &nbsp;\n          Edit properties :\n        </h5>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n        <div class=\"col-md-12\">\n          <label\n            for=\"inputTextDescriptionUpdate\"\n            class=\"control-label greyText editPropertiesLabel\">\n            Subtitle text :\n          </label>\n          <div class=\"\">\n            <input\n              type=\"text\"\n              class=\"form-control\" \n              ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyDesciption\"\n              id=\"inputSubtitleTextUpdate\"\n              placeholder=\"Add / edit subtitle text here\" >\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <left-panel-valid-edit-footer />\n</div>\n";
  global.define = __define;
  return module.exports;
});

$__System.register('17', ['16'], function (_export) {
  'use strict';

  var leftPanelSubtitleControlTemplate, LEFT_PANEL_SUBTITLE_CONTROL_DIRECTIVE;

  function leftPanelSubtitleControl() {
    var directive = {
      restrict: 'E',
      template: leftPanelSubtitleControlTemplate
    };
    return directive;
  }

  return {
    setters: [function (_) {
      leftPanelSubtitleControlTemplate = _['default'];
    }],
    execute: function () {
      LEFT_PANEL_SUBTITLE_CONTROL_DIRECTIVE = 'leftPanelSubtitleControl';
      leftPanelSubtitleControl.$inject = [];

      _export('default', leftPanelSubtitleControl);

      _export('LEFT_PANEL_SUBTITLE_CONTROL_DIRECTIVE', LEFT_PANEL_SUBTITLE_CONTROL_DIRECTIVE);
    }
  };
});
$__System.registerDynamic("18", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = "<div class=\"panel panel-default\">\n  <div class=\"panel-body\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h5 class=\"greyText\">\n          <i class=\"fa fa-pencil-square-o\"></i>\n          &nbsp; Edit properties :\n        </h5>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"col-md-12\">\n        <label\n          for=\"DescriptionUpdate\"\n          class=\"control-label greyText editPropertiesLabel\">\n          Description :\n        </label>\n        <div class=\"\">\n          <input\n            type=\"text\"\n            class=\"form-control\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyDesciption\"\n            id=\"DescriptionUpdate\"\n            placeholder=\"Add / edit description here\">\n        </div>\n       </div>\n      </div>\n    </div>\n  </div>\n  <left-panel-valid-edit-footer />\n</div>\n";
  global.define = __define;
  return module.exports;
});

$__System.register('19', ['18'], function (_export) {
  'use strict';

  var leftPanelRichTextEditorControlTemplate, LEFT_PANEL_RICH_TEXT_EDITOR_CONTROL_DIRECTIVE;

  function leftPanelRichTextEditorControl() {
    var directive = {
      restrict: 'E',
      template: leftPanelRichTextEditorControlTemplate
    };
    return directive;
  }

  return {
    setters: [function (_) {
      leftPanelRichTextEditorControlTemplate = _['default'];
    }],
    execute: function () {
      LEFT_PANEL_RICH_TEXT_EDITOR_CONTROL_DIRECTIVE = 'leftPanelRichTextEditorControl';
      leftPanelRichTextEditorControl.$inject = [];

      _export('default', leftPanelRichTextEditorControl);

      _export('LEFT_PANEL_RICH_TEXT_EDITOR_CONTROL_DIRECTIVE', LEFT_PANEL_RICH_TEXT_EDITOR_CONTROL_DIRECTIVE);
    }
  };
});
$__System.registerDynamic("1a", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = "<div class=\"panel panel-default\">\n  <div class=\"panel-body\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h5 class=\"greyText\">\n          <i class=\"fa fa-pencil-square-o\"></i>\n          &nbsp;\n          Edit properties :\n        </h5>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"col-lg-12 col-md-12\">\n        <label\n          for=\"radioRowCollection\"\n          class=\" control-label greyText editPropertiesLabel\">\n          Add new radio :\n        </label>\n      </div>\n    </div>\n  <div class=\"row\">\n    <div>\n      <div class=\"form-group\">\n        <div class=\"col-sm-9 col-xs-9 col-md-9 col-lg-9\">\n        <input\n          type=\"text\"\n          class=\"form-control\"\n          id=\"inputAddNewRadioOption\"\n          placeholder=\"add new radio\"\n          ng-model=\"leftPanelCtrl.newOptionRadio.saisie\">\n        </div>\n        <div class=\"col-sm-3 col-xs-3 col-md-3 col-lg-3\">\n          <button\n            class=\"btn btn-primary\"\n            ng-click=\"leftPanelCtrl.addNewOptionRadio()\">\n            add\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-lg-12 col-md-12\">\n      <label\n        for=\"radioRowCollection\"\n        class=\" control-label greyText editPropertiesLabel\">\n        Edit/Remove radio :\n      </label>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"form-group\">\n      <div class-\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">\n        <div class=\"container\">\n          <div ng-show=\"leftPanelCtrl.radioRowCollection.rows.length === 0\">\n            <h5 class=\"text-center greyText\">\n              <em>\n                - no radio : add new radio values -\n              </em>\n            </h5>\n          </div>\n          <table\n            ng-if=\"leftPanelCtrl.radioRowCollection.rows.length > 0\"\n            class=\"table table-striped\">\n            <thead>\n            <tr>\n              <th st-ratio=\"20\">\n                order\n              </th>\n              <th st-ratio=\"55\">\n                option\n              </th>\n              <th st-ratio=\"25\">\n              </th>\n            </tr>\n            <tr>\n              <th st-ratio=\"20\">\n              </th>\n              <th st-ratio=\"55\">\n                <input\n                  ng-model=\"radioFilter\"\n                  placeholder=\"search for option\"\n                  class=\"input-sm form-control\"\n                  type=\"search\" />\n              </th>\n              <th st-ratio=\"25\"></th>\n            </tr>\n            </thead>\n            <tbody>\n              <tr ng-repeat=\"radioRow in leftPanelCtrl.radioRowCollection.rows | filter:radioFilter as radioRow\">\n                <td st-ratio=\"20\">\n                  {{$index}}\n                </td>\n                <td st-ratio=\"55\">\n                  {{radioRow.option}}\n                </td>\n                <td st-ratio=\"25\">\n                  <div class=\"pull-right\">\n                    <button\n                      class=\"btn btn-primary\"\n                      ng-click=\"leftPanelCtrl.upThisRadioRow($index)\">\n                      <i class=\"fa fa-arrow-up\"></i>\n                    </button>\n                    <button\n                      class=\"btn btn-primary\"\n                      ng-click=\"leftPanelCtrl.downThisRadioRow($index)\">\n                      <i class=\"fa fa-arrow-down\"></i>\n                    </button>\n                    <button\n                      class=\"btn btn-danger\"\n                      ng-click=\"leftPanelCtrl.removeRadioRow($index)\">\n                      <i class=\"fa fa-trash-o\"></i>\n                    </button>\n                   </div>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n  \t\t\t<div class=\"col-md-12\">\n          <label\n            for=\"inputTextLabelUpdate\"\n            class=\" control-label greyText editPropertiesLabel\">\n            Label text :\n          </label>\n          <div class=\"\">\n            <input\n              type=\"text\"\n              class=\"form-control\"\n              ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyLabel\"\n              id=\"inputTextLabelUpdate\"\n              placeholder=\"Add / edit control label here\">\n          </div>\n  \t\t\t</div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n  \t\t\t<div class=\"\">\n          <label\n            for=\"RequiredUpdate\"\n            class=\"col-md-4 control-label greyText editPropertiesLabel\">\n            Required :\n          </label>\n          <div class=\"col-md-8\">\n            <div class=\"checkboxCssCorrection\">&nbsp;</div>\n            <input\n              type=\"checkbox\"\n              ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyRequired\"\n              id=\"RequiredUpdate\">\n          </div>\n  \t\t\t</div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n  \t\t\t<div class=\"col-md-12\">\n          <label\n            for=\"DescriptionUpdate\"\n            class=\"control-label greyText editPropertiesLabel\">\n            Description :\n          </label>\n          <div class=\"\">\n            <input\n              type=\"text\"\n              class=\"form-control\"\n              ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyDesciption\"\n              id=\"DescriptionUpdate\"\n              placeholder=\"Add / edit description here\">\n          </div>\n  \t\t\t</div>\n      </div>\n   </div>\n  </div>\n  <left-panel-valid-edit-footer />\n</div>\n";
  global.define = __define;
  return module.exports;
});

$__System.register('1b', ['1a'], function (_export) {
  'use strict';

  var leftPanelRadioControlTemplate, LEFT_PANEL_RADIO_CONTROL_DIRECTIVE;

  function leftPanelRadioControl() {
    var directive = {
      restrict: 'E',
      template: leftPanelRadioControlTemplate
    };
    return directive;
  }

  return {
    setters: [function (_a) {
      leftPanelRadioControlTemplate = _a['default'];
    }],
    execute: function () {
      LEFT_PANEL_RADIO_CONTROL_DIRECTIVE = 'leftPanelRadioControl';
      leftPanelRadioControl.$inject = [];

      _export('default', leftPanelRadioControl);

      _export('LEFT_PANEL_RADIO_CONTROL_DIRECTIVE', LEFT_PANEL_RADIO_CONTROL_DIRECTIVE);
    }
  };
});
$__System.registerDynamic("1c", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = "<div class=\"panel panel-default\">\n  <div class=\"panel-body\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h5 class=\"greyText\">\n          <i class=\"fa fa-pencil-square-o\"></i>\n          &nbsp;\n          Edit properties :\n        </h5>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"col-md-12\">\n        <label\n          for=\"inputTextLabelUpdate\"\n          class=\" control-label greyText editPropertiesLabel\">\n          Label text :\n        </label>\n        <div class=\"\">\n          <input\n            type=\"text\" \n            class=\"form-control\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyLabel\"\n            id=\"inputTextLabelUpdate\"\n            placeholder=\"Add / edit control label here\" >\n        </div>\n       </div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"col-md-12\">\n        <label\n          for=\"placeholderUpdate\"\n          class=\"control-label greyText editPropertiesLabel\">\n          placeholder :\n        </label>\n        <div class=\"\">\n          <input\n            type=\"text\"\n            class=\"form-control\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyPlaceholder\"\n            id=\"inputTextplaceholderUpdate\"\n            placeholder=\"Add / edit placeholder text here\" >\n        </div>\n       </div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"\">\n        <label\n          for=\"RequiredUpdate\"\n          class=\"col-md-4 control-label greyText editPropertiesLabel\">\n          Required :\n        </label>\n        <div class=\"col-md-8\">\n          <div class=\"checkboxCssCorrection\">&nbsp;</div>\n            <input\n              type=\"checkbox\"\n              ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyRequired\"\n              id=\"RequiredUpdate\">\n        </div>\n       </div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"col-md-12\">\n        <label\n          for=\"DescriptionUpdate\"\n          class=\"control-label greyText editPropertiesLabel\">\n          Description :\n        </label>\n        <div class=\"\">\n          <input\n            type=\"text\"\n            class=\"form-control\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyDesciption\"\n            id=\"DescriptionUpdate\"\n            placeholder=\"Add / edit description here\" >\n        </div>\n       </div>\n      </div>\n    </div>\n  </div>\n  <left-panel-valid-edit-footer />\n</div>\n";
  global.define = __define;
  return module.exports;
});

$__System.register('1d', ['1c'], function (_export) {
  'use strict';

  var leftPanelPasswordControlTemplate, LEFT_PANEL_PASSWORD_CONTROL_DIRECTIVE;

  function leftPanelPasswordControl() {
    var directive = {
      restrict: 'E',
      template: leftPanelPasswordControlTemplate
    };
    return directive;
  }

  return {
    setters: [function (_c) {
      leftPanelPasswordControlTemplate = _c['default'];
    }],
    execute: function () {
      LEFT_PANEL_PASSWORD_CONTROL_DIRECTIVE = 'leftPanelPasswordControl';
      leftPanelPasswordControl.$inject = [];

      _export('default', leftPanelPasswordControl);

      _export('LEFT_PANEL_PASSWORD_CONTROL_DIRECTIVE', LEFT_PANEL_PASSWORD_CONTROL_DIRECTIVE);
    }
  };
});
$__System.registerDynamic("1e", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = "<div class=\"panel panel-default\">\n  <div class=\"panel-body\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h5 class=\"greyText\">\n          <i class=\"fa fa-pencil-square-o\"></i>\n          &nbsp;\n          Edit properties :\n        </h5>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"col-md-12\">\n        <label\n          for=\"inputTextDescriptionUpdate\"\n          class=\"control-label greyText editPropertiesLabel\">\n          Header text :\n        </label>\n        <div class=\"\">\n          <input\n            type=\"text\"\n            class=\"form-control\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyDesciption\"\n            id=\"inputHeaderTextUpdate\"\n            placeholder=\"Add / edit header text here\" >\n        </div>\n       </div>\n      </div>\n    </div>\n  </div>\n  <left-panel-valid-edit-footer />\n</div>\n";
  global.define = __define;
  return module.exports;
});

$__System.register('1f', ['1e'], function (_export) {
  'use strict';

  var leftPanelHeaderControlTemplate, LEFT_PANEL_HEADER_CONTROL_DIRECTIVE;

  function leftPanelHeaderControl() {
    var directive = {
      restrict: 'E',
      template: leftPanelHeaderControlTemplate
    };
    return directive;
  }

  return {
    setters: [function (_e) {
      leftPanelHeaderControlTemplate = _e['default'];
    }],
    execute: function () {
      LEFT_PANEL_HEADER_CONTROL_DIRECTIVE = 'leftPanelHeaderControl';
      leftPanelHeaderControl.$inject = [];

      _export('default', leftPanelHeaderControl);

      _export('LEFT_PANEL_HEADER_CONTROL_DIRECTIVE', LEFT_PANEL_HEADER_CONTROL_DIRECTIVE);
    }
  };
});
$__System.registerDynamic("20", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = "<div class=\"panel panel-default\">\n  <div class=\"panel-body\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h5 class=\"greyText\">\n          <i class=\"fa fa-pencil-square-o\"></i>\n          &nbsp;\n          Edit properties :\n        </h5>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"col-lg-12 col-md-12\">\n        <label\n          for=\"groupedSelectRowCollection\"\n          class=\"control-label greyText editPropertiesLabel\">\n          Add new options :\n        </label>\n     </div>\n    </div>\n    <div class=\"row\">\n      <div>\n        <div class=\"form-group\">\n          <div class=\"col-sm-9 col-xs-9 col-md-9 col-lg-9\">\n            <input\n              type=\"text\"\n              class=\"form-control\"\n              id=\"inputAddNewGroupedOption\"\n              placeholder=\"add new option\"\n              ng-model=\"leftPanelCtrl.newOptionGroupedSelect.saisie\">\n          </div>\n          <div class=\"col-sm-3 col-xs-3 col-md-3 col-lg-3\">\n            <button\n              class=\"btn btn-primary\"\n              ng-click=\"leftPanelCtrl.addNewOptionGroupedSelect()\">\n              add\n            </button>\n          </div>\n       </div>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-lg-12 col-md-12\">\n        <label\n          for=\"groupedSelectRowCollection\"\n          class=\" control-label greyText editPropertiesLabel\">\n          Add new groups :\n        </label>\n     </div>\n    </div>\n    <div class=\"row\">\n      <div>\n        <div class=\"form-group\">\n          <div class=\"col-sm-9 col-xs-9 col-md-9 col-lg-9\">\n            <input\n              id=\"inputAddNewGroupGroupedOption\"\n              type=\"text\"\n              class=\"form-control\"\n              ng-model=\"leftPanelCtrl.newGroupGroupedSelect.saisie\"\n              placeholder=\"Add new group\">\n          </div>\n          <div class=\"col-sm-3 col-xs-3 col-md-3 col-lg-3\">\n            <button\n              class=\"btn btn-primary\"\n              ng-click=\"leftPanelCtrl.addNewGroupToGroupedSelect()\">\n              add\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-lg-12 col-md-12\">\n        <label\n          class=\" control-label greyText editPropertiesLabel\">\n          Edit/Remove options/groups:\n        </label>\n     </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n        <div class-\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">\n          <div class=\"container\">\n            <div ng-if=\"leftPanelCtrl.groupedSelectRowCollection.rows.length === 0\">\n              <h5 class=\"text-center greyText\">\n                <em>\n                  - no option : add new options -\n                </em>\n              </h5>\n            </div>\n            <table\n              ng-if=\"leftPanelCtrl.groupedSelectRowCollection.rows.length > 0\"\n              class=\"table table-striped\">\n              <thead>\n                <tr>\n                  <th st-ratio=\"20\">\n                    order\n                  </th>\n                  <th st-ratio=\"25\">\n                    group\n                  </th>\n                  <th st-ratio=\"30\">\n                    option\n                  </th>\n                  <th st-ratio=\"25\"></th>\n                </tr>\n                <tr>\n                  <th st-ratio=\"20\"></th>\n                  <th st-ratio=\"25\"></th>\n                  <th st-ratio=\"30\">\n                    <input\n                      ng-model=\"groupedSelectFilter\"\n                      placeholder=\"search for option\"\n                      class=\"input-sm form-control\"\n                      type=\"search\" />\n                  </th>\n                  <th st-ratio=\"25\"></th>\n                </tr>\n              </thead>\n              <tbody>\n              <tr\n                ng-repeat=\"groupedSelectRow in leftPanelCtrl.groupedSelectRowCollection.rows | filter:groupedSelectFilter as groupedSelectRow\">\n                <td st-ratio=\"20\">\n                  {{$index}}\n                </td>\n                <td st-ratio=\"25\">\n                  <div ng-if=\"leftPanelCtrl.groupSelectGroupClick.showList === true\">\n                    <div ng-if=\"leftPanelCtrl.GroupedSelectGroups.list.length === 0\">\n                      <p class=\"text-left noGroupText\">\n                        - add new groups -\n                      </p>\n                    </div>\n                    <div ng-if=\"leftPanelCtrl.GroupedSelectGroups.list.length > 0\">\n                      <ol\n                        class=\"nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12 editGroupedSelectnyaSelect\"\n                        ng-model=\"groupedSelectRow.group\"\n                        id=\"modelGroupedOptionGroupedChoose\"\n                        disabled=\"leftPanelCtrl.GroupedSelectGroups.list.length === 0\">\n                        <li\n                          class=\"nya-bs-option\"\n                          nya-bs-option=\"GroupedSelectGroup in leftPanelCtrl.GroupedSelectGroups.list\"\n                          value=\"GroupedSelectGroup\">\n                          <a>\n                            {{GroupedSelectGroup}}\n                          </a>\n                        </li>\n                      </ol>\n                    </div>\n                  </div>\n                  <div ng-if=\"leftPanelCtrl.groupSelectGroupClick.showList === false\">\n                    {{groupedSelectRow.group}}\n                  </div>\n                </td>\n                <td st-ratio=\"30\">\n                  {{groupedSelectRow.option}}\n                </td>\n                <td st-ratio=\"25\">\n                  <div class=\"pull-right\">\n                    <button\n                      class=\"btn btn-primary\"\n                      ng-click=\"leftPanelCtrl.upThisGroupedSelectRow($index)\">\n                      <i class=\"fa fa-arrow-up\"></i>\n                    </button>\n                    <button\n                      class=\"btn btn-primary\"\n                      ng-click=\"leftPanelCtrl.downThisGroupedSelectRow($index)\">\n                      <i class=\"fa fa-arrow-down\"></i>\n                    </button>\n                    <button\n                      class=\"btn btn-warning\"\n                      ng-click=\"leftPanelCtrl.showGroupListToChoose()\">\n                      <i class=\"fa fa-pencil-square-o\"></i>\n                    </button>\n                    <button\n                      class=\"btn btn-danger\"\n                      ng-click=\"leftPanelCtrl.removeGroupedSelectRow($index)\">\n                      <i class=\"fa fa-trash-o\"></i>\n                    </button>\n                   </div>\n                </td>\n              </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n\t\t\t\t<div class=\"col-md-12\">\n          <label\n            for=\"DescriptionUpdate\"\n            class=\"control-label greyText editPropertiesLabel\">\n            Description :\n          </label>\n          <div class=\"\">\n            <input\n              type=\"text\"\n              class=\"form-control\"\n              ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyDesciption\"\n              id=\"DescriptionUpdate\"\n              placeholder=\"Add / edit description here\">\n          </div>\n\t\t\t\t</div>\n      </div>\n    </div>\n  </div>\n  <left-panel-valid-edit-footer />\n</div>\n";
  global.define = __define;
  return module.exports;
});

$__System.register('21', ['20'], function (_export) {
  'use strict';

  var leftPanelGroupedSelectControlTemplate, LEFT_PANEL_GROUPED_SELECT_CONTROL_DIRECTIVE;

  function leftPanelGroupedSelectControl() {
    var directive = {
      restrict: 'E',
      template: leftPanelGroupedSelectControlTemplate
    };
    return directive;
  }

  return {
    setters: [function (_) {
      leftPanelGroupedSelectControlTemplate = _['default'];
    }],
    execute: function () {
      LEFT_PANEL_GROUPED_SELECT_CONTROL_DIRECTIVE = 'leftPanelGroupedSelectControl';
      leftPanelGroupedSelectControl.$inject = [];

      _export('default', leftPanelGroupedSelectControl);

      _export('LEFT_PANEL_GROUPED_SELECT_CONTROL_DIRECTIVE', LEFT_PANEL_GROUPED_SELECT_CONTROL_DIRECTIVE);
    }
  };
});
$__System.registerDynamic("22", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = "<div class=\"panel panel-default\">\n  <div class=\"panel-body\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h5 class=\"greyText\">\n          <i class=\"fa fa-pencil-square-o\"></i>\n          &nbsp;\n          Edit properties :\n        </h5>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n   <label class=\"control-label greyText editPropertiesLabel\">\n      Date format :\n    </label>\n    <div class=\"\">\n      <ol\n        class=\"nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12\"\n        ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.datepickerPopup\"\n        id=\"dateformatSelect\">\n        <li\n          class=\"nya-bs-option\"\n          nya-bs-option=\"dateformat in leftPanelCtrl.demodt.formats\"\n          value=\"dateformat\">\n          <a>\n            {{dateformat}}\n          </a>\n        </li>\n      </ol>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"col-md-12\">\n        <label\n          for=\"inputTextLabelUpdate\"\n          class=\" control-label greyText editPropertiesLabel\">\n          Label text :\n        </label>\n        <div class=\"\">\n          <input\n            type=\"text\"\n            class=\"form-control\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyLabel\"\n            id=\"inputTextLabelUpdate\"\n            placeholder=\"Add / edit control label here\">\n        </div>\n       </div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"\">\n        <label\n          for=\"RequiredUpdate\"\n          class=\"col-md-4 control-label greyText editPropertiesLabel\">\n          Required :\n        </label>\n        <div class=\"col-md-8\">\n          <div class=\"checkboxCssCorrection\">&nbsp;</div>\n          <input\n            type=\"checkbox\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyRequired\"\n            id=\"RequiredUpdate\">\n        </div>\n       </div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n       <div class=\"col-md-12\">\n        <label\n          for=\"DescriptionUpdate\"\n          class=\"control-label greyText editPropertiesLabel\">\n          Description :\n        </label>\n        <div class=\"\">\n          <input\n            type=\"text\"\n            class=\"form-control\"\n            ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyDesciption\"\n            id=\"DescriptionUpdate\"\n            placeholder=\"Add / edit description here\">\n        </div>\n       </div>\n      </div>\n    </div>\n  </div>\n  <left-panel-valid-edit-footer />\n</div>\n";
  global.define = __define;
  return module.exports;
});

$__System.register('23', ['22'], function (_export) {
  'use strict';

  var leftPanelDateControlTemplate, LEFT_PANEL_DATE_CONTROL_DIRECTIVE;

  function leftPanelDateControl() {
    var directive = {
      restrict: 'E',
      template: leftPanelDateControlTemplate
    };
    return directive;
  }

  return {
    setters: [function (_) {
      leftPanelDateControlTemplate = _['default'];
    }],
    execute: function () {
      LEFT_PANEL_DATE_CONTROL_DIRECTIVE = 'leftPanelDateControl';
      leftPanelDateControl.$inject = [];

      _export('default', leftPanelDateControl);

      _export('LEFT_PANEL_DATE_CONTROL_DIRECTIVE', LEFT_PANEL_DATE_CONTROL_DIRECTIVE);
    }
  };
});
$__System.registerDynamic("24", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = "<div class=\"panel panel-default\">\n  <div class=\"panel-body\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h5 class=\"greyText\">\n          <i class=\"fa fa-pencil-square-o\"></i>\n          &nbsp;\n          Edit properties :\n        </h5>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n  \t\t\t<div class=\"col-md-12\">\n          <label\n            for=\"inputTextLabelUpdate\"\n            class=\" control-label greyText editPropertiesLabel\">\n            Label text :\n          </label>\n          <div class=\"\">\n            <input\n              type=\"text\"\n              class=\"form-control\"\n              ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyLabel\"\n              id=\"inputTextLabelUpdate\"\n              placeholder=\"Add / edit control label here\">\n          </div>\n  \t\t\t</div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n  \t\t\t<div class=\"\">\n          <label\n            for=\"RequiredUpdate\"\n            class=\"col-md-4 control-label greyText editPropertiesLabel\">\n            Required :\n          </label>\n          <div class=\"col-md-8\">\n            <div class=\"checkboxCssCorrection\">&nbsp;</div>\n            <input\n              type=\"checkbox\"\n              ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyRequired\"\n              id=\"RequiredUpdate\">\n          </div>\n  \t\t\t</div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n  \t\t\t<div class=\"col-md-12\">\n          <label\n            for=\"DescriptionUpdate\"\n            class=\"control-label greyText editPropertiesLabel\">\n            Description :\n          </label>\n          <div class=\"\">\n            <input\n              type=\"text\"\n              class=\"form-control\"\n              ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyDesciption\"\n              id=\"DescriptionUpdate\"\n              placeholder=\"Add / edit description here\">\n          </div>\n  \t\t\t</div>\n      </div>\n    </div>\n  </div>\n  <left-panel-valid-edit-footer />\n</div>\n";
  global.define = __define;
  return module.exports;
});

$__System.register('25', ['24'], function (_export) {
  'use strict';

  var leftPanelCheckBoxControlTemplate, LEFT_PANEL_CHECKBOX_CONTROL_DIRECTIVE;

  function leftPanelCheckBoxControl() {
    var directive = {
      restrict: 'E',
      template: leftPanelCheckBoxControlTemplate
    };
    return directive;
  }

  return {
    setters: [function (_) {
      leftPanelCheckBoxControlTemplate = _['default'];
    }],
    execute: function () {
      LEFT_PANEL_CHECKBOX_CONTROL_DIRECTIVE = 'leftPanelCheckBoxControl';
      leftPanelCheckBoxControl.$inject = [];

      _export('default', leftPanelCheckBoxControl);

      _export('LEFT_PANEL_CHECKBOX_CONTROL_DIRECTIVE', LEFT_PANEL_CHECKBOX_CONTROL_DIRECTIVE);
    }
  };
});
$__System.registerDynamic("26", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = "<div class=\"panel panel-default\">\n  <div class=\"panel-body\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h5 class=\"greyText\">\n          <i class=\"fa fa-pencil-square-o\"></i>\n          &nbsp; \n          Edit :\n        </h5>\n      </div>\n    </div> \n    <div class=\"row\">\n      <div class=\"col-sm-12\">\n        <h5 class=\"text-center greyText\">\n          Column will be blank\n        </h5>\n      </div>\n    </div>\n  </div>\n  <left-panel-valid-edit-footer />\n</div>\n";
  global.define = __define;
  return module.exports;
});

$__System.register('27', ['26'], function (_export) {
  'use strict';

  var leftPanelBlankControlTemplate, LEFT_PANEL_BLANK_CONTROL_DIRECTIVE;

  function leftPanelBlankControl() {
    var directive = {
      restrict: 'E',
      template: leftPanelBlankControlTemplate
    };
    return directive;
  }

  return {
    setters: [function (_) {
      leftPanelBlankControlTemplate = _['default'];
    }],
    execute: function () {
      LEFT_PANEL_BLANK_CONTROL_DIRECTIVE = 'leftPanelBlankControl';
      leftPanelBlankControl.$inject = [];

      _export('default', leftPanelBlankControl);

      _export('LEFT_PANEL_BLANK_CONTROL_DIRECTIVE', LEFT_PANEL_BLANK_CONTROL_DIRECTIVE);
    }
  };
});
$__System.registerDynamic("28", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = "<div class=\"panel panel-default\">\n  <div class=\"panel-body\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h5 class=\"greyText\">\n          <i class=\"fa fa-pencil-square-o\"></i>\n          &nbsp;\n          Edit properties :\n        </h5>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n    <div class=\"row\">\n      <div class=\"col-lg-12 col-md-12\">\n        <label\n          for=\"basicSelectRowCollection\"\n          class=\" control-label greyText editPropertiesLabel\">\n          Add new options :\n        </label>\n     </div>\n    </div>\n    <div class=\"row\">\n      <div>\n        <div class=\"form-group\">\n          <div class=\"col-sm-9 col-xs-9 col-md-9 col-lg-9\">\n            <input\n              type=\"text\"\n              class=\"form-control\"\n              id=\"inputAddNewBasicOption\"\n              placeholder=\"add new option\"\n              ng-model=\"leftPanelCtrl.newOptionBasicSelect.saisie\">\n            </div>\n            <div class=\"col-sm-3 col-xs-3 col-md-3 col-lg-3\">\n              <button\n                class=\"btn btn-primary\"\n                ng-click=\"leftPanelCtrl.addNewOptionBasicSelect()\">\n                add\n              </button>\n            </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"row\">\n     <div class=\"col-lg-12 col-md-12\">\n       <label class=\" control-label greyText editPropertiesLabel\">\n         Edit/Remove options :\n       </label>\n     </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n        <div class-\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">\n          <div class=\"container\">\n            <div ng-if=\"leftPanelCtrl.basicSelectRowCollection.rows.length === 0\">\n              <h5 class=\"text-center greyText\">\n                <em>\n                  - no option : add new options -\n                </em>\n              </h5>\n            </div>\n            <table\n              ng-if=\"leftPanelCtrl.basicSelectRowCollection.rows.length > 0\"\n              class=\"table table-striped\">\n              <thead>\n              <tr>\n                <th st-ratio=\"20\">\n                  order\n                </th>\n                <th st-ratio=\"55\">\n                  option\n                </th>\n                <th st-ratio=\"25\"></th>\n              </tr>\n              <tr>\n                <th st-ratio=\"20\"></th>\n                <th st-ratio=\"55\">\n                  <input\n                    ng-model=\"leftPanelCtrl.basicSelectFilter\"\n                    placeholder=\"search for option\"\n                    class=\"input-sm form-control\"\n                    type=\"search\" />\n                </th>\n                <th st-ratio=\"25\"></th>\n              </tr>\n              </thead>\n              <tbody>\n                <tr ng-repeat=\"basicSelectRow in leftPanelCtrl.basicSelectRowCollection.rows | filter:basicSelectFilter as basicSelectRow\">\n                  <td st-ratio=\"20\">\n                    {{$index}}\n                  </td>\n                  <td st-ratio=\"55\">\n                    {{basicSelectRow.option}}\n                  </td>\n                  <td st-ratio=\"25\">\n                    <div class=\"pull-right\">\n                      <button\n                        class=\"btn btn-primary\"\n                        ng-click=\"leftPanelCtrl.upThisRow($index)\">\n                        <i class=\"fa fa-arrow-up\"></i>\n                      </button>\n                      <button\n                        class=\"btn btn-primary\"\n                        ng-click=\"leftPanelCtrl.downThisRow($index)\">\n                        <i class=\"fa fa-arrow-down\"></i>\n                      </button>\n                      <button\n                        class=\"btn btn-danger\"\n                        ng-click=\"leftPanelCtrl.removeRow($index)\">\n                        <i class=\"fa fa-trash-o\"></i>\n                      </button>\n                     </div>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"marginTopFivepixels\"></div>\n      <div class=\"row\">\n        <div class=\"form-group\">\n        \t<div class=\"col-md-12\">\n            <label\n              for=\"DescriptionUpdate\"\n              class=\"control-label greyText editPropertiesLabel\">\n              Description :\n            </label>\n            <div class=\"\">\n              <input\n                type=\"text\"\n                class=\"form-control\"\n                ng-model=\"leftPanelCtrl.proxyModel.temporyConfig.formlyDesciption\"\n                id=\"DescriptionUpdate\"\n                placeholder=\"Add / edit description here\">\n            </div>\n        \t</div>\n        </div>\n      </div>\n    </div>\n  <left-panel-valid-edit-footer />\n</div>\n";
  global.define = __define;
  return module.exports;
});

$__System.register('29', ['28'], function (_export) {
  'use strict';

  var leftPanelBasicSelectControlTemplate, LEFT_PANEL_BASIC_SELECT_CONTROL_DIRECTIVE;

  function leftPanelBasicSelectControl() {
    var directive = {
      restrict: 'E',
      template: leftPanelBasicSelectControlTemplate
    };
    return directive;
  }

  return {
    setters: [function (_) {
      leftPanelBasicSelectControlTemplate = _['default'];
    }],
    execute: function () {
      LEFT_PANEL_BASIC_SELECT_CONTROL_DIRECTIVE = 'leftPanelBasicSelectControl';
      leftPanelBasicSelectControl.$inject = [];

      _export('default', leftPanelBasicSelectControl);

      _export('LEFT_PANEL_BASIC_SELECT_CONTROL_DIRECTIVE', LEFT_PANEL_BASIC_SELECT_CONTROL_DIRECTIVE);
    }
  };
});
$__System.register('2a', ['8', '11', '13', '15', '17', '19', '21', '23', '25', '27', '29', 'c', 'e', 'f', '1b', '1d', '1f'], function (_export) {
  /* global angular */
  'use strict';

  var leftPanelController, LEFT_PANEL_CONTROLLER, leftPanelValidEditFooter, LEFT_PANEL_VALID_EDIT_FOOTER_DIRECTIVE, leftPanelTextInputControl, LEFT_PANEL_TEXT_INPUT_CONTROL_DIRECTIVE, leftPanelTextareaControl, LEFT_PANEL_TEXTAREA_CONTROL_DIRECTIVE, leftPanelSubtitleControl, LEFT_PANEL_SUBTITLE_CONTROL_DIRECTIVE, leftPanelRichTextEditorControl, LEFT_PANEL_RICH_TEXT_EDITOR_CONTROL_DIRECTIVE, leftPanelGroupedSelectControl, LEFT_PANEL_GROUPED_SELECT_CONTROL_DIRECTIVE, leftPanelDateControl, LEFT_PANEL_DATE_CONTROL_DIRECTIVE, leftPanelCheckBoxControl, LEFT_PANEL_CHECKBOX_CONTROL_DIRECTIVE, leftPanelBlankControl, LEFT_PANEL_BLANK_CONTROL_DIRECTIVE, leftPanelBasicSelectControl, LEFT_PANEL_BASIC_SELECT_CONTROL_DIRECTIVE, leftPanel, LEFT_PANEL_DIRECTIVE, selectOptionMange, LEFT_PANEL_SELECT_OPTION_MANAGE_SERVICE, controllerModalProxy, CONTROLLER_MODAL_PROXY, leftPanelRadioControl, LEFT_PANEL_RADIO_CONTROL_DIRECTIVE, leftPanelPasswordControl, LEFT_PANEL_PASSWORD_CONTROL_DIRECTIVE, leftPanelHeaderControl, LEFT_PANEL_HEADER_CONTROL_DIRECTIVE, LEFT_PANEL_MODULE;
  return {
    setters: [function (_) {
      leftPanelController = _['default'];
      LEFT_PANEL_CONTROLLER = _.LEFT_PANEL_CONTROLLER;
    }, function (_2) {
      leftPanelValidEditFooter = _2['default'];
      LEFT_PANEL_VALID_EDIT_FOOTER_DIRECTIVE = _2.LEFT_PANEL_VALID_EDIT_FOOTER_DIRECTIVE;
    }, function (_3) {
      leftPanelTextInputControl = _3['default'];
      LEFT_PANEL_TEXT_INPUT_CONTROL_DIRECTIVE = _3.LEFT_PANEL_TEXT_INPUT_CONTROL_DIRECTIVE;
    }, function (_4) {
      leftPanelTextareaControl = _4['default'];
      LEFT_PANEL_TEXTAREA_CONTROL_DIRECTIVE = _4.LEFT_PANEL_TEXTAREA_CONTROL_DIRECTIVE;
    }, function (_5) {
      leftPanelSubtitleControl = _5['default'];
      LEFT_PANEL_SUBTITLE_CONTROL_DIRECTIVE = _5.LEFT_PANEL_SUBTITLE_CONTROL_DIRECTIVE;
    }, function (_6) {
      leftPanelRichTextEditorControl = _6['default'];
      LEFT_PANEL_RICH_TEXT_EDITOR_CONTROL_DIRECTIVE = _6.LEFT_PANEL_RICH_TEXT_EDITOR_CONTROL_DIRECTIVE;
    }, function (_7) {
      leftPanelGroupedSelectControl = _7['default'];
      LEFT_PANEL_GROUPED_SELECT_CONTROL_DIRECTIVE = _7.LEFT_PANEL_GROUPED_SELECT_CONTROL_DIRECTIVE;
    }, function (_8) {
      leftPanelDateControl = _8['default'];
      LEFT_PANEL_DATE_CONTROL_DIRECTIVE = _8.LEFT_PANEL_DATE_CONTROL_DIRECTIVE;
    }, function (_9) {
      leftPanelCheckBoxControl = _9['default'];
      LEFT_PANEL_CHECKBOX_CONTROL_DIRECTIVE = _9.LEFT_PANEL_CHECKBOX_CONTROL_DIRECTIVE;
    }, function (_10) {
      leftPanelBlankControl = _10['default'];
      LEFT_PANEL_BLANK_CONTROL_DIRECTIVE = _10.LEFT_PANEL_BLANK_CONTROL_DIRECTIVE;
    }, function (_11) {
      leftPanelBasicSelectControl = _11['default'];
      LEFT_PANEL_BASIC_SELECT_CONTROL_DIRECTIVE = _11.LEFT_PANEL_BASIC_SELECT_CONTROL_DIRECTIVE;
    }, function (_c) {
      leftPanel = _c['default'];
      LEFT_PANEL_DIRECTIVE = _c.LEFT_PANEL_DIRECTIVE;
    }, function (_e) {
      selectOptionMange = _e['default'];
      LEFT_PANEL_SELECT_OPTION_MANAGE_SERVICE = _e.LEFT_PANEL_SELECT_OPTION_MANAGE_SERVICE;
    }, function (_f) {
      controllerModalProxy = _f['default'];
      CONTROLLER_MODAL_PROXY = _f.CONTROLLER_MODAL_PROXY;
    }, function (_b) {
      leftPanelRadioControl = _b['default'];
      LEFT_PANEL_RADIO_CONTROL_DIRECTIVE = _b.LEFT_PANEL_RADIO_CONTROL_DIRECTIVE;
    }, function (_d) {
      leftPanelPasswordControl = _d['default'];
      LEFT_PANEL_PASSWORD_CONTROL_DIRECTIVE = _d.LEFT_PANEL_PASSWORD_CONTROL_DIRECTIVE;
    }, function (_f2) {
      leftPanelHeaderControl = _f2['default'];
      LEFT_PANEL_HEADER_CONTROL_DIRECTIVE = _f2.LEFT_PANEL_HEADER_CONTROL_DIRECTIVE;
    }],
    execute: function () {
      LEFT_PANEL_MODULE = 'edaDragDropWay.leftPanel.module';

      _export('default', angular.module(LEFT_PANEL_MODULE, []).directive(LEFT_PANEL_DIRECTIVE, leftPanel).controller(LEFT_PANEL_CONTROLLER, leftPanelController).service(LEFT_PANEL_SELECT_OPTION_MANAGE_SERVICE, selectOptionMange).service(CONTROLLER_MODAL_PROXY, controllerModalProxy).directive(LEFT_PANEL_VALID_EDIT_FOOTER_DIRECTIVE, leftPanelValidEditFooter).directive(LEFT_PANEL_TEXT_INPUT_CONTROL_DIRECTIVE, leftPanelTextInputControl).directive(LEFT_PANEL_TEXTAREA_CONTROL_DIRECTIVE, leftPanelTextareaControl).directive(LEFT_PANEL_SUBTITLE_CONTROL_DIRECTIVE, leftPanelSubtitleControl).directive(LEFT_PANEL_RICH_TEXT_EDITOR_CONTROL_DIRECTIVE, leftPanelRichTextEditorControl).directive(LEFT_PANEL_RADIO_CONTROL_DIRECTIVE, leftPanelRadioControl).directive(LEFT_PANEL_PASSWORD_CONTROL_DIRECTIVE, leftPanelPasswordControl).directive(LEFT_PANEL_HEADER_CONTROL_DIRECTIVE, leftPanelHeaderControl).directive(LEFT_PANEL_GROUPED_SELECT_CONTROL_DIRECTIVE, leftPanelGroupedSelectControl).directive(LEFT_PANEL_DATE_CONTROL_DIRECTIVE, leftPanelDateControl).directive(LEFT_PANEL_CHECKBOX_CONTROL_DIRECTIVE, leftPanelCheckBoxControl).directive(LEFT_PANEL_BLANK_CONTROL_DIRECTIVE, leftPanelBlankControl).directive(LEFT_PANEL_BASIC_SELECT_CONTROL_DIRECTIVE, leftPanelBasicSelectControl));
    }
  };
});
$__System.register('2b', ['9', 'a'], function (_export) {
  var _createClass, _classCallCheck, FORM_FIELD_MANAGE_SERVICE, formFieldManage;

  return {
    setters: [function (_) {
      _createClass = _['default'];
    }, function (_a) {
      _classCallCheck = _a['default'];
    }],
    execute: function () {
      'use strict';

      FORM_FIELD_MANAGE_SERVICE = 'formFieldManage';

      formFieldManage = (function () {
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
      })();

      formFieldManage.$inject = ['EasyFormGenFormlyBindingModels'];

      _export('default', formFieldManage);

      _export('FORM_FIELD_MANAGE_SERVICE', FORM_FIELD_MANAGE_SERVICE);
    }
  };
});
$__System.register('2c', [], function (_export) {
  'use strict';

  var initEasyFormListControls, initEasyFormEmptyConfigurationLineModel, initEmptyControlFieldModel, initEasyFormInitialStateConfigurationModel, initEasyFormInitialStateConfigurationModelAddOnForStepWay, initEasyFormReloadConfigurationModel, initHeaderTemplates, initFormlyControlTemplates, initParticularControlProperties;
  return {
    setters: [],
    execute: function () {
      initEasyFormListControls = function initEasyFormListControls() {
        return {
          controls: [],
          selectedControl: 'none',
          temporyConfig: {
            selectedControl: 'none',
            formlyLabel: 'label',
            formlyRequired: false,
            formlyDesciption: '',
            formlyPlaceholder: '',
            formlyOptions: []
          }
        };
      };

      _export('initEasyFormListControls', initEasyFormListControls);

      initEasyFormEmptyConfigurationLineModel = function initEasyFormEmptyConfigurationLineModel() {
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

      _export('initEasyFormEmptyConfigurationLineModel', initEasyFormEmptyConfigurationLineModel);

      initEmptyControlFieldModel = function initEmptyControlFieldModel() {
        return {
          'control': {
            'type': 'none',
            'key': 'none'
          }
        };
      };

      _export('initEmptyControlFieldModel', initEmptyControlFieldModel);

      initEasyFormInitialStateConfigurationModel = function initEasyFormInitialStateConfigurationModel(_easyFormEmptyConfigurationLineModel) {
        // commun all easy form generator ways
        return {
          submitButtonText: 'submit',
          cancelButtonText: 'cancel',
          lines: [].concat(_easyFormEmptyConfigurationLineModel)
        };
      };

      _export('initEasyFormInitialStateConfigurationModel', initEasyFormInitialStateConfigurationModel);

      initEasyFormInitialStateConfigurationModelAddOnForStepWay = function initEasyFormInitialStateConfigurationModelAddOnForStepWay() {
        // specific easy form generator — step way — (not drag and drop way), needed for wizard management
        return {
          activeLine: 1,
          listConfigStep: ['init', 'first', 'second', 'third'],
          stepIndicators: [true, false, false, false],
          configStepCounter: 0
        };
      };

      _export('initEasyFormInitialStateConfigurationModelAddOnForStepWay', initEasyFormInitialStateConfigurationModelAddOnForStepWay);

      initEasyFormReloadConfigurationModel = function initEasyFormReloadConfigurationModel() {
        var reloadConfigModel = initEasyFormInitialStateConfigurationModel();
        reloadConfigModel.lines = [];
        return reloadConfigModel;
      };

      _export('initEasyFormReloadConfigurationModel', initEasyFormReloadConfigurationModel);

      // can't use arrow function here -> 'this' would be bound to caller rather than expected current returned object... 

      initHeaderTemplates = function initHeaderTemplates() {
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

      _export('initHeaderTemplates', initHeaderTemplates);

      initFormlyControlTemplates = function initFormlyControlTemplates() {
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

      _export('initFormlyControlTemplates', initFormlyControlTemplates);

      initParticularControlProperties = function initParticularControlProperties() {
        return [{
          controlType: 'datepicker',
          properties: [{
            isRoot: false,
            isTemplateOptions: true,
            value: 'datepickerPopup'
          }]
        }];
      };

      _export('initParticularControlProperties', initParticularControlProperties);
    }
  };
});
$__System.register('2d', ['2c'], function (_export) {
  'use strict';

  var helpers, EASY_FORM_FORMLY_BINDING_MODEL_PROVIDER;

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
              var _ret = (function () {
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
              })();

              if (typeof _ret === 'object') return _ret.v;
            }
          }
        }
      }
    }
  }

  return {
    setters: [function (_c) {
      helpers = _c;
    }],
    execute: function () {
      EASY_FORM_FORMLY_BINDING_MODEL_PROVIDER = 'EasyFormGenFormlyBindingModels';
      EasyFormGenFormlyBindingModels.$inject = [];

      _export('default', EasyFormGenFormlyBindingModels);

      _export('EASY_FORM_FORMLY_BINDING_MODEL_PROVIDER', EASY_FORM_FORMLY_BINDING_MODEL_PROVIDER);
    }
  };
});
$__System.register('2e', ['2b', '2d'], function (_export) {
  'use strict';

  var formFieldManage, FORM_FIELD_MANAGE_SERVICE, EasyFormGenFormlyBindingModels, EASY_FORM_FORMLY_BINDING_MODEL_PROVIDER, FORMLY_PROXY_MODULE;
  return {
    setters: [function (_b) {
      formFieldManage = _b['default'];
      FORM_FIELD_MANAGE_SERVICE = _b.FORM_FIELD_MANAGE_SERVICE;
    }, function (_d) {
      EasyFormGenFormlyBindingModels = _d['default'];
      EASY_FORM_FORMLY_BINDING_MODEL_PROVIDER = _d.EASY_FORM_FORMLY_BINDING_MODEL_PROVIDER;
    }],
    execute: function () {
      FORMLY_PROXY_MODULE = '';

      _export('default', angular.module(FORMLY_PROXY_MODULE, []).service(FORM_FIELD_MANAGE_SERVICE, formFieldManage).provider(EASY_FORM_FORMLY_BINDING_MODEL_PROVIDER, EasyFormGenFormlyBindingModels));
    }
  };
});
$__System.register('2f', [], function (_export) {
	'use strict';

	var DD_CONTENT_COUNTER_DIRECTIVE;

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
			var timer = undefined;
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

	return {
		setters: [],
		execute: function () {
			DD_CONTENT_COUNTER_DIRECTIVE = 'ddContentCounter';
			ddContentCounter.$inject = ['dragDropItemCounterService', '$timeout'];

			_export('default', ddContentCounter);

			_export('DD_CONTENT_COUNTER_DIRECTIVE', DD_CONTENT_COUNTER_DIRECTIVE);
		}
	};
});
$__System.register('30', ['9', 'a'], function (_export) {
	var _createClass, _classCallCheck, DRAG_DROP_ITEM_COUNTER_SERVICE, dragDropItemCounterService;

	return {
		setters: [function (_) {
			_createClass = _['default'];
		}, function (_a) {
			_classCallCheck = _a['default'];
		}],
		execute: function () {
			'use strict';

			DRAG_DROP_ITEM_COUNTER_SERVICE = 'dragDropItemCounterService';

			dragDropItemCounterService = (function () {
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
			})();

			dragDropItemCounterService.$inject = ['easyFormDragWayConfig'];

			_export('default', dragDropItemCounterService);

			_export('DRAG_DROP_ITEM_COUNTER_SERVICE', DRAG_DROP_ITEM_COUNTER_SERVICE);
		}
	};
});
$__System.registerDynamic("31", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = "<div ng-click=\"ddDecorContainerCtrl.collapseFct()\">\n   <h6\n    ng-show=\"ddDecorContainerCtrl.config.isEnabled\"\n    class=\"ddDecorContainerCtrl.isCollapsableZone\"\n    style=\"cursor:pointer\">\n    <button class=\"btn btn-primary btn-xs\">\n      <span class=\"{{ddDecorContainerCtrl.currentIconClass()}}\"></span>\n    </button>\n    &nbsp;\n    {{ddDecorContainerCtrl.currentTitle}}\n  </h6>\n</div>\n<div uib-collapse=\"ddDecorContainerCtrl.isCollapsed\">\n   <div id=\"ddDecorContainerWillTranscludeHere\"></div>\n</div>\n";
  global.define = __define;
  return module.exports;
});

$__System.register('32', ['31', '33'], function (_export) {
	/* global angular */
	'use strict';

	var ddDecorContainerTemplate, DD_DECOR_CONTAINER_CONTROLLER_NAME, DD_DECOR_CONTAINER_CONTROLLERAS_NAME, DD_DECOR_CONTAINER_DIRECTIVE;

	function ddDecorContainer() {
		var directive = {
			restrict: 'A',
			template: ddDecorContainerTemplate,
			scope: {},
			controller: DD_DECOR_CONTAINER_CONTROLLER_NAME,
			controllerAs: DD_DECOR_CONTAINER_CONTROLLERAS_NAME,
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

	return {
		setters: [function (_) {
			ddDecorContainerTemplate = _['default'];
		}, function (_2) {
			DD_DECOR_CONTAINER_CONTROLLER_NAME = _2.DD_DECOR_CONTAINER_CONTROLLER_NAME;
			DD_DECOR_CONTAINER_CONTROLLERAS_NAME = _2.DD_DECOR_CONTAINER_CONTROLLERAS_NAME;
		}],
		execute: function () {
			DD_DECOR_CONTAINER_DIRECTIVE = 'ddDecorContainer';

			_export('default', ddDecorContainer);

			_export('DD_DECOR_CONTAINER_DIRECTIVE', DD_DECOR_CONTAINER_DIRECTIVE);
		}
	};
});
$__System.register('33', ['9', 'a'], function (_export) {
	var _createClass, _classCallCheck, DD_DECOR_CONTAINER_CONTROLLER_NAME, DD_DECOR_CONTAINER_CONTROLLERAS_NAME, ddDecorContainerController;

	return {
		setters: [function (_) {
			_createClass = _['default'];
		}, function (_a) {
			_classCallCheck = _a['default'];
		}],
		execute: function () {
			/* global angular */
			'use strict';

			DD_DECOR_CONTAINER_CONTROLLER_NAME = 'ddDecorContainerController';
			DD_DECOR_CONTAINER_CONTROLLERAS_NAME = 'ddDecorContainerCtrl';

			ddDecorContainerController = (function () {
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
			})();

			_export('default', ddDecorContainerController);

			_export('DD_DECOR_CONTAINER_CONTROLLER_NAME', DD_DECOR_CONTAINER_CONTROLLER_NAME);

			_export('DD_DECOR_CONTAINER_CONTROLLERAS_NAME', DD_DECOR_CONTAINER_CONTROLLERAS_NAME);
		}
	};
});
$__System.registerDynamic("34", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = "<div class=\"{{styleParam.ApplycssClass}}\">\n  <div id=\"visualPanel\">\n    <div  class=\"panel panel-default\">\n      <div class=\"panel-heading\">\n        <h3 class=\"panel-title\">\n          <i class=\"{{currentFontAwesome}}\"></i>&nbsp;\n          {{currentTitle}}\n           <div ng-show=\"headerConfig.HeaderButtonVisible\">\n             <button\n              class=\"btn btn-primary btn-xs buttonHeaderAddNewLine center-block\"\n              ng-click=\"addNewLineFct();\">\n               <span class=\"glyphicon glyphicon-plus\"></span>\n               &nbsp;\n               add new line\n             </button>\n           </div>\n        </h3>\n      </div>\n      <div class=\"panel-body\">\n         <div class=\"row\">\n            <div class=\"col-md-12\" ng-transclude>\n            </div>\n         </div>\n      </div>\n    </div>\n   </div>\n</div>\n";
  global.define = __define;
  return module.exports;
});

$__System.register('35', ['34'], function (_export) {
	/* global angular */
	'use strict';

	var ddDecorDropZoneTemplate, DD_DECOR_DROPZONE_DIRECTIVE;

	function ddDecorDropZone() {
		var directive = {
			restrict: 'A',
			template: ddDecorDropZoneTemplate,
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

	return {
		setters: [function (_) {
			ddDecorDropZoneTemplate = _['default'];
		}],
		execute: function () {
			DD_DECOR_DROPZONE_DIRECTIVE = 'ddDecorDropZone';
			ddDecorDropZone.$inject = [];

			_export('default', ddDecorDropZone);

			_export('DD_DECOR_DROPZONE_DIRECTIVE', DD_DECOR_DROPZONE_DIRECTIVE);
		}
	};
});
$__System.registerDynamic("36", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = "<div>\n  <div id=\"itemDirectiveTranscludeHere\"></div>\n</div>\n";
  global.define = __define;
  return module.exports;
});

$__System.register('37', ['36'], function (_export) {
	'use strict';

	var dragdropItemTemplate, DRAG_DROP_DECOR_ITEM;

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
			template: dragdropItemTemplate,
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

	return {
		setters: [function (_) {
			dragdropItemTemplate = _['default'];
		}],
		execute: function () {
			DRAG_DROP_DECOR_ITEM = 'ddDecorItem';
			ddDecorItem.$inject = ['easyFormDragWayConfig'];

			_export('default', ddDecorItem);

			_export('DRAG_DROP_DECOR_ITEM', DRAG_DROP_DECOR_ITEM);
		}
	};
});
$__System.register('38', ['9', 'a'], function (_export) {
	var _createClass, _classCallCheck, DRAG_DROP_ITEM_DECOR_SERVICE, dragDropItemDecorationService;

	return {
		setters: [function (_) {
			_createClass = _['default'];
		}, function (_a) {
			_classCallCheck = _a['default'];
		}],
		execute: function () {
			'use strict';

			DRAG_DROP_ITEM_DECOR_SERVICE = 'dragDropItemDecorationService';

			dragDropItemDecorationService = (function () {
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
			})();

			dragDropItemDecorationService.$inject = ['easyFormDragWayConfig'];

			_export('default', dragDropItemDecorationService);

			_export('DRAG_DROP_ITEM_DECOR_SERVICE', DRAG_DROP_ITEM_DECOR_SERVICE);
		}
	};
});
$__System.registerDynamic("39", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = "<div\n  ng-class=\"{confirmLineDelete : deleteLine.readyToDelete}\"\n  ng-dblclick=\"removeMe($event);\"\n  ng-click=\"cancelDelete($event);\">\n  <button\n    ng-show=\"deleteLine.readyToDelete === true\"\n    type=\"button\"\n    class=\"btn btn-danger pull-right buttonCloseLine\" >\n     <span\n      class=\"glyphicon glyphicon-trash\"\n      aria-hidden=\"true\">\n    </span>\n  </button>\n</div>\n<div id=\"lineDirectiveTranscludeHere\"></div>\n";
  global.define = __define;
  return module.exports;
});

$__System.register('3a', ['39'], function (_export) {
	/* global angular */
	'use strict';

	var ddDecorLineTemplate, DRAG_DROP_DECOR_LINE;

	function ddDecorLine($timeout) {
		var directive = {
			restrict: 'A',
			scope: {
				'verboseMode': '@ddLineVerboseMode',
				'currentIndex': '@ddLineCurrentIndex',
				'parentIndex': '@ddLineParentIndex',
				'removeLine': '&ddRemoveLine'
			},
			template: ddDecorLineTemplate,
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
			var timer = undefined;

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

	return {
		setters: [function (_) {
			ddDecorLineTemplate = _['default'];
		}],
		execute: function () {
			DRAG_DROP_DECOR_LINE = 'ddDecorLine';
			ddDecorLine.$inject = ['$timeout'];

			_export('default', ddDecorLine);

			_export('DRAG_DROP_DECOR_LINE', DRAG_DROP_DECOR_LINE);
		}
	};
});
$__System.register('3b', [], function (_export) {
	'use strict';

	var DRAG_DROP_NO_EDITABLE_CONTROL;

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

	return {
		setters: [],
		execute: function () {
			DRAG_DROP_NO_EDITABLE_CONTROL = 'ddNoEditableControl';
			ddNoEditableControl.$inject = [];

			_export('default', ddNoEditableControl);

			_export('DRAG_DROP_NO_EDITABLE_CONTROL', DRAG_DROP_NO_EDITABLE_CONTROL);
		}
	};
});
$__System.register('3c', ['30', '32', '33', '35', '37', '38', '2f', '3a', '3b'], function (_export) {
	/* global angular */
	'use strict';

	var dragDropItemCounterService, DRAG_DROP_ITEM_COUNTER_SERVICE, ddDecorContainerDirective, DD_DECOR_CONTAINER_DIRECTIVE, ddDecorContainerController, DD_DECOR_CONTAINER_CONTROLLER_NAME, ddDecorDropZone, DD_DECOR_DROPZONE_DIRECTIVE, ddDecorItem, DRAG_DROP_DECOR_ITEM, dragDropItemDecorationService, DRAG_DROP_ITEM_DECOR_SERVICE, ddContentCounter, DD_CONTENT_COUNTER_DIRECTIVE, ddDecorLine, DRAG_DROP_DECOR_LINE, ddNoEditableControl, DRAG_DROP_NO_EDITABLE_CONTROL, DRAGDROP_MODULE;
	return {
		setters: [function (_) {
			dragDropItemCounterService = _['default'];
			DRAG_DROP_ITEM_COUNTER_SERVICE = _.DRAG_DROP_ITEM_COUNTER_SERVICE;
		}, function (_2) {
			ddDecorContainerDirective = _2['default'];
			DD_DECOR_CONTAINER_DIRECTIVE = _2.DD_DECOR_CONTAINER_DIRECTIVE;
		}, function (_3) {
			ddDecorContainerController = _3['default'];
			DD_DECOR_CONTAINER_CONTROLLER_NAME = _3.DD_DECOR_CONTAINER_CONTROLLER_NAME;
		}, function (_4) {
			ddDecorDropZone = _4['default'];
			DD_DECOR_DROPZONE_DIRECTIVE = _4.DD_DECOR_DROPZONE_DIRECTIVE;
		}, function (_5) {
			ddDecorItem = _5['default'];
			DRAG_DROP_DECOR_ITEM = _5.DRAG_DROP_DECOR_ITEM;
		}, function (_6) {
			dragDropItemDecorationService = _6['default'];
			DRAG_DROP_ITEM_DECOR_SERVICE = _6.DRAG_DROP_ITEM_DECOR_SERVICE;
		}, function (_f) {
			ddContentCounter = _f['default'];
			DD_CONTENT_COUNTER_DIRECTIVE = _f.DD_CONTENT_COUNTER_DIRECTIVE;
		}, function (_a) {
			ddDecorLine = _a['default'];
			DRAG_DROP_DECOR_LINE = _a.DRAG_DROP_DECOR_LINE;
		}, function (_b) {
			ddNoEditableControl = _b['default'];
			DRAG_DROP_NO_EDITABLE_CONTROL = _b.DRAG_DROP_NO_EDITABLE_CONTROL;
		}],
		execute: function () {
			DRAGDROP_MODULE = 'edaDragDropWay.dragdrop.module';

			_export('default', angular.module(DRAGDROP_MODULE, []).directive(DD_CONTENT_COUNTER_DIRECTIVE, ddContentCounter).controller(DD_DECOR_CONTAINER_CONTROLLER_NAME, ddDecorContainerController).directive(DD_DECOR_CONTAINER_DIRECTIVE, ddDecorContainerDirective).directive(DD_DECOR_DROPZONE_DIRECTIVE, ddDecorDropZone).directive(DRAG_DROP_DECOR_ITEM, ddDecorItem).service(DRAG_DROP_ITEM_DECOR_SERVICE, dragDropItemDecorationService).directive(DRAG_DROP_NO_EDITABLE_CONTROL, ddNoEditableControl).service(DRAG_DROP_ITEM_COUNTER_SERVICE, dragDropItemCounterService).directive(DRAG_DROP_DECOR_LINE, ddDecorLine));
		}
	};
});
$__System.register('3d', [], function (_export) {
  'use strict';

  var EDA_RIGHT_CLICK_DIRECTIVE;

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

  return {
    setters: [],
    execute: function () {
      EDA_RIGHT_CLICK_DIRECTIVE = 'edaRightClick';
      edaRightClick.$inject = ['$parse'];

      _export('default', edaRightClick);

      _export('EDA_RIGHT_CLICK_DIRECTIVE', EDA_RIGHT_CLICK_DIRECTIVE);
    }
  };
});
$__System.register('3e', ['9', 'a'], function (_export) {
	var _createClass, _classCallCheck, EDA_RIGHT_CLICKED_MANAGER_SERVICE, ddItemRightClickedManager;

	return {
		setters: [function (_) {
			_createClass = _['default'];
		}, function (_a) {
			_classCallCheck = _a['default'];
		}],
		execute: function () {
			'use strict';

			EDA_RIGHT_CLICKED_MANAGER_SERVICE = 'ddItemRightClickedManager';

			ddItemRightClickedManager = (function () {
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
			})();

			ddItemRightClickedManager.$inject = [];

			_export('default', ddItemRightClickedManager);

			_export('EDA_RIGHT_CLICKED_MANAGER_SERVICE', EDA_RIGHT_CLICKED_MANAGER_SERVICE);
		}
	};
});
$__System.register('3f', ['3d', '3e'], function (_export) {
	'use strict';

	var edaRightClick, EDA_RIGHT_CLICK_DIRECTIVE, ddItemRightClickedManager, EDA_RIGHT_CLICKED_MANAGER_SERVICE, EDA_RIGHT_CLICK_MODULE;
	return {
		setters: [function (_d) {
			edaRightClick = _d['default'];
			EDA_RIGHT_CLICK_DIRECTIVE = _d.EDA_RIGHT_CLICK_DIRECTIVE;
		}, function (_e) {
			ddItemRightClickedManager = _e['default'];
			EDA_RIGHT_CLICKED_MANAGER_SERVICE = _e.EDA_RIGHT_CLICKED_MANAGER_SERVICE;
		}],
		execute: function () {
			EDA_RIGHT_CLICK_MODULE = 'eda.right.click.module';

			_export('default', angular.module(EDA_RIGHT_CLICK_MODULE, []).directive(EDA_RIGHT_CLICK_DIRECTIVE, edaRightClick).service(EDA_RIGHT_CLICKED_MANAGER_SERVICE, ddItemRightClickedManager));
		}
	};
});
$__System.register('40', ['9', 'a'], function (_export) {
  var _createClass, _classCallCheck, DRAG_DROP_CONFIG_PROXY_SERVICE, ddModelConfModelProxyService;

  return {
    setters: [function (_) {
      _createClass = _['default'];
    }, function (_a) {
      _classCallCheck = _a['default'];
    }],
    execute: function () {
      'use strict';

      DRAG_DROP_CONFIG_PROXY_SERVICE = 'ddModelConfModelProxyService';

      ddModelConfModelProxyService = (function () {
        function ddModelConfModelProxyService(EasyFormGenFormlyBindingModels,
        // controllerModalProxy,
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
            this.$parse('control.templateOptions.description').assign(configurationCtrlModel, this.$parse('formlyDesciption')(formlyDetailCtrlModel));
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
      })();

      ddModelConfModelProxyService.$inject = ['EasyFormGenFormlyBindingModels',
      // 'controllerModalProxy',
      // 'dragDropConfig',
      'easyFormDragWayConfig', '$parse'];

      _export('default', ddModelConfModelProxyService);

      _export('DRAG_DROP_CONFIG_PROXY_SERVICE', DRAG_DROP_CONFIG_PROXY_SERVICE);
    }
  };
});
// dragDropConfig,
$__System.register('41', ['40'], function (_export) {
	'use strict';

	var ddModelConfModelProxyService, DRAG_DROP_CONFIG_PROXY_SERVICE, EDA_CONFIG_PROXY_MODULE;
	return {
		setters: [function (_) {
			ddModelConfModelProxyService = _['default'];
			DRAG_DROP_CONFIG_PROXY_SERVICE = _.DRAG_DROP_CONFIG_PROXY_SERVICE;
		}],
		execute: function () {
			EDA_CONFIG_PROXY_MODULE = 'eda.config.proxy.module';

			_export('default', angular.module(EDA_CONFIG_PROXY_MODULE, []).service(DRAG_DROP_CONFIG_PROXY_SERVICE, ddModelConfModelProxyService));
		}
	};
});
$__System.register('42', [], function (_export) {
  'use strict';

  var DNDLIST_DIRECTIVE, TO_INJECT;

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

  return {
    setters: [],
    execute: function () {
      DNDLIST_DIRECTIVE = 'dndList';
      TO_INJECT = ['$parse', '$timeout', 'dndDropEffectWorkaround', 'dndDragTypeWorkaround'];

      dndList.$inject = TO_INJECT;

      _export('default', dndList);

      _export('DNDLIST_DIRECTIVE', DNDLIST_DIRECTIVE);
    }
  };
});
$__System.register('43', [], function (_export) {
  'use strict';

  var DNDDRAGGABLE_DIRECTIVE, TO_INJECT;

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

  return {
    setters: [],
    execute: function () {
      DNDDRAGGABLE_DIRECTIVE = 'dndDraggable';
      TO_INJECT = ['$parse', '$timeout', 'dndDropEffectWorkaround', 'dndDragTypeWorkaround'];

      dndDraggable.$inject = TO_INJECT;

      _export('default', dndDraggable);

      _export('DNDDRAGGABLE_DIRECTIVE', DNDDRAGGABLE_DIRECTIVE);
    }
  };
});
$__System.register('44', ['42', '43'], function (_export) {
  'use strict';

  var dndList, DNDLIST_DIRECTIVE, dndDraggable, DNDDRAGGABLE_DIRECTIVE, DRAG_DROP_LIST_MODULE;
  return {
    setters: [function (_) {
      dndList = _['default'];
      DNDLIST_DIRECTIVE = _.DNDLIST_DIRECTIVE;
    }, function (_2) {
      dndDraggable = _2['default'];
      DNDDRAGGABLE_DIRECTIVE = _2.DNDDRAGGABLE_DIRECTIVE;
    }],
    execute: function () {
      DRAG_DROP_LIST_MODULE = 'dndLists.module';

      _export('default', angular.module(DRAG_DROP_LIST_MODULE, []).directive(DNDLIST_DIRECTIVE, dndList).directive(DNDDRAGGABLE_DIRECTIVE, dndDraggable).factory('dndDragTypeWorkaround', function () {
        return {};
      }).factory('dndDropEffectWorkaround', function () {
        return {};
      }));
    }
  };
});
$__System.register('45', [], function (_export) {
  'use strict';

  var PAGE_SLIDE_DIRECTIVE;

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

  return {
    setters: [],
    execute: function () {
      PAGE_SLIDE_DIRECTIVE = 'pageslide';
      pageslide.$inject = [];

      _export('default', pageslide);

      _export('PAGE_SLIDE_DIRECTIVE', PAGE_SLIDE_DIRECTIVE);
    }
  };
});
$__System.register('46', ['45'], function (_export) {
  'use strict';

  var pageslide, PAGE_SLIDE_DIRECTIVE, PAGE_SLIDE_MODULE;
  return {
    setters: [function (_) {
      pageslide = _['default'];
      PAGE_SLIDE_DIRECTIVE = _.PAGE_SLIDE_DIRECTIVE;
    }],
    execute: function () {
      PAGE_SLIDE_MODULE = 'pageslide.module';

      _export('default', angular.module(PAGE_SLIDE_MODULE, []).directive(PAGE_SLIDE_DIRECTIVE, pageslide));
    }
  };
});
$__System.register('47', [], function (_export) {
  'use strict';

  var LIST_DRAG_DROP_ITEM_CSS_CLASSES, DRAG_DROP_CONFIG_MODEL, DRAG_DROP_PRESENTATION_MODEL, ITEMS_NOT_TO_COUNT_FOR_REAL;
  return {
    setters: [],
    execute: function () {
      LIST_DRAG_DROP_ITEM_CSS_CLASSES = [{
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
      DRAG_DROP_CONFIG_MODEL = {
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
      DRAG_DROP_PRESENTATION_MODEL = [
      //1 column here is control selection column
      [], [
      //empty 1st line at initialisation
      []]];
      ITEMS_NOT_TO_COUNT_FOR_REAL = {
        //placeholder :         '',
        itemBeingDragged: ''
      };

      _export('LIST_DRAG_DROP_ITEM_CSS_CLASSES', LIST_DRAG_DROP_ITEM_CSS_CLASSES);

      _export('DRAG_DROP_CONFIG_MODEL', DRAG_DROP_CONFIG_MODEL);

      _export('DRAG_DROP_PRESENTATION_MODEL', DRAG_DROP_PRESENTATION_MODEL);

      _export('ITEMS_NOT_TO_COUNT_FOR_REAL', ITEMS_NOT_TO_COUNT_FOR_REAL);
    }
  };
});
$__System.register('48', ['47'], function (_export) {
	// TODO : Add here configs from ES5 dragDropConfigProvider

	'use strict';

	var LIST_DRAG_DROP_ITEM_CSS_CLASSES, DRAG_DROP_CONFIG_MODEL, DRAG_DROP_PRESENTATION_MODEL, ITEMS_NOT_TO_COUNT_FOR_REAL, EASY_FORM_DRAG_DROP_WAY_CONFIG_NAME;

	function easyFormDragWayConfig() {

		var _listDragDropItemCssClasses = [].concat(LIST_DRAG_DROP_ITEM_CSS_CLASSES);
		var _dragDropConfigModel = angular.copy(DRAG_DROP_CONFIG_MODEL);
		var _dragDropPresentationModel = [].concat(DRAG_DROP_PRESENTATION_MODEL);
		var _itemsNotToCountFoReal = angular.copy(ITEMS_NOT_TO_COUNT_FOR_REAL);

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

	return {
		setters: [function (_) {
			LIST_DRAG_DROP_ITEM_CSS_CLASSES = _.LIST_DRAG_DROP_ITEM_CSS_CLASSES;
			DRAG_DROP_CONFIG_MODEL = _.DRAG_DROP_CONFIG_MODEL;
			DRAG_DROP_PRESENTATION_MODEL = _.DRAG_DROP_PRESENTATION_MODEL;
			ITEMS_NOT_TO_COUNT_FOR_REAL = _.ITEMS_NOT_TO_COUNT_FOR_REAL;
		}],
		execute: function () {
			EASY_FORM_DRAG_DROP_WAY_CONFIG_NAME = 'easyFormDragWayConfig';
			easyFormDragWayConfig.$inject = [];

			_export('default', easyFormDragWayConfig);

			_export('EASY_FORM_DRAG_DROP_WAY_CONFIG_NAME', EASY_FORM_DRAG_DROP_WAY_CONFIG_NAME);
		}
	};
});
$__System.registerDynamic("49", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = "<section id=\"pageWfEdit\">\n  <div>\n    <div class=\"container\">\n      <section id=\"preview\">\n        <div id=\"preview-content\">\n\t\t\t\t\t<div class=\"content-container\">\n\t\t\t\t\t\t<toaster-container\n              toaster-options=\"{ 'position-class': 'toast-top-full-width', 'extendedTimeout' : 500,'timeOut': 500 }\">\n\t\t\t\t\t\t</toaster-container>\n\t\t\t\t\t\t<uib-tabset justified=\"true\">\n\t\t\t\t\t\t\t<uib-tab\n                select=\"vm.tabJustSelected(2)\"\n                active=\"vm.tab.editTab.active\"\n                heading=\"Edit /Create\">\n                <div class=\"row\">\n\t\t\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\t\t\tpageslide\n\t\t\t\t\t\t\t\t\t\tps-open=\"vm.editPanelModel.toggle\"\n\t\t\t\t\t\t\t\t\t\tps-side=\"left\"\n\t\t\t\t\t\t\t\t\t\tps-cloak=\"true\"\n\t\t\t\t\t\t\t\t\t\tps-size=\"400px\">\n\t\t\t\t\t\t\t\t\t\t<left-panel\n                      close-edit-panel=\"vm.closeEditPanel()\"\n                      save-from-edit-panel=vm.saveFromEditPanel()>\n                    </left-panel>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"row advancedDemo\">\n\t\t\t\t\t\t\t\t\t\t\t<div ng-repeat=\"containers in vm.dragDropModel\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\t\t\t\t\t\tdd-decor-drop-zone\n\t\t\t\t\t\t\t\t\t\t\t\t\tdd-drop-zone-properties=\"vm.easyFormDragDropProperties.dropZoneConfig.decoration[$index]\"\n\t\t\t\t\t\t\t\t\t\t\t\t\tdd-drop-zone-verbose-mode=\"{{vm.easyFormDragDropProperties.dropZoneConfig.verboseMode}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\tdd-drop-zone-current-index=\"{{$index}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\tdd-drop-zone-add-new-line=\"vm.insertNewLine()\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div \tclass=\"dropzone box box-yellow\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ul\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-list=\"containers\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-allowed-types=\"['containerType']\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-external-sources=\"true\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-dragover=\"vm.dragoverCallbackContainer($parent.$parent.$index, $parent.$index, $index);\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-drop=\"vm.dropCallback(event, index, item, external, type, 'containerType');\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tng-repeat=\"items in containers\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-draggable=\"items\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-type=\"'containerType'\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-effect-allowed=\"copyMove\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-dragstart=\"\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-moved=\"containers.splice($index, 1);\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-disable-if=\"$parent.$index == 0\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-copied=\"\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"container-element box box-blue\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-decor-container\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-container-properties=\"vm.easyFormDragDropProperties.containerConfig.decoration[$index]\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-container-is-collpased=\"vm.easyFormDragDropProperties.containerConfig.decoration[$index].isCollapsed\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-container-verbose-mode=\"{{vm.easyFormDragDropProperties.containerConfig.verboseMode}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-container-current-index=\"{{$parent.$index}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-collapse-all=\"vm.collapseAllGroupControl(exceptThisOne)\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div dd-decor-include-container-here>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-decor-line\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-line-verbose-mode=\"{{vm.easyFormDragDropProperties.containerConfig.verboseMode}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-line-current-index=\"{{$index}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-line-parent-index=\"{{$parent.$index}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-remove-line=\"vm.removeThisLine($index)\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ul\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-list=\"items\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-allowed-types=\"['itemType']\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-horizontal-list=\"true\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-external-sources=\"true\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-disable-if=\"items.length > 2\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-dragover=\"vm.dragoverCallbackItems($parent.$parent.$index, $parent.$index, $index, external);\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-drop=\"vm.dropCallbackItems(event, index, $index,$parent.$index, $parent.$parent.$index, $parent.$parent.$parent.$index, item, external, type, 'itemType');\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"itemlist\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-content-counter\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-value-when-placeholder=\"dndPlaceholder\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-value-when-dragging=\"dndDraggingSource\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-full-model = \"vm.dragDropModel\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-content-counter-current-index=\"{{$index}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-content-counter-parent-index=\"{{$parent.$index}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-content-counter-force-css-refresh = \"command.forceRefresh\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tng-repeat=\"item in items\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-draggable=\"item\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-type=\"'itemType'\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-effect-allowed=\"copyMove\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-dragstart=\"\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-moved=\"vm.dndItemMoved($parent.$parent.$index, $parent.$index, $index);\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdnd-copied=\"\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-decor-item\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-item-verbose-mode=\"{{vm.easyFormDragDropProperties.itemConfig.verboseMode}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-item-current-index=\"{{$index}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-item-parent-index=\"{{$parent.$index}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-item-parent-parent-index = \"{{$parent.$parent.$index}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-items-count=\"items.length\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-item-css-class=\"{{item.cssClass}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div id=\"itemContent\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdd-no-editable-control\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"rightClickCtrl\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tng-class=\"{rightClickCtrlSelected : item.rightCliked === true}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\teda-set-right-clicked=\"vm.setRightClicked(previousState, item)\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\teda-right-click=\"vm.toggleEditPanel($event, $parent.$index, $index, item)\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\teda-selected-class=\"rightClickCtrlSelected\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\teda-is-selected=\"{{item.rightCliked}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\teda-right-click-col-index = \"{{$parent.$parent.$index}}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span ng-bind-html=\"item.label | trustThis\"></span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"clearfix\"></div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</uib-tab>\n\t\t\t\t\t\t\t<uib-tab\n\t\t\t\t\t\t\t\tselect=\"vm.tabJustSelected(1)\"\n\t\t\t\t\t\t\t\tactive=\"vm.tab.previewTab.active\"\n\t\t\t\t\t\t\t\theading=\"Preview\">\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\t\t\t\t\t\t\t\t\t\t<form ng-submit=\"vm.onSubmit()\">\n\t\t\t\t\t\t\t\t\t\t\t<formly-form\n\t\t\t\t\t\t\t\t\t\t\t\tid=\"previewFormlyForm\"\n\t\t\t\t\t\t\t\t\t\t\t\tmodel=\"vm.model\"\n\t\t\t\t\t\t\t\t\t\t\t\tfields=\"vm.wfFormFields\">\n\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"pull-right\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<button\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"btn btn-primary\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype=\"submit\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{vm.configuration.submitButtonText}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<button\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"btn btn-primary\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype=\"cancel\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{vm.configuration.cancelButtonText}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t\t</formly-form>\n\t\t\t\t\t\t\t\t\t\t</form>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div  class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\t\t\tclass=\"panel-heading heading-preview\"\n\t\t\t\t\t\t\t\t\t\tng-click=\"vm.ihm.preview.customizeFormButtonsExpanded =!vm.ihm.preview.customizeFormButtonsExpanded\">\n\t\t\t\t\t\t\t\t\t\t<h3 class=\"panel-title\">\n\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary btn-xs\" >\n\t\t\t\t\t\t\t\t\t\t\t\t<i\n\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"fa\"\n\t\t\t\t\t\t\t\t\t\t\t\t\tng-class=\"{'fa-angle-down':!vm.ihm.preview.customizeFormButtonsExpanded, 'fa-angle-up' : vm.ihm.preview.customizeFormButtonsExpanded}\">\n\t\t\t\t\t\t\t\t\t\t\t\t</i>\n\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t\t&nbsp;\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-wrench\"></i>\n\t\t\t\t\t\t\t\t\t\t\t&nbsp;\n\t\t\t\t\t\t\t\t\t\t\tCustomize form buttons\n\t\t\t\t\t\t\t\t\t\t</h3>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\t\t\t\t\t\t\t\t\t\t<div uib-collapse=\"vm.ihm.preview.customizeFormButtonsExpanded\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-6\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfor=\"inputSubmitButtontext\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\" greyText control-label\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tCustomize Submit button Text :\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype=\"text\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"form-control\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid=\"inputSubmitButtontext\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder=\"Submit button text\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tng-model=\"vm.configuration.submitButtonText\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-6\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfor=\"inputCancelButtontext\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\" greyText control-label\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tCustomize Cancel button Text :\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype=\"text\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"form-control\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid=\"inputCancelButtontext\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder=\"Cancel button text\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tng-model=\"vm.configuration.cancelButtonText\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\t\t\tclass=\"panel-heading heading-preview\"\n\t\t\t\t\t\t\t\t\t\tng-click=\"vm.ihm.preview.formlyModelViewExpanded =!vm.ihm.preview.formlyModelViewExpanded\">\n\t\t\t\t\t\t\t\t\t\t<h3 class=\"panel-title\">\n\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary btn-xs\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<i\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"fa\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tng-class=\"{'fa-angle-down':!vm.ihm.preview.formlyModelViewExpanded, 'fa-angle-up' : vm.ihm.preview.formlyModelViewExpanded}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t</i>\n\t\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t\t\t&nbsp;\n\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-eye\"></i>\n\t\t\t\t\t\t\t\t\t\t\t\t&nbsp;\n\t\t\t\t\t\t\t\t\t\t\t\tDATA MODEL\n\t\t\t\t\t\t\t\t\t\t</h3>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\t\t\t\t\t\t\t\t\t\t<div uib-collapse=\"vm.ihm.preview.formlyModelViewExpanded\">\n\t\t\t\t\t\t\t\t\t\t\t<pre>\n\t\t\t\t\t\t\t\t\t\t\t\t{{vm.model | json}}\n\t\t\t\t\t\t\t\t\t\t\t</pre>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\t\t\tclass=\"panel-heading heading-preview\"\n\t\t\t\t\t\t\t\t\t\tng-click=\"vm.ihm.preview.formlyFieldsViewExpanded =!vm.ihm.preview.formlyFieldsViewExpanded\">\n\t\t\t\t\t\t\t\t\t\t<h3 class=\"panel-title\">\n\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary btn-xs\">\n\t\t\t\t\t\t\t\t\t\t\t\t<i\n\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"fa\"\n\t\t\t\t\t\t\t\t\t\t\t\t\tng-class=\"{'fa-angle-down':!vm.ihm.preview.formlyFieldsViewExpanded, 'fa-angle-up' : vm.ihm.preview.formlyFieldsViewExpanded}\"></i>\n\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t\t&nbsp;\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-eye\"></i>\n\t\t\t\t\t\t\t\t\t\t\t&nbsp;\n\t\t\t\t\t\t\t\t\t\t\tFIELDS MODEL (ready to save to database one)\n\t\t\t\t\t\t\t\t\t\t</h3>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\t\t\t\t\t\t\t\t\t\t<div uib-collapse=\"vm.ihm.preview.formlyFieldsViewExpanded\">\n\t\t\t\t\t\t\t\t\t\t\t<pre>\n\t\t\t\t\t\t\t\t\t\t\t\t{{vm.wfFormFieldsOnlyNeededProperties | json}}\n\t\t\t\t\t\t\t\t\t\t\t</pre>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\t\t\tclass=\"panel-heading heading-preview\"\n\t\t\t\t\t\t\t\t\t\tng-click=\"vm.ihm.preview.saveThisFormExpanded =!vm.ihm.preview.saveThisFormExpanded\">\n\t\t\t\t\t\t\t\t\t\t<h3 class=\"panel-title\">\n\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary btn-xs\" >\n\t\t\t\t\t\t\t\t\t\t\t\t<i\n\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"fa\"\n\t\t\t\t\t\t\t\t\t\t\t\t\tng-class=\"{'fa-angle-down':!vm.ihm.preview.saveThisFormExpanded, 'fa-angle-up' : vm.ihm.preview.saveThisFormExpanded}\"></i>\n\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t\t&nbsp;\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-camera-retro\"></i>\n\t\t\t\t\t\t\t\t\t\t\t&nbsp;\n\t\t\t\t\t\t\t\t\t\t\tSave this form\n\t\t\t\t\t\t\t\t\t\t</h3>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\t\t\t\t\t\t\t\t\t\t<div uib-collapse=\"vm.ihm.preview.saveThisFormExpanded\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfor=\"inputNameFormtext\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\" greyText control-label\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tName to this form :\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype=\"text\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"form-control\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tid=\"inputNameFormtext\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder=\"Enter formName\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tng-model=\"vm.configuration.formName\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t<button\n\t\t\t\t\t\t\t\t\t\t\t\tclass=\"btn btn-primary btn-block btn-lg\"\n\t\t\t\t\t\t\t\t\t\t\t\tng-click=\"vm.saveThisForm()\">\n\t\t\t\t\t\t\t\t\t\t\t\tsave this form\n\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</uib-tab>\n\t\t\t\t\t\t</uib-tabset>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</section>\n\t\t\t<hr/>\n\t\t\t<section>\n        <h6 class=\"text-right\">\n          Easy form generator : {{vm.easyFormGeneratorVERSION}} — Erwan DATIN (MacKentoch)\n        </h6>\n\t\t\t</section>\n    </div>\n  </div>\n</section>\n";
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("4a", [], true, function($__require, exports, module) {
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

$__System.registerDynamic("4b", ["4a"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('4a');
  module.exports = function defineProperty(it, key, desc) {
    return $.setDesc(it, key, desc);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("4c", ["4b"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('4b'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("9", ["4c"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _Object$defineProperty = $__require('4c')["default"];
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

$__System.registerDynamic("a", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  exports["default"] = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

$__System.register('4d', [], function (_export) {
	/* global angular */
	'use strict';

	var DEBUG_MODEL, initDebugModel, DEFAULT_TAB_MODEL, initTabModel, COLUMN_TEMPLATE, initColumnTemplate, LINE_TEMPLATE, initLineTemplate, DEFAULT_IHM_MODEL, initIhmModel;
	return {
		setters: [],
		execute: function () {
			DEBUG_MODEL = {
				showDebug: false,
				configurationModelNumberofLines: 1
			};

			initDebugModel = function initDebugModel() {
				return angular.copy(DEBUG_MODEL);
			};

			DEFAULT_TAB_MODEL = {
				editTab: {
					active: true
				},
				previewTab: {
					active: false,
					tabVisible: true,
					modelsVisible: true
				}
			};

			initTabModel = function initTabModel(isPreviewPanelVisible, arePreviewModelsVisible) {
				var _tabModel = angular.copy(DEFAULT_TAB_MODEL);
				angular.extend(_tabModel.previewTab, {
					tabVisible: isPreviewPanelVisible,
					modelsVisible: arePreviewModelsVisible
				});
				return _tabModel;
			};

			COLUMN_TEMPLATE = {
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

			initColumnTemplate = function initColumnTemplate() {
				return angular.copy(COLUMN_TEMPLATE);
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
						// templateOptions: {
						//                     label: 'none',
						//                     placeholder: 'none',
						//                     required: false,
						//                     description: 'Descriptive text'
						//                   }
					}
				}]
			};

			initLineTemplate = function initLineTemplate() {
				return angular.copy(LINE_TEMPLATE);
			};

			DEFAULT_IHM_MODEL = {
				preview: {
					formlyModelViewExpanded: true,
					formlyFieldsViewExpanded: true,
					customizeFormButtonsExpanded: true,
					saveThisFormExpanded: true
				}
			};

			initIhmModel = function initIhmModel() {
				return angular.copy(DEFAULT_IHM_MODEL);
			};

			_export('initDebugModel', initDebugModel);

			_export('initTabModel', initTabModel);

			_export('initColumnTemplate', initColumnTemplate);

			_export('initLineTemplate', initLineTemplate);

			_export('initIhmModel', initIhmModel);
		}
	};
});
$__System.register('4e', ['9', 'a', '4d'], function (_export) {
  var _createClass, _classCallCheck, initTabModel, initIhmModel, DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER, DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLERAS, edaDragDropWayEasyFormGenCtrl;

  return {
    setters: [function (_) {
      _createClass = _['default'];
    }, function (_a) {
      _classCallCheck = _a['default'];
    }, function (_d) {
      initTabModel = _d.initTabModel;
      initIhmModel = _d.initIhmModel;
    }],
    execute: function () {
      /* global angular */

      ///////////////////////////////////////////////////////////////////////
      // TODO :
      // - check no use methods that come from step way and delete if not needed
      // - check other TODO (a lot of fixes are needed)
      ///////////////////////////////////////////////////////////////////////

      'use strict';

      DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER = 'edaDragDropWayEasyFormGenCtrl';
      DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLERAS = 'vm';

      edaDragDropWayEasyFormGenCtrl = (function () {
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
            this.tab = initTabModel(this.easyFormDragWayConfig.isPreviewPanelVisible(), this.easyFormDragWayConfig.arePreviewModelsVisible());
            this.returnSaveEvent = false;
            this.dataModel = {}; //was vm.model in ES5 version
            this.wfFormFields = [];
            this.wfFormFieldsOnlyNeededProperties = [];
            this.ihm = initIhmModel();
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
      })();

      edaDragDropWayEasyFormGenCtrl.$inject = ['$scope', 'easyFormGenVersion', '$filter', '$anchorScroll', 'toaster', '$timeout', '$log', 'formFieldManage', 'controllerModalProxy', 'dragDropItemDecorationService', 'ddModelConfModelProxyService', 'ddItemRightClickedManager', 'easyFormDragWayConfig'];

      _export('default', edaDragDropWayEasyFormGenCtrl);

      _export('DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER', DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER);

      _export('DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLERAS', DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLERAS);
    }
  };
});
$__System.register('4f', ['49', '4e'], function (_export) {
	/* global angular */

	//TODO : to bindToController
	//-> then angular 1.4+ will be required...
	//-> check methot to refactor inside rag drop way then common step way and drag drop way

	'use strict';

	var edaDragDropWayEasyFormGenDirectiveTemplate, DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER, DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLERAS, EDA_DRAGDROP_WAY_EASY_FORM_GEN_DIRECTIVE;

	function edaDragdropWayEasyFormGen($timeout, formFieldManage, ddModelConfModelProxyService,
	// dragDropConfig,
	easyFormDragWayConfig) {

		var directive = {
			restrict: 'E',
			template: edaDragDropWayEasyFormGenDirectiveTemplate,
			scope: {
				edaEasyFormGeneratorModel: '=',
				edaSaveFormEvent: '&edaSaveFormEvent'
			},
			controller: DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER,
			controllerAs: DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLERAS,
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

	return {
		setters: [function (_) {
			edaDragDropWayEasyFormGenDirectiveTemplate = _['default'];
		}, function (_e) {
			DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER = _e.DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER;
			DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLERAS = _e.DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLERAS;
		}],
		execute: function () {
			EDA_DRAGDROP_WAY_EASY_FORM_GEN_DIRECTIVE = 'edaDragdropWayEasyFormGen';
			edaDragdropWayEasyFormGen.$inject = ['$timeout', 'formFieldManage', 'ddModelConfModelProxyService',
			// 'dragDropConfig',
			'easyFormDragWayConfig'];

			_export('default', edaDragdropWayEasyFormGen);

			_export('EDA_DRAGDROP_WAY_EASY_FORM_GEN_DIRECTIVE', EDA_DRAGDROP_WAY_EASY_FORM_GEN_DIRECTIVE);
		}
	};
});
$__System.register('50', ['48', '4e', '4f'], function (_export) {
	/* global angular */

	'use strict';

	var easyFormDragWayConfig, EASY_FORM_DRAG_DROP_WAY_CONFIG_NAME, edaDragDropWayEasyFormGenCtrl, DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER, edaDragdropWayEasyFormGen, EDA_DRAGDROP_WAY_EASY_FORM_GEN_DIRECTIVE, DRAGDROP_MODULE;
	return {
		setters: [function (_) {
			easyFormDragWayConfig = _['default'];
			EASY_FORM_DRAG_DROP_WAY_CONFIG_NAME = _.EASY_FORM_DRAG_DROP_WAY_CONFIG_NAME;
		}, function (_e) {
			edaDragDropWayEasyFormGenCtrl = _e['default'];
			DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER = _e.DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER;
		}, function (_f) {
			edaDragdropWayEasyFormGen = _f['default'];
			EDA_DRAGDROP_WAY_EASY_FORM_GEN_DIRECTIVE = _f.EDA_DRAGDROP_WAY_EASY_FORM_GEN_DIRECTIVE;
		}],
		execute: function () {
			DRAGDROP_MODULE = 'edaDragDropWay.main.module';

			_export('default', angular.module(DRAGDROP_MODULE, []).provider(EASY_FORM_DRAG_DROP_WAY_CONFIG_NAME, easyFormDragWayConfig).controller(DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER, edaDragDropWayEasyFormGenCtrl).directive(EDA_DRAGDROP_WAY_EASY_FORM_GEN_DIRECTIVE, edaDragdropWayEasyFormGen));
		}
	};
});
$__System.register('51', [], function (_export) {
  'use strict';

  var TRUST_THIS_FILTER_NAME;

  function trustThis($sce) {
    return function (value, type) {
      return $sce.trustAs(type || 'html', value);
    };
  }

  return {
    setters: [],
    execute: function () {
      TRUST_THIS_FILTER_NAME = 'trustThis';
      trustThis.$inject = ['$sce'];

      _export('default', trustThis);

      _export('TRUST_THIS_FILTER_NAME', TRUST_THIS_FILTER_NAME);
    }
  };
});
$__System.register('52', ['51'], function (_export) {
  'use strict';

  var trustThis, TRUST_THIS_FILTER_NAME, TRUST_THIS_FILTER_MODULE;
  return {
    setters: [function (_) {
      trustThis = _['default'];
      TRUST_THIS_FILTER_NAME = _.TRUST_THIS_FILTER_NAME;
    }],
    execute: function () {
      TRUST_THIS_FILTER_MODULE = 'edaDragDropWay.trustThis.filter';

      _export('default', angular.module(TRUST_THIS_FILTER_MODULE, []).filter(TRUST_THIS_FILTER_NAME, trustThis));
    }
  };
});
$__System.register('1', ['2', '3', '5', '6', '41', '44', '46', '50', '52', '2a', '2e', '3c', '3f'], function (_export) {
  'use strict';

  var formlyConfigFunct, dragDropConfigFunt, EASY_FORM_DD_VERSION_NAME, EASY_FORM_DD_VERSION_VALUE, coreModule, configProxyModule, dragAndDropListModule, pageSlideModule, easyFormDragDropModule, trustThisFilterModule, leftPanelModule, formlyProxyModule, dragdropModule, rightClickModule, DRAG_DROP_WAY_MODULE_NAME, DRAG_DROP_MODULES_INJECT, mainModule;
  return {
    setters: [function (_) {}, function (_2) {
      formlyConfigFunct = _2['default'];
    }, function (_3) {
      dragDropConfigFunt = _3['default'];
      EASY_FORM_DD_VERSION_NAME = _3.EASY_FORM_DD_VERSION_NAME;
      EASY_FORM_DD_VERSION_VALUE = _3.EASY_FORM_DD_VERSION_VALUE;
    }, function (_4) {
      coreModule = _4['default'];
    }, function (_5) {
      configProxyModule = _5['default'];
    }, function (_6) {
      dragAndDropListModule = _6['default'];
    }, function (_7) {
      pageSlideModule = _7['default'];
    }, function (_8) {
      easyFormDragDropModule = _8['default'];
    }, function (_9) {
      trustThisFilterModule = _9['default'];
    }, function (_a) {
      leftPanelModule = _a['default'];
    }, function (_e) {
      formlyProxyModule = _e['default'];
    }, function (_c) {
      dragdropModule = _c['default'];
    }, function (_f) {
      rightClickModule = _f['default'];
    }],
    execute: function () {
      DRAG_DROP_WAY_MODULE_NAME = 'eda.easyformGen.dragDropWay';
      DRAG_DROP_MODULES_INJECT = [coreModule.name, configProxyModule.name, trustThisFilterModule.name, leftPanelModule.name, formlyProxyModule.name, dragdropModule.name, easyFormDragDropModule.name, rightClickModule.name, dragAndDropListModule.name, pageSlideModule.name];
      mainModule = angular.module(DRAG_DROP_WAY_MODULE_NAME, DRAG_DROP_MODULES_INJECT).config(dragDropConfigFunt).config(formlyConfigFunct).value(EASY_FORM_DD_VERSION_NAME, EASY_FORM_DD_VERSION_VALUE);

      _export('default', mainModule);
    }
  };
});
})
(function(factory) {
  factory();
});
//# sourceMappingURL=eda.dragdropway.js.map