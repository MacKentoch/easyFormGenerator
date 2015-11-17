/* global angular */
import edaRightClick, {
	EDA_RIGHT_CLICK_DIRECTIVE
}														from './edaDragDropWay.rightClick.directive';

const EDA_RIGHT_CLICK_MODULE = 'eda.right.click.module';


export default angular
								.module(EDA_RIGHT_CLICK_MODULE, [])
								.directive(EDA_RIGHT_CLICK_DIRECTIVE, edaRightClick);