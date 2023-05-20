//시작 페이지 렌더링하는 로직
const express = require("express");
const mysqlConObj = require('../config/mysql');
const router = express.Router();

router.get("/", async(req, res, next) => {
  const { tables } = req.query;
  const db = mysqlConObj.init();
  await mysqlConObj.open(db);
  if(tables){
    const dropSql = `DROP TABLE ${tables}`;
    console.log(dropSql);
    await db.query(dropSql, (e, result) => {
      if (e) throw e;
      console.log(tables+" 삭제");
    });
   }
  const showSql = "SHOW TABLES IN node"; // node -> mysql.js 파일에서 설정한 스키마 이름
  let showTable =[];
  await db.query(showSql, (e, result) => { //Table 목록 불러오기
    if (e) throw e;
    console.log("showTable 테스트");
    console.table(result);
    console.log(typeof (result));
    for (let i = 0; i < result.length; i++) {
      showTable.push(Object.values(result[i])[0]);
    }
    console.log(showTable);
  });
  await mysqlConObj.close(db);
  return res.render("upload", {
    showTable: showTable, //테이블 목록 배열 
  });

});

module.exports = router;
