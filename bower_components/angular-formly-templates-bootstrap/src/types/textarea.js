export default  ngModule => {
  ngModule.config(addTextareaType);

  function addTextareaType(formlyConfigProvider, formlyBootstrapApiCheck) {
    const c = formlyBootstrapApiCheck;
    formlyConfigProvider.setType({
      name: 'textarea',
      template: '<textarea class="form-control" ng-model="model[options.key]"></textarea>',
      wrapper: ['bootstrapLabel', 'bootstrapHasError'],
      defaultOptions: {
        ngModelAttrs: {
          rows: {attribute: 'rows'},
          cols: {attribute: 'cols'}
        }
      },
      apiCheck: {
        templateOptions: c.shape({
          rows: c.number.optional,
          cols: c.number.optional
        })
      },
      apiCheckInstance: c
    });
  }
};
