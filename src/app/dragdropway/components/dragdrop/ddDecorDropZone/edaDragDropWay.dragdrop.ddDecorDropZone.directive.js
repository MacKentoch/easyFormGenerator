/* global angular */
import ddDecorDropZoneTemplate from './edaDragDropWay.dragdrop.ddDecorDropZone.template.html';

const DD_DECOR_DROPZONE_DIRECTIVE = 'ddDecorDropZone';

function ddDecorDropZone(){
	let directive = {
		restrict 	: 'A',
		template 	: ddDecorDropZoneTemplate,
		scope			:	{
			'styleParam'    : '=ddDropZoneProperties',
			'verboseMode'   : '@ddDropZoneVerboseMode',
			'currentIndex'  : '@ddDropZoneCurrentIndex',
			'addNewLineFct' : '&ddDropZoneAddNewLine'
		},
		transclude	: true,
		link				: linkfct
	};
	return directive;

	function linkfct($scope){

		let verboseModeActive   = $scope.verboseMode;
		let currentIndex        = $scope.currentIndex;

		$scope.headerConfig = {
			HeaderButtonVisible : false,
			affixAttr           : 'bs-affix',
			affixEnabled        : false
		};
		/**
			* verbose mode : just for dev
			*/
		if (verboseModeActive !== '') {
			let verbose = angular.lowercase(verboseModeActive);
			if (verbose === 'true' || verbose === '1') {
				/* eslint no-console:0 */
				console.dir({
					whoAmI              : 'I am verbose from ddDecorDropZone link',
					verbodeMode         : verbose,
					ParentParentIndex   : $scope.$parent.$parent.$index,
					ParentIndex         : $scope.$parent.$index,
					currentIndex        : currentIndex,
					styleParam          : $scope.styleParam
				});
			}
		}


		if (typeof currentIndex !== 'undefined') {
			if (currentIndex !== '') {
				// apply title
				if (typeof $scope.styleParam.title !== 'undefined') $scope.currentTitle = $scope.styleParam.title;
				//apply font-awesome
				if (typeof $scope.styleParam.fontAwesomeIcon !== 'undefined') $scope.currentFontAwesome = $scope.styleParam.fontAwesomeIcon;
				//show add new line button
				if (currentIndex === '1') $scope.headerConfig.HeaderButtonVisible = true;
			}
		}

	}

}


ddDecorDropZone.$inject = [];

export default ddDecorDropZone;

export {
	DD_DECOR_DROPZONE_DIRECTIVE
};
