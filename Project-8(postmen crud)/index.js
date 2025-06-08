const express = require("express")
const port = 2505
const cors = require('cors')

const app = express();
const db = require("./config/db")
const session = require('express-session');

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json());

app.use(session({
    name: "local",
    secret: 'POSTMENCRUD',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use("/", require("./routes/route"))
app.use("/",require("./routes/managerRoute"))
app.use("/",require("./routes/employeeRoute"))

app.listen(port, (err) => {
    err ? console.log(err) : console.log(`Your server is started ${port}`)
})