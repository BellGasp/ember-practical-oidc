/* eslint-env node */
module.exports = {
  description: '',
  normalizeEntityName() {
  },
  afterInstall() {
    // Add addons to package.json and run defaultBlueprint
    return this.addPackagesToProject([
      { name: 'oidc-client', target: '1.5.2' }
    ]);
  }
};
