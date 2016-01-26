import ddModelConfModelProxyService, {
	DRAG_DROP_CONFIG_PROXY_SERVICE
}														from './edaDragDropWay.configurationModelProxy.service';

const EDA_CONFIG_PROXY_MODULE = 'eda.config.proxy.module';

export default angular
								.module(EDA_CONFIG_PROXY_MODULE, [])
								.service(DRAG_DROP_CONFIG_PROXY_SERVICE, ddModelConfModelProxyService);