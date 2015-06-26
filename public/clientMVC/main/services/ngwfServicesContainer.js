///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// module = "services" container
//  ------------------------------------------------------
//      Syntax (convention) :
//          "ngwfApp" = application
//          "ngwfApp.services" = container services module
//
//  This module is a container -> it must be injected in the application -> so it will inject all services injected here
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
angular.module('ngwfApp.services', [	'ngwfApp.services.formFieldManage',
										'ngwfApp.services.selectOptionManage',
										'ngwfApp.services.ngwfWfFormsServices',
										'ngwfApp.services.ngwfEditCtrlControllerModalProxy',
										function () {
    //verbose
    console.log('--> INIT : Hello services container  \'\'ngwfApp.services\'\' ');
}]);