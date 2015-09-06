#Easy form generator (AngularJS)

[![Join the chat at https://gitter.im/MacKentoch/easyFormGenerator](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/MacKentoch/easyFormGenerator?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


>Generate advanced and unique boostrap forms without typing a single line of code!

####[— easy form generator website here —](http://mackentoch.github.io/easyFormGenerator/)

##What is it?

An *example or preview* is always more talkative than *long speech*.


Here is a form *YOU* could *generate* in just 1 minute (_I took time to add description, decoration etc... I could have been faster_) :

![preview.png](https://raw.githubusercontent.com/MacKentoch/easyFormGenerator/master/preview.png)

______

###Easy Form Generator : **Step way**

`Step way version` is most accomplished and stable version. 
- cross browser compatible 
- responsive (*not sure it will be used a lot but you can create a form on your smartphone with step way version*).

Have a try here : [Easy for generator **step way** version](https://cdn.rawgit.com/MacKentoch/easyFormGenerator/master/dist/index_StepWay.html)

###Easy Form Generator : **drag an drop way**

`Drag and drop way version` is more fun and faster to design a form
- drag control then drop control
- right click to open edit panel 

Drag and drop way is still in development. 
Major issues comes from browsers defferent behaviours.
>`Chrome` will give you the best experience with drag and drop version. 

have a try here : [Easy for generator **drag and drop way** version](https://cdn.rawgit.com/MacKentoch/easyFormGenerator/master/dist/index_DragDropWay.html)

______


##How to use?

_EASY_ : 
 - clone this repository `git clone https://github.com/MacKentoch/easyFormGenerator.git`
 - or just download it
 - launch `index.html` in your navigator
 - then you are ready to create forms

_WANT EASIER WAY? OK_ :

- no installation, no clone : just go here : [up to date — rawgit link](https://cdn.rawgit.com/MacKentoch/easyFormGenerator/master/dist/index_StepWay.html)

_WANT EVEN EASIER WAY? OK LET'S CHECK EASY FORM GENERATOR WEBSITE_ :

- learn about it, train, get a static html with your form you've just created : just go here : [easy form generator website](http://mackentoch.github.io/easyFormGenerator/)

##the :sparkles: (magic) behind

`easyFormGenerator` gives you access to [angular formly](https://github.com/formly-js/angular-formly) fire power to create amazing forms. 

*Why angular formly? See yourself how powerfull it is* :

- [angular formly applications/examples](http://angular-formly.com)
- [angular formly documentation](http://docs.angular-formly.com)


## What is new?

 - :newspaper: `step way` : added `email` control
     + email entered must follow *an email pattern* (validation included)
     + a validation message is displayed when entered email is invalid (pattern related)
     + try here : [up to date step way link](https://rawgit.com/MacKentoch/easyFormGenerator/master-before-optim/index.html) 
     + preview :
 
 ![email and validations](https://cdn.rawgit.com/MacKentoch/easyFormGenerator/master/emailAndValidation.png)    

 - `drag and drop` alternative coming soon
   - under heavy developments (**preview daily UPDATED, see here :** [rawgit link](https://rawgit.com/MacKentoch/easyFormGenerator/master-before-optim/indexDragDrop.html))
     
    - NOTE :     
     - open `indexDragDrop.html` in your navigator  : for `drag and drop` version
     - see `index.html` in your navigator : for current version `step guided generator`

 - added `anees` branch to show an example[ — rawgit link here — ](https://cdn.rawgit.com/MacKentoch/easyFormGenerator/anees/index.html) for sharing formly models between multiple controllers



##What is coming next?

- developing `drag and drop` alternative (I'm not joking when I tell you under :muscle: (heavy) developements )
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

