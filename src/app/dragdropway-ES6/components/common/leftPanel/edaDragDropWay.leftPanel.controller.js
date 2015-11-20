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
		this.initNyaSelectConformingSelectedControl();						
	}
	
	initNyaSelectConformingSelectedControl(){
		//place proxyModel to selection if not none :
		if (this.proxyModel.temporyConfig.selectedControl !== 'none') {
			for (let i = this.proxyModel.controls.length - 1; i >= 0; i--) {
					if (this.proxyModel.controls[i].id === this.proxyModel.temporyConfig.selectedControl) this.modelproxyModel = this.proxyModel.controls[i];
			}
			if (this.proxyModel.temporyConfig.selectedControl === 'BasicSelect') this.$modalProxy.bindBasicSelectFromProxyModel(self.basicSelectRowCollection);
			if (this.proxyModel.temporyConfig.selectedControl === 'GroupedSelect') this.$modalProxy.bindGroupedSelectFromProxyModel(this.groupedSelectRowCollection, this.GroupedSelectGroups);
			if (this.proxyModel.temporyConfig.selectedControl === 'Radio') this.$modalProxy.bindRadioFromProxyModel(this.radioRowCollection);		
		}	
	}	
	
	updateSpecialControl(){		
		//refresh service data for particular controls as selects and radio
		this.proxyModel.basicSelectRowCollection 		= this.basicSelectRowCollection;
		this.proxyModel.newOptionBasicSelect 				= this.newOptionBasicSelect;
		this.proxyModel.groupedSelectRowCollection 	= this.groupedSelectRowCollection;
		this.proxyModel.newOptionGroupedSelect 			= this.newOptionGroupedSelect;
		this.proxyModel.GroupedSelectGroups 				= this.GroupedSelectGroups;
		this.proxyModel.newGroupGroupedSelect 			= this.newGroupGroupedSelect;
		this.proxyModel.groupSelectGroupClick 			= this.groupSelectGroupClick;
		this.proxyModel.radioRowCollection 					= this.radioRowCollection;
		this.proxyModel.newOptionRadio 							= this.newOptionRadio;			
		//force apply update proxyModel
		this.proxyModel.bindSpecialCtrlTemporyModelsToProxyModel(); 
		return true; 	
	}	
	
	
}

leftPanelController.$inject = [
	'$scope',  
	'toaster',
	'$timeout',
	'selectOptionManage',
	'$modalProxy'	
];