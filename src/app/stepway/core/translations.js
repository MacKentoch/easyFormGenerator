angular.module("eda.easyFormGenerator.translate", []).config(["$translateProvider", function($translateProvider) {
$translateProvider.translations("de", {
    "TITLE"	: "Hallo",
    "FOO"		: "Das ist leer hier"
});

$translateProvider.translations("en", {
    "TITLE"	: "Hello",
    "FOO"		: "This is a empty for now"
});

$translateProvider.translations("fr", {
    "TITLE"	: "Bonjour",
    "FOO"		: "c'est vide ici"
});

$translateProvider.translations("jp", {
    "TITLE"	: "こんにちは"
});
}]);
