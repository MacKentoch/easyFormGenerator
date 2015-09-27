const DEBUG_MODEL = {
	showDebug : false,
	configurationModelNumberofLines : 1        
};
const initDebugModel = () => DEBUG_MODEL;



const TAB_MODEL = {
	editTab : {active : true},
	previewTab : {active : false}
};
const initTabModel = () => TAB_MODEL;


const COLUMN_TEMPLATE =  {
	numColumn: -1,
	exist:true, 
	control: {
		type:'none',
		key: 'none',
		subtype: 'none',
		// templateOptions: {
		//                     label: 'none',
		//                     placeholder: 'none',
		//                     required: false,
		//                     description: 'Descriptive text'
		//                   }
	}
}; 
const initColumnTemplate = () => COLUMN_TEMPLATE;


const LINE_TEMPLATE = {
	line:-1, 
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
};
const initLineTemplate = () => LINE_TEMPLATE;



export {
	initDebugModel,
	initTabModel,
	initColumnTemplate,
	initLineTemplate
};