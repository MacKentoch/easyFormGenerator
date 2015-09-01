/**
 *  ------------------------------------------------------
 *  module = "controller" main controller
 *  ------------------------------------------------------
 *
 *
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

;(function () {
	'use strict';

	angular
		.module('ngwfApp.controllers.ngwfMainController', [])
		.controller('ngwfMainController', ngwfMainController);

		ngwfMainController.$inject = ['$scope', '$timeout'];
		function ngwfMainController($scope, $timeout){
			
			$scope.FormNameAsTest = 'initial_name';
			
			$timeout(function(){
				$scope.FormNameAsTest = 'name changed after 3s';
			}, 3000);
		}

})(); 

