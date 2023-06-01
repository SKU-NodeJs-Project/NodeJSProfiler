//chart 페이지 렌더링하는 로직
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const mysqlConObj = require("../config/mysql");
const { stdev, max, avg, min } = require("../graphFunction");
const url = require("url");
const querystring = require("querystring");
const path = require("path");

//storage변수에 multer 설정 후 upload에 선언
let storage = multer.diskStorage({
  //# diskStorage => 파일이 저장될 경로와 파일명을 지정
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../uploads")); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8" //한글 깨짐 현상 처리
    );
    cb(null, file.originalname); // cb 콜백함수를 통해 전송된 파일 이름 설정
  },
});
const upload = multer({ storage: storage });

//데이터 보내기
router.post("/", upload.single("txtFile"), async (req, res, next) => {
  let fileName = req.file.originalname;
  console.log(`파일 이름 확인용 : ${fileName}`);

  let casecnt
  let datacnt
  let corecnt
  let taskcnt;
  let arr;
  try {
    let file_data = fs.readFileSync(path.resolve(__dirname, `../uploads/${fileName}`), "utf-8");

    arr = file_data.split(/\s+/);
    
    arr.shift();
    arr.pop();
    console.log("가공한 데이터가 배열에 어떻게 저장되었나 확인용");
    console.table(arr);
    let k= 0;
    while(arr[k] === `task${k + 1}`){
      k++;
    }
  
    console.log("task 개수 : " + k); //task 개수
    taskcnt = k;
    if("core1" === arr[k]){
      // console.log(arr[k]);  
      console.log("core1의 인덱스 번호 : " +k); // core1의 인덱스 번호
    }
    let j= 0;
    while(arr[k] !== 'task1'){
      
      if(arr[k] === `core${j + 1}`){
        
        j++;
      }
      k++;
    }
    console.log("core 개수 : " + j); // j가 core 개수
    corecnt = j;
    // console.log(arr[k]);
    console.log("k+ 1이 1케이스 개수 :" + k);  //  k + 1이 1케이스 개수
    datacnt = k - j - taskcnt;
    console.log("데이터 개수 : " + datacnt);

    for (let i = arr.length - 1; i >= 0; i--) {
      for (let i = arr.length - 1; i >= 0; i--) {
        if (isNaN(Number(arr[i]))) {
          arr.splice(i, 1);
        }
      }
    }
    casecnt = arr.length / datacnt;
    console.log("케이스 개수 : " + casecnt);
    console.log("최종 가공 확인용");
    console.table(arr);
  } catch (error) {
    console.log(error);
  }
 
 


  try {
    // 0. 데이터 가공하여 mysql 테이블에 바로 INSERT
    // 1. 파일 이름에서 확장자(.txt) 제거 후 테이블 생성해야 함
    // 2. 동일한 이름을 가진 테이블이 있다면 DROP후 새로 CREATE
    // 3. INSERT

    const fileName2 = fileName.split(".txt")[0]; //파일 이름에서 .txt 확장자 제거
    // console.log(`.txt 확장자 제거 확인용 ${fileName2}`);

    const db = mysqlConObj.init();
    await mysqlConObj.open(db);
    const dropSql = `DROP TABLE IF EXISTS ${fileName2}`; // IF EXISTS를 통해 해당 이름을 가진 테이블이 없어도 오류X
    await db.query(dropSql, (err) => {
      if (err) throw err;
      console.log(`테이블 ${fileName2} 삭제 완료`);
    });

    let tmpstr = '';
    for(let i = 0; i < taskcnt; i++){
      tmpstr += `task${i + 1} varchar(255), `;
    }

    const createSql = `CREATE TABLE ${fileName2} (core varchar(10),` + tmpstr + 'Primary key(core))';
    await db.query(createSql, (e) => {
      if (e) throw e;
      console.log("테이블 생성 완료");
    });

    let data = "";
    for (let k = 0; k < corecnt; k++) {
      // Core 이동
      for (let j = 0; j < taskcnt; j++) {
        // Task 이동
        for (let i = 0; i < casecnt; i++) {
          //Case 이동
          data += arr[i + i * (datacnt-1) + j + k * taskcnt] + " "; //case 10개에 대한 각 Core의 하나의 Task에 대한 수행 능력을 문자열로 저장
        } //"case1 case2 case3 case4 case5 case6 case7 case8 case9 case10"
        if (j == 0) {
          //각 행의 첫 열만 INSERT 나머지는 UPDATE => 각 Core의 Task1만 INSERT 나머지는 UPDATE
          const insertSql = `INSERT INTO ${fileName2} (core, task${j + 1}) VALUES ('core${k + 1}', '${data}')`;

          await db.query(insertSql, (e) => {
            if (e) throw e;
            // console.log("데이터 삽입 완료");
          });
        } else {
          const updateSql = `UPDATE ${fileName2} SET task${j + 1} = '${data}' WHERE core = 'core${k + 1}'`;
          await db.query(updateSql, (e) => {
            if (e) throw e;
            // console.log('데이터 업데이트 완료');
          });
        }
        data = ""; //초기화
      }
    }
    await mysqlConObj.close(db);

    return res.render("chart", {
      title: ["작업단위", "코어단위"],
      fileName: fileName2,
    });
  } catch (error) {
    console.log(`DB 오류 있음 : ${error}`);
    return res.redirect("/");
  }
});
router.get("/", (req, res, next) => {
  //기존 파일 불러오기
  // URL 파싱
  const parsedUrl = url.parse(req.url);
  // 쿼리스트링 파싱
  const query = querystring.parse(parsedUrl.query);
  // 쿼리스트링 값에 접근
  const fileName = query.tables; // /chart?tables="파일명"

  return res.render("chart", {
    fileName: fileName,
  });
});
router.get("/:index/:graph/:fileName", async (req, res, next) => {
  //DB에서 데이터 조회 및 그래프 그리기
  const num1 = parseInt(req.params.index); // Task, Core 버튼 구분을 하기 위한 숫자
  const graph = req.params.graph; // 그래프 종류
  console.log("graph", graph);
  const fileName = req.params.fileName; // 파일명
  console.log("test : " + fileName);
  let arr = [[], [], [], [], []];
  let num2 = 0;
  const db = mysqlConObj.init();
  await mysqlConObj.open(db);
  if (num1 > 5) {
    //Task1~5 버튼 클릭 시
    num2 = num1 - 5;
    for (let i = 0; i < 5; i++) {
      let selectSql = `SELECT task${num2} FROM ${fileName} WHERE core = 'core${i + 1}'`;
      await db.query(selectSql, (e, result) => {
        if (e) throw e;
        // console.log('데이터 조회 : ' + i + '번째');
        // console.log("result");
        // console.table(result);
        // console.log("result[0]");
        // console.table(result[0]);
        // console.log("Object.values(result[0])[0]");
        // console.table(Object.values(result[0])[0]);
        const temp = Object.values(result[0])[0].split(" "); //문자열을 공백으로 파싱하여 배열로 저장
        temp.pop();
        // console.log(temp);
        for (let j = 0; j < 10; j++) {
          arr[i].push(parseInt(temp[j])); //현재 데이터가 string이기 때문에 정수형으로 변환하여 배열 저장
        }
        // console.table(arr);
      });
    }
  } else {
    //Core1~5 버튼 클릭 시
    num2 = num1;
    for (let i = 0; i < 5; i++) {
      let selectSql = `SELECT task${i + 1} FROM ${fileName} WHERE core = 'core${num2}'`;
      await db.query(selectSql, (e, result) => {
        if (e) throw e;
        // console.log('데이터 조회 : ' + i + '번째');
        const temp = Object.values(result[0])[0].split(" "); //문자열을 공백으로 파싱하여 배열로 저장
        temp.pop();
        // console.log(temp);
        for (let j = 0; j < 10; j++) {
          arr[i].push(parseInt(temp[j])); //현재 데이터가 string이기 때문에 정수형으로 변환하여 배열 저장
        }
        // console.table(arr);
      });
    }
  }
  await mysqlConObj.close(db);

  let maxArr = [];
  let avgArr = [];
  let minArr = [];
  let stdevArr = [];
  let subject = "";
  let xLabel = ""; //그래프 x축 레이블 이름
  if (num1 > 5) {
    //Task1~5 버튼 클릭 시 Task의 core별 그래프
    xLabel = "core";
    subject = "Task";
  } else {
    //Core1~5 버튼 클릭 시 Core의 task별 그래프
    xLabel = "task";
    subject = "Core";
  }
  console.log(subject + num2 + " arr");
  console.table(arr);
  for (let i = 0; i < 5; i++) {
    maxArr.push(max(arr[i]));
    avgArr.push(avg(arr[i]));
    minArr.push(min(arr[i]));
    stdevArr.push(stdev(arr[i]));
  }
  // console.log(Array.isArray(maxArr));
  console.log("maxArr : " + maxArr);
  console.log("avgArr : " + avgArr);
  console.log("minArr : " + minArr);
  console.log("stdevArr : " + stdevArr);

  return res.render("chart.html", {
    title: ["작업단위", "코어단위"],
    fileName: fileName,
    graphType: graph,
    index: num2,
    subject: subject,
    xLabel: xLabel,
    maxArr,
    avgArr,
    minArr,
    stdevArr,
    display: true,
  });
});

module.exports = router;
