///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  module = "controllers"  for view "wfEdit"
//  ------------------------------------------------------
//      Syntax (convention) :
//          "ngwfApp" = application
//          "ngwfApp.controllers.viewNameController" = controller module
//
//  This module is a view controller -> it must be injected in controller container
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ngwfWfEditMODALController = angular.module('ngwfApp.controllers.ngwfWfEditMODALController', []);

ngwfWfEditMODALController.controller('ngwfWfEditMODALController', [	'$scope', 
                                                                    '$modalInstance',
                                      															'nyaSelect',
                                                                    'toaster' ,
                                                                    '$timeout',
                                                                    'selectOptionManage',
                                      															function (	$scope, 
                                                                                $modalInstance, 
                                                                                nyaSelect, 
                                                                                toaster,
                                                                                $timeout,
                                                                                selectOptionManage
                                                                              ){
  //verbose
  console.log('--> INIT : Hello controller  \'\'ngwfWfEditMODALController\'\' ');
  

  //reminder of nyaSelectInit model :
  // $scope.nyaSelectInit = {
  //                   controls : [
                                // {id: 'empty',  name: 'no control', subtitle: 'no control', group: 'Blank', formlyType: "none", formlySubtype: "none", formlyLabel: "", formlyRequired: false, formlyDesciption: ""},
                                // {id: 'TextInput',  name: 'Text input', subtitle: 'Text input', group: 'input', formlyType: "input", formlySubtype: "none", formlyLabel: "", formlyRequired: false, formlyDesciption: ""},
                                // {id: 'Password',  name: 'Password', subtitle: 'Password', group: 'input', formlyType: "input", formlySubtype: "password", formlyLabel: "", formlyRequired: false, formlyDesciption: ""},
                                // {id: 'Date',  name: 'Date', subtitle: 'Date', group: 'input', formlyType: "input", formlySubtype: "date", formlyLabel: "", formlyRequired: false, formlyDesciption: ""},
                                // {id: 'Texarea', name: 'Textarea', subtitle: 'Textarea', group: 'Textarea', formlyType: "textarea", formlySubtype: "none", formlyLabel: "", formlyRequired: false, formlyDesciption: ""},
                                // {id: 'RichTextEditor', name: 'RichTextEditor', subtitle: 'RichTextEditor', group: 'Textarea', formlyType: "richEditor", formlySubtype: "", formlyLabel: "", formlyRequired: false, formlyDesciption: ""},
                                // {id: 'Radio', name: 'Radio', subtitle: 'Radio', group: 'Radio', formlyType: "radio", formlySubtype: "none", formlyLabel: "", formlyRequired: false, formlyDesciption: ""},
                                // {id: 'Checkbox', name: 'Checkbox', subtitle: 'Checkbox', group: 'Checkbox', formlyType: "checkbox", formlySubtype: "none", formlyLabel: "", formlyRequired: false, formlyDesciption: ""},
                                // {id: 'BasicSelect', name: 'Basic select', subtitle: 'Basic select', group: 'Select', formlyType: "select", formlySubtype: "none", formlyLabel: "", formlyRequired: false, formlyDesciption: ""},
                                // {id: 'GroupedSelect', name: 'Grouped Select', subtitle: 'Grouped Select', group: 'Select', formlyType: "select", formlySubtype: "grouped", formlyLabel: "", formlyRequired: false, formlyDesciption: ""}
  //                             ],

  //                     selectedControl : 'none' ,
  //                     temporyConfig : {
  //                                       selectedControl : 'none' ,
  //                                       formlyLabel: "label", 
  //                                       formlyRequired: false, 
  //                                       formlyDesciption: ""
  //                                     }       
  //                   };



var initOptionModel = {rows:[
                            ]
                  };

  ////////////////////////////////////////////
  // part : radio
  ///////////////////////////////////////////

  $scope.radioRowCollection = initOptionModel;
  $scope.newOptionRadio = {saisie: ""};


  function bindRadioFromNYA(){
    if ($scope.nyaSelect.temporyConfig.formlyOptions.length > 0) {
      for (var i = 0; i <= $scope.nyaSelect.temporyConfig.formlyOptions.length-1; i++){

            var newOption = {"option": $scope.nyaSelect.temporyConfig.formlyOptions[i].name,
                      "order": i,
                      "group": ""
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
            var newOption = {"name": $scope.radioRowCollection.rows[i].option,
                      "value": i,
                      "group": ""
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

  function applyConfigToSelectedControl(){
    for (var i = $scope.nyaSelect.controls.length - 1; i >= 0; i--) {
      if ($scope.nyaSelect.controls[i].id === $scope.nyaSelect.selectedControl) {

          $scope.nyaSelect.controls[i].formlyLabel = $scope.nyaSelect.temporyConfig.formlyLabel;
          $scope.nyaSelect.controls[i].formlyRequired = $scope.nyaSelect.temporyConfig.formlyRequired;
          $scope.nyaSelect.controls[i].formlyDesciption = $scope.nyaSelect.temporyConfig.formlyDesciption;
          $scope.nyaSelect.controls[i].formlyPlaceholder = $scope.nyaSelect.temporyConfig.formlyPlaceholder;
          $scope.nyaSelect.controls[i].formlyOptions = $scope.nyaSelect.temporyConfig.formlyOptions;
        
       }
    }
  }




  $scope.selectThisControl = function(controlName){
    //console.info('selectThisControl starting for : ' + controlName);
    $scope.nyaSelect.selectedControl = 'none';
    resetTemporyConfig();

    for (var i = $scope.nyaSelect.controls.length - 1; i >= 0; i--) {
       if ($scope.nyaSelect.controls[i].id === controlName) {
          $scope.nyaSelect.selectedControl = $scope.nyaSelect.controls[i].id;         
          //console.log('selectThisControl : item found : ' + $scope.nyaSelect.controls[i].id);
       }
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
    applyConfigToSelectedControl();
    //return current model to parent controller :
    $modalInstance.close($scope.nyaSelect);

  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };


}]);