/**
 *  ------------------------------------------------------
 *  service to manage select options (used in modal to edit control)
 *  ------------------------------------------------------
 *
 *  module = "service"  selectOptionManage (manage : selects, radio...)
 *
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

;(function() {
  'use strict';


  angular
    .module('ngwfApp.services.selectOptionManage', [])
    .factory('selectOptionManage', selectOptionManage);

    selectOptionManage.$inject = [];
    function selectOptionManage(){
      var service = {
        testMe                    : testMe,
        initModel                 : initModel,
        isOptionUnique            : isOptionUnique,
        isOptionValidFormat       : isOptionValidFormat,
        addNewOptionRadio         : addNewOptionRadio,
        addNewOptionBasicSelect   : addNewOptionBasicSelect,
        addNewOptionGroupedSelect : addNewOptionGroupedSelect,
        removeOption              : removeOption,
        upthisOption              : upthisOption,
        downthisOption            : downthisOption,
      };
      return service;

      /**
       * just a test function
       */
      function testMe(){
        return 'selectOptionManage is here.';
      }
      /**
       * reset model
       */
      function initModel(selectObj){
        resetModel(selectObj);
      }

      function isOptionUnique(selectObj, textValue){
        for (var i = selectObj.rows.length - 1; i >= 0; i--) {
          if (selectObj.rows[i].option === textValue) return false;
        }
        return true;
      }

      function isOptionValidFormat(textValue){
        if (textValue !== '')  return true;
        return false;
      }

      function addNewOptionRadio(selectObj, newOptionText){
        var fullResponse = {
                              resultFlag : false,
                              details : ''
                            };

        var checkResult = validOption(selectObj, newOptionText);  
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
      }

      function addNewOptionBasicSelect(selectObj, newOptionText){
          var fullResponse = {
                                resultFlag : false,
                                details : ''
                              };

          var checkResult = validOption(selectObj, newOptionText);  
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
      }

      function addNewOptionGroupedSelect(selectObj, newOptionText, newOptionGroup){
        var fullResponse = {
                              resultFlag : false,
                              details : ''
                            };

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
      }

      function removeOption(selectObj, AtIndex) {
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
      }

      function upthisOption(selectObj, indexOption){
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
      }

      function downthisOption(selectObj, indexOption){
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






      function validOption(selectObj, newOptionText){
          var fullResponse = {
                                resultFlag  : false,
                                details     : ''
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
                fullResponse.details    = '';
                return fullResponse;
          }
          fullResponse.resultFlag = false;     
          fullResponse.details    = 'Entered option is empty';
          return fullResponse;
      }

      function resetModel(selectObj){
        var zeroModel = { rows:[] };
        angular.copy(zeroModel, selectObj);
      }
  }


})(); 