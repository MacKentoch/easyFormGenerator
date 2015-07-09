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

yourController.controller('yourController', [	'formlyDataModel',
															'formlyFieldsModel', 
														function (formlyDataModel, formlyFieldsModel) {
    //verbose
    //console.log('--> INIT : Hello controller  \'\'yourSecondController\'\' ');

    var secondVM = this;

	secondVM.dataModel = [formlyDataModel].concat(); 
	secondVM.FieldsModel = [formlyFieldsModel].concat();    
	secondVM.FieldsModelToSaveToDatasase = [formlyFieldsModel].concat(); 


}]);