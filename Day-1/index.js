const http = require("http")  // step 1
const port=2345; // we are give any unique number 

const serverHendler =(req,res)=>{   // showing msg on screen
    res.write(`<h1>Welcome to my server  ${port} ..</h1>`)
    res.end()
}

const server=http.createServer(serverHendler) //step 2

server.listen(port,(err)=>{
    err?console.log("err"):console.log(`Your server is created ${port}`)    //step 3 

    // if(err){
    //     console.log("err")
    // }
    // else{
    //     console.log(`welcome to my server port : ${port}`)
    // }
})