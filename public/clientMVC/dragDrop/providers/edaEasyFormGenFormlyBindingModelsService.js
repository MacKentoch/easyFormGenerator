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
	.module('edaApp.providers.EasyFormGenFormlyBindingModels', [])
	.provider('EasyFormGenFormlyBindingModels', [

	function(){ 
	 
		/** 
		 * define all controls easy form genearator will manage
		 */
		var _easyFormListControls =	{
												/**
												 * easyFormGenerator (no drag drop version) need this array in 
												 * the modal when adding control to row. 
												 *
												 * drag drop version need this in control editor
												 * 
												 * works in, pair with formlyProvider in case of special 
												 * control like 'RichTextEditor'
												 *
												 */
												//control array should be like :
												//	controls: [				
												// 	{
												// 		id 								: 'TextInput',  
												// 		name 							: 'Text input', 
												// 		subtitle 					: 'Text input', 
												// 		group 						: 'input', 
												// 		formlyType 				: 'input', 
												// 		formlySubtype 		: '', 
												// 		formlyLabel 			: '', 
												// 		formlyRequired 		: false, 
												// 		formlyDesciption 	: '', 
												// 		formlyOptions 		: []
												// 	},	
												// {
												// 		id 								: 'Password',  
												// 		name 							: 'Password', 
												// 		subtitle 					: 'Password', 
												// 		group 						: 'input', 
												// 		formlyType 				: 'input', 
												// 		formlySubtype 		: 'password', 
												// 		formlyLabel 			: '', 
												// 		formlyRequired 		: false, 
												// 		formlyDesciption 	: '', 
												// 		formlyOptions 		: []
												// }
												// 											
												// 																						
												//	] 													
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


		var _easyFormEmptyConfigurationLineModel =                                 			
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
	        ;
	    var _emptyControlFieldModel = {
	                                  control 		: {
	                                                  type:'none',
	                                                  key: 'none',
	                                                }	    	
	    };
		/**
		 * formly field model (back model = configuration model)
		 * at initial state (1 line empty)
		 *
		 * If need a configuration before loading from database 
		 * or loading from saved object better use _easyFormReloadConfigurationModel 
		 */
		var _easyFormInitialStateConfigurationModel =  {                                
	    /**
	     * commun all easy form generator ways	
	     */
	    submitButtonText 	: 'submit',
	    cancelButtonText 	: 'cancel',
	    lines : [].concat(_easyFormEmptyConfigurationLineModel)
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


    var _easyFormReloadConfigurationModel =  {                                
	    /**
	     * commun all easy form generator ways	
	     *
	     * this model when loading as initial state 
	     * -> when then loading a previous configuration
	     * i.e. : loading from database
	     *
	     * If need a model for intitial state (without loadin data)
	     * better use _easyFormInitialStateConfigurationModel
	     */
	    submitButtonText 	: 'submit',
	    cancelButtonText 	: 'cancel',
	    lines : []
    };

    var _headerTemplates = 	{
    													cssClass 		: ['col-xs-12', 'col-xs-6', 'col-xs-4'],
    													textContent : '',
															
    													html_part1 	: [
		                                          //'<div class="row">',
		                                          '  <div class="',

		                                         ].join(''),
															selectedClass : '',
															html_part2 	: [
																							'">',
		                                          '    <h2 class="text-center">'																							
																						].join(''),							 
		                          html_part3  : this.textContent,
		                          html_part4 	:  [ 
		                                          '    <h2>',
		                                          '    <hr/>',
		                                          '  </div>',
		                                          //'</div>'
		                                         ].join(''),
																						 
															simpleHtml1 : 	[
																							'<h2 class="text-center">'
																							].join(''),
															simpleHtml2 : 	[
		                                          '    <h2>',
		                                          '    <hr/>',																
																							].join('')						 
    												};

    var _formlyControlTemplates =	{
		                                className : ['col-xs-12', 'col-xs-6', 'col-xs-4'],
		                                type      : '',
		                                key       : '',
		                                templateOptions: {
		                                    type        : '',
		                                    label       : '',
		                                    required    : '',
		                                    placeholder : '',
		                                    description : '',
		                                    options     : ''    
		                                }
		                              };

		var _particularControlProperties = 	[
																					{
																						controlType 	: 'datepicker',
																						properties 		: [	
																															{	
																																isRoot  					: false, 
																																isTemplateOptions : true, 
																																value 						: 'datepickerPopup'
																															}
																														]
																					}
																				];



		this.getAllParticularControlProperties = function(){
			/**
			 * 
			 */
			return _particularControlProperties;
		};

		this.addParticularControlProperties = function(newParticularControlProperty){
			/**
			 * test object param has waited properties
			 */
			if (('controlType' 	in newParticularControlProperty) &&
					('properties' 	in newParticularControlProperty)) {
				/**
				 * test controlType does not already exists
				 *
				 * here will update properties (correponding controlType) if already exists
				 */
				var isAnUpdate = false;
				if ( _particularControlProperties.length > 0 ) {

					_particularControlProperties.forEach(function(controlProp){

						if (controlProp.controlType === newParticularControlProperty.controlType) {
							controlProp.properties = [].concat(newParticularControlProperty.properties);
							isAnUpdate = true;
						}	
							
					});
				}
				/**
				 * it is no update so ; add newParticularControlProperty
				 */
				if (!isAnUpdate) {

					_particularControlProperties.push(newParticularControlProperty);

				}
				
			}

			return _particularControlProperties;			
		};





		this.getEasyFormListControls = function(){
			/**
			 * 
			 */
			return _easyFormListControls;
		};

		this.addEasyFormControlToList = function(controlDeclaration){
			if (typeof controlDeclaration !== 'undefined'){
				_easyFormListControls.controls.push(controlDeclaration);
			}
		};



		this.getHeaderTemplates = function(){
			/**
			 * 
			 */
			return _headerTemplates;
		};

		this.addHeaderTemplateCssClass = function(cssClassToAdd){
			if (typeof cssClassToAdd !== 'undefined') {
				_headerTemplates.cssClass.push(cssClassToAdd);
			}
		};





		this.getFormlyControlTemplate = function(){
			/**
			 * 
			 */
			return _formlyControlTemplates;
		};

		this.addformlyControlTemplatesCssClass = function(cssClassToAdd){
			if (typeof cssClassToAdd !== 'undefined') {
				_formlyControlTemplates.className.push(cssClassToAdd);
			}
		};
		/**
		 * setFormlyControlTemplate : overrides ControlTemplate
		 */
		this.setFormlyControlTemplate  = function(newFormlyControlTemplate){
			/**
			 * test object param has minimum waited properties
			 */
			if (('className'				in newFormlyControlTemplate) &&
					('type' 						in newFormlyControlTemplate) &&
					('key' 							in newFormlyControlTemplate) &&
					('templateOptions') in newFormlyControlTemplate) {
				_formlyControlTemplates = angular.copy(newFormlyControlTemplate);
			}
			return true;
		};

		/**
		 * TODO : add an extend properties method to _formlyControlTemplates
		 */
		
		this.$get =	[

			function(){
				var Service = {};

				Service.getEasyFormListControls = function(){
					return _easyFormListControls;
				};
				/**
				 * getEasyFormInitialStateConfigurationModel : get configuration model 
				 * (back model equivalent to formly field model) at "initial state = 1 empty line"
				 * 
				 * @param  bool addStepWayProperties  : add or not properties specefic to easy form generator step way
				 * @return object  configuration model
				 */
				Service.getEasyFormInitialStateConfigurationModel = function(addStepWayProperties){
					var initialConfigurationModel = angular.copy(_easyFormInitialStateConfigurationModel);
					if (typeof addStepWayProperties !== 'undefined') {
						if (addStepWayProperties) {
							/**
							 * add properties specific to step way
							 */
							angular.extend(initialConfigurationModel, _easyFormInitialStateConfigurationModelAddOnForStepWay);
						}
					}
					return initialConfigurationModel;
				};
				/**
				 * getEasyFormInitialStateConfigurationModel : get configuration model 
				 * (back model equivalent to formly field model) at "initial state = 0 line"
				 * => good model to load a previous saved into it (just load lines and buttons names then)
				 * 
				 * @param  bool addStepWayProperties  : add or not properties specefic to easy form generator step way
				 * @return object  configuration model
				 */
				Service.getEasyFormReloadConfigurationModel = function(addStepWayProperties){
					var initialConfigurationModel = angular.copy(_easyFormReloadConfigurationModel);
					if (typeof addStepWayProperties !== 'undefined') {
						if (addStepWayProperties) {
							/**
							 * add properties specific to step way
							 */
							angular.extend(initialConfigurationModel, _easyFormInitialStateConfigurationModelAddOnForStepWay);
						}
					}
					return initialConfigurationModel;
				};

				/**
				 * getEasyFormEmptyConfigurationLineModel to get "empty line model template"
				 * NOTE : "empty line" means no control in this line
				 */
				Service.getEasyFormEmptyConfigurationLineModel = function(){
					return _easyFormEmptyConfigurationLineModel;
				};

				/**
				 * get an empty control model from coniguration model
				 */
				 Service.getEasyFormConfigurationEmptyControlModel = function(){
				 	return _emptyControlFieldModel;
				 };

				/**
				 *
				 *
				 * 
				 * TODO : helpers to improve "formfielManage Service"
				 *
				 * - objective it to replace Add N ColumnControl methods
				 * 
				 */

				/**
				 * getRawHeaderTemplates : return full headerTemplates object
				 *
				 * better use getHeaderTemplateForNcolumnLine to return a particular header template
				 */
				Service.getRawHeaderTemplates = function(){
					/**
					 * 
					 */
					return _headerTemplates;
				};
				/**
				 * [getHeaderTemplateForNcolumnLine : return a particular header template depending n columns in lines
				 * @param   nbColInLines : an integer reflecting numbers of column template
				 * @param   textContent  : header's text
				 * @return  an headerTemplate object
				 */
				Service.getHeaderTemplateForNcolumnLine = function(nbColInLines, textContent){
					if (typeof nbColInLines !== 'undefined' &&
							typeof textContent 	!== 'undefined') {

						if (nbColInLines === parseInt(nbColInLines, 10)) {

							if (nbColInLines <=  _headerTemplates.cssClass.length) {
							
					    	var headerToReturn = {};
					    	headerToReturn.className = _headerTemplates.cssClass[nbColInLines - 1];
					    	/**
					    	 * header html property depends this property dont forget to set it before reading html property
					    	 */
					    	_headerTemplates.textContent = textContent;
								_headerTemplates.selectedClass = headerToReturn.className;

					    	// headerToReturn.template = [
					    	// 														_headerTemplates.html_part1,
								// 														_headerTemplates.selectedClass,
								// 														_headerTemplates.html_part2,
					    	// 														textContent,
					    	// 														_headerTemplates.html_part4
					    	// 													].join('');

					    	headerToReturn.template = [
					    															_headerTemplates.simpleHtml1,
					    															textContent,
					    															_headerTemplates.simpleHtml2
					    														].join('');

					    	return headerToReturn;
				    	}

						}
					}
				};





				/**
				 * getRawFormlyControlTemplates : return full generic control templates object
				 *
				 * better use getFormlyControlTemplateForNcolumnLine to return a particular control template
				 */
				Service.getRawFormlyControlTemplates = function(){
					return _formlyControlTemplates;
				};
				/**
				 * [getFormlyControlTemplateForNcolumnLine : return a particular control template depending n columns in lines
				 * @param   nbColInLines : an integer reflecting numbers of column template
				 * @return  an empty generic control template object
				 */
				Service.getFormlyControlTemplateForNcolumnLine = function(nbColInLines, controlType){
					if (typeof nbColInLines !== 'undefined') {

						if (nbColInLines === parseInt(nbColInLines, 10)) {
							if (nbColInLines <=  _formlyControlTemplates.className.length) {

								var controlToReturn = angular.copy(_formlyControlTemplates);
								controlToReturn.className = _formlyControlTemplates.className[nbColInLines - 1];
								/**
								 * check controlType: it may require another particular property
								 */
								if (typeof controlType !== 'undefined') {

									_particularControlProperties.forEach(function(controlProp){

										if (controlProp.controlType === controlType) {
											/**
											 * add all properties this controlType has
											 * 
											 * NOTE : dot expression and bracket expression to access object property
											 * http://www.ecma-international.org/ecma-262/5.1/#sec-11.2.1
											 */										
											controlProp.properties.forEach(function(aPropToAdd){

												if (aPropToAdd.isRoot) controlToReturn[aPropToAdd.value] = '';
												if (aPropToAdd.isTemplateOptions) controlToReturn.templateOptions[aPropToAdd.value] = '';
												
											});

										}	
											
									});
								}

					    	return controlToReturn;
				    	}
						}
					}
				};
	
				return Service;

			}

		];	
		
	}]);