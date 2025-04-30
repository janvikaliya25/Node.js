const schema=require("../model/schema")

module.exports.dashboard=(req,res)=>{
    res.render("dashboard");
}

module.exports.ragisterAdmin=(req,res)=>{
    res.render("ragisterAdmin")
}

module.exports.viewAdmin=async(req,res)=>{
    console.log(req.body)
    await schema.find({}).then((dat)=>{
        res.render("viewAdmin",{dat})
    })
}