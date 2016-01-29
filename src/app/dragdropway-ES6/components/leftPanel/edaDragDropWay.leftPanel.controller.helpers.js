const dateFormats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];

const setToday = (datetimePickerModel)=>{
	datetimePickerModel.dt = new Date();
};

const clearDateTime = (datetimePickerModel)=>{
	datetimePickerModel.dt = new Date();
};

export {
	dateFormats,
	setToday,
	clearDateTime
};

