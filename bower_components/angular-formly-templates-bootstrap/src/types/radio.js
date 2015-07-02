export default ngModule => {
  ngModule.config(addRadioType);

  function addRadioType(formlyConfigProvider, formlyBootstrapApiCheck) {
    const c = formlyBootstrapApiCheck;
    formlyConfigProvider.setType({
      name: 'radio',
      template: require('./radio.html'),
      wrapper: ['bootstrapLabel', 'bootstrapHasError'],
      defaultOptions: {
        noFormControl: false
      },
      apiCheck: {
        templateOptions: c.shape({
          options: c.arrayOf(c.object),
          labelProp: c.string.optional,
          valueProp: c.string.optional
        })
      },
      apiCheckInstance: c
    });
  }
};
