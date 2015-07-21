///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// module = "filters" container
//  ------------------------------------------------------
//      Syntax (convention) :
//          "ngwfApp" = application
//          "ngwfApp.filters" = container filters module
//
//  This module is a container -> it must be injected in the application -> so it will inject all filters injected here
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
angular.module('ngwfApp.filters', ['ngwfApp.filters.trustThis'], 
									function () {
    //verbose
    //console.log('--> INIT : Hello filters container  \'\'ngwfApp.filters\'\' ');
});
