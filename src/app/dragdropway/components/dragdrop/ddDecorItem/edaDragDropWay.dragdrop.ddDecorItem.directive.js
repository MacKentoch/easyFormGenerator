
import dragdropItemTemplate from './edaDragDropWay.dragdrop.ddDecorItem.template.html';

const DRAG_DROP_DECOR_ITEM = 'ddDecorItem';

function ddDecorItem(easyFormDragWayConfig){
	let directive = {
		restrict			: 'A',
		scope					:  {
			'verboseMode' 			: '@ddItemVerboseMode',
			'currentIndex' 			: '@ddItemCurrentIndex',
			'parentIndex'				: '@ddItemParentIndex',
			'parentParentIndex'	: '@ddItemParentParentIndex', 
			'lineItemsCount' 		: '@ddItemsCount',
			'cssClass'					: '@ddItemCssClass'
		},
		template		:   dragdropItemTemplate,
		transclude	: true,	
		link				: linkfct	
	};
	return directive;
	
	function linkfct($scope, element, attrs, ctrl, transclude){
		let verboseModeActive = $scope.verboseMode;
		let currentIndex      = $scope.currentIndex;
		let parentIndex       = $scope.parentIndex;
		let listClass         = easyFormDragWayConfig.getDistinctItemCssClass();
	
	
		/**
			* init css class
			*/
		angular.forEach(listClass, (css)=>element.removeClass(css));
		element.addClass($scope.cssClass);                
		/**
			* update css class
			*/
		$scope.$watch('cssClass', (newValue, oldValue)=>{
			if(newValue !== oldValue){
				/**
					* update css class
					*/
				angular.forEach(listClass, (css)=>element.removeClass(css));
				element.addClass(newValue); 
			}	
		});
	
		/**
			* verbose mode : just for dev 
			*/
		if (verboseModeActive !== '') {
			let verbose = angular.lowercase(verboseModeActive);
			if (verbose === 'true' || verbose === '1') {
				/* eslint no-console:0 */
				console.dir({
					whoAmI              : 'I am verbose from ddDecorItem directive link',
					verbodeMode         : verbose,
					ParentParentIndex   : $scope.$parent.$parent.$index,
					ParentIndex         : parentIndex,
					parentParentIndex   : $scope.parentParentIndex,
					currentIndex        : currentIndex,
					lineItemsCount      : $scope.lineItemsCount
				});
			}                    
		}
		/**
			* control column : apply css class to item
			*/
		if ($scope.parentParentIndex === '0') element.addClass(listClass[0]);
		/**
			* prevent transclusion creating child scope  
			*
			*
			* NOTE :if you want to know more about what I'm saying : check this nice tip on the subject : 
			* http://angular-tips.com/blog/2014/03/transclusion-and-scopes/        
			*/
		transclude($scope.$parent, (contentClone)=>{
				/**
					* transclusion will append content to '<div id="itemDirectiveTranscludeHere"></div>' 
					*/
				let childDiv = angular.element(element.children()[0]); 
				childDiv.append(contentClone);
		});   		
	}
	
}


ddDecorItem.$inject = [
	'easyFormDragWayConfig'
];

export default ddDecorItem;

export {
	DRAG_DROP_DECOR_ITEM
};

