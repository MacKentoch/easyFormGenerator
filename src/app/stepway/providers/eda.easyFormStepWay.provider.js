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

(function(){
	'use strict';
	
	angular
		.module('eda.easyFormSteWayConfigProvider', [])
		.provider('easyFormSteWayConfig', easyFormSteWayConfigFct);
		
		easyFormSteWayConfigFct.$inject = [];
		
		function easyFormSteWayConfigFct(){
			var _configuration 					=  defaultConfig();
			var _controlsList						=  controlsList();
			/* jshint validthis:true */
			this.$get 									= easyFormSteWayConfig;
			this.setModalAnimation 			= setModalAnimation;
			this.getModalAnimation			= getModalAnimation;
			this.configuration 					= _configuration;
			this.getListEnabledControl 	= getListEnabledControl;
			this.disableControl					= disableControl;
			this.enableControl					= enableControl;
    	
			
			
		
			//set default config
			function defaultConfig(){
				var _defaultConfiguration = {
					modalAnimated : false
				};
				return _defaultConfiguration;
			}
		
			function controlsList(){
				var controls = [
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
			
			function setModalAnimation(flagConfig){
				var valueToApply = (flagConfig === true) ? 
														  flagConfig  
														: (flagConfig === false ? 
															  flagConfig 
															: _configuration.modalAnimated);
																	
				_configuration.modalAnimated = valueToApply;
			}

			function getModalAnimation(){																	
				return _configuration.modalAnimated;
			}		
			
			
			function getListEnabledControl(){
				return _controlsList;
			}
			
			
			
			function disableControl(controlName){
				if (angular.isString(controlName)) {
					angular.forEach(_controlsList, function(aControl){
						
						if (aControl.name === controlName) {
							aControl.enabled = false;
							console.log('disable aControl : ' + aControl.name, + '\n ref : ' + controlName);
						}
						
					});						
				}
			}
			
			function enableControl(controlName){
				if (angular.isString(controlName)) {
					angular.forEach(_controlsList, function(aControl){
						if (aControl.name === controlName) {
							aControl.enabled = true;
						}
					});						
				}				
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
		
		
		
})();