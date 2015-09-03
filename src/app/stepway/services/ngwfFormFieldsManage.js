/**
 *  ------------------------------------------------------
 *  service : formFieldManage
 *  ------------------------------------------------------
 *
 *         MOST IMPORTANT service to manage formly field model 
 *  (the presentation model and the back model or configuration model)
 * 
 *
 *  - "formlyModel" is the model exposed to view or html "fields model" (= an array of objects)
 *    This model is the one you can see in all well documented examples here : http://angular-formly.com
 *    -> in your view or html : <formly-form model="dataModel" fields="formlyModel">
 *
 *  - "configurationModel" is the model on which editing a form will work
 *    before applying results to "formlyModel"
 *
 *
 * NOTE : if you save a form to database, you will save "configurationModel" rather than "formlyModel".
 *        Why? : 
 *          since as you plan to create a form generator you can't create a finite model
 *          since you may want to be able to save the generated form even if it is not a finite model
 *          since "formlyModel" objects will be populated with a lot of properties you don't need to store contrary to "configurationModel" which contains only what you need
 *          since "formlyModel" can't be JSON.stringify when you want to use advanced layout (1 column/2/3 columns template?)
 *          since it is better approach to use a backgroundModel (async operation ...) that is bind to presentation model only when it is fully ready or filled.
 *
 *
 * NOTE : 
 * - if you want to manage more columns templates (right now only manage up to 3 columns), just inspire from existing code
 * - if you want to extend easy form generator, be sure to be a minimum comfortable with "angular formly": http://angular-formly.com
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

;(function () {
  'use strict';




  angular
    .module('ngwfApp.services.formFieldManage', [])
    .factory('formFieldManage', formFieldManage);

    formFieldManage.$inject = [];

    function formFieldManage(){

      var service = {
        initConfigurationEditFromScratch : initConfigurationEditFromScratch,
        bindConfigurationLines           : bindConfigurationLines,
        applyConfigurationToformlyModel  : applyConfigurationToformlyModel 
      };
      return service;


      function initConfigurationEditFromScratch(configurationModel){
        var configurationModelInit = {
          activeLine: 1,   
          listConfigStep: [
                            'init',
                            'first',
                            'second',
                            'third'
                          ],
          stepIndicators:  [
                              true,
                              false,
                              false,
                              false
                            ], 
          configStepCounter : 0, 
          submitButtonText  : 'submit',
          cancelButtonText  : 'cancel',
          lines: [
                  {
                    line:1,                                       
                    activeColumn : 1,
                    columns: [
                              {  
                                numColumn: 1,
                                exist:true, 
                                control: {
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
        angular.copy(configurationModelInit, configurationModel);                         
      }

      function bindConfigurationLines(configurationModel, lines){
        if( Object.prototype.toString.call(lines) === '[object Array]' ) {
          var configurationModelResult = {
            activeLine: 1,   
            listConfigStep: [
                              'init',
                              'first',
                              'second',
                              'third'
                            ],
            stepIndicators:  [
                                true,
                                false,
                                false,
                                false
                              ], 
            configStepCounter: 0, 
            submitButtonText : 'submit',
            cancelButtonText: 'cancel',
            lines: []
          };
          configurationModelResult.lines = [].concat(lines);  
                    
          angular.copy(configurationModelResult, configurationModel);                                         

          return getMessageObject('configuration model is bound','lines are bound to configuration model.');
        }else{
          return getErrorObject('lines is not an array', 'Checks lines type, it is not an array.');
        }
      }

      function applyConfigurationToformlyModel(configurationModel, formlyModel, formlyDataModel){
        resetFormlyModel(formlyModel);
        resetDataModel(formlyDataModel);
        /**
         * manage header here line0 
         */
        var lineNumber = configurationModel.lines.length;
        for (var i = 0; i < lineNumber; i++) {
            //1 column line control
            if (configurationModel.lines[i].columns.length === 1) {
              //test if template control = header
              if (configurationModel.lines[i].columns[0].control.type === 'header') {
                addOneColumnHeader(formlyModel, configurationModel, i);
              }else{
                addOneColumnControl(formlyModel, configurationModel, i);  
              }          
            }
            if (configurationModel.lines[i].columns.length === 2) {
              addTwoColumnControl(formlyModel, configurationModel,i);
            }
            if (configurationModel.lines[i].columns.length === 3) {
              addThreeColumnControl(formlyModel, configurationModel,i);
            }
        }
      }

      function resetFormlyModel(formlyModel){
        var resetformly = [];
        angular.copy(resetformly, formlyModel);
      }



      function addOneColumnHeader(formlyModel, configurationModel,lineIndex){
        /**
         * text header is stored in "description" in templateOtion model 
         */
        var headerTemplateCol0 = '<div class="row"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><h2 class="text-center">' + extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control) + '<h2></div></div><hr/>';

        formlyModel.push(
          {
            template: typeof configurationModel
                                    .lines[lineIndex]
                                    .columns[0]
                                    .control
                                    .type !== 'undefined' ? (configurationModel.lines[lineIndex].columns[0].control.type === 'header' ? headerTemplateCol0 : '<div></div>') : '<div></div>'
          }
        );
      }

      function addDatepickerPopupProperty(fieldToPush, configurationModel,lineIndex){
          fieldToPush.templateOptions.datepickerPopup = extractTemplateOptionDatepickerPopup(configurationModel.lines[lineIndex].columns[0].control);
      }

      function addOneColumnControl(formlyModel, configurationModel,lineIndex){
        var fieldToPush = {
          className: 'col-xs-12',
          type: typeof configurationModel.lines[lineIndex].columns[0].control.type !== 'undefined' ? (configurationModel.lines[lineIndex].columns[0].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[0].control.type): 'blank',
          key: typeof configurationModel.lines[lineIndex].columns[0].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[0].control.key : 'blank' + Date.now(),
          templateOptions: {
            type                  : extractTemplateOptionType(configurationModel.lines[lineIndex].columns[0].control),
            label                 : extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[0].control),
            required              : extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[0].control),
            placeholder           : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[0].control),
            description           : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control),
            options               : extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[0].control)
          },
          expressionProperties  : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[0].control),
          validators            : extractFormlyValidators(configurationModel.lines[lineIndex].columns[0].control),
          validation            : extractFormlyValidation(configurationModel.lines[lineIndex].columns[0].control)
        };
        //////////////////////////////////////////////                  
        //datepicker additionnal particular property  
        //////////////////////////////////////////////                  
        if (configurationModel.lines[lineIndex].columns[0].control.type === 'datepicker') {
          addDatepickerPopupProperty(fieldToPush, configurationModel,lineIndex);
        }     

        formlyModel.push( 
          fieldToPush
        );
      }    

      function addTwoColumnControl(formlyModel, configurationModel,lineIndex){

        //text header is stored in "description" in templateOtion model
        var headerTemplateCol0 =  {
                                    className: 'col-xs-6',
                                    template : '<div class="row"><div class=""><h2 class="text-center">' + extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control) + '<h2><hr/></div></div>'
                                  };

        var headerTemplateCol1 =  {
                                    className: 'col-xs-6',
                                   template:'<div class="row"><div class=""><h2 class="text-center">' + extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[1].control) + '<h2><hr/></div></div>'
                                  };

        var controlCol0 =     {
            className: 'col-xs-6',
            type: typeof configurationModel.lines[lineIndex].columns[0].control.type !== 'undefined' ? (configurationModel.lines[lineIndex].columns[0].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[0].control.type): 'blank',
            key: typeof configurationModel.lines[lineIndex].columns[0].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[0].control.key : 'blank' + Date.now(),
            templateOptions: {
                type: extractTemplateOptionType(configurationModel.lines[lineIndex].columns[0].control),
                label: extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[0].control),
                required : extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[0].control),
                placeholder : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[0].control),
                description : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control),
                options : extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[0].control)
            },
                expressionProperties : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[0].control),
                validators : extractFormlyValidators(configurationModel.lines[lineIndex].columns[0].control),
                validation : extractFormlyValidation(configurationModel.lines[lineIndex].columns[0].control)                                  
          };
        //////////////////////////////////////////////                  
        //datepicker additionnal particular property  
        //////////////////////////////////////////////                  
        if (configurationModel.lines[lineIndex].columns[0].control.type === 'datepicker') {
          addDatepickerPopupProperty(controlCol0, configurationModel,lineIndex);
        }                            

        var controlCol1 =  {
                  className: 'col-xs-6',
                  type: typeof configurationModel.lines[lineIndex].columns[1].control.type !== 'undefined' ?  (configurationModel.lines[lineIndex].columns[1].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[1].control.type) : 'blank',
                  key: typeof configurationModel.lines[lineIndex].columns[1].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[1].control.key : 'blank' + Date.now(),
                  templateOptions: {
                      type: extractTemplateOptionType(configurationModel.lines[lineIndex].columns[1].control),
                      label: extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[1].control),
                      required : extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[1].control),
                      placeholder : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[1].control),
                      description : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[1].control),
                      options : extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[1].control)
                  },
                      expressionProperties : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[1].control),
                      validators : extractFormlyValidators(configurationModel.lines[lineIndex].columns[1].control),
                      validation : extractFormlyValidation(configurationModel.lines[lineIndex].columns[1].control)                                  
          };

        //////////////////////////////////////////////                  
        //datepicker additionnal particular property  
        //////////////////////////////////////////////                  
        if (configurationModel.lines[lineIndex].columns[1].control.type === 'datepicker') {
          addDatepickerPopupProperty(controlCol1, configurationModel,lineIndex);
        }                                

        var FieldGroup = [];

        if (configurationModel.lines[lineIndex].columns[0].control.type === 'header') {
          FieldGroup.push(headerTemplateCol0);
        }else{
          FieldGroup.push(controlCol0);
        }
         
        if (configurationModel.lines[lineIndex].columns[1].control.type === 'header') {
          FieldGroup.push(headerTemplateCol1);
        }else{
          FieldGroup.push(controlCol1);
        }    

        formlyModel.push(
           {
              className: 'row', 
              fieldGroup: FieldGroup
            }
        );
      }

      function addThreeColumnControl(formlyModel, configurationModel,lineIndex){
        //text header is stored in "description" in templateOtion model
        var headerTemplateCol0 =  {
                                    className: 'col-xs-4',
                                    template : '<div class="row"><div class=""><h2 class="text-center">' + extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control) + '<h2><hr/></div></div>'
                                  };

        var headerTemplateCol1 =  {
                                    className: 'col-xs-4',
                                   template:'<div class="row"><div class=""><h2 class="text-center">' + extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[1].control) + '<h2><hr/></div></div>'
                                  };

        var headerTemplateCol2 =  {
                                    className: 'col-xs-4',
                                   template:'<div class="row"><div class=""><h2 class="text-center">' + extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[2].control) + '<h2><hr/></div></div>'
                                  };
      
        var controlCol0 =     {
                                  className: 'col-xs-4',
                                  type: typeof configurationModel.lines[lineIndex].columns[0].control.type !== 'undefined' ? (configurationModel.lines[lineIndex].columns[0].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[0].control.type): 'blank',
                                  key: typeof configurationModel.lines[lineIndex].columns[0].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[0].control.key : 'blank' + Date.now(),
                                  templateOptions: {
                                      type: extractTemplateOptionType(configurationModel.lines[lineIndex].columns[0].control),
                                      label: extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[0].control),
                                      required : extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[0].control),
                                      placeholder : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[0].control),
                                      description : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control),
                                      options : extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[0].control)                                              
                                  },
                                      expressionProperties : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[0].control),
                                      validators : extractFormlyValidators(configurationModel.lines[lineIndex].columns[0].control),
                                      validation : extractFormlyValidation(configurationModel.lines[lineIndex].columns[0].control)                                   
                                };
        //////////////////////////////////////////////                  
        //datepicker additionnal particular property  
        //////////////////////////////////////////////                  
        if (configurationModel.lines[lineIndex].columns[0].control.type === 'datepicker') {
          addDatepickerPopupProperty(controlCol0, configurationModel,lineIndex);
        }                             

        var controlCol1 =  {
                                  className: 'col-xs-4',
                                  type: typeof configurationModel.lines[lineIndex].columns[1].control.type !== 'undefined' ?  (configurationModel.lines[lineIndex].columns[1].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[1].control.type) : 'blank',
                                  key: typeof configurationModel.lines[lineIndex].columns[1].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[1].control.key : 'blank' + Date.now(),
                                  templateOptions: {
                                      type: extractTemplateOptionType(configurationModel.lines[lineIndex].columns[1].control),
                                      label: extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[1].control),
                                      required : extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[1].control),
                                      placeholder : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[1].control),
                                      description : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[1].control),
                                      options : extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[1].control)                                               
                                  },
                                      expressionProperties : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[1].control),
                                      validators : extractFormlyValidators(configurationModel.lines[lineIndex].columns[1].control),
                                      validation : extractFormlyValidation(configurationModel.lines[lineIndex].columns[1].control)                                  
                          };
        //////////////////////////////////////////////                  
        //datepicker additionnal particular property  
        //////////////////////////////////////////////                  
        if (configurationModel.lines[lineIndex].columns[1].control.type === 'datepicker') {
          addDatepickerPopupProperty(controlCol1, configurationModel,lineIndex);
        }                       
        var controlCol2 =  {
                                  className: 'col-xs-4',
                                  type: typeof configurationModel.lines[lineIndex].columns[2].control.type !== 'undefined' ?  (configurationModel.lines[lineIndex].columns[2].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[2].control.type) : 'blank',
                                  key: typeof configurationModel.lines[lineIndex].columns[2].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[2].control.key : 'blank' + Date.now(),
                                  templateOptions: {
                                      type: extractTemplateOptionType(configurationModel.lines[lineIndex].columns[2].control),
                                      label: extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[2].control),
                                      required : extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[2].control),
                                      placeholder : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[2].control),
                                      description : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[2].control),
                                      options : extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[2].control)                                              
                                  },
                                      expressionProperties : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[2].control),
                                      validators : extractFormlyValidators(configurationModel.lines[lineIndex].columns[2].control),
                                      validation : extractFormlyValidation(configurationModel.lines[lineIndex].columns[2].control)                                   
                          };
        //////////////////////////////////////////////                  
        //datepicker additionnal particular property  
        //////////////////////////////////////////////                  
        if (configurationModel.lines[lineIndex].columns[2].control.type === 'datepicker') {
          addDatepickerPopupProperty(controlCol2, configurationModel,lineIndex);
        }     

        var FieldGroup = [];

        if (configurationModel.lines[lineIndex].columns[0].control.type === 'header') {
          FieldGroup.push(headerTemplateCol0);
        }else{
          FieldGroup.push(controlCol0);
        }
         
        if (configurationModel.lines[lineIndex].columns[1].control.type === 'header') {
          FieldGroup.push(headerTemplateCol1);
        }else{
          FieldGroup.push(controlCol1);
        }    

        if (configurationModel.lines[lineIndex].columns[2].control.type === 'header') {
          FieldGroup.push(headerTemplateCol2);
        }else{
          FieldGroup.push(controlCol2);
        }    


        formlyModel.push(
           {
              className: 'row', 
              fieldGroup: FieldGroup
            }
        );
      }

      function isTemplateOptionDefined(obj){
        return typeof obj.templateOptions !== 'undefined' ? true : false;
      }

      function extractTemplateOptionLabel(obj){
       return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.label !== 'undefined'? obj.templateOptions.label: '') : '';
      }


      function extractTemplateOptionDatepickerPopup(obj){
        return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.datepickerPopup !== 'undefined'? obj.templateOptions.datepickerPopup: '') : '';
      }

      function extractFormlyExpressionProperties(obj){
        return  typeof obj.formlyExpressionProperties !== 'undefined' ? angular.copy(obj.formlyExpressionProperties) : {};
      }

      function extractFormlyValidators(obj){
        return  typeof obj.formlyValidators !== 'undefined' ? angular.copy(obj.formlyValidators): {};
      }

      function extractFormlyValidation(obj){
        return  typeof obj.formlyValidation !== 'undefined' ?  angular.copy(obj.formlyValidation) : {};
      }

      function extractTemplateOptionRequired(obj){
        return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.required !== 'undefined'? obj.templateOptions.required: '') : '';
      }

      function extractTemplateOptionOptions(obj){
        return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.options !== 'undefined'? obj.templateOptions.options: '') : '';
      }

      function extractTemplateOptionType(obj){
        return  typeof obj.subtype !== 'undefined'? obj.subtype: '';
      }

      function extractTemplateOptionPlaceholder(obj){
        return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.placeholder !== 'undefined'? obj.templateOptions.placeholder: '') : '';
      }

      function extractTemplateOptionDescription(obj){
        return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.description !== 'undefined'? obj.templateOptions.description: '') : '';
      }

      function resetDataModel(obj){
        var emptyDataModel = {};
        angular.copy(emptyDataModel, obj);
        return true;
      }

      function getErrorObject(errorTitle, errorMessage){

        var messageObj = {
          noError : false,
          title: '',
          Message: ''  
        };

        messageObj.noError = false;
        messageObj.title = errorTitle;
        messageObj.Message = errorMessage;
        return messageObj;
      }

      function getMessageObject(messageTitle, messageBody){
        var messageObj = {
          noError : false,
          title: '',
          Message: ''  
        };

        messageObj.noError = true;
        messageObj.title = messageTitle;
        messageObj.Message = messageBody;
        return messageObj;
      }    


    }



})(); 
