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
	.config(['formlyConfigProvider',

	function (formlyConfigProvider) {
		/**
		 * Add rich text editor control
		 *
		 * using textAngular
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
		/**
		 * Add blanck control
		 */
		formlyConfigProvider.setType(
		 	{
				name  		: 'blank',
				template 	: '<div></div>'
		  }
		);
		/**
		 * Add subTitle control
		 *
		 * define a template 1st
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

		/**
		 * Add angular UI date picker
		 *
		 * thx Kent C. Dodds (since it was a huge config)
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

 
	}]);

