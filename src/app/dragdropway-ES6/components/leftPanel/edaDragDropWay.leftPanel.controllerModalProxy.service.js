/* global angular */
const CONTROLLER_MODAL_PROXY = 'controllerModalProxy';

class controllerModalProxy{
  
  constructor(EasyFormGenFormlyBindingModels){
    this.EasyFormGenFormlyBindingModels = EasyFormGenFormlyBindingModels;
    this.init();
  }
  
  init(){
    this.ProxyModel = {};
    this.resetProxyModel();
  }
  
  // deprecated : in drag and drop version, use "resetProxyModel()""
  resetNyaSelect(nyaSelectObj){
    let newNyaSelectObj = this.EasyFormGenFormlyBindingModels.getEasyFormListControls();
    angular.copy(newNyaSelectObj, nyaSelectObj);
    return true;
  }
  
  
  resetProxyModel(){
    let newProxyModel = this.EasyFormGenFormlyBindingModels.getEasyFormListControls();
    this.proxyModel = angular.copy(newProxyModel);
    return true;
  }  
 
  
  
  
  
}

controllerModalProxy.$inject = [
  'controllerModalProxy'
];

export default controllerModalProxy;

export {
  CONTROLLER_MODAL_PROXY
};