const EASY_FORM_FORMLY_BINDING_MODEL_PROVIDER = 'EasyFormGenFormlyBindingModels';

function EasyFormGenFormlyBindingModels(){

  let _easyFormListControls                   =	initEasyFormListControls();
  let _easyFormEmptyConfigurationLineModel    = initEasyFormEmptyConfigurationLineModel();
  let _emptyControlFieldModel                 = initEmptyControlFieldModel();
  let _easyFormInitialStateConfigurationModel = initEasyFormInitialStateConfigurationModel();
    
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
        key: 'none',
        // templateOptions: {
        //                     label: 'none',
        //                     placeholder: 'none',
        //                     required: false,
        //                     description: 'Descriptive text'
        //                   }
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



}


EasyFormGenFormlyBindingModels.$inject = [];

export default EasyFormGenFormlyBindingModels;

export {
  EASY_FORM_FORMLY_BINDING_MODEL_PROVIDER
};