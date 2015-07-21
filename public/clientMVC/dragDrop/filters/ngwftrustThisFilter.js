///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TEMPLATE FILTER 
//
//  module = "filter" 
//  ------------------------------------------------------
//      Syntax (convention) :
//          "ngwfApp" = application
//          "ngwfApp.filters.filterNAME" = container filters module
//
//  This module is a filter -> it must be injected in filters container
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var  ngwftrustThisFilter = angular.module('ngwfApp.filters.trustThis', []);

ngwftrustThisFilter.filter('trustThis', ['$sce',function($sce) {
  return function(value, type) {
    					return $sce.trustAs(type || 'html', value);
  				};
}]);
