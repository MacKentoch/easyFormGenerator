// TODO : Add here configs from ES5 dragDropConfigProvider

import {
  LIST_DRAG_DROP_ITEM_CSS_CLASSES,
  DRAG_DROP_CONFIG_MODEL,
  DRAG_DROP_PRESENTATION_MODEL,
  ITEMS_NOT_TO_COUNT_FOR_REAL
} 	from './edaDragDropWay.edaDragdropWayEasyFormGen.provider.helpers';

const EASY_FORM_DRAG_DROP_WAY_CONFIG_NAME = 'easyFormDragWayConfig';

function easyFormDragWayConfig() {

	let _listDragDropItemCssClasses 						= [].concat(LIST_DRAG_DROP_ITEM_CSS_CLASSES);
	let _dragDropConfigModel 										= angular.copy(DRAG_DROP_CONFIG_MODEL);
	let _dragDropPresentationModel 							= [].concat(DRAG_DROP_PRESENTATION_MODEL);
	let _itemsNotToCountFoReal 									= angular.copy(ITEMS_NOT_TO_COUNT_FOR_REAL);

	let _configuration 													= defaultConfig();
	let _controlsList														= controlsList();
	// let _defaultLanguage		= getDefaultLanguage();
	// let _currentLanguage		= initDefaultLanguage();
	let _showPreviewPanel												= getDefaultshowPreviewPanel();
	let _showPreviewModels											= getDefaultShowPreviewModel();	
	/* jshint validthis:true */
	this.$get 																	= easyFormDragDropWayConfigGET;
	this.setModalAnimation 											= setModalAnimation;
	this.getModalAnimation											= getModalAnimation;
	this.configuration													= _configuration;
	this.getEnabledControls 										= getEnabledControls;
	this.disableControl													= disableControl;
	this.enableControl													= enableControl;
	// this.setLanguage				= setLanguage;
	// this.getCurrentLanguage	= getCurrentLanguage;
	this.showPreviewPanel												= showPreviewPanel;
	this.showPreviewModels											= showPreviewModels;	

	this.setListItemCssClass 										= setListItemCssClass;
	this.getItemsNotTocount	 										= getItemsNotTocount;
	this.setItemsNotTocount 										= setItemsNotTocount;
	this.addControlToDragDropPresentationModel 	= addControlToDragDropPresentationModel;
	this.getDragDropPresentationModel 					= getDragDropPresentationModel;

	function setListItemCssClass(fromConfig) {
		_listDragDropItemCssClasses = [].concat(fromConfig);
	}

	function getItemsNotTocount() {
		return _itemsNotToCountFoReal;
	}

	function setItemsNotTocount(fromConfig) {
		_itemsNotToCountFoReal = angular.copy(fromConfig);	
	}

	//set default config
	function defaultConfig() {
		let  _defaultConfiguration = {
			modalAnimated : false
		};
		return _defaultConfiguration;
	}

	function addControlToDragDropPresentationModel(controlToAdd, groupToAdd) {
    if (typeof controlToAdd !== 'undefined' &&
        typeof groupToAdd   !== 'undefined') {
      addToGroupControl(controlToAdd, groupToAdd);
    }		
	}

  function getDragDropPresentationModel(){
    return _dragDropPresentationModel;
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
	
	function getEnabledControls() {
		return _controlsList;
	}
	
	function disableControl(controlName) {
		if (angular.isString(controlName)) {
			angular.forEach(_controlsList, (aControl) => {
				if (aControl.name === controlName) aControl.enabled = false;
			});						
		}
	}
	
	function enableControl(controlName) {
		if (angular.isString(controlName)) {
			angular.forEach(_controlsList, (aControl) => {
				if (aControl.name === controlName) aControl.enabled = true;
			});						
		}				
	}						
	
	function setModalAnimation(flagConfig) {
		let valueToApply = (flagConfig === true) ? 
													flagConfig  
												: (flagConfig === false ? 
														flagConfig 
													: _configuration.modalAnimated);
															
		_configuration.modalAnimated = valueToApply;
	}
	
	function getModalAnimation() {																	
		return _configuration.modalAnimated;
	}		
	
	
	//$get implementation :
	// easyFormDragDropWayConfigGET.$inject = ['$translate'];
	// function easyFormDragDropWayConfigGET($translate){
	easyFormDragDropWayConfigGET.$inject = [];
	function easyFormDragDropWayConfigGET(){		
											
		let service = {
			setModalAnimation 									: setModalAnimationFct,
			getModalAnimationValue 							: getModalAnimationValue,
			getListEnabledControl								: getListEnabledControl,
			// setLanguage 											: switchLanguage,
			// getCurrentLanguage								: getCurrentLanguage,
			isPreviewPanelVisible								: isPreviewPanelVisible,
			arePreviewModelsVisible							: arePreviewModelsVisible,
			
			getListItemCssClass 								: getListItemCssClass,
			getItemsNotToCount 									: getItemsNotToCount,
			getItemCssDependingNumberItemsInRow : getItemCssDependingNumberItemsInRow,
			getDistinctItemCssClass 						: getDistinctItemCssClass,
			getDragDropConfigModel 							: getDragDropConfigModel,
			getDragDropPresentationModel 				: getDragDropPresentationModel,
			setDragDropConfigContainerDecorationCollapse : setDragDropConfigContainerDecorationCollapse
		};
		return service;
		
		function getDragDropPresentationModel() {
			return _dragDropPresentationModel;
		}

		function setDragDropConfigContainerDecorationCollapse(dragDropConfigModel, indexValue, isCollapsedBool) {
      if (typeof indexValue       !== 'undefined' &&
					typeof isCollapsedBool  !== 'undefined') {
        if (indexValue === parseInt(indexValue, 10)) {
          dragDropConfigModel.containerConfig.decoration[indexValue].isCollapsed = isCollapsedBool;
        }
      }
    return true;
		}
	

		function getDragDropConfigModel() {
			return _dragDropConfigModel;
		}

		function getDistinctItemCssClass() {
      let distinctCssClass = [];
      angular.forEach(_listDragDropItemCssClasses, (valueRef)=>{

        let cssClassRef = valueRef.cssClass;

        if (distinctCssClass.length === 0){
          distinctCssClass.push(cssClassRef);
        } else {
          let canAdd = true;
          angular.forEach(distinctCssClass, (valueProc)=>{
            let cssClassProc = valueProc;
            if (cssClassRef === cssClassProc) {
              canAdd = false;
            }
          });
          if (canAdd) distinctCssClass.push(cssClassRef);
        }
      });
      return distinctCssClass;			
		}

		function getItemCssDependingNumberItemsInRow(numberOfItems) {
      if(typeof numberOfItems !== 'undefined'){
        let classToReturn = '';
        for (let  i = _listDragDropItemCssClasses.length - 1; i >= 0; i--) {
          if (_listDragDropItemCssClasses[i].numberItemPerRow === numberOfItems) {
            classToReturn = _listDragDropItemCssClasses[i].cssClass;  
          }
        }
        return classToReturn;
      }else{
        return '';
      }			
		}

		function getListItemCssClass() {
			return _listDragDropItemCssClasses;	
		}

		function getItemsNotToCount() {
			return _itemsNotToCountFoReal;
		}

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

  /**
   * addToGroupControl : add control to _dragDropPresentationModel
   * @param {[type]} thisControl : control to add
   * @param {[type]} thisGroup   : groupId wher this control should be added
   *
   * NOTE : if _dragDropPresentationModel wrong initialized it will create list of group conforming to 
   * configModel
   */
  function addToGroupControl(thisControl, thisGroup){
    /**
     * search group if already exists
     */
    if (_dragDropPresentationModel[0].length > 0) {
      /**
       * case when _dragDropConfigModel.containerConfig.decoration.length is > to _dragDropPresentationModel[0].length
       *
       * for instance : initialization _dragDropPresentationModel[0] in between
       */
      if (_dragDropPresentationModel[0].length < _dragDropConfigModel.containerConfig.decoration.length) {
        let missingGroupNumber = _dragDropConfigModel.containerConfig.decoration.length - _dragDropPresentationModel[0].length;

        for (let i = 0; i < missingGroupNumber; i++) {
          _dragDropPresentationModel[0].push([]);
        }
      }
      /**
       * push control to right index 
       * (deduced by _dragDropConfigModel.containerConfig.decoration.WhenIndex value for groupId === thisGroup)
       */
       _dragDropConfigModel.containerConfig.decoration.forEach((groupConfig)=>{
        if (thisGroup.addToGroupCtrl === groupConfig.groupId) {
          _dragDropPresentationModel[0][groupConfig.WhenIndex].push(thisControl);
        }
       });
    }else{
      /**
       * no group no control
       *
       * initialize _dragDropConfigModel.containerConfig.decoration list
       */
      _dragDropConfigModel.containerConfig.decoration.forEach(()=>_dragDropPresentationModel[0].push([]));
      /**
       * push control to right index 
       * (deduced by _dragDropConfigModel.containerConfig.decoration.WhenIndex value for groupId === thisGroup)
       */
       _dragDropConfigModel.containerConfig.decoration.forEach((groupConfig)=>{
        if (thisGroup.addToGroupCtrl === groupConfig.groupId) {
          _dragDropPresentationModel[0][groupConfig.WhenIndex].push(thisControl);
        }
       }); 
    }
  } 	

}

// easyFormDragWayConfig.$inject = ['$translateProvider'];

easyFormDragWayConfig.$inject = [];

export default easyFormDragWayConfig;

export {EASY_FORM_DRAG_DROP_WAY_CONFIG_NAME};