///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  module = "controllers"  for view "edit/manage forms"
//  ------------------------------------------------------
//      Syntax (convention) :
//          "edaApp" = application
//          "edaApp.controllers.viewNameController" = controller module
//
//  This module is a view controller -> it must be injected in controller container
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
                                        'formsByIdService',
                                        'controllerModalProxy',
                                        'dragDropItemDecorationService',
                                        'dragDropConfig',
                                        'ddModelConfModelProxyService',
  function (	$scope, 
              easyFormGenVersion,
              $filter,
              $anchorScroll,
							toaster,
							$timeout, 
              $modal,
              $log, 
              formFieldManage, 
              formsByIdService, 
              controllerModalProxy,
              dragDropItemDecorationService,
              dragDropConfig,
              ddModelConfModelProxyService) {

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

      var wfForm = new formsByIdService();
      var formSavingIsOK = true;

      wfForm.formName = $scope.configuration.formName;
      wfForm.submitButtonText = $scope.configuration.submitButtonText;
      wfForm.cancelButtonText = $scope.configuration.cancelButtonText;

      wfForm.formlyField = JSON.stringify($scope.configuration.lines); 

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
                                      templateUrl: 'modalWfEdit.html', 
                                      controller: 'edaEditMODALController',
                                      size: 'lg',
                                      resolve: {
                                        nyaSelect: function () {
                                          return controllerModalProxy.getNyASelectFromSelectedLineColumn($scope.nyaSelect, $scope.configuration,indexLine, numcolumn);
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



  // $scope.toggleAnimation = function () {
  //   $scope.animationsEnabled = !$scope.animationsEnabled;
  // };                            







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
        
        $scope.configuration = angular.copy(ddModelConfModelProxyService.refreshAllConfigurationFromDragAndDropModel($scope.configuration, $scope.dragDropModel));
        
        formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);
        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields); 

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
        
        $scope.configuration = angular.copy(ddModelConfModelProxyService.refreshAllConfigurationFromDragAndDropModel($scope.configuration, $scope.dragDropModel));

        formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);
        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields); 

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
