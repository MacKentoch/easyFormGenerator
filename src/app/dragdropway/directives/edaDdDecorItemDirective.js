/**
 *  ------------------------------------------------------
 *  directive : edaDdDecorItemDirective
 *  ------------------------------------------------------
 *
 *  decorate an item / control
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
    .module('edaApp.directives.edaDdDecorItemDirective', [])
    .directive('ddDecorItem', [ 'dragDropConfig',

    function( dragDropConfig ){

        var htmlTemplate   = [
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
            restrict:   'A',
            template:   htmlTemplate,
            transclude: true,
            link: function($scope, element, attrs, ctrl, transclude) {    
                
                var verboseModeActive = $scope.verboseMode;
                var currentIndex      = $scope.currentIndex;
                var parentIndex       = $scope.parentIndex;
                var listClass         = dragDropConfig.getDistinctItemCssClass();


                /**
                 * init css class
                 */
                angular.forEach(listClass, function(css){
                    element.removeClass(css);
                });
                element.addClass($scope.cssClass);                


                /**
                 * update css class
                 */
                $scope.$watch('cssClass', function(newValue, oldValue) {
                    if(newValue !== oldValue){
                        /**
                         * update css class
                         */
                        angular.forEach(listClass, function(css){
                            element.removeClass(css);
                        });
                        element.addClass(newValue); 
                    }
                    
                });

                /**
                 * verbose mode : just for dev 
                 */
                if (verboseModeActive !== '') {
                    var verbose = angular.lowercase(verboseModeActive);

                    if (verbose === 'true' || verbose === '1') {
                       console.dir(
                            {
                                whoAmI              : 'I am verbose from ddDecorItem directive link',
                                verbodeMode         : verbose,
                                ParentParentIndex   : $scope.$parent.$parent.$index,
                                ParentIndex         : parentIndex,
                                parentParentIndex   : $scope.parentParentIndex,
                                currentIndex        : currentIndex,
                                lineItemsCount      : $scope.lineItemsCount
                            }
                        );
                    }                    
                }

                /**
                 * control column : apply css class to item
                 */
                if ($scope.parentParentIndex === '0') {
                   element.addClass(listClass[0]);  

                }

                /**
                 * prevent transclusion creating child scope  
                 *
                 *
                 * NOTE :if you want to know more about what I'm saying : check this nice tip on the subject : 
                 * http://angular-tips.com/blog/2014/03/transclusion-and-scopes/        
                 */
                transclude($scope.$parent, function(contentClone){
                    /**
                     * transclusion will append content to '<div id="itemDirectiveTranscludeHere"></div>' 
                     */
                    var childDiv = angular.element(element.children()[0]); 
                    childDiv.append(contentClone);
                });   
            }
        };


    }]);

