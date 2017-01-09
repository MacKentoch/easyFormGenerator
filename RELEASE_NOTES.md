# Releases

## Notes:

### v2.2.0

- Header component fix (now a real component) => breaking changes
- add Wizard (thanks to `gofreddo` PR)
- more coming soon

### v2.1.0
- separate js and css into distinct bundles (like before v2.0.0)
- merged awesome PR from
  - `cristianurbano` :clap:
  - `gofreddo` :clap:
  - **Thank you for you contributions!**

### v2.0.0
- leave `bower, gulp and jspm` in favor of `webpack + npm`
- new control: `IP adress`
- new language added `Brazilian Portuguese` thanks to `Leandro.Battisti`
- merged awesome PRs from `gofreddo` :clap: for kind and amazing contribution

### v1.2.0

To follow `ui-bootstrap` (*ui-bootstrap following angular js and avoiding name conflict with angular Strap*)
> easyFormGenerator (since v1.2.0) is now compatible with latest ui-bootstrap.

If you want to use older ui-bootstrap (*<= v0.13.4*)

> you will have to use easyFormGenrator <= v1.1.0.

### v1.1.0

- migration to ES6 + fixes

### v1.0.21:

*`Easy form viewer` (*no matter form generator you used, models are the same*):

- You created a form through `easy form generator`, you have now `easy form viewer` to easily `render` your forms
  - you can still use angular formly directive. But since easy form generator contains amount of custom controls, you may have pain to configure yourself with `formlyConfigProvider`. Just use easy form viewer directive, it embeds angular formly and configure custom controls for you = no more pain.  
______
