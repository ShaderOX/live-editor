const router = require("express").Router();
const { v4 } = require("uuid");

router.get("/", (req, res) => {
  res.redirect(`/document/${v4()}`);
});

router.get("/:id/", (req, res) => {
  res.render("document.html");
})

module.exports = router;
