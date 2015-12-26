/** 
  *easyFormGenerator — step way — version 
  *Version 1.0.33 
  *Author : Erwan Datin (MacKentoch) 
  *Link: https://github.com/MacKentoch/easyFormGenerator 
  *License : MIT (2015) 
 **/ 
 ;(function(){
 	'use strict';
/**
 *  -----------------------------------------------------------------------
 *  application module of the step way version of easy form generator
 *  -----------------------------------------------------------------------
 *  
 *   
 *     - this version is production friendly -
 *
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
;(function(){
  'use strict';

  //alias module to distinguish the drag and drop way
  angular
    .module('eda.easyformGen.stepway', ['ngwfApp']);

  angular
    .module('ngwfApp', [  
      'ngwfApp.core',
      'eda.easyFormGenerator.translate',
      'eda.easyFormSteWayConfigProvider',
      'ngwfApp.controllers',
      'ngwfApp.services', 
      'ngwfApp.filters',
      'ngwfApp.directives'
    ])
    .value('easyFormGenVersion', 'v1.0.33')
    .config(formlyConfigFct)
    .config(easyFromConfigFct);


    easyFromConfigFct.$inject = ['easyFormSteWayConfigProvider'];
    function easyFromConfigFct(easyFormSteWayConfigProvider){
      //enable/disable easy form modal animation 
      //HERE : disabling animation due to angular bootstrap backdrop bug with angular >= 1.4
      easyFormSteWayConfigProvider.setModalAnimation(false);
      
      //disable control example :
      //easyFormSteWayConfigProvider.disableControl('TextInput');
      
      //enable control example :
      //easyFormSteWayConfigProvider.enableControl('TextInput');

      //example get current language
      //console.info('lang = ' + easyFormSteWayConfigProvider.getCurrentLanguage());
      //example set currrent language
      //easyFormSteWayConfigProvider.setLanguage('fr');
      
    }



    formlyConfigFct.$inject = ['formlyConfigProvider'];
    function formlyConfigFct(formlyConfigProvider){
      //////////////////////////////
      // CONFIG HERE (formly...)              
      /////////////////////////////
      formlyConfigProvider.setType(
        {
          name: 'richEditor',
          //wrapper: ['bootstrapLabel', 'bootstrapHasError'],
          template: '<text-angular name="{{id}}" class="richTextAngular" ng-model="model[options.key || index]"></text-angular>'
        }
      );

      formlyConfigProvider.setType(
        {
          name: 'blank',
          template: '<div></div>'
        }
      );


      var subTitleTemplate = '<div class="row"><div class=""><h4 class="text-center">{{options.templateOptions.placeholder}}<h4><hr/></div></div>';
      formlyConfigProvider.setType(
        {
          name: 'subTitle',
          template: subTitleTemplate
        }
      );

      var basicSelectTemplate =   ' <ol   class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12" ' + 
                    '   ng-model="model[options.key || index]"  ' + 
                      '   id="{{id}}"  ' + 
                      '   disabled="options.templateOptions.options.length === 0"> ' + 
                      '   <li class="nya-bs-option" nya-bs-option="option in options.templateOptions.options"> ' + 
                      '     <a>{{option.name}}</a> ' + 
                      '   </li> ' + 
                      ' </ol>     ' ;

     formlyConfigProvider.setType(
        {
          name: 'basicSelect',
          template: basicSelectTemplate
        }
      );


     var groupedSelectTemplate =   '  <ol class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12" ' +
                   '    ng-model="model[options.key || index]" ' +
                   '       data-live-search="true" ' +
                   '       disabled="options.templateOptions.options.length === 0">' +
                                 '       <li nya-bs-option="option in  options.templateOptions.options group by option.group"  ' +
                                 '       >' +
                                 '         <span class="dropdown-header">{{$group}}</span>' + 
                                 '         <a>' +
                                 '           <span>{{option.name}}</span>' +
                                 '           <span class="glyphicon glyphicon-ok check-mark"></span>' +
                                 '         </a>' +
                                 '       </li>' +
                                 '     </ol>';

     formlyConfigProvider.setType(
        {
          name: 'groupedSelect',
          template: groupedSelectTemplate
        }
      );

     ////////////////////////////
     // angular UI date picker
     ////////////////////////////
     // thx Kent C. Dodds

      var attributes = [
        'date-disabled',
        'custom-class',
        'show-weeks',
        'starting-day',
        'init-date',
        'min-mode',
        'max-mode',
        'format-day',
        'format-month',
        'format-year',
        'format-day-header',
        'format-day-title',
        'format-month-title',
        'year-range',
        'shortcut-propagation',
        'datepicker-popup',
        'show-button-bar',
        'current-text',
        'clear-text',
        'close-text',
        'close-on-date-selection',
        'datepicker-append-to-body'
      ];

      var bindings = [
        'datepicker-mode',
        'min-date',
        'max-date'
      ];

      var ngModelAttrs = {};

      angular.forEach(attributes, function(attr) {
        ngModelAttrs[camelize(attr)] = {attribute: attr};
      });

      angular.forEach(bindings, function(binding) {
        ngModelAttrs[camelize(binding)] = {bound: binding};
      });

    

      formlyConfigProvider.setType({
        name: 'datepicker',
        template: '<input  id="{{id}}" class="form-control" ng-click="open($event)" ng-model="model[options.key  || index]" is-open="to.isOpen" ng-click="to.isOpen = true" datepicker-options="to.datepickerOptions" />',
        wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        controller: ['$scope', function($scope) {
           $scope.open = function($event) {
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
              onClick: function(options, scope) {
                options.templateOptions.isOpen = !options.templateOptions.isOpen;
              }
            },       
            onFocus: function($viewValue, $modelValue, scope) {
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
      formlyConfigProvider.setWrapper([
          {
            template: [
              '<div class="formly-template-wrapper form-group"',
              '     ng-class="{\'has-error\': options.validation.errorExistsAndShouldBeVisible}">',
              ' <formly-transclude></formly-transclude>',
              ' <div class="validation"',
              '       ng-if="options.validation.errorExistsAndShouldBeVisible"',
              '       ng-messages="options.formControl.$error">',
              '   <div ng-messages-include="validation.html"></div>',
              '   <div ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages">',
              '     {{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}',
              '   </div>',
              ' </div>',
              '</div>'
            ].join(' ')
          }
        ]);

      function camelize(string) {
        string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
          return chr ? chr.toUpperCase() : '';
        });
        // Ensure 1st char is always lowercase
        return string.replace(/^([A-Z])/, function(match, chr) {
          return chr ? chr.toLowerCase() : '';
        });
      } 

    }


})();

angular.module("ngwfApp").run(["$templateCache", function($templateCache) {$templateCache.put("edaStepWayEasyFormGeneratorTemplate.html","<section id=pageWfEdit><div ng-init=\"\"><div class=container><section id=preview><div id=preview-content><div class=content-container><toaster-container toaster-options=\"{ \'position-class\': \'toast-top-full-width\', \'extendedTimeout\':500, \'timeOut\':500, }\"></toaster-container><tabset justified=true><tab active=tab.editTab.active heading=\"{{\'EDIT_TAB\' | translate}}\"><div class=row><div class=\"row stepwizardTopmargin\"><div class=\"col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2\"><div class=stepwizard><div class=\"row stepwizard-row\"><div class=\"stepwizard-step col-md-3\"><button type=button class=\"btn btn-circle\" ng-class=\"{\'btn-primary\': configuration.stepIndicators[0], \'btn-default\': !configuration.stepIndicators[0]}\">0</button><p>{{\'WIZARD_LINES\' | translate}}</p></div><div class=\"stepwizard-step col-md-3\"><button type=button class=\"btn btn-circle\" ng-class=\"{\'btn-primary\': configuration.stepIndicators[1], \'btn-default\': !configuration.stepIndicators[1], \'disabled\': (configuration.configStepCounter < 1)}\">1</button><p>{{\'WIZARD_LAYOUT\' | translate}}</p></div><div class=\"stepwizard-step col-md-3\"><button type=button class=\"btn btn-default btn-circle\" ng-class=\"{\'btn-primary\': configuration.stepIndicators[2], \'btn-default\': !configuration.stepIndicators[2], \'disabled\': (configuration.configStepCounter < 2)}\">2</button><p>{{\'WIZARD_CONTROLS\' | translate}}</p></div><div class=\"stepwizard-step col-md-3\"><button type=button class=\"btn btn-default btn-circle\" ng-class=\"{\'btn-primary\': configuration.stepIndicators[3], \'btn-default\': !configuration.stepIndicators[3], \'disabled\': (configuration.configStepCounter < 3)}\">3</button><p>{{\'WIZARD_SAVE\' | translate}}</p></div></div></div></div></div></div><div class=row><ul class=pager><li ng-class=\"{\'disabled\':stepIndicators[0]}\"><button class=\"btn btn-primary customPagerButton\" ng-click=previousConfigStep()><i class=\"fa fa-arrow-left fa-2x pull-left\"></i> <span class=pull-right>{{\'PAGER_PREVIOUS\' | translate}}</span></button></li><li ng-class=\"{\'disabled\':stepIndicators[3]}\"><button class=\"btn btn-primary customPagerButton\" ng-click=nextConfigStep()><span class=pull-left>{{\'PAGER_NEXT\' | translate}}</span> <i class=\"fa fa-arrow-right fa-2x pull-right\"></i></button></li></ul><div class=animate-switch-container ng-switch=\"\" on=configuration.listConfigStep[configuration.configStepCounter]><div class=animate-switch ng-switch-when=init><div class=col-md-4><div id=commandPanel><div class=\"panel panel-default\"><div class=panel-heading><h3 class=panel-title><i class=\"fa fa-keyboard-o\"></i>&nbsp;{{\'COMMAND_PANEL\' | translate}}</h3></div><div class=panel-body><div class=row><div class=col-md-12><span class=addNewLine>{{\'ADD_NEW_LINE\' | translate}} :</span>&nbsp; <button class=\"btn btn-primary\" ng-click=addNewline()><i class=\"fa fa-plus fa-1x\"></i></button></div></div></div></div></div></div><div class=col-md-8><div id=visualPanel><div class=\"panel panel-default\"><div class=panel-heading><h3 class=panel-title><i class=\"fa fa-eye\"></i>&nbsp;{{\'VISUAL_PANEL\' | translate}}</h3></div><div class=panel-body><ul class=list-group><li class=list-group-item ng-repeat=\"line in configuration.lines track by $index\"><div ng-switch=\"\" on=line.columns.length><div class=\"row linesList\" ng-switch-when=1><div class=\"col-md-12 lineCommandButtons\" ng-show=\"configuration.lines.length > 1\"><button class=\"btn btn-warning\" ng-hide=\"$index==0\" ng-click=upThisLine($index)><i class=\"fa fa-arrow-up\"></i></button> <button class=\"btn btn-warning\" ng-hide=\"$index==(configuration.lines.length-1)\" ng-click=downThisLine($index)><i class=\"fa fa-arrow-down\"></i></button> <button class=\"btn btn-danger pull-right\" ng-click=removeThisLine($index)><i class=\"fa fa-trash-o\"></i></button></div><div class=col-md-12><div class=\"col-md-12 well\"><button class=\"btn btn-lg btn-block btn-default disabled\">{{line.columns[0].control.type !== \'none\' ? line.columns[0].control.type + \' \' + line.columns[0].control.subtype || \'\' : \'column 1\'}}</button></div></div></div><div class=\"row linesList\" ng-switch-when=2><div class=\"col-md-12 lineCommandButtons\" ng-show=\"configuration.lines.length > 1\"><button class=\"btn btn-warning\" ng-hide=\"$index==0\" ng-click=upThisLine($index)><i class=\"fa fa-arrow-up\"></i></button> <button class=\"btn btn-warning\" ng-hide=\"$index==(configuration.lines.length-1)\" ng-click=downThisLine($index)><i class=\"fa fa-arrow-down\"></i></button> <button class=\"btn btn-danger pull-right\" ng-click=removeThisLine($index)><i class=\"fa fa-trash-o\"></i></button></div><div class=col-md-12><div class=\"col-md-6 well\"><button class=\"btn btn-lg btn-block btn-default disabled\">{{line.columns[0].control.type !== \'none\' ? line.columns[0].control.type + \' \' + line.columns[0].control.subtype || \'\' : \'column 1\'}}</button></div><div class=\"col-md-6 well\"><button class=\"btn btn-lg btn-block btn-default disabled\">{{line.columns[1].control.type !== \'none\' ? line.columns[1].control.type + \' \' + line.columns[1].control.subtype || \'\' : \'column 2\'}}</button></div></div></div><div class=\"row linesList\" ng-switch-when=3><div class=\"col-md-12 lineCommandButtons\" ng-show=\"configuration.lines.length > 1\"><button class=\"btn btn-warning\" ng-hide=\"$index==0\" ng-click=upThisLine($index)><i class=\"fa fa-arrow-up\"></i></button> <button class=\"btn btn-warning\" ng-hide=\"$index==(configuration.lines.length-1)\" ng-click=downThisLine($index)><i class=\"fa fa-arrow-down\"></i></button> <button class=\"btn btn-danger pull-right\" ng-click=removeThisLine($index)><i class=\"fa fa-trash-o\"></i></button></div><div class=col-md-12><div class=\"col-md-4 well\"><button class=\"btn btn-lg btn-block btn-default disabled\">{{line.columns[0].control.type !== \'none\' ? line.columns[0].control.type + \' \' + line.columns[0].control.subtype || \'\' : \'column 1\'}}</button></div><div class=\"col-md-4 well\"><button class=\"btn btn-lg btn-block btn-default disabled\">{{line.columns[1].control.type !== \'none\' ? line.columns[1].control.type + \' \' + line.columns[1].control.subtype || \'\' : \'column 2\'}}</button></div><div class=\"col-md-4 well\"><button class=\"btn btn-lg btn-block btn-default disabled\">{{line.columns[2].control.type !== \'none\' ? line.columns[2].control.type + \' \' + line.columns[2].control.subtype || \'\' : \'column 3\'}}</button></div></div></div></div></li></ul></div></div></div></div></div><div class=animate-switch ng-switch-when=first><div class=col-md-4><div id=commandPanel><div class=\"panel panel-default\"><div class=panel-heading><h3 class=panel-title><i class=\"fa fa-keyboard-o\"></i>&nbsp;{{\'COMMAND_PANEL\' | translate}}</h3></div><div class=panel-body><div class=row><div class=col-md-12><h4 class=\"numberOfcolumsText text-center\"><i>- {{\'SELECTED_LINE\' | translate}} -</i></h4><h4 class=\"numberOfcolumsText text-center\">{{\'NUMBER_OF_COLUMN\' | translate}} :</h4></div></div><div class=row><div class=\"col-xs-2 col-xs-offset-3 col-sm-2 col-sm-offset-3 col-md-2 col-md-offset-3\"><button class=\"btn btn-primary pull-right btnMinusColumns\" ng-click=decreaseNumberOfColumns()><i class=\"fa fa-minus fa-1x\"></i></button></div><div class=\"col-xs-2 col-sm-2 col-md-2 text-center\"><span class=numberOfColumnsLabel>{{configuration.lines[configuration.activeLine -1].columns.length}}</span></div><div class=\"col-xs-2 col-sm-2 col-md-2\"><button class=\"btn btn-primary pull-left btnAddColumns\" ng-click=increaseNumberOfColumns()><i class=\"fa fa-plus fa-1x\"></i></button></div></div></div></div></div></div><div class=col-md-8><div id=visualPanel><div class=\"panel panel-default\"><div class=panel-heading><h3 class=panel-title><i class=\"fa fa-eye\"></i>&nbsp;{{\'VISUAL_PANEL\' | translate}}</h3></div><div class=panel-body><ul class=list-group><li class=list-group-item ng-repeat=\"line in configuration.lines track by $index\"><div ng-switch=\"\" on=line.columns.length><div class=\"row linesList\" ng-switch-when=1><div class=\"col-md-12 lineCommandButtons\" ng-show=\"configuration.lines.length > 1\"><button class=btn ng-class=\"{\'btn-warning\':($index + 1) !== configuration.activeLine, \'btn-success\': ($index + 1) === configuration.activeLine}\" ng-click=\"setActiveLineNumber($index + 1)\"><i class=fa ng-class=\"{\'fa-square-o\': ($index + 1) !== configuration.activeLine, \'fa-check-square-o\': ($index + 1) === configuration.activeLine}\"></i></button></div><div class=col-md-12><div class=\"col-md-12 well\"><button class=\"btn btn-lg btn-block btn-default disabled\">{{line.columns[0].control.type !== \'none\' ? line.columns[0].control.type + \' \' + line.columns[0].control.subtype || \'\' : \'column 1\'}}</button></div></div></div><div class=\"row linesList\" ng-switch-when=2><div class=\"col-md-12 lineCommandButtons\" ng-show=\"configuration.lines.length > 1\"><button class=btn ng-class=\"{\'btn-warning\':($index + 1) !== configuration.activeLine, \'btn-success\': ($index + 1) === configuration.activeLine}\" ng-click=\"setActiveLineNumber($index + 1)\"><i class=fa ng-class=\"{\'fa-square-o\': ($index + 1) !== configuration.activeLine, \'fa-check-square-o\': ($index + 1) === configuration.activeLine}\"></i></button></div><div class=col-md-12><div class=\"col-md-6 well\"><button class=\"btn btn-lg btn-block btn-default disabled\">{{line.columns[0].control.type !== \'none\' ? line.columns[0].control.type + \' \' + line.columns[0].control.subtype || \'\' : \'column 1\'}}</button></div><div class=\"col-md-6 well\"><button class=\"btn btn-lg btn-block btn-default disabled\">{{line.columns[1].control.type !== \'none\' ? line.columns[1].control.type + \' \' + line.columns[1].control.subtype || \'\' : \'column 2\'}}</button></div></div></div><div class=\"row linesList\" ng-switch-when=3><div class=\"col-md-12 lineCommandButtons\" ng-show=\"configuration.lines.length > 1\"><button class=btn ng-class=\"{\'btn-warning\':($index + 1) !== configuration.activeLine, \'btn-success\': ($index + 1) === configuration.activeLine}\" ng-click=\"setActiveLineNumber($index + 1)\"><i class=fa ng-class=\"{\'fa-square-o\': ($index + 1) !== configuration.activeLine, \'fa-check-square-o\': ($index + 1) === configuration.activeLine}\"></i></button></div><div class=col-md-12><div class=\"col-md-4 well\"><button class=\"btn btn-lg btn-block btn-default disabled\">{{line.columns[0].control.type !== \'none\' ? line.columns[0].control.type + \' \' + line.columns[0].control.subtype || \'\' : \'column 1\'}}</button></div><div class=\"col-md-4 well\"><button class=\"btn btn-lg btn-block btn-default disabled\">{{line.columns[1].control.type !== \'none\' ? line.columns[1].control.type + \' \' + line.columns[1].control.subtype || \'\' : \'column 2\'}}</button></div><div class=\"col-md-4 well\"><button class=\"btn btn-lg btn-block btn-default disabled\">{{line.columns[2].control.type !== \'none\' ? line.columns[2].control.type + \' \' + line.columns[2].control.subtype || \'\' : \'column 3\'}}</button></div></div></div></div></li></ul></div></div></div></div></div><div class=animate-switch ng-switch-when=second><div class=col-md-4><div id=commandPanel><div class=\"panel panel-default\"><div class=panel-heading><h3 class=panel-title><i class=\"fa fa-keyboard-o\"></i>&nbsp;{{\'COMMAND_PANEL\' | translate}}</h3></div><div class=panel-body><div class=row><div class=col-md-12><h4 class=\"numberOfcolumsText text-center\">- {{\'APPLY_CTRL2COL\' | translate}} -</h4></div></div><div class=row><div class=col-lg-12><hr><blockquote><p class=numberOfcolumsText><i class=\"fa fa-minus\"></i>&nbsp; {{\'CLIC_TAP_2_OPEN\' | translate}}.</p><p class=numberOfcolumsText><i class=\"fa fa-minus\"></i>&nbsp; {{\'SELECT_2_APPLY_COL\' | translate}}.</p></blockquote></div></div></div></div></div></div><div class=col-md-8><div id=visualPanel><div class=\"panel panel-default\"><div class=panel-heading><h3 class=panel-title><i class=\"fa fa-eye\"></i>&nbsp;{{\'VISUAL_PANEL\' | translate}}</h3></div><div class=panel-body><ul class=list-group><li class=list-group-item ng-repeat=\"line in configuration.lines track by $index\"><div ng-switch=\"\" on=line.columns.length><div class=\"row linesList\" ng-switch-when=1><div class=\"col-md-12 lineCommandButtons\" ng-show=\"configuration.lines.length > 1\"><button class=btn ng-class=\"{\'btn-warning\':($index + 1) !== configuration.activeLine, \'btn-success\': ($index + 1) === configuration.activeLine}\" ng-click=\"setActiveLineNumber($index + 1)\"><i class=fa ng-class=\"{\'fa-square-o\': ($index + 1) !== configuration.activeLine, \'fa-check-square-o\': ($index + 1) === configuration.activeLine}\"></i></button></div><div class=col-md-12><div class=\"col-md-12 well\"><button class=\"btn btn-lg btn-block\" ng-class=\"{\'btn-primary\': !line.columns[0].control.edited, \'btn-success\': line.columns[0].control.edited}\" ng-click=\"showModalAddCtrlToColumn(\'\', $index, 0)\">{{line.columns[0].control.type !== \'none\' ? line.columns[0].control.type + \' \' + line.columns[0].control.subtype || \'\' : \'column 1\'}}</button></div></div></div><div class=\"row linesList\" ng-switch-when=2><div class=\"col-md-12 lineCommandButtons\" ng-show=\"configuration.lines.length > 1\"><button class=btn ng-class=\"{\'btn-warning\':($index + 1) !== configuration.activeLine, \'btn-success\': ($index + 1) === configuration.activeLine}\" ng-click=\"setActiveLineNumber($index + 1)\"><i class=fa ng-class=\"{\'fa-square-o\': ($index + 1) !== configuration.activeLine, \'fa-check-square-o\': ($index + 1) === configuration.activeLine}\"></i></button></div><div class=col-md-12><div class=\"col-md-6 well\"><button class=\"btn btn-lg btn-block\" ng-class=\"{\'btn-primary\': !line.columns[0].control.edited, \'btn-success\': line.columns[0].control.edited}\" ng-click=\"showModalAddCtrlToColumn(\'\', $index, 0)\">{{line.columns[0].control.type !== \'none\' ? line.columns[0].control.type + \' \' + line.columns[0].control.subtype || \'\' : \'column 1\'}}</button></div><div class=\"col-md-6 well\"><button class=\"btn btn-lg btn-block\" ng-class=\"{\'btn-primary\': !line.columns[1].control.edited, \'btn-success\': line.columns[1].control.edited}\" ng-click=\"showModalAddCtrlToColumn(\'\', $index, 1)\">{{line.columns[1].control.type !== \'none\' ? line.columns[1].control.type + \' \' + line.columns[1].control.subtype || \'\' : \'column 2\'}}</button></div></div></div><div class=\"row linesList\" ng-switch-when=3><div class=\"col-md-12 lineCommandButtons\" ng-show=\"configuration.lines.length > 1\"><button class=btn ng-class=\"{\'btn-warning\':($index + 1) !== configuration.activeLine, \'btn-success\': ($index + 1) === configuration.activeLine}\" ng-click=\"setActiveLineNumber($index + 1)\"><i class=fa ng-class=\"{\'fa-square-o\': ($index + 1) !== configuration.activeLine, \'fa-check-square-o\': ($index + 1) === configuration.activeLine}\"></i></button></div><div class=col-md-12><div class=\"col-md-4 well\"><button class=\"btn btn-lg btn-block\" ng-class=\"{\'btn-primary\': !line.columns[0].control.edited, \'btn-success\': line.columns[0].control.edited}\" ng-click=\"showModalAddCtrlToColumn(\'\', $index, 0)\">{{line.columns[0].control.type !== \'none\' ? line.columns[0].control.type + \' \' + line.columns[0].control.subtype || \'\' : \'column 1\'}}</button></div><div class=\"col-md-4 well\"><button class=\"btn btn-lg btn-block\" ng-class=\"{\'btn-primary\': !line.columns[1].control.edited, \'btn-success\': line.columns[1].control.edited}\" ng-click=\"showModalAddCtrlToColumn(\'\', $index, 1)\">{{line.columns[1].control.type !== \'none\' ? line.columns[1].control.type + \' \' + line.columns[1].control.subtype || \'\' : \'column 2\'}}</button></div><div class=\"col-md-4 well\"><button class=\"btn btn-lg btn-block\" ng-class=\"{\'btn-primary\': !line.columns[2].control.edited, \'btn-success\': line.columns[2].control.edited}\" ng-click=\"showModalAddCtrlToColumn(\'\', $index, 2)\">{{line.columns[2].control.type !== \'none\' ? line.columns[2].control.type + \' \' + line.columns[2].control.subtype || \'\' : \'column 3\'}}</button></div></div></div></div></li></ul></div></div></div></div></div><div class=animate-switch ng-switch-when=third><div class=col-md-4><div id=commandPanel><div class=\"panel panel-default\"><div class=panel-heading><h3 class=panel-title><i class=\"fa fa-keyboard-o\"></i>&nbsp;{{\'COMMAND_PANEL\' | translate}}</h3></div><div class=panel-body><div class=row><div class=col-xs-12><div class=form-group><label for=inputSubmitButtontext class=\"greyText control-label\">{{\'CUSTOM_SUBMIT_BTN\' | translate}} :</label><div><input type=text class=form-control id=inputSubmitButtontext ng-model=configuration.submitButtonText></div></div></div></div><hr><div class=row><div class=col-xs-12><div class=form-group><label for=inputCancelButtontext class=\"greyText control-label\">{{\'CUSTOM_CANCEL_BTN\' | translate}} :</label><div><input type=text class=form-control id=inputCancelButtontext ng-model=configuration.cancelButtonText></div></div></div></div><hr><div class=row><div class=col-xs-12><div class=form-group><label for=inputNameFormtext class=\"greyText control-label\">{{\'NAME_THIS_FORM\' | translate}} :</label><div><input type=text class=form-control id=inputNameFormtext ng-model=configuration.formName></div></div></div></div><button class=\"btn btn-primary btn-block btn-lg\" ng-click=saveThisForm()>{{\'SAVE_THIS_FORM\' | translate}}</button></div></div></div></div><div class=col-md-8><div id=visualPanel><div class=\"panel panel-default\"><div class=panel-heading><h3 class=panel-title><i class=\"fa fa-thumbs-o-up\"></i>&nbsp;{{\'FINAL_STEP\' | translate}}</h3></div><div class=panel-body><form ng-submit=vm.onSubmit()><formly-form id=saveFormlyFom model=vm.model fields=vm.wfFormFields><span class=pull-right><button class=\"btn btn-primary\" type=submit>{{configuration.submitButtonText}}</button> <button class=\"btn btn-primary\" type=cancel>{{configuration.cancelButtonText}}</button></span></formly-form></form></div></div></div></div></div></div></div></tab><tab active=tab.previewTab.active ng-if=tab.previewTab.tabVisible heading=\"{{\'PREVIEW_TAB\' | translate}}\"><div class=\"panel panel-default\"><div class=panel-body><form ng-submit=vm.onSubmit()><formly-form id=previewFormlyForm model=vm.model fields=vm.wfFormFields><span class=pull-right><button class=\"btn btn-primary\" type=submit>{{configuration.submitButtonText}}</button> <button class=\"btn btn-primary\" type=cancel>{{configuration.cancelButtonText}}</button></span></formly-form></form></div></div><div ng-if=tab.previewTab.modelsVisible class=\"panel panel-default\"><div class=panel-body><p>{{\'DATA_MODEL\' | translate}}</p><pre>\n										{{vm.model | json}}\n									</pre></div></div><div ng-if=tab.previewTab.modelsVisible class=\"panel panel-default\"><div class=panel-body><p>{{\'FIELDS_MODEL\' | translate}}</p><pre>\n										{{vm.wfFormFieldsOnlyNeededProperties | json}}\n									</pre></div></div></tab></tabset></div></div></section><hr></div></div></section>");
$templateCache.put("editModalTemplate.html","<div class=modal-header><h3 class=\"modal-title greyText\">{{\'SELECT_A_CTRL\' | translate}}</h3></div><div class=modal-body><hr><div class=row><div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\"><h5 class=greyText><i class=\"fa fa-filter\"></i>&nbsp; {{\'SELECT_CTRL_IN_LIST\' | translate}} :</h5></div><div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\"><ol class=\"nya-bs-select col-xs-12 col-sm-12 col-md-12 col-lg-12\" ng-model=modelNyaSelect data-live-search=false><li nya-bs-option=\"option in nyaSelectFiltered.controls group by option.group\"><span class=\"dropdown-header greyText\">{{$group}}</span><a ng-click=selectThisControl(option.id)><span>{{ option.name }}</span> <span class=\"glyphicon glyphicon-ok check-mark\"></span></a></li></ol></div></div><hr><div ng-switch=\"\" on=nyaSelect.selectedControl><div ng-switch-when=none><div class=row><div class=col-sm-12><h5 class=\"text-center texteRouge\"><i class=\"fa fa-arrow-up\"></i>&nbsp; {{\'SELECT_A_CTRL\' | translate}}</h5></div></div></div><div ng-switch-when=empty><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=col-md-12><h5 class=greyText><i class=\"fa fa-eye\"></i>&nbsp; {{\'PREVIEW_TAB\' | translate}} :</h5></div></div><hr><div class=row><div class=col-sm-12><h5 class=\"text-center greyText\">{{\'COL_WILL_BE_BLANK\' | translate}}</h5></div></div></div></div></div><div ng-switch-when=Header><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=col-md-12><h5 class=greyText><i class=\"fa fa-eye\"></i>&nbsp; {{\'PREVIEW_TAB\' | translate}} :</h5></div></div><hr><div class=row><div class=col-md-12><div class=form-group><div><h2 class=text-center>{{nyaSelect.temporyConfig.formlyDesciption}}</h2><hr></div></div></div></div></div></div><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=col-md-12><h5 class=greyText><i class=\"fa fa-pencil-square-o\"></i>&nbsp; {{\'EDIT_PROPERTIES\' | translate}} :</h5></div></div><hr><div class=marginTopFivepixels></div><div class=row><div class=form-group><label for=inputTextDescriptionUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'HEADER_TEXT\' | translate}} :</label><div class=col-lg-9><input type=text class=form-control ng-model=nyaSelect.temporyConfig.formlyDesciption id=inputHeaderTextUpdate placeholder=\"{{\'ADD_EDIT_HEADER_HERE\' | translate}}\"></div></div></div></div></div></div><div ng-switch-when=Subtitle><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=col-md-12><h5 class=greyText><i class=\"fa fa-eye\"></i>&nbsp; {{\'PREVIEW_TAB\' | translate}} :</h5></div></div><hr><div class=row><div class=col-md-12><div class=form-group><div><h4 class=text-center>{{nyaSelect.temporyConfig.formlyPlaceholder}}</h4><hr></div></div></div></div></div></div><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=col-md-12><h5 class=greyText><i class=\"fa fa-pencil-square-o\"></i>&nbsp; {{\'EDIT_PROPERTIES\' | translate}} :</h5></div></div><hr><div class=marginTopFivepixels></div><div class=row><div class=form-group><label for=inputSubTitleTextUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'SUBTITLE_TEXT\' | translate}} :</label><div class=col-lg-9><input type=text class=form-control ng-model=nyaSelect.temporyConfig.formlyPlaceholder id=inputSubTitleTextUpdate placeholder=\"{{\'ADD_EDIT_SUBTIL_HERE\' | translate}}\"></div></div></div></div></div></div><div ng-switch-when=TextInput><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=col-md-12><h5 class=greyText><i class=\"fa fa-eye\"></i>&nbsp; {{\'PREVIEW_TAB\' | translate}} :</h5></div></div><hr><div class=row><div class=col-md-12><div class=form-group><label for=inputText class=\"control-label textControlLabel\">{{nyaSelect.temporyConfig.formlyLabel}}<span ng-if=nyaSelect.temporyConfig.formlyRequired class=textControlLabel>*</span></label><div><input type=text class=form-control id=inputText placeholder={{nyaSelect.temporyConfig.formlyPlaceholder}}><p class=help-block>{{nyaSelect.temporyConfig.formlyDesciption}}</p></div></div></div></div></div></div><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=col-md-12><h5 class=greyText><i class=\"fa fa-pencil-square-o\"></i>&nbsp; {{\'EDIT_PROPERTIES\' | translate}} :</h5></div></div><hr><div class=row><div class=form-group><label for=inputTextLabelUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'LABEL_TEXT\' | translate}} :</label><div class=col-lg-9><input type=text class=form-control ng-model=nyaSelect.temporyConfig.formlyLabel id=inputTextLabelUpdate placeholder=\"{{\'ADD_EDIT_LABEL_HERE\' | translate}}\"></div></div></div><div class=marginTopFivepixels></div><div class=row><div class=form-group><label for=inputTextplaceholderUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'PLACEHOLDER\' | translate}} :</label><div class=col-lg-9><input type=text class=form-control ng-model=nyaSelect.temporyConfig.formlyPlaceholder id=inputTextplaceholderUpdate placeholder=\"{{\'ADD_EDIT_PLACEHOLD\' | translate}}\"></div></div></div><div class=marginTopFivepixels></div><div class=row><div class=form-group><label for=inputTextRequiredUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'REQUIRED\' | translate}} :</label><div class=col-lg-9><div class=checkboxCssCorrection>&nbsp;</div><input type=checkbox ng-model=nyaSelect.temporyConfig.formlyRequired id=inputTextRequiredUpdate></div></div></div><div class=marginTopFivepixels></div><div class=row><div class=form-group><label for=inputTextDescriptionUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'DESCRIPTION\' | translate}} :</label><div class=col-lg-9><input type=text class=form-control ng-model=nyaSelect.temporyConfig.formlyDesciption id=inputTextDescriptionUpdate placeholder=\"{{\'ADDEDIT_DESCRIPTION\' | translate}}\"></div></div></div></div></div></div><div ng-switch-when=Password><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=col-md-12><h5 class=greyText><i class=\"fa fa-eye\"></i>&nbsp; {{\'PREVIEW_TAB\' | translate}} :</h5></div></div><hr><div class=row><div class=col-md-12><div class=form-group><label for=inputPassword class=\"control-label textControlLabel\">{{nyaSelect.temporyConfig.formlyLabel}}<span ng-if=nyaSelect.temporyConfig.formlyRequired class=textControlLabel>*</span></label><div><input type=password class=form-control id=inputPassword placeholder={{nyaSelect.temporyConfig.formlyPlaceholder}}><p class=help-block>{{nyaSelect.temporyConfig.formlyDesciption}}</p></div></div></div></div></div></div><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=col-md-12><h5 class=greyText><i class=\"fa fa-pencil-square-o\"></i>&nbsp; {{\'EDIT_PROPERTIES\' | translate}} :</h5></div></div><hr><div class=row><div class=form-group><label for=inputTextLabelUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'LABEL_TEXT\' | translate}} :</label><div class=col-lg-9><input type=text class=form-control ng-model=nyaSelect.temporyConfig.formlyLabel id=inputTextLabelUpdate placeholder=\"{{\'ADD_EDIT_LABEL_HERE\' | translate}}\"></div></div></div><div class=marginTopFivepixels></div><div class=row><div class=form-group><label for=inputTextplaceholderUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'PLACEHOLDER\' | translate}} :</label><div class=col-lg-9><input type=text class=form-control ng-model=nyaSelect.temporyConfig.formlyPlaceholder id=inputTextplaceholderUpdate placeholder=\"{{\'ADD_EDIT_PLACEHOLD\' | translate}}\"></div></div></div><div class=marginTopFivepixels></div><div class=row><div class=form-group><label for=inputTextRequiredUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'REQUIRED\' | translate}} :</label><div class=col-lg-9><div class=checkboxCssCorrection>&nbsp;</div><input type=checkbox ng-model=nyaSelect.temporyConfig.formlyRequired id=inputTextRequiredUpdate></div></div></div><div class=marginTopFivepixels></div><div class=row><div class=form-group><label for=inputTextDescriptionUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'DESCRIPTION\' | translate}} :</label><div class=col-lg-9><input type=text class=form-control ng-model=nyaSelect.temporyConfig.formlyDesciption id=inputTextDescriptionUpdate placeholder=\"{{\'ADDEDIT_DESCRIPTION\' | translate}}\"></div></div></div></div></div></div><div ng-switch-when=Email><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=col-md-12><h5 class=greyText><i class=\"fa fa-eye\"></i>&nbsp; {{\'PREVIEW_TAB\' | translate}} :</h5></div></div><hr><div class=row><div class=col-md-12><div class=form-group><label for=inputEmail class=\"control-label textControlLabel\">{{nyaSelect.temporyConfig.formlyLabel}}<span ng-if=nyaSelect.temporyConfig.formlyRequired class=textControlLabel>*</span></label><div><input type=text class=form-control id=inputEmail placeholder={{nyaSelect.temporyConfig.formlyPlaceholder}}><p class=help-block>{{nyaSelect.temporyConfig.formlyDesciption}}</p></div></div></div></div></div></div><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=col-md-12><h5 class=greyText><i class=\"fa fa-pencil-square-o\"></i>&nbsp; {{\'EDIT_PROPERTIES\' | translate}} :</h5></div></div><hr><div class=row><div class=form-group><label for=inputTextLabelUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'LABEL_TEXT\' | translate}} :</label><div class=col-lg-9><input type=text class=form-control ng-model=nyaSelect.temporyConfig.formlyLabel id=inputTextLabelUpdate placeholder=\"{{\'ADD_EDIT_LABEL_HERE\' | translate}}\"></div></div></div><div class=marginTopFivepixels></div><div class=row><div class=form-group><label for=inputTextplaceholderUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'PLACEHOLDER\' | translate}} :</label><div class=col-lg-9><input type=text class=form-control ng-model=nyaSelect.temporyConfig.formlyPlaceholder id=inputTextplaceholderUpdate placeholder=\"{{\'ADD_EDIT_PLACEHOLD\' | translate}}\"></div></div></div><div class=marginTopFivepixels></div><div class=row><div class=form-group><label for=inputTextRequiredUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'REQUIRED\' | translate}} :</label><div class=col-lg-9><div class=checkboxCssCorrection>&nbsp;</div><input type=checkbox ng-model=nyaSelect.temporyConfig.formlyRequired id=inputTextRequiredUpdate></div></div></div><div class=marginTopFivepixels></div><div class=row><div class=form-group><label for=inputTextDescriptionUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'DESCRIPTION\' | translate}} :</label><div class=col-lg-9><input type=text class=form-control ng-model=nyaSelect.temporyConfig.formlyDesciption id=inputTextDescriptionUpdate placeholder=\"{{\'ADDEDIT_DESCRIPTION\' | translate}}\"></div></div></div></div></div></div><div ng-switch-when=Date><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=col-md-12><h5 class=greyText><i class=\"fa fa-eye\"></i>&nbsp; {{\'PREVIEW_TAB\' | translate}} :</h5></div></div><hr><div class=row><div class=col-md-12><div class=form-group><label for=inputDate class=\"control-label textControlLabel\">{{nyaSelect.temporyConfig.formlyLabel}}<span ng-if=nyaSelect.temporyConfig.formlyRequired class=textControlLabel>*</span></label><div><div class=input-group><span class=input-group-addon><i class=\"glyphicon glyphicon-calendar\"></i></span> <input type=text class=form-control datepicker-popup={{nyaSelect.temporyConfig.datepickerPopup}} ng-model=demodt.dt is-open=demodt.opened min-date=demodt.minDate max-date=\"\'2099-12-31\'\" datepicker-options=dateOptions date-disabled=\"disabled(date, mode)\" close-text=Close ng-click=open($event)></div><p></p><p class=help-block>{{nyaSelect.temporyConfig.formlyDesciption}}</p></div></div></div></div></div></div><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=col-md-12><h5 class=greyText><i class=\"fa fa-pencil-square-o\"></i>&nbsp; {{\'EDIT_PROPERTIES\' | translate}} :</h5></div></div><hr><div class=row><div class=form-group><label class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'DATE_FORMAT\' | translate}} :</label><div class=col-lg-9><ol class=\"nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12\" ng-model=nyaSelect.temporyConfig.datepickerPopup id=dateformatSelect><li class=nya-bs-option nya-bs-option=\"dateformat in demodt.formats\" value=dateformat><a>{{dateformat}}</a></li></ol></div></div></div><div class=marginTopFivepixels></div><div class=row><div class=form-group><label for=inputTextLabelUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'LABEL_TEXT\' | translate}} :</label><div class=col-lg-9><input type=text class=form-control ng-model=nyaSelect.temporyConfig.formlyLabel id=inputTextLabelUpdate placeholder=\"{{\'ADD_EDIT_LABEL_HERE\' | translate}}\"></div></div></div><div class=marginTopFivepixels></div><div class=row><div class=form-group><label for=inputTextRequiredUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'REQUIRED\' | translate}} :</label><div class=col-lg-9><div class=checkboxCssCorrection>&nbsp;</div><input type=checkbox ng-model=nyaSelect.temporyConfig.formlyRequired id=inputTextRequiredUpdate></div></div></div><div class=marginTopFivepixels></div><div class=row><div class=form-group><label for=inputTextDescriptionUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'DESCRIPTION\' | translate}} :</label><div class=col-lg-9><input type=text class=form-control ng-model=nyaSelect.temporyConfig.formlyDesciption id=inputTextDescriptionUpdate placeholder=\"{{\'ADDEDIT_DESCRIPTION\' | translate}}\"></div></div></div></div></div></div><div ng-switch-when=Texarea><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=col-md-12><h5 class=greyText><i class=\"fa fa-eye\"></i>&nbsp; {{\'PREVIEW_TAB\' | translate}} :</h5></div></div><hr><div class=row><div class=col-md-12><div class=form-group><label for=textArea class=\"control-label textControlLabel\">{{nyaSelect.temporyConfig.formlyLabel}}<span ng-if=nyaSelect.temporyConfig.formlyRequired class=textControlLabel>*</span></label><div><textarea class=form-control ng-model=model[options.key] rows=3 id=textArea></textarea><p class=help-block>{{nyaSelect.temporyConfig.formlyDesciption}}</p></div></div></div></div></div></div><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=col-md-12><h5 class=greyText><i class=\"fa fa-pencil-square-o\"></i>&nbsp; {{\'EDIT_PROPERTIES\' | translate}} :</h5></div></div><hr><div class=row><div class=form-group><label for=inputTextLabelUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'LABEL_TEXT\' | translate}} :</label><div class=col-lg-9><input type=text class=form-control ng-model=nyaSelect.temporyConfig.formlyLabel id=inputTextLabelUpdate placeholder=\"{{\'ADD_EDIT_LABEL_HERE\' | translate}}\"></div></div></div><div class=marginTopFivepixels></div><div class=row><div class=form-group><label for=inputTextRequiredUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'REQUIRED\' | translate}} :</label><div class=col-lg-9><div class=checkboxCssCorrection>&nbsp;</div><input type=checkbox ng-model=nyaSelect.temporyConfig.formlyRequired id=inputTextRequiredUpdate></div></div></div><div class=marginTopFivepixels></div><div class=row><div class=form-group><label for=inputTextDescriptionUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'DESCRIPTION\' | translate}} :</label><div class=col-lg-9><input type=text class=form-control ng-model=nyaSelect.temporyConfig.formlyDesciption id=inputTextDescriptionUpdate placeholder=\"{{\'ADDEDIT_DESCRIPTION\' | translate}}\"></div></div></div></div></div></div><div ng-switch-when=RichTextEditor><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=col-md-12><h5 class=greyText><i class=\"fa fa-eye\"></i>&nbsp; {{\'PREVIEW_TAB\' | translate}} :</h5></div></div><hr><div class=row><div class=col-md-12><div class=form-group><label for=RichTextEditor class=\"control-label textControlLabel\">{{nyaSelect.temporyConfig.formlyLabel}}<span ng-if=nyaSelect.temporyConfig.formlyRequired class=textControlLabel>*</span></label><div><text-angular ng-model=model[options.key]></text-angular><p class=help-block>{{nyaSelect.temporyConfig.formlyDesciption}}</p></div></div></div></div></div></div><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=col-md-12><h5 class=greyText><i class=\"fa fa-pencil-square-o\"></i>&nbsp; {{\'EDIT_PROPERTIES\' | translate}} :</h5></div></div><hr><div class=row><div class=form-group><label for=inputTextDescriptionUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'DESCRIPTION\' | translate}} :</label><div class=col-lg-9><input type=text class=form-control ng-model=nyaSelect.temporyConfig.formlyDesciption id=inputTextDescriptionUpdate placeholder=\"{{\'ADDEDIT_DESCRIPTION\' | translate}}\"></div></div></div></div></div></div><div ng-switch-when=Radio><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=col-md-12><h5 class=greyText><i class=\"fa fa-eye\"></i>&nbsp; {{\'PREVIEW_TAB\' | translate}} :</h5></div></div><hr><div class=row><div class=col-md-12><div class=form-group><label for=basicSelect class=\"control-label textControlLabel\">{{nyaSelect.temporyConfig.formlyLabel}}<span ng-if=nyaSelect.temporyConfig.formlyRequired class=textControlLabel>*</span></label><div><div class=radio ng-repeat=\"radioRow in radioRowCollection.rows\"><label><input type=radio name=optionsRadios id=\"{{\'optionsRadio-\' + $index}}\" value=$index checked=\"\"> {{radioRow.option}}</label></div><p class=help-block>{{nyaSelect.temporyConfig.formlyDesciption}}</p></div></div></div></div></div></div><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=col-md-12><h5 class=greyText><i class=\"fa fa-pencil-square-o\"></i>&nbsp; {{\'EDIT_PROPERTIES\' | translate}} :</h5></div></div><hr><div class=row><div class=\"col-lg-3 col-md-3\"><label for=radioRowCollection class=\"control-label greyText editPropertiesLabel\">{{\'ADD_NEW_RADIO\' | translate}} :</label></div></div><div class=row><div><div class=form-group><div class=\"col-sm-9 col-xs-9 col-md-9 col-lg-9\"><input type=text class=form-control id=inputAddNewRadioOption placeholder=\"{{\'ADD_RADIO_PLACEHOLD\' | translate}}\" ng-model=newOptionRadio.saisie></div><div class=\"col-sm-3 col-xs-3 col-md-3 col-lg-3\"><button class=\"btn btn-primary\" ng-click=addNewOptionRadio()>{{\'ADD\' | translate}}</button></div></div></div></div><div class=row><div class=\"col-lg-3 col-md-3\"><label for=radioRowCollection class=\"control-label greyText editPropertiesLabel\">{{\'EDIT_REMOVE_RADIO\' | translate}} :</label></div></div><div class=row><div class=form-group><div class-\"col-lg-12=\"\" col-md-12=\"\" col-sm-12=\"\" col-xs-12\"=\"\"><div class=container><div ng-show=\"radioRowCollection.rows.length === 0\"><h5 class=\"text-center greyText\"><em>- {{\'NO_RADIO_ADD_NEW\' | translate}} -</em></h5></div><table ng-if=\"radioRowCollection.rows.length > 0\" class=\"table table-striped\"><thead><tr><th st-ratio=20>{{\'ORDER\' | translate}}</th><th st-ratio=55>{{\'OPTION\' | translate}}</th><th st-ratio=25></th></tr><tr><th st-ratio=20></th><th st-ratio=55><input ng-model=radioFilter placeholder=\"{{\'SEARCH_4_OPTION\' | translate}}\" class=\"input-sm form-control\" type=search></th><th st-ratio=25></th></tr></thead><tbody><tr ng-repeat=\"radioRow in radioRowCollection.rows | filter:radioFilter as radioRow\"><td st-ratio=20>{{$index}}</td><td st-ratio=55>{{radioRow.option}}</td><td st-ratio=25><div class=pull-right><button class=\"btn btn-primary\" ng-click=upThisRadioRow($index)><i class=\"fa fa-arrow-up\"></i></button> <button class=\"btn btn-primary\" ng-click=downThisRadioRow($index)><i class=\"fa fa-arrow-down\"></i></button> <button class=\"btn btn-danger\" ng-click=removeRadioRow($index)><i class=\"fa fa-trash-o\"></i></button></div></td></tr></tbody></table></div></div></div></div><hr><div class=marginTopFivepixels></div><div class=row><div class=form-group><label for=inputTextLabelUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'LABEL_TEXT\' | translate}} :</label><div class=col-lg-9><input type=text class=form-control ng-model=nyaSelect.temporyConfig.formlyLabel id=inputTextLabelUpdate placeholder=\"{{\'ADD_EDIT_LABEL_HERE\' | translate}}\"></div></div></div><div class=marginTopFivepixels></div><div class=row><div class=form-group><label for=inputTextRequiredUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'REQUIRED\' | translate}} :</label><div class=col-lg-9><div class=checkboxCssCorrection>&nbsp;</div><input type=checkbox ng-model=nyaSelect.temporyConfig.formlyRequired id=inputTextRequiredUpdate></div></div></div><div class=marginTopFivepixels></div><div class=row><div class=form-group><label for=inputTextDescriptionUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'DESCRIPTION\' | translate}} :</label><div class=col-lg-9><input type=text class=form-control ng-model=nyaSelect.temporyConfig.formlyDesciption id=inputTextDescriptionUpdate placeholder=\"{{\'ADDEDIT_DESCRIPTION\' | translate}}\"></div></div></div></div></div></div><div ng-switch-when=Checkbox><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=col-md-12><h5 class=greyText><i class=\"fa fa-eye\"></i>&nbsp; {{\'PREVIEW_TAB\' | translate}} :</h5></div></div><hr><div class=row><div class=col-md-12><div class=form-group><div class=col-md-12><div class=checkbox><label><input type=checkbox id=checkBox> <span class=blackText>{{nyaSelect.temporyConfig.formlyLabel}}</span><span ng-if=nyaSelect.temporyConfig.formlyRequired class=textControlLabel>*</span></label></div><p class=help-block>{{nyaSelect.temporyConfig.formlyDesciption}}</p></div></div></div></div></div></div><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=col-md-12><h5 class=greyText><i class=\"fa fa-pencil-square-o\"></i>&nbsp; {{\'EDIT_PROPERTIES\' | translate}} :</h5></div></div><hr><div class=row><div class=form-group><label for=inputTextLabelUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'LABEL_TEXT\' | translate}} :</label><div class=col-lg-9><input type=text class=form-control ng-model=nyaSelect.temporyConfig.formlyLabel id=inputTextLabelUpdate placeholder=\"{{\'ADD_EDIT_LABEL_HERE\' | translate}}\"></div></div></div><div class=marginTopFivepixels></div><div class=row><div class=form-group><label for=inputTextRequiredUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'REQUIRED\' | translate}} :</label><div class=col-lg-9><div class=checkboxCssCorrection>&nbsp;</div><input type=checkbox ng-model=nyaSelect.temporyConfig.formlyRequired id=inputTextRequiredUpdate></div></div></div><div class=marginTopFivepixels></div><div class=row><div class=form-group><label for=inputTextDescriptionUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'DESCRIPTION\' | translate}} :</label><div class=col-lg-9><input type=text class=form-control ng-model=nyaSelect.temporyConfig.formlyDesciption id=inputTextDescriptionUpdate placeholder=\"{{\'ADDEDIT_DESCRIPTION\' | translate}}\"></div></div></div></div></div></div><div ng-switch-when=BasicSelect><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=col-md-12><h5 class=greyText><i class=\"fa fa-eye\"></i>&nbsp; {{\'PREVIEW_TAB\' | translate}} :</h5></div></div><hr><div class=row><div class=col-md-12><div class=form-group><label for=basicSelect class=\"control-label textControlLabel\">{{nyaSelect.temporyConfig.formlyLabel}}<span ng-if=nyaSelect.temporyConfig.formlyRequired class=textControlLabel>*</span></label><div><ol class=\"nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12\" ng-model=modelbasicSelect id=basicSelect disabled=\"basicSelectRowCollection.rows.length === 0\"><li class=nya-bs-option nya-bs-option=\"basicSelectRow in basicSelectRowCollection.rows\" value=$index><a>{{basicSelectRow.option}}</a></li></ol><p class=help-block>{{nyaSelect.temporyConfig.formlyDesciption}}</p></div></div></div></div></div></div><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=col-md-12><h5 class=greyText><i class=\"fa fa-pencil-square-o\"></i>&nbsp; {{\'EDIT_PROPERTIES\' | translate}} :</h5></div></div><hr><div class=row><div class=\"col-lg-3 col-md-3\"><label for=basicSelectRowCollection class=\"control-label greyText editPropertiesLabel\">{{\'ADD_NEW_OPTIONS\' | translate}} :</label></div></div><div class=row><div><div class=form-group><div class=\"col-sm-9 col-xs-9 col-md-9 col-lg-9\"><input type=text class=form-control id=inputAddNewBasicOption placeholder=\"{{\'ADD_A_NEW_OPTION\' | translate}}\" ng-model=newOptionBasicSelect.saisie></div><div class=\"col-sm-3 col-xs-3 col-md-3 col-lg-3\"><button class=\"btn btn-primary\" ng-click=addNewOptionBasicSelect()>{{\'ADD\' | translate}}</button></div></div></div></div><div class=row><div class=\"col-lg-3 col-md-3\"><label class=\"control-label greyText editPropertiesLabel\">{{\'EDIT_REMOVE_OPTIONS\' | translate}} :</label></div></div><div class=row><div class=form-group><div class-\"col-lg-12=\"\" col-md-12=\"\" col-sm-12=\"\" col-xs-12\"=\"\"><div class=container><div ng-if=\"basicSelectRowCollection.rows.length === 0\"><h5 class=\"text-center greyText\"><em>- {{\'NO_OPTION_ADD_NEW\' | translate}} -</em></h5></div><table ng-if=\"basicSelectRowCollection.rows.length > 0\" class=\"table table-striped\"><thead><tr><th st-ratio=20>{{\'ORDER\' | translate}}</th><th st-ratio=55>{{\'OPTION\' | translate}}</th><th st-ratio=25></th></tr><tr><th st-ratio=20></th><th st-ratio=55><input ng-model=basicSelectFilter placeholder=\"{{\'SEARCH_4_OPTION\' | translate}}\" class=\"input-sm form-control\" type=search></th><th st-ratio=25></th></tr></thead><tbody><tr ng-repeat=\"basicSelectRow in basicSelectRowCollection.rows | filter:basicSelectFilter as basicSelectRow\"><td st-ratio=20>{{$index}}</td><td st-ratio=55>{{basicSelectRow.option}}</td><td st-ratio=25><div class=pull-right><button class=\"btn btn-primary\" ng-click=upThisRow($index)><i class=\"fa fa-arrow-up\"></i></button> <button class=\"btn btn-primary\" ng-click=downThisRow($index)><i class=\"fa fa-arrow-down\"></i></button> <button class=\"btn btn-danger\" ng-click=removeRow($index)><i class=\"fa fa-trash-o\"></i></button></div></td></tr></tbody></table></div></div></div></div><hr><div class=marginTopFivepixels></div><div class=row><div class=form-group><label for=inputTextDescriptionUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'DESCRIPTION\' | translate}} :</label><div class=col-lg-9><input type=text class=form-control ng-model=nyaSelect.temporyConfig.formlyDesciption id=inputTextDescriptionUpdate placeholder=\"{{\'ADDEDIT_DESCRIPTION\' | translate}}\"></div></div></div></div></div></div><div ng-switch-when=GroupedSelect><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=col-md-12><h5 class=greyText><i class=\"fa fa-eye\"></i>&nbsp; {{\'PREVIEW_TAB\' | translate}} :</h5></div></div><hr><div class=row><div class=col-md-12><div class=form-group><label for=select class=\"control-label textControlLabel\">{{nyaSelect.temporyConfig.formlyLabel}}<span ng-if=nyaSelect.temporyConfig.formlyRequired class=textControlLabel>*</span></label><div><ol class=\"nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12\" ng-model=modelGroupedSelect data-live-search=true disabled=\"groupedSelectRowCollection.rows.length === 0\"><li nya-bs-option=\"groupedSelectRow in groupedSelectRowCollection.rows group by groupedSelectRow.group\" value=$index><span class=dropdown-header>{{groupedSelectRow.group}}</span> <a><span>{{groupedSelectRow.option}}</span> <span class=\"glyphicon glyphicon-ok check-mark\"></span></a></li></ol><p class=help-block>{{nyaSelect.temporyConfig.formlyDesciption}}</p></div></div></div></div></div></div><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=col-md-12><h5 class=greyText><i class=\"fa fa-pencil-square-o\"></i>&nbsp; {{\'EDIT_PROPERTIES\' | translate}} :</h5></div></div><hr><div class=row><div class=\"col-lg-3 col-md-3\"><label for=groupedSelectRowCollection class=\"control-label greyText editPropertiesLabel\">{{\'ADD_NEW_OPTIONS\' | translate}} :</label></div></div><div class=row><div><div class=form-group><div class=\"col-sm-9 col-xs-9 col-md-9 col-lg-9\"><input type=text class=form-control id=inputAddNewGroupedOption placeholder=\"{{\'ADD_A_NEW_OPTION\' | translate}}\" ng-model=newOptionGroupedSelect.saisie></div><div class=\"col-sm-3 col-xs-3 col-md-3 col-lg-3\"><button class=\"btn btn-primary\" ng-click=addNewOptionGroupedSelect()>{{\'ADD\' | translate}}</button></div></div></div></div><div class=row><div class=\"col-lg-3 col-md-3\"><label for=groupedSelectRowCollection class=\"control-label greyText editPropertiesLabel\">{{\'ADD_NEW_GROUPS\' | translate}} :</label></div></div><div class=row><div><div class=form-group><div class=\"col-sm-9 col-xs-9 col-md-9 col-lg-9\"><input id=inputAddNewGroupGroupedOption type=text class=form-control ng-model=newGroupGroupedSelect.saisie placeholder=\"{{\'ADD_A_NEW_GROUP\' | translate}}\"></div><div class=\"col-sm-3 col-xs-3 col-md-3 col-lg-3\"><button class=\"btn btn-primary\" ng-click=addNewGroupToGroupedSelect()>{{\'ADD\' | translate}}</button></div></div></div></div><div class=row><div class=\"col-lg-3 col-md-3\"><label class=\"control-label greyText editPropertiesLabel\">{{\'EDIT_GROUPS_OPTIONS\' | translate}} :</label></div></div><div class=row><div class=form-group><div class-\"col-lg-12=\"\" col-md-12=\"\" col-sm-12=\"\" col-xs-12\"=\"\"><div class=container><div ng-if=\"groupedSelectRowCollection.rows.length === 0\"><h5 class=\"text-center greyText\"><em>- {{\'NO_OPTION_ADD_NEW\' | translate}} -</em></h5></div><table ng-if=\"groupedSelectRowCollection.rows.length > 0\" class=\"table table-striped\"><thead><tr><th st-ratio=20>{{\'ORDER\' | translate}}</th><th st-ratio=25>{{\'GROUP\' | translate}}</th><th st-ratio=30>{{\'OPTION\' | translate}}</th><th st-ratio=25></th></tr><tr><th st-ratio=20></th><th st-ratio=25></th><th st-ratio=30><input ng-model=groupedSelectFilter placeholder=\"{{\'SEARCH_4_OPTION\' | translate}}\" class=\"input-sm form-control\" type=search></th><th st-ratio=25></th></tr></thead><tbody><tr ng-repeat=\"groupedSelectRow in groupedSelectRowCollection.rows | filter:groupedSelectFilter as oneGroupedSelectRow\"><td st-ratio=20>{{$index}}</td><td st-ratio=25><div ng-if=\"groupSelectGroupClick.showList === true\"><div ng-if=\"GroupedSelectGroups.list.length === 0\"><p class=\"text-left noGroupText\">- {{\'NO_GROUP_ADD_NEW\' | translate}} -</p></div><div ng-if=\"GroupedSelectGroups.list.length > 0\"><ol class=\"nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12 editGroupedSelectnyaSelect\" ng-model=oneGroupedSelectRow.group id=modelGroupedOptionGroupedChoose disabled=\"GroupedSelectGroups.list.length === 0\"><li class=nya-bs-option nya-bs-option=\"GroupedSelectGroup in GroupedSelectGroups.list\" value=GroupedSelectGroup><a>{{GroupedSelectGroup}}</a></li></ol></div></div><div ng-if=\"groupSelectGroupClick.showList === false\">{{oneGroupedSelectRow.group}}</div></td><td st-ratio=30>{{oneGroupedSelectRow.option}}</td><td st-ratio=25><div class=pull-right><button class=\"btn btn-primary\" ng-click=upThisGroupedSelectRow($index)><i class=\"fa fa-arrow-up\"></i></button> <button class=\"btn btn-primary\" ng-click=downThisGroupedSelectRow($index)><i class=\"fa fa-arrow-down\"></i></button> <button class=\"btn btn-warning\" ng-click=showGroupListToChoose()><i class=\"fa fa-pencil-square-o\"></i></button> <button class=\"btn btn-danger\" ng-click=removeGroupedSelectRow($index)><i class=\"fa fa-trash-o\"></i></button></div></td></tr></tbody></table></div></div></div></div><hr><div class=marginTopFivepixels></div><div class=row><div class=form-group><label for=inputTextDescriptionUpdate class=\"col-lg-3 control-label greyText editPropertiesLabel\">{{\'DESCRIPTION\' | translate}} :</label><div class=col-lg-9><input type=text class=form-control ng-model=nyaSelect.temporyConfig.formlyDesciption id=inputTextDescriptionUpdate placeholder=\"{{\'ADDEDIT_DESCRIPTION\' | translate}}\"></div></div></div></div></div></div></div></div><div class=modal-footer><button class=\"btn btn-primary\" ng-class=\"{\'disabled\': nyaSelect.selectedControl === \'none\'}\" ng-click=ok()>{{\'OK\' | translate}}</button> <button class=\"btn btn-warning\" ng-click=cancel()>{{\'CANCEL\' | translate}}</button></div>");}]);
/**
 *  ------------------------------------------------------
 *  module core : injects core "non app modules"
 *  ------------------------------------------------------
 *
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

(function () {
	'use strict';

	angular
		.module('ngwfApp.core', [
	    'textAngular',
	    'textAngularSetup',
	    'ngAnimate',
	    'toaster',                      
	    'formly', 
	    'formlyBootstrap',
	    'ui.bootstrap',
	    'nya.bootstrap.select',
			'pascalprecht.translate'
		]);

})(); 

angular.module("eda.easyFormGenerator.translate", []).config(["$translateProvider", function($translateProvider) {
$translateProvider.translations("de", {
    "SAY_HI"	            : "Hallo",
    
    "EDIT_TAB"		        : "Bearbeiten / Schaffen",
    "PREVIEW_TAB"         : "Vorschau",
    
    "WIZARD_LINES"        : "Linien",
    "WIZARD_LAYOUT"       : "Layout",
    "WIZARD_CONTROLS"     : "Steuerung",
    "WIZARD_SAVE"         : "sparen",    
   
    "PAGER_PREVIOUS"      : "vorher.",
    "PAGER_NEXT"          : "nächste",
    
    "COMMAND_PANEL"       : "Anweisung",
    "VISUAL_PANEL"        : "visuell",   
    
    "ADD_NEW_LINE"        : "Hinzufügen neuer Leitung",
    "SELECTED_LINE"       : "ausgewählte Linie",
    
    "NUMBER_OF_COLUMN"    : "Anzahl von Spalten",
    "APPLY_CTRL2COL"      : "gelten diese Steuer Spalte",
    
    "CLIC_TAP_2_OPEN"     : "klicken Sie auf Spalte zur Steuerungsauswahl öffnen",
    "SELECT_2_APPLY_COL"  : "Wählen Sie die gewünschte Steuerung und gültig , um es in Spalte anwenden",
    
    "CUSTOM_SUBMIT_BTN"   : "Passen Submit-Button Text",
    "CUSTOM_CANCEL_BTN"   : "Passen Cancel-Button Text",
    "NAME_THIS_FORM"      : "Nennen dieses Formular",
    "SAVE_THIS_FORM"      : "Speichern dieses Formular",
    
    "FINAL_STEP"          : "Endschritt : Formular Vorschau",
    
    "DATA_MODEL"          : "DATEN MODELL", 
    "FIELDS_MODEL"        : "FELDER MODELL (Datenbank-kompatibel)", 
    
    "SELECT_A_CTRL"       : "Wählen Sie ein Steuer",
    "SELECT_CTRL_IN_LIST" : "Wählen Sie ein Steuer aus der Liste unten",
    "COL_WILL_BE_BLANK"   : "die Spalte werde leer sein",  
    
    "EDIT_PROPERTIES"     : "Anzeigen",
    
    "HEADER_TEXT"         : "Kopftext",
    "ADD_EDIT_HEADER_HERE": "Kopftext ändern", 
    
    "SUBTITLE_TEXT"       : "Untertitel",
    "ADD_EDIT_SUBTIL_HERE": "Untertitel ändern",
    
    "LABEL_TEXT"          : "Etikett",
    "ADD_EDIT_LABEL_HERE" : "Etikett ändern",    
    
    "PLACEHOLDER"         : "placeholder",
    "ADD_EDIT_PLACEHOLD"  : "placeholder ändern",
    
    "REQUIRED"            : "erforderlich",
    
    "DESCRIPTION"         : "Beschreibung",
    "ADDEDIT_DESCRIPTION" : "Beschreibung ändern", 
    
    "DATE_FORMAT"         : "Datumsformat", 
    
    "ADD_NEW_RADIO"       : "Radiobutton hinzufügen", 
    "ADD_RADIO_PLACEHOLD" : "Radiobutton hinzufügen",
    "EDIT_REMOVE_RADIO"   : "Radiobutton ändern",
    "NO_RADIO_ADD_NEW"    : "kein Radiobutton : Radiobutton hinzufügen", 
    
    "SEARCH_4_OPTION"     : "option suchen",   
    
    "ADD"                 : "hinzufügen",
    "ORDER"               : "bestellen",
    "OPTION"              : "Option",
    "GROUP"               : "Gruppe",    
    
    "ADD_NEW_OPTIONS"     : "Optionen hinzufügen",
    "ADD_A_NEW_OPTION"    : "Option hinzufügen",
    "EDIT_REMOVE_OPTIONS" : "Optionen ändern",
    "NO_OPTION_ADD_NEW"   : "kein option : Option hinzufügen",              
         
         
    "ADD_NEW_GROUPS"      : "Gruppen hinzufügen",
    "ADD_A_NEW_GROUP"     : "Gruppe hinzufügen",
    "EDIT_GROUPS_OPTIONS" : "Gruppen ändern",
    "NO_GROUP_ADD_NEW"    : "keine Gruppe : Gruppe hinzufügen",  
    
    "OK"                  : "bestätigen",
    "CANCEL"              : "stornieren"    
           
});

$translateProvider.translations("en", {
    "SAY_HI"	           : "Hello",
    
    "EDIT_TAB"            : "Edit / Create",
    "PREVIEW_TAB"         : "Preview",
    
    "WIZARD_LINES"        : "lines",
    "WIZARD_LAYOUT"       : "layout",
    "WIZARD_CONTROLS"     : "controls",
    "WIZARD_SAVE"         : "save",
    
    "PAGER_PREVIOUS"      : "Previous",
    "PAGER_NEXT"          : "Next",
    
    "COMMAND_PANEL"       : "Command",
    "VISUAL_PANEL"        : "Visual",
    
    "ADD_NEW_LINE"        : "Add a new line",
    
    "SELECTED_LINE"       : "Selected line",
    
    "NUMBER_OF_COLUMN"    : "number of columns",
    "APPLY_CTRL2COL"      : "Apply controls to columns",
    
    "CLIC_TAP_2_OPEN"     : "Click / Tap on column to open control selection",
    "SELECT_2_APPLY_COL"  : "Select desired control and valid to apply it to column",
    
    "CUSTOM_SUBMIT_BTN"   : "Customize Submit button Text",
    "CUSTOM_CANCEL_BTN"   : "Customize Cancel button Text",
    "NAME_THIS_FORM"      : "Name this form",
    "SAVE_THIS_FORM"      : "save this form",
    
    "FINAL_STEP"          : "Final Step : form preview",
    
    "DATA_MODEL"          : "DATA MODEL",
    "FIELDS_MODEL"        : "FIELDS MODEL (ready to save to database one)",
    
    
    "SELECT_A_CTRL"       : "Select a control",
    "SELECT_CTRL_IN_LIST" : "Select a control in the list below",
    "COL_WILL_BE_BLANK"   : "Column will be blank",
    
    "EDIT_PROPERTIES"     : "Edit properties",
    
    "HEADER_TEXT"         : "Header text",
    "ADD_EDIT_HEADER_HERE": "Add / edit header text here",
    
    "SUBTITLE_TEXT"       : "Subtitle text",
    "ADD_EDIT_SUBTIL_HERE": "Add / edit subtitle text here",
    
    "LABEL_TEXT"          : "Label text",
    "ADD_EDIT_LABEL_HERE" : "Add / edit control label here",
    
    "PLACEHOLDER"         : "placeholder",
    "ADD_EDIT_PLACEHOLD"  : "Add / edit placeholder text here",
    
    "REQUIRED"            : "Required",
    
    "DESCRIPTION"         : "Description",
    "ADDEDIT_DESCRIPTION" : "Add / edit description here",
    
    "DATE_FORMAT"         : "Date format",
    
    "ADD_NEW_RADIO"       : "Add new radio",
    "ADD_RADIO_PLACEHOLD" : "add new radio",
    "EDIT_REMOVE_RADIO"   : "Edit/Remove radio",
    "NO_RADIO_ADD_NEW"    : "no radio : add new radio values",
    
    "SEARCH_4_OPTION"     : "search for option",
    
    "ADD"                 : "add",
    "ORDER"               : "order",
    "OPTION"              : "option",
    "GROUP"               : "group",
    
    "ADD_NEW_OPTIONS"     : "Add new options",
    "ADD_A_NEW_OPTION"    : "add new option",
    "EDIT_REMOVE_OPTIONS" : "Edit/Remove options",
    "NO_OPTION_ADD_NEW"   : "no option : add new options",
    
    "ADD_NEW_GROUPS"      : "Add new groups",
    "ADD_A_NEW_GROUP"     : "Add new group",
    "EDIT_GROUPS_OPTIONS" : "Edit/Remove options/groups",
    "NO_GROUP_ADD_NEW"    : "add new groups",
    
    "OK"                  : "OK",
    "CANCEL"              : "Cancel"
});

$translateProvider.translations("es", {
    "SAY_HI"	           : "Hola",
    
    "EDIT_TAB"            : "Editar / Crear",
    "PREVIEW_TAB"         : "Previsualizar",
    
    "WIZARD_LINES"        : "lineas",
    "WIZARD_LAYOUT"       : "diseño",
    "WIZARD_CONTROLS"     : "controles",
    "WIZARD_SAVE"         : "guardar",
    
    "PAGER_PREVIOUS"      : "Anterior",
    "PAGER_NEXT"          : "Siguiente",
    
    "COMMAND_PANEL"       : "Comando",
    "VISUAL_PANEL"        : "Visual",
    
    "ADD_NEW_LINE"        : "Agregar nueva linea",
    
    "SELECTED_LINE"       : "Linea seleccionada",
    
    "NUMBER_OF_COLUMN"    : "numero de columnas",
    "APPLY_CTRL2COL"      : "Aplicar controles a columnas",
    
    "CLIC_TAP_2_OPEN"     : "Click / Toque en la columna para seleccionar controles",
    "SELECT_2_APPLY_COL"  : "Selecciona el control deseado para aplicarlo a la columna",
    
    "CUSTOM_SUBMIT_BTN"   : "Personalizar texto de boton Enviar",
    "CUSTOM_CANCEL_BTN"   : "Personalizar texto de boton Cancelar",
    "NAME_THIS_FORM"      : "Nombrar formulario",
    "SAVE_THIS_FORM"      : "guardar formulario",
    
    "FINAL_STEP"          : "Ultimo paso : previsualizar formulario",
    
    "DATA_MODEL"          : "MODELO DE DATOS",
    "FIELDS_MODEL"        : "MODELO DE CAMPOS (listo para guardar en base de datos uno)",
    
    
    "SELECT_A_CTRL"       : "Selecciona un control",
    "SELECT_CTRL_IN_LIST" : "Selecciona un control de la lista",
    "COL_WILL_BE_BLANK"   : "Columna sera vacia",
    
    "EDIT_PROPERTIES"     : "Editar propiedades",
    
    "HEADER_TEXT"         : "Texto de encabezado",
    "ADD_EDIT_HEADER_HERE": "Agregar / editar texto de encabezado aqui",
    
    "SUBTITLE_TEXT"       : "Texto de subtitulo",
    "ADD_EDIT_SUBTIL_HERE": "Agregar / editar texto de subtitulo aqui",
    
    "LABEL_TEXT"          : "Texto de etiqueta",
    "ADD_EDIT_LABEL_HERE" : "Agregar / editar texto de etiqueta aqui",
    
    "PLACEHOLDER"         : "Marcador",
    "ADD_EDIT_PLACEHOLD"  : "Agregar / editar texto de marcador aqui",
    
    "REQUIRED"            : "Requerido",
    
    "DESCRIPTION"         : "Descripcion",
    "ADDEDIT_DESCRIPTION" : "Agregar / editar descripcion aqui",
    
    "DATE_FORMAT"         : "Formato de fecha",
    
    "ADD_NEW_RADIO"       : "Agregar nuevo radio",
    "ADD_RADIO_PLACEHOLD" : "agregar nuevo radio",
    "EDIT_REMOVE_RADIO"   : "Editar/Eliminar radio",
    "NO_RADIO_ADD_NEW"    : "sin radio : agregar nuevos valores de radio",
    
    "SEARCH_4_OPTION"     : "buscar opcion",
    
    "ADD"                 : "agregar",
    "ORDER"               : "orden",
    "OPTION"              : "opcion",
    "GROUP"               : "grupo",
    
    "ADD_NEW_OPTIONS"     : "agregar nuevas opciones",
    "ADD_A_NEW_OPTION"    : "agregar nueva opcione",
    "EDIT_REMOVE_OPTIONS" : "Editar/Eliminar opciones",
    "NO_OPTION_ADD_NEW"   : "sin opcion : agregar nuevas opciones",
    
    "ADD_NEW_GROUPS"      : "Agregar nuevos grupos",
    "ADD_A_NEW_GROUP"     : "Agregar nuevo grupo",
    "EDIT_GROUPS_OPTIONS" : "Editar/Eliminar opciones/grupos",
    "NO_GROUP_ADD_NEW"    : "agregar nuevos grupos",
    
    "OK"                  : "OK",
    "CANCEL"              : "Cancelar"
});

$translateProvider.translations("fr", {
    "SAY_HI"	           : "Bonjour",
    
    "EDIT_TAB"            : "Edition / Creation",
    "PREVIEW_TAB"         : "Aperçu",
    
    "WIZARD_LINES"        : "lignes",
    "WIZARD_LAYOUT"       : "disposition",
    "WIZARD_CONTROLS"     : "contrôles",
    "WIZARD_SAVE"         : "sauvegarder",
    
    "PAGER_PREVIOUS"      : "Précédent",
    "PAGER_NEXT"          : "Suivant",
    
    "COMMAND_PANEL"       : "Commandes",
    "VISUAL_PANEL"        : "Visuel",
    
    "ADD_NEW_LINE"        : "Ajouter une nouvelle ligne",
    
    "SELECTED_LINE"       : "Ligne sélectionnée",
    
    "NUMBER_OF_COLUMN"    : "nombre de colonnes",
    "APPLY_CTRL2COL"      : "Appliquer les contrôles aux colonnes",
    
    "CLIC_TAP_2_OPEN"     : "Cliquer sur une colonne pour ouvrir le menu d'édition",
    "SELECT_2_APPLY_COL"  : "Sélectionner un contrôle puis valider pour l'appliquer à la colonne",
    
    "CUSTOM_SUBMIT_BTN"   : "Personnaliser le texte du bouton envoie",
    "CUSTOM_CANCEL_BTN"   : "Personnaliser le texte du bouton annuler",
    "NAME_THIS_FORM"      : "Nommer le formulaire",
    "SAVE_THIS_FORM"      : "sauvegarder le formulaire",
    
    "FINAL_STEP"          : "Dernière étape : aperçu du formulaire",
    
    "DATA_MODEL"          : "MODELE DE DONNEES",
    "FIELDS_MODEL"        : "MODELE DES CHAMPS (modèle compatible base de données)",

  
    "SELECT_A_CTRL"       : "Sélectionner un contrôle",
    "SELECT_CTRL_IN_LIST" : "Sélectionner un contrôle dans la liste ci-dessous",
    "COL_WILL_BE_BLANK"   : "La colonne sera vide",
    
    "EDIT_PROPERTIES"     : "Editer les propriétés",
    
    "HEADER_TEXT"         : "Texte du titre principal",
    "ADD_EDIT_HEADER_HERE": "Editer le textes du titre principal",
    
    "SUBTITLE_TEXT"       : "Texte du sous-titre",
    "ADD_EDIT_SUBTIL_HERE": "Editer le textes du sous-titre",
    
    "LABEL_TEXT"          : "Texte de l'étiquette",
    "ADD_EDIT_LABEL_HERE" : "Editer le texte de l'étiquette",
    
    "PLACEHOLDER"         : "placeholder",
    "ADD_EDIT_PLACEHOLD"  : "Editer le placeholder",
    
    "REQUIRED"            : "Requis",
    
    "DESCRIPTION"         : "Description",
    "ADDEDIT_DESCRIPTION" : "Ajouter / editer la description",
    
    "DATE_FORMAT"         : "Format de la date",
    
    "ADD_NEW_RADIO"       : "Ajouter un nouveau choix à cocher",
    "ADD_RADIO_PLACEHOLD" : "Ajouter un nouveau choix à cocher",
    "EDIT_REMOVE_RADIO"   : "Editer / supprimer un choix à cocher",
    "NO_RADIO_ADD_NEW"    : "aucun choix à cocher : en ajouter un",
    
    "SEARCH_4_OPTION"     : "rechercher une option",
    
    "ADD"                 : "ajouter",
    "ORDER"               : "ordre",
    "OPTION"              : "option",
    "GROUP"               : "groupe",
    
    "ADD_NEW_OPTIONS"     : "Ajouter de nouvelles options",
    "ADD_A_NEW_OPTION"    : "ajoutre une option",
    "EDIT_REMOVE_OPTIONS" : "Editer / supprimer des options",
    "NO_OPTION_ADD_NEW"   : "aucune option : en ajouter",
    
    "ADD_NEW_GROUPS"      : "Ajouter de nouveaux groupes",
    "ADD_A_NEW_GROUP"     : "Ajouter un nouveau groupe",
    "EDIT_GROUPS_OPTIONS" : "Editer / supprimer les groupes et options",
    "NO_GROUP_ADD_NEW"    : "ajouter de nouveaux groupes",
    
    "OK"                : "Valider",
    "CANCEL"            : "Annuler"        
});

$translateProvider.translations("jp", {
    "SAY_HI"	           : "こんにちわ",
    
    "EDIT_TAB"            : "編集 / 作成",
    "PREVIEW_TAB"         : "プレビュー",
    
    "WIZARD_LINES"        : "ライン",
    "WIZARD_LAYOUT"       : "レイアウト",
    "WIZARD_CONTROLS"     : "コントロール",
    "WIZARD_SAVE"         : "サーブ",
    
    "PAGER_PREVIOUS"      : "前",
    "PAGER_NEXT"          : "次",
    
    "COMMAND_PANEL"       : "コマンド",
    "VISUAL_PANEL"        : "ビジュアル",
    
    "ADD_NEW_LINE"        : "新しいライン追加",
    
    "SELECTED_LINE"       : "選択されたライン",
    
    "NUMBER_OF_COLUMN"    : "カラムの数",
    "APPLY_CTRL2COL"      : "カラムにコントロール適用",
    
    "CLIC_TAP_2_OPEN"     : "コントロール選択を広げるには列をクリック",
    "SELECT_2_APPLY_COL"  : "好きなコントロールを選び適用",
    
    "CUSTOM_SUBMIT_BTN"   : "適用ボタンの文字変更する場合",
    "CUSTOM_CANCEL_BTN"   : "キャンセルボタンの文字変更する場合",
    "NAME_THIS_FORM"      : "形式に名前を付ける",
    "SAVE_THIS_FORM"      : "形式をサーブ",
    
    "FINAL_STEP"          : "ファイナルステップ : プレビュー形式",
    
    "DATA_MODEL"          : "データーモデル",
    "FIELDS_MODEL"        : "モデルフィールド",
    
    
    "SELECT_A_CTRL"       : "コントロールを選び選択",
    "SELECT_CTRL_IN_LIST" : "以下のリストからコントロールを選び選択",
    "COL_WILL_BE_BLANK"   : "空になる列",
    
    "EDIT_PROPERTIES"     : "プロパティの変更",
    
    "HEADER_TEXT"         : "ヘッダーテキスト",
    "ADD_EDIT_HEADER_HERE": "ヘッダーテキスト文字変更",
    
    "SUBTITLE_TEXT"       : "サブタイトル　テキスト",
    "ADD_EDIT_SUBTIL_HERE": "サブタイトルテキスト文字変更",
    
    "LABEL_TEXT"          : "ラベルテキスト",
    "ADD_EDIT_LABEL_HERE" : "ラベルテキスト文字変更",
    
    "PLACEHOLDER"         : "プレースホルダー",
    "ADD_EDIT_PLACEHOLD"  : "プレースホルダー文字変更",
    
    "REQUIRED"            : "必須",
    
    "DESCRIPTION"         : "説明",
    "ADDEDIT_DESCRIPTION" : "説明の変更",
    
    "DATE_FORMAT"         : "日付の形式",
    
    "ADD_NEW_RADIO"       : "新ラジオボタンを追加",
    "ADD_RADIO_PLACEHOLD" : "新ラジオボタンを追加",
    "EDIT_REMOVE_RADIO"   : "ラジオボタン変更",
    "NO_RADIO_ADD_NEW"    : "ラジオ無し : 新ラジオボタン追加",
    
    "SEARCH_4_OPTION"     : "オプション検索",
    
    "ADD"                 : "追加",
    "ORDER"               : "順番",
    "OPTION"              : "オプション",
    "GROUP"               : "グループ",
    
    "ADD_NEW_OPTIONS"     : "新しいオプション追加",
    "ADD_A_NEW_OPTION"    : "新しいオプション追加",
    "EDIT_REMOVE_OPTIONS" : "オプションの変更",
    "NO_OPTION_ADD_NEW"   : "オプション無し : 新しいオプション追加",
    
    "ADD_NEW_GROUPS"      : "新しいグループ追加",
    "ADD_A_NEW_GROUP"     : "新しいグループ追加",
    "EDIT_GROUPS_OPTIONS" : "グループを変更",
    "NO_GROUP_ADD_NEW"    : "グループを追加",
    
    "OK"                : "オッケー",
    "CANCEL"            : "キャンセル"
});

$translateProvider.translations("tr", {
    "SAY_HI"	           : "Merhaba",
    
    "EDIT_TAB"            : "Düzenle / Oluştur",
    "PREVIEW_TAB"         : "Önizleme",
    
    "WIZARD_LINES"        : "satırlar",
    "WIZARD_LAYOUT"       : "düzen",
    "WIZARD_CONTROLS"     : "kontroller",
    "WIZARD_SAVE"         : "kaydet",
    
    "PAGER_PREVIOUS"      : "Geri",
    "PAGER_NEXT"          : "İleri",
    
    "COMMAND_PANEL"       : "Komut",
    "VISUAL_PANEL"        : "Görsel",
    
    "ADD_NEW_LINE"        : "Yeni satır ekle",
    
    "SELECTED_LINE"       : "Seçili satır",
    
    "NUMBER_OF_COLUMN"    : "sütun sayısı",
    "APPLY_CTRL2COL"      : "Sütunlara form ögesi ekle",
    
    "CLIC_TAP_2_OPEN"     : "Form ögesi eklemek için sütunlara tıkla",
    "SELECT_2_APPLY_COL"  : "İstediğin ögeyi seçtikten sonra gerekli yerleri doldur ve kaydet",
    
    "CUSTOM_SUBMIT_BTN"   : "Gönder butonu yazısını düzenle",
    "CUSTOM_CANCEL_BTN"   : "İptal butonu yazısını düzenle",
    "NAME_THIS_FORM"      : "Forma isim ver",
    "SAVE_THIS_FORM"      : "formu kaydet",
    
    "FINAL_STEP"          : "Son aşama : form önizlemesi",
    
    "DATA_MODEL"          : "VERİ MODELİ",
    "FIELDS_MODEL"        : "ALAN MODELİ (veritabanına kaydetmeye hazır)",
    
    
    "SELECT_A_CTRL"       : "Form ögesi seç",
    "SELECT_CTRL_IN_LIST" : "Verilen listeden bir form ögesi seç",
    "COL_WILL_BE_BLANK"   : "Sütun boş kalacak",
    
    "EDIT_PROPERTIES"     : "Özellikleri düzenle",
    
    "HEADER_TEXT"         : "Başlık yazısı",
    "ADD_EDIT_HEADER_HERE": "Başlık yazısını ekle / düzenle",
    
    "SUBTITLE_TEXT"       : "Altyazı",
    "ADD_EDIT_SUBTIL_HERE": "Altyazı ekle / düzenle",
    
    "LABEL_TEXT"          : "Form ögesinin adı",
    "ADD_EDIT_LABEL_HERE" : "Ad ekle / düzenle",
    
    "PLACEHOLDER"         : "Form ögesinin içine geçici yazı ekle",
    "ADD_EDIT_PLACEHOLD"  : "Geçici yazı ekle / düzenle",
    
    "REQUIRED"            : "Gerekli",
    
    "DESCRIPTION"         : "Açıklama",
    "ADDEDIT_DESCRIPTION" : "Açıklama ekle / düzenle",
    
    "DATE_FORMAT"         : "Tarih formatı",
    
    "ADD_NEW_RADIO"       : "Radio butonu ekle",
    "ADD_RADIO_PLACEHOLD" : "radio butonu ekle",
    "EDIT_REMOVE_RADIO"   : "Radio butonunu ekle / düzenle",
    "NO_RADIO_ADD_NEW"    : "radio butonu yok : yeni buton ekle",
    
    "SEARCH_4_OPTION"     : "seçenek ara",
    
    "ADD"                 : "ekle",
    "ORDER"               : "sıra",
    "OPTION"              : "seçenek",
    "GROUP"               : "grup",
    
    "ADD_NEW_OPTIONS"     : "Yeni seçenek ekle",
    "ADD_A_NEW_OPTION"    : "yeni seçenek ekle",
    "EDIT_REMOVE_OPTIONS" : "Seçenekleri düzenle/sil",
    "NO_OPTION_ADD_NEW"   : "seçenek yok : yeni seçenek ekle",
    
    "ADD_NEW_GROUPS"      : "Yeni grup ekle",
    "ADD_A_NEW_GROUP"     : "Yeni grup ekle",
    "EDIT_GROUPS_OPTIONS" : "Seçenek/Grup Ekle/sil",
    "NO_GROUP_ADD_NEW"    : "yeni grup ekle",
    
    "OK"                  : "TAMAM",
    "CANCEL"              : "İptal"
});
}]);

/**
 *  ------------------------------------------------------
 *  module core : injects core "non app modules"
 *  ------------------------------------------------------
 *
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

(function(){
	'use strict';
	
	angular
		.module('eda.easyFormSteWayConfigProvider', [])
		.provider('easyFormSteWayConfig', easyFormSteWayConfigFct);
		
		easyFormSteWayConfigFct.$inject = ['$translateProvider'];
		
		function easyFormSteWayConfigFct($translateProvider){
			var _configuration 					= defaultConfig();
			var _controlsList						= controlsList();
			var _defaultLanguage				= getDefaultLanguage();
			var _currentLanguage				= initDefaultLanguage();
			var _showPreviewPanel				= getDefaultshowPreviewPanel();
			var _showPreviewModels			= getDefaultShowPreviewModel();
			/* jshint validthis:true */
			this.$get 									= easyFormSteWayConfig;
			this.setModalAnimation 			= setModalAnimation;
			this.getModalAnimation			= getModalAnimation;
			this.configuration 					= _configuration;
			this.getEnabledControls 		= getEnabledControls;
			this.disableControl					= disableControl;
			this.enableControl					= enableControl;
			this.setLanguage						= setLanguage;
			this.getCurrentLanguage			= getCurrentLanguage;
			this.showPreviewPanel				= showPreviewPanel;
			this.showPreviewModels			= showPreviewModels;
    	
		
			
		
			//set default config
			function defaultConfig(){
				var _defaultConfiguration = {
					modalAnimated : false
				};
				return _defaultConfiguration;
			}
			
			//show preview panel by default
			function getDefaultshowPreviewPanel(){
			 	return true;
			}
			
			//show preview data, fields models in preview panel
			function getDefaultShowPreviewModel(){
				return true;
			}
		
			function controlsList(){
				var controls = [
					{name: 'empty', 					enabled: true},
					{name: 'Header', 					enabled: true},
					{name: 'Subtitle', 				enabled: true},
					{name: 'TextInput', 			enabled: true},
					{name: 'Password', 				enabled: true},
					{name: 'Date', 						enabled: true},
					{name: 'Texarea',	 				enabled: true},
					{name: 'RichTextEditor', 	enabled: true},
					{name: 'Radio', 					enabled: true},
					{name: 'Checkbox', 				enabled: true},
					{name: 'BasicSelect', 		enabled: true},
					{name: 'GroupedSelect', 	enabled: true}
				];
					
				return controls;
			}
			
			function setModalAnimation(flagConfig){
				var valueToApply = (flagConfig === true) ? 
														  flagConfig  
														: (flagConfig === false ? 
															  flagConfig 
															: _configuration.modalAnimated);
																	
				_configuration.modalAnimated = valueToApply;
			}

			function getModalAnimation(){																	
				return _configuration.modalAnimated;
			}		
			
			
			function getEnabledControls(){
				return _controlsList;
			}
			
			
			
			function disableControl(controlName){
				if (angular.isString(controlName)) {
					angular.forEach(_controlsList, function(aControl){
						
						if (aControl.name === controlName) {
							aControl.enabled = false;
						}
						
					});						
				}
			}
			
			function showPreviewPanel(wantToShow){
				if (angular.isDefined(wantToShow)) {
					if(wantToShow === true) 	_showPreviewPanel 	= true;
					if(wantToShow === false) 	_showPreviewPanel 	= false;
				}
			}
			
			function showPreviewModels(wantToShow){
				if (angular.isDefined(wantToShow)) {
					if(wantToShow === true) 	_showPreviewModels 	= true;
					if(wantToShow === false) 	_showPreviewModels 	= false;
				}				
			}
			
			function enableControl(controlName){
				if (angular.isString(controlName)) {
					angular.forEach(_controlsList, function(aControl){
						if (aControl.name === controlName) {
							aControl.enabled = true;
						}
					});						
				}				
			}
			
		
			function getDefaultLanguage(){
				var lang = 'en';
				return lang;
			}
			
			function initDefaultLanguage(){
  			$translateProvider.useSanitizeValueStrategy('escape'); 	//security : Enable escaping of HTML
				$translateProvider.fallbackLanguage(_defaultLanguage);	//fallback language to default language
				$translateProvider.preferredLanguage(_defaultLanguage);
				return _defaultLanguage;
			}			
			
			
			function setDefaultLanguage(){
				_currentLanguage = _defaultLanguage;
				$translateProvider.preferredLanguage(_currentLanguage);
				return _currentLanguage;
			}
			
			function setLanguage(language){				
				if (angular.isString(language)) {
					_currentLanguage = language;
					$translateProvider.preferredLanguage(language);
				}else{
					setDefaultLanguage();
				}
			}
			
			function getCurrentLanguage(){
				 return _currentLanguage;
			}
				
		
			//$get implementation :
			easyFormSteWayConfig.$inject = ['$translate'];
			function easyFormSteWayConfig($translate){
													
				var service = {
					setModalAnimation 			: setModalAnimationFct,
					getModalAnimationValue 	: getModalAnimationValue,
					getListEnabledControl		: getListEnabledControl,
					setLanguage 						: switchLanguage,
					getCurrentLanguage			: getCurrentLanguage,
					isPreviewPanelVisible		: isPreviewPanelVisible,
					arePreviewModelsVisible	: arePreviewModelsVisible
 					
				};
				return service;
				
				
				function getModalAnimationValue(){
					return _configuration.modalAnimated;
				}				
				
				function setModalAnimationFct(value){
					setModalAnimation(value);
				}
				
				function getListEnabledControl(){
					return angular.copy(_controlsList);
				}
				
				function isPreviewPanelVisible(){
					return _showPreviewPanel;
				}
				
				function arePreviewModelsVisible(){
					return _showPreviewModels;
				}	
				
										
				function switchLanguage(language){
					if (angular.isString(language)) {
						_currentLanguage = language;
						$translate.use(language);
					}else{
						setDefaultLanguage();
					}
				}				
				

				
			}
		
		}
		
		
		
})();
/**
 *  ------------------------------------------------------
 *  controllers container
 *  ------------------------------------------------------
 *
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
(function () {
	'use strict';


	angular.module('ngwfApp.controllers', [	
																				'ngwfApp.controllers.ngwfMainController',
																				'ngwfApp.controllers.ngwfWfEditController',
																				'ngwfApp.controllers.ngwfWfEditMODALController'
																				]
								);

})(); 


/**
 *  ------------------------------------------------------
 *  module = "controller" main controller
 *  ------------------------------------------------------
 *
 *
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

;(function () {
	'use strict';

	angular
		.module('ngwfApp.controllers.ngwfMainController', [])
		.controller('ngwfMainController', ngwfMainController);

		ngwfMainController.$inject = ['$scope', '$timeout'];
		function ngwfMainController($scope, $timeout){
			
			$scope.FormNameAsTest = 'initial_name';
			
			$timeout(function(){
				$scope.FormNameAsTest = 'name changed after 3s';
			}, 3000);
		}

})(); 


/**
 *  ------------------------------------------------------
 *  module = "controller" edit controller
 *  ------------------------------------------------------
 *
 * Main controller :
 * 
 *  - configuration model : fields model database friendly
 *  - formlymodel : fields model bound to formly directive (not database freindly)
 *  - vm.model : data model (database friendly)
 *
 * if you want more details on how to save to data base :
 *
 * http://www.erwan-datin.com/tips/how-do-I-store-angular-formly-fields-model-into-database
 *
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

(function () {

  'use strict';

  angular
    .module('ngwfApp.controllers.ngwfWfEditController', [])
    .controller('ngwfWfEditController', ngwfWfEditController);


    ngwfWfEditController.$inject = [
      '$scope', 
      '$templateCache',
      'easyFormGenVersion',
      '$filter',
      '$anchorScroll',
      'toaster', 
      '$timeout',
      '$modal',
      '$log', 
      'formFieldManage',
      'controllerModalProxy',
      'easyFormSteWayConfig'
    ];

    
    function ngwfWfEditController(
                                    $scope, 
                                    $templateCache,
                                    easyFormGenVersion,
                                    $filter,
                                    $anchorScroll,
                                    toaster,
                                    $timeout, 
                                    $modal,
                                    $log, 
                                    formFieldManage, 
                                    controllerModalProxy,
                                    easyFormSteWayConfig
                                    ){
      /*jshint validthis: true */
      $scope.vm                       = this;
      $scope.vm.model                 = {};
      $scope.vm.wfFormFields          = [];
      $scope.vm.wfFormFieldsOnlyNeededProperties = []; 
      $scope.vm.onSubmit              = onSubmit;

      $scope.easyFormGeneratorVERSION = easyFormGenVersion;
      $scope.debug                    = initDebugModel();
      $scope.tab                      = initTabModel();

      //configuration model (contains array of lines which contains array of columns)
      $scope.configuration            = {};    
                               
      $scope.numberOfColumns          = 1;
      $scope.MaxNumberOfColumns       = 3;
      $scope.MinNumberOfColumns       = 1;
      $scope.columnTemplate           = initColumnTemplate();

      $scope.lineTemplate             = initLineTemplate();
      $scope.resetToZeroModel         = resetToZeroModel;
      $scope.countConfigurationModelLines = countConfigurationModelLines;
      $scope.setActiveLineNumber      = setActiveLineNumber;
      $scope.upThisLine               = upThisLine;
      $scope.downThisLine             = downThisLine;
      $scope.addNewline               = addNewline;
      $scope.removeThisLine           = removeThisLine;

      $scope.increaseNumberOfColumns  = increaseNumberOfColumns;
      $scope.decreaseNumberOfColumns  = decreaseNumberOfColumns;

      $scope.resetStepCounter         = resetStepCounter;
      $scope.nextConfigStep           = nextConfigStep;

      $scope.previousConfigStep       = previousConfigStep;
      $scope.stepReachable            = stepReachable;

      $scope.nyaSelect                = {};
      //angular bootstrap modal + angular 1.4 issue (backdrop won't disapear on close modal)
      //github issues here : https://github.com/angular-ui/bootstrap/issues/3633
      //-> disabling animation untill correction in angular bootstrap 
      //uses easyFormSteWayConfig provider to easily update setting : 
      $scope.animationsEnabled        = easyFormSteWayConfig.getModalAnimationValue();
      //call modal to edit selected control
      $scope.showModalAddCtrlToColumn = showModalAddCtrlToColumn;

      
      //disabled here : to load list of saved formly fields from database
      $scope.loadExistingFormsList    = loadExistingFormsAsList();
      $scope.formlyList               = {};
      $scope.previewLoadedForm        = { fieldsModel:[] };
      $scope.configurationLoaded      = {};   
      $scope.previewExistingform      = previewExistingform;
      $scope.saveThisForm             = saveThisForm; //should save to database (commented here)


   


      



      //load formlyList on init
      loadExistingFormsAsList();

      formFieldManage.initConfigurationEditFromScratch($scope.configuration);

      controllerModalProxy.initNyaSelect($scope.nyaSelect);



      function initDebugModel(){
        return {
         showDebug : false,
         configurationModelNumberofLines : 1        
        };
      }

      function initTabModel(){
        return {
          editTab : {active : true},
          previewTab : {active : false}
        };
      }

      function previewExistingform(formlyform){
       var configlines = JSON.parse(formlyform.formlyField);
       //here to replace with $scope.configuration : initialise configuration with lines 
       $scope.configurationLoaded = {};
       formFieldManage.bindConfigurationLines($scope.configurationLoaded,configlines);
       formFieldManage.applyConfigurationToformlyModel($scope.configurationLoaded, $scope.previewLoadedForm.fieldsModel, $scope.vm.model);
       $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);
       $scope.previewLoadedForm.cancelButtonText = formlyform.cancelButtonText;
       $scope.previewLoadedForm.submitButtonText = formlyform.submitButtonText;
      }    

      function onSubmit() {
        toaster.pop({
            type: 'info',
            timeout:2000,
            title: 'should save data model if it were not a static example',
            body: 'data :' + $filter('json')($scope.vm.model, 4),                
            showCloseButton: true
        }); 
      }
      
      function initColumnTemplate(){
        return  {
          numColumn: -1,
          exist:true, 
          control: {
            type:'none',
            key: 'none',
            subtype: 'none',
            // templateOptions: {
            //                     label: 'none',
            //                     placeholder: 'none',
            //                     required: false,
            //                     description: 'Descriptive text'
            //                   }
          }                                         
        };
      }

      function initLineTemplate(){
        return {
          line:-1, 
          activeColumn : 1,
          columns: [
            {  
              numColumn: 1,
              exist:true, 
              control: {
                type:'none',
                key: 'none',
                // templateOptions: {
                //                     label: 'none',
                //                     placeholder: 'none',
                //                     required: false,
                //                     description: 'Descriptive text'
                //                   }
                }
              }
            ]
        };
      }

      function resetToZeroModel(){
        $scope.configuration.activeLine = 1;
        if ($scope.configuration.lines.length > 1) {
          $scope.configuration.lines.splice(1, $scope.configuration.lines.length - 2);
        }
        return $scope.countConfigurationModelLines();
      }

      function countConfigurationModelLines(){
        //information in debug model
        $scope.debug.configurationModelNumberofLines = $scope.configuration.lines.length;
        return $scope.configuration.lines.length;
      }      

      function setActiveLineNumber(lineNumber){
        if (lineNumber <= $scope.countConfigurationModelLines()) {
          $scope.configuration.activeLine = lineNumber;
        }
      } 

      function upThisLine(indexLine){    
        if (indexLine > -1) {
          if ($scope.configuration.lines[indexLine - 1]) {
            var currentLineObj = $scope.configuration.lines[indexLine];
            $scope.configuration.lines.splice(indexLine , 1);
            $scope.configuration.lines.splice((indexLine - 1), 0, currentLineObj);    
            //manage selected aciveLine
            $scope.configuration.activeLine = 1;
          }
        }
          //re-render formfield 
        formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);
        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);     
      }  

      function downThisLine(indexLine){
        if (indexLine > -1) {
          if ($scope.configuration.lines[indexLine + 1]) {
            var currentLineObj = $scope.configuration.lines[indexLine];
            $scope.configuration.lines.splice(indexLine , 1);
            $scope.configuration.lines.splice((indexLine + 1), 0, currentLineObj);  
            //manage selected aciveLine
            $scope.configuration.activeLine = 1;
          }
        }     
        //re-render formfield 
        formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model); 
        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);   
      } 

      function addNewline(){
        $scope.configuration.lines.push(
          {
            line:-1, 
            activeColumn : 1,
            columns: [
                      {  
                        numColumn: 1,
                        exist:true, 
                        control: {
                                    type:'none',
                                    key: 'none',
                                    // templateOptions: {
                                    //                     label: 'none',
                                    //                     placeholder: 'none',
                                    //                     required: false,
                                    //                     description: 'Descriptive text'
                                    //                   }
                                  }
                        }
                      ]
            }
        );
          //re-render formfield 
        formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);
        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields); 
      }

      function removeThisLine(index){
        if (index > -1) {
          if ($scope.configuration.lines.length > 1) {
              //manage selected aciveLine
              if ($scope.configuration.activeLine === index + 1) {
                $scope.configuration.activeLine = 1;
              }
              $scope.configuration.lines.splice(index, 1);
          }else{
            $timeout(function(){
                toaster.pop({
                        type: 'warning',
                        title: 'Last line' ,
                        body: 'Can\'t delete the last line',                
                        showCloseButton: true
                  });
            }, 100); 
          }
        //re-render formfield 
        formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);
        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);
        }
      }

      function increaseNumberOfColumns(){
        if ($scope
              .configuration
              .lines[$scope.configuration.activeLine -1]
              .columns.length < $scope.MaxNumberOfColumns) {

          var newNumberOfColumns = $scope
                                      .configuration
                                      .lines[$scope.configuration.activeLine -1]
                                      .columns
                                      .push(
                                            {
                                              numColumn: -1,
                                              exist: true, 
                                              control: {
                                                          type:'none',
                                                          key: 'none'
                                                          // templateOptions: {
                                                          //                     label: 'none',
                                                          //                     placeholder: 'none',
                                                          //                     required: false,
                                                          //                     description: 'Descriptive text'
                                                          //                   }
                                                        }                                         
                                             }                                        
                                            );
          $scope
              .configuration
              .lines[$scope.configuration.activeLine -1]
              .columns[newNumberOfColumns - 1]
              .numColumn = newNumberOfColumns; 
          }
           //re-render formfield 
          formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model); 
          $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);
      }  

      function decreaseNumberOfColumns(){
        if ($scope
              .configuration
              .lines[$scope.configuration.activeLine -1]
              .columns.length > 1) {
          $scope.configuration
            .lines[$scope.configuration.activeLine -1]
            .columns
            .splice($scope.configuration.lines[$scope.configuration.activeLine -1].columns.length -1, 1);
        }
        //re-render formfield 
        formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);  

        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);  
      }  

      function resetStepCounter(){
        $scope.configuration.configStepCounter = 0;
      } 

      function nextConfigStep(){
        var configStepCounterMAX = $scope.configuration.listConfigStep.length -1;
        if ($scope.configuration.configStepCounter !== configStepCounterMAX) {
            $scope.configuration.configStepCounter ++;
        }    
        setTrueThisStepIndicator($scope.configuration.configStepCounter);
      }   

      function previousConfigStep(){
        if ($scope.configuration.configStepCounter !== 0) {
          $scope.configuration.configStepCounter --;
        }
        setTrueThisStepIndicator($scope.configuration.configStepCounter);
      }

      function stepReachable(indexStep){
        if (indexStep < $scope.configuration.configStepCounter) {
          return 'disabled';
        }else{
          return 'enabled';
        }
      } 

      function showModalAddCtrlToColumn(size, indexLine, numcolumn) {

        var modalInstance = $modal.open({
                                          animation: $scope.animationsEnabled,
                                          templateUrl: 'editModalTemplate.html',  
                                          controller: 'ngwfWfEditMODALController',
                                          size: 'lg',
                                          resolve: {
                                            nyaSelect: function () {                                              
                                              return controllerModalProxy
                                                        .getNyASelectFromSelectedLineColumn($scope.nyaSelect, $scope.configuration,indexLine, numcolumn);
                                            }
                                          }
        });

        modalInstance.result.then(function (modalAddCtrlModel) {
            controllerModalProxy.bindConfigurationModelFromModalReturn(indexLine, numcolumn, modalAddCtrlModel, $scope.configuration);
            formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);
            
            $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);

        }, function () {
          //$log.info('Modal dismissed at: ' + new Date());
        });
      } 

      /**
       * loadExistingFormsAsList :
       *  - LOAD from database (list of forms)
       */
      function loadExistingFormsAsList(){
        
      }
      /**
       * saveThisForm 
       * - SAVE to database (current stringified configuration model === current form)
       */
      function saveThisForm(){
        if (typeof $scope.configuration.formName === 'undefined') {
        toaster.pop({
                type: 'warning',
                timeout:2000,
                title: 'Form name is undefined',
                body: 'Form has not been saved.',                
                showCloseButton: true
          });
          return false;
        }
        if ($scope.configuration.formName === '') {
        toaster.pop({
                type: 'warning',
                timeout:2000,
                title: 'Form name is required',
                body: 'Form has not been saved.',                
                showCloseButton: true
          });
          return false;
        }
        toaster.pop({
                type: 'wait',
                timeout:10000,
                title: 'Form is being saved',
                body: 'Wait.',                
                showCloseButton: true
        });

       
        toaster.clear();  
        toaster.pop({
                type: 'info',
                timeout:2000,
                title: 'Form would be saved if it were not a static example',
                body: '',                
                showCloseButton: true
          }); 
        return true;
      } 




      function resetAllIndicators(){
        for (var i = $scope.configuration.stepIndicators.length - 1; i >= 0; i--) {
          $scope.configuration.stepIndicators[i] = false;
        }
      }
      
      function setTrueThisStepIndicator(indexIndicator){
          resetAllIndicators();
          $scope.configuration.stepIndicators[indexIndicator] = true;    
      }





    }


})(); 
/**
 *  ------------------------------------------------------
 *  module = "controller" modal controller
 *  ------------------------------------------------------
 *
 * edit control modal controller
 *
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

(function () {
  'use strict';


  angular
    .module('ngwfApp.controllers.ngwfWfEditMODALController', [])
    .controller('ngwfWfEditMODALController', ngwfWfEditMODALController);

    ngwfWfEditMODALController.$inject = [
      '$scope', 
      '$modalInstance',
      'nyaSelect',
      'toaster' ,
      '$timeout',
      'selectOptionManage',
      'controllerModalProxy',
    ];

    function ngwfWfEditMODALController( $scope, 
                                        $modalInstance, 
                                        nyaSelect, 
                                        toaster,
                                        $timeout,
                                        selectOptionManage,
                                        controllerModalProxy
                                      ){
      
      var initOptionModel = { rows:[] };

      $scope.radioRowCollection = initOptionModel;
      $scope.newOptionRadio     = {saisie: ''};

      $scope.addNewOptionRadio  = addNewOptionRadio;
      $scope.removeRadioRow     = removeRadioRow;
      $scope.upThisRadioRow     = upThisRadioRow;
      $scope.downThisRadioRow   = downThisRadioRow;

      $scope.basicSelectRowCollection = initOptionModel;
      $scope.newOptionBasicSelect     = {saisie: ''}; 
      $scope.addNewOptionBasicSelect  = addNewOptionBasicSelect;
      $scope.removeRow                = removeRow;
      $scope.upThisRow                = upThisRow;
      $scope.downThisRow              = downThisRow;

      $scope.groupedSelectRowCollection = initOptionModel;
      $scope.newOptionGroupedSelect     = {saisie: ''};
      $scope.GroupedSelectGroups        = { list:[] };
      $scope.newGroupGroupedSelect      = {saisie: ''};  
      $scope.groupSelectGroupClick      = {showList : false};
      $scope.showGroupListToChoose      = showGroupListToChoose;
      $scope.addNewGroupToGroupedSelect = addNewGroupToGroupedSelect;
      $scope.addNewOptionGroupedSelect  = addNewOptionGroupedSelect;
      $scope.removeGroupedSelectRow     = removeGroupedSelectRow;
      $scope.upThisGroupedSelectRow     = upThisGroupedSelectRow;
      $scope.downThisGroupedSelectRow   = downThisGroupedSelectRow;

      $scope.demodt         = {}; 
      $scope.today          = today;
      $scope.clear          = clear;
      $scope.open           = openfct;
      $scope.dateOptions    = dateOptionsInit(); 
      $scope.demodt.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];

      $scope.nyaSelect                  = nyaSelect ;
      $scope.nyaSelect.selectedControl  = $scope.nyaSelect.temporyConfig.selectedControl;
      $scope.selectThisControl          = selectThisControl;
      $scope.ok                         = okfct;
      $scope.cancel                     = cancelfct;
      $scope.nyaSelectFiltered          = {};



      //init today date
      today();
      //init nyaSelect model depending selected control
      initNyaSelectConformingSelectedControl();
    
      function initNyaSelectFiltered(){
        $scope.nyaSelectFiltered = {};
        var listCtrl = [].concat(controllerModalProxy.getFilteredNyaSelectObject());
        angular.extend($scope.nyaSelectFiltered,{
          'controls'        : listCtrl,
          'selectedControl' : $scope.nyaSelect.selectedControl,
          'temporyConfig'   : $scope.nyaSelect.temporyConfig 
        }); 
      }
    
    
    
      function addNewOptionRadio(){
        var result = selectOptionManage.addNewOptionRadio($scope.radioRowCollection, $scope.newOptionRadio.saisie);
        if (result.resultFlag === false) {
              toaster.pop({
                type: 'warning',
                timeout:2000,
                title: result.details,
                body: '\''+ $scope.newOptionRadio.saisie + '\'' + ' cannot be added.',                
                showCloseButton: true
          });
        }
        //reset input
        $scope.newOptionRadio = {saisie: ''};
      }

      function removeRadioRow(index) {
        var result = selectOptionManage.removeOption($scope.radioRowCollection, index);
        if (result.resultFlag === false) {
            toaster.pop({
              type: 'warning',
              timeout:2000,
              title: result.details,
              body: 'Delete was cancelled.',                
              showCloseButton: true
          });
        }      
      } 

      function upThisRadioRow(index){
        var result = selectOptionManage.upthisOption($scope.radioRowCollection, index);
        if (result.resultFlag === false) {
          toaster.pop({
            type: 'warning',
            timeout:2000,
            title: result.details,
            body: 'Operation cancelled.',                
            showCloseButton: true
          });
        }       
      }

      function downThisRadioRow(index){
        var result = selectOptionManage.downthisOption($scope.radioRowCollection, index);
        if (result.resultFlag === false) {
          toaster.pop({
            type: 'warning',
            timeout:2000,
            title: result.details,
            body: 'Operation cancelled.',                
            showCloseButton: true
          });
        }
      }

      function addNewOptionBasicSelect(){
        var result = selectOptionManage.addNewOptionBasicSelect($scope.basicSelectRowCollection, $scope.newOptionBasicSelect.saisie);
        if (result.resultFlag === false) {
          toaster.pop({
            type: 'warning',
            timeout:2000,
            title: result.details,
            body: '\''+ $scope.newOptionBasicSelect.saisie + '\'' + ' cannot be added.',                
            showCloseButton: true
          });
        }
        //reset input
        $scope.newOptionBasicSelect = {saisie: ''};
      }  

      function removeRow(index) {
        var result = selectOptionManage.removeOption($scope.basicSelectRowCollection, index);
        if (result.resultFlag === false) {
          toaster.pop({
            type: 'warning',
            timeout:2000,
            title: result.details,
            body: 'Delete was cancelled.',                
            showCloseButton: true
          });
        }      
      }   

      function upThisRow(index){
        var result = selectOptionManage.upthisOption($scope.basicSelectRowCollection, index);
        if (result.resultFlag === false) {
          toaster.pop({
            type: 'warning',
            timeout:2000,
            title: result.details,
            body: 'Operation cancelled.',                
            showCloseButton: true
          });
        }       
      }

      function downThisRow(index){
        var result = selectOptionManage.downthisOption($scope.basicSelectRowCollection, index);
        if (result.resultFlag === false) {
          toaster.pop({
            type: 'warning',
            timeout:2000,
            title: result.details,
            body: 'Operation cancelled.',                
            showCloseButton: true
          });
        }
      }

      function showGroupListToChoose(){
        $scope.groupSelectGroupClick.showList = !$scope.groupSelectGroupClick.showList;
      }

      function addNewGroupToGroupedSelect(){
        if ($scope.newGroupGroupedSelect.saisie !== '') {
          for (var i = $scope.GroupedSelectGroups.list.length - 1; i >= 0; i--) {
            if ($scope.GroupedSelectGroups.list[i] === $scope.newGroupGroupedSelect.saisie) {
              toaster.pop({
                type: 'warning',
                timeout:2000,
                title: 'Group already exists',
                body: 'No group added.',                
                showCloseButton: true
              });          
            }
          }
          $scope.GroupedSelectGroups.list.push($scope.newGroupGroupedSelect.saisie);
        }else{
          toaster.pop({
            type: 'warning',
            timeout:2000,
            title: 'Not a valid group to add',
            body: 'No group added.',                
            showCloseButton: true
          });
        }
        $scope.newGroupGroupedSelect.saisie = '';
      } 

      function addNewOptionGroupedSelect(){
        var result = selectOptionManage.addNewOptionGroupedSelect($scope.groupedSelectRowCollection, $scope.newOptionGroupedSelect.saisie, '');
        if (result.resultFlag === false) {
          toaster.pop({
            type: 'warning',
            timeout:2000,
            title: result.details,
            body: '\''+ $scope.newOptionGroupedSelect.saisie + '\'' + ' cannot be added.',                
            showCloseButton: true
          });
        }
        //bind nya : dont bind here $apply is not done fast enough
        //bindGroupedSelectToNya();
        //reset input
        $scope.newOptionGroupedSelect = {saisie: ''};
      }

      function removeGroupedSelectRow(index) {
        var result = selectOptionManage.removeOption($scope.groupedSelectRowCollection, index);
        if (result.resultFlag === false) {
          toaster.pop({
            type: 'warning',
            timeout:2000,
            title: result.details,
            body: 'Delete was cancelled.',                
            showCloseButton: true
          });
        }   
      }        

      function upThisGroupedSelectRow(index){
        var result = selectOptionManage.upthisOption($scope.groupedSelectRowCollection, index);
        if (result.resultFlag === false) {
          toaster.pop({
            type: 'warning',
            timeout:2000,
            title: result.details,
            body: 'Operation cancelled.',                
            showCloseButton: true
          });
        } 
      }

      function downThisGroupedSelectRow(index){
        var result = selectOptionManage.downthisOption($scope.groupedSelectRowCollection, index);
        if (result.resultFlag === false) {
          toaster.pop({
            type: 'warning',
            timeout:2000,
            title: result.details,
            body: 'Operation cancelled.',                
            showCloseButton: true
          });
        } 
      }

      function today() {
        $scope.demodt.dt = new Date();
      } 

      function clear() {
        $scope.demodt.dt = null;
      } 

      function openfct($event){
        $event.preventDefault();
        $event.stopPropagation();
        $scope.demodt.opened = true;
      }

      function dateOptionsInit(){
        return  {
          formatYear: 'yy',
          startingDay: 1,
          showWeeks: true,
          initDate: null
        };
      }


      function selectThisControl(controlName){
        $scope.nyaSelect.selectedControl = 'none';
        resetTemporyConfig();

        for (var i = $scope.nyaSelect.controls.length - 1; i >= 0; i--) {
          if ($scope.nyaSelect.controls[i].id === controlName) {
            $scope.nyaSelect.selectedControl = $scope.nyaSelect.controls[i].id;         
          }
        }

        if ($scope.nyaSelect.selectedControl === 'Date') {
          initDatePicker();
        }
      }  



      function okfct() {
        if ($scope.nyaSelect.selectedControl === 'BasicSelect') {
          bindBasicSelectToNya();
        }
        if ($scope.nyaSelect.selectedControl === 'GroupedSelect') {
          bindGroupedSelectToNya();
        }  
        if ($scope.nyaSelect.selectedControl === 'Radio') {
          bindRadioToNya();
        }  
        //save config to control
        controllerModalProxy.applyConfigToSelectedControl($scope.nyaSelect);
        //return current model to parent controller :
        $modalInstance.close($scope.nyaSelect);
      }

      function cancelfct() {
        $modalInstance.dismiss('cancel');
      }    







      function bindRadioFromNYA(){
        if ($scope.nyaSelect.temporyConfig.formlyOptions.length > 0) {
          for (var i = 0; i <= $scope.nyaSelect.temporyConfig.formlyOptions.length-1; i++){
            var newOption = {
                'option': $scope.nyaSelect.temporyConfig.formlyOptions[i].name,
                'order': i,
                'group': ''
            };
            $scope.radioRowCollection.rows.push(newOption);
          }    
        }
      }

      function bindRadioToNya(){
        var resetNyASelectOptions = [];
        $scope.nyaSelect.temporyConfig.formlyOptions = resetNyASelectOptions;
        if ($scope.radioRowCollection.rows.length > 0) {
          for (var i = 0; i <= $scope.radioRowCollection.rows.length - 1; i++){
                var newOption = {
                  'name': $scope.radioRowCollection.rows[i].option,
                  'value': i,
                  'group': ''
                };
                $scope.nyaSelect.temporyConfig.formlyOptions.push(newOption);   
            }       
       }
      }

      function bindBasicSelectFromNYA(){
        if ($scope.nyaSelect.temporyConfig.formlyOptions.length > 0) {
          for (var i = 0; i <= $scope.nyaSelect.temporyConfig.formlyOptions.length-1; i++){
            var newOption = {
              'option': $scope.nyaSelect.temporyConfig.formlyOptions[i].name,
              'order': i,
              'group': ''
            };
            $scope.basicSelectRowCollection.rows.push(newOption);
          }    
        }
      }

      function bindBasicSelectToNya(){
        var resetNyASelectOptions = [];
        $scope.nyaSelect.temporyConfig.formlyOptions = resetNyASelectOptions;
        if ($scope.basicSelectRowCollection.rows.length > 0) {
          for (var i = 0; i <= $scope.basicSelectRowCollection.rows.length - 1; i++){
            var newOption = {
              'name': $scope.basicSelectRowCollection.rows[i].option,
              'value': i,
              'group': ''
            };
            $scope.nyaSelect.temporyConfig.formlyOptions.push(newOption);
          }      
        }
      } 

      function bindGroupedSelectFromNYA(){
        if ($scope.nyaSelect.temporyConfig.formlyOptions.length > 0) {
          for (var i = 0; i <= $scope.nyaSelect.temporyConfig.formlyOptions.length-1; i++){
            var newOption = {
              'option': $scope.nyaSelect.temporyConfig.formlyOptions[i].name,
              'order': i,
              'group': $scope.nyaSelect.temporyConfig.formlyOptions[i].group
            };
            $scope.groupedSelectRowCollection.rows.push(newOption);            
          }
          //grouplist : thx to lodash it is easy
          var filteredgroup = _.uniq(_.pluck($scope.groupedSelectRowCollection.rows, 'group'));
          angular.copy(filteredgroup, $scope.GroupedSelectGroups.list); 
        }
      }

      function bindGroupedSelectToNya(){
        $scope.nyaSelect.temporyConfig.formlyOptions = [];
        for (var i = 0; i <= $scope.groupedSelectRowCollection.rows.length - 1; i++){
          var newOption = {
            'name': $scope.groupedSelectRowCollection.rows[i].option,
            'value': i,
            'group': $scope.groupedSelectRowCollection.rows[i].group
          };
          $scope.nyaSelect.temporyConfig.formlyOptions.push(newOption);  
        }
      } 

      function initDatePicker(){
        $scope.nyaSelect.temporyConfig.datepickerPopup = $scope.demodt.formats[0];  
      }    

      function initNyaSelectConformingSelectedControl(){
        //place nya-select to selection if not none :
        //$scope.modelNyaSelect = nyaSelect.controls[0];
        
        
        if (nyaSelect.selectedControl !== 'none') {
          for (var i = $scope.nyaSelect.controls.length - 1; i >= 0; i--) {
             if ($scope.nyaSelect.controls[i].id === nyaSelect.selectedControl) {
                $scope.modelNyaSelect = nyaSelect.controls[i];
             }
          }
          if ($scope.nyaSelect.selectedControl === 'BasicSelect') {
            bindBasicSelectFromNYA();
          }
          if ($scope.nyaSelect.selectedControl === 'GroupedSelect') {
            bindGroupedSelectFromNYA();
          } 
          if ($scope.nyaSelect.selectedControl === 'Radio') {
            bindRadioFromNYA();
          }    
        }
        initNyaSelectFiltered();
      }

      // //OLD
      // function resetTemporyConfig(){
      //   $scope.nyaSelect.temporyConfig = {
      //     formlyLabel: '', 
      //     formlyRequired: false, 
      //     formlyPlaceholder: '',
      //     formlyDesciption: '',
      //     formlyOptions: []
      //   };   
      // }

      function resetTemporyConfig(){
        $scope.nyaSelectFiltered.temporyConfig = {
          formlyLabel: '', 
          formlyRequired: false, 
          formlyPlaceholder: '',
          formlyDesciption: '',
          formlyOptions: []
        };   
      }

    }


})(); 
/**
 *  ------------------------------------------------------
 *  easy form generator directive (Step way)
 *  ------------------------------------------------------
 * 
 *  all easy form generator embeded in a directive
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
;(function(){
	'use strict';
	
	angular
		.module('ngwfApp.directives.edaStepWayEasyFormGenDirective', [])
		.directive('edaStepWayEasyFormGen', edaStepWayEasyFormGen);
		
		edaStepWayEasyFormGen.$inject = [
      '$templateCache', 
      '$timeout', 
      'formFieldManage',
      'controllerModalProxy'];
		
		function edaStepWayEasyFormGen(
      $templateCache, 
      $timeout, 
      formFieldManage,
      controllerModalProxy){
      
      /**
       * directive's controller injection is here (before return directive) = to avoid minification errors
       * sad but true... -> this reminds me something?!
       */
      edaStepWayEasyFormGenCtrl.$inject = [
        "$scope", 
        '$templateCache',
        'easyFormGenVersion',
        '$filter',
        '$anchorScroll',
        'toaster', 
        '$timeout',
        '$modal',
        '$log', 
        'formFieldManage',
        'controllerModalProxy',
        'easyFormSteWayConfig'
      ];
      
      
			var directive = {
				restrict : 'E',
				scope : {
          edaEasyFormGeneratorModel : '=',
          edaSaveFormEvent          : '&edaSaveFormEvent'
        },
				controller : edaStepWayEasyFormGenCtrl,
				controllerAs : 'vm',
				//bindToController : true, //angular < 1.4, activating this property will break databindings
				replace : false,
				templateUrl : 'edaStepWayEasyFormGeneratorTemplate.html',
				link : linkFct
			};
			return directive;
			
			function linkFct(scope, element, attrs){
              
          //watch "scope.easyFormGeneratorModel"
          scope.$watch(watchEdaEasyFormModelExpression, 
            watchEdaEasyFormModelHasChanged, 
            true);          
         
          //watch "scope.returnSaveEvent"" = catch saving form event  
					scope.$watch(watchReturnSaveEventExpression, 
           watchReturnSaveEventhasChanged);	
          
          
          
          
          
          
          
          
          
          
          function returnAttributeConfigurationLinesIfNotEmpty(){
            var edaEasyFormGeneratorModelToReturn = (
                angular.isArray(scope.edaEasyFormGeneratorModel.edaFieldsModel) ?  ( 
                    scope.edaEasyFormGeneratorModel.edaFieldsModel.length > 0 ? 
                      scope.edaEasyFormGeneratorModel.edaFieldsModel 
                    : emptyEdaFieldsModel()
                    ) 
                : emptyEdaFieldsModel()
            );
             return edaEasyFormGeneratorModelToReturn;  
          }
          
          /**
           * empty fields model : to display at least an empty line
           * otherwise would look like ugly empty line like it were a bug
           */
					function emptyEdaFieldsModel(){
						var emptyModel = [
							{
								"line": 1,
								"activeColumn": 1,
								"columns": [
									{
										"numColumn": 1,
										"exist": true,
										"control": {
											"type": "none",
											"key": "none"
										}
									}
								]
							}
						];
						return emptyModel;
					}
          
          function returnAttributeDataModelIfNotEmpty(){
            var dataModelToReturn = (
                angular.isArray(scope.edaEasyFormGeneratorModel.dataModel)   ?  ( 
                    scope.edaEasyFormGeneratorModel.dataModel.length > 0 ? 
                    scope.edaEasyFormGeneratorModel.dataModel 
                    : []
                   ) 
                : []
            );
             return dataModelToReturn;  
          }          
          
          function watchEdaEasyFormModelExpression(){
            return scope.edaEasyFormGeneratorModel;
          }
          
          function watchEdaEasyFormModelHasChanged(newValue, oldValue){             
            loadExistingConfigurationModel();          
          }          
        
        
        
          function watchReturnSaveEventExpression(){
            return scope.returnSaveEvent;
          }
          
          function watchReturnSaveEventhasChanged(newValue, oldValue){
            if (newValue === true) {
              var _easyFormGeneratorModel = {
                formName          : scope.configuration.formName,
                btnSubmitText     : scope.configuration.submitButtonText,
                btnCancelText     : scope.configuration.cancelButtonText,
                edaFieldsModel    : scope.configuration.lines,
                //just as test
                
                edaFieldsModelStringified : angular.toJson(scope.configuration.lines),
                
                formlyFieldsModel : scope.vm.wfFormFieldsOnlyNeededProperties,
                dataModel         : scope.vm.model
              };
              scope.edaSaveFormEvent({
                edaEasyFormGeneratorModel      : _easyFormGeneratorModel
              });
              //back to false, waiting next save event
              scope.returnSaveEvent = false;
            }            
			   }          
          
          
        function loadExistingConfigurationModel(){
          
          if(angular.isDefined(scope.edaEasyFormGeneratorModel)){
            var configlines           = returnAttributeConfigurationLinesIfNotEmpty();           
            scope.configurationLoaded = {};
            
            formFieldManage.bindConfigurationLines(scope.configurationLoaded,configlines);
            /**
             * rebind special control properties :
             * 
             * formly expression properties
             * Validators
             * Validation
             */
            controllerModalProxy.refreshControlFormlyExpressionProperties(scope.configurationLoaded);
            controllerModalProxy.refreshControlFormlyValidators(scope.configurationLoaded);
            controllerModalProxy.refreshControlFormlyValidation(scope.configurationLoaded);
            
            //apply configuration model
            scope.configuration = angular.copy(scope.configurationLoaded);
            
            //apply formly model
            formFieldManage.applyConfigurationToformlyModel(scope.configurationLoaded, scope.vm.wfFormFields, scope.vm.model);          
            
            scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy(scope.vm.wfFormFields);
            scope.vm.model                            = returnAttributeDataModelIfNotEmpty();  
            scope.configuration.formName              = angular.isString(scope.edaEasyFormGeneratorModel.formName) ? scope.edaEasyFormGeneratorModel.formName : '';
            scope.configuration.submitButtonText      = angular.isString(scope.edaEasyFormGeneratorModel.btnSubmitText) ? scope.edaEasyFormGeneratorModel.btnSubmitText : 'Submit'; 
            scope.configuration.cancelButtonText      = angular.isString(scope.edaEasyFormGeneratorModel.btnCancelText) ? scope.edaEasyFormGeneratorModel.btnCancelText : 'Cancel';
          }  
        } 
         
         
          
          
          
          
          
          
                   
			}
			    
    function edaStepWayEasyFormGenCtrl(
                                    $scope, 
                                    $templateCache,
                                    easyFormGenVersion,
                                    $filter,
                                    $anchorScroll,
                                    toaster,
                                    $timeout, 
                                    $modal,
                                    $log, 
                                    formFieldManage,  
                                    controllerModalProxy,
                                    easyFormSteWayConfig
                                    ){
      /*jshint validthis: true */
      $scope.vm                       = this;
      $scope.vm.model                 = {};
      $scope.vm.wfFormFields          = [];
      $scope.vm.wfFormFieldsOnlyNeededProperties = []; 
      $scope.vm.onSubmit              = onSubmit;

      $scope.easyFormGeneratorVERSION = easyFormGenVersion;
      $scope.debug                    = initDebugModel();
      $scope.tab                      = initTabModel();

      //configuration model (contains array of lines which contains array of columns)
      $scope.configuration            = {};    
                               
      $scope.numberOfColumns          = 1;
      $scope.MaxNumberOfColumns       = 3;
      $scope.MinNumberOfColumns       = 1;
      $scope.columnTemplate           = initColumnTemplate();

      $scope.lineTemplate             = initLineTemplate();
      $scope.resetToZeroModel         = resetToZeroModel;
      $scope.countConfigurationModelLines = countConfigurationModelLines;
      $scope.setActiveLineNumber      = setActiveLineNumber;
      $scope.upThisLine               = upThisLine;
      $scope.downThisLine             = downThisLine;
      $scope.addNewline               = addNewline;
      $scope.removeThisLine           = removeThisLine;

      $scope.increaseNumberOfColumns  = increaseNumberOfColumns;
      $scope.decreaseNumberOfColumns  = decreaseNumberOfColumns;

      $scope.resetStepCounter         = resetStepCounter;
      $scope.nextConfigStep           = nextConfigStep;

      $scope.previousConfigStep       = previousConfigStep;
      $scope.stepReachable            = stepReachable;

      //$scope.toggleAnimation          = toggleAnimation;

      $scope.nyaSelect                = {};
      //angular bootstrap modal + angular 1.4 issue (backdrop won't disapear on close modal)
      //github issues here : https://github.com/angular-ui/bootstrap/issues/3633
      //-> disabling animation untill correction in angular bootstrap 
      $scope.animationsEnabled        = easyFormSteWayConfig.getModalAnimationValue();
      //call modal to edit selected control
      $scope.showModalAddCtrlToColumn = showModalAddCtrlToColumn;

      
      $scope.formlyList               = {};
      $scope.previewLoadedForm        = { fieldsModel:[] };
      $scope.configurationLoaded      = {};   
      $scope.previewExistingform      = previewExistingform;
      $scope.saveThisForm             = saveThisForm; //should save to database (commented here)
      $scope.returnSaveEvent          = false;
      
     


   


      

      formFieldManage.initConfigurationEditFromScratch($scope.configuration);

      controllerModalProxy.initNyaSelect($scope.nyaSelect);



      function initDebugModel(){
        return {
         showDebug : false,
         configurationModelNumberofLines : 1        
        };
      }

      function initTabModel(){
        var _tabInitialized = {
          
          editTab     : {
            active : true
          },
          
          previewTab  : {
            active        : false,  
            tabVisible    : easyFormSteWayConfig.isPreviewPanelVisible(),
            modelsVisible : easyFormSteWayConfig.arePreviewModelsVisible()
           }
           
        };
        return _tabInitialized;
      }

      function previewExistingform(formlyform){
       var configlines = JSON.parse(formlyform.formlyField);
       //here to replace with $scope.configuration : initialise configuration with lines 
       $scope.configurationLoaded = {};
       formFieldManage.bindConfigurationLines($scope.configurationLoaded,configlines);
       formFieldManage.applyConfigurationToformlyModel($scope.configurationLoaded, $scope.previewLoadedForm.fieldsModel, $scope.vm.model);
       $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);
       $scope.previewLoadedForm.cancelButtonText = formlyform.cancelButtonText;
       $scope.previewLoadedForm.submitButtonText = formlyform.submitButtonText;
      }    

      function onSubmit() {
        toaster.pop({
            type: 'info',
            timeout:2000,
            title: 'should save data model if it were not a static example',
            body: 'data :' + $filter('json')($scope.vm.model, 4),                
            showCloseButton: true
        }); 
      }
      
      function initColumnTemplate(){
        return  {
          numColumn: -1,
          exist:true, 
          control: {
            type:'none',
            key: 'none',
            subtype: 'none',
            // templateOptions: {
            //                     label: 'none',
            //                     placeholder: 'none',
            //                     required: false,
            //                     description: 'Descriptive text'
            //                   }
          }                                         
        };
      }

      function initLineTemplate(){
        return {
          line:-1, 
          activeColumn : 1,
          columns: [
            {  
              numColumn: 1,
              exist:true, 
              control: {
                type:'none',
                key: 'none',
                // templateOptions: {
                //                     label: 'none',
                //                     placeholder: 'none',
                //                     required: false,
                //                     description: 'Descriptive text'
                //                   }
                }
              }
            ]
        };
      }

      function resetToZeroModel(){
        $scope.configuration.activeLine = 1;
        if ($scope.configuration.lines.length > 1) {
          $scope.configuration.lines.splice(1, $scope.configuration.lines.length - 2);
        }
        return $scope.countConfigurationModelLines();
      }

      function countConfigurationModelLines(){
        //information in debug model
        $scope.debug.configurationModelNumberofLines = $scope.configuration.lines.length;
        return $scope.configuration.lines.length;
      }      

      function setActiveLineNumber(lineNumber){
        if (lineNumber <= $scope.countConfigurationModelLines()) {
          $scope.configuration.activeLine = lineNumber;
        }
      } 

      function upThisLine(indexLine){    
        if (indexLine > -1) {
          if ($scope.configuration.lines[indexLine - 1]) {
            var currentLineObj = $scope.configuration.lines[indexLine];
            $scope.configuration.lines.splice(indexLine , 1);
            $scope.configuration.lines.splice((indexLine - 1), 0, currentLineObj);    
            //manage selected aciveLine
            $scope.configuration.activeLine = 1;
          }
        }
          //re-render formfield 
        formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);
        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);     
      }  

      function downThisLine(indexLine){
        if (indexLine > -1) {
          if ($scope.configuration.lines[indexLine + 1]) {
            var currentLineObj = $scope.configuration.lines[indexLine];
            $scope.configuration.lines.splice(indexLine , 1);
            $scope.configuration.lines.splice((indexLine + 1), 0, currentLineObj);  
            //manage selected aciveLine
            $scope.configuration.activeLine = 1;
          }
        }     
        //re-render formfield 
        formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model); 
        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);   
      } 

      function addNewline(){
        $scope.configuration.lines.push(
          {
            line:-1, 
            activeColumn : 1,
            columns: [
                      {  
                        numColumn: 1,
                        exist:true, 
                        control: {
                                    type:'none',
                                    key: 'none',
                                    // templateOptions: {
                                    //                     label: 'none',
                                    //                     placeholder: 'none',
                                    //                     required: false,
                                    //                     description: 'Descriptive text'
                                    //                   }
                                  }
                        }
                      ]
            }
        );
          //re-render formfield 
        formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);
        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields); 
      }

      function removeThisLine(index){
        if (index > -1) {
          if ($scope.configuration.lines.length > 1) {
              //manage selected aciveLine
              if ($scope.configuration.activeLine === index + 1) {
                $scope.configuration.activeLine = 1;
              }
              $scope.configuration.lines.splice(index, 1);
          }else{
            $timeout(function(){
                toaster.pop({
                        type: 'warning',
                        title: 'Last line' ,
                        body: 'Can\'t delete the last line',                
                        showCloseButton: true
                  });
            }, 100); 
          }
        //re-render formfield 
        formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);
        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);
        }
      }

      function increaseNumberOfColumns(){
        if ($scope
              .configuration
              .lines[$scope.configuration.activeLine -1]
              .columns.length < $scope.MaxNumberOfColumns) {

          var newNumberOfColumns = $scope
                                      .configuration
                                      .lines[$scope.configuration.activeLine -1]
                                      .columns
                                      .push(
                                            {
                                              numColumn: -1,
                                              exist: true, 
                                              control: {
                                                          type:'none',
                                                          key: 'none'
                                                          // templateOptions: {
                                                          //                     label: 'none',
                                                          //                     placeholder: 'none',
                                                          //                     required: false,
                                                          //                     description: 'Descriptive text'
                                                          //                   }
                                                        }                                         
                                             }                                        
                                            );
          $scope
              .configuration
              .lines[$scope.configuration.activeLine -1]
              .columns[newNumberOfColumns - 1]
              .numColumn = newNumberOfColumns; 
          }
           //re-render formfield 
          formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model); 
          $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);
      }  

      function decreaseNumberOfColumns(){
        if ($scope
              .configuration
              .lines[$scope.configuration.activeLine -1]
              .columns.length > 1) {
          $scope.configuration
            .lines[$scope.configuration.activeLine -1]
            .columns
            .splice($scope.configuration.lines[$scope.configuration.activeLine -1].columns.length -1, 1);
        }
        //re-render formfield 
        formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);  

        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);  
      }  

      function resetStepCounter(){
        $scope.configuration.configStepCounter = 0;
      } 

      function nextConfigStep(){
        var configStepCounterMAX = $scope.configuration.listConfigStep.length -1;
        if ($scope.configuration.configStepCounter !== configStepCounterMAX) {
            $scope.configuration.configStepCounter ++;
        }    
        setTrueThisStepIndicator($scope.configuration.configStepCounter);
      }   

      function previousConfigStep(){
        if ($scope.configuration.configStepCounter !== 0) {
          $scope.configuration.configStepCounter --;
        }
        setTrueThisStepIndicator($scope.configuration.configStepCounter);
      }

      function stepReachable(indexStep){
        if (indexStep < $scope.configuration.configStepCounter) {
          return 'disabled';
        }else{
          return 'enabled';
        }
      } 

      function showModalAddCtrlToColumn(size, indexLine, numcolumn) {

        var modalInstance = $modal.open({
                                          animation: $scope.animationsEnabled,
                                          templateUrl: 'editModalTemplate.html',  
                                          controller: 'ngwfWfEditMODALController',
                                          size: 'lg',
                                          resolve: {
                                            nyaSelect: function () {
                                              return controllerModalProxy
                                                        .getNyASelectFromSelectedLineColumn($scope.nyaSelect, $scope.configuration,indexLine, numcolumn);
                                            }
                                          }
        });

        modalInstance.result.then(function (modalAddCtrlModel) {
            controllerModalProxy.bindConfigurationModelFromModalReturn(indexLine, numcolumn, modalAddCtrlModel, $scope.configuration);
            formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);
            
            $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);

        }, function () {
          //$log.info('Modal dismissed at: ' + new Date());
        });
      } 

      /**
       * saveThisForm 
       * - SAVE to database (current stringified configuration model === current form)
       */
      function saveThisForm(){
        if (typeof $scope.configuration.formName === 'undefined') {
        toaster.pop({
                type: 'warning',
                timeout:2000,
                title: 'Form name is undefined',
                body: 'Form has not been saved.',                
                showCloseButton: true
          });
          return false;
        }
        if ($scope.configuration.formName === '') {
        toaster.pop({
                type: 'warning',
                timeout:2000,
                title: 'Form name is required',
                body: 'Form has not been saved.',                
                showCloseButton: true
          });
          return false;
        }
        toaster.pop({
                type: 'wait',
                timeout:10000,
                title: 'Form is being saved',
                body: 'Wait.',                
                showCloseButton: true
        });

       
        toaster.clear();  
        

        $scope.returnSaveEvent = true;
        return true;
      } 




      function resetAllIndicators(){
        for (var i = $scope.configuration.stepIndicators.length - 1; i >= 0; i--) {
          $scope.configuration.stepIndicators[i] = false;
        }
      }
      
      function setTrueThisStepIndicator(indexIndicator){
          resetAllIndicators();
          $scope.configuration.stepIndicators[indexIndicator] = true;    
      }

    }			
			
		}
		
})();

/**
 *  ------------------------------------------------------
 *  directives container
 *  ------------------------------------------------------
 *
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
;(function () {
	'use strict';
	
	angular
		.module('ngwfApp.directives', [	
			'ngwfApp.directives.ngwfStRatioDirective',
			'ngwfApp.directives.edaStepWayEasyFormGenDirective' 
			]);

})(); 



/**
 *  ------------------------------------------------------
 *  simple directive to set width style attribute in %
 *  ------------------------------------------------------
 *
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

;(function () {
	
	'use strict';

	angular
		.module('ngwfApp.directives.ngwfStRatioDirective', [])
		.directive('stRatio', stRatio);

		stRatio.$inject = [];
		function stRatio(){

			var directive = {
				link : linkfct
			};

			return directive;

			function linkfct(scope, element, attr){
				var ratio=+(attr.stRatio);
			  element.css('width',ratio+'%');
			}

		}

})(); 




/**
 *  ------------------------------------------------------
 *  service : controllerModalProxy
 *  ------------------------------------------------------
 *
 *  service dedicated to - edit control - (controller modal proxy)
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
(function () {
	'use strict';


	angular
		.module('ngwfApp.services.ngwfEditCtrlControllerModalProxy', [])
		.factory('controllerModalProxy', controllerModalProxy);

		controllerModalProxy.$inject = ['easyFormSteWayConfig'];
		function controllerModalProxy(easyFormSteWayConfig){
			
			var service = {
				initNyaSelect 													: initNyaSelect,
				getNyASelectFromSelectedLineColumn 			: getNyASelectFromSelectedLineColumn,
				bindConfigurationModelFromModalReturn 	: bindConfigurationModelFromModalReturn,
				applyConfigToSelectedControl 						: applyConfigToSelectedControl,
				resetTemporyConfig 											: resetTemporyConfig,
				getControlsDefinition 									: getControlsDefinition,
				refreshControlFormlyExpressionProperties: refreshControlFormlyExpressionProperties,
				refreshControlFormlyValidators					: refreshControlFormlyValidators,
				refreshControlFormlyValidation					: refreshControlFormlyValidation,
				getFilteredNyaSelectObject							: getFilteredNyaSelectObject
			};
			
			return service;


			function initNyaSelect(nyaSelectObj){
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
			function getControlsDefinition(){
				var controls = {};
				resetNyaSelect(controls);	
				return controls;
			}
			
			/**
			 * loading forms will not be able to retrieve formlyExpressionProperties
			 * -> here does the job
			 */
			function refreshControlFormlyExpressionProperties(configurationModel){
				
				if (angular.isObject(configurationModel)) {
					//iterates lines
					angular.forEach(configurationModel.lines, function(line, indexLine){
						angular.forEach(line.columns, function(column, controlIndex){
							var _controlsDefinition = getControlsDefinition();
							angular.forEach(_controlsDefinition.controls, function(aControl, aControlIndex){
								if (column.control.type === aControl.formlyType &&
										column.control.subtype === aControl.formlySubtype) {
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
			function refreshControlFormlyValidators(configurationModel){
				
				if (angular.isObject(configurationModel)) {
					//iterates lines
					angular.forEach(configurationModel.lines, function(line, indexLine){
						angular.forEach(line.columns, function(column, controlIndex){
							var _controlsDefinition = getControlsDefinition();
							angular.forEach(_controlsDefinition.controls, function(aControl, aControlIndex){
								if (column.control.type === aControl.formlyType &&
										column.control.subtype === aControl.formlySubtype) {
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
			function refreshControlFormlyValidation(configurationModel){
			
				if (angular.isObject(configurationModel)) {
					//iterates lines
					angular.forEach(configurationModel.lines, function(line, indexLine){
						angular.forEach(line.columns, function(column, controlIndex){
							var _controlsDefinition = getControlsDefinition();
							angular.forEach(_controlsDefinition.controls, function(aControl, aControlIndex){
								if (column.control.type === aControl.formlyType &&
										column.control.subtype === aControl.formlySubtype) {
										//----> update control formlyValidation property											
										column.control.formlyValidation = aControl.formlyValidation;
								}
							});		
						});
					});
				}					
				
			}

			
	    function getNyASelectFromSelectedLineColumn(nyaSelectObj, configurationObj, indexLine, numcolumn){
	      resetNyaSelect(nyaSelectObj);
	      /**
	       * data send to modal controller                                           
	       */
	      
	      if (typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions != 'undefined') {

	        nyaSelectObj.temporyConfig.selectedControl 		= typeof configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl 						!= 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl : 'none';
	        nyaSelectObj.temporyConfig.formlyLabel 				= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label 			!= 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label : '';
	        nyaSelectObj.temporyConfig.formlyRequired 		= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required 		!= 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required : '';
	        nyaSelectObj.temporyConfig.formlyDesciption 	= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description : '';
	        nyaSelectObj.temporyConfig.formlyPlaceholder 	= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder : '';
	        nyaSelectObj.temporyConfig.formlyOptions 			= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options 		!= 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options : '';
					
					nyaSelectObj.temporyConfig.formlyExpressionProperties = typeof configurationObj.lines[indexLine].columns[numcolumn].control.formlyExpressionProperties 	!= 'undefined' ? angular.copy(configurationObj.lines[indexLine].columns[numcolumn].control.formlyExpressionProperties) : {};
					nyaSelectObj.temporyConfig.formlyValidators 	= typeof configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidators 										!= 'undefined' ? angular.copy(configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidators) : {};
					nyaSelectObj.temporyConfig.formlyValidation 	= typeof configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidation 										!= 'undefined' ? angular.copy(configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidation) : {};
					
					/**
					 * particular case : datepicker 
					 */
	        if (nyaSelectObj.temporyConfig.selectedControl === 'Date') {
	        	nyaSelectObj.temporyConfig.datepickerPopup 	= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup : '';
	        }
	      }
	      return nyaSelectObj;	    	
	    }

	    function bindConfigurationModelFromModalReturn(indexLine, numcolumn, modalAddCtrlModel, configurationObj){
					      
	      var extractedProps = returnControlFromAddCtrlModalModel(modalAddCtrlModel);
	      configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl 		= extractedProps.selectedControl;
	      configurationObj.lines[indexLine].columns[numcolumn].control.type 							= extractedProps.formlyType;
	      configurationObj.lines[indexLine].columns[numcolumn].control.subtype 						= extractedProps.formlySubtype;
	      //reset templateOptions
	      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions 		= {
	                                                                                            label: '',
	                                                                                            required: false,
	                                                                                            description: '',
	                                                                                            placeholder: '',
	                                                                                            options: []
	                                                                                          };
	       //then bind templateOptions                                                                                   
	      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label 			 = extractedProps.formlyLabel;
	      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required 	 = extractedProps.formlyRequired;
	      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description = extractedProps.formlyDesciption;
	      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder = extractedProps.formlyPlaceholder;
	      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options 		 = extractedProps.formlyOptions;

	      configurationObj.lines[indexLine].columns[numcolumn].control.formlyExpressionProperties = angular.copy(extractedProps.formlyExpressionProperties);
	      configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidators 					= angular.copy(extractedProps.formlyValidators);
	      configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidation 					= angular.copy(extractedProps.formlyValidation);

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

	      if (validKeyUniqueness(newKey, configurationObj) === true){
	        configurationObj.lines[indexLine].columns[numcolumn].control.key = newKey;
	      }else{
	      	/**
	      	 * 2nd attempt 
	      	 */
	        newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();

	        if (validKeyUniqueness(newKey, configurationObj) === true){
	          configurationObj.lines[indexLine].columns[numcolumn].control.key = newKey;
	        }else{
	        	/**
	        	 * 2nd attempt 
	        	 */
	          newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();
	        }
	      }                                                                     
	    	configurationObj.lines[indexLine].columns[numcolumn].control.edited = true;
	  	}

	  	function applyConfigToSelectedControl(nyaSelectObj){
		  	/**
		  	 * used in modal (edit control) 
		  	 */
		    for (var i = nyaSelectObj.controls.length - 1; i >= 0; i--) {
		      if (nyaSelectObj.controls[i].id === nyaSelectObj.selectedControl) {

		          nyaSelectObj.controls[i].formlyLabel 								= nyaSelectObj.temporyConfig.formlyLabel;
		          nyaSelectObj.controls[i].formlyRequired 						= nyaSelectObj.temporyConfig.formlyRequired;
		          nyaSelectObj.controls[i].formlyDesciption 					= nyaSelectObj.temporyConfig.formlyDesciption;
		          nyaSelectObj.controls[i].formlyPlaceholder 					= nyaSelectObj.temporyConfig.formlyPlaceholder;
		          nyaSelectObj.controls[i].formlyOptions 							= nyaSelectObj.temporyConfig.formlyOptions;

		          if (nyaSelectObj.controls[i].id ==='Date' ) {
		          	nyaSelectObj.controls[i].datepickerPopup 					= nyaSelectObj.temporyConfig.datepickerPopup;
		          }
		        
		       }
		    }
		  }

		  function resetTemporyConfig(){
		    return {
	              formlyLabel: '', 
	              formlyRequired: false, 
	              formlyPlaceholder: '',
	              formlyDesciption: '',
	              formlyOptions: []
	            }; 		  	
		  }

	    /**
	     * return filtered list of controls object
	     */
			function getFilteredNyaSelectObject(){
		    var newNyaSelectObj = {

		                    controls : [
		                                {
		                                	id: 'empty',  
		                                	name: 'no control', 
		                                	subtitle: 'no control', 
		                                	group: 'Blank', 
		                                	formlyType: 'blank', 
		                                	formlySubtype: '', 
		                                	formlyLabel: '', 
		                                	formlyRequired: false, 
		                                	formlyDesciption: '', 
		                                	formlyOptions: [] , 
		                                	formlyExpressionProperties: {}, 
		                                	formlyValidators: {}, 
		                                	formlyValidation: {} 
		                                },

		                                {id: 'Header',  name: 'Header', subtitle: 'no control', group: 'Decoration', formlyType: 'header', formlySubtype: '', formlyLabel: '', formlyRequired: false, formlyDesciption: '', formlyOptions: [] , formlyExpressionProperties: {}, formlyValidators: {}, formlyValidation: {}},
		                                {id: 'Subtitle',  name: 'Subtitle', subtitle: 'no control', group: 'Decoration', formlyType: 'subTitle', formlySubtype: '', formlyLabel: '', formlyRequired: false, formlyDesciption: '', formlyOptions: [] , formlyExpressionProperties: {}, formlyValidators: {}, formlyValidation: {}},

		                                {
		                                	id: 'TextInput',  
		                                	name: 'Text input', 
		                                	subtitle: 'Text input', 
		                                	group: 'input', 
		                                	formlyType: 'input', 
		                                	formlySubtype: '', 
		                                	formlyLabel: '', 
		                                	formlyRequired: false, 
		                                	formlyDesciption: '', 
		                                	formlyOptions: [] , 
		                                	formlyExpressionProperties: {}, 
		                                	formlyValidators: {}, 
		                                	formlyValidation: {
						                                		          messages: {
																													            required: function(viewValue, modelValue, scope) {
																													              		//return a required validation message : 
																													              		//-> '<label as name> is required '
																													              		//-> or if not exists or empty just 'this field is required'
																													              		var defaultReturnMsg = 'this Text input field is required';
																													              		var returnMsg = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
																													              		return returnMsg;
																													            		}
						                                												}
		                                										}
		                                },

		                                {
		                                	id: 'Password',  
		                               	 	name: 'Password', 
		                                	subtitle: 'Password', 
		                                	group: 'input', 
		                                	formlyType: 'input', 
		                                	formlySubtype: 'password', 
		                                	formlyLabel: '', 
		                                	formlyRequired: false, 
		                                	formlyDesciption: '', 
		                                	formlyOptions: [] , 
		                                	formlyExpressionProperties: {}, 
		                                	formlyValidators: {}, 
	                                		formlyValidation: {
					                                		          messages: {
																												            required: function(viewValue, modelValue, scope) {
																												              		//return a required validation message : 
																												              		//-> '<label as name> is required '
																												              		//-> or if not exists or empty just 'this field is required'
																												              		var defaultReturnMsg = 'this Password field is required';
																												              		var returnMsg = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
																												              		return returnMsg;
																												            		}
					                                												}
	                                										}
		                              },
		                                
		                                {
		                                	id 													: 'Email',  
		                                	name 												: 'Email', 
		                                	subtitle 										: 'Email', 
		                                	group 											: 'input', 
		                                	formlyType									: 'input', 
		                                	formlySubtype 							: 'email', 
		                                	formlyLabel 								: '', 
		                                	formlyRequired 							: false, 
		                                	formlyDesciption 						: '', 
		                                	formlyOptions 							: [], 
		                                	formlyExpressionProperties 	: {}, 

		                                	formlyValidators 						: {
																	                                		emailShape : {
																																			            		expression : function(viewValue, modelValue) {
																																			              		var value = modelValue || viewValue;
																																			              		return /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/.test(value);
																																			            		},
																																			            		message: '$viewValue + \' is not a valid email\''
																																			          		}
																						                        },

		                                	formlyValidation: {
						                                		          messages: {
																													            required: function(viewValue, modelValue, scope) {
																													              		//return a required validation message : 
																													              		//-> '<label as name> is required '
																													              		//-> or if not exists or empty just 'this field is required'
																													              		
																													              		var defaultReturnMsg = 'this Email field is required';
																													              		var returnMsg = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
																													              		//check if validation is really dued to require validation 
																													              		//and not another validation like emailShape validator
																													              		if (scope.to.required) return returnMsg;
																													            		}
						                                												}
		                                										}
		                                },
		                                
		                                {
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
																													            required: function(viewValue, modelValue, scope) {
																													              		//return a required validation message : 
																													              		//-> '<label as name> is required '
																													              		//-> or if not exists or empty just 'this field is required'
																													              		var defaultReturnMsg = 'this Date field is required';
																													              		var returnMsg = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
																													              		return returnMsg;
																													            		}
						                                												}
		                                										}
		                                },

		                                {
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
																													            required: function(viewValue, modelValue, scope) {
																													              		//return a required validation message : 
																													              		//-> '<label as name> is required '
																													              		//-> or if not exists or empty just 'this field is required'
																													              		var defaultReturnMsg = 'this Textarea field is required';
																													              		var returnMsg = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
																													              		return returnMsg;
																													            		}
						                                												}
		                                										}
		                                },

		                                {
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
		   
		                                	formlyValidators 						: {},

		                                	formlyValidation: {
						                                		          messages: {
																													            required: function(viewValue, modelValue, scope) {
																													              		//return a required validation message : 
																													              		//-> '<label as name> is required '
																													              		//-> or if not exists or empty just 'this field is required'
																													              		var defaultReturnMsg = 'this RichTextEditor field is required';
																													              		var returnMsg = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
																													              		return returnMsg;
																													            		}
						                                												}
		                                										}
		                                },

		                                {
		                                	id: 'Radio', 
		                                	name: 'Radio', 
		                                	subtitle: 'Radio', 
		                                	options: [], 
		                                	group: 'Radio', 
		                                	formlyType: 'radio', 
		                                	formlySubtype: '', 
		                                	formlyLabel: '', 
		                                	formlyRequired: false, 
		                                	formlyDesciption: '' , 
		                                	formlyOptions: [], 
		                                	formlyExpressionProperties: {}, 
		                                	formlyValidators: {}, 
	                                		formlyValidation: {
					                                		          messages: {
																												            required: function(viewValue, modelValue, scope) {
																												              		//return a required validation message : 
																												              		//-> '<label as name> is required '
																												              		//-> or if not exists or empty just 'this field is required'
																												              		var defaultReturnMsg = 'this Password field is required';
																												              		var returnMsg = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
																												              		return returnMsg;
																												            		}
					                                												}
	                                										}
		                                },

		                                {
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
																												            required: function(viewValue, modelValue, scope) {
																												              		//return a required validation message : 
																												              		//-> '<label as name> is required '
																												              		//-> or if not exists or empty just 'this field is required'
																												              		var defaultReturnMsg = 'this Checkbox field is required';
																												              		var returnMsg = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
																												              		return returnMsg;
																												            		}
					                                												}
	                                										}
		                                },

		                                {
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
																												            required: function(viewValue, modelValue, scope) {
																												              		//return a required validation message : 
																												              		//-> '<label as name> is required '
																												              		//-> or if not exists or empty just 'this field is required'
																												              		var defaultReturnMsg = 'this Basic select field is required';
																												              		var returnMsg = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
																												              		return returnMsg;
																												            		}
					                                												}
	                                										}
		                                },

		                                {
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
																												            required: function(viewValue, modelValue, scope) {
																												              		//return a required validation message : 
																												              		//-> '<label as name> is required '
																												              		//-> or if not exists or empty just 'this field is required'
																												              		var defaultReturnMsg = 'this Grouped Select field is required';
																												              		var returnMsg = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
																												              		return returnMsg;
																												            		}
					                                												}
	                                										}
		                                }
		                              ],

		                      selectedControl : 'none' ,
		                      temporyConfig : {
		                                        selectedControl: 'none',
		                                        formlyLabel: 'label', 
		                                        formlyRequired: false, 
		                                        formlyDesciption: '',
		                                        formlyPlaceholder: '',
		                                        formlyOptions : [],
																	          //expressions/validation fields
																	          formlyExpressionProperties: {},
																	          formlyValidators: {},
																	          formlyValidation: {}                                        
		                                      } 

		    };

		    //reset
		  	return angular.copy(filterDisabledControl(angular.copy(newNyaSelectObj)));
				
			}

	    /**
	     * init object : return unfiltered (from config) list of controls object true (if not true, you may have problem^^)
	     */
		  function resetNyaSelect(nyaSelectObj){
		    var newNyaSelectObj = {

		                    controls : [
		                                {
		                                	id: 'empty',  
		                                	name: 'no control', 
		                                	subtitle: 'no control', 
		                                	group: 'Blank', 
		                                	formlyType: 'blank', 
		                                	formlySubtype: '', 
		                                	formlyLabel: '', 
		                                	formlyRequired: false, 
		                                	formlyDesciption: '', 
		                                	formlyOptions: [] , 
		                                	formlyExpressionProperties: {}, 
		                                	formlyValidators: {}, 
		                                	formlyValidation: {} 
		                                },

		                                {id: 'Header',  name: 'Header', subtitle: 'no control', group: 'Decoration', formlyType: 'header', formlySubtype: '', formlyLabel: '', formlyRequired: false, formlyDesciption: '', formlyOptions: [] , formlyExpressionProperties: {}, formlyValidators: {}, formlyValidation: {}},
		                                {id: 'Subtitle',  name: 'Subtitle', subtitle: 'no control', group: 'Decoration', formlyType: 'subTitle', formlySubtype: '', formlyLabel: '', formlyRequired: false, formlyDesciption: '', formlyOptions: [] , formlyExpressionProperties: {}, formlyValidators: {}, formlyValidation: {}},

		                                {
		                                	id: 'TextInput',  
		                                	name: 'Text input', 
		                                	subtitle: 'Text input', 
		                                	group: 'input', 
		                                	formlyType: 'input', 
		                                	formlySubtype: '', 
		                                	formlyLabel: '', 
		                                	formlyRequired: false, 
		                                	formlyDesciption: '', 
		                                	formlyOptions: [] , 
		                                	formlyExpressionProperties: {}, 
		                                	formlyValidators: {}, 
		                                	formlyValidation: {
						                                		          messages: {
																													            required: function(viewValue, modelValue, scope) {
																													              		//return a required validation message : 
																													              		//-> '<label as name> is required '
																													              		//-> or if not exists or empty just 'this field is required'
																													              		var defaultReturnMsg = 'this Text input field is required';
																													              		var returnMsg = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
																													              		return returnMsg;
																													            		}
						                                												}
		                                										}
		                                },

		                                {
		                                	id: 'Password',  
		                               	 	name: 'Password', 
		                                	subtitle: 'Password', 
		                                	group: 'input', 
		                                	formlyType: 'input', 
		                                	formlySubtype: 'password', 
		                                	formlyLabel: '', 
		                                	formlyRequired: false, 
		                                	formlyDesciption: '', 
		                                	formlyOptions: [] , 
		                                	formlyExpressionProperties: {}, 
		                                	formlyValidators: {}, 
	                                		formlyValidation: {
					                                		          messages: {
																												            required: function(viewValue, modelValue, scope) {
																												              		//return a required validation message : 
																												              		//-> '<label as name> is required '
																												              		//-> or if not exists or empty just 'this field is required'
																												              		var defaultReturnMsg = 'this Password field is required';
																												              		var returnMsg = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
																												              		return returnMsg;
																												            		}
					                                												}
	                                										}
		                              },
		                                
		                                {
		                                	id 													: 'Email',  
		                                	name 												: 'Email', 
		                                	subtitle 										: 'Email', 
		                                	group 											: 'input', 
		                                	formlyType									: 'input', 
		                                	formlySubtype 							: 'email', 
		                                	formlyLabel 								: '', 
		                                	formlyRequired 							: false, 
		                                	formlyDesciption 						: '', 
		                                	formlyOptions 							: [], 
		                                	formlyExpressionProperties 	: {}, 

		                                	formlyValidators 						: {
																	                                		emailShape : {
																																			            		expression : function(viewValue, modelValue) {
																																			              		var value = modelValue || viewValue;
																																			              		return /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/.test(value);
																																			            		},
																																			            		message: '$viewValue + \' is not a valid email\''
																																			          		}
																						                        },

		                                	formlyValidation: {
						                                		          messages: {
																													            required: function(viewValue, modelValue, scope) {
																													              		//return a required validation message : 
																													              		//-> '<label as name> is required '
																													              		//-> or if not exists or empty just 'this field is required'
																													              		
																													              		var defaultReturnMsg = 'this Email field is required';
																													              		var returnMsg = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
																													              		//check if validation is really dued to require validation 
																													              		//and not another validation like emailShape validator
																													              		if (scope.to.required) return returnMsg;
																													            		}
						                                												}
		                                										}
		                                },
		                                
		                                {
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
																													            required: function(viewValue, modelValue, scope) {
																													              		//return a required validation message : 
																													              		//-> '<label as name> is required '
																													              		//-> or if not exists or empty just 'this field is required'
																													              		var defaultReturnMsg = 'this Date field is required';
																													              		var returnMsg = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
																													              		return returnMsg;
																													            		}
						                                												}
		                                										}
		                                },

		                                {
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
																													            required: function(viewValue, modelValue, scope) {
																													              		//return a required validation message : 
																													              		//-> '<label as name> is required '
																													              		//-> or if not exists or empty just 'this field is required'
																													              		var defaultReturnMsg = 'this Textarea field is required';
																													              		var returnMsg = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
																													              		return returnMsg;
																													            		}
						                                												}
		                                										}
		                                },

		                                {
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
		   
		                                	formlyValidators 						: {},

		                                	formlyValidation: {
						                                		          messages: {
																													            required: function(viewValue, modelValue, scope) {
																													              		//return a required validation message : 
																													              		//-> '<label as name> is required '
																													              		//-> or if not exists or empty just 'this field is required'
																													              		var defaultReturnMsg = 'this RichTextEditor field is required';
																													              		var returnMsg = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
																													              		return returnMsg;
																													            		}
						                                												}
		                                										}
		                                },

		                                {
		                                	id: 'Radio', 
		                                	name: 'Radio', 
		                                	subtitle: 'Radio', 
		                                	options: [], 
		                                	group: 'Radio', 
		                                	formlyType: 'radio', 
		                                	formlySubtype: '', 
		                                	formlyLabel: '', 
		                                	formlyRequired: false, 
		                                	formlyDesciption: '' , 
		                                	formlyOptions: [], 
		                                	formlyExpressionProperties: {}, 
		                                	formlyValidators: {}, 
	                                		formlyValidation: {
					                                		          messages: {
																												            required: function(viewValue, modelValue, scope) {
																												              		//return a required validation message : 
																												              		//-> '<label as name> is required '
																												              		//-> or if not exists or empty just 'this field is required'
																												              		var defaultReturnMsg = 'this Password field is required';
																												              		var returnMsg = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
																												              		return returnMsg;
																												            		}
					                                												}
	                                										}
		                                },

		                                {
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
																												            required: function(viewValue, modelValue, scope) {
																												              		//return a required validation message : 
																												              		//-> '<label as name> is required '
																												              		//-> or if not exists or empty just 'this field is required'
																												              		var defaultReturnMsg = 'this Checkbox field is required';
																												              		var returnMsg = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
																												              		return returnMsg;
																												            		}
					                                												}
	                                										}
		                                },

		                                {
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
																												            required: function(viewValue, modelValue, scope) {
																												              		//return a required validation message : 
																												              		//-> '<label as name> is required '
																												              		//-> or if not exists or empty just 'this field is required'
																												              		var defaultReturnMsg = 'this Basic select field is required';
																												              		var returnMsg = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
																												              		return returnMsg;
																												            		}
					                                												}
	                                										}
		                                },

		                                {
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
																												            required: function(viewValue, modelValue, scope) {
																												              		//return a required validation message : 
																												              		//-> '<label as name> is required '
																												              		//-> or if not exists or empty just 'this field is required'
																												              		var defaultReturnMsg = 'this Grouped Select field is required';
																												              		var returnMsg = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
																												              		return returnMsg;
																												            		}
					                                												}
	                                										}
		                                }
		                              ],

		                      selectedControl : 'none' ,
		                      temporyConfig : {
		                                        selectedControl: 'none',
		                                        formlyLabel: 'label', 
		                                        formlyRequired: false, 
		                                        formlyDesciption: '',
		                                        formlyPlaceholder: '',
		                                        formlyOptions : [],
																	          //expressions/validation fields
																	          formlyExpressionProperties: {},
																	          formlyValidators: {},
																	          formlyValidation: {}                                        
		                                      } 

		    };

		    //reset
		  	angular.copy(newNyaSelectObj, nyaSelectObj);
		    return true;
		  }
			
			function filterDisabledControl(nyaSelectObj){
				var listAllEnabledControl = easyFormSteWayConfig.getListEnabledControl();
				var filteredNyaList = [];
				
				angular.forEach(listAllEnabledControl, function(enabledControl){
					
					angular.forEach(nyaSelectObj.controls, function(nyaControl){
											
						if ((nyaControl.id === enabledControl.name) &&
								(enabledControl.enabled === true)) {
							filteredNyaList = filteredNyaList.concat(nyaControl);
						}
						
					});
					
				});
				return filteredNyaList;
			}
		  /**
		   * data passed back to parent controller 
		   * after control being finsihed editing in modal
		   */
		  function returnControlFromAddCtrlModalModel(CtrlModalModel){

		    var modelToReturn = {
		          selectedControl:'none', 
		          formlyType : 'none',
		          formlySubtype: 'none',
		          formlyLabel: '',
		          formlyRequired : false,
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
		        modelToReturn.selectedControl 		= CtrlModalModel.selectedControl;
		        modelToReturn.formlyType 					= CtrlModalModel.controls[i].formlyType;
		        modelToReturn.formlySubtype 			= CtrlModalModel.controls[i].formlySubtype;
		        modelToReturn.formlyLabel 				= CtrlModalModel.controls[i].formlyLabel;
		        modelToReturn.formlyRequired 			= CtrlModalModel.controls[i].formlyRequired;
		        modelToReturn.formlyDesciption 		= CtrlModalModel.controls[i].formlyDesciption;
		        modelToReturn.formlyPlaceholder 	= CtrlModalModel.controls[i].formlyPlaceholder;
		        modelToReturn.formlyOptions 			= CtrlModalModel.controls[i].formlyOptions;

		        modelToReturn.formlyExpressionProperties 	= angular.copy(CtrlModalModel.controls[i].formlyExpressionProperties);
		        modelToReturn.formlyValidators 						= angular.copy(CtrlModalModel.controls[i].formlyValidators);
		        modelToReturn.formlyValidation 						= angular.copy(CtrlModalModel.controls[i].formlyValidation);

		        //particular properties 
		        //datetpicker format
		        if (CtrlModalModel.controls[i].formlyType === 'datepicker') {
					modelToReturn.datepickerPopup 							= CtrlModalModel.controls[i].datepickerPopup;   
					  	
		        }
		      }
		    }
		    return modelToReturn;
		  }
			/**
			 * validKeyUniqueness
			 * to be sure the "keys" are unique (in same formly field model)
			 */
		  function validKeyUniqueness(thisKey, configurationObj){
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
		  }  

		}

})(); 

/**
 *  ------------------------------------------------------
 *  service : formFieldManage
 *  ------------------------------------------------------
 *
 *         MOST IMPORTANT service to manage formly field model 
 *  (the presentation model and the back model or configuration model)
 * 
 *
 *  - "formlyModel" is the model exposed to view or html "fields model" (= an array of objects)
 *    This model is the one you can see in all well documented examples here : http://angular-formly.com
 *    -> in your view or html : <formly-form model="dataModel" fields="formlyModel">
 *
 *  - "configurationModel" is the model on which editing a form will work
 *    before applying results to "formlyModel"
 *
 *
 * NOTE : if you save a form to database, you will save "configurationModel" rather than "formlyModel".
 *        Why? : 
 *          since as you plan to create a form generator you can't create a finite model
 *          since you may want to be able to save the generated form even if it is not a finite model
 *          since "formlyModel" objects will be populated with a lot of properties you don't need to store contrary to "configurationModel" which contains only what you need
 *          since "formlyModel" can't be JSON.stringify when you want to use advanced layout (1 column/2/3 columns template?)
 *          since it is better approach to use a backgroundModel (async operation ...) that is bind to presentation model only when it is fully ready or filled.
 *
 *
 * NOTE : 
 * - if you want to manage more columns templates (right now only manage up to 3 columns), just inspire from existing code
 * - if you want to extend easy form generator, be sure to be a minimum comfortable with "angular formly": http://angular-formly.com
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

;(function () {
  'use strict';




  angular
    .module('ngwfApp.services.formFieldManage', [])
    .factory('formFieldManage', formFieldManage);

    formFieldManage.$inject = [];

    function formFieldManage(){

      var service = {
        initConfigurationEditFromScratch : initConfigurationEditFromScratch,
        bindConfigurationLines           : bindConfigurationLines,
        applyConfigurationToformlyModel  : applyConfigurationToformlyModel 
      };
      return service;


      function initConfigurationEditFromScratch(configurationModel){
        var configurationModelInit = {
          activeLine: 1,   
          listConfigStep: [
                            'init',
                            'first',
                            'second',
                            'third'
                          ],
          stepIndicators:  [
                              true,
                              false,
                              false,
                              false
                            ], 
          configStepCounter : 0, 
          submitButtonText  : 'submit',
          cancelButtonText  : 'cancel',
          lines: [
                  {
                    line:1,                                       
                    activeColumn : 1,
                    columns: [
                              {  
                                numColumn: 1,
                                exist:true, 
                                control: {
                                            type:'none',
                                            key: 'none',
                                            // templateOptions: {
                                            //                     label: 'none',
                                            //                     placeholder: 'none',
                                            //                     required: false,
                                            //                     description: 'Descriptive text'
                                            //                   }
                                          }
                                }
                              ]
                   }                                 
              ]
        };
        angular.copy(configurationModelInit, configurationModel);                         
      }

      function bindConfigurationLines(configurationModel, lines){
        if( Object.prototype.toString.call(lines) === '[object Array]' ) {
          var configurationModelResult = {
            activeLine: 1,   
            listConfigStep: [
                              'init',
                              'first',
                              'second',
                              'third'
                            ],
            stepIndicators:  [
                                true,
                                false,
                                false,
                                false
                              ], 
            configStepCounter: 0, 
            submitButtonText : 'submit',
            cancelButtonText: 'cancel',
            lines: []
          };
          configurationModelResult.lines = [].concat(lines);  
                    
          angular.copy(configurationModelResult, configurationModel);                                         

          return getMessageObject('configuration model is bound','lines are bound to configuration model.');
        }else{
          return getErrorObject('lines is not an array', 'Checks lines type, it is not an array.');
        }
      }

      function applyConfigurationToformlyModel(configurationModel, formlyModel, formlyDataModel){
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
              }else{
                addOneColumnControl(formlyModel, configurationModel, i);  
              }          
            }
            if (configurationModel.lines[i].columns.length === 2) {
              addTwoColumnControl(formlyModel, configurationModel,i);
            }
            if (configurationModel.lines[i].columns.length === 3) {
              addThreeColumnControl(formlyModel, configurationModel,i);
            }
        }
      }

      function resetFormlyModel(formlyModel){
        var resetformly = [];
        angular.copy(resetformly, formlyModel);
      }



      function addOneColumnHeader(formlyModel, configurationModel,lineIndex){
        /**
         * text header is stored in "description" in templateOtion model 
         */
        var headerTemplateCol0 = '<div class="row"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><h2 class="text-center">' + extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control) + '<h2></div></div><hr/>';

        formlyModel.push(
          {
            template: typeof configurationModel
                                    .lines[lineIndex]
                                    .columns[0]
                                    .control
                                    .type !== 'undefined' ? (configurationModel.lines[lineIndex].columns[0].control.type === 'header' ? headerTemplateCol0 : '<div></div>') : '<div></div>'
          }
        );
      }

      function addDatepickerPopupProperty(fieldToPush, configurationModel,lineIndex){
          fieldToPush.templateOptions.datepickerPopup = extractTemplateOptionDatepickerPopup(configurationModel.lines[lineIndex].columns[0].control);
      }

      function addOneColumnControl(formlyModel, configurationModel,lineIndex){
        var fieldToPush = {
          className: 'col-xs-12',
          type: typeof configurationModel.lines[lineIndex].columns[0].control.type !== 'undefined' ? (configurationModel.lines[lineIndex].columns[0].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[0].control.type): 'blank',
          key: typeof configurationModel.lines[lineIndex].columns[0].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[0].control.key : 'blank' + Date.now(),
          templateOptions: {
            type                  : extractTemplateOptionType(configurationModel.lines[lineIndex].columns[0].control),
            label                 : extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[0].control),
            required              : extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[0].control),
            placeholder           : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[0].control),
            description           : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control),
            options               : extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[0].control)
          },
          expressionProperties  : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[0].control),
          validators            : extractFormlyValidators(configurationModel.lines[lineIndex].columns[0].control),
          validation            : extractFormlyValidation(configurationModel.lines[lineIndex].columns[0].control)
        };
        //////////////////////////////////////////////                  
        //datepicker additionnal particular property  
        //////////////////////////////////////////////                  
        if (configurationModel.lines[lineIndex].columns[0].control.type === 'datepicker') {
          addDatepickerPopupProperty(fieldToPush, configurationModel,lineIndex);
        }     

        formlyModel.push( 
          fieldToPush
        );
      }    

      function addTwoColumnControl(formlyModel, configurationModel,lineIndex){

        //text header is stored in "description" in templateOtion model
        var headerTemplateCol0 =  {
                                    className: 'col-xs-6',
                                    template : '<div class="row"><div class=""><h2 class="text-center">' + extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control) + '<h2><hr/></div></div>'
                                  };

        var headerTemplateCol1 =  {
                                    className: 'col-xs-6',
                                   template:'<div class="row"><div class=""><h2 class="text-center">' + extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[1].control) + '<h2><hr/></div></div>'
                                  };

        var controlCol0 =     {
            className: 'col-xs-6',
            type: typeof configurationModel.lines[lineIndex].columns[0].control.type !== 'undefined' ? (configurationModel.lines[lineIndex].columns[0].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[0].control.type): 'blank',
            key: typeof configurationModel.lines[lineIndex].columns[0].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[0].control.key : 'blank' + Date.now(),
            templateOptions: {
                type: extractTemplateOptionType(configurationModel.lines[lineIndex].columns[0].control),
                label: extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[0].control),
                required : extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[0].control),
                placeholder : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[0].control),
                description : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control),
                options : extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[0].control)
            },
                expressionProperties : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[0].control),
                validators : extractFormlyValidators(configurationModel.lines[lineIndex].columns[0].control),
                validation : extractFormlyValidation(configurationModel.lines[lineIndex].columns[0].control)                                  
          };
        //////////////////////////////////////////////                  
        //datepicker additionnal particular property  
        //////////////////////////////////////////////                  
        if (configurationModel.lines[lineIndex].columns[0].control.type === 'datepicker') {
          addDatepickerPopupProperty(controlCol0, configurationModel,lineIndex);
        }                            

        var controlCol1 =  {
                  className: 'col-xs-6',
                  type: typeof configurationModel.lines[lineIndex].columns[1].control.type !== 'undefined' ?  (configurationModel.lines[lineIndex].columns[1].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[1].control.type) : 'blank',
                  key: typeof configurationModel.lines[lineIndex].columns[1].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[1].control.key : 'blank' + Date.now(),
                  templateOptions: {
                      type: extractTemplateOptionType(configurationModel.lines[lineIndex].columns[1].control),
                      label: extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[1].control),
                      required : extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[1].control),
                      placeholder : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[1].control),
                      description : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[1].control),
                      options : extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[1].control)
                  },
                      expressionProperties : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[1].control),
                      validators : extractFormlyValidators(configurationModel.lines[lineIndex].columns[1].control),
                      validation : extractFormlyValidation(configurationModel.lines[lineIndex].columns[1].control)                                  
          };

        //////////////////////////////////////////////                  
        //datepicker additionnal particular property  
        //////////////////////////////////////////////                  
        if (configurationModel.lines[lineIndex].columns[1].control.type === 'datepicker') {
          addDatepickerPopupProperty(controlCol1, configurationModel,lineIndex);
        }                                

        var FieldGroup = [];

        if (configurationModel.lines[lineIndex].columns[0].control.type === 'header') {
          FieldGroup.push(headerTemplateCol0);
        }else{
          FieldGroup.push(controlCol0);
        }
         
        if (configurationModel.lines[lineIndex].columns[1].control.type === 'header') {
          FieldGroup.push(headerTemplateCol1);
        }else{
          FieldGroup.push(controlCol1);
        }    

        formlyModel.push(
           {
              className: 'row', 
              fieldGroup: FieldGroup
            }
        );
      }

      function addThreeColumnControl(formlyModel, configurationModel,lineIndex){
        //text header is stored in "description" in templateOtion model
        var headerTemplateCol0 =  {
                                    className: 'col-xs-4',
                                    template : '<div class="row"><div class=""><h2 class="text-center">' + extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control) + '<h2><hr/></div></div>'
                                  };

        var headerTemplateCol1 =  {
                                    className: 'col-xs-4',
                                   template:'<div class="row"><div class=""><h2 class="text-center">' + extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[1].control) + '<h2><hr/></div></div>'
                                  };

        var headerTemplateCol2 =  {
                                    className: 'col-xs-4',
                                   template:'<div class="row"><div class=""><h2 class="text-center">' + extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[2].control) + '<h2><hr/></div></div>'
                                  };
      
        var controlCol0 =     {
                                  className: 'col-xs-4',
                                  type: typeof configurationModel.lines[lineIndex].columns[0].control.type !== 'undefined' ? (configurationModel.lines[lineIndex].columns[0].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[0].control.type): 'blank',
                                  key: typeof configurationModel.lines[lineIndex].columns[0].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[0].control.key : 'blank' + Date.now(),
                                  templateOptions: {
                                      type: extractTemplateOptionType(configurationModel.lines[lineIndex].columns[0].control),
                                      label: extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[0].control),
                                      required : extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[0].control),
                                      placeholder : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[0].control),
                                      description : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control),
                                      options : extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[0].control)                                              
                                  },
                                      expressionProperties : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[0].control),
                                      validators : extractFormlyValidators(configurationModel.lines[lineIndex].columns[0].control),
                                      validation : extractFormlyValidation(configurationModel.lines[lineIndex].columns[0].control)                                   
                                };
        //////////////////////////////////////////////                  
        //datepicker additionnal particular property  
        //////////////////////////////////////////////                  
        if (configurationModel.lines[lineIndex].columns[0].control.type === 'datepicker') {
          addDatepickerPopupProperty(controlCol0, configurationModel,lineIndex);
        }                             

        var controlCol1 =  {
                                  className: 'col-xs-4',
                                  type: typeof configurationModel.lines[lineIndex].columns[1].control.type !== 'undefined' ?  (configurationModel.lines[lineIndex].columns[1].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[1].control.type) : 'blank',
                                  key: typeof configurationModel.lines[lineIndex].columns[1].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[1].control.key : 'blank' + Date.now(),
                                  templateOptions: {
                                      type: extractTemplateOptionType(configurationModel.lines[lineIndex].columns[1].control),
                                      label: extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[1].control),
                                      required : extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[1].control),
                                      placeholder : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[1].control),
                                      description : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[1].control),
                                      options : extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[1].control)                                               
                                  },
                                      expressionProperties : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[1].control),
                                      validators : extractFormlyValidators(configurationModel.lines[lineIndex].columns[1].control),
                                      validation : extractFormlyValidation(configurationModel.lines[lineIndex].columns[1].control)                                  
                          };
        //////////////////////////////////////////////                  
        //datepicker additionnal particular property  
        //////////////////////////////////////////////                  
        if (configurationModel.lines[lineIndex].columns[1].control.type === 'datepicker') {
          addDatepickerPopupProperty(controlCol1, configurationModel,lineIndex);
        }                       
        var controlCol2 =  {
                                  className: 'col-xs-4',
                                  type: typeof configurationModel.lines[lineIndex].columns[2].control.type !== 'undefined' ?  (configurationModel.lines[lineIndex].columns[2].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[2].control.type) : 'blank',
                                  key: typeof configurationModel.lines[lineIndex].columns[2].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[2].control.key : 'blank' + Date.now(),
                                  templateOptions: {
                                      type: extractTemplateOptionType(configurationModel.lines[lineIndex].columns[2].control),
                                      label: extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[2].control),
                                      required : extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[2].control),
                                      placeholder : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[2].control),
                                      description : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[2].control),
                                      options : extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[2].control)                                              
                                  },
                                      expressionProperties : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[2].control),
                                      validators : extractFormlyValidators(configurationModel.lines[lineIndex].columns[2].control),
                                      validation : extractFormlyValidation(configurationModel.lines[lineIndex].columns[2].control)                                   
                          };
        //////////////////////////////////////////////                  
        //datepicker additionnal particular property  
        //////////////////////////////////////////////                  
        if (configurationModel.lines[lineIndex].columns[2].control.type === 'datepicker') {
          addDatepickerPopupProperty(controlCol2, configurationModel,lineIndex);
        }     

        var FieldGroup = [];

        if (configurationModel.lines[lineIndex].columns[0].control.type === 'header') {
          FieldGroup.push(headerTemplateCol0);
        }else{
          FieldGroup.push(controlCol0);
        }
         
        if (configurationModel.lines[lineIndex].columns[1].control.type === 'header') {
          FieldGroup.push(headerTemplateCol1);
        }else{
          FieldGroup.push(controlCol1);
        }    

        if (configurationModel.lines[lineIndex].columns[2].control.type === 'header') {
          FieldGroup.push(headerTemplateCol2);
        }else{
          FieldGroup.push(controlCol2);
        }    


        formlyModel.push(
           {
              className: 'row', 
              fieldGroup: FieldGroup
            }
        );
      }

      function isTemplateOptionDefined(obj){
        return typeof obj.templateOptions !== 'undefined' ? true : false;
      }

      function extractTemplateOptionLabel(obj){
       return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.label !== 'undefined'? obj.templateOptions.label: '') : '';
      }


      function extractTemplateOptionDatepickerPopup(obj){
        return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.datepickerPopup !== 'undefined'? obj.templateOptions.datepickerPopup: '') : '';
      }

      function extractFormlyExpressionProperties(obj){
        return  typeof obj.formlyExpressionProperties !== 'undefined' ? angular.copy(obj.formlyExpressionProperties) : {};
      }

      function extractFormlyValidators(obj){
        return  typeof obj.formlyValidators !== 'undefined' ? angular.copy(obj.formlyValidators): {};
      }

      function extractFormlyValidation(obj){
        return  typeof obj.formlyValidation !== 'undefined' ?  angular.copy(obj.formlyValidation) : {};
      }

      function extractTemplateOptionRequired(obj){
        return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.required !== 'undefined'? obj.templateOptions.required: '') : '';
      }

      function extractTemplateOptionOptions(obj){
        return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.options !== 'undefined'? obj.templateOptions.options: '') : '';
      }

      function extractTemplateOptionType(obj){
        return  typeof obj.subtype !== 'undefined'? obj.subtype: '';
      }

      function extractTemplateOptionPlaceholder(obj){
        return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.placeholder !== 'undefined'? obj.templateOptions.placeholder: '') : '';
      }

      function extractTemplateOptionDescription(obj){
        return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.description !== 'undefined'? obj.templateOptions.description: '') : '';
      }

      function resetDataModel(obj){
        var emptyDataModel = {};
        angular.copy(emptyDataModel, obj);
        return true;
      }

      function getErrorObject(errorTitle, errorMessage){

        var messageObj = {
          noError : false,
          title: '',
          Message: ''  
        };

        messageObj.noError = false;
        messageObj.title = errorTitle;
        messageObj.Message = errorMessage;
        return messageObj;
      }

      function getMessageObject(messageTitle, messageBody){
        var messageObj = {
          noError : false,
          title: '',
          Message: ''  
        };

        messageObj.noError = true;
        messageObj.title = messageTitle;
        messageObj.Message = messageBody;
        return messageObj;
      }    


    }



})(); 

/**
 *  ------------------------------------------------------
 *  service to manage select options (used in modal to edit control)
 *  ------------------------------------------------------
 *
 *  module = "service"  selectOptionManage (manage : selects, radio...)
 *
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

;(function() {
  'use strict';


  angular
    .module('ngwfApp.services.selectOptionManage', [])
    .factory('selectOptionManage', selectOptionManage);

    selectOptionManage.$inject = [];
    function selectOptionManage(){
      var service = {
        testMe                    : testMe,
        initModel                 : initModel,
        isOptionUnique            : isOptionUnique,
        isOptionValidFormat       : isOptionValidFormat,
        addNewOptionRadio         : addNewOptionRadio,
        addNewOptionBasicSelect   : addNewOptionBasicSelect,
        addNewOptionGroupedSelect : addNewOptionGroupedSelect,
        removeOption              : removeOption,
        upthisOption              : upthisOption,
        downthisOption            : downthisOption,
      };
      return service;

      /**
       * just a test function
       */
      function testMe(){
        return 'selectOptionManage is here.';
      }
      /**
       * reset model
       */
      function initModel(selectObj){
        resetModel(selectObj);
      }

      function isOptionUnique(selectObj, textValue){
        for (var i = selectObj.rows.length - 1; i >= 0; i--) {
          if (selectObj.rows[i].option === textValue) return false;
        }
        return true;
      }

      function isOptionValidFormat(textValue){
        if (textValue !== '')  return true;
        return false;
      }

      function addNewOptionRadio(selectObj, newOptionText){
        var fullResponse = {
                              resultFlag : false,
                              details : ''
                            };

        var checkResult = validOption(selectObj, newOptionText);  
        if (checkResult.resultFlag === true){

            var newOption = {
                                option: newOptionText,
                                order: selectObj.rows.length
                            };

            selectObj.rows.push(newOption);
            fullResponse.resultFlag = true;
            fullResponse.details = '';
            return fullResponse;
        }else{
              angular.copy(checkResult, fullResponse);                    
              return fullResponse;                        
        }
      }

      function addNewOptionBasicSelect(selectObj, newOptionText){
          var fullResponse = {
                                resultFlag : false,
                                details : ''
                              };

          var checkResult = validOption(selectObj, newOptionText);  
          if (checkResult.resultFlag === true){

              var newOption = {
                                  option: newOptionText,
                                  order: selectObj.rows.length
                              };

              selectObj.rows.push(newOption);
              fullResponse.resultFlag = true;
              fullResponse.details = '';
              return fullResponse;
          }else{
                angular.copy(checkResult, fullResponse);                    
                return fullResponse;                        
          }
      }

      function addNewOptionGroupedSelect(selectObj, newOptionText, newOptionGroup){
        var fullResponse = {
                              resultFlag : false,
                              details : ''
                            };

        var checkResult = validOption(selectObj, newOptionText);  
    
        if (checkResult.resultFlag === true){

            var newOption = {
                                option: newOptionText,
                                group: newOptionGroup,
                                order: selectObj.rows.length
                            };

            selectObj.rows.push(newOption);
            fullResponse.resultFlag = true;
            fullResponse.details = '';
            return fullResponse;
        }else{
              angular.copy(checkResult, fullResponse);                    
              return fullResponse;                        
        }
      }

      function removeOption(selectObj, AtIndex) {
        var fullResponse = {
                            resultFlag : false,
                            details : ''
                          };

        if (AtIndex !== -1) {
            selectObj.rows.splice(AtIndex, 1);
            fullResponse.resultFlag = true;
            fullResponse.details= '';
            return fullResponse;
        }else{
            fullResponse.resultFlag = false;
            fullResponse.details= 'Option index not valid';
            return fullResponse;
        }
      }

      function upthisOption(selectObj, indexOption){
          var fullResponse = {
                              resultFlag : false,
                              details : ''
                            };  

          if (indexOption > -1) {
            if (indexOption > 0) {
              if (selectObj.rows[indexOption - 1]) {
                var currentOption = selectObj.rows[indexOption];
                selectObj.rows.splice(indexOption , 1);
                selectObj.rows.splice((indexOption - 1), 0, currentOption); 
                fullResponse.resultFlag = true;
                fullResponse.details = '';
                return fullResponse;
              }else{
                fullResponse.resultFlag = false;
                fullResponse.details = 'Can\'t retreive option from option index';
                return fullResponse;
              }
            }else{
                fullResponse.resultFlag = true;
                fullResponse.details = '';
                return fullResponse;
            }  
          }else{
            fullResponse.resultFlag = false;
            fullResponse.details = 'Option index not valid';
            return fullResponse;
          }
      }

      function downthisOption(selectObj, indexOption){
          var fullResponse = {
                              resultFlag : false,
                              details : ''
                            };

          if (indexOption > -1) {
            if (indexOption < selectObj.rows.length - 1){
              if (selectObj.rows[indexOption + 1]) {
                var currentOption = selectObj.rows[indexOption];
                selectObj.rows.splice(indexOption , 1);
                selectObj.rows.splice((indexOption + 1), 0, currentOption);  
                fullResponse.resultFlag = true;
                fullResponse.details = '';
                return fullResponse;  
              }else{
                fullResponse.resultFlag = false;
                fullResponse.details = 'Can\'t retreive option from option index';
                return fullResponse;
              }
            }else{ 
                fullResponse.resultFlag = true;
                fullResponse.details = '';
              return fullResponse;
            }
          }else{
            fullResponse.resultFlag = false;
            fullResponse.details = 'Option index not valid';
            return fullResponse;
          }
      }






      function validOption(selectObj, newOptionText){
          var fullResponse = {
                                resultFlag  : false,
                                details     : ''
                              };

          if (typeof newOptionText === 'undefined') {
              fullResponse.resultFlag = false;
              fullResponse.details    = 'Entered option is empty';
              return fullResponse;
          }

          if (newOptionText !== '') {
                for (var i = selectObj.rows.length - 1; i >= 0; i--) {
                  if (selectObj.rows[i].option === newOptionText) {
                    fullResponse.resultFlag = false;
                    fullResponse.details    = 'Entered option is not unique';
                    return fullResponse;
                  }
                }
                fullResponse.resultFlag = true;
                fullResponse.details    = '';
                return fullResponse;
          }
          fullResponse.resultFlag = false;     
          fullResponse.details    = 'Entered option is empty';
          return fullResponse;
      }

      function resetModel(selectObj){
        var zeroModel = { rows:[] };
        angular.copy(zeroModel, selectObj);
      }
  }


})(); 
/**
 *  ------------------------------------------------------
 *  module = "services" container
 *  ------------------------------------------------------
 *
 * contains all app services
 *
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

;(function () {
	'use strict';

	angular.module(
									'ngwfApp.services', [	
																				'ngwfApp.services.formFieldManage',
																				'ngwfApp.services.selectOptionManage',
																				'ngwfApp.services.ngwfEditCtrlControllerModalProxy'
																			]
								);

})(); 


/**
 *  ------------------------------------------------------
 *  filters container
 *  ------------------------------------------------------
 *
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

;(function () {
	'use strict';

	angular
		.module('ngwfApp.filters', []);

})(); 



})(this);