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
	
	resetTemporyConfig(){
		this.proxyModel.temporyConfig = {
			formlyLabel				: '', 
			formlyRequired		: false, 
			formlyPlaceholder	: '',
			formlyDesciption	: '',
			formlyOptions			: []
		};   
	}
	
	resetControl(){
		this.proxyModel.temporyConfig.formlyLabel 			= '';
		this.proxyModel.temporyConfig.formlyRequired 		= false;
		this.proxyModel.temporyConfig.formlyPlaceholder	= '';
		this.proxyModel.temporyConfig.formlyDesciption 	= '';
		this.proxyModel.temporyConfig.formlyOptions 		= [];
		this.proxyModel.temporyConfig.datepickerPopup   = this.initDatePicker();
	}		

	initDatePicker(){
		this.proxyModel.temporyConfig.datepickerPopup = this.demodt.formats[0];  
	}
	
	selectThisControl(controlName){
		this.proxyModel.selectedControl = 'none';
		this.resetTemporyConfig();
		for (let i = this.proxyModel.controls.length - 1; i >= 0; i--) {
			if (this.proxyModel.controls[i].id === controlName) {
				this.proxyModel.selectedControl = this.proxyModel.controls[i].id;         
			}
		}
		if (this.proxyModel.selectedControl === 'Date') this.initDatePicker();
	}	
	
	
	/**
		* ==============================================================
		* specific controls management 
		* (display, properties.... : ex : grouped Select)
		* ==============================================================
		*/
		addNewOptionRadio(){
			let result = this.selectOptionManage.addNewOptionRadio(this.radioRowCollection, this.newOptionRadio.saisie);
			if (result.resultFlag === false) {
				this.toaster.pop({
						type		: 'warning',
						timeout	: 2000,
						title		: result.details,
						body		: `'${this.newOptionRadio.saisie}' cannot be added.`,                
						showCloseButton: true
					});
			}
			//reset input
			this.newOptionRadio = {saisie: ''};
		}	

		removeRadioRow(index) {
			let result = this.selectOptionManage.removeOption(this.radioRowCollection, index);
			if (result.resultFlag === false) {
				this.toaster.pop({
					type			: 'warning',
					timeout		: 2000,
					title			: result.details,
					body			: 'Delete was cancelled.',                
					showCloseButton: true
				});
			}      
		}
		
		upThisRadioRow(index){
			let result = this.selectOptionManage.upthisOption(this.radioRowCollection, index);
			if (result.resultFlag === false) {
				this.toaster.pop({
					type		: 'warning',
					timeout	: 2000,
					title		: result.details,
					body		: 'Operation cancelled.',                
					showCloseButton: true
				});
			}       
		}

		downThisRadioRow(index){
			let result = this.selectOptionManage.downthisOption(this.radioRowCollection, index);
			if (result.resultFlag === false) {
				this.toaster.pop({
					type		: 'warning',
					timeout	: 2000,
					title		: result.details,
					body		: 'Operation cancelled.',                
					showCloseButton: true
				});
			}
		}		

		addNewOptionBasicSelect(){
			let result = this.selectOptionManage.addNewOptionBasicSelect(this.basicSelectRowCollection, this.newOptionBasicSelect.saisie);
			if (result.resultFlag === false) {
				this.toaster.pop({
					type			: 'warning',
					timeout		: 2000,
					title			: result.details,
					body			: `'${this.newOptionBasicSelect.saisie}' cannot be added.`,              
					showCloseButton: true
				});
			}
			this.newOptionBasicSelect = {saisie: ''}; //reset input
		}
					
		removeRow(index) {
			let result = this.selectOptionManage.removeOption(this.basicSelectRowCollection, index);
			if (result.resultFlag === false) {
				this.toaster.pop({
					type		: 'warning',
					timeout	: 2000,
					title		: result.details,
					body		: 'Delete was cancelled.',                
					showCloseButton: true
				});
			}      
		}

		upThisRow(index){
				let result = this.selectOptionManage.upthisOption(this.basicSelectRowCollection, index);
				if (result.resultFlag === false) {
					this.toaster.pop({
						type		: 'warning',
						timeout	: 2000,
						title		: result.details,
						body		: 'Operation cancelled.',                
						showCloseButton: true
					});
				}       
		}

		downThisRow(index){
			let result = this.selectOptionManage.downthisOption(this.basicSelectRowCollection, index);
			if (result.resultFlag === false) {
				this.toaster.pop({
					type		: 'warning',
					timeout	: 2000,
					title		: result.details,
					body		: 'Operation cancelled.',                
					showCloseButton: true
				});
			}
		}

		showGroupListToChoose(){
			this.groupSelectGroupClick.showList = !this.groupSelectGroupClick.showList;
		}			


	
}

leftPanelController.$inject = [
	'$scope',  
	'toaster',
	'$timeout',
	'selectOptionManage',
	'$modalProxy'	
];