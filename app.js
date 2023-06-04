const express = require("express");
const app = express();
const hostname = "localhost";
const nunjucks = require("nunjucks");
const path = require("path");
const uploadRouter = require("./routes/uploadRouter.js");
const chartRouter = require("./routes/chartRouter.js");
const bodyParser = require("body-parser");



// 넌적스 세팅
app.set("port", process.env.PORT || 3000);
app.set("view engine", "html");
app.use("/", express.static(__dirname + "/views"));
nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true,
});

//router 세팅
app.use("/", uploadRouter);
app.use("/chart", chartRouter);

// '/'와 '/chart' 말고 다른곳 진입했을경우 실행
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.listen(app.get("port"), hostname, () => {
  console.log(`서버 링크 : http://${hostname}:${app.get("port")}/`);
});

//한글 깨짐 현상
app.use(bodyParser.urlencoded({ extended: true }));
