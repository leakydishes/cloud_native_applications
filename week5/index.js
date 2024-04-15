// class reference: https://collabedit.com/4gs22
// use express package for this app to listen on port 3000
// then write on console
var express = require("express")
// express function called app
var app = express()
//specific port 
var port = process.env.port || 3000;
app.listen(port,()=>{
console.log("App listening to: "+port)
})


// package.json
/**
 * metadata file for a Node.js project
 */