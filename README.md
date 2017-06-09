# Easy form generator (AngularJS)

[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](https://github.com/MacKentoch/easyFormGenerator)
[![GitHub version](https://badge.fury.io/gh/MacKentoch%2FeasyFormGenerator.svg)](https://badge.fury.io/gh/MacKentoch%2FeasyFormGenerator)
[![Join the chat at https://gitter.im/MacKentoch/easyFormGenerator](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/MacKentoch/easyFormGenerator?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Bower version](https://badge.fury.io/bo/easy-form-generator.svg)](https://badge.fury.io/bo/easy-form-generator)
[![npm version](https://badge.fury.io/js/easy-form-generator.svg)](https://badge.fury.io/js/easy-form-generator)

> Generate advanced and unique boostrap forms without typing a single line of code!

#### [— easy form generator website here —](http://mackentoch.github.io/easyFormGenerator/)

## What is it?

*`Easy form generator` (step way or drag and drop way):*

- Create forms *in a matter of minutes* :hourglass:
  - (*you may not need to add "s" to minutes*).
- *Don't limit* your form *to a single column* template
  - (up to 3 controls per line).
- generated forms *use bootstrap*
  - (until now the most popular front end framework)
- based on amazing and :sparkles: [angular formly](https://github.com/formly-js/angular-formly)  
  - (see angular [formly website](http://angular-formly.com) and [documentation](http://docs.angular-formly.com) then you'll understand the :sparkles: behind)


[Complementary information to better understand easy form generator](https://github.com/MacKentoch/easyFormGenerator/blob/master/README_TOO.md)


### Easy Form Generator: **Step way**

> **IMPORTANT:** easyFormGenerator v2.1.1 introduced a breaking change to fix angular formly upgrade compatibility issue.
This breaking change impacts Header control only.
Header control field model now needs header value to be in `templateOptions.placeholder` (rather than in `templateOptions.description`).
To help to ensure the right property is used by your previously saved fields model, description input is now added in Header edit modal (*so just cut / paste description into header text input*).

`Step way version` is the **most accomplished** and **stable version**.
- cross browser compatible
- responsive (*not sure it will be used a lot but you could create a form on your smartphone with the step way version*).
- multi-language support
- friendly configurable thanks to a single provider `easyFormSteWayConfig` provider
  - enable / disable modal animation
  - enable / disable controls (ex: hide rich text from editor)
  - set current language (default is english)
  - show hide preview model and / or preview panel in editor   
- production friendly

Have a try here: [Easy for generator **step way** version](https://cdn.rawgit.com/MacKentoch/easyFormGenerator/v2.0.0/preview/stepway.html#)

 - **Step way visual preview here**:
![previewstepway.png](https://raw.githubusercontent.com/MacKentoch/easyFormGenerator/master/images/preview.png)

______

### Easy Form Generator: **drag and drop way** (BETA)

`Drag and drop way version` (**currently in BETA**) is more fun and faster to design a form
- drag control then drop control
- right click to open edit panel

Drag and drop way is still in development.

>`Chrome` will give you the best experience with drag and drop version. You may encounter unexpected behaviours with other navigators.

have a try here: [Easy for generator **drag and drop way** version](https://cdn.rawgit.com/MacKentoch/easyFormGenerator/v2.0.0/preview/dragDropWay.html)

- **Drag and drop way visual preview here**:
![previewdraganddropway](https://cdn.rawgit.com/MacKentoch/easyFormGenerator/master/images/dragdropway_preview.png)


______

### Easy form viewer: production ready

`Easy form viewer` is a directive which helps you using your created forms
- when you saved your form you saved `edaFieldsModel`: easy form generator fields model
- just bind it to easy form viewer directive, then it will render (*without all unecessary decoration — generator useful only —*):
![preview](https://cdn.rawgit.com/MacKentoch/easyFormGenerator/master/images/easyFormViewerPreview.png)

______


## How to use?

_____

### Using Step way version (production friendly)

> Check demo: [`stepway.html` in `preview` directory](https://github.com/MacKentoch/easyFormGenerator/blob/master/preview/stepway.html)

#### Install

Installing easyFormGenerator will install in a row:
- step way
- drag and drop way
- form viewer

*Install:*

```bash
npm install --save easy-form-generator
```
or

```bash
yarn install easy-form-generator
```

#### dependencies

Easy form generator creates amazing bootstrap forms thanks to these dependencies:

| dependency            | npm install                                     | from dist/vendors  |
|:----------------------|:------------------------------------------------|:-------------------|
| bootstrap (css / js)  | `npm i --save bootstrap`                        | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |
| bootswatch            | `npm i --save bootswatch`                       | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |
| jquery                | `npm i --save jquery`                           | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |
| angular js (>= 1.3.X) | `npm i --save angular`                          | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |
| ngAnimate             | `npm i --save angular-animate`                  | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |
| angular-translate     | `npm i --save angular-translate`                | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |
| angular-ui-bootstrap  | `npm i --save angular-ui-bootstrap`             | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |
| textAngular           | `npm i --save textangular`                      | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |
| angular-strap         | `npm i --save angular-strap`                    | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |
| nya-bootstrap-select  | `npm i --save @lordfriend/nya-bootstrap-select` | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |
| angular toaster       | `npm i --save angularjs-toaster`                | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |

*They are not include in easyFormGenerator bundle to avoid side effects / collisions in your application.*

*It is up to you to include them in your application depending on your dev workflow.*

> It will be far more talkative be checking demo: 
- [`stepway.html` in `preview` directory](https://github.com/MacKentoch/easyFormGenerator/blob/master/preview/stepway.html)
- **OR** this [project example](https://github.com/MacKentoch/easy-form-generator-webpack-example) (*ES6+ and webpack based*)


#### Inject easy form generator in your app

Just inject `eda.easyformGen.stepway` in you application:

```javascript
angular
  .module('YOUR_APP', [
    'eda.easyformGen.stepway' //injects easy form generator-step way
  ])

```


#### All easy form generator just by this small html:
```html
<eda-step-way-easy-form-gen></eda-step-way-easy-form-gen>
```

#### Want to Load/save models?

Add these attributes to interact with your own controller:
- `eda-easy-form-generator-model`: attribute to bind your model
- `eda-save-form-event`: attribute to bind save form event
```html
<eda-step-way-easy-form-gen 	
      eda-easy-form-generator-model="_MODEL_"
      eda-save-form-event="_SAVE_FUNCTION_">
</eda-step-way-easy-form-gen>
```

**`eda-easy-form-generator-model` properties are**:

| field name                  | field format | field description                                                                   |
|:----------------------------|:-------------|:------------------------------------------------------------------------------------|
| `formName`                  | string       | stores `form name`, default is empty string                                         |
| `btnSubmitText`             | string       | stores submit button name, default is 'Submit'                                      |
| `btnCancelText`             | string       | stores submit button name, default is 'Cancel'                                      |
| `edaFieldsModel`            | array        | `easy form generator fields model` that describe form                               |
| `edaFieldsModelStringified` | string       | edaFieldsModel but stringified (*then easy to save fields model to any database*)   |
| `formlyFieldsModel`         | object       | `angular formly fields model` (filled by easy form generator from `edaFieldsModel`) |
| `dataModel`                 | object       | filling the form feeds dataModel                                                    |


**`eda-save-form-event` function**:

```javascript
//your controller save function should have `edaEasyFormGeneratorModel` parameter
//it will be filled by easy form generator model
saveForm(edaEasyFormGeneratorModel)
```

#### Customize easyFormGenerator

**Multilanguage support:**

Default or fallback language is set to `english` **by default** (*but you can change this fallback language*).

|language               | key     | note                                    |
|:----------------------|:--------|:----------------------------------------|
| english               | 'en'    |                                         |
| french                | 'fr'    |                                         |
| german                | 'de'    |                                         |
| japanese              | 'jp'    |                                         |
| spanish               | 'es'    | thx to **Benjamin Orozco** :thumbsup:   |
| turkish               | 'tr'    | thx to **Serhat Can** :thumbsup:        |
| bresilian portuguese  | 'pt-br' | thx to **Leandro.Battisti** :thumbsup:  |
| chinese               | 'zh'    | thx to **@alansong** :thumbsup:  |

![preview](https://rawgit.com/MacKentoch/easyFormGenerator/master/images/languages.png)    

*Change the default language in your controller:*

```javascript
angular
.module('YOURAPP', ['...'])
.config(easyFromConfigFct);

//inject easyFormSteWayConfigProvider
easyFromConfigFct.$inject = ['easyFormSteWayConfigProvider'];
function easyFromConfigFct(easyFormSteWayConfigProvider){

//example get current language (by default = english)
console.info(easyFormSteWayConfigProvider.getCurrentLanguage());
//set language to french (see corresponding keys in upper table):
easyFormSteWayConfigProvider.setLanguage('fr');
```

**enable disable controls:**

All controls are enabled by default.

- list of controls:

|    control name   | control key       |
|:------------------|:------------------|
| empty control     | `empty`           |
| header            | `header`          |
| Subtitle          | `Subtitle`        |
| TextInput         | `TextInput`       |
| Password          | `Password`        |
| Email             | `Email`           |
| IpAdress          | `IpAdress`        |
| Date              | `Date`            |
| Texarea           | `Texarea`         |
| RichTextEditor    | `RichTextEditor`  |
| Radio             | `Radio`           |
| Checkbox          | `Checkbox`        |
| BasicSelect       | `BasicSelect`     |
| GroupedSelect     | `GroupedSelect`   |


 ```javascript
  angular
    .module('YOURAPP', ['...'])
    .config(easyFromConfigFct);

  //inject easyFormSteWayConfigProvider
  easyFromConfigFct.$inject = ['easyFormSteWayConfigProvider'];
  function easyFromConfigFct(easyFormSteWayConfigProvider){
    /////////////////////////////
    // DISABLE EXAMPLES
    /////////////////////////////
    //disable a single control:
    easyFormSteWayConfigProvider.disableControl('TextInput');
    //disable a list of controls:
    easyFormSteWayConfigProvider.disableControl(['BasicSelect', 'GroupedSelect']);

    /////////////////////////////
    // ENABLE EXAMPLES
    /////////////////////////////
    //enable a single control:
    easyFormSteWayConfigProvider.enableControl('TextInput');
    //enable a list of controls:
    easyFormSteWayConfigProvider.enableControl(['BasicSelect', 'GroupedSelect']);
 ```


**show hide preview panel details:**

- show / hide entire `form preview panel`
- show / hide `preview models` in preview panel

```javascript

  angular
    .module('appDemo', [
      'eda.easyformGen.stepway' //injects easy form generator-step way
    ])
    .config(configFct)
    .controller('demoController', demoController);

  /**
    * config
    */
  configFct.$inject = ['easyFormSteWayConfigProvider'];
  function configFct(easyFormSteWayConfigProvider){
    //show/hide preview panel => default is true
    easyFormSteWayConfigProvider.showPreviewPanel(true);
    //show/hide models in preview panel => default is true
    easyFormSteWayConfigProvider.showPreviewModels(true);
  }

```


____


### Using Drag and drop way version (BETA)

> Check demo: [`dragDropWay.html` in `preview` directory](https://github.com/MacKentoch/easyFormGenerator/blob/master/preview/dragDropWay.html)

#### Install

Installing easyFormGenerator will install in a row:
- step way
- drag and drop way
- form viewer

*Install:*

```bash
npm install --save easy-form-generator
```
or

```bash
yarn install easy-form-generator
```

#### dependencies

Easy form generator creates amazing bootstrap forms thanks to these dependencies:

| dependency            | npm install                                     | from dist/vendors  |
|:----------------------|:------------------------------------------------|:-------------------|
| bootstrap (css / js)  | `npm i --save bootstrap`                        | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |
| bootswatch            | `npm i --save bootswatch`                       | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |
| jquery                | `npm i --save jquery`                           | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |
| angular js (>= 1.3.X) | `npm i --save angular`                          | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |
| ngAnimate             | `npm i --save angular-animate`                  | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |
| angular-translate     | `npm i --save angular-translate`                | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |
| angular-ui-bootstrap  | `npm i --save angular-ui-bootstrap`             | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |
| textAngular           | `npm i --save textangular`                      | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |
| angular-strap         | `npm i --save angular-strap`                    | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |
| nya-bootstrap-select  | `npm i --save @lordfriend/nya-bootstrap-select` | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |
| angular toaster       | `npm i --save angularjs-toaster`                | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |

*They are not include in easyFormGenerator bundle to avoid side effects / collisions in your application.*

*It is up to you to include them in your application depending on your dev workflow.*

> It will be far more talkative be checking demo: [`dragDropWay.html` in `preview` directory](https://github.com/MacKentoch/easyFormGenerator/blob/master/preview/dragDropWay.html)


#### Inject easy form generator in your app

Just inject `eda.easyformGen.dragdropway` in you application:

```javascript
angular
  .module('appDemo', [
    'eda.easyformGen.dragdropway' //injects easy form generator drag and drop way
   ])

```

#### All easy form generator just by this small html:
```html
<eda-dragdrop-way-easy-form-gen></eda-dragdrop-way-easy-form-gen>
```

#### Want to Load/save models?

Add these attributes to interact with your own controller:
- `eda-easy-form-generator-model`: attribute to bind your model
- `eda-save-form-event`: attribute to bind save form event
```html
<eda-dragdrop-way-easy-form-gen 	
      eda-easy-form-generator-model="_MODEL_"
      eda-save-form-event="_SAVE_FUNCTION_">
</eda-dragdrop-way-easy-form-gen>
```

**`eda-easy-form-generator-model` properties are**:

| field name                  | field format | field description                                                                   |
|:----------------------------|:-------------|:------------------------------------------------------------------------------------|
| `formName`                  | string       | stores `form name`, default is empty string                                         |
| `btnSubmitText`             | string       | stores submit button name, default is 'Submit'                                      |
| `btnCancelText`             | string       | stores submit button name, default is 'Cancel'                                      |
| `edaFieldsModel`            | array        | `easy form generator fields model` that describe form                               |
| `edaFieldsModelStringified` | string       | edaFieldsModel but stringified (*then easy to save fields model to any database*)   |
| `formlyFieldsModel`         | object       | `angular formly fields model` (filled by easy form generator from `edaFieldsModel`) |
| `dataModel`                 | object       | filling the form feeds dataModel                                                    |


**`eda-save-form-event` function**:

```javascript
//your controller save function should have `edaEasyFormGeneratorModel` parameter
//it will be filled by easy form generator model
saveForm(edaEasyFormGeneratorModel)
```
____

### Using Easy form viewer (production friendly)

>demo: [`formviewer.html` in `preview` directory](https://github.com/MacKentoch/easyFormGenerator/blob/master/preview/formviewer.html)


#### Install

Installing easyFormGenerator will install in a row:
- step way
- drag and drop way
- form viewer

*Install:*

```bash
npm install --save easy-form-generator
```
or

```bash
yarn install easy-form-generator
```

#### dependencies

Easy form generator creates amazing bootstrap forms thanks to these dependencies:

| dependency            | npm install                                     | from dist/vendors  |
|:----------------------|:------------------------------------------------|:-------------------|
| bootstrap (css / js)  | `npm i --save bootstrap`                        | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |
| bootswatch            | `npm i --save bootswatch`                       | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |
| jquery                | `npm i --save jquery`                           | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |
| angular js (>= 1.3.X) | `npm i --save angular`                          | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |
| ngAnimate             | `npm i --save angular-animate`                  | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |
| textAngular           | `npm i --save textangular`                      | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |
| nya-bootstrap-select  | `npm i --save @lordfriend/nya-bootstrap-select` | [dist/vendors](https://github.com/MacKentoch/easyFormGenerator/tree/master/dist/vendors) |


*They are not include in easyFormGenerator bundle to avoid side effects / collisions in your application.*

*It is up to you to include them in your application depending on your dev workflow.*

> It will be far more talkative be checking demo: [`formviewer.html` in `preview` directory](https://github.com/MacKentoch/easyFormGenerator/blob/master/preview/formviewer.html)


#### Inject easy form viewer in your app

Just inject `eda.easyFormViewer` in you application:

```javascript
(function(angular){
    'use strict';
    angular
        .module('app', ['eda.easyFormViewer']) //inject easy form viewer
        .controller('demoController', demoController);

    //your controller, here an implementation suggestion
    demoController.$inject = ['$timeout'];
    function demoController($timeout){
      var demoCtrl = this;

      demoCtrl.fieldsModel    = loadMySavedEdaFieldsModel(); //="edaFieldsModel" - see easy form generator model -
      demoCtrl.dataModel			= {}; //data Model: filling form will fill it (submit event will return updated data model)

      demoCtrl.submitButtonText = 'Submit this form'; //button text
      demoCtrl.cancelButtonText = 'Cancel all'; //button text

      demoCtrl.submitFormEvent 	= submitFormEvent; //event called on form submit
      demoCtrl.cancelFormEvent 	= cancelFormEvent; //event called on form cancel

      function loadMySavedEdaFieldsModel(){
        var mySavedModel = readItWhereISavedIt();
        return mySavedModel;
      }

      //submit will return updated dataModel in "dataModelSubmitted" parameter
      function submitFormEvent(dataModelSubmitted){
        console.info('Submit event: you can manage this event in your controller');
        console.dir( {'dataModelSubmitted': dataModelSubmitted} );
      }

      function cancelFormEvent(){
        console.info('Cancel event: you can manage this event in your controller');
      }
    }
      //...
```


#### All easy form viewer directive:


```html
<eda-easy-form-viewer
		eda-easy-form-viewer-data-model="demoCtrl.dataModel"
		eda-easy-form-viewer-easy-form-generator-fields-model="demoCtrl.fieldsModel"

		eda-easy-form-viewer-submit-button-text="{{demoCtrl.submitButtonText}}"
		eda-easy-form-viewer-cancel-button-text="{{demoCtrl.cancelButtonText}}"

		eda-easy-form-viewer-submit-form-event="demoCtrl.submitFormEvent(dataModelSubmitted)"
		eda-easy-form-viewer-cancel-form-event="demoCtrl.cancelFormEvent()"> 	
</eda-easy-form-viewer>
```

| eda-easy-form-viewer property                         | format   | description                                                                    |
|:------------------------------------------------------|:---------|:-------------------------------------------------------------------------------|
| eda-easy-form-viewer-data-model                       | object   | data model to preload form (from a previous database save for example).        |
| eda-easy-form-viewer-easy-form-generator-fields-model | object   | easy form generator generated form object (by step way or drag and drop way)   |
| eda-easy-form-viewer-submit-button-text               | string   | submit button text                                                             |
| eda-easy-form-viewer-cancel-button-text               | string   | cancel button text                                                             |
| eda-easy-form-viewer-submit-form-event                | function | to handle submit event in your controller (like saving data model for example) |
| eda-easy-form-viewer-cancel-form-event                | function | to handle cancel event in your controller                                      |

______

## What is new?
 - see [release notes](https://github.com/MacKentoch/easyFormGenerator/blob/master/RELEASE_NOTES.md#releases)

 *older:*

 - December 2016: v2.0.0 (big tsunami update):
  - leave bower, gulp and jspm in favor of webpack + npm
  - new control: `IP adress`
  - new language added `Brazilian Portuguese` thanks to `Leandro.Battisti`
 - December 2016: v1.2.0 is released
 - March 2016: v1.1.0 is released.

 - November 2015: v1.1.0 coming soon: migration to ES6 + fixes

 - October 2015: `Easy form Generator step way`: new config available with `easyFormSteWayConfigProvider`:
    - show/hide preview panel
    - show hide models (in prevew panel)

```javascript

  angular
    .module('appDemo', [
      'eda.easyformGen.stepway' //injects easy form generator-step way
    ])
    .config(configFct)
    .controller('demoController', demoController);

  /**
    * config
    */
  configFct.$inject = ['easyFormSteWayConfigProvider'];
  function configFct(easyFormSteWayConfigProvider){
    //show/hide preview panel => default is true
    easyFormSteWayConfigProvider.showPreviewPanel(true);
    //show/hide models in preview panel => default is true
    easyFormSteWayConfigProvider.showPreviewModels(true);
  }

```

 - October 2015: `Easy form Generator step way`: demo updated [stepway with language selection](https://rawgit.com/MacKentoch/easyFormGenerator/master/index_StepWay_ES6.html)

 - October 2015: `Easy form Generator step way`: new languages added
     - french
     - german
     - japanese
     - spanish (thx to **Benjamin Orozco** :thumbsup:)
     - turkish (thx to **Serhat Can** :thumbsup:)
  ![preview](https://rawgit.com/MacKentoch/easyFormGenerator/master/images/languages.png)    

 ```javascript
  angular
    .module('YOURAPP', ['...'])
    .config(easyFromConfigFct);

  //inject easyFormSteWayConfigProvider
  easyFromConfigFct.$inject = ['easyFormSteWayConfigProvider'];
  function easyFromConfigFct(easyFormSteWayConfigProvider){

    //example get current language (by default = english)
    console.info(easyFormSteWayConfigProvider.getCurrentLanguage());
    //set language to french:
    easyFormSteWayConfigProvider.setLanguage('fr');

 ```


 - October 2015: `Easy form Generator step way`: enable or disable control in your easy form generator step way version.

 ```javascript
  angular
    .module('YOURAPP', ['...'])
    .config(easyFromConfigFct);

  //inject easyFormSteWayConfigProvider
  easyFromConfigFct.$inject = ['easyFormSteWayConfigProvider'];
  function easyFromConfigFct(easyFormSteWayConfigProvider){

    //disable basic TextInput:
    easyFormSteWayConfigProvider.disableControl('TextInput');

    //enable Date input:
    //(NOTE: by default all controls are enabled
    //-> so this example is no other use than illustration)
    easyFormSteWayConfigProvider.enableControl('Date');

    // List of all easy form generator (step way version) controls:  
    // 'empty'
    // 'Header'
    // 'TextInput'
    // 'Password'
    // 'Date'
    // 'Texarea'
    // 'RichTextEditor'
    // 'Radio'
    // 'Checkbox'
    // 'BasicSelect'
    // 'GroupedSelect'
 ```

 - Sept 2015: `drag and drop way` is now a simple directive `eda-dragdrop-way-easy-form-gen`

 - `Easy form Generator - Step way: new provider`: enable/disable modal animation from your own config thanks to new provider `easyFormSteWayConfigProvider`

 ```javascript
  angular
      .module('YOUR_APP', [])
      .config(easyFromConfigFct);

  easyFromConfigFct.$inject = ['easyFormSteWayConfigProvider'];
  function easyFromConfigFct(easyFormSteWayConfigProvider){
    //enable/disable easy form modal animation
    //HERE: animation disabled due to angular bootstrap backdrop bug with angular >= 1.4
    easyFormSteWayConfigProvider.setModalAnimation(false);
  }
 ```



    + more easy form generator - step way - config. later
 - `Fix applied in v1.0.17`: :bug: **[angular bootstrap modal animation issues when using angular> 1.3](https://github.com/angular-ui/bootstrap/issues/3633) ** — *backdrop won't disapear when closing modal* —. Waiting for fix, so untill fix is realeased modal animation is disabled to prevent this issue :disappointed_relieved:.

 - `step way versions` is now a module easier to interact with your application.  

 - :newspaper: `step way`: added `email` control
     + email entered must follow *an email pattern* (validation included)
     + a validation message is displayed when entered email is invalid (pattern related)
     + preview:

 ![email and validations](https://cdn.rawgit.com/MacKentoch/easyFormGenerator/master/images/emailAndValidation.png)    


## What is coming next?
- [ ] developing/fixing browsers compatibility for `drag and drop` version
- [ ] adding more controls
- [ ] adding more validations
- [ ] adding tests
- [ ] adding CI
- [ ] adding contribution guide

## License

The MIT License (MIT)

Copyright (c) 2016 Erwan DATIN

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
