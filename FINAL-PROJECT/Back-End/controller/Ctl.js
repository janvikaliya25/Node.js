
const schema = require("../model/schema")
const bcrypt = require("bcryptjs")

module.exports.register = async (req,res) =>{
    let admin = await schema.findOne({email : req.body.email})

    if(admin){
         return res.status(200).json({msg : "User already existed"})
    }

    req.body.password = await bcrypt.hash(req.body.password,10)

    await schema.create(req.body).then((data)=>{
        return res.status(200).json({ msg: "User successfully created !", user : data });
    })
}