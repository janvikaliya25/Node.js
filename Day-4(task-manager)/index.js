
let express = require("express");  // step-1
let port = 2205;  // step-2

let app = express();  // step-3

app.set("view engine", "ejs")  // step-6
app.use(express.urlencoded({ extended: true }));  // step-9

let tasks = [  // step-7
    {
        id: "1",
        title: "portfolio",
        description: "website",
        priority: "High",
        completed: false
    }
]

app.get("/", (req, res) => {  // step-5
    res.render("index", { tasks });
});

app.post("/addData", (req, res) => {  // step-8
    console.log(req.body);
    req.body.id = (tasks.length + 1).toString();  // step-10
    req.body.completed = false;
    tasks.push(req.body);
    res.redirect("/");
});

app.get("/editData/:id", (req, res) => {  // step-12
    console.log(req.params.id);
    let singleData = tasks.find((el) => el.id == req.params.id);
    res.render("edit", { singleData });
});

app.post("/updateData", (req, res) => {  // step-13
    console.log(req.body.id);
    tasks.forEach((el) => {
        if (el.id == req.body.id) {
            el.title = req.body.title;
            el.description = req.body.description;
            el.priority = req.body.priority;
        }
    });
    res.redirect("/");
});

app.post("/updateTaskStatus", (req, res) => {
    console.log(req.body.id);  // step-14
    tasks.forEach((el) => {
        if (el.id == req.body.id) {
            el.completed = req.body.completed === "on";
        }
    });
    res.redirect("/");
});

app.get("/deleteData", (req, res) => {  // step-11
    console.log(req.query.id);
    tasks = tasks.filter((el) => el.id != req.query.id);
    res.redirect("/");
});

app.listen(port, (err) => {  // step-4
    err ? console.log(err) : console.log(`Your server is created on port ${port}`);
});
