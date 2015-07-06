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
var  filterTemplate = angular.module('ngwfApp.filters.serviceTemplate', []);

filterTemplate.controller('filterTemplate', function ($scope) {
    //verbose
    //console.log('--> INIT : Hello filter  \'\'ngwfApp.filters.filterTemplate\'\' ');
});