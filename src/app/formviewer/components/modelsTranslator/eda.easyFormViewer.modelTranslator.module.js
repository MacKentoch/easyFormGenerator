/* global angular */
import $modelsTranslator, {
	MODEL_TRANSLATOR_SERVICE
}																	from './eda.easyFormViewer.modelTranslator.service';



const FORM_VIEWER_MODEL_TRANSLATOR_MODULE_NAME = 'edaFormViewerModelTranslatorModule';

export default angular
								.module(FORM_VIEWER_MODEL_TRANSLATOR_MODULE_NAME, [])
								.service(MODEL_TRANSLATOR_SERVICE, $modelsTranslator);