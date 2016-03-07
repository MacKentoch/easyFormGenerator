const ENV_CHOICES = [
	'DEV',
	'PROD'
];

const appConfig = {
	environment : {
		current : ENV_CHOICES[0]
	},
	//easy form generator verioning
	//no more used with ES6 versions
	version : {
		stepWay 				: '1.1.0',
		dragAndDropWay 	: '1.1.0',
    formViewer 	    : '1.1.0'
	},

	concatVendorFiles : false

};

export default appConfig;
