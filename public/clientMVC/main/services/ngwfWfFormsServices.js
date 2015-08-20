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

(function(){

	'use strict';
	
	angular
		.module('ngwfApp.services.ngwfWfFormsServices', ['ngResource'])
		.factory('wfFormsByIdServices', wfFormsByIdServices);

		wfFormsByIdServices.$inject = ['$resource'];
		function wfFormsByIdServices($resource){
			return $resource('/api/wfedit/:id', {id: '@id'}, {});
		}


})();