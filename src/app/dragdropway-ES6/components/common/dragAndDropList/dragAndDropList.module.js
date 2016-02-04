import dndList, {
  DNDLIST_DIRECTIVE
}                       from './dragAndDropList.dndlist.directive';

import dndDraggable, {
  DNDDRAGGABLE_DIRECTIVE
}                       from './dragAndDropList.dndDraggable.directive';

const DRAG_DROP_LIST_MODULE = 'dndLists.module';

export default angular
                .module(DRAG_DROP_LIST_MODULE, [])
                .directive(DNDLIST_DIRECTIVE, dndList)
                .directive(DNDDRAGGABLE_DIRECTIVE, dndDraggable)
                .factory('dndDragTypeWorkaround', function(){ return {}; })
                .factory('dndDropEffectWorkaround', function(){ return {}; });
