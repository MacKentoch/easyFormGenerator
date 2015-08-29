var bowerFiles 	= require('./bowerFiles');
var appFiles		= require('./appFiles');
var appConfig 	= require('../app/appConfig');

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
				toCleanAndMinify 	: bowerFiles.bower_clean_paper_boostrap_css,
				minifyInThisDir 	: 'src/vendor/css'
			},
			fonts : bowerFiles.bower_components_fonts,
			maps 	: bowerFiles.bower_components_map
		}
	},
	
	//destination directories
	destDirs : {		
		app : {
			js 	: 'public/js',
			css : 'public/css' 
		},
		vendor : {
			js 		: 'public/lib/js',
			css 	: 'public/lib/css',
			fonts : 'public/lib/fonts'
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
				css: 'eda.dragdropway.css',
			}
		},
		vendor : {
			js 		: 'vendors.js',
			css 	: 'vendor.css'
		}
	},
	
	//templateCache config
	templateCache	: {
		stepway : {
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
		dragAndDropWay : {
			sourceDir		: 'src/app/dragdropway/htmlTemplates/',
			sourceFiles : '**/*.html',
			destDir 		: 'src/app/dragdropway/core/',	
			destFile		: 'eda.templates.js',
			options 		: {
				module: 'edaApp',
				root: '',
				standAlone: false
			}			
		},		
		

	},
	
	//minify html
	minifyHtmlOpts : {
		conditionals : true,
		spare : true
	},
	
	
	//decorate
	decorate : {
		
		stepway  : {
			templateJS: [
										'/** \n' , 
										' *easyFormGenerator — step way — version \n',
										' *Version ' +  appConfig.version.stepWay + ' \n',
										' *Author : Erwan Datin (MacKentoch) \n', 
										' *Link: https://github.com/MacKentoch/easyFormGenerator \n',
										' *License : MIT (2015) \n',
										'**/ \n',
										';(function(){\n 	\'use strict\';\n<%= contents %>\n})(this);'
									].join(' '),
		
			templateCSS: 	[
											'/*! \n' + 
											' * easyFormGenerator — step way — version \n' + 
											' * Version ' + appConfig.version.stepWay + ' \n' + 				
											' * Author : Erwan Datin (MacKentoch) \n' +
											' *Link: https://github.com/MacKentoch/easyFormGenerator \n' + 
											' * License : 2015 MIT \n' + 								
											'*/ \n' +
											'\n<%= contents %>\n'
										].join('') 
			},
			
		dragAndDropWay  : {
			templateJS: [
										'/** \n' , 
										' *easyFormGenerator — drag and drop way — version \n',
										' *Version ' +  appConfig.version.dragAndDropWay + ' \n',
										' *Author : Erwan Datin (MacKentoch) \n', 
										' *Link: https://github.com/MacKentoch/easyFormGenerator \n',
										' *License : MIT (2015) \n',
										'**/ \n',
										';(function(){\n 	\'use strict\';\n<%= contents %>\n})(this);'
									].join(' '),
		
			templateCSS: 	[
											'/*! \n' + 
											' * easyFormGenerator — drag and drop way — version \n' + 
											' * Version ' + appConfig.version.dragAndDropWay + ' \n' + 				
											' * Author : Erwan Datin (MacKentoch) \n' +
											' *Link: https://github.com/MacKentoch/easyFormGenerator \n' + 
											' * License : 2015 MIT \n' + 								
											'*/ \n' +
											'\n<%= contents %>\n'
										].join('') 
			},				
			
			
		}
	
}

