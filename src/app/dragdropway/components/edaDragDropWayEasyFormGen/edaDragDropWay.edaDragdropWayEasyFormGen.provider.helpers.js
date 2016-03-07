const LIST_DRAG_DROP_ITEM_CSS_CLASSES = [
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

const DRAG_DROP_CONFIG_MODEL =  {
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
  verboseMode : false
  }                  
};  

const DRAG_DROP_PRESENTATION_MODEL = [
  //1 column here is control selection column
  [],
  [
    //empty 1st line at initialisation
    []
  ]
];

const ITEMS_NOT_TO_COUNT_FOR_REAL = {
  //placeholder :         '',
  itemBeingDragged :    ''
};

export {
  LIST_DRAG_DROP_ITEM_CSS_CLASSES,
  DRAG_DROP_CONFIG_MODEL,
  DRAG_DROP_PRESENTATION_MODEL,
  ITEMS_NOT_TO_COUNT_FOR_REAL
};
