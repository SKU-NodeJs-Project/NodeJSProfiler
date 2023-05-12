// //시작 페이지 렌더링하는 로직
// const express = require("express");

// const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("Hello, User");
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const iconv = require('iconv-lite');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/"); // 업로드한 파일을 저장할 폴더 경로 지정
  },
  filename: function (req, file, cb) {
    file.originalname = Buffer.from(file.originalname, "latin1").toString("utf8");
    //  cb(null, file.originalname); //업로드한 파일명 그대로 저장 ? 파일이름깨짐
    const ext = path.extname(file.originalname);
    cb(null, `${file.originalname} + ${Date.now()}${ext}`); // 업로드한 파일명을 변경하여 저장
     },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  res.render("upload"); // 업로드 페이지 렌더링
});

router.post("/upload", upload.single("file"), (req, res) => {
  // 파일 업로드 처리
  const filePath = req.file.path;
  fs.readFile(filePath, "utf-8", function (err, data) {
    if (err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
    console.log(data); // 파일의 내용을 콘솔에 출력
//
const fileContent = data;
const lines = fileContent.split('\n');
const datatmp = [];
// 각 줄을 순회하며 데이터 추출
for (let i = 0; i < lines.length; i++) {
  // 줄을 탭 문자로 분리하여 배열로 저장
  const fields = lines[i].split('\t');
  if(isNaN(parseInt(fields[1])))
    continue;

  // 첫 번째 필드를 코어 이름으로 저장
  const coreName = fields[0];
  
  // 두 번째 필드부터 데이터 추출하여 배열에 저장
  const coreData = [];
  for (let j = 1; j < fields.length; j++) {
    coreData.push(parseInt(fields[j]));
  }
  
  // 코어 이름과 데이터를 객체로 저장하여 data 배열에 추가
  datatmp.push({
    core: coreName,
    data: coreData
  });
}

// 추출한 데이터 출력
console.log(datatmp);
console.log('------------------');

const result = [];
// datatmp.forEach(function(element)){
//   result.push(datatmp.filter(obj => obj.core === `core${i}`).map(obj => obj.data[i]));
// }
for (let i = 0; i < 5; i++) {
  for(let j = 0; j < 5; j++){
    const core = `core${i+1}_tesk${j+1}`;
    const data = datatmp.filter(obj => obj.core === `core${i + 1}`).map(obj => obj.data[j]);
    result.push({ core, data });
  }
}

console.log(result);
const pool = require('../db/db.js');
pool.getConnection()
  .then(conn => {
    for(let i = 0; i < 5; i++){
      conn.query(`INSERT INTO cores (cores, tesk1, tesk2, tesk3, tesk4, tesk5) VALUES (?, ?, ?, ?, ?, ?)`, [`core${i+1}`, result[5*i].data.join(' '), result[5*i+1].data.join(' '), result[5*i+2].data.join(' '), result[5*i+3].data.join(' '), result[5*i+4].data.join(' ')]);

    }
      
    conn.release();
  })
  .catch(err => {
    console.error(err);
  });

  const calres = [];
  const { stdev, max, avg, min } = require('../cal.js');
  result.forEach(item => {
    const tmp = [stdev(item.data),
      max(item.data),
      avg(item.data),
      min(item.data)];
    calres.push(tmp);
  })
  console.log('------------------------------------------');
console.log(calres.length);
console.log(calres);
//
  res.redirect("/"); // 업로드 완료 후 메인 페이지로 리다이렉트
});
});

module.exports = router;