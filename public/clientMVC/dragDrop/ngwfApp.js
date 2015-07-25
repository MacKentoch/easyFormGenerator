/**
 *  -----------------------------------------------------------------------
 *  application module of the drag and drop version of easy form generator
 *  -----------------------------------------------------------------------
 *
 *  This version is not finished and is under heavy developments
 *  
 *   
 *     - do not use as production -
 *
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

angular
  .module('ngwfApp', [
                        'ngwfApp.providers',	
												'ngwfApp.controllers',
												'ngwfApp.services', 
												'ngwfApp.filters',
												'ngwfApp.directives',
												'textAngular',
												'textAngularSetup',
												'ngAnimate',
												'toaster',											
												'formly', 
												'formlyBootstrap',
												'ui.bootstrap',
												'nya.bootstrap.select',
                        'dndLists',
                        'mgcrea.ngStrap.affix',
                        'ngTouch',
                        function(){}
	                     ])

  .value('easyFormGenVersion', 'v1.1.2');
