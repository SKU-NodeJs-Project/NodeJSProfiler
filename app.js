//express 세팅
const express = require("express");
const app = express();
const hostname = "localhost";

// 넌적스 세팅
const nunjucks = require("nunjucks");
const path = require("path");

app.set("port", process.env.PORT || 3000);
app.set("view engine", "html");
app.use(express.static("views"));

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true,
});

//db 
const maria  = require('./db/db');

//router 세팅
const uploadRouter = require("./routes/upload.js"); // router.get('/', (req, res) => { ... 을 불러옴
const chartRouter = require("./routes/chart.js"); // router.get('/', (req, res) => { ... 을 불러옴

app.use("/", uploadRouter); // 각기 다른 경로에 미들웨어 장착
app.use("/chart", chartRouter); // 각기 다른 경로에 미들웨어 장착

app.use((req, res, next) => {
  // '/'와 '/chart' 말고 다른곳 진입했을경우 실행
  res.status(404).send("Not Found");
});

app.listen(app.get("port"), hostname, () => {
  console.log(`서버 링크 : http://${hostname}:${app.get("port")}/`);
});
