import { configs } from '../../components/controls';

const resetNyaSelect = (nyaSelectObj) => {
  //reset
  angular.copy(
    { 
      controls: [...configs],
      selectedControl : 'none' ,
      temporyConfig : {
        selectedControl: 'none',
        formlyLabel: 'label', 
        formlyRequired: false, 
        formlyDescription: '',
        formlyPlaceholder: '',
        formlyDefaultValue: '',
        formlyOptions : [],
        //expressions/validation fields
        formlyExpressionProperties: {},
        formlyValidators: {},
        formlyValidation: {}                                        
      } 
    }, 
    nyaSelectObj);
  return true;
};

const getResetConfig = () => {
  return {
    formlyLabel: '',
    formlyRequired: false,
    formlyPlaceholder: '',
    formlyDescription: '',
    formlyDefaultValue: '',
    formlyOptions: []
  };
};

/**
  * data passed back to parent controller
  * after control being finsihed editing in modal
  */
const returnControlFromAddCtrlModalModel = (CtrlModalModel) =>{
  if (CtrlModalModel && CtrlModalModel.selectedControl && Array.isArray(CtrlModalModel.controls)) {
    const selectedControl = CtrlModalModel.selectedControl;
    const controlRef = CtrlModalModel.controls.find(control => control.id === selectedControl);
    // return a deep copy of selected control:
    if (controlRef) {
      const returnCtrl = {
        selectedControl: selectedControl ,
        formlyType : controlRef.formlyType,
        formlySubtype: controlRef.formlySubtype,
        formlyLabel: controlRef.formlyLabel,
        formlyRequired : controlRef.formlyRequired,
        formlyDescription: controlRef.formlyDescription,
        formlyPlaceholder: controlRef.formlyPlaceholder,
        formlyOptions: [...controlRef.formlyOptions],
        //validation fields
        formlyExpressionProperties: angular.copy(controlRef.formlyExpressionProperties),
        formlyValidators: angular.copy(controlRef.formlyValidators),
        formlyValidation: angular.copy(controlRef.formlyValidation)
      };
      // particular case: date picker needs an additional property
      if (controlRef.formlyType === 'datepicker') {
        returnCtrl.datepickerOptions = controlRef.datepickerOptions;
      }
      return returnCtrl;
    }
  }
  // by default: returns an empty control object:
  return {
    selectedControl: 'none',
    formlyType : 'none',
    formlySubtype: 'none',
    formlyLabel: '',
    formlyRequired : false,
    formlyDescription: '',
    formlyPlaceholder: '',
    formlyOptions: [],
    //validation fields
    formlyExpressionProperties: {},
    formlyValidators: {},
    formlyValidation: {}
  };
};

/**
  * validKeyUniqueness
  * to be sure the "keys" are unique (in same formly field model)
  */
const validKeyUniqueness = (thisKey, configurationObj) => {
  const lines = configurationObj.lines;
  return !lines
              .map(line => line.columns.some(column => column.control.key === thisKey))
              .reduce((prev, next) => prev || next, false);
};

export {
  resetNyaSelect,
  returnControlFromAddCtrlModalModel,
  validKeyUniqueness,
  getResetConfig

};
