/* global angular */
const DD_DECOR_CONTAINER_CONTROLLER_NAME 		= 'ddDecorContainerController';
const DD_DECOR_CONTAINER_CONTROLLERAS_NAME	= 'ddDecorContainerCtrl';

class ddDecorContainerController{
	
	constructor(){
		this.init();
	}
	
	init(){
		this.config = angular.extend({}, { isEnabled : false });
		/**
			*  TODO (low priority) : make icon css configurable (provider)
			*/		
		this.icons = angular.extend({}, {
			closedClass	: 'glyphicon glyphicon-eye-open',
			opened			: 'glyphicon glyphicon-eye-close'			
		});
	}
	
	collapseFct(){
		this.collpaseAll({exceptThisOne: this.styleParam.WhenIndex});  //note : collpaseAll function is boundToController from directive attribute : 'collpaseAll' : '&ddCollapseAll'
		this.isCollapsed 			= !this.isCollapsed;
		this.isStillCollapsed	= this.isCollapsed; //note : isStillCollapsed is boundToController from directive attribute : 'isStillCollapsed' : '=ddContainerIsCollpased',
	}	
	
	currentIconClass(){
		if (this.isCollapsed) {
			return this.icons.closedClass;
		}else{
			return this.icons.opened;
		}
	}	
	
}

export default ddDecorContainerController;

export {
	DD_DECOR_CONTAINER_CONTROLLER_NAME,
	DD_DECOR_CONTAINER_CONTROLLERAS_NAME
};
