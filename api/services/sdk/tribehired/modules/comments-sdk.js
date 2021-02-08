const BaseSdk = require("./base-sdk");
// const appRoot = require("app-root-path");
// const envConfig = require(appRoot + "/config/config");

// API Paths
const PARENT_PATH = "/comments";
const ENDPOINT_GET_ALL_COMMENTS = "/";

module.exports = class THCommentsSdk extends BaseSdk {

    constructor() {
        super(PARENT_PATH);
    }

    async getAllComments() {
        console.debug("Calling TH API: getAllPosts()");

        try {
            const url = this.registerEndPoint(arguments, ENDPOINT_GET_ALL_COMMENTS);

            const resp = await this.sendRequest("GET", url);
            this.prepareResponse(resp);

        } catch (err) {
            this.prepareErrorResponse(err);
        }

        return this.interceptResponse();
    }

};
