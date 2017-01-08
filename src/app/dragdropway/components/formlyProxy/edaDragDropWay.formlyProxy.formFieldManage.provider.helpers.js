 export const initEasyFormListControls = () => {
  return {											
    controls        : [],
    selectedControl : 'none' ,
    temporyConfig   : {
      selectedControl		: 'none',
      formlyLabel				: 'label',  
      formlyRequired		: false, 
      formlyDescription	: '',
      formlyPlaceholder	: '',
      formlyOptions 		: []
    } 
  };
};
  
export const initEasyFormEmptyConfigurationLineModel = () => {
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
};
  
export const initEmptyControlFieldModel = () => {
  return {
    'control' 		: {
      'type'  : 'none',
      'key'   : 'none'
    }	
  };  
};
  
export const initEasyFormInitialStateConfigurationModel = (_easyFormEmptyConfigurationLineModel) => {
  // commun all easy form generator ways
  return {                                
    submitButtonText 	: 'submit',
    cancelButtonText 	: 'cancel',
    lines : [].concat(_easyFormEmptyConfigurationLineModel)
  };    
};

export const initEasyFormInitialStateConfigurationModelAddOnForStepWay = () => {
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
    configStepCounter : 0  	
  };
};
  
export const initEasyFormReloadConfigurationModel = () => {
  let reloadConfigModel = initEasyFormInitialStateConfigurationModel();
  reloadConfigModel.lines = [];
  return reloadConfigModel;
};
  
// can't use arrow function here -> 'this' would be bound to caller rather than expected current returned object...  
export const initHeaderTemplates = function() {
  let headerTemplate = {
    cssClass 		: ['col-xs-12', 'col-xs-6', 'col-xs-4'],
    textContent : '',
    html_part1 	: [
                    '  <div class="'
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
                    '  </div>'
                    ].join(''), 
    simpleHtml1 : 	[
                    '<h2 class="text-center">'
                    ].join(''),
    simpleHtml2 : 	[
                    '    <h2>',
                    '    <hr/>'																
                    ].join('')						 
  };  
  return  headerTemplate; 
};
  
  
export const initFormlyControlTemplates = () => {
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
};
  
export const initParticularControlProperties = () => {
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
};
 