/**
 *  ------------------------------------------------------
 *  directive : ddDecorContainer
 *  ------------------------------------------------------
 *
 * - apply configuration to containers (or lines in layoutor group controls in control selection)
 *   - apply title (ONLY if group controls (left drop zone - index 0): text inputs group, lists...)
 *   - expand Bool (ONLY if group controls (left drop zone - index 0): text inputs group, lists...)
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
    .module('edaApp.directives.edaDdDecorContainerDirective', [])
    .directive('ddDecorContainer', [

    function(){

        var htmlTemplate   =    [
                                    '<div ng-click="collapseFct()">',
                                    '   <h6 ng-show="config.isEnabled" class="isCollapsableZone"><button class="btn btn-primary btn-xs"><span class="{{currentIconClass()}}"></span></button>&nbsp;{{currentTitle}}</h6>', 
                                    '</div>',
                                    '<div collapse="isCollapsed">', 
                                    '   <div id="ddDecorContainerWillTranscludeHere"></div>', 
                                    '</div>'
                                ].join(' ');

        return {
            scope:  {
                         'styleParam'           : '=ddContainerProperties',
                         'isStillCollapsed'     : '=ddContainerIsCollpased',
                         'verboseMode'          : '@ddContainerVerboseMode',
                         'currentIndex'         : '@ddContainerCurrentIndex',
                         'collpaseAll'          : '&ddCollapseAll'
                    },
            restrict:   'A', 
            template:   htmlTemplate,
            transclude: true,
            controller: function($scope) {
                            $scope.config = {   
                                                isEnabled : false
                                            };

                            //$scope.isCollapsed = $scope.styleParam.WhenIndex;
                            $scope.collapseFct = function(){
                               
                                $scope.collpaseAll({exceptThisOne: $scope.styleParam.WhenIndex}); 

                                $scope.isCollapsed = !$scope.isCollapsed;
                                $scope.isStillCollapsed = $scope.isCollapsed;

                            };
 
                            /**
                             *  TODO (low priority) : make icon css configurable (provider)
                             */
                            $scope.icons = {
                                closedClass :   'glyphicon glyphicon-eye-open',
                                opened :        'glyphicon glyphicon-eye-close'
                            };

                            $scope.currentIconClass =  function(){
                                    if ($scope.isCollapsed) {
                                        return $scope.icons.closedClass;
                                    }else{
                                        return $scope.icons.opened;
                                    }
                            };
                        },

            link: function($scope, element, attrs, ctrl, transclude) {    
                
                var verboseModeActive   = $scope.verboseMode;
                var currentIndex        = $scope.currentIndex;
                $scope.isCollapsed      = false;

                /**
                 * verbose mode for developments only
                 */
                if (verboseModeActive !== '') {
                    var verbose = angular.lowercase(verboseModeActive);

                    if (verbose === 'true' || verbose === '1') {
                       console.dir(
                            {
                                whoAmI              :   'I am verbose from ddDecorContainer link',
                                verbodeMode         :   verbose,
                                ParentParentIndex   :   $scope.$parent.$parent.$index,
                                ParentIndex         :   $scope.$parent.$index,
                                currentIndex        :   currentIndex,
                                styleParam          :   $scope.styleParam,
                                columnindex         :   $scope.$parent.$parent.$parent.$parent.$index
                            }
                        );
                    }                    
                }
               /**
                 * forceCollapse when : 
                 *  dragDropConfigModel.containerConfig.decoration.isCollapsed changed (here bound to $scope.isStillCollapsed)
                 */
                $scope.$watch(function(){return $scope.isStillCollapsed;}, function(newVal, oldVal){

                    if (newVal !== oldVal) {

                        if ($scope.$parent.$parent.$index === 0) {
                            $scope.isCollapsed = newVal;    
                        }

                    }
                        
                });                
                /**
                 * no header (no title, no collapse....) 
                 */
                $scope.config.isEnabled = false;

                 if (typeof currentIndex !== 'undefined') {
                    if (currentIndex !== '') {
                        /**
                         * specific 1st column 
                         */
                        if (currentIndex === '0') {
                            /**
                             * apply title  
                             */
                            if (typeof $scope.styleParam.title !== 'undefined') {

                                $scope.currentTitle     = $scope.styleParam.title;
                                $scope.config.isEnabled = true;
                                $scope.isCollapsed      = true;
                            } 

                        }
                    }                    
                }


                /**
                 * prevent transclusion creating child scope 
                 * want to know more about what I'm talking about : check this nice tip on the subject :
                 * http://angular-tips.com/blog/2014/03/transclusion-and-scopes/        
                 */
                transclude($scope.$parent, function(contentClone){
                    /**
                     * transclusion will append content to '<div id="ddDecorContainerWillTranscludeHere"></div>' 
                     */
                    var childDiv = angular.element(element.children()[1]); 
                    childDiv.append(contentClone);
                });   
            }
        };

    }]);

