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
                                                    WhenIndex     : 0,
                                                    ApplycssClass : 'col-md-12', 
                                                    title         : 'Blank : ',
                                                    groupId       : 'blank' 
                                                  },                                
                                                  {
                                                    WhenIndex     : 1,
                                                    ApplycssClass : 'col-md-12', 
                                                    title         : 'Headers : ',
                                                    groupId       : 'headers' 
                                                  },
                                                  {
                                                    WhenIndex     : 2,
                                                    ApplycssClass : 'col-md-12', 
                                                    title         : 'Text inputs : ',
                                                    groupId       : 'inputs' 
                                                  },
                                                  {
                                                    WhenIndex     : 3,
                                                    ApplycssClass : 'col-md-12',
                                                    title         : 'Textareas : ',
                                                    groupId       : 'textareas' 
                                                  },
                                                  {
                                                    WhenIndex     : 4,
                                                    ApplycssClass : 'col-md-12',
                                                    title         : 'Radios : ',
                                                    groupId       : 'radios' 
                                                  },
                                                  {
                                                    WhenIndex     : 5,
                                                    ApplycssClass : 'col-md-12',
                                                    title         : 'Checkboxes : ',
                                                    groupId       : 'checkboxes' 
                                                  },
                                                  {
                                                    WhenIndex     : 6,
                                                    ApplycssClass : 'col-md-12',
                                                    title         : 'Selects : ',
                                                    groupId       : 'selects' 
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
                              // [
                              //   {
                              //     'label': [  
                              //             '<div class="col-md-12">',
                              //             '    <div class="form-group">',                                          
                              //             '      <div class="">',
                              //             '        <h2 class="text-center">Header</h2>',
                              //             '        <hr/>',
                              //             '      </div>',
                              //             '    </div>',
                              //             '</div>'
                              //               ].join(''),          
                              //     'control': 'header',
                              //     'cssClass': 'col-md-12'
                              //   },
                              //   {
                              //       'label': [  
                              //               '<div class="col-md-12">',
                              //               '    <div class="form-group">',                                          
                              //               '      <div class="">',
                              //               '        <h4 class="text-center">SubTitle</h4>',
                              //               '        <hr/>',
                              //               '      </div>',
                              //               '    </div>',
                              //               '</div>'
                              //                 ].join(''),
                              //       //'label': '<p>label 3</p>',           
                              //       'control': 'subtitle',
                              //       'cssClass': 'col-md-12'
                              //     }
                              // ],
                              // [

                              //   {
                              //     'label': [  
                              //               '<div class="col-md-12">',
                              //               '<div class="form-group">',
                              //               '  <label for="inputText" class="control-label textControlLabel pull-left">',
                              //               '   title <span class="textControlLabel ng-scope">*</span>',
                              //               '  </label>',
                              //               '  <div class="">',
                              //               '    <input type="text"  class="form-control" id="inputText" placeholder="basic input">',
                              //               '    <p class="help-block pull-left">Description</p>',
                              //               '  </div>',
                              //               '</div>',
                              //               '</div>'
                              //               ].join(''),
                              //     //'label': '<p>label 3</p>',           
                              //     'control': 'basicinput',
                              //     'cssClass': 'col-md-12'
                              //   },                              
                              //   {
        
                              //     'label': [
                              //               '<div class="col-md-12">',
                              //               '<div class="form-group">',
                              //               '  <label for="inputText" class="control-label textControlLabel ng-binding pull-left">',
                              //               '   title <span class="textControlLabel ng-scope">*</span>',
                              //               '  </label>',
                              //               '  <div class="">',
                              //               '    <input type="password" class="form-control" id="inputText" placeholder="password input">',
                              //               '    <p class="help-block ng-binding pull-left">Description</p>',
                              //               '  </div>',
                              //               '</div>',
                              //               '</div>'

                              //               ].join(''),

                              //     'control': 'password',
                              //     'cssClass': 'col-md-12'
                              //   }
                              // ],
                              // //texareas
                              // [

                              //   {
                              //     'label': [
                              //                 '<div class="col-md-12">',
                              //                 '    <div class="form-group">', 
                              //                 '      <label for="textArea" class="control-label textControlLabel pull-left">title<span class="textControlLabel">*</span></label>', 
                              //                 '      <div class="">',
                              //                 '        <textarea class="form-control dragItemtextarea" ng-model="model[options.key]" rows="1" id="textArea"></textarea>',
                              //                 '        <p class="help-block pull-left">description</p>',          
                              //                 '      </div>',
                              //                 '    </div>',                    
                              //                 '</div>'                                  
                              //               ].join(''),
                              //     'control': 'textarea',
                              //     'cssClass': 'col-md-12'          
                              //   }

                              // ],
                              // //radios
                              // [
                              //   {
                              //     'label' : [
                              //                 '<div class="col-md-12">',        
                              //                 '  <div class="form-group">',
                              //                 '    <label for="vertRadio" class="control-label textControlLabel pull-left">title<span class="textControlLabel">*</span></label>',
                              //                 '    <div class="interligne"></div>',
                              //                 '    <div class="pull-left">',

                              //                 '      <div class="radio">',
                              //                 '        <label class="">',
                              //                 '          <input type="radio" name="optionsRadios" id="optionsRadio-0" value="verticalRadio0" checked="">',
                              //                 '          option1',
                              //                 '        </label>',
                              //                 '      </div><div class="radio">',
                              //                 '        <label class="">',
                              //                 '          <input type="radio" name="optionsRadios"  id="optionsRadio-1" value="verticalRadio1" checked="">',
                              //                 '          option2',
                              //                 '        </label>',
                              //                 '      </div>',
                              //                 '      <p class="help-block pull-left">description</p>',

                              //                 '    </div>',


                              //                 '  </div>',                            
                              //                 '</div>'
                              //               ].join(''),
                              //     'control': 'verticalradio',
                              //     'cssClass': 'col-md-12'            
                              //   }
                              // ]
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

      
      this.addControlTodragDropPresentationModel = function(controlToAdd, groupToAdd){
                                                      if (typeof controlToAdd !== 'undefined' &&
                                                          typeof groupToAdd   !== 'undefined') {
                                                        addToGroupControl(controlToAdd, groupToAdd);
                                                      }
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
          Service.getDragDropPresentationModel = function(){
                                                  /**
                                                   * 
                                                   */
                                                   return _dragDropPresentationModel;
                                                 };

          return Service;
        } 
      ];

      function addToGroupControl(thisControl, thisGroup){
        /**
         * search group if already exists
         */
        if (_dragDropPresentationModel.length > 0) {

          /**
           * case when _dragDropConfigModel.containerConfig.decoration.length is > to _dragDropPresentationModel.length
           *
           * for instance : initialization _dragDropPresentationModel in between
           */
          if (_dragDropPresentationModel.length < _dragDropConfigModel.containerConfig.decoration.length) {
            var missingGroupNumber = _dragDropConfigModel.containerConfig.decoration.length - _dragDropPresentationModel.length;

            for (var i = 0; i < missingGroupNumber; i++) {
              _dragDropPresentationModel.push([]);
            }

          }
          /**
           * push control to right index 
           * (deduced by _dragDropConfigModel.containerConfig.decoration.WhenIndex value for groupId === thisGroup)
           */
           _dragDropConfigModel.containerConfig.decoration.forEach(function(groupConfig){
            if (thisGroup.addToGroupCtrl === groupConfig.groupId) {
              _dragDropPresentationModel[groupConfig.WhenIndex].push(thisControl);
            }
           });

        }else{
          /**
           * no group no control
           *
           * initialize _dragDropConfigModel.containerConfig.decoration list
           */
          _dragDropConfigModel.containerConfig.decoration.forEach(function(){
            _dragDropPresentationModel.push([]);
          });

          /**
           * push control to right index 
           * (deduced by _dragDropConfigModel.containerConfig.decoration.WhenIndex value for groupId === thisGroup)
           */
           _dragDropConfigModel.containerConfig.decoration.forEach(function(groupConfig){
            if (thisGroup.addToGroupCtrl === groupConfig.groupId) {
              _dragDropPresentationModel[groupConfig.WhenIndex].push(thisControl);
            }
           }); 
          
        }
      }      
}]);