///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// module = "controllers"  for view "imgCarouselModalCTRL"
//  ------------------------------------------------------
//      Syntax (convention) :
//          "ngwfApp" = application
//          "ngwfApp.controllers.ngwfMainController" = controller module
//
//  This module is a view controller -> it must be injected in controller container
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ngwfModalSaveResult2HtmlController = angular.module('ngwfApp.controllers.ngwfModalSaveResult2HtmlController', []);

ngwfModalSaveResult2HtmlController.controller('modalSaveResult2Html', [ '$scope', 
                                                                      	'$modalInstance', 
                                                                      	'resultToSave',
                                                                      function (  $scope, 
                                                                                  $modalInstance,
                                                                                  resultToSave) {
    //verbose
    console.log('--> INIT : Hello controller  \'\'modalSaveResult2Html\'\' ');
      	


 // $scope.resultToSave = {
 //    fieldsModel : [],
 //    dataModel : {},
 //    submitBtnText : 'Submit',
 //    cancelBtnText : 'Cancel'

 //  };

 //json resultToSave.fieldsModel

        //$scope.vm.model= {};
        //$scope.vm.fields = [];

        //angular.copy(resultToSave ,$scope.vm.fields);

      	console.info('----- modalSaveResult2Html received object : ');
      	console.dir(resultToSave);



         $scope.okSaveResult2Html = function () {

            $modalInstance.close({returnVal: true});
          };

          $scope.cancelSaveResult2Html = function () {
            $modalInstance.dismiss('cancel');
          };



          var resultStringToSave = '<!DOCTYPE html> \n' +
          '<html> \n' +
          '  <head> \n' +
          '    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.16/angular.min.js"></script> \n' +
          '    <!-- Bootstrap core CSS --> \n' +
          '    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"> \n' +
          '    <!-- Bootswatch "paper" used in easy form website : feel free to use your own --> \n' +
          '    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.5/paper/bootstrap.min.css"> \n' +
          '    <!-- font-awesome --> \n' +
          '    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"> \n' +
          '    <!-- animate --> \n' +
          '    <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.3.0/animate.min.css" rel="stylesheet"> \n' +
          '    <!-- textAngular --> \n' +
          '    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/textAngular/1.4.1/dist/textAngular.css"> \n' +
          '    <!-- This is nya select : bootstrap template style  -->     \n' +
          '    <link href="https://rawgit.com/lordfriend/nya-bootstrap-select/master/dist/css/nya-bs-select.min.css" rel="stylesheet">     \n' +
          '    <style type="text/css"> \n' +
          '      body { \n' +
          '        margin: 20px \n' +
          '      } \n' +
          '      .formly-field { \n' +
          '        margin-bottom: 16px; \n' +
          '      } \n' +
          '    </style> \n' +
          '    <title>Your form</title> \n' +
          '  </head> \n' +
          '  <body ng-app="demoApp" ng-controller="MainCtrl as vm"> \n' +
          '    <div> \n' +
          '      <div class="jumbotron text-center"> \n' +
          '        <h1>Congratulation! &nbsp;<i class="fa fa-thumbs-o-up"></i></h1> \n' +
          '        <p>here is your form you\'ve just created :</p> \n' +
          '      </div> \n' +
          '      <hr /> \n' +
          ' \n' +
          '      <div class="container"> \n' +
          '        <div class="row"> \n' +
          '          <div class="col-xs-12"> \n' +
          ' \n' +
          '            <!-- here is the simple HTML you need (everything else is decoration) : --> \n' +
          '            <form ng-submit="vm.onSubmit()" name="vm.form" novalidate> \n' +
          '              <formly-form model="vm.model" fields="vm.fields" options="vm.options" form="vm.form"> \n' +
          '                <button type="submit" class="btn btn-primary submit-button pull-right" ng-disabled="vm.form.$invalid">{{vm.buttons.submit}}</button> \n' +
          '                <button type="button" class="btn btn-primary pull-right" ng-click="vm.options.resetModel()">{{vm.buttons.cancel}}</button> \n' +
          '              </formly-form> \n' +
          '            </form> \n' +
          ' \n' +
          '          </div> \n' +
          '        </div> \n' +
          '      </div> \n' +
          '    </div> \n' +
          ' \n' +
          '      <!-- jquery framework --> \n' +
          '      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.2/jquery.min.js"></script> \n' +
          '      <!-- bootstrap framework scripts --> \n' +
          '      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.min.js"></script> \n' +
          '      <!-- angular ui bootstrap --> \n' +
          '      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.13.0/ui-bootstrap-tpls.min.js"></script> \n' +
          '      <!-- textAngular Includes --> \n' +
          '      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/textAngular/1.4.1/dist/textAngular-rangy.min.js"></script> \n' +
          '      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/textAngular/1.4.1/dist/textAngular-sanitize.min.js"></script> \n' +
          '      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/textAngular/1.4.1/dist/textAngular.min.js"></script>  \n' +
          '      <!-- This is nya select : bootstrap template js  --> \n' +
          '      <script src="https://rawgit.com/lordfriend/nya-bootstrap-select/master/dist/js/nya-bs-select.min.js"></script> \n' +
          '      <!-- apiCheck is used by formly to validate its api --> \n' +
          '      <script src="https://rawgit.com/kentcdodds/api-check/master/dist/api-check.min.js"></script> \n' +
          '      <!-- This is the current state of master for formly core. --> \n' +
          '      <script src="https://rawgit.com/formly-js/angular-formly/master/dist/formly.js"></script> \n' +
          '      <!-- This is the current state of master for the bootstrap templates --> \n' +
          '      <script src="https://rawgit.com/formly-js/angular-formly-templates-bootstrap/master/dist/angular-formly-templates-bootstrap.js"></script> \n' +
          '      <!-- angular scripts : --> \n' +
          '      <script type="text/javascript"> \n' +
          '      ////////////////////////////// \n' +
          '      // demo application \n' +
          '      ///////////////////////////// \n' +
          '      var demoApp = angular.module(\'demoApp\', [  \n' +
          '                                              \'textAngular\',  \n' +                  
          '                                              \'formly\',  \n' +
          '                                              \'formlyBootstrap\', \n' +
          '                                              \'ui.bootstrap\', \n' +
          '                                              \'nya.bootstrap.select\', \n' +
          '                                              function () { \n' +
          '      }]); \n' +
          '      ////////////////////////////// \n' +
          '      // CONFIG HERE               \n' +
          '      ///////////////////////////// \n' +
          '      demoApp.config([  \'formlyConfigProvider\',  \n' +
          '                        function(formlyConfigProvider) { \n' +
          '          formlyConfigProvider.setType( \n' +
          '            { \n' +
          '              name: \'richEditor\', \n' +
          '              template: \'<text-angular class="richTextAngular" ng-model="model[options.key || index]"></text-angular>\' \n' +
          '            } \n' +
          '          ); \n' +
          '          formlyConfigProvider.setType( \n' +
          '            { \n' +
          '              name: \'blank\', \n' +
          '              template: \'<div></div>\' \n' +
          '            } \n' +
          '          ); \n' +
          '          var subTitleTemplate = \'<div class="row"><div class=""><h4 class="text-center">{{options.templateOptions.placeholder}}<h4><hr/></div></div>\'; \n' +
          '          formlyConfigProvider.setType( \n' +
          '            { \n' +
          '              name: \'subTitle\', \n' +
          '              template: subTitleTemplate \n' +
          '            } \n' +
          '          ); \n' +
          '        var basicSelectTemplate =   \' <ol   class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12" \' +  \n' +
          '                                    \'   ng-model="model[options.key || index]"  \' +  \n' +
          '                                    \'   id="{{id}}"  \' +  \n' +
          '                                    \'   disabled="options.templateOptions.options.length === 0"> \' +  \n' +
          '                                    \'   <li class="nya-bs-option" nya-bs-option="option in options.templateOptions.options"> \' +  \n' +
          '                                    \'     <a>{{option.name}}</a> \' +  \n' +
          '                                    \'   </li> \' +  \n' +
          '                                    \' </ol>     \' ; \n' +
          '         formlyConfigProvider.setType( \n' +
          '            { \n' +
          '              name: \'basicSelect\', \n' +
          '              template: basicSelectTemplate \n' +
          '            } \n' +
          '          ); \n' +
          '          var groupedSelectTemplate =   \'  <ol class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12" \' + \n' +
          '                                        \'    ng-model="model[options.key || index]" \' + \n' +
          '                                        \'       data-live-search="true" \' + \n' +
          '                                        \'       disabled="options.templateOptions.options.length === 0">\' + \n' +
          '                                        \'       <li nya-bs-option="option in  options.templateOptions.options group by option.group"  \' + \n' +
          '                                        \'       >\' + \n' +
          '                                        \'         <span class="dropdown-header">{{$group}}</span>\' +  \n' +
          '                                        \'         <a>\' + \n' +
          '                                        \'           <span>{{option.name}}</span>\' + \n' +
          '                                        \'           <span class="glyphicon glyphicon-ok check-mark"></span>\' + \n' +
          '                                        \'         </a>\' + \n' +
          '                                        \'       </li>\' + \n' +
          '                                        \'     </ol>\'; \n' +
          '         formlyConfigProvider.setType( \n' +
          '            { \n' +
          '              name: \'groupedSelect\', \n' +
          '              template: groupedSelectTemplate \n' +
          '            } \n' +
          '          ); \n' +
          '         // angular UI date picker \n' +
          '         // thx Kent C. Dodds \n' +
          '        var attributes = [ \n' +
          '          \'date-disabled\', \n' +
          '          \'custom-class\', \n' +
          '          \'show-weeks\', \n' +
          '          \'starting-day\', \n' +
          '          \'init-date\', \n' +
          '          \'min-mode\', \n' +
          '          \'max-mode\', \n' +
          '          \'format-day\', \n' +
          '          \'format-month\', \n' +
          '          \'format-year\', \n' +
          '          \'format-day-header\', \n' +
          '          \'format-day-title\', \n' +
          '          \'format-month-title\', \n' +
          '          \'year-range\', \n' +
          '          \'shortcut-propagation\', \n' +
          '          \'datepicker-popup\', \n' +
          '          \'show-button-bar\', \n' +
          '          \'current-text\', \n' +
          '          \'clear-text\', \n' +
          '          \'close-text\', \n' +
          '          \'close-on-date-selection\', \n' +
          '          \'datepicker-append-to-body\' \n' +
          '        ]; \n' +
          '        var bindings = [ \n' +
          '          \'datepicker-mode\', \n' +
          '          \'min-date\', \n' +
          '          \'max-date\' \n' +
          '        ]; \n' +
          '        var ngModelAttrs = {}; \n' +
          '        angular.forEach(attributes, function(attr) { \n' +
          '          ngModelAttrs[camelize(attr)] = {attribute: attr}; \n' +
          '        }); \n' +
          '        angular.forEach(bindings, function(binding) { \n' +
          '          ngModelAttrs[camelize(binding)] = {bound: binding}; \n' +
          '        }); \n' +
          '        formlyConfigProvider.setType({ \n' +
          '          name: \'datepicker\', \n' +
          '          template: \'<input  id="{{id}}" class="form-control" ng-click="open($event)" ng-model="model[options.key  || index]" is-open="to.isOpen" ng-click="to.isOpen = true" datepicker-options="to.datepickerOptions" />\', \n' +
          '          wrapper: [\'bootstrapLabel\', \'bootstrapHasError\'], \n' +
          '          controller: [\'$scope\', function($scope) { \n' +
          '             $scope.open = function($event) { \n' +
          '              $event.preventDefault(); \n' +
          '              $event.stopPropagation(); \n' +
          '              $scope.opened = true; \n' +
          '            }; \n' +
          '           }], \n' +
          '          defaultOptions: { \n' +
          '            ngModelAttrs: ngModelAttrs, \n' +
          '            templateOptions: { \n' +
          '              addonLeft: { \n' +
          '                class: \'glyphicon glyphicon-calendar\', \n' +
          '                onClick: function(options, scope) { \n' +
          '                  options.templateOptions.isOpen = !options.templateOptions.isOpen; \n' +
          '                } \n' +
          '              },        \n' +
          '              onFocus: function($viewValue, $modelValue, scope) { \n' +
          '                scope.to.isOpen = !scope.to.isOpen; \n' +
          '              }, \n' +
          '              datepickerOptions: {} \n' +
          '            } \n' +
          '          } \n' +
          '        }); \n' +
          '        function camelize(string) { \n' +
          '          string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) { \n' +
          '            return chr ? chr.toUpperCase() : \'\'; \n' +
          '          }); \n' +
          '          // Ensure 1st char is always lowercase \n' +
          '          return string.replace(/^([A-Z])/, function(match, chr) { \n' +
          '            return chr ? chr.toLowerCase() : \'\'; \n' +
          '          }); \n' +
          '        }  \n' +
          '       }]);    \n' +
          '      ////////////////////////////////////////// \n' +
          '      // demo controller \n' +
          '      ////////////////////////////////////////// \n' +
          '      demoApp.controller(\'MainCtrl\', [\'$scope\',      \n' +          
          '                                      function ($scope, formlyVersion) { \n' +
          '         console.info(\'controller loaded\'); \n' +
          '         // submit function assignment \n' +
          '          $scope.vm.onSubmit = onSubmit; \n' +
          '          ///////////////////////// \n' +
          '          // variable assignment \n' +
          '          ///////////////////////// \n' +
          '          //data model here : \n' +
          '          $scope.vm.model = {}; \n' +
          '          //this model is the initial one \n' +
          '          $scope.vm.initialFieldsModel =' + JSON.stringify(resultToSave.fieldsModel) + ';\n' +
          '          $scope.vm.buttons = { \n' +
          '                                "submit" : "' + resultToSave.submitBtnText +'", \n' +
          '                                "cancel" : "' + resultToSave.cancelBtnText + '" \n' +
          '          }; \n' +
          '          ////////////////////////////////////////////////////// \n' +
          '          //this model "vm.fields" will be bound to formly  \n' +
          '          //-> initialisation from $scope.vm.initialFieldsModel   \n' +                        
          '          ////////////////////////////////////////////////////// \n' +
          '          $scope.vm.fields = angular.copy($scope.vm.initialFieldsModel); \n' +
          '          // onSubmit function definition : \n' +
          '          function onSubmit() { \n' +
          '            //an alert of the data model \n' +
          '            alert(JSON.stringify($scope.vm.model), null, 2); \n' +
          '          } \n' +                                               
          '      }]); \n' +
          '      </script> \n' +
          '  </body> \n' +
          '</html>'; 

          // '              [{ \n' +
          // '                "template": "<div class=\"row\"><div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\"><h2 class=\"text-center\">Form main title here<h2></div></div><hr/>" \n' +
          // '              }, \n' +
          // '              { \n' +
          // '                "className": "col-xs-12", \n' +
          // '                "type": "subTitle", \n' +
          // '                "key": "subTitle-1435697348926", \n' +
          // '                "templateOptions": { \n' +
          // '                  "type": "", \n' +
          // '                  "label": "", \n' +
          // '                  "required": false, \n' +
          // '                  "placeholder": "Subtitle : here fist line of the form", \n' +
          // '                  "description": "", \n' +
          // '                  "options": [] \n' +
          // '                } \n' +
          // '              }, \n' +
          // '              { \n' +
          // '                "className": "row", \n' +
          // '                "fieldGroup": [ \n' +
          // '                  { \n' +
          // '                    "className": "col-xs-4", \n' +
          // '                    "type": "input", \n' +
          // '                    "key": "input-1435697627668", \n' +
          // '                    "templateOptions": { \n' +
          // '                      "type": "", \n' +
          // '                      "label": "A text input :", \n' +
          // '                      "required": true, \n' +
          // '                      "placeholder": "enter some text here", \n' +
          // '                      "description": "This text input will be required", \n' +
          // '                      "options": [] \n' +
          // '                    } \n' +
          // '                  }, \n' +
          // '                  { \n' +
          // '                    "className": "col-xs-4", \n' +
          // '                    "type": "input", \n' +
          // '                    "key": "input-1435697624234", \n' +
          // '                    "templateOptions": { \n' +
          // '                      "type": "password", \n' +
          // '                      "label": "A password input :", \n' +
          // '                      "required": true, \n' +
          // '                      "placeholder": "enter a password (fake is ok too)", \n' +
          // '                      "description": "This password is required (not blank is a good password)", \n' +
          // '                      "options": [] \n' +
          // '                    } \n' +
          // '                  }, \n' +
          // '                  { \n' +
          // '                    "className": "col-xs-4", \n' +
          // '                    "type": "datepicker", \n' +
          // '                    "key": "datepicker-1435697618753", \n' +
          // '                    "templateOptions": { \n' +
          // '                      "type": "", \n' +
          // '                      "label": "A date input :", \n' +
          // '                      "required": false, \n' +
          // '                      "placeholder": "", \n' +
          // '                      "description": "This is not required", \n' +
          // '                      "options": [], \n' +
          // '                      "datepickerPopup": "" \n' +
          // '                    } \n' +
          // '                  } \n' +
          // '                ] \n' +
          // '              }, \n' +
          // '              { \n' +
          // '                "className": "row", \n' +
          // '                "fieldGroup": [ \n' +
          // '                  { \n' +
          // '                    "className": "col-xs-4", \n' +
          // '                    "type": "basicSelect", \n' +
          // '                    "key": "basicSelect-1435697684269", \n' +
          // '                    "templateOptions": { \n' +
          // '                      "type": "", \n' +
          // '                      "label": "",  \n' +
          // '                      "required": false, \n' +
          // '                      "placeholder": "", \n' +
          // '                      "description": "A basic select (nya bs select)", \n' +
          // '                      "options": [ \n' +
          // '                        { \n' +
          // '                          "name": "option1", \n' +
          // '                          "value": 0, \n' +
          // '                          "group": "" \n' +
          // '                        }, \n' +
          // '                        { \n' +
          // '                          "name": "option2", \n' +
          // '                          "value": 1, \n' +
          // '                          "group": "" \n' +
          // '                        } \n' +
          // '                      ] \n' +
          // '                    } \n' +
          // '                  }, \n' +
          // '                  { \n' +
          // '                    "className": "col-xs-4", \n' +
          // '                    "type": "groupedSelect", \n' +
          // '                    "key": "groupedSelect-1435697705089", \n' +
          // '                    "templateOptions": { \n' +
          // '                      "type": "", \n' +
          // '                      "label": "", \n' +
          // '                      "required": false, \n' +
          // '                      "placeholder": "", \n' +
          // '                      "description": "A grouped select with live search (nya bs select)", \n' +
          // '                      "options": [ \n' +
          // '                        { \n' +
          // '                          "name": "option 1", \n' +
          // '                          "value": 0, \n' +
          // '                          "group": "group 1" \n' +
          // '                        }, \n' +
          // '                        { \n' +
          // '                          "name": "option 2", \n' +
          // '                          "value": 1, \n' +
          // '                          "group": "" \n' +
          // '                        } \n' +
          // '                      ] \n' +
          // '                    } \n' +
          // '                  }, \n' +
          // '                  { \n' +
          // '                    "className": "col-xs-4", \n' +
          // '                    "type": "blank", \n' +
          // '                    "key": "blank-1435697447499", \n' +
          // '                    "templateOptions": { \n' +
          // '                      "type": "", \n' +
          // '                      "label": "", \n' +
          // '                      "required": false, \n' +
          // '                      "placeholder": "", \n' +
          // '                      "description": "", \n' +
          // '                      "options": [] \n' +
          // '                    } \n' +
          // '                  } \n' +
          // '                ] \n' +
          // '              } \n' +
          // '            ]; \n' +


		    $scope.resultToHtml = {};
      	$scope.resultToHtml.resultStringToSave = resultStringToSave;
      	

      	$scope.getTextToCopy = function(){
      		console.info('copy all');
      		return resultStringToSave;
      	};

      	$scope.fallback = function(copy) {
      		window.prompt('Press cmd+c to copy the text below.', copy);
      	};


   


}]);