#Easy form generator (AngularJS)

[![Join the chat at https://gitter.im/MacKentoch/easyFormGenerator](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/MacKentoch/easyFormGenerator?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


>Generate advanced and unique boostrap forms without typing a single line of code!

####[— easy form generator website here —](http://mackentoch.github.io/easyFormGenerator/)

##What is it?

- Create forms *in a matter of minutes* :hourglass:
  - (*you may not need to add "s" to minutes*).
- *Don't limit* your form *to a single column* template 
  - (up to 3 controls per line).
- generated forms *use bootstrap* 
  - (until now the most popular front end framework)
- based on amazing and :sparkles: [angular formly](https://github.com/formly-js/angular-formly)  
  - (see angular [formly website](http://angular-formly.com) and [documentation](http://docs.angular-formly.com) then you'll understand the :sparkles: behind)


______

###Easy Form Generator : **Step way**

`Step way version` is the **most accomplished** and **stable version**. 
- cross browser compatible 
- responsive (*not sure it will be used a lot but you could create a form on your smartphone with the step way version*).
- production friendly

Have a try here : [Easy for generator **step way** version](https://cdn.rawgit.com/MacKentoch/easyFormGenerator/master/dist/index_StepWay.html)

 - **Step way visual preview here** : 
![previewstepway.png](https://raw.githubusercontent.com/MacKentoch/easyFormGenerator/master/preview.png)

______

###Easy Form Generator : **drag and drop way** (BETA)

`Drag and drop way version` (**currently in BETA**) is more fun and faster to design a form
- drag control then drop control
- right click to open edit panel 

Drag and drop way is still in development. 

>`Chrome` will give you the best experience with drag and drop version. You may encounter unexpected behaviours with other navigators.

have a try here : [Easy for generator **drag and drop way** version](https://cdn.rawgit.com/MacKentoch/easyFormGenerator/master/dist/index_DragDropWay.html)

- **Drag and drop way visual preview here** :
![previewdraganddropway](https://cdn.rawgit.com/MacKentoch/easyFormGenerator/master/dragdropway_preview.png)
______


##How to use?

Bower and NPM packages are coming soon so right now (*which means around Sept. 2015*): 
 - clone this repository `git clone https://github.com/MacKentoch/easyFormGenerator.git`
 - or just download it
 - check html in dist directory : 
  - `index_DragDropWay.html` is the `drag drop way` (BETA)
  - `index_StepWay.html` is the `step way` (full easy form html)
  - `index_StepWay_As_module` is the `step way` (a module more production orientated) 


###Step way version (production friendly)

>demo : `index_StepWay_As_module` in `dist` directory. 

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

Note : Easy form generator model properties are :

- formName 									: {string} - stores `form name`, default is empty string
- btnSubmitText 						: {string} - stores submit button name, default is 'Submit'
- btnCancelText							: {string} - stores submit button name, default is 'Cancel'
- edaFieldsModel 						: {array}  - `easy form generator fields model` that describe form
- edaFieldsModelStringified : {string} - edaFieldsModel but stringified (*then easy to save fields model to any database*)
- formlyFieldsModel 				: {object} - `angular formly fields model` (filled by easy form generator from `edaFieldsModel`)
- dataModel									: {object} - filling the form feeds dataModel

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
- angular js (1.3.16 dev/tested)
- ngAnimate + animate.css
- textAngular (for rich text editor)
- nya-bootstrap-select (for basic and grouped select)
- angular toaster (nice toaster messages)


______

## What is new?
 
 - `step way versions` is now a module easier to interact with your application.  

 - :newspaper: `step way` : added `email` control
     + email entered must follow *an email pattern* (validation included)
     + a validation message is displayed when entered email is invalid (pattern related)
     + try here : [up to date step way link](https://rawgit.com/MacKentoch/easyFormGenerator/master-before-optim/index.html) 
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

