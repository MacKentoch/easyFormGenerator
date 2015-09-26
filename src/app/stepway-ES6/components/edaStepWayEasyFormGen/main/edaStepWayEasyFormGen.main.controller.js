import {
	initDebugModel,
	initTabModel
} from './edaStepWayEasyFormGen.main.controller.helpers';

class edaStepWayEasyFormGenController {
		
	constructor	(easyFormGenVersion,
							$filter,
							toaster,
							$timeout, 
							$modal,
							$log, 
							formFieldManage,  
							controllerModalProxy,
							easyFormSteWayConfig){
														
		this.easyFormGenVersion = easyFormGenVersion;
		this.$filter = $filter;
		this.toaster = toaster;
		this.$timeout = $timeout;
		this.$modal = $modal;
		this.$log = $log;
		this.formFieldManage = formFieldManage;
		this.controllerModalProxy = controllerModalProxy;
		this.easyFormSteWayConfig = easyFormSteWayConfig;
		
		this.init();
			
	}
	
	init() {
		
		this.model                 = {};
		this.wfFormFields          = [];
		this.wfFormFieldsOnlyNeededProperties = []; 
		this.easyFormGeneratorVERSION = this.easyFormGenVersion;
		this.debug                    = initDebugModel();
		this.tab                      = initTabModel();
		
	}
	
	onSubmit() {
		let JSONedModel = this.$filter('json')(this.model, 4);
		this.toaster.pop({
				type 		: 'info',
				timeout : 2000,
				title 	: `it should save data model if it were not in editor`,
				body 		: `data : ${JSONedModel}`,                
				showCloseButton: true
		}); 		
	}
	
	
}


const toInject = [
	"$scope", 
	'easyFormGenVersion',
	'$filter',
	'toaster', 
	'$timeout',
	'$modal',
	'$log', 
	'formFieldManage',
	'controllerModalProxy',
	'easyFormSteWayConfig'	
];

edaStepWayEasyFormGenController.$inject = toInject;
export default edaStepWayEasyFormGenController;