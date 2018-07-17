/* eslint-env node */
module.exports = {
  description: '',
  afterInstall() {
    // Add addons to package.json and run defaultBlueprint
    return this.addAddonsToProject({
      // a packages array defines the addons to install
      packages: [
        // name is the addon name, and target (optional) is the version
        // { name: 'some-addon-name', target: '0.0.0' }
      ]
    }).then(() => {
      return this.addPackagesToProject([
        { name: 'oidc-client', target: '1.5.2' }
      ]);
    });
  }
};
