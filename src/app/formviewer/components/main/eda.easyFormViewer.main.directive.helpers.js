/* global angular */

const EMPTY_FIELD_MODEL = [
	{
		'line': 1,
		'activeColumn': 1,
		'columns': [
			{
				'numColumn': 1,
				'exist': true,
				'control': {
					'type': 'none',
					'key': 'none'
				}
			}
		]
	}
];

/**
	* empty fields model : to display at least an empty line
	* otherwise would look like ugly empty line like it were a bug
	*/
const emptyEdaFieldsModel = ()=>{
	return angular.copy(EMPTY_FIELD_MODEL);
};



const returnAttributeDataModelIfNotEmpty = (edaEasyFormGeneratorModel)=>{
	let dataModelToReturn = (
			angular.isArray(edaEasyFormGeneratorModel.dataModel)   ?  ( 
					edaEasyFormGeneratorModel.dataModel.length > 0 ? 
					edaEasyFormGeneratorModel.dataModel 
					: []
					) 
			: []
	);
		return dataModelToReturn;  
};


const returnAttributeConfigurationLinesIfNotEmpty = (loadedFieldModel)=>{
	let edaEasyFormGeneratorModelToReturn = (
			angular.isArray(loadedFieldModel) ?  ( 
					loadedFieldModel.length > 0 ? 
						loadedFieldModel 
					: emptyEdaFieldsModel()
					) 
			: emptyEdaFieldsModel()
	);
		return edaEasyFormGeneratorModelToReturn;  
}; 


export {
	emptyEdaFieldsModel,
	returnAttributeDataModelIfNotEmpty,
	returnAttributeConfigurationLinesIfNotEmpty
};
