const express = require("express");
const router = express.Router();
const BaseController = require("./base.controller");
const THSdkService = require("../services/sdk/tribehired/tribehired-sdk.service");

const getTopPostsRoute = "/top";

router.get(getTopPostsRoute, async function(req, res) {

    try {

        // Logic
        let posts, comments;
        const parallelTasks = [
            await THSdkService.Posts.getAllPosts(),
            await THSdkService.Comments.getAllComments()
        ];
        await Promise.all(parallelTasks).then((values) => {
            [posts, comments] = values;
        });

        const sortedPosts = posts.map((post) => {
            const wrapped = {
                post_id: post.id,
                post_title: post.title,
                post_body: post.body,
                total_number_of_comments: 0
                // commentIds: []
            };
            if (comments && comments.length > 0) {
                const commentIds = comments.filter((comment) => comment.postId == post.id).map((comment) => comment.id);
                wrapped.total_number_of_comments = commentIds.length;
                return wrapped;
            }
        }).sort((a, b) => (a.total_number_of_comments < b.total_number_of_comments) ? 1 : -1);

        // Respond
        BaseController.respondSuccessBody(res, {
            result: sortedPosts
        });
    } catch (err) {
        BaseController.respondError(res, err);
    }

});

module.exports = router;
