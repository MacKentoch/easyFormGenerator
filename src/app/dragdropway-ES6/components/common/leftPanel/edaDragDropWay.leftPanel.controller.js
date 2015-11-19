const LEFT_PANEL_CONTROLLER 	=	'leftPanelController';
const LEFT_PANEL_CONTROLLERAS	= 'leftPanelCtrl';

class leftPanelController{
	constructor(toaster,
							$timeout,
							selectOptionManage,
							$modalProxy){
								
		this.toaster  						= toaster;
		this.$timeout  						= $timeout;
		this.selectOptionManage  	= selectOptionManage;
		this.$modalProxy  				= $modalProxy;
		
		this.init();
	}
	
	init(){
		this.proxyModel 								= this.controllerModalProxy.proxyModel;
		this.proxyModel.selectedControl = this.proxyModel.temporyConfig.selectedControl;
		
		this.basicSelectRowCollection 	= this.controllerModalProxy.basicSelectRowCollection;
		this.newOptionBasicSelect 			= this.controllerModalProxy.newOptionBasicSelect;
		
		this.groupedSelectRowCollection = this.controllerModalProxy.groupedSelectRowCollection;
		this.newOptionGroupedSelect 		= this.controllerModalProxy.newOptionGroupedSelect;
		this.GroupedSelectGroups 				= this.controllerModalProxy.GroupedSelectGroups;
		this.newGroupGroupedSelect 			= this.controllerModalProxy.newGroupGroupedSelect;
		this.groupSelectGroupClick 			= this.controllerModalProxy.groupSelectGroupClick;
		
		this.radioRowCollection 				= this.controllerModalProxy.radioRowCollection;
		this.newOptionRadio 						= this.controllerModalProxy.newOptionRadio;
		
		this.controllerModalProxy.resetAllTemporyModels();						
	}
}

leftPanelController.$inject = [
	'$scope',  
	'toaster',
	'$timeout',
	'selectOptionManage',
	'$modalProxy'	
];