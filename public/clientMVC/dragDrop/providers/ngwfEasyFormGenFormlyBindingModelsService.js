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
		
		/**
		 * define all controls easy form genearator will manage
		 */
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

		/**
		 * formly field model (back model = configuration model)
		 * at initial state
		 */
		var _easyFormInitialStateConfigurationModel =  {                                
	    /**
	     * commun all easy form generator ways	
	     */
	    submitButtonText 	: 'submit',
	    cancelButtonText 	: 'cancel',
	    lines : [
	            {
	              line 					: 1,                                       
	              activeColumn 	: 1,
	              columns 			: [
	                                {  
	                                  numColumn 	: 1,
	                                  exist 			:true, 
	                                  control 		: {
	                                                  type:'none',
	                                                  key: 'none',
	                                                  // templateOptions: {
	                                                  //                     label: 'none',
	                                                  //                     placeholder: 'none',
	                                                  //                     required: false,
	                                                  //                     description: 'Descriptive text'
	                                                  //                   }
	                                                }
	                                  }
	                               ]
	             }                                 
	        ]
    };

    var _easyFormInitialStateConfigurationModelAddOnForStepWay = {
			/**
			 * specific easy form generator — step way — (not drag and drop way), needed for wizard management
			 */
	    activeLine 			: 1,   
	    listConfigStep 	: [
	                        'init',
	                        'first',
	                        'second',
	                        'third'
	                  		],
	    stepIndicators 	: [
	                        true,
	                        false,
	                        false,
	                        false
	                      ], 
	    configStepCounter : 0,     	
    };		


		this.getEasyFormListControls = function(){
			return _easyFormListControls;
		};

		this.addEasyFormControlToList = function(controlDeclaration){
			if (typeof controlDeclaration !== 'undefined'){
				_easyFormListControls.controls.push(controlDeclaration);
			}
		};




		
		this.$get =	[

			function(){
				var Service = {};

				Service.getEasyFormListControls = function(){
					return _easyFormListControls;
				};

				Service.getEasyFormInitialStateConfigurationModel = function(addStepWayProperties){
					var initialConfigurationModel = _easyFormInitialStateConfigurationModel;
					if (typeof addStepWayProperties !== 'undefined') {
						if (addStepWayProperties) {
							/**
							 * add properties specific to step way
							 */
							angular.extend(initialConfigurationModel, _easyFormInitialStateConfigurationModelAddOnForStepWay);
						}
					}
					return _easyFormInitialStateConfigurationModel;
				};


				return Service;

			}

		];	
		
	}]);