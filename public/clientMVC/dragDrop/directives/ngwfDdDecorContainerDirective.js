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
        var htmlTemplate   = ['<div class="{{styleParam.ApplycssClass}}">', 
                            '  <div id="visualPanel">', 
                            '    <div  class="panel panel-default">', 
                            '      <div class="panel-heading">', 
                            '        <h3 class="panel-title">', 
                            '          <i class="{{currentFontAwesome}}"></i>&nbsp;', 
                            '          {{currentTitle}}', 
                            '        </h3>', 
                            '      </div>', 
                            '      <div class="panel-body">', 
                            '         <div class="row">', 
                            '            <div class="col-md-12" ng-transclude>', 
                            '            </div>', 
                            '            </div>', 
                            '      </div>', 
                            '    </div>', 
                            '  </div>', 
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

            link: function($scope) {    
                
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

                if (typeof currentIndex !== 'undefined') {
                    if (currentIndex !== '') {

                        //if (currentIndex >= '0') {
                            //apply title 
                            if (typeof $scope.styleParam.title !== 'undefined') {
                                $scope.currentTitle = $scope.styleParam.title;
                            }

                            //apply font-awesome icon
                            if (typeof $scope.styleParam.fontAwesomeIcon !== 'undefined') {
                                $scope.currentFontAwesome = $scope.styleParam.fontAwesomeIcon;
                            }     
                        //}
                    }                    
                }
                          
            }
        };
    }]);