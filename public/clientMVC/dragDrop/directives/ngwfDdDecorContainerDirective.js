///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// module = "directive" 
//  ------------------------------------------------------
//      Syntax (convention) :
//          "ngwfApp" = application
//          "ngwfApp.directives.directiveNAME" = container directives module
//
//  This module is a directive -> it must be injected in directives container
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ngwfDdDecorContainerDirective = angular.module('ngwfApp.directives.ngwfDdDecorContainerDirective', []);



ngwfDdDecorContainerDirective.directive('ddDecorContainer', [function(){
        var htmlTemplate   = ['<div class="{{styleParam.ApplycssClass}}">', 
                            '  <div id="visualPanel">', 
                            '    <div  class="panel panel-default">', 
                            '      <div class="panel-heading">', 
                            '        <h3 class="panel-title">', 
                            '          <i class="fa fa-level-down"></i>&nbsp;', 
                            '          Dynamic Title here :', 
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
                         'verboseMode' : '@ddVerboseMode'
                    },
            restrict: 'A', 
            template: htmlTemplate,
            transclude: true,

            link: function($scope) {    

                if ($scope.verboseMode !== '') {
                    var verbose = angular.lowercase($scope.verboseMode);

                    if (verbose === 'true' || verbose === '1') {
                       console.dir(
                            {
                                verbodeMode : verbose,
                                containerIndex : $scope.$parent.$index,
                                styleParam : $scope.styleParam
                            }
                        );
                    }                    
                }
                
            }
        };
    }]);