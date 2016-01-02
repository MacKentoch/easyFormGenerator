const TRUST_THIS_FILTER_NAME = 'trustThis';

function trustThis($sce) {
  return (value, type) => $sce.trustAs(type || 'html', value);
}

trustThis.$inject = [
  '$sce'
];

export default trustThis;

export {
  TRUST_THIS_FILTER_NAME
};