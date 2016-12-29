import selectOptionManage, {
  SELECT_OPTION_MANAGE_NAME
}                            from './stepway.selectOptionManage.service';

const COMMON_MODULE_NAME = 'commonModule';

export default angular
                  .module(COMMON_MODULE_NAME, [])
                  .service(SELECT_OPTION_MANAGE_NAME,   selectOptionManage);
