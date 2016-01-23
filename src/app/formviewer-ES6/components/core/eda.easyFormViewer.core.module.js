const CORE_MODULES = [
	'textAngular',  
	'formly',  
	'ngAnimate',
	'formlyBootstrap', 
	'ui.bootstrap', 
	'nya.bootstrap.select' 
];

const FORMVIEWER_CORE_MODULE_NAME = 'edaEasyFormViewerCore.module';

export default angular
								.module(FORMVIEWER_CORE_MODULE_NAME, CORE_MODULES);
