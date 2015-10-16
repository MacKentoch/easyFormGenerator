/**
 *  ------------------------------------------------------
 *  module = "controller" modal controller
 *  ------------------------------------------------------
 *
 * edit control modal controller
 *
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

(function () {
  'use strict';


  angular
    .module('ngwfApp.controllers.ngwfWfEditMODALController', [])
    .controller('ngwfWfEditMODALController', ngwfWfEditMODALController);

    ngwfWfEditMODALController.$inject = [
      '$scope', 
      '$modalInstance',
      'nyaSelect',
      'toaster' ,
      '$timeout',
      'selectOptionManage',
      'controllerModalProxy',
    ];

    function ngwfWfEditMODALController( $scope, 
                                        $modalInstance, 
                                        nyaSelect, 
                                        toaster,
                                        $timeout,
                                        selectOptionManage,
                                        controllerModalProxy
                                      ){
      
      var initOptionModel = { rows:[] };

      $scope.radioRowCollection = initOptionModel;
      $scope.newOptionRadio     = {saisie: ''};

      $scope.addNewOptionRadio  = addNewOptionRadio;
      $scope.removeRadioRow     = removeRadioRow;
      $scope.upThisRadioRow     = upThisRadioRow;
      $scope.downThisRadioRow   = downThisRadioRow;

      $scope.basicSelectRowCollection = initOptionModel;
      $scope.newOptionBasicSelect     = {saisie: ''}; 
      $scope.addNewOptionBasicSelect  = addNewOptionBasicSelect;
      $scope.removeRow                = removeRow;
      $scope.upThisRow                = upThisRow;
      $scope.downThisRow              = downThisRow;

      $scope.groupedSelectRowCollection = initOptionModel;
      $scope.newOptionGroupedSelect     = {saisie: ''};
      $scope.GroupedSelectGroups        = { list:[] };
      $scope.newGroupGroupedSelect      = {saisie: ''};  
      $scope.groupSelectGroupClick      = {showList : false};
      $scope.showGroupListToChoose      = showGroupListToChoose;
      $scope.addNewGroupToGroupedSelect = addNewGroupToGroupedSelect;
      $scope.addNewOptionGroupedSelect  = addNewOptionGroupedSelect;
      $scope.removeGroupedSelectRow     = removeGroupedSelectRow;
      $scope.upThisGroupedSelectRow     = upThisGroupedSelectRow;
      $scope.downThisGroupedSelectRow   = downThisGroupedSelectRow;

      $scope.demodt         = {}; 
      $scope.today          = today;
      $scope.clear          = clear;
      $scope.open           = openfct;
      $scope.dateOptions    = dateOptionsInit(); 
      $scope.demodt.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];

      $scope.nyaSelect                  = nyaSelect ;
      $scope.nyaSelect.selectedControl  = $scope.nyaSelect.temporyConfig.selectedControl;
      $scope.selectThisControl          = selectThisControl;
      $scope.ok                         = okfct;
      $scope.cancel                     = cancelfct;
      $scope.nyaSelectFiltered          = {};



      //init today date
      today();
      //init nyaSelect model depending selected control
      initNyaSelectConformingSelectedControl();
    
      function initNyaSelectFiltered(){
        $scope.nyaSelectFiltered = {};
        var listCtrl = [].concat(controllerModalProxy.getFilteredNyaSelectObject());
        angular.extend($scope.nyaSelectFiltered,{
          'controls'        : listCtrl,
          'selectedControl' : $scope.nyaSelect.selectedControl,
          'temporyConfig'   : $scope.nyaSelect.temporyConfig 
        }); 
      }
    
    
    
      function addNewOptionRadio(){
        var result = selectOptionManage.addNewOptionRadio($scope.radioRowCollection, $scope.newOptionRadio.saisie);
        if (result.resultFlag === false) {
              toaster.pop({
                type: 'warning',
                timeout:2000,
                title: result.details,
                body: '\''+ $scope.newOptionRadio.saisie + '\'' + ' cannot be added.',                
                showCloseButton: true
          });
        }
        //reset input
        $scope.newOptionRadio = {saisie: ''};
      }

      function removeRadioRow(index) {
        var result = selectOptionManage.removeOption($scope.radioRowCollection, index);
        if (result.resultFlag === false) {
            toaster.pop({
              type: 'warning',
              timeout:2000,
              title: result.details,
              body: 'Delete was cancelled.',                
              showCloseButton: true
          });
        }      
      } 

      function upThisRadioRow(index){
        var result = selectOptionManage.upthisOption($scope.radioRowCollection, index);
        if (result.resultFlag === false) {
          toaster.pop({
            type: 'warning',
            timeout:2000,
            title: result.details,
            body: 'Operation cancelled.',                
            showCloseButton: true
          });
        }       
      }

      function downThisRadioRow(index){
        var result = selectOptionManage.downthisOption($scope.radioRowCollection, index);
        if (result.resultFlag === false) {
          toaster.pop({
            type: 'warning',
            timeout:2000,
            title: result.details,
            body: 'Operation cancelled.',                
            showCloseButton: true
          });
        }
      }

      function addNewOptionBasicSelect(){
        var result = selectOptionManage.addNewOptionBasicSelect($scope.basicSelectRowCollection, $scope.newOptionBasicSelect.saisie);
        if (result.resultFlag === false) {
          toaster.pop({
            type: 'warning',
            timeout:2000,
            title: result.details,
            body: '\''+ $scope.newOptionBasicSelect.saisie + '\'' + ' cannot be added.',                
            showCloseButton: true
          });
        }
        //reset input
        $scope.newOptionBasicSelect = {saisie: ''};
      }  

      function removeRow(index) {
        var result = selectOptionManage.removeOption($scope.basicSelectRowCollection, index);
        if (result.resultFlag === false) {
          toaster.pop({
            type: 'warning',
            timeout:2000,
            title: result.details,
            body: 'Delete was cancelled.',                
            showCloseButton: true
          });
        }      
      }   

      function upThisRow(index){
        var result = selectOptionManage.upthisOption($scope.basicSelectRowCollection, index);
        if (result.resultFlag === false) {
          toaster.pop({
            type: 'warning',
            timeout:2000,
            title: result.details,
            body: 'Operation cancelled.',                
            showCloseButton: true
          });
        }       
      }

      function downThisRow(index){
        var result = selectOptionManage.downthisOption($scope.basicSelectRowCollection, index);
        if (result.resultFlag === false) {
          toaster.pop({
            type: 'warning',
            timeout:2000,
            title: result.details,
            body: 'Operation cancelled.',                
            showCloseButton: true
          });
        }
      }

      function showGroupListToChoose(){
        $scope.groupSelectGroupClick.showList = !$scope.groupSelectGroupClick.showList;
      }

      function addNewGroupToGroupedSelect(){
        if ($scope.newGroupGroupedSelect.saisie !== '') {
          for (var i = $scope.GroupedSelectGroups.list.length - 1; i >= 0; i--) {
            if ($scope.GroupedSelectGroups.list[i] === $scope.newGroupGroupedSelect.saisie) {
              toaster.pop({
                type: 'warning',
                timeout:2000,
                title: 'Group already exists',
                body: 'No group added.',                
                showCloseButton: true
              });          
            }
          }
          $scope.GroupedSelectGroups.list.push($scope.newGroupGroupedSelect.saisie);
        }else{
          toaster.pop({
            type: 'warning',
            timeout:2000,
            title: 'Not a valid group to add',
            body: 'No group added.',                
            showCloseButton: true
          });
        }
        $scope.newGroupGroupedSelect.saisie = '';
      } 

      function addNewOptionGroupedSelect(){
        var result = selectOptionManage.addNewOptionGroupedSelect($scope.groupedSelectRowCollection, $scope.newOptionGroupedSelect.saisie, '');
        if (result.resultFlag === false) {
          toaster.pop({
            type: 'warning',
            timeout:2000,
            title: result.details,
            body: '\''+ $scope.newOptionGroupedSelect.saisie + '\'' + ' cannot be added.',                
            showCloseButton: true
          });
        }
        //bind nya : dont bind here $apply is not done fast enough
        //bindGroupedSelectToNya();
        //reset input
        $scope.newOptionGroupedSelect = {saisie: ''};
      }

      function removeGroupedSelectRow(index) {
        var result = selectOptionManage.removeOption($scope.groupedSelectRowCollection, index);
        if (result.resultFlag === false) {
          toaster.pop({
            type: 'warning',
            timeout:2000,
            title: result.details,
            body: 'Delete was cancelled.',                
            showCloseButton: true
          });
        }   
      }        

      function upThisGroupedSelectRow(index){
        var result = selectOptionManage.upthisOption($scope.groupedSelectRowCollection, index);
        if (result.resultFlag === false) {
          toaster.pop({
            type: 'warning',
            timeout:2000,
            title: result.details,
            body: 'Operation cancelled.',                
            showCloseButton: true
          });
        } 
      }

      function downThisGroupedSelectRow(index){
        var result = selectOptionManage.downthisOption($scope.groupedSelectRowCollection, index);
        if (result.resultFlag === false) {
          toaster.pop({
            type: 'warning',
            timeout:2000,
            title: result.details,
            body: 'Operation cancelled.',                
            showCloseButton: true
          });
        } 
      }

      function today() {
        $scope.demodt.dt = new Date();
      } 

      function clear() {
        $scope.demodt.dt = null;
      } 

      function openfct($event){
        $event.preventDefault();
        $event.stopPropagation();
        $scope.demodt.opened = true;
      }

      function dateOptionsInit(){
        return  {
          formatYear: 'yy',
          startingDay: 1,
          showWeeks: true,
          initDate: null
        };
      }


      function selectThisControl(controlName){
        $scope.nyaSelect.selectedControl = 'none';
        resetTemporyConfig();

        for (var i = $scope.nyaSelect.controls.length - 1; i >= 0; i--) {
          if ($scope.nyaSelect.controls[i].id === controlName) {
            $scope.nyaSelect.selectedControl = $scope.nyaSelect.controls[i].id;         
          }
        }

        if ($scope.nyaSelect.selectedControl === 'Date') {
          initDatePicker();
        }
      }  



      function okfct() {
        if ($scope.nyaSelect.selectedControl === 'BasicSelect') {
          bindBasicSelectToNya();
        }
        if ($scope.nyaSelect.selectedControl === 'GroupedSelect') {
          bindGroupedSelectToNya();
        }  
        if ($scope.nyaSelect.selectedControl === 'Radio') {
          bindRadioToNya();
        }  
        //save config to control
        controllerModalProxy.applyConfigToSelectedControl($scope.nyaSelect);
        //return current model to parent controller :
        $modalInstance.close($scope.nyaSelect);
      }

      function cancelfct() {
        $modalInstance.dismiss('cancel');
      }    







      function bindRadioFromNYA(){
        if ($scope.nyaSelect.temporyConfig.formlyOptions.length > 0) {
          for (var i = 0; i <= $scope.nyaSelect.temporyConfig.formlyOptions.length-1; i++){
            var newOption = {
                'option': $scope.nyaSelect.temporyConfig.formlyOptions[i].name,
                'order': i,
                'group': ''
            };
            $scope.radioRowCollection.rows.push(newOption);
          }    
        }
      }

      function bindRadioToNya(){
        var resetNyASelectOptions = [];
        $scope.nyaSelect.temporyConfig.formlyOptions = resetNyASelectOptions;
        if ($scope.radioRowCollection.rows.length > 0) {
          for (var i = 0; i <= $scope.radioRowCollection.rows.length - 1; i++){
                var newOption = {
                  'name': $scope.radioRowCollection.rows[i].option,
                  'value': i,
                  'group': ''
                };
                $scope.nyaSelect.temporyConfig.formlyOptions.push(newOption);   
            }       
       }
      }

      function bindBasicSelectFromNYA(){
        if ($scope.nyaSelect.temporyConfig.formlyOptions.length > 0) {
          for (var i = 0; i <= $scope.nyaSelect.temporyConfig.formlyOptions.length-1; i++){
            var newOption = {
              'option': $scope.nyaSelect.temporyConfig.formlyOptions[i].name,
              'order': i,
              'group': ''
            };
            $scope.basicSelectRowCollection.rows.push(newOption);
          }    
        }
      }

      function bindBasicSelectToNya(){
        var resetNyASelectOptions = [];
        $scope.nyaSelect.temporyConfig.formlyOptions = resetNyASelectOptions;
        if ($scope.basicSelectRowCollection.rows.length > 0) {
          for (var i = 0; i <= $scope.basicSelectRowCollection.rows.length - 1; i++){
            var newOption = {
              'name': $scope.basicSelectRowCollection.rows[i].option,
              'value': i,
              'group': ''
            };
            $scope.nyaSelect.temporyConfig.formlyOptions.push(newOption);
          }      
        }
      } 

      function bindGroupedSelectFromNYA(){
        if ($scope.nyaSelect.temporyConfig.formlyOptions.length > 0) {
          for (var i = 0; i <= $scope.nyaSelect.temporyConfig.formlyOptions.length-1; i++){
            var newOption = {
              'option': $scope.nyaSelect.temporyConfig.formlyOptions[i].name,
              'order': i,
              'group': $scope.nyaSelect.temporyConfig.formlyOptions[i].group
            };
            $scope.groupedSelectRowCollection.rows.push(newOption);            
          }
          //grouplist : thx to lodash it is easy
          var filteredgroup = _.uniq(_.pluck($scope.groupedSelectRowCollection.rows, 'group'));
          angular.copy(filteredgroup, $scope.GroupedSelectGroups.list); 
        }
      }

      function bindGroupedSelectToNya(){
        $scope.nyaSelect.temporyConfig.formlyOptions = [];
        for (var i = 0; i <= $scope.groupedSelectRowCollection.rows.length - 1; i++){
          var newOption = {
            'name': $scope.groupedSelectRowCollection.rows[i].option,
            'value': i,
            'group': $scope.groupedSelectRowCollection.rows[i].group
          };
          $scope.nyaSelect.temporyConfig.formlyOptions.push(newOption);  
        }
      } 

      function initDatePicker(){
        $scope.nyaSelect.temporyConfig.datepickerPopup = $scope.demodt.formats[0];  
      }    

      function initNyaSelectConformingSelectedControl(){
        //place nya-select to selection if not none :
        //$scope.modelNyaSelect = nyaSelect.controls[0];
        
        
        if (nyaSelect.selectedControl !== 'none') {
          for (var i = $scope.nyaSelect.controls.length - 1; i >= 0; i--) {
             if ($scope.nyaSelect.controls[i].id === nyaSelect.selectedControl) {
                $scope.modelNyaSelect = nyaSelect.controls[i];
             }
          }
          if ($scope.nyaSelect.selectedControl === 'BasicSelect') {
            bindBasicSelectFromNYA();
          }
          if ($scope.nyaSelect.selectedControl === 'GroupedSelect') {
            bindGroupedSelectFromNYA();
          } 
          if ($scope.nyaSelect.selectedControl === 'Radio') {
            bindRadioFromNYA();
          }    
        }
        initNyaSelectFiltered();
      }

      // //OLD
      // function resetTemporyConfig(){
      //   $scope.nyaSelect.temporyConfig = {
      //     formlyLabel: '', 
      //     formlyRequired: false, 
      //     formlyPlaceholder: '',
      //     formlyDesciption: '',
      //     formlyOptions: []
      //   };   
      // }

      function resetTemporyConfig(){
        $scope.nyaSelectFiltered.temporyConfig = {
          formlyLabel: '', 
          formlyRequired: false, 
          formlyPlaceholder: '',
          formlyDesciption: '',
          formlyOptions: []
        };   
      }

    }


})(); 