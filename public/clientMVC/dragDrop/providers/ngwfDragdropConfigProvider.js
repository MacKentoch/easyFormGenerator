/**
 *  ------------------------------------------------------
 *   dragDropConfigProvider
 *  ------------------------------------------------------ 
 *
 * All customizations to "easy form generator - drag and drop version - " will be placed here
 *
 * customize it in your in module_app.config 
 * then use service in your application
 *
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
 */

angular
  .module('ngwfApp.providers.dragDropConfigProvider', [])
  .provider('dragDropConfig', [function(){

  /**
   * default drag drop item classes
   * 
   * -> by default : up to 3 items per rows
   */
  var _listDragDropItemCssClasses = [
                                        {
                                            cssClass : 'col-md-12', 
                                            numberItemPerRow: 0
                                        },
                                        {
                                            cssClass : 'col-md-12', 
                                            numberItemPerRow: 1
                                        },                                        
                                        {
                                            cssClass : 'col-md-6', 
                                            numberItemPerRow: 2
                                        },
                                        {
                                            cssClass : 'col-md-4', 
                                            numberItemPerRow: 3
                                        }
                                      ]; 
  /**
   * _initListControls  : default list of control to present as integratable to form.
   *
   * easyFormGenerator (no drag drop version) need this object in the modal when adding control to row. 
   *
   * works in, pair with formlyProvider in case of special control like 'RichTextEditor' 
   */
  var _initListControls = {

                    controls : [
                                {
                                    id: 'empty',  
                                    name: 'no control', 
                                    subtitle: 'no control', 
                                    group: 'Blank', 
                                    formlyType: 'blank', 
                                    formlySubtype: '', 
                                    formlyLabel: '', 
                                    formlyRequired: false, 
                                    formlyDesciption: '', 
                                    formlyOptions: []
                                  },
                                {
                                  id: 'Header',  
                                  name: 'Header', 
                                  subtitle: 'no control', 
                                  group: 'Decoration', 
                                  formlyType: 'header"', 
                                  formlySubtype: '', 
                                  formlyLabel: '', 
                                  formlyRequired: false, 
                                  formlyDesciption: '', 
                                  formlyOptions: []
                                },
                                {
                                  id: 'Subtitle',  
                                  name: 'Subtitle', 
                                  subtitle: 'no control', 
                                  group: 'Decoration', 
                                  formlyType: 'subTitle', 
                                  formlySubtype: '', 
                                  formlyLabel: '', 
                                  formlyRequired: false, 
                                  formlyDesciption: '', 
                                  formlyOptions: []
                                },
                                {
                                  id: 'TextInput',  
                                  name: 'Text input', 
                                  subtitle: 'Text input', 
                                  group: 'input', 
                                  formlyType: 'input', 
                                  formlySubtype: '', 
                                  formlyLabel: '', 
                                  formlyRequired: false, 
                                  formlyDesciption: '', 
                                  formlyOptions: []
                                },
                                {
                                  id: 'Password',  
                                  name: 'Password', 
                                  subtitle: 'Password', 
                                  group: 'input', 
                                  formlyType: 'input', 
                                  formlySubtype: 'password', 
                                  formlyLabel: '', 
                                  formlyRequired: false, 
                                  formlyDesciption: '', 
                                  formlyOptions: []
                                },
                                {
                                  id: 'Date',  
                                  name: 'Date', 
                                  subtitle: 'Date', 
                                  group: 'input', 
                                  formlyType: 'datepicker', 
                                  formlySubtype: '', 
                                  formlyLabel: '', 
                                  formlyRequired: false, 
                                  formlyDesciption: '', 
                                  formlyOptions: [], 
                                  datepickerPopup: 'dd-MMMM-yyyy'
                                },
                                {
                                  id: 'Texarea', 
                                  name: 'Textarea', 
                                  subtitle: 'Textarea', 
                                  group: 'Textarea', 
                                  formlyType: 'textarea', 
                                  formlySubtype: '', 
                                  formlyLabel: '', 
                                  formlyRequired: false, 
                                  formlyDesciption: '', 
                                  formlyOptions: []
                                },
                                {
                                  id: 'RichTextEditor', 
                                  name: 'RichTextEditor', 
                                  subtitle: 'RichTextEditor', 
                                  group: 'Textarea', 
                                  formlyType: 'richEditor', 
                                  formlySubtype: '', 
                                  formlyLabel: '', 
                                  formlyRequired: false, 
                                  formlyDesciption: '', 
                                  formlyOptions: []
                                },
                                {
                                  id: 'Radio', 
                                  name: 'Radio', 
                                  subtitle: 'Radio', 
                                  options: [], 
                                  group: 'Radio', 
                                  formlyType: 'radio', 
                                  formlySubtype: '', 
                                  formlyLabel: '', 
                                  formlyRequired: false, 
                                  formlyDesciption: '', 
                                  formlyOptions: []
                                },
                                {
                                  id: 'Checkbox', 
                                  name: 'Checkbox', 
                                  subtitle: 'Checkbox', 
                                  group: 'Checkbox', 
                                  formlyType: 'checkbox', 
                                  formlySubtype: '', 
                                  formlyLabel: '', 
                                  formlyRequired: false, 
                                  formlyDesciption: '', 
                                  formlyOptions: []
                                },
                                {
                                  id: 'BasicSelect', 
                                  name: 'Basic select', 
                                  subtitle: 'Basic select',
                                  options: [], 
                                  group: 'Select', 
                                  formlyType: 'basicSelect', 
                                  formlySubtype: '', 
                                  formlyLabel: '', 
                                  formlyRequired: false, 
                                  formlyDesciption: '', 
                                  formlyOptions: []
                                },
                                {
                                  id: 'GroupedSelect', 
                                  name: 'Grouped Select', 
                                  subtitle: 'Grouped Select',
                                  options: [], 
                                  group: 'Select', 
                                  formlyType: 'groupedSelect', 
                                  formlySubtype: '', 
                                  formlyLabel: '', 
                                  formlyRequired: false, 
                                  formlyDesciption: '',
                                  formlyOptions: []
                                }
                              ],

                      selectedControl : 'none' ,
                      temporyConfig : {
                                        selectedControl: 'none',
                                        formlyLabel: 'label', 
                                        formlyRequired: false, 
                                        formlyDesciption: '',
                                        formlyPlaceholder: '',
                                        formlyOptions : []
                                      } 

    };                                               

  var _itemsNotToCountFoReal = {
                                  //placeholder :         '',
                                  itemBeingDragged :    ''
                                };
  /**
   * setListItemCssClass : to use in app.config
   * -> if need to overrides/modify "_defaultDragDropItemCssClasses"
   */
  this.setListItemCssClass = function(fromConfig){
              _listDragDropItemCssClasses = [].concat(fromConfig);
            };            
  this.getItemsNotTocount = function(){
              return _itemsNotToCountFoReal;
            };          
  this.setItemsNotTocount = function(fromConfig){
              _itemsNotToCountFoReal = angular.copy(fromConfig);
            };

  this.$get = [function(){

          
          var Service = {};

          Service.getListItemCssClass = function(){                                               
                            return _listDragDropItemCssClasses;
                          };

          Service.getListControls = function(){
                            return _initListControls;
                          };
          //when counting items in a line : need to skip placeholder and hidden dragging source
          //to get the right css to apply visible items                
          Service.getItemsNotToCount = function(){
                            return _itemsNotToCountFoReal;
                          }; 
          //return css class to apply depending numberOfItems (in line) as input param                
          Service.getItemCssDependingNumberItemsInRow =  function(numberOfItems){
                          if(typeof numberOfItems !== 'undefined'){
                            var classToReturn = '';
                            for (var i = _listDragDropItemCssClasses.length - 1; i >= 0; i--) {
                              if (_listDragDropItemCssClasses[i].numberItemPerRow === numberOfItems) {
                                classToReturn = _listDragDropItemCssClasses[i].cssClass;  
                              }
                            }
                            return classToReturn;
                          }else{
                            return '';
                          }     
                        };                                          
                           
          return Service;
        } 
      ];
}]);