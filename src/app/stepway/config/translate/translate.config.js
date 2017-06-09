import localEn   from '../../i18n/local-en.json';
import localFr   from '../../i18n/local-fr.json';
import localEs   from '../../i18n/local-es.json';
import localDe   from '../../i18n/local-de.json';
import localTr   from '../../i18n/local-tr.json';
import localJp   from '../../i18n/local-jp.json';
import localPtBr from '../../i18n/local-pt-br.json';
import localZh   from '../../i18n/local-zh.json';

export const TRANSLATE_CONFIG = 'easyFormTranslateConfig';

function translateConfig($translateProvider) {
  $translateProvider.translations('en', localEn);
  $translateProvider.translations('fr', localFr);
  $translateProvider.translations('es', localEs);
  $translateProvider.translations('de', localDe);
  $translateProvider.translations('tr', localTr);
  $translateProvider.translations('jp', localJp);
  $translateProvider.translations('pt-br', localPtBr);
  $translateProvider.translations('zh', localZh);
}
translateConfig.$inject = ['$translateProvider'];


export const TRANSLATE_MODULE = 'eda.easyFormGenerator.translate';
export default angular
                .module(TRANSLATE_MODULE, [])
                .config(translateConfig);
