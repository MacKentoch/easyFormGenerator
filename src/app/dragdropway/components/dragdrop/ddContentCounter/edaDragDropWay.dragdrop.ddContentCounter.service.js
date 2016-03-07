const DRAG_DROP_ITEM_COUNTER_SERVICE = 'dragDropItemCounterService';

class dragDropItemCounterService{
	
	constructor(easyFormDragWayConfig){
		this.easyFormDragWayConfig = easyFormDragWayConfig;
		this.init();
	}
	
	init(){
		this._modelItemRealCounter = [];
		this._itemsNotToCount = angular.copy(this.easyFormDragWayConfig.getItemsNotToCount());
	}
		
	getItemsNotToCount(){
		return this._itemsNotToCount;
	} 	

	getModelItemsRealCounter(){
		return this._modelItemRealCounter;
	}
	
	isHtmlElementToCount(htmlvalue){
		let isToCount = true;
		if (htmlvalue.length > 0) {
			angular.forEach(this._itemsNotToCount, (value)=>{
				for (let classes = htmlvalue.length - 1; classes >= 0; classes--) {
					if (htmlvalue[classes] === value) isToCount = isToCount && false;
				}
			});
		}
		return isToCount;	
	}
	
	updateLineItemCss(fullModel, listCssToApply, columIndex, lineIndex, realCount){
		if (typeof fullModel 		!== 		'undefined' &&
			typeof listCssToApply !== 		'undefined' &&
			typeof columIndex 		!== 		'undefined' &&
			typeof lineIndex 			!== 		'undefined' &&
			typeof realCount 			!== 		'undefined') {
			for (let i = fullModel[columIndex][lineIndex].length - 1; i >= 0; i--) {
				for (let j = 0; j < listCssToApply.length; j++) {
					if(	listCssToApply[j].item 		=== i &&
							listCssToApply[j].isReal 	=== true){
						fullModel[columIndex][lineIndex][i].cssClass = this.easyFormDragWayConfig.getItemCssDependingNumberItemsInRow(realCount);
					} 	
				}
			}																					
			return true;
		}
	}		
	
	
}

dragDropItemCounterService.$inject = [
	'easyFormDragWayConfig'
];

export default dragDropItemCounterService;

export {
	DRAG_DROP_ITEM_COUNTER_SERVICE
};