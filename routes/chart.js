//chart 페이지 렌더링하는 로직
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chart.html", { title: ["작업단위", "코어단위"] });
});

module.exports = router;
