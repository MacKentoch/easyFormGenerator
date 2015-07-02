export default ngModule => {
  ngModule.config(addCheckboxType);

  function addCheckboxType(formlyConfigProvider, formlyBootstrapApiCheck) {
    const c = formlyBootstrapApiCheck;
    formlyConfigProvider.setType({
      name: 'checkbox',
      template: require('./checkbox.html'),
      wrapper: ['bootstrapHasError'],
      apiCheck: {
        templateOptions: c.shape({
          label: c.string
        })
      },
      apiCheckInstance: c
    });
  }
};
