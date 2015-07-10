///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// module = "controllers"  
//  ------------------------------------------------------
//      Syntax (convention) :
//          "ngwfApp" = application
//          "ngwfApp.controllers.yourSecondController" = controller module
//
//  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////
// //it could be a service rather than app.value
///////////////////////////////////////////////////


// var yourDataService = angular.module('ngwfApp.controllers.yourDataService', []);

// yourDataService.factory('formlyFieldsModel', [function(){
// 	var  formlyFields = {};
// 	formlyFields.modelList = [];
//     formlyFields.refresh = function(newModelList){
// 				    this.modelList = [].concat(newModelList);
//     };
//     return formlyFields;
// }]);




var yourController = angular.module('ngwfApp.controllers.yourController', []);

yourController.controller('yourController', [				'formlyDataModel',
															'formlyFieldsModel', 
															'formlyFieldsModelToSaveDataBase',
															'formlyOthers',
															'toaster',
															'$filter',
															function (	formlyDataModel, 
																		formlyFieldsModel,
																		formlyFieldsModelToSaveDataBase, 
																		formlyOthers, 
																		toaster, 
																		$filter) {

    var secondVM = this;

	secondVM.dataModel = formlyDataModel; 
	secondVM.FieldsModel = formlyFieldsModel;
	secondVM.FieldsModelToSaveToDatabase = formlyFieldsModelToSaveDataBase; 



	secondVM.submitButtonText = formlyOthers;
	secondVM.cancelButtonText = formlyOthers;


	secondVM.onSubmit = onSubmit;

  	function onSubmit() {
   	    toaster.pop({
            type: 'info',
            timeout:2000,
            title: 'should save data model if it were not a static example',
            body: 'data :' + $filter('json')(secondVM.dataModel.modelList, 4),                
            showCloseButton: true
      }); 
  	}	


	//just for decoration : to show html in ng-code-mirror
	secondVM.formlyNeededHtml =   '<!-- here is the simple HTML you need (everything else is decoration) : --> \n' +
									'<form ng-submit="secondVM.onSubmit()" name="secondVM.form" novalidate> \n' +
									'	<formly-form 	model="secondVM.dataModel.modelList"  \n' +
									'					fields="secondVM.FieldsModel.modelList"  \n' +
									'					options="secondVM.options"  \n' +
									'					form="secondVM.form"> \n' +
									'	  <span class="pull-right"> 	 \n' +
									'	      <button 	type="submit"  \n' +
									'	      			class="btn btn-primary submit-button"  \n' +
									'	      			ng-disabled="secondVM.form.$invalid">{{secondVM.submitButtonText.button.submit}}</button> \n' +
									'	      <button 	type="button"  \n' +
									'	      			class="btn btn-primary"  \n' +
									'	      			ng-click="secondVM.options.resetModel()">{{secondVM.cancelButtonText.button.cancel}}</button> \n' +
									'	  </span>	 \n' +
									'	</formly-form>  \n' +
									'</form>';				          


}]);