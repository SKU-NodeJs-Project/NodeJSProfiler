// const multer = require('multer');
// const path = require('path');
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads'); // 파일이 업로드되는 경로 설정
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}_${file.originalname}`); // 파일 이름 설정
//   },
// });

// const fileFilter = function (req, file, cb) {
//   const ext = path.extname(file.originalname); // 업로드한 파일의 확장자 확인
//   if (ext !== '.txt') {
//     // txt 파일이 아닌 경우 업로드 금지
//     return cb(new Error('Only txt files are allowed'));
//   }
//   cb(null, true);
// };

// const upload = multer({ storage: storage, fileFilter: fileFilter });

// module.exports = upload;