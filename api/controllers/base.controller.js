const StatusCode = require("../constants/status-code.constant");

/* Empty Success Response Template */
const emptyApiSuccessResponse = {
    statusCode: StatusCode.SUCCESS.code,
    body: null
};

/* Empty Error Response Template */
const emptyApiErrorResponse = {
    statusCode: StatusCode.FAILED.code,
    errorCode: null,
    errorMessage: null
};

function sendJsonResponse(responder, statusCode, response) {
    if (!response) {
        throw new Error("Potential developer mistake. No response given");
    } else if (!statusCode) {
        throw new Error("Potential developer mistake. No statusCode given");
    } else if (!responder) {
        throw new Error("Potential developer mistake. No responder given");
    }
    responder.status(statusCode).json(response);
}

function respondSuccessBody(responder, responseBody) {
    if (!responseBody) {
        throw new Error("Potential developer mistake. No responseBody given");
    } else if (!responder) {
        throw new Error("Potential developer mistake. No responder given");
    }
    const resp = emptyApiSuccessResponse;
    resp.statusCode = StatusCode.SUCCESS.code;
    resp.body = responseBody;
    sendJsonResponse(responder, 200, resp);
}

function respondError(responder, error) {
    if (!error) {
        throw new Error("Potential developer mistake. No error given");
    } else if (!responder) {
        throw new Error("Potential developer mistake. No responder given");
    }
    if (error instanceof Error) {
        console.error(error.stack);
    }
    const resp = emptyApiErrorResponse;
    resp.statusCode = StatusCode.FAILED.code;
    resp.errorCode = error.name;
    resp.errorMessage = error.message;
    sendApiResponse(responder, 500, resp);
}

module.exports = {
    respondSuccessBody,
    respondError,
};
