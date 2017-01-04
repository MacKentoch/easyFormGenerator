export const EDIT_HEADER_CONTROL_COMPONENT = 'editHeaderControl';

export const editHeaderControlComponent = {
  template      : `
  <div class="panel panel-default">
    <div class="panel-body">
      <div class="row">
        <div class="col-md-12">
          <h5 class="greyText"><i class="fa fa-eye"></i>
            &nbsp;
            {{'PREVIEW_TAB' | translate}} :
          </h5>
        </div>
      </div>
      <hr/>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <div class="">
              <h2 class="text-center">
                {{$ctrl.nyaSelect.temporyConfig.formlyDesciption}}
              </h2>
              <hr/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-body">
      <div class="row">
        <div class="col-md-12">
          <h5 class="greyText">
            <i class="fa fa-pencil-square-o"></i>
            &nbsp;
            {{'EDIT_PROPERTIES' | translate}} :
            </h5>
        </div>
      </div>
      <hr/>
      <div class="marginTopFivepixels"></div>
      <div class="row">
        <div class="form-group">
          <label
            for="inputHeaderTextUpdate"
            class="col-lg-3 control-label greyText editPropertiesLabel">
            {{'HEADER_TEXT' | translate}} :
          </label>
          <div class="col-lg-9">
            <input
              type="text"
              class="form-control"
              ng-model="$ctrl.nyaSelect.temporyConfig.formlyDesciption"
              id="inputHeaderTextUpdate"
              placeholder="{{'ADD_EDIT_HEADER_HERE' | translate}}">
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  bindings      : {
    nyaSelect: '='
  },
  controller    :
  class editHeaderControlController {
    constructor() {
      //
    }

    static get $inject() {
      return [];
    }
  }
};
