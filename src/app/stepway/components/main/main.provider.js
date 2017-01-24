const EASY_FORM_STEP_WAY_CONFIG_NAME = 'easyFormSteWayConfig';

function easyFormSteWayConfig($translateProvider) {
  const _configuration    = defaultConfig();
  const _controlsList     = controlsList();
  const _defaultLanguage  = getDefaultLanguage();
  let _currentLanguage    = initDefaultLanguage();
  let _showPreviewPanel   = getDefaultshowPreviewPanel();
  let _showPreviewModels  = getDefaultShowPreviewModel();

  this.$get               = easyFormStepWayConfigGET;
  this.setModalAnimation  = setModalAnimation;
  this.getModalAnimation  = getModalAnimation;
  this.configuration      = _configuration;
  this.getEnabledControls = getEnabledControls;
  this.disableControl     = disableControl;
  this.enableControl      = enableControl;
  this.setLanguage        = setLanguage;
  this.getCurrentLanguage = getCurrentLanguage;
  this.showPreviewPanel   = showPreviewPanel;
  this.showPreviewModels  = showPreviewModels;

  //set default config
  function defaultConfig() {
    const  _defaultConfiguration = {
      modalAnimated : false
    };
    return _defaultConfiguration;
  }

  //show preview panel by default
  function getDefaultshowPreviewPanel() {
    return true;
  }

  //show preview data, fields models in preview panel
  function getDefaultShowPreviewModel() {
    return true;
  }

  function getCurrentLanguage() {
      return _currentLanguage;
  }

  //list of controls
  function controlsList() {
    const controls = [
      {name: 'empty',          enabled: true},
      {name: 'Header',         enabled: true},
      {name: 'Subtitle',       enabled: true},
      {name: 'TextInput',      enabled: true},
      {name: 'Password',       enabled: true},
      {name: 'Email',          enabled: true},
      {name: 'IpAdress',       enabled: true},
      {name: 'Date',           enabled: true},
      {name: 'Texarea',        enabled: true},
      {name: 'RichTextEditor', enabled: true},
      {name: 'Radio',          enabled: true},
      {name: 'Checkbox',       enabled: true},
      {name: 'BasicSelect',    enabled: true},
      {name: 'GroupedSelect',  enabled: true}
    ];
    return controls;
  }

  function showPreviewPanel(wantToShow) {
    if (angular.isDefined(wantToShow)) {
      if(wantToShow === true)  _showPreviewPanel = true;
      if(wantToShow === false) _showPreviewPanel = false;
    }
  }

  function showPreviewModels(wantToShow) {
    if (angular.isDefined(wantToShow)) {
      if(wantToShow === true)  _showPreviewModels = true;
      if(wantToShow === false) _showPreviewModels = false;
    }
  }

  //language : set default to english
  function getDefaultLanguage() {
    const lang = 'en';
    return lang;
  }

  function setDefaultLanguage() {
    _currentLanguage = _defaultLanguage;
    $translateProvider.preferredLanguage(_currentLanguage);
    return _currentLanguage;
  }

  function setLanguage(language) {
    if (angular.isString(language)) {
      _currentLanguage = language;
      $translateProvider.preferredLanguage(language);
    } else {
      setDefaultLanguage();
    }
  }

  function initDefaultLanguage() {
    $translateProvider.useSanitizeValueStrategy('escape');   //security : Enable escaping of HTML
    $translateProvider.fallbackLanguage(_defaultLanguage);  //fallback language to default language
    $translateProvider.preferredLanguage(_defaultLanguage);
    return _defaultLanguage;
  }

  function getEnabledControls() {
    return _controlsList;
  }

  function disableControl(control) {
    if (angular.isString(control)) {
      angular.forEach(_controlsList, (aControl) => {
        if (aControl.name === control) aControl.enabled = false;
      });
    } else if (angular.isArray(control)) {
      angular.forEach(control, (controlName) => {
        angular.forEach(_controlsList, (aControl) => {
          if (aControl.name === controlName) aControl.enabled = false;
        });
      });
    }
  }

  function enableControl(control) {
    if (angular.isString(control)) {
      angular.forEach(_controlsList, (aControl) => {
        if (aControl.name === control) aControl.enabled = true;
      });
    } else if (angular.isArray(control)) {
      angular.forEach(control, (controlName) => {
        angular.forEach(_controlsList, (aControl) => {
          if (aControl.name === controlName) aControl.enabled = true;
        });
      });
    }
  }

  function setModalAnimation(flagConfig) {
    const valueToApply = (flagConfig === true)
                        ? flagConfig
                        : (flagConfig === false
                          ? flagConfig
                          : _configuration.modalAnimated);

    _configuration.modalAnimated = valueToApply;
  }

  function getModalAnimation(){
    return _configuration.modalAnimated;
  }


  //$get implementation :
  easyFormStepWayConfigGET.$inject = ['$translate'];
  function easyFormStepWayConfigGET($translate) {
    const service = {
      setModalAnimation:        setModalAnimationFct,
      getModalAnimationValue:   getModalAnimationValue,
      getListEnabledControl:    getListEnabledControl,
      setLanguage:              switchLanguage,
      getCurrentLanguage:       getCurrentLanguage,
      isPreviewPanelVisible:    isPreviewPanelVisible,
      arePreviewModelsVisible:  arePreviewModelsVisible
    };
    return service;

    function getModalAnimationValue() {
      return _configuration.modalAnimated;
    }

    function setModalAnimationFct(value) {
      setModalAnimation(value);
    }

    function getListEnabledControl() {
      return angular.copy(_controlsList);
    }

    function switchLanguage(language) {
      if (angular.isString(language)) {
        _currentLanguage = language;
        $translate.use(language);
      } else {
        setDefaultLanguage();
      }
    }

    function isPreviewPanelVisible() {
      return _showPreviewPanel;
    }

    function arePreviewModelsVisible() {
      return _showPreviewModels;
    }
  }
}

easyFormSteWayConfig.$inject = ['$translateProvider'];
export default easyFormSteWayConfig;

export {EASY_FORM_STEP_WAY_CONFIG_NAME};
