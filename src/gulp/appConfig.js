var ENV_CHOICES = [
	'DEV',
	'PROD'
]

module.exports = {


	environment : {
		current : ENV_CHOICES[0]
	},

	//easy form generator verioning
	//no more used with ES6 versions
	version : {
		stepWay 				: '1.1.0-rc1',
		dragAndDropWay 	: '1.1.0-rc1',
    formViewer 	    : '1.1.0-rc1'
	},

	concatVendorFiles : false

}
