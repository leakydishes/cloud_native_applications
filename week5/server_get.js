// Creates express application
const express= require("express");
    // what to return/ instance
    const app = express();
    // two ways to save a function
        // function ()
        // (parameters) => 

    // Function
    // inputs (n1 and n2) returns sum
    const addTwoNumber= (n1,n2) => {
        return n1+n2;
    }
    // two functions look at the end point
    // GET request, calculates sum, returns json response
    app.get("/addTwoNumber", (req,res)=>{
        const n1= parseInt(req.query.n1); // query parameter
        const n2=parseInt(req.query.n2);
        const result = addTwoNumber(n1,n2);
        res.json({statuscocde:200, data: result }); 
    });

    app.get("/", (req, res) => {
        const n1 = "<html><body><H1>HELLO </H1></body></html>";
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(n1));     
    })
    // calculates using function
    console.log (addTwoNumber(19,12));
    // port number
    const port=3040;
    // server, logs message
    app.listen(port,()=> {
        console.log("hello this is my first test "+port);
    })
    
    // view in browser
    // http://localhost:3040/addTwoNumber?n1=786&n2=787
    // http://localhost:3040/ 
