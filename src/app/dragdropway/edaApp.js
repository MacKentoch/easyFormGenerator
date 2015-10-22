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

  .value('easyFormGenVersion', 'v1.0.32')
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
