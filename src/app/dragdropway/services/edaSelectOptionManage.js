///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// service to manage select options (used in modal to edit control)
//
//  module = "service"  selectOptionManage (manage : selects, radio...)
//  ------------------------------------------------------
//      Syntax (convention) :
//          "edaApp" = application
//          "edaApp.services.serviceNAME" = container services module
//
//  This module is a service -> it must be injected in services container
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
angular
  .module('edaApp.services.selectOptionManage', [])
  .factory('selectOptionManage', [ function(){
	//console.log('--> INIT : Hello service  \'\'selectOptionManage\'\' ');

    return {
            testMe: function() {
                return 'selectOptionManage is here.';
            },

            initModel: function(selectObj){
              resetModel(selectObj);
            },
        
            isOptionUnique: function(selectObj, textValue){
              for (var i = selectObj.rows.length - 1; i >= 0; i--) {

                if (selectObj.rows[i].option === textValue) {
                  return false;
                }
                
              }
              return true;
            },

            //test if not empty string (= full space string is not conidered as valid)
            isOptionValidFormat: function(textValue){
              if (textValue !== '') {
                return true;
              }
              return false;                    
            },

            addNewOptionRadio: function(selectObj, newOptionText){
              var fullResponse = {
                                    resultFlag : false,
                                    details : ''
                                  };

              var checkResult = validOption(selectObj, newOptionText);  

              //console.info(checkResult);

              if (checkResult.resultFlag === true){

                  var newOption = {
                                      option: newOptionText,
                                      order: selectObj.rows.length
                                  };

                  selectObj.rows.push(newOption);
                  fullResponse.resultFlag = true;
                  fullResponse.details = '';
                  return fullResponse;
              }else{

                    angular.copy(checkResult, fullResponse);                    
                    return fullResponse;                        
              }


            },


            addNewOptionBasicSelect: function(selectObj, newOptionText){
              var fullResponse = {
                                    resultFlag : false,
                                    details : ''
                                  };

              var checkResult = validOption(selectObj, newOptionText);  

              //console.info(checkResult);

              if (checkResult.resultFlag === true){

                  var newOption = {
                                      option: newOptionText,
                                      order: selectObj.rows.length
                                  };

                  selectObj.rows.push(newOption);
                  fullResponse.resultFlag = true;
                  fullResponse.details = '';
                  return fullResponse;
              }else{

                    angular.copy(checkResult, fullResponse);                    
                    return fullResponse;                        
              }


            },

            addNewOptionGroupedSelect: function(selectObj, newOptionText, newOptionGroup){
              var fullResponse = {
                                    resultFlag : false,
                                    details : ''
                                  };

              // if (typeof newOptionGroup === "undefined") {

              //     fullResponse.resultFlag = false;
              //     fullResponse.details = "Group option is undefined";
              //     return fullResponse;
              // }

              // if (newOptionGroup === "") {

              //     fullResponse.resultFlag = false;
              //     fullResponse.details = "Group option is undefined";
              //     return fullResponse;
              // }

              var checkResult = validOption(selectObj, newOptionText);  

          
              if (checkResult.resultFlag === true){

                  var newOption = {
                                      option: newOptionText,
                                      group: newOptionGroup,
                                      order: selectObj.rows.length
                                  };

                  selectObj.rows.push(newOption);
                  fullResponse.resultFlag = true;
                  fullResponse.details = '';
                  return fullResponse;
              }else{

                    angular.copy(checkResult, fullResponse);                    
                    return fullResponse;                        
              }

            },


            removeOption:  function(selectObj, AtIndex) {
              var fullResponse = {
                                  resultFlag : false,
                                  details : ''
                                };

              if (AtIndex !== -1) {
                  selectObj.rows.splice(AtIndex, 1);
                  fullResponse.resultFlag = true;
                  fullResponse.details= '';
                  return fullResponse;
              }else{
                  fullResponse.resultFlag = false;
                  fullResponse.details= 'Option index not valid';
                  return fullResponse;
              }
            },

            upthisOption : function(selectObj, indexOption){
              var fullResponse = {
                                  resultFlag : false,
                                  details : ''
                                };  

              if (indexOption > -1) {

                if (indexOption > 0) {

                  if (selectObj.rows[indexOption - 1]) {
                    var currentOption = selectObj.rows[indexOption];
                    selectObj.rows.splice(indexOption , 1);
                    selectObj.rows.splice((indexOption - 1), 0, currentOption); 

                    fullResponse.resultFlag = true;
                    fullResponse.details = '';
                    return fullResponse;
                  }else{
                    fullResponse.resultFlag = false;
                    fullResponse.details = 'Can\'t retreive option from option index';
                    return fullResponse;
                  }
                }else{
                    fullResponse.resultFlag = true;
                    fullResponse.details = '';
                    return fullResponse;
                }  

              }else{
                fullResponse.resultFlag = false;
                fullResponse.details = 'Option index not valid';
                return fullResponse;
              }
          },

          downthisOption : function(selectObj, indexOption){
              var fullResponse = {
                                  resultFlag : false,
                                  details : ''
                                };

              if (indexOption > -1) {
  

                if (indexOption < selectObj.rows.length - 1){
                  

                  if (selectObj.rows[indexOption + 1]) {
                    

                    var currentOption = selectObj.rows[indexOption];
                    
                    selectObj.rows.splice(indexOption , 1);
                    selectObj.rows.splice((indexOption + 1), 0, currentOption);  

                    fullResponse.resultFlag = true;
                    fullResponse.details = '';
                    return fullResponse;  

                  }else{
                    fullResponse.resultFlag = false;
                    fullResponse.details = 'Can\'t retreive option from option index';
                    return fullResponse;
                  }
                }else{

                  
                    fullResponse.resultFlag = true;
                    fullResponse.details = '';
                  return fullResponse;
                }


              }else{
                fullResponse.resultFlag = false;
                fullResponse.details = 'Option index not valid';
                return fullResponse;
              }

          }

      



        };




function validOption(selectObj, newOptionText){
    var fullResponse = {
                          resultFlag : false,
                          details : ''
                        };

    if (typeof newOptionText === 'undefined') {
        fullResponse.resultFlag = false;
        fullResponse.details = 'Entered option is empty';
        return fullResponse;
    }

    if (newOptionText !== '') {
          for (var i = selectObj.rows.length - 1; i >= 0; i--) {
            if (selectObj.rows[i].option === newOptionText) {
              fullResponse.resultFlag = false;
              fullResponse.details = 'Entered option is not unique';
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
}

function resetModel(selectObj){
  var zeroModel = { 
                      rows:[]
                    };
  angular.copy(zeroModel, selectObj);
}


}]);





