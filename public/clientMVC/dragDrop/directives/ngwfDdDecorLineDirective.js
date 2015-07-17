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
                                '<div ng-click="collapseFct()">',
                                '   <h6 ng-show="config.isEnabled" class="isCollapsableZone"><button class="btn btn-primary btn-xs"><span class="{{currentIconClass()}}"></span></button>&nbsp;{{currentTitle}}</h6>', 
                                '</div>',
                                '<div collapse="isCollapsed">', 
                                '   <div id="ddDecorContainerWillTranscludeHere"></div>', 
                                '</div>'].join(' ');

        return {
            scope:  {
                        'styleParam': '=ddContainerProperties',
                         'verboseMode' : '@ddContainerVerboseMode',
                         'currentIndex' : '@ddContainerCurrentIndex',
                    },
            restrict: 'A', 
            template: htmlTemplate,
            transclude: true,
            link: function($scope, element, attrs, ctrl, transclude) {    
                
                var verboseModeActive = $scope.verboseMode;
                var currentIndex = $scope.currentIndex;
                $scope.isCollapsed = false;


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

                //no header (no title, no collapse....)
                $scope.config.isEnabled = false;

                 if (typeof currentIndex !== 'undefined') {
                    if (currentIndex !== '') {

                        //specific 1st column
                        if (currentIndex === '0') {
                            //apply title 

                            if (typeof $scope.styleParam.title !== 'undefined') {

                                $scope.currentTitle = $scope.styleParam.title;
                                $scope.config.isEnabled = true;
                            } 

                        }
                    }                    
                }
                //prevent transclusion creating child scope 
                //want to know more about what I'm saying : check this nice tip on the subject :
                //http://angular-tips.com/blog/2014/03/transclusion-and-scopes/        
                transclude($scope.$parent, function(contentClone){

                    //transclusion will append content to '<div id="ddDecorContainerWillTranscludeHere"></div>'
                    var childDiv = angular.element(element.children()[1]); 
                    childDiv.append(contentClone);
                });   
            }
        };


    }]);

