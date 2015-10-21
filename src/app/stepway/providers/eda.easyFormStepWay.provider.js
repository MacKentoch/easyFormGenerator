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
		
		easyFormSteWayConfigFct.$inject = ['$translateProvider'];
		
		function easyFormSteWayConfigFct($translateProvider){
			var _configuration 					= defaultConfig();
			var _controlsList						= controlsList();
			var _defaultLanguage				= getDefaultLanguage();
			var _currentLanguage				= initDefaultLanguage();
			var _showPreviewPanel				= getDefaultshowPreviewPanel();
			var _showPreviewModels			= getDefaultShowPreviewModel();
			/* jshint validthis:true */
			this.$get 									= easyFormSteWayConfig;
			this.setModalAnimation 			= setModalAnimation;
			this.getModalAnimation			= getModalAnimation;
			this.configuration 					= _configuration;
			this.getEnabledControls 		= getEnabledControls;
			this.disableControl					= disableControl;
			this.enableControl					= enableControl;
			this.setLanguage						= setLanguage;
			this.getCurrentLanguage			= getCurrentLanguage;
			this.showPreviewPanel				= showPreviewPanel;
			this.showPreviewModels			= showPreviewModels;
    	
		
			
		
			//set default config
			function defaultConfig(){
				var _defaultConfiguration = {
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
			
			
			function getEnabledControls(){
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
			
			function showPreviewPanel(wantToShow){
				if (angular.isDefined(wantToShow)) {
					if(wantToShow === true) 	_showPreviewPanel 	= true;
					if(wantToShow === false) 	_showPreviewPanel 	= false;
				}
			}
			
			function showPreviewModels(wantToShow){
				if (angular.isDefined(wantToShow)) {
					if(wantToShow === true) 	_showPreviewModels 	= true;
					if(wantToShow === false) 	_showPreviewModels 	= false;
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
			
		
			function getDefaultLanguage(){
				var lang = 'en';
				return lang;
			}
			
			function initDefaultLanguage(){
  			$translateProvider.useSanitizeValueStrategy('escape'); 	//security : Enable escaping of HTML
				$translateProvider.fallbackLanguage(_defaultLanguage);	//fallback language to default language
				$translateProvider.preferredLanguage(_defaultLanguage);
				return _defaultLanguage;
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
			
			function getCurrentLanguage(){
				 return _currentLanguage;
			}
				
		
			//$get implementation :
			easyFormSteWayConfig.$inject = ['$translate'];
			function easyFormSteWayConfig($translate){
													
				var service = {
					setModalAnimation 			: setModalAnimationFct,
					getModalAnimationValue 	: getModalAnimationValue,
					getListEnabledControl		: getListEnabledControl,
					setLanguage 						: switchLanguage,
					getCurrentLanguage			: getCurrentLanguage,
					isPreviewPanelVisible		: isPreviewPanelVisible,
					arePreviewModelsVisible	: arePreviewModelsVisible
 					
				};
				return service;
				
				
				function getModalAnimationValue(){
					return _configuration.modalAnimated;
				}				
				
				function setModalAnimationFct(value){
					setModalAnimation(value);
				}
				
				function getListEnabledControl(){
					return angular.copy(_controlsList);
				}
				
				function isPreviewPanelVisible(){
					return _showPreviewPanel;
				}
				
				function arePreviewModelsVisible(){
					return _showPreviewModels;
				}	
				
										
				function switchLanguage(language){
					if (angular.isString(language)) {
						_currentLanguage = language;
						$translate.use(language);
					}else{
						setDefaultLanguage();
					}
				}				
				

				
			}
		
		}
		
		
		
})();