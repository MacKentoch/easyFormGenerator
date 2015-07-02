export default ngModule => {
  ngModule.config(addCheckboxType);

  function addCheckboxType(formlyConfigProvider, formlyBootstrapApiCheck) {
    const c = formlyBootstrapApiCheck;
    formlyConfigProvider.setType({
      name: 'multiCheckbox',
      template: require('./multiCheckbox.html'),
      wrapper: ['bootstrapLabel', 'bootstrapHasError'],
      apiCheck: {
        templateOptions: c.shape({
          options: c.arrayOf(c.object),
          labelProp: c.string.optional,
          valueProp: c.string.optional
        })
      },
      defaultOptions: {
        noFormControl: false,
        ngModelAttrs:{
          required: {
            attribute: '',
            bound: ''
          }
        }
      },
      apiCheckInstance: c,
      controller: /* @ngInject */ function($scope) {
        const to = $scope.to;
        const opts = $scope.options;
        $scope.multiCheckbox = {
          checked: [],
          change: setModel
        };

        // initialize the checkboxes check property
        const modelValue = $scope.model[opts.key];
        if (angular.isArray(modelValue)) {
          const valueProp = to.valueProp || 'value';
          angular.forEach(to.options, function(v, index) {
            $scope.multiCheckbox.checked[index] = modelValue.indexOf(v[valueProp]) !== -1;
          });
        }

        function checkValidity(expressionValue){
          var valid = angular.isArray($scope.model[opts.key]) &&
            $scope.model[opts.key].length > 0 &&
            expressionValue;

          $scope.fc.$setValidity('required', valid);
        }

        function setModel() {
          $scope.model[opts.key] = [];
          angular.forEach($scope.multiCheckbox.checked, (checkbox, index) => {
            if (checkbox) {
              $scope.model[opts.key].push(to.options[index][to.valueProp || 'value']);
            }
          });

          // Must make sure we mark as touched because only the last checkbox due to a bug in angular.
          $scope.fc.$setTouched();
          checkValidity(true);
        }

        if(opts.expressionProperties && opts.expressionProperties.required){
          $scope.$watch($scope.options.expressionProperties.required, function(newValue){
            checkValidity(newValue);
          });
        }

        if($scope.to.required){
          var unwatchFormControl = $scope.$watch('fc', function(newValue){
            if(!newValue){ return; }
            checkValidity(true);
            unwatchFormControl;
          });
        }
      }
    });
  }

};
