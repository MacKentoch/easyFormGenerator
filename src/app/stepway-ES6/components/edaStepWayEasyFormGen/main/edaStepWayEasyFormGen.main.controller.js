/* global angular */
import {
	initDebugModel,
	initTabModel,
	initColumnTemplate,
	initLineTemplate
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
		this.configuration            = {};//configuration model (contains array of lines which contains array of columns)    											
		this.numberOfColumns          = 1;
		this.MaxNumberOfColumns       = 3;
		this.MinNumberOfColumns       = 1;		
		this.columnTemplate           = initColumnTemplate(); //TODO : check is really needed 
		this.lineTemplate             = initLineTemplate();   //TODO : check if really needed
		//this.resetToZeroModel         = resetToZeroModel; //function no more used
		
		
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
	
	countConfigurationModelLines() {
		this.debug.configurationModelNumberofLines = this.configuration.lines.length;
		return this.configuration.lines.length;		
	}
	
	setActiveLineNumber(lineNumber) {
		if (lineNumber <= this.countConfigurationModelLines()) {
			this.configuration.activeLine = lineNumber;
		}		
	}
	
	upThisLine(indexLine) {
		if (indexLine > -1) {
			if (this.configuration.lines[indexLine - 1]) {
				var currentLineObj = this.configuration.lines[indexLine];
				this.configuration.lines.splice(indexLine , 1);
				this.configuration.lines.splice((indexLine - 1), 0, currentLineObj);    
				//manage selected aciveLine
				this.configuration.activeLine = 1;
			}
		}
			//re-render formfield 
		this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.model);
		this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);		
	}
	
	downThisLine(indexLine) {
		if (indexLine > -1) {
			if (this.configuration.lines[indexLine + 1]) {
				var currentLineObj = this.configuration.lines[indexLine];
				this.configuration.lines.splice(indexLine , 1);
				this.configuration.lines.splice((indexLine + 1), 0, currentLineObj);  
				//manage selected aciveLine
				this.configuration.activeLine = 1;
			}
		}     
		//re-render formfield 
		this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.model); 
		this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);		
	}
	
	addNewline() {
		this.configuration.lines.push(initLineTemplate());
			//re-render formfield 
		this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.model);
		this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);		
	} 
	
	removeThisLine(index) {
		if (index > -1) {
			if (this.configuration.lines.length > 1) {
					//manage selected aciveLine
					if (this.configuration.activeLine === index + 1) {
						this.configuration.activeLine = 1;
					}
					this.configuration.lines.splice(index, 1);
			}else{
				this.$timeout(function(){
						this.toaster.pop({
										type: 'warning',
										title: 'Last line' ,
										body: 'Can\'t delete the last line',                
										showCloseButton: true
							});
				}, 100); 
			}
		//re-render formfield 
		this.formFieldManage.applyConfigurationToformlyModel(this.configuration, this.wfFormFields, this.model);
		this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
		}
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