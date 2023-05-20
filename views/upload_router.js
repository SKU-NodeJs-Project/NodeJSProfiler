const express = require("express");
const router = express.Router();

router.get('/', (req , res)=>{
    res.sendFile(path.join(__dirname, 'multipart.html'));
})
router.post('/', upload.single('chooseFile'), (req, res) => {
    console.log(req.file);
    res.send('ok');
});