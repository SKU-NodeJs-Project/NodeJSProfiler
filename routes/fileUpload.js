const express = require('express');
const router = express.Router();
const upload = require('../multer');
const fs = require('fs');

router.post('/upload', upload.single('file'), (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      const error = new Error('Please upload a file');
      error.httpStatusCode = 400;
      return next(error);
    }
    
    // 파일 업로드가 완료되면 업로드된 파일을 읽어서 콘솔에 출력
    fs.readFile(file.path, 'utf-8', function(err, data) {
      if (err) {
        console.error(err);
        return res.status(500).send(err.message);
      }
      console.log(data);
      res.status(200).send('File uploaded and processed successfully');
    });

    // res.status(200).send('File uploaded successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;