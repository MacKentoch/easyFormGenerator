/** 
  *easyFormGenerator — drag and drop way — version 
  *Version 1.0.33 
  *Author : Erwan Datin (MacKentoch) 
  *Link: https://github.com/MacKentoch/easyFormGenerator 
  *License : MIT (2015) 
 **/ 
 ;(function(){
 	'use strict';
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
  //alias module to distinguish the drag and drop way
angular
  .module('eda.easyformGen.dragdropway', ['edaApp']);


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
                        'pageslide-directive'
	                     ])

  .value('easyFormGenVersion', 'v1.0.33')
  .run(runfct);



  runfct.$inject = ['$templateCache'];
  function runfct($templateCache){
		
		
  		
  		 var validEditFooter = validEditFooterTpl();
  		 $templateCache.put('editPanelBlankCtrl-tpls.html', editPanelBlankCtrlTpls());
  		 $templateCache.put('editPanelHeaderCtrl-tpls.html', editPanelHeaderCtrlTpl());
  		 $templateCache.put('editPanelSubTitleCtrl-tpls.html', editPanelSubTitleCtrlTpl());
  		 $templateCache.put('editPanelTextInputCtrl-tpls.html', editPanelTextInputCtrlTpl());
  		 $templateCache.put('editPanelPasswordCtrl-tpls.html', 	editPanelPasswordCtrlTpl());
  		 $templateCache.put('editPanelDateCtrl-tpls.html', editPanelDateCtrlTpl());	
  		 $templateCache.put('editPanelTextareaCtrl-tpls.html', editPanelTextareaCtrlTpl());
  		 $templateCache.put('editPanelRichTextEditorCtrl-tpls.html', editPanelRichTextEditorCtrlTpl());
  		 $templateCache.put('editPanelRadioCtrl-tpls.html', editPanelRadioCtrlTpl());
  		 $templateCache.put('editPanelCheckboxCtrl-tpls.html', editPanelCheckboxCtrlTpl());
  		 $templateCache.put('editPanelBasicSelectCtrl-tpls.html', editPanelBasicSelectCtrlTpl());
  		 $templateCache.put('editPanelGroupedSelectCtrl-tpls.html', editPanelGroupedSelectCtrlTpl());

  		/**
  		 * commun to all control edit templates
  		 *  -> footer valid button
  		 */
  		function validEditFooterTpl() {
  			return	[
									'<div class="modal-footer">',

									//reset button
									'	<button class="btn btn-danger pull-left"',
		              '	        ng-click="panel.resetControl()">',
		              ' 	<i class="fa fa-refresh"></i>&nbsp;Reset',
		              ' </button>',

									//save button
									'	<button class="btn btn-success pull-right"',
		              '	        ng-click="panel.updateSpecialControl(); saveFromEditPanel();">',
		              ' 	<i class="fa fa-floppy-o"></i>&nbsp;Save',
		              ' </button>',
		              //															
									'</div>'
								].join('');
  		} 

			/**
  		 * register template cache for side edit control panel
  		 * 
  		 * control : "blank"
  		 */
  		function editPanelBlankCtrlTpls() {
  			return	[
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
								].join('');
			}

  		/**
  		 * register template cache for side edit control panel
  		 * 
  		 * control : "Header"
  		 */
  		function editPanelHeaderCtrlTpl(){
  			return   				[
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
  											].join('');
  		}  

	 		/**
			 * register template cache for side edit control panel
			 * 
			 * control : "SubTitle"
			 */
			function editPanelSubTitleCtrlTpl(){
				return 	[
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
									].join('');
			} 

	 		/**
			 * register template cache for side edit control panel
			 * 
			 * control : "TextInput"
			 */
			function editPanelTextInputCtrlTpl(){
				return 	[
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
								].join('');
			}

	 		/**
			 * register template cache for side edit control panel
			 * 
			 * control : "Password"
			 */
			function editPanelPasswordCtrlTpl(){
				return [
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
									].join('');
			} 

	 		/**
			 * register template cache for side edit control panel
			 * 
			 * control : "Date"
			 */
			function editPanelDateCtrlTpl(){
				return 								[
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
                  '        <ol class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12" ng-model="panel.proxyModel.temporyConfig.datepickerPopup" id="dateformatSelect">',
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
								].join('');
			}

	 		/**
			 * register template cache for side edit control panel
			 * 
			 * control : "Textarea"
			 */
			function editPanelTextareaCtrlTpl(){
				return 	[
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
								].join('');
			} 

	 		/**
			 * register template cache for side edit control panel
			 * 
			 * control : "RichTextEditor"
			 */
			function editPanelRichTextEditorCtrlTpl(){
				return 								[
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
								].join('');
			}

	 		/**
			 * register template cache for side edit control panel
			 * 
			 * control : "radio"
			 */
			function editPanelRadioCtrlTpl(){
				return 	[
									'<div class="panel panel-default">',
									'    <div class="panel-body">',

									'    <div class="row">',
									'        <div class="col-md-12">',
									'            <h5 class="greyText"><i class="fa fa-pencil-square-o"></i>&nbsp; Edit properties :</h5>',
									'        </div>',
									'    </div> ',
									//'    <hr/>',


									'    <div class="marginTopFivepixels"></div>',

									//add options
                  '  <div class="row">',
                  '      <div class="col-lg-12 col-md-12">',
                  '        <label for="radioRowCollection" class=" control-label greyText editPropertiesLabel">Add new radio :</label>',
                  '     </div>',
                  '  </div>',
                  '  <div class="row">',
                  '      <div>',
                  '          <div class="form-group">',
                  '              <div class="col-sm-9 col-xs-9 col-md-9 col-lg-9">',
                  '              <input type="text" class="form-control" id="inputAddNewRadioOption" placeholder="add new radio" ng-model="panel.newOptionRadio.saisie">',
                  '              </div>',
                  '              <div class="col-sm-3 col-xs-3 col-md-3 col-lg-3">',
                  '                  <button class="btn btn-primary" ng-click="panel.addNewOptionRadio()">add</button>',
                  '              </div>',
                  '          </div>',
                  '      </div>',
                  '  </div>',
                  '  <div class="row">',
                  '      <div class="col-lg-12 col-md-12">',
                  '        <label for="radioRowCollection" class=" control-label greyText editPropertiesLabel">Edit/Remove radio :</label>',
                  '     </div>',
                  '  </div>',
                  '  <div class="row">',
                  '         <div class="form-group">',

                  '              <div class-"col-lg-12 col-md-12 col-sm-12 col-xs-12">',
                  '                  <div class="container">',
                  '                      <div ng-show="panel.radioRowCollection.rows.length === 0">',
                  '                          <h5 class="text-center greyText"><em>- no radio : add new radio values -</em></h5>',
                  '                      </div>  ',
                  '                      <table ng-if="panel.radioRowCollection.rows.length > 0" class="table table-striped">',
                  '                          <thead>',
                  '                          <tr>',
                  '                              <th st-ratio="20">order</th>',
                  '                              <th st-ratio="55">option</th>',
                  '                              <th st-ratio="25"></th>',
                  '                          </tr>',
                  '                          <tr>',
                  '                              <th st-ratio="20"></th>',
                  '                              <th st-ratio="55">',
                  '                                  <input ng-model="radioFilter" placeholder="search for option" class="input-sm form-control" type="search"/>',
                  '                              </th>',
                  '                              <th st-ratio="25"></th>',
                  '                          </tr>',
                  '                          </thead>',
                  '                          <tbody>  ',
                  '                              <tr ng-repeat="radioRow in panel.radioRowCollection.rows | filter:radioFilter as radioRow">',
                  '                                  <td st-ratio="20">{{$index}}</td>',
                  '                                  <td st-ratio="55">{{radioRow.option}}</td>',
                  '                                  <td st-ratio="25">',
                  '                                      <div class="pull-right">',
                  '                                          <button class="btn btn-primary" ng-click="panel.upThisRadioRow($index)"><i class="fa fa-arrow-up"></i></button>',
                  '                                          <button class="btn btn-primary" ng-click="panel.downThisRadioRow($index)"><i class="fa fa-arrow-down"></i></button>    ',
                  '                                          <button class="btn btn-danger"  ng-click="panel.removeRadioRow($index)"><i class="fa fa-trash-o"></i></button>',
                  '                                       </div>',   
                  '                                  </td>',
                  '                              </tr>',
                  '                          </tbody>',
                  '                      </table>',
                  '                  </div>',
                  '              </div>',

                  '         </div>',
                  '  </div>',


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
								].join('');
			} 

	 		/**
			 * register template cache for side edit control panel
			 * 
			 * control : "Checkbox"
			 */
			function editPanelCheckboxCtrlTpl(){
				return 	[
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
								].join('');
			} 

	 		/**
			 * register template cache for side edit control panel
			 * 
			 * control : "Basic Select"
			 */
			function editPanelBasicSelectCtrlTpl(){
				return 	[
									'<div class="panel panel-default">',
									'    <div class="panel-body">',

									'    <div class="row">',
									'        <div class="col-md-12">',
									'            <h5 class="greyText"><i class="fa fa-pencil-square-o"></i>&nbsp; Edit properties :</h5>',
									'        </div>',
									'    </div> ',
									//'    <hr/>',

									'    <div class="marginTopFivepixels"></div>',

									
									//add option input
                  '  <div class="row">',
                  '      <div class="col-lg-12 col-md-12">',
                  '        <label for="basicSelectRowCollection" class=" control-label greyText editPropertiesLabel">Add new options :</label>',
                  '     </div>',
                  '  </div>',
                  '  <div class="row">',
                  '      <div>',
                  '          <div class="form-group">',
                  '              <div class="col-sm-9 col-xs-9 col-md-9 col-lg-9">',
                  '              <input type="text" class="form-control" id="inputAddNewBasicOption" placeholder="add new option" ng-model="panel.newOptionBasicSelect.saisie">',
                  '              </div>',
                  '              <div class="col-sm-3 col-xs-3 col-md-3 col-lg-3">',
                  '                  <button class="btn btn-primary" ng-click="panel.addNewOptionBasicSelect()">add</button>',
                  '              </div>',
                  '          </div>',
                  '      </div>',
                  '  </div>',                            

                  //options table
                  ' <div class="row">',
                  '      <div class="col-lg-12 col-md-12">',
                  '        <label  class=" control-label greyText editPropertiesLabel">Edit/Remove options :</label>',  
                  '     </div>',
                  '  </div>',
                  '  <div class="row">',
                  '         <div class="form-group">',
                  '          <div class-"col-lg-12 col-md-12 col-sm-12 col-xs-12">',
                  '              <div class="container">',
                  '                  <div ng-if="panel.basicSelectRowCollection.rows.length === 0">',
                  '                      <h5 class="text-center greyText"><em>- no option : add new options -</em></h5>',
                  '                  </div>',  
                  '                  <table ng-if="panel.basicSelectRowCollection.rows.length > 0" class="table table-striped">',
                  '                      <thead>',
                  '                      <tr>',
                  '                          <th st-ratio="20">order</th>',
                  '                          <th st-ratio="55">option</th>',
                  '                          <th st-ratio="25"></th>',
                  '                      </tr>',
                  '                      <tr>',
                  '                          <th st-ratio="20"></th>',
                  '                          <th st-ratio="55">',
                  '                              <input ng-model="panel.basicSelectFilter" placeholder="search for option" class="input-sm form-control" type="search"/>',
                  '                          </th>',
                  '                          <th st-ratio="25"></th>',
                  '                      </tr>',
                  '                      </thead>',
                  '                      <tbody>',
                  '                      <tr ng-repeat="basicSelectRow in panel.basicSelectRowCollection.rows | filter:basicSelectFilter as basicSelectRow">',
                  '                          <td st-ratio="20">{{$index}}</td>',
                  '                          <td st-ratio="55">{{basicSelectRow.option}}</td>',
                  '                          <td st-ratio="25">',
                  '                              <div class="pull-right">',
                  '                                <button class="btn btn-primary" ng-click="panel.upThisRow($index)"><i class="fa fa-arrow-up"></i></button>',
                  '                                <button class="btn btn-primary" ng-click="panel.downThisRow($index)"><i class="fa fa-arrow-down"></i></button>',
                  '                                	<button class="btn btn-danger" ng-click="panel.removeRow($index)"><i class="fa fa-trash-o"></i></button>',
                  '                               </div>',   
                  '                          </td>',
                  '                      </tr>',
                  '                      </tbody>',
                  '                  </table>',
                  '              </div>',
                  '          </div>',
                  '         </div>',
                  '  </div>',
	

                  '  <div class="marginTopFivepixels"></div>',
                    
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
								].join('');
			}

	 		/**
			 * register template cache for side edit control panel
			 * 
			 * control : "Grouped Select"
			 */
			function editPanelGroupedSelectCtrlTpl(){
				return 	[
									'<div class="panel panel-default">',
									'    <div class="panel-body">',

									'    <div class="row">',
									'        <div class="col-md-12">',
									'            <h5 class="greyText"><i class="fa fa-pencil-square-o"></i>&nbsp; Edit properties :</h5>',
									'        </div>',
									'    </div> ',
									//'    <hr/>',

									'    <div class="marginTopFivepixels"></div>',

									//add options input  
                  '  <div class="row">',
                  '      <div class="col-lg-12 col-md-12">',
                  '        <label for="groupedSelectRowCollection" class="control-label greyText editPropertiesLabel">Add new options :</label>',
                  '     </div>',
                  '  </div>',
                  '  <div class="row">',
                  '      <div>',
                  '          <div class="form-group">',
                  '              <div class="col-sm-9 col-xs-9 col-md-9 col-lg-9">',
                  '              <input type="text" class="form-control" id="inputAddNewGroupedOption" placeholder="add new option" ng-model="panel.newOptionGroupedSelect.saisie">',
                  '              </div>',
                  '              <div class="col-sm-3 col-xs-3 col-md-3 col-lg-3">',
                  '                  <button class="btn btn-primary" ng-click="panel.addNewOptionGroupedSelect()">add</button>',
                  '              </div>',
                  '         </div>',
                  '      </div>',
                  '  </div> ',

                  //add group input
                  '  <div class="row">',
                  '      <div class="col-lg-12 col-md-12">',
                  '        <label for="groupedSelectRowCollection" class=" control-label greyText editPropertiesLabel">Add new groups :</label>',
                  '     </div>',
                  '  </div>',
                  '  <div class="row">',
                  '      <div>',
                  '          <div class="form-group">',
                  '              <div class="col-sm-9 col-xs-9 col-md-9 col-lg-9">',
                  '                  <input  id="inputAddNewGroupGroupedOption" type="text" class="form-control" ng-model="panel.newGroupGroupedSelect.saisie" id="inputTextLabelUpdateGroupedSelect" placeholder="Add new group">',
                  '              </div>',
                  '              <div class="col-sm-3 col-xs-3 col-md-3 col-lg-3">',
                  '                  <button class="btn btn-primary" ng-click="panel.addNewGroupToGroupedSelect()">add</button>',
                  '              </div>',
                  '          </div>',
                  '      </div>',
                  '  </div>',

                  //options/groups table
                  '  <div class="row">',
                  '      <div class="col-lg-12 col-md-12">',
                  '        <label  class=" control-label greyText editPropertiesLabel">Edit/Remove options/groups:</label>',
                  '     </div>',
                  '  </div>',
                  '  <div class="row">',
                  '         <div class="form-group">',
                  '          <div class-"col-lg-12 col-md-12 col-sm-12 col-xs-12">',
                  '              <div class="container">',
                  '                  <div ng-if="panel.groupedSelectRowCollection.rows.length === 0">',
                  '                      <h5 class="text-center greyText"><em>- no option : add new options -</em></h5>',
                  '                  </div>',  
                  '                  <table ng-if="panel.groupedSelectRowCollection.rows.length > 0" class="table table-striped">',
                  '                      <thead>',
                  '                      <tr>',
                  '                          <th st-ratio="20">order</th>',
                  '                          <th st-ratio="25">group</th>',
                  '                          <th st-ratio="30">option</th>',
                  '                          <th st-ratio="25"></th>',
                  '                      </tr>',
                  '                      <tr>',
                  '                          <th st-ratio="20"></th>',
                  '                          <th st-ratio="25"></th>',
                  '                          <th st-ratio="30">',
                  '                              <input ng-model="groupedSelectFilter" placeholder="search for option" class="input-sm form-control" type="search"/>',
                  '                          </th>',
                  '                          <th st-ratio="25"></th>',
                  '                      </tr>',
                  '                      </thead>',
                  '                      <tbody>',
                  '                      <tr ng-repeat="groupedSelectRow in panel.groupedSelectRowCollection.rows | filter:groupedSelectFilter as groupedSelectRow">',
                  '                          <td st-ratio="20">{{$index}}</td>',
                  '                          <td st-ratio="25">',
                  '                              <div ng-if="panel.groupSelectGroupClick.showList === true">',
                  '                              <div ng-if="panel.GroupedSelectGroups.list.length === 0">',
                  '                                  <p class="text-left noGroupText">- add new groups -</p>',
                  '                              </div>',
                  '                              <div ng-if="panel.GroupedSelectGroups.list.length > 0">',
                  '                                  <ol class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12 editGroupedSelectnyaSelect" ng-model="groupedSelectRow.group" id="modelGroupedOptionGroupedChoose"',
                  '                                  disabled="panel.GroupedSelectGroups.list.length === 0">',
                  '                                    <li class="nya-bs-option" nya-bs-option="GroupedSelectGroup in panel.GroupedSelectGroups.list" value="GroupedSelectGroup">',
                  '                                      <a>{{GroupedSelectGroup}}</a>',
                  '                                    </li>',
                  '                                  </ol>',
                  '                              </div>',
                  '                              </div>',
                  '                              <div ng-if="panel.groupSelectGroupClick.showList === false">',
                  '                              {{groupedSelectRow.group}}',
                  '                              </div>',
                  '                          </td>',
                  '                          <td st-ratio="30">{{groupedSelectRow.option}}</td>',
                  '                          <td st-ratio="25">',
                  '                              <div class="pull-right">',
                  '                                  <button class="btn btn-primary" ng-click="panel.upThisGroupedSelectRow($index)"><i class="fa fa-arrow-up"></i></button>',
                  '                                  <button class="btn btn-primary" ng-click="panel.downThisGroupedSelectRow($index)"><i class="fa fa-arrow-down"></i></button>',
                  '                                  <button class="btn btn-warning" ng-click="panel.showGroupListToChoose()"><i class="fa fa-pencil-square-o"></i> </button>',
                  '                                  <button class="btn btn-danger"  ng-click="panel.removeGroupedSelectRow($index)"><i class="fa fa-trash-o"></i></button>',
                  '                               </div>',   
                  '                          </td>',
                  '                      </tr>',
                  '                      </tbody>',
                  '                  </table>',
                  '              </div>',
                  '          </div>',
                  '         </div>',
                  '  </div>',
										

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
								].join('');
			} 

  }

/**
 *  ------------------------------------------------------
 *  configuration edaDragAndDropConfig
 *  ------------------------------------------------------
 *
 * configuration related to drag and drop
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
	.module('edaApp')
	.config(['dragDropConfigProvider',
	
	function (dragDropConfigProvider) {

    dragDropConfigProvider.setItemsNotTocount({
                                                //placeholder :         '',
                                                itemBeingDragged :    'dndDraggingSource'    
                                              });
 
	}]);


/**
 *  ------------------------------------------------------
 *  configuration edaFormlyConfig
 *  ------------------------------------------------------
 *
 *  formly configuration
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
	.module('edaApp')
	.config([	'formlyConfigProvider',
						'EasyFormGenFormlyBindingModelsProvider',
						'dragDropConfigProvider',

	function (formlyConfigProvider, EasyFormGenFormlyBindingModelsProvider, dragDropConfigProvider) {
		
		console.info('app in config');

		/**
		 * Add blanck control
		 *
		 * 1- in formlyConfigProvider
		 * 2- in EasyFormGenFormlyBindingModelsProvider
		 */
		formlyConfigProvider.setType(
		 	{
				name  		: 'blank',
				template 	: '<div></div>'
		  }
		);

		EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList(
				{
						id 								: 'empty',  
						name 							: 'no control', 
						subtitle 					: 'no control', 
						group 						: 'Blank', 
						formlyType 				: 'blank', 
						formlySubtype 		: '', 
						formlyLabel 			: '', 
						formlyRequired 		: false, 
						formlyDesciption 	: '', 
						formlyOptions 		: []
				}
		);

		/**
		 * drag and drop control template
		 *
		 * @PARAM 1 : control template object (drag an drop)
		 * @PARAM 2 : object to indicates in which group of control it will be inserted
		 * 						(related to _dragDropConfigModel.containerConfig.decoration in dragDropConfig provider)
		 *
		 */
		dragDropConfigProvider.addControlToDragDropPresentationModel(
				{
          label 	: [  
			                  '<div class="col-md-12">',
			                  '    <div class="form-group">',                                          
			                  '      <div class="">',
			                  '      </div>',
			                  '    </div>',
			                  '</div>'
	                   ].join(''),          
          control : 'empty',
          cssClass: 'col-xs-12'
				},
				{
					addToGroupCtrl : 'blank'
				}
		);	

		/**
		 * Add header
		 *
		 * note : formly header template already exists
		 * no need to create a custom one
		 *
		 * just declare in EasyFormGenFormlyBindingModelsProvider
		 * 
		 */
		EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList(
				{
					id 								: 'Header',  
					name 							: 'Header', 
					subtitle 					: 'no control', 
					group 						: 'Decoration', 
					formlyType 				: 'header', 
					formlySubtype 		: '', 
					formlyLabel 			: '', 
					formlyRequired 		: false, 
					formlyDesciption 	: '', 
					formlyOptions 		: []
				}
		);
		/**
		 * drag and drop header control template
		 *
		 *
		 * @PARAM 1 : control template object (drag an drop)
		 * @PARAM 2 : object to indicates in which group of control it will be inserted
		 *  					(related to _dragDropConfigModel.containerConfig.decoration in dragDropConfig provider)
		 */
		dragDropConfigProvider.addControlToDragDropPresentationModel(
				{
          label 	: [  
			                  '<div class="col-md-12">',
			                  '    <div class="form-group">',                                          
			                  '      <div class="">',
			                  '        <h2 class="text-center">Header</h2>',
			                  '        <hr/>',
			                  '      </div>',
			                  '    </div>',
			                  '</div>'
	                   ].join(''),          
          control : 'Header',
          cssClass: 'col-xs-12'
				},
				{
					addToGroupCtrl : 'headers'
				}				
		);

		/**
		 * Add subTitle control
		 *
		 * 1- in formlyConfigProvider
		 * 2- in EasyFormGenFormlyBindingModelsProvider
		 */
		var subTitleTemplate =	[
															'<div class="row">', 
															'  <div class="">', 
															'    <h4 class="text-center">{{options.templateOptions.placeholder}}<h4>', 
															'    <hr/>',
															'  </div>',
															'</div>'
														].join(' ');

		formlyConfigProvider.setType(
		 	{
				name 			: 'subTitle',
				template 	: subTitleTemplate
		  }
		);

		EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList(
				{
					id 								: 'Subtitle',  
					name 							: 'Subtitle', 
					subtitle 					: 'no control', 
					group 						: 'Decoration', 
					formlyType 				: 'subTitle', 
					formlySubtype 		: '', 
					formlyLabel 			: '', 
					formlyRequired 		: false, 
					formlyDesciption 	: '', 
					formlyOptions 		: []
				}
		);
		/**
		 * drag and drop subtitles control template
		 *
		 *
		 * @PARAM 1 : control template object (drag an drop)
		 * @PARAM 2 : object to indicates in which group of control it will be inserted
		 * 						(related to _dragDropConfigModel.containerConfig.decoration in dragDropConfig provider)
		 */	
		dragDropConfigProvider.addControlToDragDropPresentationModel(
        {
          'label' 	: [  
			                  '<div class="col-md-12">',
			                  '    <div class="form-group">',                                          
			                  '      <div class="">',
			                  '        <h4 class="text-center">SubTitle</h4>',
			                  '        <hr/>',
			                  '      </div>',
			                  '    </div>',
			                  '</div>'
	                    ].join(''),
          'control'	: 'Subtitle',
          'cssClass': 'col-xs-12'
        },
				{
					addToGroupCtrl : 'headers'
				}        
		);		

		/**
		 * Add text input (basic)
		 *
		 * note : formly template already exists
		 * no need to create a custom one
		 *
		 * just declare in EasyFormGenFormlyBindingModelsProvider
		 */
		EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList(
				{
					id 								: 'TextInput',  
					name 							: 'Text input', 
					subtitle 					: 'Text input', 
					group 						: 'input', 
					formlyType 				: 'input', 
					formlySubtype 		: '', 
					formlyLabel 			: '', 
					formlyRequired 		: false, 
					formlyDesciption 	: '', 
					formlyOptions 		: []
				}
		);
		/**
		 * drag and drop text input (basic) control template
		 *
		 *
		 * @PARAM 1 : control template object (drag an drop)
		 * @PARAM 2 : object to indicates in which group of control it will be inserted
		 *  					(related to _dragDropConfigModel.containerConfig.decoration in dragDropConfig provider)
		 */	
		dragDropConfigProvider.addControlToDragDropPresentationModel(
	      {
	        'label' 	: [  
			                  '<div class="col-md-12">',
			                  '<div class="form-group">',
			                  '  <label for="inputText" class="control-label textControlLabel pull-left">',
			                  '   title for text input<span class="textControlLabel ng-scope">*</span>',
			                  '  </label>',
			                  '  <div class="">',
			                  '    <input type="text" disabled class="form-control fakeControl" id="inputText" placeholder="basic input">',
			                  '    <p class="help-block pull-left">Description</p>',
			                  '  </div>',
			                  '</div>',
			                  '</div>'
	                  	].join(''),

	        'control'	: 'TextInput',
	        'cssClass': 'col-xs-12'
	      },
				{
					addToGroupCtrl : 'inputs'
				}  	      
		);			

		/**
		 * Add text input (Password)
		 *
		 * note : formly template already exists
		 * no need to create a custom one
		 *
		 * just declare in EasyFormGenFormlyBindingModelsProvider
		 */
		EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList(
				{
					id 								: 'Password',  
					name 							: 'Password', 
					subtitle 					: 'Password', 
					group 						: 'input', 
					formlyType 				: 'input', 
					formlySubtype 		: 'password', 
					formlyLabel 			: '', 
					formlyRequired 		: false, 
					formlyDesciption 	: '', 
					formlyOptions 		: []
				}
		);
		/**
		 * drag and drop text input — password —control template
		 *
		 *
		 * @PARAM 1 : control template object (drag an drop)
		 * @PARAM 2 : object to indicates in which group of control it will be inserted
		 *  					(related to _dragDropConfigModel.containerConfig.decoration in dragDropConfig provider)
		 */	
		dragDropConfigProvider.addControlToDragDropPresentationModel(
        {

          'label' 	: [
		                    '<div class="col-md-12">',
		                    '<div class="form-group">',
		                    '  <label for="inputPass" class="control-label textControlLabel ng-binding pull-left">',
		                    '   title for password input<span class="textControlLabel ng-scope">*</span>',
		                    '  </label>',
		                    '  <div class="">',
		                    '    <input type="password" disabled class="form-control fakeControl" id="inputPass" placeholder="password input">',
		                    '    <p class="help-block ng-binding pull-left">Description</p>',
		                    '  </div>',
		                    '</div>',
		                    '</div>'
	                    ].join(''),

          'control'	: 'Password',
          'cssClass': 'col-xs-12'
        },
				{
					addToGroupCtrl : 'inputs'
				} 

		);		
		
		/**
		 * Add angular UI date picker
		 *
		 * thx Kent C. Dodds for formly config template (since it was a huge config)
		 */
		var attributes =	[
												'date-disabled',
												'custom-class',
												'show-weeks',
												'starting-day',
												'init-date',
												'min-mode',
												'max-mode',
												'format-day',
												'format-month',
												'format-year',
												'format-day-header',
												'format-day-title',
												'format-month-title',
												'year-range',
												'shortcut-propagation',
												'datepicker-popup',
												'show-button-bar',
												'current-text',
												'clear-text',
												'close-text',
												'close-on-date-selection',
												'datepicker-append-to-body'
											];

		var bindings =	[
											'datepicker-mode',
											'min-date',
											'max-date'
										];

		var ngModelAttrs = {};

		angular.forEach(attributes, function(attr) {
		  ngModelAttrs[camelize(attr)] = {attribute: attr};
		});

		angular.forEach(bindings, function(binding) {
		  ngModelAttrs[camelize(binding)] = {bound: binding};
		});

	  function camelize(string) {
	    string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
	      return chr ? chr.toUpperCase() : '';
	    });
	    // Ensure 1st char is always lowercase
	    return string.replace(/^([A-Z])/, function(match, chr) {
	      return chr ? chr.toLowerCase() : '';
	    });
	  } 		

	  var angularUIDatePickerTemplate =	[
																				'<input ',
																				'      id="{{id}}" ',
																				'      class="form-control" ',
																				'      ng-click="open($event)"',
																				'      ng-model="model[options.key || index]" is-open="to.isOpen"',
																				'      ng-click="to.isOpen = true" ',
																				'      datepicker-options="to.datepickerOptions"',
																				'/>'
	  																	].join(' ');
 
		formlyConfigProvider.setType({
		  name 				: 'datepicker',
		  template 		: angularUIDatePickerTemplate,
		  wrapper 		: ['bootstrapLabel', 'bootstrapHasError'],
		  controller 	: [	'$scope', 
		  								function($scope) {
														     $scope.open = function($event) {
														      $event.preventDefault();
														      $event.stopPropagation();
														      $scope.opened = true;
														    };
		   								}
		   							],
		  defaultOptions : {
										    ngModelAttrs 		: ngModelAttrs,
										    templateOptions : {
																			      addonLeft: {
																			        class: 'glyphicon glyphicon-calendar',
																			        onClick: function(options) {
																			          options.templateOptions.isOpen = !options.templateOptions.isOpen;
																			        }
																			      },       
																			      onFocus: function($viewValue, $modelValue, scope) {
																			        scope.to.isOpen = !scope.to.isOpen;
																			      },
											      								datepickerOptions: {}
										    								}
		  }
		});

		EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList(
				{
					id 								: 'Date',  
					name 							: 'Date', 
					subtitle 					: 'Date', 
					group 						: 'input', 
					formlyType 				: 'datepicker', 
					formlySubtype 		: '', 
					formlyLabel 			: '', 
					formlyRequired 		: false, 
					formlyDesciption 	: '', 
					formlyOptions 		: [], 
					datepickerPopup 	: 'dd-MMMM-yyyy'
				}
		);
		/**
		 * drag and drop text input — date — control template (using angular UI datepicker)
		 *
		 *
		 * @PARAM 1 : control template object (drag an drop)
		 * @PARAM 2 : object to indicates in which group of control it will be inserted
		 *  					(related to _dragDropConfigModel.containerConfig.decoration in dragDropConfig provider)
		 */	
		dragDropConfigProvider.addControlToDragDropPresentationModel(
				{
									label 	: [
															'<div class="col-md-12">',        
															'<div class="form-group">',

									          	'  <label for="inputDate" class="control-label textControlLabel ng-binding pull-left">',
				                    	'   title for date input<span class="textControlLabel ng-scope">*</span>',
				                    	'  </label>',

															'          <div class="col-xs-12 col-sm-12 col-md-12 demoddDatepicker">',  
															'  					<div class="input-group">',
															'    					<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>',
															'    					<input type="text" disabled class="form-control fakeControl">',
															'  					</div>',
															'					</div>',

															'           <p class="help-block pull-left">description</p>',

															'</div>',
															'</div>'
														].join(''),
				          control	: 'Date',
				          cssClass: 'col-xs-12'
				},
				{
					addToGroupCtrl : 'inputs'
				} 				
		);

		/**
		 * Add textarea
		 *
		 * note : formly template already exists
		 * no need to create a custom one
		 *
		 * just declare in EasyFormGenFormlyBindingModelsProvider
		 */
		EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList(
				{
					id 								: 'Texarea', 
					name 							: 'Textarea', 
					subtitle 					: 'Textarea', 
					group 						: 'Textarea', 
					formlyType 				: 'textarea', 
					formlySubtype 		: '', 
					formlyLabel 			: '', 
					formlyRequired 		: false, 
					formlyDesciption 	: '', 
					formlyOptions 		: []
				}
		);
		/**
		 * drag and drop textarea control template
		 *
		 *
		 * @PARAM 1 : control template object (drag an drop)
		 * @PARAM 2 : object to indicates in which group of control it will be inserted
		 *  					(related to _dragDropConfigModel.containerConfig.decoration in dragDropConfig provider)
		 */	
		dragDropConfigProvider.addControlToDragDropPresentationModel(
        {
          'label' 	: [
                        '<div class="col-md-12">',
                        '    <div class="form-group">', 
                        '      <label for="textArea" class="control-label ',
                        '							textControlLabel pull-left">title for textarea <span class="textControlLabel">*</span></label>', 
                        '      <div class="">',
                        '        <textarea disabled class="form-control dragItemtextarea fakeControl" ng-model="model[options.key]" rows="1" id="textArea"></textarea>',
                        '        <p class="help-block pull-left">description</p>',          
                        '      </div>',
                        '    </div>',                    
                        '</div>'                                  
                    	].join(''),
          'control'	: 'Texarea',
          'cssClass': 'col-xs-12'          
				},
				{
					addToGroupCtrl : 'textareas'
				}					
		);				

		/**
		 * Add rich text editor control (using textAngular)
		 *
		 */
		var richTexEditorTemplate =	[
																	'<text-angular name="{{id}}" ', 
																	'              class="richTextAngular" ',
																	'              ng-model="model[options.key || index]">', 
																	'</text-angular>'
																].join(' ');
		formlyConfigProvider.setType(
		  {
				name     	: 'richEditor',
				template 	: richTexEditorTemplate
		  }
		);

		EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList(
				{
					id 								: 'RichTextEditor', 
					name 							: 'RichTextEditor', 
					subtitle 					: 'RichTextEditor', 
					group 						: 'Textarea', 
					formlyType 				: 'richEditor', 
					formlySubtype 		: '', 
					formlyLabel 			: '', 
					formlyRequired 		: false, 
					formlyDesciption 	: '', 
					formlyOptions 		: []
				}
		);
		/**
		 * drag and drop rich text editor control template (using textAngular)
		 *
		 *
		 * @PARAM 1 : control template object (drag an drop)
		 * @PARAM 2 : object to indicates in which group of control it will be inserted
		 *  					(related to _dragDropConfigModel.containerConfig.decoration in dragDropConfig provider)
		 */	
		dragDropConfigProvider.addControlToDragDropPresentationModel(
				{
					label 	: [
											'<div class="col-md-12">', 
											'    <div class="form-group">', 
                      '      <label for="textArea" class="control-label ',
                      '							textControlLabel pull-left">title for rich text editor <span class="textControlLabel">*</span></label>', 
											'      <div class="">',
											'        <textarea disabled class="form-control dragItemtextarea fakeControl" ng-model="model[options.key]" rows="1" id="textArea"></textarea>',
											'        <p class="help-block">description</p>',
											'      </div>',
											'    </div>',
											'</div>'
										].join(''),
			    control	: 'RichTextEditor',
			    cssClass: 'col-xs-12'
				},
				{
					addToGroupCtrl : 'textareas'
				}				
		);

		/**
		 * Add radio
		 *
		 * note : formly template already exists
		 * no need to create a custom one
		 *
		 * just declare in EasyFormGenFormlyBindingModelsProvider
		 */
		EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList(
				{
					id 								: 'Radio', 
					name 							: 'Radio', 
					subtitle 					: 'Radio', 
					options 					: [], 
					group 						: 'Radio', 
					formlyType 				: 'radio', 
					formlySubtype 		: '', 
					formlyLabel 			: '', 
					formlyRequired 		: false, 
					formlyDesciption 	: '' , 
					formlyOptions 		: []
				}
		);
		/**
		 * drag and drop radio control template (using textAngular)
		 *
		 *
		 * @PARAM 1 : control template object (drag an drop)
		 * @PARAM 2 : object to indicates in which group of control it will be inserted
		 *  					(related to _dragDropConfigModel.containerConfig.decoration in dragDropConfig provider)
		 */
		dragDropConfigProvider.addControlToDragDropPresentationModel(
        {
          'label' 	: [
                        '<div class="col-md-12">',        
                        '  <div class="form-group">',
                        '    <label for="vertRadio" class="control-label textControlLabel pull-left">title for radio <span class="textControlLabel">*</span></label>',
                        '    <div class="interligne"></div>',
                        '    <div class="pull-left">',
                        '      <div class="radio">',
                        '        <label class="fakeCheck">',
                        '          <input type="radio" disabled name="optionsRadios" class="fakeCheck" id="optionsRadio-0" value="verticalRadio0" checked="">',
                        '          option1',
                        '        </label>',
                        '      </div><div class="radio">',
                        '        <label class="fakeCheck">',
                        '          <input type="radio" disabled name="optionsRadios" class="fakeCheck"  id="optionsRadio-1" value="verticalRadio1" checked="">',
                        '          option2',
                        '        </label>',
                        '      </div>',
                        '      <p class="help-block pull-left">description</p>',
                        '    </div>',
                        '  </div>',                            
                        '</div>'
                      ].join(''),
          'control'	: 'Radio',
          'cssClass': 'col-xs-12'            
        },
				{
					addToGroupCtrl : 'radios'
				}	
		);				

		/**
		 * Add checkbox
		 *
		 * note : formly template already exists
		 * no need to create a custom one
		 *
		 * just declare in EasyFormGenFormlyBindingModelsProvider
		 */
		EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList(
				{
					id 								: 'Checkbox', 
					name 							: 'Checkbox', 
					subtitle 					: 'Checkbox', 
					group 						: 'Checkbox', 
					formlyType 				: 'checkbox', 
					formlySubtype 		: '', 
					formlyLabel 			: '', 
					formlyRequired 		: false, 
					formlyDesciption 	: '', 
					formlyOptions 		: []
				}
		);
		/**
		 * drag and drop checkbox control template (using textAngular)
		 *
		 *
		 * @PARAM 1 : control template object (drag an drop)
		 * @PARAM 2 : object to indicates in which group of control it will be inserted
		 *  					(related to _dragDropConfigModel.containerConfig.decoration in dragDropConfig provider)
		 */
		dragDropConfigProvider.addControlToDragDropPresentationModel(
				{

					label 	: [
											'<div class="col-md-12">',                               
											'<div class="checkbox">',
											'  <label class="fakeCheck">',
											'    <input type="checkbox" disabled class="fakeCheck" id="checkBox">',
											'		<span class="blackText ng-binding">label for checkbox </span>',
											'		<span class="textControlLabel ng-scope">*</span>',
											'  </label>', 
											'</div>',
											'<p class="help-block ng-binding">description</p>',
											'</div>' 
										].join(''),
				  control	: 'Checkbox',
				  cssClass: 'col-xs-12' 
				},
				{
					addToGroupCtrl : 'checkboxes'
				}					
		);

		/**
		 * Add basic Select control
		 *
		 * using nya-bs-select
		 */
		var basicSelectTemplate =	[
																' <ol class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12" ', 
																'		ng-model="model[options.key || index]"  ', 
																'		id="{{id}}"  ', 
																'		disabled="options.templateOptions.options.length === 0"> ',
																'   <li class="nya-bs-option" nya-bs-option="option in options.templateOptions.options"> ',
																'     <a>{{option.name}}</a> ',
																'   </li> ',
																' </ol> '
															].join(''); 	

		formlyConfigProvider.setType(
		 	{
				name 			: 'basicSelect',
				template 	: basicSelectTemplate
		  }
		);

		EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList(
				{
					id 								: 'BasicSelect', 
					name 							: 'Basic select', 
					subtitle 					: 'Basic select',
					options 					: [], 
					group 						: 'Select', 
					formlyType 				: 'basicSelect', 
					formlySubtype 		: '', 
					formlyLabel 			: '', 
					formlyRequired 		: false, 
					formlyDesciption 	: '', 
					formlyOptions 		: []
				}
		);	
		/**
		 * drag and drop basic select control template (using textAngular)
		 *
		 *
		 * @PARAM 1 : control template object (drag an drop)
		 * @PARAM 2 : object to indicates in which group of control it will be inserted
		 *  					(related to _dragDropConfigModel.containerConfig.decoration in dragDropConfig provider)
		 */
		dragDropConfigProvider.addControlToDragDropPresentationModel(
				{
					label 	: [
											'<div class="col-md-12">',
											'    <div class="form-group">',

											'<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 selectfordemo">',
											'<ol class="nya-bs-select col-xs-12 col-sm-12 col-md-12 col-lg-12 ng-valid btn-group ng-dirty ng-valid-parse ng-touched"', 
											'	ng-model="fakeModelNyaSelectBasic"', 
											'	data-live-search="false">',
											'   <button class="btn btn-default dropdown-toggle" disabled type="button">',
											'		 <span class="pull-left filter-option">',
											'			 <span class="ng-binding">Basic select</span>',
											'		</span>',
											'		&nbsp;<span class="caret"></span>',
											'</button>',

											'    </div>',
											'</div>' 
										].join(''),
				  control	: 'BasicSelect',
				  cssClass: 'col-xs-12' 	
				},
				{
					addToGroupCtrl : 'selects'
				}					
		);	

		/**
		 * Add Grouped Select control
		 *
		 * using nya-bs-select
		 */
    var groupedSelectTemplate =	[
																		'  <ol class="nya-bs-select col-sm-12 col-xs-12 col-md-12 col-lg12" ',
																		'		   ng-model="model[options.key || index]" ',
																		'      data-live-search="true" ',
																		'      disabled="options.templateOptions.options.length === 0">',
																		'      <li nya-bs-option="option in  options.templateOptions.options group by option.group">  ',
																		'        <span class="dropdown-header">{{$group}}</span>',
																		'        <a>',
																		'          <span>{{option.name}}</span>',
																		'          <span class="glyphicon glyphicon-ok check-mark"></span>',
																		'        </a>',
																		'      </li>',
																		'  </ol>'
     															].join(' ');
		formlyConfigProvider.setType(
			{
				name   		: 'groupedSelect',
				template 	: groupedSelectTemplate
			}
		);

		EasyFormGenFormlyBindingModelsProvider.addEasyFormControlToList(
				{
					id 								: 'GroupedSelect', 
					name 							: 'Grouped Select', 
					subtitle 					: 'Grouped Select',
					options 					: [], 
					group 						: 'Select', 
					formlyType 				: 'groupedSelect', 
					formlySubtype 		: '', 
					formlyLabel 			: '', 
					formlyRequired 		: false, 
					formlyDesciption 	: '', 
					formlyOptions 		: []
				}
		);
		/**
		 * drag and drop grouped select control template (using textAngular)
		 *
		 *
		 * @PARAM 1 : control template object (drag an drop)
		 * @PARAM 2 : object to indicates in which group of control it will be inserted
		 *  					(related to _dragDropConfigModel.containerConfig.decoration in dragDropConfig provider)
		 */
		dragDropConfigProvider.addControlToDragDropPresentationModel(
				{
					label 	: [
											'<div class="col-md-12">',
											'    <div class="form-group">',

											'<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 selectfordemo">',
											'<ol class="nya-bs-select col-xs-12 col-sm-12 col-md-12 col-lg-12 ng-valid btn-group ng-dirty ng-valid-parse ng-touched"', 
											'	ng-model="fakeModelNyaSelectBasic"', 
											'	data-live-search="false">',
											'   <button class="btn btn-default dropdown-toggle" disabled type="button">',
											'		 <span class="pull-left filter-option">',
											'			 <span class="ng-binding">Grouped select</span>',
											'		</span>',
											'		&nbsp;<span class="caret"></span>',
											'</button>',

											'    </div>',
											'</div>' 
										].join(''),
					control	: 'GroupedSelect',
					cssClass: 'col-xs-12' 
				},
				{
					addToGroupCtrl : 'selects'
				}				
		);			

 
	}]);


angular.module("edaApp").run(["$templateCache", function($templateCache) {$templateCache.put("edaDragDropWayEasyFormGeneratorTemplate.html","<section id=pageWfEdit><div ng-init=\"\"><div class=container><section id=preview><div id=preview-content><div class=content-container><toaster-container toaster-options=\"{ \'position-class\': \'toast-top-full-width\', \'extendedTimeout\':500, \'timeOut\':500, }\"></toaster-container><tabset justified=true><tab select=tabJustSelected(2) active=tab.editTab.active heading=\"Edit /Create\"><div class=row><div pageslide=\"\" ps-open=editPanelModel.toggle ps-side=left ps-cloak=true ps-size=400px><div id=controlEditLeftPanel ng-controller=\"edaEditPanelController as panel\"><div class=pull-right><button type=button class=close ng-click=closeEditPanel() aria-label=Close><span aria-hidden=true>&times;</span></button></div><div class=separator10pixel></div><div ng-switch=\"\" on=panel.proxyModel.temporyConfig.selectedControl><div ng-switch-when=none><div class=row><div class=col-sm-12><h5 class=\"text-center texteRouge\"><i class=\"fa fa-arrow-up\"></i>&nbsp; Select a control</h5></div></div></div><div ng-switch-when=empty><script type=text/ng-template id=editPanelBlankCtrl.tpls.html></script></div><div ng-switch-when=Header><div ng-include=\"\'editPanelHeaderCtrl-tpls.html\'\"></div></div><div ng-switch-when=Subtitle><div ng-include=\"\'editPanelSubTitleCtrl-tpls.html\'\"></div></div><div ng-switch-when=TextInput><div ng-include=\"\'editPanelTextInputCtrl-tpls.html\'\"></div></div><div ng-switch-when=Password><div ng-include=\"\'editPanelPasswordCtrl-tpls.html\'\"></div></div><div ng-switch-when=Date><div ng-include=\"\'editPanelDateCtrl-tpls.html\'\"></div></div><div ng-switch-when=Texarea><div ng-include=\"\'editPanelTextareaCtrl-tpls.html\'\"></div></div><div ng-switch-when=RichTextEditor><div ng-include=\"\'editPanelRichTextEditorCtrl-tpls.html\'\"></div></div><div ng-switch-when=Radio><div ng-include=\"\'editPanelRadioCtrl-tpls.html\'\"></div></div><div ng-switch-when=Checkbox><div ng-include=\"\'editPanelCheckboxCtrl-tpls.html\'\"></div></div><div ng-switch-when=BasicSelect><div ng-include=\"\'editPanelBasicSelectCtrl-tpls.html\'\"></div></div><div ng-switch-when=GroupedSelect><div ng-include=\"\'editPanelGroupedSelectCtrl-tpls.html\'\"></div></div></div><button class=\"btn btn-primary btn-block pull-right\" ng-click=closeEditPanel()>Close</button></div></div><div><div class=\"row advancedDemo\"><div ng-repeat=\"containers in dragDropModel\"><div dd-decor-drop-zone=\"\" dd-drop-zone-properties=easyFormDragDropProperties.dropZoneConfig.decoration[$index] dd-drop-zone-verbose-mode={{easyFormDragDropProperties.dropZoneConfig.verboseMode}} dd-drop-zone-current-index={{$index}} dd-drop-zone-add-new-line=insertNewLine()><div class=\"dropzone box box-yellow\"><ul dnd-list=containers dnd-allowed-types=\"[\'containerType\']\" dnd-external-sources=true dnd-dragover=\"dragoverCallbackContainer($parent.$parent.$index, $parent.$index, $index);\" dnd-drop=\"dropCallback(event, index, item, external, type, \'containerType\');\" class=row><li ng-repeat=\"items in containers\" dnd-draggable=items dnd-type=\"\'containerType\'\" dnd-effect-allowed=copyMove dnd-dragstart=\"\" dnd-moved=\"containers.splice($index, 1);\" dnd-disable-if=\"$parent.$index == 0\" dnd-copied=\"\"><div class=\"container-element box box-blue\" dd-decor-container=\"\" dd-container-properties=easyFormDragDropProperties.containerConfig.decoration[$index] dd-container-is-collpased=easyFormDragDropProperties.containerConfig.decoration[$index].isCollapsed dd-container-verbose-mode={{easyFormDragDropProperties.containerConfig.verboseMode}} dd-container-current-index={{$parent.$index}} dd-collapse-all=collapseAllGroupControl(exceptThisOne)><div dd-decor-include-container-here=\"\"><div dd-decor-line=\"\" dd-line-verbose-mode={{easyFormDragDropProperties.containerConfig.verboseMode}} dd-line-current-index={{$index}} dd-line-parent-index={{$parent.$index}} dd-remove-line=removeThisLine($index)><ul dnd-list=items dnd-allowed-types=\"[\'itemType\']\" dnd-horizontal-list=true dnd-external-sources=true dnd-disable-if=\"items.length > 2\" dnd-dragover=\"dragoverCallbackItems($parent.$parent.$index, $parent.$index, $index, external);\" dnd-drop=\"dropCallbackItems(event, index, $index,$parent.$index, $parent.$parent.$index, $parent.$parent.$parent.$index, item, external, type, \'itemType\');\" class=itemlist dd-content-counter=\"\" dd-value-when-placeholder=dndPlaceholder dd-value-when-dragging=dndDraggingSource dd-full-model=dragDropModel dd-content-counter-current-index={{$index}} dd-content-counter-parent-index={{$parent.$index}} dd-content-counter-force-css-refresh=command.forceRefresh><li ng-repeat=\"item in items\" dnd-draggable=item dnd-type=\"\'itemType\'\" dnd-effect-allowed=copyMove dnd-dragstart=\"\" dnd-moved=\"dndItemMoved($parent.$parent.$index, $parent.$index, $index);\" dnd-copied=\"\" dd-decor-item=\"\" dd-item-verbose-mode={{easyFormDragDropProperties.itemConfig.verboseMode}} dd-item-current-index={{$index}} dd-item-parent-index={{$parent.$index}} dd-item-parent-parent-index={{$parent.$parent.$index}} dd-items-count=items.length dd-item-css-class={{item.cssClass}}><div id=itemContent><div dd-no-editable-control=\"\" class=rightClickCtrl ng-class=\"{rightClickCtrlSelected : item.rightCliked === true}\" eda-set-right-clicked=\"setRightClicked(previousState, item)\" eda-right-click=\"toggleEditPanel($event, $parent.$index, $index, item)\" eda-selected-class=rightClickCtrlSelected eda-is-selected={{item.rightCliked}} eda-right-click-col-index={{$parent.$parent.$index}}><span ng-bind-html=\"item.label | trustThis\"></span></div></div></li></ul></div><div class=clearfix></div></div></div></li></ul></div></div></div></div></div></div></tab><tab select=tabJustSelected(1) active=tab.previewTab.active heading=Preview><div class=\"panel panel-default\"><div class=panel-body><form ng-submit=vm.onSubmit()><formly-form id=previewFormlyForm model=vm.model fields=vm.wfFormFields><span class=pull-right><button class=\"btn btn-primary\" type=submit>{{configuration.submitButtonText}}</button> <button class=\"btn btn-primary\" type=cancel>{{configuration.cancelButtonText}}</button></span></formly-form></form></div></div><div class=\"panel panel-default\"><div class=\"panel-heading heading-preview\" ng-click=\"ihm.preview.customizeFormButtonsExpanded =!ihm.preview.customizeFormButtonsExpanded\"><h3 class=panel-title><button class=\"btn btn-primary btn-xs\"><i class=fa ng-class=\"{\'fa-angle-down\':!ihm.preview.customizeFormButtonsExpanded, \'fa-angle-up\' : ihm.preview.customizeFormButtonsExpanded}\"></i></button> &nbsp;<i class=\"fa fa-wrench\"></i>&nbsp; Customize form buttons</h3></div><div class=panel-body><div collapse=ihm.preview.customizeFormButtonsExpanded><div class=row><div class=col-xs-6><div class=form-group><label for=inputSubmitButtontext class=\"greyText control-label\">Customize Submit button Text :</label><div><input type=text class=form-control id=inputSubmitButtontext placeholder=\"Submit button text\" ng-model=configuration.submitButtonText></div></div></div><div class=col-xs-6><div class=form-group><label for=inputCancelButtontext class=\"greyText control-label\">Customize Cancel button Text :</label><div><input type=text class=form-control id=inputCancelButtontext placeholder=\"Cancel button text\" ng-model=configuration.cancelButtonText></div></div></div></div></div></div></div><div class=\"panel panel-default\"><div class=\"panel-heading heading-preview\" ng-click=\"ihm.preview.formlyModelViewExpanded =!ihm.preview.formlyModelViewExpanded\"><h3 class=panel-title><button class=\"btn btn-primary btn-xs\"><i class=fa ng-class=\"{\'fa-angle-down\':!ihm.preview.formlyModelViewExpanded, \'fa-angle-up\' : ihm.preview.formlyModelViewExpanded}\"></i></button> &nbsp;<i class=\"fa fa-eye\"></i>&nbsp; DATA MODEL</h3></div><div class=panel-body><div collapse=ihm.preview.formlyModelViewExpanded><pre>\n											{{vm.model | json}}\n										</pre></div></div></div><div class=\"panel panel-default\"><div class=\"panel-heading heading-preview\" ng-click=\"ihm.preview.formlyFieldsViewExpanded =!ihm.preview.formlyFieldsViewExpanded\"><h3 class=panel-title><button class=\"btn btn-primary btn-xs\"><i class=fa ng-class=\"{\'fa-angle-down\':!ihm.preview.formlyFieldsViewExpanded, \'fa-angle-up\' : ihm.preview.formlyFieldsViewExpanded}\"></i></button> &nbsp;<i class=\"fa fa-eye\"></i>&nbsp; FIELDS MODEL (ready to save to database one)</h3></div><div class=panel-body><div collapse=ihm.preview.formlyFieldsViewExpanded><pre>\n											{{vm.wfFormFieldsOnlyNeededProperties | json}}\n										</pre></div></div></div><div class=\"panel panel-default\"><div class=\"panel-heading heading-preview\" ng-click=\"ihm.preview.saveThisFormExpanded =!ihm.preview.saveThisFormExpanded\"><h3 class=panel-title><button class=\"btn btn-primary btn-xs\"><i class=fa ng-class=\"{\'fa-angle-down\':!ihm.preview.saveThisFormExpanded, \'fa-angle-up\' : ihm.preview.saveThisFormExpanded}\"></i></button> &nbsp;<i class=\"fa fa-camera-retro\"></i>&nbsp; Save this form</h3></div><div class=panel-body><div collapse=ihm.preview.saveThisFormExpanded><div class=row><div class=col-xs-12><div class=form-group><label for=inputNameFormtext class=\"greyText control-label\">Name to this form :</label><div><input type=text class=form-control id=inputNameFormtext placeholder=\"Enter formName\" ng-model=configuration.formName></div></div></div></div><button class=\"btn btn-primary btn-block btn-lg\" ng-click=saveThisForm()>save this form</button></div></div></div></tab></tabset></div></div></section><hr><section><h6 class=text-right>Easy form generator : {{easyFormGeneratorVERSION}} — Erwan DATIN (MacKentoch)</h6></section></div></div></section>");
$templateCache.put("editModalTemplate.html","<h1>no use right now</h1>");}]);
/**
 *  ------------------------------------------------------
 *   dragDropConfigProvider
 *  ------------------------------------------------------ 
 *
 * All customizations to "easy form generator - drag and drop version - " will be placed here
 *
 * customize it in your in module_app.config 
 * then use service in your application
 *
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
 */
angular
  .module('edaApp.providers.dragDropConfigProvider', [])
  .provider('dragDropConfig', [

    function(){

      /**
       * default drag drop item classes
       * 
       * -> by default : up to 3 items per rows
       */
      var _listDragDropItemCssClasses = [
                                            {
                                                cssClass : 'col-md-12', 
                                                numberItemPerRow: 0
                                            },
                                            {
                                                cssClass : 'col-md-12', 
                                                numberItemPerRow: 1
                                            },                                        
                                            {
                                                cssClass : 'col-md-6', 
                                                numberItemPerRow: 2
                                            },
                                            {
                                                cssClass : 'col-md-4', 
                                                numberItemPerRow: 3
                                            }
                                        ]; 

      /** easyFormDragDropProperties 
       *
       * drag and drop appearance configuration properties
       */
      var _dragDropConfigModel =  {
          dropZoneConfig : {
                                decoration :  [
                                                {
                                                  WhenIndex: 0,
                                                  ApplycssClass: 'col-md-4', 
                                                  fontAwesomeIcon: 'fa fa-level-up',
                                                  title: 'Drag control from here : '
                                                },
                                                {
                                                  WhenIndex: 1,
                                                  ApplycssClass: 'col-md-8', 
                                                  fontAwesomeIcon: 'fa fa-level-down',
                                                  title: 'Drop control into here : '
                                                }
                                              ],
                                verboseMode : false
                            },
          containerConfig : {
                                decoration :    [
                                                  {
                                                    WhenIndex     : 0,
                                                    ApplycssClass : 'col-md-12', 
                                                    title         : 'Blank : ',
                                                    groupId       : 'blank',
                                                    isCollapsed   : true 
                                                  },                                
                                                  {
                                                    WhenIndex     : 1,
                                                    ApplycssClass : 'col-md-12', 
                                                    title         : 'Headers : ',
                                                    groupId       : 'headers',
                                                    isCollapsed   : true 
                                                  },
                                                  {
                                                    WhenIndex     : 2,
                                                    ApplycssClass : 'col-md-12', 
                                                    title         : 'Text inputs : ',
                                                    groupId       : 'inputs' ,
                                                    isCollapsed   : true
                                                  },
                                                  {
                                                    WhenIndex     : 3,
                                                    ApplycssClass : 'col-md-12',
                                                    title         : 'Textareas : ',
                                                    groupId       : 'textareas',
                                                    isCollapsed   : true 
                                                  },
                                                  {
                                                    WhenIndex     : 4,
                                                    ApplycssClass : 'col-md-12',
                                                    title         : 'Radios : ',
                                                    groupId       : 'radios',
                                                    isCollapsed   : true 
                                                  },
                                                  {
                                                    WhenIndex     : 5,
                                                    ApplycssClass : 'col-md-12',
                                                    title         : 'Checkboxes : ',
                                                    groupId       : 'checkboxes',
                                                    isCollapsed   : true 
                                                  },
                                                  {
                                                    WhenIndex     : 6,
                                                    ApplycssClass : 'col-md-12',
                                                    title         : 'Selects : ',
                                                    groupId       : 'selects',
                                                    isCollapsed   : true 
                                                  } 
                                                ],

                                verboseMode     : false, 
                                collapseEnabled : true,
                                collapseCtrl    : [
                                                    {
                                                      atIndex : 0,
                                                      collapse : true
                                                    },
                                                    {
                                                      atIndex : 1,
                                                      collapse : true
                                                    }
                                                  ]                                                                  
                            },
          itemConfig    :   {
                              verboseMode : false, 
                            }                  
                                  };  
      /**
       * drag and drop presentation model
       *
       * conatain all draggaable items 
       */
      var _dragDropPresentationModel = [
                                          //1 column here is control selection column
                                          [],
                                          [
                                            //empty 1st line at initialisation
                                            []
                                          ]
                                       ];

      var _itemsNotToCountFoReal = {
                                      //placeholder :         '',
                                      itemBeingDragged :    ''
                                   };
      /**
       * setListItemCssClass : to use in app.config
       * -> if need to overrides/modify "_defaultDragDropItemCssClasses"
       */
      this.setListItemCssClass = function(fromConfig){
                                _listDragDropItemCssClasses = [].concat(fromConfig);
                                };            
      
      this.getItemsNotTocount = function(){
                                return _itemsNotToCountFoReal;
                                };          
      
      this.setItemsNotTocount = function(fromConfig){
                                _itemsNotToCountFoReal = angular.copy(fromConfig);
                                };

      
      this.addControlToDragDropPresentationModel = function(controlToAdd, groupToAdd){
                                                      if (typeof controlToAdd !== 'undefined' &&
                                                          typeof groupToAdd   !== 'undefined') {
                                                        addToGroupControl(controlToAdd, groupToAdd);
                                                      }
                                                    };

      this.getDragDropPresentationModel = function(){
                                            /**
                                             * 
                                             */
                                            return _dragDropPresentationModel;
                                          };

      this.$get = [

        function(){
    
          var Service = {};

          Service.getListItemCssClass = function(){                                               
                                        return _listDragDropItemCssClasses;
                                        };
          /**
           * when counting items in a line : need to skip placeholder and hidden dragging source
           * to get the right css to apply visible items
           */
          Service.getItemsNotToCount = function(){
                                      return _itemsNotToCountFoReal;
                                      }; 
         
          /**
           * return css class to apply depending numberOfItems (in line) as input param                 
           */
          Service.getItemCssDependingNumberItemsInRow =  function(numberOfItems){
                                                          if(typeof numberOfItems !== 'undefined'){
                                                            var classToReturn = '';
                                                            for (var  i = _listDragDropItemCssClasses.length - 1; 
                                                                      i >= 0; 
                                                                      i--) {
                                                              if (_listDragDropItemCssClasses[i].numberItemPerRow === numberOfItems) {
                                                                classToReturn = _listDragDropItemCssClasses[i].cssClass;  
                                                              }
                                                            }
                                                            return classToReturn;
                                                          }else{
                                                            return '';
                                                          }     
                                                          };                                          
               
          Service.getDistinctItemCssClass = function(){
                                              var distinctCssClass = [];
                                              angular.forEach(_listDragDropItemCssClasses, function(valueRef){

                                                var cssClassRef = valueRef.cssClass;

                                                if (distinctCssClass.length === 0){
                                                  distinctCssClass.push(cssClassRef);
                                                } else {
                                                  var canAdd = true;

                                                  angular.forEach(distinctCssClass, function(valueProc){
                                                    var cssClassProc = valueProc;

                                                    if (cssClassRef === cssClassProc) {
                                                      canAdd = false;
                                                    }

                                                  });

                                                  if (canAdd) distinctCssClass.push(cssClassRef);
                                                }

                                              });
                                              return distinctCssClass;
                                            };
          Service.getDragDropConfigModel = function(){
                                              /**
                                               * 
                                               */
                                              return _dragDropConfigModel;
                                            };

          Service.setDragDropConfigContainerDecorationCollapse = function(dragDropConfigModel, indexValue, isCollapsedBool){
                                                                    if (typeof indexValue       !== 'undefined' &&
                                                                        typeof isCollapsedBool  !== 'undefined') {

                                                                      if (indexValue === parseInt(indexValue, 10)) {
                                                                        dragDropConfigModel.containerConfig.decoration[indexValue].isCollapsed = isCollapsedBool;
                                                                      }

                                                                    }
                                                                    return true;
                                                                  };

          Service.getDragDropPresentationModel = function(){
                                                  /**
                                                   * 
                                                   */
                                                   return _dragDropPresentationModel;
                                                 };

          return Service;
        } 
      ];

      /**
       * addToGroupControl : add control to _dragDropPresentationModel
       * @param {[type]} thisControl : control to add
       * @param {[type]} thisGroup   : groupId wher this control should be added
       *
       * NOTE : if _dragDropPresentationModel wrong initialized it will create list of group conforming to 
       * configModel
       */
      function addToGroupControl(thisControl, thisGroup){
        /**
         * search group if already exists
         */
        if (_dragDropPresentationModel[0].length > 0) {

          /**
           * case when _dragDropConfigModel.containerConfig.decoration.length is > to _dragDropPresentationModel[0].length
           *
           * for instance : initialization _dragDropPresentationModel[0] in between
           */
          if (_dragDropPresentationModel[0].length < _dragDropConfigModel.containerConfig.decoration.length) {
            var missingGroupNumber = _dragDropConfigModel.containerConfig.decoration.length - _dragDropPresentationModel[0].length;

            for (var i = 0; i < missingGroupNumber; i++) {
              _dragDropPresentationModel[0].push([]);
            }

          }
          /**
           * push control to right index 
           * (deduced by _dragDropConfigModel.containerConfig.decoration.WhenIndex value for groupId === thisGroup)
           */
           _dragDropConfigModel.containerConfig.decoration.forEach(function(groupConfig){
            if (thisGroup.addToGroupCtrl === groupConfig.groupId) {
              _dragDropPresentationModel[0][groupConfig.WhenIndex].push(thisControl);
            }
           });

        }else{
          /**
           * no group no control
           *
           * initialize _dragDropConfigModel.containerConfig.decoration list
           */
          _dragDropConfigModel.containerConfig.decoration.forEach(function(){
            _dragDropPresentationModel[0].push([]);
          });

          /**
           * push control to right index 
           * (deduced by _dragDropConfigModel.containerConfig.decoration.WhenIndex value for groupId === thisGroup)
           */
           _dragDropConfigModel.containerConfig.decoration.forEach(function(groupConfig){
            if (thisGroup.addToGroupCtrl === groupConfig.groupId) {
              _dragDropPresentationModel[0][groupConfig.WhenIndex].push(thisControl);
            }
           }); 
          
        }
      }      
}]);
/**
 *  ------------------------------------------------------
 *  provider : EasyFormGenFormlyBindingModels
 *  ------------------------------------------------------
 *
 *  configure all related to bing model (easy form generator - formly)
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/ 
angular
	.module('edaApp.providers.EasyFormGenFormlyBindingModels', [])
	.provider('EasyFormGenFormlyBindingModels', [

	function(){ 
	 
		/** 
		 * define all controls easy form genearator will manage
		 */
		var _easyFormListControls =	{
												/**
												 * easyFormGenerator (no drag drop version) need this array in 
												 * the modal when adding control to row. 
												 *
												 * drag drop version need this in control editor
												 * 
												 * works in, pair with formlyProvider in case of special 
												 * control like 'RichTextEditor'
												 *
												 */
												//control array should be like :
												//	controls: [				
												// 	{
												// 		id 								: 'TextInput',  
												// 		name 							: 'Text input', 
												// 		subtitle 					: 'Text input', 
												// 		group 						: 'input', 
												// 		formlyType 				: 'input', 
												// 		formlySubtype 		: '', 
												// 		formlyLabel 			: '', 
												// 		formlyRequired 		: false, 
												// 		formlyDesciption 	: '', 
												// 		formlyOptions 		: []
												// 	},	
												// {
												// 		id 								: 'Password',  
												// 		name 							: 'Password', 
												// 		subtitle 					: 'Password', 
												// 		group 						: 'input', 
												// 		formlyType 				: 'input', 
												// 		formlySubtype 		: 'password', 
												// 		formlyLabel 			: '', 
												// 		formlyRequired 		: false, 
												// 		formlyDesciption 	: '', 
												// 		formlyOptions 		: []
												// }
												// 											
												// 																						
												//	] 													
	                    	controls : [],

	                      selectedControl : 'none' ,
	                      temporyConfig : {
	                                        selectedControl		: 'none',
	                                        formlyLabel				: 'label',  
	                                        formlyRequired		: false, 
	                                        formlyDesciption	: '',
	                                        formlyPlaceholder	: '',
	                                        formlyOptions 		: []
	                                      } 
		};


		var _easyFormEmptyConfigurationLineModel =                                 			
	            {
	              line 					: 1,                                       
	              activeColumn 	: 1,
	              columns 			: [
	                                {  
	                                  numColumn 	: 1,
	                                  exist 			:true, 
	                                  control 		: {
	                                                  type:'none',
	                                                  key: 'none',
	                                                  // templateOptions: {
	                                                  //                     label: 'none',
	                                                  //                     placeholder: 'none',
	                                                  //                     required: false,
	                                                  //                     description: 'Descriptive text'
	                                                  //                   }
	                                                }
	                                  }
	                               ]
	             }                                 
	        ;
	    var _emptyControlFieldModel = {
	                                  control 		: {
	                                                  type:'none',
	                                                  key: 'none',
	                                                }	    	
	    };
		/**
		 * formly field model (back model = configuration model)
		 * at initial state (1 line empty)
		 *
		 * If need a configuration before loading from database 
		 * or loading from saved object better use _easyFormReloadConfigurationModel 
		 */
		var _easyFormInitialStateConfigurationModel =  {                                
	    /**
	     * commun all easy form generator ways	
	     */
	    submitButtonText 	: 'submit',
	    cancelButtonText 	: 'cancel',
	    lines : [].concat(_easyFormEmptyConfigurationLineModel)
    };

    var _easyFormInitialStateConfigurationModelAddOnForStepWay = {
			/**
			 * specific easy form generator — step way — (not drag and drop way), needed for wizard management
			 */
	    activeLine 			: 1,   
	    listConfigStep 	: [
	                        'init',
	                        'first',
	                        'second',
	                        'third'
	                  		],
	    stepIndicators 	: [
	                        true,
	                        false,
	                        false,
	                        false
	                      ], 
	    configStepCounter : 0,     	
    };	


    var _easyFormReloadConfigurationModel =  {                                
	    /**
	     * commun all easy form generator ways	
	     *
	     * this model when loading as initial state 
	     * -> when then loading a previous configuration
	     * i.e. : loading from database
	     *
	     * If need a model for intitial state (without loadin data)
	     * better use _easyFormInitialStateConfigurationModel
	     */
	    submitButtonText 	: 'submit',
	    cancelButtonText 	: 'cancel',
	    lines : []
    };

    var _headerTemplates = 	{
    													cssClass 		: ['col-xs-12', 'col-xs-6', 'col-xs-4'],
    													textContent : '',
															
    													html_part1 	: [
		                                          //'<div class="row">',
		                                          '  <div class="',

		                                         ].join(''),
															selectedClass : '',
															html_part2 	: [
																							'">',
		                                          '    <h2 class="text-center">'																							
																						].join(''),							 
		                          html_part3  : this.textContent,
		                          html_part4 	:  [ 
		                                          '    <h2>',
		                                          '    <hr/>',
		                                          '  </div>',
		                                          //'</div>'
		                                         ].join(''),
																						 
															simpleHtml1 : 	[
																							'<h2 class="text-center">'
																							].join(''),
															simpleHtml2 : 	[
		                                          '    <h2>',
		                                          '    <hr/>',																
																							].join('')						 
    												};

    var _formlyControlTemplates =	{
		                                className : ['col-xs-12', 'col-xs-6', 'col-xs-4'],
		                                type      : '',
		                                key       : '',
		                                templateOptions: {
		                                    type        : '',
		                                    label       : '',
		                                    required    : '',
		                                    placeholder : '',
		                                    description : '',
		                                    options     : ''    
		                                }
		                              };

		var _particularControlProperties = 	[
																					{
																						controlType 	: 'datepicker',
																						properties 		: [	
																															{	
																																isRoot  					: false, 
																																isTemplateOptions : true, 
																																value 						: 'datepickerPopup'
																															}
																														]
																					}
																				];



		this.getAllParticularControlProperties = function(){
			/**
			 * 
			 */
			return _particularControlProperties;
		};

		this.addParticularControlProperties = function(newParticularControlProperty){
			/**
			 * test object param has waited properties
			 */
			if (('controlType' 	in newParticularControlProperty) &&
					('properties' 	in newParticularControlProperty)) {
				/**
				 * test controlType does not already exists
				 *
				 * here will update properties (correponding controlType) if already exists
				 */
				var isAnUpdate = false;
				if ( _particularControlProperties.length > 0 ) {

					_particularControlProperties.forEach(function(controlProp){

						if (controlProp.controlType === newParticularControlProperty.controlType) {
							controlProp.properties = [].concat(newParticularControlProperty.properties);
							isAnUpdate = true;
						}	
							
					});
				}
				/**
				 * it is no update so ; add newParticularControlProperty
				 */
				if (!isAnUpdate) {

					_particularControlProperties.push(newParticularControlProperty);

				}
				
			}

			return _particularControlProperties;			
		};





		this.getEasyFormListControls = function(){
			/**
			 * 
			 */
			return _easyFormListControls;
		};

		this.addEasyFormControlToList = function(controlDeclaration){
			if (typeof controlDeclaration !== 'undefined'){
				_easyFormListControls.controls.push(controlDeclaration);
			}
		};



		this.getHeaderTemplates = function(){
			/**
			 * 
			 */
			return _headerTemplates;
		};

		this.addHeaderTemplateCssClass = function(cssClassToAdd){
			if (typeof cssClassToAdd !== 'undefined') {
				_headerTemplates.cssClass.push(cssClassToAdd);
			}
		};





		this.getFormlyControlTemplate = function(){
			/**
			 * 
			 */
			return _formlyControlTemplates;
		};

		this.addformlyControlTemplatesCssClass = function(cssClassToAdd){
			if (typeof cssClassToAdd !== 'undefined') {
				_formlyControlTemplates.className.push(cssClassToAdd);
			}
		};
		/**
		 * setFormlyControlTemplate : overrides ControlTemplate
		 */
		this.setFormlyControlTemplate  = function(newFormlyControlTemplate){
			/**
			 * test object param has minimum waited properties
			 */
			if (('className'				in newFormlyControlTemplate) &&
					('type' 						in newFormlyControlTemplate) &&
					('key' 							in newFormlyControlTemplate) &&
					('templateOptions') in newFormlyControlTemplate) {
				_formlyControlTemplates = angular.copy(newFormlyControlTemplate);
			}
			return true;
		};

		/**
		 * TODO : add an extend properties method to _formlyControlTemplates
		 */
		
		this.$get =	[

			function(){
				var Service = {};

				Service.getEasyFormListControls = function(){
					return _easyFormListControls;
				};
				/**
				 * getEasyFormInitialStateConfigurationModel : get configuration model 
				 * (back model equivalent to formly field model) at "initial state = 1 empty line"
				 * 
				 * @param  bool addStepWayProperties  : add or not properties specefic to easy form generator step way
				 * @return object  configuration model
				 */
				Service.getEasyFormInitialStateConfigurationModel = function(addStepWayProperties){
					var initialConfigurationModel = angular.copy(_easyFormInitialStateConfigurationModel);
					if (typeof addStepWayProperties !== 'undefined') {
						if (addStepWayProperties) {
							/**
							 * add properties specific to step way
							 */
							angular.extend(initialConfigurationModel, _easyFormInitialStateConfigurationModelAddOnForStepWay);
						}
					}
					return initialConfigurationModel;
				};
				/**
				 * getEasyFormInitialStateConfigurationModel : get configuration model 
				 * (back model equivalent to formly field model) at "initial state = 0 line"
				 * => good model to load a previous saved into it (just load lines and buttons names then)
				 * 
				 * @param  bool addStepWayProperties  : add or not properties specefic to easy form generator step way
				 * @return object  configuration model
				 */
				Service.getEasyFormReloadConfigurationModel = function(addStepWayProperties){
					var initialConfigurationModel = angular.copy(_easyFormReloadConfigurationModel);
					if (typeof addStepWayProperties !== 'undefined') {
						if (addStepWayProperties) {
							/**
							 * add properties specific to step way
							 */
							angular.extend(initialConfigurationModel, _easyFormInitialStateConfigurationModelAddOnForStepWay);
						}
					}
					return initialConfigurationModel;
				};

				/**
				 * getEasyFormEmptyConfigurationLineModel to get "empty line model template"
				 * NOTE : "empty line" means no control in this line
				 */
				Service.getEasyFormEmptyConfigurationLineModel = function(){
					return _easyFormEmptyConfigurationLineModel;
				};

				/**
				 * get an empty control model from coniguration model
				 */
				 Service.getEasyFormConfigurationEmptyControlModel = function(){
				 	return _emptyControlFieldModel;
				 };

				/**
				 *
				 *
				 * 
				 * TODO : helpers to improve "formfielManage Service"
				 *
				 * - objective it to replace Add N ColumnControl methods
				 * 
				 */

				/**
				 * getRawHeaderTemplates : return full headerTemplates object
				 *
				 * better use getHeaderTemplateForNcolumnLine to return a particular header template
				 */
				Service.getRawHeaderTemplates = function(){
					/**
					 * 
					 */
					return _headerTemplates;
				};
				/**
				 * [getHeaderTemplateForNcolumnLine : return a particular header template depending n columns in lines
				 * @param   nbColInLines : an integer reflecting numbers of column template
				 * @param   textContent  : header's text
				 * @return  an headerTemplate object
				 */
				Service.getHeaderTemplateForNcolumnLine = function(nbColInLines, textContent){
					if (typeof nbColInLines !== 'undefined' &&
							typeof textContent 	!== 'undefined') {

						if (nbColInLines === parseInt(nbColInLines, 10)) {

							if (nbColInLines <=  _headerTemplates.cssClass.length) {
							
					    	var headerToReturn = {};
					    	headerToReturn.className = _headerTemplates.cssClass[nbColInLines - 1];
					    	/**
					    	 * header html property depends this property dont forget to set it before reading html property
					    	 */
					    	_headerTemplates.textContent = textContent;
								_headerTemplates.selectedClass = headerToReturn.className;

					    	// headerToReturn.template = [
					    	// 														_headerTemplates.html_part1,
								// 														_headerTemplates.selectedClass,
								// 														_headerTemplates.html_part2,
					    	// 														textContent,
					    	// 														_headerTemplates.html_part4
					    	// 													].join('');

					    	headerToReturn.template = [
					    															_headerTemplates.simpleHtml1,
					    															textContent,
					    															_headerTemplates.simpleHtml2
					    														].join('');

					    	return headerToReturn;
				    	}

						}
					}
				};





				/**
				 * getRawFormlyControlTemplates : return full generic control templates object
				 *
				 * better use getFormlyControlTemplateForNcolumnLine to return a particular control template
				 */
				Service.getRawFormlyControlTemplates = function(){
					return _formlyControlTemplates;
				};
				/**
				 * [getFormlyControlTemplateForNcolumnLine : return a particular control template depending n columns in lines
				 * @param   nbColInLines : an integer reflecting numbers of column template
				 * @return  an empty generic control template object
				 */
				Service.getFormlyControlTemplateForNcolumnLine = function(nbColInLines, controlType){
					if (typeof nbColInLines !== 'undefined') {

						if (nbColInLines === parseInt(nbColInLines, 10)) {
							if (nbColInLines <=  _formlyControlTemplates.className.length) {

								var controlToReturn = angular.copy(_formlyControlTemplates);
								controlToReturn.className = _formlyControlTemplates.className[nbColInLines - 1];
								/**
								 * check controlType: it may require another particular property
								 */
								if (typeof controlType !== 'undefined') {

									_particularControlProperties.forEach(function(controlProp){

										if (controlProp.controlType === controlType) {
											/**
											 * add all properties this controlType has
											 * 
											 * NOTE : dot expression and bracket expression to access object property
											 * http://www.ecma-international.org/ecma-262/5.1/#sec-11.2.1
											 */										
											controlProp.properties.forEach(function(aPropToAdd){

												if (aPropToAdd.isRoot) controlToReturn[aPropToAdd.value] = '';
												if (aPropToAdd.isTemplateOptions) controlToReturn.templateOptions[aPropToAdd.value] = '';
												
											});

										}	
											
									});
								}

					    	return controlToReturn;
				    	}
						}
					}
				};
	
				return Service;

			}

		];	
		
	}]);
/**
 *  ------------------------------------------------------
 *  module = "providers" container
 *  ------------------------------------------------------
 *      Syntax (convention) :
 *          "edaApp" = application
 *          "edaApp.providers" = container services module
 *
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

angular
	.module('edaApp.providers', [	'edaApp.providers.dragDropConfigProvider',
																'edaApp.providers.EasyFormGenFormlyBindingModels', 
	function () {
	
	}]);

/**
 *  ------------------------------------------------------
 *  module = "controllers" container
 *  ------------------------------------------------------
 *
 *  This module is a container -> it must be injected in the application -> so it will inject all controllers injected here
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
	.module('edaApp.controllers', [	'edaApp.controllers.edaMainController',
																	'edaApp.controllers.edaEditController',
																	'edaApp.controllers.edaEditMODALController',
																	'edaApp.controllers.edaEditPanelController',							
	]);

/**
 *  ------------------------------------------------------
 *   edaEditController
 *  ------------------------------------------------------ 
 *
 * main controller for viewing / editing / managing forms
 *
 *
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
 */ 
angular
  .module('edaApp.controllers.edaEditController', [])
  .controller('edaEditController', [	'$scope', 
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
                                        'ddItemRightClickedManager',
  function (	$scope, 
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
              ddItemRightClickedManager) {



  /**
   * versionning
   */
  
  $scope.easyFormGeneratorVERSION = easyFormGenVersion;

  /**
   * tab managment
   */
  $scope.tab =  {
                  editTab : {active : true},
                  previewTab : {active : false},
                };


  /**
   * formly models
   */
  $scope.vm = this;
  /**
   * model filled by form :
   */
  $scope.vm.model = {};
  /**
   * form schema : 
   * (filled from $scope.configuration on drag an drop events)
   */
  $scope.vm.wfFormFields = [];
  /**
   * wfFormFieldsOnlyNeededProperties : formly field model 
   * (clean model : just needed properties
   *   -> that on is not bound to angular formly 
   *   -> could be saved to database
   * )
   */
  $scope.vm.wfFormFieldsOnlyNeededProperties = []; 

  /**
   * preview tab : manage collapse/expend states
   */
  $scope.ihm = {
                  preview : {
                                formlyModelViewExpanded : true,
                                formlyFieldsViewExpanded : true,
                                customizeFormButtonsExpanded : true,
                                saveThisFormExpanded : true  
                            }

  };


  /**
   * easyFormDragDropProperties : configure drag and drop apearance
   *
   * — see dragDropConfig provider —
   */
  $scope.easyFormDragDropProperties = dragDropConfig.getDragDropConfigModel();
  /**
   * dragDropModel : darg drop presentation model
   *
   * manage drag and drop UI : drag and drops events will change it then change configuration model
   */
  $scope.dragDropModel = [].concat(dragDropConfig.getDragDropPresentationModel());

  //console.dir(  {'dragDropModel' : $scope.dragDropModel});


 
   //column ref                         
   $scope.numberOfColumns = 1;
   $scope.MaxNumberOfColumns = 3;
   $scope.MinNumberOfColumns = 1;


  ///////////////////////////////////////////////////////////////////////////////////
  // configuration model (contains array of lines which contains array of columns)
  ///////////////////////////////////////////////////////////////////////////////////
  $scope.configuration = {};
  /**
   * formFieldManage.initConfigurationEditFromScratch(_OBJECT TO INIT_, _BOOL ADD STEP WAY PROPERTIES_)
   */
  formFieldManage.initConfigurationEditFromScratch($scope.configuration , false);
  
  // var testModel =  [
  //                   {
  //                       "line": 1,
  //                       "activeColumn": 1,
  //                       "columns": [
  //                           {
  //                               "numColumn": 1,
  //                               "exist": true,
  //                               "control": {
  //                                   "className": "col-xs-12",
  //                                   "type": "header",
  //                                   "key": "",
  //                                   "templateOptions": {
  //                                       "label": "",
  //                                       "required": false,
  //                                       "description": "Welcome",
  //                                       "placeholder": "",
  //                                       "options": [
  //                           ],
  //                                       "type": ""
  //                                   },
  //                                   "selectedControl": "Header",
  //                                   "subtype": "",
  //                                   "cssClass": "col-xs-12",
  //                                   "edited": true
  //                               }
  //               }
  //           ]
  //       },
  //                   {
  //                       "line": 2,
  //                       "activeColumn": 1,
  //                       "columns": [
  //                           {
  //                               "numColumn": 1,
  //                               "exist": true,
  //                               "control": {
  //                                   "className": "col-xs-12",
  //                                   "type": "subTitle",
  //                                   "key": "",
  //                                   "templateOptions": {
  //                                       "label": "",
  //                                       "required": false,
  //                                       "description": "Hello",
  //                                       "placeholder": "",
  //                                       "options": [
  //                           ],
  //                                       "type": ""
  //                                   },
  //                                   "selectedControl": "Subtitle",
  //                                   "subtype": "",
  //                                   "edited": true
  //                               }
  //               }
  //           ]
  //       }
  //   ];
  // /**
  //  * TODO to bind model from saved one
  //  * from @krupak :fixing loading model bug
  //  */
  // formFieldManage.bindConfigurationLines($scope.configuration, testModel, false);
  // formFieldManage.applyConfigurationToformlyModel(  
  //                                                   $scope.configuration, 
  //                                                   $scope.vm.wfFormFields, 
  //                                                   $scope.vm.model
  //                                                 );                   
  // $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);
  // ddModelConfModelProxyService.loadDragDropModelFromConfigurationModel( 
  //                                                   $scope.configuration, 
  //                                                   $scope.dragDropModel
  //                                                   );   
  // 
  
  
  
  
  
  
  
  
  //need to bind dragdrop model now
  
  
  /**
   * init proxyModel 
   * (object shared between this controller and edit panel controlelr)
   */
  controllerModalProxy.initProxyModel();
  /**
   * collapse all other group of draggable controls : when a group control expands
   */
  $scope.collapseAllGroupControl = function(allExceptThisGroupIndex){
    
    angular.forEach($scope.easyFormDragDropProperties.containerConfig.decoration, function(value){
      if (value.WhenIndex !== allExceptThisGroupIndex) {
          dragDropConfig.setDragDropConfigContainerDecorationCollapse($scope.easyFormDragDropProperties, value.WhenIndex, true);
      }
    });
    
  };



  $scope.vm.onSubmit = onSubmit;
  
  function onSubmit() {
  
       toaster.pop({
            type: 'info',
            timeout:2000,
            title: 'should save data model if it were not a static example',
            body: 'data :' + $filter('json')($scope.vm.model, 4),                
            showCloseButton: true
      }); 
  }



  // /**
  //  * init formly control list
  //  */
  // //needed for select : list all existing forms
  // $scope.loadExistingFormsList = loadExistingFormsAsList();


  // function loadExistingFormsAsList(){
  //   //If it were not a static html, it should call server to retrieve data from database :
  //   // $scope.formlyList = formsByIdService.query();  
  // }

  // //load on init
  // loadExistingFormsAsList();

  // $scope.previewLoadedForm = {fieldsModel:[]};
  // $scope.configurationLoaded = {};

  // $scope.previewExistingform = function(formlyform){

  //  var configlines = JSON.parse(formlyform.formlyField);
  //  //here to replace with $scope.configuration : initialise configuration with lines 
  //  $scope.configurationLoaded = {};
  //  formFieldManage.bindConfigurationLines($scope.configurationLoaded,configlines);

  //  formFieldManage.applyConfigurationToformlyModel($scope.configurationLoaded, $scope.previewLoadedForm.fieldsModel, $scope.vm.model);

  //  $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);

  //  $scope.previewLoadedForm.cancelButtonText = formlyform.cancelButtonText;
  //  $scope.previewLoadedForm.submitButtonText = formlyform.submitButtonText;
  // };






  //init number of configuration lines
  $scope.resetToZeroModel = function(){
     $scope.configuration.activeLine = 1;

     if ($scope.configuration.lines.length > 1) {
        $scope.configuration.lines.splice(1, $scope.configuration.lines.length - 2);
     }
     return $scope.countConfigurationModelLines();
  };  







  //return count configuration lines
  $scope.countConfigurationModelLines = function(){
  	return $scope.configuration.lines.length;
  };    
  //switch to line
  $scope.setActiveLineNumber = function(lineNumber){
  	if (lineNumber <= $scope.countConfigurationModelLines()) {
  		$scope.configuration.activeLine = lineNumber;
  	}
  };                

  $scope.upThisLine = function(indexLine){  	
  	if (indexLine > -1) {
  			if ($scope.configuration.lines[indexLine - 1]) {
  				var currentLineObj = $scope.configuration.lines[indexLine];
  				$scope.configuration.lines.splice(indexLine , 1);
  				$scope.configuration.lines.splice((indexLine - 1), 0, currentLineObj);  	
          //manage selected aciveLine
          $scope.configuration.activeLine = 1;
  			}
  	}
      //re-render formfield 
    formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);

    $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);     
  };


  $scope.downThisLine = function(indexLine){
  	if (indexLine > -1) {
  			if ($scope.configuration.lines[indexLine + 1]) {
  				var currentLineObj = $scope.configuration.lines[indexLine];
  				$scope.configuration.lines.splice(indexLine , 1);
  				$scope.configuration.lines.splice((indexLine + 1), 0, currentLineObj);  
          //manage selected aciveLine
          $scope.configuration.activeLine = 1;
  			}
      }     
      //re-render formfield 
    formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model); 
    $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);   
  };



  //must be remove a line with index of line to delete
  $scope.removeThisLine = function(index){
  	if (index > -1) {
  		if ($scope.configuration.lines.length > 1) {
          //manage selected aciveLine
          if ($scope.configuration.activeLine === index + 1) {
            $scope.configuration.activeLine = 1;
          }
  	  		$scope.configuration.lines.splice(index, 1);
  		}else{
  	  		$timeout(function(){
  		        toaster.pop({
  		                type: 'warning',
  		                title: 'Last line' ,
  		                body: 'Can\'t delete the last line',                
  		                showCloseButton: true
  			        });
  		    }, 100); 
  		}

    //re-render formfield 
    formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);
    $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);
  	}
  };





  $scope.increaseNumberOfColumns = function(){

    if ($scope.configuration.lines[$scope.configuration.activeLine -1].columns.length < $scope.MaxNumberOfColumns) {
  	var newNumberOfColumns = $scope.configuration.lines[$scope.configuration.activeLine -1].columns.push(
          																				{
          														                            numColumn: -1,
          														                            exist: true, 
          														                            control: {
          														                                        type:'none',
          														                                        key: 'none'
          														                                      }                                         
          																				 }																				
  																				);
  	
  	 $scope.configuration.lines[$scope.configuration.activeLine -1].columns[newNumberOfColumns - 1].numColumn = newNumberOfColumns; 
  }
     //re-render formfield 
    formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model); 

    $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);
};


  $scope.decreaseNumberOfColumns = function(indexLine, indexColumn){
  	if ($scope.configuration.lines[$scope.configuration.activeLine -1].columns.length > 1) {
  		$scope.configuration.lines[$scope.configuration.activeLine -1].columns.splice($scope.configuration.lines[$scope.configuration.activeLine -1].columns.length -1, 1);
  	}
    //re-render formfield 
    formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);  

    $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);  
  };













  ////////////////////////////////////////////////////////////
  //             porperties control (STEP 3)
  ////////////////////////////////////////////////////////////

  $scope.saveThisForm = function(){
    if (typeof $scope.configuration.formName === 'undefined') {
    toaster.pop({
            type: 'warning',
            timeout:2000,
            title: 'Form name is undefined',
            body: 'Form has not been saved.',                
            showCloseButton: true
      });
      return false;
    }

    if ($scope.configuration.formName === '') {
    toaster.pop({
            type: 'warning',
            timeout:2000,
            title: 'Form name is required',
            body: 'Form has not been saved.',                
            showCloseButton: true
      });
      return false;
    }
    /**
     * [type description]
     * @type {String}
     */
    toaster.pop({
            type: 'wait',
            timeout:10000,
            title: 'Form is being saved',
            body: 'Wait.',                
            showCloseButton: true
      });

//       var wfForm = new formsByIdService();
//       var formSavingIsOK = true;
// 
//       wfForm.formName = $scope.configuration.formName;
//       wfForm.submitButtonText = $scope.configuration.submitButtonText;
//       wfForm.cancelButtonText = $scope.configuration.cancelButtonText;
// 
//       wfForm.formlyField = JSON.stringify($scope.configuration.lines); 

      // save to database here 
      // wfForm.$save()
      //             .then(function(res)  {    formSavingIsOK = true;    })
      //             .catch(function(req) { 
      //                                   toaster.clear();
      //                                   formSavingIsOK = false; 
      //                                   toaster.pop({
      //                                           type: 'error',
      //                                           timeout:2000,
      //                                           title: 'Error while saving form',
      //                                           body: 'Sorry, an Error occured while saving form.',                
      //                                           showCloseButton: true
      //                                     });
      //             })
      //             .finally(function()  { 
      //                                   if (formSavingIsOK === true) {
      //                                     toaster.clear();  
      //                                     toaster.pop({
      //                                             type: 'success',
      //                                             timeout:2000,
      //                                             title: 'Form is successfully saved',
      //                                             body: '',                
      //                                             showCloseButton: true
      //                                       });                                         
      //                                   }
      //              });

      toaster.clear();  
      toaster.pop({
              type: 'info',
              timeout:2000,
              title: 'Form would be saved if it were not a static example',
              body: '',                
              showCloseButton: true
        }); 
      return true;
  };



  ////////////////////////////////////////////////////////////
  //            modal : add control to column
  ////////////////////////////////////////////////////////////

  $scope.nyaSelect = {};
  controllerModalProxy.initNyaSelect($scope.nyaSelect);

  $scope.animationsEnabled = true; 

  $scope.showModalAddCtrlToColumn = function (size, indexLine, numcolumn) {

    var modalInstance = $modal.open({
                                      animation: $scope.animationsEnabled,
                                      templateUrl: 'editModalTemplate.html', 
                                      controller: 'edaEditMODALController',
                                      size: 'lg',
                                      resolve: {
                                        nyaSelect: function () {
                                          return controllerModalProxy
                                                            .getNyASelectFromSelectedLineColumn(  $scope.nyaSelect, 
                                                                                                  $scope.configuration,
                                                                                                  indexLine, 
                                                                                                  numcolumn
                                                                                                );
                                        }
                                      }
    });


    modalInstance.result.then(function (modalAddCtrlModel) {
        controllerModalProxy.bindConfigurationModelFromModalReturn(indexLine, numcolumn, modalAddCtrlModel, $scope.configuration);
        formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);
        
        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


  /**
   *
   * 
   *   drag and drop : may move from this controller
   *
   *
   * 
   */

 
  //specific Container dragoverCallback event
  $scope.dragoverCallbackContainer = function(parentparentIndex, parentIndex, index){
      //prevent container in layout column to be drag to control select contianer 
      if (index === 0) {
          return false;
      }
      return true;
  };

  $scope.dropCallback = function(event, index, item, external, type, allowedType) {
          
      if (external) {
          if (allowedType === 'itemType'      && !item.label)             return false;
          if (allowedType === 'containerType' && !angular.isArray(item))  return false; 
      }

      /**
      * TODO : update configuration model
      */

      /**
      * set a timeout befire binding
      * since ddModel may not be called when already full updated
      */
      var timerRefreshDDToConfig = $timeout(function(){
        
        $scope.configuration = angular
                                  .copy(ddModelConfModelProxyService
                                          .refreshAllConfigurationFromDragAndDropModel(
                                                                                        $scope.configuration, 
                                                                                        $scope.dragDropModel
                                                                                       )
                                       );
        
        formFieldManage.applyConfigurationToformlyModel(  
                                                          $scope.configuration, 
                                                          $scope.vm.wfFormFields, 
                                                          $scope.vm.model
                                                        );
                                                        
        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);
         
        ddModelConfModelProxyService.refreshControlsKeys( 
                                                          $scope.configuration, 
                                                          $scope.dragDropModel
                                                         );            

      }, 200);

      /**
      * timerRefreshDDToConfig timer destruction
      */
      $scope.$on('$destroy', function(){
            $timeout.cancel(timerRefreshDDToConfig);
        }
      );
      

      return item;
  };



      
  $scope.dndItemMoved = function(parentParentIndex, parentIndex, itemIndex){
    //prevent item from first container to disapear when dropped on other container
    if (parentParentIndex > 0) {
        $scope.dragDropModel[parentParentIndex][parentIndex].splice(itemIndex, 1);
    }
  };

  $scope.dragoverCallbackItems = function(ParentParentIndex, parentIndex, index, external){
        //prevent items in layout column to be drag to control select  
        if (parentIndex === 0) {
            return false;
        }
        return true;
    };


  /**
   * disableItemDropIf prevent dropping on condition
   *
   * TODO : to replace in html : dnd-disable-if="items.length > 2"
   */
  $scope.disableItemDropIf = function(){

  };



  /**
   * [dropCallbackItems description]
   * @param  {[type]} event                   [description]
   * @param  {[type]} index                   [description]
   * @param  {[type]} realIndex               [description]
   * @param  {[type]} parentIndex             [description]
   * @param  {[type]} parentParentIndex       [description]
   * @param  {[type]} parentParentParentIndex [description]
   * @param  {[type]} item                    [description]
   * @param  {[type]} external                [description]
   * @param  {[type]} type                    [description]
   * @param  {[type]} allowedType             [description]
   * @return {[type]}                         [description]
   */
  $scope.dropCallbackItems = function(event, index, realIndex, parentIndex, parentParentIndex, parentParentParentIndex, item, external, type, allowedType){
    
      if (external) {
          if (allowedType === 'itemType' && !item.label) return false;
          if (allowedType === 'containerType' && !angular.isArray(item)) return false; 
      }
    
     /**
      * set a timeout before binding
      * since ddModel may not be called when already full updated
      */
      var timerRefreshDDToConfig = $timeout(function(){
        
        $scope.configuration = angular.copy(ddModelConfModelProxyService
                                                          .refreshAllConfigurationFromDragAndDropModel(
                                                                                                        $scope.configuration, 
                                                                                                        $scope.dragDropModel
                                                                                                      ));
                                                                                                      
        formFieldManage.applyConfigurationToformlyModel(  
                                                            $scope.configuration, 
                                                            $scope.vm.wfFormFields, 
                                                            $scope.vm.model
                                                        );
                                                        
        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields); 
        /**
         * refresh controls key in dragDrop Model
         * to persist already exists controls between refreshes when item drop events
         */
        ddModelConfModelProxyService.refreshControlsKeys( 
                                                          $scope.configuration, 
                                                          $scope.dragDropModel
                                                         );        

      }, 200);

      /**
       * add/set rightCliked property to false
       *
       * will help edaRightClick directive
       */
      ddItemRightClickedManager.setUnRightClicked(item);

      /**
      * timerRefreshDDToConfig timer destruction
      */
      $scope.$on('$destroy', function(){
            $timeout.cancel(timerRefreshDDToConfig);
        }
      );


      return item;
  };



  /**
   * left panel (edit control)
   */
  

  $scope.editPanelModel = {
                            toggle : false
                          };



  $scope.saveFromEditPanel = function(){

        /**
         * TODO : 
         * should be called from edit panel
         *
         * AND
         *
         * should call all these methods
         *
         * need to get  : 
         * 
         * - line index
         * - column index
         * - basicSelectRowCollection (from edpitpanelcontroller)   --> maybe in controllerModalProxy service
         * - groupedSelectRowCollection (from edpitpanelcontroller) --> maybe in controllerModalProxy service
         * - radioRowCollection (from edpitpanelcontroller)         --> maybe in controllerModalProxy service
         */
        
        controllerModalProxy.bindSpecialCtrlTemporyModelsToProxyModel();
    
        //save config to control
        //controllerModalProxy.applyConfigToSelectedControl(self.proxyModel);
        //return current model to parent controller :



        // //update configuration model and formly model
        controllerModalProxy
                .bindConfigurationModelFromProxyModel(  
                                                        controllerModalProxy.getEditPanelModelLineIndex(), 
                                                        controllerModalProxy.getEditPanelModelColumnIndex(), 
                                                        $scope.configuration
                                                      );

        formFieldManage.applyConfigurationToformlyModel(
                                                          $scope.configuration, 
                                                          $scope.vm.wfFormFields, 
                                                          $scope.vm.model
                                                        );
                                                            
        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields); 
        
        ddModelConfModelProxyService.refreshControlsKeys( 
                                                  $scope.configuration, 
                                                  $scope.dragDropModel
                                                  );    
    
        controllerModalProxy.setEditPanelModelToggle(false);
        $scope.editPanelModel.toggle = controllerModalProxy.getEditPanelModelToggle();  
        ddItemRightClickedManager.resetAllDragDropItemSelectedState($scope.dragDropModel);

  };
  /**
   * close side panel
   * -> no update =  cancel
   */
  $scope.closeEditPanel = function(){
    /**
     * reset all rightClicked control properties to false
     */
    ddItemRightClickedManager.resetAllDragDropItemSelectedState($scope.dragDropModel);


    /**
     * TODO : refresh configuration model 
     * uncomment pafter update these next 3 lines
     * 
     * NOTE : indexLine AND  numcolumn should be stored in service and
     * updated when togle sidepanel
     */
   
    //controllerModalProxy.bindConfigurationModelFromProxyModel(indexLine, numcolumn, modalAddCtrlModel, $scope.configuration);
    //formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);    
    //$scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);     
    
    controllerModalProxy.setEditPanelModelToggle(false);
    $scope.editPanelModel.toggle = controllerModalProxy.getEditPanelModelToggle();
    
  };

  $scope.debugProxyModel = controllerModalProxy.ProxyModel;



  $scope.setRightClicked = function(previousState, item){
    item.rightCliked = true;
  };


  $scope.toggleEditPanel = function(event, lineIndex, colIndex, item){
   ddItemRightClickedManager.resetAllDragDropItemSelectedState($scope.dragDropModel);
   /**
    * already opened (could be another control edit)
    */
   if (controllerModalProxy.getEditPanelModelToggle()) {
    /**
     * - immediate close 
     * and 
     * - refresh configuration model + formly model
     */
    controllerModalProxy.setEditPanelModelToggle(false);
    $scope.editPanelModel.toggle = controllerModalProxy.getEditPanelModelToggle(); 
    
    //TODO : for refreshing
    //controllerModalProxy.bindConfigurationModelFromProxyModel(indexLine, numcolumn, modalAddCtrlModel, $scope.configuration);
    //formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);    
    //$scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);    
            


    /**
     * check if new control right clicked otherwise just toggle side panel
     */
    if (typeof controllerModalProxy.getEditPanelModelLineIndex()    !== 'undefined' &&
        typeof controllerModalProxy.getEditPanelModelColumnIndex()  !== 'undefined' &&
        typeof controllerModalProxy.getEditPanelModelControl()      !== 'undefined') {
  
  
      if (controllerModalProxy.getEditPanelModelLineIndex()   === lineIndex &&
          controllerModalProxy.getEditPanelModelColumnIndex() === colIndex  &&
          angular.equals(controllerModalProxy.getEditPanelModelControl(), item)) {
  
          //console.info('already opened for SAME ctrl : so close - no re-open');
        
      }else{
  
          //console.info('already opened for DIFFERENT ctrl : so re-open');

          item.rightCliked = true;
          /**
          * set a timeout before re-opening
          * 500ms is ok for a ps-size="400px"
          */
          var timerCloseOpenedEditPanel = $timeout(function(){
            
           controllerModalProxy.setEditPanelModelLineIndex(lineIndex);
           controllerModalProxy.setEditPanelModelColumnIndex(colIndex);
           controllerModalProxy.setEditPanelModelControl(item);
           
           /**
            * control model passed to Service : controllerModalProxy
            * 
            */
           controllerModalProxy.setProxyModelFromConfigurationSelection(
                                                                        $scope.configuration,
                                                                        lineIndex, 
                                                                        colIndex
                                                                        );
           
           
           controllerModalProxy.setEditPanelModelToggle(true);
           $scope.editPanelModel.toggle = controllerModalProxy.getEditPanelModelToggle();                                         
            
          }, 200);
  
          /**
          * timerCloseOpenedEditPanel timer destruction
          */
          $scope.$on('$destroy', function(){
                $timeout.cancel(timerCloseOpenedEditPanel);
            }
          );
      }
    }
  
   }else{
    /**
     * previous state = closed = immediate open 
     */
     //console.info('NOT already opened : so open');
     item.rightCliked = true;
      
     controllerModalProxy.setEditPanelModelLineIndex(lineIndex);
     controllerModalProxy.setEditPanelModelColumnIndex(colIndex);
     controllerModalProxy.setEditPanelModelControl(item);
     
     /**
      * control model passed to Service : controllerModalProxy
      * 
      */
     controllerModalProxy.setProxyModelFromConfigurationSelection(
                                                                  $scope.configuration,
                                                                  lineIndex, 
                                                                  colIndex
                                                                  );

     
     controllerModalProxy.setEditPanelModelToggle(true);
     $scope.editPanelModel.toggle = controllerModalProxy.getEditPanelModelToggle();
     
   }                       
  };
  // /**
  //  * refreshModels : to call after drag and drop events
  //  */
  // $scope.refreshModels = function(){
  //   $timeout(function(){
  //     console.info('refreshing models');
  //     formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);
  //     $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields); 
  //   }, 10);


  // };



  /**
   * removeThisLine event line deleted
   */
  $scope.removeThisLine = function(lineIndex){
    $scope.dragDropModel[1].splice(lineIndex,1);
  };


  $scope.model = [];

  function addNewline(){
    /**
     * re-render formfield
     *
     * TODO : to fix
     */

    formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);
    $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields); 
  }


  $scope.insertNewLine = function(){
                          addNewline();
                          $scope.dragDropModel[1].push([]);
                          };

}]);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  module = "controllers"  for view "wfEdit"
//  ------------------------------------------------------
//      Syntax (convention) :
//          "edaApp" = application
//          "edaApp.controllers.viewNameController" = controller module
//
//  This module is a view controller -> it must be injected in controller container
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

angular
  .module('edaApp.controllers.edaEditMODALController', [])
  .controller('edaEditMODALController', [	'$scope', 
                                          '$modalInstance',
                                          'nyaSelect',
                                          'toaster' ,
                                          '$timeout',
                                          'selectOptionManage',
                                          'controllerModalProxy',
  function (	$scope, 
              $modalInstance, 
              nyaSelect, 
              toaster,
              $timeout,
              selectOptionManage,
              controllerModalProxy
            ){

  

var initOptionModel = {rows:[
                            ]
                  };

  ////////////////////////////////////////////
  // part : radio
  ///////////////////////////////////////////

  $scope.radioRowCollection = initOptionModel;
  $scope.newOptionRadio = {saisie: ''};


  function bindRadioFromNYA(){
    if ($scope.nyaSelect.temporyConfig.formlyOptions.length > 0) {
      for (var i = 0; i <= $scope.nyaSelect.temporyConfig.formlyOptions.length-1; i++){

            var newOption = { 
                              'option': $scope.nyaSelect.temporyConfig.formlyOptions[i].name,
                              'order': i,
                              'group': ''
                            };
            $scope.radioRowCollection.rows.push(newOption);
      }    
    }
  }

  function bindRadioToNya(){
    var resetNyASelectOptions = [];
    $scope.nyaSelect.temporyConfig.formlyOptions = resetNyASelectOptions;

    if ($scope.radioRowCollection.rows.length > 0) {

      for (var i = 0; i <= $scope.radioRowCollection.rows.length - 1; i++){
            var newOption = {
                              'name': $scope.radioRowCollection.rows[i].option,
                              'value': i,
                              'group': ''
                    };
            $scope.nyaSelect.temporyConfig.formlyOptions.push(newOption);   
        }       
   }
  }

  $scope.addNewOptionRadio = function(){
    var result = selectOptionManage.addNewOptionRadio($scope.radioRowCollection, $scope.newOptionRadio.saisie);
    if (result.resultFlag === false) {
          toaster.pop({
                  type: 'warning',
                  timeout:2000,
                  title: result.details,
                  body: '\''+ $scope.newOptionRadio.saisie + '\'' + ' cannot be added.',                
                  showCloseButton: true
            });
    }
    //reset input
    $scope.newOptionRadio = {saisie: ""};
  };

  $scope.removeRadioRow = function(index) {
      var result = selectOptionManage.removeOption($scope.radioRowCollection, index);
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

  $scope.upThisRadioRow = function(index){
      var result = selectOptionManage.upthisOption($scope.radioRowCollection, index);
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

  $scope.downThisRadioRow = function(index){
      var result = selectOptionManage.downthisOption($scope.radioRowCollection, index);
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



  ////////////////////////////////////////////
  // part : basic Select
  ///////////////////////////////////////////

  $scope.basicSelectRowCollection = initOptionModel;
  $scope.newOptionBasicSelect = {saisie: ""};


  function bindBasicSelectFromNYA(){
    // console.info('bindBasicSelectFromNYA');
    // console.dir($scope.nyaSelect.temporyConfig);

    if ($scope.nyaSelect.temporyConfig.formlyOptions.length > 0) {
      for (var i = 0; i <= $scope.nyaSelect.temporyConfig.formlyOptions.length-1; i++){

            var newOption = {"option": $scope.nyaSelect.temporyConfig.formlyOptions[i].name,
                      "order": i,
                      "group": ""
                    };
            $scope.basicSelectRowCollection.rows.push(newOption);
      }    
    }
  }

  function bindBasicSelectToNya(){
    var resetNyASelectOptions = [];
    $scope.nyaSelect.temporyConfig.formlyOptions = resetNyASelectOptions;
    if ($scope.basicSelectRowCollection.rows.length > 0) {
      for (var i = 0; i <= $scope.basicSelectRowCollection.rows.length - 1; i++){
            var newOption = {"name": $scope.basicSelectRowCollection.rows[i].option,
                      "value": i,
                      "group": ""
                    };
            $scope.nyaSelect.temporyConfig.formlyOptions.push(newOption);
        }      
   }
  }

  $scope.addNewOptionBasicSelect = function(){
    var result = selectOptionManage.addNewOptionBasicSelect($scope.basicSelectRowCollection, $scope.newOptionBasicSelect.saisie);
    if (result.resultFlag === false) {
          toaster.pop({
                  type: 'warning',
                  timeout:2000,
                  title: result.details,
                  body: '\''+ $scope.newOptionBasicSelect.saisie + '\'' + ' cannot be added.',                
                  showCloseButton: true
            });
    }
    //reset input
    $scope.newOptionBasicSelect = {saisie: ""};
  };

  $scope.removeRow = function(index) {
      var result = selectOptionManage.removeOption($scope.basicSelectRowCollection, index);
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

  $scope.upThisRow = function(index){
      var result = selectOptionManage.upthisOption($scope.basicSelectRowCollection, index);
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

  $scope.downThisRow = function(index){
      var result = selectOptionManage.downthisOption($scope.basicSelectRowCollection, index);
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


  ////////////////////////////////////////////
  // part : grouped Select
  ///////////////////////////////////////////

  $scope.groupedSelectRowCollection = initOptionModel;
  $scope.newOptionGroupedSelect = {saisie: ""};

  $scope.GroupedSelectGroups =    {
                                    list:[]
                                  };
  $scope.newGroupGroupedSelect = {saisie: ""};  
  $scope.groupSelectGroupClick = {showList : false};                                


  function bindGroupedSelectFromNYA(){
    if ($scope.nyaSelect.temporyConfig.formlyOptions.length > 0) {
      for (var i = 0; i <= $scope.nyaSelect.temporyConfig.formlyOptions.length-1; i++){
      //for (var i = $scope.nyaSelect.temporyConfig.formlyOptions.length - 1; i >= 0; i--) {

            var newOption = {"option": $scope.nyaSelect.temporyConfig.formlyOptions[i].name,
                      "order": i,
                      "group": $scope.nyaSelect.temporyConfig.formlyOptions[i].group
                    };
            $scope.groupedSelectRowCollection.rows.push(newOption);            
        }
        //grouplist : thx to lodash it is easy
        var filteredgroup = _.uniq(_.pluck($scope.groupedSelectRowCollection.rows, 'group'));
       angular.copy(filteredgroup, $scope.GroupedSelectGroups.list); 
       //console.dir($scope.GroupedSelectGroups.list);

    }
  }

  function bindGroupedSelectToNya(){
    $scope.nyaSelect.temporyConfig.formlyOptions = [];
    for (var i = 0; i <= $scope.groupedSelectRowCollection.rows.length - 1; i++){
          var newOption = {"name": $scope.groupedSelectRowCollection.rows[i].option,
                    "value": i,
                    "group": $scope.groupedSelectRowCollection.rows[i].group
                  };

          $scope.nyaSelect.temporyConfig.formlyOptions.push(newOption);
          
      }
      ///console.log('\n\n\n\n\n');
      //console.dir($scope.nyaSelect.temporyConfig.formlyOptions);
  }  

  $scope.showGroupListToChoose = function(){
    $scope.groupSelectGroupClick.showList = !$scope.groupSelectGroupClick.showList;
  };

  $scope.addNewGroupToGroupedSelect = function(){
    if ($scope.newGroupGroupedSelect.saisie !== "") {
      for (var i = $scope.GroupedSelectGroups.list.length - 1; i >= 0; i--) {
        if ($scope.GroupedSelectGroups.list[i] === $scope.newGroupGroupedSelect.saisie) {
          toaster.pop({
                  type: 'warning',
                  timeout:2000,
                  title: 'Group already exists',
                  body: 'No group added.',                
                  showCloseButton: true
            });          
        }
        
      }
      $scope.GroupedSelectGroups.list.push($scope.newGroupGroupedSelect.saisie);

    }else{
          toaster.pop({
                  type: 'warning',
                  timeout:2000,
                  title: 'Not a valid group to add',
                  body: 'No group added.',                
                  showCloseButton: true
            });

    }
    $scope.newGroupGroupedSelect.saisie = "";
  };


  $scope.addNewOptionGroupedSelect = function(){
    var result = selectOptionManage.addNewOptionGroupedSelect($scope.groupedSelectRowCollection, $scope.newOptionGroupedSelect.saisie, '');
    if (result.resultFlag === false) {
          toaster.pop({
                  type: 'warning',
                  timeout:2000,
                  title: result.details,
                  body: '\''+ $scope.newOptionGroupedSelect.saisie + '\'' + ' cannot be added.',                
                  showCloseButton: true
            });
    }
    //bind nya : dont bind here $apply is not done fast enough
    //bindGroupedSelectToNya();
    //reset input
    $scope.newOptionGroupedSelect = {saisie: ""};
  };

  $scope.removeGroupedSelectRow = function(index) {
      var result = selectOptionManage.removeOption($scope.groupedSelectRowCollection, index);
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

  $scope.upThisGroupedSelectRow = function(index){
      var result = selectOptionManage.upthisOption($scope.groupedSelectRowCollection, index);
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

  $scope.downThisGroupedSelectRow = function(index){
      var result = selectOptionManage.downthisOption($scope.groupedSelectRowCollection, index);
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


  /////////////////////////////////////////////
  // init datetimepicker model
  /////////////////////////////////////////////
  $scope.demodt ={};

  $scope.today = function() {
    $scope.demodt.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.demodt.dt = null;
  };


  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.demodt.opened = true;
  };

  $scope.dateOptions = {
           formatYear: 'yy',
           startingDay: 1,
           showWeeks: true,
           initDate: null
  };

  $scope.demodt.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  
  function initDatePicker(){
    $scope.nyaSelect.temporyConfig.datepickerPopup = $scope.demodt.formats[0];  
  }
  


  /////////////////////////////////////////////
  // init model from controller data
  /////////////////////////////////////////////
  $scope.nyaSelect = nyaSelect ;

  //console.dir($scope.nyaSelect);
  
  //selected control from  main controller applied to current selected control
  $scope.nyaSelect.selectedControl = $scope.nyaSelect.temporyConfig.selectedControl;


  //place nya-select to selection if not none :
   if (nyaSelect.selectedControl !== 'none') {
    for (var i = $scope.nyaSelect.controls.length - 1; i >= 0; i--) {
       if ($scope.nyaSelect.controls[i].id === nyaSelect.selectedControl) {
          //$scope.nyaSelect.selectedControl = nyaSelect.controls[i].id;
          $scope.modelNyaSelect = nyaSelect.controls[i];
       }
    }

    if ($scope.nyaSelect.selectedControl === "BasicSelect") {
      bindBasicSelectFromNYA();
    }

    if ($scope.nyaSelect.selectedControl === "GroupedSelect") {
      bindGroupedSelectFromNYA();
    } 

    if ($scope.nyaSelect.selectedControl === "Radio") {
      bindRadioFromNYA();
    }    

  }



  function resetTemporyConfig(){
    $scope.nyaSelect.temporyConfig = {
                                        formlyLabel: "", 
                                        formlyRequired: false, 
                                        formlyPlaceholder: "",
                                        formlyDesciption: "",
                                        formlyOptions: []
                                      };   
  }



  $scope.selectThisControl = function(controlName){
    $scope.nyaSelect.selectedControl = 'none';
    resetTemporyConfig();

    for (var i = $scope.nyaSelect.controls.length - 1; i >= 0; i--) {
       if ($scope.nyaSelect.controls[i].id === controlName) {
          $scope.nyaSelect.selectedControl = $scope.nyaSelect.controls[i].id;         
       }
    }

    if ($scope.nyaSelect.selectedControl === 'Date') {
      initDatePicker();
    }
  };



  /////////////////////////
  // modal buttons click
  /////////////////////////
  $scope.ok = function () {

    if ($scope.nyaSelect.selectedControl === "BasicSelect") {
      bindBasicSelectToNya();
    }

    if ($scope.nyaSelect.selectedControl === "GroupedSelect") {
      bindGroupedSelectToNya();
    }  

    if ($scope.nyaSelect.selectedControl === "Radio") {
      bindRadioToNya();
    }  

    //save config to control
    controllerModalProxy.applyConfigToSelectedControl($scope.nyaSelect);
    //return current model to parent controller :
    $modalInstance.close($scope.nyaSelect);

  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };


}]);
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
		function(	
							$scope,  
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// module = "controllers"  for view "edaMainController"
//  ------------------------------------------------------
//      Syntax (convention) :
//          "edaApp" = application
//          "edaApp.controllers.edaMainController" = controller module
//
//  This module is a view controller -> it must be injected in controller container
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
angular
	.module('edaApp.controllers.edaMainController', [])
	.controller('edaMainController', [
		function () {
			
		}]);
/**
 *  ------------------------------------------------------
 *  directive : edaDdContentCounterDirective
 *  ------------------------------------------------------
 *
 *  return real item count (hidden item being dragged that stay on the line)
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
    .module('edaApp.directives.edaDdContentCounterDirective', [])
    .directive('ddContentCounter', ['dragDropItemCounterService', '$timeout',

    function(	dragDropItemCounterService, $timeout ){

  
    	return {
    		 scope: {
    		 	valueWhenPlaceholder: 	'@ddValueWhenPlaceholder',
    		 	valueWhendragging: 			'@ddValueWhenDragging',
    		 	fullModel : 						'=ddFullModel',
					currentIndex :       		'@ddContentCounterCurrentIndex',
          parentIndex :         	'@ddContentCounterParentIndex',
          forceRefresh: 					'=ddContentCounterForceCssRefresh' 
    		 }, 
    		
    		restrict: 'A', 
    		
    		link: function($scope, element) {
    			
    			var timer;

       		/**
       		 * watch children length change : to update css item class
       		 */
    			$scope.$watch(
				    function () { return element[0].children.length; },
				    function (newValue, oldValue) {
				      if (newValue !== oldValue) {

				        var newRealCount= 0;
				        var listClassForThisRow = [];

				        for (var i = element[0].children.length - 1; i >= 0; i--) {
				        	
				        	if(dragDropItemCounterService.isHtmlElementToCount(element[0].children[i].classList)){
				        		newRealCount++;
				        		listClassForThisRow.push( {item: i, isReal : true} );
				        	}else{
				        		listClassForThisRow.push( {item: i, isReal : false} );
				        	} 
				        }
				        $scope.contentRealCount = newRealCount;
				        /**
				         * a timer otherwise won't refresh everytime
				         */
				        timer = $timeout(function(){
					        dragDropItemCounterService.updateLineItemCss(	$scope.fullModel, 
					        																							listClassForThisRow, 
					        																							$scope.parentIndex, 
					        																							$scope.currentIndex, 
					        																							newRealCount
					        																						);				        	
				        }, 20);
				        
				      }
				    }
				  );

          /**
           * timer destruction to prevent from bad UI experience
           */
          $scope.$on('$destroy', function(){
                  console.warn('ddContentCounter timer destruction!');
                  $timeout.cancel(timer);
              }
          ); 
		  
    		}
    	};

    }]);
/**
 *  ------------------------------------------------------
 *  directive : ddDecorContainer
 *  ------------------------------------------------------
 *
 * - apply configuration to containers (or lines in layoutor group controls in control selection)
 *   - apply title (ONLY if group controls (left drop zone - index 0): text inputs group, lists...)
 *   - expand Bool (ONLY if group controls (left drop zone - index 0): text inputs group, lists...)
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
    .module('edaApp.directives.edaDdDecorContainerDirective', [])
    .directive('ddDecorContainer', [

    function(){

        var htmlTemplate   =    [
                                    '<div ng-click="collapseFct()">',
                                    '   <h6 ng-show="config.isEnabled" class="isCollapsableZone"><button class="btn btn-primary btn-xs"><span class="{{currentIconClass()}}"></span></button>&nbsp;{{currentTitle}}</h6>', 
                                    '</div>',
                                    '<div collapse="isCollapsed">', 
                                    '   <div id="ddDecorContainerWillTranscludeHere"></div>', 
                                    '</div>'
                                ].join(' ');

        return {
            scope:  {
                         'styleParam'           : '=ddContainerProperties',
                         'isStillCollapsed'     : '=ddContainerIsCollpased',
                         'verboseMode'          : '@ddContainerVerboseMode',
                         'currentIndex'         : '@ddContainerCurrentIndex',
                         'collpaseAll'          : '&ddCollapseAll'
                    },
            restrict:   'A', 
            template:   htmlTemplate,
            transclude: true,
            controller: function($scope) {
                            $scope.config = {   
                                                isEnabled : false
                                            };

                            //$scope.isCollapsed = $scope.styleParam.WhenIndex;
                            $scope.collapseFct = function(){
                               
                                $scope.collpaseAll({exceptThisOne: $scope.styleParam.WhenIndex}); 

                                $scope.isCollapsed = !$scope.isCollapsed;
                                $scope.isStillCollapsed = $scope.isCollapsed;

                            };
 
                            /**
                             *  TODO (low priority) : make icon css configurable (provider)
                             */
                            $scope.icons = {
                                closedClass :   'glyphicon glyphicon-eye-open',
                                opened :        'glyphicon glyphicon-eye-close'
                            };

                            $scope.currentIconClass =  function(){
                                    if ($scope.isCollapsed) {
                                        return $scope.icons.closedClass;
                                    }else{
                                        return $scope.icons.opened;
                                    }
                            };
                        },

            link: function($scope, element, attrs, ctrl, transclude) {    
                
                var verboseModeActive   = $scope.verboseMode;
                var currentIndex        = $scope.currentIndex;
                $scope.isCollapsed      = false;

                /**
                 * verbose mode for developments only
                 */
                if (verboseModeActive !== '') {
                    var verbose = angular.lowercase(verboseModeActive);

                    if (verbose === 'true' || verbose === '1') {
                       console.dir(
                            {
                                whoAmI              :   'I am verbose from ddDecorContainer link',
                                verbodeMode         :   verbose,
                                ParentParentIndex   :   $scope.$parent.$parent.$index,
                                ParentIndex         :   $scope.$parent.$index,
                                currentIndex        :   currentIndex,
                                styleParam          :   $scope.styleParam,
                                columnindex         :   $scope.$parent.$parent.$parent.$parent.$index
                            }
                        );
                    }                    
                }
               /**
                 * forceCollapse when : 
                 *  dragDropConfigModel.containerConfig.decoration.isCollapsed changed (here bound to $scope.isStillCollapsed)
                 */
                $scope.$watch(function(){return $scope.isStillCollapsed;}, function(newVal, oldVal){

                    if (newVal !== oldVal) {

                        if ($scope.$parent.$parent.$index === 0) {
                            $scope.isCollapsed = newVal;    
                        }

                    }
                        
                });                
                /**
                 * no header (no title, no collapse....) 
                 */
                $scope.config.isEnabled = false;

                 if (typeof currentIndex !== 'undefined') {
                    if (currentIndex !== '') {
                        /**
                         * specific 1st column 
                         */
                        if (currentIndex === '0') {
                            /**
                             * apply title  
                             */
                            if (typeof $scope.styleParam.title !== 'undefined') {

                                $scope.currentTitle     = $scope.styleParam.title;
                                $scope.config.isEnabled = true;
                                $scope.isCollapsed      = true;
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
        };

    }]);


/**
 *  ------------------------------------------------------
 *  directive : ddDecorDropZone
 *  ------------------------------------------------------
 *
 * apply configuration to drop zone (or columns = top level containers)
 *   - column role (control selection or drop zone as form layout)
 *   - apply title
 *   - apply font-awesome icon
 *   - OPTIONAL (DEV USE) : add 'dd-verbose-mode' attribute set to true or 1 to have versbose in console
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
    .module('edaApp.directives.edaDdDecorDropZoneDirective', [])
    .directive('ddDecorDropZone', [


    function(){

        var htmlTemplate   = ['<div class="{{styleParam.ApplycssClass}}">', 
                            '  <div id="visualPanel">',
                            '    <div  class="panel panel-default">', 
                            '      <div class="panel-heading">', 
                            '        <h3 class="panel-title">', 
                            '          <i class="{{currentFontAwesome}}"></i>&nbsp;', 
                            '          {{currentTitle}}', 
                            '           <div ng-show="headerConfig.HeaderButtonVisible">',
                            '             <button class="btn btn-primary btn-xs buttonHeaderAddNewLine center-block" ng-click="addNewLineFct();">',
                            '               <span class="glyphicon glyphicon-plus"></span>&nbsp;add new line',
                            '             </button>',
                            '           </div>',
                            '        </h3>', 
                            '      </div>', 
                            '      <div class="panel-body">', 
                            '         <div class="row">', 
                            '            <div class="col-md-12" ng-transclude>', 
                            '            </div>', 
                            '            </div>', 
                            '      </div>', 
                            '    </div>', 
                            '   </div>',
                            '</div>'].join(' ');

        
        return {
            scope:  {
                         'styleParam'       : '=ddDropZoneProperties',
                         'verboseMode'      : '@ddDropZoneVerboseMode',
                         'currentIndex'     : '@ddDropZoneCurrentIndex',
                         'addNewLineFct'    : '&ddDropZoneAddNewLine'
                    },
            restrict:   'A', 
            template:   htmlTemplate,
            transclude: true,

            link: function($scope) {    
                
                var verboseModeActive   = $scope.verboseMode;
                var currentIndex        = $scope.currentIndex;
                
                $scope.headerConfig = {
                    HeaderButtonVisible : false,
                    affixAttr           : 'bs-affix',
                    affixEnabled        : false
                };
                /**
                 * verbose mode : just for dev
                 */
                if (verboseModeActive !== '') {
                    var verbose = angular.lowercase(verboseModeActive);

                    if (verbose === 'true' || verbose === '1') {
                       console.dir(
                            {
                                whoAmI              : 'I am verbose from ddDecorDropZone link',
                                verbodeMode         : verbose,
                                ParentParentIndex   : $scope.$parent.$parent.$index,
                                ParentIndex         : $scope.$parent.$index,
                                currentIndex        : currentIndex,
                                styleParam          : $scope.styleParam
                            }
                        );
                    }                    
                }


                if (typeof currentIndex !== 'undefined') {
                    if (currentIndex !== '') {
                            /**
                             * apply title
                             */
                            if (typeof $scope.styleParam.title !== 'undefined') {
                                $scope.currentTitle = $scope.styleParam.title;
                            }

                            /**
                             * apply font-awesome
                             */
                            if (typeof $scope.styleParam.fontAwesomeIcon !== 'undefined') {
                                $scope.currentFontAwesome = $scope.styleParam.fontAwesomeIcon;
                            } 

                            /**
                             * show add new line button
                             */
                            if (currentIndex === '1') {
                                $scope.headerConfig.HeaderButtonVisible = true;
                            }

                    }                    
                }
                          
            }
        };
    }]);
/**
 *  ------------------------------------------------------
 *  directive : edaDdDecorItemDirective
 *  ------------------------------------------------------
 *
 *  decorate an item / control
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
    .module('edaApp.directives.edaDdDecorItemDirective', [])
    .directive('ddDecorItem', [ 'dragDropConfig',

    function( dragDropConfig ){

        var htmlTemplate   = [
                                '<div>',
                                ' <div id="itemDirectiveTranscludeHere"></div>',
                                '</div>',
                                ].join(' ');                                
                             
        return {
            scope:  {

                         'verboseMode' :        '@ddItemVerboseMode',
                         'currentIndex' :       '@ddItemCurrentIndex',
                         'parentIndex':         '@ddItemParentIndex',
                         'parentParentIndex':   '@ddItemParentParentIndex', 
                         'lineItemsCount' :     '@ddItemsCount',
                         'cssClass':            '@ddItemCssClass'
                    },
            restrict:   'A',
            template:   htmlTemplate,
            transclude: true,
            link: function($scope, element, attrs, ctrl, transclude) {    
                
                var verboseModeActive = $scope.verboseMode;
                var currentIndex      = $scope.currentIndex;
                var parentIndex       = $scope.parentIndex;
                var listClass         = dragDropConfig.getDistinctItemCssClass();


                /**
                 * init css class
                 */
                angular.forEach(listClass, function(css){
                    element.removeClass(css);
                });
                element.addClass($scope.cssClass);                


                /**
                 * update css class
                 */
                $scope.$watch('cssClass', function(newValue, oldValue) {
                    if(newValue !== oldValue){
                        /**
                         * update css class
                         */
                        angular.forEach(listClass, function(css){
                            element.removeClass(css);
                        });
                        element.addClass(newValue); 
                    }
                    
                });

                /**
                 * verbose mode : just for dev 
                 */
                if (verboseModeActive !== '') {
                    var verbose = angular.lowercase(verboseModeActive);

                    if (verbose === 'true' || verbose === '1') {
                       console.dir(
                            {
                                whoAmI              : 'I am verbose from ddDecorItem directive link',
                                verbodeMode         : verbose,
                                ParentParentIndex   : $scope.$parent.$parent.$index,
                                ParentIndex         : parentIndex,
                                parentParentIndex   : $scope.parentParentIndex,
                                currentIndex        : currentIndex,
                                lineItemsCount      : $scope.lineItemsCount
                            }
                        );
                    }                    
                }

                /**
                 * control column : apply css class to item
                 */
                if ($scope.parentParentIndex === '0') {
                   element.addClass(listClass[0]);  

                }

                /**
                 * prevent transclusion creating child scope  
                 *
                 *
                 * NOTE :if you want to know more about what I'm saying : check this nice tip on the subject : 
                 * http://angular-tips.com/blog/2014/03/transclusion-and-scopes/        
                 */
                transclude($scope.$parent, function(contentClone){
                    /**
                     * transclusion will append content to '<div id="itemDirectiveTranscludeHere"></div>' 
                     */
                    var childDiv = angular.element(element.children()[0]); 
                    childDiv.append(contentClone);
                });   
            }
        };


    }]);


/**
 *  ------------------------------------------------------
 *  directive : edaDdDecorLineDirective
 *  ------------------------------------------------------
 *
 * decorate a form line :
 *  - double click will make it shake for 2 second (ready to delete state)
 *  - double click again will delete this line
 *  - no click within 2seconds : line will stop shaking 
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
    .module('edaApp.directives.edaDdDecorLineDirective', [])
    .directive('ddDecorLine', ['$timeout', 

    function($timeout){

        var htmlTemplate   = [
                                '<div ng-class="{confirmLineDelete : deleteLine.readyToDelete}" ng-dblclick="removeMe($event);" ng-click="cancelDelete($event);"> ',
                                ' <button ng-show="deleteLine.readyToDelete === true" type="button"  class="btn btn-danger pull-right buttonCloseLine" >',
                                '   <span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>',
                                '</div>',
                                '  <div id="lineDirectiveTranscludeHere"></div>',
                                ].join(' ');
        
        return {
            scope:  {

                         'verboseMode'  :    '@ddLineVerboseMode',
                         'currentIndex' :    '@ddLineCurrentIndex',
                         'parentIndex'  :    '@ddLineParentIndex',
                         'removeLine'   :    '&ddRemoveLine'
                    },
            restrict:   'A',
            template:   htmlTemplate,
            transclude: true,

            link: function($scope, element, attrs, ctrl, transclude) {    
                
                var verboseModeActive   = $scope.verboseMode;
                var currentIndex        = $scope.currentIndex;
                var parentIndex         = $scope.parentIndex;

                $scope.deleteLine = {};
                $scope.deleteLine.readyToDelete = false;
                $scope.deleteLine.dblClickCount = 0;

        
                $scope.isCollapsed = false;


                /**
                 * verbose mode : just for dev 
                 */
                if (verboseModeActive !== '') {
                    var verbose = angular.lowercase(verboseModeActive);

                    if (verbose === 'true' || verbose === '1') {
                       console.dir(
                            {
                                whoAmI              : 'I am verbose from ddDecorLine directive link',
                                verbodeMode         : verbose,
                                ParentParentIndex   : $scope.$parent.$parent.$index,
                                ParentIndex         : parentIndex,
                                currentIndex        : currentIndex,
                            }
                        );
                    }                    
                }

                /**
                 * removeMe is function related to twice double click sequence to delete a line
                 *
                 *  - addClass / remove/class ; will make line in a shake movement
                 *  - call "removeLine function to delete the line (if it was rwice double clicked)
                 */
               $scope.removeMe = function(event){
                    event.preventDefault();
                    event.stopPropagation();

                    if ($scope.parentIndex === '1') {

                        /**
                         * 2nd dbl click : if is shaking so it is confirmation to delete
                         */
                        if ($scope.deleteLine.dblClickCount === 1){

                            $scope.deleteLine.dblClickCount = 0;
                            $scope.deleteLine.readyToDelete = false;

                            /**
                             * NOTE : trick in calling parent controller function with input param when directive with isolate scope
                             * see : https://thinkster.io/egghead/isolate-scope-am
                             *
                             * Here should be:
                             * 
                             *-> in html :                     dd-remove-line="removeThisLine(indexToDelete)
                             *-> in controller :               $scope.removeThisLine = function(lineIndex){
                             *-> so in directive call it  :    $scope.removeLine({indexToDelete: currentIndex});
                             *
                             *
                             *
                             *
                             * BUT in this case (repeats, ul> li.... complicated) 
                             *  => works better (if shaking a lot of line in a row it won't mess up)
                             *
                             *-> in html :                     dd-remove-line="removeThisLine($index)
                             *-> in controller :               $scope.removeThisLine = function(lineIndex){
                             *-> so in directive call it  :    $scope.removeLine();
                             */                            
                            //$scope.removeLine({indexToDelete: currentIndex});
                            $scope.removeLine();
                            //console.warn('force timer destruction after delete!');
                            $timeout.cancel(timer);
                        }

                        //1st dbl click : make it shake so ready to delete
                        if ($scope.deleteLine.dblClickCount === 0) {
                            $scope.deleteLine.dblClickCount = $scope.deleteLine.dblClickCount + 1;
                            $scope.deleteLine.readyToDelete = true;
                        }
                        
                    }
                };


                /**
                 * signle event will ever occur
                 *
                 * to prevent it to interfere with double click sequence 
                 * -> set a time out (shaking line to delete will automaticallly end shaking after timeout : 2 seconds)
                 */
                
                var timer;

                $scope.cancelDelete = function(event){
                    //event.preventDefault();
                    //event.stopPropagation();
                    
                        timer = $timeout(function(){
                    
                        $scope.deleteLine.dblClickCount = 0;
                        $scope.deleteLine.readyToDelete = false;  
                          
                    }, 500);


                    /**
                     * debug
                     */
                    // timer.then(
                    //     function() {
                    //         console.log( 'Timer resolved!', Date.now() );
                    //     },
                    //     function() {
                    //         console.log( 'Timer rejected!', Date.now() );
                    //     }
                    // );

                };


                /**
                 * timer destruction to prevent from bad UI experience
                 */
                $scope.$on('$destroy', function(){
                        //console.warn('timer destruction!');
                        $timeout.cancel(timer);
                    }
                );                


                /**
                 * prevent transclusion creating child scope  
                 *
                 *
                 * NOTE :if you want to know more about what I'm saying : check this nice tip on the subject : 
                 * http://angular-tips.com/blog/2014/03/transclusion-and-scopes/        
                 */
                transclude($scope.$parent, function(contentClone){
                    //transclusion will append content to '<div id="lineDirectiveTranscludeHere"></div>'
                    var childDiv = angular.element(element.children()[0]); 
                    childDiv.append(contentClone);
                });   
            }
        };


    }]);


/**
 *  ------------------------------------------------------
 *  directive : ddNoEditableControl
 *  ------------------------------------------------------
 *
 * prevent a control like an input to be editable 
 *  
 *  (otherwise should lead to bas use experience with drag and drop) 
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
	.module('edaApp.directives.edaDdNoEditableControlDirective', [])
	.directive('ddNoEditableControl', [

	function(){


		return {
		    
		    restrict: 'A',

		    link: function($scope, element) {    
		        
					element.on('click', function(event){
						event.preventDefault();
						
					});

		    }
			};

}]);


/**
 *  ------------------------------------------------------
 *  directives container
 *  ------------------------------------------------------
 *
 *      Syntax (convention) :
 *          "edaApp" = application
 *          "edaApp.directives" = container directives module
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
	.module('edaApp.directives', [	'edaApp.directives.edaStRationDirective',
																	'edaApp.directives.edaDdDecorDropZoneDirective',
																	'edaApp.directives.edaDdDecorContainerDirective',
																	'edaApp.directives.edaDdDecorLineDirective',
																	'edaApp.directives.edaDdDecorItemDirective',
																	'edaApp.directives.edaDdNoEditableControlDirective',
																	'edaApp.directives.edaDdContentCounterDirective',
																	'edaApp.directives.edaRightClickDirective',
																	'edaApp.directives.edaDragdropWayEasyFormGenDirective'
	]);


/**
 *  ------------------------------------------------------
 *  easy form generator directive (Drag and drop way)
 *  ------------------------------------------------------
 * 
 *  all easy form generator embeded in a directive
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
;(function(){
	'use strict';
	
	angular
		.module('edaApp.directives.edaDragdropWayEasyFormGenDirective', [])
		.directive('edaDragdropWayEasyFormGen', edaDragDropWayEasyFormGen);
		
		edaDragDropWayEasyFormGen.$inject = [
      '$timeout', 
      'formFieldManage',
      'ddModelConfModelProxyService',
      'dragDropConfig'];
		
		function edaDragDropWayEasyFormGen(
      $timeout, 
      formFieldManage,
      ddModelConfModelProxyService,
      dragDropConfig){
      
      /**
       * directive's controller injection is here (before return directive) = to avoid minification errors
       * sad but true... -> this reminds me something?!
       */
      edaDragDropWayEasyFormGenCtrl.$inject = [
        '$scope', 
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
      
      
			var directive = {
				restrict : 'E',
				scope : {
          edaEasyFormGeneratorModel : '=',
          edaSaveFormEvent          : '&edaSaveFormEvent'
        },
				controller : edaDragDropWayEasyFormGenCtrl,
				controllerAs : 'vm',
				//bindToController : true, //angular < 1.4, activating this property will break databindings
				replace : false,
				templateUrl : 'edaDragDropWayEasyFormGeneratorTemplate.html',
				link : linkFct
			};
			return directive;
			
			function linkFct(scope, element, attrs){
              
          //watch "scope.easyFormGeneratorModel"
          scope.$watch(watchEdaEasyFormModelExpression, 
            watchEdaEasyFormModelHasChanged, 
            true);          
         
          //watch "scope.returnSaveEvent"" = catch saving form event  
					scope.$watch(watchReturnSaveEventExpression, 
           watchReturnSaveEventhasChanged);	
          
          
          
          
          
          
          
          
          
          
          function returnAttributeConfigurationLinesIfNotEmpty(){
            var edaEasyFormGeneratorModelToReturn = (
                angular.isArray(scope.edaEasyFormGeneratorModel.edaFieldsModel) ?  ( 
                    scope.edaEasyFormGeneratorModel.edaFieldsModel.length > 0 ? 
                      scope.edaEasyFormGeneratorModel.edaFieldsModel 
                    : emptyEdaFieldsModel()
                    ) 
                : emptyEdaFieldsModel()
            );
             return edaEasyFormGeneratorModelToReturn;  
          }
          
          /**
           * empty fields model : to display at least an empty line
           * otherwise would look like ugly empty line like it were a bug
           */
					function emptyEdaFieldsModel(){
						var emptyModel = [
							{
								"line": 1,
								"activeColumn": 1,
								"columns": [
									{
										"numColumn": 1,
										"exist": true,
										"control": {
											"type": "none",
											"key": "none"
										}
									}
								]
							}
						];
						return emptyModel;
					}
          
          function returnAttributeDataModelIfNotEmpty(){
            var dataModelToReturn = (
                angular.isArray(scope.edaEasyFormGeneratorModel.dataModel)   ?  ( 
                    scope.edaEasyFormGeneratorModel.dataModel.length > 0 ? 
                    scope.edaEasyFormGeneratorModel.dataModel 
                    : []
                   ) 
                : []
            );
             return dataModelToReturn;  
          }          
          
          function watchEdaEasyFormModelExpression(){
            return scope.edaEasyFormGeneratorModel;
          }
          
          function watchEdaEasyFormModelHasChanged(newValue, oldValue){             
            loadExistingConfigurationModel();          
          }          
        
        
        
          function watchReturnSaveEventExpression(){
            return scope.returnSaveEvent;
          }
          
          function watchReturnSaveEventhasChanged(newValue, oldValue){
            if (newValue === true) {
              var _easyFormGeneratorModel = {
                formName          : scope.configuration.formName,
                btnSubmitText     : scope.configuration.submitButtonText,
                btnCancelText     : scope.configuration.cancelButtonText,
                edaFieldsModel    : scope.configuration.lines,
                //just as test
                
                edaFieldsModelStringified : angular.toJson(scope.configuration.lines),
                
                formlyFieldsModel : scope.vm.wfFormFieldsOnlyNeededProperties,
                dataModel         : scope.vm.model
              };
              scope.edaSaveFormEvent({
                edaEasyFormGeneratorModel      : _easyFormGeneratorModel
              });
              //back to false, waiting next save event
              scope.returnSaveEvent = false;
            }            
			   }          
          
          
        function loadExistingConfigurationModel(){
          
          if(angular.isDefined(scope.edaEasyFormGeneratorModel)){
            var configlines           = returnAttributeConfigurationLinesIfNotEmpty();           
            scope.configurationLoaded = {};
            
            formFieldManage.bindConfigurationLines(scope.configurationLoaded,configlines, false);
            
            //apply configuration model
            scope.configuration = angular.copy(scope.configurationLoaded);
            
            
            //apply ddModel
            ddModelConfModelProxyService.loadDragDropModelFromConfigurationModel( 
                                                                        scope.configuration, 
                                                                        scope.dragDropModel
                                                                        );            
               
            updateConfigurationClassName(scope.configuration);
            
            ddModelConfModelProxyService.refreshControlsKeys( 
                                                              scope.configuration, 
                                                              scope.dragDropModel
                                                            );             
            
            console.info('compare both configuration model');
            console.dir({
              'loaded one' : angular.copy(scope.configurationLoaded),
              'bound one' : angular.copy(scope.configuration) 
            });
            
            //apply formly model
            formFieldManage.applyConfigurationToformlyModel(scope.configuration, scope.vm.wfFormFields, scope.vm.model);          
            
            scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy(scope.vm.wfFormFields);
            scope.vm.model                            = returnAttributeDataModelIfNotEmpty();  
            scope.configuration.formName              = angular.isString(scope.edaEasyFormGeneratorModel.formName) ? scope.edaEasyFormGeneratorModel.formName : '';
            scope.configuration.submitButtonText      = angular.isString(scope.edaEasyFormGeneratorModel.btnSubmitText) ? scope.edaEasyFormGeneratorModel.btnSubmitText : 'Submit'; 
            scope.configuration.cancelButtonText      = angular.isString(scope.edaEasyFormGeneratorModel.btnCancelText) ? scope.edaEasyFormGeneratorModel.btnCancelText : 'Cancel';
          }  
        } 
         
         
       function updateConfigurationClassName(configModel){
         angular.forEach(configModel.lines, function(aline){
          var cssClassToApply = dragDropConfig.getItemCssDependingNumberItemsInRow(aline.columns.length);
          
          angular.forEach(aline.columns, function(aControl){
            aControl.control.className = cssClassToApply;
          }); 
        });   
          
          
       }  
          
          
      //closing link function             
			}
    
    
      /**
       * controller :
       */
      function edaDragDropWayEasyFormGenCtrl(
                  $scope, 
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
                  ddItemRightClickedManager) {
    
    
    
      /**
      * versioning
      */
      
      $scope.easyFormGeneratorVERSION = easyFormGenVersion;
    
      /**
      * tab managment
      */
      $scope.tab =  {
                      editTab : {active : true},
                      previewTab : {active : false},
                    };
    
    
      /**
      * formly models
      */
      $scope.returnSaveEvent = false;
      /*jshint validthis: true */
      $scope.vm = this;
      /**
      * model filled by form :
      */
      $scope.vm.model = {};
      /**
      * form schema : 
      * (filled from $scope.configuration on drag an drop events)
      */
      $scope.vm.wfFormFields = [];
      /**
      * wfFormFieldsOnlyNeededProperties : formly field model 
      * (clean model : just needed properties
      *   -> that on is not bound to angular formly 
      *   -> could be saved to database
      * )
      */
      $scope.vm.wfFormFieldsOnlyNeededProperties = []; 
    
      /**
      * preview tab : manage collapse/expend states
      */
      $scope.ihm = {
                      preview : {
                                    formlyModelViewExpanded : true,
                                    formlyFieldsViewExpanded : true,
                                    customizeFormButtonsExpanded : true,
                                    saveThisFormExpanded : true  
                                }
    
      };
    
    
      /**
      * easyFormDragDropProperties : configure drag and drop apearance
      *
      * — see dragDropConfig provider —
      */
      $scope.easyFormDragDropProperties = dragDropConfig.getDragDropConfigModel();
      /**
      * dragDropModel : darg drop presentation model
      *
      * manage drag and drop UI : drag and drops events will change it then change configuration model
      */
      $scope.dragDropModel = [].concat(dragDropConfig.getDragDropPresentationModel());
    
      //console.dir(  {'dragDropModel' : $scope.dragDropModel});
    
    
    
      //column ref                         
      $scope.numberOfColumns = 1;
      $scope.MaxNumberOfColumns = 3;
      $scope.MinNumberOfColumns = 1;
    
    
      ///////////////////////////////////////////////////////////////////////////////////
      // configuration model (contains array of lines which contains array of columns)
      ///////////////////////////////////////////////////////////////////////////////////
      $scope.configuration = {};
      /**
      * formFieldManage.initConfigurationEditFromScratch(_OBJECT TO INIT_, _BOOL ADD STEP WAY PROPERTIES_)
      */
      formFieldManage.initConfigurationEditFromScratch($scope.configuration , false);
      
      /**
      * init proxyModel 
      * (object shared between this controller and edit panel controlelr)
      */
      controllerModalProxy.initProxyModel();
      /**
      * collapse all other group of draggable controls : when a group control expands
      */
      $scope.collapseAllGroupControl = function(allExceptThisGroupIndex){
        
        angular.forEach($scope.easyFormDragDropProperties.containerConfig.decoration, function(value){
          if (value.WhenIndex !== allExceptThisGroupIndex) {
              dragDropConfig.setDragDropConfigContainerDecorationCollapse($scope.easyFormDragDropProperties, value.WhenIndex, true);
          }
        });
        
      };
    
    
    
      $scope.vm.onSubmit = onSubmit;
      
      function onSubmit() {
      
          toaster.pop({
                type: 'info',
                timeout:2000,
                title: 'should save data model if it were not a static example',
                body: 'data :' + $filter('json')($scope.vm.model, 4),                
                showCloseButton: true
          }); 
      }
    
    
    
      // /**
      //  * init formly control list
      //  */
      // //needed for select : list all existing forms
      // $scope.loadExistingFormsList = loadExistingFormsAsList();
    
    
      // function loadExistingFormsAsList(){
      //   //If it were not a static html, it should call server to retrieve data from database :
      //   // $scope.formlyList = formsByIdService.query();  
      // }
    
      // //load on init
      // loadExistingFormsAsList();
    
      // $scope.previewLoadedForm = {fieldsModel:[]};
      // $scope.configurationLoaded = {};
    
      // $scope.previewExistingform = function(formlyform){
    
      //  var configlines = JSON.parse(formlyform.formlyField);
      //  //here to replace with $scope.configuration : initialise configuration with lines 
      //  $scope.configurationLoaded = {};
      //  formFieldManage.bindConfigurationLines($scope.configurationLoaded,configlines);
    
      //  formFieldManage.applyConfigurationToformlyModel($scope.configurationLoaded, $scope.previewLoadedForm.fieldsModel, $scope.vm.model);
    
      //  $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);
    
      //  $scope.previewLoadedForm.cancelButtonText = formlyform.cancelButtonText;
      //  $scope.previewLoadedForm.submitButtonText = formlyform.submitButtonText;
      // };
    
    
    
    
    
    
      //init number of configuration lines
      $scope.resetToZeroModel = function(){
        $scope.configuration.activeLine = 1;
    
        if ($scope.configuration.lines.length > 1) {
            $scope.configuration.lines.splice(1, $scope.configuration.lines.length - 2);
        }
        return $scope.countConfigurationModelLines();
      };  
    
    
    
    
    
    
    
      //return count configuration lines
      $scope.countConfigurationModelLines = function(){
        return $scope.configuration.lines.length;
      };    
      //switch to line
      $scope.setActiveLineNumber = function(lineNumber){
        if (lineNumber <= $scope.countConfigurationModelLines()) {
          $scope.configuration.activeLine = lineNumber;
        }
      };                
    
      $scope.upThisLine = function(indexLine){  	
        if (indexLine > -1) {
            if ($scope.configuration.lines[indexLine - 1]) {
              var currentLineObj = $scope.configuration.lines[indexLine];
              $scope.configuration.lines.splice(indexLine , 1);
              $scope.configuration.lines.splice((indexLine - 1), 0, currentLineObj);  	
              //manage selected aciveLine
              $scope.configuration.activeLine = 1;
            }
        }
          //re-render formfield 
        formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);
    
        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);     
      };
    
    
      $scope.downThisLine = function(indexLine){
        if (indexLine > -1) {
            if ($scope.configuration.lines[indexLine + 1]) {
              var currentLineObj = $scope.configuration.lines[indexLine];
              $scope.configuration.lines.splice(indexLine , 1);
              $scope.configuration.lines.splice((indexLine + 1), 0, currentLineObj);  
              //manage selected aciveLine
              $scope.configuration.activeLine = 1;
            }
          }     
          //re-render formfield 
        formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model); 
        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);   
      };
    
    
    
      //must be remove a line with index of line to delete
      $scope.removeThisLine = function(index){
        if (index > -1) {
          if ($scope.configuration.lines.length > 1) {
              //manage selected aciveLine
              if ($scope.configuration.activeLine === index + 1) {
                $scope.configuration.activeLine = 1;
              }
              $scope.configuration.lines.splice(index, 1);
          }else{
              $timeout(function(){
                  toaster.pop({
                          type: 'warning',
                          title: 'Last line' ,
                          body: 'Can\'t delete the last line',                
                          showCloseButton: true
                    });
              }, 100); 
          }
    
        //re-render formfield 
        formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);
        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);
        }
      };
    
    
    
    
    
      $scope.increaseNumberOfColumns = function(){
    
        if ($scope.configuration.lines[$scope.configuration.activeLine -1].columns.length < $scope.MaxNumberOfColumns) {
        var newNumberOfColumns = $scope.configuration.lines[$scope.configuration.activeLine -1].columns.push(
                                                      {
                                                                      numColumn: -1,
                                                                      exist: true, 
                                                                      control: {
                                                                                  type:'none',
                                                                                  key: 'none'
                                                                                }                                         
                                                      }																				
                                              );
        
        $scope.configuration.lines[$scope.configuration.activeLine -1].columns[newNumberOfColumns - 1].numColumn = newNumberOfColumns; 
      }
        //re-render formfield 
        formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model); 
    
        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);
    };
    
    
      $scope.decreaseNumberOfColumns = function(indexLine, indexColumn){
        if ($scope.configuration.lines[$scope.configuration.activeLine -1].columns.length > 1) {
          $scope.configuration.lines[$scope.configuration.activeLine -1].columns.splice($scope.configuration.lines[$scope.configuration.activeLine -1].columns.length -1, 1);
        }
        //re-render formfield 
        formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);  
    
        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);  
      };
    
    
    
    
    
    
    
    
    
    
    
    
    
      ////////////////////////////////////////////////////////////
      //             porperties control (STEP 3)
      ////////////////////////////////////////////////////////////
    
      $scope.saveThisForm = function(){
        if (typeof $scope.configuration.formName === 'undefined') {
        toaster.pop({
                type: 'warning',
                timeout:2000,
                title: 'Form name is undefined',
                body: 'Form has not been saved.',                
                showCloseButton: true
          });
          return false;
        }
    
        if ($scope.configuration.formName === '') {
        toaster.pop({
                type: 'warning',
                timeout:2000,
                title: 'Form name is required',
                body: 'Form has not been saved.',                
                showCloseButton: true
          });
          return false;
        }
        /**
        * [type description]
        * @type {String}
        */
        toaster.pop({
                type: 'wait',
                timeout:10000,
                title: 'Form is being saved',
                body: 'Wait.',                
                showCloseButton: true
          });
    
          //var wfForm = new formsByIdService();
    //       var formSavingIsOK = true;
    // 
    //       wfForm.formName = $scope.configuration.formName;
    //       wfForm.submitButtonText = $scope.configuration.submitButtonText;
    //       wfForm.cancelButtonText = $scope.configuration.cancelButtonText;
    // 
    //       wfForm.formlyField = JSON.stringify($scope.configuration.lines); 
    
          // save to database here 
          // wfForm.$save()
          //             .then(function(res)  {    formSavingIsOK = true;    })
          //             .catch(function(req) { 
          //                                   toaster.clear();
          //                                   formSavingIsOK = false; 
          //                                   toaster.pop({
          //                                           type: 'error',
          //                                           timeout:2000,
          //                                           title: 'Error while saving form',
          //                                           body: 'Sorry, an Error occured while saving form.',                
          //                                           showCloseButton: true
          //                                     });
          //             })
          //             .finally(function()  { 
          //                                   if (formSavingIsOK === true) {
          //                                     toaster.clear();  
          //                                     toaster.pop({
          //                                             type: 'success',
          //                                             timeout:2000,
          //                                             title: 'Form is successfully saved',
          //                                             body: '',                
          //                                             showCloseButton: true
          //                                       });                                         
          //                                   }
          //              });
    
          toaster.clear();  
          toaster.pop({
                  type: 'info',
                  timeout:2000,
                  title: 'Form would be saved if it were not a static example',
                  body: '',                
                  showCloseButton: true
            }); 
            
         //save form event   
         $scope.returnSaveEvent = true;   
          return true;
      };
    
    
    
      ////////////////////////////////////////////////////////////
      //            modal : add control to column
      ////////////////////////////////////////////////////////////
    
      $scope.nyaSelect = {};
      controllerModalProxy.initNyaSelect($scope.nyaSelect);
    
      $scope.animationsEnabled = true; 
    
      $scope.showModalAddCtrlToColumn = function (size, indexLine, numcolumn) {
    
        var modalInstance = $modal.open({
                                          animation: $scope.animationsEnabled,
                                          templateUrl: 'editModalTemplate.html', 
                                          controller: 'edaEditMODALController',
                                          size: 'lg',
                                          resolve: {
                                            nyaSelect: function () {
                                              return controllerModalProxy
                                                                .getNyASelectFromSelectedLineColumn(  $scope.nyaSelect, 
                                                                                                      $scope.configuration,
                                                                                                      indexLine, 
                                                                                                      numcolumn
                                                                                                    );
                                            }
                                          }
        });
    
    
        modalInstance.result.then(function (modalAddCtrlModel) {
            controllerModalProxy.bindConfigurationModelFromModalReturn(indexLine, numcolumn, modalAddCtrlModel, $scope.configuration);
            formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);
            
            $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };
    
    
      /**
      *
      * 
      *   drag and drop : may move from this controller
      *
      *
      * 
      */
    
    
      //specific Container dragoverCallback event
      $scope.dragoverCallbackContainer = function(parentparentIndex, parentIndex, index){
          //prevent container in layout column to be drag to control select contianer 
          if (index === 0) {
              return false;
          }
          return true;
      };
    
      $scope.dropCallback = function(event, index, item, external, type, allowedType) {
              
          if (external) {
              if (allowedType === 'itemType'      && !item.label)             return false;
              if (allowedType === 'containerType' && !angular.isArray(item))  return false; 
          }
    
          /**
          * TODO : update configuration model
          */
    
          /**
          * set a timeout befire binding
          * since ddModel may not be called when already full updated
          */
          var timerRefreshDDToConfig = $timeout(function(){
            
            $scope.configuration = angular
                                      .copy(ddModelConfModelProxyService
                                              .refreshAllConfigurationFromDragAndDropModel(
                                                                                            $scope.configuration, 
                                                                                            $scope.dragDropModel
                                                                                          )
                                          );
            
            formFieldManage.applyConfigurationToformlyModel(  
                                                              $scope.configuration, 
                                                              $scope.vm.wfFormFields, 
                                                              $scope.vm.model
                                                            );
                                                            
            $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);
            
            ddModelConfModelProxyService.refreshControlsKeys( 
                                                              $scope.configuration, 
                                                              $scope.dragDropModel
                                                            );            
    
          }, 200);
    
          /**
          * timerRefreshDDToConfig timer destruction
          */
          $scope.$on('$destroy', function(){
                $timeout.cancel(timerRefreshDDToConfig);
            }
          );
          
    
          return item;
      };
    
    
    
          
      $scope.dndItemMoved = function(parentParentIndex, parentIndex, itemIndex){
        //prevent item from first container to disapear when dropped on other container
        if (parentParentIndex > 0) {
            $scope.dragDropModel[parentParentIndex][parentIndex].splice(itemIndex, 1);
        }
      };
    
      $scope.dragoverCallbackItems = function(ParentParentIndex, parentIndex, index, external){
            //prevent items in layout column to be drag to control select  
            if (parentIndex === 0) {
                return false;
            }
            return true;
        };
    
    
      /**
      * disableItemDropIf prevent dropping on condition
      *
      * TODO : to replace in html : dnd-disable-if="items.length > 2"
      */
      $scope.disableItemDropIf = function(){
    
      };
    
    
    
      /**
      * [dropCallbackItems description]
      * @param  {[type]} event                   [description]
      * @param  {[type]} index                   [description]
      * @param  {[type]} realIndex               [description]
      * @param  {[type]} parentIndex             [description]
      * @param  {[type]} parentParentIndex       [description]
      * @param  {[type]} parentParentParentIndex [description]
      * @param  {[type]} item                    [description]
      * @param  {[type]} external                [description]
      * @param  {[type]} type                    [description]
      * @param  {[type]} allowedType             [description]
      * @return {[type]}                         [description]
      */
      $scope.dropCallbackItems = function(event, index, realIndex, parentIndex, parentParentIndex, parentParentParentIndex, item, external, type, allowedType){
        
          if (external) {
              if (allowedType === 'itemType' && !item.label) return false;
              if (allowedType === 'containerType' && !angular.isArray(item)) return false; 
          }
        
        /**
          * set a timeout before binding
          * since ddModel may not be called when already full updated
          */
          var timerRefreshDDToConfig = $timeout(function(){
            
            $scope.configuration = angular.copy(ddModelConfModelProxyService
                                                              .refreshAllConfigurationFromDragAndDropModel(
                                                                                                            $scope.configuration, 
                                                                                                            $scope.dragDropModel
                                                                                                          ));
                                                                                                          
            formFieldManage.applyConfigurationToformlyModel(  
                                                                $scope.configuration, 
                                                                $scope.vm.wfFormFields, 
                                                                $scope.vm.model
                                                            );
                                                            
            $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields); 
            /**
            * refresh controls key in dragDrop Model
            * to persist already exists controls between refreshes when item drop events
            */
            ddModelConfModelProxyService.refreshControlsKeys( 
                                                              $scope.configuration, 
                                                              $scope.dragDropModel
                                                            );        
    
          }, 200);
    
          /**
          * add/set rightCliked property to false
          *
          * will help edaRightClick directive
          */
          ddItemRightClickedManager.setUnRightClicked(item);
    
          /**
          * timerRefreshDDToConfig timer destruction
          */
          $scope.$on('$destroy', function(){
                $timeout.cancel(timerRefreshDDToConfig);
            }
          );
    
    
          return item;
      };
    
    
    
      /**
      * left panel (edit control)
      */
      
    
      $scope.editPanelModel = {
                                toggle : false
                              };
    
    
    
      $scope.saveFromEditPanel = function(){
    
            /**
            * TODO : 
            * should be called from edit panel
            *
            * AND
            *
            * should call all these methods
            *
            * need to get  : 
            * 
            * - line index
            * - column index
            * - basicSelectRowCollection (from edpitpanelcontroller)   --> maybe in controllerModalProxy service
            * - groupedSelectRowCollection (from edpitpanelcontroller) --> maybe in controllerModalProxy service
            * - radioRowCollection (from edpitpanelcontroller)         --> maybe in controllerModalProxy service
            */
            
            controllerModalProxy.bindSpecialCtrlTemporyModelsToProxyModel();
        
            //save config to control
            //controllerModalProxy.applyConfigToSelectedControl(self.proxyModel);
            //return current model to parent controller :
    
    
    
            // //update configuration model and formly model
            controllerModalProxy
                    .bindConfigurationModelFromProxyModel(  
                                                            controllerModalProxy.getEditPanelModelLineIndex(), 
                                                            controllerModalProxy.getEditPanelModelColumnIndex(), 
                                                            $scope.configuration
                                                          );
    
            formFieldManage.applyConfigurationToformlyModel(
                                                              $scope.configuration, 
                                                              $scope.vm.wfFormFields, 
                                                              $scope.vm.model
                                                            );
                                                                
            $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields); 
            
            ddModelConfModelProxyService.refreshControlsKeys( 
                                                      $scope.configuration, 
                                                      $scope.dragDropModel
                                                      );    
        
            controllerModalProxy.setEditPanelModelToggle(false);
            $scope.editPanelModel.toggle = controllerModalProxy.getEditPanelModelToggle();  
            ddItemRightClickedManager.resetAllDragDropItemSelectedState($scope.dragDropModel);
    
      };
      /**
      * close side panel
      * -> no update =  cancel
      */
      $scope.closeEditPanel = function(){
        /**
        * reset all rightClicked control properties to false
        */
        ddItemRightClickedManager.resetAllDragDropItemSelectedState($scope.dragDropModel);
    
    
        /**
        * TODO : refresh configuration model 
        * uncomment pafter update these next 3 lines
        * 
        * NOTE : indexLine AND  numcolumn should be stored in service and
        * updated when togle sidepanel
        */
      
        //controllerModalProxy.bindConfigurationModelFromProxyModel(indexLine, numcolumn, modalAddCtrlModel, $scope.configuration);
        //formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);    
        //$scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);     
        
        controllerModalProxy.setEditPanelModelToggle(false);
        $scope.editPanelModel.toggle = controllerModalProxy.getEditPanelModelToggle();
        
      };
    
      $scope.debugProxyModel = controllerModalProxy.ProxyModel;
    
    
    
      $scope.setRightClicked = function(previousState, item){
        item.rightCliked = true;
      };
    
    
      $scope.toggleEditPanel = function(event, lineIndex, colIndex, item){
      ddItemRightClickedManager.resetAllDragDropItemSelectedState($scope.dragDropModel);
      /**
        * already opened (could be another control edit)
        */
      if (controllerModalProxy.getEditPanelModelToggle()) {
        /**
        * - immediate close 
        * and 
        * - refresh configuration model + formly model
        */
        controllerModalProxy.setEditPanelModelToggle(false);
        $scope.editPanelModel.toggle = controllerModalProxy.getEditPanelModelToggle(); 
        
        //TODO : for refreshing
        //controllerModalProxy.bindConfigurationModelFromProxyModel(indexLine, numcolumn, modalAddCtrlModel, $scope.configuration);
        //formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);    
        //$scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields);    
                
    
    
        /**
        * check if new control right clicked otherwise just toggle side panel
        */
        if (typeof controllerModalProxy.getEditPanelModelLineIndex()    !== 'undefined' &&
            typeof controllerModalProxy.getEditPanelModelColumnIndex()  !== 'undefined' &&
            typeof controllerModalProxy.getEditPanelModelControl()      !== 'undefined') {
      
      
          if (controllerModalProxy.getEditPanelModelLineIndex()   === lineIndex &&
              controllerModalProxy.getEditPanelModelColumnIndex() === colIndex  &&
              angular.equals(controllerModalProxy.getEditPanelModelControl(), item)) {
      
              //console.info('already opened for SAME ctrl : so close - no re-open');
            
          }else{
      
              //console.info('already opened for DIFFERENT ctrl : so re-open');
    
              item.rightCliked = true;
              /**
              * set a timeout before re-opening
              * 500ms is ok for a ps-size="400px"
              */
              var timerCloseOpenedEditPanel = $timeout(function(){
                
              controllerModalProxy.setEditPanelModelLineIndex(lineIndex);
              controllerModalProxy.setEditPanelModelColumnIndex(colIndex);
              controllerModalProxy.setEditPanelModelControl(item);
              
              /**
                * control model passed to Service : controllerModalProxy
                * 
                */
              controllerModalProxy.setProxyModelFromConfigurationSelection(
                                                                            $scope.configuration,
                                                                            lineIndex, 
                                                                            colIndex
                                                                            );
              
              
              controllerModalProxy.setEditPanelModelToggle(true);
              $scope.editPanelModel.toggle = controllerModalProxy.getEditPanelModelToggle();                                         
                
              }, 200);
      
              /**
              * timerCloseOpenedEditPanel timer destruction
              */
              $scope.$on('$destroy', function(){
                    $timeout.cancel(timerCloseOpenedEditPanel);
                }
              );
          }
        }
      
      }else{
        /**
        * previous state = closed = immediate open 
        */
        //console.info('NOT already opened : so open');
        item.rightCliked = true;
          
        controllerModalProxy.setEditPanelModelLineIndex(lineIndex);
        controllerModalProxy.setEditPanelModelColumnIndex(colIndex);
        controllerModalProxy.setEditPanelModelControl(item);
        
        /**
          * control model passed to Service : controllerModalProxy
          * 
          */
        controllerModalProxy.setProxyModelFromConfigurationSelection(
                                                                      $scope.configuration,
                                                                      lineIndex, 
                                                                      colIndex
                                                                      );
    
        
        controllerModalProxy.setEditPanelModelToggle(true);
        $scope.editPanelModel.toggle = controllerModalProxy.getEditPanelModelToggle();
        
      }                       
      };
      // /**
      //  * refreshModels : to call after drag and drop events
      //  */
      // $scope.refreshModels = function(){
      //   $timeout(function(){
      //     console.info('refreshing models');
      //     formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);
      //     $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields); 
      //   }, 10);
    
    
      // };
    
    
    
      /**
      * removeThisLine event line deleted
      */
      $scope.removeThisLine = function(lineIndex){
        $scope.dragDropModel[1].splice(lineIndex,1);
      };
    
    
      $scope.model = [];
    
      function addNewline(){
        /**
        * re-render formfield
        *
        * TODO : to fix
        */
    
        formFieldManage.applyConfigurationToformlyModel($scope.configuration, $scope.vm.wfFormFields, $scope.vm.model);
        $scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy($scope.vm.wfFormFields); 
      }
    
    
      $scope.insertNewLine = function(){
                              addNewline();
                              $scope.dragDropModel[1].push([]);
                              };
    
        }
      }  
                     
    })();

/**
 *  ------------------------------------------------------
 *  directive : edaRightClickDirective
 *  ------------------------------------------------------
 *
 *  manage right click
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
    .module('edaApp.directives.edaRightClickDirective', [])
    .directive('edaRightClick', [
        '$parse', 
    	function($parse){
    	
    	return {

    		restrict: 'A',
    		 
    		link: function(scope, element, attrs) {
	    		var fn                  = $parse(attrs.edaRightClick);
                var columnIndex         = $parse(attrs.edaRightClickColIndex);
                var fctSetRightclicked  = $parse(attrs.edaSetRightClicked);
                
                /**
                 * on right click event manage
                 * - open edit panel through attrs.edaRightClick function
                 * - set rightCliked attribute (to true) to control (in dragDropModel)
                 */
    	        element.on('contextmenu', function(event) {
    	            scope.$apply(function() {
    	                event.preventDefault();

                    
                        //right click limited to template column (index = 1)                           
                        if (columnIndex(scope) === 1) {
                            //set rightClicked to true
                            fctSetRightclicked(scope, {});
                        }

                        //right click limited to template column (index = 1)   
    	                if (columnIndex(scope) === 1) fn(scope, {$event:event});
    	            });
    	        });	



    		}
    	};
    }]);
/**
 *  ------------------------------------------------------
 *  directive : stRatio
 *  ------------------------------------------------------
 *
 * adapt element's width % 
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
	.module('edaApp.directives.edaStRationDirective', [])
	.directive('stRatio',[

  function(){

        return {
        	restrict: 'A',

          link:function(scope, element, attr){
            var ratio=+(attr.stRatio);
            
            element.css('width',ratio+'%');
            
          }
        };
}]);
/**
 *  ------------------------------------------------------
 *  service : dragDropItemDecorationService
 *  ------------------------------------------------------
 *
 *  service that helps manipulating drag drop item class
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
	.module('edaApp.services.dragDropItemCountersService', [])
	.factory('dragDropItemCounterService', ['dragDropConfig', 
	
	function(dragDropConfig){

		var _modelItemRealCounter = [];
		var _itemsNotToCount = angular.copy(dragDropConfig.getItemsNotToCount());

		var Service = {};
		
		Service.getItemsNotToCount = function(){
																	return _itemsNotToCount;
																	}; 

		Service.getModelItemsRealCounter = function(){
																		  	return _modelItemRealCounter;
																				};

		Service.isHtmlElementToCount = function(htmlvalue){
																			var isToCount = true;
																			if (htmlvalue.length > 0) {

																				angular.forEach(_itemsNotToCount, function(value){

																					for (var classes = htmlvalue.length - 1; classes >= 0; classes--) {
																						if (htmlvalue[classes] === value){
																							isToCount = isToCount & false;
																						}
																					}

																				});
																			}
																			
																			return isToCount;	
																		};
																																			
		Service.updateLineItemCss = function(fullModel, listCssToApply, columIndex, lineIndex, realCount){
																	  if (typeof fullModel 			!== 		'undefined' &&
																	  	  typeof listCssToApply !== 		'undefined' &&
																	  	  typeof columIndex 		!== 		'undefined' &&
																	  	  typeof lineIndex 			!== 		'undefined' &&
																	  	  typeof realCount 			!== 		'undefined') {

																					for (var i = fullModel[columIndex][lineIndex].length - 1; i >= 0; i--) {
																						
																						for (var j = 0; j < listCssToApply.length; j++) {
																							if(listCssToApply[j].item === i &&
																								 listCssToApply[j].isReal === true){

																								fullModel[columIndex][lineIndex][i].cssClass = dragDropConfig.getItemCssDependingNumberItemsInRow(realCount);
																							} 	
																						}

																					}																					
																					return true;
																				}
																			};
		
		return Service;

}]);
/**
 *  ------------------------------------------------------
 *  service : ddItemRightClickedManager
 *  ------------------------------------------------------
 *
 *  service that helps managing right clicked controls 
 *  (right clicking control open side edit panel)
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
	.module('edaApp.services.ddItemRightClickedManager', [])
	.factory('ddItemRightClickedManager', [
		 
		function(){

			var Service = {};

			/**
			 * setUnRightClicked 
			 * set unSelected (see edaRightClick directive)
			 *
			 * used in edaEditcontroller when droping control
			 */
			Service.setUnRightClicked = function(dragDropModelItem){
				dragDropModelItem.rightCliked = false;
			};

			/**
			 * resetAllDragDropItemSelectedState
			 *
			 * simply reset (=set to false) all item.rightCliked 
			 * in edit column (dragable column)
			 *
			 * used in edaEditPanel when closeEditPanel() called
			 */
			Service.resetAllDragDropItemSelectedState = function(dragDropModel){
				/**
				 * iterates through lines
				 * NOTE : 
				 * - dragDropModel[1] since it is dragable column
				 * - dragDropModel[0] is just the "pick up controls" column
				 */
				angular.forEach(dragDropModel[1] ,function(line){
					angular.forEach(line, function(item){
						item.rightCliked = false;
					});
				});

			};

			return Service;
		}
	]);
/**
 *  ------------------------------------------------------
 *  service : dragDropItemDecorationService
 *  ------------------------------------------------------
 *
 *  service that helps manipulating drag drop item class
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
	.module('edaApp.services.dragDropItemDecorationService', [])
	.factory('dragDropItemDecorationService', 
																			['dragDropConfig',  
	
	function(dragDropConfig){

		var _listItemClass = [].concat(dragDropConfig.getListItemCssClass());

		var Service = {};

		Service.getListClass = function(){
														return _listItemClass;
														};

	  Service.getCssClassWhenNumberItemsInRowIs = function(thisNumber){
	  																						return dragDropConfig.getItemCssDependingNumberItemsInRow(thisNumber);
																								}; 

		Service.applyCssClassWholeLine = function(model, indexColumn, indexLine, numberItems, restrictToThisIndexColumn){
		  if (typeof numberItems !== 'undefined' &&
		  	  typeof indexLine !== 'undefined' &&
		  	  typeof indexColumn !== 'undefined' &&
		  	  typeof model !== 'undefined' &&
		  	  typeof restrictToThisIndexColumn !== 'undefined') {

		    if (indexColumn === restrictToThisIndexColumn) {

	        for (var i = model[indexColumn][indexLine].length - 1; i >= 0; i--) {
		          model[indexColumn][indexLine][i].cssClass = dragDropConfig.getItemCssDependingNumberItemsInRow(numberItems);
		      }

		    } 
		    return true;
		  }else{
		    return false;
		  }
		};

		Service.updateCssClassWholeColumn = function(model, indexColumn){

		  if (typeof indexColumn !== 'undefined' &&
		  	  typeof model !== 'undefined') {

		   	/**
		   	 * iterates through rows
		   	 */
		   	for (var cpt = model[indexColumn].length - 1; cpt >= 0; cpt--) {
			   	/**
			   	 * iterates through items
			   	 */
		      for (var i = model[indexColumn][cpt].length - 1; i >= 0; i--) {
		          model[indexColumn][cpt][i].cssClass = dragDropConfig.getItemCssDependingNumberItemsInRow(model[indexColumn][cpt].length);
		      }
		   	}	

		    return true;
			}else{
				return false;
			}
		};

		return Service;

}]);
/**
 *  ------------------------------------------------------
 *  service : dragDropModelConfigModelProxyService
 *  ------------------------------------------------------
 *
 *  service that helps to bind drag drop model to configuration model
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

angular
	.module('edaApp.services.dragDropModelConfigModelProxyService', [])
	.factory('ddModelConfModelProxyService', [	'EasyFormGenFormlyBindingModels',
																							'controllerModalProxy',
																							'dragDropConfig',
																							'$parse',
		function( EasyFormGenFormlyBindingModels, controllerModalProxy, dragDropConfig, $parse){


			/**
			 * return a control model that is more formly detailed
			 * (more formly detailed : see controls property in EasyFormGenFormlyBindingModels._easyFormListControls)
			 */
			function getFormlyDetailedControlModelFromDragDropObject(dragDrapCtrlModel){
				var controlModel = {};
				var listControl = EasyFormGenFormlyBindingModels.getEasyFormListControls();
				var controlsListGetter = $parse('controls');

				angular.forEach(controlsListGetter(listControl), function(ctrlListValue){
					if (ctrlListValue.id === dragDrapCtrlModel.control)  controlModel = ctrlListValue;
				});

				return controlModel;
			}

			/**
			 * valid a control key is unique
			 *
			 * yes... function name already told us that, 
			 * -> it's just confirmation and to see if
			 *    you keep focus while reading it ^^
			 */
			function validKeyUniqueness(thisKey, configurationObj){
			  var isUnique = true;
			  for (var i = configurationObj.lines.length - 1; i >= 0; i--) {
			    for (var j = configurationObj.lines[i].columns.length - 1; j >= 0; j--) {
			    	if (typeof configurationObj.lines[i].columns[j].control !== 'undefined') {
				      if (configurationObj.lines[i].columns[j].control.key === thisKey) {
				        isUnique = false;
				      }			    		
			    	}
			    } 
			  }
			  return isUnique;  
			} 


			function createUniqueKey(baseKeyValue, configurationObj){
				/**
	       * unique key (set only first time) in this model is formly control type + Date.now(); 
	       */

	      var newKey = baseKeyValue + '-' + Date.now();
	      if (validKeyUniqueness(newKey, configurationObj) === true){
	        return newKey;
	      }else{
	        newKey = baseKeyValue + '-' + Date.now();
	        if (validKeyUniqueness(newKey, configurationObj) === true){
	          return newKey;
	        }else{
	          newKey = baseKeyValue + '-' + Date.now();
	          return newKey;
	        }
	      } 


			}

			/**
			 * apply this line
			 */
			function applyThisLine(linevalue, lineIndex, configModel){
				angular.forEach(configModel.lines, function(aLineValue, aLineKey){
					if (aLineKey === lineIndex){ 
						aLineValue.line = linevalue;
					}
				});
			}

			/**
			 * bind formly detailed model to configuration control model
			 */
			function bindConfigCtrlModelFromFormlyDetailedCtrlModel(formlyDetailCtrlModel, configurationCtrlModel, configModel){
				/**
				 *
				 * 
				 * TODO :properties should be served by provider 
				 *
				 * more configurable without pain
				 *
				 */
				//set selected control :
				$parse('control.selectedControl')
					.assign(configurationCtrlModel, $parse('selectedControl')(formlyDetailCtrlModel));

				//set type :	
				$parse('control.type')
					.assign(configurationCtrlModel, $parse('formlyType')(formlyDetailCtrlModel));

				//set key :	
				$parse('control.key')
					.assign(configurationCtrlModel, createUniqueKey($parse('control.type')(configurationCtrlModel), configModel));

				//set subtype :	
				$parse('control.subtype')
					.assign(configurationCtrlModel, $parse('formlySubtype')(formlyDetailCtrlModel));

				//set templateOptions.label :	
				$parse('control.templateOptions.label')
					.assign(configurationCtrlModel, $parse('formlyLabel')(formlyDetailCtrlModel));					

				//set templateOptions.required :	
				$parse('control.templateOptions.required')
					.assign(configurationCtrlModel, $parse('formlyRequired')(formlyDetailCtrlModel));	

				//set templateOptions.required :	
				$parse('control.templateOptions.description')
					.assign(configurationCtrlModel, $parse('formlyDesciption')(formlyDetailCtrlModel));	

				//set templateOptions.required :	
				$parse('control.templateOptions.placeholder')
					.assign(configurationCtrlModel, $parse('formlyPlaceholder')(formlyDetailCtrlModel));

				//set templateOptions.required :	
				$parse('control.templateOptions.options')
					.assign(configurationCtrlModel, $parse('formlyOptions')(formlyDetailCtrlModel));


 				if ($parse('control.type')(configurationCtrlModel) === 'datepicker') {

					$parse('control.templateOptions.datepickerPopup')
						.assign(configurationCtrlModel, $parse('datepickerPopup')(formlyDetailCtrlModel));

			  }    

			}


			var Service = {};

			/**
			 * refreshAllConfigurationFromDragAndDropModel 
			 */
			Service.refreshAllConfigurationFromDragAndDropModel = function(configModel, ddModel){
				/**
				 * TODO : prevent reset already set props
				 * 
				 * previousConfigurationModel = a backup of configuration model 'configModel 'before resetting it
				 * 
				 * -> dragDrop model contains unique keys of already existing controls : these controls must not be reset / overwritten  
				 * 
				 */
				var previousConfigurationModel = angular.copy(configModel); 
				
				
				configModel.lines = [];
				/**
				 * iterates line config model
				 */
				angular.forEach(ddModel[1], function(lineValue, keyValue){
					/**
					 * add empty line 1st 
					 * if line is empty -> it will be enough
					 */
					configModel.lines.push(angular.copy(EasyFormGenFormlyBindingModels.getEasyFormEmptyConfigurationLineModel()));
					/**
					 * update line value field
					 */
					applyThisLine(keyValue + 1, keyValue, configModel);
					/**
					 * iterate through columns
					 * and add them if control exists
					 */	
					angular.forEach(lineValue, function(colValue, colIndex){
				    	/**
				    	 * push an empty control model but relative to dradrop : model control type
				    	 * (if datepicker so additionnal properties are added)
				    	 */ 	
							var controlToBind = 
									{
				    				control : angular
				    										.copy(EasyFormGenFormlyBindingModels
				    														.getFormlyControlTemplateForNcolumnLine(	
																																									lineValue.length, 
				    																																			getFormlyDetailedControlModelFromDragDropObject(lineValue[colIndex]).formlyType
				    																																		)
				    													)
				    			};
							var formlyDetailedControlModel = getFormlyDetailedControlModelFromDragDropObject(lineValue[colIndex]);
							/**
							 * controls alreadys existed so do not reset it
							 * 
							 * control to bind is the previous one
							 */		
							if(typeof colValue.key !== 'undefined'){
								//console.warn('debug dragdropModel show this control key : ' + colValue.key);
								
								controlToBind.control = angular.copy(colValue.configModelControl);
								//update cssClass depending new position:
								var newClassName = EasyFormGenFormlyBindingModels
												    														.getFormlyControlTemplateForNcolumnLine(	
																																									lineValue.length, 
				    																																			getFormlyDetailedControlModelFromDragDropObject(lineValue[colIndex]).formlyType
				    																																	);
							controlToBind.control.className = newClassName.className;
							//test if header nee this one
							controlToBind.control.cssClass = newClassName.className;
							
																																														
								/**
								 * get control details for this key in backup : previousConfigurationModel
								 */
							}else{
								
								/**
								* controls did not exists before : control to bind is a new one
								* bind dragdrop control properties to configuration model through controlToBind var
								*/
								bindConfigCtrlModelFromFormlyDetailedCtrlModel(	
																																formlyDetailedControlModel, //getFormlyDetailedControlModelFromDragDropObject(lineValue[colIndex]), 
																																controlToBind, 
																																configModel
																															);
							}	
				    	/**
				    	 * apply controlToBind var to configuration model control
				    	 */
				    	if (typeof configModel.lines[keyValue].columns[colIndex] === 'undefined') configModel.lines[keyValue].columns.push(angular.copy( EasyFormGenFormlyBindingModels.getEasyFormConfigurationEmptyControlModel())); 

							
							configModel.lines[keyValue].columns[colIndex].control 	= angular.copy(controlToBind.control);
				    	configModel.lines[keyValue].columns[colIndex].numColumn = colIndex + 1;
				    	configModel.lines[keyValue].columns[colIndex].exist 		= true;

					});
										
				});
				
				return configModel;
			};
			
			/**
			 * drag drop model
			 * -> will be used to bind configuration model
			 * 	of no key saved, configuration model controls would be reset each drop events
			 * 
			 * -> matching key : will prevent to reset existing control
			 */
			Service.refreshControlsKeys = function(configModel, dragDropModel){				
				
				angular.forEach(configModel.lines, function(aConfigLine, aConfigLineIndex){						
						angular.forEach(aConfigLine.columns, function(aConfigControl, aConfigControlIndex){
							//if last control removed from line
							//and dragDrop model did not already removed this line
							if(typeof dragDropModel[1][aConfigLineIndex] !== 'undefined'){
								if(dragDropModel[1][aConfigLineIndex].length > 0){
									dragDropModel[1][aConfigLineIndex][aConfigControlIndex].key = aConfigControl.control.key;
									//need to save all in dragdropModel as it is a reference
									//configModel still needed 
									// -> to keep coherence (same back model) between all version of easyForm Generator
									// -> is the back model (can be saved to dataBase)
									dragDropModel[1][aConfigLineIndex][aConfigControlIndex].configModelControl = angular.copy(aConfigControl.control);										
									
								}
							
							}

						});
				});

				// console.info('refreshControlsKeys');
				// console.dir(	
				// 							{
				// 									'when' 							: 'starting',
				// 									'configModel is ' 	: angular.copy(configModel),
				// 									'dragDropModel is ' : angular.copy(dragDropModel)
				// 							}
				// 						);
								
			};

			/**
			 * drag drop model
			 * -> will be used to bind configuration model
			 * 	of no key saved, configuration model controls would be reset each drop events
			 * 
			 * -> matching key : will prevent to reset existing control
			 */
			Service.loadDragDropModelFromConfigurationModel = function(configModel, dragDropModel){				
				//reset dragdrop fields model NOT all dragDropModel!
				dragDropModel[1] = [];
				
				angular.forEach(configModel.lines, function(aConfigLine, aConfigLineIndex){
					//add new line
					dragDropModel[1].push([]);
					angular.forEach(aConfigLine.columns, function(aConfigControl, aConfigControlIndex){
						
						/**
						 * get control type from configuration.control.selectedControl
						 */
						
						var dragdropControlRef = {
							control: 'empty',
							cssClass : 'col-xs-12',
							label: '<div class="col-md-12"> <div class="form-group"> <div class=""> </div> </div></div>'
						};
						
						angular.forEach(dragDropModel[0], function(groupOfCtrlRef, groupOfCtrlRefIndex){
							angular.forEach(groupOfCtrlRef, function(aCtrlref, aCtrlRefIndex){
								if (aCtrlref.control === aConfigControl.control.selectedControl) {
									dragdropControlRef = angular.copy(aCtrlref);
								}
							});
						});
							
						dragDropModel[1][aConfigLineIndex].push(dragdropControlRef);
						
						//update class depending number of control per line
						var cssClassToApply = dragDropConfig.getItemCssDependingNumberItemsInRow(dragDropModel[1][aConfigLineIndex].length);
						angular.forEach(dragDropModel[1][aConfigLineIndex], function(ddControlToUpdate){
						ddControlToUpdate.cssClass = cssClassToApply;
							
						});
						
					});	
											
											
											
				});

				// console.info('bindDragDropModelFromConfigurationModel');
				// console.dir(	
				// 							{
				// 									'when' 							: 'starting',
				// 									'configModel is ' 	: angular.copy(configModel),
				// 									'dragDropModel is ' : angular.copy(dragDropModel)
				// 							}
				// 						);
								
			};

			return Service;


	}]);


/**
 *  ------------------------------------------------------
 *  service : controllerModalProxy
 *  ------------------------------------------------------
 *
 *  service dedicated to - edit control - (controller modal proxy)
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
	.module('edaApp.services.edaEditCtrlControllerModalProxy', [])
	.factory('controllerModalProxy', [	'EasyFormGenFormlyBindingModels',

	function( EasyFormGenFormlyBindingModels ){
		

				
		/***
		 * Service itself (no more no less)
		 */
		var Service = {};

		/**
		 * model shared between 
		 * 
		 * - main controller (where configuration model comes from)
		 * AND
		 * - modal or sidepanel controller (where controls are configured/customized)
		 */
		Service.ProxyModel = {};//angular.copy(EasyFormGenFormlyBindingModels.getEasyFormListControls());
		resetProxyModel();
// 		/**
// 		 * deprecated : in drag and drop version
// 		 * 							use "resetProxyModel()"" 
// 		 */
	  function resetNyaSelect(nyaSelectObj){

	    var newNyaSelectObj = EasyFormGenFormlyBindingModels.getEasyFormListControls();

	  	angular.copy(newNyaSelectObj, nyaSelectObj);
	    return true;
	  }
		
		/**
		 * reset proxyModel
		 */
	  function resetProxyModel(){

	    var newProxyModel = EasyFormGenFormlyBindingModels.getEasyFormListControls();

	  	Service.proxyModel = angular.copy(newProxyModel);
	    return true;
	  }		
	  
	  function returnControlFromAddCtrlModalModel(CtrlModalModel){

	    var modelToReturn = {
	          selectedControl		: 'none',
	          formlyType 				: 'none',
	          formlySubtype			: 'none',
	          formlyLabel				: '',
	          formlyRequired 		: false,
	          formlyDesciption	: '',
	          formlyPlaceholder	: '',
	          formlyOptions			: []
	    };

	    for (var i = CtrlModalModel.controls.length - 1; i >= 0; i--) {
	      if (CtrlModalModel.selectedControl === CtrlModalModel.controls[i].id) {

	        modelToReturn.selectedControl 	= CtrlModalModel.selectedControl;
	        modelToReturn.formlyType 				= CtrlModalModel.controls[i].formlyType;
	        modelToReturn.formlySubtype 		= CtrlModalModel.controls[i].formlySubtype;
	        modelToReturn.formlyLabel 			= CtrlModalModel.controls[i].formlyLabel;
	        modelToReturn.formlyRequired 		= CtrlModalModel.controls[i].formlyRequired;
	        modelToReturn.formlyDesciption 	= CtrlModalModel.controls[i].formlyDesciption;
	        modelToReturn.formlyPlaceholder = CtrlModalModel.controls[i].formlyPlaceholder;
	        modelToReturn.formlyOptions 		= CtrlModalModel.controls[i].formlyOptions;
	        /**
	         * particular properties 
	         * 
	         * here ; datetpicker format
	         */
	        if (CtrlModalModel.controls[i].formlyType === 'datepicker') {
						modelToReturn.datepickerPopup = CtrlModalModel.controls[i].datepickerPopup;   
	        }
	      }
	    }
	    return modelToReturn;
	  }
	  
	  function validKeyUniqueness(thisKey, configurationObj){
	    var isUnique = true;
	    for (var i = configurationObj.lines.length - 1; i >= 0; i--) {
	      for (var j = configurationObj.lines[i].columns.length - 1; j >= 0; j--) {
	        if (configurationObj.lines[i].columns[j].control.key === thisKey) {
	          isUnique = false;
	        }
	      } 
	    }
	    return isUnique;  
	  }

// 	  /**
// 	   * return selected control ID (proxyModel)
// 	   * -> from configuration model selected indexes (line, column) 
// 	   * 		+ control.formlyType 
// 	   *   	+ control.formlySubtype
// 	   */
// 	  function getSelectedProxyModel(configurationSelectedCtrl){
// 	  	var selectedProxyModelControl = 'none';
// 	  	var listProxyModelCTRL = angular.copy(EasyFormGenFormlyBindingModels
// 	  																					.getEasyFormListControls().controls);
// 
// 	  	listProxyModelCTRL.forEach(function(control){
// 	  		if (control.formlyType 		=== configurationSelectedCtrl.type &&
// 	  				control.formlySubtype === configurationSelectedCtrl.subtype) {
// 
// 	  				selectedProxyModelControl = control.id;
// 	  				
// 	  				return selectedProxyModelControl;
// 
// 	  		}
// 	  	});
// 
// 
// 	  	return selectedProxyModelControl;
// 	  }
// 
// 		/**
// 		 * deprecated in drag and drop version
// 		 * 
// 		 * use initProxyModel insead
// 		 */
		Service.initNyaSelect = function(nyaSelectObj){
    	return resetNyaSelect(nyaSelectObj);
    };
// 
// 		/**
// 		 * return nyaSelectModel from Selected control in configuration model
// 		 * 
// 		 * note : deprecated in drag and drop version since no modal involved so just set private nyasSelect object.
// 		 * 				-> in drag and drop version : use 'setProxyModelFromConfigurationSelection' instead 
// 		 * 					to set private object that will be readable to side edit panel
// 		 */
//     Service.getNyASelectFromSelectedLineColumn = function(nyaSelectObj, configurationObj, indexLine, numcolumn){
// 	    resetNyaSelect(nyaSelectObj);  
// 	    /**
// 	     * data send to modal controller
// 	     */
// 	    if (typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions != 'undefined') {
// 
// 	      nyaSelectObj.temporyConfig.selectedControl 		= typeof configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl : 'none';
// 	      nyaSelectObj.temporyConfig.formlyLabel 				= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label : '';
// 	      nyaSelectObj.temporyConfig.formlyRequired	 		= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required : '';
// 	      nyaSelectObj.temporyConfig.formlyDesciption 	= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description : '';
// 	      nyaSelectObj.temporyConfig.formlyPlaceholder 	= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder : '';
// 	      nyaSelectObj.temporyConfig.formlyOptions 			= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options : '';
// 	      /**
// 	       * particular case : datepicker
// 	       */
// 	      if (nyaSelectObj.temporyConfig.selectedControl === 'Date') {
// 	      	nyaSelectObj.temporyConfig.datepickerPopup = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup : '';
// 	      }
// 	    }
// 	    return nyaSelectObj;
// 		};
// 	
// 		
// 		/**
// 		 * deprecated in drag and drop version : 
// 		 * 	use bindConfigurationModelFromProxyModel to refresh configuration after control update in side panel
// 		 * 
// 		 * will be used in closePanel
// 		 */
// 		Service.bindConfigurationModelFromModalReturn =  function(indexLine, numcolumn, modalAddCtrlModel, configurationObj){
// 				      
// 				      var extractedProps = returnControlFromAddCtrlModalModel(modalAddCtrlModel);
// 
// 				      configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl 	= extractedProps.selectedControl;
// 				      configurationObj.lines[indexLine].columns[numcolumn].control.type 						= extractedProps.formlyType;
// 				      configurationObj.lines[indexLine].columns[numcolumn].control.subtype 					= extractedProps.formlySubtype;
// 				      /**
// 				       * templateOptions
// 				       */
// 				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions = {
// 		                                                                                            label				: '',
// 		                                                                                            required		: false,
// 		                                                                                            description	: '',
// 		                                                                                            placeholder	: '',
// 		                                                                                            options			: []
// 				                                                                                      };
// 				       /**
// 				        * then bind template option
// 				        */
// 				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label 				= extractedProps.formlyLabel;
// 				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required 		= extractedProps.formlyRequired;
// 				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description 	= extractedProps.formlyDesciption;
// 				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder 	= extractedProps.formlyPlaceholder;
// 				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options 			= extractedProps.formlyOptions;
// 
// 				      /**
// 				       * add additionnal — particular — properties :
// 				       * 
// 				       * -> datepicker : datepickerPopup
// 				       */
// 				      if (configurationObj.lines[indexLine].columns[numcolumn].control.type === 'datepicker') {
// 				       	configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup = extractedProps.datepickerPopup;
// 				      }	
// 
// 				      /**
// 				       * unique key (set only first time) in this model is formly control type + Date.now(); 
// 				       */
// 				      var newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();
// 
// 			        if (validKeyUniqueness(newKey, configurationObj) === true){
// 			          configurationObj.lines[indexLine].columns[numcolumn].control.key = newKey;
// 			        }else{
// 			          newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();
// 			          if (validKeyUniqueness(newKey, configurationObj) === true){
// 			            configurationObj.lines[indexLine].columns[numcolumn].control.key = newKey;
// 			          }else{
// 			            newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();
// 			          }
// 			        }                                                                     
// 
// 				      configurationObj.lines[indexLine].columns[numcolumn].control.edited = true;
// 
// 		};
// 
// 		Service.applyConfigToSelectedControl = function(nyaSelectObj){
// 				  	
// 				    for (var i = nyaSelectObj.controls.length - 1; i >= 0; i--) {
// 				      if (nyaSelectObj.controls[i].id === nyaSelectObj.selectedControl) {
// 
// 				          nyaSelectObj.controls[i].formlyLabel 				= nyaSelectObj.temporyConfig.formlyLabel;
// 				          nyaSelectObj.controls[i].formlyRequired 		= nyaSelectObj.temporyConfig.formlyRequired;
// 				          nyaSelectObj.controls[i].formlyDesciption 	= nyaSelectObj.temporyConfig.formlyDesciption;
// 				          nyaSelectObj.controls[i].formlyPlaceholder 	= nyaSelectObj.temporyConfig.formlyPlaceholder;
// 				          nyaSelectObj.controls[i].formlyOptions 			= nyaSelectObj.temporyConfig.formlyOptions;
// 
// 				          if (nyaSelectObj.controls[i].id ==='Date' ) {
// 				          	nyaSelectObj.controls[i].datepickerPopup 	= nyaSelectObj.temporyConfig.datepickerPopup;  	
// 				          }
// 				        
// 				       }
// 				    }
// 		};

		/**
		 * ============================================================
		 * following methods for "proxyModell"
		 * 
		 * Note this model : 
		 * - to share control model between 
		 * 	+ main controller (configuration model one)
		 * 	+ edit panel controller (where apply customization to a selected control)
		 * ============================================================
		 */
		
		 
		/**
		 * reset proxy model
		 */
		Service.initProxyModel = function(thisProxyModelToInit){
    	return resetProxyModel(thisProxyModelToInit);
    };		 
		 
		/**
		 * to refresh configuration model from edit panel
		 */
		Service.bindConfigurationModelFromProxyModel =  function(indexLine, numcolumn, configurationObj){
				      
				      var extractedProps = angular.copy(Service.proxyModel.temporyConfig);
							
							/**
							 * debug : todel this lines
							 */
							console.warn('debug edaEditCtrlControllerModalProxy'); 
							console.dir(extractedProps);

				      configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl 	= extractedProps.selectedControl;
				      configurationObj.lines[indexLine].columns[numcolumn].control.type 						= extractedProps.formlyType;
				      configurationObj.lines[indexLine].columns[numcolumn].control.subtype 					= extractedProps.formlySubtype;
				      /**
				       * templateOptions
				       */
				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions = {
		                                                                                            label				: '',
		                                                                                            required		: false,
		                                                                                            description	: '',
		                                                                                            placeholder	: '',
		                                                                                            options			: []
				                                                                                      };
				       /**
				        * then bind template option
				        */
				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label 				= extractedProps.formlyLabel;
				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required 		= extractedProps.formlyRequired;
				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description 	= extractedProps.formlyDesciption;
				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder 	= extractedProps.formlyPlaceholder;
				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options 			= extractedProps.formlyOptions;

				      /**
				       * add additionnal — particular — properties :
				       * 
				       * -> datepicker : datepickerPopup
				       */
				      if (configurationObj.lines[indexLine].columns[numcolumn].control.type === 'datepicker') {
				       	configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup = extractedProps.datepickerPopup;
				      }	

				      /**
				       * unique key (set only first time) in this model is formly control type + Date.now(); 
				       */
				      var newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();

			        if (validKeyUniqueness(newKey, configurationObj) === true){
			          configurationObj.lines[indexLine].columns[numcolumn].control.key = newKey;
			        }else{
			          newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();
			          if (validKeyUniqueness(newKey, configurationObj) === true){
			            configurationObj.lines[indexLine].columns[numcolumn].control.key = newKey;
			          }else{
			            newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();
			          }
			        }                                                                     

				      configurationObj.lines[indexLine].columns[numcolumn].control.edited = true;

		};		 
		 
		 
		/**
		 * set local proxyModel from Selected control in configuration model
		 * 
		 * replace deprecated "getNyASelectFromSelectedLineColumn"
		 * -model is now named "proxyModel"
		 * -model is stored in this service 
		 * 
		 * -> it has just more sence!
		 */
		
    Service.setProxyModelFromConfigurationSelection = function(configurationObj, indexLine, numcolumn){
	    /**
	     * data send to modal controller
	     */
	    if (typeof configurationObj.lines[indexLine].columns[numcolumn].control != 'undefined') {

	    	/**
	    	 * determine selected control from indexes 
	    	 * and control.type and control.subtype in configuration model
	    	 */

	    	Service.proxyModel.selectedControl 									= typeof configurationObj.lines[indexLine].columns[numcolumn].control.type != 'undefined' ? this.getSelectedProxyModel(configurationObj.lines[indexLine].columns[numcolumn].control) : 'none';
	      Service.proxyModel.temporyConfig.selectedControl 		= typeof configurationObj.lines[indexLine].columns[numcolumn].control.type != 'undefined' ? this.getSelectedProxyModel(configurationObj.lines[indexLine].columns[numcolumn].control) : 'none';
				
				Service.proxyModel.temporyConfig.formlyType 				= typeof configurationObj.lines[indexLine].columns[numcolumn].control.type != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.type: 'none';
				Service.proxyModel.temporyConfig.formlySubtype 			= typeof configurationObj.lines[indexLine].columns[numcolumn].control.subtype != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.subtype : 'none';
				
	      Service.proxyModel.temporyConfig.formlyLabel 				= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label : '';
	      Service.proxyModel.temporyConfig.formlyRequired	 		= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required : '';
	      Service.proxyModel.temporyConfig.formlyDesciption 	= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description : '';
	      Service.proxyModel.temporyConfig.formlyPlaceholder 	= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder : '';
	      Service.proxyModel.temporyConfig.formlyOptions 			= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options : '';
	      /**
	       * particular case : datepicker
	       */
	      if (Service.proxyModel.temporyConfig.selectedControl === 'Date') {
	      	Service.proxyModel.temporyConfig.datepickerPopup = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup : '';
	      }
	    }

	    
	    // console.info('setProxyModelFromConfigurationSelection');
	    // console.dir(	
	    // 							{
	    // 								'fromService' : 'setProxyModelFromConfigurationSelection method',
	    // 								'after' : 'applied config',
	    // 								'Service.proxyModel' 	: angular.copy(Service.proxyModel)
	    // 							}
	    // 						);


	    return Service.proxyModel;
		};			 

		Service.getProxyModel = function(){
			return Service.proxyModel;
		};


		/**
		 * ============================================================
		 * following methods for "editPanelModel"
		 * 
		 * Note this model : 
		 * - to manage side edit control panel
		 * ============================================================
		 */
		 
		var editPanelModel = {
                            toggle : false,
                            lineIndex : -1,
                            columnIndex : -1,
                            control : {}
                          };
				 
		/**
		 * getter : editPanelModel (whole model => type = object)
		 */			 
		Service.getEditPanelModelAllModel = function(){
			return editPanelModel;
		};
		/**
		 * setter : editPanelModel (whole model => type = object)
		 */		
		Service.setEditPanelModelControl = function(newEditPanelModel){
			var successfullDone  = false;
			
			if (typeof newEditPanelModel !== 'undefined') {
				editPanelModel = angular.copy(newEditPanelModel);
				successfullDone = true;	
			}
			
			return successfullDone;
		};		
		
		
		/**
		 * getter : editPanelModel.columnIndex
		 */		
		Service.getEditPanelModelColumnIndex = function(){
			return editPanelModel.columnIndex;
		};
		/**
		 * setter : editPanelModel.columnIndex
		 */				
		Service.setEditPanelModelColumnIndex = function(newColumnIndex){
			var successfullDone  = false;
			
			if (typeof newColumnIndex !== 'undefined') {
				editPanelModel.columnIndex = newColumnIndex;
				successfullDone = true;	
			}
			
			return successfullDone;
		};		
		
		
		/**
		 * getter : editPanelModel.lineIndex
		 */			
		Service.getEditPanelModelLineIndex = function(){
			return editPanelModel.lineIndex;
		};
		/**
		 * setter : editPanelModel.lineIndex
		 */		
		Service.setEditPanelModelLineIndex = function(newLineIndex){
			var successfullDone  = false;
			
			if (typeof newLineIndex !== 'undefined') {
				editPanelModel.lineIndex = newLineIndex;
				successfullDone = true;	
			}
			
			return successfullDone;
		};

		/**
		 * getter : editPanelModel.control
		 */		
		Service.getEditPanelModelControl = function(){
			return editPanelModel.control;
		};		
		/**
		 * setter : editPanelModel.control
		 */
		Service.setEditPanelModelControl = function(newControl){
			var successfullDone  = false;
			
			if (typeof newControl !== 'undefined') {
				//editPanelModel.control = angular.copy({});
				editPanelModel.control = angular.copy(newControl);
				successfullDone = true;	
			}
			
			return successfullDone;
		};

		/**
		 * getter : editPanelModel.toggle
		 */
		Service.getEditPanelModelToggle = function(){
			return editPanelModel.toggle;
		};
		/**
		 * setter : editPanelModel.toggle
		 */
		Service.setEditPanelModelToggle = function(newToggleValue){
			var successfullDone  = false;
			
			if (typeof newToggleValue !== 'undefined') {
				editPanelModel.toggle = newToggleValue;
				successfullDone = true;	
			}
			
			return successfullDone;
		};

		
		/**
		 * special controls bindings from edit panel
		 * -> controls like basic select, radio and groupe select
		 */
		
		/**
		 * special controls temporay models
		 *
		 * -> helps in side panel to add aditionnal properties 
		 * like options for selects...
		 */
		var initOptionModel 								= { rows:[] };

		Service.basicSelectRowCollection 		= angular.copy(initOptionModel);
		Service.newOptionBasicSelect 				= angular.copy({ saisie: '' });

		Service.groupedSelectRowCollection 	= angular.copy(initOptionModel);
		Service.newOptionGroupedSelect 			= angular.copy({ saisie: '' });
		Service.GroupedSelectGroups 				= angular.copy({ list:[] });
		Service.newGroupGroupedSelect 			= angular.copy({ saisie: '' });
		Service.groupSelectGroupClick 			= angular.copy({ showList : false });

		Service.radioRowCollection 					= angular.copy(initOptionModel);
		Service.newOptionRadio 							= angular.copy({ saisie: '' });

		Service.resetAllTemporyModels = function(){
			//basic select : shallow copy way (= basicSelectRowCollection shared with groupedSelectRowCollection and radioRowCollection)
			//Service.basicSelectRowCollection 		= initOptionModel;
			//Service.newOptionBasicSelect 				= { saisie: '' };

			//basic select :  deep copy way :
			Service.basicSelectRowCollection 		= angular.copy(initOptionModel);
			Service.newOptionBasicSelect 				= angular.copy({ saisie: '' });

			//grouped select : shallow copy way :
			// Service.groupedSelectRowCollection 	= initOptionModel;
			// Service.newOptionGroupedSelect 			= { saisie: '' };
			// Service.GroupedSelectGroups 				= { list:[] };
			// Service.newGroupGroupedSelect 			= { saisie: '' };
			// Service.groupSelectGroupClick 			= { showList : false };

			//grouped select :  deep copy way :
			Service.groupedSelectRowCollection 	= angular.copy(initOptionModel);
			Service.newOptionGroupedSelect 			= angular.copy({ saisie: '' });
			Service.GroupedSelectGroups 				= angular.copy({ list:[] });
			Service.newGroupGroupedSelect 			= angular.copy({ saisie: '' });
			Service.groupSelectGroupClick 			= angular.copy({ showList : false });

			//radio : shallow copy way :
			// Service.radioRowCollection 					= initOptionModel;
			// Service.newOptionRadio 							= { saisie: '' };

			//radio : deep copy way :
			Service.radioRowCollection 					= angular.copy(initOptionModel);
			Service.newOptionRadio 							= angular.copy({ saisie: '' });

			return true;
		};		

	/**
	 * bindSpecialCtrlTemporyModelsToProxyModel: needed when validating after editing a control
	 * tempory models applied to proxyModel if control is one of these
	 *
	 * example : if selected control is a basic select options 
	 * -> so its tempory models are bound to proxyModel
	 */
	Service.bindSpecialCtrlTemporyModelsToProxyModel = function(){
		if (Service.proxyModel.selectedControl === 'BasicSelect') {
		  Service.bindBasicSelectToProxyModel(Service.basicSelectRowCollection);
		}

		if (Service.proxyModel.selectedControl === 'GroupedSelect') {
		  Service.bindGroupedSelectToProxyModel(Service.groupedSelectRowCollection);
		}  

		if (Service.proxyModel.selectedControl === 'Radio') {
		  Service.bindRadioToProxyModel(Service.radioRowCollection);
		}  
	};

		/**
		 * basic select
		 */
		Service.bindBasicSelectFromProxyModel = function(basicSelectRowCollection){		
		    if (Service.proxyModel.temporyConfig.formlyOptions.length > 0) {
		      for (var i = 0; i <= Service.proxyModel.temporyConfig.formlyOptions.length-1; i++){
		
		            var newOption = {
		            									'option' 	: Service.proxyModel
		            																			.temporyConfig.formlyOptions[i].name,
		                      				'order' 	: i,

		                      				'group' 	: ''
		                    				};

		            basicSelectRowCollection.rows.push(newOption);
		      }    
		    }
		  };

		 Service.bindBasicSelectToProxyModel = function(basicSelectRowCollection){
		    var resetNyASelectOptions = [];
		    Service.proxyModel.temporyConfig.formlyOptions = resetNyASelectOptions;
		    if (basicSelectRowCollection.rows.length > 0) {
		      for (var i = 0; i <= basicSelectRowCollection.rows.length - 1; i++){
		            var newOption = {
		            									'name' : basicSelectRowCollection.rows[i].option,

		                      				'value': i,

		                      				'group': ''
		                    				};

		            Service.proxyModel.temporyConfig.formlyOptions.push(newOption);
		        }      
		   }
		  };


		  /**
		   * grouped select
		   */
		 Service.bindGroupedSelectFromProxyModel = function(groupedSelectRowCollection, GroupedSelectGroups){
		    if (Service.proxyModel.temporyConfig.formlyOptions.length > 0) {
		      for (var i = 0; i <= Service.proxyModel.temporyConfig.formlyOptions.length-1; i++){		
		            var newOption = {
		            									'option' 	: Service.proxyModel.temporyConfig.formlyOptions[i].name,
		                      				'order'		: i,
		                      				'group'		: Service.proxyModel.temporyConfig.formlyOptions[i].group
		                    				};
		            groupedSelectRowCollection.rows.push(newOption);            
		        }
		        //grouplist : thx to lodash it is easy
		       var filteredgroup = _.uniq(_.pluck(groupedSelectRowCollection.rows, 'group'));
		       angular.copy(filteredgroup, GroupedSelectGroups.list); 		
		    }
		 };



		Service.bindGroupedSelectToProxyModel = function(groupedSelectRowCollection){
		    Service.proxyModel.temporyConfig.formlyOptions = [];
		    for (var i = 0; i <= groupedSelectRowCollection.rows.length - 1; i++){
		          var newOption = {
		          									'name' 	: groupedSelectRowCollection.rows[i].option,
		                    				'value'	: i,
		                    				'group'	: groupedSelectRowCollection.rows[i].group
		                  				};
		          Service.proxyModel.temporyConfig.formlyOptions.push(newOption);   
		      }
		};
		
		
		/**
		 * radio
		 */
		Service.bindRadioFromProxyModel = function(radioRowCollection){
		    if (Service.proxyModel.temporyConfig.formlyOptions.length > 0) {
		      for (var i = 0; i <= Service.proxyModel.temporyConfig.formlyOptions.length-1; i++){
		
		            var newOption = { 
		                              'option'	: Service.proxyModel.temporyConfig.formlyOptions[i].name,
		                              'order'		: i,
		                              'group'		: ''
		                            };
		            radioRowCollection.rows.push(newOption);
		      }    
		    }
		};

		// Service.bindProxyModelOptionFromRadio = function(radioRowCollection){
		//     if (radioRowCollection.rows.length > 0) {
		// 			Service.proxyModel.temporyConfig.formlyOptions = [];
		//       for (var i = 0; i <= radioRowCollection.rows.length-1; i++){
		// 
		//             var newOption = { 
		//                               'name'		: radioRowCollection.rows[i].option,
		//                               'value'		: i,
		//                               'group'		: ''
		//                             };
		//             Service.proxyModel.temporyConfig.formlyOptions.push(newOption);
		//       }    
		//     }
		// };


		Service.bindRadioToProxyModel = function(radioRowCollection){
		    var resetproxyModelOptions = [];
		    Service.proxyModel.temporyConfig.formlyOptions = resetproxyModelOptions;
		
		    if (radioRowCollection.rows.length > 0) {
		
		      for (var i = 0; i <= radioRowCollection.rows.length - 1; i++){
		            var newOption = {
		                              'name'		: radioRowCollection.rows[i].option,
		                              'value'		: i,
		                              'group'		: ''
		                    };
		            Service.proxyModel.temporyConfig.formlyOptions.push(newOption);   
		        }       
		   }
		};

 		  



    return Service;

  }]);


/**
 *  ------------------------------------------------------
 *  service : formFieldManage
 *  ------------------------------------------------------
 *
 *         MOST IMPORTANT service to manage formly field model 
 *  (the presentation model and the back model or configuration model)
 * 
 *
 *  - "formlyModel" is the model exposed to view or html "fields model" (= an array of objects)
 *    This model is the one you can see in all well documented examples here : http://angular-formly.com
 *    -> in your view or html : <formly-form model="dataModel" fields="formlyModel">
 *
 *  - "configurationModel" is the model on which editing a form will work
 *    before applying results to "formlyModel"
 *
 *
 * NOTE : if you save a form to database, you will save "configurationModel" rather than "formlyModel".
 *        Why? : 
 *          since as you plan to create a form generator you can't create a finite model
 *          since you may want to be able to save the generated form even if it is not a finite model
 *          since "formlyModel" objects will be populated with a lot of properties you don't need to store contrary to "configurationModel" which contains only what you need
 *          since "formlyModel" can't be JSON.stringify when you want to use advanced layout (1 column/2/3 columns template?)
 *          since it is better approach to use a backgroundModel (async operation ...) that is bind to presentation model only when it is fully ready or filled.
 *
 *
 * NOTE : 
 * - if you want to manage more columns templates (right now only manage up to 3 columns), just inspire from existing code
 * - if you want to extend easy form generator, be sure to be a minimum comfortable with "angular formly": http://angular-formly.com
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
  .module('edaApp.services.formFieldManage', [])
  .factory('formFieldManage', [ 'EasyFormGenFormlyBindingModels', 

  function( EasyFormGenFormlyBindingModels ){

    var Service = {};

    /**
     * At initial state : configuration model will contain 1 line, since :
     *    -> it is non sense to create a form without a single line (no line = no form at all)
     *    -> so it is non sense to force user to add a first line
     * 
     *  PLEASE NOTE columns array contains objects that look like formly fields one
     */
    Service.initConfigurationEditFromScratch =  function(configurationModel, addStepWayProperties){
      var configurationModelInit = EasyFormGenFormlyBindingModels.getEasyFormInitialStateConfigurationModel(addStepWayProperties); 
      angular.copy(configurationModelInit, configurationModel);
    };

    /**
     * Get an configuration empty (no init line) then empty it with lines array provided in param
     * @param   object - configurationModel   [configuration model]
     * @param   array -  lines                [an array : lines to apply to an empty configuration model]
     * @param   bool -   addStepWayProperties [description]
     * @return {object message}               [give details on how it happened to caller]
     */
    Service.bindConfigurationLines = function(configurationModel, lines, addStepWayProperties){
              
      if( Object.prototype.toString.call(lines) === '[object Array]' ) {
        var configurationModelResult = EasyFormGenFormlyBindingModels.getEasyFormReloadConfigurationModel(addStepWayProperties);

        configurationModelResult.lines = [].concat(lines);  
        angular.copy(configurationModelResult, configurationModel);                                         

        return getMessageObject('configuration model is bound','lines are bound to configuration model.');
      }else{
        return getErrorObject('lines is not an array', 'Checks lines type, it is not an array.');
      }
    };
    /**
     * applyConfigurationToformlyModel : 
     *  - bind configuration model into formly field model
     *  - reset dataModel (formlyfield may have changed so previous dataModel would be false)
     * @param  configurationModel 
     * @param  formlyModel        
     * @param  formlyDataModel    
     */
    Service.applyConfigurationToformlyModel = function(configurationModel, formlyModel, formlyDataModel){
      resetFormlyModel(formlyModel);
      resetDataModel(formlyDataModel);

      //manage header here line0
      var lineNumber = configurationModel.lines.length;


      

      for (var i = 0; i < lineNumber; i++) {


        /**
         * TO TEST
         */
        
        //var FieldGroup = [];
        AddNColumnControl(formlyModel, configurationModel, i);


        // FieldGroup.push(controlTemplate);


        
        // formlyModel.push(
        //                    {
        //                       className   : 'row', 
        //                       fieldGroup  : FieldGroup
        //                     }
        //                 ); 
      }
    };
        
    return Service;



    function resetFormlyModel(formlyModel){
      var resetformly = [];
      angular.copy(resetformly, formlyModel);
    }

    /**
     * New auuto adpat  add N column controls
     */
    function AddNColumnControl(formlyModel, configurationModel, lineIndex){

      var numberOfColumns = configurationModel.lines[lineIndex].columns.length;

      
      /**
       * push formly model 
       * 
       * here : only className and empty fieldGroup (controls != header)
       *
       * if header will be reset to set a template (at least we have now indexFormlyModel)
       */
      
      //get index formlyModel for this line :
      var indexFormlyModel =  formlyModel.push(
                                               {
                                                  className   : 'row', 
                                                  fieldGroup  : []
                                                }
                                              ) - 1 ;        

      /**
       * iterates through controls in the line
       */
      
      configurationModel.lines[lineIndex].columns.forEach(function(column, columnIndex){
        var controlTemplate = {};

        // if (( typeof controlTemplate  !== 'undefined' &&
        //       column.control.type     === 'header'    || 
        //       column.control.type     === 'subTitle') &&
        //       column.control.type     !== 'none') {
        //     /**
        //      * header is not a control just a template
        //      *
        //      * getHeaderTemplateForNcolumnLine()
        //      * NOTE : header text is stored from description
        //      */
        //     
        //     var headerTextContent = column.control.templateOptions.description;
        //     controlTemplate = EasyFormGenFormlyBindingModels.getHeaderTemplateForNcolumnLine(numberOfColumns, headerTextContent);
        //     
        //               
        //     console.warn('EasyFormGenFormlyBindingModels : controlTEemplate');
        //     console.dir(controlTemplate);
        //   
        //     /**
        //      * popuplate properties
        //      */
        //      
        //     formlyModel[indexFormlyModel] = {};
        //     formlyModel[indexFormlyModel].template = controlTemplate.template;
        // }
        
        if (typeof controlTemplate  !== 'undefined' &&
            // column.control.type     !== 'header'    && 
            // column.control.type     !== 'subTitle'  &&
            column.control.type     !== 'none') {

          /**
           * controls : getFormlyControlTemplateForNcolumnLine()
           *
           * @PARAM numberOfColumns       : integer to deduce cssClss to apply
           * @PARAM column.control.type   : to add if needed specific properties (example : datepicker)
           */
           
          if(column.control.type  === 'header' || 
             column.control.type  === 'subTitle'){
               
            var headerTextContent = column.control.templateOptions.description;
            
            controlTemplate.template = EasyFormGenFormlyBindingModels
                                        .getHeaderTemplateForNcolumnLine(numberOfColumns, headerTextContent)
                                            .template;
            
            controlTemplate.className = EasyFormGenFormlyBindingModels
                                          .getRawHeaderTemplates()
                                            .selectedClass; 
            
                             
          } else {
            
            controlTemplate = EasyFormGenFormlyBindingModels.getFormlyControlTemplateForNcolumnLine(numberOfColumns, column.control.type);

            /**
            *
            * 
            * NEED REFACTOR HERE 
            * should bind properties dynamically 
            * 
            * TODO need to validate all controls (datepicker may not work)
            * need to refactor
            *
            * 
            */
            controlTemplate.className                   = column.control.className;
            controlTemplate.type                        = column.control.type;
            controlTemplate.key                         = column.control.key;
            controlTemplate.templateOptions.type        = column.control.templateOptions.type;
            controlTemplate.templateOptions.label       = column.control.templateOptions.label;
            controlTemplate.templateOptions.required    = column.control.templateOptions.required;
            controlTemplate.templateOptions.placeholder = column.control.templateOptions.placeholder;
            controlTemplate.templateOptions.description = column.control.templateOptions.description;
            controlTemplate.templateOptions.options     = [].concat(column.control.templateOptions.options); 
  
            if (typeof controlTemplate.templateOptions.datepickerPopup !== 'undefined')  column.control.templateOptions.datepickerPopup = controlTemplate.templateOptions.datepickerPopup  ;

              
          }
          

          /**
           * popuplate properties
           */
          




          /**
           * push control into formly model in its group
           */
          
      
           /**
            * need to catch this random error
            */
          //try{
            formlyModel[indexFormlyModel].fieldGroup.push(controlTemplate);         
          //}catch(e){
          //  console.warn('error...');
          //}
          

          }
        }

      );
    }    


    function isTemplateOptionDefined(obj){
      return typeof obj.templateOptions !== 'undefined' ? true : false;
    }

    function extractTemplateOptionLabel(obj){

     //console.info('extractTemplateOptionLabel');
     //console.dir(obj);
     return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.label !== 'undefined'? obj.templateOptions.label: '') : '';
    }


    function extractTemplateOptionDatepickerPopup(obj){
      return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.datepickerPopup !== 'undefined'? obj.templateOptions.datepickerPopup: '') : '';
    }

    function extractTemplateOptionRequired(obj){
      return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.required !== 'undefined'? obj.templateOptions.required: '') : '';
    }
    //radio and select
    function extractTemplateOptionOptions(obj){
      return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.options !== 'undefined'? obj.templateOptions.options: '') : '';
    }



    function extractTemplateOptionType(obj){
      return  typeof obj.subtype !== 'undefined'? obj.subtype: '';
    }

    function extractTemplateOptionPlaceholder(obj){
      return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.placeholder !== 'undefined'? obj.templateOptions.placeholder: '') : '';
    }

    function extractTemplateOptionDescription(obj){
      return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.description !== 'undefined'? obj.templateOptions.description: '') : '';
    }


    /////////////////////////////////////////
    // formly model functions
    /////////////////////////////////////////

    function resetDataModel(obj){
      var emptyDataModel = {};
      angular.copy(emptyDataModel, obj);
      return true;
    }

    /////////////////////////////////////////
    // custom errors
    /////////////////////////////////////////


    function getErrorObject(errorTitle, errorMessage){

      var messageObj =  {
                          noError   : false,
                          title     : '',
                          Message   : ''  
                        };

      messageObj.noError  = false;
      messageObj.title    = errorTitle;
      messageObj.Message  = errorMessage;
      return messageObj;
    }

    function getMessageObject(messageTitle, messageBody){
      var messageObj =  {
                          noError   : false,
                          title     : '',
                          Message   : ''  
                        };

      messageObj.noError    = true;
      messageObj.title      = messageTitle;
      messageObj.Message    = messageBody;
      return messageObj;
    }
  
}]);






///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  form API : suppose you have your RESTful backend 
//
//  module = "service"  
//  ------------------------------------------------------
//      Syntax (convention) :
//          "edaApp" = application
//          "edaApp.services.serviceNAME" = container services module
//
//  This module is a service -> it must be injected in services container
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
angular
	.module('edaApp.services.formsByIdService', ['ngResource'])
	.factory('formsByIdService', ['$resource', function($resource){
    return $resource('/api/formGen/:id', {id: '@id'}, {

    });
  }]);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// service to manage select options (used in modal to edit control)
//
//  module = "service"  selectOptionManage (manage : selects, radio...)
//  ------------------------------------------------------
//      Syntax (convention) :
//          "edaApp" = application
//          "edaApp.services.serviceNAME" = container services module
//
//  This module is a service -> it must be injected in services container
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
angular
  .module('edaApp.services.selectOptionManage', [])
  .factory('selectOptionManage', [ function(){
	//console.log('--> INIT : Hello service  \'\'selectOptionManage\'\' ');

    return {
            testMe: function() {
                return 'selectOptionManage is here.';
            },

            initModel: function(selectObj){
              resetModel(selectObj);
            },
        
            isOptionUnique: function(selectObj, textValue){
              for (var i = selectObj.rows.length - 1; i >= 0; i--) {

                if (selectObj.rows[i].option === textValue) {
                  return false;
                }
                
              }
              return true;
            },

            //test if not empty string (= full space string is not conidered as valid)
            isOptionValidFormat: function(textValue){
              if (textValue !== '') {
                return true;
              }
              return false;                    
            },

            addNewOptionRadio: function(selectObj, newOptionText){
              var fullResponse = {
                                    resultFlag : false,
                                    details : ''
                                  };

              var checkResult = validOption(selectObj, newOptionText);  

              //console.info(checkResult);

              if (checkResult.resultFlag === true){

                  var newOption = {
                                      option: newOptionText,
                                      order: selectObj.rows.length
                                  };

                  selectObj.rows.push(newOption);
                  fullResponse.resultFlag = true;
                  fullResponse.details = '';
                  return fullResponse;
              }else{

                    angular.copy(checkResult, fullResponse);                    
                    return fullResponse;                        
              }


            },


            addNewOptionBasicSelect: function(selectObj, newOptionText){
              var fullResponse = {
                                    resultFlag : false,
                                    details : ''
                                  };

              var checkResult = validOption(selectObj, newOptionText);  

              //console.info(checkResult);

              if (checkResult.resultFlag === true){

                  var newOption = {
                                      option: newOptionText,
                                      order: selectObj.rows.length
                                  };

                  selectObj.rows.push(newOption);
                  fullResponse.resultFlag = true;
                  fullResponse.details = '';
                  return fullResponse;
              }else{

                    angular.copy(checkResult, fullResponse);                    
                    return fullResponse;                        
              }


            },

            addNewOptionGroupedSelect: function(selectObj, newOptionText, newOptionGroup){
              var fullResponse = {
                                    resultFlag : false,
                                    details : ''
                                  };

              // if (typeof newOptionGroup === "undefined") {

              //     fullResponse.resultFlag = false;
              //     fullResponse.details = "Group option is undefined";
              //     return fullResponse;
              // }

              // if (newOptionGroup === "") {

              //     fullResponse.resultFlag = false;
              //     fullResponse.details = "Group option is undefined";
              //     return fullResponse;
              // }

              var checkResult = validOption(selectObj, newOptionText);  

          
              if (checkResult.resultFlag === true){

                  var newOption = {
                                      option: newOptionText,
                                      group: newOptionGroup,
                                      order: selectObj.rows.length
                                  };

                  selectObj.rows.push(newOption);
                  fullResponse.resultFlag = true;
                  fullResponse.details = '';
                  return fullResponse;
              }else{

                    angular.copy(checkResult, fullResponse);                    
                    return fullResponse;                        
              }

            },


            removeOption:  function(selectObj, AtIndex) {
              var fullResponse = {
                                  resultFlag : false,
                                  details : ''
                                };

              if (AtIndex !== -1) {
                  selectObj.rows.splice(AtIndex, 1);
                  fullResponse.resultFlag = true;
                  fullResponse.details= '';
                  return fullResponse;
              }else{
                  fullResponse.resultFlag = false;
                  fullResponse.details= 'Option index not valid';
                  return fullResponse;
              }
            },

            upthisOption : function(selectObj, indexOption){
              var fullResponse = {
                                  resultFlag : false,
                                  details : ''
                                };  

              if (indexOption > -1) {

                if (indexOption > 0) {

                  if (selectObj.rows[indexOption - 1]) {
                    var currentOption = selectObj.rows[indexOption];
                    selectObj.rows.splice(indexOption , 1);
                    selectObj.rows.splice((indexOption - 1), 0, currentOption); 

                    fullResponse.resultFlag = true;
                    fullResponse.details = '';
                    return fullResponse;
                  }else{
                    fullResponse.resultFlag = false;
                    fullResponse.details = 'Can\'t retreive option from option index';
                    return fullResponse;
                  }
                }else{
                    fullResponse.resultFlag = true;
                    fullResponse.details = '';
                    return fullResponse;
                }  

              }else{
                fullResponse.resultFlag = false;
                fullResponse.details = 'Option index not valid';
                return fullResponse;
              }
          },

          downthisOption : function(selectObj, indexOption){
              var fullResponse = {
                                  resultFlag : false,
                                  details : ''
                                };

              if (indexOption > -1) {
  

                if (indexOption < selectObj.rows.length - 1){
                  

                  if (selectObj.rows[indexOption + 1]) {
                    

                    var currentOption = selectObj.rows[indexOption];
                    
                    selectObj.rows.splice(indexOption , 1);
                    selectObj.rows.splice((indexOption + 1), 0, currentOption);  

                    fullResponse.resultFlag = true;
                    fullResponse.details = '';
                    return fullResponse;  

                  }else{
                    fullResponse.resultFlag = false;
                    fullResponse.details = 'Can\'t retreive option from option index';
                    return fullResponse;
                  }
                }else{

                  
                    fullResponse.resultFlag = true;
                    fullResponse.details = '';
                  return fullResponse;
                }


              }else{
                fullResponse.resultFlag = false;
                fullResponse.details = 'Option index not valid';
                return fullResponse;
              }

          }

      



        };




function validOption(selectObj, newOptionText){
    var fullResponse = {
                          resultFlag : false,
                          details : ''
                        };

    if (typeof newOptionText === 'undefined') {
        fullResponse.resultFlag = false;
        fullResponse.details = 'Entered option is empty';
        return fullResponse;
    }

    if (newOptionText !== '') {
          for (var i = selectObj.rows.length - 1; i >= 0; i--) {
            if (selectObj.rows[i].option === newOptionText) {
              fullResponse.resultFlag = false;
              fullResponse.details = 'Entered option is not unique';
              return fullResponse;
            }
          }
          fullResponse.resultFlag = true;
          fullResponse.details = '';
          return fullResponse;
    }
    fullResponse.resultFlag = false;     
    fullResponse.details = 'Entered option is empty';
    return fullResponse;
}

function resetModel(selectObj){
  var zeroModel = { 
                      rows:[]
                    };
  angular.copy(zeroModel, selectObj);
}


}]);






/**
 *  ------------------------------------------------------
 *  module = "services" container
 *  ------------------------------------------------------
 *      Syntax (convention) :
 *          "edaApp" = application
 *          "edaApp.services" = container services module
 *
 *  This module is a container -> it must be injected in the application -> so it will inject all services injected here
 *
 *
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

angular.module('edaApp.services', 
							[	
								'edaApp.services.formFieldManage',
								'edaApp.services.selectOptionManage',
								//'edaApp.services.formsByIdService',
								'edaApp.services.edaEditCtrlControllerModalProxy',
								'edaApp.services.dragDropItemDecorationService',
								'edaApp.services.dragDropItemCountersService',
								'edaApp.services.dragDropModelConfigModelProxyService',
								'edaApp.services.ddItemRightClickedManager',
				]);
/**
 *  ------------------------------------------------------
 *  filters container
 *  ------------------------------------------------------
 *
 *      Syntax (convention) :
 *          "edaApp" = application
 *          "edaApp.filters" = container filters module
 *           
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
	.module('edaApp.filters', ['edaApp.filters.trustThis', 
	
	]);

/**
 *  ------------------------------------------------------
 *  filter : trustThis
 *  ------------------------------------------------------
 *
 *  filter to force trust content when ng-bind html form model :
 *  
 *  "<span ng-bind-html="item.label | trustThis"></span>	"
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
	.module('edaApp.filters.trustThis', [])
	.filter('trustThis', ['$sce',

	function($sce) {

  return function(value, type) {
    					return $sce.trustAs(type || 'html', value);
  				};
}]);

/**
 * angular-drag-and-drop-lists v1.2.0
 *
 * Copyright (c) 2014 Marcel Juenemann mail@marcel-junemann.de
 * https://github.com/marceljuenemann/angular-drag-and-drop-lists
 *
 * License: MIT
 */
;(function(){
'use strict';


angular.module('dndLists', [])

  /**
   * Use the dnd-draggable attribute to make your element draggable
   *
   * Attributes:
   * - dnd-draggable      Required attribute. The value has to be an object that represents the data
   *                      of the element. In case of a drag and drop operation the object will be
   *                      serialized and unserialized on the receiving end.
   * - dnd-selected       Callback that is invoked when the element was clicked but not dragged.
   *                      The original click event will be provided in the local event variable.
   * - dnd-effect-allowed Use this attribute to limit the operations that can be performed. Options:
   *                      - "move": The drag operation will move the element. This is the default.
   *                      - "copy": The drag operation will copy the element. Shows a copy cursor.
   *                      - "copyMove": The user can choose between copy and move by pressing the
   *                        ctrl or shift key. *Not supported in IE:* In Internet Explorer this
   *                        option will be the same as "copy". *Not fully supported in Chrome on
   *                        Windows:* In the Windows version of Chrome the cursor will always be the
   *                        move cursor. However, when the user drops an element and has the ctrl
   *                        key pressed, we will perform a copy anyways.
   *                      - HTML5 also specifies the "link" option, but this library does not
   *                        actively support it yet, so use it at your own risk.
   * - dnd-moved          Callback that is invoked when the element was moved. Usually you will
   *                      remove your element from the original list in this callback, since the
   *                      directive is not doing that for you automatically. The original dragend
   *                      event will be provided in the local event variable.
   * - dnd-copied         Same as dnd-moved, just that it is called when the element was copied
   *                      instead of moved. The original dragend event will be provided in the local
   *                      event variable.
   * - dnd-dragstart      Callback that is invoked when the element was dragged. The original
   *                      dragstart event will be provided in the local event variable.
   * - dnd-type           Use this attribute if you have different kinds of items in your
   *                      application and you want to limit which items can be dropped into which
   *                      lists. Combine with dnd-allowed-types on the dnd-list(s). This attribute
   *                      should evaluate to a string, although this restriction is not enforced.
   * - dnd-disable-if     You can use this attribute to dynamically disable the draggability of the
   *                      element. This is useful if you have certain list items that you don't want
   *                      to be draggable, or if you want to disable drag & drop completely without
   *                      having two different code branches (e.g. only allow for admins).
   *                      **Note**: If your element is not draggable, the user is probably able to
   *                      select text or images inside of it. Since a selection is always draggable,
   *                      this breaks your UI. You most likely want to disable user selection via
   *                      CSS (see user-select).
   *
   * CSS classes:
   * - dndDragging        This class will be added to the element while the element is being
   *                      dragged. It will affect both the element you see while dragging and the
   *                      source element that stays at it's position. Do not try to hide the source
   *                      element with this class, because that will abort the drag operation.
   * - dndDraggingSource  This class will be added to the element after the drag operation was
   *                      started, meaning it only affects the original element that is still at
   *                      it's source position, and not the "element" that the user is dragging with
   *                      his mouse pointer.
   */
  .directive('dndDraggable', ['$parse', '$timeout', 'dndDropEffectWorkaround', 'dndDragTypeWorkaround',
                      function($parse,   $timeout,   dndDropEffectWorkaround,   dndDragTypeWorkaround) {
    return function(scope, element, attr) {
      // Set the HTML5 draggable attribute on the element
      element.attr('draggable', 'true');

      // If the dnd-disable-if attribute is set, we have to watch that
      if (attr.dndDisableIf) {
        scope.$watch(attr.dndDisableIf, function(disabled) {
          element.attr('draggable', !disabled);
        });
      }

      /**
       * When the drag operation is started we have to prepare the dataTransfer object,
       * which is the primary way we communicate with the target element
       */
      element.on('dragstart', function(event) {
        event = event.originalEvent || event;

        // Serialize the data associated with this element. IE only supports the Text drag type
        event.dataTransfer.setData('Text', angular.toJson(scope.$eval(attr.dndDraggable)));

        // Only allow actions specified in dnd-effect-allowed attribute
        event.dataTransfer.effectAllowed = attr.dndEffectAllowed || 'move';

        // Add CSS classes. See documentation above
        element.addClass('dndDragging');
        $timeout(function() { element.addClass('dndDraggingSource'); }, 0);

        // Workarounds for stupid browsers, see description below
        dndDropEffectWorkaround.dropEffect = 'none';
        dndDragTypeWorkaround.isDragging = true;

        // Save type of item in global state. Usually, this would go into the dataTransfer
        // typename, but we have to use "Text" there to support IE
        dndDragTypeWorkaround.dragType = attr.dndType ? scope.$eval(attr.dndType) : undefined;

        // Invoke callback
        $parse(attr.dndDragstart)(scope, {event: event});

        event.stopPropagation();
      });

      /**
       * The dragend event is triggered when the element was dropped or when the drag
       * operation was aborted (e.g. hit escape button). Depending on the executed action
       * we will invoke the callbacks specified with the dnd-moved or dnd-copied attribute.
       */
      element.on('dragend', function(event) {
        event = event.originalEvent || event;

        // Invoke callbacks. Usually we would use event.dataTransfer.dropEffect to determine
        // the used effect, but Chrome has not implemented that field correctly. On Windows
        // it always sets it to 'none', while Chrome on Linux sometimes sets it to something
        // else when it's supposed to send 'none' (drag operation aborted).
        var dropEffect = dndDropEffectWorkaround.dropEffect;
        scope.$apply(function() {
          switch (dropEffect) {
            case 'move':
              $parse(attr.dndMoved)(scope, {event: event});
              break;

            case 'copy':
              $parse(attr.dndCopied)(scope, {event: event});
              break;
          }
        });

        // Clean up
        element.removeClass('dndDragging');
        element.removeClass('dndDraggingSource');
        dndDragTypeWorkaround.isDragging = false;
        event.stopPropagation();
      });

      /**
       * When the element is clicked we invoke the callback function
       * specified with the dnd-selected attribute.
       */
      element.on('click', function(event) {
        event = event.originalEvent || event;

        scope.$apply(function() {
          $parse(attr.dndSelected)(scope, {event: event});
        });

        event.stopPropagation();
      });

      /**
       * Workaround to make element draggable in IE9
       */
      element.on('selectstart', function() {
        if (this.dragDrop) this.dragDrop();
        return false;
      });
    };
  }])

  /**
   * Use the dnd-list attribute to make your list element a dropzone. Usually you will add a single
   * li element as child with the ng-repeat directive. If you don't do that, we will not be able to
   * position the dropped element correctly. If you want your list to be sortable, also add the
   * dnd-draggable directive to your li element(s). Both the dnd-list and it's direct children must
   * have position: relative CSS style, otherwise the positioning algorithm will not be able to
   * determine the correct placeholder position in all browsers.
   *
   * Attributes:
   * - dnd-list             Required attribute. The value has to be the array in which the data of
   *                        the dropped element should be inserted.
   * - dnd-allowed-types    Optional array of allowed item types. When used, only items that had a
   *                        matching dnd-type attribute will be dropable.
   * - dnd-disable-if       Optional boolean expresssion. When it evaluates to true, no dropping
   *                        into the list is possible. Note that this also disables rearranging
   *                        items inside the list.
   * - dnd-horizontal-list  Optional boolean expresssion. When it evaluates to true, the positioning
   *                        algorithm will use the left and right halfs of the list items instead of
   *                        the upper and lower halfs.
   * - dnd-dragover         Optional expression that is invoked when an element is dragged over the
   *                        list. If the expression is set, but does not return true, the element is
   *                        not allowed to be dropped. The following variables will be available:
   *                        - event: The original dragover event sent by the browser.
   *                        - index: The position in the list at which the element would be dropped.
   *                        - type: The dnd-type set on the dnd-draggable, or undefined if unset.
   * - dnd-drop             Optional expression that is invoked when an element is dropped over the
   *                        list. If the expression is set, it must return the object that will be
   *                        inserted into the list. If it returns false, the drop will be aborted
   *                        and the event is propagated. The following variables will be available:
   *                        - event: The original drop event sent by the browser.
   *                        - index: The position in the list at which the element would be dropped.
   *                        - item: The transferred object.
   *                        - type: The dnd-type set on the dnd-draggable, or undefined if unset.
   * - dnd-external-sources Optional boolean expression. When it evaluates to true, the list accepts
   *                        drops from sources outside of the current browser tab. This allows to
   *                        drag and drop accross different browser tabs. Note that this will allow
   *                        to drop arbitrary text into the list, thus it is highly recommended to
   *                        implement the dnd-drop callback to check the incoming element for
   *                        sanity. Furthermore, the dnd-type of external sources can not be
   *                        determined, therefore do not rely on restrictions of dnd-allowed-type.
   *
   * CSS classes:
   * - dndPlaceholder       When an element is dragged over the list, a new placeholder child
   *                        element will be added. This element is of type li and has the class
   *                        dndPlaceholder set.
   * - dndDragover          Will be added to the list while an element is dragged over the list.
   */
  .directive('dndList', ['$parse', '$timeout', 'dndDropEffectWorkaround', 'dndDragTypeWorkaround',
                 function($parse,   $timeout,   dndDropEffectWorkaround,   dndDragTypeWorkaround) {
    return function(scope, element, attr) {
      // While an element is dragged over the list, this placeholder element is inserted
      // at the location where the element would be inserted after dropping
      var placeholder = angular.element('<li class="dndPlaceholder"></li>');
      var placeholderNode = placeholder[0];
      var listNode = element[0];

      var horizontal = attr.dndHorizontalList && scope.$eval(attr.dndHorizontalList);
      var externalSources = attr.dndExternalSources && scope.$eval(attr.dndExternalSources);

      /**
       * The dragover event is triggered "every few hundred milliseconds" while an element
       * is being dragged over our list, or over an child element.
       */
      element.on('dragover', function(event) {
        event = event.originalEvent || event;

        if (!isDropAllowed(event)) return true;

        // First of all, make sure that the placeholder is shown
        // This is especially important if the list is empty
        if (placeholderNode.parentNode != listNode) {
          element.append(placeholder);
        }

        if (event.target !== listNode) {
          // Try to find the node direct directly below the list node.
          var listItemNode = event.target;
          while (listItemNode.parentNode !== listNode && listItemNode.parentNode) {
            listItemNode = listItemNode.parentNode;
          }

          if (listItemNode.parentNode === listNode && listItemNode !== placeholderNode) {
            // If the mouse pointer is in the upper half of the child element,
            // we place it before the child element, otherwise below it.
            if (isMouseInFirstHalf(event, listItemNode)) {
              listNode.insertBefore(placeholderNode, listItemNode);
            } else {
              listNode.insertBefore(placeholderNode, listItemNode.nextSibling);
            }
          }
        } else {
          // This branch is reached when we are dragging directly over the list element.
          // Usually we wouldn't need to do anything here, but the IE does not fire it's
          // events for the child element, only for the list directly. Therefore we repeat
          // the positioning algorithm for IE here.
          if (isMouseInFirstHalf(event, placeholderNode, true)) {
            // Check if we should move the placeholder element one spot towards the top.
            // Note that display none elements will have offsetTop and offsetHeight set to
            // zero, therefore we need a special check for them.
            while (placeholderNode.previousElementSibling && (isMouseInFirstHalf(event, placeholderNode.previousElementSibling, true) || placeholderNode.previousElementSibling.offsetHeight === 0)) {
              listNode.insertBefore(placeholderNode, placeholderNode.previousElementSibling);
            }
          } else {
            // Check if we should move the placeholder element one spot towards the bottom
            while (placeholderNode.nextElementSibling &&
                 !isMouseInFirstHalf(event, placeholderNode.nextElementSibling, true)) {
              listNode.insertBefore(placeholderNode,
                  placeholderNode.nextElementSibling.nextElementSibling);
            }
          }
        }

        // At this point we invoke the callback, which still can disallow the drop.
        // We can't do this earlier because we want to pass the index of the placeholder.
        if (attr.dndDragover && !invokeCallback(attr.dndDragover, event)) {
          return stopDragover();
        }

        element.addClass('dndDragover');
        event.preventDefault();
        event.stopPropagation();
        return false;
      });

      /**
       * When the element is dropped, we use the position of the placeholder element as the
       * position where we insert the transferred data. This assumes that the list has exactly
       * one child element per array element.
       */
      element.on('drop', function(event) {
        event = event.originalEvent || event;

        if (!isDropAllowed(event)) return true;

        // The default behavior in Firefox is to interpret the dropped element as URL and
        // forward to it. We want to prevent that even if our drop is aborted.
        event.preventDefault();

        // Unserialize the data that was serialized in dragstart. According to the HTML5 specs,
        // the "Text" drag type will be converted to text/plain, but IE does not do that.
        var data = event.dataTransfer.getData('Text') || event.dataTransfer.getData('text/plain');
        var transferredObject;
        try {
          transferredObject = JSON.parse(data);
        } catch(e) {
          return stopDragover();
        }

        // Invoke the callback, which can transform the transferredObject and even abort the drop.
        if (attr.dndDrop) {
          transferredObject = invokeCallback(attr.dndDrop, event, transferredObject);
          if (!transferredObject) {
            return stopDragover();
          }
        }

        // Retrieve the JSON array and insert the transferred object into it.
        var targetArray = scope.$eval(attr.dndList);
        scope.$apply(function() {
          targetArray.splice(getPlaceholderIndex(), 0, transferredObject);
        });

        // In Chrome on Windows the dropEffect will always be none...
        // We have to determine the actual effect manually from the allowed effects
        if (event.dataTransfer.dropEffect === 'none') {
          if (event.dataTransfer.effectAllowed === 'copy' ||
              event.dataTransfer.effectAllowed === 'move') {
            dndDropEffectWorkaround.dropEffect = event.dataTransfer.effectAllowed;
          } else {
            dndDropEffectWorkaround.dropEffect = event.ctrlKey ? 'copy' : 'move';
          }
        } else {
          dndDropEffectWorkaround.dropEffect = event.dataTransfer.dropEffect;
        }

        // Clean up
        stopDragover();
        event.stopPropagation();
        return false;
      });

      /**
       * We have to remove the placeholder when the element is no longer dragged over our list. The
       * problem is that the dragleave event is not only fired when the element leaves our list,
       * but also when it leaves a child element -- so practically it's fired all the time. As a
       * workaround we wait a few milliseconds and then check if the dndDragover class was added
       * again. If it is there, dragover must have been called in the meantime, i.e. the element
       * is still dragging over the list. If you know a better way of doing this, please tell me!
       */
      element.on('dragleave', function(event) {
        event = event.originalEvent || event;

        element.removeClass('dndDragover');
        $timeout(function() {
          if (!element.hasClass('dndDragover')) {
            placeholder.remove();
          }
        }, 100);
      });

      /**
       * Checks whether the mouse pointer is in the first half of the given target element.
       *
       * In Chrome we can just use offsetY, but in Firefox we have to use layerY, which only
       * works if the child element has position relative. In IE the events are only triggered
       * on the listNode instead of the listNodeItem, therefore the mouse positions are
       * relative to the parent element of targetNode.
       */
      function isMouseInFirstHalf(event, targetNode, relativeToParent) {
        var mousePointer = horizontal ? (event.offsetX || event.layerX)
                                      : (event.offsetY || event.layerY);
        var targetSize = horizontal ? targetNode.offsetWidth : targetNode.offsetHeight;
        var targetPosition = horizontal ? targetNode.offsetLeft : targetNode.offsetTop;
        targetPosition = relativeToParent ? targetPosition : 0;
        return mousePointer < targetPosition + targetSize / 2;
      }

      /**
       * We use the position of the placeholder node to determine at which position of the array the
       * object needs to be inserted
       */
      function getPlaceholderIndex() {
        return Array.prototype.indexOf.call(listNode.children, placeholderNode);
      }

      /**
       * Checks various conditions that must be fulfilled for a drop to be allowed
       */
      function isDropAllowed(event) {
        // Disallow drop from external source unless it's allowed explicitly.
        if (!dndDragTypeWorkaround.isDragging && !externalSources) return false;

        // Check mimetype. Usually we would use a custom drag type instead of Text, but IE doesn't
        // support that.
        if (!hasTextMimetype(event.dataTransfer.types)) return false;

        // Now check the dnd-allowed-types against the type of the incoming element. For drops from
        // external sources we don't know the type, so it will need to be checked via dnd-drop.
        if (attr.dndAllowedTypes && dndDragTypeWorkaround.isDragging) {
          var allowed = scope.$eval(attr.dndAllowedTypes);
          if (angular.isArray(allowed) && allowed.indexOf(dndDragTypeWorkaround.dragType) === -1) {
            return false;
          }
        }

        // Check whether droping is disabled completely
        if (attr.dndDisableIf && scope.$eval(attr.dndDisableIf)) return false;

        return true;
      }

      /**
       * Small helper function that cleans up if we aborted a drop.
       */
      function stopDragover() {
        placeholder.remove();
        element.removeClass('dndDragover');
        return true;
      }

      /**
       * Invokes a callback with some interesting parameters and returns the callbacks return value.
       */
      function invokeCallback(expression, event, item) {
        return $parse(expression)(scope, {
          event: event,
          index: getPlaceholderIndex(),
          item: item || undefined,
          external: !dndDragTypeWorkaround.isDragging,
          type: dndDragTypeWorkaround.isDragging ? dndDragTypeWorkaround.dragType : undefined
        });
      }

      /**
       * Check if the dataTransfer object contains a drag type that we can handle. In old versions
       * of IE the types collection will not even be there, so we just assume a drop is possible.
       */
      function hasTextMimetype(types) {
        if (!types) return true;
        for (var i = 0; i < types.length; i++) {
          if (types[i] === 'Text' || types[i] === 'text/plain') return true;
        }

        return false;
      }
    };
  }])

  /**
   * This workaround handles the fact that Internet Explorer does not support drag types other than
   * "Text" and "URL". That means we can not know whether the data comes from one of our elements or
   * is just some other data like a text selection. As a workaround we save the isDragging flag in
   * here. When a dropover event occurs, we only allow the drop if we are already dragging, because
   * that means the element is ours.
   */
  .factory('dndDragTypeWorkaround', function(){ return {}; })

  /**
   * Chrome on Windows does not set the dropEffect field, which we need in dragend to determine
   * whether a drag operation was successful. Therefore we have to maintain it in this global
   * variable. The bug report for that has been open for years:
   * https://code.google.com/p/chromium/issues/detail?id=39399
   */
  .factory('dndDropEffectWorkaround', function(){ return {}; });

})();

;(function(){    
  'use strict';
  
  angular
    .module('pageslide-directive', [])
    .directive('pageslide', [
      function () {
          var defaults = {};
  
          /* Return directive definition object */
  
          return {
              restrict: 'EAC',
              transclude: false,
              scope: {
                  psOpen: '=?',
                  psAutoClose: '=?',
                  psSide: '@',
                  psSpeed: '@',
                  psClass: '@',
                  psSize: '@',
                  psSqueeze: '@',
                  psCloak: '@',
                  psPush: '@',
                  psContainer: '@'
              },
              //template: '<div class="pageslide-content" ng-transclude></div>',
              link: function ($scope, el, attrs) {
                  /* Inspect */
                  //console.log($scope);
                  //console.log(el);
                  //console.log(attrs);
  
                  /* Parameters */
                  var param = {};
  
                  param.side = $scope.psSide || 'right';
                  param.speed = $scope.psSpeed || '0.5';
                  param.size = $scope.psSize || '300px';
                  param.zindex = 1000; // Override with custom CSS
                  param.className = $scope.psClass || 'ng-pageslide';
                  param.cloak = $scope.psCloak && $scope.psCloak.toLowerCase() == 'false' ? false : true;
                  param.squeeze = Boolean($scope.psSqueeze) || false;
                  param.push = Boolean($scope.psPush) || false;
                  param.container = $scope.psContainer || false; 
  
                  // Apply Class
                  el.addClass(param.className);
  
                  /* DOM manipulation */
                  var content = null;
                  var slider = null;
                  var body = param.container ? document.getElementById(param.container) : document.body;
  
                  slider = el[0];
  
                  // Check for div tag
                  if (slider.tagName.toLowerCase() !== 'div' &&
                      slider.tagName.toLowerCase() !== 'pageslide')
                      throw new Error('Pageslide can only be applied to <div> or <pageslide> elements');
  
                  // Check for content
                  if (slider.children.length === 0)
                      throw new Error('You have to content inside the <pageslide>');
  
                  content = angular.element(slider.children);
  
                  /* Append */
                  body.appendChild(slider);
  
                  /* Style setup */
                  slider.style.zIndex = param.zindex;
                  slider.style.position = param.container !== false ? 'absolute' : 'fixed';
                  slider.style.width = 0;
                  slider.style.height = 0;
                  slider.style.overflow = 'hidden';
                  slider.style.transitionDuration = param.speed + 's';
                  slider.style.webkitTransitionDuration = param.speed + 's';
                  slider.style.transitionProperty = 'width, height';
                  if (param.squeeze) {
                      body.style.position = 'absolute';
                      body.style.transitionDuration = param.speed + 's';
                      body.style.webkitTransitionDuration = param.speed + 's';
                      body.style.transitionProperty = 'top, bottom, left, right';
                  }
  
                  switch (param.side) {
                      case 'right':
                          slider.style.height = attrs.psCustomHeight || '100%';
                          slider.style.top = attrs.psCustomTop || '0px';
                          slider.style.bottom = attrs.psCustomBottom || '0px';
                          slider.style.right = attrs.psCustomRight || '0px';
                          break;
                      case 'left':
                          slider.style.height = attrs.psCustomHeight || '100%';
                          slider.style.top = attrs.psCustomTop || '0px';
                          slider.style.bottom = attrs.psCustomBottom || '0px';
                          slider.style.left = attrs.psCustomLeft || '0px';
                          break;
                      case 'top':
                          slider.style.width = attrs.psCustomWidth || '100%';
                          slider.style.left = attrs.psCustomLeft || '0px';
                          slider.style.top = attrs.psCustomTop || '0px';
                          slider.style.right = attrs.psCustomRight || '0px';
                          break;
                      case 'bottom':
                          slider.style.width = attrs.psCustomWidth || '100%';
                          slider.style.bottom = attrs.psCustomBottom || '0px';
                          slider.style.left = attrs.psCustomLeft || '0px';
                          slider.style.right = attrs.psCustomRight || '0px';
                          break;
                  }
  
  
                  /* Closed */
                  function psClose(slider, param) {
                      if (slider && slider.style.width !== 0 && slider.style.width !== 0) {
                          if (param.cloak) content.css('display', 'none');
                          switch (param.side) {
                              case 'right':
                                  slider.style.width = '0px';
                                  if (param.squeeze) body.style.right = '0px';
                                  if (param.push) {
                                      body.style.right = '0px';
                                      body.style.left = '0px';
                                  }
                                  break;
                              case 'left':
                                  slider.style.width = '0px';
                                  if (param.squeeze) body.style.left = '0px';
                                  if (param.push) {
                                      body.style.left = '0px';
                                      body.style.right = '0px';
                                  }
                                  break;
                              case 'top':
                                  slider.style.height = '0px';
                                  if (param.squeeze) body.style.top = '0px';
                                  if (param.push) {
                                      body.style.top = '0px';
                                      body.style.bottom = '0px';
                                  }
                                  break;
                              case 'bottom':
                                  slider.style.height = '0px';
                                  if (param.squeeze) body.style.bottom = '0px';
                                  if (param.push) {
                                      body.style.bottom = '0px'; 
                                      body.style.top = '0px'; 
                                  }
                                  break;
                          }
                      }
                      $scope.psOpen = false;
                  }
  
                  /* Open */
                  function psOpen(slider, param) {
                      if (slider.style.width !== 0 && slider.style.width !== 0) {
                          switch (param.side) {
                              case 'right':
                                  slider.style.width = param.size;
                                  if (param.squeeze) body.style.right = param.size;
                                  if (param.push) {
                                      body.style.right = param.size;
                                      body.style.left = '-' + param.size;
                                  }
                                  break;
                              case 'left':
                                  slider.style.width = param.size;
                                  if (param.squeeze) body.style.left = param.size;
                                  if (param.push) {
                                      body.style.left = param.size;
                                      body.style.right = '-' + param.size;
                                  }
                                  break;
                              case 'top':
                                  slider.style.height = param.size;
                                  if (param.squeeze) body.style.top = param.size;
                                  if (param.push) {
                                      body.style.top = param.size;
                                      body.style.bottom = '-' + param.size;
                                  }
                                  break;
                              case 'bottom':
                                  slider.style.height = param.size;
                                  if (param.squeeze) body.style.bottom = param.size;
                                  if (param.push) {
                                      body.style.bottom = param.size;
                                      body.style.top = '-' + param.size;
                                  }
                                  break;
                          }
                          setTimeout(function() {
                              if (param.cloak) content.css('display', 'block');
                          }, (param.speed * 1000));
  
                      }
                  }
  
                  function isFunction(functionToCheck) {
                      var getType = {};
                      return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
                  }
  
                  /*
                  * Watchers
                  * */
  
                  $scope.$watch('psOpen', function(value) {
                      if (!!value) {
                          // Open
                          psOpen(slider, param);
                      } else {
                          // Close
                          psClose(slider, param);
                      }
                  });
  
  
                  /*
                  * Events
                  * */
  
                  $scope.$on('$destroy', function () {
                      body.removeChild(slider);
                  });
  
                  if ($scope.psAutoClose) {
                      $scope.$on('$locationChangeStart', function() {
                          psClose(slider, param);
                      });
                      $scope.$on('$stateChangeStart', function() {
                          psClose(slider, param);
                      });
  
                  }
              }
          };
      }
  ]);

})();
})(this);