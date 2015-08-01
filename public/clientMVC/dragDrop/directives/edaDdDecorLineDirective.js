/**
 *  ------------------------------------------------------
 *  directive : edaDdDecorLineDirective
 *  ------------------------------------------------------
 *
 * decorate a form line :
 *  - double click will make it shake for 2 second (ready to delete state)
 *  - double click again will delete this line
 *  - no click within 2seconds : line will stop shaking 
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
    .module('edaApp.directives.edaDdDecorLineDirective', [])
    .directive('ddDecorLine', ['$timeout', 

    function($timeout){

        var htmlTemplate   = [
                                '<div ng-class="{confirmLineDelete : deleteLine.readyToDelete}" ng-dblclick="removeMe($event);" ng-click="cancelDelete($event);"> ',
                                ' <button ng-show="deleteLine.readyToDelete === true" type="button"  class="btn btn-danger pull-right buttonCloseLine" >',
                                '   <span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>',
                                '</div>',
                                '  <div id="lineDirectiveTranscludeHere"></<div>',
                                ].join(' ');
        
        return {
            scope:  {

                         'verboseMode'  :    '@ddLineVerboseMode',
                         'currentIndex' :    '@ddLineCurrentIndex',
                         'parentIndex'  :    '@ddLineParentIndex',
                         'removeLine'   :    '&ddRemoveLine'
                    },
            restrict:   'A',
            template:   htmlTemplate,
            transclude: true,

            link: function($scope, element, attrs, ctrl, transclude) {    
                
                var verboseModeActive   = $scope.verboseMode;
                var currentIndex        = $scope.currentIndex;
                var parentIndex         = $scope.parentIndex;

                $scope.deleteLine = {};
                $scope.deleteLine.readyToDelete = false;
                $scope.deleteLine.dblClickCount = 0;

        
                $scope.isCollapsed = false;


                /**
                 * verbose mode : just for dev 
                 */
                if (verboseModeActive !== '') {
                    var verbose = angular.lowercase(verboseModeActive);

                    if (verbose === 'true' || verbose === '1') {
                       console.dir(
                            {
                                whoAmI              : 'I am verbose from ddDecorLine directive link',
                                verbodeMode         : verbose,
                                ParentParentIndex   : $scope.$parent.$parent.$index,
                                ParentIndex         : parentIndex,
                                currentIndex        : currentIndex,
                            }
                        );
                    }                    
                }

                /**
                 * removeMe is function related to twice double click sequence to delete a line
                 *
                 *  - addClass / remove/class ; will make line in a shake movement
                 *  - call "removeLine function to delete the line (if it was rwice double clicked)
                 */
               $scope.removeMe= function(event){
                    event.preventDefault();
                    event.stopPropagation();

                    if ($scope.parentIndex === '1') {

                        /**
                         * 2nd dbl click : if is shaking so it is confirmation to delete
                         */
                        if ($scope.deleteLine.dblClickCount === 1){

                            $scope.deleteLine.dblClickCount = 0;
                            $scope.deleteLine.readyToDelete = false;

                            /**
                             * NOTE : trick in calling parent controller function with input param when directive with isolate scope
                             * see : https://thinkster.io/egghead/isolate-scope-am
                             *
                             * Here should be:
                             * 
                             *-> in html :                     dd-remove-line="removeThisLine(indexToDelete)
                             *-> in controller :               $scope.removeThisLine = function(lineIndex){
                             *-> so in directive call it  :    $scope.removeLine({indexToDelete: currentIndex});
                             *
                             *
                             *
                             *
                             * BUT in this case (repeats, ul> li.... complicated) 
                             *  => works better (if shaking a lot of line in a row it won't mess up)
                             *
                             *-> in html :                     dd-remove-line="removeThisLine($index)
                             *-> in controller :               $scope.removeThisLine = function(lineIndex){
                             *-> so in directive call it  :    $scope.removeLine();
                             */                            
                            //$scope.removeLine({indexToDelete: currentIndex});
                            $scope.removeLine();
                            //console.warn('force timer destruction after delete!');
                            $timeout.cancel(timer);
                        }

                        //1st dbl click : make it shake so ready to delete
                        if ($scope.deleteLine.dblClickCount === 0) {
                            $scope.deleteLine.dblClickCount = $scope.deleteLine.dblClickCount + 1;
                            $scope.deleteLine.readyToDelete = true;
                        }
                        
                    }
                };


                /**
                 * signle event will ever occur
                 *
                 * to prevent it to interfere with double click sequence 
                 * -> set a time out (shaking line to delete will automaticallly end shaking after timeout : 2 seconds)
                 */
                
                var timer;

                $scope.cancelDelete = function(event){
                    //event.preventDefault();
                    //event.stopPropagation();
                    
                        timer = $timeout(function(){
                    
                        $scope.deleteLine.dblClickCount = 0;
                        $scope.deleteLine.readyToDelete = false;  
                          
                    }, 500);


                    /**
                     * debug
                     */
                    // timer.then(
                    //     function() {
                    //         console.log( 'Timer resolved!', Date.now() );
                    //     },
                    //     function() {
                    //         console.log( 'Timer rejected!', Date.now() );
                    //     }
                    // );

                };


                /**
                 * timer destruction to prevent from bad UI experience
                 */
                $scope.$on('$destroy', function(){
                        //console.warn('timer destruction!');
                        $timeout.cancel(timer);
                    }
                );                


                /**
                 * prevent transclusion creating child scope  
                 *
                 *
                 * NOTE :if you want to know more about what I'm saying : check this nice tip on the subject : 
                 * http://angular-tips.com/blog/2014/03/transclusion-and-scopes/        
                 */
                transclude($scope.$parent, function(contentClone){
                    //transclusion will append content to '<div id="lineDirectiveTranscludeHere"></div>'
                    var childDiv = angular.element(element.children()[0]); 
                    childDiv.append(contentClone);
                });   
            }
        };


    }]);

