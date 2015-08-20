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
angular
	.module('ngwfApp.services.ngwfWfFormsServices', ['ngResource'])
	.factory('wfFormsByIdServices', ['$resource', function($resource){
    return $resource('/api/wfedit/:id', {id: '@id'}, {

    });
  }]);

