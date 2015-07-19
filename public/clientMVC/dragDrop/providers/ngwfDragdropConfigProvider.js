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

var dragDropConfigProvider = angular.module('ngwfApp.providers.dragDropConfigProvider', []);

dragDropConfigProvider.provider('dragDropConfig', [function(){

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
   * setListItemCssClass : to use in app.config
   * -> if need to overrides/modify "_defaultDragDropItemCssClasses"
   */
  this.setListItemCssClass = function(fromConfig){
              _listDragDropItemCssClasses = [].concat(fromConfig);
            };


  this.$get = [function(){

          
          var listDragDropItemCssClasses = _listDragDropItemCssClasses;




          var Service = {};

          Service.getListItemCssClass = function(){                                               
                            return listDragDropItemCssClasses;
                          };
                           
          return Service;
        } 
      ];
}]);