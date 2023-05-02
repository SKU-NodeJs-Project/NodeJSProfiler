//넌적스 설치 : npm i nunjucks
//express 설치 : npm i express
// npm i nunjucks express 가능

const express = require("express");
const path = require("path");
const nunjucks = require("nunjucks");
const app = express();
const hostname = "localhost";

app.set("port", process.env.PORT || 3000);
app.set("view engine", "html");

nunjucks.configure("views", {
  express: app,
  watch: true,
});

const uploadRouter = require("./router/upload"); // router.get('/', (req, res) => { ... 을 불러옴
const chartRouter = require("./router/chart"); // router.get('/', (req, res) => { ... 을 불러옴

app.use("/", uploadRouter); // 각기 다른 경로에 미들웨어 장착
app.use("/", chartRouter); // 각기 다른 경로에 미들웨어 장착

app.use((req, res, next) => {
  // 기본경로나 /user말고 다른곳 진입했을경우 실행
  res.status(404).send("Not Found");
});

app.listen(app.get("port"), hostname, () => {
  console.log(`서버 링크 : http://${hostname}:${app.get("port")}/`);
});
