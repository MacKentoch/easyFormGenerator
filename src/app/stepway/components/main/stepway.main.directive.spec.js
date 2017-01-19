'use strict';

/*eslint-env node, jasmine */
/*global inject module:true*/

describe('directive : edaStepWayEasyFormGen', () => {

    let element;
    let scope;

    beforeEach(angular.mock.module('eda.easyformGen.stepway'));

    beforeEach(inject(function(_$rootScope_,_$compile_) {
      const $rootScope = _$rootScope_;
      const $compile = _$compile_;

      scope   = $rootScope.$new();

      const template = `
      <eda-step-way-easy-form-gen
            eda-easy-form-generator-model="demoCtrl.easyFormGeneratorModel"
            eda-save-form-event="demoCtrl.saveForm(edaEasyFormGeneratorModel)">
      </eda-step-way-easy-form-gen>
      `;

      element = angular.element(template);

      $compile(element)(scope);
    }));

    it('should display the defined name', () => {
        const testModel = {};

        scope.easyFormGeneratorModel = testModel;
        scope.$digest();

        expect(element.text()).toContain(''); // to be continued
    });
});
