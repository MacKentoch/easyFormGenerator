const EDIT_MODAL_CONTROLLER_NAME     = 'editControlModalController';
const EDIT_MODAL_CONTROLLERAS_NAME   = 'editControlModCtrl';

class editControlModalController {
  constructor(  $uibModalInstance,
                nyaSelect,
                toaster,
                selectOptionManage,
                $modalProxy) {

    this.$modalInstance     = $uibModalInstance;
    this.nyaSelect          = nyaSelect;
    this.toaster            = toaster;
    this.selectOptionManage = selectOptionManage;
    this.$modalProxy        = $modalProxy;

    this.init();
  }

  init() {
    const initOptionModel           = { rows:[] };

    this.radioRowCollection         = initOptionModel;
    this.newOptionRadio             = {saisie: ''};
    this.basicSelectRowCollection   = initOptionModel;
    this.newOptionBasicSelect       = {saisie: ''};
    this.groupedSelectRowCollection = initOptionModel;
    this.newOptionGroupedSelect     = {saisie: ''};
    this.GroupedSelectGroups        = { list:[] };
    this.newGroupGroupedSelect      = {saisie: ''};
    this.groupSelectGroupClick      = {showList : false};
    this.showGroupList              = false;
    this.demodt                     = {};
    this.dateOptions                = this.dateOptionsInit();
    this.demodt.formats             = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    this.nyaSelect.selectedControl  = this.nyaSelect.temporyConfig.selectedControl;
    this.nyaSelectFiltered          = {};
    this.modelNyaSelect             = {};

    //init today date
    this.today();
    //init nyaSelect model depending selected control
    this.initNyaSelectConformingSelectedControl();
  }

  initNyaSelectConformingSelectedControl(){
    //place nya-select to selection if not none :
    if (this.nyaSelect.selectedControl !== 'none') {
      for (let i = this.nyaSelect.controls.length - 1; i >= 0; i--) {
        if (this.nyaSelect.controls[i].id === this.nyaSelect.selectedControl) this.modelNyaSelect = this.nyaSelect.controls[i];
      }
      if (this.nyaSelect.selectedControl === 'BasicSelect')   this.bindBasicSelectFromNYA();
      if (this.nyaSelect.selectedControl === 'GroupedSelect') this.bindGroupedSelectFromNYA();
      if (this.nyaSelect.selectedControl === 'Radio')         this.bindRadioFromNYA();
    }
    this.initNyaSelectFiltered();
  }

  initNyaSelectFiltered(){
    const listCtrl = [].concat(this.$modalProxy.getFilteredNyaSelectObject());
    angular.extend(this.nyaSelectFiltered,{
      'controls'        : listCtrl,
      'selectedControl' : this.nyaSelect.selectedControl,
      'temporyConfig'   : this.nyaSelect.temporyConfig
    });
  }

  bindBasicSelectFromNYA(){
    if (this.nyaSelect.temporyConfig.formlyOptions.length > 0) {
      for (let i = 0; i <= this.nyaSelect.temporyConfig.formlyOptions.length-1; i++){
        const newOption = {
          'option'  : this.nyaSelect.temporyConfig.formlyOptions[i].name,
          'order'    : i,
          'group'    : ''
        };
        this.basicSelectRowCollection.rows.push(newOption);
      }
    }
  }

  bindRadioFromNYA() {
    if (this.nyaSelect.temporyConfig.formlyOptions.length > 0) {
      for (let i = 0; i <= this.nyaSelect.temporyConfig.formlyOptions.length-1; i++){
        const newOption = {
            'option'  : this.nyaSelect.temporyConfig.formlyOptions[i].name,
            'order'    : i,
            'group'    : ''
        };
        this.radioRowCollection.rows.push(newOption);
      }
    }
  }

  bindGroupedSelectFromNYA(){
    if (this.nyaSelect.temporyConfig.formlyOptions.length > 0) {
      for (let i = 0; i <= this.nyaSelect.temporyConfig.formlyOptions.length-1; i++){
        const newOption = {
          'option'  : this.nyaSelect.temporyConfig.formlyOptions[i].name,
          'order'    : i,
          'group'    : this.nyaSelect.temporyConfig.formlyOptions[i].group
        };
        this.groupedSelectRowCollection.rows.push(newOption);
      }
      const filteredgroup = _.uniq(_.pluck(this.groupedSelectRowCollection.rows, 'group'));
      angular.copy(filteredgroup, this.GroupedSelectGroups.list);
    }
  }

  addNewOptionRadio() {
    const result = this.selectOptionManage.addNewOptionRadio(this.radioRowCollection, this.newOptionRadio.saisie);
    if (result.resultFlag === false) {
      this.toaster.pop({
        type    : 'warning',
        timeout  : 2000,
        title    : result.details,
        body    : `'${this.newOptionRadio.saisie}' cannot be added.`,
        showCloseButton: true
      });
    }
    this.newOptionRadio = {saisie: ''}; //reset input
  }

  removeRadioRow(index) {
    const result = this.selectOptionManage.removeOption(this.radioRowCollection, index);
      if (result.resultFlag === false) {
        this.toaster.pop({
          type      : 'warning',
          timeout    : 2000,
          title      : result.details,
          body      : 'Delete was cancelled.',
          showCloseButton: true
        });
    }
  }

  upThisRadioRow(index) {
    const result = this.selectOptionManage.upthisOption(this.radioRowCollection, index);
    if (result.resultFlag === false) {
      this.toaster.pop({
        type    : 'warning',
        timeout  : 2000,
        title    : result.details,
        body    : 'Operation cancelled.',
        showCloseButton: true
      });
    }
  }

  downThisRadioRow(index) {
    const result = this.selectOptionManage.downthisOption(this.radioRowCollection, index);
    if (result.resultFlag === false) {
      this.toaster.pop({
        type    : 'warning',
        timeout  : 2000,
        title    : result.details,
        body    : 'Operation cancelled.',
        showCloseButton: true
      });
    }
  }

  addNewOptionBasicSelect() {
    const result = this.selectOptionManage.addNewOptionBasicSelect(this.basicSelectRowCollection, this.newOptionBasicSelect.saisie);
    if (result.resultFlag === false) {
      this.toaster.pop({
        type    : 'warning',
        timeout  : 2000,
        title    : result.details,
        body    : `'${this.newOptionBasicSelect.saisie}' cannot be added.`,
        showCloseButton: true
      });
    }
    this.newOptionBasicSelect = {saisie: ''}; //reset input
  }

  removeRow(index) {
    const result = this.selectOptionManage.removeOption(this.basicSelectRowCollection, index);
    if (result.resultFlag === false) {
      this.toaster.pop({
        type    : 'warning',
        timeout  :2000,
        title    : result.details,
        body    : 'Delete was cancelled.',
        showCloseButton: true
      });
    }
  }

  upThisRow(index) {
    const result = this.selectOptionManage.upthisOption(this.basicSelectRowCollection, index);
    if (result.resultFlag === false) {
      this.toaster.pop({
        type    : 'warning',
        timeout  : 2000,
        title    : result.details,
        body    : 'Operation cancelled.',
        showCloseButton: true
      });
    }
  }

  downThisRow(index) {
    const result = this.selectOptionManage.downthisOption(this.basicSelectRowCollection, index);
    if (result.resultFlag === false) {
      this.toaster.pop({
        type    : 'warning',
        timeout  : 2000,
        title    : result.details,
        body    : 'Operation cancelled.',
        showCloseButton: true
      });
    }
  }

  showGroupListToChoose() {
    this.groupSelectGroupClick.showList = !this.groupSelectGroupClick.showList;
  }

  addNewGroupToGroupedSelect(){
    if (this.newGroupGroupedSelect.saisie !== '') {
      for (let i = this.GroupedSelectGroups.list.length - 1; i >= 0; i--) {
        if (this.GroupedSelectGroups.list[i] === this.newGroupGroupedSelect.saisie) {
          this.toaster.pop({
            type    : 'warning',
            timeout  : 2000,
            title    : 'Group already exists',
            body    : 'No group added.',
            showCloseButton: true
          });
        }
      }
      this.GroupedSelectGroups.list.push(this.newGroupGroupedSelect.saisie);
    }else{
      this.toaster.pop({
        type    : 'warning',
        timeout  : 2000,
        title    : 'Not a valid group to add',
        body    : 'No group added.',
        showCloseButton: true
      });
    }
    this.newGroupGroupedSelect.saisie = '';
  }

  addNewOptionGroupedSelect() {
    const result = this.selectOptionManage.addNewOptionGroupedSelect(this.groupedSelectRowCollection, this.newOptionGroupedSelect.saisie, '');
    if (result.resultFlag === false) {
      this.toaster.pop({
        type    : 'warning',
        timeout  : 2000,
        title    : result.details,
        body    : `'${this.newOptionGroupedSelect.saisie}' cannot be added.`,
        showCloseButton: true
      });
    }
    // bind nya : dont bind here $apply is not done fast enough
    // bindGroupedSelectToNya();
    // reset input
    this.newOptionGroupedSelect = {saisie: ''};
  }

  removeGroupedSelectRow(index) {
    const result = this.selectOptionManage.removeOption(this.groupedSelectRowCollection, index);
    if (result.resultFlag === false) {
      this.toaster.pop({
        type    : 'warning',
        timeout  : 2000,
        title    : result.details,
        body    : 'Delete was cancelled.',
        showCloseButton: true
      });
    }
  }

  upThisGroupedSelectRow(index){
    const result = this.selectOptionManage.upthisOption(this.groupedSelectRowCollection, index);
    if (result.resultFlag === false) {
      this.toaster.pop({
        type    : 'warning',
        timeout  : 2000,
        title    : result.details,
        body    : 'Operation cancelled.',
        showCloseButton: true
      });
    }
  }

  downThisGroupedSelectRow(index){
    const result = this.selectOptionManage.downthisOption(this.groupedSelectRowCollection, index);
    if (result.resultFlag === false) {
      this.toaster.pop({
        type    : 'warning',
        timeout  : 2000,
        title    : result.details,
        body    : 'Operation cancelled.',
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

  open($event){
    $event.preventDefault();
    $event.stopPropagation();
    this.demodt.opened = true;
  }

  dateOptionsInit(){
    return  {
      formatYear  : 'yy',
      startingDay  : 1,
      showWeeks    : true,
      initDate    : null
    };
  }

  selectThisControl(controlName) {
    this.nyaSelect.selectedControl = 'none';
    this.resetTemporyConfig();
    for (let i = this.nyaSelect.controls.length - 1; i >= 0; i--) {
      if (this.nyaSelect.controls[i].id === controlName) this.nyaSelect.selectedControl = this.nyaSelect.controls[i].id;
    }
    if (this.nyaSelect.selectedControl === 'Date') this.initDatePicker();
  }

  ok() {
    if (this.nyaSelect.selectedControl === 'BasicSelect')   this.bindBasicSelectToNya();
    if (this.nyaSelect.selectedControl === 'GroupedSelect') this.bindGroupedSelectToNya();
    if (this.nyaSelect.selectedControl === 'Radio')         this.bindRadioToNya();
    //save config to control
    this.$modalProxy.applyConfigToSelectedControl(this.nyaSelect);
    //return current model to parent controller :
    this.$modalInstance.close(this.nyaSelect);
  }

  cancel() {
    this.$modalInstance.dismiss('cancel');
  }

  bindBasicSelectToNya() {
    const resetNyASelectOptions = [];
    this.nyaSelect.temporyConfig.formlyOptions = resetNyASelectOptions;
    if (this.basicSelectRowCollection.rows.length > 0) {
      for (let i = 0; i <= this.basicSelectRowCollection.rows.length - 1; i++){
        const newOption = {
          'name'  : this.basicSelectRowCollection.rows[i].option,
          'value'  : i,
          'group'  : ''
        };
        this.nyaSelect.temporyConfig.formlyOptions.push(newOption);
      }
    }
  }

  bindGroupedSelectToNya() {
    this.nyaSelect.temporyConfig.formlyOptions = [];
    for (let i = 0; i <= this.groupedSelectRowCollection.rows.length - 1; i++){
      const newOption = {
        'name'  : this.groupedSelectRowCollection.rows[i].option,
        'value'  : i,
        'group'  : this.groupedSelectRowCollection.rows[i].group
      };
      this.nyaSelect.temporyConfig.formlyOptions.push(newOption);
    }
  }

  bindRadioToNya(){
    const resetNyASelectOptions = [];
    this.nyaSelect.temporyConfig.formlyOptions = resetNyASelectOptions;
    if (this.radioRowCollection.rows.length > 0) {
      for (let i = 0; i <= this.radioRowCollection.rows.length - 1; i++){
        const newOption = {
          'name'  : this.radioRowCollection.rows[i].option,
          'value'  : i,
          'group'  : ''
        };
        this.nyaSelect.temporyConfig.formlyOptions.push(newOption);
        }
    }
  }

  initDatePicker() {
    this.nyaSelect.temporyConfig.datepickerOptions = {
      format : this.demodt.formats[0]
    };
  }

  resetTemporyConfig() {
    this.nyaSelectFiltered.temporyConfig = {
      formlyLabel        : '',
      formlyRequired    : false,
      formlyPlaceholder  : '',
      formlyDescription  : '',
      formlyOptions      : []
    };
  }
}

const toInject =  [
  '$uibModalInstance',
  'nyaSelect',
  'toaster' ,
  'selectOptionManage',
  '$modalProxy'
];

editControlModalController.$inject = toInject;

export default editControlModalController;

export {
  EDIT_MODAL_CONTROLLER_NAME,
  EDIT_MODAL_CONTROLLERAS_NAME
};
