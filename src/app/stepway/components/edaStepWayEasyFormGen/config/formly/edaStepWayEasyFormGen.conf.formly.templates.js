
const richTextTemplate = `
	<text-angular name="{{id}}"
		class="richTextAngular"
		ng-model="model[options.key || index]">
	</text-angular>`;


const blankTemplate = `<div></div>`;


const subTitleTemplate = `
	<div class="row">
		<div class="">
			<h4 class="text-center">
			{{options.templateOptions.placeholder}}
			<h4><hr/>
		</div>
	</div>`;

const basicSelectTemplate = `
<ol
	class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12"
	ng-model="model[options.key || index]"
	id="{{id}}"
	disabled="options.templateOptions.options.length === 0">
	<li class="nya-bs-option" nya-bs-option="option in options.templateOptions.options">
		<a>{{option.name}}</a>
	</li>
</ol>`;

const groupedSelectTemplate = `
	<ol class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12"
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

const datepickerTemplate = `
<p class="input-group">
  <span class="input-group-btn">
      <button
        type="button"
        class="btn btn-default"
        ng-click="formlyDatePicker.open($event)">
        <i class="glyphicon glyphicon-calendar"></i>
      </button>
  </span>
  <input  type="text"
          id="{{::id}}"
          name="{{::id}}"
          ng-model="model[options.key]"
          class="form-control"
          ng-click="datepicker.open($event)"
          uib-datepicker-popup="{{to.datepickerOptions.format}}"
          is-open="datepicker.opened"
          datepicker-options="to.datepickerOptions"
  />
</p>
`;

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

export {
	richTextTemplate,
	blankTemplate,
	subTitleTemplate,
	basicSelectTemplate,
	groupedSelectTemplate,
	datepickerTemplate,
	validationTemplate
};
