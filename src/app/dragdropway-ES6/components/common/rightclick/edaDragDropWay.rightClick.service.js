const EDA_RIGHT_CLICKED_MANAGER_SERVICE = 'ddItemRightClickedManager';

class ddItemRightClickedManager{
	constructor(){
		this.init();	
	}
	
	init(){
		
	}
	
	/**
		* setUnRightClicked 
		* set unSelected (see edaRightClick directive)
		*
		* used in edaEditcontroller when droping control
		*/	
	setUnRightClicked(dragDropModelItem){
		dragDropModelItem.rightCliked = false;
	}	

	/**
		* resetAllDragDropItemSelectedState
		*
		* simply reset (=set to false) all item.rightCliked 
		* in edit column (dragable column)
		*
		* used in edaEditPanel when closeEditPanel() called
		*/	
	resetAllDragDropItemSelectedState(dragDropModel){
		angular.forEach(dragDropModel[1] ,(line)=>{
			angular.forEach(line, (item)=>item.rightCliked = false);
		});
	
	}	
	
	
}

ddItemRightClickedManager.$inject = [];

export default ddItemRightClickedManager;

export {
	EDA_RIGHT_CLICKED_MANAGER_SERVICE
};