import edaFormViewerMainModule            from './components/main/eda.easyFormViewer.main.module';
import edaFormViewerCoreModule            from './components/core/eda.easyFormViewer.core.module';
import edaFormViewerModelTranslatorModule from './components/modelsTranslator/eda.easyFormViewer.modelTranslator.module';

import edaEasyFormViewerConfig            from '../stepway/config/formly/formly.config.js';

import easyFormConfig                     from '../../../package.json';

const DEP_TO_INJECT_IN_MAIN = [
  edaFormViewerMainModule.name,
  edaFormViewerCoreModule.name,
  edaFormViewerModelTranslatorModule.name
];

const EASY_FORM_VIEWER_VERSION_NAME   = 'easyFormViewerVersion';
const EASY_FORM_VIEWER_VERSION_VALUE  = easyFormConfig.version;
const MAIN_MODULE_NAME                = 'eda.easyFormViewer';

const mainModule = angular
                  .module(MAIN_MODULE_NAME, DEP_TO_INJECT_IN_MAIN)
                  .config(edaEasyFormViewerConfig)
                  .value(EASY_FORM_VIEWER_VERSION_NAME, EASY_FORM_VIEWER_VERSION_VALUE);

export default mainModule;
