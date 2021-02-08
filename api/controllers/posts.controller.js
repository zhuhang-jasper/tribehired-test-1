const express = require("express");
const postsRouter = express.Router();
const BaseController = require("./base.controller");
const THSdkService = require("../services/sdk/tribehired/tribehired-sdk.service");

const getTopPostsRoute = "/top";

postsRouter.get(getTopPostsRoute, async function(req, res) {

    try {

        // TODO: Process Request

        // TODO: Logic
        const posts = await THSdkService.Posts.getAllPosts();
        const comments = await THSdkService.Comments.getAllComments();
        // const sorted = all.map((post) => {
        //     return {
        //         post_id: "",
        //         post_title: "",
        //         post_body: "",
        //         total_number_of_comments: ""
        //     };
        // }).sort((a, b) => (a.total_number_of_comments < b.total_number_of_comments) ? 1 : -1);

        BaseController.respondSuccessBody(res, {
            result: posts
        });
    } catch (err) {
        BaseController.respondError(res, err);
    }

});

module.exports = postsRouter;
