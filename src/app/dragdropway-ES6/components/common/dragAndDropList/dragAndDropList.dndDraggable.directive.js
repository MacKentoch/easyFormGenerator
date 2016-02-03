const DNDDRAGGABLE_DIRECTIVE = 'dndDraggable';

function dndDraggable($parse, $timeout, dndDropEffectWorkaround, dndDragTypeWorkaround) {
  let directive = {
    link : linkFct
  };
  return directive;

  function linkFct(scope, element, attr) {
    // Set the HTML5 draggable attribute on the element
    element.attr('draggable', 'true');

    // If the dnd-disable-if attribute is set, we have to watch that
    if (attr.dndDisableIf) {
      scope.$watch(attr.dndDisableIf, (disabled) => element.attr('draggable', !disabled));
    }

    /**
     * When the drag operation is started we have to prepare the dataTransfer object,
     * which is the primary way we communicate with the target element
     */
    element.on('dragstart', (event) => {
      event = event.originalEvent || event;
      // Serialize the data associated with this element. IE only supports the Text drag type
      event.dataTransfer.setData('Text', angular.toJson(scope.$eval(attr.dndDraggable)));
      // Only allow actions specified in dnd-effect-allowed attribute
      event.dataTransfer.effectAllowed    = attr.dndEffectAllowed || 'move';
      // Add CSS classes. See documentation above
      element.addClass('dndDragging');
      $timeout(() => { element.addClass('dndDraggingSource'); }, 0);
      // Workarounds for stupid browsers, see description below
      dndDropEffectWorkaround.dropEffect  = 'none';
      dndDragTypeWorkaround.isDragging    = true;
      // Save type of item in global state. Usually, this would go into the dataTransfer
      // typename, but we have to use "Text" there to support IE
      dndDragTypeWorkaround.dragType      = attr.dndType ? scope.$eval(attr.dndType) : undefined;
      // Invoke callback
      $parse(attr.dndDragstart)(scope, {event: event});
      event.stopPropagation();
    });

    /**
     * The dragend event is triggered when the element was dropped or when the drag
     * operation was aborted (e.g. hit escape button). Depending on the executed action
     * we will invoke the callbacks specified with the dnd-moved or dnd-copied attribute.
     */
    element.on('dragend', (event) => {
      event = event.originalEvent || event;

      // Invoke callbacks. Usually we would use event.dataTransfer.dropEffect to determine
      // the used effect, but Chrome has not implemented that field correctly. On Windows
      // it always sets it to 'none', while Chrome on Linux sometimes sets it to something
      // else when it's supposed to send 'none' (drag operation aborted).
      var dropEffect = dndDropEffectWorkaround.dropEffect;
      scope.$apply(() => {
        switch (dropEffect) {
        case 'move':
          $parse(attr.dndMoved)(scope, {event: event});
          break;

        case 'copy':
          $parse(attr.dndCopied)(scope, {event: event});
          break;
        }
      });

      // Clean up
      element.removeClass('dndDragging');
      element.removeClass('dndDraggingSource');
      dndDragTypeWorkaround.isDragging = false;
      event.stopPropagation();
    });

    /**
     * When the element is clicked we invoke the callback function
     * specified with the dnd-selected attribute.
     */
    element.on('click', (event) => {
      event = event.originalEvent || event;
      scope.$apply(() => $parse(attr.dndSelected)(scope, {event: event}));
      event.stopPropagation();
    });

    /**
     * Workaround to make element draggable in IE9
     */
    element.on('selectstart', () => {
      if (this.dragDrop) this.dragDrop();
      return false;
    });
  }
}


const TO_INJECT = [
  '$parse', 
  '$timeout', 
  'dndDropEffectWorkaround', 
  'dndDragTypeWorkaround'
];


dndDraggable.$inject = TO_INJECT;

export default dndDraggable;

export {
  DNDDRAGGABLE_DIRECTIVE
};
