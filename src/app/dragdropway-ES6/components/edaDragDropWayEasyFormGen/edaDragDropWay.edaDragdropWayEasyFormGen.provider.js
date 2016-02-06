// TODO : Add here configs from ES5 dragDropConfigProvider

import {
  LIST_DRAG_DROP_ITEM_CSS_CLASSES,
  DRAG_DROP_CONFIG_MODEL,
  DRAG_DROP_PRESENTATION_MODEL,
  ITEMS_NOT_TO_COUNT_FOR_REAL
} 	from './edaDragDropWay.edaDragdropWayEasyFormGen.provider.helpers';

const EASY_FORM_DRAG_DROP_WAY_CONFIG_NAME = 'easyFormDragWayConfig';

function easyFormDragWayConfig() {

	let _listDragDropItemCssClasses = [].concat(LIST_DRAG_DROP_ITEM_CSS_CLASSES);
	let _dragDropConfigModel 				= angular.copy(DRAG_DROP_CONFIG_MODEL);
	let _dragDropPresentationModel 	= [].concat(DRAG_DROP_PRESENTATION_MODEL);
	let _itemsNotToCountFoReal 			= angular.copy(ITEMS_NOT_TO_COUNT_FOR_REAL);

	let _configuration 							= defaultConfig();
	let _controlsList								= controlsList();
	// let _defaultLanguage		= getDefaultLanguage();
	// let _currentLanguage		= initDefaultLanguage();
	let _showPreviewPanel						= getDefaultshowPreviewPanel();
	let _showPreviewModels					= getDefaultShowPreviewModel();	
	/* jshint validthis:true */
	this.$get 											= easyFormDragDropWayConfigGET;
	this.setModalAnimation 					= setModalAnimation;
	this.getModalAnimation					= getModalAnimation;
	this.configuration							= _configuration;
	this.getEnabledControls 				= getEnabledControls;
	this.disableControl							= disableControl;
	this.enableControl							= enableControl;
	// this.setLanguage				= setLanguage;
	// this.getCurrentLanguage	= getCurrentLanguage;
	this.showPreviewPanel						= showPreviewPanel;
	this.showPreviewModels					= showPreviewModels;	
	
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
	
	// function getCurrentLanguage(){
	// 		return _currentLanguage;
	// }	
	
	//list of controls
	function controlsList(){
		let controls = [
			{name: 'empty', 					enabled: true},
			{name: 'Header', 					enabled: true},
			{name: 'Subtitle', 				enabled: true},
			{name: 'TextInput', 			enabled: true},
			{name: 'Password', 				enabled: true},
			{name: 'Email', 					enabled: true},
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
	
	// //language : set default to english
	// function getDefaultLanguage(){
	// 	let lang = 'en';
	// 	return lang;
	// }
	
	// function setDefaultLanguage(){
	// 	_currentLanguage = _defaultLanguage;
	// 	$translateProvider.preferredLanguage(_currentLanguage);
	// 	return _currentLanguage;
	// }	
	
	// function setLanguage(language){				
	// 	if (angular.isString(language)) {
	// 		_currentLanguage = language;
	// 		$translateProvider.preferredLanguage(language);
	// 	}else{
	// 		setDefaultLanguage();
	// 	}
	// }
	
	// function initDefaultLanguage(){
	// 	$translateProvider.useSanitizeValueStrategy('escape'); 	//security : Enable escaping of HTML
	// 	$translateProvider.fallbackLanguage(_defaultLanguage);	//fallback language to default language
	// 	$translateProvider.preferredLanguage(_defaultLanguage);
	// 	return _defaultLanguage;
	// }
	
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
	// easyFormDragDropWayConfigGET.$inject = ['$translate'];
	// function easyFormDragDropWayConfigGET($translate){
	easyFormDragDropWayConfigGET.$inject = [];
	function easyFormDragDropWayConfigGET(){		
											
		let service = {
			setModalAnimation 			: setModalAnimationFct,
			getModalAnimationValue 	: getModalAnimationValue,
			getListEnabledControl		: getListEnabledControl,
			// setLanguage 						: switchLanguage,
			// getCurrentLanguage			: getCurrentLanguage,
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
		
		// function switchLanguage(language){
		// 	if (angular.isString(language)) {
		// 		_currentLanguage = language;
		// 		$translate.use(language);
		// 	}else{
		// 		setDefaultLanguage();
		// 	}
		// }					

		function isPreviewPanelVisible(){
			return _showPreviewPanel;
		}
		
		function arePreviewModelsVisible(){
			return _showPreviewModels;
		}				
		
	}
	
}

// easyFormDragWayConfig.$inject = ['$translateProvider'];

easyFormDragWayConfig.$inject = [];

export default easyFormDragWayConfig;

export {EASY_FORM_DRAG_DROP_WAY_CONFIG_NAME};