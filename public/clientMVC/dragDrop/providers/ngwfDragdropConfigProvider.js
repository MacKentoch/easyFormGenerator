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
  .provider('dragDropConfig', [

    function(){

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

      /** easyFormDragDropProperties 
       *
       * drag and drop appearance configuration properties
       */
      var _dragDropConfigModel =  {
          dropZoneConfig : {
                                decoration :  [
                                                {
                                                  WhenIndex: 0,
                                                  ApplycssClass: 'col-md-4', 
                                                  fontAwesomeIcon: 'fa fa-level-up',
                                                  title: 'Drag control from here : '
                                                },
                                                {
                                                  WhenIndex: 1,
                                                  ApplycssClass: 'col-md-8', 
                                                  fontAwesomeIcon: 'fa fa-level-down',
                                                  title: 'Drop control into here : '
                                                }
                                              ],
                                verboseMode : false
                            },
          containerConfig : {
                                decoration :    [
                                                  {
                                                    WhenIndex: 0,
                                                    ApplycssClass: 'col-md-12', 
                                                    title: 'Headers : '
                                                  },
                                                  {
                                                    WhenIndex: 1,
                                                    ApplycssClass: 'col-md-12', 
                                                    title: 'Text inputs : '
                                                  },
                                                  {
                                                    WhenIndex: 2,
                                                    ApplycssClass : 'col-md-12',
                                                    title : 'textarea'
                                                  },
                                                  {
                                                    WhenIndex: 3,
                                                    ApplycssClass : 'col-md-12',
                                                    title : 'radio'
                                                  }                                                      
                                                ],

                                verboseMode     : false, 
                                collapseEnabled : true,
                                collapseCtrl    : [
                                                    {
                                                      atIndex : 0,
                                                      collapse : true
                                                    },
                                                    {
                                                      atIndex : 1,
                                                      collapse : true
                                                    }
                                                  ]                                                                  
                            },
          itemConfig    :   {
                              verboseMode : false, 
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

      this.$get = [

        function(){
    
          var Service = {};

          Service.getListItemCssClass = function(){                                               
                                        return _listDragDropItemCssClasses;
                                        };

          // Service.getListControls = function(){
          //                           return _initListControls;
          //                           };
          
          /**
           * when counting items in a line : need to skip placeholder and hidden dragging source
           * to get the right css to apply visible items
           */
          Service.getItemsNotToCount = function(){
                                      return _itemsNotToCountFoReal;
                                      }; 
         
          /**
           * return css class to apply depending numberOfItems (in line) as input param                 
           */
          Service.getItemCssDependingNumberItemsInRow =  function(numberOfItems){
                                                          if(typeof numberOfItems !== 'undefined'){
                                                            var classToReturn = '';
                                                            for (var  i = _listDragDropItemCssClasses.length - 1; 
                                                                      i >= 0; 
                                                                      i--) {
                                                              if (_listDragDropItemCssClasses[i].numberItemPerRow === numberOfItems) {
                                                                classToReturn = _listDragDropItemCssClasses[i].cssClass;  
                                                              }
                                                            }
                                                            return classToReturn;
                                                          }else{
                                                            return '';
                                                          }     
                                                          };                                          
               
          Service.getDistinctItemCssClass = function(){
                                              var distinctCssClass = [];
                                              angular.forEach(_listDragDropItemCssClasses, function(valueRef){

                                                var cssClassRef = valueRef.cssClass;

                                                if (distinctCssClass.length === 0){
                                                  distinctCssClass.push(cssClassRef);
                                                } else {
                                                  var canAdd = true;

                                                  angular.forEach(distinctCssClass, function(valueProc){
                                                    var cssClassProc = valueProc;

                                                    if (cssClassRef === cssClassProc) {
                                                      canAdd = false;
                                                    }

                                                  });

                                                  if (canAdd) distinctCssClass.push(cssClassRef);
                                                }

                                              });
                                              return distinctCssClass;
                                            };
          Service.getDragDropConfigModel = function(){

                                              return _dragDropConfigModel;
                                          };

          return Service;
        } 
      ];
}]);