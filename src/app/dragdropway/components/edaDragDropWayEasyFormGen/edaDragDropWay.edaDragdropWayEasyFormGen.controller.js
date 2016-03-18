/* global angular */

  ///////////////////////////////////////////////////////////////////////
  // TODO :
  // - check no use methods that come from step way and delete if not needed
  // - check other TODO (a lot of fixes are needed)
  ///////////////////////////////////////////////////////////////////////

import {
  initTabModel,
  initIhmModel
}                       from './edaDragDropWay.edaDragdropWayEasyFormGen.controller.helpers.js';

const DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER    = 'edaDragDropWayEasyFormGenCtrl';
const DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLERAS  = 'vm';


class edaDragDropWayEasyFormGenCtrl{

  constructor(
    $scope,
    easyFormGenVersion,
    $filter,
    $anchorScroll,
    toaster,
    $timeout,
    $log,
    formFieldManage,
    controllerModalProxy,
    dragDropItemDecorationService,
    ddModelConfModelProxyService,
    ddItemRightClickedManager,
    easyFormDragWayConfig
  ){
    this.$scope                           = $scope;
    this.easyFormGenVersion               = easyFormGenVersion;
    this.$filter                          = $filter;
    this.$anchorScroll                    = $anchorScroll;
    this.toaster                          = toaster;
    this.$timeout                         = $timeout;
    this.$log                             = $log;
    this.formFieldManage                  = formFieldManage;
    this.controllerModalProxy             = controllerModalProxy;
    this.dragDropItemDecorationService    = dragDropItemDecorationService;
    // this.dragDropConfig                   = dragDropConfig;
    this.ddModelConfModelProxyService     = ddModelConfModelProxyService;
    this.ddItemRightClickedManager        = ddItemRightClickedManager;
    this.easyFormDragWayConfig            = easyFormDragWayConfig;

    this.init();
  }


  init(){
    this.easyFormGeneratorVERSION         = this.easyFormGenVersion;
    this.tab                              = initTabModel(this.easyFormDragWayConfig.isPreviewPanelVisible(), this.easyFormDragWayConfig.arePreviewModelsVisible());
    this.returnSaveEvent                  = false;
    this.dataModel                        = {}; //was vm.model in ES5 version
    this.wfFormFields                     = [];
    this.wfFormFieldsOnlyNeededProperties = [];
    this.ihm                              = initIhmModel();
    this.easyFormDragDropProperties       = this.easyFormDragWayConfig.getDragDropConfigModel();
    this.dragDropModel                    = [].concat(this.easyFormDragWayConfig.getDragDropPresentationModel());
    this.numberOfColumns                  = 1;
    this.MaxNumberOfColumns               = 3;
    this.MinNumberOfColumns               = 1;
    this.configuration                    = {};
    this.animationsEnabled                = this.easyFormDragWayConfig.getModalAnimationValue();
    this.editPanelModel                   = { toggle : false };
    this.debugProxyModel                  = this.controllerModalProxy.ProxyModel;
    this.model                            = [];

    this.formFieldManage.initConfigurationEditFromScratch(this.configuration , false);
    this.controllerModalProxy.initProxyModel();
  }


  collapseAllGroupControl(allExceptThisGroupIndex){
    angular.forEach(this.easyFormDragDropProperties.containerConfig.decoration, (value)=>{
      if (value.WhenIndex !== allExceptThisGroupIndex) this.easyFormDragWayConfig.setDragDropConfigContainerDecorationCollapse(this.easyFormDragDropProperties, value.WhenIndex, true);
    });
  }


  onSubmit() {
    this.toaster.pop({
      type            : 'info',
      timeout         : 2000,
      title           : 'should save data model if it were not a static example',
      body            : 'data :' + this.$filter('json')(this.dataModel, 4),
      showCloseButton : true
    });
  }


  resetToZeroModel(){
    this.configuration.activeLine = 1;
    if (this.configuration.lines.length > 1) this.configuration.lines.splice(1, this.configuration.lines.length - 2);
    return this.countConfigurationModelLines();
  }

  //TO CHECK if does not come from step way :
  countConfigurationModelLines(){
    return this.configuration.lines.length;
  }

  //  //TO CHECK THEN TO DELETE : should come from step way...
  // setActiveLineNumber(lineNumber){
  //  if (lineNumber <= this.countConfigurationModelLines()) this.configuration.activeLine = lineNumber;
  // }

//  //TO CHECK THEN TO DELETE : should come from step way...
//  upThisLine(indexLine){
//    if (indexLine > -1) {
//      if (this.configuration.lines[indexLine - 1]) {
//        let currentLineObj = this.configuration.lines[indexLine];
//        this.configuration.lines.splice(indexLine , 1);
//        this.configuration.lines.splice((indexLine - 1), 0, currentLineObj);
//        this.configuration.activeLine = 1;
//      }
//    }
//
//    this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
//    this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
//  }

  //  //TO CHECK THEN TO DELETE : should come from step way...
  // downThisLine(indexLine){
  //  if (indexLine > -1) {
  //    if (this.configuration.lines[indexLine + 1]) {
  //      let currentLineObj = this.configuration.lines[indexLine];
  //      this.configuration.lines.splice(indexLine , 1);
  //      this.configuration.lines.splice((indexLine + 1), 0, currentLineObj);
  //      this.configuration.activeLine = 1;
  //    }
  //  }
  //  this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
  //  this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
  // }

//  //TO CHECK THEN TO DELETE : should come from step way...
//  removeThisLine(index){
//    if (index > -1) {
//      if (this.configuration.lines.length > 1) {
//        if (this.configuration.activeLine === index + 1) this.configuration.activeLine = 1;
//        this.configuration.lines.splice(index, 1);
//      }else{
//        this.$timeout(()=>{
//          this.toaster.pop({
//            type            : 'warning',
//            title           : 'Last line' ,
//            body            : 'Can\'t delete the last line',
//            showCloseButton : true
//          });
//        }, 100);
//      }
//      this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
//      this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
//    }
//  }

  //  //TO CHECK THEN TO DELETE : should come from step way...
  // increaseNumberOfColumns(){
  //  if (this.configuration.lines[this.configuration.activeLine -1].columns.length < this.MaxNumberOfColumns) {
  //    let newNumberOfColumns = this.configuration.lines[this.configuration.activeLine -1].columns.push(initColumnTemplate());
  //    this.configuration.lines[this.configuration.activeLine -1].columns[newNumberOfColumns - 1].numColumn = newNumberOfColumns;
  //  }
  //  this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
  //  this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
  // }

  //  //TO CHECK THEN TO DELETE : should come from step way...
  // decreaseNumberOfColumns(indexLine, indexColumn){
  //  if (this.configuration.lines[this.configuration.activeLine -1].columns.length > 1) {
  //    this.configuration.lines[this.configuration.activeLine -1].columns.splice(this.configuration.lines[this.configuration.activeLine -1].columns.length -1, 1);
  //  }
  //  this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
  //  this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
  // }

  saveThisForm() {
    if (typeof this.configuration.formName === 'undefined') {
    this.toaster.pop({
        type    : 'warning',
        timeout : 2000,
        title   : 'Form name is undefined',
        body    : 'Form has not been saved.',
        showCloseButton : true
      });
      return false;
    }
    if (this.configuration.formName === '') {
    this.toaster.pop({
        type    : 'warning',
        timeout : 2000,
        title   : 'Form name is required',
        body    : 'Form has not been saved.',
        showCloseButton : true
      });
      return false;
    }
    this.toaster.pop({
      type    : 'wait',
      timeout : 10000,
      title   : 'Form is being saved',
      body    : 'Wait.',
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

  dragoverCallbackItems(ParentParentIndex, parentIndex){
    //prevent items in layout column to be drag to control select
    if (parentIndex === 0) return false;
    return true;
  }

  //TODO : will replace in html : dnd-disable-if="items.length > 2"
  disableItemDropIf(){

  }

  dropCallbackItems(event, index, realIndex, parentIndex, parentParentIndex, parentParentParentIndex, item, external, type, allowedType){
    if (external) {
      if (allowedType === 'itemType' && !item.label)                  return false;
      if (allowedType === 'containerType' && !angular.isArray(item))  return false;
    }
    //set a timeout before binding since ddModel may not be called when already full updated
    let timerRefreshDDToConfig = this.$timeout(()=>{
        this.configuration = angular.copy(this.ddModelConfModelProxyService.refreshAllConfigurationFromDragAndDropModel(this.configuration, this.dragDropModel));
        this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
        this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
        // refresh controls key in dragDrop Model to persist already exists controls between refreshes when item drop events
        this.ddModelConfModelProxyService.refreshControlsKeys(this.configuration, this.dragDropModel);
      }, 200);
    // add/set rightCliked property to false (will help edaRightClick directive)
    this.ddItemRightClickedManager.setUnRightClicked(item);
    // timerRefreshDDToConfig timer destruction
    this.$scope.$on('$destroy', ()=>this.$timeout.cancel(timerRefreshDDToConfig));
    return item;
  }


  saveFromEditPanel() {
    /**
    * TODO :
    * should be called from edit panel
    *
    * AND
    *
    * should call all these methods
    *
    * need to get  :
    *
    * - line index
    * - column index
    * - basicSelectRowCollection (from edpitpanelcontroller)   --> maybe in controllerModalProxy service
    * - groupedSelectRowCollection (from edpitpanelcontroller) --> maybe in controllerModalProxy service
    * - radioRowCollection (from edpitpanelcontroller)         --> maybe in controllerModalProxy service
    */
    this.controllerModalProxy.bindSpecialCtrlTemporyModelsToProxyModel();
    //save config to control
    //controllerModalProxy.applyConfigToSelectedControl(self.proxyModel);
    //return current model to parent controller :

    //update configuration model and formly model
    this.controllerModalProxy.bindConfigurationModelFromProxyModel(this.controllerModalProxy.getEditPanelModelLineIndex(), this.controllerModalProxy.getEditPanelModelColumnIndex(), this.configuration);
    this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
    this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
    this.ddModelConfModelProxyService.refreshControlsKeys(this.configuration, this.dragDropModel);
    this.controllerModalProxy.setEditPanelModelToggle(false);
    this.editPanelModel.toggle = this.controllerModalProxy.getEditPanelModelToggle();
    this.ddItemRightClickedManager.resetAllDragDropItemSelectedState(this.dragDropModel);
  }


  closeEditPanel(){
    // reset all rightClicked control properties to false
    this.ddItemRightClickedManager.resetAllDragDropItemSelectedState(this.dragDropModel);

    /**
    * TODO : refresh configuration model
    * uncomment after update these next 3 lines
    *
    * NOTE : indexLine AND  numcolumn should be stored in service and
    * updated when togle sidepanel
    */
    //this.controllerModalProxy.bindConfigurationModelFromProxyModel(indexLine, numcolumn, modalAddCtrlModel, this.configuration);
    //this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
    //this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);

    this.controllerModalProxy.setEditPanelModelToggle(false);
    this.editPanelModel.toggle = this.controllerModalProxy.getEditPanelModelToggle();
  }


  setRightClicked(previousState, item){
    item.rightCliked = true;
  }

  toggleEditPanel(event, lineIndex, colIndex, item){
    this.ddItemRightClickedManager.resetAllDragDropItemSelectedState(this.dragDropModel);
    // already opened (could be another control edit)
    if (this.controllerModalProxy.getEditPanelModelToggle()) {
      // -> immediate close and refresh configuration model + formly model
      this.controllerModalProxy.setEditPanelModelToggle(false);
      this.editPanelModel.toggle = this.controllerModalProxy.getEditPanelModelToggle();

      //TODO : for refreshing
      //this.controllerModalProxy.bindConfigurationModelFromProxyModel(indexLine, numcolumn, modalAddCtrlModel, this.configuration);
      //this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
      //this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);

      // check if new control right clicked otherwise just toggle side panel
      if (typeof this.controllerModalProxy.getEditPanelModelLineIndex()    !== 'undefined' &&
          typeof this.controllerModalProxy.getEditPanelModelColumnIndex()  !== 'undefined' &&
          typeof this.controllerModalProxy.getEditPanelModelControl()      !== 'undefined') {
        if (this.controllerModalProxy.getEditPanelModelLineIndex()   === lineIndex &&
            this.controllerModalProxy.getEditPanelModelColumnIndex() === colIndex  &&
          angular.equals(this.controllerModalProxy.getEditPanelModelControl(), item)) {
          //console.info('already opened for SAME ctrl : so close - no re-open');
        } else {
          //console.info('already opened for DIFFERENT ctrl : so re-open');
          item.rightCliked = true;
          // set a timeout before re-opening, 500ms is ok for a ps-size="400px"
          let timerCloseOpenedEditPanel = this.$timeout(()=>{
            this.controllerModalProxy.setEditPanelModelLineIndex(lineIndex);
            this.controllerModalProxy.setEditPanelModelColumnIndex(colIndex);
            this.controllerModalProxy.setEditPanelModelControl(item);
            // control model passed to Service : controllerModalProxy
            this.controllerModalProxy.setProxyModelFromConfigurationSelection(this.configuration, lineIndex, colIndex);
            this.controllerModalProxy.setEditPanelModelToggle(true);
            this.$scope.editPanelModel.toggle = this.controllerModalProxy.getEditPanelModelToggle();
          }, 200);
          this.$scope.$on('$destroy', ()=>this.$timeout.cancel(timerCloseOpenedEditPanel));
        }
      }
    } else {
      // previous state = closed = immediate open
      // console.info('NOT already opened : so open');
      item.rightCliked = true;

      this.controllerModalProxy.setEditPanelModelLineIndex(lineIndex);
      this.controllerModalProxy.setEditPanelModelColumnIndex(colIndex);
      this.controllerModalProxy.setEditPanelModelControl(item);
      // control model passed to Service : controllerModalProxy
      this.controllerModalProxy.setProxyModelFromConfigurationSelection(this.configuration, lineIndex, colIndex);
      this.controllerModalProxy.setEditPanelModelToggle(true);
      this.editPanelModel.toggle = this.controllerModalProxy.getEditPanelModelToggle();
    }

    // console.info('after toggleLeftPanel check :');
    // console.dir({
    //   'this.editPanelModel'                 : angular.copy(this.editPanelModel),
    //   'controllerModalProxy.editPanelModel' : angular.copy(this.controllerModalProxy.editPanelModel)
    // });
  }

  // // refreshModels : to call after drag and drop events
  // refreshModels(){
  //   this.$timeout(()=>{
  //    console.info('refreshing models');
  //    formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
  //    this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
  //   }, 10);
  // }


  removeThisLine(lineIndex){
    this.dragDropModel[1].splice(lineIndex,1);
  }


  //TODO : to fix
  addNewline(){
    // re-render formfield
    // TODO : to fix
    this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.dataModel);
    this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
  }

  insertNewLine(){
    this.addNewline();
    this.dragDropModel[1].push([]);
  }




}

edaDragDropWayEasyFormGenCtrl.$inject = [
    '$scope',
    'easyFormGenVersion',
    '$filter',
    '$anchorScroll',
    'toaster',
    '$timeout',
    '$log',
    'formFieldManage',
    'controllerModalProxy',
    'dragDropItemDecorationService',
    'ddModelConfModelProxyService',
    'ddItemRightClickedManager' ,
    'easyFormDragWayConfig'
];

export default edaDragDropWayEasyFormGenCtrl;

export {
  DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER,
  DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLERAS
};
