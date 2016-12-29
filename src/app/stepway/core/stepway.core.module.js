/* global angular */
const CORE_MODULES = [
  'textAngular',
  'textAngularSetup',
  'ngAnimate',
  'toaster',
  'formly',
  'formlyBootstrap',
  'ui.bootstrap',
  'nya.bootstrap.select',
  'pascalprecht.translate'
];

export default angular
                .module('edaStepWayEasyFormGen.core', CORE_MODULES);
