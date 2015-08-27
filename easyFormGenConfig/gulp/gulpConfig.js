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
			js : '',
			sass : '',
			htmlTemplates : ''
		},
		vendor : {
			js 		: '',
			css 	: '', 
			fonts : ''
		},
		bowerFiles : {
			js 		: '',
			css 	: '',
			fonts : '',
			maps 	: ''
		}
	},
	
	//destination files
	destFiles : {
		app : {
			
		},
		vendor : {
			
		}
	},
	
	//templateCache config
	templateCache	: {
			sourceDir		: 'src/app/stepway/htmlTemplates/',
			sourceFiles : '**/*.html',
			destDir 		: 'clientMVC/main/core/',	
			destFile		: 'ngwf.templates.js',
			options 		: {
				module: 'app.core.templates.js',
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

