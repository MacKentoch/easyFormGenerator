/* global angular */
import editModalController, {
	EDIT_MODAL_CONTROLLER_NAME
} from './edaStepWayEasyFormGen.editControlModal.controller';

const EDIT_CONTROLE_MODAL_NAME = 'editControlModalModule'

export default angular
								.module(EDIT_CONTROLE_MODAL_NAME, [])
								.controller(EDIT_MODAL_CONTROLLER_NAME, editModalController);
