/**
 * 
 * ddDecorContainer directive :
 *
 * WHAT IS IT USED FOR? : 
 *
 * - apply configuration to containers (or lines in layoutor group controls in control selection)
 *   - apply title (ONLY if group controls (left drop zone - index 0): text inputs group, lists...)
 *   - expand Bool (ONLY if group controls (left drop zone - index 0): text inputs group, lists...)
 * 
 */
var ngwfDdDecorContainerDirective = angular.module('ngwfApp.directives.ngwfDdDecorContainerDirective', []);
ngwfDdDecorContainerDirective.directive('ddDecorContainer', [function(){
        var htmlTemplate   = [
                                '<div class="{{}}">', 
                                ' <h5>{{currentTitle}}</h5>', 
                                '</div>'].join(' ');

        return {
            scope:  {
                        'styleParam': '=ddContainerProperties',
                         'verboseMode' : '@ddContainerVerboseMode',
                         'currentIndex' : '@ddContainerCurrentIndex'
                    },
            restrict: 'A', 
            template: htmlTemplate,
            transclude: true,

            link: function($scope, element, attrs, ctrl, transclude) {    
                
                var verboseModeActive = $scope.verboseMode;
                var currentIndex = $scope.currentIndex;
                

                //verbose mode : just for dev
                if (verboseModeActive !== '') {
                    var verbose = angular.lowercase(verboseModeActive);

                    if (verbose === 'true' || verbose === '1') {
                       console.dir(
                            {
                                whoAmI : 'I am verbose from ddDecorContainer link',
                                verbodeMode : verbose,
                                ParentParentIndex : $scope.$parent.$parent.$index,
                                ParentIndex : $scope.$parent.$index,
                                currentIndex: currentIndex,
                                styleParam : $scope.styleParam
                            }
                        );
                    }                    
                }


                console.log('checkpoint 1');

                if (typeof currentIndex !== 'undefined') {
                    if (currentIndex !== '') {

                        console.log('checkpoint 2');

                        if (currentIndex === '0') {
                            //apply title 
                            console.log('checkpoint 3');
                            if (typeof $scope.styleParam.title !== 'undefined') {
                                console.log('checkpoint 4');
                                $scope.currentTitle = $scope.styleParam.title;
                            }

                            //apply font-awesome icon
                            if (typeof $scope.styleParam.fontAwesomeIcon !== 'undefined') {
                                $scope.currentFontAwesome = $scope.styleParam.fontAwesomeIcon;
                            }     
                        }
                    }                    
                }

                //prevent transclusion creating child scope 
                //want to know more about what I'm saying : check this nice tip on the subject :
                //http://angular-tips.com/blog/2014/03/transclusion-and-scopes/        
                transclude($scope.$parent, function(clone, $scope){
                    element.append(clone);
                });   


            }
        };
    }]);