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
                                                          'dragDropItemDecorationService',
                                                          'dragDropConfig',
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
                                                                      controllerModalProxy,
                                                                      dragDropItemDecorationService,
                                                                      dragDropConfig) {
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
 
  //specific Container dragoverCallback event
  $scope.dragoverCallbackContainer = function(parentparentIndex, parentIndex, index){
      //prevent container in layout column to be drag to control select contianer 
      if (index === 0) {
          return false;
      }
      return true;
  };


      
  $scope.dndItemMoved = function(parentParentIndex, parentIndex, itemIndex){
       // console.info('dndItemMoved'); 
       // console.dir(
       //      {
       //          _I_am : 'dndItemMoved',
       //          _ParentParentIndex : parentParentIndex,
       //          _ParentIndex : parentIndex,
       //          _index: itemIndex
       //      });

    //prevent item from first container to disapear when dropped on other container
    if (parentParentIndex > 0) {
      
        console.info('dndItemMoved');
        $scope.model[parentParentIndex][parentIndex].splice(itemIndex, 1);

        //refresh all css items on column 1 (form)
        dragDropItemDecorationService.updateCssClassWholeColumn($scope.model, 1);
    }
    
  };

  $scope.dragoverCallbackItems = function(ParentParentIndex, parentIndex, index, external){
       // console.info('dragoverCallbackItems'); 
       // console.dir(
       //      {
       //          _I_am : 'dragoverCallbackItems',
       //          external : external,
       //          _ParentParentIndex : ParentParentIndex,
       //          _ParentIndex : parentIndex,
       //          _index: index
       //      });
       
       console.info('dragoverCallbackItems');
        //prevent items in layout column to be drag to control select  
        if (parentIndex === 0) {
            return false;
        }

        /**
         * apply css to all items on the row like if new item were already in (explains why "length + 1")
         */
        var numberOfItems = $scope.model[parentIndex][index].length + 1;
        dragDropItemDecorationService.applyCssClassWholeLine($scope.model, parentIndex, index, numberOfItems, 1);
        return true;

    };


  /**
   * disableItemDropIf prevent dropping on condition
   *
   * TODO : to replace in html : dnd-disable-if="items.length > 2"
   */
  $scope.disableItemDropIf = function(){

  };


  $scope.dropCallback = function(event, index, item, external, type, allowedType) {
      //$scope.logListEvent('dropped at', event, index, external, type);
     // console.info('dropCallback'); 
     // console.dir(
     //      {
     //          _I_am : 'dropCallback',
     //          event : event,
     //          index : index,
     //          item : item,
     //          external: external,
     //          type:type,
     //          allowedType:allowedType,
     //          model : $scope.model
     //      });            

      if (external) {
          if (allowedType === 'itemType' && !item.label) return false;
          if (allowedType === 'containerType' && !angular.isArray(item)) return false; 
      }

      return item;
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
  $scope.dropCallbackItems = function(event, index, realIndex,parentIndex, parentParentIndex, parentParentParentIndex, item, external, type, allowedType){
     
     console.info('dropCallbackItems');
     // console.info('dropCallbackItems'); 
     // console.dir(
     //      {
     //          _I_am : 'dropCallback',
     //          event : event,
     //          index : index,
     //          realIndex: realIndex,
     //          parentIndex: parentIndex,
     //          parentParentIndex: parentParentIndex,
     //          parentParentParentIndex: parentParentParentIndex,
     //          item : item,
     //          external: external,
     //          type:type,
     //          allowedType:allowedType,
     //          model : $scope.model,
     //          line: $scope.model[parentIndex][realIndex]
     //      });            

     /**
      * 
      * UPDATE CSS CLASS TO ALL ITEMS IN SAME ROW
      */          
     //NOTE : length + 1 since current intem is not in the model right now :
     var numberOfItems = $scope.model[parentIndex][realIndex].length + 1;
      dragDropItemDecorationService.applyCssClassWholeLine($scope.model, parentIndex, realIndex, numberOfItems, 1);
     /**
      * 
      * UPDATE CSS CLASS ITEM BEFORE RETURNING IT
      * 
      */           
      item.cssClass = dragDropItemDecorationService.getCssClassWhenNumberItemsInRowIs(numberOfItems);
    
      if (external) {
          if (allowedType === 'itemType' && !item.label) return false;
          if (allowedType === 'containerType' && !angular.isArray(item)) return false; 
      }

      return item;
  };


  /**
   * logEvent (was used in pair with logListEvent) - no more used
   */
  $scope.logEvent = function(message, event) {
      // console.log(message, '(triggered by the following', event.type, 'event)');
      // console.log(event);
  };
  /**
   * logListEvent - no more used
   */
  $scope.logListEvent = function(action, event, index, external, type) {
      var message = external ? 'External ' : '';
      message += type + ' element is ' + action + ' position ' + index;
      $scope.logEvent(message, event);
  };

  /**
   * removeThisLine event line deleted
   */
  $scope.removeThisLine = function(lineIndex){
    $scope.model[1].splice(lineIndex,1);
  };


  var test = dragDropConfig.getListControls();
  console.info('test dragDropConfig.getListControls();');
  console.dir(test);

  $scope.model = [];


  /**
   * easyFormDragDropProperties 
   *
   * configuration properties
   *
   * May move into a provider next
   */
  $scope.easyFormDragDropProperties = {
            dropZoneConfig : {
                                  decoration :    [
                                                      {
                                                          WhenIndex: 0,
                                                          ApplycssClass: 'col-md-4', 
                                                          fontAwesomeIcon: 'fa fa-level-up',
                                                          title: 'Drag control from here : '
                                                      },
                                                      {
                                                          WhenIndex: 1,
                                                          ApplycssClass: 'col-md-8', 
                                                          fontAwesomeIcon: 'fa fa-level-down',
                                                          title: 'Drop control into here : '
                                                      }
                                                  ],
                                  verboseMode : false


            },

            dropZoneCommand : {
                                insertNewLine : function(){
                                          $scope.model[1].push([]);
                                }  
            },

            containerConfig : {
                                  decoration :    [
                                                      {
                                                          WhenIndex: 0,
                                                          ApplycssClass: 'col-md-12', 
                                                          title: 'Headers : '
                                                      },
                                                      {
                                                          WhenIndex: 1,
                                                          ApplycssClass: 'col-md-12', 
                                                          title: 'Text inputs : '
                                                      }
                                                  ],
                                  verboseMode : false, 
                                  collapseEnabled : true,
                                  collapseCtrl: [
                                                    {
                                                        atIndex : 0,
                                                        collapse : true
                                                    },
                                                    {
                                                        atIndex : 1,
                                                        collapse : true
                                                    }
                                                ]                                                                  
            },
            itemConfig : {
                                  verboseMode : false, 
                              }                  
  };

  /**
   * Model just for dev
   *
   * next may move in a provider
   */
  //init  model
  $scope.model = [].concat([
                            [
                              [
                                {
                                  'label': [  
                                          '<div class="col-md-12">',
                                          '    <div class="form-group">',                                          
                                          '      <div class="">',
                                          '        <h2 class="text-center">Header</h2>',
                                          '        <hr/>',
                                          '      </div>',
                                          '    </div>',
                                          '</div>'
                                            ].join(''),
                                  //'label': '<p>label 3</p>',           
                                  'control': 'label',
                                  'cssClass': 'col-md-12'
                                },
                                {
                                    'label': [  
                                            '<div class="col-md-12">',
                                            '    <div class="form-group">',                                          
                                            '      <div class="">',
                                            '        <h4 class="text-center">SubTitle</h4>',
                                            '        <hr/>',
                                            '      </div>',
                                            '    </div>',
                                            '</div>'
                                              ].join(''),
                                    //'label': '<p>label 3</p>',           
                                    'control': 'label',
                                    'cssClass': 'col-md-12'
                                  }
                              ],
                              [

                                {
                                  'label': [  
                                            '<div class="col-md-12">',
                                            '<div class="form-group">',
                                            '  <label for="inputText" class="control-label textControlLabel pull-left">',
                                            '   title <span class="textControlLabel ng-scope">*</span>',
                                            '  </label>',
                                            '  <div class="">',
                                            '    <input type="text" class="form-control" id="inputText" placeholder="basic input">',
                                            '    <p class="help-block pull-left">Description</p>',
                                            '  </div>',
                                            '</div>',
                                            '</div>'
                                            ].join(''),
                                  //'label': '<p>label 3</p>',           
                                  'control': 'label',
                                  'cssClass': 'col-md-12'
                                },                              
                                {
        
                                  'label': [
                                            '<div class="col-md-12">',
                                            '<div class="form-group">',
                                            '  <label for="inputText" class="control-label textControlLabel ng-binding pull-left">',
                                            '   title <span class="textControlLabel ng-scope">*</span>',
                                            '  </label>',
                                            '  <div class="">',
                                            '    <input type="password" class="form-control" id="inputText" placeholder="password input">',
                                            '    <p class="help-block ng-binding pull-left">Description</p>',
                                            '  </div>',
                                            '</div>',
                                            '</div>'

                                            ].join(''),

                                  'control': 'textinput',
                                  'cssClass': 'col-md-12'
                                }
                              ]
                            ],
                            //column template :
                            [
                              //1st line
                              [
                                {
                                  'label': [  
                                          '<div class="col-md-12">',
                                          '    <div class="form-group">',                                          
                                          '      <div class="">',
                                          '        <h2 class="text-center">Header</h2>',
                                          '        <hr/>',
                                          '      </div>',
                                          '    </div>',
                                          '</div>'
                                            ].join(''),
                                  //'label': '<p>label 3</p>',           
                                  'control': 'label',
                                  'cssClass': 'col-md-12'
                                }
                              ], 
                              //second line                             
                              [
                                {
                                  'label': [  
                                            '<div class="col-md-12">',
                                            '<div class="form-group">',
                                            '  <label for="inputText" class="control-label textControlLabel pull-left">',
                                            '   title <span class="textControlLabel ng-scope">*</span>',
                                            '  </label>',
                                            '  <div class="">',
                                            '    <input type="text" class="form-control" id="inputText" placeholder="basic input">',
                                            '    <p class="help-block pull-left">Description</p>',
                                            '  </div>',
                                            '</div>',
                                            '</div>'
                                            ].join(''),
                                  //'label': '<p>label 3</p>',           
                                  'control': 'label',
                                  'cssClass': 'col-md-6'
                                },
                                // {
                                //   'label': 'label 3',
                                //   'control': 'label'
                                // },
                                {
                                  'label': [  
                                            '<div class="col-md-12">',
                                            '<div class="form-group">',
                                            '  <label for="inputText" class="control-label textControlLabel pull-left">',
                                            '   title <span class="textControlLabel ng-scope">*</span>',
                                            '  </label>',
                                            '  <div class="">',
                                            '    <input type="text" class="form-control" id="inputText" placeholder="basic input">',
                                            '    <p class="help-block pull-left">Description</p>',
                                            '  </div>',
                                            '</div>',
                                            '</div>'
                                            ].join(''),
                                  //'label': '<p>label 3</p>',           
                                  'control': 'label',
                                  'cssClass': 'col-md-6'
                                }
                              ]
                              

                            ]
                          ]
                          );


}]);
