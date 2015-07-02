'use strict';

angular.module('filters', [])
  .filter('camelCase', function(){
    return function(input) {
      var words = input.split('-');
      return words.map(function(value){
        return value.charAt(0).toUpperCase() + value.slice(1);
      }).join(' ');
    }
  });

angular.module('controllers', [])
  .controller('HeaderCtrl', function($scope, $state, $rootScope){
    $scope.headerContents = {
      main: {
        heading: 'Getting Started',
        desc: 'An overview of nya-bootstrap-select, how to install and use, basic usages and examples. migrate instructions from old version.'
      },
      examples: {
        heading: 'Examples',
        desc: 'Examples to demonstrate how to utilities the power of nya-bootstrap-select, also, contains some features from Bootstrap-select'
      },
      api: {
        heading: 'API Reference',
        desc: 'Reference for nya-bs-select and nya-bs-option directives'
      }
    };
    $scope.$on('$stateChangeSuccess', function() {
      $scope.currentState = $state.current;
      $rootScope.isHome = $state.is('home');
    });

    $scope.$watch('isHome', function(newValue) {
      console.log('isHome: ', newValue);
    });
  })
  .controller('MainCtrl', function($scope, pages, $filter){
    $scope.articles = [];
    angular.forEach(pages, function(stateName){
      $scope.articles.push({
        state: stateName,
        title: $filter('camelCase')(stateName)
      });
    });
  })
  .controller('ExamplesCtrl', function($scope, pages, $filter){
    $scope.articles = [];
    angular.forEach(pages, function(stateName){
      $scope.articles.push({
        state: stateName,
        title: $filter('camelCase')(stateName)
      });
    });
  })
  .controller('ApiCtrl', function($scope, pages){
    $scope.articles = [];
    angular.forEach(pages, function(stateName){
      var words = stateName.split('-');
      var title = words.map(function(word, index) {
        return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
      }).join('');
      $scope.articles.push({
        state: stateName,
        title: title
      });
    });
  });

angular.module('directives', [])
  .directive('example', function() {
    return {
      template: '<div class="panel panel-default example-panel">' +
                  '<div class="panel-heading">EXAMPLE</div>' +
                  '<div class="panel-body">' +
                    '<ul class="nav nav-tabs">' +
                      '<li ng-repeat="file in fileList" ng-class="{active: currentFile===file}">' +
                        '<a ng-click="changeTab(file)">{{file}}</a>' +
                      '</li>' +
                    '</ul>' +
                    '<div class="file-container" ng-transclude=""></div>' +
                  '</div>' +
                '</div>',
      transclude: true,
      restrict: 'E',
      scope: {},
      controller: function($scope) {
        $scope.fileList = [];
        this.addFile = function(name) {
          $scope.fileList.push(name);
          if(!$scope.currentFile) {
            $scope.currentFile = $scope.fileList[0];
          }
        };

      },
      link: function($scope, $element) {
        $element.find('.panel-body').append($element.next());
        $scope.changeTab = function(file) {
          $scope.currentFile = file;
        };

        $scope.$watch('currentFile', function(file) {
          console.log('currentFile', file);
          if(file){
            $element.find('file:not([name="'+ file +'"])').hide();
            $element.find('file[name="'+ file +'"]').show();
          }
        })
      }
    };
  })
  .directive('file', function() {
    return {
      restrict: 'E',
      require: '^example',
      template: '<div class="example-file" ng-transclude=""></div>',
      scope: {
        fileName: '@name'
      },
      transclude: true,
      link: function postLink($scope, $element, $attrs, $ctrl) {
        $ctrl.addFile($scope.fileName);
      }
    };
  });


angular.module('docApp', ['ui.router', 'nya.bootstrap.select', 'directives', 'filters', 'controllers'])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider){

    $locationProvider.hashPrefix('!');

    var pages = {
      main: [
        'getting-started',
        'migrate-instructions'
      ],
      examples: [
        'basic-usage',
        'groups-and-more',
        'form-control-feature',
        'layout-and-styles',
        'live-search',
        'alternative-display',
        'select-text-format',
        'tick-icon',
        'custom-content',
        'disable-an-option',
        'control-dropdown-menu-size',
        'show-menu-arrow'
      ],
      api: [
        'nya-bs-select',
        'nya-bs-option',
        'nya-bs-config-provider'
      ]
    };

    $urlRouterProvider
      .when('/main', '/main/'+ pages.main[0])
      .when('/examples', '/examples/' + pages.examples[0])
      .when('/api', '/api/' + pages.api[0])
      .otherwise('/');

    $stateProvider.state('home', {
      url: '/'
    });

    angular.forEach(pages, function(children, stateName){
      $stateProvider.state(stateName, {
        templateUrl: 'partials/' + stateName + '.html',
        controller: capitalize(stateName) + 'Ctrl',
        url: '/' + stateName,
        resolve: {
          pages: function() {
            return children;
          }
        }
      });

      angular.forEach(children, function(childState) {
        console.log('partials/' + stateName + '/' + childState + '.html');
        $stateProvider.state(childState, {
          templateUrl: 'partials/' + stateName + '/' + childState + '.html',
          url: '/' + childState,
          parent: stateName
        });
      });
    });

    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

  });
