///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// module = "directive" 
//  ------------------------------------------------------
//      Syntax (convention) :
//          "ngwfApp" = application
//          "ngwfApp.directives.directiveNAME" = container directives module
//
//  This module is a directive -> it must be injected in directives container
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
angular
	.module('ngwfApp.directives.ngwfStRationDirective', [])
	.directive('stRatio',[function(){

	console.log('--> INIT : Hello directive  \'\'stRatio\'\' ');

        return {
        	restrict: 'A',

          link:function(scope, element, attr){
            var ratio=+(attr.stRatio);
            
            element.css('width',ratio+'%');
            
          }
        };
}]);