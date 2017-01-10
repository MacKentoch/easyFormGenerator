import {
  richTextTemplate,
  blankTemplate,
  headerTemplate,
  subTitleTemplate,
  basicSelectTemplate,
  groupedSelectTemplate,
  datepickerTemplate,
  validationTemplate
} from './formly.config.templates';


function formlyConfig(formlyConfigProvider){
  formlyConfigProvider.setType(
    {
      name: 'richEditor',
      template: richTextTemplate.template,
      wrapper: ['bootstrapLabel', 'bootstrapHasError']
    }
  );

  formlyConfigProvider.setType(
    {
      name: 'blank',
      template: blankTemplate.template
    }
  );

  formlyConfigProvider.setType(
    {
      name: 'header',
      template: headerTemplate.template
    }
  );

  formlyConfigProvider.setType(
    {
      name: 'subTitle',
      template: subTitleTemplate.template
    }
  );

  formlyConfigProvider.setType(
    {
      name: 'basicSelect',
      template: basicSelectTemplate.template,
      wrapper: ['bootstrapLabel', 'bootstrapHasError']
    }
  );

  formlyConfigProvider.setType(
    {
      name: 'groupedSelect',
      template: groupedSelectTemplate.template,
      wrapper: ['bootstrapLabel', 'bootstrapHasError']
    }
  );

  // implement from : http://jsbin.com/koredu/edit?js,output
  // formlyConfigProvider.setType({
  //     name: 'upload',
  //     extends: 'input',
  //     wrapper: ['bootstrapLabel', 'bootstrapHasError'],
  //     link: function(scope, el, attrs) {
  //       el.on("change", function(changeEvent) {
  //         var file = changeEvent.target.files[0];
  //         if (file) {
  //           // console.log('scope.id', scope.id);
  //           var fd = new FormData();
  //           // use key on backEnd
  //           fd.append('uploadFile', file);
  //           scope.$emit('fileToUpload', fd);
  //           var fileProp = {};
  //           for (var properties in file) {
  //             if (!angular.isFunction(file[properties])) {
  //               fileProp[properties] = file[properties];
  //             }
  //           }
  //           scope.fc.$setViewValue(fileProp);
  //         } else {
  //           scope.fc.$setViewValue(undefined);
  //         }
  //       });
  //       el.on("focusout", (focusoutEvent) => {
  //         // dont run validation , user still opening pop up file dialog
  //         if ($window.document.activeElement.id === scope.id) {
  //           // so we set it untouched
  //           scope.$apply(function(scope) {
  //             scope.fc.$setUntouched();
  //           });
  //         } else {
  //           // element losing focus so we trigger validation
  //           scope.fc.$validate();
  //         }
  //       });
  //     },
  //     defaultOptions: {
  //       templateOptions: {
  //         type: 'file',
  //         required: true
  //       }
  //     }
  //   });

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

  const ngModelAttrs = {};
  angular.forEach(attributes, (attr) => {
    ngModelAttrs[camelize(attr)] = {attribute: attr};
  });

  angular.forEach(bindings, (binding) => {
    ngModelAttrs[camelize(binding)] = {bound: binding};
  });

  formlyConfigProvider.setType({
    name: 'datepicker',
    template: datepickerTemplate.template,
    defaultOptions: {
      ngModelAttrs: ngModelAttrs,
      templateOptions: {
        datepickerOptions: {
          format: 'dd/MM/yyyy',
          initDate: new Date(),
          showWeeks: false
        }
      }
    },
    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
    controller: ['$scope', ($scope) => {
      $scope.datepicker = {};
      // make sure the initial value is of type DATE!
      var currentModelVal = $scope.model[$scope.options.key];
      if (typeof (currentModelVal) == 'string'){
        $scope.model[$scope.options.key] = new Date(currentModelVal);
      }
      $scope.datepicker.opened = false;
      $scope.datepicker.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.datepicker.opened = !$scope.datepicker.opened;
      };
    }]
  });

  /**
    * wrappers to show validation errors
    * without having to rewrite formly types
    */
  formlyConfigProvider.setWrapper([
    {
      template: validationTemplate.template
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
