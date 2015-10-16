/**
 *  ------------------------------------------------------
 *  module = "controller" edit controller
 *  ------------------------------------------------------
 *
 * Main controller :
 * 
 *  - configuration model : fields model database friendly
 *  - formlymodel : fields model bound to formly directive (not database freindly)
 *  - vm.model : data model (database friendly)
 *
 * if you want more details on how to save to data base :
 *
 * http://www.erwan-datin.com/tips/how-do-I-store-angular-formly-fields-model-into-database
 *
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

(function () {

  'use strict';

  angular
    .module('ngwfApp.controllers.ngwfWfEditController', [])
    .controller('ngwfWfEditController', ngwfWfEditController);


    ngwfWfEditController.$inject = [
      '$scope', 
      '$templateCache',
      'easyFormGenVersion',
      '$filter',
      '$anchorScroll',
      'toaster', 
      '$timeout',
      '$modal',
      '$log', 
      'formFieldManage',
      'controllerModalProxy',
      'easyFormSteWayConfig'
    ];

    
    function ngwfWfEditController(
                                    $scope, 
                                    $templateCache,
                                    easyFormGenVersion,
                                    $filter,
                                    $anchorScroll,
                                    toaster,
                                    $timeout, 
                                    $modal,
                                    $log, 
                                    formFieldManage, 
                                    controllerModalProxy,
                                    easyFormSteWayConfig
                                    ){
      /*jshint validthis: true */
      $scope.vm                       = this;
      $scope.vm.model                 = {};
      $scope.vm.wfFormFields          = [];
      $scope.vm.wfFormFieldsOnlyNeededProperties = []; 
      $scope.vm.onSubmit              = onSubmit;

      $scope.easyFormGeneratorVERSION = easyFormGenVersion;
      $scope.debug                    = initDebugModel();
      $scope.tab                      = initTabModel();

      //configuration model (contains array of lines which contains array of columns)
      $scope.configuration            = {};    
                               
      $scope.numberOfColumns          = 1;
      $scope.MaxNumberOfColumns       = 3;
      $scope.MinNumberOfColumns       = 1;
      $scope.columnTemplate           = initColumnTemplate();

      $scope.lineTemplate             = initLineTemplate();
      $scope.resetToZeroModel         = resetToZeroModel;
      $scope.countConfigurationModelLines = countConfigurationModelLines;
      $scope.setActiveLineNumber      = setActiveLineNumber;
      $scope.upThisLine               = upThisLine;
      $scope.downThisLine             = downThisLine;
      $scope.addNewline               = addNewline;
      $scope.removeThisLine           = removeThisLine;

      $scope.increaseNumberOfColumns  = increaseNumberOfColumns;
      $scope.decreaseNumberOfColumns  = decreaseNumberOfColumns;

      $scope.resetStepCounter         = resetStepCounter;
      $scope.nextConfigStep           = nextConfigStep;

      $scope.previousConfigStep       = previousConfigStep;
      $scope.stepReachable            = stepReachable;

      $scope.nyaSelect                = {};
      //angular bootstrap modal + angular 1.4 issue (backdrop won't disapear on close modal)
      //github issues here : https://github.com/angular-ui/bootstrap/issues/3633
      //-> disabling animation untill correction in angular bootstrap 
      //uses easyFormSteWayConfig provider to easily update setting : 
      $scope.animationsEnabled        = easyFormSteWayConfig.getModalAnimationValue();
      //call modal to edit selected control
      $scope.showModalAddCtrlToColumn = showModalAddCtrlToColumn;

      
      //disabled here : to load list of saved formly fields from database
      $scope.loadExistingFormsList    = loadExistingFormsAsList();
      $scope.formlyList               = {};
      $scope.previewLoadedForm        = { fieldsModel:[] };
      $scope.configurationLoaded      = {};   
      $scope.previewExistingform      = previewExistingform;
      $scope.saveThisForm             = saveThisForm; //should save to database (commented here)


   


      



      //load formlyList on init
      loadExistingFormsAsList();

      formFieldManage.initConfigurationEditFromScratch($scope.configuration);

      controllerModalProxy.initNyaSelect($scope.nyaSelect);



      function initDebugModel(){
        return {
         showDebug : false,
         configurationModelNumberofLines : 1        
        };
      }

      function initTabModel(){
        return {
          editTab : {active : true},
          previewTab : {active : false}
        };
      }

      function previewExistingform(formlyform){
       var configlines = JSON.parse(formlyform.formlyField);
       //here to replace with $scope.configuration : initialise configuration with lines 
       $scope.configurationLoaded = {};
       formFieldManage.bindConfigurationLines($scope.configurationLoaded,configlines);
       formFieldManage.applyConfigurationToformlyModel($scope.configurationLoaded, $scope.previewLoadedForm.fieldsModel, $scope.vm.model);
       $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);
       $scope.previewLoadedForm.cancelButtonText = formlyform.cancelButtonText;
       $scope.previewLoadedForm.submitButtonText = formlyform.submitButtonText;
      }    

      function onSubmit() {
        toaster.pop({
            type: 'info',
            timeout:2000,
            title: 'should save data model if it were not a static example',
            body: 'data :' + $filter('json')($scope.vm.model, 4),                
            showCloseButton: true
        }); 
      }
      
      function initColumnTemplate(){
        return  {
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
      }

      function initLineTemplate(){
        return {
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
      }

      function resetToZeroModel(){
        $scope.configuration.activeLine = 1;
        if ($scope.configuration.lines.length > 1) {
          $scope.configuration.lines.splice(1, $scope.configuration.lines.length - 2);
        }
        return $scope.countConfigurationModelLines();
      }

      function countConfigurationModelLines(){
        //information in debug model
        $scope.debug.configurationModelNumberofLines = $scope.configuration.lines.length;
        return $scope.configuration.lines.length;
      }      

      function setActiveLineNumber(lineNumber){
        if (lineNumber <= $scope.countConfigurationModelLines()) {
          $scope.configuration.activeLine = lineNumber;
        }
      } 

      function upThisLine(indexLine){    
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
      }  

      function downThisLine(indexLine){
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
      } 

      function addNewline(){
        $scope.configuration.lines.push(
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
      }

      function removeThisLine(index){
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
      }

      function increaseNumberOfColumns(){
        if ($scope
              .configuration
              .lines[$scope.configuration.activeLine -1]
              .columns.length < $scope.MaxNumberOfColumns) {

          var newNumberOfColumns = $scope
                                      .configuration
                                      .lines[$scope.configuration.activeLine -1]
                                      .columns
                                      .push(
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
          $scope
              .configuration
              .lines[$scope.configuration.activeLine -1]
              .columns[newNumberOfColumns - 1]
              .numColumn = newNumberOfColumns; 
          }
           //re-render formfield 
          formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model); 
          $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);
      }  

      function decreaseNumberOfColumns(){
        if ($scope
              .configuration
              .lines[$scope.configuration.activeLine -1]
              .columns.length > 1) {
          $scope.configuration
            .lines[$scope.configuration.activeLine -1]
            .columns
            .splice($scope.configuration.lines[$scope.configuration.activeLine -1].columns.length -1, 1);
        }
        //re-render formfield 
        formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);  

        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);  
      }  

      function resetStepCounter(){
        $scope.configuration.configStepCounter = 0;
      } 

      function nextConfigStep(){
        var configStepCounterMAX = $scope.configuration.listConfigStep.length -1;
        if ($scope.configuration.configStepCounter !== configStepCounterMAX) {
            $scope.configuration.configStepCounter ++;
        }    
        setTrueThisStepIndicator($scope.configuration.configStepCounter);
      }   

      function previousConfigStep(){
        if ($scope.configuration.configStepCounter !== 0) {
          $scope.configuration.configStepCounter --;
        }
        setTrueThisStepIndicator($scope.configuration.configStepCounter);
      }

      function stepReachable(indexStep){
        if (indexStep < $scope.configuration.configStepCounter) {
          return 'disabled';
        }else{
          return 'enabled';
        }
      } 

      function showModalAddCtrlToColumn(size, indexLine, numcolumn) {

        var modalInstance = $modal.open({
                                          animation: $scope.animationsEnabled,
                                          templateUrl: 'editModalTemplate.html',  
                                          controller: 'ngwfWfEditMODALController',
                                          size: 'lg',
                                          resolve: {
                                            nyaSelect: function () {                                              
                                              return controllerModalProxy
                                                        .getNyASelectFromSelectedLineColumn($scope.nyaSelect, $scope.configuration,indexLine, numcolumn);
                                            }
                                          }
        });

        modalInstance.result.then(function (modalAddCtrlModel) {
            controllerModalProxy.bindConfigurationModelFromModalReturn(indexLine, numcolumn, modalAddCtrlModel, $scope.configuration);
            formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);
            
            $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);

        }, function () {
          //$log.info('Modal dismissed at: ' + new Date());
        });
      } 

      /**
       * loadExistingFormsAsList :
       *  - LOAD from database (list of forms)
       */
      function loadExistingFormsAsList(){
        
      }
      /**
       * saveThisForm 
       * - SAVE to database (current stringified configuration model === current form)
       */
      function saveThisForm(){
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

       
        toaster.clear();  
        toaster.pop({
                type: 'info',
                timeout:2000,
                title: 'Form would be saved if it were not a static example',
                body: '',                
                showCloseButton: true
          }); 
        return true;
      } 




      function resetAllIndicators(){
        for (var i = $scope.configuration.stepIndicators.length - 1; i >= 0; i--) {
          $scope.configuration.stepIndicators[i] = false;
        }
      }
      
      function setTrueThisStepIndicator(indexIndicator){
          resetAllIndicators();
          $scope.configuration.stepIndicators[indexIndicator] = true;    
      }





    }


})(); 