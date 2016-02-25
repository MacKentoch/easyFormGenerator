/* global angular */
import leftPanelController, {
	LEFT_PANEL_CONTROLLER
}														from './edaDragDropWay.leftPanel.controller';
import leftPanel, {
	LEFT_PANEL_DIRECTIVE
}														from './edaDragDropWay.leftPanel.directive';
import selectOptionMange, {
  LEFT_PANEL_SELECT_OPTION_MANAGE_SERVICE
}                           from './edaDragDropWay.leftPanel.selectOptionManage.service';
import controllerModalProxy, {
  CONTROLLER_MODAL_PROXY
}                           from './edaDragDropWay.leftPanel.controllerModalProxy.service';
import leftPanelValidEditFooter, {
  LEFT_PANEL_VALID_EDIT_FOOTER_DIRECTIVE
}                           from './validEditFooter/edaDragDropWay.leftpanel.validEditFooter.directive';
import leftPanelTextInputControl, {
  LEFT_PANEL_TEXT_INPUT_CONTROL_DIRECTIVE
}                           from './TextInputControl/edaDragDropWay.leftpanel.textInputControl.directive';
import leftPanelTextareaControl, {
  LEFT_PANEL_TEXTAREA_CONTROL_DIRECTIVE
}                           from './TextAreaControl/edaDragDropWay.leftpanel.textareaControl.directive';
import leftPanelSubtitleControl, {
  LEFT_PANEL_SUBTITLE_CONTROL_DIRECTIVE
}                           from './SubTitleControl/edaDragDropWay.leftpanel.subtitleControl.directive';
import leftPanelRichTextEditorControl, {
  LEFT_PANEL_RICH_TEXT_EDITOR_CONTROL_DIRECTIVE
}                           from './RichTextEditorControl/edaDragDropWay.leftpanel.richTextEditorControl.directive';
import leftPanelRadioControl, {
  LEFT_PANEL_RADIO_CONTROL_DIRECTIVE
}                           from './RadioControl/edaDragDropWay.leftpanel.radioControl.directive';
import leftPanelPasswordControl, {
  LEFT_PANEL_PASSWORD_CONTROL_DIRECTIVE
}                           from './PasswordControl/edaDragDropWay.leftpanel.passwordControl.directive';
import leftPanelHeaderControl, {
  LEFT_PANEL_HEADER_CONTROL_DIRECTIVE
}                           from './HeaderControl/edaDragDropWay.leftpanel.headerControl.directive';
import leftPanelGroupedSelectControl, {
  LEFT_PANEL_GROUPED_SELECT_CONTROL_DIRECTIVE
}                           from './GroupedSelectControl/edaDragDropWay.leftpanel.groupedSelectControl.directive';
import leftPanelDateControl, {
  LEFT_PANEL_DATE_CONTROL_DIRECTIVE
}                           from './DateControl/edaDragDropWay.leftpanel.dateControl.directive';
import leftPanelCheckBoxControl, {
  LEFT_PANEL_CHECKBOX_CONTROL_DIRECTIVE
}                           from './CheckBoxControl/edaDragDropWay.leftpanel.checkBoxControl.directive';
import leftPanelBlankControl, {
  LEFT_PANEL_BLANK_CONTROL_DIRECTIVE
}                           from './BlankControl/edaDragDropWay.leftpanel.blankControl.directive';
import leftPanelBasicSelectControl, {
  LEFT_PANEL_BASIC_SELECT_CONTROL_DIRECTIVE
}                           from './BasicSelectControl/edaDragDropWay.leftpanel.basicSelectControl.directive';


const LEFT_PANEL_MODULE = 'edaDragDropWay.leftPanel.module';

export default angular
								.module(LEFT_PANEL_MODULE, [])
								.directive(LEFT_PANEL_DIRECTIVE, leftPanel)
								.controller(LEFT_PANEL_CONTROLLER, leftPanelController)
                .service(LEFT_PANEL_SELECT_OPTION_MANAGE_SERVICE, selectOptionMange)
                .service(CONTROLLER_MODAL_PROXY, controllerModalProxy)
                .directive(LEFT_PANEL_VALID_EDIT_FOOTER_DIRECTIVE, leftPanelValidEditFooter)
                .directive(LEFT_PANEL_TEXT_INPUT_CONTROL_DIRECTIVE, leftPanelTextInputControl)
                .directive(LEFT_PANEL_TEXTAREA_CONTROL_DIRECTIVE, leftPanelTextareaControl)
                .directive(LEFT_PANEL_SUBTITLE_CONTROL_DIRECTIVE, leftPanelSubtitleControl)
                .directive(LEFT_PANEL_RICH_TEXT_EDITOR_CONTROL_DIRECTIVE, leftPanelRichTextEditorControl)
                .directive(LEFT_PANEL_RADIO_CONTROL_DIRECTIVE, leftPanelRadioControl)
                .directive(LEFT_PANEL_PASSWORD_CONTROL_DIRECTIVE, leftPanelPasswordControl)
                .directive(LEFT_PANEL_HEADER_CONTROL_DIRECTIVE, leftPanelHeaderControl)
                .directive(LEFT_PANEL_GROUPED_SELECT_CONTROL_DIRECTIVE, leftPanelGroupedSelectControl)
                .directive(LEFT_PANEL_DATE_CONTROL_DIRECTIVE, leftPanelDateControl)
                .directive(LEFT_PANEL_CHECKBOX_CONTROL_DIRECTIVE, leftPanelCheckBoxControl)
                .directive(LEFT_PANEL_BLANK_CONTROL_DIRECTIVE, leftPanelBlankControl)
                .directive(LEFT_PANEL_BASIC_SELECT_CONTROL_DIRECTIVE, leftPanelBasicSelectControl);
