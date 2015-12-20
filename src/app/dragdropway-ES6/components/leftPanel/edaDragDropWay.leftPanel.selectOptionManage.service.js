/* global angular */
import * as helpers from './edaDragDropWay.leftPanel.selectOptionManage.service.helpers';

const LEFT_PANEL_SELECT_OPTION_MANAGE_SERVICE = '$selectOptionMange';


class selectOptionMange{
  
  constructor(){
    this.init();
  }
  
  init(){
    
  }
  
  initModel(selectObj){
    helpers.resetModel(selectObj);
  }
  
  isOptionUnique(selectObj, textValue){
    for (let i = selectObj.rows.length - 1; i >= 0; i--) {
      if (selectObj.rows[i].option === textValue) return false;
    }
    return true;
  }
  
  isOptionValidFormat(textValue){
    if (textValue !== '') return true;
    return false;                    
  }

  addNewOptionRadio(selectObj, newOptionText){
    let fullResponse = {
      resultFlag  : false,
      details     : ''
    };
    let checkResult = helpers.validOption(selectObj, newOptionText);  
    if (checkResult.resultFlag === true){
        let newOption = {
          option  : newOptionText,
          order   : selectObj.rows.length
        };
        selectObj.rows.push(newOption);
        fullResponse.resultFlag = true;
        fullResponse.details    = '';
        return fullResponse;
    }else{
      angular.copy(checkResult, fullResponse);                    
      return fullResponse;                        
    }
  }
  
  
  
}

selectOptionMange.$inject = [];

export default selectOptionMange;

export {
  LEFT_PANEL_SELECT_OPTION_MANAGE_SERVICE
};