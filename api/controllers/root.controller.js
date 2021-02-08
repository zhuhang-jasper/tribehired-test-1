const express = require("express");
const router = express.Router();

/* ----------- */
/* CONTROLLERS */
/* ----------- */
const postsController = require("./posts.controller.js");
const commentsController = require("./comments.controller.js");

/* ------ */
/* ROUTES */
/* ------ */
router.use("/posts", postsController);
router.use("/comments", commentsController);

module.exports = router;
