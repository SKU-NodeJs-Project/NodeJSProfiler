const mysql = require('mysql');

const mysqlConnection = {
    init: function() {
        return mysql.createConnection({
            //개인 설정
            host: "svc.sel4.cloudtype.app",
            port: 30552,
            user: "root",
            password: "1234", 
            database: "node" // 스키마 이름
        });
    },
    open: function(con) {
        return new Promise((resolve, reject) => { //Promise -> 동기 처리를 위해
            con.connect(err => {
                if(err){
                    console.log("MySQL 연결 실패 : ", err);
                    reject(err);
                } else {
                    console.log("MySQL 연결 성공");
                    resolve();
                }
            });
        });
    },
    close: function(con) {
        return new Promise((resolve, reject) => {
            con.end(err => {
                if(err) {
                    console.log("MySQL 종료 실패 : ",err);
                    reject(err);
                } else {
                    console.log("MySQL 종료 성공");
                    resolve();
                }
            });
        });
    }
}

module.exports = mysqlConnection;