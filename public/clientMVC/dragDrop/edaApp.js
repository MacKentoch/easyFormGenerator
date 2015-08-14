/// <reference path="../../../typings/lodash/lodash.d.ts"/>
/// <reference path="../../../typings/angularjs/angular.d.ts"/>
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
  .module('edaApp', [
                        'edaApp.providers',	
												'edaApp.controllers',
												'edaApp.services', 
												'edaApp.filters',
												'edaApp.directives',
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
                        'pageslide-directive',
                        function(){}
	                     ])

  .value('easyFormGenVersion', 'v1.1.3')
  .run([
  	'$templateCache', 
  	function($templateCache){
  		/**
  		 * register template cache for side edit control panel
  		 * 
  		 * control : "blank"
  		 */
  		$templateCache.put('editPanelBlankCtrl-tpls.html', 
  											[
  												'<p>here is blank control</p>'
  											].join(''));

  		/**
  		 * register template cache for side edit control panel
  		 * 
  		 * control : "Header"
  		 */
  		$templateCache.put('editPanelHeaderCtrl-tpls.html', 
  											[
  												'<p><b>header from template cache</b></p>'
  											].join(''));
  	}
  ]);

