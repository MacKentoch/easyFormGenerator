/**
 *  ------------------------------------------------------
 *   edaEditController
 *  ------------------------------------------------------ 
 *
 * main controller for viewing / editing / managing forms
 *
 *
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
 */ 
angular
  .module('edaApp.controllers.edaEditController', [])
  .controller('edaEditController', [	'$scope', 
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
                                        'ddItemRightClickedManager',
  function (	$scope, 
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
              ddItemRightClickedManager) {



  /**
   * versionning
   */
  
  $scope.easyFormGeneratorVERSION = easyFormGenVersion;

  /**
   * tab managment
   */
  $scope.tab =  {
                  editTab : {active : true},
                  previewTab : {active : false},
                };


  /**
   * formly models
   */
  $scope.vm = this;
  /**
   * model filled by form :
   */
  $scope.vm.model = {};
  /**
   * form schema : 
   * (filled from $scope.configuration on drag an drop events)
   */
  $scope.vm.wfFormFields = [];
  /**
   * wfFormFieldsOnlyNeededProperties : formly field model 
   * (clean model : just needed properties
   *   -> that on is not bound to angular formly 
   *   -> could be saved to database
   * )
   */
  $scope.vm.wfFormFieldsOnlyNeededProperties = []; 

  /**
   * preview tab : manage collapse/expend states
   */
  $scope.ihm = {
                  preview : {
                                formlyModelViewExpanded : true,
                                formlyFieldsViewExpanded : true,
                                customizeFormButtonsExpanded : true,
                                saveThisFormExpanded : true  
                            }

  };


  /**
   * easyFormDragDropProperties : configure drag and drop apearance
   *
   * — see dragDropConfig provider —
   */
  $scope.easyFormDragDropProperties = dragDropConfig.getDragDropConfigModel();
  /**
   * dragDropModel : darg drop presentation model
   *
   * manage drag and drop UI : drag and drops events will change it then change configuration model
   */
  $scope.dragDropModel = [].concat(dragDropConfig.getDragDropPresentationModel());

  //console.dir(  {'dragDropModel' : $scope.dragDropModel});


 
   //column ref                         
   $scope.numberOfColumns = 1;
   $scope.MaxNumberOfColumns = 3;
   $scope.MinNumberOfColumns = 1;


  ///////////////////////////////////////////////////////////////////////////////////
  // configuration model (contains array of lines which contains array of columns)
  ///////////////////////////////////////////////////////////////////////////////////
  $scope.configuration = {};
  /**
   * formFieldManage.initConfigurationEditFromScratch(_OBJECT TO INIT_, _BOOL ADD STEP WAY PROPERTIES_)
   */
  formFieldManage.initConfigurationEditFromScratch($scope.configuration , false);
  
  // var testModel =  [
  //                   {
  //                       "line": 1,
  //                       "activeColumn": 1,
  //                       "columns": [
  //                           {
  //                               "numColumn": 1,
  //                               "exist": true,
  //                               "control": {
  //                                   "className": "col-xs-12",
  //                                   "type": "header",
  //                                   "key": "",
  //                                   "templateOptions": {
  //                                       "label": "",
  //                                       "required": false,
  //                                       "description": "Welcome",
  //                                       "placeholder": "",
  //                                       "options": [
  //                           ],
  //                                       "type": ""
  //                                   },
  //                                   "selectedControl": "Header",
  //                                   "subtype": "",
  //                                   "cssClass": "col-xs-12",
  //                                   "edited": true
  //                               }
  //               }
  //           ]
  //       },
  //                   {
  //                       "line": 2,
  //                       "activeColumn": 1,
  //                       "columns": [
  //                           {
  //                               "numColumn": 1,
  //                               "exist": true,
  //                               "control": {
  //                                   "className": "col-xs-12",
  //                                   "type": "subTitle",
  //                                   "key": "",
  //                                   "templateOptions": {
  //                                       "label": "",
  //                                       "required": false,
  //                                       "description": "Hello",
  //                                       "placeholder": "",
  //                                       "options": [
  //                           ],
  //                                       "type": ""
  //                                   },
  //                                   "selectedControl": "Subtitle",
  //                                   "subtype": "",
  //                                   "edited": true
  //                               }
  //               }
  //           ]
  //       }
  //   ];
  // /**
  //  * TODO to bind model from saved one
  //  * from @krupak :fixing loading model bug
  //  */
  // formFieldManage.bindConfigurationLines($scope.configuration, testModel, false);
  // formFieldManage.applyConfigurationToformlyModel(  
  //                                                   $scope.configuration, 
  //                                                   $scope.vm.wfFormFields, 
  //                                                   $scope.vm.model
  //                                                 );                   
  // $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);
  // ddModelConfModelProxyService.loadDragDropModelFromConfigurationModel( 
  //                                                   $scope.configuration, 
  //                                                   $scope.dragDropModel
  //                                                   );   
  // 
  
  
  
  
  
  
  
  
  //need to bind dragdrop model now
  
  
  /**
   * init proxyModel 
   * (object shared between this controller and edit panel controlelr)
   */
  controllerModalProxy.initProxyModel();
  /**
   * collapse all other group of draggable controls : when a group control expands
   */
  $scope.collapseAllGroupControl = function(allExceptThisGroupIndex){
    
    angular.forEach($scope.easyFormDragDropProperties.containerConfig.decoration, function(value){
      if (value.WhenIndex !== allExceptThisGroupIndex) {
          dragDropConfig.setDragDropConfigContainerDecorationCollapse($scope.easyFormDragDropProperties, value.WhenIndex, true);
      }
    });
    
  };



  $scope.vm.onSubmit = onSubmit;
  
  function onSubmit() {
  
       toaster.pop({
            type: 'info',
            timeout:2000,
            title: 'should save data model if it were not a static example',
            body: 'data :' + $filter('json')($scope.vm.model, 4),                
            showCloseButton: true
      }); 
  }



  // /**
  //  * init formly control list
  //  */
  // //needed for select : list all existing forms
  // $scope.loadExistingFormsList = loadExistingFormsAsList();


  // function loadExistingFormsAsList(){
  //   //If it were not a static html, it should call server to retrieve data from database :
  //   // $scope.formlyList = formsByIdService.query();  
  // }

  // //load on init
  // loadExistingFormsAsList();

  // $scope.previewLoadedForm = {fieldsModel:[]};
  // $scope.configurationLoaded = {};

  // $scope.previewExistingform = function(formlyform){

  //  var configlines = JSON.parse(formlyform.formlyField);
  //  //here to replace with $scope.configuration : initialise configuration with lines 
  //  $scope.configurationLoaded = {};
  //  formFieldManage.bindConfigurationLines($scope.configurationLoaded,configlines);

  //  formFieldManage.applyConfigurationToformlyModel($scope.configurationLoaded, $scope.previewLoadedForm.fieldsModel, $scope.vm.model);

  //  $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);

  //  $scope.previewLoadedForm.cancelButtonText = formlyform.cancelButtonText;
  //  $scope.previewLoadedForm.submitButtonText = formlyform.submitButtonText;
  // };






  //init number of configuration lines
  $scope.resetToZeroModel = function(){
     $scope.configuration.activeLine = 1;

     if ($scope.configuration.lines.length > 1) {
        $scope.configuration.lines.splice(1, $scope.configuration.lines.length - 2);
     }
     return $scope.countConfigurationModelLines();
  };  







  //return count configuration lines
  $scope.countConfigurationModelLines = function(){
  	return $scope.configuration.lines.length;
  };    
  //switch to line
  $scope.setActiveLineNumber = function(lineNumber){
  	if (lineNumber <= $scope.countConfigurationModelLines()) {
  		$scope.configuration.activeLine = lineNumber;
  	}
  };                

  $scope.upThisLine = function(indexLine){  	
  	if (indexLine > -1) {
  			if ($scope.configuration.lines[indexLine - 1]) {
  				var currentLineObj = $scope.configuration.lines[indexLine];
  				$scope.configuration.lines.splice(indexLine , 1);
  				$scope.configuration.lines.splice((indexLine - 1), 0, currentLineObj);  	
          //manage selected aciveLine
          $scope.configuration.activeLine = 1;
  			}
  	}
      //re-render formfield 
    formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);

    $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);     
  };


  $scope.downThisLine = function(indexLine){
  	if (indexLine > -1) {
  			if ($scope.configuration.lines[indexLine + 1]) {
  				var currentLineObj = $scope.configuration.lines[indexLine];
  				$scope.configuration.lines.splice(indexLine , 1);
  				$scope.configuration.lines.splice((indexLine + 1), 0, currentLineObj);  
          //manage selected aciveLine
          $scope.configuration.activeLine = 1;
  			}
      }     
      //re-render formfield 
    formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model); 
    $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);   
  };



  //must be remove a line with index of line to delete
  $scope.removeThisLine = function(index){
  	if (index > -1) {
  		if ($scope.configuration.lines.length > 1) {
          //manage selected aciveLine
          if ($scope.configuration.activeLine === index + 1) {
            $scope.configuration.activeLine = 1;
          }
  	  		$scope.configuration.lines.splice(index, 1);
  		}else{
  	  		$timeout(function(){
  		        toaster.pop({
  		                type: 'warning',
  		                title: 'Last line' ,
  		                body: 'Can\'t delete the last line',                
  		                showCloseButton: true
  			        });
  		    }, 100); 
  		}

    //re-render formfield 
    formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);
    $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);
  	}
  };





  $scope.increaseNumberOfColumns = function(){

    if ($scope.configuration.lines[$scope.configuration.activeLine -1].columns.length < $scope.MaxNumberOfColumns) {
  	var newNumberOfColumns = $scope.configuration.lines[$scope.configuration.activeLine -1].columns.push(
          																				{
          														                            numColumn: -1,
          														                            exist: true, 
          														                            control: {
          														                                        type:'none',
          														                                        key: 'none'
          														                                      }                                         
          																				 }																				
  																				);
  	
  	 $scope.configuration.lines[$scope.configuration.activeLine -1].columns[newNumberOfColumns - 1].numColumn = newNumberOfColumns; 
  }
     //re-render formfield 
    formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model); 

    $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);
};


  $scope.decreaseNumberOfColumns = function(indexLine, indexColumn){
  	if ($scope.configuration.lines[$scope.configuration.activeLine -1].columns.length > 1) {
  		$scope.configuration.lines[$scope.configuration.activeLine -1].columns.splice($scope.configuration.lines[$scope.configuration.activeLine -1].columns.length -1, 1);
  	}
    //re-render formfield 
    formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);  

    $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);  
  };













  ////////////////////////////////////////////////////////////
  //             porperties control (STEP 3)
  ////////////////////////////////////////////////////////////

  $scope.saveThisForm = function(){
    if (typeof $scope.configuration.formName === 'undefined') {
    toaster.pop({
            type: 'warning',
            timeout:2000,
            title: 'Form name is undefined',
            body: 'Form has not been saved.',                
            showCloseButton: true
      });
      return false;
    }

    if ($scope.configuration.formName === '') {
    toaster.pop({
            type: 'warning',
            timeout:2000,
            title: 'Form name is required',
            body: 'Form has not been saved.',                
            showCloseButton: true
      });
      return false;
    }
    /**
     * [type description]
     * @type {String}
     */
    toaster.pop({
            type: 'wait',
            timeout:10000,
            title: 'Form is being saved',
            body: 'Wait.',                
            showCloseButton: true
      });

//       var wfForm = new formsByIdService();
//       var formSavingIsOK = true;
// 
//       wfForm.formName = $scope.configuration.formName;
//       wfForm.submitButtonText = $scope.configuration.submitButtonText;
//       wfForm.cancelButtonText = $scope.configuration.cancelButtonText;
// 
//       wfForm.formlyField = JSON.stringify($scope.configuration.lines); 

      // save to database here 
      // wfForm.$save()
      //             .then(function(res)  {    formSavingIsOK = true;    })
      //             .catch(function(req) { 
      //                                   toaster.clear();
      //                                   formSavingIsOK = false; 
      //                                   toaster.pop({
      //                                           type: 'error',
      //                                           timeout:2000,
      //                                           title: 'Error while saving form',
      //                                           body: 'Sorry, an Error occured while saving form.',                
      //                                           showCloseButton: true
      //                                     });
      //             })
      //             .finally(function()  { 
      //                                   if (formSavingIsOK === true) {
      //                                     toaster.clear();  
      //                                     toaster.pop({
      //                                             type: 'success',
      //                                             timeout:2000,
      //                                             title: 'Form is successfully saved',
      //                                             body: '',                
      //                                             showCloseButton: true
      //                                       });                                         
      //                                   }
      //              });

      toaster.clear();  
      toaster.pop({
              type: 'info',
              timeout:2000,
              title: 'Form would be saved if it were not a static example',
              body: '',                
              showCloseButton: true
        }); 
      return true;
  };



  ////////////////////////////////////////////////////////////
  //            modal : add control to column
  ////////////////////////////////////////////////////////////

  $scope.nyaSelect = {};
  controllerModalProxy.initNyaSelect($scope.nyaSelect);

  $scope.animationsEnabled = true; 

  $scope.showModalAddCtrlToColumn = function (size, indexLine, numcolumn) {

    var modalInstance = $modal.open({
                                      animation: $scope.animationsEnabled,
                                      templateUrl: 'editModalTemplate.html', 
                                      controller: 'edaEditMODALController',
                                      size: 'lg',
                                      resolve: {
                                        nyaSelect: function () {
                                          return controllerModalProxy
                                                            .getNyASelectFromSelectedLineColumn(  $scope.nyaSelect, 
                                                                                                  $scope.configuration,
                                                                                                  indexLine, 
                                                                                                  numcolumn
                                                                                                );
                                        }
                                      }
    });


    modalInstance.result.then(function (modalAddCtrlModel) {
        controllerModalProxy.bindConfigurationModelFromModalReturn(indexLine, numcolumn, modalAddCtrlModel, $scope.configuration);
        formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);
        
        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


  /**
   *
   * 
   *   drag and drop : may move from this controller
   *
   *
   * 
   */

 
  //specific Container dragoverCallback event
  $scope.dragoverCallbackContainer = function(parentparentIndex, parentIndex, index){
      //prevent container in layout column to be drag to control select contianer 
      if (index === 0) {
          return false;
      }
      return true;
  };

  $scope.dropCallback = function(event, index, item, external, type, allowedType) {
          
      if (external) {
          if (allowedType === 'itemType'      && !item.label)             return false;
          if (allowedType === 'containerType' && !angular.isArray(item))  return false; 
      }

      /**
      * TODO : update configuration model
      */

      /**
      * set a timeout befire binding
      * since ddModel may not be called when already full updated
      */
      var timerRefreshDDToConfig = $timeout(function(){
        
        $scope.configuration = angular
                                  .copy(ddModelConfModelProxyService
                                          .refreshAllConfigurationFromDragAndDropModel(
                                                                                        $scope.configuration, 
                                                                                        $scope.dragDropModel
                                                                                       )
                                       );
        
        formFieldManage.applyConfigurationToformlyModel(  
                                                          $scope.configuration, 
                                                          $scope.vm.wfFormFields, 
                                                          $scope.vm.model
                                                        );
                                                        
        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);
         
        ddModelConfModelProxyService.refreshControlsKeys( 
                                                          $scope.configuration, 
                                                          $scope.dragDropModel
                                                         );            

      }, 200);

      /**
      * timerRefreshDDToConfig timer destruction
      */
      $scope.$on('$destroy', function(){
            $timeout.cancel(timerRefreshDDToConfig);
        }
      );
      

      return item;
  };



      
  $scope.dndItemMoved = function(parentParentIndex, parentIndex, itemIndex){
    //prevent item from first container to disapear when dropped on other container
    if (parentParentIndex > 0) {
        $scope.dragDropModel[parentParentIndex][parentIndex].splice(itemIndex, 1);
    }
  };

  $scope.dragoverCallbackItems = function(ParentParentIndex, parentIndex, index, external){
        //prevent items in layout column to be drag to control select  
        if (parentIndex === 0) {
            return false;
        }
        return true;
    };


  /**
   * disableItemDropIf prevent dropping on condition
   *
   * TODO : to replace in html : dnd-disable-if="items.length > 2"
   */
  $scope.disableItemDropIf = function(){

  };



  /**
   * [dropCallbackItems description]
   * @param  {[type]} event                   [description]
   * @param  {[type]} index                   [description]
   * @param  {[type]} realIndex               [description]
   * @param  {[type]} parentIndex             [description]
   * @param  {[type]} parentParentIndex       [description]
   * @param  {[type]} parentParentParentIndex [description]
   * @param  {[type]} item                    [description]
   * @param  {[type]} external                [description]
   * @param  {[type]} type                    [description]
   * @param  {[type]} allowedType             [description]
   * @return {[type]}                         [description]
   */
  $scope.dropCallbackItems = function(event, index, realIndex, parentIndex, parentParentIndex, parentParentParentIndex, item, external, type, allowedType){
    
      if (external) {
          if (allowedType === 'itemType' && !item.label) return false;
          if (allowedType === 'containerType' && !angular.isArray(item)) return false; 
      }
    
     /**
      * set a timeout before binding
      * since ddModel may not be called when already full updated
      */
      var timerRefreshDDToConfig = $timeout(function(){
        
        $scope.configuration = angular.copy(ddModelConfModelProxyService
                                                          .refreshAllConfigurationFromDragAndDropModel(
                                                                                                        $scope.configuration, 
                                                                                                        $scope.dragDropModel
                                                                                                      ));
                                                                                                      
        formFieldManage.applyConfigurationToformlyModel(  
                                                            $scope.configuration, 
                                                            $scope.vm.wfFormFields, 
                                                            $scope.vm.model
                                                        );
                                                        
        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields); 
        /**
         * refresh controls key in dragDrop Model
         * to persist already exists controls between refreshes when item drop events
         */
        ddModelConfModelProxyService.refreshControlsKeys( 
                                                          $scope.configuration, 
                                                          $scope.dragDropModel
                                                         );        

      }, 200);

      /**
       * add/set rightCliked property to false
       *
       * will help edaRightClick directive
       */
      ddItemRightClickedManager.setUnRightClicked(item);

      /**
      * timerRefreshDDToConfig timer destruction
      */
      $scope.$on('$destroy', function(){
            $timeout.cancel(timerRefreshDDToConfig);
        }
      );


      return item;
  };



  /**
   * left panel (edit control)
   */
  

  $scope.editPanelModel = {
                            toggle : false
                          };



  $scope.saveFromEditPanel = function(){

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
        
        controllerModalProxy.bindSpecialCtrlTemporyModelsToProxyModel();
    
        //save config to control
        //controllerModalProxy.applyConfigToSelectedControl(self.proxyModel);
        //return current model to parent controller :



        // //update configuration model and formly model
        controllerModalProxy
                .bindConfigurationModelFromProxyModel(  
                                                        controllerModalProxy.getEditPanelModelLineIndex(), 
                                                        controllerModalProxy.getEditPanelModelColumnIndex(), 
                                                        $scope.configuration
                                                      );

        formFieldManage.applyConfigurationToformlyModel(
                                                          $scope.configuration, 
                                                          $scope.vm.wfFormFields, 
                                                          $scope.vm.model
                                                        );
                                                            
        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields); 
        
        ddModelConfModelProxyService.refreshControlsKeys( 
                                                  $scope.configuration, 
                                                  $scope.dragDropModel
                                                  );    
    
        controllerModalProxy.setEditPanelModelToggle(false);
        $scope.editPanelModel.toggle = controllerModalProxy.getEditPanelModelToggle();  
        ddItemRightClickedManager.resetAllDragDropItemSelectedState($scope.dragDropModel);

  };
  /**
   * close side panel
   * -> no update =  cancel
   */
  $scope.closeEditPanel = function(){
    /**
     * reset all rightClicked control properties to false
     */
    ddItemRightClickedManager.resetAllDragDropItemSelectedState($scope.dragDropModel);


    /**
     * TODO : refresh configuration model 
     * uncomment pafter update these next 3 lines
     * 
     * NOTE : indexLine AND  numcolumn should be stored in service and
     * updated when togle sidepanel
     */
   
    //controllerModalProxy.bindConfigurationModelFromProxyModel(indexLine, numcolumn, modalAddCtrlModel, $scope.configuration);
    //formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);    
    //$scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);     
    
    controllerModalProxy.setEditPanelModelToggle(false);
    $scope.editPanelModel.toggle = controllerModalProxy.getEditPanelModelToggle();
    
  };

  $scope.debugProxyModel = controllerModalProxy.ProxyModel;



  $scope.setRightClicked = function(previousState, item){
    item.rightCliked = true;
  };


  $scope.toggleEditPanel = function(event, lineIndex, colIndex, item){
   ddItemRightClickedManager.resetAllDragDropItemSelectedState($scope.dragDropModel);
   /**
    * already opened (could be another control edit)
    */
   if (controllerModalProxy.getEditPanelModelToggle()) {
    /**
     * - immediate close 
     * and 
     * - refresh configuration model + formly model
     */
    controllerModalProxy.setEditPanelModelToggle(false);
    $scope.editPanelModel.toggle = controllerModalProxy.getEditPanelModelToggle(); 
    
    //TODO : for refreshing
    //controllerModalProxy.bindConfigurationModelFromProxyModel(indexLine, numcolumn, modalAddCtrlModel, $scope.configuration);
    //formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);    
    //$scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);    
            


    /**
     * check if new control right clicked otherwise just toggle side panel
     */
    if (typeof controllerModalProxy.getEditPanelModelLineIndex()    !== 'undefined' &&
        typeof controllerModalProxy.getEditPanelModelColumnIndex()  !== 'undefined' &&
        typeof controllerModalProxy.getEditPanelModelControl()      !== 'undefined') {
  
  
      if (controllerModalProxy.getEditPanelModelLineIndex()   === lineIndex &&
          controllerModalProxy.getEditPanelModelColumnIndex() === colIndex  &&
          angular.equals(controllerModalProxy.getEditPanelModelControl(), item)) {
  
          //console.info('already opened for SAME ctrl : so close - no re-open');
        
      }else{
  
          //console.info('already opened for DIFFERENT ctrl : so re-open');

          item.rightCliked = true;
          /**
          * set a timeout before re-opening
          * 500ms is ok for a ps-size="400px"
          */
          var timerCloseOpenedEditPanel = $timeout(function(){
            
           controllerModalProxy.setEditPanelModelLineIndex(lineIndex);
           controllerModalProxy.setEditPanelModelColumnIndex(colIndex);
           controllerModalProxy.setEditPanelModelControl(item);
           
           /**
            * control model passed to Service : controllerModalProxy
            * 
            */
           controllerModalProxy.setProxyModelFromConfigurationSelection(
                                                                        $scope.configuration,
                                                                        lineIndex, 
                                                                        colIndex
                                                                        );
           
           
           controllerModalProxy.setEditPanelModelToggle(true);
           $scope.editPanelModel.toggle = controllerModalProxy.getEditPanelModelToggle();                                         
            
          }, 200);
  
          /**
          * timerCloseOpenedEditPanel timer destruction
          */
          $scope.$on('$destroy', function(){
                $timeout.cancel(timerCloseOpenedEditPanel);
            }
          );
      }
    }
  
   }else{
    /**
     * previous state = closed = immediate open 
     */
     //console.info('NOT already opened : so open');
     item.rightCliked = true;
      
     controllerModalProxy.setEditPanelModelLineIndex(lineIndex);
     controllerModalProxy.setEditPanelModelColumnIndex(colIndex);
     controllerModalProxy.setEditPanelModelControl(item);
     
     /**
      * control model passed to Service : controllerModalProxy
      * 
      */
     controllerModalProxy.setProxyModelFromConfigurationSelection(
                                                                  $scope.configuration,
                                                                  lineIndex, 
                                                                  colIndex
                                                                  );

     
     controllerModalProxy.setEditPanelModelToggle(true);
     $scope.editPanelModel.toggle = controllerModalProxy.getEditPanelModelToggle();
     
   }                       
  };
  // /**
  //  * refreshModels : to call after drag and drop events
  //  */
  // $scope.refreshModels = function(){
  //   $timeout(function(){
  //     console.info('refreshing models');
  //     formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);
  //     $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields); 
  //   }, 10);


  // };



  /**
   * removeThisLine event line deleted
   */
  $scope.removeThisLine = function(lineIndex){
    $scope.dragDropModel[1].splice(lineIndex,1);
  };


  $scope.model = [];

  function addNewline(){
    /**
     * re-render formfield
     *
     * TODO : to fix
     */

    formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);
    $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields); 
  }


  $scope.insertNewLine = function(){
                          addNewline();
                          $scope.dragDropModel[1].push([]);
                          };

}]);
