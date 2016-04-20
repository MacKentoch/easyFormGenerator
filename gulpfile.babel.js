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
 * ——————————————————————————————————————————————
 * MIT (2016) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
'use strict';

import gulp 								from 'gulp';
import del    							from 'del';
import eslint 							from 'gulp-eslint';
import concat 							from 'gulp-concat';
import cssmin 							from 'gulp-cssmin';
import sass 								from 'gulp-sass';
import notify 							from 'gulp-notify';
import wrap 								from 'gulp-wrap';
import deleteLines 				  from 'gulp-delete-lines';
import rename							  from 'gulp-rename';
import childProcess         from 'child_process';

const exec = childProcess.exec;


/**
 * ////////////////////////////////////////////////////////////////
 * CONFIGS
 * ////////////////////////////////////////////////////////////////
 */
import gulpConfig           from './src/gulp/gulpConfig';

/**
 * ------------------
 * CLEANING TASKS :
 * ------------------
 * - dist (all)
 * - public (all)
 * - public (only stepway)
 * - public (only dragdropway)
 */

// clean all dist
gulp.task('dist:clean',  cb => del([`${gulpConfig.base.distDir}**/*`], cb));

//clean all public : NOT USED -> use other cleaning tasks (safer)
gulp.task('public:clean', cb => del([`${gulpConfig.base.publicDir}**/*`], cb));

//clean all vendor css  : public dir
gulp.task('public:vendor:css:clean', cb => del([gulpConfig.base.root + gulpConfig.destDirs.vendor.css + '/**/*.css'], cb));

//clean all vendor js  : public dir
gulp.task('public:vendor:js:clean', cb => del([gulpConfig.base.root + gulpConfig.destDirs.vendor.js + '/**/*.js'], cb));

//clean all vendor fonts  : public dir
gulp.task('public:vendor:fonts:clean', cb => del([gulpConfig.base.root + gulpConfig.destDirs.vendor.fonts + '/**/*'], cb));

//clean public : stepway
gulp.task('stepway:clean', cb => {
  del([
		gulpConfig.base.publicDir + 'js/' + gulpConfig.destFiles.app.stepway.js,
		gulpConfig.base.publicDir + 'css/' + gulpConfig.destFiles.app.stepway.css
  ], cb);
});

//clean public : dragdropway
gulp.task('dragdropway:clean', cb => {
  del([
		gulpConfig.base.publicDir + 'js/' + gulpConfig.destFiles.app.dragAndDropWay.js,
		gulpConfig.base.publicDir + 'css/' + gulpConfig.destFiles.app.dragAndDropWay.css
		], cb);
});

//clean public : formviewer
gulp.task('formviewer:clean', cb => {
  del([
		gulpConfig.base.publicDir + 'js/' + gulpConfig.destFiles.app.formViewer.js,
		gulpConfig.base.publicDir + 'css/' + gulpConfig.destFiles.app.formViewer.css
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
		() => {
	gulp.src(gulpConfig.srcFiles.bowerFiles.css.toMinify.srcFile, { cwd: gulpConfig.base.root })
		.pipe(concat(gulpConfig.srcFiles.bowerFiles.css.toMinify.destfileName))
		.pipe(cssmin())
		//.pipe(gulp.dest(gulpConfig.srcFiles.bowerFiles.css.minifyInThisDir, { cwd: gulpConfig.base.root }))
		.pipe(gulp.dest(gulpConfig.destDirs.vendor.css, { cwd: gulpConfig.base.root }));

	gulp.src(gulpConfig.srcFiles.bowerFiles.css.toCleanAndMinify.srcFile, { cwd: gulpConfig.base.root })
		.pipe(deleteLines({ 'filters': [/^@import url/] }))
		.pipe(concat(gulpConfig.srcFiles.bowerFiles.css.toCleanAndMinify.destfileName))
		.pipe(cssmin())
		.on('error', notify.onError(error => 'Error: ' + error.message))
		//.pipe(gulp.dest(gulpConfig.srcFiles.bowerFiles.css.minifyInThisDir, { cwd: gulpConfig.base.root }))
		.pipe(gulp.dest(gulpConfig.destDirs.vendor.css, { cwd: gulpConfig.base.root }));

});





// vendor:css TASK : css, copyt to public dir
// NOTE : depending 'appConfig.js' : could concat vendor css
gulp.task('vendor:css',
	['vendor:css:specialCases'],
	() => {
		const sources = gulpConfig.srcFiles.bowerFiles.css.noMinify;
		// if(appConfig.concatVendorFiles === true){
    //   gulp.src( sources
    //             ,{ cwd: gulpConfig.base.root })
    //       .pipe(concat(gulpConfig.destFiles.vendor.css))
    //       .pipe(gulp.dest(gulpConfig.destDirs.vendor.css, { cwd: gulpConfig.base.root }));
		// }else{
		gulp.src( sources
							,{ cwd: gulpConfig.base.root })
				.pipe(gulp.dest(gulpConfig.destDirs.vendor.css, { cwd: gulpConfig.base.root }));
		// }
});



/**
 * -------------------------------
 * VENDORS FONTS COPY TASK
 * -------------------------------
 */
gulp.task('vendor:fonts',
			['public:vendor:fonts:clean'],
			() => {
 gulp.src(gulpConfig.srcFiles.bowerFiles.fonts, { cwd: gulpConfig.base.root })
 .pipe(gulp.dest(gulpConfig.destDirs.vendor.fonts, { cwd: gulpConfig.base.root }));
});









/**
 * ------------------------------------------------------------
 * VENDOR JS TASKS (SCRIPTS for HEADER : jquery, angular....)
 * ------------------------------------------------------------
 *
 *  NOTE these vendor js never concatenate
 */
gulp.task('vendor:header:js',
		['public:vendor:js:clean'],
		() => {
	gulp.src(	gulpConfig.srcFiles.bowerFiles.js.noConcat, { cwd: gulpConfig.base.root })
 .pipe(gulp.dest(gulpConfig.destDirs.vendor.js, { cwd: gulpConfig.base.root }));
});

/**
 * ------------------------------------------------------------
 * VENDOR JS TASKS (SCRIPTS for FOOTER and concatenable)
 * ------------------------------------------------------------
 *
 * NOTE : depending 'appConfig.js' : could concat footer vendor js
 */
 gulp.task('vendor:footer:js', ['public:vendor:js:clean'], () => {
			// if(appConfig.concatVendorFiles === true){
			// 	gulp.src(	gulpConfig.srcFiles.bowerFiles.js.toConcat,
			// 				{ cwd: gulpConfig.base.root })
			// 	.pipe(concat(gulpConfig.destFiles.vendor.js))
			// 	.pipe(gulp.dest(gulpConfig.destDirs.vendor.js, { cwd: gulpConfig.base.root }));
			// }else{
  gulp.src(	gulpConfig.srcFiles.bowerFiles.js.toConcat,
    { cwd: gulpConfig.base.root })
    .pipe(gulp.dest(gulpConfig.destDirs.vendor.js, { cwd: gulpConfig.base.root }));
			// }
 });

 /**
 * ------------------------------------------------------------
 * VENDOR JS TASKS (combine all vendor js tasks)
 * ------------------------------------------------------------
 */
 gulp.task('vendor:js', ['vendor:header:js','vendor:footer:js']);





/**
 * ------------------------------------------------------------
 * VENDOR MAP TASKS
 * ------------------------------------------------------------
 */
 gulp.task('vendor:map', () => {
 gulp
    .src(	gulpConfig.srcFiles.bowerFiles.maps, { cwd: gulpConfig.base.root })
    .pipe(gulp.dest(gulpConfig.destDirs.vendor.js, { cwd: gulpConfig.base.root }));
 });








/**
 * -------------------------------
 * APP SASS TASKS (STEPWAY)
 * -------------------------------
 */

 //sass : stepway
 gulp.task('app:sass:stepway',
  ['stepway:clean'],
  () => {
	//minified
	gulp.src(gulpConfig.srcFiles.app.stepway.sass, { cwd: gulpConfig.base.root })
		.pipe(sass().on('error', notify.onError(error => 'Error: ' + error.message)))
		.pipe(concat(gulpConfig.destFiles.app.stepway.css))
		.pipe(cssmin())
		.pipe(wrap(gulpConfig.decorate.stepway.templateCSS))
		.pipe(rename({extname: '.min.css'}))
		.pipe(gulp.dest(gulpConfig.destDirs.app.css, { cwd: gulpConfig.base.root }));

	//not minified
	gulp.src(gulpConfig.srcFiles.app.stepway.sass, { cwd: gulpConfig.base.root })
		.pipe(sass().on('error', notify.onError(error => 'Error: ' + error.message)))
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
  () => {
	//minified
	gulp.src(gulpConfig.srcFiles.app.dragAndDropWay.sass, { cwd: gulpConfig.base.root })
		.pipe(sass().on('error', notify.onError(error => 'Error: ' + error.message)))
		.pipe(concat(gulpConfig.destFiles.app.dragAndDropWay.css))
		.pipe(cssmin())
		.pipe(rename({extname: '.min.css'}))
		.pipe(wrap(gulpConfig.decorate.dragAndDropWay.templateCSS))
		.pipe(gulp.dest(gulpConfig.destDirs.app.css, { cwd: gulpConfig.base.root }));
	//not minified
	gulp.src(gulpConfig.srcFiles.app.dragAndDropWay.sass, { cwd: gulpConfig.base.root })
		.pipe(sass().on('error', notify.onError(error => 'Error: ' + error.message)))
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
  () => {
	//minified
	gulp.src(gulpConfig.srcFiles.app.formViewer.sass, { cwd: gulpConfig.base.root })
		.pipe(sass().on('error', notify.onError(error => 'Error: ' + error.message)))
		.pipe(concat(gulpConfig.destFiles.app.formViewer.css))
		.pipe(cssmin())
		.pipe(rename({extname: '.min.css'}))
		.pipe(wrap(gulpConfig.decorate.formviewer.templateCSS))
		.pipe(gulp.dest(gulpConfig.destDirs.app.css, { cwd: gulpConfig.base.root }));
	//not minified
	gulp.src(gulpConfig.srcFiles.app.formViewer.sass, { cwd: gulpConfig.base.root })
		.pipe(sass().on('error', notify.onError(error => 'Error: ' + error.message)))
		.pipe(concat(gulpConfig.destFiles.app.formViewer.css))
		.pipe(wrap(gulpConfig.decorate.formviewer.templateCSS))
		.pipe(gulp.dest(gulpConfig.destDirs.app.css, { cwd: gulpConfig.base.root }));
});






/**
 * -------------------------------
 * APP JS TASKS (STEP WAY ES6)
 * -------------------------------
 */

/**
 * eslint stepway ES6   - uses .eslintrc file
 */
gulp.task('eslint:stepway:es6', () => {
  return gulp.src(gulpConfig.srcFiles.app.ES6.stepway.js)
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/**
 * eslint drag and drop way ES6   - uses .eslintrc file
 */
gulp.task('eslint:dragdropway:es6', () => {
  return gulp.src(gulpConfig.srcFiles.app.ES6.dragAndDropWay.js)
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/**
 * eslint form viewer ES6   - uses .eslintrc file
 */
gulp.task('eslint:formviewer:es6', () => {
  return gulp.src(gulpConfig.srcFiles.app.ES6.formViewer.js)
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


const stepWaySfxNoMinifyCMD  = `jspm bundle-sfx ${gulpConfig.jspm.stepWay.src} ${gulpConfig.jspm.stepWay.bundle}`;
gulp.task('stepWayES6:sfx',
  // ['stepway:clean'],
  cb => {
  exec(stepWaySfxNoMinifyCMD, (err, stdout) => {
    cb(err);
    /* eslint no-console:0 */
    console.log(stdout);
   });
});


const stepWaySfxMinifyCMD  = `jspm bundle-sfx ${gulpConfig.jspm.stepWay.src} ${gulpConfig.jspm.stepWay.bundleMin} --minify`;
gulp.task('stepWayES6:sfx:min',
  // ['stepway:clean'],
  cb => {
  exec(stepWaySfxMinifyCMD, (err, stdout) => {
    cb(err);
    console.log(stdout);
   });
});


gulp.task('build:stepWay:ES6', [
	'eslint:stepway:es6',
	'stepWayES6:sfx'
]);

gulp.task('app:js:stepway', [
  'eslint:stepway:es6',
  'stepWayES6:sfx'
]);

gulp.task('build:stepWay:ES6:min', [
	'eslint:stepway:es6',
	'stepWayES6:sfx:min'
]);



//drag and drop way
const dragAndDropWaySfxNoMinifyCMD  = `jspm bundle-sfx ${gulpConfig.jspm.dragDropWay.src} ${gulpConfig.jspm.dragDropWay.bundle}`;
gulp.task('dragdropway:ES6:sfx',
  // ['dragdropway:clean'],
  cb => {
  exec(dragAndDropWaySfxNoMinifyCMD, (err, stdout) => {
    cb(err);
    /* eslint no-console:0 */
    console.log(stdout);
  });
});


const dragAndDropWaySfxMinifyCMD  = `jspm bundle-sfx ${gulpConfig.jspm.dragDropWay.src} ${gulpConfig.jspm.dragDropWay.bundleMin} --minify`;
gulp.task('dragdropway:ES6:sfx:min',
  // ['dragdropway:clean'],
  cb => {
  exec(dragAndDropWaySfxMinifyCMD, (err, stdout) => {
    cb(err);
    /* eslint no-console:0 */
    console.log(stdout);
  });
});

gulp.task('build:dragdropway:ES6', [
	'eslint:dragdropway:es6',
	'dragdropway:ES6:sfx'
]);

gulp.task('build:dragdropway:ES6:min', [
	'eslint:dragdropway:es6',
	'dragdropway:ES6:sfx:min'
]);


//formViewer
const formViewerSfxNoMinifyCMD  = `jspm bundle-sfx ${gulpConfig.jspm.formViewer.src} ${gulpConfig.jspm.formViewer.bundle}`;
gulp.task('formViewer:ES6:sfx',
  // ['formviewer:clean'],
  cb => {
  exec(formViewerSfxNoMinifyCMD, (err, stdout) => {
    cb(err);
    /* eslint no-console:0 */
    console.log(stdout);
  });
});

const formViewerSfxMinifyCMD  = `jspm bundle-sfx ${gulpConfig.jspm.formViewer.src} ${gulpConfig.jspm.formViewer.bundleMin} --minify`;
gulp.task('formViewer:ES6:sfx:min',
  // ['formviewer:clean'],
  cb => {
  exec(formViewerSfxMinifyCMD, (err, stdout) => {
    cb(err);
    /* eslint no-console:0 */
    console.log(stdout);
  });
});

gulp.task('build:formViewer:ES6', [
	'eslint:formviewer:es6',
	'formViewer:ES6:sfx'
]);

gulp.task('app:js:formviewer', [
  'eslint:formviewer:es6',
  'formViewer:ES6:sfx'
]);

gulp.task('build:formViewer:ES6:min', [
	'eslint:formviewer:es6',
	'formViewer:ES6:sfx:min'
]);

/**
 * -------------------------------
 * APP JS TASKS (DRAGDROP WAY)
 * -------------------------------
 */


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
  'build:stepWay:ES6',
  'build:dragdropway:ES6',
  'build:formViewer:ES6'
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
  'build:stepWay:ES6',
  'build:dragdropway:ES6',
  'build:formViewer:ES6'
], () =>console.info(`building app + vendors.`));


/**
 * --------------------------------------------------------------------
 * DIST TASK : uglify app js files and copy all public + html into dist
 * --------------------------------------------------------------------
 */
gulp.task('dist', [
  'dist:copy'
]);



 //public  - all content
 gulp.task('dist:copy', [
   'build:stepWay:ES6:min',
   'build:dragdropway:ES6:min',
   'build:formViewer:ES6:min'
  ], () => {
	//all public dir
  gulp.src(gulpConfig.base.publicDir + '**/*', {base : './'})
    .pipe(gulp.dest(gulpConfig.base.distDir ,{cwd: gulpConfig.base.root}));

	const indexHtmlFiles = [
		gulpConfig.base.root + gulpConfig.stepWayHtmlFile.name,
		gulpConfig.base.root + gulpConfig.dragDropWayHtmlFile.name,
		gulpConfig.base.root + gulpConfig.easyFormViewerHtmlFile.name
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
 });
