
const configurationModelInit = {
	activeLine: 1,   
	listConfigStep: [
										'init',
										'first',
										'second',
										'third'
									],
	stepIndicators:  [
											true,
											false,
											false,
											false
										], 
	configStepCounter : 0, 
	submitButtonText  : 'submit',
	cancelButtonText  : 'cancel',
	lines: [
					{
						line:1,                                       
						activeColumn : 1,
						columns: [
											{  
												numColumn: 1,
												exist:true, 
												control: {
																		type:'none',
																		key: 'none',
																		// templateOptions: {
																		//                     label: 'none',
																		//                     placeholder: 'none',
																		//                     required: false,
																		//                     description: 'Descriptive text'
																		//                   }
																	}
												}
											]
						}                                 
			]
}; 
 
const configurationModelResult =  {
	activeLine: 1,   
	listConfigStep: [
										'init',
										'first',
										'second',
										'third'
									],
	stepIndicators:  [
											true,
											false,
											false,
											false
										], 
	configStepCounter: 0, 
	submitButtonText : 'submit',
	cancelButtonText: 'cancel',
	lines: []
};
 
export {
	configurationModelInit,
	configurationModelResult
}; 