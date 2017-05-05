import easyFormConfig   from '../../../../../package.json';

const EASY_FORM_VERSION_NAME  = 'easyFormGenVersion';
const EASY_FORM_VERSION_VALUE = easyFormConfig.version;
const ACTIVE_MODAL_ANIMATION  = true;

function easyFromConfig(easyFormSteWayConfigProvider){
  //enable/disable easy form modal animation
  easyFormSteWayConfigProvider.setModalAnimation(ACTIVE_MODAL_ANIMATION);
}

easyFromConfig.$inject = ['easyFormSteWayConfigProvider'];

export default easyFromConfig;
export {EASY_FORM_VERSION_NAME, EASY_FORM_VERSION_VALUE};
