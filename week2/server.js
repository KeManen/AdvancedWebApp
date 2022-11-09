const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

let listItems =[]

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))


app.use(express.static('static'));

app.get("/hello", (req, res) => res.json({msg:"Hello World"}) )
app.get("/echo/:id", (req, res) => res.json({id:req.params.id.toString()}))

app.post("/sum", (req, res) => {
    res.json({sum:req.body.numbers.reduce((a,b) => a+b, 0)})
})

app.post("/list", (req, res) => {
    listItems.push(req.body.text)
    console.log(req.body.text)
    res.json({list:listItems})
})




app.listen(port, () => console.log(`Server listening a port ${port}!`));

