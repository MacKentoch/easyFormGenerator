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
													//'	    <hr/>',

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
													//'    <hr/>',

													'    <div class="marginTopFivepixels"></div>',

													'    <div class="row">',
													'            <div class="form-group">',
													'							<div class="col-md-12">',

													'              <label for="inputTextDescriptionUpdate" class="control-label greyText editPropertiesLabel">Header text :</label>',
													'              <div class="">',
													'                <input type="text" class="form-control" ng-model="panel.proxyModel.temporyConfig.formlyDesciption" id="inputHeaderTextUpdate" placeholder="Add / edit header text here">',
													'              </div>',

													'							</div>',
													'            </div>',
													'    </div>',

													'  </div>',
													validEditFooter,
													'</div> '
  											].join(''));

	 		/**
			 * register template cache for side edit control panel
			 * 
			 * control : "SubTitle"
			 */
			$templateCache.put('editPanelSubTitleCtrl-tpls.html', 
												[
													'<div class="panel panel-default">',
													'    <div class="panel-body">',

													'    <div class="row">',
													'        <div class="col-md-12">',
													'            <h5 class="greyText"><i class="fa fa-pencil-square-o"></i>&nbsp; Edit properties :</h5>',
													'        </div>',
													'    </div> ',
													//'    <hr/>',

													'    <div class="marginTopFivepixels"></div>',

													'    <div class="row">',
													'            <div class="form-group">',

													'							<div class="col-md-12">',

													'              <label for="inputTextDescriptionUpdate" class="control-label greyText editPropertiesLabel">Subtitle text :</label>',
													'              <div class="">',
													'                <input type="text" class="form-control" ng-model="panel.proxyModel.temporyConfig.formlyDesciption" id="inputSubtitleTextUpdate" placeholder="Add / edit subtitle text here">',
													'              </div>',

													'							</div>',

													'            </div>',
													'    </div>',

													'  </div>',
													validEditFooter,
													'</div> '
												].join(''));

	 		/**
			 * register template cache for side edit control panel
			 * 
			 * control : "TextInput"
			 */
			$templateCache.put('editPanelTextInputCtrl-tpls.html', 
												[
													'<div class="panel panel-default">',
													'    <div class="panel-body">',

													'    <div class="row">',
													'        <div class="col-md-12">',
													'            <h5 class="greyText"><i class="fa fa-pencil-square-o"></i>&nbsp; Edit properties :</h5>',
													'        </div>',
													'    </div> ',
													//'    <hr/>',

													'    <div class="marginTopFivepixels"></div>',

													//label text
													'    <div class="row">',
													'            <div class="form-group">',

													'							<div class="col-md-12">',

		                      '              <label for="inputTextLabelUpdate" class=" control-label greyText editPropertiesLabel">Label text :</label>',
		                      '              <div class="">',
		                      '                <input type="text" class="form-control" ng-model="panel.proxyModel.temporyConfig.formlyLabel" id="inputTextLabelUpdate" placeholder="Add / edit control label here">',
		                      '              </div>',

													'							</div>',

													'            </div>',
													'    </div>',

													'    <div class="marginTopFivepixels"></div>',

													//placeholder
													'    <div class="row">',
													'            <div class="form-group">',

													'							<div class="col-md-12">',

	                        '              <label for="inputTextplaceholderUpdate" class="control-label greyText editPropertiesLabel">placeholder :</label>',
	                        '              <div class="">',
	                        '                <input type="text" class="form-control" ng-model="panel.proxyModel.temporyConfig.formlyPlaceholder" id="inputTextplaceholderUpdate" placeholder="Add / edit placeholder text here">',
	                        '              </div>',

													'							</div>',

													'            </div>',
													'    </div>',													

													'    <div class="marginTopFivepixels"></div>',

													//required
													'    <div class="row">',
													'            <div class="form-group">',

													'							<div class="">',

	                        '              <label for="inputTextRequiredUpdate" class="col-md-4 control-label greyText editPropertiesLabel">Required :</label>',
	                        '              <div class="col-md-8">',
	                        '                <div class="checkboxCssCorrection">&nbsp;</div>',
	                        '                <input type="checkbox" ng-model="panel.proxyModel.temporyConfig.formlyRequired" id="inputTextRequiredUpdate">',
	                        '              </div>',

													'							</div>',

													'            </div>',
													'    </div>',	


													'    <div class="marginTopFivepixels"></div>',

													//description
													'    <div class="row">',
													'            <div class="form-group">',

													'							<div class="col-md-12">',

	                        '              <label for="inputTextDescriptionUpdate" class="control-label greyText editPropertiesLabel">Description :</label>',
	                        '              <div class="">',
	                        '                <input type="text" class="form-control" ng-model="panel.proxyModel.temporyConfig.formlyDesciption" id="inputTextDescriptionUpdate" placeholder="Add / edit description here">',
	                        '              </div>',

													'							</div>',

													'            </div>',
													'    </div>',	


													'  </div>',
													validEditFooter,
													'</div> '
												].join(''));

	 		/**
			 * register template cache for side edit control panel
			 * 
			 * control : "Password"
			 */
			$templateCache.put('editPanelPasswordCtrl-tpls.html', 
												[
													'<div class="panel panel-default">',
													'    <div class="panel-body">',

													'    <div class="row">',
													'        <div class="col-md-12">',
													'            <h5 class="greyText"><i class="fa fa-pencil-square-o"></i>&nbsp; Edit properties :</h5>',
													'        </div>',
													'    </div> ',
													//'    <hr/>',

													'    <div class="marginTopFivepixels"></div>',

													//label text
													'    <div class="row">',
													'            <div class="form-group">',

													'							<div class="col-md-12">',

		                      '              <label for="inputTextLabelUpdate" class=" control-label greyText editPropertiesLabel">Label text :</label>',
		                      '              <div class="">',
		                      '                <input type="text" class="form-control" ng-model="panel.proxyModel.temporyConfig.formlyLabel" id="inputTextLabelUpdate" placeholder="Add / edit control label here">',
		                      '              </div>',

													'							</div>',

													'            </div>',
													'    </div>',
													
													'    <div class="marginTopFivepixels"></div>',

													//placeholder
													'    <div class="row">',
													'            <div class="form-group">',

													'							<div class="col-md-12">',

	                        '              <label for="placeholderUpdate" class="control-label greyText editPropertiesLabel">placeholder :</label>',
	                        '              <div class="">',
	                        '                <input type="text" class="form-control" ng-model="panel.proxyModel.temporyConfig.formlyPlaceholder" id="inputTextplaceholderUpdate" placeholder="Add / edit placeholder text here">',
	                        '              </div>',

													'							</div>',

													'            </div>',
													'    </div>',													

													'    <div class="marginTopFivepixels"></div>',

													//required
													'    <div class="row">',
													'            <div class="form-group">',

													'							<div class="">',

	                        '              <label for="RequiredUpdate" class="col-md-4 control-label greyText editPropertiesLabel">Required :</label>',
	                        '              <div class="col-md-8">',
	                        '                <div class="checkboxCssCorrection">&nbsp;</div>',
	                        '                <input type="checkbox" ng-model="panel.proxyModel.temporyConfig.formlyRequired" id="RequiredUpdate">',
	                        '              </div>',

													'							</div>',

													'            </div>',
													'    </div>',	

													'    <div class="marginTopFivepixels"></div>',

													//description
													'    <div class="row">',
													'            <div class="form-group">',

													'							<div class="col-md-12">',

	                        '              <label for="DescriptionUpdate" class="control-label greyText editPropertiesLabel">Description :</label>',
	                        '              <div class="">',
	                        '                <input type="text" class="form-control" ng-model="panel.proxyModel.temporyConfig.formlyDesciption" id="DescriptionUpdate" placeholder="Add / edit description here">',
	                        '              </div>',

													'							</div>',

													'            </div>',
													'    </div>',	


													'  </div>',
													validEditFooter,
													'</div> '
												].join(''));

	 		/**
			 * register template cache for side edit control panel
			 * 
			 * control : "Date"
			 */
			$templateCache.put('editPanelDateCtrl-tpls.html', 
												[
													'<div class="panel panel-default">',
													'    <div class="panel-body">',

													'    <div class="row">',
													'        <div class="col-md-12">',
													'            <h5 class="greyText"><i class="fa fa-pencil-square-o"></i>&nbsp; Edit properties :</h5>',
													'        </div>',
													'    </div> ',
													//'    <hr/>',

													'    <div class="marginTopFivepixels"></div>',

													//date format
                          '     <label class="control-label greyText editPropertiesLabel">Date format :</label>',
                          '      <div class="">',
                          '        <ol class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12" ng-model="panel.nyaSelect.temporyConfig.datepickerPopup" id="dateformatSelect">',
                          '          <li class="nya-bs-option" nya-bs-option="dateformat in panel.demodt.formats" value="dateformat">',
                          '            <a>{{dateformat}}</a>',
                          '          </li>',
                          '        </ol>',
                          '      </div>',


													'    <div class="marginTopFivepixels"></div>',

													//label text
													'    <div class="row">',
													'            <div class="form-group">',

													'							<div class="col-md-12">',

		                      '              <label for="inputTextLabelUpdate" class=" control-label greyText editPropertiesLabel">Label text :</label>',
		                      '              <div class="">',
		                      '                <input type="text" class="form-control" ng-model="panel.proxyModel.temporyConfig.formlyLabel" id="inputTextLabelUpdate" placeholder="Add / edit control label here">',
		                      '              </div>',

													'							</div>',

													'            </div>',
													'    </div>',

													'    <div class="marginTopFivepixels"></div>',

													//placeholder
													'    <div class="row">',
													'            <div class="form-group">',

													'							<div class="col-md-12">',

	                        '              <label for="placeholderUpdate" class="control-label greyText editPropertiesLabel">placeholder :</label>',
	                        '              <div class="">',
	                        '                <input type="text" class="form-control" ng-model="panel.proxyModel.temporyConfig.formlyPlaceholder" id="inputTextplaceholderUpdate" placeholder="Add / edit placeholder text here">',
	                        '              </div>',

													'							</div>',

													'            </div>',
													'    </div>',													

													'    <div class="marginTopFivepixels"></div>',

													//required
													'    <div class="row">',
													'            <div class="form-group">',

													'							<div class="">',

	                        '              <label for="RequiredUpdate" class="col-md-4 control-label greyText editPropertiesLabel">Required :</label>',
	                        '              <div class="col-md-8">',
	                        '                <div class="checkboxCssCorrection">&nbsp;</div>',
	                        '                <input type="checkbox" ng-model="panel.proxyModel.temporyConfig.formlyRequired" id="RequiredUpdate">',
	                        '              </div>',

													'							</div>',

													'            </div>',
													'    </div>',	

													'    <div class="marginTopFivepixels"></div>',

													//description
													'    <div class="row">',
													'            <div class="form-group">',

													'							<div class="col-md-12">',

	                        '              <label for="DescriptionUpdate" class="control-label greyText editPropertiesLabel">Description :</label>',
	                        '              <div class="">',
	                        '                <input type="text" class="form-control" ng-model="panel.proxyModel.temporyConfig.formlyDesciption" id="DescriptionUpdate" placeholder="Add / edit description here">',
	                        '              </div>',

													'							</div>',

													'            </div>',
													'    </div>',	


													'  </div>',
													validEditFooter,
													'</div> '
												].join(''));

	 		/**
			 * register template cache for side edit control panel
			 * 
			 * control : "Textarea"
			 */
			$templateCache.put('editPanelTextareaCtrl-tpls.html', 
												[
													'<div class="panel panel-default">',
													'    <div class="panel-body">',

													'    <div class="row">',
													'        <div class="col-md-12">',
													'            <h5 class="greyText"><i class="fa fa-pencil-square-o"></i>&nbsp; Edit properties :</h5>',
													'        </div>',
													'    </div> ',
													//'    <hr/>',

													'    <div class="marginTopFivepixels"></div>',

													//label text
													'    <div class="row">',
													'            <div class="form-group">',

													'							<div class="col-md-12">',

		                      '              <label for="inputTextLabelUpdate" class=" control-label greyText editPropertiesLabel">Label text :</label>',
		                      '              <div class="">',
		                      '                <input type="text" class="form-control" ng-model="panel.proxyModel.temporyConfig.formlyLabel" id="inputTextLabelUpdate" placeholder="Add / edit control label here">',
		                      '              </div>',

													'							</div>',

													'            </div>',
													'    </div>',
													
													'    <div class="marginTopFivepixels"></div>',

													//placeholder
													'    <div class="row">',
													'            <div class="form-group">',

													'							<div class="col-md-12">',

	                        '              <label for="placeholderUpdate" class="control-label greyText editPropertiesLabel">placeholder :</label>',
	                        '              <div class="">',
	                        '                <input type="text" class="form-control" ng-model="panel.proxyModel.temporyConfig.formlyPlaceholder" id="inputTextplaceholderUpdate" placeholder="Add / edit placeholder text here">',
	                        '              </div>',

													'							</div>',

													'            </div>',
													'    </div>',													

													'    <div class="marginTopFivepixels"></div>',

													//required
													'    <div class="row">',
													'            <div class="form-group">',

													'							<div class="">',

	                        '              <label for="RequiredUpdate" class="col-md-4 control-label greyText editPropertiesLabel">Required :</label>',
	                        '              <div class="col-md-8">',
	                        '                <div class="checkboxCssCorrection">&nbsp;</div>',
	                        '                <input type="checkbox" ng-model="panel.proxyModel.temporyConfig.formlyRequired" id="RequiredUpdate">',
	                        '              </div>',

													'							</div>',

													'            </div>',
													'    </div>',	

													'    <div class="marginTopFivepixels"></div>',

													//description
													'    <div class="row">',
													'            <div class="form-group">',

													'							<div class="col-md-12">',

	                        '              <label for="DescriptionUpdate" class="control-label greyText editPropertiesLabel">Description :</label>',
	                        '              <div class="">',
	                        '                <input type="text" class="form-control" ng-model="panel.proxyModel.temporyConfig.formlyDesciption" id="DescriptionUpdate" placeholder="Add / edit description here">',
	                        '              </div>',

													'							</div>',

													'            </div>',
													'    </div>',	


													'  </div>',
													validEditFooter,
													'</div> '
												].join(''));

	 		/**
			 * register template cache for side edit control panel
			 * 
			 * control : "RichTextEditor"
			 */
			$templateCache.put('editPanelRichTextEditorCtrl-tpls.html', 
												[
													'<div class="panel panel-default">',
													'    <div class="panel-body">',

													'    <div class="row">',
													'        <div class="col-md-12">',
													'            <h5 class="greyText"><i class="fa fa-pencil-square-o"></i>&nbsp; Edit properties :</h5>',
													'        </div>',
													'    </div> ',
													//'    <hr/>',

													'    <div class="marginTopFivepixels"></div>',

													//description
													'    <div class="row">',
													'            <div class="form-group">',

													'							<div class="col-md-12">',

	                        '              <label for="DescriptionUpdate" class="control-label greyText editPropertiesLabel">Description :</label>',
	                        '              <div class="">',
	                        '                <input type="text" class="form-control" ng-model="panel.proxyModel.temporyConfig.formlyDesciption" id="DescriptionUpdate" placeholder="Add / edit description here">',
	                        '              </div>',

													'							</div>',

													'            </div>',
													'    </div>',	


													'  </div>',
													validEditFooter,
													'</div> '
												].join(''));



  	}
  ]);

