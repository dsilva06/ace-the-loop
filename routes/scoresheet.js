const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("users");
});

module.exports = router;