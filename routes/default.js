const express=require("express");

const router=express.Router();

router.get('/', function(req, res){
    res.render('index')
    // res.sendFile(directPath("index.ejs"))
})


router.get("/about", function(req, res){
    res.render("about")
    // res.sendFile(directPath("about.ejs"))
})


module.exports = router