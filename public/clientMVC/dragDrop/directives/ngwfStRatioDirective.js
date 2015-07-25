/**
 *  ------------------------------------------------------
 *  directive : stRatio
 *  ------------------------------------------------------
 *
 * adapt element's width % 
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
	.module('ngwfApp.directives.ngwfStRationDirective', [])
	.directive('stRatio',[

  function(){

        return {
        	restrict: 'A',

          link:function(scope, element, attr){
            var ratio=+(attr.stRatio);
            
            element.css('width',ratio+'%');
            
          }
        };
}]);