/* global angular */
import edaFormViewerDirective, {
	EASY_FORM_VIEWER_DIRECTIVE_NAME
}																	from './eda.easyFormViewer.main.directive';



const FORM_VIEWER_MAIN_MODULE_NAME = 'edaFormViewerMainModule';

export default angular
								.module(FORM_VIEWER_MAIN_MODULE_NAME, [])
								.directive(EASY_FORM_VIEWER_DIRECTIVE_NAME, edaFormViewerDirective);