const schema = require("../model/firstSchema")

module.exports.firstpage = (req,res)=>{
    res.render("index")
}

module.exports.add = (req,res)=>{
    console.log(req.body);
    
}