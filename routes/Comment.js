var express = require('express');
var router = express.Router();

const AddComment = require("../middlewares/AddComment");
const AddCommentId = require("../Controllers/CommentsController/AddCommentId");
const FetchAllComment = require("../Controllers/CommentsController/FetchAllComment");

router.post("/AddComment/:id",AddComment,AddCommentId);
router.get("/AllComments/:id",FetchAllComment);


module.exports = router;