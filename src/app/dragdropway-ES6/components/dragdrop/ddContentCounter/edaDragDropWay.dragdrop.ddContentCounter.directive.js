const DD_CONTENT_COUNTER_DIRECTIVE = 'ddContentCounter';

function ddContentCounter(dragDropItemCounterService, $timeout){
		let directive  ={
			restrict	: 'A',
			scope 		: {
				valueWhenPlaceholder	: '@ddValueWhenPlaceholder',
				valueWhendragging			: '@ddValueWhenDragging',
				fullModel 						: '=ddFullModel',
				currentIndex 					: '@ddContentCounterCurrentIndex',
				parentIndex 					: '@ddContentCounterParentIndex',
				forceRefresh					: '=ddContentCounterForceCssRefresh'				
			},
			link			: linkfct
		};
		return directive;
		
		function linkfct($scope, element){
			let timer;
			// watch children length change : to update css item class
			$scope.$watch(()=>element[0].children.length,(newValue, oldValue)=>{
				if (newValue !== oldValue) {
					let newRealCount 				= 0;
					let listClassForThisRow = [];
					for (let i = element[0].children.length - 1; i >= 0; i--) {						
						if(dragDropItemCounterService.isHtmlElementToCount(element[0].children[i].classList)){
							newRealCount++;
							listClassForThisRow.push( {item: i, isReal : true} );
						}else{
							listClassForThisRow.push( {item: i, isReal : false} );
						} 
					}
					$scope.contentRealCount = newRealCount;
					// a timer otherwise won't refresh everytime
					timer = $timeout(() => {
						dragDropItemCounterService.updateLineItemCss($scope.fullModel, listClassForThisRow, $scope.parentIndex, $scope.currentIndex, newRealCount);				        	
					}, 20);
					
				}
			});
	
			$scope.$on('$destroy', ()=>{
				$timeout.cancel(timer);}
			);
		}
		
}

ddContentCounter.$inject = [
	'dragDropItemCounterService',
	'$timeout'
];

export default ddContentCounter;

export {
	DD_CONTENT_COUNTER_DIRECTIVE
};