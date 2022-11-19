var express = require('express');
var router = express.Router();

router.post('/', (req, res) =>{
    let images = req.body.images;
    res.send("Hi :]");
})

module.exports = router;
