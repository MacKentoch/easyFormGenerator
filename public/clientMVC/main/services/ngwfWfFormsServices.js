///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  
//
//  module = "service"  for view "wfEdit"
//  ------------------------------------------------------
//      Syntax (convention) :
//          "ngwfApp" = application
//          "ngwfApp.services.serviceNAME" = container services module
//
//  This module is a service -> it must be injected in services container
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///
///
///
/**
 *  ------------------------------------------------------
 *  form API : suppose you have your RESTful backend 
 *  ------------------------------------------------------
 *
 *  
 *
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
var ngwfWfFormsServices = angular.module('ngwfApp.services.ngwfWfFormsServices', ['ngResource']);


ngwfWfFormsServices.factory('wfFormsByIdServices', ['$resource', function($resource){
    return $resource('/api/wfedit/:id', {id: '@id'}, {

    });
  }]);

