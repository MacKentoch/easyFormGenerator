const DNDLIST_DIRECTIVE = 'dndList';

function dndList($parse, $timeout, dndDropEffectWorkaround, dndDragTypeWorkaround) {
  let directive = {
    link : linkFct
  };
  return directive;

  function linkFct(scope, element, attr) {
    // While an element is dragged over the list, this placeholder element is inserted
    // at the location where the element would be inserted after dropping
    let placeholder     = angular.element('<li class="dndPlaceholder"></li>');
    let placeholderNode = placeholder[0];
    let listNode        = element[0];
    let horizontal      = attr.dndHorizontalList && scope.$eval(attr.dndHorizontalList);
    let externalSources = attr.dndExternalSources && scope.$eval(attr.dndExternalSources);

    /**
     * The dragover event is triggered "every few hundred milliseconds" while an element
     * is being dragged over our list, or over an child element.
     */
    element.on('dragover', (event) => {
      event = event.originalEvent || event;
      if (!isDropAllowed(event)) return true;
      // First of all, make sure that the placeholder is shown
      // This is especially important if the list is empty
      if (placeholderNode.parentNode != listNode) {
        element.append(placeholder);
      }
      if (event.target !== listNode) {
        // Try to find the node direct directly below the list node.
        var listItemNode = event.target;
        while (listItemNode.parentNode !== listNode && listItemNode.parentNode) {
          listItemNode = listItemNode.parentNode;
        }
        if (listItemNode.parentNode === listNode && listItemNode !== placeholderNode) {
          // If the mouse pointer is in the upper half of the child element,
          // we place it before the child element, otherwise below it.
          if (isMouseInFirstHalf(event, listItemNode)) {
            listNode.insertBefore(placeholderNode, listItemNode);
          } else {
            listNode.insertBefore(placeholderNode, listItemNode.nextSibling);
          }
        }
      } else {
        // This branch is reached when we are dragging directly over the list element.
        // Usually we wouldn't need to do anything here, but the IE does not fire it's
        // events for the child element, only for the list directly. Therefore we repeat
        // the positioning algorithm for IE here.
        if (isMouseInFirstHalf(event, placeholderNode, true)) {
          // Check if we should move the placeholder element one spot towards the top.
          // Note that display none elements will have offsetTop and offsetHeight set to
          // zero, therefore we need a special check for them.
          while (placeholderNode.previousElementSibling && (isMouseInFirstHalf(event, placeholderNode.previousElementSibling, true) || placeholderNode.previousElementSibling.offsetHeight === 0)) {
            listNode.insertBefore(placeholderNode, placeholderNode.previousElementSibling);
          }
        } else {
          // Check if we should move the placeholder element one spot towards the bottom
          while (placeholderNode.nextElementSibling &&
               !isMouseInFirstHalf(event, placeholderNode.nextElementSibling, true)) {
            listNode.insertBefore(placeholderNode,
                placeholderNode.nextElementSibling.nextElementSibling);
          }
        }
      }

      // At this point we invoke the callback, which still can disallow the drop.
      // We can't do this earlier because we want to pass the index of the placeholder.
      if (attr.dndDragover && !invokeCallback(attr.dndDragover, event)) {
        return stopDragover();
      }
      element.addClass('dndDragover');
      event.preventDefault();
      event.stopPropagation();
      return false;
    });

    /**
     * When the element is dropped, we use the position of the placeholder element as the
     * position where we insert the transferred data. This assumes that the list has exactly
     * one child element per array element.
     */
    element.on('drop', (event) => {
      event = event.originalEvent || event;
      if (!isDropAllowed(event)) return true;
      // The default behavior in Firefox is to interpret the dropped element as URL and
      // forward to it. We want to prevent that even if our drop is aborted.
      event.preventDefault();
      // Unserialize the data that was serialized in dragstart. According to the HTML5 specs,
      // the "Text" drag type will be converted to text/plain, but IE does not do that.
      var data = event.dataTransfer.getData('Text') || event.dataTransfer.getData('text/plain');
      var transferredObject;
      try {
        transferredObject = JSON.parse(data);
      } catch(e) {
        return stopDragover();
      }
      // Invoke the callback, which can transform the transferredObject and even abort the drop.
      if (attr.dndDrop) {
        transferredObject = invokeCallback(attr.dndDrop, event, transferredObject);
        if (!transferredObject) {
          return stopDragover();
        }
      }
      // Retrieve the JSON array and insert the transferred object into it.
      var targetArray = scope.$eval(attr.dndList);
      scope.$apply(() => {
        targetArray.splice(getPlaceholderIndex(), 0, transferredObject);
      });
      // In Chrome on Windows the dropEffect will always be none...
      // We have to determine the actual effect manually from the allowed effects
      if (event.dataTransfer.dropEffect === 'none') {
        if (event.dataTransfer.effectAllowed === 'copy' ||
            event.dataTransfer.effectAllowed === 'move') {
          dndDropEffectWorkaround.dropEffect = event.dataTransfer.effectAllowed;
        } else {
          dndDropEffectWorkaround.dropEffect = event.ctrlKey ? 'copy' : 'move';
        }
      } else {
        dndDropEffectWorkaround.dropEffect = event.dataTransfer.dropEffect;
      }
      // Clean up
      stopDragover();
      event.stopPropagation();
      return false;
    });

    /**
     * We have to remove the placeholder when the element is no longer dragged over our list. The
     * problem is that the dragleave event is not only fired when the element leaves our list,
     * but also when it leaves a child element -- so practically it's fired all the time. As a
     * workaround we wait a few milliseconds and then check if the dndDragover class was added
     * again. If it is there, dragover must have been called in the meantime, i.e. the element
     * is still dragging over the list. If you know a better way of doing this, please tell me!
     */
    element.on('dragleave', (event) => {
      event = event.originalEvent || event;

      element.removeClass('dndDragover');
      $timeout(() => {
        if (!element.hasClass('dndDragover')) {
          placeholder.remove();
        }
      }, 100);
    });

    /**
     * Checks whether the mouse pointer is in the first half of the given target element.
     *
     * In Chrome we can just use offsetY, but in Firefox we have to use layerY, which only
     * works if the child element has position relative. In IE the events are only triggered
     * on the listNode instead of the listNodeItem, therefore the mouse positions are
     * relative to the parent element of targetNode.
     */
    function isMouseInFirstHalf(event, targetNode, relativeToParent) {
      var mousePointer = horizontal ? (event.offsetX || event.layerX)
                                    : (event.offsetY || event.layerY);
      var targetSize = horizontal ? targetNode.offsetWidth : targetNode.offsetHeight;
      var targetPosition = horizontal ? targetNode.offsetLeft : targetNode.offsetTop;
      targetPosition = relativeToParent ? targetPosition : 0;
      return mousePointer < targetPosition + targetSize / 2;
    }

    /**
     * We use the position of the placeholder node to determine at which position of the array the
     * object needs to be inserted
     */
    function getPlaceholderIndex() {
      return Array.prototype.indexOf.call(listNode.children, placeholderNode);
    }

    /**
     * Checks various conditions that must be fulfilled for a drop to be allowed
     */
    function isDropAllowed(event) {
      // Disallow drop from external source unless it's allowed explicitly.
      if (!dndDragTypeWorkaround.isDragging && !externalSources) return false;
      // Check mimetype. Usually we would use a custom drag type instead of Text, but IE doesn't
      // support that.
      if (!hasTextMimetype(event.dataTransfer.types)) return false;
      // Now check the dnd-allowed-types against the type of the incoming element. For drops from
      // external sources we don't know the type, so it will need to be checked via dnd-drop.
      if (attr.dndAllowedTypes && dndDragTypeWorkaround.isDragging) {
        var allowed = scope.$eval(attr.dndAllowedTypes);
        if (angular.isArray(allowed) && allowed.indexOf(dndDragTypeWorkaround.dragType) === -1) {
          return false;
        }
      }
      // Check whether droping is disabled completely
      if (attr.dndDisableIf && scope.$eval(attr.dndDisableIf)) return false;
      return true;
    }

    /**
     * Small helper function that cleans up if we aborted a drop.
     */
    function stopDragover() {
      placeholder.remove();
      element.removeClass('dndDragover');
      return true;
    }

    /**
     * Invokes a callback with some interesting parameters and returns the callbacks return value.
     */
    function invokeCallback(expression, event, item) {
      return $parse(expression)(scope, {
        event   : event,
        index   : getPlaceholderIndex(),
        item    : item || undefined,
        external: !dndDragTypeWorkaround.isDragging,
        type    : dndDragTypeWorkaround.isDragging ? dndDragTypeWorkaround.dragType : undefined
      });
    }

    /**
     * Check if the dataTransfer object contains a drag type that we can handle. In old versions
     * of IE the types collection will not even be there, so we just assume a drop is possible.
     */
    function hasTextMimetype(types) {
      if (!types) return true;
      for (var i = 0; i < types.length; i++) {
        if (types[i] === 'Text' || types[i] === 'text/plain') return true;
      }
      return false;
    }    
  }
}

const TO_INJECT = [
  '$parse', 
  '$timeout', 
  'dndDropEffectWorkaround', 
  'dndDragTypeWorkaround'
];

dndList.$inject = TO_INJECT;

export default dndList;

export {
  DNDLIST_DIRECTIVE
};
