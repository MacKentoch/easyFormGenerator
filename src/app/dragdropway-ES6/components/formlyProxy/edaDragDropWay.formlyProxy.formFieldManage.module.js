import formFieldManage, {
  FORM_FIELD_MANAGE_SERVICE
}                         from './edaDragDropWay.formlyProxy.formFieldManage.service';

const FORMLY_PROXY_MODULE = '';

export default angular
                .module(FORMLY_PROXY_MODULE, [])
                .service(FORM_FIELD_MANAGE_SERVICE, formFieldManage);