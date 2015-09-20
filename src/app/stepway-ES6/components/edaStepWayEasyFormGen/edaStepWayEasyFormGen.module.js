import edaStepWayEasyFormGenDirective from 'edaStepWayEasyFormGen.directive.js';

const STEP_WAY_DIRECTIVE_NAME = 'edaStepWayEasyFormGen';
 
export default angular
                .module(STEP_WAY_DIRECTIVE_NAME, [])
                .directive(STEP_WAY_DIRECTIVE_NAME, edaStepWayEasyFormGenDirective);
