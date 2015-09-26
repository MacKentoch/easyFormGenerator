/* global angular */
import mainModule from './edaStepWayEasyFormGen.main';

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainModule.name], { strictDi: true });
});