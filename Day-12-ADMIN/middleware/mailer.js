const nodemailer=require("nodemailer");

const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"",
        pass:"qzrmdlrnoturmlji"
    } 
})

module.exports.sendOTP=(to,otp)=>{
    let mailOptions={
        to:to,
        from:"janvikaliya@gmail.com",
        subject:"your password reset otp",
        text:`your password reset otp ${otp}`
    }
    transport.sendMail(mailOptions);
}