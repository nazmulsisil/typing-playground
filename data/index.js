const configured = require('./configured.json');

module.exports = () => {
  return {
    // tenantConfiguredStats='/cvpn/api/v1/tenant/stats/configured'
    configured: configured
  };
};
