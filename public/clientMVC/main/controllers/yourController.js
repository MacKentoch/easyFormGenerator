///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// module = "controllers"  
//  ------------------------------------------------------
//      Syntax (convention) :
//          "ngwfApp" = application
//          "ngwfApp.controllers.yourSecondController" = controller module
//
//  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var yourController = angular.module('ngwfApp.controllers.yourController', []);

yourController.controller('yourController', [				'formlyDataModel',
															'formlyFieldsModel', 
															'formlyOthers',
															'toaster',
															'$filter',
														function (	formlyDataModel, 
																	formlyFieldsModel, 
																	formlyOthers, 
																	toaster, 
																	$filter) {
    //verbose
    //console.log('--> INIT : Hello controller  \'\'yourSecondController\'\' ');

    var secondVM = this;

	secondVM.dataModel = formlyDataModel.modelList; 
	secondVM.FieldsModel = formlyFieldsModel.modelList;    
	secondVM.FieldsModelToSaveToDatasase = formlyFieldsModel.modelList; 

	secondVM.submitButtonText = formlyOthers.button.submit;
	secondVM.cancelButtonText = formlyOthers.button.cancel;


  secondVM.onSubmit = onSubmit;

  function onSubmit() {
       toaster.pop({
            type: 'info',
            timeout:2000,
            title: 'should save data model if it were not a static example',
            body: 'data :' + $filter('json')(secondVM.dataModel, 4),                
            showCloseButton: true
      }); 
  }	


  secondVM.logThisModel = logThisModel;

  function logThisModel(){
  	console.log('formlyFieldsModel.modelList puis');
  	console.info('FieldsModelToSaveToDatasase');
  	console.dir(formlyFieldsModel.modelList);
  	console.dir(secondVM.FieldsModelToSaveToDatasase);

  }


	//just for decoration : to show html in ng-code-mirror
	secondVM.formlyNeededHtml =   '<!-- here is the simple HTML you need (everything else is decoration) : --> \n' +
						          '<form ng-submit="secondVM.onSubmit()" name="secondVM.form" novalidate> \n' +
						          '  <formly-form model="secondVM.dataModel" fields="secondVM.FieldsModel" options="secondVM.options" form="secondVM.form"> \n' +
						          '    <button type="submit" class="btn btn-primary submit-button pull-right" ng-disabled="secondVM.form.$invalid">{{secondVM.buttons.submit}}</button> \n' +
						          '    <button type="button" class="btn btn-primary pull-right" ng-click="secondVM.options.resetModel()">{{secondVM.buttons.cancel}}</button> \n' +
						          '  </formly-form> \n' +
						          '</form>';



}]);