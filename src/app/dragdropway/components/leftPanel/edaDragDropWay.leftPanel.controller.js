import {
	dateFormats,
	setToday,
	clearDateTime
} 									from './edaDragDropWay.leftPanel.controller.helpers';

const LEFT_PANEL_CONTROLLER 	=	'leftPanelController';
const LEFT_PANEL_CONTROLLERAS	= 'leftPanelCtrl';

class leftPanelController{
	constructor(toaster,
							$timeout,
							$selectOptionMange,
							controllerModalProxy){

		this.toaster  						= toaster;
		this.$timeout  						= $timeout;
		this.$selectOptionMange  	= $selectOptionMange;
		this.controllerModalProxy = controllerModalProxy;

		this.init();
	}

	init() {
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

		this.demodt 										= {};
		this.demodt.formats							= dateFormats;
		this.dateOptions								= this.getDateOptions();

		// this.controllerModalProxy.resetAllTemporyModels();
    this.initNyaSelectConformingSelectedControl();
	}

	getDateOptions() {
		let dateOptions =  {
			formatYear	: 'yy',
			startingDay	: 1,
			showWeeks		: true,
			initDate		: null
		};
		return dateOptions;
	}

	initNyaSelectConformingSelectedControl() {
		//place proxyModel to selection if not none :
		if (this.proxyModel.temporyConfig.selectedControl !== 'none') {
			for (let i = this.proxyModel.controls.length - 1; i >= 0; i--) {
					if (this.proxyModel.controls[i].id === this.proxyModel.temporyConfig.selectedControl) this.modelproxyModel = this.proxyModel.controls[i];
			}
			if (this.proxyModel.temporyConfig.selectedControl === 'BasicSelect') this.controllerModalProxy.bindBasicSelectFromProxyModel(self.basicSelectRowCollection);
			if (this.proxyModel.temporyConfig.selectedControl === 'GroupedSelect') this.controllerModalProxy.bindGroupedSelectFromProxyModel(this.groupedSelectRowCollection, this.GroupedSelectGroups);
			if (this.proxyModel.temporyConfig.selectedControl === 'Radio') this.controllerModalProxy.bindRadioFromProxyModel(this.radioRowCollection);
		}
	}

	updateSpecialControl() {
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
		this.controllerModalProxy.bindSpecialCtrlTemporyModelsToProxyModel();
		return true;
	}

	resetTemporyConfig() {
		this.proxyModel.temporyConfig = {
			formlyLabel				: '',
			formlyRequired		: false,
			formlyPlaceholder	: '',
			formlyDescription	: '',
			formlyOptions			: []
		};
	}

	resetControl() {
		this.proxyModel.temporyConfig.formlyLabel 			= '';
		this.proxyModel.temporyConfig.formlyRequired 		= false;
		this.proxyModel.temporyConfig.formlyPlaceholder	= '';
		this.proxyModel.temporyConfig.formlyDescription 	= '';
		this.proxyModel.temporyConfig.formlyOptions 		= [];
		this.proxyModel.temporyConfig.datepickerPopup   = this.initDatePicker();
	}

	initDatePicker() {
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
			let result = this.$selectOptionMange.addNewOptionRadio(this.radioRowCollection, this.newOptionRadio.saisie);
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
			let result = this.$selectOptionMange.removeOption(this.radioRowCollection, index);
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
			let result = this.$selectOptionMange.upthisOption(this.radioRowCollection, index);
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
			let result = this.$selectOptionMange.downthisOption(this.radioRowCollection, index);
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
			let result = this.$selectOptionMange.addNewOptionBasicSelect(this.basicSelectRowCollection, this.newOptionBasicSelect.saisie);
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
			let result = this.$selectOptionMange.removeOption(this.basicSelectRowCollection, index);
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
				let result = this.$selectOptionMange.upthisOption(this.basicSelectRowCollection, index);
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
			let result = this.$selectOptionMange.downthisOption(this.basicSelectRowCollection, index);
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

		addNewGroupToGroupedSelect(){
			if (this.newGroupGroupedSelect.saisie !== '') {
				for (let i = this.GroupedSelectGroups.list.length - 1; i >= 0; i--) {
					if (this.GroupedSelectGroups.list[i] === this.newGroupGroupedSelect.saisie) {
						this.toaster.pop({
							type			: 'warning',
							timeout		: 2000,
							title			: 'Group already exists',
							body			: 'No group added.',
							showCloseButton: true
						});
					}
				}
				this.GroupedSelectGroups.list.push(this.newGroupGroupedSelect.saisie);
			}else{
				this.toaster.pop({
					type			: 'warning',
					timeout		: 2000,
					title			: 'Not a valid group to add',
					body			: 'No group added.',
					showCloseButton: true
				});
			}
			this.newGroupGroupedSelect.saisie = '';
		}


		addNewOptionGroupedSelect(){
			let result = this.$selectOptionMange.addNewOptionGroupedSelect(this.groupedSelectRowCollection, this.newOptionGroupedSelect.saisie, '');
			if (result.resultFlag === false) {
				this.toaster.pop({
					type			: 'warning',
					timeout		: 2000,
					title			: result.details,
					body			: `'${this.newOptionGroupedSelect.saisie}' cannot be added.`,
					showCloseButton: true
				});
			}
			//bind nya : dont bind here $apply is not done fast enough
			//bindGroupedSelectToNya();
			//reset input
			this.newOptionGroupedSelect = {saisie: ''};
		}


		removeGroupedSelectRow(index) {
			let result = this.$selectOptionMange.removeOption(this.groupedSelectRowCollection, index);
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
		let result = this.$selectOptionMange.upthisOption(this.groupedSelectRowCollection, index);
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
			let result = this.$selectOptionMange.downthisOption(this.groupedSelectRowCollection, index);
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


	today(){
		setToday(this.demodt);
	}


	clear(){
		clearDateTime(this.demodt);
	}


	open($event) {
		$event.preventDefault();
		$event.stopPropagation();
		this.demodt.opened = true;
	}



}

leftPanelController.$inject = [
	'toaster',
	'$timeout',
	'$selectOptionMange',
	'controllerModalProxy'
];

export default leftPanelController;

export {
	LEFT_PANEL_CONTROLLER,
	LEFT_PANEL_CONTROLLERAS
};
