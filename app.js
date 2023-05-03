//express 세팅
const express = require("express");
const app = express();
const hostname = "localhost";

// 넌적스 세팅
const path = require("path");
const nunjucks = require("nunjucks");

app.set("port", process.env.PORT || 3000);
app.set("view engine", "html");

nunjucks.configure("views", {
  express: app,
  watch: true,
  autoescape: true,
});

//router 세팅
const uploadRouter = require("./routes/upload"); // router.get('/', (req, res) => { ... 을 불러옴
const chartRouter = require("./routes/Chart"); // router.get('/', (req, res) => { ... 을 불러옴

app.use("/", uploadRouter); // 각기 다른 경로에 미들웨어 장착
app.use("/chart", chartRouter); // 각기 다른 경로에 미들웨어 장착

app.use((req, res, next) => {
  // '/'와 '/chart' 말고 다른곳 진입했을경우 실행
  res.status(404).send("Not Found");
});

app.listen(app.get("port"), hostname, () => {
  console.log(`서버 링크 : http://${hostname}:${app.get("port")}/`);
});
