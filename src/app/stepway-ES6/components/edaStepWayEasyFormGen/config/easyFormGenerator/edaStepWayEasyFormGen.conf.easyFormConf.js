const EASY_FORM_VERSION_NAME 	= 'easyFormGenVersion';
const EASY_FORM_VERSION_VALUE = 'v1.1.0';
const ACTIVE_MODAL_ANIMATION 	= false;
   
function easyFromConfig(easyFormSteWayConfigProvider){
	//enable/disable easy form modal animation 
	//HERE : disabling animation due to angular bootstrap backdrop bug with angular >= 1.4
	easyFormSteWayConfigProvider.setModalAnimation(ACTIVE_MODAL_ANIMATION);
}

easyFromConfig.$inject = ['easyFormSteWayConfigProvider'];

export default easyFromConfig;
export {EASY_FORM_VERSION_NAME, EASY_FORM_VERSION_VALUE};