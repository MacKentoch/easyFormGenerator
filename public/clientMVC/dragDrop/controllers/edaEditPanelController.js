/**
 *  ------------------------------------------------------
 *  controller : edaEditPanelController
 *  ------------------------------------------------------
 *
 *  controller dedicated side panel (edit control panel)
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
	.module('edaApp.controllers.edaEditPanelController', [])
	.controller('edaEditPanelController', ['$scope', 
                                          'toaster' ,
                                          '$timeout',
                                          'selectOptionManage',
                                          'controllerModalProxy',
		function(	$scope,  
              toaster,
              $timeout,
              selectOptionManage,
              controllerModalProxy
						){



			/**
			 * ==============================================================
			 * init model from service
			 * ==============================================================
			 * proxy model contains :
			 * - all controls definitions and 
			 * - selected control
			 * - properties to customize control (then bound to configuration model)
			 */
			var self = this;
		
			self.proxyModel = controllerModalProxy.proxyModel;
					
		  //selected control from  main controller applied to current selected control
		  self.proxyModel.selectedControl = self.proxyModel.temporyConfig.selectedControl;
		
		
		
			/**
			 * basic Select tempory models
			 */			
		  self.basicSelectRowCollection 	= controllerModalProxy.basicSelectRowCollection;
		  self.newOptionBasicSelect 			= controllerModalProxy.newOptionBasicSelect;
			/**
			 * grouped Select tempory models
			 */
		  self.groupedSelectRowCollection = controllerModalProxy.groupedSelectRowCollection;
		  self.newOptionGroupedSelect 		= controllerModalProxy.newOptionGroupedSelect;
		  self.GroupedSelectGroups 				= controllerModalProxy.GroupedSelectGroups;
		  self.newGroupGroupedSelect 			= controllerModalProxy.newGroupGroupedSelect;
		  self.groupSelectGroupClick 			= controllerModalProxy.groupSelectGroupClick;  
			/**
			 * radio control tempory models
			 */
		  self.radioRowCollection 				= controllerModalProxy.radioRowCollection;
		  self.newOptionRadio 						= controllerModalProxy.newOptionRadio;
		  /**
		   * reset all tempory modals (fo special controls)
		   */
		  controllerModalProxy.resetAllTemporyModels();


		  //place proxyModel to selection if not none :
		   if (self.proxyModel.temporyConfig.selectedControl !== 'none') {
		    for (var i = self.proxyModel.controls.length - 1; i >= 0; i--) {
		       if (self.proxyModel.controls[i].id === self.proxyModel.temporyConfig.selectedControl) {
		          self.modelproxyModel = self.proxyModel.controls[i];
		       }
		    }

		    if (self.proxyModel.temporyConfig.selectedControl === 'BasicSelect') {
		      controllerModalProxy.bindBasicSelectFromProxyModel(self.basicSelectRowCollection);
		    }
		
		    if (self.proxyModel.temporyConfig.selectedControl === 'GroupedSelect') {
		      controllerModalProxy.bindGroupedSelectFromProxyModel(self.groupedSelectRowCollection, self.GroupedSelectGroups);
		    } 
		
		    if (self.proxyModel.temporyConfig.selectedControl === 'Radio') {
		      controllerModalProxy.bindRadioFromProxyModel(self.radioRowCollection);
		    }    
		
		  }
		
		self.updateSpecialControl = function(){
			
			//refresh service data for sepcial control as selects and radio
			controllerModalProxy.basicSelectRowCollection 		= self.basicSelectRowCollection;
			controllerModalProxy.newOptionBasicSelect 				= self.newOptionBasicSelect;

			controllerModalProxy.groupedSelectRowCollection 	= self.groupedSelectRowCollection;
			controllerModalProxy.newOptionGroupedSelect 			= self.newOptionGroupedSelect;
			controllerModalProxy.GroupedSelectGroups 					= self.GroupedSelectGroups;
			controllerModalProxy.newGroupGroupedSelect 				= self.newGroupGroupedSelect;
			controllerModalProxy.groupSelectGroupClick 				= self.groupSelectGroupClick;


			controllerModalProxy.radioRowCollection 					= self.radioRowCollection;
			controllerModalProxy.newOptionRadio 							= self.newOptionRadio;			
			
			//force apply update proxyModel
			controllerModalProxy.bindSpecialCtrlTemporyModelsToProxyModel(); 
			return true; 	
		};
		
		  function resetTemporyConfig(){
		    self.proxyModel.temporyConfig = {
		                                        formlyLabel: '', 
		                                        formlyRequired: false, 
		                                        formlyPlaceholder: '',
		                                        formlyDesciption: '',
		                                        formlyOptions: []
		                                      };   
		  }
		
			self.resetControl = function(){
				self.proxyModel.temporyConfig.formlyLabel 			= '';
				self.proxyModel.temporyConfig.formlyRequired 		= false;
				self.proxyModel.temporyConfig.formlyPlaceholder	= '';
				self.proxyModel.temporyConfig.formlyDesciption 	= '';
				self.proxyModel.temporyConfig.formlyOptions 		= [];
				self.proxyModel.temporyConfig.datepickerPopup   = initDatePicker();
				
			};
		
		  self.selectThisControl = function(controlName){
		    self.proxyModel.selectedControl = 'none';
		    resetTemporyConfig();
		
		    for (var i = self.proxyModel.controls.length - 1; i >= 0; i--) {
		       if (self.proxyModel.controls[i].id === controlName) {
		          self.proxyModel.selectedControl = self.proxyModel.controls[i].id;         
		       }
		    }
		
		    if (self.proxyModel.selectedControl === 'Date') {
		      initDatePicker();
		    }
		  };
	


		/**
		 * ==============================================================
		 * specific controls management 
		 * (display, properties.... : ex : grouped Select)
		 * ==============================================================
		 */

		
		  self.addNewOptionRadio = function(){
		    var result = selectOptionManage.addNewOptionRadio(self.radioRowCollection, self.newOptionRadio.saisie);
		    if (result.resultFlag === false) {
		          toaster.pop({
		                  type: 'warning',
		                  timeout:2000,
		                  title: result.details,
		                  body: '\''+ self.newOptionRadio.saisie + '\'' + ' cannot be added.',                
		                  showCloseButton: true
		            });
		    }
		    //reset input
		    self.newOptionRadio = {saisie: ''};
		  };
		
		  self.removeRadioRow = function(index) {
		      var result = selectOptionManage.removeOption(self.radioRowCollection, index);
		      if (result.resultFlag === false) {
		          toaster.pop({
		                  type: 'warning',
		                  timeout:2000,
		                  title: result.details,
		                  body: 'Delete was cancelled.',                
		                  showCloseButton: true
		            });
		      }      
		    }; 
		
		  self.upThisRadioRow = function(index){
		      var result = selectOptionManage.upthisOption(self.radioRowCollection, index);
		      if (result.resultFlag === false) {
		          toaster.pop({
		                  type: 'warning',
		                  timeout:2000,
		                  title: result.details,
		                  body: 'Operation cancelled.',                
		                  showCloseButton: true
		            });
		      }       
		  };                                    
		
		  self.downThisRadioRow = function(index){
		      var result = selectOptionManage.downthisOption(self.radioRowCollection, index);
		      if (result.resultFlag === false) {
		          toaster.pop({
		                  type: 'warning',
		                  timeout:2000,
		                  title: result.details,
		                  body: 'Operation cancelled.',                
		                  showCloseButton: true
		            });
		      }
		  };
			
		
		
		  self.addNewOptionBasicSelect = function(){
		    var result = selectOptionManage.addNewOptionBasicSelect(self.basicSelectRowCollection, self.newOptionBasicSelect.saisie);
		    if (result.resultFlag === false) {
		          toaster.pop({
		                  type: 'warning',
		                  timeout:2000,
		                  title: result.details,
		                  body: '\''+ self.newOptionBasicSelect.saisie + '\'' + ' cannot be added.',                
		                  showCloseButton: true
		            });
		    }
		    //reset input
		    self.newOptionBasicSelect = {saisie: ''};
		  };
		
		  self.removeRow = function(index) {
		      var result = selectOptionManage.removeOption(self.basicSelectRowCollection, index);
		      if (result.resultFlag === false) {
		          toaster.pop({
		                  type: 'warning',
		                  timeout:2000,
		                  title: result.details,
		                  body: 'Delete was cancelled.',                
		                  showCloseButton: true
		            });
		      }      
		    }; 
		
		  self.upThisRow = function(index){
		      var result = selectOptionManage.upthisOption(self.basicSelectRowCollection, index);
		      if (result.resultFlag === false) {
		          toaster.pop({
		                  type: 'warning',
		                  timeout:2000,
		                  title: result.details,
		                  body: 'Operation cancelled.',                
		                  showCloseButton: true
		            });
		      }       
		  };                                    
		
		  self.downThisRow = function(index){
		      var result = selectOptionManage.downthisOption(self.basicSelectRowCollection, index);
		      if (result.resultFlag === false) {
		          toaster.pop({
		                  type: 'warning',
		                  timeout:2000,
		                  title: result.details,
		                  body: 'Operation cancelled.',                
		                  showCloseButton: true
		            });
		      }
		  };
		
                             



		
		  self.showGroupListToChoose = function(){
		    self.groupSelectGroupClick.showList = !self.groupSelectGroupClick.showList;
		  };
		
		  self.addNewGroupToGroupedSelect = function(){
		    if (self.newGroupGroupedSelect.saisie !== '') {
		      for (var i = self.GroupedSelectGroups.list.length - 1; i >= 0; i--) {
		        if (self.GroupedSelectGroups.list[i] === self.newGroupGroupedSelect.saisie) {
		          toaster.pop({
		                  type: 'warning',
		                  timeout:2000,
		                  title: 'Group already exists',
		                  body: 'No group added.',                
		                  showCloseButton: true
		            });          
		        }
		      }
		      self.GroupedSelectGroups.list.push(self.newGroupGroupedSelect.saisie);
		    }else{
		          toaster.pop({
		                  type: 'warning',
		                  timeout:2000,
		                  title: 'Not a valid group to add',
		                  body: 'No group added.',                
		                  showCloseButton: true
		            });
		    }
		    self.newGroupGroupedSelect.saisie = '';
		  };
		
		
		  self.addNewOptionGroupedSelect = function(){
		    var result = selectOptionManage.addNewOptionGroupedSelect(self.groupedSelectRowCollection, self.newOptionGroupedSelect.saisie, '');
		    if (result.resultFlag === false) {
		          toaster.pop({
		                  type: 'warning',
		                  timeout:2000,
		                  title: result.details,
		                  body: '\''+ self.newOptionGroupedSelect.saisie + '\'' + ' cannot be added.',                
		                  showCloseButton: true
		            });
		    }
		    //bind nya : dont bind here $apply is not done fast enough
		    //bindGroupedSelectToNya();
		    //reset input
		    self.newOptionGroupedSelect = {saisie: ''};
		  };
		
		  self.removeGroupedSelectRow = function(index) {
		      var result = selectOptionManage.removeOption(self.groupedSelectRowCollection, index);
		      if (result.resultFlag === false) {
		          toaster.pop({
		                  type: 'warning',
		                  timeout:2000,
		                  title: result.details,
		                  body: 'Delete was cancelled.',                
		                  showCloseButton: true
		            });
		      }   
		    }; 
		
		  self.upThisGroupedSelectRow = function(index){
		      var result = selectOptionManage.upthisOption(self.groupedSelectRowCollection, index);
		      if (result.resultFlag === false) {
		          toaster.pop({
		                  type: 'warning',
		                  timeout:2000,
		                  title: result.details,
		                  body: 'Operation cancelled.',                
		                  showCloseButton: true
		            });
		      } 
		  };                                    
		
		  self.downThisGroupedSelectRow = function(index){
		      var result = selectOptionManage.downthisOption(self.groupedSelectRowCollection, index);
		      if (result.resultFlag === false) {
		          toaster.pop({
		                  type: 'warning',
		                  timeout:2000,
		                  title: result.details,
		                  body: 'Operation cancelled.',                
		                  showCloseButton: true
		            });
		      } 
		
		  };
		
			/**
			 * init datetimepicker model
			 */
		  self.demodt ={};
		
		  self.today = function() {
		    self.demodt.dt = new Date();
		  };
		  self.today();
		
		  self.clear = function () {
		    self.demodt.dt = null;
		  };
		
		
		  self.open = function($event) {
		    $event.preventDefault();
		    $event.stopPropagation();
		
		    self.demodt.opened = true;
		  };
		
		  self.dateOptions = {
		           formatYear: 'yy',
		           startingDay: 1,
		           showWeeks: true,
		           initDate: null
		  };
		
		  self.demodt.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		  
		  function initDatePicker(){
		    self.proxyModel.temporyConfig.datepickerPopup = self.demodt.formats[0];  
		  }
		  
		

			 		
	}]);
