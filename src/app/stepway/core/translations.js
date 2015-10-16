angular.module("eda.easyFormGenerator.translate", []).config(["$translateProvider", function($translateProvider) {
$translateProvider.translations("de", {
    "TITLE"	: "Hallo",
    "FOO"		: "Das ist leer hier"
});

$translateProvider.translations("en", {
    "SAY_HI"	           : "Hello",
    "EDIT_TAB"            : "Edit / Create",
    "WIZARD_LINES"        : "lines",
    "WIZARD_LAYOUT"       : "layout",
    "WIZARD_CONTROLS"     : "controls",
    "WIZARD_SAVE"         : "save",
    "PAGER_PREVIOUS"      : "Prev",
    "PAGER_NEXT"          : "Next",
    
    "COMMAND_PANEL"       : "Command",
    "VISUAL_PANEL"        : "Visual",
    
    "ADD_NEW_LINE"        : "Add a new line",
    
    "SELECTED_LINE"       : "– Selected line –",
    
    "NUMBER_OF_COLUMN"    : "number of columns",
    "APPLY_CTRL2COL"      : "– Apply controls to columns –",
    
    "CLIC_TAP_2_OPEN"     : "Click / Tap on column to open control selection",
    "SELECT_2_APPLY_COL"  : "Select desired control and valid to apply it to column",
    
    "CUSTOM_SUBMIT_BTN"   : "Customize Submit button Text",
    "CUSTOM_CANCEL_BTN"   : "Customize Cancel button Text",
    "NAME_THIS_FORM"      : "Name to this form"
});

$translateProvider.translations("fr", {
    "SAY_HI"	   : "Bonjour",
    "EDIT_TAB"   : "Edition / Creation"
});

$translateProvider.translations("jp", {
    "TITLE"	: "こんにちは"
});
}]);
