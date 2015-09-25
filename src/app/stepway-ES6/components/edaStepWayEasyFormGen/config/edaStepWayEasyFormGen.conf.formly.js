function formlyConfig(formlyConfigProvider){
	
	formlyConfigProvider.setType(
		{
			name: 'richEditor',
			//wrapper: ['bootstrapLabel', 'bootstrapHasError'],
			template:`<text-angular name="{{id}}" 
															class="richTextAngular" 
															ng-model="model[options.key || index]">
								</text-angular>`
		}
	);

	formlyConfigProvider.setType(
		{
			name: 'blank',
			template: '<div></div>'
		}
	);


	const subTitleTemplate = `<div class="row">
														<div class="">
															<h4 class="text-center">
															{{options.templateOptions.placeholder}}
															<h4><hr/>
														</div>
													</div>`;
													
	formlyConfigProvider.setType(
		{
			name: 'subTitle',
			template: subTitleTemplate
		}
	);

	const basicSelectTemplate = ` <ol  class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12" 
								   ng-model="model[options.key || index]"  
									   id="{{id}}"  
								   disabled="options.templateOptions.options.length === 0">  
									   <li class="nya-bs-option" nya-bs-option="option in options.templateOptions.options">  
									     <a>{{option.name}}</a> 
									   </li>  
									 </ol>    ` ;

	formlyConfigProvider.setType(
		{
			name: 'basicSelect',
			template: basicSelectTemplate
		}
	);


	const groupedSelectTemplate = `<ol class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12" 
								    						ng-model="model[options.key || index]" 
								       					data-live-search="true" 
								       					disabled="options.templateOptions.options.length === 0">
															 	<li nya-bs-option="option in  options.templateOptions.options group by option.group">
																	<span class="dropdown-header">{{$group}}</span> 
																	<a>
																		<span>{{option.name}}</span>
																		<span class="glyphicon glyphicon-ok check-mark"></span>
																	</a>
																</li>
															</ol>`;

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


	const datepickerTemplate = `	<input  id="{{id}}" 
																				class="form-control" 
																				ng-click="open($event)" 
																				ng-model="model[options.key  || index]" 
																				is-open="to.isOpen" 
																				ng-click="to.isOpen = true" 
																				datepicker-options="to.datepickerOptions" />`; 
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
	const validationTemplate = `
		<div class="formly-template-wrapper form-group"
							ng-class="{\'has-error\': options.validation.errorExistsAndShouldBeVisible}">
					<formly-transclude></formly-transclude>
					<div class="validation"
								ng-if="options.validation.errorExistsAndShouldBeVisible"
								ng-messages="options.formControl.$error">
						<div ng-messages-include="validation.html"></div>
						<div ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages">
							{{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}
						</div>
					</div>
				</div>`;
				
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