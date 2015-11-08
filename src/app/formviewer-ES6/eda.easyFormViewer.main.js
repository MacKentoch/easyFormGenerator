/* global angular */
import './eda.easyFormViewer.vendors.adapaters';
import edaFormViewerMainModule 						from './components/main/eda.easyFormViewer.main.module';
import edaFormViewerCoreModule						from './components/core/eda.easyFormViewer.core.module';
import edaFormViewerModelTranslatorModule	from './components/modelsTranslator/eda.easyFormViewer.modelTranslator.module'; 


const DEP_TO_INJECT_IN_MAIN = [
	edaFormViewerMainModule.name,
	edaFormViewerCoreModule.name,
	edaFormViewerModelTranslatorModule.name
];

const MAIN_MODULE_NAME = 'eda.easyFormViewer';

let mainModule = angular
									.module(MAIN_MODULE_NAME, DEP_TO_INJECT_IN_MAIN);
									
export default mainModule;