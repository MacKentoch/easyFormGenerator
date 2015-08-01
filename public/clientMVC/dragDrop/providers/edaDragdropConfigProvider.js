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
  .module('edaApp.providers.dragDropConfigProvider', [])
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
                                                    WhenIndex     : 0,
                                                    ApplycssClass : 'col-md-12', 
                                                    title         : 'Blank : ',
                                                    groupId       : 'blank',
                                                    isCollapsed   : true 
                                                  },                                
                                                  {
                                                    WhenIndex     : 1,
                                                    ApplycssClass : 'col-md-12', 
                                                    title         : 'Headers : ',
                                                    groupId       : 'headers',
                                                    isCollapsed   : true 
                                                  },
                                                  {
                                                    WhenIndex     : 2,
                                                    ApplycssClass : 'col-md-12', 
                                                    title         : 'Text inputs : ',
                                                    groupId       : 'inputs' ,
                                                    isCollapsed   : true
                                                  },
                                                  {
                                                    WhenIndex     : 3,
                                                    ApplycssClass : 'col-md-12',
                                                    title         : 'Textareas : ',
                                                    groupId       : 'textareas',
                                                    isCollapsed   : true 
                                                  },
                                                  {
                                                    WhenIndex     : 4,
                                                    ApplycssClass : 'col-md-12',
                                                    title         : 'Radios : ',
                                                    groupId       : 'radios',
                                                    isCollapsed   : true 
                                                  },
                                                  {
                                                    WhenIndex     : 5,
                                                    ApplycssClass : 'col-md-12',
                                                    title         : 'Checkboxes : ',
                                                    groupId       : 'checkboxes',
                                                    isCollapsed   : true 
                                                  },
                                                  {
                                                    WhenIndex     : 6,
                                                    ApplycssClass : 'col-md-12',
                                                    title         : 'Selects : ',
                                                    groupId       : 'selects',
                                                    isCollapsed   : true 
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
      /**
       * drag and drop presentation model
       *
       * conatain all draggaable items 
       */
      var _dragDropPresentationModel = [
                                          //1 column here is control selection column
                                          [],
                                          [
                                            //empty 1st line at initialisation
                                            []
                                          ]
                                       ];

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

      
      this.addControlToDragDropPresentationModel = function(controlToAdd, groupToAdd){
                                                      if (typeof controlToAdd !== 'undefined' &&
                                                          typeof groupToAdd   !== 'undefined') {
                                                        addToGroupControl(controlToAdd, groupToAdd);
                                                      }
                                                    };

      this.getDragDropPresentationModel = function(){
                                            /**
                                             * 
                                             */
                                            return _dragDropPresentationModel;
                                          };

      this.$get = [

        function(){
    
          var Service = {};

          Service.getListItemCssClass = function(){                                               
                                        return _listDragDropItemCssClasses;
                                        };
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
                                              /**
                                               * 
                                               */
                                              return _dragDropConfigModel;
                                            };

          Service.setDragDropConfigContainerDecorationCollapse = function(dragDropConfigModel, indexValue, isCollapsedBool){
                                                                    if (typeof indexValue       !== 'undefined' &&
                                                                        typeof isCollapsedBool  !== 'undefined') {

                                                                      if (indexValue === parseInt(indexValue, 10)) {
                                                                        dragDropConfigModel.containerConfig.decoration[indexValue].isCollapsed = isCollapsedBool;
                                                                      }

                                                                    }
                                                                    return true;
                                                                  };

          Service.getDragDropPresentationModel = function(){
                                                  /**
                                                   * 
                                                   */
                                                   return _dragDropPresentationModel;
                                                 };

          return Service;
        } 
      ];

      /**
       * addToGroupControl : add control to _dragDropPresentationModel
       * @param {[type]} thisControl : control to add
       * @param {[type]} thisGroup   : groupId wher this control should be added
       *
       * NOTE : if _dragDropPresentationModel wrong initialized it will create list of group conforming to 
       * configModel
       */
      function addToGroupControl(thisControl, thisGroup){
        /**
         * search group if already exists
         */
        if (_dragDropPresentationModel[0].length > 0) {

          /**
           * case when _dragDropConfigModel.containerConfig.decoration.length is > to _dragDropPresentationModel[0].length
           *
           * for instance : initialization _dragDropPresentationModel[0] in between
           */
          if (_dragDropPresentationModel[0].length < _dragDropConfigModel.containerConfig.decoration.length) {
            var missingGroupNumber = _dragDropConfigModel.containerConfig.decoration.length - _dragDropPresentationModel[0].length;

            for (var i = 0; i < missingGroupNumber; i++) {
              _dragDropPresentationModel[0].push([]);
            }

          }
          /**
           * push control to right index 
           * (deduced by _dragDropConfigModel.containerConfig.decoration.WhenIndex value for groupId === thisGroup)
           */
           _dragDropConfigModel.containerConfig.decoration.forEach(function(groupConfig){
            if (thisGroup.addToGroupCtrl === groupConfig.groupId) {
              _dragDropPresentationModel[0][groupConfig.WhenIndex].push(thisControl);
            }
           });

        }else{
          /**
           * no group no control
           *
           * initialize _dragDropConfigModel.containerConfig.decoration list
           */
          _dragDropConfigModel.containerConfig.decoration.forEach(function(){
            _dragDropPresentationModel[0].push([]);
          });

          /**
           * push control to right index 
           * (deduced by _dragDropConfigModel.containerConfig.decoration.WhenIndex value for groupId === thisGroup)
           */
           _dragDropConfigModel.containerConfig.decoration.forEach(function(groupConfig){
            if (thisGroup.addToGroupCtrl === groupConfig.groupId) {
              _dragDropPresentationModel[0][groupConfig.WhenIndex].push(thisControl);
            }
           }); 
          
        }
      }      
}]);