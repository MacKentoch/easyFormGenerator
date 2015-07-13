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
                                                          'easyFormGenVersion',
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
                                                                      easyFormGenVersion,
                                                                      $filter,
                                                                      $anchorScroll,
                                  																		toaster,
                                  																		$timeout, 
                                                                      $modal,
                                                                      $log, 
                                                                      formFieldManage, 
                                                                      wfFormsByIdServices, 
                                                                      controllerModalProxy) {
  //verbose
  //console.log('--> INIT : Hello controller  \'\'ngwfWfEditController\'\' ');


  $scope.easyFormGeneratorVERSION = easyFormGenVersion;
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
  $scope.vm = this;
  //model filled by form :
  $scope.vm.model = {};
  //form schema : (filled from $scope.configuration in each step)
  $scope.vm.wfFormFields = [];

  $scope.vm.wfFormFieldsOnlyNeededProperties = [];  

  $scope.ihm = {
                  preview : {
                                formlyModelViewExpanded : true,
                                formlyFieldsViewExpanded : true,
                                customizeFormButtonsExpanded : true,
                                saveThisFormExpanded : true  
                            }

  };

  ////////////////////////////
  //drag and drop models
  ////////////////////////////



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
    //console.dir($scope.vm.model);
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


  ////////////////////////////////////////////////////////////
  //   drag and drop : may move from this controller
  ////////////////////////////////////////////////////////////
 


        $scope.dragoverCallback = function(event, index, external, type) {
            $scope.logListEvent('dragged over', event, index, external, type);
            return (index >= 0);
        };


        //specific Container dragoverCallback event
        $scope.dragoverCallbackContainer = function(parentparentIndex, parentIndex, index){
            //prevent container in layout column to be drag to control select contianer 
            if (index === 0) {
                return false;
            }
            return true;
        };


      
      $scope.dndItemMoved = function(parentParentIndex, parentIndex, itemIndex){
        //prevent item from first container to disapear when dropped on other container
        if (parentParentIndex > 0) {
            $scope.model[parentParentIndex][parentIndex].splice(itemIndex, 1);
        }
        
      };


      $scope.dragoverCallbackItems = function(ParentParentIndex, parentIndex, index, external){

            //prevent items in layout column to be drag to control select  
            if (parentIndex === 0) {
                return false;
            }
            
            return true;
        };


        $scope.dropCallback = function(event, index, item, external, type, allowedType) {
            $scope.logListEvent('dropped at', event, index, external, type);
            
            if (external) {
                if (allowedType === 'itemType' && !item.label) return false;
                if (allowedType === 'containerType' && !angular.isArray(item)) return false; 
            }

            return item;
        };


        $scope.logEvent = function(message, event) {
            // console.log(message, '(triggered by the following', event.type, 'event)');
            // console.log(event);
        };

        $scope.logListEvent = function(action, event, index, external, type) {
            var message = external ? 'External ' : '';
            message += type + ' element is ' + action + ' position ' + index;
            $scope.logEvent(message, event);
        };


        $scope.model = [];

        $scope.containerProperties = {
                                        decoration :    [
                                                            {
                                                                WhenIndex: 0,
                                                                ApplycssClass: 'col-md-4' 
                                                            },
                                                            {
                                                                WhenIndex: 1,
                                                                ApplycssClass: 'col-md-8', 
                                                            }
                                                        ],
                                        container : [
                                                        {
                                                            WhenIndex : 0,
                                                            Role : 'control selection',
                                                            isDraggable : false
                                                        },
                                                        {
                                                            WhenIndex : 1,
                                                            Role : 'form layout',
                                                            isDraggable : true
                                                        }
                                                    ]                
        };

        //init  model
        $scope.model = [].concat([
                                  [
                                    [
                                      {
                                        'label': 'label1',
                                        'control': 'label'
                                      }
                                    ],
                                    [
                                      {
                                        'label': 'textinput 1',
                                        'control': 'textinput'
                                      }
                                    ]
                                  ],
                                  [
                                    [
                                      {
                                        'label': 'label 2',
                                        'control': 'label'
                                      },
                                      // {
                                      //   'label': 'label 3',
                                      //   'control': 'label'
                                      // },
                                      {
                                        'label': 'textbox 1',
                                        'control': 'textinput'
                                      }
                                    ],
                                    [
                                      // {
                                      //   'label': 'textinput2',
                                      //   'control': 'textbox'
                                      // },
                                      {
                                        'label': 'textbox 1',
                                        'control': 'textbox'
                                      }
                                    ]
                                  ]
                                ]
                                );



        $scope.$watch('model', function(model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);


 
}]);
