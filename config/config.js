const appRoot = require("app-root-path");
require("custom-env").env(true, appRoot + "/config", true);

const config = {
    environment: process.env.ENVIRONMENT,
    app: {
        port: parseInt(process.env.APP_PORT) || 3000
    },
    sdk: {
        tribehired: {
            endpoint: process.env.SDK_TRIBEHIRED_ENDPOINT
        }
    }
};

module.exports = config;
