/**
 * 
 * ddDecorContainer directive :
 *
 * - apply configuration to drop zone
 *   - column role (control selection or drop zone as form layout)
 *   - apply title
 *   - apply font-awesome icon
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
                         'verboseMode' : '@ddVerboseMode',
                         'currentIndex' : '@ddCurrentIndex'
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
                                verbodeMode : verbose,
                                containerIndex : $scope.$parent.$index,
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