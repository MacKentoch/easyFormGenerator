/**
 *  ------------------------------------------------------
 *  provider : EasyFormGenFormlyBindingModels
 *  ------------------------------------------------------
 *
 *  configure all related to bing model (easy form generator - formly)
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
	.module('ngwfApp.providers.EasyFormGenFormlyBindingModels', [])
	.provider('EasyFormGenFormlyBindingModels', [ 

	function(){
		
		var _easyFormListControls =	{

	                    controls : [],

	                      selectedControl : 'none' ,
	                      temporyConfig : {
	                                        selectedControl		: 'none',
	                                        formlyLabel				: 'label', 
	                                        formlyRequired		: false, 
	                                        formlyDesciption	: '',
	                                        formlyPlaceholder	: '',
	                                        formlyOptions 		: []
	                                      } 
		};

		this.getEasyFormListControls = function(){
			return _easyFormListControls;
		};

		this.addEasyFormControlToList = function(controlDeclaration){
			if (typeof controlDeclaration !== 'undefined'){
				_easyFormListControls.push(controlDeclaration);
			}
		};




		
		this.$get =	[

			function(){
				var Service = {};

				Service.getEasyFormListControls = function(){
					return _easyFormListControls;
				};


				return Service;

			}

		];	
		
	}]);