(function(){
	'use strict';
	
	angular
		.module('eda.easyFormSteWayConfigProvider', [])
		.provider('easyFormSteWayConfig', easyFormSteWayConfigProvider);
		
		easyFormSteWayConfigProvider.$inject = [];
		
		function easyFormSteWayConfigProvider(){
			/* jshint validthis:true */
			this.$get = easyFormSteWayConfig;
			this.configuration = defaultConfig();
			this.setModalAnimation = setModalAnimation;
    	
			
			
		
			//set default config
			function defaultConfig(){
				var _defaultConfiguration = {
					modalAnimated : false
				};
				return _defaultConfiguration;
			}
		
			
			function setModalAnimation(flagConfig){
				var valueToApply = (flagConfig === true) ? 
														  flagConfig 
														: (flagConfig === false ? 
															  flagConfig 
															: this.configuration.modalAnimated);
																	
				this.configuration.modalAnimated = valueToApply;
			}
		
		
			//$get implementation :
			easyFormSteWayConfig.$inject = [];
			function easyFormSteWayConfig(){
				var service = {
					setModalAnimation : this.setModalAnimation
				};
				return service;
				
			}
		
		}
		
		
		
})();