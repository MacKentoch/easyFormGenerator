module.exports = {
 
 
 bowerComponentsNoConcatJS : [
	 'bower_components/angular/angular.min.js',
	 'bower_components/angular-loading-bar/build/loading-bar.min.js',
	 'bower_components/html5shiv/dist/html5shiv.min.js',
	 'bower_components/respondJS/dest/respond.min.js'
 ],
 
 
	bower_components_js : [
		'bower_components/jquery/dist/jquery.min.js',   //jquery always first
		'bower_components/bootstrap/dist/js/bootstrap.min.js',						
		'bower_components/modernizer/modernizr.js',
		'bower_components/textAngular/dist/textAngular-rangy.min.js',
		'bower_components/textAngular/dist/textAngular-sanitize.min.js',
		'bower_components/textAngular/dist/textAngular.min.js',
		'bower_components/angular-resource/angular-resource.min.js',
		'bower_components/angular-animate/angular-animate.min.js',
		'bower_components/angularjs-toaster/toaster.min.js',
		'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
		'bower_components/api-check/dist/api-check.min.js',
		'bower_components/angular-formly/dist/formly.min.js',
		'bower_components/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.min.js',
		'bower_components/nya-bootstrap-select/dist/js/nya-bs-select.min.js',
		'bower_components/lodash/lodash.min.js',
		'vendor/js/angular-drag-and-drop-lists.min.js',
		'bower_components/angular-strap/dist/angular-strap.min.js',
		'bower_components/angular-strap/dist/angular-strap.tpl.min.js',
		'vendor/js/angular-pageslide-directive.min.js',
		'bower_components/angular-messages/angular-messages.min.js'
	],

	bower_components_map : [
		'bower_components/jquery/dist/jquery.min.map',
		'bower_components/angular/angular.min.js.map',
		'bower_components/angular-resource/angular-resource.min.js.map',
		'bower_components/angular-animate/angular-animate.min.js.map',
		'bower_components/angular-formly/dist/formly.min.js.map',
		'bower_components/api-check/dist/api-check.min.js.map',
		'bower_components/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.min.js.map',
		'bower_components/angular-strap/dist/angular-strap.min.js.map',
		'bower_components/angular-messages/angular-messages.min.js.map'
	], 					

	bower_components_css : [
		'bower_components/bootstrap/dist/css/bootstrap-theme.min.css', 						
		'bower_components/font-awesome/css/font-awesome.min.css',
		'bower_components/angular-loading-bar/build/loading-bar.min.css',
		'bower_components/animate.css/animate.min.css',
		'bower_components/angularjs-toaster/toaster.min.css',
		'bower_components/nya-bootstrap-select/dist/css/nya-bs-select.min.css'
	],

	bower_components_fonts: 	[
		'bower_components/bootstrap/dist/fonts/**/*',
		'bower_components/font-awesome/fonts/**/*'
	],

	//particular case : bootsrap paper theme from bootswatch (need to clean #import font from googleapi)
	bower_clean_paper_boostrap_css : [
		'bower_components/bootswatch/paper/bootstrap.css'
	], 					 					
	//particular case : need to manually minify
	bower_textAngular_css: 		[
		'bower_components/textAngular/src/textAngular.css'
	]					

	
}