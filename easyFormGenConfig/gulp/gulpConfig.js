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
	gulpTplsCache : {
    sourceFiles 	: '/**/*.html',
    templateCache	: {
				sourceFiles : '/src/app/stepway/htmlTemplates/templates.js',
        destFile		: '/public/clientMVC/main/core/templates.js',
        options 		: {
					module: 'app.core',
					root: 'app/',
					standAlone: false
        }
    }
	}	
	
}

