 
const schema = require("../model/schema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken") 

module.exports.register = async (req, res) => {
    let admin = await schema.findOne({ email: req.body.email })

    if (admin) {
        return res.status(200).json({ msg: "User already existed" })
    }

    req.body.password = await bcrypt.hash(req.body.password, 10)

    await schema.create(req.body).then((data) => {
        return res.status(200).json({ msg: "User successfully created !", user: data });
    })
}

module.exports.login = async (req, res) => {
    let admin = await schema.findOne({ email: req.body.email });

    if (!admin) {
        return res.status(100).json({ msg: "Admin Not Found !", code: 100 })
    }

    if (await bcrypt.compare(req.body.password, admin.password)) {
        const token = jwt.sign({ admin }, "user", { expiresIn: "1h" })
        return res.status(200).json({ msg: "Admin Logged In Successfully !", code: 200, token: token });
    }
    else {
        return res.status(200).json({ msg: "Admin password is wrong !", code: 102 });
    }
}

module.exports.allAdmin = async (req,res) =>{
    await schema.find({}).then((data)=>{
        res.status(200).json({msg:"all data is here ..." ,data:data})
    })
}