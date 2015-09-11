var ENV_CHOICES = [
	'DEV',
	'PROD'
]

module.exports = {
	
	
	environment : {
		current : ENV_CHOICES[0]
	},
	
	//easy form generator verioning
	version : {
		stepWay 				: '1.0.16',
		dragAndDropWay 	: '1.0.16'
	},
	
	concatVendorFiles : false
		
}