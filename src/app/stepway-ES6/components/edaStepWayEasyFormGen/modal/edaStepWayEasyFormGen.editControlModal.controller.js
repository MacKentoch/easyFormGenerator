/* global angular */
/* global _ */
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
		this.demodt         						= {}; 
		this.dateOptions    						= this.dateOptionsInit(); 
		this.demodt.formats 						= ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		this.nyaSelect.selectedControl  = this.nyaSelect.temporyConfig.selectedControl;
      
		//init today date
		this.today();
		//init nyaSelect model depending selected control
		this.initNyaSelectConformingSelectedControl();			
	}
	

	initNyaSelectConformingSelectedControl(){
		//place nya-select to selection if not none :
		if (this.nyaSelect.selectedControl !== 'none') {
			for (let i = this.nyaSelect.controls.length - 1; i >= 0; i--) {
					if (this.nyaSelect.controls[i].id === this.nyaSelect.selectedControl) {
						this.modelNyaSelect = this.nyaSelect.controls[i];
					}
			}
			if (this.nyaSelect.selectedControl === 'BasicSelect') {
				this.bindBasicSelectFromNYA();
			}
			if (this.nyaSelect.selectedControl === 'GroupedSelect') {
				this.bindGroupedSelectFromNYA();
			} 
			if (this.nyaSelect.selectedControl === 'Radio') {
				this.bindRadioFromNYA();
			}    
		}
	}
	
	bindBasicSelectFromNYA(){
		if (this.nyaSelect.temporyConfig.formlyOptions.length > 0) {
			for (let i = 0; i <= this.nyaSelect.temporyConfig.formlyOptions.length-1; i++){
				let newOption = {
					'option'	: this.nyaSelect.temporyConfig.formlyOptions[i].name,
					'order'		: i,
					'group'		: ''
				};
				this.basicSelectRowCollection.rows.push(newOption);
			}    
		}
	}
	
	bindRadioFromNYA() {
		if (this.nyaSelect.temporyConfig.formlyOptions.length > 0) {
			for (let i = 0; i <= this.nyaSelect.temporyConfig.formlyOptions.length-1; i++){
				let newOption = {
						'option'	: this.nyaSelect.temporyConfig.formlyOptions[i].name,
						'order'		: i,
						'group'		: ''
				};
				this.radioRowCollection.rows.push(newOption);
			}    
		}
	}
	
	
	
	bindGroupedSelectFromNYA(){
		if (this.nyaSelect.temporyConfig.formlyOptions.length > 0) {
			for (let i = 0; i <= this.nyaSelect.temporyConfig.formlyOptions.length-1; i++){
				var newOption = {
					'option'	: this.nyaSelect.temporyConfig.formlyOptions[i].name,
					'order'		: i,
					'group'		: this.nyaSelect.temporyConfig.formlyOptions[i].group
				};
				this.groupedSelectRowCollection.rows.push(newOption);            
			}
			//grouplist : thx to lodash it is easy
			var filteredgroup = _.uniq(_.pluck(this.groupedSelectRowCollection.rows, 'group'));
			angular.copy(filteredgroup, this.GroupedSelectGroups.list); 
		}
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
	
	showGroupListToChoose() {
		this.groupSelectGroupClick.showList = !this.groupSelectGroupClick.showList;
	}	
	
	
	addNewGroupToGroupedSelect(){
		if (this.newGroupGroupedSelect.saisie !== '') {
			for (var i = this.GroupedSelectGroups.list.length - 1; i >= 0; i--) {
				if (this.GroupedSelectGroups.list[i] === this.newGroupGroupedSelect.saisie) {
					this.toaster.pop({
						type		: 'warning',
						timeout	: 2000,
						title		: 'Group already exists',
						body		: 'No group added.',                
						showCloseButton: true
					});          
				}
			}
			this.GroupedSelectGroups.list.push(this.newGroupGroupedSelect.saisie);
		}else{
			this.toaster.pop({
				type		: 'warning',
				timeout	: 2000,
				title		: 'Not a valid group to add',
				body		: 'No group added.',                
				showCloseButton: true
			});
		}
		this.newGroupGroupedSelect.saisie = '';
	}
	


	addNewOptionGroupedSelect() {
		var result = this.selectOptionManage.addNewOptionGroupedSelect(this.groupedSelectRowCollection, $scope.newOptionGroupedSelect.saisie, '');
		if (result.resultFlag === false) {
			this.toaster.pop({
				type		: 'warning',
				timeout	: 2000,
				title		: result.details,
				body		: `'${this.newOptionGroupedSelect.saisie}' cannot be added.`,                
				showCloseButton: true
			});
		}
		//bind nya : dont bind here $apply is not done fast enough
		//bindGroupedSelectToNya();
		//reset input
		this.newOptionGroupedSelect = {saisie: ''};
	}	
	
	
	removeGroupedSelectRow(index) {
		var result = this.selectOptionManage.removeOption(this.groupedSelectRowCollection, index);
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
	

	upThisGroupedSelectRow(index){
		var result = this.selectOptionManage.upthisOption(this.groupedSelectRowCollection, index);
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
	
	downThisGroupedSelectRow(index){
		var result = this.selectOptionManage.downthisOption(this.groupedSelectRowCollection, index);
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
	
	today() {
		this.demodt.dt = new Date();
	}	
	
	clear() {
		this.demodt.dt = null;
	} 
	
	openfct($event){
		$event.preventDefault();
		$event.stopPropagation();
		this.demodt.opened = true;
	}
	
	dateOptionsInit(){
		return  {
			formatYear	: 'yy',
			startingDay	: 1,
			showWeeks		: true,
			initDate		: null
		};
	}
	
	selectThisControl(controlName) {
		this.nyaSelect.selectedControl = 'none';
		this.resetTemporyConfig();
	
		for (var i = this.nyaSelect.controls.length - 1; i >= 0; i--) {
			if (this.nyaSelect.controls[i].id === controlName) {
				this.nyaSelect.selectedControl = this.nyaSelect.controls[i].id;         
			}
		}
	
		if (this.nyaSelect.selectedControl === 'Date') {
			this.initDatePicker();
		}
	}	
	
	
	okfct() {
		if (this.nyaSelect.selectedControl === 'BasicSelect') {
			this.bindBasicSelectToNya();
		}
		if (this.nyaSelect.selectedControl === 'GroupedSelect') {
			this.bindGroupedSelectToNya();
		}  
		if (this.nyaSelect.selectedControl === 'Radio') {
			this.bindRadioToNya();
		}  
		//save config to control
		this.controllerModalProxy.applyConfigToSelectedControl(this.nyaSelect);
		//return current model to parent controller :
		this.$modalInstance.close(this.nyaSelect);
	}	
	
	cancelfct() {
		this.$modalInstance.dismiss('cancel');
	} 	
	
	
	bindBasicSelectToNya() {
		let resetNyASelectOptions = [];
		this.nyaSelect.temporyConfig.formlyOptions = resetNyASelectOptions;
		if (this.basicSelectRowCollection.rows.length > 0) {
			for (let i = 0; i <= this.basicSelectRowCollection.rows.length - 1; i++){
				let newOption = {
					'name'	: this.basicSelectRowCollection.rows[i].option,
					'value'	: i,
					'group'	: ''
				};
				this.nyaSelect.temporyConfig.formlyOptions.push(newOption);
			}      
		}
	}	
	
	bindGroupedSelectToNya() {
		this.nyaSelect.temporyConfig.formlyOptions = [];
		for (let i = 0; i <= this.groupedSelectRowCollection.rows.length - 1; i++){
			let newOption = {
				'name'	: this.groupedSelectRowCollection.rows[i].option,
				'value'	: i,
				'group'	: this.groupedSelectRowCollection.rows[i].group
			};
			this.nyaSelect.temporyConfig.formlyOptions.push(newOption);  
		}
	}
	
	bindRadioToNya(){
		let resetNyASelectOptions = [];
		this.nyaSelect.temporyConfig.formlyOptions = resetNyASelectOptions;
		if (this.radioRowCollection.rows.length > 0) {
			for (let i = 0; i <= this.radioRowCollection.rows.length - 1; i++){
						let newOption = {
							'name'	: this.radioRowCollection.rows[i].option,
							'value'	: i,
							'group'	: ''
						};
						this.nyaSelect.temporyConfig.formlyOptions.push(newOption);   
				}       
		}
	}		
	
	
	initDatePicker() {
		this.nyaSelect.temporyConfig.datepickerPopup = this.demodt.formats[0];  
	} 	
	
	resetTemporyConfig(){
		this.nyaSelect.temporyConfig = {
			formlyLabel				: '', 
			formlyRequired		: false, 
			formlyPlaceholder	: '',
			formlyDesciption	: '',
			formlyOptions			: []
		};   
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
export default editControlModalController;
export {EDIT_MODAL_CONTROLLER_NAME};