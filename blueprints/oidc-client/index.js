/* eslint-env node */
module.exports = {
  description: '',
  normalizeEntityName() {
  },
  afterInstall() {
    // Add addons to package.json and run defaultBlueprint
    return this.addAddonsToProject({
      // a packages array defines the addons to install
      packages: [
        // name is the addon name, and target (optional) is the version
        { name: 'ember-cli-cjs-transform', target: '1.3.0' }
      ]
    }).then(() => {
      return this.addPackagesToProject([
        { name: 'oidc-client', target: '1.5.2' }
      ]);
    });
  }
};
