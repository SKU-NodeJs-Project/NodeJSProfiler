//시작 페이지 렌더링하는 로직
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello, User");
});

module.exports = router;