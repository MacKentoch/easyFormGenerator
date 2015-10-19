/**
 *  ------------------------------------------------------
 *  module core : injects core "non app modules"
 *  ------------------------------------------------------
 *
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

(function () {
	'use strict';

	angular
		.module('ngwfApp.core', [
	    'textAngular',
	    'textAngularSetup',
	    'ngAnimate',
	    'toaster',                      
	    'formly', 
	    'formlyBootstrap',
	    'ui.bootstrap',
	    'nya.bootstrap.select',
			'pascalprecht.translate'
		]);

})(); 
