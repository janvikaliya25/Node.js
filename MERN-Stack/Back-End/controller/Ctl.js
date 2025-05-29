const schema = require("../model/schema")

module.exports.addData = async (req, res) => {
    await schema.create(req.body).then(() => {
        res.json({ msg: "data added..." })
    })
}

module.exports.showData = async (req, res) => {
    await schema.find({}).then((data) => {
        console.log(data)
        res.json({ msg: "data is showed...", record : data })
    })
}

module.exports.deleteData = async (req, res) => {
    console.log(req.query.id)
    await schema.findByIdAndDelete(req.query.id).then(() => {
        res.json({ msg: "data is Deleted..." })
    })
}

module.exports.updateData = async (req, res) => {
    console.log(req.query.id)

    await schema.findByIdAndUpdate(req.query.id,req.body).then(() => {
        res.json({ msg: "data is Updated..."})
        console.log(req.body)
    })
}