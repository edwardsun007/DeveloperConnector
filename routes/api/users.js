/* authentication apis only */
const express = require("express");
const router = express.Router();

// @route GET api/users/test
// @desc Test users route
// @access Public
router.get("/test", (req, res) => {
  res.status(200).json("/api/users/test works!");
});

module.exports = router;
