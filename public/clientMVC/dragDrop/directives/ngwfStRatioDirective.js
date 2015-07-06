///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// module = "directive" 
//  ------------------------------------------------------
//      Syntax (convention) :
//          "ngwfApp" = application
//          "ngwfApp.directives.directiveNAME" = container directives module
//
//  This module is a directive -> it must be injected in directives container
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ngwfStRatioDirective = angular.module('ngwfApp.directives.ngwfStRationDirective', []);


//this directive is attribute only : add "st-ration = "__A NUMBER__" in view or html :
ngwfStRatioDirective.directive('stRatio',[function(){

	console.log('--> INIT : Hello directive  \'\'stRatio\'\' ');

        return {

          link:function(scope, element, attr){
            var ratio=+(attr.stRatio);
            
            element.css('width',ratio+'%');
            
          }
        };
}]);