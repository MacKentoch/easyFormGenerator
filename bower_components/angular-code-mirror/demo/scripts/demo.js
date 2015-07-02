angular.module('app', ['ng-code-mirror'])
  .controller('MainController', function($scope) {

    $scope.code = '/*this is javascript example*/\n' +
      'function foo() {\n' +
      '  return bar;\n' +
      '} \n' +
      '/**\n' +
      ' * @ngdoc directive\n' +
      ' * @param String\n' +
      ' * @return ..\n' +
      ' * @example\n' +
      ' * <code-mirror lang="js" model="code"></code-mirror>\n' +
      ' */\n\n' +
      '/*lets write some Java code..*/\n' +
      'Class Bar extends Baz \n' +
      '{\n' +
      '  private int _x;\n' +
      '\n' +
      '  public Bar(int x)\n' +
      '  { \n' +
      '    ...\n' +
      '  }\n' +
      '}\n' +
      ''
  });