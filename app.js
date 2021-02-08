"use strict";

const appRoot = require("app-root-path");
const envConfig = require(appRoot + "/config/config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const controller = require("./api/controllers/root.controller.js");

/* ---------- */
/* MIDDLEWARE */
/* ---------- */

// BODY PARSER
app.use(bodyParser.json({
    limit: "50mb"
})); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true
})); // to support URL-encoded bodies

// INTERCEPTORS
app.use("/v1", controller);
app.use(errorHandler); // Catch Middleware Errors
function errorHandler(err, req, res, next) {
    if (err) {
        console.error(err);
        res.status(500).json({
            msg: err.name
        });
    }
}

/* ----------- */
/* APPLICATION */
/* ----------- */

const port = envConfig.app.port;
console.log("---------------------------------------------------");
console.log(" tRIBEhIRED tEST sERVER");
app.listen(port, () => {
    console.log("    Application started. Listening at port: " + port);
    console.log("---------------------------------------------------");
});
