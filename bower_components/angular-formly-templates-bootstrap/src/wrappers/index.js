export default ngModule => {
  ngModule.config(addWrappers);

  function addWrappers(formlyConfigProvider, formlyBootstrapApiCheck) {
    const c = formlyBootstrapApiCheck;
    formlyConfigProvider.setWrapper([
      {
        name: 'bootstrapLabel',
        template: require('./label.html'),
        apiCheck: {
          templateOptions: c.shape({
            label: c.string,
            required: c.bool.optional
          })
        },
        apiCheckInstance: c
      },
      {name: 'bootstrapHasError', template: require('./has-error.html')}
    ]);
  }
};
