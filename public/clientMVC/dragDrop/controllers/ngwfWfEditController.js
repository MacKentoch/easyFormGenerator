///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  module = "controllers"  for view "edit/manage forms"
//  ------------------------------------------------------
//      Syntax (convention) :
//          "ngwfApp" = application
//          "ngwfApp.controllers.viewNameController" = controller module
//
//  This module is a view controller -> it must be injected in controller container
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
angular
  .module('ngwfApp.controllers.ngwfWfEditController', [])
  .controller('ngwfWfEditController', [	'$scope', 
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
  }


  
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
   *
   * TODO : as it is drag and drop way : fix so that _BOOL ADD STEP WAY PROPERTIES_ = false works
   */
  formFieldManage.initConfigurationEditFromScratch($scope.configuration , true);
  //will leave when this controller is re-written for drag and drop
  console.info( [
                  'debug formFieldManage.initConfigurationEditFromScratch'
                ].join(' '));
  console.dir($scope.configuration);

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


  $scope.dropCallback = function(event, index, item, external, type, allowedType) {
          
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
    
      if (external) {
          if (allowedType === 'itemType' && !item.label) return false;
          if (allowedType === 'containerType' && !angular.isArray(item)) return false; 
      }
    
      return item;
  };



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
    //formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);
    //$scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields); 
  }


  $scope.insertNewLine = function(){
                          addNewline();
                          $scope.dragDropModel[1].push([]);
                          };


  /**
   * easyFormDragDropProperties : configure drag and drop apearance
   *
   * — see dragDropConfig provider —
   */
  $scope.easyFormDragDropProperties = dragDropConfig.getDragDropConfigModel();

  /**
   * Model just for dev
   *
   * next may move in a provider
   */
  //init  model
  //
  $scope.dragDropModel = [].concat(dragDropConfig.getDragDropPresentationModel());


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
                                  'control': 'header',
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
                                               
                                    'control': 'subtitle',
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
                                            '    <input type="text"  class="form-control" id="inputText" placeholder="basic input">',
                                            '    <p class="help-block pull-left">Description</p>',
                                            '  </div>',
                                            '</div>',
                                            '</div>'
                                            ].join(''),
                                  //'label': '<p>label 3</p>',           
                                  'control': 'basicinput',
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

                                  'control': 'password',
                                  'cssClass': 'col-md-12'
                                }
                              ],
                              //texareas
                              [

                                {
                                  'label': [
                                              '<div class="col-md-12">',
                                              '    <div class="form-group">', 
                                              '      <label for="textArea" class="control-label textControlLabel pull-left">title<span class="textControlLabel">*</span></label>', 
                                              '      <div class="">',
                                              '        <textarea class="form-control dragItemtextarea" ng-model="model[options.key]" rows="1" id="textArea"></textarea>',
                                              '        <p class="help-block pull-left">description</p>',          
                                              '      </div>',
                                              '    </div>',                    
                                              '</div>'                                  
                                            ].join(''),
                                  'control': 'textarea',
                                  'cssClass': 'col-md-12'          
                                }

                              ],
                              //radios
                              [
                                {
                                  'label' : [
                                              '<div class="col-md-12">',        
                                              '  <div class="form-group">',
                                              '    <label for="vertRadio" class="control-label textControlLabel pull-left">title<span class="textControlLabel">*</span></label>',
                                              '    <div class="interligne"></div>',
                                              '    <div class="pull-left">',

                                              '      <div class="radio">',
                                              '        <label class="">',
                                              '          <input type="radio" name="optionsRadios" id="optionsRadio-0" value="verticalRadio0" checked="">',
                                              '          option1',
                                              '        </label>',
                                              '      </div><div class="radio">',
                                              '        <label class="">',
                                              '          <input type="radio" name="optionsRadios"  id="optionsRadio-1" value="verticalRadio1" checked="">',
                                              '          option2',
                                              '        </label>',
                                              '      </div>',
                                              '      <p class="help-block pull-left">description</p>',

                                              '    </div>',


                                              '  </div>',                            
                                              '</div>'
                                            ].join(''),
                                  'control': 'verticalradio',
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
