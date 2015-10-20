/* global angular */
const EASY_FORM_STEP_WAY_CONFIG_NAME = 'easyFormSteWayConfig';

function easyFormSteWayConfig($translateProvider) {
	let _configuration 			= defaultConfig();
	let _controlsList				= controlsList();
	let _defaultLanguage		= getDefaultLanguage();
	let _currentLanguage		= initDefaultLanguage();
	let _showPreviewPanel		= getDefaultshowPreviewPanel();
	let _showPreviewModels	= getDefaultShowPreviewModel();	
	/* jshint validthis:true */
	this.$get 							= easyFormSteWayConfig;
	this.setModalAnimation 	= setModalAnimation;
	this.getModalAnimation	= getModalAnimation;
	this.configuration			= _configuration;
	this.getEnabledControls = getEnabledControls;
	this.disableControl			= disableControl;
	this.enableControl			= enableControl;
	this.setLanguage				= setLanguage;
	this.getCurrentLanguage	= getCurrentLanguage;
	
	
	
	
	//set default config
	function defaultConfig(){
		let  _defaultConfiguration = {
			modalAnimated : false
		};
		return _defaultConfiguration;
	}

	//show preview panel by default
	function getDefaultshowPreviewPanel(){
		return true;
	}	
	
	//show preview data, fields models in preview panel
	function getDefaultShowPreviewModel(){
		return true;
	}	
	
	function getCurrentLanguage(){
			return _currentLanguage;
	}	
	
	//list of controls
	function controlsList(){
		let controls = [
			{name: 'empty', 					enabled: true},
			{name: 'Header', 					enabled: true},
			{name: 'TextInput', 			enabled: true},
			{name: 'Password', 				enabled: true},
			{name: 'Date', 						enabled: true},
			{name: 'Texarea',	 				enabled: true},
			{name: 'RichTextEditor', 	enabled: true},
			{name: 'Radio', 					enabled: true},
			{name: 'Checkbox', 				enabled: true},
			{name: 'BasicSelect', 		enabled: true},
			{name: 'GroupedSelect', 	enabled: true}
		];
		return controls;
	}
	
	//language : set default to english
	function getDefaultLanguage(){
		let lang = 'en';
		return lang;
	}
	
	function setDefaultLanguage(){
		_currentLanguage = _defaultLanguage;
		$translateProvider.preferredLanguage(_currentLanguage);
		return _currentLanguage;
	}	
	
	function setLanguage(language){				
		if (angular.isString(language)) {
			_currentLanguage = language;
			$translateProvider.preferredLanguage(language);
		}else{
			setDefaultLanguage();
		}
	}
	
	function initDefaultLanguage(){
		$translateProvider.useSanitizeValueStrategy('escape'); 	//security : Enable escaping of HTML
		$translateProvider.fallbackLanguage(_defaultLanguage);	//fallback language to default language
		$translateProvider.preferredLanguage(_defaultLanguage);
		return _defaultLanguage;
	}
	
	function getEnabledControls(){
		return _controlsList;
	}
	
	function disableControl(controlName){
		if (angular.isString(controlName)) {
			angular.forEach(_controlsList, (aControl) => {
				if (aControl.name === controlName) aControl.enabled = false;
			});						
		}
	}
	
	function enableControl(controlName){
		if (angular.isString(controlName)) {
			angular.forEach(_controlsList, (aControl) => {
				if (aControl.name === controlName) aControl.enabled = true;
			});						
		}				
	}						
	
	function setModalAnimation(flagConfig){
		let valueToApply = (flagConfig === true) ? 
													flagConfig  
												: (flagConfig === false ? 
														flagConfig 
													: _configuration.modalAnimated);
															
		_configuration.modalAnimated = valueToApply;
	}
	
	function getModalAnimation(){																	
		return _configuration.modalAnimated;
	}		
	
	
	//$get implementation :
	easyFormSteWayConfig.$inject = [];
	function easyFormSteWayConfig(){
											
		let service = {
			setModalAnimation 			: setModalAnimationFct,
			getModalAnimationValue 	: getModalAnimationValue
		};
		return service;
		
		
		function getModalAnimationValue(){
			return _configuration.modalAnimated;
		}				
		
		function setModalAnimationFct(value){
			setModalAnimation(value);
		}
		
	
		
	}
	
}

easyFormSteWayConfig.$inject = ['$translateProvider'];
export default easyFormSteWayConfig;

export {EASY_FORM_STEP_WAY_CONFIG_NAME};