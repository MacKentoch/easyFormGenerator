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
ngwfDdDecorLineDirective.directive('ddDecorLine', [function(){
        var htmlTemplate   = [
                                '<div>',
                                '  <button ng-click="console.info(\'removeLine form directive\');removeMe();" ng-show="parentIndex === \'1\'" type="button" class="btn btn-danger btn-xs pull-right buttonCloseLine">',
                                '    <span aria-hidden="true">&times;</span></button>',
                                '  <div id="lineDirectiveTranscludeHere"></<div>',
                                '</div>'].join(' ');

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

        
                $scope.isCollapsed = false;


                //verbose mode : just for dev
                //if (verboseModeActive !== '') {
                    var verbose = angular.lowercase(verboseModeActive);

                   // if (verbose === 'true' || verbose === '1') {
                       console.dir(
                            {
                                whoAmI : 'I am verbose from ddDecorLine directive link',
                                verbodeMode : verbose,
                                ParentParentIndex : $scope.$parent.$parent.$index,
                                ParentIndex : parentIndex,
                                currentIndex: currentIndex,
                                ///styleParam : $scope.styleParam
                            }
                        );
                   // }                    
               // }

               $scope.removeMe= function(){
                $scope.removeLine(currentIndex);
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

