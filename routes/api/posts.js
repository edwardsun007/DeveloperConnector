/* post apis */
const express = require("express");
const router = express.Router();

// @route GET api/posts/test
// @desc Test posts route
// @access Public
router.get("/test", (req, res) => {
  res.status(200).json("/api/posts/test works!");
});

module.exports = router;
