import dropzone, {
  DROP_ZONE_DIRECTIVE_NAME
}                           from './edaStepWayEasyFormGen.dropzone.directive';

const DROP_ZONE_MODULE_NAME = 'easyFirmStepWay.dropzone.module';

export default angular
                .module(DROP_ZONE_MODULE_NAME, [])
                .directive(DROP_ZONE_DIRECTIVE_NAME, dropzone);
