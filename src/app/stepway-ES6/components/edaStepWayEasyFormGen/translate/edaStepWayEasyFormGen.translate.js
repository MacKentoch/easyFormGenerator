import localEn from '../i18n/local-en.json!json';
import localFr from '../i18n/local-fr.json!json';
import localEs from '../i18n/local-es.json!json';
import localDe from '../i18n/local-de.json!json';
import localTr from '../i18n/local-tr.json!json';
import localJp from '../i18n/local-jp.json!json';

const TRANSLATE_CONFIG = 'easyFormTranslateConfig';

function translateConfig($translateProvider){
	$translateProvider.translations('en', localEn);
	$translateProvider.translations('fr', localFr);
	$translateProvider.translations('es', localEs);
	$translateProvider.translations('de', localDe);
	$translateProvider.translations('tr', localTr);
	$translateProvider.translations('jp', localJp);
}

translateConfig.$inject = ['$translateProvider'];
export default translateConfig;
export {TRANSLATE_CONFIG};