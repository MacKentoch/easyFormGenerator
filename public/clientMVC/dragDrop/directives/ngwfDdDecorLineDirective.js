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
                                '<div ng-dblclick="removeMe();" ng-click="cancelDelete();"> ',
                                ' <button ng-show="readyToDelete === true" type="button"  class="btn btn-danger pull-right buttonCloseLine" >',
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

                $scope.readyToDelete = false;

        
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
                                ///styleParam : $scope.styleParam
                            }
                        );
                    }                    
                }

               $scope.removeMe= function(){
                
                if ($scope.parentIndex === '1') {

                    //2nd dbl click : if is shaking so it is confirmation to delete
                    if (angular.element(element).hasClass('confirmLineDelete')){

                        console.info('2nd dbl click');
                        //confirm delete :
                        //angular.element(element).removeClass('confirmLineDelete');
                        $scope.removeLine(currentIndex);
                    }


                    //1st dbl click : make it shake so ready to delete
                    if ($scope.readyToDelete === false) {
                        console.info('1st dbl click');
                        //make line shaking and ask another shacking to delete it
                        angular.element(element).removeClass('confirmLineDelete');
                        angular.element(element).addClass('confirmLineDelete');
                        $scope.readyToDelete = true;
                    }
                    //$scope.$apply();
               }
           };


               $scope.cancelDelete = function(){
                //stop shaking : cancel delete
                $scope.readyToDelete = false;
                angular.element(element).removeClass('confirmLineDelete');
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

