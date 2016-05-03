import {
  pagerComponent,
  PAGER_COMPONENT_NAME
}                       from './stepway.main.pager.component';

const PAGER_COMPONENT_MODULE = 'stepway.pager.module';

export default angular
                .module(PAGER_COMPONENT_MODULE, [])
                .component(PAGER_COMPONENT_NAME, pagerComponent);
