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
			},
			formViewer : {
				js 						: appFiles.formviewer.js,
				sass 					: 'src/sass/formviewer/**/*.scss',
				htmlTemplates : 'src/app/stepway/htmlTemplates/**/*.html'			
			},
			common : {
				customTextAngularCss : 'src/sass/common/eda.textAngular.min.css'
			}
		},
		bowerFiles : {
			js 		: {
				noConcat : bowerFiles.bowerComponentsNoConcatJS,
				toConcat : bowerFiles.bower_components_js
			},
			css 	: {
				noMinify 					: bowerFiles.bower_components_css,		
				toMinify 					: {
						srcFile : bowerFiles.bower_textAngular_css,
						destfileName : 'textAngular.min.css'
					},
				toCleanAndMinify 	: {
						srcFile : bowerFiles.bower_clean_paper_boostrap_css,
						destfileName : 'bootstrap.min.css'
					},
				minifyInThisDir 	: 'src/vendor/css/'
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
			stepwayMin 				: {
				js : 'eda.stepway.min.js',
				css: 'eda.stepway.min.css',
			},			
			dragAndDropWay 	: {
				js : 'eda.dragdropway.js',
				css: 'eda.dragdropway.css',
			},
			dragAndDropWayMin 	: {
				js : 'eda.dragdropway.min.js',
				css: 'eda.dragdropway.min.css',
			},
			formViewer 				: {
				js : 'eda.easyFormViewer.js',
				css: 'eda.easyFormViewer.css',
			},
			formViewerMin 				: {
				js : 'eda.easyFormViewer.min.js',
				css: 'eda.easyFormViewer.min.css',
			},						
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
		formViewer : {
			sourceDir		: 'src/app/formviewer/htmlTemplates/',
			sourceFiles : '**/*.html',
			destDir 		: 'src/app/formviewer/core/',	
			destFile		: 'eda.fv.templates.js',
			options 		: {
				module: 'eda.easyFormViewer',
				root: '',
				standAlone: false
			}			
		}		

	},
	
	translateFiles :{
		stepway 				: {
			sourceDir		: 'src/app/stepway/i18n/',
			sourceFiles : '**/local-*.json',
			destDir 		: 'src/app/stepway/core/',	
			destFile		: 'eda.stepway.translate.js',
			options			: {
				'module' : 'eda.translate' 
			}
		},
		dragAndDropWay 	: {
			sourceDir		: 'src/app/dragdropway/i18n/',
			sourceFiles : '**/local-*.json',
			destDir 		: 'src/app/dragdropway/core/',	
			destFile		: 'eda.dragdropway.translate.js',
			options			: {
				'module' : 'eda.translate' 
			}						
		},
		formViewer 			: {
			sourceDir		: 'src/app/formviewer/i18n/',
			sourceFiles : '**/local-*.json',
			destDir 		: 'src/app/formviewer/core/',	
			destFile		: 'eda.formviewer.translate.js',
			options			: {
				'module' : 'eda.translate' 
			}					
		}
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
				
			formviewer  : {
			templateJS: [
										'/** \n' , 
										' *easyFormViewer \n',
										' *Version ' +  appConfig.version.stepWay + ' \n',
										' *Author : Erwan Datin (MacKentoch) \n', 
										' *Link: https://github.com/MacKentoch/easyFormGenerator \n',
										' *License : MIT (2015) \n',
										'**/ \n',
										';(function(){\n 	\'use strict\';\n<%= contents %>\n})(this);'
									].join(' '),
		
			templateCSS: 	[
											'/*! \n' + 
											' * easyFormViewer \n',
											' * Version ' + appConfig.version.stepWay + ' \n' + 				
											' * Author : Erwan Datin (MacKentoch) \n' +
											' *Link: https://github.com/MacKentoch/easyFormGenerator \n' + 
											' * License : 2015 MIT \n' + 								
											'*/ \n' +
											'\n<%= contents %>\n'
										].join('') 
			},		
			
		},
		
		stepWayHtmlFile : {
			name : 'index_StepWay.html'
		},
	
		stepWayAsModuleHtmlFile : {
			name : 'index_StepWay_As_Module.html'
		},
	
		dragDropWayHtmlFile : {
			name : 'index_DragDropWay.html'
		},
		
		dragDropWayAsModuleHtmlFile : {
			name : 'index_DragDropWay_As_Module.html'
		},		
		
		easyFormViewerHtmlFile : {
			name : 'index_easyFormViewer_Module.html'
		},
		
				
		
		bower : {
			js : 'js/',
			css: 'css/',
			html : {
				stepway : 'EasyFormGenerator-StepWay-DEMO.html',
				dragdropway : ''
			}
		}	
	
}

