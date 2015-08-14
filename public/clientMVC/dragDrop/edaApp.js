/// <reference path="../../../typings/lodash/lodash.d.ts"/>
/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/**
 *  -----------------------------------------------------------------------
 *  application module of the drag and drop version of easy form generator
 *  -----------------------------------------------------------------------
 *
 *  This version is not finished and is under heavy developments
 *  
 *   
 *     - do not use as production -
 *
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

angular
  .module('edaApp', [
                        'edaApp.providers',	
												'edaApp.controllers',
												'edaApp.services', 
												'edaApp.filters',
												'edaApp.directives',
												'textAngular',
												'textAngularSetup',
												'ngAnimate',
												'toaster',											
												'formly', 
												'formlyBootstrap',
												'ui.bootstrap',
												'nya.bootstrap.select',
                        'dndLists',
                        'mgcrea.ngStrap.affix',
                        'ngTouch',
                        'pageslide-directive',
                        function(){}
	                     ])

  .value('easyFormGenVersion', 'v1.1.3')
  .run([
  	'$templateCache', 
  	function($templateCache){
  		/**
  		 * register template cache for side edit control panel
  		 * 
  		 * control : "blank"
  		 */
  		
  		/**
  		 * commun to all control edit templates
  		 *  -> footer valid button
  		 */
  		var validEditFooter = [
  														'<div class="modal-footer">',
															'	<button class="btn btn-success pull-right"',
								              '	        ng-click="closeEditPanel()">',
								              ' 	<i class="fa fa-floppy-o"></i>&nbsp;Save',
								              ' </button>',
								              '</div>'
  													].join('');

  		$templateCache.put('editPanelBlankCtrl-tpls.html', 
  											[
													'<div class="panel panel-default">',
													'    <div class="panel-body">',

													'	    <div class="row">',
													'	        <div class="col-md-12">',
													'	            <h5 class="greyText"><i class="fa fa-pencil-square-o"></i>&nbsp; Edit :</h5>',
													'	        </div>',
													'	    </div> ',
													'	    <hr/>',

													'	    <div class="row">',
													'	        <div class="col-sm-12">',
													'	            <h5 class="text-center greyText">Column will be blank</h5>',
													'	        </div>',
													'	    </div>',
													'   </div>',
													validEditFooter,
													'</div>'
  											].join(''));

  		/**
  		 * register template cache for side edit control panel
  		 * 
  		 * control : "Header"
  		 */
  		$templateCache.put('editPanelHeaderCtrl-tpls.html', 
  											[
													'<div class="panel panel-default">',
													'    <div class="panel-body">',

													'    <div class="row">',
													'        <div class="col-md-12">',
													'            <h5 class="greyText"><i class="fa fa-pencil-square-o"></i>&nbsp; Edit properties :</h5>',
													'        </div>',
													'    </div> ',
													'    <hr/>',

													'    <div class="marginTopFivepixels"></div>',

													'    <div class="row">',
													'            <div class="form-group">',
													'              <label for="inputTextDescriptionUpdate" class="col-lg-3 control-label greyText editPropertiesLabel">Header text :</label>',
													'              <div class="col-lg-9">',
													'                <input type="text" class="form-control" ng-model="panel.proxyModel.temporyConfig.formlyDesciption" id="inputHeaderTextUpdate" placeholder="Add / edit header text here">',
													'              </div>',
													'            </div>',
													'    </div>',

													'  </div>',
													validEditFooter,
													'</div> '
  											].join(''));
  	}
  ]);

