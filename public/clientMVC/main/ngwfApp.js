///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//  ------------------------------------------------------
//      Application module
//  ------------------------------------------------------
//      Syntax (convention) :
//          "ngwfApp" = application Name (could be per view)
//
//  All angular modules loaded here (injected)
//
// TIP : remove console.log verbose on production
//
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var ngwfApp = angular.module('ngwfApp', [	
												'ngwfApp.controllers',
												'ngwfApp.services', 
												'ngwfApp.filters',
												'ngwfApp.directives',
												'textAngular',
												'textAngularSetup',
												'ngAnimate',
												'toaster',											
												'formly', 
												'formlyBootstrap',
												'ui.bootstrap',
												'nya.bootstrap.select',
												function () {
    //verbose init is ok  
    console.log('--> INIT : Hello application :  \'\'ngwfApp\'\' ');

}]);



//////////////////////////////
// CONFIG HERE (formly...)							
/////////////////////////////
ngwfApp.config([	'formlyConfigProvider', 
					function(formlyConfigProvider) {


    formlyConfigProvider.setType(
	    {
	  		name: 'richEditor',
	  		template: '<text-angular class="richTextAngular" ng-model="model[options.key || index]"></text-angular>'
	    }
    );

    formlyConfigProvider.setType(
	   	{
	  		name: 'blank',
	  		template: '<div></div>'
	    }
    );


    var subTitleTemplate = '<div class="row"><div class=""><h4 class="text-center">{{options.templateOptions.placeholder}}<h4><hr/></div></div>';
    formlyConfigProvider.setType(
	   	{
	  		name: 'subTitle',
	  		template: subTitleTemplate
	    }
    );

	var basicSelectTemplate =  	' <ol 	class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12" ' + 
								'		ng-model="model[options.key || index]"  ' + 
							    '		id="{{id}}"  ' + 
							    '		disabled="options.templateOptions.options.length === 0"> ' + 
							    '   <li class="nya-bs-option" nya-bs-option="option in options.templateOptions.options"> ' + 
							    '     <a>{{option.name}}</a> ' + 
							    '   </li> ' + 
							    ' </ol>     ' ;

   formlyConfigProvider.setType(
	   	{
	  		name: 'basicSelect',
	  		template: basicSelectTemplate
	    }
    );


     var groupedSelectTemplate =   '  <ol class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12" ' +
   								 '		ng-model="model[options.key || index]" ' +
   								 '       data-live-search="true" ' +
   								 '       disabled="options.templateOptions.options.length === 0">' +
                                 '       <li nya-bs-option="option in  options.templateOptions.options group by option.group"  ' +
                                 '       >' +
                                 '         <span class="dropdown-header">{{$group}}</span>' + 
                                 '         <a>' +
                                 '           <span>{{option.name}}</span>' +
                                 '           <span class="glyphicon glyphicon-ok check-mark"></span>' +
                                 '         </a>' +
                                 '       </li>' +
                                 '     </ol>';

   formlyConfigProvider.setType(
	   	{
	  		name: 'groupedSelect',
	  		template: groupedSelectTemplate
	    }
    );

 }]);   