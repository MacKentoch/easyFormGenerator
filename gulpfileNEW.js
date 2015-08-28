var gulp 								= require('gulp');
var del    							= require('del');
var jshint 							= require('gulp-jshint');
var concat 							= require('gulp-concat');
var uglify 							= require('gulp-uglify');
var cssmin 							= require('gulp-cssmin');
var sass 								= require('gulp-sass');
var notify 							= require('gulp-notify');
var wrap 								= require('gulp-wrap');
var deleteLines 				= require('gulp-delete-lines');
var ngTemplateCache 		= require('gulp-angular-templatecache');
var minifyHtml					= require('gulp-minify-html');



/**
 * ////////////////////////////////////////////////////////////////
 * CONFIGS
 * ////////////////////////////////////////////////////////////////
 */
var appConfig = require('./easyFormGenConfig/app/appConfig');
var gulpConfig = require('./easyFormGenConfig/gulp/gulpConfig');


var version = {
	build: '1.1.3'
	//build: '1.0.7'
};





var bases ={
 app: './'
};

var scriptFileNames={
	angularDragAndDrop					: 'angular-drag-and-drop-lists.min.js',
	clientMvcOutput 						: 'clientMVC.min.js',
	clientMvcDragAndDropOutput 	: 'clientMVC.min.js',
	ngdagableFileMinName 				: 'ngDraggable.min.js'
};


var app_main_css={
	css_result 			: 'main_css.min.css',
	sass_main 			: 'main_css.scss',
	sass_variables 	: 'main_var.scss',
	sass_mixins 		: 'main_mixins.scss',
	sass_functions 	: 'main_function.scss'
};

var clientMVC={
	app 					: ['public/clientMVC/main/ngwfApp.js'],
	controllers 	: ['public/clientMVC/main/controllers/**/*.js'],
	directives 		: ['public/clientMVC/main/directives/**/*.js'],
	filters 			: ['public/clientMVC/main/filters/**/*.js'],
	services 			: ['public/clientMVC/main/services/**/*.js'],
	core 					: ['public/clientMVC/main/core/**/*.js'],
	htmlTemplates : ['public/clientMVC/htmlTemplates/**/*.html']
};

var clientMVC_dragDrop={
	app 					: ['public/clientMVC/dragDrop/edaApp.js'],
	controllers 	: ['public/clientMVC/dragDrop/controllers/**/*.js'],
	directives 		: ['public/clientMVC/dragDrop/directives/**/*.js'],
	filters 			: ['public/clientMVC/dragDrop/filters/**/*.js'],
	services 			: ['public/clientMVC/dragDrop/services/**/*.js'],
	providers 		: ['public/clientMVC/dragDrop/providers/**/*.js'],
	configs 			: ['public/clientMVC/dragDrop/configs/**/*.js'],	
	htmlTemplates : ['public/clientMVC/htmlTemplates/**/*.html']
};

var decorate={
	templateJS: [
								'/** \n' , 
								' *easyFormGenerator \n',
								' *Version ' +  version.build + ' \n',
								' *Author : Erwan Datin (MacKentoch) \n', 
								' *Link: https://github.com/MacKentoch/easyFormGenerator \n',
								' *License : MIT (2015) \n',
								'**/ \n',
								';(function(){\n 	\'use strict\';\n<%= contents %>\n})(this);'
							].join(' '),

	templateCSS: 	[
									'/*! \n' + 
									' * easyFormGenerator \n' + 
									' * Version ' + version.build + ' \n' + 				
									' * Author : Erwan Datin (MacKentoch) \n' +
									' *Link: https://github.com/MacKentoch/easyFormGenerator \n' + 
									' * License : 2015 MIT \n' + 								
									'*/ \n' +
									'\n<%= contents %>\n'
								].join('') 
			
};

var paths = {
 bower_angularjs 			: 		['bower_components/angular/angular.min.js'],
 bower_angular_loadingbarjs: ['bower_components/angular-loading-bar/build/loading-bar.min.js'],
 bower_html5shiv 			: 		['bower_components/html5shiv/dist/html5shiv.min.js'],
 bower_respondJS 			: 		['bower_components/respondJS/dest/respond.min.js'],
 bower_components_js 	: 		[
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
bower_components_map: 		[
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

bower_components_css: 		[
								 						'bower_components/bootstrap/dist/css/bootstrap-theme.min.css', 						
								 						'bower_components/font-awesome/css/font-awesome.min.css',
								 						'bower_components/angular-loading-bar/build/loading-bar.min.css',
								 						'bower_components/animate.css/animate.min.css',
								 						'bower_components/angularjs-toaster/toaster.min.css',
								 						'bower_components/nya-bootstrap-select/dist/css/nya-bs-select.min.css'
								 					],
bower_clean_paper_boostrap_css : ['bower_components/bootswatch/paper/bootstrap.css'], 					 					

bower_textAngular_css: 		[
														'bower_components/textAngular/src/textAngular.css'
													], 					
bower_components_fonts: 	[
														'bower_components/bootstrap/dist/fonts/**/*',
														'bower_components/font-awesome/fonts/**/*'
													], 
 scriptsWithNav: 					[
						 								'public/js/**/*.js', 
						 								'!public/js/main_noNavigationBar.js', 
						 								'!public/js/angular-drag-and-drop-lists.min.js',
						 								'!public/js/angular-pageslide-directive.min.js'
				 									],
 css 										: ['public/css/*.css'],
 images 								: ['public/images/**/*'],
 app_js 								: ['app.js', 'db.js'],
 bin_js 								: ['bin/www'],
 models_js 							: ['models/**/*.js'],
 passport_js 						: ['passport/**/*.js'],
 controllers_js					: ['controllers/**/*.js'],
 router_js 							: ['router/**/*.js'],
 views_ejs 							: ['views/**/*.ejs'],
 packageJSON 						: ['package.json'],
 readme 								: ['README.md'],
 sass_main_files				: [
 														'public/css/**.*scss', 
 														'!public/css/drag_and_drop_css.scss'
 													],
 sass_dragAndDrop_files	: [	
 														'public/css/**.*scss', 
 														'!public/css/main_css.scss'],
 js_lib 								: ['']
};
 










/**
 * ------------------
 * CLEANING TASKS :
 * ------------------
 * - dist (all)
 * - public (all)
 * - public (only stepway)
 * - public (only dragdropway)
 */

//clean all dist
gulp.task('dist:clean', function (cb) {
  del([gulpConfig.base.distDir + '**/*'], cb);
});

//clean all public
gulp.task('public:clean', function (cb) {
  del([gulpConfig.base.publicDir + '**/*'], cb);
});

//clean public : stepway
gulp.task('stepway:clean', function (cb) {
  del([
		gulpConfig.base.publicDir + 'js/' + gulpConfig.destFiles.app.stepway.js,
		gulpConfig.base.publicDir + 'css/' + gulpConfig.destFiles.app.stepway.css,
		], cb);
});

//clean public : dragdropway
gulp.task('dragdropway:clean', function (cb) {
  del([
		gulpConfig.base.publicDir + 'js/' + gulpConfig.destFiles.app.dragAndDropWay.js,
		gulpConfig.base.publicDir + 'css/' + gulpConfig.destFiles.app.dragAndDropWay.css,
		], cb);
});

/**
 * -------------------------------
 * ANGULAR TEMPLATES CACHE  TASKS
 * -------------------------------
 */
gulp.task('stepway:templatecache', function() {
    return gulp
        .src(gulpConfig.base.root + gulpConfig.templateCache.stepway.sourceDir + gulpConfig.templateCache.stepway.sourceFiles)
        .pipe(minifyHtml(gulpConfig.minifyHtmlOpts))
				.pipe(ngTemplateCache(
            gulpConfig.templateCache.stepway.destFile,
            gulpConfig.templateCache.stepway.options
        ))
        .pipe(gulp.dest(gulpConfig.base.root + gulpConfig.templateCache.stepway.destDir));
});

gulp.task('dragdropway:templatecache', function() {
    return gulp
        .src(gulpConfig.base.root + gulpConfig.templateCache.sourceDir + gulpConfig.templateCache.sourceFiles)
        .pipe(minifyHtml(gulpConfig.minifyHtmlOpts))
				.pipe(ngTemplateCache(
            gulpConfig.templateCache.destFile,
            gulpConfig.templateCache.options
        ))
        .pipe(gulp.dest(gulpConfig.base.root + gulpConfig.templateCache.destDir));
});


//==================================================
//SCRIPTS TASKS : main
//==================================================
// Process scripts and concatenate them into one output file
gulp.task('build', ['clean:app:scripts_css'], function() {

 //textAngularcss minify
 gulp.src(paths.bower_textAngular_css, {cwd: bases.app})
 	.pipe(concat('textAngular.min.css'))
 	.pipe(cssmin())
 	.pipe(gulp.dest(bases.app + 'public/css')
 	.on('error', notify.onError(function (error) { return 'Error: ' + error.message;})));

 //sass main 
 gulp.src(paths.sass_main_files, {cwd: bases.app})
	.pipe(sass().on('error', notify.onError(function (error) { return 'Error: ' + error.message;})))
  .pipe(concat('main.min.css'))
  .pipe(cssmin())     
 	.pipe(wrap(decorate.templateCSS))    
  .pipe(gulp.dest(bases.app + 'public/css'));
 

 //sass drag_and_drop
 gulp.src(paths.sass_dragAndDrop_files, {cwd: bases.app})
		.pipe(sass().on('error', notify.onError(function (error) { return 'Error: ' + error.message;})))
    .pipe(concat('drag_and_drop.min.css'))
    .pipe(cssmin())     
 		.pipe(wrap(decorate.templateCSS))    
    .pipe(gulp.dest(bases.app + 'public/css'));
 });

//==========================================================
//SCRIPTS TASKS : client MVC (angular JS) - dev = no uglify
//==========================================================
gulp.task('scripts:clientMVC:dev', [], function() {
 gulp.src(		clientMVC.app
 				.concat(clientMVC.core)
 				.concat(clientMVC.controllers)
 				.concat(clientMVC.directives)
 				.concat(clientMVC.filters)
 				.concat(clientMVC.services),
 				{cwd: bases.app})
 .pipe(jshint())
 .pipe(jshint.reporter('default'))
 //.pipe(uglify())   //uncomment to uglify
 .pipe(concat(scriptFileNames.clientMvcOutput))
 .pipe(wrap(decorate.templateJS))
 .on('error', notify.onError(function (error) { return 'Error: ' + error.message;}))
 .pipe(gulp.dest(bases.app + 'public/clientMVC/main/'));
});


//================================================================================
//SCRIPTS TASKS : client MVC -drag & drop version (angular JS) - dev = no uglify
//================================================================================
gulp.task('scripts:clientMVC_dragDrop:dev', [], function() {
 gulp.src(		clientMVC_dragDrop.app
 				.concat(clientMVC_dragDrop.controllers)
 				.concat(clientMVC_dragDrop.directives)
 				.concat(clientMVC_dragDrop.filters)
 				.concat(clientMVC_dragDrop.services)
 				.concat(clientMVC_dragDrop.providers)
 				.concat(clientMVC_dragDrop.configs),
 				{cwd: bases.app})
 .pipe(jshint())
 .pipe(jshint.reporter('default'))
 //.pipe(uglify())   //uncomment to uglify
 .pipe(concat(scriptFileNames.clientMvcDragAndDropOutput))
 .pipe(wrap(decorate.templateJS))
 .on('error', notify.onError(function (error) { return 'Error: ' + error.message;}))
 .pipe(gulp.dest(bases.app + 'public/clientMVC/dragDrop/'));
});

//==================================================
//LIB : SCRIPTS for HEADER (vendor) : jquery, angular....
//==================================================

gulp.task('lib', ['clean:app:lib'], function(){

/////////////////
//HEADER scripts
/////////////////
//copy bower APP-> app/public/lib/js	
 gulp.src(	paths.bower_angularjs
 				.concat(paths.bower_angular_loadingbarjs)
 				.concat(paths.bower_html5shiv)
 				.concat(paths.bower_respondJS), 
 			{cwd: bases.app}) 
 .on('error', notify.onError(function (error) { return 'Error: ' + error.message;}))
 .pipe(gulp.dest(bases.app + 'public/lib/js/'));

/////////////////
//FOOTER scripts
/////////////////
//copy bower APP -> app/public/lib/js	
 gulp.src(paths.bower_components_js, {cwd: bases.app })
 .pipe(gulp.dest(bases.app + 'public/lib/js/')
 .on('error', notify.onError(function (error) { return 'Error: ' + error.message;})));

 // APP : chrome needs map, so jquery map copy here
 gulp.src(paths.bower_components_map, {cwd: bases.app })
 .pipe(gulp.dest(bases.app + 'public/lib/js/'));

/////////////////
//HEADER css  
/////////////////
//copy bower -> app/public/lib/	
 gulp.src(paths.bower_components_css, {cwd: bases.app })
 .pipe(gulp.dest(bases.app + 'public/lib/css/')
 .on('error', notify.onError(function (error) { return 'Error: ' + error.message;})));

//particular cases : example : bootsrap paper theme from bootswatch (need to clean #import font from googleapi)
 gulp.src(paths.bower_clean_paper_boostrap_css, {cwd: bases.app })
 .pipe(deleteLines({
      'filters': [
      	/^@import url/
      ]
    }))
  	.pipe(concat('bootstrap.min.css'))
 	.pipe(cssmin())
 .pipe(gulp.dest(bases.app + 'public/lib/css/')
 .on('error', notify.onError(function (error) { return 'Error: ' + error.message;})));


/////////////////
//FONTS (boostrap and font-awesome) 
/////////////////
//copy bower -> app/public/lib/fonts
 gulp.src(paths.bower_components_fonts, {cwd: bases.app })
 .pipe(gulp.dest(bases.app + 'public/lib/fonts/')
 .on('error', notify.onError(function (error) { return 'Error: ' + error.message;})));
});


//==================================================
//WATCH TASK 
//==================================================
gulp.task('watch', function() {
	var watcher = gulp.watch(	[	'./public/css/*.scss',
									'./public/clientMVC/**/*',
									'!./public/clientMVC/clientMVC.min.js'
								], 
								[
									'build'
								]
							);
	watcher.on('change', function(event) {
	  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
});

//==================================================
//DEFAULT TASK 
//================================================== 
// Define the default task as a sequence of the above tasks
gulp.task('default', [	
						'clean:app:scripts_css', 
						'build', 
						'scripts:clientMVC:dev',
						'scripts:clientMVC_dragDrop:dev',
						'lib'
					 ]);