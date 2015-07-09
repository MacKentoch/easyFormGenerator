///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// module = "directive" 
//  ------------------------------------------------------
//      Syntax (convention) :
//          "ngwfApp" = application
//          "ngwfApp.directives.directiveNAME" = container directives module
//
//  This module is a directive -> it must be injected in directives container
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var draggableDirective = angular.module('ngwfApp.directives.draggableDirective', []);


//this directive is part of drag and drop 
draggableDirective.directive('draggable', [function() {

	console.log('--> INIT : Hello directive  \'\'draggable\'\' ');

	return function(scope, element) {
		var el = element[0];

		el.draggable = true;

		el.addEventListener(
		  'dragstart',
		  function(e) {
		    e.dataTransfer.effectAllowed = 'move';
		    e.dataTransfer.setData('Text', this.id);
		    this.classList.add('drag');
		    return false;
		  },
		  false
		);

		el.addEventListener(
		  'dragend',
		  function(e) {
		    this.classList.remove('drag');
		    return false;
		  },
		  false
		);
	};
}]);
