import bowerFiles from './bowerFiles';
import appFiles		from './appFiles';
import appConfig 	from '../app/easyFormConfig.json';

const decorStepWayCss = `
/*!
 * easyFormGenerator — step way — version
 * Version ${appConfig.stepway.version}
 * Author : Erwan Datin (MacKentoch)
 *Link: https://github.com/MacKentoch/easyFormGenerator
 * License : 2015 MIT
*/
<%= contents %>
`;

const decorDragDropWayCss = `
/*!
 * easyFormGenerator — drag and drop way — version
 * Version ${appConfig.dragdropway.version}
 * Author : Erwan Datin (MacKentoch)
 *Link: https://github.com/MacKentoch/easyFormGenerator
 * License : 2015 MIT
*/
<%= contents %>
`;

const decorFormViewerCss = `
/*!
   * easyFormViewer
   * Version ${appConfig.formviewer.version}
   * Author : Erwan Datin (MacKentoch)
   *Link: https://github.com/MacKentoch/easyFormGenerator
   * License : 2015 MIT
  */
  <%= contents %>
`;

const gulpConfig = {
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
			},
			ES6 : {
				stepway : {
					js		: 'src/app/stepway-ES6/**/*.js'
				},
				dragAndDropWay : {
					js		: 'src/app/dragdropway-ES6/**/*.js'
				},
				formViewer : {
					js		: 'src/app/formviewer-ES6/**/*.js'
				}
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
				css: 'eda.stepway.css'
			},
			stepwayMin 				: {
				js : 'eda.stepway.min.js',
				css: 'eda.stepway.min.css'
			},
			dragAndDropWay 	: {
				js : 'eda.dragdropway-ES6.js',
				css: 'eda.dragdropway.css'
			},
			dragAndDropWayMin 	: {
				js : 'eda.dragdropway-ES6.min.js',
				css: 'eda.dragdropway.min.css'
			},
			formViewer 				: {
				js : 'eda.easyFormViewer-ES6.js',
				css: 'eda.easyFormViewer.css'
			},
			formViewerMin 				: {
				js : 'eda.easyFormViewer-ES6.min.js',
				css: 'eda.easyFormViewer.min.css'
			}
		},
		vendor : {
			js 		: 'vendors.js',
			css 	: 'vendor.css'
		}
	},
	translateFiles :{
		stepway 				: {
			sourceDir		: 'src/app/stepway/i18n/',
			sourceFiles : '**/local-*.json',
			destDir 		: 'src/app/stepway/core/',
			destFile		: 'eda.stepway.translate.js',
			options			: {
				module : 'eda.easyFormGenerator.translate'
			}
		},
		dragAndDropWay 	: {
			sourceDir		: 'src/app/dragdropway/i18n/',
			sourceFiles : '**/local-*.json',
			destDir 		: 'src/app/dragdropway/core/',
			destFile		: 'eda.dragdropway.translate.js',
			options			: {
				module : 'eda.easyFormGenerator.translate'
			}
		},
		formViewer 			: {
			sourceDir		: 'src/app/formviewer/i18n/',
			sourceFiles : '**/local-*.json',
			destDir 		: 'src/app/formviewer/core/',
			destFile		: 'eda.formviewer.translate.js',
			options			: {
				module : 'eda.easyFormGenerator.translate'
			}
		}
	},
	//decorate
	decorate : {
		stepway  : {
			templateCSS: decorStepWayCss
      },

		dragAndDropWay  : {
			templateCSS: decorDragDropWayCss
			},

			formviewer  : {
			templateCSS: decorFormViewerCss
			}
		},
		stepWayHtmlFile : {
			name : 'index_StepWay.html'
		},
		stepWayAsModuleHtmlFile : {
			name : 'index_StepWay.html'
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
		},

		jspm : {
			stepWay : {
				src 			: 'src/app/stepway/edaStepWayEasyFormGen.main',
				bundle 		: './public/js/eda.stepway.js',
				bundleMin	: './public/js/eda.stepway.min.js'
			},
			formViewer : {
				src 			: 'src/app/formviewer/eda.easyFormViewer.main',
				bundle 		: './public/js/eda.easyFormViewer.js',
				bundleMin	: './public/js/eda.easyFormViewer.min.js'
			},
				dragDropWay : {
				src 			: 'src/app/dragdropway/edaDragDropWay.main',
				bundle 		:	'./public/js/eda.dragdropway.js',
				bundleMin	: './public/js/eda.dragdropway.min.js'
			}
		}
};

export default gulpConfig;
