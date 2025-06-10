const express = require("express")
const port=2505;
const cors = require('cors')

const app=express();
const db = require("./config/db");
const upload = require("./middleware/multer");

app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use(express.json())

app.use('/',require("./routes/route"))
app.use("/ProductForm",require("./routes/product"))

app.listen(port,(err)=>{
    err?console.log(err):console.log(`Yout server is Started ${port}`)
})