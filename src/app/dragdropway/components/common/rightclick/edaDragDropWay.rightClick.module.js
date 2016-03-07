import edaRightClick, {
	EDA_RIGHT_CLICK_DIRECTIVE
}														from './edaDragDropWay.rightClick.directive';

import ddItemRightClickedManager, {
	EDA_RIGHT_CLICKED_MANAGER_SERVICE
}														from './edaDragDropWay.rightClick.service';


const EDA_RIGHT_CLICK_MODULE = 'eda.right.click.module';


export default angular
								.module(EDA_RIGHT_CLICK_MODULE, [])
								.directive(EDA_RIGHT_CLICK_DIRECTIVE, edaRightClick)
								.service(EDA_RIGHT_CLICKED_MANAGER_SERVICE, ddItemRightClickedManager);