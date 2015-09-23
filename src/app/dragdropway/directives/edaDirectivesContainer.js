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

