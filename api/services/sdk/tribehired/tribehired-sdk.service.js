const THPostsSdk = require("./modules/posts-sdk");
const THCommentsSdk = require("./modules/comments-sdk");

const THSdkService = {
    Posts: new THPostsSdk(),
    Comments: new THCommentsSdk()
};

module.exports = THSdkService;
