import mainModule from './stepway.main';

angular.element(document).ready(() => {
  angular.bootstrap(document, [mainModule.name], { strictDi: true });
});

/**
 * NOTE : bootstrap is needed only to replace ng-app for an app
 * here is a module bundles-sfx
 */
