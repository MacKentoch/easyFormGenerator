/* global angular */
const resetModel = (selectObj) => {
  let zeroModel = { rows:[] };
  angular.copy(zeroModel, selectObj);
};


const validOption = (selectObj, newOptionText) => {
  let fullResponse = {
    resultFlag : false,
    details : ''
  };
  if (typeof newOptionText === 'undefined') {
    fullResponse.resultFlag = false;
    fullResponse.details    = 'Entered option is empty';
    return fullResponse;
  }
  if (newOptionText !== '') {
    for (var i = selectObj.rows.length - 1; i >= 0; i--) {
      if (selectObj.rows[i].option === newOptionText) {
        fullResponse.resultFlag = false;
        fullResponse.details    = 'Entered option is not unique';
        return fullResponse;
      }
    }
    fullResponse.resultFlag = true;
    fullResponse.details = '';
    return fullResponse;
  }
  fullResponse.resultFlag = false;     
  fullResponse.details = 'Entered option is empty';
  return fullResponse;
};

export {
  resetModel,
  validOption
};
