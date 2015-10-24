/* global angular */
import $formlyProxy,	{FORMLY_PROXY_SERVICE}	from './edaStepWayEasyFormGen.formlyProxy.service';


const FORMLY_PROXY_MODULE_NAME = 'formlyProxyModule';

export default angular
									.module(FORMLY_PROXY_MODULE_NAME, [])
									.service(FORMLY_PROXY_SERVICE, 		$formlyProxy);