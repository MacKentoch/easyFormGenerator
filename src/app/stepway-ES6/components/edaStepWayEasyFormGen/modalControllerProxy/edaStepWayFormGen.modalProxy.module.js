/* global angular */
import $modalProxy,	{CONTROLLER_MODAL_PROXY_SERVICE}	from './edaStepWayEasyFormGen.modalProxy.service.js';


const MODAL_PROXY_MODULE_NAME = 'modalProxyModule';

export default angular
									.module(MODAL_PROXY_MODULE_NAME, [])
									.service(CONTROLLER_MODAL_PROXY_SERVICE,	$modalProxy);