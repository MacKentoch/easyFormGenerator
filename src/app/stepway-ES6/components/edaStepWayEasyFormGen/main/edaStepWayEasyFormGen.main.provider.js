const EASY_FORM_STEP_WAY_CONFIG_NAME = 'easyFormSteWayConfig';

function easyFormSteWayConfig() {
	let _configuration 			=  defaultConfig();
	/* jshint validthis:true */
	this.$get 							= easyFormSteWayConfig;
	this.setModalAnimation 	= setModalAnimation;
	this.getModalAnimation	= getModalAnimation;
	this.configuration 			= _configuration;
	
	
	
	
	//set default config
	function defaultConfig(){
		let  _defaultConfiguration = {
			modalAnimated : false
		};
		return _defaultConfiguration;
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
											
		var service = {
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

easyFormSteWayConfig.$inject = [];
export default easyFormSteWayConfig;

export {EASY_FORM_STEP_WAY_CONFIG_NAME};