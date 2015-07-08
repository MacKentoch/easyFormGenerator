///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// module = "directive" 
//  ------------------------------------------------------
//      Syntax (convention) :
//          "ngwfApp" = application
//          "ngwfApp.directives.directiveNAME" = container directives module
//
//  This module is a directive -> it must be injected in directives container
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var droppableDirective = angular.module('ngwfApp.directives.droppableDirective', []);


//this directive is part of drag and drop 
droppableDirective.directive('droppable', [function() {

	console.log('--> INIT : Hello directive  \'\'droppable\'\' ');

	return {

		scope: {
		  drop: '&',
		  bin: '='
		},

		link: function(scope, element) {
			  // again we need the native object
			  var el = element[0];
			  
			  el.addEventListener(
			    'dragover',
			    function(e) {
			      e.dataTransfer.dropEffect = 'move';
			      // allows us to drop
			      if (e.preventDefault) e.preventDefault();
			      this.classList.add('over');
			      return false;
			    },
			    false
			  );
			  
			  el.addEventListener(
			    'dragenter',
			    function(e) {
			      this.classList.add('over');
			      return false;
			    },
			    false
			  );
			  
			  el.addEventListener(
			    'dragleave',
			    function(e) {
			      this.classList.remove('over');
			      return false;
			    },
			    false
			  );
			  
			  el.addEventListener(
			    'drop',
			    function(e) {
			      // Stops some browsers from redirecting.
			      if (e.stopPropagation) e.stopPropagation();
			      
			      this.classList.remove('over');
			      
			      var binId = this.id;
			      var item = document.getElementById(e.dataTransfer.getData('Text'));
			      this.appendChild(item);
			      // call the passed drop function
			      scope.$apply(function(scope) {
			        var fn = scope.drop();
			        if ('undefined' !== typeof fn) {            
			          fn(item.id, binId);
			        }
			      });
			      
			      return false;
			    },
			    false
			  );
		}
	};
}]);
