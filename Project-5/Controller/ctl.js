const schema = require("../model/schema")

module.exports.homepage =async(req,res)=>{
    await schema.find({})
    .then((dat)=>{
        res.render("index",{dat})
    })
}
module.exports.addata = async(req,res)=>{
    console.log(req.body)
    await schema.create(req.body)
    .then(()=>{
        res.redirect("/")
    })
}
 
module.exports.delete = async(req,res)=>{
    console.log(req.query.id)
    await schema.findByIdAndDelete(req.query.id)
    .then(()=>{
        res.redirect("/")
    })
}

module.exports.edit = async(req,res)=>{
    console.log(req.query.id)
    await schema.findById(req.query.id)
    .then((dat)=>{
        res.render("edit",{dat})
    })
}
module.exports.update = async(req,res)=>{
    console.log(req.body)
    await schema.findByIdAndUpdate(req.body.id,req.body)
    .then(()=>{
        res.redirect("/")
    })
}
