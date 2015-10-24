/* global angular */
import selectOptionManage, 		{SELECT_OPTION_MANAGE_NAME} 			from './edaStepWayEasyFormGen.common.selectOption.service';
import formFieldManage, 			{FORM_FIELD_MANAGE_SERVICE} 			from './edaStepWayEasyFormGen.common.formfieldsManage.service';
import controllerModalProxy,	{CONTROLLER_MODAL_PROXY_SERVICE}	from './edaStepWayEasyFormGen.common.editControlModalProxy.service';

const COMMON_MODULE_NAME = 'commonModule';

export default angular
									.module(COMMON_MODULE_NAME, [])
									.service(SELECT_OPTION_MANAGE_NAME, 			selectOptionManage)
									.service(FORM_FIELD_MANAGE_SERVICE, 			formFieldManage)
									.service(CONTROLLER_MODAL_PROXY_SERVICE,	controllerModalProxy);