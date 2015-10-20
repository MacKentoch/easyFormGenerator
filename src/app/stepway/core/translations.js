angular.module("eda.easyFormGenerator.translate", []).config(["$translateProvider", function($translateProvider) {
$translateProvider.translations("de", {
    "SAY_HI"	            : "Hallo",
    
    "EDIT_TAB"		        : "Bearbeiten / Schaffen",
    "PREVIEW_TAB"         : "Vorschau",
    
    "WIZARD_LINES"        : "Linien",
    "WIZARD_LAYOUT"       : "Layout",
    "WIZARD_CONTROLS"     : "Steuerung",
    "WIZARD_SAVE"         : "sparen",    
   
    "PAGER_PREVIOUS"      : "vorher.",
    "PAGER_NEXT"          : "nächste",
    
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
    
    "PAGER_PREVIOUS"      : "Previous",
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
    "NAME_THIS_FORM"      : "Name this form",
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

$translateProvider.translations("es", {
    "SAY_HI"	           : "Hola",
    
    "EDIT_TAB"            : "Editar / Crear",
    "PREVIEW_TAB"         : "Previsualizar",
    
    "WIZARD_LINES"        : "lineas",
    "WIZARD_LAYOUT"       : "diseño",
    "WIZARD_CONTROLS"     : "controles",
    "WIZARD_SAVE"         : "guardar",
    
    "PAGER_PREVIOUS"      : "Anterior",
    "PAGER_NEXT"          : "Siguiente",
    
    "COMMAND_PANEL"       : "Comando",
    "VISUAL_PANEL"        : "Visual",
    
    "ADD_NEW_LINE"        : "Agregar nueva linea",
    
    "SELECTED_LINE"       : "Linea seleccionada",
    
    "NUMBER_OF_COLUMN"    : "numero de columnas",
    "APPLY_CTRL2COL"      : "Aplicar controles a columnas",
    
    "CLIC_TAP_2_OPEN"     : "Click / Toque en la columna para seleccionar controles",
    "SELECT_2_APPLY_COL"  : "Selecciona el control deseado para aplicarlo a la columna",
    
    "CUSTOM_SUBMIT_BTN"   : "Personalizar texto de boton Enviar",
    "CUSTOM_CANCEL_BTN"   : "Personalizar texto de boton Cancelar",
    "NAME_THIS_FORM"      : "Nombrar formulario",
    "SAVE_THIS_FORM"      : "guardar formulario",
    
    "FINAL_STEP"          : "Ultimo paso : previsualizar formulario",
    
    "DATA_MODEL"          : "MODELO DE DATOS",
    "FIELDS_MODEL"        : "MODELO DE CAMPOS (listo para guardar en base de datos uno)",
    
    
    "SELECT_A_CTRL"       : "Selecciona un control",
    "SELECT_CTRL_IN_LIST" : "Selecciona un control de la lista",
    "COL_WILL_BE_BLANK"   : "Columna sera vacia",
    
    "EDIT_PROPERTIES"     : "Editar propiedades",
    
    "HEADER_TEXT"         : "Texto de encabezado",
    "ADD_EDIT_HEADER_HERE": "Agregar / editar texto de encabezado aqui",
    
    "SUBTITLE_TEXT"       : "Texto de subtitulo",
    "ADD_EDIT_SUBTIL_HERE": "Agregar / editar texto de subtitulo aqui",
    
    "LABEL_TEXT"          : "Texto de etiqueta",
    "ADD_EDIT_LABEL_HERE" : "Agregar / editar texto de etiqueta aqui",
    
    "PLACEHOLDER"         : "Marcador",
    "ADD_EDIT_PLACEHOLD"  : "Agregar / editar texto de marcador aqui",
    
    "REQUIRED"            : "Requerido",
    
    "DESCRIPTION"         : "Descripcion",
    "ADDEDIT_DESCRIPTION" : "Agregar / editar descripcion aqui",
    
    "DATE_FORMAT"         : "Formato de fecha",
    
    "ADD_NEW_RADIO"       : "Agregar nuevo radio",
    "ADD_RADIO_PLACEHOLD" : "agregar nuevo radio",
    "EDIT_REMOVE_RADIO"   : "Editar/Eliminar radio",
    "NO_RADIO_ADD_NEW"    : "sin radio : agregar nuevos valores de radio",
    
    "SEARCH_4_OPTION"     : "buscar opcion",
    
    "ADD"                 : "agregar",
    "ORDER"               : "orden",
    "OPTION"              : "opcion",
    "GROUP"               : "grupo",
    
    "ADD_NEW_OPTIONS"     : "agregar nuevas opciones",
    "ADD_A_NEW_OPTION"    : "agregar nueva opcione",
    "EDIT_REMOVE_OPTIONS" : "Editar/Eliminar opciones",
    "NO_OPTION_ADD_NEW"   : "sin opcion : agregar nuevas opciones",
    
    "ADD_NEW_GROUPS"      : "Agregar nuevos grupos",
    "ADD_A_NEW_GROUP"     : "Agregar nuevo grupo",
    "EDIT_GROUPS_OPTIONS" : "Editar/Eliminar opciones/grupos",
    "NO_GROUP_ADD_NEW"    : "agregar nuevos grupos",
    
    "OK"                  : "OK",
    "CANCEL"              : "Cancelar"
});

$translateProvider.translations("fr", {
    "SAY_HI"	           : "Bonjour",
    
    "EDIT_TAB"            : "Edition / Creation",
    "PREVIEW_TAB"         : "Aperçu",
    
    "WIZARD_LINES"        : "lignes",
    "WIZARD_LAYOUT"       : "disposition",
    "WIZARD_CONTROLS"     : "contrôles",
    "WIZARD_SAVE"         : "sauvegarder",
    
    "PAGER_PREVIOUS"      : "Précédent",
    "PAGER_NEXT"          : "Suivant",
    
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
    "SAY_HI"	           : "こんにちわ",
    
    "EDIT_TAB"            : "編集 / 作成",
    "PREVIEW_TAB"         : "プレビュー",
    
    "WIZARD_LINES"        : "ライン",
    "WIZARD_LAYOUT"       : "レイアウト",
    "WIZARD_CONTROLS"     : "コントロール",
    "WIZARD_SAVE"         : "サーブ",
    
    "PAGER_PREVIOUS"      : "前",
    "PAGER_NEXT"          : "次",
    
    "COMMAND_PANEL"       : "コマンド",
    "VISUAL_PANEL"        : "ビジュアル",
    
    "ADD_NEW_LINE"        : "新しいライン追加",
    
    "SELECTED_LINE"       : "選択されたライン",
    
    "NUMBER_OF_COLUMN"    : "カラムの数",
    "APPLY_CTRL2COL"      : "カラムにコントロール適用",
    
    "CLIC_TAP_2_OPEN"     : "コントロール選択を広げるには列をクリック",
    "SELECT_2_APPLY_COL"  : "好きなコントロールを選び適用",
    
    "CUSTOM_SUBMIT_BTN"   : "適用ボタンの文字変更する場合",
    "CUSTOM_CANCEL_BTN"   : "キャンセルボタンの文字変更する場合",
    "NAME_THIS_FORM"      : "形式に名前を付ける",
    "SAVE_THIS_FORM"      : "形式をサーブ",
    
    "FINAL_STEP"          : "ファイナルステップ : プレビュー形式",
    
    "DATA_MODEL"          : "データーモデル",
    "FIELDS_MODEL"        : "モデルフィールド",
    
    
    "SELECT_A_CTRL"       : "コントロールを選び選択",
    "SELECT_CTRL_IN_LIST" : "以下のリストからコントロールを選び選択",
    "COL_WILL_BE_BLANK"   : "空になる列",
    
    "EDIT_PROPERTIES"     : "プロパティの変更",
    
    "HEADER_TEXT"         : "ヘッダーテキスト",
    "ADD_EDIT_HEADER_HERE": "ヘッダーテキスト文字変更",
    
    "SUBTITLE_TEXT"       : "サブタイトル　テキスト",
    "ADD_EDIT_SUBTIL_HERE": "サブタイトルテキスト文字変更",
    
    "LABEL_TEXT"          : "ラベルテキスト",
    "ADD_EDIT_LABEL_HERE" : "ラベルテキスト文字変更",
    
    "PLACEHOLDER"         : "プレースホルダー",
    "ADD_EDIT_PLACEHOLD"  : "プレースホルダー文字変更",
    
    "REQUIRED"            : "必須",
    
    "DESCRIPTION"         : "説明",
    "ADDEDIT_DESCRIPTION" : "説明の変更",
    
    "DATE_FORMAT"         : "日付の形式",
    
    "ADD_NEW_RADIO"       : "新ラジオボタンを追加",
    "ADD_RADIO_PLACEHOLD" : "新ラジオボタンを追加",
    "EDIT_REMOVE_RADIO"   : "ラジオボタン変更",
    "NO_RADIO_ADD_NEW"    : "ラジオ無し : 新ラジオボタン追加",
    
    "SEARCH_4_OPTION"     : "オプション検索",
    
    "ADD"                 : "追加",
    "ORDER"               : "順番",
    "OPTION"              : "オプション",
    "GROUP"               : "グループ",
    
    "ADD_NEW_OPTIONS"     : "新しいオプション追加",
    "ADD_A_NEW_OPTION"    : "新しいオプション追加",
    "EDIT_REMOVE_OPTIONS" : "オプションの変更",
    "NO_OPTION_ADD_NEW"   : "オプション無し : 新しいオプション追加",
    
    "ADD_NEW_GROUPS"      : "新しいグループ追加",
    "ADD_A_NEW_GROUP"     : "新しいグループ追加",
    "EDIT_GROUPS_OPTIONS" : "グループを変更",
    "NO_GROUP_ADD_NEW"    : "グループを追加",
    
    "OK"                : "オッケー",
    "CANCEL"            : "キャンセル"
});

$translateProvider.translations("tr", {
    "SAY_HI"	           : "Merhaba",
    
    "EDIT_TAB"            : "Düzenle / Oluştur",
    "PREVIEW_TAB"         : "Önizleme",
    
    "WIZARD_LINES"        : "satırlar",
    "WIZARD_LAYOUT"       : "düzen",
    "WIZARD_CONTROLS"     : "kontroller",
    "WIZARD_SAVE"         : "kaydet",
    
    "PAGER_PREVIOUS"      : "Geri",
    "PAGER_NEXT"          : "İleri",
    
    "COMMAND_PANEL"       : "Komut",
    "VISUAL_PANEL"        : "Görsel",
    
    "ADD_NEW_LINE"        : "Yeni satır ekle",
    
    "SELECTED_LINE"       : "Seçili satır",
    
    "NUMBER_OF_COLUMN"    : "sütun sayısı",
    "APPLY_CTRL2COL"      : "Sütunlara form ögesi ekle",
    
    "CLIC_TAP_2_OPEN"     : "Form ögesi eklemek için sütunlara tıkla",
    "SELECT_2_APPLY_COL"  : "İstediğin ögeyi seçtikten sonra gerekli yerleri doldur ve kaydet",
    
    "CUSTOM_SUBMIT_BTN"   : "Gönder butonu yazısını düzenle",
    "CUSTOM_CANCEL_BTN"   : "İptal butonu yazısını düzenle",
    "NAME_THIS_FORM"      : "Forma isim ver",
    "SAVE_THIS_FORM"      : "formu kaydet",
    
    "FINAL_STEP"          : "Son aşama : form önizlemesi",
    
    "DATA_MODEL"          : "VERİ MODELİ",
    "FIELDS_MODEL"        : "ALAN MODELİ (veritabanına kaydetmeye hazır)",
    
    
    "SELECT_A_CTRL"       : "Form ögesi seç",
    "SELECT_CTRL_IN_LIST" : "Verilen listeden bir form ögesi seç",
    "COL_WILL_BE_BLANK"   : "Sütun boş kalacak",
    
    "EDIT_PROPERTIES"     : "Özellikleri düzenle",
    
    "HEADER_TEXT"         : "Başlık yazısı",
    "ADD_EDIT_HEADER_HERE": "Başlık yazısını ekle / düzenle",
    
    "SUBTITLE_TEXT"       : "Altyazı",
    "ADD_EDIT_SUBTIL_HERE": "Altyazı ekle / düzenle",
    
    "LABEL_TEXT"          : "Form ögesinin adı",
    "ADD_EDIT_LABEL_HERE" : "Ad ekle / düzenle",
    
    "PLACEHOLDER"         : "Form ögesinin içine geçici yazı ekle",
    "ADD_EDIT_PLACEHOLD"  : "Geçici yazı ekle / düzenle",
    
    "REQUIRED"            : "Gerekli",
    
    "DESCRIPTION"         : "Açıklama",
    "ADDEDIT_DESCRIPTION" : "Açıklama ekle / düzenle",
    
    "DATE_FORMAT"         : "Tarih formatı",
    
    "ADD_NEW_RADIO"       : "Radio butonu ekle",
    "ADD_RADIO_PLACEHOLD" : "radio butonu ekle",
    "EDIT_REMOVE_RADIO"   : "Radio butonunu ekle / düzenle",
    "NO_RADIO_ADD_NEW"    : "radio butonu yok : yeni buton ekle",
    
    "SEARCH_4_OPTION"     : "seçenek ara",
    
    "ADD"                 : "ekle",
    "ORDER"               : "sıra",
    "OPTION"              : "seçenek",
    "GROUP"               : "grup",
    
    "ADD_NEW_OPTIONS"     : "Yeni seçenek ekle",
    "ADD_A_NEW_OPTION"    : "yeni seçenek ekle",
    "EDIT_REMOVE_OPTIONS" : "Seçenekleri düzenle/sil",
    "NO_OPTION_ADD_NEW"   : "seçenek yok : yeni seçenek ekle",
    
    "ADD_NEW_GROUPS"      : "Yeni grup ekle",
    "ADD_A_NEW_GROUP"     : "Yeni grup ekle",
    "EDIT_GROUPS_OPTIONS" : "Seçenek/Grup Ekle/sil",
    "NO_GROUP_ADD_NEW"    : "yeni grup ekle",
    
    "OK"                  : "TAMAM",
    "CANCEL"              : "İptal"
});
}]);
