/**
 * 
 * ngwfDdDecorLineDirective directive :
 *
 * WHAT IS IT USED FOR? : 
 *
 * decorate a fomr line :
 *  - add a close button
 * 
 * 
 */
var ngwfDdDecorLineDirective = angular.module('ngwfApp.directives.ngwfDdDecorLineDirective', []);
ngwfDdDecorLineDirective.directive('ddDecorLine', ['$timeout', function($timeout){
        var htmlTemplate   = [
                                '<div ng-class="{confirmLineDelete : deleteLine.readyToDelete}" ng-dblclick="removeMe($event);" ng-click="cancelDelete($event);"> ',
                                ' <button ng-show="deleteLine.readyToDelete === true" type="button"  class="btn btn-danger pull-right buttonCloseLine" >',
                                '   <span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>',
                                '</div>',
                                '  <div id="lineDirectiveTranscludeHere"></<div>',
                                ].join(' ');

        return {
            scope:  {

                         'verboseMode' :    '@ddLineVerboseMode',
                         'currentIndex' :   '@ddLineCurrentIndex',
                         'parentIndex':     '@ddLineParentIndex',
                         'removeLine' :     '&ddRemoveLine'
                    },
            restrict: 'A',
            template: htmlTemplate,
            transclude: true,

            link: function($scope, element, attrs, ctrl, transclude) {    
                
                var verboseModeActive = $scope.verboseMode;
                var currentIndex = $scope.currentIndex;
                var parentIndex = $scope.parentIndex;

                $scope.deleteLine = {};
                $scope.deleteLine.readyToDelete = false;
                $scope.deleteLine.dblClickCount = 0;

        
                $scope.isCollapsed = false;


                //verbose mode : just for dev
                if (verboseModeActive !== '') {
                    var verbose = angular.lowercase(verboseModeActive);

                    if (verbose === 'true' || verbose === '1') {
                       console.dir(
                            {
                                whoAmI : 'I am verbose from ddDecorLine directive link',
                                verbodeMode : verbose,
                                ParentParentIndex : $scope.$parent.$parent.$index,
                                ParentIndex : parentIndex,
                                currentIndex: currentIndex,
                            }
                        );
                    }                    
                }

               $scope.removeMe= function(event){
                    event.preventDefault();
                    event.stopPropagation();

                    if ($scope.parentIndex === '1') {

                        //2nd dbl click : if is shaking so it is confirmation to delete
                        if ($scope.deleteLine.dblClickCount === 1){

                            $scope.deleteLine.dblClickCount = 0;
                            $scope.deleteLine.readyToDelete = false;

                            //element.removeClass('confirmLineDelete');

                            console.info('2nd dbl click, will delete index : ' + currentIndex);
                            var indexToDelete = currentIndex;
                            $scope.removeLine(indexToDelete);

                        }

                        //1st dbl click : make it shake so ready to delete
                        if ($scope.deleteLine.dblClickCount === 0) {
                            
                            $scope.deleteLine.dblClickCount = $scope.deleteLine.dblClickCount + 1;
                            $scope.deleteLine.readyToDelete = true;

                            console.info('1st dbl click');

                        }
                        
                    }
                };

            //need to timeout single click content otherwise prevent double click
               $scope.cancelDelete = function(event){

                $timeout(function(){
                    $scope.deleteLine.dblClickCount = 0;
                    $scope.deleteLine.readyToDelete = false;  
                      
                }, 2000);
                //stop shaking : cancel delete
                
                //angular.element(element).removeClass('confirmLineDelete');
               };


                //prevent transclusion creating child scope 
                //want to know more about what I'm saying : check this nice tip on the subject :
                //http://angular-tips.com/blog/2014/03/transclusion-and-scopes/        
                transclude($scope.$parent, function(contentClone){

                    //transclusion will append content to '<div id="lineDirectiveTranscludeHere"></div>'
                    var childDiv = angular.element(element.children()[0]); 
                    childDiv.append(contentClone);
                });   
            }
        };


    }]);

