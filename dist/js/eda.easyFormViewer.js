/** 
  *easyFormViewer 
  *Version 1.0.22 
  *Author : Erwan Datin (MacKentoch) 
  *Link: https://github.com/MacKentoch/easyFormGenerator 
  *License : MIT (2015) 
 **/ 
 ;(function(){
 	'use strict';
/**
 *  -----------------------------------------------------------------------
 *  application module of easy form viewer
 *  -----------------------------------------------------------------------
 *  
 *   
 *     
 *
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
;(function(){
	'use strict';
	
	angular
		.module('eda.easyFormViewer', [
			'textAngular',  
			'formly',  
			'ngAnimate',
			'formlyBootstrap', 
			'ui.bootstrap', 
			'nya.bootstrap.select', 
			'eda.easyFormViewer.Directive',
			'eda.modelsTranslator.Service'		
		]);
	
})();
/**
 *  -----------------------------------------------------------------------
 *  config module of easy form viewer
 *  -----------------------------------------------------------------------
 *  
 *   
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
;(function(){
	'use strict';
	
	angular
		.module('eda.easyFormViewer')
		.config(configFct);
    
		configFct.$inject = ['formlyConfigProvider'];
		function configFct(formlyConfigProvider){
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
angular.module("eda.easyFormViewer").run(["$templateCache", function($templateCache) {$templateCache.put("eda.easyFormViewer.Template.html","<div class=easyFormViewer><form ng-submit=vm.onSubmit() name=vm.form><formly-form model=vm.model fields=vm.fields form=vm.form><div class=pull-right><button type=submit class=\"btn btn-primary\" ng-disabled=vm.form.$invalid ng-click=vm.edaSubmitThisDataModel();>{{vm.submitText}}</button> <button type=button class=\"btn btn-primary\" ng-click=vm.edaCancelEvent();>{{vm.cancelText}}</button></div></formly-form></form></div>");}]);
/**
 *  -----------------------------------------------------------------------
 *   easy form viewer directive
 *  -----------------------------------------------------------------------
 *  
 *   
 *     
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
		.module('eda.easyFormViewer.Directive', [])
		.directive('edaEasyFormViewer', edaEasyFormViewer);
		
		edaEasyFormViewer.$inject = ['modelsTranslator'];
		
		function edaEasyFormViewer(modelsTranslator){
			//directive's controller injection is here (before return directive) = to avoid minification errors
			edaEasyFormViewerCtrl.$inject = [];
			
			var directive = {
				restrict : 'E',
				scope : {
					
          edaEasyFormViewerDataModel 										: '=?',
					edaEasyFormViewerEasyFormGeneratorFieldsModel : '=?',
					
					edaEasyFormViewerSubmitButtonText 						: '=?',
					edaEasyFormViewerCancelButtonText 						: '=?',
					
          edaEasyFormViewerSubmitFormEvent  						: '&?',
					edaEasyFormViewerCancelFormEvent							: '&?'
        },
				replace 			: false,
				
				controller		: edaEasyFormViewerCtrl,
				controllerAs 	: 'vm',
				templateUrl 	: 'eda.easyFormViewer.Template.html',
				
				link : linkFct
			};
			return directive;
			
			
			/**
			 * directive's link function
			 */
			function linkFct(scope, element, attrs){
				
				scope.vm.model 				= {};
				scope.vm.fields 			= loadFieldsModel();
				scope.vm.submitText 	= scope.edaEasyFormViewerSubmitButtonText || 'Submit';
				scope.vm.cancelText 	= scope.edaEasyFormViewerCancelButtonText || 'Cancel';	
				
								
				scope.$watch(fieldsModelToWatch, 		fieldsModelWatcher, 	true);
				scope.$watch(submitBtnTextToWatch, 	submitBtnTextWatcher);
				scope.$watch(cancelBtnTextToWatch, 	cancelBtnTextWatcher);
				scope.$watch(submitEventToWatch, 		submitEventWatcher);
				scope.$watch(cancelEventToWatch, 		cancelEventWatcher);
				
				function fieldsModelToWatch(){
					return scope.edaEasyFormViewerEasyFormGeneratorFieldsModel;
				}

				function submitBtnTextToWatch(){
					return scope.edaEasyFormViewerSubmitButtonText;
				}
				
				function cancelBtnTextToWatch(){
					return scope.edaEasyFormViewerCancelButtonText;
				}
				
				function submitEventToWatch(){
					return scope.vm.hasJustSumitted;
				}
				
				function cancelEventToWatch(){
					return scope.vm.hasJustCancelled;
				}				
				
				function fieldsModelWatcher(newFieldsModel, oldFieldsModel){					
					scope.vm.fields = loadExistingConfigurationModel(newFieldsModel);
				}
				
				function submitBtnTextWatcher(newSubmitBtntext, oldSubmitBtntext){
					if (newSubmitBtntext !== oldSubmitBtntext) {
						scope.vm.submitText 	= newSubmitBtntext || 'Submit';	
					}					
				}				
			
				function cancelBtnTextWatcher(newCancelBtntext, oldCancelBtntext){
					if (newCancelBtntext !== oldCancelBtntext) {
						scope.vm.cancelText 	= newCancelBtntext || 'Submit';	
					}					
				}							
			
				function submitEventWatcher(newSubmitEvent, oldSubmitEvent){
					if (newSubmitEvent === true) {
							if (angular.isFunction(scope.edaEasyFormViewerSubmitFormEvent)) {
								var _dataModelSubmitted = scope.vm.model ;
								scope.edaEasyFormViewerSubmitFormEvent({ dataModelSubmitted : _dataModelSubmitted });
							}
					}
					scope.vm.hasJustSumitted = false;					
				}			
			
				function cancelEventWatcher(newCancelEvent, oldCancelEvent){
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
				function loadFieldsModel(){
					
					var initialFieldsModel = angular
																		.isArray(scope.edaEasyFormViewerEasyFormGeneratorFieldsModel) ?
						//translate easy form generator to formly fields model
						loadExistingConfigurationModel(scope.edaEasyFormViewerEasyFormGeneratorFieldsModel)
						: {};
					
					return initialFieldsModel;
				}
				
        function loadExistingConfigurationModel(loadedFieldModel){
          
          if(angular.isArray(loadedFieldModel)){
            var configlines           = returnAttributeConfigurationLinesIfNotEmpty(loadedFieldModel); 
						var formlyFieldsModel 		= [];          
            
						scope.configurationLoaded = {};
            
            modelsTranslator.bindConfigurationLines(scope.configurationLoaded,configlines);
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
          	
						return  formlyFieldsModel;
          }  
   
			  } 
	
	
	        function returnAttributeConfigurationLinesIfNotEmpty(loadedFieldModel){
            var edaEasyFormGeneratorModelToReturn = (
                angular.isArray(loadedFieldModel) ?  ( 
                    loadedFieldModel.length > 0 ? 
                      loadedFieldModel 
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
	
	
				
			}
			
			
			
			
			/**
			 * directive's controller : controllerAs syntax
			 */
			function edaEasyFormViewerCtrl(){
				/* jshint validthis:true */
				var vm = this;
				//default :
				vm.model 									= {};
				vm.fields 								= {};
				vm.hasJustSumitted 				= false;
				vm.hasJustCancelled 			= false;
				vm.edaSubmitThisDataModel = edaSubmitThisDataModel;
				vm.edaCancelEvent 				= edaCancelEvent;
				
				function edaSubmitThisDataModel(){
					vm.hasJustSumitted = true;
				}
				function edaCancelEvent(){
					vm.hasJustCancelled = true;
				}
											
			}
			
			
			
		}
		
})();
/**
 *  ------------------------------------------------------
 *  service : modelsTranslator
 *  ------------------------------------------------------
 *
 *  this service helps translating easy form configuration model to angualr formly model
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
;(function(){
	'use strict';
	
	angular
		.module('eda.modelsTranslator.Service', [])
		.factory('modelsTranslator', controllerModalProxy);

		controllerModalProxy.$inject = [];
		function controllerModalProxy(){
			
			var service = {
				initNyaSelect 													: initNyaSelect,
				getControlsDefinition 									: getControlsDefinition,
				refreshControlFormlyExpressionProperties: refreshControlFormlyExpressionProperties,
				refreshControlFormlyValidators					: refreshControlFormlyValidators,
				refreshControlFormlyValidation					: refreshControlFormlyValidation,
				
        initConfigurationEditFromScratch 				: initConfigurationEditFromScratch,
        bindConfigurationLines           				: bindConfigurationLines,
        applyConfigurationToformlyModel  				: applyConfigurationToformlyModel				
			};
			
			return service;
			
		}	
		
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

			
		/**
			* init object : return true (if not true, you may have problem^^)
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
		
		
		
		
		
		/**
		 * equivalent to formFielManage service in easy form generator
		 */
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

	
		
		
	
})();
})(this);