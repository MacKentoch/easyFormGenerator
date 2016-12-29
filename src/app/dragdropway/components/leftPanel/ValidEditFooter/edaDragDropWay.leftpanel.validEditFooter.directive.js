import leftPanelValidEditFooterTemplate from './edaDragDropWay.leftpanel.validEditFooter.template.html';

const LEFT_PANEL_VALID_EDIT_FOOTER_DIRECTIVE = 'leftPanelValidEditFooter';

function leftPanelValidEditFooter() {
  let directive = {
    restrict : 'E',
    template : leftPanelValidEditFooterTemplate
  };
  return directive;
}

leftPanelValidEditFooter.$inject = [];

export default leftPanelValidEditFooter;

export {
  LEFT_PANEL_VALID_EDIT_FOOTER_DIRECTIVE
};
