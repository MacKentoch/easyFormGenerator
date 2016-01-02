import trustThis, {
  TRUST_THIS_FILTER_NAME
} from './';


const TRUST_THIS_FILTER_MODULE = 'edaDragDropWay.trustThis.filter';

export default angular
                .module(TRUST_THIS_FILTER_MODULE, [])
                .filter(TRUST_THIS_FILTER_NAME, trustThis);