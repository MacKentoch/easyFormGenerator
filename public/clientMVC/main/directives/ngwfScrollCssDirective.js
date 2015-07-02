///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// module = "directive" 
//  ------------------------------------------------------
//      Syntax (convention) :
//          "ngwfApp" = application
//          "ngwfApp.directives.directiveNAME" = container directives module
//
//  This module is a directive -> it must be injected in directives container
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ngwfScrollCssDirective = angular.module('ngwfApp.directives.ngwfScrollCssDirective', []);


//this directive  is fast dev for navigation bar
//if you need you should add attr for height rather fix value (680)
ngwfScrollCssDirective.directive('scrollChangeCss',[function(){

	console.log('--> INIT : Hello directive  \'\'scrollCss\'\' ');

     return{

     	link: function(scope, element, attrs) {


		    $(window).bind('scroll', function() {

		    	var windowHeight = $(window).height();
		    	//////////////////////////////////////
		    	//navigation bar css change on scroll
		    	//////////////////////////////////////
		        var navHeight = $(window).height() - 585;
		        if ($(window).scrollTop() > navHeight) {
		  			scope.scrollflag.boolNavBarChangeClass = true;
			       	//console.log('Scrolled below header.'); 
		        } else {
			        scope.scrollflag.boolNavBarChangeClass = false;
			        //console.log('Header is in view.');            
		        }

		    	//////////////////////////////////////////////////
		    	//bottom button appear on scroll (to go back top)
		    	//////////////////////////////////////////////////
		        var navHeightForBottomButton = windowHeight - 300;
		        console.info('navHeightForBottomButton = ' + navHeightForBottomButton);
		        console.info('-> $(window).scrollTop()= ' + $(window).scrollTop() );

		        if ($(window).scrollTop() > navHeightForBottomButton) {
		  			scope.scrollflag.boolBottomButtonChangeClass = true;

		        } else {
			        scope.scrollflag.boolBottomButtonChangeClass = false;
		        }


		        //never forget scope.$apply or you will regret^^
		        scope.$apply();
		    });

    	}
   }; 





}]);