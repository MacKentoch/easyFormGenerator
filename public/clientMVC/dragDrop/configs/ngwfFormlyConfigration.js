/**
 *  ------------------------------------------------------
 *  configuration ngwfFormlyConfig
 *  ------------------------------------------------------
 *
 *  formly configuration
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
	.module('ngwfApp')
	.config([	'formlyConfigProvider',
						'EasyFormGenFormlyBindingModelsProvider',

	function (formlyConfigProvider, EasyFormGenFormlyBindingModelsProvider) {

		/**
		 * Add blanck control
		 *
		 * 1- in formlyConfigProvider
		 * 2- in EasyFormGenFormlyBindingModelsProvider
		 */
		formlyConfigProvider.setType(
		 	{
				name  		: 'blank',
				template 	: '<div></div>'
		  }
		);

		EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList(
				{
						id 								: 'empty',  
						name 							: 'no control', 
						subtitle 					: 'no control', 
						group 						: 'Blank', 
						formlyType 				: 'blank', 
						formlySubtype 		: '', 
						formlyLabel 			: '', 
						formlyRequired 		: false, 
						formlyDesciption 	: '', 
						formlyOptions 		: []
				}
		);

		/**
		 * Add header
		 *
		 * note : formly header template already exists
		 * no need to create a custom one
		 *
		 * just declare in EasyFormGenFormlyBindingModelsProvider
		 */
		EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList(
				{
					id 								: 'Header',  
					name 							: 'Header', 
					subtitle 					: 'no control', 
					group 						: 'Decoration', 
					formlyType 				: 'header', 
					formlySubtype 		: '', 
					formlyLabel 			: '', 
					formlyRequired 		: false, 
					formlyDesciption 	: '', 
					formlyOptions 		: []
				}
		);

		/**
		 * Add subTitle control
		 *
		 * 1- in formlyConfigProvider
		 * 2- in EasyFormGenFormlyBindingModelsProvider
		 */
		var subTitleTemplate =	[
															'<div class="row">', 
															'  <div class="">', 
															'    <h4 class="text-center">{{options.templateOptions.placeholder}}<h4>', 
															'    <hr/>',
															'  </div>',
															'</div>'
														].join(' ');

		formlyConfigProvider.setType(
		 	{
				name 			: 'subTitle',
				template 	: subTitleTemplate
		  }
		);

		EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList(
				{
					id 								: 'Subtitle',  
					name 							: 'Subtitle', 
					subtitle 					: 'no control', 
					group 						: 'Decoration', 
					formlyType 				: 'subTitle', 
					formlySubtype 		: '', 
					formlyLabel 			: '', 
					formlyRequired 		: false, 
					formlyDesciption 	: '', 
					formlyOptions 		: []
				}
		);

		/**
		 * Add text input (basic)
		 *
		 * note : formly template already exists
		 * no need to create a custom one
		 *
		 * just declare in EasyFormGenFormlyBindingModelsProvider
		 */
		EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList(
				{
					id 								: 'TextInput',  
					name 							: 'Text input', 
					subtitle 					: 'Text input', 
					group 						: 'input', 
					formlyType 				: 'input', 
					formlySubtype 		: '', 
					formlyLabel 			: '', 
					formlyRequired 		: false, 
					formlyDesciption 	: '', 
					formlyOptions 		: []
				}
		);

		/**
		 * Add text input (Password)
		 *
		 * note : formly template already exists
		 * no need to create a custom one
		 *
		 * just declare in EasyFormGenFormlyBindingModelsProvider
		 */
		EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList(
				{
					id 								: 'Password',  
					name 							: 'Password', 
					subtitle 					: 'Password', 
					group 						: 'input', 
					formlyType 				: 'input', 
					formlySubtype 		: 'password', 
					formlyLabel 			: '', 
					formlyRequired 		: false, 
					formlyDesciption 	: '', 
					formlyOptions 		: []}
		);

		/**
		 * Add angular UI date picker
		 *
		 * thx Kent C. Dodds for formly config template (since it was a huge config)
		 */
		var attributes =	[
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

		var bindings =	[
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

	  function camelize(string) {
	    string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
	      return chr ? chr.toUpperCase() : '';
	    });
	    // Ensure 1st char is always lowercase
	    return string.replace(/^([A-Z])/, function(match, chr) {
	      return chr ? chr.toLowerCase() : '';
	    });
	  } 		

	  var angularUIDatePickerTemplate =	[
																				'<input ',
																				'      id="{{id}}" ',
																				'      class="form-control" ',
																				'      ng-click="open($event)"',
																				'      ng-model="model[options.key || index]" is-open="to.isOpen"',
																				'      ng-click="to.isOpen = true" ',
																				'      datepicker-options="to.datepickerOptions"',
																				'/>'
	  																	].join(' ');
 
		formlyConfigProvider.setType({
		  name 				: 'datepicker',
		  template 		: angularUIDatePickerTemplate,
		  wrapper 		: ['bootstrapLabel', 'bootstrapHasError'],
		  controller 	: [	'$scope', 
		  								function($scope) {
														     $scope.open = function($event) {
														      $event.preventDefault();
														      $event.stopPropagation();
														      $scope.opened = true;
														    };
		   								}
		   							],
		  defaultOptions : {
										    ngModelAttrs 		: ngModelAttrs,
										    templateOptions : {
																			      addonLeft: {
																			        class: 'glyphicon glyphicon-calendar',
																			        onClick: function(options) {
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

		EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList(
				{
					id 								: 'Date',  
					name 							: 'Date', 
					subtitle 					: 'Date', 
					group 						: 'input', 
					formlyType 				: 'datepicker', 
					formlySubtype 		: '', 
					formlyLabel 			: '', 
					formlyRequired 		: false, 
					formlyDesciption 	: '', 
					formlyOptions 		: [], 
					datepickerPopup 	: 'dd-MMMM-yyyy'
				}
		);

		/**
		 * Add textarea
		 *
		 * note : formly template already exists
		 * no need to create a custom one
		 *
		 * just declare in EasyFormGenFormlyBindingModelsProvider
		 */
		EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList(
				{
					id 								: 'Texarea', 
					name 							: 'Textarea', 
					subtitle 					: 'Textarea', 
					group 						: 'Textarea', 
					formlyType 				: 'textarea', 
					formlySubtype 		: '', 
					formlyLabel 			: '', 
					formlyRequired 		: false, 
					formlyDesciption 	: '', 
					formlyOptions 		: []
				}
		);		

		/**
		 * Add rich text editor control
		 *
		 */
		var richTexEditorTemplate =	[
																	'<text-angular name="{{id}}" ', 
																	'              class="richTextAngular" ',
																	'              ng-model="model[options.key || index]">', 
																	'</text-angular>'
																].join(' ');
		formlyConfigProvider.setType(
		  {
				name     	: 'richEditor',
				template 	: richTexEditorTemplate
		  }
		);

		EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList(
				{
					id 								: 'RichTextEditor', 
					name 							: 'RichTextEditor', 
					subtitle 					: 'RichTextEditor', 
					group 						: 'Textarea', 
					formlyType 				: 'richEditor', 
					formlySubtype 		: '', 
					formlyLabel 			: '', 
					formlyRequired 		: false, 
					formlyDesciption 	: '', 
					formlyOptions 		: []
				}
		);

		/**
		 * Add textarea
		 *
		 * note : formly template already exists
		 * no need to create a custom one
		 *
		 * just declare in EasyFormGenFormlyBindingModelsProvider
		 */
		EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList(
				{
					id 								: 'Radio', 
					name 							: 'Radio', 
					subtitle 					: 'Radio', 
					options 					: [], 
					group 						: 'Radio', 
					formlyType 				: 'radio', 
					formlySubtype 		: '', 
					formlyLabel 			: '', 
					formlyRequired 		: false, 
					formlyDesciption 	: '' , 
					formlyOptions 		: []
				}
		);		

		/**
		 * Add checkbox
		 *
		 * note : formly template already exists
		 * no need to create a custom one
		 *
		 * just declare in EasyFormGenFormlyBindingModelsProvider
		 */
		EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList(
				{
					id 								: 'Checkbox', 
					name 							: 'Checkbox', 
					subtitle 					: 'Checkbox', 
					group 						: 'Checkbox', 
					formlyType 				: 'checkbox', 
					formlySubtype 		: '', 
					formlyLabel 			: '', 
					formlyRequired 		: false, 
					formlyDesciption 	: '', 
					formlyOptions 		: []
				}
		);

		/**
		 * Add basic Select control
		 *
		 * using nya-bs-select
		 */
		var basicSelectTemplate =	[
																' <ol class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12" ', 
																'		ng-model="model[options.key || index]"  ', 
																'		id="{{id}}"  ', 
																'		disabled="options.templateOptions.options.length === 0"> ',
																'   <li class="nya-bs-option" nya-bs-option="option in options.templateOptions.options"> ',
																'     <a>{{option.name}}</a> ',
																'   </li> ',
																' </ol> '
															].join(''); 	

		formlyConfigProvider.setType(
		 	{
				name 			: 'basicSelect',
				template 	: basicSelectTemplate
		  }
		);

		EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList(
				{
					id 								: 'BasicSelect', 
					name 							: 'Basic select', 
					subtitle 					: 'Basic select',
					options 					: [], 
					group 						: 'Select', 
					formlyType 				: 'basicSelect', 
					formlySubtype 		: '', 
					formlyLabel 			: '', 
					formlyRequired 		: false, 
					formlyDesciption 	: '', 
					formlyOptions 		: []
				}
		);		

		/**
		 * Add Grouped Select control
		 *
		 * using nya-bs-select
		 */
    var groupedSelectTemplate =	[
																		'  <ol class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12" ',
																		'		   ng-model="model[options.key || index]" ',
																		'      data-live-search="true" ',
																		'      disabled="options.templateOptions.options.length === 0">',
																		'      <li nya-bs-option="option in  options.templateOptions.options group by option.group">  ',
																		'        <span class="dropdown-header">{{$group}}</span>',
																		'        <a>',
																		'          <span>{{option.name}}</span>',
																		'          <span class="glyphicon glyphicon-ok check-mark"></span>',
																		'        </a>',
																		'      </li>',
																		'  </ol>'
     															].join(' ');
		formlyConfigProvider.setType(
			{
				name   		: 'groupedSelect',
				template 	: groupedSelectTemplate
			}
		);

		EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList(
				{
					id 								: 'GroupedSelect', 
					name 							: 'Grouped Select', 
					subtitle 					: 'Grouped Select',
					options 					: [], 
					group 						: 'Select', 
					formlyType 				: 'groupedSelect', 
					formlySubtype 		: '', 
					formlyLabel 			: '', 
					formlyRequired 		: false, 
					formlyDesciption 	: '', 
					formlyOptions 		: []}
		);			

 
	}]);

