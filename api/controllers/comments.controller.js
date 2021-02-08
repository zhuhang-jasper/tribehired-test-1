const express = require("express");
const router = express.Router();
const BaseController = require("./base.controller");
const THSdkService = require("../services/sdk/tribehired/tribehired-sdk.service");

const getCommentsRoute = "/";

router.get(getCommentsRoute, async function(req, res) {

    try {

        // TODO: Validate Request
        const filterKey = req.query.filterKey;
        const filterValue = req.query.filterValue;
        const exactMatch = (req.query.exactMatch == "true");

        // Logic
        const comments = await THSdkService.Comments.getAllComments();
        const filteredComments = comments.filter((comment) => {
            return comment[filterKey] && (!exactMatch ? String(comment[filterKey]).includes(filterValue) : String(comment[filterKey]) == filterValue);
        });

        // Respond
        BaseController.respondSuccessBody(res, {
            // request: {
            //     filterKey,
            //     filterValue
            // },
            result: filteredComments
        });
    } catch (err) {
        BaseController.respondError(res, err);
    }

});

module.exports = router;
