// // multer 미들웨어 사용
// const multer = require("multer");

// const upload = multer({
//   storage: multer.diskStorage({
//     destination(req, file, done) {
//       done(null, "uploads/");
//     },
//     filename(req, file, done) {
//       const ext = path.extname(file.originalname);
//       done(null, path.basename(file.originalname, ext) + ext);
//     },
//   }),
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

// const multer = require("multer");
// const fs = require("fs");

// try {
//   fs.readdirSync("uploads");
// } catch (error) {
//   console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
//   fs.mkdirSync("uploads");
// }
// router.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "multipart.html"));
// });
// router.post("/", upload.single("chooseFile"), (req, res) => {
//   console.log(req.file);
//   res.send("ok");
// });

//변수 선언
const fileNamePrint = document.querySelector(".upload_name");
const fileInput = document.getElementById("chooseFile");
// 업로드한 파일명 띄워주는 이벤트 헨들러
fileInput.onchange = () => {
  const selectedFile = [...fileInput.files];
  const fileName = selectedFile[0].name;
  fileNamePrint.value = fileName;
};