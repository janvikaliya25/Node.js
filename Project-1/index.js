let http=require("http")
let port=2506;

let serverHendler = (req,res)=>{
    res.write(`<h1>Welcome to my server port ${port} ...</h1>`)
    res.end()
}
let server=http.createServer(serverHendler)

server.listen(port,(err)=>{
    err?console.log(err):console.log(`Your server is created ${port} ...`)
})