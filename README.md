#Easy form generator (AngularJS)

[![Join the chat at https://gitter.im/MacKentoch/easyFormGenerator](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/MacKentoch/easyFormGenerator?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


>Generate advanced and unique boostrap forms without typing a single line of code!

####[— easy form generator website here —](http://mackentoch.github.io/easyFormGenerator/)

##What is it?

*`Easy form generator` (step way or drag and drop way) :* 

- Create forms *in a matter of minutes* :hourglass:
  - (*you may not need to add "s" to minutes*).
- *Don't limit* your form *to a single column* template 
  - (up to 3 controls per line).
- generated forms *use bootstrap* 
  - (until now the most popular front end framework)
- based on amazing and :sparkles: [angular formly](https://github.com/formly-js/angular-formly)  
  - (see angular [formly website](http://angular-formly.com) and [documentation](http://docs.angular-formly.com) then you'll understand the :sparkles: behind)

And Since v1.0.21 :

*`Easy form viewer` (*no matter form generator you used, models are the same*) :

- You created a form through `easy form generator`, you have now `easy form viewer` to easily `render` your forms
  - you can still use angular formly directive. But since easy form generator contains amount of custom controls, you may have pain to configure yourself with `formlyConfigProvider`. Just use easy form viewer directive, it embeds angular formly and configure custom controls for you = no more pain.  
______

###Easy Form Generator : **Step way**

`Step way version` is the **most accomplished** and **stable version**. 
- cross browser compatible 
- responsive (*not sure it will be used a lot but you could create a form on your smartphone with the step way version*).
- multi-language support
- friendly configurable thanks to a single provider `easyFormSteWayConfig` provider
  - enable / disable modal animation
  - enable / disable controls (ex : hide rich text from editor)
  - set current language (default is english)
  - show hide preview model and / or preview panel in editor   
- production friendly

Have a try here : [Easy for generator **step way** version](https://rawgit.com/MacKentoch/easyFormGenerator/master/dist/index_StepWay.html)

 - **Step way visual preview here** : 
![previewstepway.png](https://raw.githubusercontent.com/MacKentoch/easyFormGenerator/master/preview.png)

______

###Easy Form Generator : **drag and drop way** (BETA)

`Drag and drop way version` (**currently in BETA**) is more fun and faster to design a form
- drag control then drop control
- right click to open edit panel 

Drag and drop way is still in development. 

>`Chrome` will give you the best experience with drag and drop version. You may encounter unexpected behaviours with other navigators.

have a try here : [Easy for generator **drag and drop way** version](https://rawgit.com/MacKentoch/easyFormGenerator/master/dist/index_DragDropWay.html)

- **Drag and drop way visual preview here** :
![previewdraganddropway](https://cdn.rawgit.com/MacKentoch/easyFormGenerator/master/dragdropway_preview.png)
 
 
______

###Easy form viewer : production ready

`Easy form viewer` is a directive which helps you using your created forms
- when you saved your form you saved `edaFieldsModel` : easy form generator fields model
- just bind it to easy form viewer directive, then it will render (*without all unecessary decoration — generator useful only —*) :
![preview](https://cdn.rawgit.com/MacKentoch/easyFormGenerator/master/easyFormViewerPreview.png) 

______


##How to use?

####Bower way :

`bower install easy-form-generator`
 
This way is super easy way since you will be installed all easy form generator dependencies.
 
Then just launch `EasyFormGenerator-StepWay-DEMO.html` and `EasyFormViewer-DEMO.html` in your browser. You will find it in :
  - bower_components/
  - |__easy-form-generator/
  - |____EasyFormGenerator-StepWay-DEMO.html
  - |____EasyFormViewer-DEMO.html
  
Finally :
>Inspire yourself from these demo (considering numerous dependencies it may help). 
>Note about easy form viewer : bind `edaFieldsModel` model not the formly one. 


####Manual way
 
 - clone this repository `git clone https://github.com/MacKentoch/easyFormGenerator.git`
 - or just download it
 - check html in dist directory : 
  - `index_DragDropWay.html` is the `drag drop way` (BETA)
  - `index_StepWay.html` is the `step way` (full easy form html)
  - `index_StepWay_As_module` is the `step way` (a module more production orientated) 

_____

###Using Step way version (production friendly)

>demo : `index_StepWay_As_module` in `dist` directory. 

####Inject easy form generator in your app

Just inject `eda.easyformGen.stepway` in you application :

```javascript
angular
  .module('YOUR_APP', [
    'eda.easyformGen.stepway' //injects easy form generator-step way
  ])

```


####All easy form generator just by this small html :
```html
<eda-step-way-easy-form-gen></eda-step-way-easy-form-gen>
```

####Want to Load/save models?

Add these attributes to interact with your own controller : 
- `eda-easy-form-generator-model` : attribute to bind your model
- `eda-save-form-event` : attribute to bind save form event 
```html
<eda-step-way-easy-form-gen 	
      eda-easy-form-generator-model="_MODEL_"
      eda-save-form-event="_SAVE_FUNCTION_">
</eda-step-way-easy-form-gen>
```

**Note : Easy form generator model properties are** :

- `formName`									 : {string} - stores `form name`, default is empty string
- `btnSubmitText`						   : {string} - stores submit button name, default is 'Submit'
- `btnCancelText`						   : {string} - stores submit button name, default is 'Cancel'
- `edaFieldsModel`						 : {array}  - `easy form generator fields model` that describe form
- `edaFieldsModelStringified`  : {string} - edaFieldsModel but stringified (*then easy to save fields model to any database*)
- `formlyFieldsModel`				   : {object} - `angular formly fields model` (filled by easy form generator from `edaFieldsModel`)
- `dataModel`								   : {object} - filling the form feeds dataModel

Note : Easy form generator save form event 

```javascript
//your controller save function should have `edaEasyFormGeneratorModel` parameter
//it will be filled by easy form generator model 
saveForm(edaEasyFormGeneratorModel)
```

####dependencies

Easy form generator creates amazing bootstrap forms thanks to these dependencies :
- angular formly (where all magic comes from) 
- bootstrap (css/ jquery)
- bootswatch (nice theme)
- jquery
- angular js (>= 1.3.X dev/tested)
- ngAnimate + animate.css
- textAngular (for rich text editor)
- nya-bootstrap-select (for basic and grouped select)
- angular toaster (nice toaster messages)

____


###Using Drag and drop way version (BETA)

>demo : `index_DragDropWay_As_Module.html` in `dist` directory. 

####Inject easy form generator in your app

Just inject `eda.easyformGen.dragdropway` in you application :

```javascript
angular
  .module('appDemo', [
    'eda.easyformGen.dragdropway' //injects easy form generator drag and drop way
   ])

```


####All easy form generator just by this small html :
```html
<eda-dragdrop-way-easy-form-gen></eda-dragdrop-way-easy-form-gen>
```

####Want to Load/save models?

Add these attributes to interact with your own controller : 
- `eda-easy-form-generator-model` : attribute to bind your model
- `eda-save-form-event` : attribute to bind save form event 
```html
<eda-dragdrop-way-easy-form-gen 	
      eda-easy-form-generator-model="_MODEL_"
      eda-save-form-event="_SAVE_FUNCTION_">
</eda-dragdrop-way-easy-form-gen>
```


____

###Using Easy form viewer (production friendly)

>demo : `index_easyFormViewer_Module.html` in `dist` directory. 

####Inject easy form viewer in your app

Just inject `eda.easyFormViewer` in you application :

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
      demoCtrl.dataModel			= {}; //data Model : filling form will fill it (submit event will return updated data model) 
      
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
        console.info('Submit event : you can manage this event in your controller');
        console.dir( {'dataModelSubmitted' : dataModelSubmitted} );
      }
        
      function cancelFormEvent(){
        console.info('Cancel event : you can manage this event in your controller');
      }
    } 
      //...
```


####All easy form viewer directive :

**UPDATE** : since v1.0.28 : attibutes eda-easy-form-viewer-submit-button-text and eda-easy-form-viewer-cancel-button-text are now waiting a string. See html below for correct up to date declaration.


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



______

## What is new?
 
 - October 2015 : `Easy form Generator step way` : new config available with `easyFormSteWayConfigProvider` : 
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
  
 
 - October 2015 : `Easy form Generator step way` : demo updated [stepway with language selection](https://rawgit.com/MacKentoch/easyFormGenerator/master/index_StepWay_As_Module.html)

 - October 2015 : `Easy form Generator step way` : new languages added 
     - french
     - german
     - japaneese
     - spanish (thx to **Benjamin Orozco** :thumbsup:)
     - turkish (thx to **Serhat Can** :thumbsup:)
  ![preview](https://rawgit.com/MacKentoch/easyFormGenerator/master/languages.png)    
  
 ```javascript 
  angular
    .module('YOURAPP', ['...'])
    .config(easyFromConfigFct);
  
  //inject easyFormSteWayConfigProvider
  easyFromConfigFct.$inject = ['easyFormSteWayConfigProvider'];
  function easyFromConfigFct(easyFormSteWayConfigProvider){
  
    //example get current language (by default = english)
    console.info(easyFormSteWayConfigProvider.getCurrentLanguage());
    //set language to french :
    easyFormSteWayConfigProvider.setLanguage('fr');
 
 ```


 - October 2015 : `Easy form Generator step way` : enable or disable control in your easy form generator step way version.
 
 ```javascript 
  angular
    .module('YOURAPP', ['...'])
    .config(easyFromConfigFct);
  
  //inject easyFormSteWayConfigProvider
  easyFromConfigFct.$inject = ['easyFormSteWayConfigProvider'];
  function easyFromConfigFct(easyFormSteWayConfigProvider){
  
    //disable basic TextInput :
    easyFormSteWayConfigProvider.disableControl('TextInput');
  
    //enable Date input : 
    //(NOTE : by default all controls are enabled 
    //-> so this example is no other use than illustration)
    easyFormSteWayConfigProvider.enableControl('Date');
  
    // List of all easy form generator (step way version) controls :  
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
 
 - Sept 2015 : `drag and drop way` is now a simple directive `eda-dragdrop-way-easy-form-gen`

 - `Easy form Generator - Step way : new provider` : enable/disable modal animation from your own config thanks to new provider `easyFormSteWayConfigProvider`
  
 ```javascript
  angular
      .module('YOUR_APP', [])
      .config(easyFromConfigFct);
  
  easyFromConfigFct.$inject = ['easyFormSteWayConfigProvider'];
  function easyFromConfigFct(easyFormSteWayConfigProvider){
    //enable/disable easy form modal animation 
    //HERE : animation disabled due to angular bootstrap backdrop bug with angular >= 1.4
    easyFormSteWayConfigProvider.setModalAnimation(false);
  }
 ```
 
 
 
    + more easy form generator - step way - config. later
 - `Fix applied in v1.0.17` : :bug: **[angular bootstrap modal animation issues when using angular > 1.3](https://github.com/angular-ui/bootstrap/issues/3633) ** — *backdrop won't disapear when closing modal* —. Waiting for fix, so untill fix is realeased modal animation is disabled to prevent this issue :disappointed_relieved:.
 
 - `step way versions` is now a module easier to interact with your application.  

 - :newspaper: `step way` : added `email` control
     + email entered must follow *an email pattern* (validation included)
     + a validation message is displayed when entered email is invalid (pattern related) 
     + preview :
 
 ![email and validations](https://cdn.rawgit.com/MacKentoch/easyFormGenerator/master/emailAndValidation.png)    


##What is coming next?

- creating bower, npm for `step way` version
- developing / fixing browsers compatibility for `drag and drop` version 
- adding more controls
- adding more validations 
 - adding tests
   - unit test (in progress - already in `branch master` not finished)
   - E2E (coming soon)
 - optimization / factorization (coming soon)
  
##License

The MIT License (MIT)

Copyright (c) 2015 Erwan DATIN

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

