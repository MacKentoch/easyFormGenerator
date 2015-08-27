/**
 *  ------------------------------------------------------
 *  filter : trustThis
 *  ------------------------------------------------------
 *
 *  filter to force trust content when ng-bind html form model :
 *  
 *  "<span ng-bind-html="item.label | trustThis"></span>	"
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
	.module('edaApp.filters.trustThis', [])
	.filter('trustThis', ['$sce',

	function($sce) {

  return function(value, type) {
    					return $sce.trustAs(type || 'html', value);
  				};
}]);
