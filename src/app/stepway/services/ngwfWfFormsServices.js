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
		.factory('WfFormsByIdServices', WfFormsByIdServices);

		WfFormsByIdServices.$inject = ['$resource'];
		function WfFormsByIdServices($resource){
			return $resource('/api/wfedit/:id', {id: '@id'}, {});
		}


})();