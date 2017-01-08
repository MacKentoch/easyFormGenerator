function formlyConfig(formlyConfigProvider, EasyFormGenFormlyBindingModelsProvider, easyFormDragWayConfigProvider) {

  formlyConfigProvider.setType({
    name  		: 'blank',
    template 	: '<div></div>'
  });

  EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList({
    id 								: 'empty',
    name 							: 'no control',
    subtitle 					: 'no control',
    group 						: 'Blank',
    formlyType 				: 'blank',
    formlySubtype 		: '',
    formlyLabel 			: '',
    formlyRequired 		: false,
    formlyDescription 	: '',
    formlyOptions 		: []
  });

  easyFormDragWayConfigProvider.addControlToDragDropPresentationModel({
    label 	:
      `<div class="col-md-12">
          <div class="form-group">
            <div class="">
            </div>
          </div>
      </div>`,
    control : 'empty',
    cssClass: 'col-xs-12'
    },
    {
      addToGroupCtrl : 'blank'
    });



  EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList({
    id 								: 'Header',
    name 							: 'Header',
    subtitle 					: 'no control',
    group 						: 'Decoration',
    formlyType 				: 'header',
    formlySubtype 		: '',
    formlyLabel 			: '',
    formlyRequired 		: false,
    formlyDescription 	: '',
    formlyOptions 		: []
  });


  easyFormDragWayConfigProvider.addControlToDragDropPresentationModel({
    label 	: [
      `<div class="col-md-12">
          <div class="form-group">
            <div class="">
              <h2 class="text-center">Header</h2>
              <hr/>
            </div>
          </div>
      </div>`
      ].join(''),
    control : 'Header',
    cssClass: 'col-xs-12'
    },
    {
      addToGroupCtrl : 'headers'
    });


  const subTitleTemplate = `
    <div class="row">
      <div class="">
        <h4 class="text-center">{{options.templateOptions.placeholder}}<h4>
        <hr/>
      </div>
    </div>`;

  formlyConfigProvider.setType({
    name 			: 'subTitle',
    template 	: subTitleTemplate
  });

  EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList({
    id 								: 'Subtitle',
    name 							: 'Subtitle',
    subtitle 					: 'no control',
    group 						: 'Decoration',
    formlyType 				: 'subTitle',
    formlySubtype 		: '',
    formlyLabel 			: '',
    formlyRequired 		: false,
    formlyDescription 	: '',
    formlyOptions 		: []
  });

  easyFormDragWayConfigProvider.addControlToDragDropPresentationModel({
    'label' 	:
      `<div class="col-md-12">
          <div class="form-group">
            <div class="">
              <h4 class="text-center">SubTitle</h4>
              <hr/>
            </div>
          </div>
      </div>`,
    'control'	: 'Subtitle',
    'cssClass': 'col-xs-12'
    },
    {
      addToGroupCtrl : 'headers'
    });

  EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList({
    id 								: 'TextInput',
    name 							: 'Text input',
    subtitle 					: 'Text input',
    group 						: 'input',
    formlyType 				: 'input',
    formlySubtype 		: '',
    formlyLabel 			: '',
    formlyRequired 		: false,
    formlyDescription 	: '',
    formlyOptions 		: []
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
      'label' 	:
        `<div class="col-md-12">
          <div class="form-group">
            <label for="inputText" class="control-label textControlLabel pull-left">
              title for text input<span class="textControlLabel ng-scope">*</span>
            </label>
            <div class="">
              <input type="text" disabled class="form-control fakeControl" id="inputText" placeholder="basic input">
              <p class="help-block pull-left">Description</p>
            </div>
          </div>
        </div>`,
      'control'	: 'TextInput',
      'cssClass': 'col-xs-12'
    },
    {
      addToGroupCtrl : 'inputs'
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
  EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList({
      id 								: 'Password',
      name 							: 'Password',
      subtitle 					: 'Password',
      group 						: 'input',
      formlyType 				: 'input',
      formlySubtype 		: 'password',
      formlyLabel 			: '',
      formlyRequired 		: false,
      formlyDescription 	: '',
      formlyOptions 		: []
    }
  );
  /**
   * drag and drop text input — password —control template
   *
    *
    * @PARAM 1 : control template object (drag an drop)
    * @PARAM 2 : object to indicates in which group of control it will be inserted
    *  					(related to _dragDropConfigModel.containerConfig.decoration in dragDropConfig provider)
    */
  easyFormDragWayConfigProvider.addControlToDragDropPresentationModel({
      'label' 	:
        `<div class="col-md-12">
          <div class="form-group">
            <label for="inputPass" class="control-label textControlLabel ng-binding pull-left">
            title for password input<span class="textControlLabel ng-scope">*</span>
            </label>
            <div class="">
              <input type="password" disabled class="form-control fakeControl" id="inputPass" placeholder="password input">
              <p class="help-block ng-binding pull-left">Description</p>
            </div>
          </div>
        </div>`,
      'control'	: 'Password',
      'cssClass': 'col-xs-12'
    },
    {
      addToGroupCtrl : 'inputs'
    }
  );

  /**
   * Add angular UI date picker
   *
    * thx Kent C. Dodds for formly config template (since it was a huge config)
    */
  const attributes =	[
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
    'uib-datepicker-popup',
    'show-button-bar',
    'current-text',
    'clear-text',
    'close-text',
    'close-on-date-selection',
    'datepicker-append-to-body'
  ];

  const bindings =	[
    'datepicker-mode',
    'min-date',
    'max-date'
  ];

  let ngModelAttrs = {};

  angular.forEach(attributes, (attr) => ngModelAttrs[camelize(attr)] = {attribute: attr});
  angular.forEach(bindings, (binding) => ngModelAttrs[camelize(binding)] = {bound: binding});

  function camelize(string) {
    string = string.replace(/[\-_\s]+(.)?/g, (match, chr) => chr ? chr.toUpperCase() : '');
    // Ensure 1st char is always lowercase
    return string.replace(/^([A-Z])/, (match, chr) => chr ? chr.toLowerCase() : '');
  }

  const angularUIDatePickerTemplate =	`
    <input
      id="{{id}}"
      class="form-control"
      ng-click="open($event)"
      uib-datepicker-popup
      ng-model="model[options.key || index]" is-open="to.isOpen"
      ng-click="to.isOpen = true"
      datepicker-options="to.datepickerOptions"/>`;

  formlyConfigProvider.setType({
    name 				: 'datepicker',
    template 		: angularUIDatePickerTemplate,
    wrapper 		: ['bootstrapLabel', 'bootstrapHasError'],
    controller 	: [	'$scope', ($scope) => {
          $scope.open = $event => {
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
          class   : 'glyphicon glyphicon-calendar',
          onClick : (options) => options.templateOptions.isOpen = !options.templateOptions.isOpen
        },
        onFocus   : ($viewValue, $modelValue, scope) => scope.to.isOpen = !scope.to.isOpen,
        datepickerOptions: {}
      }
    }
  });

  EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList({
      id 								: 'Date',
      name 							: 'Date',
      subtitle 					: 'Date',
      group 						: 'input',
      formlyType 				: 'datepicker',
      formlySubtype 		: '',
      formlyLabel 			: '',
      formlyRequired 		: false,
      formlyDescription 	: '',
      formlyOptions 		: [],
      datepickerPopup 	: 'dd-MMMM-yyyy'
    }
  );
  /**
   * drag and drop text input — date — control template (using angular UI datepicker)
   *
    *
    * @PARAM 1 : control template object (drag an drop)
    * @PARAM 2 : object to indicates in which group of control it will be inserted
    *  					(related to _dragDropConfigModel.containerConfig.decoration in dragDropConfig provider)
    */
  easyFormDragWayConfigProvider.addControlToDragDropPresentationModel({
    label 	:`
    <div class="col-md-12">
      <div class="form-group">
        <label for="inputDate" class="control-label textControlLabel ng-binding pull-left">
         title for date input<span class="textControlLabel ng-scope">*</span>
        </label>
        <div class="col-xs-12 col-sm-12 col-md-12 demoddDatepicker">
					<div class="input-group">
  					<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
  					<input type="text" disabled class="form-control fakeControl">
					</div>
				</div>
        <p class="help-block pull-left">description</p>
      </div>
     </div>`,
    control	: 'Date',
    cssClass: 'col-xs-12'
  },
  {
    addToGroupCtrl : 'inputs'
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
    id 								: 'Texarea',
    name 							: 'Textarea',
    subtitle 					: 'Textarea',
    group 						: 'Textarea',
    formlyType 				: 'textarea',
    formlySubtype 		: '',
    formlyLabel 			: '',
    formlyRequired 		: false,
    formlyDescription 	: '',
    formlyOptions 		: []
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
    'label' 	: `
      <div class="col-md-12">
          <div class="form-group">
            <label for="textArea" class="control-label
      							textControlLabel pull-left">title for textarea <span class="textControlLabel">*</span></label>
            <div class="">
              <textarea disabled class="form-control dragItemtextarea fakeControl" ng-model="model[options.key]" rows="1" id="textArea"></textarea>
              <p class="help-block pull-left">description</p>
            </div>
          </div>
      </div>`,
    'control'	: 'Texarea',
    'cssClass': 'col-xs-12'
  },
  {
    addToGroupCtrl : 'textareas'
  });

  /**
   * Add rich text editor control (using textAngular)
   *
   */
  let richTexEditorTemplate =`
    <text-angular name="{{id}}"
                  class="richTextAngular"
                  ng-model="model[options.key || index]">
    </text-angular>`;

  formlyConfigProvider.setType({
    name     	: 'richEditor',
    template 	: richTexEditorTemplate
  });

  EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList({
    id 								: 'RichTextEditor',
    name 							: 'RichTextEditor',
    subtitle 					: 'RichTextEditor',
    group 						: 'Textarea',
    formlyType 				: 'richEditor',
    formlySubtype 		: '',
    formlyLabel 			: '',
    formlyRequired 		: false,
    formlyDescription 	: '',
    formlyOptions 		: []
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
    label 	: `
      <div class="col-md-12">
          <div class="form-group">
            <label for="textArea" class="control-label
      							textControlLabel pull-left">title for rich text editor <span class="textControlLabel">*</span></label>
            <div class="">
              <textarea disabled class="form-control dragItemtextarea fakeControl" ng-model="model[options.key]" rows="1" id="textArea"></textarea>
              <p class="help-block">description</p>
            </div>
          </div>
      </div>`,
    control	: 'RichTextEditor',
    cssClass: 'col-xs-12'
  },
  {
    addToGroupCtrl : 'textareas'
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
    id 								: 'Radio',
    name 							: 'Radio',
    subtitle 					: 'Radio',
    options 					: [],
    group 						: 'Radio',
    formlyType 				: 'radio',
    formlySubtype 		: '',
    formlyLabel 			: '',
    formlyRequired 		: false,
    formlyDescription 	: '' ,
    formlyOptions 		: []
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
    'label' 	: `
      <div class="col-md-12">
        <div class="form-group">
          <label for="vertRadio" class="control-label textControlLabel pull-left">title for radio <span class="textControlLabel">*</span></label>
          <div class="interligne"></div>
          <div class="pull-left">
            <div class="radio">
              <label class="fakeCheck">
                <input type="radio" disabled name="optionsRadios" class="fakeCheck" id="optionsRadio-0" value="verticalRadio0" checked="">
                option1
              </label>
            </div>
            <div class="radio">
              <label class="fakeCheck">
                <input type="radio" disabled name="optionsRadios" class="fakeCheck"  id="optionsRadio-1" value="verticalRadio1" checked="">
                option2
              </label>
            </div>
            <p class="help-block pull-left">description</p>
          </div>
        </div>
      </div>`,
    'control'	: 'Radio',
    'cssClass': 'col-xs-12'
  },
  {
    addToGroupCtrl : 'radios'
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
    id 								: 'Checkbox',
    name 							: 'Checkbox',
    subtitle 					: 'Checkbox',
    group 						: 'Checkbox',
    formlyType 				: 'checkbox',
    formlySubtype 		: '',
    formlyLabel 			: '',
    formlyRequired 		: false,
    formlyDescription 	: '',
    formlyOptions 		: []
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
    label 	: `
    <div class="col-md-12">
      <div class="checkbox">
        <label class="fakeCheck">
          <input type="checkbox" disabled class="fakeCheck" id="checkBox">
      		<span class="blackText ng-binding">label for checkbox </span>
      		<span class="textControlLabel ng-scope">*</span>
        </label>
      </div>
      <p class="help-block ng-binding">description</p>
    </div>`,
    control	: 'Checkbox',
    cssClass: 'col-xs-12'
  },
  {
    addToGroupCtrl : 'checkboxes'
  });

  /**
   * Add basic Select control
   *
    * using nya-bs-select
    */
  let basicSelectTemplate =	`
   <ol class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12"
  		ng-model="model[options.key || index]"
  		id="{{id}}"
  		disabled="options.templateOptions.options.length === 0">
     <li class="nya-bs-option" nya-bs-option="option in options.templateOptions.options">
       <a>{{option.name}}</a>
     </li>
   </ol> `;

  formlyConfigProvider.setType({
    name 			: 'basicSelect',
    template 	: basicSelectTemplate
  });

  EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList({
    id 								: 'BasicSelect',
    name 							: 'Basic select',
    subtitle 					: 'Basic select',
    options 					: [],
    group 						: 'Select',
    formlyType 				: 'basicSelect',
    formlySubtype 		: '',
    formlyLabel 			: '',
    formlyRequired 		: false,
    formlyDescription 	: '',
    formlyOptions 		: []
  });

  /**
   * drag and drop basic select control template (using textAngular)
   *
    *
    * @PARAM 1 : control template object (drag an drop)
    * @PARAM 2 : object to indicates in which group of control it will be inserted
    *  					(related to _dragDropConfigModel.containerConfig.decoration in dragDropConfig provider)
    */
  easyFormDragWayConfigProvider.addControlToDragDropPresentationModel(
  {
    label 	: `
      <div class="col-md-12">
        <div class="form-group">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 selectfordemo">

      <ol class="nya-bs-select col-xs-12 col-sm-12 col-md-12 col-lg-12 ng-valid btn-group ng-dirty ng-valid-parse ng-touched"
      	ng-model="fakeModelNyaSelectBasic"
      	data-live-search="false">

         <button class="btn btn-default dropdown-toggle" disabled type="button">
      		 <span class="pull-left filter-option">
      			 <span class="ng-binding">Basic select</span>
      		</span>
      		&nbsp;<span class="caret"></span>
        </button>

      </div>
      </div>`,
    control	: 'BasicSelect',
    cssClass: 'col-xs-12'
  },
  {
    addToGroupCtrl : 'selects'
  });

  /**
   * Add Grouped Select control
   *
    * using nya-bs-select
    */
  let groupedSelectTemplate =	`
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

  formlyConfigProvider.setType({
    name   		: 'groupedSelect',
    template 	: groupedSelectTemplate
  });

  EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList({
    id 								: 'GroupedSelect',
    name 							: 'Grouped Select',
    subtitle 					: 'Grouped Select',
    options 					: [],
    group 						: 'Select',
    formlyType 				: 'groupedSelect',
    formlySubtype 		: '',
    formlyLabel 			: '',
    formlyRequired 		: false,
    formlyDescription 	: '',
    formlyOptions 		: []
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
    label 	: `
      <div class="col-md-12">
          <div class="form-group">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 selectfordemo">
      <ol class="nya-bs-select col-xs-12 col-sm-12 col-md-12 col-lg-12 ng-valid btn-group ng-dirty ng-valid-parse ng-touched"
      	ng-model="fakeModelNyaSelectBasic"
      	data-live-search="false">
         <button class="btn btn-default dropdown-toggle" disabled type="button">
      		 <span class="pull-left filter-option">
      			 <span class="ng-binding">Grouped select</span>
      		</span>
      		&nbsp;<span class="caret"></span>
      </button>
      </div>
      </div>`,
    control	: 'GroupedSelect',
    cssClass: 'col-xs-12'
  },
  {
    addToGroupCtrl : 'selects'
  });


}

formlyConfig.$inject = [
  'formlyConfigProvider',
  'EasyFormGenFormlyBindingModelsProvider',
  'easyFormDragWayConfigProvider'
];

export default formlyConfig;
