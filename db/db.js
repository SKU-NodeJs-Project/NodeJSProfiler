const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'svc.sel4.cloudtype.app',
    port: 32767,
    user: 'root',
    password: '1234',
    database: 'core_tesk',
    connectionLimit: 5
});

async function main() {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("MariaDB Connected Successfully!");
  } catch (err) {
    console.error("Error Connecting to MariaDB: ", err);
  } finally {
    if (conn) conn.release();
  }
}

main();
module.exports = pool