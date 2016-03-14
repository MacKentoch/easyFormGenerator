Complementary information about Easy Form Generator
====

##Introduction

`Easy Form Generator` is simply some kind `nice and pleasant UI` over super powerfull `angular formly`.

To sum up **very very fast and simple**, `angular formly` is a directive that renders forms from JSON models:
- 1 model for field description
	- could be called `fieldsModel`
- 1 model for data (what user enters in form inputs)
	- could be called `dataModel`

##angular formly:

Displaying any form just require this html:

```html
<!-- here is the simple HTML you need (everything else is decoration): -->
<form ng-submit="vm.onSubmit()" name="vm.form" novalidate>
	<formly-form model="vm.model" fields="vm.fields" options="vm.options" form="vm.form">
		<button type="submit" class="btn btn-primary submit-button pull-right" ng-disabled="vm.form.$invalid">{{vm.buttons.submit}}</button>
		<button type="button" class="btn btn-primary pull-right" ng-click="vm.options.resetModel()">{{vm.buttons.cancel}}</button>
	</formly-form>
</form>
```

You may notice:

- `vm.model` 	= data model (*will be filled when input are filled*)
- `vm.fields` = fields description model

And to customize submit and cancel button text:

- `vm.buttons.submit` (*a simple string*)
- `vm.buttons.cancel` (*a simple string*)

*More information about angular formly: [formly website](http://angular-formly.com).*

##Easy form generator role

Remember `vm.fields` is the model that describe all the form.
How does it look like?

Something like that:
```javascript
													[
  {
    "template": "<div class=\"row\"><div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\"><h2 class=\"text-center\">Super nice Forms<h2></div></div><hr/>"
  },
  {
    "className": "row",
    "fieldGroup": [
      {
        "className": "col-xs-6",
        "type": "input",
        "key": "input-1441996506424",
        "templateOptions": {
          "type": "password",
          "label": "",
          "required": false,
          "placeholder": "",
          "description": "",
          "options": []
        }
      },
      {
        "className": "col-xs-6",
        "type": "datepicker",
        "key": "datepicker-1441996512625",
        "templateOptions": {
          "type": "",
          "label": "",
          "required": false,
          "placeholder": "",
          "description": "",
          "options": [],
          "datepickerPopup": ""
        }
      }
    ]
  },
  {
    "className": "col-xs-12",
    "type": "basicSelect",
    "key": "basicSelect-1441996528406",
    "templateOptions": {
      "type": "",
      "label": "",
      "required": false,
      "placeholder": "",
      "description": "",
      "options": [
        {
          "name": "opt1",
          "value": 0,
          "group": ""
        },
        {
          "name": "opt2",
          "value": 1,
          "group": ""
        }
      ]
    }
  }
]
```

This form is simple, but you guess it could be not that easy for anyone non developer to create his own form.

>Easy for generator enable to generate forms without the need to write the form by yourself.
