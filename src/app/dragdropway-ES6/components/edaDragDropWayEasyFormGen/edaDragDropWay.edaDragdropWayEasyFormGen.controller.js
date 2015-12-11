const DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER 		= 'edaDragDropWayEasyFormGenCtrl';
const DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLERAS 	= 'vm';


class edaDragDropWayEasyFormGenCtrl{
	
	constructor(
		easyFormGenVersion,
		$filter,
		$anchorScroll,
		toaster,
		$timeout, 
		$modal,
		$log, 
		formFieldManage, 
		controllerModalProxy,
		dragDropItemDecorationService,
		dragDropConfig,
		ddModelConfModelProxyService,
		ddItemRightClickedManager		
	){
		this.easyFormGenVersion 							= easyFormGenVersion;
		this.$filter													= $filter;
		this.$anchorScroll 										= $anchorScroll;
		this.toaster 													= toaster;
		this.$timeout 												= $timeout; 
		this.$modal														= $modal;
		this.$log															= $log; 
		this.formFieldManage									= formFieldManage; 
		this.controllerModalProxy 						= controllerModalProxy;
		this.dragDropItemDecorationService		= dragDropItemDecorationService;
		this.dragDropConfig										= dragDropConfig;
		this.ddModelConfModelProxyService			= ddModelConfModelProxyService;
		this.ddItemRightClickedManager				= ddItemRightClickedManager;
		this.init();
	}
	
	init(){
		this.easyFormGeneratorVERSION = this.easyFormGenVersion;
		
	}
	
	
}

edaDragDropWayEasyFormGenCtrl.$inject = [ 
		'easyFormGenVersion',
		'$filter',
		'$anchorScroll',
		'toaster',
		'$timeout', 
		'$modal',
		'$log', 
		'formFieldManage', 
		'controllerModalProxy',
		'dragDropItemDecorationService',
		'dragDropConfig',
		'ddModelConfModelProxyService',
		'ddItemRightClickedManager'	
];

export default edaDragDropWayEasyFormGenCtrl;

export {
	DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER,
	DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLERAS
};