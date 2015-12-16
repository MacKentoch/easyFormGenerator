/* global angular */
import {
	initDebugModel,
	initTabModel,
	initColumnTemplate,
	initLineTemplate,
	initIhmModel
}												from './edaDragDropWay.edaDragdropWayEasyFormGen.controller.helpers.js';

const DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER 		= 'edaDragDropWayEasyFormGenCtrl';
const DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLERAS 	= 'vm';


class edaDragDropWayEasyFormGenCtrl{
	
	constructor(
		$scope,
		easyFormGenVersion,
		$filter,
		$anchorScroll,
		toaster,
		$timeout, 
		$modal,
		$log, 
		formFieldManage, 
		controllerModalProxy,
		dragDropItemDecorationService,
		dragDropConfig,
		ddModelConfModelProxyService,
		ddItemRightClickedManager,
		easyFormDragWayConfig		
	){
		this.$scope														= $scope;
		this.easyFormGenVersion 							= easyFormGenVersion;
		this.$filter													= $filter;
		this.$anchorScroll 										= $anchorScroll;
		this.toaster 													= toaster;
		this.$timeout 												= $timeout; 
		this.$modal														= $modal;
		this.$log															= $log; 
		this.formFieldManage									= formFieldManage; 
		this.controllerModalProxy 						= controllerModalProxy;
		this.dragDropItemDecorationService		= dragDropItemDecorationService;
		this.dragDropConfig										= dragDropConfig;
		this.ddModelConfModelProxyService			= ddModelConfModelProxyService;
		this.ddItemRightClickedManager				= ddItemRightClickedManager;
		this.easyFormDragWayConfig						= easyFormDragWayConfig;
		
		this.init();
	}
	
	init(){
		this.easyFormGeneratorVERSION 				= this.easyFormGenVersion;
		this.tab                      				= initTabModel(this.easyFormDragWayConfig.isPreviewPanelVisible(), this.easyFormDragWayConfig.arePreviewModelsVisible());
		this.returnSaveEvent 									= false;
		this.dataModel               			 		= {}; //was vm.model in ES5 version
		this.wfFormFields          						= [];
		this.wfFormFieldsOnlyNeededProperties	= [];
		this.ihm															= initIhmModel();
		this.easyFormDragDropProperties 			= this.dragDropConfig.getDragDropConfigModel();
		this.dragDropModel 										= [].concat(this.dragDropConfig.getDragDropPresentationModel());
		this.numberOfColumns 									= 1;	
		this.MaxNumberOfColumns 							= 3;
    this.MinNumberOfColumns 							= 1;
		this.configuration 										= {};
		this.animationsEnabled        				= this.easyFormSteWayConfig.getModalAnimationValue(); 
		
		this.formFieldManage.initConfigurationEditFromScratch(this.configuration , false);
		this.controllerModalProxy.initProxyModel();
	}
	
	collapseAllGroupControl(allExceptThisGroupIndex){        
		angular.forEach(this.easyFormDragDropProperties.containerConfig.decoration, (value)=>{
			if (value.WhenIndex !== allExceptThisGroupIndex) this.dragDropConfig.setDragDropConfigContainerDecorationCollapse(this.easyFormDragDropProperties, value.WhenIndex, true);
		});
	}
	
	
	onSubmit() {
		this.toaster.pop({
			type						: 'info',
			timeout					: 2000,
			title						: 'should save data model if it were not a static example',
			body						: 'data :' + this.$filter('json')(this.dataModel, 4),                
			showCloseButton	: true
		});
	}
	
	resetToZeroModel(){
		this.configuration.activeLine = 1;
		if (this.configuration.lines.length > 1) this.configuration.lines.splice(1, this.configuration.lines.length - 2);
		return this.countConfigurationModelLines();
	}


	countConfigurationModelLines(){
		return this.configuration.lines.length;
	}

	setActiveLineNumber(lineNumber){
		if (lineNumber <= this.countConfigurationModelLines()) this.configuration.activeLine = lineNumber;
	}

	upThisLine(indexLine){
		if (indexLine > -1) {
			if (this.configuration.lines[indexLine - 1]) {
				let currentLineObj = this.configuration.lines[indexLine];
				this.configuration.lines.splice(indexLine , 1);
				this.configuration.lines.splice((indexLine - 1), 0, currentLineObj);
				this.configuration.activeLine = 1;
			}
		}

		this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
		this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
	}

	downThisLine(indexLine){
		if (indexLine > -1) {
			if (this.configuration.lines[indexLine + 1]) {
				let currentLineObj = this.configuration.lines[indexLine];
				this.configuration.lines.splice(indexLine , 1);
				this.configuration.lines.splice((indexLine + 1), 0, currentLineObj);
				this.configuration.activeLine = 1;
			}
		}
		this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
		this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
	}

	removeThisLine(index){
		if (index > -1) {
			if (this.configuration.lines.length > 1) {
				if (this.configuration.activeLine === index + 1) this.configuration.activeLine = 1;
				this.configuration.lines.splice(index, 1);
			}else{
				this.$timeout(()=>{
					this.toaster.pop({
						type						: 'warning',
						title						: 'Last line' ,
						body						: 'Can\'t delete the last line',
						showCloseButton	: true
					});
				}, 100);
			}
			this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
			this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
		}
	}
	
	increaseNumberOfColumns(){
		if (this.configuration.lines[this.configuration.activeLine -1].columns.length < this.MaxNumberOfColumns) {
			let newNumberOfColumns = this.configuration.lines[this.configuration.activeLine -1].columns.push(initColumnTemplate());		
			this.configuration.lines[this.configuration.activeLine -1].columns[newNumberOfColumns - 1].numColumn = newNumberOfColumns; 
		}
		this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel); 
		this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
	}	


	decreaseNumberOfColumns(indexLine, indexColumn){
		if (this.configuration.lines[this.configuration.activeLine -1].columns.length > 1) {
			this.configuration.lines[this.configuration.activeLine -1].columns.splice(this.configuration.lines[this.configuration.activeLine -1].columns.length -1, 1);
		}
		this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);  
		this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);  
	}

	saveThisForm() {
		if (typeof this.configuration.formName === 'undefined') {
		this.toaster.pop({
				type		: 'warning',
				timeout	: 2000,
				title		: 'Form name is undefined',
				body		: 'Form has not been saved.',                
				showCloseButton : true
			});
			return false;
		}
		if (this.configuration.formName === '') {
		this.toaster.pop({
				type		: 'warning',
				timeout	: 2000,
				title		: 'Form name is required',
				body		: 'Form has not been saved.',                
				showCloseButton : true
			});
			return false;
		}
		this.toaster.pop({
			type		: 'wait',
			timeout	: 10000,
			title		: 'Form is being saved',
			body		: 'Wait.',                
			showCloseButton : true
		});
		this.toaster.clear();  
		this.returnSaveEvent = true;
		return true;
	} 
	
	dragoverCallbackContainer(parentparentIndex, parentIndex, index){
		//prevent container in layout column to be drag to control select contianer 
		if (index === 0) return false;
		return true;
	}
	
	dropCallback(event, index, item, external, type, allowedType) {
		if (external) {
				if (allowedType === 'itemType'      && !item.label)             return false;
				if (allowedType === 'containerType' && !angular.isArray(item))  return false; 
		}
		//set a timeout befire binding since ddModel may not be called when already full updated
		let timerRefreshDDToConfig = this.$timeout(()=>{
			this.configuration = angular.copy(this.ddModelConfModelProxyService.refreshAllConfigurationFromDragAndDropModel(this.configuration, this.dragDropModel));
			this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);                                            
			this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
			this.ddModelConfModelProxyService.refreshControlsKeys(this.configuration, this.dragDropModel);            
		}, 200);
		this.$scope.$on('$destroy', ()=>this.$timeout.cancel(timerRefreshDDToConfig));
		return item;
	}	
	
	dndItemMoved(parentParentIndex, parentIndex, itemIndex){
		//prevent item from first container to disapear when dropped on other container
		if (parentParentIndex > 0) this.dragDropModel[parentParentIndex][parentIndex].splice(itemIndex, 1);
	}	
	
	dragoverCallbackItems(ParentParentIndex, parentIndex, index, external){
		//prevent items in layout column to be drag to control select  
		if (parentIndex === 0) return false;
		return true;
	}
	
	//TODO : will replace in html : dnd-disable-if="items.length > 2"
	disableItemDropIf(){

	}	
	

}

edaDragDropWayEasyFormGenCtrl.$inject = [ 
		'$scope',
		'easyFormGenVersion',
		'$filter',
		'$anchorScroll',
		'toaster',
		'$timeout', 
		'$modal',
		'$log', 
		'formFieldManage', 
		'controllerModalProxy',
		'dragDropItemDecorationService',
		'dragDropConfig',
		'ddModelConfModelProxyService',
		'ddItemRightClickedManager'	,
		'easyFormDragWayConfig'
];

export default edaDragDropWayEasyFormGenCtrl;

export {
	DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER,
	DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLERAS
};