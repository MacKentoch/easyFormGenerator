/**
 * 
 * ngwfDdDecorItemDirective directive :
 *
 * WHAT IS IT USED FOR? : 
 *
 * decorate an item / control :
 * 
 * 
 */
var ngwfDdDecorItemDirective = angular.module('ngwfApp.directives.ngwfDdDecorItemDirective', []);
ngwfDdDecorItemDirective.directive('ddDecorItem', [function(){


        var htmlTemplate   = [
                                //'<div ng-class="{ ',
                                //'   col-md-4 : (lineItemsCount === 3),',
                                //'   col-md-6 : (lineItemsCount === 2),',
                                //'   col-md-12 : (lineItemsCount === 1)',
                                //'}>',
                                '<div>',
                                ' <div id="itemDirectiveTranscludeHere"></div>',
                                '</div>',
                                ].join(' ');

        return {
            scope:  {

                         'verboseMode' :        '@ddItemVerboseMode',
                         'currentIndex' :       '@ddItemCurrentIndex',
                         'parentIndex':         '@ddItemParentIndex',
                         'parentParentIndex':   '@ddItemParentParentIndex', 
                         'lineItemsCount' :     '@ddItemsCount',
                         'cssClass':            '@ddItemCssClass'
                    },
            restrict: 'A',
            template: htmlTemplate,
            transclude: true,

            link: function($scope, element, attrs, ctrl, transclude) {    
                
                var verboseModeActive = $scope.verboseMode;
                var currentIndex = $scope.currentIndex;
                var parentIndex = $scope.parentIndex;

                var listClass = ['col-md-12','col-md-6','col-md-4'];

                /**
                 * reset css class
                 */
                element.removeClass('col-md-12');
                element.removeClass('col-md-6');
                element.removeClass('col-md-4');

                console.info('directive : item css class :');
                console.dir($scope.cssClass);
                /**
                 * add class
                 */
                element.addClass($scope.cssClass);

                /**
                 * verbose mode : just for dev 
                 */
                if (verboseModeActive !== '') {
                    var verbose = angular.lowercase(verboseModeActive);

                    if (verbose === 'true' || verbose === '1') {
                       console.dir(
                            {
                                whoAmI : 'I am verbose from ddDecorItem directive link',
                                verbodeMode : verbose,
                                ParentParentIndex : $scope.$parent.$parent.$index,
                                ParentIndex : parentIndex,
                                parentParentIndex : $scope.parentParentIndex,
                                currentIndex: currentIndex,
                                lineItemsCount: $scope.lineItemsCount
                            }
                        );
                    }                    
                }

                /**
                 * form column : apply css class to item depending number of items in the same line
                 */
               // if ($scope.parentParentIndex === '1') {
               //      /**
               //       * cleaning classes before adding
               //       */
               //      for (var i = listClass.length - 1; i >= 0; i--) {
               //          element.removeClass(listClass[i]);    
               //      }
               //      console.info('should add class : ' + listClass[$scope.lineItemsCount]);

               //      if (typeof $scope.lineItemsCount !== 'undefined') {
               //          console.info('should add class since not undefined : ' + listClass[$scope.lineItemsCount]);
               //          if ($scope.lineItemsCount > 0) {
               //              element.addClass(listClass[$scope.lineItemsCount - 1]);    
               //              console.info('added class : ' + listClass[$scope.lineItemsCount - 1]);    
               //          }else{
               //              element.addClass(listClass[0]);
               //              console.info('added class : ' + listClass[0]);        
               //          }                        
               //      }          
               //  }
                /**
                 * control column : apply css class to item
                 */
                if ($scope.parentParentIndex === '0') {
                   element.addClass(listClass[0]);  
                }



                /**
                 * removeMe is function related to twice double click sequence to delete a line
                 *
                 *  - addClass / remove/class ; will make line in a shake movement
                 *  - call "removeLine function to delete the line (if it was rwice double clicked)
                 */
               // $scope.removeMe= function(event){
               //      event.preventDefault();
               //      event.stopPropagation();

               //      if ($scope.parentIndex === '1') {

               //          //2nd dbl click : if is shaking so it is confirmation to delete
               //          if ($scope.deleteLine.dblClickCount === 1){

               //              $scope.deleteLine.dblClickCount = 0;
               //              $scope.deleteLine.readyToDelete = false;

               //              *
               //               * NOTE : trick in calling parent controller function with input param when directive with isolate scope
               //               * see : https://thinkster.io/egghead/isolate-scope-am
               //               *
               //               * Here should be:
               //               * 
               //               *-> in html :                     dd-remove-line="removeThisLine(indexToDelete)
               //               *-> in controller :               $scope.removeThisLine = function(lineIndex){
               //               *-> so in directive call it  :    $scope.removeLine({indexToDelete: currentIndex});
               //               *
               //               *
               //               *
               //               *
               //               * BUT in this case (repeats, ul> li.... complicated) 
               //               *  => works better (if shaking a lot of line in a row it won't mess up)
               //               *
               //               *-> in html :                     dd-remove-line="removeThisLine($index)
               //               *-> in controller :               $scope.removeThisLine = function(lineIndex){
               //               *-> so in directive call it  :    $scope.removeLine();
                                                         
               //              //$scope.removeLine({indexToDelete: currentIndex});
               //              $scope.removeLine();

               //          }

               //          //1st dbl click : make it shake so ready to delete
               //          if ($scope.deleteLine.dblClickCount === 0) {
               //              $scope.deleteLine.dblClickCount = $scope.deleteLine.dblClickCount + 1;
               //              $scope.deleteLine.readyToDelete = true;
               //          }
                        
               //      }
               //  };


                /**
                 * signle event will ever occur
                 *
                 * to prevent it to interfere with double click sequence 
                 * -> set a time out (shaking line to delete will automaticallly end shaking after timeout : 2 seconds)
                 */
                // $scope.cancelDelete = function(event){
                //     //event.preventDefault();
                //     //event.stopPropagation();
                    
                //     $timeout(function(){
                    
                //         $scope.deleteLine.dblClickCount = 0;
                //         $scope.deleteLine.readyToDelete = false;  
                          
                //     }, 2000);
                // };


                /**
                 * prevent transclusion creating child scope  
                 *
                 *
                 * NOTE :if you want to know more about what I'm saying : check this nice tip on the subject : 
                 * http://angular-tips.com/blog/2014/03/transclusion-and-scopes/        
                 */
                transclude($scope.$parent, function(contentClone){
                    //transclusion will append content to '<div id="itemDirectiveTranscludeHere"></div>'
                    var childDiv = angular.element(element.children()[0]); 
                    childDiv.append(contentClone);
                });   
            }
        };


    }]);

