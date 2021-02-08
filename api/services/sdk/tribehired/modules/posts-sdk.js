const BaseSdk = require("./base-sdk");
// const appRoot = require("app-root-path");
// const envConfig = require(appRoot + "/config/config");

// API Paths
const PARENT_PATH = "/posts";
const ENDPOINT_GET_ALL_POSTS = "/";
const ENDPOINT_GET_SINGLE_POST = "/{postId}";

module.exports = class THPostsSdk extends BaseSdk {

    constructor() {
        super(PARENT_PATH);
    }

    async getAllPosts() {
        // console.debug("Calling TH API: getAllPosts()");

        try {
            const url = this.registerEndPoint(arguments, ENDPOINT_GET_ALL_POSTS);

            const resp = await this.sendRequest("GET", url);
            this.prepareResponse(resp);

        } catch (err) {
            this.prepareErrorResponse(err);
        }

        return this.interceptResponse();
    }

    async getSinglePost(postId) {
        console.debug("Calling TH API: getSinglePost()");

        try {
            const url = this.registerEndPoint(arguments, ENDPOINT_GET_SINGLE_POST);

            const resp = await this.sendRequest("GET", url.replace("{postId}", postId));
            this.prepareResponse(resp);

        } catch (err) {
            this.prepareErrorResponse(err);
        }

        return this.interceptResponse();
    }

};
