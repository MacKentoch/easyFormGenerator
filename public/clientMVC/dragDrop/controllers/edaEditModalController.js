
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  module = "controllers"  for view "wfEdit"
//  ------------------------------------------------------
//      Syntax (convention) :
//          "edaApp" = application
//          "edaApp.controllers.viewNameController" = controller module
//
//  This module is a view controller -> it must be injected in controller container
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

angular
  .module('edaApp.controllers.edaEditMODALController', [])
  .controller('edaEditMODALController', [	'$scope', 
                                          '$modalInstance',
                                          'nyaSelect',
                                          'toaster' ,
                                          '$timeout',
                                          'selectOptionManage',
                                          'controllerModalProxy',
  function (	$scope, 
              $modalInstance, 
              nyaSelect, 
              toaster,
              $timeout,
              selectOptionManage,
              controllerModalProxy
            ){

  

var initOptionModel = {rows:[
                            ]
                  };

  ////////////////////////////////////////////
  // part : radio
  ///////////////////////////////////////////

  $scope.radioRowCollection = initOptionModel;
  $scope.newOptionRadio = {saisie: ''};


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

  $scope.addNewOptionRadio = function(){
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
    $scope.newOptionRadio = {saisie: ""};
  };

  $scope.removeRadioRow = function(index) {
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
    }; 

  $scope.upThisRadioRow = function(index){
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
  };                                    

  $scope.downThisRadioRow = function(index){
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
  };



  ////////////////////////////////////////////
  // part : basic Select
  ///////////////////////////////////////////

  $scope.basicSelectRowCollection = initOptionModel;
  $scope.newOptionBasicSelect = {saisie: ""};


  function bindBasicSelectFromNYA(){
    // console.info('bindBasicSelectFromNYA');
    // console.dir($scope.nyaSelect.temporyConfig);

    if ($scope.nyaSelect.temporyConfig.formlyOptions.length > 0) {
      for (var i = 0; i <= $scope.nyaSelect.temporyConfig.formlyOptions.length-1; i++){

            var newOption = {"option": $scope.nyaSelect.temporyConfig.formlyOptions[i].name,
                      "order": i,
                      "group": ""
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
            var newOption = {"name": $scope.basicSelectRowCollection.rows[i].option,
                      "value": i,
                      "group": ""
                    };
            $scope.nyaSelect.temporyConfig.formlyOptions.push(newOption);
        }      
   }
  }

  $scope.addNewOptionBasicSelect = function(){
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
    $scope.newOptionBasicSelect = {saisie: ""};
  };

  $scope.removeRow = function(index) {
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
    }; 

  $scope.upThisRow = function(index){
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
  };                                    

  $scope.downThisRow = function(index){
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
  };


  ////////////////////////////////////////////
  // part : grouped Select
  ///////////////////////////////////////////

  $scope.groupedSelectRowCollection = initOptionModel;
  $scope.newOptionGroupedSelect = {saisie: ""};

  $scope.GroupedSelectGroups =    {
                                    list:[]
                                  };
  $scope.newGroupGroupedSelect = {saisie: ""};  
  $scope.groupSelectGroupClick = {showList : false};                                


  function bindGroupedSelectFromNYA(){
    if ($scope.nyaSelect.temporyConfig.formlyOptions.length > 0) {
      for (var i = 0; i <= $scope.nyaSelect.temporyConfig.formlyOptions.length-1; i++){
      //for (var i = $scope.nyaSelect.temporyConfig.formlyOptions.length - 1; i >= 0; i--) {

            var newOption = {"option": $scope.nyaSelect.temporyConfig.formlyOptions[i].name,
                      "order": i,
                      "group": $scope.nyaSelect.temporyConfig.formlyOptions[i].group
                    };
            $scope.groupedSelectRowCollection.rows.push(newOption);            
        }
        //grouplist : thx to lodash it is easy
        var filteredgroup = _.uniq(_.pluck($scope.groupedSelectRowCollection.rows, 'group'));
       angular.copy(filteredgroup, $scope.GroupedSelectGroups.list); 
       //console.dir($scope.GroupedSelectGroups.list);

    }
  }

  function bindGroupedSelectToNya(){
    $scope.nyaSelect.temporyConfig.formlyOptions = [];
    for (var i = 0; i <= $scope.groupedSelectRowCollection.rows.length - 1; i++){
          var newOption = {"name": $scope.groupedSelectRowCollection.rows[i].option,
                    "value": i,
                    "group": $scope.groupedSelectRowCollection.rows[i].group
                  };

          $scope.nyaSelect.temporyConfig.formlyOptions.push(newOption);
          
      }
      ///console.log('\n\n\n\n\n');
      //console.dir($scope.nyaSelect.temporyConfig.formlyOptions);
  }  

  $scope.showGroupListToChoose = function(){
    $scope.groupSelectGroupClick.showList = !$scope.groupSelectGroupClick.showList;
  };

  $scope.addNewGroupToGroupedSelect = function(){
    if ($scope.newGroupGroupedSelect.saisie !== "") {
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
    $scope.newGroupGroupedSelect.saisie = "";
  };


  $scope.addNewOptionGroupedSelect = function(){
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
    $scope.newOptionGroupedSelect = {saisie: ""};
  };

  $scope.removeGroupedSelectRow = function(index) {
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
    }; 

  $scope.upThisGroupedSelectRow = function(index){
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
  };                                    

  $scope.downThisGroupedSelectRow = function(index){
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

  };


  /////////////////////////////////////////////
  // init datetimepicker model
  /////////////////////////////////////////////
  $scope.demodt ={};

  $scope.today = function() {
    $scope.demodt.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.demodt.dt = null;
  };


  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.demodt.opened = true;
  };

  $scope.dateOptions = {
           formatYear: 'yy',
           startingDay: 1,
           showWeeks: true,
           initDate: null
  };

  $scope.demodt.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  
  function initDatePicker(){
    $scope.nyaSelect.temporyConfig.datepickerPopup = $scope.demodt.formats[0];  
  }
  


  /////////////////////////////////////////////
  // init model from controller data
  /////////////////////////////////////////////
  $scope.nyaSelect = nyaSelect ;

  //console.dir($scope.nyaSelect);
  
  //selected control from  main controller applied to current selected control
  $scope.nyaSelect.selectedControl = $scope.nyaSelect.temporyConfig.selectedControl;


  //place nya-select to selection if not none :
   if (nyaSelect.selectedControl !== 'none') {
    for (var i = $scope.nyaSelect.controls.length - 1; i >= 0; i--) {
       if ($scope.nyaSelect.controls[i].id === nyaSelect.selectedControl) {
          //$scope.nyaSelect.selectedControl = nyaSelect.controls[i].id;
          $scope.modelNyaSelect = nyaSelect.controls[i];
       }
    }

    if ($scope.nyaSelect.selectedControl === "BasicSelect") {
      bindBasicSelectFromNYA();
    }

    if ($scope.nyaSelect.selectedControl === "GroupedSelect") {
      bindGroupedSelectFromNYA();
    } 

    if ($scope.nyaSelect.selectedControl === "Radio") {
      bindRadioFromNYA();
    }    

  }



  function resetTemporyConfig(){
    $scope.nyaSelect.temporyConfig = {
                                        formlyLabel: "", 
                                        formlyRequired: false, 
                                        formlyPlaceholder: "",
                                        formlyDesciption: "",
                                        formlyOptions: []
                                      };   
  }



  $scope.selectThisControl = function(controlName){
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
  };



  /////////////////////////
  // modal buttons click
  /////////////////////////
  $scope.ok = function () {

    if ($scope.nyaSelect.selectedControl === "BasicSelect") {
      bindBasicSelectToNya();
    }

    if ($scope.nyaSelect.selectedControl === "GroupedSelect") {
      bindGroupedSelectToNya();
    }  

    if ($scope.nyaSelect.selectedControl === "Radio") {
      bindRadioToNya();
    }  

    //save config to control
    controllerModalProxy.applyConfigToSelectedControl($scope.nyaSelect);
    //return current model to parent controller :
    $modalInstance.close($scope.nyaSelect);

  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };


}]);