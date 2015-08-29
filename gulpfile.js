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
var sourcemaps 					= require('gulp-sourcemaps');





/**
 * ////////////////////////////////////////////////////////////////
 * CONFIGS
 * ////////////////////////////////////////////////////////////////
 */
var appConfig = require('./easyFormGenConfig/app/appConfig');
var gulpConfig = require('./easyFormGenConfig/gulp/gulpConfig');






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
 * APP ANGULAR TEMPLATES CACHE  TASKS
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
        .src(gulpConfig.base.root + gulpConfig.templateCache.dragdropway.sourceDir + gulpConfig.templateCache.dragdropway.sourceFiles)
        .pipe(minifyHtml(gulpConfig.minifyHtmlOpts))
				.pipe(ngTemplateCache(
            gulpConfig.templateCache.dragdropway.destFile,
            gulpConfig.templateCache.dragdropway.options
        ))
        .pipe(gulp.dest(gulpConfig.base.root + gulpConfig.templateCache.dragdropway.destDir));
});








/**
 * -------------------------------
 * VENDORS CSS TASKS
 * -------------------------------
 */
//vendor:css subtask
gulp.task('vendor:css:minifyOnly', function(){
	gulp.src(gulpConfig.srcFiles.bowerFiles.css.noMinify)
		.pipe(cssmin())
		.pipe(gulp.dest(gulpConfig.base.root + gulpConfig.srcFiles.bowerFiles.css.minifyInThisDir))
});
//vendor:css subtask
gulp.task('vendor:css:minifyAndClean', function(){
	gulp.src(gulpConfig.srcFiles.bowerFiles.css.toCleanAndMinify)
		.pipe(deleteLines({ 'filters': [/^@import url/] }))
		.pipe(cssmin())
		.on('error', notify.onError(function (error) { return 'Error: ' + error.message;}))
		.pipe(gulp.dest(gulpConfig.base.root + gulpConfig.srcFiles.bowerFiles.css.minifyInThisDir))
});


//vendor:css TASK : concat css, copyt to public dir
gulp.task('vendor:css', 
	[
		'vendor:css:minifyOnly', 
		'vendor:css:minifyAndClean'
	],  
	function(){
		gulp.src(
				gulpConfig.srcFiles.bowerFiles.css.noMinify
					.concat(gulpConfig.srcFiles.bowerFiles.css.minifyInThisDir + '**/*.css')
			)
				.pipe(concat(gulpConfig.destFiles.vendor.css))
				.pipe(gulp.dest(gulpConfig.base.root + gulpConfig.destDirs.vendor.css))
});







/**
 * -------------------------------
 * VENDORS FONTS COPY TASK
 * -------------------------------
 */
gulp.task('vendor:fonts', function(){	
 gulp.src(gulpConfig.srcFiles.bowerFiles.fonts, {cwd: gulpConfig.base.root })
 .pipe(gulp.dest(gulpConfig.destDirs.vendor.fonts, {cwd: gulpConfig.base.root }))
});




/**
 * -------------------------------
 * APP SASS TASKS (STEPWAY)
 * -------------------------------
 */

 //sass : stepway
 gulp.task('app:sass:stepway', function(){
	gulp.src(gulpConfig.srcFiles.app.stepway.sass)
		.pipe(sass().on('error', notify.onError(function (error) { return 'Error: ' + error.message;})))
		.pipe(concat(gulpConfig.destFiles.app.stepway.css))
		.pipe(cssmin())     
		.pipe(wrap(gulpConfig.decorate.stepway.templateCSS))    
		.pipe(gulp.dest(gulpConfig.base.root + gulpConfig.destDirs.app.css));	 
 });
 
/**
 * -------------------------------
 * APP SASS TASKS (DRAGDROP WAY)
 * -------------------------------
 */
 //sass drag_and_drop
 gulp.task('app:sass:dragdropway', function(){
	gulp.src(gulpConfig.srcFiles.app.dragAndDropWay.sass)
		.pipe(sass().on('error', notify.onError(function (error) { return 'Error: ' + error.message;})))
		.pipe(concat(gulpConfig.destFiles.app.dragAndDropWay.css))
		.pipe(cssmin())     
		.pipe(wrap(gulpConfig.decorate.dragAndDropWay.templateCSS))    
		.pipe(gulp.dest(gulpConfig.base.root + gulpConfig.destDirs.app.css));
});









/**
 * -------------------------------
 * APP JS TASKS (STEPWAY WAY)
 * -------------------------------
 */
gulp.task('app:js:stepway', [], function() {
	//NOTE : change ./easyFormGenConfig/app/appConfig to change environment
	if(appConfig.environment.current === 'PROD'){
		//prod version
		gulp.src(gulpConfig.srcFiles.app.stepway.js,
						{cwd: gulpConfig.base.root})
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(sourcemaps.init())	
			.pipe(uglify()) 
			.pipe(concat(gulpConfig.destFiles.app.stepway.js))
			.pipe(wrap(gulpConfig.decorate.stepway.templateJS))
			.pipe(sourcemaps.write('./'))
			.on('error', notify.onError(function (error) { return 'Error: ' + error.message;}))
			.pipe(gulp.dest(gulpConfig.base.root + gulpConfig.destDirs.app.js)
		);
	}else{
		//dev version (no uglify/no source map)
		gulp.src(gulpConfig.srcFiles.app.stepway.js,
						{cwd: gulpConfig.base.root})
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(concat(gulpConfig.destFiles.app.stepway.js))
			.pipe(wrap(gulpConfig.decorate.stepway.templateJS))
			.on('error', notify.onError(function (error) { return 'Error: ' + error.message;}))
			.pipe(gulp.dest(gulpConfig.base.root + gulpConfig.destDirs.app.js)
		);
	}

});


/**
 * -------------------------------
 * APP JS TASKS (DRAGDROP WAY)
 * -------------------------------
 */
gulp.task('app:js:dragdropway', [], function() {
	//NOTE : change ./easyFormGenConfig/app/appConfig to change environment
	if(appConfig.environment.current === 'PROD'){
		//prod version
		gulp.src(gulpConfig.srcFiles.app.dragAndDropWay.js,
						{cwd: gulpConfig.base.root})
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(sourcemaps.init())	
			.pipe(uglify()) 
			.pipe(concat(gulpConfig.destFiles.app.dragAndDropWay.js))
			.pipe(wrap(gulpConfig.decorate.dragAndDropWay.templateJS))
			.pipe(sourcemaps.write('./'))
			.on('error', notify.onError(function (error) { return 'Error: ' + error.message;}))
			.pipe(gulp.dest(gulpConfig.base.root + gulpConfig.destDirs.app.js)
		);
	}else{
		//dev version (no uglify/no source map)
		gulp.src(gulpConfig.srcFiles.app.dragAndDropWay.js,
						{cwd: gulpConfig.base.root})
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(concat(gulpConfig.destFiles.app.dragAndDropWay.js))
			.pipe(wrap(gulpConfig.decorate.dragAndDropWay.templateJS))
			.on('error', notify.onError(function (error) { return 'Error: ' + error.message;}))
			.pipe(gulp.dest(gulpConfig.base.root + gulpConfig.destDirs.app.js)
		);
	}

});








/**
 * ------------------------------------------------------------
 * VENDOR JS TASKS (SCRIPTS for HEADER : jquery, angular....)
 * ------------------------------------------------------------
 */

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

// /////////////////
// //HEADER css  
// /////////////////
// //copy bower -> app/public/lib/	
//  gulp.src(paths.bower_components_css, {cwd: bases.app })
//  .pipe(gulp.dest(bases.app + 'public/lib/css/')
//  .on('error', notify.onError(function (error) { return 'Error: ' + error.message;})));
// 
// //particular cases : example : bootsrap paper theme from bootswatch (need to clean #import font from googleapi)
//  gulp.src(paths.bower_clean_paper_boostrap_css, {cwd: bases.app })
//  .pipe(deleteLines({
//       'filters': [
//       	/^@import url/
//       ]
//     }))
//   	.pipe(concat('bootstrap.min.css'))
//  	.pipe(cssmin())
//  .pipe(gulp.dest(bases.app + 'public/lib/css/')
//  .on('error', notify.onError(function (error) { return 'Error: ' + error.message;})));









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
					 
