NOTE
====

> Purpose of this note is to help (myself :smile:)
- to sum up current steps needed to add a new control to easy form generator
- to sum up my todos


## Adding a new controls

### 1- CASE 1: control is a derived from basic one (like email is derived from input control)

adding a control require (now, but will change later for easier) :

- adding a control component
  - in `stepway > components > modal`
- adding this component in modal template
  - in `stepway > components > modal > stepway.editControlModal.template.html`
- adding formly behaviour
  - in `stepway > services > modalProxy > modalProxy.service.helpers.js`
- declaring in main config provider in function controlsList()
  - in `stepway > components > main >  stepway.main.provider.js`
