///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  module = "controllers"  for view "edit/manage forms"
//  ------------------------------------------------------
//      Syntax (convention) :
//          "ngwfApp" = application
//          "ngwfApp.controllers.viewNameController" = controller module
//
//  This module is a view controller -> it must be injected in controller container
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ngwfWfEditController = angular.module('ngwfApp.controllers.ngwfWfEditController', []);

ngwfWfEditController.controller('ngwfWfEditController', [	'$scope', 
                                                          '$filter',
                                                          '$anchorScroll',
                            															'toaster', 
                            															'$timeout',
                                                          '$modal',
                                                          '$log', 
                                                          'formFieldManage',
                                                          'wfFormsByIdServices',
                                                          'controllerModalProxy',
                                                          
                            															function (	$scope, 
                                                                      $filter,
                                                                      $anchorScroll,
                                  																		toaster,
                                  																		$timeout, 
                                                                      $modal,
                                                                      $log, 
                                                                      formFieldManage, 
                                                                      wfFormsByIdServices, 
                                                                      controllerModalProxy
                                                                      ) {
  //verbose
  console.log('--> INIT : Hello controller  \'\'ngwfWfEditController\'\' ');


  $scope.easyFormGeneratorWbesiteVERSION = 'v1.1.2';

  
  ///////////////////////////////////////////////////
  // DEBUG model
  ///////////////////////////////////////////////////



  $scope.debug = {
                   showDebug : false,
                   configurationModelNumberofLines : 1
            };


  $scope.tab =  {
                  editTab : {active : true},
                  previewTab : {active : false},
                };


  ///////////////////////
  //formly control
  ///////////////////////

  //model filled by form :
  $scope.vm.model = {};
  //form schema : (filled from $scope.configuration in each step)
  $scope.vm.wfFormFields = [];

  $scope.vm.wfFormFieldsOnlyNeededProperties = [];  

  $scope.vm.formHtml = 
              '<form ng-submit="vm.onSubmit()" name="vm.form" novalidate> \n' +
              ' <formly-form model="vm.model" fields="vm.fields" options="vm.options" form="vm.form"> \n' +
              '   <button type="submit" class="btn btn-primary submit-button pull-right" ng-disabled="vm.form.$invalid">{{vm.submitButtonText}}</button> \n' +
              '   <button type="button" class="btn btn-default pull-right" ng-click="vm.options.resetModel()">{{vm.cancelButtonText}}</button> \n' +
              ' </formly-form> \n' +
            '</form>';

  ////////////////////////////
  //init formly control list
  ////////////////////////////

  //needed for select : list all existing forms
  $scope.loadExistingFormsList = loadExistingFormsAsList();


  function loadExistingFormsAsList(){
    //If it were not a static html, it should call server to retrieve data from database :
    // $scope.formlyList = wfFormsByIdServices.query();
    // if ($scope.debug.showDebug ===true) {
    //   console.info('---> INIT : formlyList : ');
    //   console.dir($scope.formlyList); 
    // }     
  }

  //load on init
  loadExistingFormsAsList();


  $scope.previewLoadedForm = {fieldsModel:[]};
  $scope.configurationLoaded = {};

  $scope.previewExistingform = function(formlyform){

   var configlines = JSON.parse(formlyform.formlyField);
   //here to replace with $scope.configuration : initialise configuration with lines 
   $scope.configurationLoaded = {};
   formFieldManage.bindConfigurationLines($scope.configurationLoaded,configlines);
   formFieldManage.applyConfigurationToformlyModel($scope.configurationLoaded, $scope.previewLoadedForm.fieldsModel, $scope.vm.model);

   $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);

   $scope.previewLoadedForm.cancelButtonText = formlyform.cancelButtonText;
   $scope.previewLoadedForm.submitButtonText = formlyform.submitButtonText;
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

    //data model in console
    console.dir($scope.vm.model);
  }


  
 //column ref                         
 $scope.numberOfColumns = 1;
 $scope.MaxNumberOfColumns = 3;
 $scope.MinNumberOfColumns = 1;


  ///////////////////////////////////////////////////
  // a column model template (to get an idea)
  ///////////////////////////////////////////////////
 //reference column object : addinding new column to configuration.line model = adding this object
 $scope.columnTemplate = {
                            numColumn: -1,
                            exist:true, 
                            control: {
                                        type:'none',
                                        key: 'none',
                                        subtype: 'none',
                                        // templateOptions: {
                                        //                     label: 'none',
                                        //                     placeholder: 'none',
                                        //                     required: false,
                                        //                     description: 'Descriptive text'
                                        //                   }
                                      }                                         
	                       };

  ///////////////////////////////////////////////////
  // a line model template (to get an idea)
  ///////////////////////////////////////////////////
 //reference line object : addinding new line to configuration model = adding this object
 $scope.lineTemplate = {
                        line:-1, 
                        activeColumn : 1,
                        columns: [
                                        {  
                                            numColumn: 1,
                                            exist:true, 
                                            control: {
                                                        type:'none',
                                                        key: 'none',
                                                        // templateOptions: {
                                                        //                     label: 'none',
                                                        //                     placeholder: 'none',
                                                        //                     required: false,
                                                        //                     description: 'Descriptive text'
                                                        //                   }
                                                      }
                                          }
                                  ]
 						};


  ///////////////////////////////////////////////////////////////////////////////////
  // configuration model (contains array of lines which contains array of columns)
  ///////////////////////////////////////////////////////////////////////////////////
  $scope.configuration = {};
  formFieldManage.initConfigurationEditFromScratch($scope.configuration);
  

  //init number of configuration lines
  $scope.resetToZeroModel = function(){
     $scope.configuration.activeLine = 1;

     if ($scope.configuration.lines.length > 1) {
        $scope.configuration.lines.splice(1, $scope.configuration.lines.length - 2);
     }
     return $scope.countConfigurationModelLines();
  };  



  ////////////////////////////////////////////////////////////
  //            line control (STEP 0)
  ////////////////////////////////////////////////////////////

  //return count configuration lines
  $scope.countConfigurationModelLines = function(){
  	//information in debug model
  	$scope.debug.configurationModelNumberofLines = $scope.configuration.lines.length;
  	return $scope.configuration.lines.length;
  };    
  //switch to line
  $scope.setActiveLineNumber = function(lineNumber){
  	if (lineNumber <= $scope.countConfigurationModelLines()) {
  		$scope.configuration.activeLine = lineNumber;
  	}
  };                
  //step next line
   $scope.goNextLineNumber = function(){
    if ($scope.configuration.activeLine !== $scope.configuration.lines.length) {
     	$scope.configuration.activeLine ++;
    }
  };  
  //step previous line
   $scope.goPreviousLineNumber = function(){
    if ($scope.configuration.activeLine !== 0) {
     	$scope.configuration.activeLine --;
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

//
  $scope.addNewline = function(){
  	var newNumberOfLines = $scope.configuration.lines.push(
															{
											                    line:-1, 
											                    activeColumn : 1,
											                    columns: [
											                                    {  
											                                        numColumn: 1,
											                                        exist:true, 
											                                        control: {
											                                                    type:'none',
											                                                    key: 'none',
											                                                    // templateOptions: {
											                                                    //                     label: 'none',
											                                                    //                     placeholder: 'none',
											                                                    //                     required: false,
											                                                    //                     description: 'Descriptive text'
											                                                    //                   }
											                                                  }
											                                      }
											                              ]
																}

		);
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

  ////////////////////////////////////////////////////////////
  //            columns control (STEP 1)
  ////////////////////////////////////////////////////////////

  $scope.increaseNumberOfColumns = function(){

  if ($scope.configuration.lines[$scope.configuration.activeLine -1].columns.length < $scope.MaxNumberOfColumns) {
  	var newNumberOfColumns = $scope.configuration.lines[$scope.configuration.activeLine -1].columns.push(
          																				{
          														                            numColumn: -1,
          														                            exist: true, 
          														                            control: {
          														                                        type:'none',
          														                                        key: 'none'
          														                                        // templateOptions: {
          														                                        //                     label: 'none',
          														                                        //                     placeholder: 'none',
          														                                        //                     required: false,
          														                                        //                     description: 'Descriptive text'
          														                                        //                   }
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
  //            components control (STEP 2)
  ////////////////////////////////////////////////////////////










  ////////////////////////////////////////////////////////////
  //             porperties control (STEP 3)
  ////////////////////////////////////////////////////////////

  $scope.saveThisForm = function(){
    // if (typeof $scope.configuration.formName === 'undefined') {
    // toaster.pop({
    //         type: 'warning',
    //         timeout:2000,
    //         title: 'Form name is undefined',
    //         body: 'Form has not been saved.',                
    //         showCloseButton: true
    //   });
    //   return false;
    // }

    // if ($scope.configuration.formName === '') {
    // toaster.pop({
    //         type: 'warning',
    //         timeout:2000,
    //         title: 'Form name is required',
    //         body: 'Form has not been saved.',                
    //         showCloseButton: true
    //   });
    //   return false;
    // }

  toaster.pop({
          type: 'wait',
          timeout:10000,
          title: 'Form is being saved',
          body: 'Wait.',                
          showCloseButton: true
    });

    var wfForm = new wfFormsByIdServices();
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


    showModalSaveToHtml();

    toaster.clear();  
    // toaster.pop({
    //         type: 'info',
    //         timeout:2000,
    //         title: 'Form would be saved if it were not a static example',
    //         body: '',                
    //         showCloseButton: true
    //   }); 
    return true;
  };





  ////////////////////////////////////////////////////////////
  //            step control (Step indicator)
  ////////////////////////////////////////////////////////////
  $scope.resetStepCounter = function(){
  	$scope.configuration.configStepCounter = 0;
  };

  $scope.nextConfigStep = function(){
    var configStepCounterMAX = $scope.configuration.listConfigStep.length -1;

    if ($scope.debug.showDebug) {
    	console.log('configStepCounterMAX : ' + configStepCounterMAX);
		  console.log('$scope.configuration.configStepCounter' + $scope.configuration.configStepCounter);
    }

    if ($scope.configuration.configStepCounter !== configStepCounterMAX) {
      	$scope.configuration.configStepCounter ++;
      	//debug
	    if ($scope.debug.showDebug) {
	    	console.log('not at configStepCounterMAX / increment configStepCounter to  : ' + $scope.configuration.configStepCounter);

	    }

    }    
    setTrueThisStepIndicator($scope.configuration.configStepCounter);
  };


  $scope.previousConfigStep = function(){
    var configStepCounterMIN = 0;

    if ($scope.configuration.configStepCounter !== 0) {
      $scope.configuration.configStepCounter --;
    }
    setTrueThisStepIndicator($scope.configuration.configStepCounter);
  };



  $scope.stepReachable = function(indexStep){
    if (indexStep < $scope.configuration.configStepCounter) {
      return 'disabled';
    }else{
      return 'enabled';
    }
  };

 
  function resetAllIndicators(){
    for (var i = $scope.configuration.stepIndicators.length - 1; i >= 0; i--) {
      $scope.configuration.stepIndicators[i] = false;
    }
  }
  
  function setTrueThisStepIndicator(indexIndicator){
      resetAllIndicators();
      $scope.configuration.stepIndicators[indexIndicator] = true;    
  }






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
                                      controller: 'ngwfWfEditMODALController',
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




  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };                            



  //////////////////////////////////////////////////////////////////////////
  //  Specific website  —  modal : save result to HTML (copy to clipboard)
  //////////////////////////////////////////////////////////////////////////

  $scope.resultToSave = {
    fieldsModel : [],
    dataModel : {},
    submitBtnText : 'Submit',
    cancelBtnText : 'Cancel'

  };
  


  function showModalSaveToHtml(size, indexLine, numcolumn) {

    var modalInstance = $modal.open({
                                      animation: $scope.animationsEnabled,
                                      templateUrl: 'modalSaveResult2Html.html', 
                                      controller: 'modalSaveResult2Html',
                                      size: 'lg',
                                      resolve: {
                                        resultToSave: function () {
                                          bindObjectToHtml();
                                          return $scope.resultToSave;
                                        }
                                      }
    });


    modalInstance.result.then(function () {
        
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  }

  function bindObjectToHtml(){
    $scope.resultToSave.fieldsModel = angular.copy($scope.vm.wfFormFieldsOnlyNeededProperties); 
    $scope.resultToSave.dataModel = angular.copy($scope.vm.model); 
    $scope.resultToSave.submitBtnText = $scope.configuration.submitButtonText;
    $scope.resultToSave.cancelBtnText = $scope.configuration.cancelButtonText;
  }


}]);
