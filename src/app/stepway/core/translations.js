angular.module("eda.easyFormGenerator.translate", []).config(["$translateProvider", function($translateProvider) {
$translateProvider.translations("de", {
    "TITLE"	: "Hallo",
    "FOO"		: "Das ist leer hier"
});

$translateProvider.translations("en", {
    "SAY_HI"	           : "Hello",
    
    "EDIT_TAB"            : "Edit / Create",
    "PREVIEW_TAB"         : "Preview",
    
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
    "NAME_THIS_FORM"      : "Name to this form",
    "SAVE_THIS_FORM"      : "save this form",
    
    "FINAL_STEP"          : "Final Step : form preview",
    
    "DATA_MODEL"          : "DATA MODEL",
    "FIELDS_MODEL"        : "FIELDS MODEL (ready to save to database one)",
    
    
    "SELECT_A_CTRL"       : "Select a control",
    "SELECT_CTRL_IN_LIST" : "Select a control in the list below",
    "COL_WILL_BE_BLANK"   : "Column will be blank",
    "EDIT_PROPERTIES"     : "Edit properties",
    "HEADER_TEXT"         : "Header text",
    "ADD_EDIT_HEADER_HERE": "Add / edit header text here",
    "SUBTITLE_TEXT"       : "Subtitle text",
    "ADD_EDIT_SUBTIL_HERE": "Add / edit subtitle text here"
});

$translateProvider.translations("fr", {
    "SAY_HI"	           : "Bonjour",
    
    "EDIT_TAB"            : "Edition / Creation",
    "PREVIEW_TAB"         : "Aperçu",
    
    "WIZARD_LINES"        : "lignes",
    "WIZARD_LAYOUT"       : "disposition",
    "WIZARD_CONTROLS"     : "contrôles",
    "WIZARD_SAVE"         : "sauvegarder",
    
    "PAGER_PREVIOUS"      : "Prec",
    "PAGER_NEXT"          : "Suiv",
    
    "COMMAND_PANEL"       : "Commandes",
    "VISUAL_PANEL"        : "Visuel",
    
    "ADD_NEW_LINE"        : "Ajouter une nouvelle ligne",
    
    "SELECTED_LINE"       : "– Ligne sélectionnée –",
    
    "NUMBER_OF_COLUMN"    : "nombre de colonnes",
    "APPLY_CTRL2COL"      : "– Appliquer les contrôles aux colonnes –",
    
    "CLIC_TAP_2_OPEN"     : "Cliquer sur une colonne pour ouvrir le menu d'édition",
    "SELECT_2_APPLY_COL"  : "Sélectionner un contrôle puis valider pour l'appliquer à la colonne",
    
    "CUSTOM_SUBMIT_BTN"   : "Personnaliser le texte du bouton envoie",
    "CUSTOM_CANCEL_BTN"   : "Personnaliser le texte du bouton annuler",
    "NAME_THIS_FORM"      : "Nommer le formulaire",
    "SAVE_THIS_FORM"      : "sauvegarder le formulaire",
    
    "FINAL_STEP"          : "Dernière étape : aperçu du formulaire",
    
    "DATA_MODEL"          : "MODELE DE DONNEES",
    "FIELDS_MODEL"        : "MODELE DES CHAMPS (modèle compatible base de données)"
        
});

$translateProvider.translations("jp", {
    "TITLE"	: "こんにちは"
});
}]);
