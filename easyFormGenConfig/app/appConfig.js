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
		stepWay 				: '1.0.33',
		dragAndDropWay 	: '1.0.33'
	},
	
	concatVendorFiles : false
		
}