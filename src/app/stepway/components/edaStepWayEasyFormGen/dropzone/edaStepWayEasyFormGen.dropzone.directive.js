const DROP_ZONE_DIRECTIVE_NAME = 'dropzone';

function dropzone() {
  let directive = {
    restrict : 'AE',
    link     : linkFct
  };
  return directive;

  function linkFct(scope, element, attrs) {
    let config;
    let dropzone;
     //console.log(scope);
     config   = scope[attrs.dropzone];
     // create a Dropzone for the element with the given options
     dropzone = new Dropzone(element[0], config.options);
     // bind the given event handlers
     angular.forEach(config.eventHandlers, (handler, event) => dropzone.on(event, handler));
  }
}

export default dropzone;

export {
  DROP_ZONE_DIRECTIVE_NAME
};
