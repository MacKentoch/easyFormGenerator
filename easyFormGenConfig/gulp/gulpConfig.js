var bowerFiles 	= require('./bowerFiles');
var appFiles		= require('./appFiles');

module.exports = {
	
	//directories bases
	base : {
		root		 			: './',
		srcDir 				: './src/',
		publicDir 		: './public/', 
		distDir				: './dist/' 
	},


	//source files
	srcFiles : {
		app : {
			stepway : {
				js 						: appFiles.stepway.js,
				sass 					: 'src/sass/stepway/**/*.scss',
				htmlTemplates : 'src/app/stepway/htmlTemplates/**/*.html'			
			},
			dragAndDropWay : {
				js 						: appFiles.dragdropway.js,
				sass 					: 'src/sass/dragdropway/**/*.scss',
				htmlTemplates : 'src/app/dragdropway/htmlTemplates/**/*.html'				
			}
		},
		bowerFiles : {
			js 		: {
				noConcat : bowerFiles.bowerComponentsNoConcatJS,
				toConcat : bowerFiles.bower_components_js
			},
			css 	: {
				noMinify 					: bowerFiles.bower_components_css,
				toMinify 					: bowerFiles.bower_textAngular_css,
				toCleanAndMinify 	: bowerFiles.bower_clean_paper_boostrap_css
			},
			fonts : bowerFiles.bower_components_fonts,
			maps 	: bowerFiles.bower_components_map
		}
	},
	
	//destination directories
	destDirs : {
		app : {
			js 	: 'public/js/',
			css : 'public/css/' 
		}
	},
	
	//destination files
	destFiles : {
		app : {
			stepway 				: {
				js : 'eda.stepway.js',
				css: 'eda.stepway.css',
			},
			dragAndDropWay 	: {
				js : 'eda.dragdropway.js',
				css: 'eda.dragdropway.js',
			}
		},
		vendor : {
			js 		: 'public/lib/js/',
			css 	: 'public/lib/css/',
			fonts : 'public/lib/fonts'
		}
	},
	
	//templateCache config
	templateCache	: {
			sourceDir		: 'src/app/stepway/htmlTemplates/',
			sourceFiles : '**/*.html',
			destDir 		: 'src/app/stepway/core/',	
			destFile		: 'ngwf.templates.js',
			options 		: {
				module: 'ngwfApp',
				root: '',
				standAlone: false
			}
	},
	
	//minify html
	minifyHtmlOpts : {
		conditionals : true,
		spare : true
	}
	
}

