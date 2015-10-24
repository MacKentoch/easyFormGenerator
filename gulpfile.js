/**
 *  ------------------------------------------------------
 *  easy form generator — gulpfile —
 *  ------------------------------------------------------
 *
 * INFO on relevant tasks :
 * -------------------------
 * 
 * 1) want to build "only app dependencies"" (only), use :
 * - $ gulp
 * - $ gulp watch
 * 
 * 2) want to build "all dependencies" (vendor + app), use :
 * - $ gulp build:all
 * 
 * 3) want to dist, use :
 * - $ gulp dist 
 * 
 * 4) stepway ES6 
 * - $ gulp build:stepWay:ES6
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

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
var rename							= require('gulp-rename');
var angularTranslate 		= require('gulp-angular-translate');
var exec         				= require('child_process').exec;




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

//clean all public : NOT USED -> use other cleaning tasks (safer)
gulp.task('public:clean', function (cb) {
  del([gulpConfig.base.publicDir + '**/*'], cb);
});

//clean all vendor css  : public dir
gulp.task('public:vendor:css:clean', function (cb) {
  del([gulpConfig.base.root + gulpConfig.destDirs.vendor.css + '/**/*.css'], cb);
});

//clean all vendor js  : public dir
gulp.task('public:vendor:js:clean', function (cb) {
  del([gulpConfig.base.root + gulpConfig.destDirs.vendor.js + '/**/*.js'], cb);
});


//clean all vendor fonts  : public dir
gulp.task('public:vendor:fonts:clean', function (cb) {
  del([gulpConfig.base.root + gulpConfig.destDirs.vendor.fonts + '/**/*'], cb);
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

//clean public : formviewer
gulp.task('formviewer:clean', function (cb) {
  del([
		gulpConfig.base.publicDir + 'js/' + gulpConfig.destFiles.app.formViewer.js,
		gulpConfig.base.publicDir + 'css/' + gulpConfig.destFiles.app.formViewer.css,
		], cb);
});




/**
 * cleaning src/vendor/ temp files
 */
gulp.task('vendor:clean:temp', function(cb){
  del([
		gulpConfig.srcFiles.bowerFiles.css.minifyInThisDir + '**/*.css'
		], cb);	
});










/**
 * -------------------------------
 * VENDORS CSS TASKS
 * -------------------------------
 */
//vendor:css subtask
gulp.task('vendor:css:specialCases', 
		['public:vendor:css:clean'],
		function(){
	gulp.src(gulpConfig.srcFiles.bowerFiles.css.toMinify.srcFile, { cwd: gulpConfig.base.root })
		.pipe(concat(gulpConfig.srcFiles.bowerFiles.css.toMinify.destfileName))
		.pipe(cssmin())
		//.pipe(gulp.dest(gulpConfig.srcFiles.bowerFiles.css.minifyInThisDir, { cwd: gulpConfig.base.root }))
		.pipe(gulp.dest(gulpConfig.destDirs.vendor.css, { cwd: gulpConfig.base.root }))
		
	gulp.src(gulpConfig.srcFiles.bowerFiles.css.toCleanAndMinify.srcFile, { cwd: gulpConfig.base.root })
		.pipe(deleteLines({ 'filters': [/^@import url/] }))
		.pipe(concat(gulpConfig.srcFiles.bowerFiles.css.toCleanAndMinify.destfileName))
		.pipe(cssmin())
		.on('error', notify.onError(function (error) { return 'Error: ' + error.message;}))
		//.pipe(gulp.dest(gulpConfig.srcFiles.bowerFiles.css.minifyInThisDir, { cwd: gulpConfig.base.root }))
		.pipe(gulp.dest(gulpConfig.destDirs.vendor.css, { cwd: gulpConfig.base.root }))
				
});





//vendor:css TASK : css, copyt to public dir
//NOTE : depending 'appConfig.js' : could concat vendor css
gulp.task('vendor:css', 
	[
		'vendor:css:specialCases'
	],  
	function(){
		
		var sources = gulpConfig.srcFiles.bowerFiles.css.noMinify;		
																	
		if(appConfig.concatVendorFiles === true){
			
			gulp.src( sources 
								,{ cwd: gulpConfig.base.root })
					.pipe(concat(gulpConfig.destFiles.vendor.css))
					.pipe(gulp.dest(gulpConfig.destDirs.vendor.css, { cwd: gulpConfig.base.root }))			
		}else{
						
			gulp.src( sources 
								,{ cwd: gulpConfig.base.root })
					.pipe(gulp.dest(gulpConfig.destDirs.vendor.css, { cwd: gulpConfig.base.root }))			
		}
		

});



/**
 * -------------------------------
 * VENDORS FONTS COPY TASK
 * -------------------------------
 */
gulp.task('vendor:fonts', 
			['public:vendor:fonts:clean'], 
			function(){	
 gulp.src(gulpConfig.srcFiles.bowerFiles.fonts, { cwd: gulpConfig.base.root })
 .pipe(gulp.dest(gulpConfig.destDirs.vendor.fonts, { cwd: gulpConfig.base.root }))
});









/**
 * ------------------------------------------------------------
 * VENDOR JS TASKS (SCRIPTS for HEADER : jquery, angular....)
 * ------------------------------------------------------------
 * 
 * NOTE these vendor js never concatenate
 */
gulp.task('vendor:header:js', 
		['public:vendor:js:clean'], 
		function(){
	gulp.src(	gulpConfig.srcFiles.bowerFiles.js.noConcat, 
 				{ cwd: gulpConfig.base.root }) 
 .pipe(gulp.dest(gulpConfig.destDirs.vendor.js, { cwd: gulpConfig.base.root }));
});

/**
 * ------------------------------------------------------------
 * VENDOR JS TASKS (SCRIPTS for FOOTER and concatenable)
 * ------------------------------------------------------------
 * 
 * NOTE : depending 'appConfig.js' : could concat footer vendor js
 */
 gulp.task('vendor:footer:js', 
	 	['public:vendor:js:clean'], 
		 function(){
			 
			if(appConfig.concatVendorFiles === true){			 
				gulp.src(	gulpConfig.srcFiles.bowerFiles.js.toConcat, 
							{ cwd: gulpConfig.base.root })
				.pipe(concat(gulpConfig.destFiles.vendor.js))			  
				.pipe(gulp.dest(gulpConfig.destDirs.vendor.js, { cwd: gulpConfig.base.root }));
			}else{
				gulp.src(	gulpConfig.srcFiles.bowerFiles.js.toConcat, 
							{ cwd: gulpConfig.base.root })
				.pipe(gulp.dest(gulpConfig.destDirs.vendor.js, { cwd: gulpConfig.base.root }));	
			}	 	 
 });
 
 /**
 * ------------------------------------------------------------
 * VENDOR JS TASKS (combine all vendor js tasks)
 * ------------------------------------------------------------
 */
 gulp.task('vendor:js', [
	 'vendor:header:js',
	 'vendor:footer:js'
	]);







/**
 * ------------------------------------------------------------
 * VENDOR MAP TASKS
 * ------------------------------------------------------------
 */
 gulp.task('vendor:map', 
	 	//['public:clean'], 
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

gulp.task('formviewer:templatecache', function() {
    return gulp
        .src(gulpConfig.templateCache.formViewer.sourceDir + gulpConfig.templateCache.formViewer.sourceFiles, 
					{ cwd: gulpConfig.base.root })
        .pipe(minifyHtml(gulpConfig.minifyHtmlOpts))
				.pipe(ngTemplateCache(
            gulpConfig.templateCache.formViewer.destFile,
            gulpConfig.templateCache.formViewer.options
        ))
        .pipe(gulp.dest(gulpConfig.templateCache.formViewer.destDir, { cwd: gulpConfig.base.root }));
});



/**
 * -------------------------------
 * APP ANGULAR TRANSLATE
 * -------------------------------
 */
gulp.task('stepway:translate', function() {
    return gulp
        .src(gulpConfig.translateFiles.stepway.sourceDir + gulpConfig.translateFiles.stepway.sourceFiles, 
					{ cwd: gulpConfig.base.root })
				.pipe(angularTranslate(gulpConfig.translateFiles.stepway.options))	
        .pipe(gulp.dest(gulpConfig.translateFiles.stepway.destDir, { cwd: gulpConfig.base.root }));
});




/**
 * -------------------------------
 * APP SASS TASKS (STEPWAY)
 * -------------------------------
 */

 //sass : stepway
 gulp.task('app:sass:stepway', 
	 	['stepway:clean'], 
		 function(){
			 
	//minified		 
	gulp.src(gulpConfig.srcFiles.app.stepway.sass, { cwd: gulpConfig.base.root })
		.pipe(sass().on('error', notify.onError(function (error) { return 'Error: ' + error.message;})))
		.pipe(concat(gulpConfig.destFiles.app.stepway.css))
		.pipe(cssmin())     
		.pipe(wrap(gulpConfig.decorate.stepway.templateCSS))
		.pipe(rename({extname: '.min.css'}))    
		.pipe(gulp.dest(gulpConfig.destDirs.app.css, { cwd: gulpConfig.base.root }));

	//not minified
	gulp.src(gulpConfig.srcFiles.app.stepway.sass, { cwd: gulpConfig.base.root })
		.pipe(sass().on('error', notify.onError(function (error) { return 'Error: ' + error.message;})))
		.pipe(concat(gulpConfig.destFiles.app.stepway.css))     
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
	 	['dragdropway:clean'], 
		 function(){
	
	//minified		 
	gulp.src(gulpConfig.srcFiles.app.dragAndDropWay.sass, { cwd: gulpConfig.base.root })
		.pipe(sass().on('error', notify.onError(function (error) { return 'Error: ' + error.message;})))
		.pipe(concat(gulpConfig.destFiles.app.dragAndDropWay.css))
		.pipe(cssmin()) 
		.pipe(rename({extname: '.min.css'}))      
		.pipe(wrap(gulpConfig.decorate.dragAndDropWay.templateCSS))    
		.pipe(gulp.dest(gulpConfig.destDirs.app.css, { cwd: gulpConfig.base.root }));
	
	//not minified	
	gulp.src(gulpConfig.srcFiles.app.dragAndDropWay.sass, { cwd: gulpConfig.base.root })
		.pipe(sass().on('error', notify.onError(function (error) { return 'Error: ' + error.message;})))
		.pipe(concat(gulpConfig.destFiles.app.dragAndDropWay.css))      
		.pipe(wrap(gulpConfig.decorate.dragAndDropWay.templateCSS))    
		.pipe(gulp.dest(gulpConfig.destDirs.app.css, { cwd: gulpConfig.base.root }));		
});

 
/**
 * -------------------------------
 * APP SASS TASKS (FORMVIEWER)
 * -------------------------------
 */
 //sass formviewer
 gulp.task('app:sass:formviewer', 
	 	['formviewer:clean'], 
		 function(){
	
	//minified		 
	gulp.src(gulpConfig.srcFiles.app.formViewer.sass, { cwd: gulpConfig.base.root })
		.pipe(sass().on('error', notify.onError(function (error) { return 'Error: ' + error.message;})))
		.pipe(concat(gulpConfig.destFiles.app.formViewer.css))
		.pipe(cssmin()) 
		.pipe(rename({extname: '.min.css'}))      
		.pipe(wrap(gulpConfig.decorate.formviewer.templateCSS))    
		.pipe(gulp.dest(gulpConfig.destDirs.app.css, { cwd: gulpConfig.base.root }));
	
	//not minified	
	gulp.src(gulpConfig.srcFiles.app.formViewer.sass, { cwd: gulpConfig.base.root })
		.pipe(sass().on('error', notify.onError(function (error) { return 'Error: ' + error.message;})))
		.pipe(concat(gulpConfig.destFiles.app.formViewer.css))    
		.pipe(wrap(gulpConfig.decorate.formviewer.templateCSS))    
		.pipe(gulp.dest(gulpConfig.destDirs.app.css, { cwd: gulpConfig.base.root }));	
});





/**
 * -------------------------------
 * APP JS TASKS (STEPWAY WAY)
 * -------------------------------
 */
gulp.task('app:js:stepway', 
		[
			'stepway:clean',
			'stepway:templatecache',
			'stepway:translate'
		], 
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
 * APP JS TASKS (STEP WAY ES6)
 * -------------------------------
 */

gulp.task('build:ES6:jshint', function(){
  return gulp.src(gulpConfig.srcFiles.app.ES6.stepway.js)
    .pipe(jshint({esnext : true}))
    .pipe(jshint.reporter('default'))
});

gulp.task('stepWayES6:sfx:min', function (cb) {
  exec('jspm bundle-sfx src/app/stepway-ES6/edaStepWayEasyFormGen.main ./public/js/eda.stepway-ES6.min.js --minify', function (err, stdout, stderr) {
      cb(err);
  });
});

gulp.task('stepWayES6:sfx', function (cb) {
  exec('jspm bundle-sfx src/app/stepway-ES6/edaStepWayEasyFormGen.main ./public/js/eda.stepway-ES6.js', function (err, stdout, stderr) {
      cb(err);
  });
});

gulp.task('build:stepWay:ES6', [
	'build:ES6:jshint',
	'stepWayES6:sfx'
]);



/**
 * -------------------------------
 * APP JS TASKS (DRAGDROP WAY)
 * -------------------------------
 */
gulp.task('app:js:dragdropway', 
		[
			'dragdropway:clean',
			'dragdropway:templatecache'
		],  
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
 * -------------------------------
 * APP JS TASKS (FORMVIEWER)
 * -------------------------------
 */
gulp.task('app:js:formviewer', 
		[
			'formviewer:clean',
			'formviewer:templatecache'
		],  
		function() {
	//NOTE : change ./easyFormGenConfig/app/appConfig to change environment
	if(appConfig.environment.current === 'PROD'){
		//prod version
		gulp.src(gulpConfig.srcFiles.app.formViewer.js,
						{cwd: gulpConfig.base.root})
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(sourcemaps.init())	
			.pipe(uglify()) 
			.pipe(concat(gulpConfig.destFiles.app.formViewer.js))
			.pipe(wrap(gulpConfig.decorate.formviewer.templateJS))
			.pipe(sourcemaps.write('./'))
			.on('error', notify.onError(function (error) { return 'Error: ' + error.message;}))
			.pipe(gulp.dest(gulpConfig.destDirs.app.js, { cwd: gulpConfig.base.root })
		);
	}else{
		//dev version (no uglify/no source map)
		gulp.src(gulpConfig.srcFiles.app.formViewer.js,
						{cwd: gulpConfig.base.root})
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(concat(gulpConfig.destFiles.app.formViewer.js))
			.pipe(wrap(gulpConfig.decorate.formviewer.templateJS))
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
									'!' + gulpConfig.templateCache.stepway.destDir + gulpConfig.templateCache.stepway.destFile,
									//app : form viewer sources
									gulpConfig.templateCache.formViewer.sourceDir + gulpConfig.templateCache.formViewer.sourceFiles,
									gulpConfig.srcFiles.app.formViewer.js,
									gulpConfig.srcFiles.app.formViewer.sass,
									'!' + gulpConfig.templateCache.formViewer.destDir + gulpConfig.templateCache.formViewer.destFile										
								], 
								[
									'default'
								]
							);
	watcher.on('change', function(event) {
	  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
});


/**
 * ---------------------------------------------------------
 * DEFAULT TASK : 'gulp' command or ctrl+shift+B (in VSCode)
 * -> build app only
 * ---------------------------------------------------------
 */
gulp.task('default', [	 
						//app tasks
						'app:sass:stepway',
						'app:sass:dragdropway',
						'app:sass:formviewer',
						'app:js:stepway',
						'app:js:dragdropway',
						'app:js:formviewer'
					 ]);
					 

/**
 * ------------------------------------------------------------
 * BUILD:ALL TASK : 'gulp build:all' refresh all (vendors + app)
 * ------------------------------------------------------------
 */
gulp.task('build:all', [ 
						//vendor tasks
						'vendor:css:specialCases',
						'vendor:css',
						'vendor:fonts',
						'vendor:js',
						'vendor:map',
						//app tasks
						'app:sass:stepway',
						'app:sass:dragdropway',
						'app:sass:formviewer',
						'app:js:stepway',
						'app:js:dragdropway',
						'app:js:formviewer'
					 ], function(){
						 console.info('building app + vendors. \concat vendors param set to : ' + appConfig.concatVendorFiles);
					 });
					 


/**
 * --------------------------------------------------------------------
 * DIST TASK : uglify app js files and copy all public + html into dist
 * --------------------------------------------------------------------
 */
gulp.task('dist', [
//'dist:copy'
'dist:uglify:app:js'	
]);




 //public  - all content  
 gulp.task('dist:copy', 
	 		[
			 	'dist:clean'//, 
				
			], 
		 function(){
	//all public dir	 
  gulp.src(gulpConfig.base.publicDir + '**/*', {base : './'})
    .pipe(gulp.dest(gulpConfig.base.distDir ,{cwd: gulpConfig.base.root}));
	
	var indexHtmlFiles = [
		gulpConfig.base.root + gulpConfig.stepWayHtmlFile.name,
		gulpConfig.base.root + gulpConfig.stepWayAsModuleHtmlFile.name,
		gulpConfig.base.root + gulpConfig.dragDropWayHtmlFile.name,
		gulpConfig.base.root + gulpConfig.dragDropWayAsModuleHtmlFile.name,
		gulpConfig.base.root + gulpConfig.easyFormViewerHtmlFile.name,
	];
	//html files
	gulp.src(indexHtmlFiles) 
	.pipe(gulp.dest(gulpConfig.base.distDir ,{cwd: gulpConfig.base.root}));
	
	//bower js
  gulp.src(gulpConfig.destDirs.app.js + '/*.js', {cwd: gulpConfig.base.root})
    .pipe(gulp.dest(gulpConfig.bower.js ,{cwd: gulpConfig.base.distDir}));	
		
	//bower css
  gulp.src(gulpConfig.destDirs.app.css + '/*.css', {cwd: gulpConfig.base.root})
    .pipe(gulp.dest(gulpConfig.bower.css ,{cwd: gulpConfig.base.distDir }));
					
	//textAngular css fix
  gulp.src(gulpConfig.srcFiles.app.common.customTextAngularCss, {cwd: gulpConfig.base.root})
    .pipe(gulp.dest(gulpConfig.bower.css ,{cwd: gulpConfig.base.distDir }));					
 })
 
 
 gulp.task('dist:uglify:app:js', 
	 [
		 'dist:copy'
	 ],
	 function(){
	 
	 var appJsFiles = [
		  gulpConfig.destDirs.app.js + '/' + gulpConfig.destFiles.app.stepway.js,
			gulpConfig.destDirs.app.js + '/' + gulpConfig.destFiles.app.dragAndDropWay.js,
			gulpConfig.destDirs.app.js + '/' + gulpConfig.destFiles.app.formViewer.js
	 ];
	 
	 //stepway js
		gulp.src(appJsFiles[0], {cwd : './'})
			.pipe(sourcemaps.init())
			.pipe(rename({extname: '.min.js'}))
			.pipe(uglify())
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(gulpConfig.destDirs.app.js, { cwd : gulpConfig.base.root}));
		//drag and drop js	
		gulp.src(appJsFiles[1], {cwd : './'})
			.pipe(sourcemaps.init())
			.pipe(rename({extname: '.min.js'}))
			.pipe(uglify())
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(gulpConfig.destDirs.app.js, { cwd : gulpConfig.base.root}));
		//formviewer  js	
		gulp.src(appJsFiles[2], {cwd : './'})
			.pipe(sourcemaps.init())
			.pipe(rename({extname: '.min.js'}))
			.pipe(uglify())
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(gulpConfig.destDirs.app.js, { cwd : gulpConfig.base.root}));						
 });