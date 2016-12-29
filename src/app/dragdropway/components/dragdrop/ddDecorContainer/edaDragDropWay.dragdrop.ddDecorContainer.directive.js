/* global angular */
import ddDecorContainerTemplate 			from './edaDragDropWay.dragdrop.ddDecorContainer.template.html';
import {
	DD_DECOR_CONTAINER_CONTROLLER_NAME,
	DD_DECOR_CONTAINER_CONTROLLERAS_NAME
}																			from './edaDragDropWay.dragdrop.ddDecorContainer.controller';


const DD_DECOR_CONTAINER_DIRECTIVE = 'ddDecorContainer';


function ddDecorContainer(){
	let directive = {
		restrict					: 'A',
		template					: ddDecorContainerTemplate,
		scope 						: {},
		controller				: DD_DECOR_CONTAINER_CONTROLLER_NAME,
    controllerAs			: DD_DECOR_CONTAINER_CONTROLLERAS_NAME,
    bindToController	: {
			'styleParam'           : '=ddContainerProperties',
			'isStillCollapsed'     : '=ddContainerIsCollpased',
			'verboseMode'          : '@ddContainerVerboseMode',
			'currentIndex'         : '@ddContainerCurrentIndex',
			'collpaseAll'          : '&ddCollapseAll'
    },
		transclude				: true,
		link 							:	linkFct
	};
	return directive;

	function linkFct($scope, element, attrs, ctrl, transclude){
		let verboseModeActive   											= $scope.ddDecorContainerCtrl.verboseMode;
		let currentIndex        											= $scope.ddDecorContainerCtrl.currentIndex;
		$scope.ddDecorContainerCtrl.isCollapsed				= false;
		$scope.ddDecorContainerCtrl.config.isEnabled	= false;
		/**
			* forceCollapse when :
			*  dragDropConfigModel.containerConfig.decoration.isCollapsed changed (here bound to $scope.isStillCollapsed)
			*/
		$scope.$watch(()=> $scope.ddDecorContainerCtrl.isStillCollapsed,(newVal, oldVal)=>{
			if (newVal !== oldVal) {
				if ($scope.$parent.$parent.$index === 0) $scope.ddDecorContainerCtrl.isCollapsed = newVal;
			}
		});


		/**
			* verbose mode for developments only
			*/
		if (verboseModeActive !== '') {
			var verbose = angular.lowercase(verboseModeActive);
			if (verbose === 'true' || verbose === '1') {
				/* eslint no-console:0 */
				console.dir({
					whoAmI              :   'I am verbose from ddDecorContainer link',
					verbodeMode         :   verbose,
					ParentParentIndex   :   $scope.$parent.$parent.$index,
					ParentIndex         :   $scope.$parent.$index,
					currentIndex        :   currentIndex,
					styleParam          :   $scope.ddDecorContainerCtrl.styleParam,
					columnindex         :   $scope.$parent.$parent.$parent.$parent.$index
				});
			}
		}

		/**
			* no header (no title, no collapse....)
			*/
		//$scope.ddDecorContainerCtrl.config.isEnabled
		if (typeof currentIndex !== 'undefined') {
			if (currentIndex !== '') {
				/**
					* specific 1st column
					*/
				if (currentIndex === '0') {
					/**
						* apply title
						*/
					if (typeof $scope.ddDecorContainerCtrl.styleParam.title !== 'undefined') {
							$scope.ddDecorContainerCtrl.currentTitle     	= $scope.ddDecorContainerCtrl.styleParam.title;
							$scope.ddDecorContainerCtrl.config.isEnabled	= true;
							$scope.ddDecorContainerCtrl.isCollapsed     	= true;
					}
				}
			}
		}


		/**
			* prevent transclusion creating child scope
			* want to know more about what I'm talking about : check this nice tip on the subject :
			* http://angular-tips.com/blog/2014/03/transclusion-and-scopes/
			*/
		transclude($scope.$parent, function(contentClone){
				/**
					* transclusion will append content to '<div id="ddDecorContainerWillTranscludeHere"></div>'
					*/
				var childDiv = angular.element(element.children()[1]);
				childDiv.append(contentClone);
		});



	}

}


export default ddDecorContainer;

export {
	DD_DECOR_CONTAINER_DIRECTIVE
};
