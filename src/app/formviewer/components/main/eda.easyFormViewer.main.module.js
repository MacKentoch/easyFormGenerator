/* global angular */
import edaFormViewerDirective, {
	EASY_FORM_VIEWER_DIRECTIVE_NAME
}																	from './eda.easyFormViewer.main.directive';

import edaEasyFormViewerController, {
	EASY_FORM_VIEWER_CONTROLLER
}																	from './eda.easyFormViewer.main.controller';

const FORM_VIEWER_MAIN_MODULE_NAME = 'edaFormViewerMainModule';

export default angular
								.module(FORM_VIEWER_MAIN_MODULE_NAME, [])
								.directive(EASY_FORM_VIEWER_DIRECTIVE_NAME, edaFormViewerDirective)
								.controller(EASY_FORM_VIEWER_CONTROLLER, edaEasyFormViewerController);
