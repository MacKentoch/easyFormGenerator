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
 * VENDORS CSS TASKS
 * -------------------------------
 */
//vendor:css subtask
gulp.task('vendor:css:minifyOnly', function(){
	gulp.src(gulpConfig.srcFiles.bowerFiles.css.noMinify, { cwd: gulpConfig.base.root })
		.pipe(cssmin())
		.pipe(gulp.dest(gulpConfig.srcFiles.bowerFiles.css.minifyInThisDir, { cwd: gulpConfig.base.root }))
});
//vendor:css subtask
gulp.task('vendor:css:minifyAndClean', function(){
	gulp.src(gulpConfig.srcFiles.bowerFiles.css.toCleanAndMinify, { cwd: gulpConfig.base.root })
		.pipe(deleteLines({ 'filters': [/^@import url/] }))
		.pipe(cssmin())
		.on('error', notify.onError(function (error) { return 'Error: ' + error.message;}))
		.pipe(gulp.dest(gulpConfig.srcFiles.bowerFiles.css.minifyInThisDir, { cwd: gulpConfig.base.root }))
});


//vendor:css TASK : concat css, copyt to public dir
gulp.task('vendor:css', 
	[
		'public:clean',
		'vendor:css:minifyOnly', 
		'vendor:css:minifyAndClean'
	],  
	function(){
		gulp.src( gulpConfig.srcFiles.bowerFiles.css.noMinify
							.concat(gulpConfig.srcFiles.bowerFiles.css.minifyInThisDir + '**/*.css')
							,{ cwd: gulpConfig.base.root })
				.pipe(concat(gulpConfig.destFiles.vendor.css))
				.pipe(gulp.dest(gulpConfig.destDirs.vendor.css, { cwd: gulpConfig.base.root }))
});



/**
 * -------------------------------
 * VENDORS FONTS COPY TASK
 * -------------------------------
 */
gulp.task('vendor:fonts', 
			['public:clean'], 
			function(){	
 gulp.src(gulpConfig.srcFiles.bowerFiles.fonts, { cwd: gulpConfig.base.root })
 .pipe(gulp.dest(gulpConfig.destDirs.vendor.fonts, { cwd: gulpConfig.base.root }))
});









/**
 * ------------------------------------------------------------
 * VENDOR JS TASKS (SCRIPTS for HEADER : jquery, angular....)
 * ------------------------------------------------------------
 */
gulp.task('vendor:header:js', 
		['public:clean'], 
		function(){
	gulp.src(	gulpConfig.srcFiles.bowerFiles.js.noConcat, 
 				{ cwd: gulpConfig.base.root }) 
 .pipe(gulp.dest(gulpConfig.destDirs.vendor.js, { cwd: gulpConfig.base.root }));
});


/**
 * ------------------------------------------------------------
 * VENDOR JS TASKS (SCRIPTS for FOOTER and concatenable)
 * ------------------------------------------------------------
 */
 gulp.task('vendor:footer:js', 
	 	['public:clean'], 
		 function(){
	gulp.src(	gulpConfig.srcFiles.bowerFiles.js.toConcat, 
 				{ cwd: gulpConfig.base.root })
	.pipe(concat(gulpConfig.destFiles.vendor.js))			  
 	.pipe(gulp.dest(gulpConfig.destDirs.vendor.js, { cwd: gulpConfig.base.root }));	 
 });







/**
 * ------------------------------------------------------------
 * VENDOR MAP TASKS
 * ------------------------------------------------------------
 */
 gulp.task('vendor:map', 
	 	['public:clean'], 
		 function(){
	gulp.src(	gulpConfig.srcFiles.bowerFiles.maps, 
 				{ cwd: gulpConfig.base.root })	  
 	.pipe(gulp.dest(gulpConfig.destDirs.vendor.js, { cwd: gulpConfig.base.root }));	 
 });










/**
 * -------------------------------
 * APP ANGULAR TEMPLATES CACHE  TASKS
 * -------------------------------
 */
gulp.task('stepway:templatecache', function() {
    return gulp
        .src(gulpConfig.templateCache.stepway.sourceDir + gulpConfig.templateCache.stepway.sourceFiles, 
					{ cwd: gulpConfig.base.root })
        .pipe(minifyHtml(gulpConfig.minifyHtmlOpts))
				.pipe(ngTemplateCache(
            gulpConfig.templateCache.stepway.destFile,
            gulpConfig.templateCache.stepway.options
        ))
        .pipe(gulp.dest(gulpConfig.templateCache.stepway.destDir, { cwd: gulpConfig.base.root }));
});

gulp.task('dragdropway:templatecache', function() {
    return gulp
        .src(gulpConfig.templateCache.dragAndDropWay.sourceDir + gulpConfig.templateCache.dragAndDropWay.sourceFiles, 
					{ cwd: gulpConfig.base.root })
        .pipe(minifyHtml(gulpConfig.minifyHtmlOpts))
				.pipe(ngTemplateCache(
            gulpConfig.templateCache.dragAndDropWay.destFile,
            gulpConfig.templateCache.dragAndDropWay.options
        ))
        .pipe(gulp.dest(gulpConfig.templateCache.dragAndDropWay.destDir, { cwd: gulpConfig.base.root }));
});








/**
 * -------------------------------
 * APP SASS TASKS (STEPWAY)
 * -------------------------------
 */

 //sass : stepway
 gulp.task('app:sass:stepway', 
	 	['public:clean'], 
		 function(){
	gulp.src(gulpConfig.srcFiles.app.stepway.sass, { cwd: gulpConfig.base.root })
		.pipe(sass().on('error', notify.onError(function (error) { return 'Error: ' + error.message;})))
		.pipe(concat(gulpConfig.destFiles.app.stepway.css))
		.pipe(cssmin())     
		.pipe(wrap(gulpConfig.decorate.stepway.templateCSS))    
		.pipe(gulp.dest(gulpConfig.destDirs.app.css, { cwd: gulpConfig.base.root }));	 
 });
 
/**
 * -------------------------------
 * APP SASS TASKS (DRAGDROP WAY)
 * -------------------------------
 */
 //sass drag_and_drop
 gulp.task('app:sass:dragdropway', 
	 	['public:clean'], 
		 function(){
	gulp.src(gulpConfig.srcFiles.app.dragAndDropWay.sass, { cwd: gulpConfig.base.root })
		.pipe(sass().on('error', notify.onError(function (error) { return 'Error: ' + error.message;})))
		.pipe(concat(gulpConfig.destFiles.app.dragAndDropWay.css))
		.pipe(cssmin())     
		.pipe(wrap(gulpConfig.decorate.dragAndDropWay.templateCSS))    
		.pipe(gulp.dest(gulpConfig.destDirs.app.css, { cwd: gulpConfig.base.root }));
});









/**
 * -------------------------------
 * APP JS TASKS (STEPWAY WAY)
 * -------------------------------
 */
gulp.task('app:js:stepway', 
		['public:clean'], 
		function() {
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
			.pipe(gulp.dest(gulpConfig.destDirs.app.js, { cwd: gulpConfig.base.root })
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
			.pipe(gulp.dest(gulpConfig.destDirs.app.js, { cwd: gulpConfig.base.root })
		);
	}

});


/**
 * -------------------------------
 * APP JS TASKS (DRAGDROP WAY)
 * -------------------------------
 */
gulp.task('app:js:dragdropway', 
		['public:clean'],  
		function() {
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
			.pipe(gulp.dest(gulpConfig.destDirs.app.js, { cwd: gulpConfig.base.root })
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
			.pipe(gulp.dest(gulpConfig.destDirs.app.js, { cwd: gulpConfig.base.root })
		);
	}

});









 
 
 


/**
 * --------------------------------------
 * WATCH TASK (developments friend task)
 * --------------------------------------
 */
gulp.task('watch', function() {
	var watcher = gulp.watch(	[	
									//app : drag and drop way sources
									gulpConfig.templateCache.dragAndDropWay.sourceDir + gulpConfig.templateCache.dragAndDropWay.sourceFiles,
									gulpConfig.srcFiles.app.dragAndDropWay.js,
									gulpConfig.srcFiles.app.dragAndDropWay.sass,
									'!' + gulpConfig.templateCache.dragAndDropWay.destDir + gulpConfig.templateCache.dragAndDropWay.destFile,
									//app : step way sources
									gulpConfig.templateCache.stepway.sourceDir + gulpConfig.templateCache.stepway.sourceFiles,
									gulpConfig.srcFiles.app.stepway.js,
									gulpConfig.srcFiles.app.stepway.sass,
									'!' + gulpConfig.templateCache.stepway.destDir + gulpConfig.templateCache.stepway.destFile	
								], 
								[
									'build'
								]
							);
	watcher.on('change', function(event) {
	  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
});


/**
 * ---------------------------------------------------------
 * DEFAULT TASK : 'gulp' command or ctrl+shift+B (in VSCode)
 * ---------------------------------------------------------
 */
gulp.task('default', [	
						'clean:app:scripts_css', 
						'build', 
						'scripts:clientMVC:dev',
						'scripts:clientMVC_dragDrop:dev',
						'lib'
					 ]);
					 
