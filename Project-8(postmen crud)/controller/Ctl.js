
const schema = require("../modal/schema")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailer = require("../middleware/mailer")

module.exports.registerAdmin = async (req, res) => {
    // console.log(req.body);
    let admin = await schema.findOne({ email: req.body.email });

    if (admin) {
        return res.status(200).json({ msg: "User already existed" });
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);

    await schema.create(req.body).then((data) => {
        res.json({ msg: "Admin added...!", user: data });
    });
};

module.exports.adminLogin = async (req, res) => {
    let admin = await schema.findOne({ email: req.body.email });

    console.log(req.body);
    console.log(admin);

    if (!admin) {
        return res.status(100).json({ msg: "Admin Not Found !", code: 100 });
    }

    if (await bcrypt.compare(req.body.password, admin.password)) {
        const token = jwt.sign({ admin }, "user", { expiresIn: "1h" });
        return res.status(200).json({ msg: "Admin Logged In Successfully !", code: 200, token: token });
    } else {
        return res.status(200).json({ msg: "Admin password is wrong !", code: 102 });
    }
};

module.exports.adminProfile = async (req, res) => {
    console.log(req.user)
    let profile = await schema.findOne({ email: req.user.email })
    if (!profile) {
        res.status(404).json({ msg: "your data / token is not found" })
    }

    return res.status(202).json({ msg: "your data is getting", data: profile })
};

module.exports.changePassword = async (req, res) => {
    let { oldpass, newpass, confirmpass } = req.body;

    let admin = await schema.findById(req.user._id);
    console.log(admin);

    if (!admin) {
        return res.json({ msg: "Admin is not found...!" });
    }

    console.log(oldpass);
    console.log(admin.password);

    const pass = await bcrypt.compare(oldpass, admin.password);

    if (pass) {
        if (newpass !== oldpass) {
            if (newpass === confirmpass) {
                const hashpass = await bcrypt.hash(newpass, 10);

                schema.findByIdAndUpdate(admin._id, { password: hashpass }).then(() => {
                    res.json({ msg: "Password is updated...!" });
                });
            } else {
                res.json({ msg: "New and confirm passwords do not match...!" });
            }
        } else {
            res.json({ msg: "New password must be different from old password...!" });
        }
    } else {
        res.json({ msg: "Old password is incorrect...!" });
    }
}

module.exports.forgotPassword = async (req, res) => {
    let admin = await schema.findOne({ email: req.body.email });

    if (!admin) {
        return res.json({ msg: "Admin is not found...!" });
    }

    let otp = Math.floor(1000 + Math.random() * 9000);

    mailer.sendOTP(req.body.email, otp);

    await schema.findByIdAndUpdate(admin._id, { otp: otp }).then(() => {
        res.json({ msg: "OTP is sent to your email!" });
    });
};


// module.exports.setNewPass = async (req, res) => {
//     let { email, otp, newpass, confirmpass } = req.body;

//     let admin = await schema.findOne({ email });

//     if (!admin) {
//         return res.json({ msg: "Admin not found!" });
//     }

//     if (admin.otp != otp) {
//         return res.json({ msg: "Invalid OTP!" });
//     }

//     if (newpass != confirmpass) {
//         return res.json({ msg: "Passwords do not match!" });
//     }

//     let hashpass = await bcrypt.hash(confirmpass, 10);

//     await schema.findByIdAndUpdate(admin._id, {
//         password: hashpass,
//         otp: null
//     }).then(() => {
//         res.json({ msg: "Password updated successfully!" });
//     });
// };

module.exports.setNewPass = async (req, res) => {
    let { email, otp, newpass, confirmpass } = req.body;

    let admin = await schema.findOne({ email });

    if (!admin) {
        return res.json({ msg: "Admin not found!" });
    }

    // Prevent crash if otp is missing
    if (!admin.otp || admin.otp.toString() !== otp.toString()) {
        return res.json({ msg: "Invalid OTP!" });
    }

    if (newpass !== confirmpass) {
        return res.json({ msg: "Passwords do not match!" });
    }

    let hashpass = await bcrypt.hash(confirmpass, 10);

    await schema.findByIdAndUpdate(admin._id, {
        password: hashpass,
        otp: null
    }).then(() => {
        res.json({ msg: "Password updated successfully!" });
    });
};
