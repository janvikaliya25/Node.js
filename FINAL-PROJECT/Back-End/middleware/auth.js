const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
    let token=req.header("authorization")
    if(!token){
        return res.status(404).json({msg:"token not found"})
    }

    let decode = jwt.verify(token,"user")
    req.user = decode
    console.log(decode)
    next()
}

module.exports=auth