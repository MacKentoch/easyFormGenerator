angular.module("eda.easyFormGenerator.translate", []).config(["$translateProvider", function($translateProvider) {
$translateProvider.translations("de", {
    "SAY_HI"	            : "Hallo",
    
    "EDIT_TAB"		        : "Bearbeiten / Schaffen",
    "PREVIEW_TAB"         : "Vorschau",
    
    "WIZARD_LINES"        : "Linien",
    "WIZARD_LAYOUT"       : "Layout",
    "WIZARD_CONTROLS"     : "Steuerung",
    "WIZARD_SAVE"         : "sparen",    
   
    "PAGER_PREVIOUS"      : "Vor.",
    "PAGER_NEXT"          : "Neb.",
    
    "COMMAND_PANEL"       : "Anweisung",
    "VISUAL_PANEL"        : "visuell",   
    
    "ADD_NEW_LINE"        : "Hinzufügen neuer Leitung",
    "SELECTED_LINE"       : "ausgewählte Linie",
    
    "NUMBER_OF_COLUMN"    : "Anzahl von Spalten",
    "APPLY_CTRL2COL"      : "gelten diese Steuer Spalte",
    
    "CLIC_TAP_2_OPEN"     : "klicken Sie auf Spalte zur Steuerungsauswahl öffnen",
    "SELECT_2_APPLY_COL"  : "Wählen Sie die gewünschte Steuerung und gültig , um es in Spalte anwenden",
    
    "CUSTOM_SUBMIT_BTN"   : "Passen Submit-Button Text",
    "CUSTOM_CANCEL_BTN"   : "Passen Cancel-Button Text",
    "NAME_THIS_FORM"      : "Nennen dieses Formular",
    "SAVE_THIS_FORM"      : "Speichern dieses Formular",
    
    "FINAL_STEP"          : "Endschritt : Formular Vorschau",
    
    "DATA_MODEL"          : "DATEN MODELL", 
    "FIELDS_MODEL"        : "FELDER MODELL (Datenbank-kompatibel)", 
    
    "SELECT_A_CTRL"       : "Wählen Sie ein Steuer",
    "SELECT_CTRL_IN_LIST" : "Wählen Sie ein Steuer aus der Liste unten",
    "COL_WILL_BE_BLANK"   : "die Spalte werde leer sein",  
    
    "EDIT_PROPERTIES"     : "Anzeigen",
    
    "HEADER_TEXT"         : "Kopftext",
    "ADD_EDIT_HEADER_HERE": "Kopftext ändern", 
    
    "SUBTITLE_TEXT"       : "Untertitel",
    "ADD_EDIT_SUBTIL_HERE": "Untertitel ändern",
    
    "LABEL_TEXT"          : "Etikett",
    "ADD_EDIT_LABEL_HERE" : "Etikett ändern",    
    
    "PLACEHOLDER"         : "placeholder",
    "ADD_EDIT_PLACEHOLD"  : "placeholder ändern",
    
    "REQUIRED"            : "erforderlich",
    
    "DESCRIPTION"         : "Beschreibung",
    "ADDEDIT_DESCRIPTION" : "Beschreibung ändern", 
    
    "DATE_FORMAT"         : "Datumsformat", 
    
    "ADD_NEW_RADIO"       : "Radiobutton hinzufügen", 
    "ADD_RADIO_PLACEHOLD" : "Radiobutton hinzufügen",
    "EDIT_REMOVE_RADIO"   : "Radiobutton ändern",
    "NO_RADIO_ADD_NEW"    : "kein Radiobutton : Radiobutton hinzufügen", 
    
    "SEARCH_4_OPTION"     : "option suchen",   
    
    "ADD"                 : "hinzufügen",
    "ORDER"               : "bestellen",
    "OPTION"              : "Option",
    "GROUP"               : "Gruppe",    
    
    "ADD_NEW_OPTIONS"     : "Optionen hinzufügen",
    "ADD_A_NEW_OPTION"    : "Option hinzufügen",
    "EDIT_REMOVE_OPTIONS" : "Optionen ändern",
    "NO_OPTION_ADD_NEW"   : "kein option : Option hinzufügen",              
         
         
    "ADD_NEW_GROUPS"      : "Gruppen hinzufügen",
    "ADD_A_NEW_GROUP"     : "Gruppe hinzufügen",
    "EDIT_GROUPS_OPTIONS" : "Gruppen ändern",
    "NO_GROUP_ADD_NEW"    : "keine Gruppe : Gruppe hinzufügen",  
    
    "OK"                  : "bestätigen",
    "CANCEL"              : "stornieren"    
           
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
    
    "SELECTED_LINE"       : "Selected line",
    
    "NUMBER_OF_COLUMN"    : "number of columns",
    "APPLY_CTRL2COL"      : "Apply controls to columns",
    
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
    "ADD_EDIT_SUBTIL_HERE": "Add / edit subtitle text here",
    
    "LABEL_TEXT"          : "Label text",
    "ADD_EDIT_LABEL_HERE" : "Add / edit control label here",
    
    "PLACEHOLDER"         : "placeholder",
    "ADD_EDIT_PLACEHOLD"  : "Add / edit placeholder text here",
    
    "REQUIRED"            : "Required",
    
    "DESCRIPTION"         : "Description",
    "ADDEDIT_DESCRIPTION" : "Add / edit description here",
    
    "DATE_FORMAT"         : "Date format",
    
    "ADD_NEW_RADIO"       : "Add new radio",
    "ADD_RADIO_PLACEHOLD" : "add new radio",
    "EDIT_REMOVE_RADIO"   : "Edit/Remove radio",
    "NO_RADIO_ADD_NEW"    : "no radio : add new radio values",
    
    "SEARCH_4_OPTION"     : "search for option",
    
    "ADD"                 : "add",
    "ORDER"               : "order",
    "OPTION"              : "option",
    "GROUP"               : "group",
    
    "ADD_NEW_OPTIONS"     : "Add new options",
    "ADD_A_NEW_OPTION"    : "add new option",
    "EDIT_REMOVE_OPTIONS" : "Edit/Remove options",
    "NO_OPTION_ADD_NEW"   : "no option : add new options",
    
    "ADD_NEW_GROUPS"      : "Add new groups",
    "ADD_A_NEW_GROUP"     : "Add new group",
    "EDIT_GROUPS_OPTIONS" : "Edit/Remove options/groups",
    "NO_GROUP_ADD_NEW"    : "add new groups",
    
    "OK"                  : "OK",
    "CANCEL"              : "Cancel"
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
    
    "SELECTED_LINE"       : "Ligne sélectionnée",
    
    "NUMBER_OF_COLUMN"    : "nombre de colonnes",
    "APPLY_CTRL2COL"      : "Appliquer les contrôles aux colonnes",
    
    "CLIC_TAP_2_OPEN"     : "Cliquer sur une colonne pour ouvrir le menu d'édition",
    "SELECT_2_APPLY_COL"  : "Sélectionner un contrôle puis valider pour l'appliquer à la colonne",
    
    "CUSTOM_SUBMIT_BTN"   : "Personnaliser le texte du bouton envoie",
    "CUSTOM_CANCEL_BTN"   : "Personnaliser le texte du bouton annuler",
    "NAME_THIS_FORM"      : "Nommer le formulaire",
    "SAVE_THIS_FORM"      : "sauvegarder le formulaire",
    
    "FINAL_STEP"          : "Dernière étape : aperçu du formulaire",
    
    "DATA_MODEL"          : "MODELE DE DONNEES",
    "FIELDS_MODEL"        : "MODELE DES CHAMPS (modèle compatible base de données)",

  
    "SELECT_A_CTRL"       : "Sélectionner un contrôle",
    "SELECT_CTRL_IN_LIST" : "Sélectionner un contrôle dans la liste ci-dessous",
    "COL_WILL_BE_BLANK"   : "La colonne sera vide",
    
    "EDIT_PROPERTIES"     : "Editer les propriétés",
    
    "HEADER_TEXT"         : "Texte du titre principal",
    "ADD_EDIT_HEADER_HERE": "Editer le textes du titre principal",
    
    "SUBTITLE_TEXT"       : "Texte du sous-titre",
    "ADD_EDIT_SUBTIL_HERE": "Editer le textes du sous-titre",
    
    "LABEL_TEXT"          : "Texte de l'étiquette",
    "ADD_EDIT_LABEL_HERE" : "Editer le texte de l'étiquette",
    
    "PLACEHOLDER"         : "placeholder",
    "ADD_EDIT_PLACEHOLD"  : "Editer le placeholder",
    
    "REQUIRED"            : "Requis",
    
    "DESCRIPTION"         : "Description",
    "ADDEDIT_DESCRIPTION" : "Ajouter / editer la description",
    
    "DATE_FORMAT"         : "Format de la date",
    
    "ADD_NEW_RADIO"       : "Ajouter un nouveau choix à cocher",
    "ADD_RADIO_PLACEHOLD" : "Ajouter un nouveau choix à cocher",
    "EDIT_REMOVE_RADIO"   : "Editer / supprimer un choix à cocher",
    "NO_RADIO_ADD_NEW"    : "aucun choix à cocher : en ajouter un",
    
    "SEARCH_4_OPTION"     : "rechercher une option",
    
    "ADD"                 : "ajouter",
    "ORDER"               : "ordre",
    "OPTION"              : "option",
    "GROUP"               : "groupe",
    
    "ADD_NEW_OPTIONS"     : "Ajouter de nouvelles options",
    "ADD_A_NEW_OPTION"    : "ajoutre une option",
    "EDIT_REMOVE_OPTIONS" : "Editer / supprimer des options",
    "NO_OPTION_ADD_NEW"   : "aucune option : en ajouter",
    
    "ADD_NEW_GROUPS"      : "Ajouter de nouveaux groupes",
    "ADD_A_NEW_GROUP"     : "Ajouter un nouveau groupe",
    "EDIT_GROUPS_OPTIONS" : "Editer / supprimer les groupes et options",
    "NO_GROUP_ADD_NEW"    : "ajouter de nouveaux groupes",
    
    "OK"                : "Valider",
    "CANCEL"            : "Annuler"        
});

$translateProvider.translations("jp", {
    "TITLE"	: "こんにちは"
});
}]);
