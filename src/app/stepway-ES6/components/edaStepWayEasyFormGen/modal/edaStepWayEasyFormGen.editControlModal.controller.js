const EDIT_MODAL_CONTROLLER_NAME = 'editControlModalController';
const EDIT_MODAL_CONTROLLERAS_NAME = 'editControlModCtrl';

class editControlModalController {
	
	constructor(  $modalInstance, 
								nyaSelect, 
								toaster,
								selectOptionManage,
								controllerModalProxy) {
									
		this.$modalInstance 			= $modalInstance;
		this.nyaSelect 						= nyaSelect;
		this.toaster 							= toaster;
		this.selectOptionManage 	= selectOptionManage;
		this.controllerModalProxy = controllerModalProxy;
		
		this.init();
		
	}
	
	init() {
		const initOptionModel 					= { rows:[] };
		
		this.radioRowCollection 				= initOptionModel;
		this.newOptionRadio     				= {saisie: ''};
		this.basicSelectRowCollection 	= initOptionModel;
		this.newOptionBasicSelect     	= {saisie: ''};	
		this.groupedSelectRowCollection = initOptionModel;
		this.newOptionGroupedSelect     = {saisie: ''};
		this.GroupedSelectGroups        = { list:[] };
		this.newGroupGroupedSelect      = {saisie: ''};  
		this.groupSelectGroupClick      = {showList : false};			
		
		
	}
	
	
	
	addNewOptionRadio() {
		let result = this.selectOptionManage.addNewOptionRadio(this.radioRowCollection, $scope.newOptionRadio.saisie);
		if (result.resultFlag === false) {
			this.toaster.pop({
				type		: 'warning',
				timeout	: 2000,
				title		: result.details,
				body		: `'${this.newOptionRadio.saisie}' cannot be added.`,                 
				showCloseButton: true
			});
		}
		this.newOptionRadio = {saisie: ''}; //reset input
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
	
	upThisRadioRow(index) {
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
	
	
	downThisRadioRow(index) {
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


	addNewOptionBasicSelect() {
		let result = this.selectOptionManage.addNewOptionBasicSelect(this.basicSelectRowCollection, $scope.newOptionBasicSelect.saisie);
		if (result.resultFlag === false) {
			this.toaster.pop({
				type		: 'warning',
				timeout	: 2000,
				title		: result.details,
				body		: `'${this.newOptionBasicSelect.saisie}' cannot be added.`,                 
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
				timeout	:2000,
				title		: result.details,
				body		: 'Delete was cancelled.',                
				showCloseButton: true
			});
		}      
	} 	
	
	upThisRow(index) {
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
	
	downThisRow(index) {
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
	
		
	
}


const toInject =  [
	'$modalInstance',
	'nyaSelect',
	'toaster' ,
	'selectOptionManage',
	'controllerModalProxy',	
] 

editControlModalController.$inject = toInject;
export {EDIT_MODAL_CONTROLLER_NAME};