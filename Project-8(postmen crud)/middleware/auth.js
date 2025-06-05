const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
    let token = req.header("Authorization")

    if(!token){
        return res.status(404).json({msg:"token is not found..!!"})
    }

    console.log(token)
    let decode = jwt.verify(token,"user")
    console.log(decode)
    req.user = decode.admin
    next()
}

module.exports = auth