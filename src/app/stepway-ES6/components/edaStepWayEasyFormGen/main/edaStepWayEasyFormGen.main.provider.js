const EASY_FORM_STEP_WAY_CONFIG_NAME = 'easyFormSteWayConfig';

function easyFormSteWayConfig($translateProvider) {
	let _configuration 			= defaultConfig();
	let _controlsList				= controlsList();
	let _defaultLanguage		= getDefaultLanguage();
	let _currentLanguage		= initDefaultLanguage();
	/* jshint validthis:true */
	this.$get 							= easyFormSteWayConfig;
	this.setModalAnimation 	= setModalAnimation;
	this.getModalAnimation	= getModalAnimation;
	this.configuration			= _configuration;
	this.getEnabledControls = getEnabledControls;
	
	
	
	
	//set default config
	function defaultConfig(){
		let  _defaultConfiguration = {
			modalAnimated : false
		};
		return _defaultConfiguration;
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
	
	function initDefaultLanguage(){
		$translateProvider.useSanitizeValueStrategy('escape'); 	//security : Enable escaping of HTML
		$translateProvider.fallbackLanguage(_defaultLanguage);	//fallback language to default language
		$translateProvider.preferredLanguage(_defaultLanguage);
		return _defaultLanguage;
	}
	
	function getEnabledControls(){
		return _controlsList;
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