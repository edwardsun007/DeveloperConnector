/* profile apis only */
const express = require("express");
const router = express.Router();

// @route GET api/profile/test
// @desc Test profile route
// @access Public
router.get("/test", (req, res) => {
  res.status(200).json("/api/profile/test works!");
});

module.exports = router;
