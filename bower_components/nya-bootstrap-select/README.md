# nya-bootstrap-select

**nya-bootstrap-select v2** is an AngularJS directive set inspired by @silviomoreto 's [bootstrap-select](https://github.com/silviomoreto/bootstrap-select) .  With this directive you can built an **bootstrap-select** with data-binding feature of angularjs. 
The 2.x version is totally rewritten. while keep the most feature of **bootstrap-select** but no longer depends jquery and bootstrap-select plugin.

Require: angular 1.2+

##Usage

1. Install

	Install via bower: 
    `bower install nya-bootstrap-select --save`
    or download the latest release.

2. include the nya-bootstrap-select.js and nya-bootstrap-select.css file to your html.
3. add to application dependecies.
     
     `angular.module('yourApp', ['nya.bootstrap.select'])`
     
3. add code to your view template. you need two directive: `nya-bs-select` and `nya-bs-option` to build your select picker. nya-bs-select is a class, attribute, tag stricted directive. while nya-bs-option is an attribute stricted directive. Also, you need ng-model add to the nya-bs-select element to bind your model.

	```html
	<ol class="nya-bs-select" ng-model="myModel">
		<li nya-bs-option="option in options">
			<a>
				{{option.name}}
			</a>
		</li>
	</ol>
	```
	
**Migrate from 1.x**  If you have used the previous version of this directive. you need to replace the old code in the template.  See the examples below

##Examples

###Static Options

You can use static options which means you can't change the option when the HTML code is ready. Under this usage, you don't use the `nya-bs-option` directive, but you should add `nya-bs-option` class to all the `<li>` element and `value` attribute to let the directive know you option's value.

```html
<ol class="nya-bs-select" ng-model="myModel">
	<li value="alpha" class="nya-bs-option">
		<a>
			Alpha
		</a>
	</li>
	<li value="beta" class="nya-bs-option">
		<a>
			Beta
		</a>
	</li>
	<li value="charlie" class="nya-bs-option">
		<a>
			Charlie
		</a>
	</li>
</ol>
```

If you decide to use static option, you shouldn't change the option any more, otherwise you may need the `nya-bs-option` directive to generate options dynamically.

###Dynamic Options
In this section you'll see several usage of the `nya-bs-option` directive.

####Basic usage
This is the very basic usage, we have an array of object used to generate options. the `myModel` will be one of the objects in the `options` array.  if you add an `mulitple` attribute to the `nya-bs-select` element.  `myModel` will be array of objects.

```html
<ol class="nya-bs-select" ng-model="myModel">
	<li nya-bs-option="option in options">
		<a>{{option.name}}</a>
	</li>
</ol>
```

####Group By Object Property
Like vanilla `<select>` we can also generate option group with any property in an object. if you `options` is an array of object. like [{name: "alpha", group: "Group 1"}, {name: "beta", group: "Group 2}, {name: "charlie", group: "Group 2"}]. then we can use group by in `nya-bs-option` expression to generate group.

```html
<ol class="nya-bs-select" ng-model="myModel">
	<li nya-bs-option="option in options group by option.group">
		<span class="dropdown-header">{{$group}}</span>
		<a>
			{{option.name}}
		</a>
	</li>
</ol>
```

##TODO

- data-header support
- ~~data-container support~~ may not be supported any more
- data-max-options support
- auto dropup support

##How to Contribute

This project is built by Grunt, fork this project. and clone to your local repository. run `npm install`, `bower install` to install all development dependencies.

Source files are separated to several files. run `grunt build` will do some karma unit test and combine these files to one single file and compress the js and css files.

e2e test is not available temporarily, I will add those test in the future.

## License ##

Licensed under the MIT license
