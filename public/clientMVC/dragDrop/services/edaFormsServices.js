///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  form API : suppose you have your RESTful backend 
//
//  module = "service"  
//  ------------------------------------------------------
//      Syntax (convention) :
//          "edaApp" = application
//          "edaApp.services.serviceNAME" = container services module
//
//  This module is a service -> it must be injected in services container
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
angular
	.module('edaApp.services.formsByIdService', ['ngResource'])
	.factory('formsByIdService', ['$resource', function($resource){
    return $resource('/api/formGen/:id', {id: '@id'}, {

    });
  }]);

