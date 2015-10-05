/* global angular */
import {
	richTextTemplate,
	blankTemplate,
	subTitleTemplate,
	basicSelectTemplate,
	groupedSelectTemplate,
	datepickerTemplate,
	validationTemplate
} from './edaStepWayEasyFormGen.conf.formly.templates';


function formlyConfig(formlyConfigProvider){
	
	formlyConfigProvider.setType(
		{
			name: 'richEditor',
			//wrapper: ['bootstrapLabel', 'bootstrapHasError'],
			template: richTextTemplate
		}
	);

	formlyConfigProvider.setType(
		{
			name: 'blank',
			template: blankTemplate
		}
	);
													
	formlyConfigProvider.setType(
		{
			name: 'subTitle',
			template: subTitleTemplate
		}
	);

	formlyConfigProvider.setType(
		{
			name: 'basicSelect',
			template: basicSelectTemplate
		}
	);

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

	const attributes = [
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

	const bindings = [
		'datepicker-mode',
		'min-date',
		'max-date'
	];

	let ngModelAttrs = {};

	angular.forEach(attributes, function(attr) {
		ngModelAttrs[camelize(attr)] = {attribute: attr};
	});

	angular.forEach(bindings, function(binding) {
		ngModelAttrs[camelize(binding)] = {bound: binding};
	});

 
	formlyConfigProvider.setType({
		name: 'datepicker',
		template: datepickerTemplate,
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
				template: validationTemplate
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


formlyConfig.$inject = ['formlyConfigProvider'];

export default formlyConfig;