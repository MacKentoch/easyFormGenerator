const EASY_FORM_FORMLY_BINDING_MODEL_PROVIDER = 'EasyFormGenFormlyBindingModels';

function EasyFormGenFormlyBindingModels(){

  let _easyFormListControls                                   =	initEasyFormListControls();
  let _easyFormEmptyConfigurationLineModel                    = initEasyFormEmptyConfigurationLineModel();
  let _emptyControlFieldModel                                 = initEmptyControlFieldModel();
  let _easyFormInitialStateConfigurationModel                 = initEasyFormInitialStateConfigurationModel();
  let _easyFormInitialStateConfigurationModelAddOnForStepWay  = initEasyFormInitialStateConfigurationModelAddOnForStepWay();
  let _easyFormReloadConfigurationModel                       = initEasyFormReloadConfigurationModel();
  let _headerTemplates                                        = initHeaderTemplates(); 
  let _formlyControlTemplates                                 = initFormlyControlTemplates();  
  let _particularControlProperties                            = initParticularControlProperties();  
  
    
    
    
  function initEasyFormListControls(){
    return {											
      controls        : [],
      selectedControl : 'none' ,
      temporyConfig   : {
        selectedControl		: 'none',
        formlyLabel				: 'label',  
        formlyRequired		: false, 
        formlyDesciption	: '',
        formlyPlaceholder	: '',
        formlyOptions 		: []
      } 
    };
  }
  
  function initEasyFormEmptyConfigurationLineModel(){
    return {
    line 					: 1,                                       
    activeColumn 	: 1,
    columns 			: [{  
      numColumn 	: 1,
      exist 			:true, 
      control 		: {
        type:'none',
        key: 'none'
      }
    }]
    };      
  }
  
  function initEmptyControlFieldModel(){
    return {
      'control' 		: {
        'type'  : 'none',
        'key'   : 'none',
      }	
    };  
  }
  
  function initEasyFormInitialStateConfigurationModel(){
    // commun all easy form generator ways
    return {                                
      submitButtonText 	: 'submit',
      cancelButtonText 	: 'cancel',
      lines : [].concat(_easyFormEmptyConfigurationLineModel)
    };    
  }

  function initEasyFormInitialStateConfigurationModelAddOnForStepWay(){
    // specific easy form generator — step way — (not drag and drop way), needed for wizard management
    return {
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
  }
  
  function initEasyFormReloadConfigurationModel(){
    let reloadConfigModel = initEasyFormInitialStateConfigurationModel();
    reloadConfigModel.lines = [];
    return reloadConfigModel;
  }
  
  function initHeaderTemplates(){
    return {
      cssClass 		: ['col-xs-12', 'col-xs-6', 'col-xs-4'],
      textContent : '',
      html_part1 	: [
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
                      ].join(''), 
      simpleHtml1 : 	[
                      '<h2 class="text-center">'
                      ].join(''),
      simpleHtml2 : 	[
                      '    <h2>',
                      '    <hr/>',																
                      ].join('')						 
    };    
  }
  
  
  function initFormlyControlTemplates(){
    return {
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
  }
  
  function initParticularControlProperties(){
    return [
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
  }


}


EasyFormGenFormlyBindingModels.$inject = [];

export default EasyFormGenFormlyBindingModels;

export {
  EASY_FORM_FORMLY_BINDING_MODEL_PROVIDER
};