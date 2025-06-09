const schema = require("../model/schema")

module.exports.registerAdmin = async(req,res)=>{
    let admin = await schema.findOne({email:req.body.email})

    if(admin){

        
    }
}