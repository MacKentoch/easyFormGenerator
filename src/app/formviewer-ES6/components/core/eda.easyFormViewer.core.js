/* global angular */
const CORE_MODULES = [
	'textAngular',
	'textAngularSetup',
	'ngAnimate',
	'toaster',                      
	'formly', 
	'formlyBootstrap',
	'ui.bootstrap',
	'nya.bootstrap.select'
];

const FORMVIEWER_CORE_MODULE_NAME = 'edaEasyFormViewerCoreModule'

export default angular
								.module('edaEasyFormViewerCoreModule.core', CORE_MODULES);
								