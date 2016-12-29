
import translateConfig from './stepway.translate';

const TRANSLATE_MODULE = 'eda.easyFormGenerator.translate';

export default angular
                .module(TRANSLATE_MODULE, [])
                .config(translateConfig);
