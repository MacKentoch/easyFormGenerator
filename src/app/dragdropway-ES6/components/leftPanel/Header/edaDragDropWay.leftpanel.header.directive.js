import leftPanelHeaderTemplate from '.html!text';

const LEFT_PANEL_HEADER_DIRECTIVE = 'leftPanelHeader';

function leftPanelHeader() {
  let directive = {
    restrict : 'E',
    template : leftPanelHeaderTemplate
  };
  return directive;
}

leftPanelHeader.$inject = [];

export default leftPanelHeader;

export {
  LEFT_PANEL_HEADER_DIRECTIVE
};

