import formFieldManage, {
  FORM_FIELD_MANAGE_SERVICE
}                         from './edaDragDropWay.formlyProxy.formFieldManage.service';

import EasyFormGenFormlyBindingModels, {
  EASY_FORM_FORMLY_BINDING_MODEL_PROVIDER
}                         from './edaDragDropWay.formlyProxy.formFieldManage.provider';



const FORMLY_PROXY_MODULE = '';

export default angular
                .module(FORMLY_PROXY_MODULE, [])
                .service(FORM_FIELD_MANAGE_SERVICE, formFieldManage)
                .provider(EASY_FORM_FORMLY_BINDING_MODEL_PROVIDER, EasyFormGenFormlyBindingModels);