///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// module = "controllers"  for view "ngwfMainController"
//  ------------------------------------------------------
//      Syntax (convention) :
//          "ngwfApp" = application
//          "ngwfApp.controllers.ngwfMainController" = controller module
//
//  This module is a view controller -> it must be injected in controller container
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ngwfMainController = angular.module('ngwfApp.controllers.ngwfMainController', []);

ngwfMainController.controller('ngwfMainController', ['$scope', function ($scope) {
    //verbose
    console.log('--> INIT : Hello controller  \'\'ngwfMainController\'\' ');
}]);