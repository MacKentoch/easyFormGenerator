export default  ngModule => {
  ngModule.config(addSelectType);

  const template = `<select class="form-control" ng-model="model[options.key]"></select>`;

  function addSelectType(formlyConfigProvider, formlyBootstrapApiCheck) {
    const c = formlyBootstrapApiCheck;
    formlyConfigProvider.setType({
      name: 'select',
      template,
      wrapper: ['bootstrapLabel', 'bootstrapHasError'],
      defaultOptions(options) {
        /* jshint maxlen:195 */
        let ngOptions = options.templateOptions.ngOptions || `option[to.valueProp || 'value'] as option[to.labelProp || 'name'] group by option[to.groupProp || 'group'] for option in to.options`;
        return {
          ngModelAttrs: {
            [ngOptions]: {
              value: 'ng-options'
            }
          }
        };
      },
      apiCheck: {
        templateOptions: c.shape({
          options: c.arrayOf(c.object),
          labelProp: c.string.optional,
          valueProp: c.string.optional,
          groupProp: c.string.optional
        })
      },
      apiCheckInstance: c
    });
  }
};
