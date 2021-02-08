const THPostsSdk = require("./modules/posts-sdk");

const THSdkService = {
    Posts: new THPostsSdk()
};

module.exports = THSdkService;
