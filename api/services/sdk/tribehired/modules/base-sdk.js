const request = require("request");
const appRoot = require("app-root-path");
const config = require(appRoot + "/config/config");
const ObjectUtil = require("../../../../utils/objectUtil");
const StringUtil = require("../../../../utils/stringUtil");

// Constants
const SDK_API_ENDPOINT = config.sdk.tribehired.endpoint;
const SDK_API_VALID_HTTP_METHODS = ["GET", "POST", "PUT", "DELETE"];
const HTTP_REQUEST_OPTS_JSON = {
    method: "",
    url: "",
    json: true,
    insecure: true, // bypass SSL verify error
    rejectUnauthorized: false, // bypass SSL verify error
    headers: {
        "content-type": "application/json"
    }
};

module.exports = class THBaseSdk {

    constructor(subPath) {
        /* Global variables */
        // 1. Endpoint of each module without function
        this.apiModulePath = SDK_API_ENDPOINT + subPath;

        // 2. SDK Response Object
        this.sdkApiResponse = null;
    }

    /**
     * Send HTTP request to SDK (without Authorization needed)
     * @param type HTTP Method. Available options: GET/POST/PUT/DELETE
     * @param url URL of API to be invoked
     * @param body Query params / JSON body
     */
    async sendRequest(type, url, body, forceBody) {

        // Some validations
        type = type.toUpperCase();
        this.checkRequest(type, url, body);

        // Define HTTP Request Options
        let httpOpts = ObjectUtil.deepMerge({}, HTTP_REQUEST_OPTS_JSON, {
            method: type,
            url: url
            // headers: {
            //     Authorization: global.sessionToken
            // }
        });

        // Set additional HTTP information
        httpOpts = this.finaliseHttpOpts(httpOpts, type, body, forceBody);

        // Send Request & Return new promise
        return this.invokeRequest(httpOpts);
    }

    checkRequest(type, url, body) {
        if (SDK_API_VALID_HTTP_METHODS.indexOf(type) == -1) {
            throw new Error("Invalid HTTP Request Method");
        }
        if (!StringUtil.isNotEmptyOrNull(url)) {
            throw new Error("Invalid HTTP Request URL");
        }
        if (["PUT", "DELETE"].indexOf(type) > -1 && !body) {
            throw new Error("Invalid HTTP Request Body");
        }
    }

    finaliseHttpOpts(httpOpts, type, body, forceBody = false) {
        httpOpts.json = true;
        if (body) {
            if (forceBody) {
                httpOpts.body = body;
            } else if (["GET", "DELETE"].indexOf(type) > -1) {
                httpOpts.qs = body;
            } else if (["POST", "PUT"].indexOf(type) > -1) {
                httpOpts.body = body;
            }
        }
        return httpOpts;
    }

    async invokeRequest(httpOpts) {
        return new Promise(function (resolve, reject) {
            request(httpOpts, function (err, resp, body) {
                try {
                    if (err) {
                        reject(err);
                    } else {
                        if (resp.statusCode != 200) {
                            reject(new Error("API returns HTTP not 200"));
                        } else {
                            resolve(body);
                        }
                    }
                } catch (err) {
                    reject(new Error("Exception occured in invokeRequest()"));
                }
            });
        });
    }

    tryToGetSdkErrorMessage(body, messageToUse = "") {
        // All assumptions put here
        let msg = "";

        try {
            msg = body.errorCode;
            return msg;
        } catch (err) { /* do nothing */ }

        try {
            msg = body.errorDetails;
            return msg;
        } catch (err) { /* do nothing */ }

        try {
            msg = body.errorMessage;
            return msg;
        } catch (err) { /* do nothing */ }

        return msg || messageToUse;
    }

    /* Interceptors & Flow */
    registerEndPoint(requestParams, endpoint) {
        this.apiEndpoint = endpoint;
        this.sdkApiResponse = null;
        const path = this.apiModulePath + endpoint;
        this.interceptRequest(requestParams);
        return path;
    }

    interceptRequest(requestParams) {
        // TODO: Log requests
    }

    prepareResponse(dataOrError) {
        // TODO: Massage response
        this.sdkApiResponse = dataOrError;
    }

    prepareErrorResponse(err) {
        console.error(err.stack);
        // TODO: Massage error response
        this.sdkApiResponse = {
            error: err.name
        };
    }

    interceptResponse() {
        // TODO: Response instance checking / Log responses
        return this.sdkApiResponse; // Return response as per intercepted
    }

};
